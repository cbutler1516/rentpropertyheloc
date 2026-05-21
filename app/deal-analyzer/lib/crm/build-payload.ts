import { dealPathMeta } from "../constants";
import { extractKeyMetric } from "../admin/report-row";
import { computeLeadScore, scoreToLabel } from "../admin/lead-score";
import { buildSuggestedFollowUp } from "../admin/suggested-follow-up";
import { normalizeStoredNarrative } from "../generate-narrative";
import { getSiteUrl } from "../supabase/env";
import type { DealAnalyzerFollowUpRecord } from "../follow-up-types";
import type {
  ClientRole,
  DealAnalysisResult,
  DealInputs,
} from "../types";
import type { DealAnalyzerCrmReportPayload } from "./types";

type BuildPayloadInput = {
  reportId: string;
  reportSlug: string;
  createdAt: string;
  agentId: string | null;
  agentName: string | null;
  referralCode: string | null;
  referralSource: string | null;
  narrativeJson: unknown;
  lead: {
    name: string;
    email: string;
    phone: string;
    role: string;
    notes: string | null;
    referral_source: string | null;
    agent_name: string | null;
    sms_call_consent: boolean;
    consent_text: string | null;
    consent_timestamp: string | null;
    consent_ip: string | null;
    agent_id?: string | null;
    referral_code?: string | null;
    lead_status?: string | null;
  };
  scenario: {
    deal_type: string;
    inputs_json: unknown;
    analysis_json: unknown;
  };
  followUp?: DealAnalyzerFollowUpRecord | null;
  partnerSlug?: string | null;
  event: DealAnalyzerCrmReportPayload["event"];
};

export function buildCrmReportPayload(
  input: BuildPayloadInput,
): DealAnalyzerCrmReportPayload {
  const inputs = input.scenario.inputs_json as DealInputs;
  const analysis = input.scenario.analysis_json as DealAnalysisResult;
  const dealType = (input.scenario.deal_type || inputs.path) as DealInputs["path"];
  const meta = dealPathMeta[dealType] ?? dealPathMeta["buy-home"];

  const lead = {
    name: input.lead.name,
    email: input.lead.email,
    phone: input.lead.phone,
    role: input.lead.role as ClientRole,
    notes: input.lead.notes ?? "",
    referralSource: input.lead.referral_source ?? input.referralSource ?? "",
    agentName: input.lead.agent_name ?? input.agentName ?? "",
    smsCallConsent: input.lead.sms_call_consent ?? false,
  };

  let narrative = null;
  try {
    narrative = normalizeStoredNarrative(
      input.narrativeJson,
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

  const score = computeLeadScore({ lead, inputs, analysis });
  const suggestedFollowUp = buildSuggestedFollowUp({
    lead,
    inputs,
    analysis,
    narrative,
  });

  const keyMetric = extractKeyMetric(dealType, analysis);
  const siteUrl = getSiteUrl();

  return {
    source: "deal_analyzer",
    event: input.event,
    reportId: input.reportId,
    reportSlug: input.reportSlug,
    reportUrl: `${siteUrl.replace(/\/$/, "")}/deal-analyzer/report/${input.reportSlug}`,
    createdAt: input.createdAt,
    dealType: meta.label,
    lead: {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      role: lead.role,
      notes: lead.notes,
      referralSource: lead.referralSource || null,
      agentName: lead.agentName || null,
    },
    consent: {
      smsCallConsent: input.lead.sms_call_consent ?? false,
      consentTimestamp: input.lead.consent_timestamp ?? null,
      consentText: input.lead.consent_text ?? null,
      consentIp: input.lead.consent_ip ?? null,
    },
    inputs,
    analysis,
    agentAttribution: {
      agentId: input.agentId ?? input.lead.agent_id ?? null,
      agentName: input.agentName ?? input.lead.agent_name ?? null,
      referralCode: input.referralCode ?? input.lead.referral_code ?? null,
      partnerSlug: input.partnerSlug ?? null,
    },
    leadScore: score,
    leadScoreLabel: scoreToLabel(score),
    leadStatus: (input.lead.lead_status as DealAnalyzerCrmReportPayload["leadStatus"]) || "New",
    followUp: {
      textMessage: input.followUp?.textMessage ?? null,
      emailSubject: input.followUp?.emailSubject ?? null,
      emailBody: input.followUp?.emailBody ?? null,
      agentPartnerMessage: input.followUp?.agentPartnerMessage ?? null,
      suggestedFollowUp,
      followUpStatus: input.followUp?.status ?? null,
    },
    loanAmount: analysis.loanAmount,
    keyMetricLabel: keyMetric.label,
    keyMetricValue: keyMetric.value,
  };
}

export function buildCrmTestPayload(): DealAnalyzerCrmReportPayload {
  const now = new Date().toISOString();
  const slug = "crm-test-preview";
  const siteUrl = getSiteUrl();

  const inputs: DealInputs = {
    path: "buy-home",
    propertyValue: 525000,
    interestRate: 6.75,
    loanTermYears: 30,
    annualPropertyTax: 6200,
    annualInsurance: 1800,
    monthlyHoa: 0,
    downPaymentPercent: 20,
    sellerConcession: 0,
    buydownType: "none",
  };

  const analysis: DealAnalysisResult = {
    path: "buy-home",
    loanAmount: 420000,
    downPaymentAmount: 105000,
    ltv: 80,
    payment: {
      principalAndInterest: 2724,
      propertyTax: 517,
      insurance: 150,
      hoa: 0,
      total: 3391,
    },
    chartData: {
      paymentBreakdown: [],
      cashFlowSeries: [],
      refinanceSeries: [],
    },
  };

  return {
    source: "deal_analyzer",
    event: "test_push",
    reportId: "00000000-0000-0000-0000-000000000000",
    reportSlug: slug,
    reportUrl: `${siteUrl.replace(/\/$/, "")}/deal-analyzer/report/${slug}`,
    createdAt: now,
    dealType: "Buy a Home",
    lead: {
      name: "CRM Test Lead",
      email: "crm-test@example.com",
      phone: "(555) 555-0199",
      role: "Buyer",
      notes: "Manual CRM test push from Deal Analyzer admin.",
      referralSource: "Admin test",
      agentName: "Test Agent",
    },
    consent: {
      smsCallConsent: true,
      consentTimestamp: now,
      consentText: "Test consent record for CRM webhook verification.",
      consentIp: null,
    },
    inputs,
    analysis,
    agentAttribution: {
      agentId: null,
      agentName: "Test Agent",
      referralCode: "TESTCRM",
      partnerSlug: null,
    },
    leadScore: 72,
    leadScoreLabel: "Warm",
    leadStatus: "New",
    followUp: {
      textMessage: "Hi — Chris Butler's team ran your Playbook Report. Ready to walk through numbers?",
      emailSubject: "Your Playbook Report is ready",
      emailBody: "Attached scenario summary and next steps for your financing review.",
      agentPartnerMessage: null,
      suggestedFollowUp: "Book a Strategy Call to confirm program fit.",
      followUpStatus: "draft",
    },
    loanAmount: analysis.loanAmount,
    keyMetricLabel: "Est. payment",
    keyMetricValue: "$3,391",
  };
}
