import { dealPathMeta } from "./constants";
import { generateStaticNarrative } from "./report-content";
import type { DealAnalysisResult, DealInputs, DealPath } from "./types";

export type PreviewTeasers = {
  pathLabel: string;
  shortLabel: string;
  eyebrow: string;
  headlines: string[];
  trustLine: string;
};

const TRUST_LINE =
  "See your estimated payment, strategy notes, risks, opportunities, and next steps.";

function stripCurrencyPhrases(text: string): string {
  return text
    .replace(/\$[\d,]+(?:\.\d+)?/g, "your numbers")
    .replace(/\d+(\.\d+)?%/g, "your LTV")
    .replace(/\d+\s*months?/gi, "your timeline");
}

export function getPreviewTeasers(
  inputs: DealInputs,
  analysis: DealAnalysisResult,
): PreviewTeasers {
  const meta = dealPathMeta[inputs.path];
  const narrative = generateStaticNarrative(inputs, analysis);

  const candidates = [
    stripCurrencyPhrases(narrative.executiveSummary),
    stripCurrencyPhrases(narrative.recommendedStrategy),
    ...narrative.coachNotes.map(stripCurrencyPhrases),
    ...narrative.nextSteps.slice(0, 2).map(stripCurrencyPhrases),
  ].filter((s) => s.length > 40);

  const headlines = [...new Set(candidates)].slice(0, 3);

  if (headlines.length < 2) {
    headlines.push(
      ...fallbackHeadlines(inputs.path).slice(0, 3 - headlines.length),
    );
  }

  return {
    pathLabel: meta.label,
    shortLabel: meta.shortLabel,
    eyebrow: meta.eyebrow,
    headlines: headlines.slice(0, 3),
    trustLine: TRUST_LINE,
  };
}

function fallbackHeadlines(path: DealPath): string[] {
  switch (path) {
    case "refinance":
      return [
        "Compare current vs proposed payment and whether the math supports closing costs.",
        "Pressure-test break-even timing before you lock a structure.",
      ];
    case "investor-dscr":
      return [
        "See how rent, expenses, and coverage shape your investor loan picture.",
        "Align DSCR and cash flow with the programs lenders actually use.",
      ];
    case "commercial":
      return [
        "NOI-led read on coverage, cap rate, and sponsor-ready structure.",
        "Stress-test debt yield and timing before term sheets.",
      ];
    default:
      return [
        "Payment, cash-to-close, and concession framing before you tour or write.",
        "Structure tradeoffs—not just rate—mapped to your timeline.",
      ];
  }
}
