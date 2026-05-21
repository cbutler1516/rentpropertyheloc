import type { LeadIntent } from "../components/lead-capture-form";

export type IntakeGoalId =
  | "buy-home"
  | "buy-before-sell"
  | "lower-payment"
  | "use-equity"
  | "investment-property"
  | "dscr"
  | "commercial-financing"
  | "builder-development"
  | "agent-partnership"
  | "not-sure-yet";

export type IntakeGoal = {
  id: IntakeGoalId;
  label: string;
  description: string;
  leadIntent: LeadIntent;
  formType: string;
};

export const intakeGoals: IntakeGoal[] = [
  {
    id: "buy-home",
    label: "Buy a home",
    description: "Payment, cash, and readiness before the search.",
    leadIntent: "buyer",
    formType: "Strategy Intake — Buy a home",
  },
  {
    id: "buy-before-sell",
    label: "Buy before sell",
    description: "Move-up timing and bridge structure.",
    leadIntent: "buyer",
    formType: "Strategy Intake — Buy before sell",
  },
  {
    id: "lower-payment",
    label: "Lower my payment",
    description: "Refinance timing and break-even framing.",
    leadIntent: "homeowner",
    formType: "Strategy Intake — Lower payment",
  },
  {
    id: "use-equity",
    label: "Use home equity",
    description: "HELOC, cash-out, or hold scenarios.",
    leadIntent: "homeowner",
    formType: "Strategy Intake — Home equity",
  },
  {
    id: "investment-property",
    label: "Investment property",
    description: "Rental, portfolio, and hold strategy.",
    leadIntent: "commercial",
    formType: "Strategy Intake — Investment property",
  },
  {
    id: "dscr",
    label: "DSCR / investor financing",
    description: "Asset-based rental and investor paths.",
    leadIntent: "commercial",
    formType: "Strategy Intake — DSCR",
  },
  {
    id: "commercial-financing",
    label: "Commercial financing",
    description: "Sponsor, asset, and capital stack clarity.",
    leadIntent: "commercial",
    formType: "Strategy Intake — Commercial",
  },
  {
    id: "builder-development",
    label: "Builder / development financing",
    description: "Ground-up, spec, and project sequencing.",
    leadIntent: "commercial",
    formType: "Strategy Intake — Builder / development",
  },
  {
    id: "agent-partnership",
    label: "Agent partnership",
    description: "Buyer financing context for your clients.",
    leadIntent: "agent",
    formType: "Strategy Intake — Agent partnership",
  },
  {
    id: "not-sure-yet",
    label: "Not sure yet",
    description: "We'll help narrow the path after a few questions.",
    leadIntent: "buyer",
    formType: "Strategy Intake — Not sure yet",
  },
];

export function getIntakeSubmitLabel(goalId: string): string {
  switch (goalId) {
    case "investment-property":
    case "dscr":
      return "Review Investment Strategy";
    case "commercial-financing":
    case "builder-development":
      return "Review Commercial Scenario";
    case "lower-payment":
    case "use-equity":
      return "Review My Options";
    default:
      return "Start My Strategy";
  }
}

export const timelineOptions = [
  "Within 30 days",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Exploring / not sure",
] as const;

export const purchasePriceRangeOptions = [
  "Under $500k",
  "$500k–$750k",
  "$750k–$1M",
  "$1M–$2M",
  "$2M+",
  "Not sure yet",
] as const;

export const downPaymentRangeOptions = [
  "0–5%",
  "10%",
  "15–20%",
  "25%+",
  "Using equity",
  "Not sure yet",
] as const;

const buyHomePropertyOptions = [
  "Single-family",
  "Condo / townhouse",
  "2–4 unit",
  "New construction",
  "Vacation home",
  "Not sure yet",
] as const;

const buyBeforeSellPropertyOptions = [
  "Current primary residence",
  "Next primary residence",
  "Single-family",
  "Condo / townhouse",
  "2–4 unit",
  "Not sure yet",
] as const;

const lowerPaymentPropertyOptions = [
  "Primary residence",
  "Condo",
  "Jumbo property",
  "Investment property",
  "Multi-unit",
  "Not sure yet",
] as const;

