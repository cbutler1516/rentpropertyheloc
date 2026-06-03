import {
  computeEstimatedEquity,
  getCreditScoreEstimate,
  getMortgageBalanceEstimate,
  getPropertyValueEstimate,
  type CreditScoreRangeId,
  type MortgageBalanceRangeId,
  type PropertyValueRangeId,
} from "@/lib/leads/funnel-ranges";
import type { LeadCreateRequest } from "@/lib/leads/types";

export type LeadType = "PARTIAL" | "COMPLETE";
export type DataConfidence = "LOW" | "MEDIUM" | "HIGH";
export type RevenueTier = "Platinum" | "Gold" | "Silver" | "Bronze" | "Unknown";
export type CallPriority = "CALL NOW" | "CALL TODAY" | "AUTOMATION";
export type SalesQualityTier =
  | "High Potential Partial"
  | "Medium Potential Partial"
  | "Low Potential Partial"
  | "Excellent"
  | "Mid-Tier"
  | "Low Priority"
  | "Unknown";

export type ScoringBreakdown = {
  leadType: LeadType;
  completionPercent: number;
  dataConfidence: DataConfidence;
  availableEquityPoints: number;
  desiredLoanAmountPoints: number;
  creditScorePoints: number;
  totalScore: number;
  opportunityScore: number;
  qualityTier: SalesQualityTier;
  revenueTier: RevenueTier;
  callPriority: CallPriority;
  scoringNote: string;
};

export type LeadPrioritization = {
  leadScore: number;
  opportunityScore: number;
  salesQualityTier: SalesQualityTier;
  revenueTier: RevenueTier;
  leadType: LeadType;
  completionPercent: number;
  dataConfidence: DataConfidence;
  callPriority: CallPriority;
  estimatedEquity: number;
  desiredLoanAmount: number;
  creditTier: string;
  scoringBreakdown: ScoringBreakdown;
};

