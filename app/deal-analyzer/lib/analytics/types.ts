import type { DealAnalyzerEventName } from "./event-names";

export type DealAnalyzerUtm = {
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

export type TrackDealAnalyzerEventInput = {
  eventName: DealAnalyzerEventName;
  sessionId?: string | null;
  leadId?: string | null;
  reportId?: string | null;
  agentId?: string | null;
  referralCode?: string | null;
  dealType?: string | null;
  pagePath?: string | null;
  metadata?: Record<string, string | number | boolean | null>;
};

export type DealAnalyzerAnalyticsPayload = {
  configured: boolean;
  dateRangeDays: number;
  funnel: {
    views: number;
    starts: number;
    previews: number;
    leadForms: number;
    leads: number;
    reports: number;
  };
  conversionByDealType: {
    dealType: string;
    label: string;
    starts: number;
    reports: number;
    leadRate: number;
  }[];
  conversionByAgent: {
    agentId: string;
    agentName: string;
    leads: number;
    reports: number;
  }[];
  topSeoLandingPages: {
    pagePath: string;
    views: number;
  }[];
  reportEngagement: {
    linkCopied: number;
    messageCopied: number;
    pdfPrinted: number;
  };
  crmPush: {
    succeeded: number;
    failed: number;
    successRate: number;
  };
  error?: string;
};
