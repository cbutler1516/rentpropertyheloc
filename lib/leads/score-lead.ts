import { computeLeadPrioritizationSafe } from "@/lib/leads/lead-prioritization";
import type { CallPriority } from "@/lib/leads/lead-prioritization";
import { isJourneySlug } from "@/lib/leads/investor-journeys";
import { routeLead } from "@/lib/leads/routing";
import { isValidEmail, isValidPhone } from "@/lib/leads/validation";
import type {
  LeadCreateRequest,
  LeadQualification,
  LeadQualityTier,
  LeadRouting,
  ScoredLeadCreateRequest,
} from "@/lib/leads/types";

const STRONG_EQUITY_MIN = 75_000;
const LOW_EQUITY_MAX = 25_000;
const HIGH_LTV_RATIO = 0.85;
const REALISTIC_DRAWDOWN_RATIO = 0.85;
const STRONG_CREDIT_MIN = 720;

const FOLLOW_UP_BY_TIER: Record<LeadQualityTier, string> = {
  hot: "Priority call within 1 business day",
  warm: "Email or SMS within 24 hours; schedule a call within 2 business days",
  nurture: "Add to nurture sequence; manual review within 5 business days",
  incomplete: "Verify missing funnel fields before outreach",
};

type CompletenessResult = {
  complete: boolean;
  missing: string[];
};

function getAvailableEquity(lead: LeadCreateRequest): number {
  if (lead.propertyValue == null || lead.mortgageBalance == null) {
    return lead.estimatedEquity ?? 0;
  }
  const fromValues = lead.propertyValue - lead.mortgageBalance;
  if (lead.estimatedEquity != null && lead.estimatedEquity > 0) {
    return Math.max(fromValues, lead.estimatedEquity);
  }
  return Math.max(0, fromValues);
}

function hasPropertyDetails(lead: LeadCreateRequest): boolean {
  return Boolean(
    lead.propertyType &&
      lead.propertyValue != null &&
      lead.propertyValue > 0 &&
      lead.mortgageBalance != null,
  );
}

function getRoutingConfidence(lead: LeadCreateRequest): "initial" | "enriched" {
  return hasPropertyDetails(lead) ? "enriched" : "initial";
}

function assessCompleteness(lead: LeadCreateRequest): CompletenessResult {
  const missing: string[] = [];

  if (!lead.journey || !isJourneySlug(lead.journey)) missing.push("investor journey");
  if (!lead.desiredFunds || lead.desiredFunds <= 0) missing.push("desired funds");
  if (!lead.creditScoreRange?.trim()) missing.push("credit score");
  if (!lead.propertyStreet?.trim()) missing.push("property address");
  if (!lead.tcpaConsent) missing.push("TCPA consent");
  if (!lead.firstName?.trim()) missing.push("first name");
  if (!lead.lastName?.trim()) missing.push("last name");
  if (!lead.email?.trim() || !isValidEmail(lead.email)) missing.push("email");
  if (lead.phone?.trim() && !isValidPhone(lead.phone)) missing.push("valid phone");

  return { complete: missing.length === 0, missing };
}

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Computes internal lead quality score and recommended follow-up for routing.
 */
