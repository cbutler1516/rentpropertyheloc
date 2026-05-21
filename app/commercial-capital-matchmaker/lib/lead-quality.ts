import { CAPITAL_PATH_META } from "./form-options";
import type {
  CapitalPathRecommendation,
  CcmLeadRecord,
  DealIntake,
  LeadQualityTag,
} from "./types";

export const LEAD_QUALITY_TAGS: LeadQualityTag[] = [
  "hot",
  "needs-review",
  "docs-needed",
  "lender-ready",
];

export const LEAD_QUALITY_LABELS: Record<LeadQualityTag, string> = {
  hot: "Hot",
  "needs-review": "Needs review",
  "docs-needed": "Docs needed",
  "lender-ready": "Lender-ready",
};

export function inferLeadQualityTag(
  intake: DealIntake,
  recommendation: CapitalPathRecommendation,
): LeadQualityTag {
  const transitional =
    intake.occupancyStatus === "vacant" ||
    intake.occupancyStatus === "development" ||
    intake.dealPurpose === "construction";

  if (
    recommendation.confidence === "high" &&
    (intake.timeline === "under-30-days" ||
      intake.loanAmountRange === "3-10m" ||
      intake.loanAmountRange === "10m-plus")
  ) {
    return "hot";
  }

  if (
    recommendation.confidence === "high" &&
    intake.sponsorExperience === "seasoned" &&
    intake.occupancyStatus === "stabilized" &&
    !transitional
  ) {
    return "lender-ready";
  }

  if (
    intake.sponsorExperience === "first-deal" ||
    transitional ||
    intake.occupancyStatus === "vacant"
  ) {
    return "docs-needed";
  }

  return "needs-review";
}

export function buildRecommendedFollowUp(
  intake: DealIntake,
  recommendation: CapitalPathRecommendation,
): string {
  const primary = CAPITAL_PATH_META[recommendation.primaryPath].label;

  if (recommendation.confidence === "high" && intake.timeline !== "flexible") {
    return `Schedule a Broadview commercial review—pressure-test ${primary} quotes and parallel paths within 48 hours.`;
  }

  if (intake.sponsorExperience === "first-deal") {
    return "Send sponsor resume, liquidity summary, and asset overview before lender outreach.";
  }

  if (
    intake.occupancyStatus === "value-add" ||
    intake.occupancyStatus === "vacant" ||
    intake.dealPurpose === "bridge"
  ) {
    return "Confirm business plan, capex budget, and takeout path before sharing with transitional lenders.";
  }

  if (intake.loanAmountRange === "10m-plus") {
    return "Prepare trailing NOI, rent roll, and sponsor entity chart for capital markets conversation.";
  }

  return `Review ${primary} fit with Chris Butler—align structure, timing, and document package.`;
}

type LegacyLead = CcmLeadRecord & {
  status?: string;
  qualityTag?: LeadQualityTag;
  recommendedFollowUp?: string;
};

const LEGACY_STATUS_MAP: Record<string, LeadQualityTag> = {
  new: "needs-review",
  reviewing: "needs-review",
  qualified: "lender-ready",
  archived: "needs-review",
};

/** Migrate legacy lead records from older localStorage shapes */
export function normalizeLeadRecord(lead: LegacyLead): CcmLeadRecord {
  const qualityTag =
    lead.qualityTag ??
    (lead.status ? LEGACY_STATUS_MAP[lead.status] : undefined) ??
    inferLeadQualityTag(lead.intake, lead.recommendation);
  const recommendedFollowUp =
    lead.recommendedFollowUp ??
    buildRecommendedFollowUp(lead.intake, lead.recommendation);

  const { status: _removed, ...rest } = lead;
  return { ...rest, qualityTag, recommendedFollowUp };
}
