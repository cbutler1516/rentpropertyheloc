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
  | "agent-partnership";

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
];

export const timelineOptions = [
  "Within 30 days",
  "1–3 months",
  "3–6 months",
  "6+ months",
  "Exploring / not sure",
] as const;

export const propertyTypeOptions = [
  "Single-family residence",
  "Condo / townhome",
  "Multi-family (2–4 units)",
  "Multi-family (5+ units)",
  "Commercial / mixed-use",
  "Land / development",
  "Other",
] as const;

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
