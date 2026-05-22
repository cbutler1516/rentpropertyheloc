import type { ComplianceRecord } from "./types";

export function complianceToReportText(
  record: ComplianceRecord,
  packageTitle: string,
): string {
  const lines: string[] = [
    `# Compliance review — ${packageTitle}`,
    `Risk score: ${record.riskScore.toUpperCase()}`,
    `Scanned: ${record.scannedAt}`,
    `Reviewed: ${record.reviewed ? record.reviewedAt ?? "yes" : "no"}`,
    "",
    "## Issues",
  ];

  if (record.issues.length === 0) {
    lines.push("No rule-based issues flagged.");
  } else {
    for (const issue of record.issues) {
      lines.push(
        `- [${issue.severity.toUpperCase()}] ${issue.message}`,
        `  Source: ${issue.source}`,
        `  Excerpt: ${issue.excerpt}`,
        `  Safer rewrite: ${issue.suggestedRewrite}`,
      );
    }
  }

  lines.push("", "## Missing disclaimer checklist");
  for (const item of record.missingDisclaimers) {
    lines.push(
      `- [${item.present ? "x" : " "}] ${item.label}${item.required ? " (required)" : ""}`,
    );
  }

  lines.push("", "## Final approval checklist");
  for (const item of record.finalApprovalChecklist) {
    lines.push(`- [${item.checked ? "x" : " "}] ${item.label}`);
  }

  if (record.reviewerNotes.trim()) {
    lines.push("", "## Reviewer notes", record.reviewerNotes.trim());
  }

  return lines.join("\n");
}
