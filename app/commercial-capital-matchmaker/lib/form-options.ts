import type {
  CapitalPathId,
  DealPurpose,
  DealTimeline,
  LeveragePosture,
  LoanAmountRange,
  OccupancyStatus,
  PropertyType,
  SponsorExperience,
} from "./types";

export type SelectOption<T extends string = string> = {
  value: T;
  label: string;
  description?: string;
};

export const propertyTypeOptions: SelectOption<PropertyType>[] = [
  { value: "multifamily", label: "Multifamily", description: "5+ units, garden or mid-rise" },
  { value: "office", label: "Office", description: "CBD, suburban, or medical office" },
  { value: "retail", label: "Retail", description: "Strip, NNN, or anchored center" },
  { value: "industrial", label: "Industrial", description: "Warehouse, flex, or logistics" },
  { value: "mixed-use", label: "Mixed-use", description: "Residential + commercial blend" },
  { value: "hospitality", label: "Hospitality", description: "Hotel or lodging asset" },
  { value: "land", label: "Land", description: "Entitled or raw land play" },
  { value: "other", label: "Other", description: "Specialty or unique collateral" },
];

export const dealPurposeOptions: SelectOption<DealPurpose>[] = [
  { value: "acquisition", label: "Acquisition", description: "Purchase stabilized or transitional asset" },
  { value: "refinance", label: "Refinance", description: "Recap existing debt at better terms" },
  { value: "cash-out", label: "Cash-out", description: "Pull equity while holding the asset" },
  { value: "bridge", label: "Bridge", description: "Short-term capital for transition" },
  { value: "construction", label: "Construction", description: "Ground-up or major renovation" },
  { value: "value-add", label: "Value-add", description: "Reposition then stabilize or sell" },
];

export const loanAmountOptions: SelectOption<LoanAmountRange>[] = [
  { value: "under-1m", label: "Under $1M" },
  { value: "1-3m", label: "$1M – $3M" },
  { value: "3-10m", label: "$3M – $10M" },
  { value: "10m-plus", label: "$10M+" },
];

export const occupancyOptions: SelectOption<OccupancyStatus>[] = [
  { value: "stabilized", label: "Stabilized", description: "In-place income, low disruption" },
  { value: "value-add", label: "Value-add", description: "Lease-up, rehab, or NOI growth" },
  { value: "vacant", label: "Vacant / low occupancy", description: "Repositioning required" },
  { value: "development", label: "Development", description: "Pre-stabilization or construction" },
];

export const sponsorExperienceOptions: SelectOption<SponsorExperience>[] = [
  { value: "first-deal", label: "First commercial deal" },
  { value: "2-5-deals", label: "2–5 completed deals" },
  { value: "seasoned", label: "Seasoned operator" },
];

export const timelineOptions: SelectOption<DealTimeline>[] = [
  { value: "under-30-days", label: "Under 30 days" },
  { value: "30-60-days", label: "30–60 days" },
  { value: "60-90-days", label: "60–90 days" },
  { value: "flexible", label: "Flexible" },
];

export const leveragePostureOptions: SelectOption<LeveragePosture>[] = [
  { value: "conservative", label: "Conservative", description: "Lower leverage, stronger coverage" },
  { value: "moderate", label: "Moderate", description: "Balanced proceeds and structure" },
  { value: "aggressive", label: "Aggressive", description: "Max proceeds, higher execution risk" },
];

export const INTAKE_STEPS = [
  {
    id: "property-type" as const,
    title: "What are you financing?",
    helper: "Asset type tells us which lender categories typically engage—no property address needed yet.",
    momentum: "Think collateral category, not loan application details.",
  },
  {
    id: "deal-purpose" as const,
    title: "What outcome are you driving?",
    helper: "Acquisition, recap, bridge, and value-add each open a different capital menu.",
    momentum: "We are mapping strategy—not collecting underwriting submissions.",
  },
  {
    id: "loan-size" as const,
    title: "Approximate loan size?",
    helper: "A range is enough. Size determines whether bank, agency, or capital markets paths are realistic.",
    momentum: "Ballpark proceeds help frame the right conversation.",
  },
  {
    id: "occupancy" as const,
    title: "How stabilized is the asset?",
    helper: "Lenders underwrite to where the asset is today—and where it is headed.",
    momentum: "Stabilization level shapes pricing and structure expectations.",
  },
  {
    id: "sponsor-experience" as const,
    title: "Sponsor experience level?",
    helper: "Track record influences guaranty strength, reserves, and which lenders lean in early.",
    momentum: "Experience helps us position your story—not judge it.",
  },
  {
    id: "timeline" as const,
    title: "Target timing?",
    helper: "Timeline narrows lenders that can actually execute—not just quote.",
    momentum: "Speed and structure go hand in hand.",
  },
  {
    id: "leverage" as const,
    title: "How aggressive on proceeds?",
    helper: "Proceeds appetite filters paths that are realistic versus aspirational.",
    momentum: "This calibrates lender fit—not your credit score.",
  },
  {
    id: "contact" as const,
    title: "Where should we send your strategy?",
    helper: "Your capital strategy and executive summary preview generate on the next screen.",
    momentum: "Quick contact info—then your preliminary capital strategy is ready.",
  },
];

export const CAPITAL_PATH_META: Record<
  CapitalPathId,
  { label: string; tagline: string; typicalUse: string }
> = {
  "agency-multifamily": {
    label: "Agency Multifamily",
    tagline: "Fannie / Freddie execution",
    typicalUse: "Stabilized 5+ unit multifamily with predictable NOI.",
  },
  cmbs: {
    label: "CMBS",
    tagline: "Capital markets execution",
    typicalUse: "Larger stabilized assets with institutional cash flow.",
  },
  "bank-portfolio": {
    label: "Bank Portfolio",
    tagline: "Relationship lender hold",
    typicalUse: "Flexible structures for sponsors with local bank depth.",
  },
  "bridge-debt-fund": {
    label: "Bridge / Debt Fund",
    tagline: "Transitional execution",
    typicalUse: "Value-add, lease-up, or short hold before permanent takeout.",
  },
  "sba-504": {
    label: "SBA 504",
    tagline: "Owner-occupied small business",
    typicalUse: "Smaller owner-user deals with long-term fixed rate potential.",
  },
  "private-credit": {
    label: "Private Credit",
    tagline: "Non-bank flexible capital",
    typicalUse: "Complex assets, aggressive leverage, or speed-critical closes.",
  },
  "equity-jv": {
    label: "Equity / JV Partner",
    tagline: "Sponsor capital stack",
    typicalUse: "Land, development, or deals needing additional basis or expertise.",
  },
};
