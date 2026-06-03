import type { LeadQualityTier } from "@/lib/leads/types";
import { getScoreTierLabel } from "@/lib/leads/investor-review-gamification";

export type ReviewScenarioTier = "strong" | "medium" | "lower";

export type ReviewScenario = {
  tier: ReviewScenarioTier;
  badge: string;
  headline: string;
  body: string;
};

const SCENARIOS: Record<ReviewScenarioTier, Omit<ReviewScenario, "tier">> = {
  strong: {
    badge: "Strong Scenario",
    headline: "Strong Scenario",
    body: "Based on the information provided, your property appears to have characteristics commonly associated with available equity and financing options. A financing specialist will review your scenario and discuss potential strategies and next steps.",
  },
  medium: {
    badge: "Review In Progress",
    headline: "Review In Progress",
    body: "We've received your information and identified several factors worth reviewing. A financing specialist will evaluate your property, financing goals, and available options before discussing next steps.",
  },
  lower: {
    badge: "Additional Review Needed",
    headline: "Additional Review Needed",
    body: "Thank you for providing your information. Additional review may be needed to determine which financing strategies could be available. A financing specialist will review your scenario and discuss potential options.",
  },
};

export function getReviewScenario(input: {
  qualityTier?: LeadQualityTier;
  qualityScore?: number;
  profileStrength?: number;
}): ReviewScenario {
  const tier = resolveScenarioTier(input);
  return { tier, ...SCENARIOS[tier] };
}

function resolveScenarioTier(input: {
  qualityTier?: LeadQualityTier;
  qualityScore?: number;
  profileStrength?: number;
}): ReviewScenarioTier {
  if (input.qualityTier === "hot") return "strong";
  if (input.qualityTier === "nurture" || input.qualityTier === "incomplete") {
    return "lower";
  }

  const score = input.qualityScore ?? input.profileStrength;
  if (score != null) {
    if (score >= 72) return "strong";
    if (score < 42) return "lower";
    return "medium";
  }

  return "medium";
}

/** Display label derived from investor review score when tier is unavailable */
export function getReviewStatusLabel(input: {
  qualityTier?: LeadQualityTier;
  qualityScore?: number;
  profileStrength?: number;
}): string {
  const scenario = getReviewScenario(input);
  if (scenario.tier === "strong") return "Review Started";
  if (scenario.tier === "lower") return "Additional Review Needed";
  return "Review In Progress";
}

export function getScoreDisplayLabel(qualityScore?: number, profileStrength?: number): string {
  const score = qualityScore ?? profileStrength;
  if (score == null) return "Review In Progress";
  return getScoreTierLabel(score);
}
