import { DEAL_ANALYZER_DISCLAIMER } from "@/lib/deal-analyzer/constants";
import type { AnalysisResult, DealType, NarrativeSection } from "@/lib/deal-analyzer/types";

const DEAL_TYPE_LABELS: Record<DealType, string> = {
  "buy-home": "Home purchase",
  refinance: "Refinance",
  "investor-dscr": "Investor / DSCR",
  commercial: "Commercial",
};

export function buildNarrativeFromAnalysis(
  analysis: AnalysisResult,
  leadName: string,
): NarrativeSection {
  const dealLabel = DEAL_TYPE_LABELS[analysis.dealType];

  const dealSnapshot: Record<string, string> = {
    "Deal path": dealLabel,
    "Prepared for": leadName,
    "Summary": analysis.summary,
  };

  for (const [key, value] of Object.entries(analysis.calculations)) {
    if (value != null && value !== "") {
      dealSnapshot[key.replace(/([A-Z])/g, " $1").trim()] = String(value);
    }
  }

  const coachesNotes = [
    "This Playbook Report models one educational scenario — not a loan offer or approval.",
    "Compare this path with HELOC, DSCR, or alternate structures before you commit.",
    "Bring property details, timeline, and documentation goals to a strategy call for human review.",
  ];

  const risks = [
    "Rates, fees, and program guidelines change with market and investor appetite.",
    "Appraisal, insurance, and occupancy can shift final numbers materially.",
    "Tax and legal implications are not addressed in this educational model.",
  ];

  const opportunities = [
    "Clarify payment, cash flow, or DSCR before you shop or submit.",
    "Use this report in agent or advisor consults to align structure with your hold plan.",
    "Follow up with Build My Loan Playbook for a licensed partner review when ready.",
  ];

  const nextSteps = [
    "Save or print this Playbook Report for your records.",
    "Book a strategy call to pressure-test assumptions with a mortgage strategist.",
    "Start Build My Loan Playbook if you want a formal financing review path.",
  ];

  let recommendedStrategy = `Based on your ${dealLabel.toLowerCase()} inputs, focus on ${analysis.summary} Then compare alternate structures in the Deal Analyzer before applying.`;

  if (analysis.dealType === "investor-dscr") {
    recommendedStrategy =
      "Stress-test rent, vacancy, and debt service assumptions. If DSCR is below typical thresholds, explore equity or alternate investor programs — subject to approval.";
  } else if (analysis.dealType === "commercial") {
    recommendedStrategy =
      "Validate NOI stability and sponsor experience before capital markets conversations. Use this model for timing and structure context only.";
  } else if (analysis.dealType === "refinance") {
    recommendedStrategy =
      "Compare break-even months against your hold timeline. If savings are negative, evaluate HELOC or keeping the current first lien.";
  }

  return {
    executiveSummary: `${leadName}, here is your educational ${dealLabel} Playbook Report. ${analysis.summary} This is strategy-first context — not a commitment to lend.`,
    dealSnapshot,
    keyMetrics: analysis.metrics,
    coachesNotes,
    recommendedStrategy,
    risks,
    opportunities,
    nextSteps,
    disclaimer: DEAL_ANALYZER_DISCLAIMER,
  };
}
