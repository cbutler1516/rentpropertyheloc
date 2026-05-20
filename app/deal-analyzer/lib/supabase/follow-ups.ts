import { getSiteUrl } from "./env";
import { resolveFollowUpContent } from "../generate-follow-up";
import type {
  DealAnalyzerFollowUpRecord,
  FollowUpStatus,
  GeneratedFollowUp,
  LeadStatus,
} from "../follow-up-types";
import type {
  DealAnalysisResult,
  DealInputs,
  LeadCapture,
} from "../types";
import type { Json } from "./database.types";
import { createServerSupabaseClient } from "./server";
import { fetchReportFromSupabase } from "./save-report";

function mapFollowUpRow(row: {
  id: string;
  report_id: string;
  lead_id: string;
  scenario_id: string;
  text_message: string | null;
  email_subject: string | null;
  email_body: string | null;
  agent_partner_message: string | null;
  call_notes: Json;
  priority_reason: string | null;
  recommended_timing: string | null;
  status: string;
  last_contacted_at: string | null;
  next_follow_up_at: string | null;
  created_at: string;
  updated_at: string;
}): DealAnalyzerFollowUpRecord {
  const callNotes = Array.isArray(row.call_notes)
    ? (row.call_notes as string[]).filter((n) => typeof n === "string")
    : [];

  return {
    id: row.id,
    reportId: row.report_id,
    leadId: row.lead_id,
    scenarioId: row.scenario_id,
    textMessage: row.text_message ?? "",
    emailSubject: row.email_subject ?? "",
    emailBody: row.email_body ?? "",
    agentPartnerMessage: row.agent_partner_message ?? "",
    callNotes,
    priorityReason: row.priority_reason ?? "",
    recommendedTiming: row.recommended_timing ?? "",
    status: (row.status as FollowUpStatus) || "draft",
    lastContactedAt: row.last_contacted_at,
    nextFollowUpAt: row.next_follow_up_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function fetchFollowUpByReportId(
  reportId: string,
): Promise<DealAnalyzerFollowUpRecord | null | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { data, error } = await supabase
    .from("deal_analyzer_followups")
    .select("*")
    .eq("report_id", reportId)
    .maybeSingle();

  if (error) return { error: error.message };
  if (!data) return null;
  return mapFollowUpRow(data);
}

export async function fetchFollowUpsByReportIds(
  reportIds: string[],
): Promise<Map<string, DealAnalyzerFollowUpRecord> | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return new Map();

  if (!reportIds.length) return new Map();

  const { data, error } = await supabase
    .from("deal_analyzer_followups")
    .select("*")
    .in("report_id", reportIds);

  if (error) return { error: error.message };

  const map = new Map<string, DealAnalyzerFollowUpRecord>();
  for (const row of data ?? []) {
    map.set(row.report_id, mapFollowUpRow(row));
  }
  return map;
}

export async function generateAndSaveFollowUp(
  reportId: string,
): Promise<
  | { followUp: DealAnalyzerFollowUpRecord; source: "ai" | "static" }
  | { error: string }
> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { data: report, error: reportError } = await supabase
    .from("deal_analyzer_reports")
    .select("id, report_slug, lead_id, scenario_id, narrative_json")
    .eq("id", reportId)
    .maybeSingle();

  if (reportError || !report) {
    return { error: "Report not found." };
  }

  const full = await fetchReportFromSupabase(report.report_slug);
  if ("error" in full) return { error: full.error };

  const siteUrl = getSiteUrl();
  const { followUp, source } = await resolveFollowUpContent({
    lead: full.lead,
    inputs: full.inputs,
    analysis: full.analysis,
    narrative: full.narrative,
    reportSlug: full.slug,
    siteUrl,
  });

  const saved = await upsertFollowUp({
    reportId: report.id,
    leadId: report.lead_id,
    scenarioId: report.scenario_id,
    followUp,
    status: "active",
  });

  if ("error" in saved) return saved;

  await supabase
    .from("deal_analyzer_leads")
    .update({
      lead_status: "Followed Up",
      next_follow_up_at: saved.followUp.nextFollowUpAt,
    })
    .eq("id", report.lead_id);

  return { followUp: saved.followUp, source };
}

export async function upsertFollowUp(input: {
  reportId: string;
  leadId: string;
  scenarioId: string;
  followUp: GeneratedFollowUp;
  status?: FollowUpStatus;
  lastContactedAt?: string | null;
  nextFollowUpAt?: string | null;
}): Promise<
  { followUp: DealAnalyzerFollowUpRecord } | { error: string }
> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const nextFollowUpAt =
    input.nextFollowUpAt ??
    defaultNextFollowUpDate(input.followUp.recommendedTiming);

  const payload = {
    report_id: input.reportId,
    lead_id: input.leadId,
    scenario_id: input.scenarioId,
    text_message: input.followUp.textMessage,
    email_subject: input.followUp.emailSubject,
    email_body: input.followUp.emailBody,
    agent_partner_message: input.followUp.agentPartnerMessage,
    call_notes: input.followUp.callNotes as unknown as Json,
    priority_reason: input.followUp.priorityReason,
    recommended_timing: input.followUp.recommendedTiming,
    status: input.status ?? "active",
    last_contacted_at: input.lastContactedAt ?? null,
    next_follow_up_at: nextFollowUpAt,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("deal_analyzer_followups")
    .upsert(payload, { onConflict: "report_id" })
    .select("*")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Failed to save follow-up." };
  }

  return { followUp: mapFollowUpRow(data) };
}

export async function updateFollowUpWorkflow(input: {
  followUpId: string;
  followUp?: Partial<GeneratedFollowUp>;
  status?: FollowUpStatus;
  lastContactedAt?: string | null;
  nextFollowUpAt?: string | null;
  leadStatus?: LeadStatus;
  leadId: string;
}): Promise<
  { followUp: DealAnalyzerFollowUpRecord } | { error: string }
> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const patch: Record<string, unknown> = {
    updated_at: new Date().toISOString(),
  };

  const fu = input.followUp;
  if (fu) {
    if (fu.textMessage !== undefined) patch.text_message = fu.textMessage;
    if (fu.emailSubject !== undefined) patch.email_subject = fu.emailSubject;
    if (fu.emailBody !== undefined) patch.email_body = fu.emailBody;
    if (fu.agentPartnerMessage !== undefined) {
      patch.agent_partner_message = fu.agentPartnerMessage;
    }
    if (fu.callNotes !== undefined) patch.call_notes = fu.callNotes as unknown as Json;
    if (fu.priorityReason !== undefined) patch.priority_reason = fu.priorityReason;
    if (fu.recommendedTiming !== undefined) {
      patch.recommended_timing = fu.recommendedTiming;
    }
  }
  if (input.status) patch.status = input.status;
  if (input.lastContactedAt !== undefined) {
    patch.last_contacted_at = input.lastContactedAt;
  }
  if (input.nextFollowUpAt !== undefined) {
    patch.next_follow_up_at = input.nextFollowUpAt;
  }

  const { data, error } = await supabase
    .from("deal_analyzer_followups")
    .update(patch)
    .eq("id", input.followUpId)
    .select("*")
    .single();

  if (error || !data) {
    return { error: error?.message ?? "Failed to update follow-up." };
  }

  const leadPatch: Record<string, unknown> = {};
  if (input.leadStatus) leadPatch.lead_status = input.leadStatus;
  if (input.lastContactedAt !== undefined) {
    leadPatch.last_contacted_at = input.lastContactedAt;
  }
  if (input.nextFollowUpAt !== undefined) {
    leadPatch.next_follow_up_at = input.nextFollowUpAt;
  }

  if (Object.keys(leadPatch).length > 0) {
    await supabase
      .from("deal_analyzer_leads")
      .update(leadPatch)
      .eq("id", input.leadId);
  }

  return { followUp: mapFollowUpRow(data) };
}

function defaultNextFollowUpDate(recommendedTiming: string): string {
  const lower = recommendedTiming.toLowerCase();
  const date = new Date();
  if (lower.includes("24") || lower.includes("today") || lower.includes("asap")) {
    date.setDate(date.getDate() + 1);
  } else if (lower.includes("week")) {
    date.setDate(date.getDate() + 3);
  } else {
    date.setDate(date.getDate() + 2);
  }
  date.setHours(10, 0, 0, 0);
  return date.toISOString();
}

export function reportNeedsFollowUp(row: {
  leadStatus: LeadStatus;
  nextFollowUpAt: string | null;
  hasFollowUp: boolean;
}): boolean {
  if (row.leadStatus === "Archived" || row.leadStatus === "Not Ready") {
    return false;
  }
  if (row.leadStatus === "New") return true;
  if (row.nextFollowUpAt && new Date(row.nextFollowUpAt) <= new Date()) {
    return true;
  }
  if (!row.hasFollowUp && row.leadStatus !== "Appointment Set") return true;
  return false;
}
