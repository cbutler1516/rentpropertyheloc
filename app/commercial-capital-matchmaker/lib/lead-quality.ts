import type {
  CapitalPathRecommendation,
  CcmLeadRecord,
  DealIntake,
  LeadQualityTag,
  LeadSource,
  LeadStatus,
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
  const primary = recommendation.primaryPath;

  if (recommendation.confidence === "high" && intake.timeline !== "flexible") {
    return `Schedule a Broadview commercial review—pressure-test capital path quotes within 48 hours.`;
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

  return "Review capital path fit with Chris Butler—align structure, timing, and document package.";
}

export function inferMissingDocuments(intake: DealIntake): string[] {
  const missing: string[] = [];

  if (!intake.dealNotes.trim()) {
    missing.push("Deal narrative / use-of-proceeds summary");
  }

  if (
    intake.occupancyStatus === "value-add" ||
    intake.occupancyStatus === "vacant" ||
    intake.occupancyStatus === "development" ||
    intake.dealPurpose === "construction" ||
    intake.dealPurpose === "value-add"
  ) {
    missing.push("Business plan and capex / lease-up budget");
  }

  if (intake.sponsorExperience === "first-deal") {
    missing.push("Sponsor track record summary and liquidity statement");
  }

  if (intake.propertyType === "mixed-use" || intake.propertyType === "retail") {
    missing.push("Rent roll and allocation of owner-user vs. investment space");
  }

  if (
    intake.dealPurpose === "acquisition" ||
    intake.dealPurpose === "bridge"
  ) {
    missing.push("Purchase agreement or term sheet");
  }

  missing.push("Trailing T-12 / operating statement");
  missing.push("Sponsor personal financial statement (PFS)");
  missing.push("Entity documents and guarantor org chart");

  if (intake.dealPurpose === "construction") {
    missing.push("Construction budget and draw schedule");
  }

  return [...new Set(missing)].slice(0, 8);
}

type LegacyLead = Partial<CcmLeadRecord> & {
  intake: DealIntake;
  recommendation?: CapitalPathRecommendation | null;
  status?: string;
};

const LEGACY_STATUS_MAP: Record<string, LeadStatus> = {
  new: "new",
  reviewing: "reviewed",
  reviewed: "reviewed",
  qualified: "lender-ready",
  archived: "archived",
};

const LEGACY_QUALITY_MAP: Record<string, LeadQualityTag> = {
  new: "needs-review",
  reviewing: "needs-review",
  qualified: "lender-ready",
  archived: "needs-review",
};

/** Migrate legacy lead records from older localStorage shapes */
export function normalizeLeadRecord(lead: LegacyLead): CcmLeadRecord {
  const recommendation = lead.recommendation ?? null;
  const source: LeadSource = lead.source ?? "intake";
  const createdAt = lead.createdAt ?? new Date().toISOString();
  const lastUpdatedAt = lead.lastUpdatedAt ?? createdAt;

  const status: LeadStatus =
    lead.status && lead.status in LEGACY_STATUS_MAP
      ? LEGACY_STATUS_MAP[lead.status]
      : (lead.status as LeadStatus) ?? "new";

  const qualityTag: LeadQualityTag =
    lead.qualityTag ??
    (lead.status && LEGACY_QUALITY_MAP[lead.status]
      ? LEGACY_QUALITY_MAP[lead.status]
      : recommendation
        ? inferLeadQualityTag(lead.intake, recommendation)
        : "needs-review");

  return {
    id: lead.id ?? `legacy-${Date.now()}`,
    source,
    createdAt,
    lastUpdatedAt,
    status,
    qualityTag,
    recommendedFollowUp:
      lead.recommendedFollowUp ??
      (recommendation
        ? buildRecommendedFollowUp(lead.intake, recommendation)
        : "Broadview to review submitted deal package."),
    missingDocuments: lead.missingDocuments ?? inferMissingDocuments(lead.intake),
    notes: lead.notes ?? "",
    intake: lead.intake,
    recommendation,
    matchCount: lead.matchCount ?? 0,
    strategyReview: lead.strategyReview,
  };
}
