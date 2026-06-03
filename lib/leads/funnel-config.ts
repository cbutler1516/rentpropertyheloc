import type { LeadFunnelData, PropertyTypeId } from "@/lib/leads/types";

export const FUNNEL_VERSION = "v9-lead-capture-2026" as const;

export const AUTO_ADVANCE_DELAY_MS = 250;

export const FUNNEL_PROPERTY_OPTIONS: { id: PropertyTypeId; label: string }[] = [
  { id: "single-family", label: "Single Family" },
  { id: "condo", label: "Condo" },
  { id: "two-to-four-unit", label: "2–4 Unit" },
  { id: "other", label: "Other" },
];

/** @deprecated Use FUNNEL_PROPERTY_OPTIONS — kept for legacy API validation */
export const PROPERTY_TYPES: { id: PropertyTypeId; label: string; short: string }[] = [
  ...FUNNEL_PROPERTY_OPTIONS.map((o) => ({ ...o, short: o.label.slice(0, 3) })),
  { id: "duplex", label: "Duplex", short: "2-unit" },
  { id: "triplex", label: "Triplex", short: "3-unit" },
  { id: "fourplex", label: "Fourplex", short: "4-unit" },
  { id: "duplex-triplex-fourplex", label: "Duplex/Triplex/Fourplex", short: "2–4" },
  { id: "small-multifamily", label: "Small multifamily", short: "MF" },
  { id: "fourplex-plus", label: "Fourplex or larger", short: "4+" },
  { id: "townhome", label: "Townhome rental", short: "TH" },
  { id: "str-vacation", label: "Airbnb / Vacation Rental", short: "STR" },
  { id: "str-airbnb", label: "Short-term rental", short: "STR" },
];

/** Pre-submit question steps (excludes confirmation). */
export const FUNNEL_QUESTION_COUNT = 3;
export const FUNNEL_STEP_COUNT = 4;

export const FUNNEL_STEPS = [
  { id: "property-address", title: "Property address", step: 1 },
  { id: "requested-funds", title: "Requested funds", step: 2 },
  { id: "contact-consent", title: "Your info", step: 3 },
  { id: "confirmation", title: "Confirmation", step: 4 },
] as const;

export const DEFAULT_FUNNEL_DATA: LeadFunnelData = {
  propertyType: "",
  propertyValueRange: "",
  mortgageBalanceRange: "",
  equityAccessRange: "",
  creditScoreRange: "",
  propertyCount: "",
  fundingTimeline: "",
  propertyRented: "",
  propertyStreet: "",
  propertyCity: "",
  propertyState: "",
  propertyZip: "",
  googlePlaceId: "",
  propertyValue: null,
  mortgageBalance: null,
  desiredCashAmount: null,
  estimatedEquity: null,
  estimatedHeloc: null,
  estimatedHelocLow: null,
  estimatedHelocHigh: null,
  avmSource: "",
  propertySqft: null,
  propertyBeds: null,
  propertyBaths: null,
  propertyYearBuilt: null,
  propertyLatitude: null,
  propertyLongitude: null,
  estimatedRent: null,
  propertyValueLow: null,
  propertyValueHigh: null,
  mortgageBalanceLow: null,
  mortgageBalanceHigh: null,
  lastSaleDate: "",
  lastSalePrice: null,
  recordedMortgageAmount: null,
  actualMortgageBalance: null,
  useMortgageEstimate: true,
  fundingGoal: "",
  ownershipType: "",
  funnelStepCompleted: 0,
  targetCltvPercent: 75,
  investorScore: null,
  confidenceRating: "",
  valuationLastUpdated: "",
  creditScoreEstimate: null,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  tcpaConsent: false,
  marketingOptIn: false,
};

export function getPropertyTypeLabel(id: PropertyTypeId | ""): string {
  if (!id) return "Rental property";
  return (
    FUNNEL_PROPERTY_OPTIONS.find((t) => t.id === id)?.label ??
    PROPERTY_TYPES.find((t) => t.id === id)?.label ??
    "Rental property"
  );
}

export function isValidPropertyType(value: string): value is PropertyTypeId {
  if (!value) return false;
  return PROPERTY_TYPES.some((t) => t.id === value);
}

export function getFunnelStepId(step: number): string {
  return FUNNEL_STEPS.find((s) => s.step === step)?.id ?? `step-${step}`;
}

export function getFunnelStepTitle(step: number): string {
  return FUNNEL_STEPS.find((s) => s.step === step)?.title ?? "";
}
