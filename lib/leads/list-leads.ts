import { CREDIT_SCORE_RANGES } from "@/lib/leads/funnel-ranges";
import {
  ROUTING_TIER_PRIORITY,
  type LeadUrgency,
  getLeadUrgency,
} from "@/lib/leads/lead-urgency";
import {
  listLeadSubmissions,
  type LeadSubmissionRecord,
} from "@/lib/leads/save-lead-submission";
import type { RoutingTier } from "@/lib/leads/types";

export type ListedLead = {
  id: string;
  createdAt: string;
  qualityScore: number;
  qualityTier: string;
  routingTier: RoutingTier;
  routingLabel: string;
  desiredFunds: number;
  estimatedEquity: number | null;
  creditScoreRange: string;
  creditScoreRangeLabel: string;
  urgency: LeadUrgency;
};

export type LeadListResult = {
  leads: ListedLead[];
  persistenceMode: "supabase" | "local-fallback";
  stats: {
    total: number;
    fastTrack: number;
    standard: number;
    review: number;
    nurture: number;
  };
};

function creditRangeLabel(id: string): string {
  if (!id) return "—";
  return CREDIT_SCORE_RANGES.find((range) => range.id === id)?.label ?? id;
}

function parseRoutingTier(value: unknown): RoutingTier {
  if (
    value === "fast_track" ||
    value === "standard" ||
    value === "review" ||
    value === "nurture"
  ) {
    return value;
  }
  return "review";
}

function submissionToListed(submission: LeadSubmissionRecord): ListedLead {
  const answers = submission.funnelAnswers;
  const routingTier = parseRoutingTier(answers.routingTier);
  const creditScoreRange =
    typeof answers.creditScoreRange === "string" ? answers.creditScoreRange : "";
  const qualityTier =
    typeof answers.qualityTier === "string" ? answers.qualityTier : "warm";
  const routingLabel =
    typeof answers.routingLabel === "string" ? answers.routingLabel : routingTier;

  const propertyValue = submission.estimatedPropertyValue;
  const mortgageBalance = submission.estimatedMortgageBalance;
  const estimatedEquity =
    typeof answers.estimatedEquity === "number"
      ? answers.estimatedEquity
      : Math.max(0, propertyValue - mortgageBalance);

  return {
    id: submission.id,
    createdAt: submission.createdAt,
    qualityScore: submission.leadScore,
    qualityTier,
    routingTier,
    routingLabel,
    desiredFunds: submission.desiredHelocAmount,
    estimatedEquity,
    creditScoreRange,
    creditScoreRangeLabel: creditRangeLabel(creditScoreRange),
    urgency: getLeadUrgency(routingTier, submission.createdAt),
  };
}

export function sortLeadsByPriority(leads: ListedLead[]): ListedLead[] {
  return [...leads].sort((a, b) => {
    const tierDiff = ROUTING_TIER_PRIORITY[a.routingTier] - ROUTING_TIER_PRIORITY[b.routingTier];
    if (tierDiff !== 0) return tierDiff;

    const scoreDiff = b.qualityScore - a.qualityScore;
    if (scoreDiff !== 0) return scoreDiff;

    return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
  });
}

function computeStats(leads: ListedLead[]): LeadListResult["stats"] {
  return {
    total: leads.length,
    fastTrack: leads.filter((l) => l.routingTier === "fast_track").length,
    standard: leads.filter((l) => l.routingTier === "standard").length,
    review: leads.filter((l) => l.routingTier === "review").length,
    nurture: leads.filter((l) => l.routingTier === "nurture").length,
  };
}

export async function listLeads(limit = 100): Promise<LeadListResult> {
  const capped = Math.min(Math.max(limit, 1), 500);
  const { submissions, persistenceMode } = await listLeadSubmissions(capped);
  const leads = sortLeadsByPriority(submissions.map(submissionToListed));

  return {
    leads,
    persistenceMode,
    stats: computeStats(leads),
  };
}
