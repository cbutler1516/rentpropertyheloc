export const BASE_POST_SUBMIT_SCORE = 75;
export const MAX_INVESTOR_REVIEW_SCORE = 100;
export const ENRICHMENT_FIELD_COUNT = 7;

/** Fields that count toward post-submit profile completion */
export const ENRICHMENT_PROFILE_FIELDS = [
  "propertyValueRange",
  "mortgageBalanceRange",
  "propertyType",
  "propertyCount",
  "fundingGoal",
  "fundingTimeline",
  "ownershipType",
] as const satisfies readonly ProfileStrengthField[];

export const BASE_PROFILE_STRENGTH = 40;
export const MAX_PROFILE_STRENGTH = 100;

export type ProfileStrengthField =
  | "propertyType"
  | "propertyValueRange"
  | "mortgageBalanceRange"
  | "creditScoreRange"
  | "propertyCount"
  | "fundingTimeline"
  | "fundingGoal"
  | "ownershipType";

export const PROFILE_STRENGTH_WEIGHTS: Record<ProfileStrengthField, number> = {
  propertyType: 9,
  propertyValueRange: 9,
  mortgageBalanceRange: 9,
  creditScoreRange: 0,
  propertyCount: 8,
  fundingTimeline: 8,
  fundingGoal: 9,
  ownershipType: 8,
};

export type MilestoneStatus = "complete" | "current" | "pending" | "locked";

export type ReviewMilestone = {
  id: string;
  label: string;
  icon: string;
  status: MilestoneStatus;
};

export type AchievementBadge = {
  id: string;
  label: string;
  icon: string;
  unlocked: boolean;
};

export type EnrichmentUnlockCard = {
  id: string;
  icon: string;
  title: string;
  line: string;
  unlockFields: ProfileStrengthField[];
};

/** @deprecated Use ENRICHMENT_UNLOCK_CARDS */
export type EnrichmentBenefitCard = EnrichmentUnlockCard;

export const ENRICHMENT_UNLOCK_CARDS: EnrichmentUnlockCard[] = [
  {
    id: "faster",
    icon: "⚡",
    title: "Unlock Faster Review",
    line: "Property details on file",
    unlockFields: ["propertyType", "propertyValueRange", "mortgageBalanceRange"],
  },
  {
    id: "programs",
    icon: "🔓",
    title: "Unlock Additional Programs",
    line: "Investor profile added",
    unlockFields: ["propertyCount", "fundingTimeline", "fundingGoal"],
  },
  {
    id: "matches",
    icon: "🎯",
    title: "Unlock Better Financing Matches",
    line: "Ownership structure added",
    unlockFields: ["ownershipType"],
  },
];

/** @deprecated Use ENRICHMENT_UNLOCK_CARDS */
export const ENRICHMENT_BENEFIT_CARDS = ENRICHMENT_UNLOCK_CARDS;

export const SNAPSHOT_SCORE_DISCLAIMER =
  "Illustrative review only. Not a loan approval or commitment to lend.";

export const SNAPSHOT_DOWNLOAD_DISCLAIMER =
  "Illustrative review only. Not a loan approval, pre-approval, commitment to lend, or lending decision.";

export function getScoreTierLabel(score: number): string {
  const clamped = Math.max(0, Math.min(MAX_INVESTOR_REVIEW_SCORE, score));
  if (clamped >= 90) return "Excellent Equity Position";
  if (clamped >= 75) return "Strong Scenario";
  if (clamped >= 50) return "Positive Initial Review";
  return "Additional Review Needed";
}

export function getProfileStrengthLabel(strength: number): string {
  const clamped = Math.max(0, Math.min(MAX_PROFILE_STRENGTH, strength));
  if (clamped >= 100) return "Profile fully built";
  if (clamped >= 80) return "Strong investor profile";
  if (clamped >= 60) return "Building momentum";
  if (clamped >= 40) return "Review started";
  return "Just getting started";
}

