import { dealPathMeta } from "../constants";
import { mapRawReportToRow } from "../admin/report-row";
import type {
  DealAnalyzerAdminFilters,
  DealAnalyzerDashboardPayload,
  DealAnalyzerDashboardStats,
  DealAnalyzerReportRow,
} from "../admin/types";
import type { CrmPushFilter } from "../crm/types";
import type { ClientRole, DealPath } from "../types";
import { createServerSupabaseClient } from "./server";
import { fetchFollowUpsByReportIds } from "./follow-ups";
import { fetchReportFromSupabase } from "./save-report";

export { fetchReportFromSupabase as fetchDealAnalyzerReportBySlug };

type RawJoinedReport = {
  id: string;
  created_at: string;
  report_slug: string;
  agent_name: string | null;
  referral_source: string | null;
  narrative_json: unknown;
  lead_id: string;
  scenario_id: string;
  crm_push_status: string | null;
  crm_last_pushed_at: string | null;
  crm_push_error: string | null;
  crm_external_id: string | null;
};

function startOfWeekIso(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0, 0, 0, 0);
  return monday.toISOString();
}

function resolveDateRange(filters: DealAnalyzerAdminFilters): {
  from: Date | null;
  to: Date | null;
} {
  const now = new Date();
  if (filters.datePreset === "7d") {
    const from = new Date(now);
    from.setDate(from.getDate() - 7);
    return { from, to: now };
  }
  if (filters.datePreset === "30d") {
    const from = new Date(now);
    from.setDate(from.getDate() - 30);
    return { from, to: now };
  }
  if (filters.datePreset === "90d") {
    const from = new Date(now);
    from.setDate(from.getDate() - 90);
    return { from, to: now };
  }
  if (filters.datePreset === "custom") {
    const from = filters.dateFrom ? new Date(filters.dateFrom) : null;
    const to = filters.dateTo ? new Date(`${filters.dateTo}T23:59:59`) : null;
    return { from, to };
  }
  return { from: null, to: null };
}

