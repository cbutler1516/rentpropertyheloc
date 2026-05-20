import type { DealAnalysisResult, DealInputs, LeadCapture } from "../types";
import type { DealAnalyzerReportRow } from "./types";

const URGENCY_KEYWORDS = [
  "urgent",
  "asap",
  "closing",
  "timeline",
  "soon",
  "this week",
  "rate lock",
  "under contract",
  "offer",
  "deadline",
];

function hasUrgentNotes(notes: string): boolean {
  const lower = notes.toLowerCase();
  return URGENCY_KEYWORDS.some((kw) => lower.includes(kw));
}

export function scoreToLabel(
  score: number,
): DealAnalyzerReportRow["leadScoreLabel"] {
  if (score >= 75) return "Hot";
  if (score >= 55) return "Warm";
  if (score >= 35) return "Standard";
  return "Nurture";
}

export function computeLeadScore(input: {
  lead: LeadCapture;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
}): number {
  const { lead, inputs, analysis } = input;
  let score = 20;

  const loan = analysis.loanAmount;
  if (loan >= 1_500_000) score += 30;
  else if (loan >= 1_000_000) score += 24;
  else if (loan >= 750_000) score += 18;
  else if (loan >= 500_000) score += 12;
  else if (loan >= 350_000) score += 8;
  else score += 4;

  if (lead.role === "Agent") score += 14;
  if (lead.role === "Commercial Client") score += 12;
  if (lead.role === "Investor") score += 10;
  if (lead.agentName?.trim() || lead.referralSource?.trim()) score += 8;

  if (inputs.path === "commercial") score += 10;
  if (inputs.path === "investor-dscr") score += 8;
  if (inputs.path === "refinance") score += 6;

  if (analysis.refinance && analysis.refinance.monthlySavings >= 500) {
    score += 8;
  }
  if (analysis.investor && analysis.investor.dscr >= 1.15) score += 6;
  if (analysis.commercial && analysis.commercial.dscr >= 1.2) score += 6;

  if (hasUrgentNotes(lead.notes)) score += 12;

  const email = lead.email.trim().toLowerCase();
  const phone = lead.phone.replace(/\D/g, "");
  if (!email || email === "n/a" || !email.includes("@")) score -= 10;
  if (!phone || phone.length < 10) score -= 8;

  return Math.max(0, Math.min(100, score));
}
