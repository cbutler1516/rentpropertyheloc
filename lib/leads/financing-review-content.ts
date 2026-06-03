import { ADVISOR } from "@/lib/trust-content";
import { SITE_NAME } from "@/lib/site";

export const FINANCING_REVIEW_DISCLAIMER =
  "This review is for informational purposes only and is not a loan approval, commitment to lend, rate quote, or credit decision. All financing options remain subject to lender review, underwriting, property eligibility, and applicable guidelines.";

export const FINANCING_REVIEW_PATHS = [
  {
    id: "rental-heloc",
    icon: "🏦",
    name: "Rental Property HELOC",
    description:
      "A revolving line of credit secured by rental property equity that may allow flexible access while keeping an existing first mortgage in place.",
  },
  {
    id: "second-mortgage",
    icon: "📋",
    name: "2nd Mortgage",
    description:
      "A second-position loan structure that may provide a defined lump sum for investors who prefer not to replace their current first mortgage.",
  },
  {
    id: "dscr-cash-out",
    icon: "📈",
    name: "DSCR Cash-Out Refinance",
    description:
      "A refinance path that may be reviewed for investors when rental income and property cash flow support the scenario under lender guidelines.",
  },
  {
    id: "other-options",
    icon: "🔍",
    name: "Other Applicable Options",
    description:
      "Additional financing paths that may be worth discussing based on property type, portfolio goals, and program availability.",
  },
] as const;

export const FINANCING_REVIEW_NEXT_STEPS = [
  {
    step: 1,
    title: "Specialist review",
    description:
      "A licensed financing specialist reviews your preliminary profile and property context.",
  },
  {
    step: 2,
    title: "Path discussion",
    description:
      "We identify potential financing paths that may fit your scenario for further discussion.",
  },
  {
    step: 3,
    title: "Personalized follow-up",
    description:
      "Our team reaches out to walk through options, questions, and practical next steps.",
  },
  {
    step: 4,
    title: "Your decision",
    description:
      "You decide whether to move forward with a formal application — there is no obligation at this stage.",
  },
] as const;

export const FINANCING_REVIEW_CONTACT = {
  company: ADVISOR.company,
  advisorName: ADVISOR.name,
  advisorTitle: ADVISOR.title,
  phone: ADVISOR.phone,
  email: ADVISOR.email,
  nmls: ADVISOR.nmls,
  companyNmls: ADVISOR.companyNmls,
  licensedStates: ADVISOR.licensedStates,
  siteName: SITE_NAME,
} as const;
