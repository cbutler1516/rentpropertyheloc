import {
  COMPLETION_STRATEGY_PATHS,
  COMPLETION_TIMELINE,
  COMPLETION_REVIEW_NOTE,
  FINANCING_REVIEW_CONTACT,
  FINANCING_REVIEW_DISCLAIMER,
} from "@/lib/leads/financing-review-content";
import { getReviewScenario } from "@/lib/leads/review-scenario";
import type { LeadQualityTier } from "@/lib/leads/types";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export type FinancingReviewData = {
  propertyAddress: string;
  requestedFunds: string;
  submissionDate: string;
  reviewStatus: string;
  profileStrength: number;
  priorityReviewActive: boolean;
  profileComplete?: boolean;
  qualityScore?: number;
  qualityTier?: LeadQualityTier;
};

/** @deprecated Use FinancingReviewData */
export type InvestorSnapshotData = FinancingReviewData;

export function canGenerateReviewSummaryPdf(data: FinancingReviewData): boolean {
  return Boolean(
    data.requestedFunds?.trim() &&
      (data.propertyAddress?.trim() || data.submissionDate?.trim()),
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildFinancingReviewHtml(data: FinancingReviewData): string {
  const scenario = getReviewScenario(data);
  const pathsHtml = COMPLETION_STRATEGY_PATHS.map(
    (path) => `
      <div class="path-card">
        <div class="path-icon">${path.icon}</div>
        <div>
          <h3>${escapeHtml(path.name)}</h3>
          <p>${escapeHtml(path.suitability)}</p>
        </div>
      </div>`,
  ).join("");

  const timelineHtml = COMPLETION_TIMELINE.map(
    (item) => `
      <li class="${item.complete ? "done" : "pending"}">
        <span class="marker">${item.complete ? "✓" : "○"}</span>
        <span>${escapeHtml(item.label)}</span>
      </li>`,
  ).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Review Summary — ${escapeHtml(SITE_NAME)}</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: "Segoe UI", system-ui, sans-serif; color: #0f172a; margin: 0; background: #f8fafc; }
    .page { max-width: 720px; margin: 0 auto; background: #fff; }
    .hero { background: linear-gradient(135deg, #0a1628, #134e4a); color: #fff; padding: 2rem; }
    .brand { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.16em; text-transform: uppercase; color: #5eead4; }
    .hero h1 { margin: 0.5rem 0 0; font-size: 1.5rem; }
    .hero p { margin: 0.5rem 0 0; color: #cbd5e1; font-size: 0.875rem; }
    .content { padding: 1.5rem 2rem 2rem; }
    h2 { font-size: 0.7rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #64748b; margin: 1.5rem 0 0.75rem; }
    h2:first-child { margin-top: 0; }
    .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; }
    .cell { border: 1px solid #e2e8f0; border-radius: 10px; padding: 0.75rem 0.875rem; background: #f8fafc; }
    .cell.full { grid-column: 1 / -1; }
    .cell dt { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
    .cell dd { margin: 0.25rem 0 0; font-size: 0.875rem; font-weight: 600; }
    .badge { display: inline-block; margin-top: 0.75rem; padding: 0.35rem 0.75rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; background: #f0fdfa; color: #0f766e; border: 1px solid #99f6e4; }
    .scenario { margin-top: 0.75rem; font-size: 0.8125rem; line-height: 1.55; color: #334155; }
    .path-card { display: flex; gap: 0.75rem; border: 1px solid #e2e8f0; border-radius: 12px; padding: 0.875rem; margin-bottom: 0.625rem; }
    .path-icon { font-size: 1.25rem; }
    .path-card h3 { margin: 0 0 0.25rem; font-size: 0.875rem; }
    .path-card p { margin: 0; font-size: 0.75rem; color: #475569; }
    .timeline { list-style: none; margin: 0; padding: 0; }
    .timeline li { display: flex; gap: 0.625rem; align-items: center; padding: 0.4rem 0; font-size: 0.8125rem; }
    .timeline .done { color: #0f766e; font-weight: 600; }
    .timeline .pending { color: #64748b; }
    .note { margin-top: 0.5rem; font-size: 0.75rem; color: #64748b; }
    .contact { margin-top: 1rem; padding: 1rem; border-radius: 12px; background: #f0fdfa; border: 1px solid #99f6e4; font-size: 0.8125rem; }
    .disclaimer { margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.65rem; line-height: 1.55; color: #64748b; }
    .footer { padding: 0.875rem 2rem 1.25rem; text-align: center; font-size: 0.65rem; color: #94a3b8; border-top: 1px solid #e2e8f0; }
    @media print { body { background: #fff; } }
    @media (max-width: 520px) { .grid { grid-template-columns: 1fr; } .content { padding: 1.25rem; } }
  </style>
</head>
<body>
  <div class="page">
    <header class="hero">
      <p class="brand">${escapeHtml(SITE_NAME)}</p>
      <h1>Review Summary</h1>
      <p>Preliminary review based on the information you provided.</p>
    </header>
    <div class="content">
      <h2>Review Summary</h2>
      <dl class="grid">
        <div class="cell full"><dt>Property Address</dt><dd>${escapeHtml(data.propertyAddress || "On file")}</dd></div>
        <div class="cell"><dt>Requested Funds</dt><dd>${escapeHtml(data.requestedFunds)}</dd></div>
        <div class="cell"><dt>Profile</dt><dd>Complete</dd></div>
        <div class="cell"><dt>Review Status</dt><dd>${escapeHtml(data.reviewStatus)}</dd></div>
      </dl>
      <span class="badge">${escapeHtml(scenario.badge)}</span>
      <p class="scenario">${escapeHtml(scenario.body)}</p>

      <h2>Potential Financing Paths We&apos;ll Review</h2>
      ${pathsHtml}

      <h2>What Happens Next</h2>
      <ul class="timeline">${timelineHtml}</ul>
      <p class="note">${escapeHtml(COMPLETION_REVIEW_NOTE)}</p>

      <h2>Contact Information</h2>
      <div class="contact">
        <p><strong>${escapeHtml(FINANCING_REVIEW_CONTACT.teamLabel)}</strong> · ${escapeHtml(FINANCING_REVIEW_CONTACT.platformName)}</p>
        <p>${escapeHtml(FINANCING_REVIEW_CONTACT.email)}</p>
        <p>${escapeHtml(FINANCING_REVIEW_CONTACT.siteUrl)}</p>
      </div>

      <p class="disclaimer">${escapeHtml(FINANCING_REVIEW_DISCLAIMER)}</p>
    </div>
    <div class="footer">${escapeHtml(SITE_URL)}</div>
  </div>
</body>
</html>`;
}

export function printFinancingReviewPdf(data: FinancingReviewData): void {
  const html = buildFinancingReviewHtml(data);
  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) {
    downloadFinancingReviewHtml(data);
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.onload = () => {
    printWindow.print();
  };
}

export function downloadFinancingReviewHtml(data: FinancingReviewData): void {
  const html = buildFinancingReviewHtml(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const dateStamp = new Date().toISOString().slice(0, 10);
  anchor.href = url;
  anchor.download = `review-summary-${dateStamp}.html`;
  anchor.click();
  URL.revokeObjectURL(url);
}

/** @deprecated Use printFinancingReviewPdf */
export function printInvestorSnapshot(data: FinancingReviewData): void {
  printFinancingReviewPdf(data);
}

/** @deprecated Use downloadFinancingReviewHtml */
export function downloadInvestorSnapshot(data: FinancingReviewData): void {
  downloadFinancingReviewHtml(data);
}

/** @deprecated Use buildFinancingReviewHtml */
export function buildInvestorSnapshotHtml(data: FinancingReviewData): string {
  return buildFinancingReviewHtml(data);
}
