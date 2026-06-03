import { processEnrichmentBatch } from "@/lib/leads/enrichment-autosave";
import type { LeadQualityTier } from "@/lib/leads/types";

export type LeadEnrichmentInput = {
  propertyType?: string;
  propertyValueRange?: string;
  mortgageBalanceRange?: string;
  creditScoreRange?: string;
  propertyCount?: string;
  fundingTimeline?: string;
  fundingGoal?: string;
  ownershipType?: string;
};

export type EnrichLeadResult =
  | {
      success: true;
      qualityScore: number;
      qualityTier: LeadQualityTier;
      enrichmentStatus?: string;
      profileStrength?: number;
      enrichmentComplete?: boolean;
    }
  | { success: false; error: string; status: 400 | 404 | 500 };

export async function enrichLeadSubmission(
  leadId: string,
  input: LeadEnrichmentInput,
): Promise<EnrichLeadResult> {
  const updates = Object.fromEntries(
    Object.entries(input).filter(([, value]) => typeof value === "string" && value.trim()),
  );

  const hasAnyField = Object.keys(updates).length > 0;
  if (!hasAnyField) {
    return { success: false, error: "At least one enrichment field is required.", status: 400 };
  }

  const result = await processEnrichmentBatch(leadId, updates);
  if (!result.success) {
    return { success: false, error: result.error, status: result.status };
  }

  return {
    success: true,
    qualityScore: result.qualityScore,
    qualityTier: result.qualityTier,
    enrichmentStatus: result.enrichmentStatus,
    profileStrength: result.profileStrength,
    enrichmentComplete: result.enrichmentComplete,
  };
}
