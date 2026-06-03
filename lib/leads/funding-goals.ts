export type FundingGoalId =
  | "buy-rental"
  | "renovate"
  | "consolidate-debt"
  | "reserves"
  | "other"
  /** @deprecated Legacy funnel values — accepted for API backward compatibility */
  | "cash-flow"
  | "business";

export const FUNDING_GOAL_OPTIONS: { id: FundingGoalId; label: string }[] = [
  { id: "buy-rental", label: "Buy another rental" },
  { id: "renovate", label: "Renovate property" },
  { id: "consolidate-debt", label: "Consolidate debt" },
  { id: "reserves", label: "Build cash reserves" },
  { id: "other", label: "Other / not sure" },
];

const LEGACY_FUNDING_GOAL_IDS = new Set<FundingGoalId>(["cash-flow", "business"]);

export function normalizeFundingGoalId(value: string): FundingGoalId | "" {
  const raw = value.trim();
  if (!raw) return "";
  if (FUNDING_GOAL_OPTIONS.some((option) => option.id === raw)) {
    return raw as FundingGoalId;
  }
  if (LEGACY_FUNDING_GOAL_IDS.has(raw as FundingGoalId)) {
    return raw as FundingGoalId;
  }
  return "";
}

export function getFundingGoalLabel(id: FundingGoalId | ""): string {
  if (!id) return "Not specified";
  return FUNDING_GOAL_OPTIONS.find((option) => option.id === id)?.label ?? id;
}
