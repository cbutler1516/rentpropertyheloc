import type { CcmLeadRecord } from "./types";

export type IntegrationResult = {
  ok: true;
  provider: string;
  message: string;
  queuedAt: string;
};

/** Mock CRM handoff — wire to Supabase / GHL / HubSpot later */
export async function sendLeadToCrm(
  lead: CcmLeadRecord,
): Promise<IntegrationResult> {
  const payload = {
    id: lead.id,
    source: lead.source,
    status: lead.status,
    email: lead.intake.sponsorEmail,
    name: lead.intake.sponsorName,
  };

  if (typeof console !== "undefined") {
    console.log("[CCM] sendLeadToCrm (mock)", payload);
  }

  return {
    ok: true,
    provider: "crm-mock",
    message: "Lead queued for CRM sync (mock).",
    queuedAt: new Date().toISOString(),
  };
}

/** Mock executive summary email — wire to Resend later */
export async function sendSummaryEmail(
  lead: CcmLeadRecord,
): Promise<IntegrationResult> {
  const payload = {
    id: lead.id,
    to: lead.intake.sponsorEmail,
    hasRecommendation: Boolean(lead.recommendation),
  };

  if (typeof console !== "undefined") {
    console.log("[CCM] sendSummaryEmail (mock)", payload);
  }

  return {
    ok: true,
    provider: "email-mock",
    message: "Summary email queued (mock).",
    queuedAt: new Date().toISOString(),
  };
}

/** Mock advisor notification — wire to Slack / SMS later */
export async function notifyChris(
  lead: CcmLeadRecord,
): Promise<IntegrationResult> {
  const payload = {
    id: lead.id,
    source: lead.source,
    qualityTag: lead.qualityTag,
    followUp: lead.recommendedFollowUp,
  };

  if (typeof console !== "undefined") {
    console.log("[CCM] notifyChris (mock)", payload);
  }

  return {
    ok: true,
    provider: "notify-mock",
    message: "Advisor notification queued (mock).",
    queuedAt: new Date().toISOString(),
  };
}

/** Run all mock integrations after lead capture */
export async function dispatchLeadIntegrations(
  lead: CcmLeadRecord,
): Promise<void> {
  await Promise.all([
    sendLeadToCrm(lead),
    sendSummaryEmail(lead),
    notifyChris(lead),
  ]);
}
