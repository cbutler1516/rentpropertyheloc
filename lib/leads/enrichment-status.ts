import {
  ENRICHMENT_PROFILE_FIELDS,
  isEnrichmentDataComplete,
} from "@/lib/leads/investor-review-gamification";

export type EnrichmentStatus =
  | "enrichment_started"
  | "enrichment_partial"
  | "enrichment_complete";

export type EnrichmentTimestamps = {
  enrichmentStatus: EnrichmentStatus | "";
  enrichmentStartedAt: string;
  enrichmentLastUpdatedAt: string;
  enrichmentCompletedAt: string;
};

export function countAnsweredEnrichmentFields(
  data: Record<string, string | undefined>,
): number {
  return ENRICHMENT_PROFILE_FIELDS.filter((field) => Boolean(data[field]?.trim())).length;
}

export function resolveEnrichmentTimestamps(input: {
  data: Record<string, string | undefined>;
  existing?: Partial<EnrichmentTimestamps>;
  markStarted?: boolean;
  now?: string;
}): EnrichmentTimestamps {
  const now = input.now ?? new Date().toISOString();
  const answeredCount = countAnsweredEnrichmentFields(input.data);
  const complete = isEnrichmentDataComplete(input.data);
  const existing = input.existing ?? {};

  let enrichmentStatus: EnrichmentStatus | "" = existing.enrichmentStatus ?? "";
  let enrichmentStartedAt = existing.enrichmentStartedAt ?? "";
  let enrichmentLastUpdatedAt = existing.enrichmentLastUpdatedAt ?? "";
  let enrichmentCompletedAt = existing.enrichmentCompletedAt ?? "";

  if (input.markStarted && !enrichmentStartedAt) {
    enrichmentStartedAt = now;
    enrichmentStatus = "enrichment_started";
  }

  if (answeredCount > 0) {
    if (!enrichmentStartedAt) enrichmentStartedAt = now;
    enrichmentLastUpdatedAt = now;
    enrichmentStatus = complete ? "enrichment_complete" : "enrichment_partial";
    if (complete) {
      enrichmentCompletedAt = enrichmentCompletedAt || now;
    }
  } else if (input.markStarted && enrichmentStatus === "enrichment_started") {
    enrichmentLastUpdatedAt = now;
  }

  return {
    enrichmentStatus,
    enrichmentStartedAt,
    enrichmentLastUpdatedAt,
    enrichmentCompletedAt,
  };
}

export function parseEnrichmentTimestamps(
  funnelAnswers: Record<string, unknown> | undefined,
): Partial<EnrichmentTimestamps> {
  const fa = funnelAnswers ?? {};
  return {
    enrichmentStatus:
      typeof fa.enrichmentStatus === "string"
        ? (fa.enrichmentStatus as EnrichmentStatus)
        : "",
    enrichmentStartedAt:
      typeof fa.enrichmentStartedAt === "string" ? fa.enrichmentStartedAt : "",
    enrichmentLastUpdatedAt:
      typeof fa.enrichmentLastUpdatedAt === "string" ? fa.enrichmentLastUpdatedAt : "",
    enrichmentCompletedAt:
      typeof fa.enrichmentCompletedAt === "string" ? fa.enrichmentCompletedAt : "",
  };
}
