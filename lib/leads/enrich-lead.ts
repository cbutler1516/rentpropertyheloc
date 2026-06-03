import { syncLeadToHubSpotDetailed } from "@/lib/crm/hubspot";
import { LEAD_SOURCE } from "@/lib/leads/constants";
import { isValidPropertyType } from "@/lib/leads/funnel-config";
import {
  computeEstimatedEquity,
  getCreditScoreEstimate,
  getMortgageBalanceEstimate,
  getPropertyValueEstimate,
  type CreditScoreRangeId,
  type MortgageBalanceRangeId,
  type PropertyValueRangeId,
} from "@/lib/leads/funnel-ranges";
import { getJourneySlugForPropertyType } from "@/lib/leads/investor-journeys";
import { applyLeadQualification } from "@/lib/leads/score-lead";
import {
  getLeadSubmissionById,
  leadSubmissionToStoredLead,
  submissionToLeadCreateRequest,
  updateLeadSubmissionAfterEnrichment,
} from "@/lib/leads/save-lead-submission";
import type { LeadCreateRequest, ScoredLeadCreateRequest } from "@/lib/leads/types";

export type LeadEnrichmentInput = {
  propertyType?: string;
  propertyValueRange?: string;
  mortgageBalanceRange?: string;
  creditScoreRange?: string;
  propertyCount?: string;
  fundingTimeline?: string;
};

export type EnrichLeadResult =
  | { success: true; routingTier: string; routingConfidence: string }
  | { success: false; error: string; status: 400 | 404 | 500 };

function mergeEnrichment(lead: LeadCreateRequest, input: LeadEnrichmentInput): LeadCreateRequest {
  const next = { ...lead };

  const propertyTypeRaw = input.propertyType?.trim();
  if (propertyTypeRaw && isValidPropertyType(propertyTypeRaw)) {
    next.propertyType = propertyTypeRaw;
    next.journey = getJourneySlugForPropertyType(propertyTypeRaw) ?? next.journey;
  }

  if (input.propertyValueRange?.trim()) {
    next.propertyValueRange = input.propertyValueRange.trim();
    next.propertyValue = getPropertyValueEstimate(input.propertyValueRange as PropertyValueRangeId);
  }

  if (input.mortgageBalanceRange?.trim()) {
    next.mortgageBalanceRange = input.mortgageBalanceRange.trim();
    next.mortgageBalance = getMortgageBalanceEstimate(
      input.mortgageBalanceRange as MortgageBalanceRangeId,
    );
  }

  if (input.creditScoreRange?.trim()) {
    next.creditScoreRange = input.creditScoreRange.trim();
    next.creditScoreEstimate = getCreditScoreEstimate(input.creditScoreRange as CreditScoreRangeId);
  }

  if (input.propertyCount?.trim()) next.propertyCount = input.propertyCount.trim();
  if (input.fundingTimeline?.trim()) next.fundingTimeline = input.fundingTimeline.trim();

  if (next.propertyValue != null && next.mortgageBalance != null) {
    next.estimatedEquity = computeEstimatedEquity(next.propertyValue, next.mortgageBalance);
  }

  return next;
}

export async function enrichLeadSubmission(
  leadId: string,
  input: LeadEnrichmentInput,
): Promise<EnrichLeadResult> {
  const hasAnyField = Object.values(input).some((value) => value?.trim());
  if (!hasAnyField) {
    return { success: false, error: "At least one enrichment field is required.", status: 400 };
  }

  const submission = await getLeadSubmissionById(leadId);
  if (!submission) {
    return { success: false, error: "Lead not found.", status: 404 };
  }

  try {
    const baseLead = submissionToLeadCreateRequest(submission);
    const mergedLead = mergeEnrichment(baseLead, input);
    const scoredLead: ScoredLeadCreateRequest = applyLeadQualification(mergedLead);

    await updateLeadSubmissionAfterEnrichment(submission.id, scoredLead);

    const updatedSubmission = (await getLeadSubmissionById(submission.id)) ?? submission;
    const storedLead = leadSubmissionToStoredLead(updatedSubmission, scoredLead);

    await syncLeadToHubSpotDetailed(storedLead);

    console.info("[leads/enrich] updated", {
      leadId,
      routingTier: scoredLead.routingTier,
      routingConfidence: scoredLead.routingConfidence,
    });

    return {
      success: true,
      routingTier: scoredLead.routingTier,
      routingConfidence: scoredLead.routingConfidence,
    };
  } catch (error) {
    console.error("[leads/enrich] failed", error);
    return { success: false, error: "Enrichment update failed.", status: 500 };
  }
}