export function getProfileStrengthSupportingCopy(strength: number): string {
  const clamped = Math.max(0, Math.min(MAX_PROFILE_STRENGTH, strength));
  if (clamped >= 100) {
    return "Your profile is ready for a deeper review. Strength score is illustrative only.";
  }
  if (clamped >= 70) {
    return "You're close — finish the remaining details to unlock more options.";
  }
  return "Each answer strengthens your profile and helps our team review faster.";
}

export function calculateProfileStrength(data: Record<string, string | undefined>): number {
  let strength = BASE_PROFILE_STRENGTH;
  for (const field of ENRICHMENT_PROFILE_FIELDS) {
    if (data[field]?.trim()) {
      strength += PROFILE_STRENGTH_WEIGHTS[field];
    }
  }
  return Math.min(MAX_PROFILE_STRENGTH, strength);
}

export function isEnrichmentDataComplete(
  data: Record<string, string | undefined>,
): boolean {
  return ENRICHMENT_PROFILE_FIELDS.every((field) => Boolean(data[field]?.trim()));
}

export function isUnlockCardUnlocked(
  card: EnrichmentUnlockCard,
  data: Record<string, string | undefined>,
): boolean {
  return card.unlockFields.every((field) => Boolean(data[field]?.trim()));
}

export const PRE_SUBMIT_MILESTONES = [
  { step: 1, label: "Property", icon: "🏠" },
  { step: 2, label: "Credit", icon: "📈" },
  { step: 3, label: "Capital", icon: "💰" },
  { step: 4, label: "Contact", icon: "📋" },
] as const;

export function getReviewMilestones(options: {
  showPriority: boolean;
  enrichmentComplete?: boolean;
}): ReviewMilestone[] {
  const { showPriority, enrichmentComplete = false } = options;

  return [
    { id: "property", label: "Property Found", icon: "🏠", status: "complete" },
    { id: "request", label: "Request Received", icon: "✓", status: "complete" },
    {
      id: "priority",
      label: "Priority Review",
      icon: "⚡",
      status: showPriority ? "complete" : "locked",
    },
    {
      id: "analysis",
      label: "Financing Analysis",
      icon: "🎯",
      status: enrichmentComplete ? "complete" : "current",
    },
    {
      id: "strategy",
      label: "Strategy Review",
      icon: "📈",
      status: enrichmentComplete ? "current" : "pending",
    },
  ];
}

export function getAchievementBadges(showPriority: boolean): AchievementBadge[] {
  return [
    { id: "property", label: "Property Found", icon: "🏠", unlocked: true },
    { id: "request", label: "Request Received", icon: "✓", unlocked: true },
    {
      id: "priority",
      label: "Priority Review Activated",
      icon: "⚡",
      unlocked: showPriority,
    },
    {
      id: "analysis",
      label: "Financing Analysis In Progress",
      icon: "🎯",
      unlocked: true,
    },
  ];
}

export function countEnrichmentAnswers(data: Record<string, string | undefined>): number {
  return ENRICHMENT_PROFILE_FIELDS.filter((field) => Boolean(data[field]?.trim())).length;
}

export function calculateInvestorReviewScore(enrichmentAnswerCount: number): number {
  const remaining = MAX_INVESTOR_REVIEW_SCORE - BASE_POST_SUBMIT_SCORE;
  const perField = remaining / ENRICHMENT_FIELD_COUNT;
  const score = BASE_POST_SUBMIT_SCORE + enrichmentAnswerCount * perField;
  return Math.min(MAX_INVESTOR_REVIEW_SCORE, Math.round(score));
}

export function getScoreSupportingCopy(enrichmentAnswerCount: number): string {
  if (enrichmentAnswerCount >= ENRICHMENT_FIELD_COUNT) {
    return "Your review profile is ready. Score is illustrative only.";
  }
  return "Great start — add a few more details to strengthen your review.";
}

export function getScoreBoostHint(enrichmentAnswerCount: number): string {
  if (enrichmentAnswerCount >= ENRICHMENT_FIELD_COUNT) {
    return "Maximum profile strength unlocked.";
  }
  const nextScore = calculateInvestorReviewScore(enrichmentAnswerCount + 1);
  const currentScore = calculateInvestorReviewScore(enrichmentAnswerCount);
  const boost = nextScore - currentScore;
  if (boost <= 0) return "Complete more details to boost your profile.";
  return `Each detail adds up to +${boost} points to your score.`;
}

