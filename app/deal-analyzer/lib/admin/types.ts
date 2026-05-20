import type { ClientRole, DealPath } from "../types";

export type DealAnalyzerDatePreset =
  | "all"
  | "7d"
  | "30d"
  | "90d"
  | "custom";

export type DealAnalyzerAdminFilters = {
  search: string;
  role: ClientRole | "all";
  dealType: DealPath | "all";
  datePreset: DealAnalyzerDatePreset;
  dateFrom: string;
  dateTo: string;
};

export const defaultAdminFilters: DealAnalyzerAdminFilters = {
  search: "",
  role: "all",
  dealType: "all",
  datePreset: "all",
  dateFrom: "",
  dateTo: "",
};

export type DealAnalyzerKeyMetric = {
  label: string;
  value: string;
};

export type DealAnalyzerReportRow = {
  id: string;
  slug: string;
  createdAt: string;
  leadName: string;
  email: string;
  phone: string;
  role: ClientRole;
  dealType: DealPath;
  dealTypeLabel: string;
  agentName: string | null;
  referralSource: string | null;
  loanAmount: number;
  keyMetric: DealAnalyzerKeyMetric;
  leadScore: number;
  leadScoreLabel: "Hot" | "Warm" | "Standard" | "Nurture";
  suggestedFollowUp: string;
  missingContact: boolean;
  isAgentSourced: boolean;
  notes: string;
};

export type DealAnalyzerDashboardStats = {
  totalReports: number;
  newLeadsThisWeek: number;
  leadTypeBreakdown: Array<{ role: string; count: number }>;
  dealTypeBreakdown: Array<{ dealType: DealPath; label: string; count: number }>;
  agentSourcedCount: number;
  missingContactCount: number;
};

export type DealAnalyzerDashboardPayload = {
  stats: DealAnalyzerDashboardStats;
  reports: DealAnalyzerReportRow[];
  configured: boolean;
};