export function scoreLead(lead: LeadCreateRequest): LeadQualification {
  const completeness = assessCompleteness(lead);
  const keyReasons: string[] = [];
  let points = 0;

  if (!completeness.complete) {
    return {
      qualityScore: clampScore(15 + completeness.missing.length * 2),
      qualityTier: "incomplete",
      recommendedFollowUp: FOLLOW_UP_BY_TIER.incomplete,
      keyReasons: [
        `Missing required fields: ${completeness.missing.join(", ")}`,
        "Complete the funnel before high-touch outreach",
      ],
    };
  }

  const hasDetails = hasPropertyDetails(lead);
  const availableEquity = getAvailableEquity(lead);
  const ltvRatio =
    lead.propertyValue != null && lead.propertyValue > 0 && lead.mortgageBalance != null
      ? lead.mortgageBalance / lead.propertyValue
      : null;
  const drawdownRatio =
    availableEquity > 0 && lead.desiredFunds > 0 ? lead.desiredFunds / availableEquity : null;
  const creditScore = lead.creditScoreEstimate;

  points += 12;
  keyReasons.push("Contact information complete");

  if (lead.propertyStreet?.trim()) {
    points += 8;
    keyReasons.push("Property address provided for review");
  }

  if (lead.phone?.trim() && isValidPhone(lead.phone)) {
    points += 6;
    keyReasons.push("Phone number provided for follow-up");
  }

  if (lead.marketingOptIn) {
    points += 4;
    keyReasons.push("Opted in to investor updates");
  }

  if (hasDetails && availableEquity >= STRONG_EQUITY_MIN) {
    points += 25;
    keyReasons.push(`Strong estimated available equity (${formatCompactUsd(availableEquity)})`);
  } else if (hasDetails && availableEquity >= LOW_EQUITY_MAX) {
    points += 14;
    keyReasons.push(`Moderate available equity (${formatCompactUsd(availableEquity)})`);
  } else if (hasDetails) {
    points += 4;
    keyReasons.push(`Limited available equity (${formatCompactUsd(availableEquity)})`);
  } else if (lead.desiredFunds >= 100_000) {
    points += 14;
    keyReasons.push("Higher desired funds — initial routing pending property details");
  } else if (lead.desiredFunds >= 50_000) {
    points += 10;
    keyReasons.push("Moderate desired funds — initial routing pending property details");
  } else {
    points += 6;
    keyReasons.push("Initial score based on desired funds and credit");
  }

  if (drawdownRatio != null) {
    if (drawdownRatio <= REALISTIC_DRAWDOWN_RATIO && lead.desiredFunds >= 10_000) {
      points += 20;
      keyReasons.push("Desired funds align with available equity");
    } else if (drawdownRatio <= 1) {
      points += 10;
      keyReasons.push("Desired funds are within stated equity but aggressive");
    } else {
      points += 2;
      keyReasons.push("Desired funds exceed estimated available equity");
    }
  } else if (lead.desiredFunds >= 35_000) {
    points += 8;
    keyReasons.push("Desired funds within typical program range");
  }

  if (creditScore != null && creditScore >= STRONG_CREDIT_MIN) {
    points += 18;
    keyReasons.push(`Strong estimated credit profile (${creditScore}+)`);
  } else if (creditScore != null && creditScore >= 680) {
    points += 12;
    keyReasons.push("Credit profile within typical approval range");
  } else if (lead.creditScoreRange === "not-sure") {
    points += 6;
    keyReasons.push("Credit score pending confirmation");
  } else if (!lead.creditScoreRange?.trim()) {
    points += 3;
    keyReasons.push("Credit score pending — enrichment not yet complete");
  } else {
    points += 4;
    keyReasons.push("Credit profile may require manual review");
  }

  if (ltvRatio != null) {
    if (ltvRatio <= 0.65) {
      points += 10;
      keyReasons.push("Conservative loan-to-value");
    } else if (ltvRatio <= HIGH_LTV_RATIO) {
      points += 6;
      keyReasons.push("Moderate loan-to-value");
    } else {
      points += 1;
      keyReasons.push("High loan-to-value may limit programs");
    }
  }

  if (isJourneySlug(lead.journey)) {
    const journeyBonus =
      lead.journey === "sfr" || lead.journey === "multifamily-small" ? 10 : 7;
    points += journeyBonus;
    keyReasons.push(`Investor journey: ${lead.journey}`);
  }

  if (lead.desiredFunds >= 250_000) {
    points += 6;
    keyReasons.push("Higher equity request — expansion capital scenario");
  }

  if (lead.propertyCount === "5-plus") {
    points += 6;
    keyReasons.push("Portfolio investor (5+ properties)");
  } else if (lead.propertyCount === "2-4") {
    points += 4;
    keyReasons.push("Multi-property investor");
  }

  if (lead.fundingTimeline === "asap" || lead.fundingTimeline === "within-30-days") {
    points += 4;
    keyReasons.push("Active funding timeline");
  }

  const qualityScore = clampScore(points);
  const hasStrongEquity = hasDetails && availableEquity >= STRONG_EQUITY_MIN;
  const hasRealisticDraw = drawdownRatio == null || drawdownRatio <= REALISTIC_DRAWDOWN_RATIO;
  const hasStrongCredit = creditScore == null || creditScore >= STRONG_CREDIT_MIN;
  const isLowEquity = hasDetails && availableEquity < LOW_EQUITY_MAX;
  const isAggressiveDraw = drawdownRatio != null && drawdownRatio > 1;

  let qualityTier: LeadQualityTier;

  if (
    qualityScore >= 72 &&
    hasStrongEquity &&
    hasRealisticDraw &&
    hasStrongCredit &&
    !isAggressiveDraw
  ) {
    qualityTier = "hot";
  } else if (isLowEquity || isAggressiveDraw || qualityScore < 42) {
    qualityTier = "nurture";
  } else {
    qualityTier = "warm";
  }

  return {
    qualityScore,
    qualityTier,
    recommendedFollowUp: FOLLOW_UP_BY_TIER[qualityTier],
    keyReasons,
  };
}