export function isEnrichmentStepComplete(
  _step: number,
  data: Record<string, string | undefined>,
): boolean {
  return ENRICHMENT_PROFILE_FIELDS.some((field) => Boolean(data[field]?.trim()));
}

export type FinancingInsight = {
  id: string;
  icon: string;
  title: string;
  lockedCopy: string;
  unlockedCopy: string;
  unlockFields: ProfileStrengthField[];
};

export const FINANCING_INSIGHTS: FinancingInsight[] = [
  {
    id: "equity-position",
    icon: "📊",
    title: "Equity Position Snapshot",
    lockedCopy: "Add property value and mortgage balance to preview",
    unlockedCopy: "Our team can estimate your equity access range faster",
    unlockFields: ["propertyValueRange", "mortgageBalanceRange"],
  },
  {
    id: "credit-fit",
    icon: "🎯",
    title: "Investor Goals Fit",
    lockedCopy: "Add property type and intended use to unlock program matching",
    unlockedCopy: "Helps narrow which financing paths may fit your profile",
    unlockFields: ["propertyType", "fundingGoal"],
  },
  {
    id: "portfolio-strategy",
    icon: "🏘️",
    title: "Portfolio Strategy View",
    lockedCopy: "Share property count and timeline to unlock",
    unlockedCopy: "Supports multi-property and timing-based recommendations",
    unlockFields: ["propertyCount", "fundingTimeline"],
  },
];

export function isFinancingInsightUnlocked(
  insight: FinancingInsight,
  data: Record<string, string | undefined>,
): boolean {
  return insight.unlockFields.every((field) => Boolean(data[field]?.trim()));
}

export type FinancingPathToReview = {
  id: string;
  icon: string;
  name: string;
  description: string;
  unlockStrength: number;
};

export const FINANCING_PATHS_TO_REVIEW: FinancingPathToReview[] = [
  {
    id: "rental-heloc",
    icon: "🏦",
    name: "Rental Property HELOC",
    description: "Flexible equity access while keeping your first mortgage in place.",
    unlockStrength: 50,
  },
  {
    id: "second-mortgage",
    icon: "📋",
    name: "Investor Second Mortgage",
    description: "Second-position financing for investors who want a defined lump sum.",
    unlockStrength: 70,
  },
  {
    id: "portfolio-equity",
    icon: "📈",
    name: "Portfolio Equity Strategy",
    description: "Options for investors with multiple rentals or growth plans.",
    unlockStrength: 85,
  },
  {
    id: "cash-out",
    icon: "💰",
    name: "Investment Cash-Out Refinance",
    description: "Replace your existing loan and access equity in one structure.",
    unlockStrength: 100,
  },
];

export function getUnlockedFinancingPaths(strength: number): FinancingPathToReview[] {
  return FINANCING_PATHS_TO_REVIEW.filter((path) => strength >= path.unlockStrength);
}

export function getNextFinancingPath(strength: number): FinancingPathToReview | null {
  return (
    FINANCING_PATHS_TO_REVIEW.find((path) => strength < path.unlockStrength) ?? null
  );
}

export function getProfileStrengthBoostMessage(
  field: ProfileStrengthField,
): string {
  const weight = PROFILE_STRENGTH_WEIGHTS[field];
  return `+${weight}% profile strength`;
}

export function isProfileComplete(strength: number): boolean {
  return strength >= MAX_PROFILE_STRENGTH;
}

/** Next unlock label for post-submit profile strength panel */
export function getProfileStrengthNextUnlockLabel(strength: number): string {
  const clamped = Math.max(0, Math.min(MAX_PROFILE_STRENGTH, strength));
  if (clamped >= MAX_PROFILE_STRENGTH) return "Investor Profile Complete";
  if (clamped >= 80) return "Next unlock: Priority Review Enhancements";
  if (clamped >= 60) return "Next unlock: Additional Programs";
  return "Next unlock: Better Financing Matches";
}
