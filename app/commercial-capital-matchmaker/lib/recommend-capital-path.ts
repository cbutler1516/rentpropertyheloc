import { CAPITAL_PATH_META } from "./form-options";
import {
  CAPITAL_PATH_IDS,
  type CapitalPathId,
  type CapitalPathRecommendation,
  type DealIntake,
} from "./types";

function isCompleteIntake(intake: DealIntake): boolean {
  return Boolean(
    intake.propertyType &&
      intake.dealPurpose &&
      intake.loanAmountRange &&
      intake.occupancyStatus &&
      intake.sponsorExperience &&
      intake.timeline &&
      intake.leveragePosture,
  );
}

function scorePath(
  pathId: CapitalPathId,
  intake: DealIntake,
): { score: number; reasons: string[] } {
  const reasons: string[] = [];
  let score = 0;

  const isTransitional =
    intake.occupancyStatus === "value-add" ||
    intake.occupancyStatus === "vacant" ||
    intake.occupancyStatus === "development" ||
    intake.dealPurpose === "bridge" ||
    intake.dealPurpose === "construction" ||
    intake.dealPurpose === "value-add";

  const isStabilized =
    intake.occupancyStatus === "stabilized" &&
    (intake.dealPurpose === "acquisition" ||
      intake.dealPurpose === "refinance" ||
      intake.dealPurpose === "cash-out");

  const isLarge =
    intake.loanAmountRange === "3-10m" || intake.loanAmountRange === "10m-plus";
  const isSmall =
    intake.loanAmountRange === "under-1m" || intake.loanAmountRange === "1-3m";

  if (pathId === "agency-multifamily") {
    if (intake.propertyType === "multifamily" && isStabilized) {
      score += 4;
      reasons.push("Stabilized multifamily aligns with agency execution.");
    }
    if (intake.sponsorExperience === "seasoned") score += 1;
    if (isTransitional) score -= 3;
    if (intake.leveragePosture === "aggressive") score -= 1;
  }

  if (pathId === "cmbs") {
    if (isStabilized && isLarge) {
      score += 4;
      reasons.push("Stabilized cash flow at institutional size fits CMBS.");
    }
    if (
      intake.propertyType === "office" ||
      intake.propertyType === "retail" ||
      intake.propertyType === "industrial"
    ) {
      score += 1;
    }
    if (isSmall) score -= 2;
    if (isTransitional) score -= 3;
  }

  if (pathId === "bank-portfolio") {
    score += 2;
    reasons.push("Portfolio lenders often quote flexible middle-market deals.");
    if (intake.sponsorExperience === "first-deal") score += 1;
    if (isSmall || intake.loanAmountRange === "1-3m") score += 1;
    if (intake.timeline === "under-30-days") score += 1;
    if (intake.propertyType === "land") score -= 2;
  }

  if (pathId === "bridge-debt-fund") {
    if (isTransitional) {
      score += 5;
      reasons.push("Transitional occupancy or purpose points to bridge execution.");
    }
    if (intake.timeline === "under-30-days") score += 1;
    if (isStabilized && intake.dealPurpose === "refinance") score -= 2;
  }

  if (pathId === "sba-504") {
    if (
      isSmall &&
      (intake.propertyType === "office" ||
        intake.propertyType === "retail" ||
        intake.propertyType === "mixed-use")
    ) {
      score += 3;
      reasons.push("Smaller owner-occupied style assets may fit SBA 504.");
    }
    if (isLarge || intake.propertyType === "land") score -= 3;
    if (isTransitional) score -= 2;
  }

  if (pathId === "private-credit") {
    if (intake.leveragePosture === "aggressive") {
      score += 3;
      reasons.push("Aggressive leverage often requires non-bank flexibility.");
    }
    if (
      intake.propertyType === "hospitality" ||
      intake.propertyType === "land" ||
      intake.occupancyStatus === "vacant"
    ) {
      score += 2;
    }
    if (intake.timeline === "under-30-days") score += 1;
    if (isStabilized && intake.leveragePosture === "conservative") score -= 2;
  }

  if (pathId === "equity-jv") {
    if (intake.propertyType === "land" || intake.dealPurpose === "construction") {
      score += 4;
      reasons.push("Development or land plays often need equity alongside debt.");
    }
    if (intake.sponsorExperience === "first-deal" && isTransitional) score += 1;
    if (isStabilized && intake.dealPurpose === "refinance") score -= 3;
  }

  return { score, reasons };
}

function buildRisks(intake: DealIntake): string[] {
  const risks: string[] = [];

  if (intake.sponsorExperience === "first-deal") {
    risks.push("First-time sponsors may face tighter leverage and reserve requirements.");
  }
  if (intake.leveragePosture === "aggressive") {
    risks.push("Aggressive proceeds targets can reduce lender appetite and increase spread.");
  }
  if (
    intake.occupancyStatus === "vacant" ||
    intake.occupancyStatus === "development"
  ) {
    risks.push("Pre-stabilized collateral increases execution and takeout risk.");
  }
  if (intake.timeline === "under-30-days") {
    risks.push("Compressed timelines limit diligence depth and lender competition.");
  }
  if (intake.propertyType === "hospitality") {
    risks.push("Hospitality assets often require specialized underwriting and reserves.");
  }

  return risks.slice(0, 4);
}

