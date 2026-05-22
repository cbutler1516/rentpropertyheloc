import { buildCrmReportPayload, buildCrmTestPayload } from "./build-payload";
import { isCrmPushConfigured } from "./env";
import { logCrmPush } from "./log";
import { pushPayloadToCrmWebhooks } from "./webhook";
import type { CrmPushReportResult, CrmPushStatus, DealAnalyzerCrmReportPayload } from "./types";
import { fetchAgentById } from "../supabase/agents";
import { insertDealAnalyzerEvent } from "../supabase/events";
import { fetchFollowUpByReportId } from "../supabase/follow-ups";
import { createServerSupabaseClient } from "../supabase/server";

async function updateCrmPushStatus(
  reportId: string,
  patch: {
    status: CrmPushStatus;
    error?: string | null;
    externalId?: string | null;
  },
): Promise<{ ok: true } | { error: string }> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { error } = await supabase
    .from("deal_analyzer_reports")
    .update({
      crm_push_status: patch.status,
      crm_last_pushed_at: patch.status === "pushed" ? new Date().toISOString() : undefined,
      crm_push_error: patch.status === "failed" ? patch.error ?? "Push failed." : null,
      crm_external_id: patch.externalId ?? null,
    })
    .eq("id", reportId);

  if (error) return { error: error.message };
  return { ok: true };
}

async function loadReportForCrmPush(
  reportId: string,
): Promise<
  | { payload: DealAnalyzerCrmReportPayload }
  | { error: string }
> {
  const supabase = createServerSupabaseClient();
  if (!supabase) return { error: "Supabase is not configured." };

  const { data: report, error: reportError } = await supabase
    .from("deal_analyzer_reports")
    .select(
      "id, created_at, report_slug, agent_name, agent_id, referral_code, referral_source, narrative_json, lead_id, scenario_id",
    )
    .eq("id", reportId)
    .maybeSingle();

  if (reportError) return { error: reportError.message };
  if (!report) return { error: "Report not found." };

  const [{ data: lead, error: leadError }, { data: scenario, error: scenarioError }] =
    await Promise.all([
      supabase
        .from("deal_analyzer_leads")
        .select(
          "name, email, phone, role, notes, referral_source, agent_name, agent_id, referral_code, sms_call_consent, consent_text, consent_timestamp, consent_ip, lead_status",
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
    return { error: "Report data incomplete." };
  }

  const followUpResult = await fetchFollowUpByReportId(report.id);
  const followUp =
    followUpResult && !("error" in followUpResult) ? followUpResult : null;

  let partnerSlug: string | null = null;
  if (report.agent_id) {
    const agent = await fetchAgentById(report.agent_id);
    if (agent && !("error" in agent)) partnerSlug = agent.slug;
  }

  const payload = buildCrmReportPayload({
    reportId: report.id,
    reportSlug: report.report_slug,
    createdAt: report.created_at,
    agentId: report.agent_id,
    agentName: report.agent_name,
    referralCode: report.referral_code,
    referralSource: report.referral_source,
    narrativeJson: report.narrative_json,
    lead,
    scenario,
    followUp,
    partnerSlug,
    event: "manual_push",
  });

  return { payload };
}

export async function pushDealAnalyzerReportToCrm(options: {
  reportId: string;
  event?: DealAnalyzerCrmReportPayload["event"];
}): Promise<CrmPushReportResult> {
  if (!isCrmPushConfigured()) {
    return {
      success: false,
      reportId: options.reportId,
      status: "failed",
      provider: "none",
      message: "CRM webhooks are not configured.",
      error: "Set GHL_WEBHOOK_URL and/or ZAPIER_WEBHOOK_URL.",
    };
  }

  const loaded = await loadReportForCrmPush(options.reportId);
  if ("error" in loaded) {
    return {
      success: false,
      reportId: options.reportId,
      status: "failed",
      provider: "none",
      message: loaded.error,
      error: loaded.error,
    };
  }

  const payload = {
    ...loaded.payload,
    event: options.event ?? loaded.payload.event,
  };

  logCrmPush("info", "push_start", {
    reportId: payload.reportId,
    event: payload.event,
    slug: payload.reportSlug,
  });

  const webhookResult = await pushPayloadToCrmWebhooks(payload);

  if (webhookResult.success) {
    await updateCrmPushStatus(options.reportId, {
      status: "pushed",
      error: null,
      externalId: webhookResult.externalId ?? null,
    });
    void insertDealAnalyzerEvent({
      eventName: "crm_push_succeeded",
      reportId: options.reportId,
      dealType: payload.dealType,
      metadata: { provider: webhookResult.provider },
    });
    return {
      success: true,
      reportId: options.reportId,
      status: "pushed",
      provider: webhookResult.provider,
      message: webhookResult.message,
      externalId: webhookResult.externalId ?? null,
    };
  }

  await updateCrmPushStatus(options.reportId, {
    status: "failed",
    error: webhookResult.message,
    externalId: webhookResult.externalId ?? null,
  });

  void insertDealAnalyzerEvent({
    eventName: "crm_push_failed",
    reportId: options.reportId,
    dealType: payload.dealType,
    metadata: {
      provider: webhookResult.provider,
      error: webhookResult.message.slice(0, 200),
    },
  });

  return {
    success: false,
    reportId: options.reportId,
    status: "failed",
    provider: webhookResult.provider,
    message: webhookResult.message,
    error: webhookResult.message,
    externalId: webhookResult.externalId ?? null,
  };
}

export async function pushDealAnalyzerTestToCrm(): Promise<CrmPushReportResult> {
  if (!isCrmPushConfigured()) {
    return {
      success: false,
      reportId: "test",
      status: "failed",
      provider: "none",
      message: "CRM webhooks are not configured.",
      error: "Set GHL_WEBHOOK_URL and/or ZAPIER_WEBHOOK_URL.",
    };
  }

  const payload = buildCrmTestPayload();
  logCrmPush("info", "test_push_start", { slug: payload.reportSlug });

  const webhookResult = await pushPayloadToCrmWebhooks(payload);

  return {
    success: webhookResult.success,
    reportId: "test",
    status: webhookResult.success ? "pushed" : "failed",
    provider: webhookResult.provider,
    message: webhookResult.message,
    error: webhookResult.success ? null : webhookResult.message,
    externalId: webhookResult.externalId ?? null,
  };
}

export async function pushDealAnalyzerReportAfterCreate(
  reportId: string,
): Promise<void> {
  try {
    await pushDealAnalyzerReportToCrm({
      reportId,
      event: "report_created",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Auto CRM push failed.";
    logCrmPush("error", "auto_push_exception", { reportId, error: message });
    await updateCrmPushStatus(reportId, {
      status: "failed",
      error: message,
    });
  }
}
