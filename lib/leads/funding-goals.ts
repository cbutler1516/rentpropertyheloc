export type FundingGoalId =
  | "buy-rental"
  | "renovate"
  | "consolidate-debt"
  | "cash-flow"
  | "business"
  | "reserves"
  | "other";

export const FUNDING_GOAL_OPTIONS: { id: FundingGoalId; label: string }[] = [
  { id: "buy-rental", label: "Buy another rental" },
  { id: "renovate", label: "Renovate current property" },
  { id: "consolidate-debt", label: "Consolidate debt" },
  { id: "cash-flow", label: "Improve cash flow" },
  { id: "business", label: "Business investment" },
  { id: "reserves", label: "Emergency reserves" },
  { id: "other", label: "Other" },
];

export function getFundingGoalLabel(id: FundingGoalId | ""): string {
  if (!id) return "Not specified";
  return FUNDING_GOAL_OPTIONS.find((option) => option.id === id)?.label ?? id;
}
