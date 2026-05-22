export type LaunchCheckStatus = "pass" | "warn" | "fail" | "skip" | "manual";

export type LaunchCheckResult = {
  id: string;
  label: string;
  status: LaunchCheckStatus;
  message?: string;
  fix?: string;
};

export type LaunchEnvVar = {
  name: string;
  required: boolean;
  configured: boolean;
  hint?: string;
};

export type LaunchMigrationCheck = {
  version: string;
  file: string;
  label: string;
  status: LaunchCheckStatus;
  message?: string;
};

export type LaunchReadinessReport = {
  generatedAt: string;
  siteUrl: string;
  samplePartnerSlug: string | null;
  env: {
    required: LaunchEnvVar[];
    optional: LaunchEnvVar[];
  };
  checks: LaunchCheckResult[];
  migrations: LaunchMigrationCheck[];
  summary: { pass: number; warn: number; fail: number; skip: number; manual: number };
};
