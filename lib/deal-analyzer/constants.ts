import type { DealPathOption } from "@/lib/deal-analyzer/types";

export const DEAL_ANALYZER_CONSENT_TEXT =
  "I agree to be contacted by The Loan Playbook by call, text, or email about my financing scenario. Message and data rates may apply. Consent is not required to obtain financing.";

export const DEAL_ANALYZER_DISCLAIMER =
  "Estimates are for educational purposes only and are not a Loan Estimate, commitment to lend, or guarantee of terms. Financing is subject to credit, income, asset, property, and program approval.";

export const DEAL_ANALYZER_SESSION_KEY = "tlp_deal_analyzer_session";
export const DEAL_ANALYZER_LOCAL_REPORTS_KEY = "tlp_deal_analyzer_local_reports";

export const DEAL_PATH_OPTIONS: DealPathOption[] = [
  {
    id: "buy-home",
    title: "Buy a home",
    description: "Purchase payment, LTV, concessions, and buydown context.",
  },
  {
    id: "refinance",
    title: "Refinance",
    description: "Compare current vs new terms and break-even timing.",
  },
  {
    id: "investor-dscr",
    title: "Investor / DSCR",
    description: "Rental cash flow, DSCR, and cap rate modeling.",
  },
  {
    id: "commercial",
    title: "Commercial",
    description: "NOI, commercial DSCR, and debt service coverage.",
  },
];

export const ROLE_OPTIONS = [
  "Buyer",
  "Homeowner",
  "Investor",
  "Agent",
  "Commercial operator",
  "Other",
] as const;
