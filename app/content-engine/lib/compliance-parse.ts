import type {
  ComplianceApprovalItem,
  ComplianceDisclaimerItem,
  ComplianceIssue,
  ComplianceRecord,
  ComplianceRiskLevel,
} from "./types";

const RISK_LEVELS: ComplianceRiskLevel[] = ["low", "medium", "high"];
const SEVERITIES = ["low", "medium", "high", "critical"] as const;

function parseIssues(raw: unknown): ComplianceIssue[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item, index) => ({
      id: typeof item.id === "string" ? item.id : `issue-${index}`,
      severity: SEVERITIES.includes(item.severity as (typeof SEVERITIES)[number])
        ? (item.severity as ComplianceIssue["severity"])
        : "medium",
      category:
        typeof item.category === "string"
          ? (item.category as ComplianceIssue["category"])
          : "missingDisclaimer",
      source: typeof item.source === "string" ? item.source : "unknown",
      excerpt: typeof item.excerpt === "string" ? item.excerpt : "",
      message: typeof item.message === "string" ? item.message : "",
      suggestedRewrite:
        typeof item.suggestedRewrite === "string" ? item.suggestedRewrite : "",
      saferVersion:
        typeof item.saferVersion === "string" ? item.saferVersion : undefined,
      applied: Boolean(item.applied),
    }));
}

function parseDisclaimerItems(raw: unknown): ComplianceDisclaimerItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item, index) => ({
      id: typeof item.id === "string" ? item.id : `disc-${index}`,
      label: typeof item.label === "string" ? item.label : "Disclaimer",
      present: Boolean(item.present),
      required: item.required !== false,
    }));
}

function parseApprovalItems(raw: unknown): ComplianceApprovalItem[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => !!item && typeof item === "object")
    .map((item, index) => ({
      id: typeof item.id === "string" ? item.id : `check-${index}`,
      label: typeof item.label === "string" ? item.label : "Checklist item",
      checked: Boolean(item.checked),
    }));
}

export function parseComplianceJson(raw: unknown): ComplianceRecord | undefined {
  if (!raw || typeof raw !== "object") return undefined;
  const r = raw as Record<string, unknown>;
  const riskScore = RISK_LEVELS.includes(r.riskScore as ComplianceRiskLevel)
    ? (r.riskScore as ComplianceRiskLevel)
    : "low";

  return {
    riskScore,
    issues: parseIssues(r.issues),
    missingDisclaimers: parseDisclaimerItems(r.missingDisclaimers),
    finalApprovalChecklist: parseApprovalItems(r.finalApprovalChecklist),
    reviewerNotes: typeof r.reviewerNotes === "string" ? r.reviewerNotes : "",
    reviewed: Boolean(r.reviewed),
    reviewedAt: typeof r.reviewedAt === "string" ? r.reviewedAt : null,
    scannedAt:
      typeof r.scannedAt === "string"
        ? r.scannedAt
        : new Date().toISOString(),
    modelUsed: typeof r.modelUsed === "string" ? r.modelUsed : "demo",
  };
}
