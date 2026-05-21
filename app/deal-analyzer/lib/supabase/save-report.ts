import { normalizeStoredNarrative, resolveReportNarrative } from "../generate-narrative";
import type { PlaybookNarrative } from "../narrative-types";
import type {
  ClientRole,
  DealAnalysisResult,
  DealInputs,
  LeadCapture,
} from "../types";
import type { LeadConsentRecord } from "../consent";
import type { Json } from "./database.types";
import { fetchAgentById } from "./agents";
import { createServerSupabaseClient } from "./server";

export type SaveReportInput = {
  slug: string;
  lead: LeadCapture;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  narrative?: PlaybookNarrative;
  consent?: LeadConsentRecord;
  agentId?: string | null;
  referralCode?: string | null;
};

export async function saveReportToSupabase(
  input: SaveReportInput,
): Promise<{ slug: string; reportId: string } | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return { error: "Supabase is not configured." };
  }

  const narrative =
    input.narrative ??
    (await resolveReportNarrative({
      dealType: input.inputs.path,
      leadRole: input.lead.role,
      leadName: input.lead.name,
      referralSource: input.lead.referralSource,
      agentName: input.lead.agentName,
      notes: input.lead.notes,
      inputs: input.inputs,
      analysis: input.analysis,
    }));

  const consent = input.consent;

  const { data: leadRow, error: leadError } = await supabase
    .from("deal_analyzer_leads")
    .insert({
      name: input.lead.name,
      email: input.lead.email,
      phone: input.lead.phone,
      role: input.lead.role,
      notes: input.lead.notes || null,
      referral_source: input.lead.referralSource || null,
      agent_name: input.lead.agentName || null,
      agent_id: input.agentId ?? null,
      referral_code: input.referralCode ?? null,
      sms_call_consent: consent?.smsCallConsent ?? input.lead.smsCallConsent,
      consent_text: consent?.consentText ?? null,
      consent_timestamp: consent?.consentTimestamp ?? null,
      consent_ip: consent?.consentIp ?? null,
      consent_user_agent: consent?.consentUserAgent ?? null,
    })
    .select("id")
    .single();

  if (leadError || !leadRow) {
    return { error: leadError?.message ?? "Failed to save lead." };
  }

  const { data: scenarioRow, error: scenarioError } = await supabase
    .from("deal_analyzer_scenarios")
    .insert({
      lead_id: leadRow.id,
      deal_type: input.inputs.path,
      inputs_json: input.inputs as unknown as Json,
      analysis_json: input.analysis as unknown as Json,
    })
    .select("id")
    .single();

  if (scenarioError || !scenarioRow) {
    return { error: scenarioError?.message ?? "Failed to save scenario." };
  }

  const { data: reportRow, error: reportError } = await supabase
    .from("deal_analyzer_reports")
    .insert({
      lead_id: leadRow.id,
      scenario_id: scenarioRow.id,
      report_slug: input.slug,
      narrative_json: narrative as unknown as Json,
      referral_source: input.lead.referralSource || null,
      agent_name: input.lead.agentName || null,
      agent_id: input.agentId ?? null,
      referral_code: input.referralCode ?? null,
      crm_push_status: "not_pushed",
    })
    .select("id")
    .single();

  if (reportError || !reportRow) {
    return { error: reportError?.message ?? "Failed to save report." };
  }

  return { slug: input.slug, reportId: reportRow.id };
}

export async function fetchReportFromSupabase(slug: string) {
  const supabase = createServerSupabaseClient();
  if (!supabase) {
    return { error: "Supabase is not configured." as const };
  }

  const { data: report, error: reportError } = await supabase
    .from("deal_analyzer_reports")
    .select(
      "report_slug, created_at, narrative_json, referral_source, agent_name, agent_id, referral_code, lead_id, scenario_id",
    )
    .eq("report_slug", slug)
    .maybeSingle();

  if (reportError) {
    return { error: reportError.message };
  }

  if (!report) {
    return { error: "Report not found." };
  }

  const [{ data: lead, error: leadError }, { data: scenario, error: scenarioError }] =
    await Promise.all([
      supabase
        .from("deal_analyzer_leads")
        .select(
          "name, email, phone, role, notes, referral_source, agent_name, referral_code, sms_call_consent, consent_text, consent_timestamp, consent_ip, consent_user_agent",
        )
        .eq("id", report.lead_id)
        .single(),
      supabase
        .from("deal_analyzer_scenarios")
        .select("deal_type, inputs_json, analysis_json")
        .eq("id", report.scenario_id)
        .single(),
    ]);

  if (leadError || scenarioError || !lead || !scenario) {
    return { error: "Report not found." };
  }

  let partnerAgentName = lead.agent_name ?? report.agent_name ?? null;
  let partnerBranding = null;
  if (report.agent_id) {
    const agentResult = await fetchAgentById(report.agent_id);
    if (agentResult && !("error" in agentResult)) {
      partnerBranding = agentResult;
      partnerAgentName = agentResult.name;
    }
  }

  const narrative = normalizeStoredNarrative(
    report.narrative_json,
    scenario.inputs_json as unknown as DealInputs,
    scenario.analysis_json as unknown as DealAnalysisResult,
    {
      leadRole: lead.role,
      leadName: lead.name,
      agentName: partnerAgentName ?? undefined,
      partnerAgentName: partnerAgentName ?? undefined,
    },
  );

  return {
    slug: report.report_slug,
    createdAt: report.created_at,
    lead: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      role: lead.role as ClientRole,
      notes: lead.notes ?? "",
      referralSource: lead.referral_source ?? "",
      agentName: partnerAgentName ?? "",
      smsCallConsent: lead.sms_call_consent ?? false,
    },
    consent: {
      smsCallConsent: lead.sms_call_consent ?? false,
      consentText: lead.consent_text,
      consentTimestamp: lead.consent_timestamp,
      consentIp: lead.consent_ip,
      consentUserAgent: lead.consent_user_agent,
    },
    inputs: scenario.inputs_json as unknown as DealInputs,
    analysis: scenario.analysis_json as unknown as DealAnalysisResult,
    narrative,
    referralSource: report.referral_source,
    agentName: partnerAgentName,
    agentId: report.agent_id,
    referralCode: report.referral_code ?? lead.referral_code ?? null,
    partnerAgentName,
    partnerBranding,
  };
}
