import type { LeadStatus } from "../follow-up-types";
import type {
  ClientRole,
  DealAnalysisResult,
  DealInputs,
} from "../types";

export type CrmPushStatus = "not_pushed" | "pushed" | "failed";

export type CrmPushFilter = "all" | "not_pushed" | "failed" | "pushed";

export type DealAnalyzerCrmLeadPayload = {
  name: string;
  email: string;
  phone: string;
  role: ClientRole;
  notes: string;
  referralSource: string | null;
  agentName: string | null;
};

export type DealAnalyzerCrmConsentPayload = {
  smsCallConsent: boolean;
  consentTimestamp: string | null;
  consentText: string | null;
  consentIp: string | null;
};

export type DealAnalyzerCrmAgentAttribution = {
  agentId: string | null;
  agentName: string | null;
  referralCode: string | null;
  partnerSlug: string | null;
};

export type DealAnalyzerCrmFollowUpPayload = {
  textMessage: string | null;
  emailSubject: string | null;
  emailBody: string | null;
  agentPartnerMessage: string | null;
  suggestedFollowUp: string | null;
  followUpStatus: string | null;
};

export type DealAnalyzerCrmReportPayload = {
  source: "deal_analyzer";
  event: "report_created" | "manual_push" | "test_push";
  reportId: string;
  reportSlug: string;
  reportUrl: string;
  createdAt: string;
  dealType: string;
  lead: DealAnalyzerCrmLeadPayload;
  consent: DealAnalyzerCrmConsentPayload;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  agentAttribution: DealAnalyzerCrmAgentAttribution;
  leadScore: number;
  leadScoreLabel: string;
  leadStatus: LeadStatus;
  followUp: DealAnalyzerCrmFollowUpPayload;
  loanAmount: number;
  keyMetricLabel: string;
  keyMetricValue: string;
};

export type CrmWebhookPushResult = {
  success: boolean;
  provider: "ghl" | "zapier" | "none";
  message: string;
  externalId?: string | null;
  statusCode?: number;
};

export type CrmPushReportResult = {
  success: boolean;
  reportId: string;
  status: CrmPushStatus;
  provider: CrmWebhookPushResult["provider"];
  message: string;
  externalId?: string | null;
  error?: string | null;
};

export type CrmIntegrationStatus = {
  ghlConfigured: boolean;
  zapierConfigured: boolean;
  autoPushEnabled: boolean;
  secretConfigured: boolean;
};