function buildStructureNotes(
  primary: CapitalPathId,
  alternates: CapitalPathId[],
): string[] {
  const notes = [
    `Lead with ${CAPITAL_PATH_META[primary].label}: ${CAPITAL_PATH_META[primary].typicalUse}`,
  ];

  if (alternates[0]) {
    notes.push(
      `Keep ${CAPITAL_PATH_META[alternates[0]].label} as a parallel quote path for comparison.`,
    );
  }

  if (
    primary === "bridge-debt-fund" ||
    alternates.includes("bridge-debt-fund")
  ) {
    notes.push("Model a clear permanent takeout or exit before committing to bridge terms.");
  }

  if (primary === "equity-jv" || alternates.includes("equity-jv")) {
    notes.push("Sequence equity commitments early—debt quotes often depend on sponsor basis.");
  }

  return notes.slice(0, 4);
}

function timingFit(intake: DealIntake, primary: CapitalPathId): string {
  if (intake.timeline === "flexible") {
    return "Flexible timeline allows competitive lender outreach across multiple capital paths.";
  }

  if (intake.timeline === "under-30-days") {
    if (primary === "bridge-debt-fund" || primary === "private-credit") {
      return "Your timeline favors lenders set up for fast bridge or private credit quotes.";
    }
    return "30-day execution is tight—prioritize lenders with dedicated closing teams.";
  }

  if (intake.timeline === "60-90-days") {
    return "60–90 days supports agency, CMBS, and portfolio lender processes with room for diligence.";
  }

  return "30–60 day window works well for bank portfolio and transitional lenders.";
}

function computeCapitalFitScore(
  confidence: CapitalPathRecommendation["confidence"],
  topScore: number,
): number {
  const base =
    confidence === "high" ? 86 : confidence === "medium" ? 76 : 66;
  return Math.min(94, base + Math.min(topScore, 5));
}

function buildBestNextStep(
  intake: DealIntake,
  primary: CapitalPathId,
): string {
  const primaryLabel = CAPITAL_PATH_META[primary].label;

  if (intake.timeline === "under-30-days") {
    return `Book a Broadview commercial strategy call—prioritize ${primaryLabel} lenders built for speed and confirm your document package today.`;
  }

  if (intake.sponsorExperience === "first-deal") {
    return "Schedule a sponsor positioning session with Broadview—align liquidity, guaranty, and narrative before lender outreach.";
  }

  if (
    primary === "bridge-debt-fund" ||
    intake.dealPurpose === "value-add" ||
    intake.occupancyStatus === "value-add"
  ) {
    return "Map your takeout path with Broadview, then run parallel bridge quotes with a clear stabilization timeline.";
  }

  return `Request a Broadview capital strategy review—validate ${primaryLabel} as lead path and quote one alternate lane for comparison.`;
}

export function recommendCapitalPath(intake: DealIntake): CapitalPathRecommendation | null {
  if (!isCompleteIntake(intake)) return null;

  const scored = CAPITAL_PATH_IDS.map((pathId) => {
    const { score, reasons } = scorePath(pathId, intake);
    return { pathId, score, reasons };
  }).sort((a, b) => b.score - a.score);

  const primary = scored[0]?.pathId ?? "bank-portfolio";
  const alternates = scored
    .slice(1, 4)
    .filter((entry) => entry.score > 0)
    .map((entry) => entry.pathId);

  const primaryReasons = scored[0]?.reasons ?? [];
  const confidence: CapitalPathRecommendation["confidence"] =
    (scored[0]?.score ?? 0) >= 5
      ? "high"
      : (scored[0]?.score ?? 0) >= 3
        ? "medium"
        : "exploratory";

  const risks = buildRisks(intake);
  const secondaryPath = alternates[0] ?? null;
  const topScore = scored[0]?.score ?? 0;

  const headline =
    confidence === "high"
      ? `Your deal maps cleanly to ${CAPITAL_PATH_META[primary].label} as the lead capital conversation.`
      : `${CAPITAL_PATH_META[primary].label} is the most practical opening path—keep alternates in play while quotes develop.`;

  return {
    primaryPath: primary,
    secondaryPath,
    alternatePaths: alternates,
    confidence,
    capitalFitScore: computeCapitalFitScore(confidence, topScore),
    headline,
    rationale:
      primaryReasons.length > 0
        ? primaryReasons
        : ["Deal profile maps to this path based on asset, size, and sponsor context."],
    structureNotes: buildStructureNotes(primary, alternates),
    risks,
    keyLenderConcern:
      risks[0] ??
      "Lenders will want clarity on sponsor liquidity, guaranty strength, and trailing property performance.",
    bestNextStep: buildBestNextStep(intake, primary),
    timingFit: timingFit(intake, primary),
  };
}
