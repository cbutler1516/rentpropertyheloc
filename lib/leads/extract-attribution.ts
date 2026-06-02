import { FUNNEL_VERSION } from "@/lib/leads/funnel-config";
import { UTM_PARAM_KEYS } from "@/lib/leads/constants";

export function extractUtmParams(searchParams: URLSearchParams): Record<string, string> {
  const utm: Record<string, string> = {};

  for (const key of UTM_PARAM_KEYS) {
    const value = searchParams.get(key);
    if (value?.trim()) {
      utm[key] = value.trim();
    }
  }

  return utm;
}

export function extractQueryParams(searchParams: URLSearchParams): Record<string, string> {
  const params: Record<string, string> = {};

  searchParams.forEach((value, key) => {
    if (value.trim()) {
      params[key] = value.trim();
    }
  });

  return params;
}

export function buildLeadCreatePayload(
  input: {
    journey: string;
    funnelVersion?: string;
    propertyType: string;
    propertyValueRange?: string;
    mortgageBalanceRange?: string;
    equityAccessRange?: string;
    creditScoreRange?: string;
    propertyCount?: string;
    fundingTimeline?: string;
    propertyRented?: string;
    propertyStreet?: string;
    propertyCity?: string;
    propertyState?: string;
    propertyZip?: string;
    googlePlaceId?: string;
    propertyValue: number | null;
    mortgageBalance: number | null;
    desiredCashAmount: number | null;
    estimatedEquity: number | null;
    estimatedHeloc?: number | null;
    estimatedHelocLow?: number | null;
    estimatedHelocHigh?: number | null;
    avmSource?: string;
    propertySqft?: number | null;
    propertyBeds?: number | null;
    propertyBaths?: number | null;
    propertyYearBuilt?: number | null;
    propertyLatitude?: number | null;
    propertyLongitude?: number | null;
    estimatedRent?: number | null;
    targetCltvPercent?: number;
    investorScore?: number | null;
    confidenceRating?: string;
    valuationLastUpdated?: string;
    propertyValueLow?: number | null;
    propertyValueHigh?: number | null;
    mortgageBalanceLow?: number | null;
    mortgageBalanceHigh?: number | null;
    lastSaleDate?: string;
    lastSalePrice?: number | null;
    recordedMortgageAmount?: number | null;
    actualMortgageBalance?: number | null;
    useMortgageEstimate?: boolean;
    fundingGoal?: string;
    funnelStepCompleted?: number;
    creditScoreEstimate?: number | null;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    tcpaConsent: boolean;
    marketingOptIn: boolean;
    sourceUrl?: string;
    queryParams?: Record<string, string>;
    utm?: Record<string, string>;
    tcpaConsentAt: string;
  },
  createdAt: string,
) {
  return {
    journey: input.journey,
    funnelVersion: input.funnelVersion ?? FUNNEL_VERSION,
    propertyType: input.propertyType,
    propertyValueRange: input.propertyValueRange ?? "",
    mortgageBalanceRange: input.mortgageBalanceRange ?? "",
    equityAccessRange: input.equityAccessRange ?? "",
    creditScoreRange: input.creditScoreRange ?? "",
    propertyCount: input.propertyCount ?? "",
    fundingTimeline: input.fundingTimeline ?? "",
    propertyRented: input.propertyRented ?? "",
    propertyStreet: input.propertyStreet ?? "",
    propertyCity: input.propertyCity ?? "",
    propertyState: input.propertyState ?? "",
    propertyZip: input.propertyZip ?? "",
    googlePlaceId: input.googlePlaceId ?? "",
    propertyValue: input.propertyValue,
    mortgageBalance: input.mortgageBalance,
    desiredFunds: input.desiredCashAmount,
    estimatedEquity: input.estimatedEquity,
    estimatedHeloc: input.estimatedHeloc ?? null,
    estimatedHelocLow: input.estimatedHelocLow ?? null,
    estimatedHelocHigh: input.estimatedHelocHigh ?? null,
    avmSource: input.avmSource ?? "",
    propertySqft: input.propertySqft ?? null,
    propertyBeds: input.propertyBeds ?? null,
    propertyBaths: input.propertyBaths ?? null,
    propertyYearBuilt: input.propertyYearBuilt ?? null,
    propertyLatitude: input.propertyLatitude ?? null,
    propertyLongitude: input.propertyLongitude ?? null,
    estimatedRent: input.estimatedRent ?? null,
    targetCltvPercent: input.targetCltvPercent ?? 75,
    investorScore: input.investorScore ?? null,
    confidenceRating: input.confidenceRating ?? "",
    valuationLastUpdated: input.valuationLastUpdated ?? "",
    propertyValueLow: input.propertyValueLow ?? null,
    propertyValueHigh: input.propertyValueHigh ?? null,
    mortgageBalanceLow: input.mortgageBalanceLow ?? null,
    mortgageBalanceHigh: input.mortgageBalanceHigh ?? null,
    lastSaleDate: input.lastSaleDate ?? "",
    lastSalePrice: input.lastSalePrice ?? null,
    recordedMortgageAmount: input.recordedMortgageAmount ?? null,
    actualMortgageBalance: input.actualMortgageBalance ?? null,
    useMortgageEstimate: input.useMortgageEstimate ?? true,
    fundingGoal: input.fundingGoal ?? "",
    funnelStepCompleted: input.funnelStepCompleted ?? 0,
    creditScoreEstimate: input.creditScoreEstimate ?? null,
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    phone: input.phone,
    tcpaConsent: input.tcpaConsent,
    tcpaConsentAt: input.tcpaConsentAt,
    marketingOptIn: input.marketingOptIn,
    sourceUrl: input.sourceUrl,
    queryParams: input.queryParams,
    utm: input.utm,
    createdAt,
  };
}
