import { buildExecutiveSummary } from "./build-executive-summary";
import { matchCapitalSources } from "./match-capital-sources";
import { recommendCapitalPath } from "./recommend-capital-path";
import type { CcmSession, DealIntake } from "./types";

export function isIntakeReadyForAnalysis(intake: DealIntake): boolean {
  return Boolean(
    intake.propertyType &&
      intake.dealPurpose &&
      intake.loanAmountRange &&
      intake.occupancyStatus &&
      intake.sponsorExperience &&
      intake.timeline &&
      intake.leveragePosture &&
      intake.sponsorName.trim().length > 1 &&
      intake.sponsorEmail.includes("@"),
  );
}

export type CcmAnalysisResult = {
  recommendation: NonNullable<CcmSession["recommendation"]>;
  matches: CcmSession["matches"];
  summary: NonNullable<CcmSession["summary"]>;
};

export function runCcmAnalysis(intake: DealIntake): CcmAnalysisResult | null {
  const recommendation = recommendCapitalPath(intake);
  if (!recommendation) return null;

  const matches = matchCapitalSources(intake, recommendation);
  const summary = buildExecutiveSummary(intake, recommendation, matches);

  return { recommendation, matches, summary };
}
