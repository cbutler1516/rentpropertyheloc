import { syncLeadToHubSpotDetailed } from "@/lib/crm/hubspot";
import {
  buildEnrichmentPayload,
  enrichmentDataFromLead,
  mergeEnrichmentIntoLead,
  type EnrichmentFieldKey,
  type EnrichmentFieldUpdate,
} from "@/lib/leads/enrichment-fields";
import {
  parseEnrichmentTimestamps,
  resolveEnrichmentTimestamps,
  type EnrichmentStatus,
} from "@/lib/leads/enrichment-status";
import {
  calculateProfileStrength,
  isEnrichmentDataComplete,
} from "@/lib/leads/investor-review-gamification";
import { notifyZapierEnrichmentWebhook } from "@/lib/leads/notify-zapier-webhook";
import { applyLeadQualification } from "@/lib/leads/score-lead";
import {
  getLeadSubmissionById,
  leadSubmissionToStoredLead,
  submissionToLeadCreateRequest,
  updateLeadSubmissionAfterEnrichment,
} from "@/lib/leads/save-lead-submission";
import type { LeadQualityTier, ScoredLeadCreateRequest } from "@/lib/leads/types";

export type EnrichmentAutosaveResult =
  | {
      success: true;
      enrichmentStatus: EnrichmentStatus | "";
      profileStrength: number;
      enrichmentComplete: boolean;
      qualityScore: number;
      qualityTier: LeadQualityTier;
      salesQualityTier: string;
      updatedField?: EnrichmentFieldKey;
      snapshot: Record<string, string>;
      enrichmentPayload: ReturnType<typeof buildEnrichmentPayload>;
      enrichmentLastUpdatedAt: string;
    }
  | { success: false; error: string; status: 400 | 404 | 500 };

function attachEnrichmentMeta(
  lead: ScoredLeadCreateRequest,
  input: {
    profileStrength: number;
    timestamps: ReturnType<typeof resolveEnrichmentTimestamps>;
  },
): ScoredLeadCreateRequest {
  return {
    ...lead,
    profileStrengthPercent: input.profileStrength,
    enrichmentStatus: input.timestamps.enrichmentStatus,
    enrichmentStartedAt: input.timestamps.enrichmentStartedAt,
    enrichmentLastUpdatedAt: input.timestamps.enrichmentLastUpdatedAt,
    enrichmentCompletedAt: input.timestamps.enrichmentCompletedAt,
  };
}

export async function processEnrichmentAutosave(input: {
  leadId: string;
  updates: EnrichmentFieldUpdate;
  updatedField?: EnrichmentFieldKey;
  markStarted?: boolean;
}): Promise<EnrichmentAutosaveResult> {
  const hasUpdates = Object.values(input.updates).some((value) => value?.trim());
  if (!hasUpdates && !input.markStarted) {
    return {
      success: false,
      error: "At least one enrichment field or markStarted is required.",
      status: 400,
    };
  }

  const submission = await getLeadSubmissionById(input.leadId);
  if (!submission) {
    return { success: false, error: "Lead not found.", status: 404 };
  }

  try {
    const baseLead = submissionToLeadCreateRequest(submission);
    const mergedLead = hasUpdates
      ? mergeEnrichmentIntoLead(baseLead, input.updates)
      : baseLead;
    const scoredLead = applyLeadQualification(mergedLead);

    const enrichmentData = enrichmentDataFromLead(scoredLead);
    const profileStrength = calculateProfileStrength(enrichmentData);
    const timestamps = resolveEnrichmentTimestamps({
      data: enrichmentData,
      existing: parseEnrichmentTimestamps(submission.funnelAnswers),
      markStarted: input.markStarted,
    });

    const enrichedLead = attachEnrichmentMeta(scoredLead, { profileStrength, timestamps });
    await updateLeadSubmissionAfterEnrichment(submission.id, enrichedLead);

    const updatedSubmission = (await getLeadSubmissionById(submission.id)) ?? submission;
    const storedLead = leadSubmissionToStoredLead(updatedSubmission, enrichedLead);

    void syncLeadToHubSpotDetailed(storedLead).catch((error) => {
      console.warn("[leads/enrich/autosave] hubspot sync failed", { leadId: input.leadId, error });
    });

    void notifyZapierEnrichmentWebhook({
      lead: storedLead,
      submissionId: updatedSubmission.submissionId,
      updatedField: input.updatedField,
      updatedValue: input.updatedField ? input.updates[input.updatedField] : undefined,
      enrichmentPayload: buildEnrichmentPayload(enrichmentData),
      enrichmentStatus: timestamps.enrichmentStatus,
      profileStrength,
      enrichmentLastUpdatedAt: timestamps.enrichmentLastUpdatedAt,
    }).catch((error) => {
      console.warn("[leads/enrich/autosave] zapier webhook failed", { leadId: input.leadId, error });
    });

    console.info("[leads/enrich/autosave] saved", {
      leadId: input.leadId,
      updatedField: input.updatedField,
      enrichmentStatus: timestamps.enrichmentStatus,
      profileStrength,
    });

    return {
      success: true,
      enrichmentStatus: timestamps.enrichmentStatus,
      profileStrength,
      enrichmentComplete: isEnrichmentDataComplete(enrichmentData),
      qualityScore: enrichedLead.qualityScore,
      qualityTier: enrichedLead.qualityTier,
      salesQualityTier: enrichedLead.salesQualityTier,
      updatedField: input.updatedField,
      snapshot: enrichmentData,
      enrichmentPayload: buildEnrichmentPayload(enrichmentData),
      enrichmentLastUpdatedAt: timestamps.enrichmentLastUpdatedAt,
    };
  } catch (error) {
    console.error("[leads/enrich/autosave] failed", error);
    return { success: false, error: "Enrichment autosave failed.", status: 500 };
  }
}

export async function processEnrichmentBatch(
  leadId: string,
  updates: EnrichmentFieldUpdate,
): Promise<EnrichmentAutosaveResult> {
  const firstField = (Object.keys(updates)[0] ?? undefined) as EnrichmentFieldKey | undefined;
  return processEnrichmentAutosave({ leadId, updates, updatedField: firstField });
}