function clampScore(value: number): number {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function resolveDesiredLoanAmount(lead: LeadCreateRequest): number {
  if (typeof lead.desiredFunds === "number" && lead.desiredFunds > 0) {
    return lead.desiredFunds;
  }
  return 0;
}

export function resolveEstimatedEquityAmount(lead: LeadCreateRequest): number {
  if (lead.estimatedEquity != null && lead.estimatedEquity > 0) {
    return lead.estimatedEquity;
  }

  const propertyValue =
    lead.propertyValue ??
    (lead.propertyValueRange ? getPropertyValueEstimate(lead.propertyValueRange as PropertyValueRangeId) : null);
  const mortgageBalance =
    lead.mortgageBalance ??
    (lead.mortgageBalanceRange ? getMortgageBalanceEstimate(lead.mortgageBalanceRange as MortgageBalanceRangeId) : null);

  const computed = computeEstimatedEquity(propertyValue, mortgageBalance);
  return computed ?? 0;
}

function resolvePropertyValue(lead: LeadCreateRequest): number | null {
  if (lead.propertyValue != null && lead.propertyValue > 0) return lead.propertyValue;
  if (lead.propertyValueRange?.trim()) {
    return getPropertyValueEstimate(lead.propertyValueRange as PropertyValueRangeId);
  }
  return null;
}

function resolveMortgageBalance(lead: LeadCreateRequest): number | null {
  if (lead.mortgageBalance != null) return lead.mortgageBalance;
  if (lead.mortgageBalanceRange?.trim()) {
    return getMortgageBalanceEstimate(lead.mortgageBalanceRange as MortgageBalanceRangeId);
  }
  return null;
}

export function resolveCreditTierLabel(lead: LeadCreateRequest): string {
  const estimate =
    lead.creditScoreEstimate ??
    (lead.creditScoreRange?.trim()
      ? getCreditScoreEstimate(lead.creditScoreRange as CreditScoreRangeId)
      : null);

  if (estimate != null && estimate > 0) {
    if (estimate >= 760) return "760+";
    if (estimate >= 720) return "720-759";
    if (estimate >= 680) return "680-719";
    if (estimate >= 640) return "640-679";
    return "Below 640";
  }

  switch (lead.creditScoreRange) {
    case "760-plus":
      return "760+";
    case "720-759":
      return "720-759";
    case "680-719":
      return "680-719";
    case "640-679":
      return "640-679";
    case "below-640":
      return "Below 640";
    default:
      return "Unknown";
  }
}

function hasCreditTier(lead: LeadCreateRequest): boolean {
  const label = resolveCreditTierLabel(lead);
  return label !== "Unknown";
}

function hasPartialPropertyEquityData(lead: LeadCreateRequest): boolean {
  return Boolean(
    lead.propertyValueRange?.trim() ||
      lead.mortgageBalanceRange?.trim() ||
      (lead.propertyValue != null && lead.propertyValue > 0) ||
      lead.mortgageBalance != null ||
      (lead.estimatedEquity != null && lead.estimatedEquity > 0),
  );
}

export function resolveLeadType(lead: LeadCreateRequest): LeadType {
  const hasPropertyValue = resolvePropertyValue(lead) != null;
  const hasMortgageBalance = resolveMortgageBalance(lead) != null;
  const hasCredit = hasCreditTier(lead);

  if (hasPropertyValue && hasMortgageBalance && hasCredit) {
    return "COMPLETE";
  }

  return "PARTIAL";
}

function resolveCompletionPercent(lead: LeadCreateRequest, leadType: LeadType): number {
  if (leadType === "COMPLETE") return 100;
  if (hasPartialPropertyEquityData(lead)) return 70;
  return 40;
}

function resolveDataConfidence(
  lead: LeadCreateRequest,
  leadType: LeadType,
  completionPercent: number,
): DataConfidence {
  if (leadType === "COMPLETE") {
    const equity = resolveEstimatedEquityAmount(lead);
    if (equity > 0 && hasCreditTier(lead)) return "HIGH";
  }

  if (completionPercent >= 70) return "MEDIUM";
  return "LOW";
}

export function resolveRevenueTier(desiredLoanAmount: number): RevenueTier {
  if (desiredLoanAmount <= 0) return "Unknown";
  if (desiredLoanAmount >= 500_000) return "Platinum";
  if (desiredLoanAmount >= 300_000) return "Gold";
  if (desiredLoanAmount >= 150_000) return "Silver";
  return "Bronze";
}

function partialLoanAmountPoints(desiredLoanAmount: number): number {
  if (desiredLoanAmount <= 0) return 0;
  if (desiredLoanAmount >= 500_000) return 100;
  if (desiredLoanAmount >= 300_000) return 75;
  if (desiredLoanAmount >= 200_000) return 50;
  if (desiredLoanAmount >= 100_000) return 25;
  return 10;
}

function completeEquityPoints(estimatedEquity: number): number {
  if (estimatedEquity >= 500_000) return 60;
  if (estimatedEquity >= 300_000) return 45;
  if (estimatedEquity >= 200_000) return 30;
  if (estimatedEquity >= 100_000) return 15;
  return 0;
}

function completeLoanAmountPoints(desiredLoanAmount: number): number {
  if (desiredLoanAmount <= 0) return 0;
  if (desiredLoanAmount >= 500_000) return 25;
  if (desiredLoanAmount >= 300_000) return 20;
  if (desiredLoanAmount >= 200_000) return 15;
  if (desiredLoanAmount >= 100_000) return 10;
  return 0;
}

function completeCreditPoints(creditTier: string): number {
  switch (creditTier) {
    case "760+":
      return 15;
    case "720-759":
      return 12;
    case "680-719":
      return 8;
    case "640-679":
      return 4;
    default:
      return 0;
  }
}

function resolvePartialQualityTier(score: number): SalesQualityTier {
  if (score >= 75) return "High Potential Partial";
  if (score >= 40) return "Medium Potential Partial";
  if (score > 0) return "Low Potential Partial";
  return "Unknown";
}

function resolveCompleteQualityTier(score: number): SalesQualityTier {
  if (score >= 75) return "Excellent";
  if (score >= 45) return "Mid-Tier";
  if (score >= 0) return "Low Priority";
  return "Unknown";
}

export function resolveCallPriority(input: {
  leadType: LeadType;
  leadScore: number;
  desiredLoanAmount: number;
  estimatedEquity: number;
  revenueTier: RevenueTier;
}): CallPriority {
  const { leadScore, desiredLoanAmount, estimatedEquity, revenueTier } = input;

  if (
    (input.leadType === "COMPLETE" && leadScore >= 75) ||
    desiredLoanAmount >= 500_000 ||
    estimatedEquity >= 500_000
  ) {
    return "CALL NOW";
  }

  if (
    (leadScore >= 45 && leadScore <= 74) ||
    (desiredLoanAmount >= 250_000 && desiredLoanAmount <= 499_999) ||
    revenueTier === "Gold" ||
    revenueTier === "Silver"
  ) {
    return "CALL TODAY";
  }

  if (leadScore < 45 && desiredLoanAmount < 250_000) {
    return "AUTOMATION";
  }

  if (leadScore < 45) return "AUTOMATION";
  return "CALL TODAY";
}

function buildScoringNote(input: {
  leadType: LeadType;
  dataConfidence: DataConfidence;
  salesQualityTier: SalesQualityTier;
  callPriority: CallPriority;
}): string {
  if (input.leadType === "PARTIAL") {
    if (input.salesQualityTier === "High Potential Partial") {
      return "High potential partial lead based primarily on requested loan amount. Property/equity/credit data not yet verified.";
    }
    if (input.salesQualityTier === "Medium Potential Partial") {
      return "Partial lead with moderate opportunity based on requested loan amount. Property/equity/credit data not yet verified.";
    }
    return "Partial lead with limited opportunity signal. Property/equity/credit data not yet verified.";
  }

  if (input.salesQualityTier === "Excellent" || input.callPriority === "CALL NOW") {
    return "Complete high-confidence lead with strong equity, loan amount, and credit profile.";
  }

  if (input.salesQualityTier === "Low Priority") {
    return "Low-priority lead based on limited equity and/or smaller requested loan amount.";
  }

  if (input.dataConfidence === "HIGH") {
    return "Complete lead with verified property, equity, and credit data suitable for sales follow-up.";
  }

  return "Lead scored for sales prioritization based on available opportunity and profile data.";
}

const DEFAULT_PRIORITIZATION: LeadPrioritization = {
  leadScore: 0,
  opportunityScore: 0,
  salesQualityTier: "Unknown",
  revenueTier: "Unknown",
  leadType: "PARTIAL",
  completionPercent: 40,
  dataConfidence: "LOW",
  callPriority: "AUTOMATION",
  estimatedEquity: 0,
  desiredLoanAmount: 0,
  creditTier: "Unknown",
  scoringBreakdown: {
    leadType: "PARTIAL",
    completionPercent: 40,
    dataConfidence: "LOW",
    availableEquityPoints: 0,
    desiredLoanAmountPoints: 0,
    creditScorePoints: 0,
    totalScore: 0,
    opportunityScore: 0,
    qualityTier: "Unknown",
    revenueTier: "Unknown",
    callPriority: "AUTOMATION",
    scoringNote: "Lead scored for sales prioritization based on available opportunity and profile data.",
  },
};

export function computeLeadPrioritizationSafe(lead: LeadCreateRequest): LeadPrioritization {
  try {
    return computeLeadPrioritization(lead);
  } catch (error) {
    console.error("[leads] computeLeadPrioritization failed — using defaults", error);
    return DEFAULT_PRIORITIZATION;
  }
}

export function resolveStoredLeadPrioritization(
  lead: LeadCreateRequest & Partial<LeadPrioritization>,
): LeadPrioritization {
  if (
    typeof lead.leadScore === "number" &&
    lead.scoringBreakdown != null &&
    lead.salesQualityTier != null
  ) {
    return {
      leadScore: lead.leadScore,
      opportunityScore: lead.opportunityScore ?? lead.leadScore,
      salesQualityTier: lead.salesQualityTier,
      revenueTier: lead.revenueTier ?? "Unknown",
      leadType: lead.leadType ?? "PARTIAL",
      completionPercent: lead.completionPercent ?? 40,
      dataConfidence: lead.dataConfidence ?? "LOW",
      callPriority: lead.callPriority ?? "AUTOMATION",
      estimatedEquity: lead.estimatedEquity ?? resolveEstimatedEquityAmount(lead),
      desiredLoanAmount: lead.desiredLoanAmount ?? resolveDesiredLoanAmount(lead),
      creditTier: lead.creditTier ?? resolveCreditTierLabel(lead),
      scoringBreakdown: lead.scoringBreakdown,
    };
  }

  return computeLeadPrioritization(lead);
}

export function computeLeadPrioritization(lead: LeadCreateRequest): LeadPrioritization {
  const desiredLoanAmount = resolveDesiredLoanAmount(lead);
  const estimatedEquity = resolveEstimatedEquityAmount(lead);
  const creditTier = resolveCreditTierLabel(lead);
  const leadType = resolveLeadType(lead);
  const completionPercent = resolveCompletionPercent(lead, leadType);
  const dataConfidence = resolveDataConfidence(lead, leadType, completionPercent);
  const revenueTier = resolveRevenueTier(desiredLoanAmount);

  let availableEquityPoints = 0;
  let desiredLoanAmountPoints = 0;
  let creditScorePoints = 0;
  let totalScore = 0;

  if (leadType === "PARTIAL") {
    desiredLoanAmountPoints = partialLoanAmountPoints(desiredLoanAmount);
    totalScore = desiredLoanAmountPoints;
  } else {
    availableEquityPoints = completeEquityPoints(estimatedEquity);
    desiredLoanAmountPoints = completeLoanAmountPoints(desiredLoanAmount);
    creditScorePoints = completeCreditPoints(creditTier);
    totalScore = availableEquityPoints + desiredLoanAmountPoints + creditScorePoints;
  }

  const leadScore = clampScore(totalScore);
  const opportunityScore = leadScore;
  const salesQualityTier =
    leadType === "PARTIAL"
      ? resolvePartialQualityTier(leadScore)
      : resolveCompleteQualityTier(leadScore);
  const callPriority = resolveCallPriority({
    leadType,
    leadScore,
    desiredLoanAmount,
    estimatedEquity,
    revenueTier,
  });

  const scoringBreakdown: ScoringBreakdown = {
    leadType,
    completionPercent,
    dataConfidence,
    availableEquityPoints,
    desiredLoanAmountPoints,
    creditScorePoints,
    totalScore: leadScore,
    opportunityScore,
    qualityTier: salesQualityTier,
    revenueTier,
    callPriority,
    scoringNote: buildScoringNote({
      leadType,
      dataConfidence,
      salesQualityTier,
      callPriority,
    }),
  };

  return {
    leadScore,
    opportunityScore,
    salesQualityTier,
    revenueTier,
    leadType,
    completionPercent,
    dataConfidence,
    callPriority,
    estimatedEquity,
    desiredLoanAmount,
    creditTier,
    scoringBreakdown,
  };
}
