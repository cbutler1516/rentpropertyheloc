import { dealPathMeta } from "../constants";
import type { PlaybookNarrative } from "../narrative-types";
import type { DealAnalysisResult, DealInputs, LeadCapture } from "../types";

export function buildSuggestedFollowUp(input: {
  lead: LeadCapture;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  narrative: PlaybookNarrative | null;
}): string {
  const { lead, inputs, analysis, narrative } = input;
  const pathLabel = dealPathMeta[inputs.path].shortLabel;
  const firstNext = narrative?.nextSteps?.find((s) => s.trim().length > 0);

  if (firstNext) {
    return firstNext;
  }

  const name = lead.name.trim() || "there";

  if (lead.role === "Agent") {
    return `Connect with ${name} on the ${pathLabel} scenario — confirm client timeline, share the Playbook link, and offer a joint strategy call for their borrower.`;
  }

  if (inputs.path === "refinance" && analysis.refinance) {
    const savings = analysis.refinance.monthlySavings;
    if (savings > 0) {
      return `Follow up with ${name} on refinance savings (~$${Math.round(savings)}/mo) — validate current rate/payoff, discuss break-even, and book a structure review.`;
    }
    return `Review ${name}'s refinance inputs together — payment may not improve at current assumptions; explore rate/term or cash-out alternatives.`;
  }

  if (inputs.path === "investor-dscr" && analysis.investor) {
    return `Walk ${name} through DSCR (${analysis.investor.dscr.toFixed(2)}x) and cash flow — confirm rent roll, reserves, and best-fit investor program before they write offers.`;
  }

  if (inputs.path === "commercial" && analysis.commercial) {
    return `Schedule a sponsor call with ${name} — pressure-test NOI, DSCR (${analysis.commercial.dscr.toFixed(2)}x), and timing for term sheets or refi.`;
  }

  return `Reach out to ${name} on their ${pathLabel} Playbook — confirm budget, timeline, and pre-approval path; offer a Strategy Call to align structure before they shop rates.`;
}
