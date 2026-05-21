import {
  dealPurposeOptions,
  loanAmountOptions,
  occupancyOptions,
  propertyTypeOptions,
  sponsorExperienceOptions,
  timelineOptions,
  CAPITAL_PATH_META,
} from "./form-options";
import type {
  CapitalMatch,
  CapitalPathRecommendation,
  DealIntake,
  ExecutiveSummary,
} from "./types";

function labelFor<T extends string>(
  options: { value: T; label: string }[],
  value: string,
): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

function buildStrengths(intake: DealIntake, recommendation: CapitalPathRecommendation): string[] {
  const strengths: string[] = [];

  if (intake.occupancyStatus === "stabilized") {
    strengths.push("Stabilized collateral supports institutional underwriting and clearer proceeds conversations.");
  }
  if (intake.sponsorExperience === "seasoned") {
    strengths.push("Seasoned sponsor track record improves lender confidence and term competition.");
  }
  if (recommendation.confidence === "high") {
    strengths.push("Deal profile aligns strongly with the recommended capital path—efficient first outreach.");
  }
  if (intake.timeline === "60-90-days" || intake.timeline === "flexible") {
    strengths.push("Timeline allows thoughtful lender selection without sacrificing diligence quality.");
  }
  if (intake.leveragePosture === "conservative") {
    strengths.push("Conservative leverage posture broadens lender appetite and may improve pricing flexibility.");
  }

  if (strengths.length === 0) {
    strengths.push("Clear asset and purpose framing gives lenders a readable starting point for structure.");
  }

  return strengths.slice(0, 4);
}

function buildDocumentChecklist(
  intake: DealIntake,
  recommendation: CapitalPathRecommendation,
): string[] {
  const base = [
    "Rent roll and trailing operating statement (T-12)",
    "Sponsor personal financial statement and schedule of real estate owned",
    "Entity organizational documents and ownership chart",
  ];

  if (
    intake.occupancyStatus === "value-add" ||
    intake.occupancyStatus === "vacant" ||
    recommendation.primaryPath === "bridge-debt-fund"
  ) {
    base.push("Business plan with capex budget, lease-up timeline, and stabilized NOI projection");
  }

  if (intake.propertyType === "multifamily" && intake.occupancyStatus === "stabilized") {
    base.push("Agency-style property summary and major tenant/lease abstract");
  }

  if (intake.loanAmountRange === "10m-plus") {
    base.push("Third-party reports as required (environmental, appraisal, engineering)");
  }

  return base.slice(0, 6);
}

export function buildExecutiveSummary(
  intake: DealIntake,
  recommendation: CapitalPathRecommendation,
  matches: CapitalMatch[],
): ExecutiveSummary {
  const propertyLabel = labelFor(propertyTypeOptions, intake.propertyType);
  const purposeLabel = labelFor(dealPurposeOptions, intake.dealPurpose);
  const loanLabel = labelFor(loanAmountOptions, intake.loanAmountRange);
  const occupancyLabel = labelFor(occupancyOptions, intake.occupancyStatus);
  const timelineLabel = labelFor(timelineOptions, intake.timeline);
  const sponsorLabel = labelFor(sponsorExperienceOptions, intake.sponsorExperience);

  const primaryMeta = CAPITAL_PATH_META[recommendation.primaryPath];
  const secondaryMeta = recommendation.secondaryPath
    ? CAPITAL_PATH_META[recommendation.secondaryPath]
    : null;

  const likelyCapitalPath = secondaryMeta
    ? `${primaryMeta.label} lead, with ${secondaryMeta.label} as the parallel quote path.`
    : `${primaryMeta.label} as the lead capital conversation.`;

  const suggestedStructure = [
    ...recommendation.structureNotes,
    recommendation.timingFit,
  ].slice(0, 4);

  const broadviewRecommendation =
    recommendation.confidence === "high"
      ? `Broadview recommends opening with ${primaryMeta.label} lenders while preparing a tight alternate package${
          secondaryMeta ? ` (${secondaryMeta.label})` : ""
        }. Chris Butler can align outreach, narrative, and document order before term sheets.`
      : `Broadview recommends a disciplined two-path outreach: lead with ${primaryMeta.label}, validate ${
          secondaryMeta?.label ?? "one alternate lane"
        }, and refine structure once initial lender feedback returns.`;

  return {
    dealTitle: `${propertyLabel} — ${purposeLabel}`,
    preparedFor: intake.sponsorName.trim() || "Sponsor",
    generatedAt: new Date().toISOString(),
    advisorOpening: `This preliminary capital strategy memo summarizes how your ${propertyLabel.toLowerCase()} scenario may read to institutional and specialty lenders. It is intended to guide conversation—not replace formal underwriting.`,
    snapshot: {
      propertyType: propertyLabel,
      purpose: purposeLabel,
      loanRange: loanLabel,
      occupancy: occupancyLabel,
      timeline: timelineLabel,
      sponsor: sponsorLabel,
    },
    likelyCapitalPath,
    strengths: buildStrengths(intake, recommendation),
    lenderConcerns: recommendation.risks.length
      ? recommendation.risks
      : [recommendation.keyLenderConcern],
    suggestedStructure,
    documentChecklist: buildDocumentChecklist(intake, recommendation),
    broadviewRecommendation,
    disclaimer:
      "Preliminary strategy for discussion purposes only. Not a loan approval, commitment, or offer. Illustrative lender categories and rate bands remain placeholders until Broadview completes live outreach.",
    footerLine:
      "Prepared by Broadview Lending — Commercial Capital Matchmaker",
  };
}
