export const DEAL_TYPES = ["buy-home", "refinance", "investor-dscr", "commercial"] as const;

export type DealType = (typeof DEAL_TYPES)[number];

export type DealPathOption = {
  id: DealType;
  title: string;
  description: string;
};

export type MetricRow = {
  label: string;
  value: string;
  note?: string;
  locked?: boolean;
};

export type AnalysisResult = {
  dealType: DealType;
  summary: string;
  metrics: MetricRow[];
  calculations: Record<string, number | string | null>;
  warnings: string[];
};

export type DealAnalyzerLeadInput = {
  name: string;
  email: string;
  phone?: string;
  role?: string;
  notes?: string;
  smsCallConsent: boolean;
  sessionId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

export type NarrativeSection = {
  executiveSummary: string;
  dealSnapshot: Record<string, string>;
  keyMetrics: MetricRow[];
  coachesNotes: string[];
  recommendedStrategy: string;
  risks: string[];
  opportunities: string[];
  nextSteps: string[];
  disclaimer: string;
};

export type DealAnalyzerSession = {
  dealType: DealType;
  inputs: Record<string, number | string | boolean>;
  analysis: AnalysisResult;
  createdAt: string;
};

export type StoredDealAnalyzerLead = DealAnalyzerLeadInput & {
  id: string;
  consentText: string;
  consentTimestamp: string;
  consentIp?: string;
  consentUserAgent?: string;
  createdAt: string;
};

export type StoredDealAnalyzerScenario = {
  id: string;
  leadId: string;
  dealType: DealType;
  inputsJson: Record<string, unknown>;
  analysisJson: AnalysisResult;
  createdAt: string;
};

export type StoredDealAnalyzerReport = {
  id: string;
  leadId: string;
  scenarioId: string;
  reportSlug: string;
  narrativeJson: NarrativeSection;
  createdAt: string;
};

export type FullDealAnalyzerReport = {
  report: StoredDealAnalyzerReport;
  lead: StoredDealAnalyzerLead;
  scenario: StoredDealAnalyzerScenario;
};

export type CreateReportResponse = {
  success: true;
  reportSlug: string;
  localOnly?: boolean;
  report?: FullDealAnalyzerReport;
};
