import { buildExecutiveSummary } from "./build-executive-summary";
import { matchCapitalSources } from "./match-capital-sources";
import { recommendCapitalPath } from "./recommend-capital-path";
import type { CcmSession, DealIntake } from "./types";

export const SAMPLE_INTAKE: DealIntake = {
  propertyType: "multifamily",
  dealPurpose: "acquisition",
  loanAmountRange: "3-10m",
  occupancyStatus: "stabilized",
  sponsorExperience: "seasoned",
  timeline: "60-90-days",
  leveragePosture: "moderate",
  sponsorName: "Sample Sponsor",
  sponsorEmail: "sample@broadview.example",
  companyName: "Riverside Capital Partners",
  dealNotes: "Illustrative 48-unit stabilized multifamily acquisition for sample strategy review.",
};

export function buildSampleSession(): Pick<
  CcmSession,
  "intake" | "recommendation" | "matches" | "summary"
> {
  const recommendation = recommendCapitalPath(SAMPLE_INTAKE)!;
  const matches = matchCapitalSources(SAMPLE_INTAKE, recommendation);
  const summary = buildExecutiveSummary(SAMPLE_INTAKE, recommendation, matches);

  return {
    intake: SAMPLE_INTAKE,
    recommendation,
    matches,
    summary,
  };
}
