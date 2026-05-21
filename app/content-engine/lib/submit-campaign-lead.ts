import { pushLeadToCrm } from "./crm-push";
import { createContentEngineSupabaseClient } from "./supabase/client";
import { getPublishedPageBySlug } from "./published-pages";
import type {
  CampaignLeadPayload,
  CampaignUtmParams,
  CrmTestLeadPayload,
} from "./types";

export type SubmitCampaignLeadResult = {
  success: boolean;
  leadId?: string;
  crmPushStatus?: string;
  crmPushMessage?: string;
  error?: string;
};

function toCrmPayload(
  lead: CampaignLeadPayload,
  utm: CampaignUtmParams,
): CrmTestLeadPayload {
  return {
    firstName: lead.firstName,
    lastName: lead.lastName,
    email: lead.email,
    phone: lead.phone ?? "",
    buyerTimeline: lead.buyerTimeline,
    loanTypeInterest: lead.loanTypeInterest,
    purchasePriceOrLoanAmount: lead.purchasePriceOrLoanAmount,
    creditRange: lead.creditRange,
    agentStatus: lead.agentStatus,
    notes: lead.notes,
    smsCallConsent: lead.smsCallConsent,
    emailOptIn: lead.emailOptIn,
    utmSource: utm.utmSource,
    utmMedium: utm.utmMedium,
    utmCampaign: utm.utmCampaign,
  };
}

export async function submitCampaignLead(input: {
  slug: string;
  lead: CampaignLeadPayload;
  utm: CampaignUtmParams;
}): Promise<SubmitCampaignLeadResult> {
  const supabase = createContentEngineSupabaseClient();
  if (!supabase) {
    return { success: false, error: "Lead capture is not configured." };
  }

  const page = await getPublishedPageBySlug(input.slug);
  if (!page) {
    return { success: false, error: "Campaign not found or unpublished." };
  }

  if (!input.lead.email?.trim() || !input.lead.firstName?.trim()) {
    return { success: false, error: "Name and email are required." };
  }

  let crmPushStatus: string | undefined;
  let crmPushMessage: string | undefined;

  if (
    page.crmIntegration?.automations.pushFromLandingPage &&
    page.crmIntegration
  ) {
    const crmResult = await pushLeadToCrm({
      packageId: page.packageId,
      provider: page.crmIntegration.activeProvider,
      integration: page.crmIntegration,
      lead: toCrmPayload(input.lead, input.utm),
      testMode: false,
    });
    crmPushStatus = crmResult.success ? "pushed" : "failed";
    crmPushMessage = crmResult.message;
  } else {
    crmPushStatus = "skipped";
    crmPushMessage = "CRM push not configured for this campaign.";
  }

  const { data, error } = await supabase
    .from("content_engine_campaign_leads")
    .insert({
      published_page_id: page.id,
      package_id: page.packageId,
      campaign_slug: page.slug,
      lead_json: input.lead,
      utm_source: input.utm.utmSource ?? null,
      utm_medium: input.utm.utmMedium ?? null,
      utm_campaign: input.utm.utmCampaign ?? null,
      utm_term: input.utm.utmTerm ?? null,
      utm_content: input.utm.utmContent ?? null,
      crm_push_status: crmPushStatus,
      crm_push_message: crmPushMessage,
    })
    .select("id")
    .single();

  if (error) {
    return { success: false, error: error.message };
  }

  return {
    success: true,
    leadId: data?.id,
    crmPushStatus,
    crmPushMessage,
  };
}