const useEquityPropertyOptions = [
  "Primary residence",
  "Investment property",
  "Condo",
  "Multi-unit",
  "Vacation home",
  "Not sure yet",
] as const;

const investmentPropertyOptions = [
  "Rental property",
  "Short-term rental",
  "2–4 unit",
  "Multifamily",
  "Mixed-use",
  "BRRRR / rehab",
  "DSCR",
  "Portfolio expansion",
] as const;

const dscrPropertyOptions = [
  "Single rental",
  "Short-term rental",
  "2–4 unit",
  "Multifamily",
  "Mixed-use",
  "Portfolio expansion",
  "Cash-out refinance",
  "Not sure yet",
] as const;

const commercialPropertyOptions = [
  "Multifamily",
  "Mixed-use",
  "Retail",
  "Office",
  "Industrial",
  "Warehouse",
  "Construction",
  "Bridge financing",
  "Owner-user",
  "SBA",
  "Land acquisition",
  "Development",
] as const;

const builderPropertyOptions = [
  "Spec homes",
  "Townhomes",
  "Small multifamily",
  "Land development",
  "Vertical construction",
  "Acquisition financing",
  "Bridge-to-perm",
  "Subdivision",
] as const;

const agentPartnershipPropertyOptions = [
  "Buyer support",
  "Listing strategy",
  "New construction",
  "Investor clients",
  "Move-up buyers",
  "Team / brokerage",
  "Not sure yet",
] as const;

const defaultPropertyOptions = buyHomePropertyOptions;

const propertyOptionsByGoal: Record<IntakeGoalId, readonly string[]> = {
  "buy-home": buyHomePropertyOptions,
  "buy-before-sell": buyBeforeSellPropertyOptions,
  "lower-payment": lowerPaymentPropertyOptions,
  "use-equity": useEquityPropertyOptions,
  "investment-property": investmentPropertyOptions,
  dscr: dscrPropertyOptions,
  "commercial-financing": commercialPropertyOptions,
  "builder-development": builderPropertyOptions,
  "agent-partnership": agentPartnershipPropertyOptions,
  "not-sure-yet": defaultPropertyOptions,
};

export function getPropertyTypeOptionsForGoal(goalId: IntakeGoalId | ""): string[] {
  if (!goalId) return [...defaultPropertyOptions];
  return [...(propertyOptionsByGoal[goalId] ?? defaultPropertyOptions)];
}

/** Fallback list when no goal is selected yet. */
export const propertyTypeOptions = defaultPropertyOptions;

export function hasFinancialRangesInput(snapshot: {
  purchasePriceRange: string;
  downPaymentRange: string;
}): boolean {
  return Boolean(snapshot.purchasePriceRange || snapshot.downPaymentRange);
}

export const experienceOptions = [
  "First transaction",
  "Some experience",
  "Experienced investor / operator",
  "Professional advisor / agent",
] as const;

export const stateOptions = [
  "Washington",
  "Texas",
  "Florida",
  "Arizona",
  "California",
  "Colorado",
  "Oregon",
  "Idaho",
  "Illinois",
  "Michigan",
  "Other / multi-state",
] as const;

export function getIntakeGoal(id: IntakeGoalId | "") {
  return intakeGoals.find((goal) => goal.id === id);
}

/** Steps after goal selection (contact is always last). */
export const intakeStepIds = [
  "timeline",
  "financials",
  "property",
  "goals",
  "market",
  "experience",
  "contact",
] as const;

export type IntakeStepId = (typeof intakeStepIds)[number];

export function getIntakeStepsForGoal(goalId: IntakeGoalId | "") {
  if (goalId === "agent-partnership") {
    return intakeStepIds.filter((id) => id !== "property" && id !== "financials");
  }
  return [...intakeStepIds];
}

export function getTotalIntakeSteps(goalId: IntakeGoalId | "") {
  return 1 + getIntakeStepsForGoal(goalId).length;
}

/** Legacy `goals` string plus structured priority fields for intake submit. */
export function buildGoalsPayload(
  strategyPriorities: string[],
  goalsNotes: string,
) {
  const notes = goalsNotes.trim();
  const parts = [...strategyPriorities];
  if (notes) parts.push(notes);
  return {
    strategyPriorities,
    goalsNotes: notes || undefined,
    goals: parts.join(" | "),
  };
}
