export const PROPERTY_TYPES = [
  "multifamily",
  "office",
  "retail",
  "industrial",
  "mixed-use",
  "hospitality",
  "land",
  "other",
] as const;

export const DEAL_PURPOSES = [
  "acquisition",
  "refinance",
  "cash-out",
  "bridge",
  "construction",
  "value-add",
] as const;

export const LOAN_AMOUNT_RANGES = [
  "under-1m",
  "1-3m",
  "3-10m",
  "10m-plus",
] as const;

export const OCCUPANCY_STATUSES = [
  "stabilized",
  "value-add",
  "vacant",
  "development",
] as const;

export const SPONSOR_EXPERIENCE_LEVELS = [
  "first-deal",
  "2-5-deals",
  "seasoned",
] as const;

export const DEAL_TIMELINES = [
  "under-30-days",
  "30-60-days",
  "60-90-days",
  "flexible",
] as const;

export const LEVERAGE_POSTURES = [
  "conservative",
  "moderate",
  "aggressive",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];
export type DealPurpose = (typeof DEAL_PURPOSES)[number];
export type LoanAmountRange = (typeof LOAN_AMOUNT_RANGES)[number];
export type OccupancyStatus = (typeof OCCUPANCY_STATUSES)[number];
export type SponsorExperience = (typeof SPONSOR_EXPERIENCE_LEVELS)[number];
export type DealTimeline = (typeof DEAL_TIMELINES)[number];
export type LeveragePosture = (typeof LEVERAGE_POSTURES)[number];

export type DealIntake = {
  propertyType: PropertyType | "";
  dealPurpose: DealPurpose | "";
  loanAmountRange: LoanAmountRange | "";
  occupancyStatus: OccupancyStatus | "";
  sponsorExperience: SponsorExperience | "";
  timeline: DealTimeline | "";
  leveragePosture: LeveragePosture | "";
  sponsorName: string;
  sponsorEmail: string;
  companyName: string;
  dealNotes: string;
};

export const CAPITAL_PATH_IDS = [
  "agency-multifamily",
  "cmbs",
  "bank-portfolio",
  "bridge-debt-fund",
  "sba-504",
  "private-credit",
  "equity-jv",
] as const;

export type CapitalPathId = (typeof CAPITAL_PATH_IDS)[number];

export type CapitalPathRecommendation = {
  primaryPath: CapitalPathId;
  secondaryPath: CapitalPathId | null;
  alternatePaths: CapitalPathId[];
  confidence: "high" | "medium" | "exploratory";
  capitalFitScore: number;
  headline: string;
  rationale: string[];
  structureNotes: string[];
  risks: string[];
  keyLenderConcern: string;
  bestNextStep: string;
  timingFit: string;
};

export type CapitalMatch = {
  id: string;
  lenderName: string;
  productLabel: string;
  pathId: CapitalPathId;
  fitScore: number;
  rateBand: string;
  termSnapshot: string;
  leverageRange: string;
  speedToQuote: string;
  highlights: string[];
  considerations: string[];
};

export type ExecutiveSummary = {
  dealTitle: string;
  preparedFor: string;
  generatedAt: string;
  memoClassification: string;
  informationDisclaimer: string;
  preparedBy: {
    name: string;
    organization: string;
    role: string;
  };
  advisorOpening: string;
  snapshot: {
    propertyType: string;
    purpose: string;
    loanRange: string;
    occupancy: string;
    timeline: string;
    sponsor: string;
  };
  likelyCapitalPath: string;
  strengths: string[];
  lenderConcerns: string[];
  suggestedStructure: string[];
  documentChecklist: string[];
  broadviewRecommendation: string;
  disclaimer: string;
  footerLine: string;
};

export type LeadQualityTag =
  | "hot"
  | "needs-review"
  | "docs-needed"
  | "lender-ready";

export type LeadSource =
  | "intake"
  | "sample"
  | "strategy-review"
  | "memo-cta";

export type LeadStatus =
  | "new"
  | "reviewed"
  | "docs-needed"
  | "lender-ready"
  | "archived";

export type StrategyReviewSubmission = {
  name: string;
  email: string;
  phone: string;
  company: string;
  propertyAddress: string;
  transactionType: string;
  estimatedValue: string;
  requestedLoanAmount: string;
  notes: string;
  consent: boolean;
};

export type CcmLeadRecord = {
  id: string;
  source: LeadSource;
  createdAt: string;
  lastUpdatedAt: string;
  status: LeadStatus;
  qualityTag: LeadQualityTag;
  recommendedFollowUp: string;
  missingDocuments: string[];
  notes: string;
  intake: DealIntake;
  recommendation: CapitalPathRecommendation | null;
  matchCount: number;
  strategyReview?: StrategyReviewSubmission;
};

export type CcmSession = {
  intake: DealIntake;
  recommendation: CapitalPathRecommendation | null;
  matches: CapitalMatch[];
  summary: ExecutiveSummary | null;
  leads: CcmLeadRecord[];
};

export type IntakeStepId =
  | "property-type"
  | "deal-purpose"
  | "loan-size"
  | "occupancy"
  | "sponsor-experience"
  | "timeline"
  | "leverage"
  | "contact";
