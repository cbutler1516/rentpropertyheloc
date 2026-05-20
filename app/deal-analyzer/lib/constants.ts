import type { BuydownType, DealPath } from "./types";

export const DEAL_ANALYZER_DISCLAIMER =
  "Estimates are for educational purposes only and are not a loan estimate, commitment to lend, or guarantee of terms.";

export const STRATEGY_CALL_URL = "/#cta";

export const dealPathMeta: Record<
  DealPath,
  {
    label: string;
    shortLabel: string;
    description: string;
    eyebrow: string;
  }
> = {
  "buy-home": {
    label: "Buy a Home",
    shortLabel: "Purchase",
    description:
      "Payment, cash-to-close, concessions, and buydown framing before you tour or write.",
    eyebrow: "Primary Residence",
  },
  refinance: {
    label: "Refinance / Cash-Out",
    shortLabel: "Refinance",
    description:
      "Compare current vs proposed structure, monthly savings, and break-even timing.",
    eyebrow: "Homeowner Strategy",
  },
  "investor-dscr": {
    label: "Investor / DSCR",
    shortLabel: "DSCR",
    description:
      "Rental income, debt service coverage, cap rate, and monthly cash-flow read.",
    eyebrow: "Rental & Portfolio",
  },
  commercial: {
    label: "Commercial",
    shortLabel: "Commercial",
    description:
      "NOI-led structure, coverage, cap rate, and sponsor-ready deal snapshot.",
    eyebrow: "Sponsor & Asset",
  },
};

export const defaultFormValues = {
  propertyValue: 650_000,
  interestRate: 6.75,
  loanTermYears: 30,
  annualPropertyTax: 7_800,
  annualInsurance: 1_800,
  monthlyHoa: 0,
  downPaymentPercent: 20,
  sellerConcession: 15_000,
  buydownType: "none" as BuydownType,
  currentBalance: 420_000,
  currentRate: 7.25,
  cashOutAmount: 50_000,
  estimatedClosingCosts: 8_500,
  monthlyRent: 3_400,
  vacancyRate: 5,
  monthlyManagement: 340,
  monthlyMaintenance: 150,
  annualNoi: 72_000,
  annualOtherIncome: 0,
  annualOperatingExpenses: 18_000,
};
