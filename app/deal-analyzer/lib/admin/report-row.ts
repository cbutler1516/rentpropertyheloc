import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import { dealPathMeta } from "../constants";
import { normalizeStoredNarrative } from "../generate-narrative";
import type { PlaybookNarrative } from "../narrative-types";
import type {
  ClientRole,
  DealAnalysisResult,
  DealInputs,
  DealPath,
} from "../types";
import { computeLeadScore, scoreToLabel } from "./lead-score";
import { buildSuggestedFollowUp } from "./suggested-follow-up";
import type { DealAnalyzerKeyMetric, DealAnalyzerReportRow } from "./types";

function isMissingContact(email: string, phone: string): boolean {
  const e = email.trim().toLowerCase();
  const digits = phone.replace(/\D/g, "");
  const badEmail =
    !e || e === "n/a" || e === "na" || !e.includes("@") || e.endsWith("@example.com");
  const badPhone = !digits || digits.length < 10;
  return badEmail || badPhone;
}

function isAgentSourced(
  role: string,
  agentName: string | null,
  referralSource: string | null,
): boolean {
  if (role === "Agent") return true;
  if (agentName?.trim()) return true;
  if (referralSource?.trim()) return true;
  return false;
}

export function extractKeyMetric(
  dealType: DealPath,
  analysis: DealAnalysisResult,
): DealAnalyzerKeyMetric {
  switch (dealType) {
    case "refinance":
      if (analysis.refinance) {
        return {
          label: "Monthly savings",
          value:
            analysis.refinance.monthlySavings >= 0
              ? formatCurrency(analysis.refinance.monthlySavings)
              : "—",
        };
      }
      break;
    case "investor-dscr":
      if (analysis.investor) {
        return {
          label: "DSCR",
          value: `${formatNumber(analysis.investor.dscr, 2)}x`,
        };
      }
      break;
    case "commercial":
      if (analysis.commercial) {
        return {
          label: "Cap rate",
          value: formatPercent(analysis.commercial.capRate, 2),
        };
      }
      break;
    default:
      break;
  }

  return {
    label: "Est. payment",
    value: formatCurrency(analysis.payment.total),
  };
}

type RawReportRow = {
  id: string;
  created_at: string;
  report_slug: string;
  agent_name: string | null;
  referral_source: string | null;
  narrative_json: unknown;
  lead: {
    name: string;
    email: string;
    phone: string;
    role: string;
    notes: string | null;
    referral_source: string | null;
    agent_name: string | null;
  };
  scenario: {
    deal_type: string;
    inputs_json: unknown;
    analysis_json: unknown;
  };
};

export function mapRawReportToRow(raw: RawReportRow): DealAnalyzerReportRow {
  const inputs = raw.scenario.inputs_json as DealInputs;
  const analysis = raw.scenario.analysis_json as DealAnalysisResult;
  const dealType = (raw.scenario.deal_type || inputs.path) as DealPath;
  const meta = dealPathMeta[dealType] ?? dealPathMeta["buy-home"];

  const lead = {
    name: raw.lead.name,
    email: raw.lead.email,
    phone: raw.lead.phone,
    role: raw.lead.role as ClientRole,
    notes: raw.lead.notes ?? "",
    referralSource: raw.lead.referral_source ?? raw.referral_source ?? "",
    agentName: raw.lead.agent_name ?? raw.agent_name ?? "",
  };

  let narrative: PlaybookNarrative | null = null;
  try {
    narrative = normalizeStoredNarrative(
      raw.narrative_json,
      inputs,
      analysis,
      {
        leadRole: lead.role,
        leadName: lead.name,
        agentName: lead.agentName,
      },
    );
  } catch {
    narrative = null;
  }

  const agentName = raw.agent_name ?? raw.lead.agent_name ?? null;
  const referralSource = raw.referral_source ?? raw.lead.referral_source ?? null;
  const score = computeLeadScore({ lead, inputs, analysis });

  return {
    id: raw.id,
    slug: raw.report_slug,
    createdAt: raw.created_at,
    leadName: raw.lead.name,
    email: raw.lead.email,
    phone: raw.lead.phone,
    role: lead.role,
    dealType,
    dealTypeLabel: meta.shortLabel,
    agentName,
    referralSource,
    loanAmount: analysis.loanAmount,
    keyMetric: extractKeyMetric(dealType, analysis),
    leadScore: score,
    leadScoreLabel: scoreToLabel(score),
    suggestedFollowUp: buildSuggestedFollowUp({
      lead,
      inputs,
      analysis,
      narrative,
    }),
    missingContact: isMissingContact(raw.lead.email, raw.lead.phone),
    isAgentSourced: isAgentSourced(lead.role, agentName, referralSource),
    notes: lead.notes,
  };
}
