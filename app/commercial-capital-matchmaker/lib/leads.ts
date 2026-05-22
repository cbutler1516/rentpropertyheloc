import { nanoid } from "nanoid";
import {
  buildRecommendedFollowUp,
  inferLeadQualityTag,
  inferMissingDocuments,
} from "./lead-quality";
import { dispatchLeadIntegrations } from "./integrations";
import type {
  CapitalPathRecommendation,
  CcmLeadRecord,
  DealIntake,
  LeadSource,
  LeadStatus,
  StrategyReviewSubmission,
} from "./types";

export const LEAD_STATUS_LABELS: Record<LeadStatus, string> = {
  new: "New",
  reviewed: "Reviewed",
  "docs-needed": "Docs needed",
  "lender-ready": "Lender-ready",
  archived: "Archived",
};

export const LEAD_SOURCE_LABELS: Record<LeadSource, string> = {
  intake: "Intake funnel",
  sample: "Sample strategy",
  "strategy-review": "Strategy review",
  "memo-cta": "Memo CTA",
};

function timestamp() {
  return new Date().toISOString();
}

export function createLeadRecord(input: {
  source: LeadSource;
  intake: DealIntake;
  recommendation: CapitalPathRecommendation | null;
  matchCount?: number;
  strategyReview?: StrategyReviewSubmission;
  recommendedFollowUp?: string;
  missingDocuments?: string[];
  qualityTag?: CcmLeadRecord["qualityTag"];
  status?: LeadStatus;
}): CcmLeadRecord {
  const now = timestamp();
  const recommendation = input.recommendation;
  const qualityTag =
    input.qualityTag ??
    (recommendation
      ? inferLeadQualityTag(input.intake, recommendation)
      : "needs-review");

  return {
    id: nanoid(10),
    source: input.source,
    createdAt: now,
    lastUpdatedAt: now,
    status: input.status ?? "new",
    qualityTag,
    recommendedFollowUp:
      input.recommendedFollowUp ??
      (recommendation
        ? buildRecommendedFollowUp(input.intake, recommendation)
        : "Broadview to review submitted deal package and confirm capital path."),
    missingDocuments:
      input.missingDocuments ?? inferMissingDocuments(input.intake),
    notes: "",
    intake: input.intake,
    recommendation,
    matchCount: input.matchCount ?? 0,
    strategyReview: input.strategyReview,
  };
}

export function upsertLead(
  leads: CcmLeadRecord[],
  lead: CcmLeadRecord,
): CcmLeadRecord[] {
  const email = lead.intake.sponsorEmail.trim().toLowerCase();
  const filtered = leads.filter(
    (l) => l.intake.sponsorEmail.trim().toLowerCase() !== email,
  );
  return [lead, ...filtered].slice(0, 50);
}

export function patchLead(
  leads: CcmLeadRecord[],
  leadId: string,
  patch: Partial<CcmLeadRecord>,
): CcmLeadRecord[] {
  return leads.map((lead) =>
    lead.id === leadId
      ? { ...lead, ...patch, lastUpdatedAt: timestamp() }
      : lead,
  );
}

export function strategyReviewToIntake(
  form: StrategyReviewSubmission,
): DealIntake {
  const dealNotes = [
    form.propertyAddress ? `Address: ${form.propertyAddress}` : "",
    form.estimatedValue ? `Est. value: ${form.estimatedValue}` : "",
    form.requestedLoanAmount ? `Loan request: ${form.requestedLoanAmount}` : "",
    form.notes,
  ]
    .filter(Boolean)
    .join("\n");

  return {
    propertyType: "",
    dealPurpose: "",
    loanAmountRange: "",
    occupancyStatus: "",
    sponsorExperience: "",
    timeline: "",
    leveragePosture: "",
    sponsorName: form.name,
    sponsorEmail: form.email,
    companyName: form.company,
    dealNotes,
  };
}

export function captureLead(
  leads: CcmLeadRecord[],
  lead: CcmLeadRecord,
): CcmLeadRecord[] {
  void dispatchLeadIntegrations(lead);
  return upsertLead(leads, lead);
}
