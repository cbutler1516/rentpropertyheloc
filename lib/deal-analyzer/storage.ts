import {
  getSupabaseRestBase,
  getSupabaseRestHeaders,
  getSupabaseServiceRoleKey,
  isSupabaseConfigured,
} from "@/lib/supabase/config";
import { DEAL_ANALYZER_CONSENT_TEXT } from "@/lib/deal-analyzer/constants";
import { generateReportSlug } from "@/lib/deal-analyzer/slug";
import { buildNarrativeFromAnalysis } from "@/lib/deal-analyzer/narrative";
import type {
  AnalysisResult,
  DealAnalyzerLeadInput,
  DealType,
  FullDealAnalyzerReport,
  StoredDealAnalyzerLead,
  StoredDealAnalyzerReport,
  StoredDealAnalyzerScenario,
} from "@/lib/deal-analyzer/types";

type CreateReportParams = {
  lead: DealAnalyzerLeadInput;
  dealType: DealType;
  inputs: Record<string, unknown>;
  analysis: AnalysisResult;
  consentIp?: string;
  consentUserAgent?: string;
};

async function supabaseInsert<T>(table: string, row: Record<string, unknown>): Promise<T> {
  const base = getSupabaseRestBase();
  const key = getSupabaseServiceRoleKey();
  if (!base || !key) throw new Error("Supabase not configured");

  const response = await fetch(`${base}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      ...getSupabaseRestHeaders(key),
      Prefer: "return=representation",
    },
    body: JSON.stringify(row),
  });

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(`Supabase insert into ${table} failed (${response.status}): ${detail}`);
  }

  const rows = (await response.json()) as T[];
  return rows[0];
}

export function isDealAnalyzerPersistenceEnabled(): boolean {
  return isSupabaseConfigured();
}

export async function createDealAnalyzerReport(
  params: CreateReportParams,
): Promise<{ full: FullDealAnalyzerReport; localOnly: boolean }> {
  const consentTimestamp = new Date().toISOString();
  const reportSlug = generateReportSlug();
  const narrative = buildNarrativeFromAnalysis(params.analysis, params.lead.name);

  if (!isSupabaseConfigured()) {
    const id = `local-${Date.now()}`;
    const lead: StoredDealAnalyzerLead = {
      ...params.lead,
      id,
      consentText: DEAL_ANALYZER_CONSENT_TEXT,
      consentTimestamp,
      consentIp: params.consentIp,
      consentUserAgent: params.consentUserAgent,
      createdAt: consentTimestamp,
    };
    const scenario: StoredDealAnalyzerScenario = {
      id: `local-scenario-${id}`,
      leadId: id,
      dealType: params.dealType,
      inputsJson: params.inputs,
      analysisJson: params.analysis,
      createdAt: consentTimestamp,
    };
    const report: StoredDealAnalyzerReport = {
      id: `local-report-${id}`,
      leadId: id,
      scenarioId: scenario.id,
      reportSlug,
      narrativeJson: narrative,
      createdAt: consentTimestamp,
    };
    return {
      full: { report, lead, scenario },
      localOnly: true,
    };
  }

  const leadRow = await supabaseInsert<{
    id: string;
    created_at: string;
    name: string;
    email: string;
    phone: string | null;
    role: string | null;
    notes: string | null;
    sms_call_consent: boolean;
    consent_text: string;
    consent_timestamp: string;
    consent_ip: string | null;
    consent_user_agent: string | null;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_term: string | null;
    utm_content: string | null;
    session_id: string | null;
  }>("deal_analyzer_leads", {
    name: params.lead.name.trim(),
    email: params.lead.email.trim().toLowerCase(),
    phone: params.lead.phone?.trim() || null,
    role: params.lead.role?.trim() || null,
    notes: params.lead.notes?.trim() || null,
    sms_call_consent: params.lead.smsCallConsent,
    consent_text: DEAL_ANALYZER_CONSENT_TEXT,
    consent_timestamp: consentTimestamp,
    consent_ip: params.consentIp || null,
    consent_user_agent: params.consentUserAgent || null,
    utm_source: params.lead.utmSource || null,
    utm_medium: params.lead.utmMedium || null,
    utm_campaign: params.lead.utmCampaign || null,
    utm_term: params.lead.utmTerm || null,
    utm_content: params.lead.utmContent || null,
    session_id: params.lead.sessionId || null,
  });

  const scenarioRow = await supabaseInsert<{
    id: string;
    lead_id: string;
    deal_type: string;
    inputs_json: Record<string, unknown>;
    analysis_json: AnalysisResult;
    created_at: string;
  }>("deal_analyzer_scenarios", {
    lead_id: leadRow.id,
    deal_type: params.dealType,
    inputs_json: params.inputs,
    analysis_json: params.analysis,
  });

  const reportRow = await supabaseInsert<{
    id: string;
    lead_id: string;
    scenario_id: string;
    report_slug: string;
    narrative_json: typeof narrative;
    created_at: string;
  }>("deal_analyzer_reports", {
    lead_id: leadRow.id,
    scenario_id: scenarioRow.id,
    report_slug: reportSlug,
    narrative_json: narrative,
  });

  const lead: StoredDealAnalyzerLead = {
    id: leadRow.id,
    name: leadRow.name,
    email: leadRow.email,
    phone: leadRow.phone ?? undefined,
    role: leadRow.role ?? undefined,
    notes: leadRow.notes ?? undefined,
    smsCallConsent: leadRow.sms_call_consent,
    sessionId: leadRow.session_id ?? undefined,
    utmSource: leadRow.utm_source ?? undefined,
    utmMedium: leadRow.utm_medium ?? undefined,
    utmCampaign: leadRow.utm_campaign ?? undefined,
    utmTerm: leadRow.utm_term ?? undefined,
    utmContent: leadRow.utm_content ?? undefined,
    consentText: leadRow.consent_text,
    consentTimestamp: leadRow.consent_timestamp,
    consentIp: leadRow.consent_ip ?? undefined,
    consentUserAgent: leadRow.consent_user_agent ?? undefined,
    createdAt: leadRow.created_at,
  };

  const scenario: StoredDealAnalyzerScenario = {
    id: scenarioRow.id,
    leadId: scenarioRow.lead_id,
    dealType: scenarioRow.deal_type as DealType,
    inputsJson: scenarioRow.inputs_json,
    analysisJson: scenarioRow.analysis_json,
    createdAt: scenarioRow.created_at,
  };

  const report: StoredDealAnalyzerReport = {
    id: reportRow.id,
    leadId: reportRow.lead_id,
    scenarioId: reportRow.scenario_id,
    reportSlug: reportRow.report_slug,
    narrativeJson: reportRow.narrative_json,
    createdAt: reportRow.created_at,
  };

  return { full: { report, lead, scenario }, localOnly: false };
}

export async function getDealAnalyzerReportBySlug(slug: string): Promise<FullDealAnalyzerReport | null> {
  const base = getSupabaseRestBase();
  const key = getSupabaseServiceRoleKey();
  if (!base || !key) return null;

  const reportRes = await fetch(
    `${base}/rest/v1/deal_analyzer_reports?report_slug=eq.${encodeURIComponent(slug)}&limit=1`,
    { headers: getSupabaseRestHeaders(key) },
  );
  if (!reportRes.ok) return null;
  const reportRows = (await reportRes.json()) as Array<{
    id: string;
    lead_id: string;
    scenario_id: string;
    report_slug: string;
    narrative_json: FullDealAnalyzerReport["report"]["narrativeJson"];
    created_at: string;
  }>;
  const reportRow = reportRows[0];
  if (!reportRow) return null;

  const leadRes = await fetch(
    `${base}/rest/v1/deal_analyzer_leads?id=eq.${encodeURIComponent(reportRow.lead_id)}&limit=1`,
    { headers: getSupabaseRestHeaders(key) },
  );
  const scenarioRes = await fetch(
    `${base}/rest/v1/deal_analyzer_scenarios?id=eq.${encodeURIComponent(reportRow.scenario_id)}&limit=1`,
    { headers: getSupabaseRestHeaders(key) },
  );
  if (!leadRes.ok || !scenarioRes.ok) return null;

  const leadRows = (await leadRes.json()) as Array<{
    id: string;
    name: string;
    email: string;
    phone: string | null;
    role: string | null;
    notes: string | null;
    sms_call_consent: boolean;
    consent_text: string;
    consent_timestamp: string;
    consent_ip: string | null;
    consent_user_agent: string | null;
    utm_source: string | null;
    utm_medium: string | null;
    utm_campaign: string | null;
    utm_term: string | null;
    utm_content: string | null;
    session_id: string | null;
    created_at: string;
  }>;
  const scenarioRows = (await scenarioRes.json()) as Array<{
    id: string;
    lead_id: string;
    deal_type: string;
    inputs_json: Record<string, unknown>;
    analysis_json: AnalysisResult;
    created_at: string;
  }>;

  const leadRow = leadRows[0];
  const scenarioRow = scenarioRows[0];
  if (!leadRow || !scenarioRow) return null;

  return {
    report: {
      id: reportRow.id,
      leadId: reportRow.lead_id,
      scenarioId: reportRow.scenario_id,
      reportSlug: reportRow.report_slug,
      narrativeJson: reportRow.narrative_json,
      createdAt: reportRow.created_at,
    },
    lead: {
      id: leadRow.id,
      name: leadRow.name,
      email: leadRow.email,
      phone: leadRow.phone ?? undefined,
      role: leadRow.role ?? undefined,
      notes: leadRow.notes ?? undefined,
      smsCallConsent: leadRow.sms_call_consent,
      sessionId: leadRow.session_id ?? undefined,
      utmSource: leadRow.utm_source ?? undefined,
      utmMedium: leadRow.utm_medium ?? undefined,
      utmCampaign: leadRow.utm_campaign ?? undefined,
      utmTerm: leadRow.utm_term ?? undefined,
      utmContent: leadRow.utm_content ?? undefined,
      consentText: leadRow.consent_text,
      consentTimestamp: leadRow.consent_timestamp,
      consentIp: leadRow.consent_ip ?? undefined,
      consentUserAgent: leadRow.consent_user_agent ?? undefined,
      createdAt: leadRow.created_at,
    },
    scenario: {
      id: scenarioRow.id,
      leadId: scenarioRow.lead_id,
      dealType: scenarioRow.deal_type as DealType,
      inputsJson: scenarioRow.inputs_json,
      analysisJson: scenarioRow.analysis_json,
      createdAt: scenarioRow.created_at,
    },
  };
}
