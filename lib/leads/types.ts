import type {
  CreditScoreRangeId,
  EquityAccessRangeId,
  FundingTimelineId,
  MortgageBalanceRangeId,
  PropertyCountId,
  PropertyRentedId,
  PropertyValueRangeId,
} from "@/lib/leads/funnel-ranges";
import type { FundingGoalId } from "@/lib/leads/funding-goals";

export type PropertyTypeId =
  | "single-family"
  | "condo"
  | "two-to-four-unit"
  | "other"
  /** @deprecated Legacy funnel values — accepted for API backward compatibility */
  | "duplex"
  | "triplex"
  | "fourplex"
  | "str-vacation"
  | "duplex-triplex-fourplex"
  | "small-multifamily"
  | "fourplex-plus"
  | "townhome"
  | "str-airbnb";

export type LeadFunnelData = {
  propertyType: PropertyTypeId | "";
  propertyValueRange: PropertyValueRangeId | "";
  mortgageBalanceRange: MortgageBalanceRangeId | "";
  equityAccessRange: EquityAccessRangeId | "";
  creditScoreRange: CreditScoreRangeId | "";
  propertyCount: PropertyCountId | "";
  fundingTimeline: FundingTimelineId | "";
  propertyRented: PropertyRentedId | "";
  propertyStreet: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  googlePlaceId: string;
  propertyValue: number | null;
  mortgageBalance: number | null;
  desiredCashAmount: number | null;
  estimatedEquity: number | null;
  estimatedHeloc: number | null;
  estimatedHelocLow: number | null;
  estimatedHelocHigh: number | null;
  avmSource: string;
  propertySqft: number | null;
  propertyBeds: number | null;
  propertyBaths: number | null;
  propertyYearBuilt: number | null;
  propertyLatitude: number | null;
  propertyLongitude: number | null;
  estimatedRent: number | null;
  propertyValueLow: number | null;
  propertyValueHigh: number | null;
  mortgageBalanceLow: number | null;
  mortgageBalanceHigh: number | null;
  lastSaleDate: string;
  lastSalePrice: number | null;
  recordedMortgageAmount: number | null;
  actualMortgageBalance: number | null;
  useMortgageEstimate: boolean;
  fundingGoal: FundingGoalId | "";
  funnelStepCompleted: number;
  targetCltvPercent: number;
  investorScore: number | null;
  confidenceRating: string;
  valuationLastUpdated: string;
  creditScoreEstimate: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tcpaConsent: boolean;
  marketingOptIn: boolean;
};

export type LeadSubmission = LeadFunnelData & {
  submittedAt: string;
  source: "check-options-funnel";
  utm?: Record<string, string>;
};

export type LeadSubmitResult = {
  success: boolean;
  id?: string;
  routingTier?: RoutingTier;
  error?: string;
};

export type LeadQualityTier = "hot" | "warm" | "nurture" | "incomplete";

export type LeadQualification = {
  qualityScore: number;
  qualityTier: LeadQualityTier;
  recommendedFollowUp: string;
  keyReasons: string[];
};

export type RoutingTier = "fast_track" | "standard" | "review" | "nurture";

export type LeadRouting = {
  routingTier: RoutingTier;
  routingLabel: string;
  recommendedAction: string;
  routingReasons: string[];
  secondLienFit: string;
  routingConfidence: RoutingConfidence;
};

export type RoutingConfidence = "initial" | "enriched";

export type LeadCreateRequest = {
  journey: string;
  funnelVersion: string;
  propertyType: PropertyTypeId | "";
  propertyValueRange: string;
  mortgageBalanceRange: string;
  equityAccessRange: string;
  creditScoreRange: string;
  propertyCount: string;
  fundingTimeline: string;
  propertyRented: string;
  propertyStreet: string;
  propertyCity: string;
  propertyState: string;
  propertyZip: string;
  googlePlaceId: string;
  propertyValue: number | null;
  mortgageBalance: number | null;
  desiredFunds: number;
  estimatedEquity: number | null;
  estimatedHeloc: number | null;
  estimatedHelocLow: number | null;
  estimatedHelocHigh: number | null;
  avmSource: string;
  propertySqft: number | null;
  propertyBeds: number | null;
  propertyBaths: number | null;
  propertyYearBuilt: number | null;
  propertyLatitude: number | null;
  propertyLongitude: number | null;
  estimatedRent: number | null;
  propertyValueLow: number | null;
  propertyValueHigh: number | null;
  mortgageBalanceLow: number | null;
  mortgageBalanceHigh: number | null;
  lastSaleDate: string;
  lastSalePrice: number | null;
  recordedMortgageAmount: number | null;
  actualMortgageBalance: number | null;
  useMortgageEstimate: boolean;
  fundingGoal: FundingGoalId | "";
  funnelStepCompleted: number;
  targetCltvPercent: number;
  investorScore: number | null;
  confidenceRating: string;
  valuationLastUpdated: string;
  creditScoreEstimate: number | null;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  tcpaConsent: boolean;
  tcpaConsentAt: string;
  marketingOptIn: boolean;
  sourceUrl?: string;
  queryParams?: Record<string, string>;
  utm?: Record<string, string>;
  createdAt: string;
  source: string;
};

export type ScoredLeadCreateRequest = LeadCreateRequest & LeadQualification & LeadRouting;

export type StoredLead = ScoredLeadCreateRequest & {
  id: string;
};

export type SubmitLeadInput = LeadFunnelData & {
  journey: string;
  funnelVersion: string;
  sourceUrl?: string;
  queryParams?: Record<string, string>;
  utm?: Record<string, string>;
  tcpaConsentAt: string;
};

export type EquityStrategy = "rental_property" | "primary_residence";

export type CheckOptionsPrefill = Partial<
  Pick<
    LeadFunnelData,
    | "propertyType"
    | "propertyValueRange"
    | "mortgageBalanceRange"
    | "equityAccessRange"
    | "creditScoreRange"
    | "propertyValue"
    | "mortgageBalance"
    | "desiredCashAmount"
    | "estimatedEquity"
  >
> & {
  equityStrategy?: EquityStrategy;
};
