import { ADVISOR } from "@/lib/trust-content";
import { SITE_NAME } from "@/lib/site";

export const FINANCING_REVIEW_DISCLAIMER =
  "This review is for informational purposes only and is not a loan approval, commitment to lend, rate quote, or credit decision. All financing options remain subject to lender review, underwriting, property eligibility, and applicable guidelines.";

export const COMPLETION_STRATEGY_PATHS = [
  {
    id: "rental-heloc",
    icon: "🏦",
    name: "Rental Property HELOC",
    suitability:
      "We'll review whether this option may be suitable for your scenario.",
  },
  {
    id: "second-mortgage",
    icon: "📋",
    name: "Second Mortgage",
    suitability:
      "We'll review whether this option may be suitable for your scenario.",
  },
  {
    id: "cash-out",
    icon: "💰",
    name: "Cash-Out Refinance",
    suitability:
      "We'll review whether this option may be suitable for your scenario.",
  },
  {
    id: "portfolio",
    icon: "📈",
    name: "Portfolio Financing",
    suitability:
      "We'll review whether this option may be suitable for your scenario.",
  },
] as const;

export const COMPLETION_TIMELINE = [
  { id: "received", label: "Information Received", complete: true },
  { id: "started", label: "Review Started", complete: true },
  { id: "analysis", label: "Financing Analysis", complete: true },
  { id: "followup", label: "Specialist Follow-Up", complete: false },
] as const;

export const COMPLETION_REVIEW_NOTE = "Most reviews are evaluated within 1 business day.";

export const TALK_THROUGH_OPTIONS_LABEL = "Talk Through My Options";
export const DOWNLOAD_REVIEW_SUMMARY_LABEL = "Download Review Summary";

/** @deprecated Use COMPLETION_STRATEGY_PATHS */
export const FINANCING_REVIEW_PATHS = COMPLETION_STRATEGY_PATHS;

/** @deprecated Use COMPLETION_TIMELINE */
export const FINANCING_REVIEW_NEXT_STEPS = COMPLETION_TIMELINE.map((item, index) => ({
  step: index + 1,
  title: item.label,
  description: item.complete ? "Complete" : "Upcoming",
}));

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
