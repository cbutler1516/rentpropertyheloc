import { dealPathMeta } from "../constants";
import type { DealAnalyzerAnalyticsPayload } from "../analytics/types";
import type { DealAnalyzerEventName } from "../analytics/event-names";
import { isDealAnalyzerEventName } from "../analytics/event-names";
import type { TrackDealAnalyzerEventInput } from "../analytics/types";
import type { Json } from "./database.types";
import { createServerSupabaseClient } from "./server";

export type InsertDealAnalyzerEventInput = TrackDealAnalyzerEventInput;

export async function insertDealAnalyzerEvent(
  input: InsertDealAnalyzerEventInput,
): Promise<{ ok: true } | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return { error: "Supabase is not configured." };
  }

  if (!isDealAnalyzerEventName(input.eventName)) {
    return { error: "Invalid event name." };
  }

  const metadata = (input.metadata ?? {}) as Json;

  const { error } = await supabase.from("deal_analyzer_events").insert({
    event_name: input.eventName,
    session_id: input.sessionId ?? null,
    lead_id: input.leadId ?? null,
    report_id: input.reportId ?? null,
    agent_id: input.agentId ?? null,
    referral_code: input.referralCode ?? null,
    deal_type: input.dealType ?? null,
    page_path: input.pagePath ?? null,
    metadata,
  });

  if (error) return { error: error.message };
  return { ok: true };
}

type RawEventRow = {
  event_name: string;
  session_id: string | null;
  deal_type: string | null;
  page_path: string | null;
  agent_id: string | null;
  metadata: Json;
};

function countDistinctSessions(
  rows: RawEventRow[],
  eventName: DealAnalyzerEventName,
): number {
  const sessions = new Set<string>();
  for (const row of rows) {
    if (row.event_name !== eventName || !row.session_id) continue;
    sessions.add(row.session_id);
  }
  return sessions.size;
}

function countEvents(rows: RawEventRow[], eventName: DealAnalyzerEventName): number {
  return rows.filter((r) => r.event_name === eventName).length;
}

export async function fetchDealAnalyzerAnalytics(
  days = 30,
): Promise<DealAnalyzerAnalyticsPayload> {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return {
      configured: false,
      dateRangeDays: days,
      funnel: {
        views: 0,
        starts: 0,
        previews: 0,
        leadForms: 0,
        leads: 0,
        reports: 0,
      },
      conversionByDealType: [],
      conversionByAgent: [],
      topSeoLandingPages: [],
      reportEngagement: {
        linkCopied: 0,
        messageCopied: 0,
        pdfPrinted: 0,
      },
      crmPush: { succeeded: 0, failed: 0, successRate: 0 },
      error: "Supabase is not configured.",
    };
  }

  const since = new Date();
  since.setDate(since.getDate() - days);
  const sinceIso = since.toISOString();

  const { data: events, error: eventsError } = await supabase
    .from("deal_analyzer_events")
    .select(
      "event_name, session_id, deal_type, page_path, agent_id, metadata, created_at",
    )
    .gte("created_at", sinceIso)
    .order("created_at", { ascending: false })
    .limit(10000);

  if (eventsError) {
    return {
      configured: true,
      dateRangeDays: days,
      funnel: {
        views: 0,
        starts: 0,
        previews: 0,
        leadForms: 0,
        leads: 0,
        reports: 0,
      },
      conversionByDealType: [],
      conversionByAgent: [],
      topSeoLandingPages: [],
      reportEngagement: {
        linkCopied: 0,
        messageCopied: 0,
        pdfPrinted: 0,
      },
      crmPush: { succeeded: 0, failed: 0, successRate: 0 },
      error: eventsError.message,
    };
  }

  const rows = (events ?? []) as RawEventRow[];

  const viewSessions = new Set<string>();
  for (const row of rows) {
    if (
      (row.event_name === "seo_landing_view" ||
        row.event_name === "partner_landing_view") &&
      row.session_id
    ) {
      viewSessions.add(row.session_id);
    }
  }

  const funnel = {
    views: viewSessions.size,
    starts: countDistinctSessions(rows, "analyzer_started"),
    previews: countDistinctSessions(rows, "preview_viewed"),
    leadForms: countDistinctSessions(rows, "lead_form_viewed"),
    leads: countDistinctSessions(rows, "lead_submitted"),
    reports: countDistinctSessions(rows, "report_generated"),
  };

  const dealTypes = new Set<string>();
  for (const row of rows) {
    if (row.deal_type) dealTypes.add(row.deal_type);
  }

  const conversionByDealType = [...dealTypes].map((dealType) => {
    const filtered = rows.filter((r) => r.deal_type === dealType);
    const starts = countDistinctSessions(filtered, "analyzer_started");
    const reports = countDistinctSessions(filtered, "report_generated");
    const meta = dealPathMeta[dealType as keyof typeof dealPathMeta];
    return {
      dealType,
      label: meta?.label ?? dealType,
      starts,
      reports,
      leadRate: starts > 0 ? Math.round((reports / starts) * 100) : 0,
    };
  });

  conversionByDealType.sort((a, b) => b.reports - a.reports);

  const agentMap = new Map<
    string,
    { leads: number; reports: number }
  >();

  for (const row of rows) {
    if (!row.agent_id) continue;
    const entry = agentMap.get(row.agent_id) ?? { leads: 0, reports: 0 };
    if (row.event_name === "lead_submitted") entry.leads += 1;
    if (row.event_name === "report_generated") entry.reports += 1;
    agentMap.set(row.agent_id, entry);
  }

  const agentIds = [...agentMap.keys()];
  const agentNames = new Map<string, string>();

  if (agentIds.length > 0) {
    const { data: agents } = await supabase
      .from("deal_analyzer_agents")
      .select("id, name")
      .in("id", agentIds);

    for (const agent of agents ?? []) {
      agentNames.set(agent.id, agent.name);
    }
  }

  const conversionByAgent = agentIds
    .map((agentId) => ({
      agentId,
      agentName: agentNames.get(agentId) ?? "Unknown agent",
      leads: agentMap.get(agentId)?.leads ?? 0,
      reports: agentMap.get(agentId)?.reports ?? 0,
    }))
    .sort((a, b) => b.reports - a.reports);

  const seoViews = new Map<string, number>();
  for (const row of rows) {
    if (row.event_name !== "seo_landing_view" || !row.page_path) continue;
    seoViews.set(row.page_path, (seoViews.get(row.page_path) ?? 0) + 1);
  }

  const topSeoLandingPages = [...seoViews.entries()]
    .map(([pagePath, views]) => ({ pagePath, views }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 12);

  const reportEngagement = {
    linkCopied: countEvents(rows, "report_link_copied"),
    messageCopied: countEvents(rows, "report_message_copied"),
    pdfPrinted: countEvents(rows, "report_pdf_printed"),
  };

  const crmSucceeded = countEvents(rows, "crm_push_succeeded");
  const crmFailed = countEvents(rows, "crm_push_failed");
  const crmTotal = crmSucceeded + crmFailed;

  return {
    configured: true,
    dateRangeDays: days,
    funnel,
    conversionByDealType,
    conversionByAgent,
    topSeoLandingPages,
    reportEngagement,
    crmPush: {
      succeeded: crmSucceeded,
      failed: crmFailed,
      successRate:
        crmTotal > 0 ? Math.round((crmSucceeded / crmTotal) * 100) : 0,
    },
  };
}
