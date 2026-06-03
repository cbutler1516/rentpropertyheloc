import { isValidPropertyType } from "@/lib/leads/funnel-config";
import { FUNDING_GOAL_OPTIONS, type FundingGoalId } from "@/lib/leads/funding-goals";
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
import { isValidOwnershipType, type OwnershipTypeId } from "@/lib/leads/ownership-type";
import type { LeadCreateRequest } from "@/lib/leads/types";

export type EnrichmentFieldKey =
  | "propertyType"
  | "propertyValueRange"
  | "mortgageBalanceRange"
  | "creditScoreRange"
  | "propertyCount"
  | "fundingTimeline"
  | "fundingGoal"
  | "ownershipType";

export type EnrichmentFieldUpdate = Partial<Record<EnrichmentFieldKey, string>>;

export function enrichmentDataFromLead(lead: LeadCreateRequest): Record<string, string> {
  return {
    propertyType: lead.propertyType ?? "",
    propertyValueRange: lead.propertyValueRange ?? "",
    mortgageBalanceRange: lead.mortgageBalanceRange ?? "",
    creditScoreRange: lead.creditScoreRange ?? "",
    propertyCount: lead.propertyCount ?? "",
    fundingTimeline: lead.fundingTimeline ?? "",
    fundingGoal: lead.fundingGoal ?? "",
    ownershipType: lead.ownershipType ?? "",
  };
}

export function mergeEnrichmentIntoLead(
  lead: LeadCreateRequest,
  input: EnrichmentFieldUpdate,
): LeadCreateRequest {
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

  const fundingGoalRaw = input.fundingGoal?.trim();
  if (fundingGoalRaw && FUNDING_GOAL_OPTIONS.some((option) => option.id === fundingGoalRaw)) {
    next.fundingGoal = fundingGoalRaw as FundingGoalId;
  }

  const ownershipRaw = input.ownershipType?.trim();
  if (ownershipRaw && isValidOwnershipType(ownershipRaw)) {
    next.ownershipType = ownershipRaw as OwnershipTypeId;
  }

  if (next.propertyValue != null && next.mortgageBalance != null) {
    next.estimatedEquity = computeEstimatedEquity(next.propertyValue, next.mortgageBalance);
  }

  return next;
}

export function parseEnrichmentFieldUpdate(
  body: Record<string, unknown>,
): { updates: EnrichmentFieldUpdate; updatedField?: EnrichmentFieldKey; markStarted: boolean } {
  const markStarted = body.markStarted === true;
  const updates: EnrichmentFieldUpdate = {};

  const fields: EnrichmentFieldKey[] = [
    "propertyType",
    "propertyValueRange",
    "mortgageBalanceRange",
    "creditScoreRange",
    "propertyCount",
    "fundingTimeline",
    "fundingGoal",
    "ownershipType",
  ];

  for (const field of fields) {
    const value = body[field];
    if (typeof value === "string" && value.trim()) {
      updates[field] = value.trim();
    }
  }

  const updatedField =
    typeof body.updatedField === "string" &&
    fields.includes(body.updatedField as EnrichmentFieldKey)
      ? (body.updatedField as EnrichmentFieldKey)
      : undefined;

  return { updates, updatedField, markStarted };
}

export function buildEnrichmentPayload(data: Record<string, string | undefined>) {
  return {
    property_type: data.propertyType ?? "",
    estimated_property_value: data.propertyValueRange ?? "",
    current_mortgage_balance: data.mortgageBalanceRange ?? "",
    estimated_credit_score: data.creditScoreRange ?? "",
    investment_properties_owned: data.propertyCount ?? "",
    funding_timeline: data.fundingTimeline ?? "",
    intended_use_of_funds: data.fundingGoal ?? "",
    ownership_type: data.ownershipType ?? "",
  };
}
