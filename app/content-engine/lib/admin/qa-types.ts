export type QaStatus = "pass" | "warn" | "fail" | "skip";

export type QaCheckResult = {
  id: string;
  label: string;
  status: QaStatus;
  message?: string;
  fix?: string;
  durationMs?: number;
};

export type QaHealthSummary = {
  pass: number;
  warn: number;
  fail: number;
  skip: number;
};

export type QaHealthReport = {
  generatedAt: string;
  environment: QaCheckResult[];
  database: QaCheckResult[];
  features: QaCheckResult[];
  summary: QaHealthSummary;
};

export type FunnelTestStep = {
  id: string;
  label: string;
  status: QaStatus;
  message?: string;
  durationMs?: number;
};

export type FunnelTestReport = {
  runAt: string;
  slug: string;
  packageId: string;
  publishedPageId?: string;
  leadId?: string;
  previewUrl?: string;
  publishedUrl?: string;
  steps: FunnelTestStep[];
  overall: QaStatus;
};

export type FunnelCleanupResult = {
  ok: boolean;
  message: string;
  deleted?: {
    packageId?: string;
    slug?: string;
    leads?: number;
  };
};