export function filterDealAnalyzerReports(
  reports: DealAnalyzerReportRow[],
  filters: DealAnalyzerAdminFilters,
): DealAnalyzerReportRow[] {
  const q = filters.search.trim().toLowerCase();
  const { from, to } = resolveDateRange(filters);

  return reports.filter((row) => {
    if (filters.role !== "all" && row.role !== filters.role) return false;
    if (filters.dealType !== "all" && row.dealType !== filters.dealType) {
      return false;
    }

    if (filters.needsFollowUp && !row.needsFollowUp) return false;

    if (filters.crmPush !== "all" && row.crmPushStatus !== filters.crmPush) {
      return false;
    }

    if (from || to) {
      const created = new Date(row.createdAt);
      if (from && created < from) return false;
      if (to && created > to) return false;
    }

    if (!q) return true;

    const haystack = [
      row.leadName,
      row.email,
      row.phone,
      row.agentName ?? "",
      row.slug,
      row.referralSource ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

function buildStats(reports: DealAnalyzerReportRow[]): DealAnalyzerDashboardStats {
  const weekStart = startOfWeekIso();
  const leadRoles = new Map<string, number>();
  const dealTypes = new Map<DealPath, number>();

  let newLeadsThisWeek = 0;
  let agentSourcedCount = 0;
  let missingContactCount = 0;

  for (const row of reports) {
    if (row.createdAt >= weekStart) newLeadsThisWeek += 1;
    leadRoles.set(row.role, (leadRoles.get(row.role) ?? 0) + 1);
    dealTypes.set(row.dealType, (dealTypes.get(row.dealType) ?? 0) + 1);
    if (row.isAgentSourced) agentSourcedCount += 1;
    if (row.missingContact) missingContactCount += 1;
  }

  return {
    totalReports: reports.length,
    newLeadsThisWeek,
    leadTypeBreakdown: Array.from(leadRoles.entries())
      .map(([role, count]) => ({ role, count }))
      .sort((a, b) => b.count - a.count),
    dealTypeBreakdown: (Object.keys(dealPathMeta) as DealPath[]).map((dealType) => ({
      dealType,
      label: dealPathMeta[dealType].shortLabel,
      count: dealTypes.get(dealType) ?? 0,
    })),
    agentSourcedCount,
    missingContactCount,
  };
}

async function loadAllReportRows(): Promise<
  DealAnalyzerReportRow[] | { error: string }
> {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return { error: "Supabase is not configured." };
  }

  const { data: reports, error: reportsError } = await supabase
    .from("deal_analyzer_reports")
    .select(
      "id, created_at, report_slug, agent_name, referral_source, narrative_json, lead_id, scenario_id, crm_push_status, crm_last_pushed_at, crm_push_error, crm_external_id",
    )
    .order("created_at", { ascending: false })
    .limit(500);

  if (reportsError) {
    return { error: reportsError.message };
  }

  if (!reports?.length) {
    return [];
  }

  const leadIds = [...new Set(reports.map((r) => r.lead_id))];
  const scenarioIds = [...new Set(reports.map((r) => r.scenario_id))];

  const [{ data: leads, error: leadsError }, { data: scenarios, error: scenariosError }] =
    await Promise.all([
      supabase
        .from("deal_analyzer_leads")
        .select(
          "id, name, email, phone, role, notes, referral_source, agent_name, sms_call_consent, consent_timestamp, lead_status, last_contacted_at, next_follow_up_at",
        )
        .in("id", leadIds),
      supabase
        .from("deal_analyzer_scenarios")
        .select("id, deal_type, inputs_json, analysis_json")
        .in("id", scenarioIds),
    ]);

  if (leadsError) return { error: leadsError.message };
  if (scenariosError) return { error: scenariosError.message };

  const leadMap = new Map(leads?.map((l) => [l.id, l]) ?? []);
  const scenarioMap = new Map(scenarios?.map((s) => [s.id, s]) ?? []);
  const reportIds = reports.map((r) => r.id);
  const followUpResult = await fetchFollowUpsByReportIds(reportIds);
  const followUpMap =
    "error" in followUpResult ? new Map<string, never>() : followUpResult;

  const rows: DealAnalyzerReportRow[] = [];

  for (const report of reports as RawJoinedReport[]) {
    const lead = leadMap.get(report.lead_id);
    const scenario = scenarioMap.get(report.scenario_id);
    if (!lead || !scenario) continue;

    rows.push(
      mapRawReportToRow({
        id: report.id,
        created_at: report.created_at,
        report_slug: report.report_slug,
        agent_name: report.agent_name,
        referral_source: report.referral_source,
        narrative_json: report.narrative_json,
        lead_id: report.lead_id,
        scenario_id: report.scenario_id,
        crm_push_status: report.crm_push_status,
        crm_last_pushed_at: report.crm_last_pushed_at,
        crm_push_error: report.crm_push_error,
        crm_external_id: report.crm_external_id,
        lead,
        scenario,
        followUp: followUpMap.get(report.id) ?? null,
      }),
    );
  }

  return rows;
}

export async function fetchRecentDealAnalyzerReports(
  limit = 50,
): Promise<DealAnalyzerReportRow[] | { error: string }> {
  const result = await loadAllReportRows();
  if ("error" in result) return result;
  return result.slice(0, limit);
}

export async function fetchDealAnalyzerDashboardStats(): Promise<
  DealAnalyzerDashboardStats | { error: string }
> {
  const result = await loadAllReportRows();
  if ("error" in result) return result;
  return buildStats(result);
}

export async function fetchDealAnalyzerDashboard(
  filters?: DealAnalyzerAdminFilters,
): Promise<DealAnalyzerDashboardPayload | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return {
      stats: {
        totalReports: 0,
        newLeadsThisWeek: 0,
        leadTypeBreakdown: [],
        dealTypeBreakdown: [],
        agentSourcedCount: 0,
        missingContactCount: 0,
      },
      reports: [],
      configured: false,
    };
  }

  const all = await loadAllReportRows();
  if ("error" in all) return { error: all.error };

  const stats = buildStats(all);
  const reports = filters ? filterDealAnalyzerReports(all, filters) : all;

  return {
    stats,
    reports,
    configured: true,
  };
}

export function getTopOpportunities(
  reports: DealAnalyzerReportRow[],
  limit = 5,
): DealAnalyzerReportRow[] {
  return [...reports].sort((a, b) => b.leadScore - a.leadScore).slice(0, limit);
}

export function getAgentSourcedLeads(
  reports: DealAnalyzerReportRow[],
): DealAnalyzerReportRow[] {
  return reports.filter((r) => r.isAgentSourced);
}

export function getMissingContactReports(
  reports: DealAnalyzerReportRow[],
): DealAnalyzerReportRow[] {
  return reports.filter((r) => r.missingContact);
}

export function matchesRoleFilter(
  role: ClientRole | "all",
  row: DealAnalyzerReportRow,
): boolean {
  return role === "all" || row.role === role;
}

export function countNeedsFollowUp(reports: DealAnalyzerReportRow[]): number {
  return reports.filter((r) => r.needsFollowUp).length;
}