const DEFAULT_QUALIFICATION: LeadQualification = {
  qualityScore: 50,
  qualityTier: "warm",
  recommendedFollowUp: FOLLOW_UP_BY_TIER.warm,
  keyReasons: ["Qualification scoring unavailable — default routing applied"],
};

const DEFAULT_ROUTING: LeadRouting = {
  routingTier: "standard",
  routingLabel: "Standard review",
  recommendedAction: "Contact within 2 business days",
  routingReasons: ["Default routing applied"],
  secondLienFit: "needs_review",
  routingConfidence: "initial",
};

export function scoreLeadSafe(lead: LeadCreateRequest): LeadQualification {
  try {
    return scoreLead(lead);
  } catch (error) {
    console.error("[leads] scoreLead failed — using default qualification", error);
    return DEFAULT_QUALIFICATION;
  }
}

export function routeLeadSafe(lead: LeadCreateRequest): LeadRouting {
  try {
    return routeLead(lead);
  } catch (error) {
    console.error("[leads] routeLead failed — using default routing", error);
    return DEFAULT_ROUTING;
  }
}

const FOLLOW_UP_BY_CALL_PRIORITY: Record<CallPriority, string> = {
  "CALL NOW": "Priority call within 1 business day",
  "CALL TODAY": "Email or SMS within 24 hours; schedule a call within 2 business days",
  AUTOMATION: "Add to nurture sequence; manual review within 5 business days",
};

export function applyLeadQualification(lead: LeadCreateRequest): ScoredLeadCreateRequest {
  const qualification = scoreLeadSafe(lead);
  const prioritization = computeLeadPrioritizationSafe(lead);
  const routing = routeLeadSafe(lead);

  console.info("[leads] routing result", {
    tier: routing.routingTier,
    label: routing.routingLabel,
    secondLienFit: routing.secondLienFit,
    action: routing.recommendedAction,
    leadScore: prioritization.leadScore,
    salesQualityTier: prioritization.salesQualityTier,
    callPriority: prioritization.callPriority,
    leadType: prioritization.leadType,
  });

  const keyReasons = [
    prioritization.scoringBreakdown.scoringNote,
    ...qualification.keyReasons,
  ].filter((reason, index, list) => list.indexOf(reason) === index);

  return {
    ...lead,
    ...qualification,
    ...routing,
    ...prioritization,
    qualityScore: prioritization.leadScore,
    recommendedFollowUp: FOLLOW_UP_BY_CALL_PRIORITY[prioritization.callPriority],
    keyReasons,
  };
}

function formatCompactUsd(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}
