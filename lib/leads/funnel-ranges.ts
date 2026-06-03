export type PropertyValueRangeId =
  | "under-300k"
  | "300k-500k"
  | "500k-750k"
  | "750k-1m"
  | "1m-plus";

export type MortgageBalanceRangeId =
  | "no-mortgage"
  | "under-100k"
  | "100k-250k"
  | "250k-500k"
  | "500k-plus";

export type EquityAccessRangeId =
  | "under-50k"
  | "50k-100k"
  | "100k-250k"
  | "250k-500k"
  | "500k-plus"
  /** @deprecated Legacy funnel values — accepted for API backward compatibility */
  | "500k-750k"
  | "750k-1m"
  | "1m-plus";

export type CreditScoreRangeId =
  | "760-plus"
  | "720-759"
  | "680-719"
  | "640-679"
  | "below-640"
  /** @deprecated Legacy — accepted for backward compatibility */
  | "below-680"
  | "not-sure";

type RangeOption<T extends string> = {
  id: T;
  label: string;
  estimate: number;
  badge?: string;
};

export const PROPERTY_VALUE_RANGES: RangeOption<PropertyValueRangeId>[] = [
  { id: "under-300k", label: "Under $300k", estimate: 250_000 },
  { id: "300k-500k", label: "$300k – $500k", estimate: 400_000 },
  { id: "500k-750k", label: "$500k – $750k", estimate: 625_000 },
  { id: "750k-1m", label: "$750k – $1M", estimate: 875_000 },
  { id: "1m-plus", label: "$1M+", estimate: 1_500_000 },
];

export const MORTGAGE_BALANCE_RANGES: RangeOption<MortgageBalanceRangeId>[] = [
  { id: "no-mortgage", label: "No mortgage", estimate: 0 },
  { id: "under-100k", label: "Under $100k", estimate: 75_000 },
  { id: "100k-250k", label: "$100k – $250k", estimate: 175_000 },
  { id: "250k-500k", label: "$250k – $500k", estimate: 375_000 },
  { id: "500k-plus", label: "$500k+", estimate: 750_000 },
];

export const EQUITY_ACCESS_RANGES: RangeOption<EquityAccessRangeId>[] = [
  { id: "under-50k", label: "Under $50,000", estimate: 37_500 },
  { id: "50k-100k", label: "$50,000 – $100,000", estimate: 75_000 },
  { id: "100k-250k", label: "$100,000 – $250,000", estimate: 175_000 },
  { id: "250k-500k", label: "$250,000 – $500,000", estimate: 375_000 },
  { id: "500k-plus", label: "$500,000+", estimate: 750_000 },
  { id: "500k-750k", label: "$500k – $750k", estimate: 625_000 },
  { id: "750k-1m", label: "$750k – $1M", estimate: 875_000 },
  { id: "1m-plus", label: "$1M+", estimate: 1_500_000 },
];

/** Options shown in the pre-submit funnel (5 choices). */
export const FUNNEL_EQUITY_ACCESS_RANGES = EQUITY_ACCESS_RANGES.slice(0, 5);

export const CREDIT_SCORE_RANGES: RangeOption<CreditScoreRangeId>[] = [
  { id: "760-plus", label: "760+", estimate: 780 },
  { id: "720-759", label: "720 – 759", estimate: 740 },
  { id: "680-719", label: "680 – 719", estimate: 700 },
  { id: "640-679", label: "640 – 679", estimate: 660 },
  { id: "below-640", label: "Below 640", estimate: 620 },
  { id: "not-sure", label: "Not sure", estimate: 0 },
];

export type PropertyCountId = "1" | "2-4" | "5-plus";
export type FundingTimelineId = "asap" | "within-30-days" | "researching";
export type PropertyRentedId = "yes" | "no" | "part-time" | "not-sure";
export const PROPERTY_COUNT_OPTIONS: { id: PropertyCountId; label: string }[] = [
  { id: "1", label: "1" },
  { id: "2-4", label: "2–4" },
  { id: "5-plus", label: "5+" },
];

export const FUNDING_TIMELINE_OPTIONS: { id: FundingTimelineId; label: string }[] = [
  { id: "asap", label: "ASAP" },
  { id: "within-30-days", label: "Within 30 days" },
  { id: "researching", label: "Just researching options" },
];

export function getPropertyValueEstimate(rangeId: PropertyValueRangeId | ""): number | null {
  return PROPERTY_VALUE_RANGES.find((r) => r.id === rangeId)?.estimate ?? null;
}

export function getMortgageBalanceEstimate(rangeId: MortgageBalanceRangeId | ""): number | null {
  if (!rangeId) return null;
  return MORTGAGE_BALANCE_RANGES.find((r) => r.id === rangeId)?.estimate ?? null;
}

export function getEquityAccessEstimate(rangeId: EquityAccessRangeId | ""): number | null {
  if (!rangeId) return null;
  return EQUITY_ACCESS_RANGES.find((r) => r.id === rangeId)?.estimate ?? null;
}

export function getEquityAccessLabel(rangeId: EquityAccessRangeId | ""): string {
  if (!rangeId) return "Not specified";
  return EQUITY_ACCESS_RANGES.find((r) => r.id === rangeId)?.label ?? rangeId;
}

export function isPriorityReviewFunds(
  desiredFunds: number | null,
  rangeId: EquityAccessRangeId | "",
): boolean {
  if (desiredFunds != null && desiredFunds >= 100_000) return true;
  return (
    rangeId === "100k-250k" ||
    rangeId === "250k-500k" ||
    rangeId === "500k-plus" ||
    rangeId === "500k-750k" ||
    rangeId === "750k-1m" ||
    rangeId === "1m-plus"
  );
}

export function getCreditScoreEstimate(rangeId: CreditScoreRangeId | ""): number | null {
  if (!rangeId || rangeId === "not-sure") return null;
  return CREDIT_SCORE_RANGES.find((r) => r.id === rangeId)?.estimate ?? null;
}

export function computeEstimatedEquity(
  propertyValue: number | null,
  mortgageBalance: number | null,
): number | null {
  if (propertyValue == null || mortgageBalance == null) return null;
  return Math.max(0, propertyValue - mortgageBalance);
}

export function inferPropertyValueRange(value: number): PropertyValueRangeId {
  if (value < 300_000) return "under-300k";
  if (value < 500_000) return "300k-500k";
  if (value < 750_000) return "500k-750k";
  if (value < 1_000_000) return "750k-1m";
  return "1m-plus";
}

export function inferMortgageBalanceRange(value: number): MortgageBalanceRangeId {
  if (value <= 0) return "no-mortgage";
  if (value < 100_000) return "under-100k";
  if (value < 250_000) return "100k-250k";
  if (value < 500_000) return "250k-500k";
  return "500k-plus";
}

export function inferEquityAccessRange(value: number): EquityAccessRangeId {
  if (value < 50_000) return "under-50k";
  if (value < 100_000) return "50k-100k";
  if (value < 250_000) return "100k-250k";
  if (value < 500_000) return "250k-500k";
  return "500k-plus";
}
