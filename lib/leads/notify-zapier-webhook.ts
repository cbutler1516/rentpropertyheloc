import { isZapierWebhookConfigured } from "@/lib/leads/pipeline-health";
import { resolveRecommendedProduct } from "@/lib/leads/recommended-product";
import { buildFunnelAnswers } from "@/lib/leads/save-lead-submission";
import type { StoredLead } from "@/lib/leads/types";

export type ZapierWebhookResult = {
  sent: boolean;
  skipped?: boolean;
  status?: number;
  error?: string;
};

export function buildZapierLeadPayload(
  lead: StoredLead,
  submissionId: string,
): Record<string, unknown> {
  const recommendedProduct = resolveRecommendedProduct(lead);

  return {
    event: "lead_submitted",
    submissionId,
    submissionTimestamp: lead.createdAt,
    leadId: lead.id,
    leadScore: lead.qualityScore,
    qualityTier: lead.qualityTier,
    recommendedProduct,
    recommendedFollowUp: lead.recommendedFollowUp,
    keyReasons: lead.keyReasons,
    routingTier: lead.routingTier,
    routingLabel: lead.routingLabel,
    recommendedAction: lead.recommendedAction,
    routingReasons: lead.routingReasons,
    routingConfidence: lead.routingConfidence,
    secondLienFit: lead.secondLienFit,
    funnelAnswers: buildFunnelAnswers(lead),
    lead: {
      journey: lead.journey,
      funnelVersion: lead.funnelVersion,
      firstName: lead.firstName,
      lastName: lead.lastName,
      email: lead.email,
      phone: lead.phone,
      propertyType: lead.propertyType,
      propertyStreet: lead.propertyStreet,
      propertyCity: lead.propertyCity,
      propertyState: lead.propertyState,
      propertyZip: lead.propertyZip,
      googlePlaceId: lead.googlePlaceId,
      propertyValueRange: lead.propertyValueRange,
      mortgageBalanceRange: lead.mortgageBalanceRange,
      equityAccessRange: lead.equityAccessRange,
      creditScoreRange: lead.creditScoreRange,
      creditScoreEstimate: lead.creditScoreEstimate,
      propertyCount: lead.propertyCount,
      fundingTimeline: lead.fundingTimeline,
      propertyRented: lead.propertyRented,
      propertyValue: lead.propertyValue,
      mortgageBalance: lead.mortgageBalance,
      desiredFunds: lead.desiredFunds,
      estimatedEquity: lead.estimatedEquity,
      estimatedHeloc: lead.estimatedHeloc,
      estimatedHelocLow: lead.estimatedHelocLow,
      estimatedHelocHigh: lead.estimatedHelocHigh,
      avmSource: lead.avmSource,
      propertySqft: lead.propertySqft,
      propertyBeds: lead.propertyBeds,
      propertyBaths: lead.propertyBaths,
      propertyYearBuilt: lead.propertyYearBuilt,
      propertyLatitude: lead.propertyLatitude,
      propertyLongitude: lead.propertyLongitude,
      estimatedRent: lead.estimatedRent,
      propertyValueLow: lead.propertyValueLow,
      propertyValueHigh: lead.propertyValueHigh,
      mortgageBalanceLow: lead.mortgageBalanceLow,
      mortgageBalanceHigh: lead.mortgageBalanceHigh,
      lastSaleDate: lead.lastSaleDate,
      lastSalePrice: lead.lastSalePrice,
      recordedMortgageAmount: lead.recordedMortgageAmount,
      actualMortgageBalance: lead.actualMortgageBalance,
      useMortgageEstimate: lead.useMortgageEstimate,
      fundingGoal: lead.fundingGoal,
      funnelStepCompleted: lead.funnelStepCompleted,
      targetCltvPercent: lead.targetCltvPercent,
      investorScore: lead.investorScore,
      confidenceRating: lead.confidenceRating,
      valuationLastUpdated: lead.valuationLastUpdated,
      tcpaConsent: lead.tcpaConsent,
      tcpaConsentAt: lead.tcpaConsentAt,
      marketingOptIn: lead.marketingOptIn,
      source: lead.source,
      sourceUrl: lead.sourceUrl,
      queryParams: lead.queryParams,
      utm: lead.utm,
      createdAt: lead.createdAt,
    },
  };
}

export async function notifyZapierLeadWebhook(
  lead: StoredLead,
  submissionId: string,
): Promise<ZapierWebhookResult> {
  const webhookUrl = process.env.ZAPIER_WEBHOOK_URL?.trim();

  if (!isZapierWebhookConfigured() || !webhookUrl) {
    console.info("[leads/zapier] skipped — ZAPIER_WEBHOOK_URL not configured");
    return { sent: false, skipped: true };
  }

  const payload = buildZapierLeadPayload(lead, submissionId);

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
      cache: "no-store",
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.error("[leads/zapier] webhook failed", {
        leadId: lead.id,
        submissionId,
        status: response.status,
        detail: detail.slice(0, 300),
      });
      return {
        sent: false,
        status: response.status,
        error: detail.slice(0, 300) || `HTTP ${response.status}`,
      };
    }

    console.info("[leads/zapier] webhook delivered", {
      leadId: lead.id,
      submissionId,
      status: response.status,
    });

    return { sent: true, status: response.status };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[leads/zapier] webhook error", {
      leadId: lead.id,
      submissionId,
      error: message,
    });
    return { sent: false, error: message };
  }
}
