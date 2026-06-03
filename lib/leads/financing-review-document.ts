import {
  FINANCING_REVIEW_CONTACT,
  FINANCING_REVIEW_DISCLAIMER,
  FINANCING_REVIEW_NEXT_STEPS,
  FINANCING_REVIEW_PATHS,
} from "@/lib/leads/financing-review-content";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export type FinancingReviewData = {
  propertyAddress: string;
  requestedFunds: string;
  submissionDate: string;
  reviewStatus: string;
  profileStrength: number;
  priorityReviewActive: boolean;
  profileComplete?: boolean;
};

/** @deprecated Use FinancingReviewData */
export type InvestorSnapshotData = FinancingReviewData;

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildFinancingReviewHtml(data: FinancingReviewData): string {
  const priorityLabel = data.priorityReviewActive
    ? "Priority review queue"
    : "Standard review queue";
  const reviewType = "Preliminary review — financing options to discuss";

  const pathsHtml = FINANCING_REVIEW_PATHS.map(
    (path) => `
      <div class="path-card">
        <div class="path-icon">${path.icon}</div>
        <div>
          <h3>${escapeHtml(path.name)}</h3>
          <p>${escapeHtml(path.description)}</p>
        </div>
      </div>`,
  ).join("");

  const stepsHtml = FINANCING_REVIEW_NEXT_STEPS.map(
    (item) => `
      <li>
        <span class="step-num">${item.step}</span>
        <div>
          <strong>${escapeHtml(item.title)}</strong>
          <p>${escapeHtml(item.description)}</p>
        </div>
      </li>`,
  ).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Personalized Financing Review — ${escapeHtml(SITE_NAME)}</title>
  <style>
    * { box-sizing: border-box; }
    body {
      font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
      color: #0f172a;
      margin: 0;
      padding: 0;
      background: #f1f5f9;
      line-height: 1.5;
    }
    .page { max-width: 760px; margin: 0 auto; background: #fff; }
    .hero {
      background: linear-gradient(135deg, #0a1628 0%, #134e4a 100%);
      color: #fff;
      padding: 2.25rem 2rem 2rem;
    }
    .hero-eyebrow {
      font-size: 0.6875rem;
      font-weight: 700;
      letter-spacing: 0.16em;
      text-transform: uppercase;
      color: #5eead4;
      margin: 0 0 0.75rem;
    }
    .hero h1 { font-size: 1.75rem; margin: 0 0 0.5rem; font-weight: 800; letter-spacing: -0.02em; }
    .hero p { margin: 0; color: #cbd5e1; font-size: 0.9375rem; max-width: 36rem; }
    .content { padding: 1.75rem 2rem 2.25rem; }
    h2 {
      font-size: 0.75rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: #64748b;
      margin: 0 0 1rem;
    }
    .summary-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.875rem;
      margin-bottom: 2rem;
    }
    .summary-item {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 0.875rem 1rem;
      background: #f8fafc;
    }
    .summary-item dt {
      font-size: 0.625rem;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: #64748b;
      margin: 0 0 0.35rem;
    }
    .summary-item dd { margin: 0; font-size: 0.875rem; font-weight: 600; color: #0f172a; }
    .summary-item.full { grid-column: 1 / -1; }
    .path-card {
      display: flex;
      gap: 0.875rem;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 1rem;
      margin-bottom: 0.75rem;
      background: #fff;
    }
    .path-icon { font-size: 1.35rem; line-height: 1; flex-shrink: 0; }
    .path-card h3 { margin: 0 0 0.35rem; font-size: 0.9375rem; color: #0f172a; }
    .path-card p { margin: 0; font-size: 0.8125rem; color: #475569; }
    .steps { list-style: none; margin: 0; padding: 0; display: grid; gap: 0.875rem; }
    .steps li { display: flex; gap: 0.875rem; align-items: flex-start; }
    .step-num {
      flex-shrink: 0;
      width: 1.75rem;
      height: 1.75rem;
      border-radius: 999px;
      background: #0d9488;
      color: #fff;
      font-size: 0.75rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .steps strong { display: block; font-size: 0.875rem; margin-bottom: 0.15rem; }
    .steps p { margin: 0; font-size: 0.8125rem; color: #475569; }
    .contact {
      margin-top: 2rem;
      padding: 1.25rem;
      border-radius: 14px;
      background: linear-gradient(135deg, #f0fdfa 0%, #ecfeff 100%);
      border: 1px solid #99f6e4;
    }
    .contact h2 { color: #0f766e; margin-bottom: 0.75rem; }
    .contact p { margin: 0.25rem 0; font-size: 0.8125rem; color: #334155; }
    .disclaimer {
      margin-top: 2rem;
      padding-top: 1.25rem;
      border-top: 1px solid #e2e8f0;
      font-size: 0.6875rem;
      line-height: 1.55;
      color: #64748b;
    }
    .footer {
      padding: 1rem 2rem 1.5rem;
      font-size: 0.6875rem;
      color: #94a3b8;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    @media print {
      body { background: #fff; }
      .page { max-width: none; box-shadow: none; }
    }
    @media (max-width: 560px) {
      .summary-grid { grid-template-columns: 1fr; }
      .hero, .content { padding-left: 1.25rem; padding-right: 1.25rem; }
    }
  </style>
</head>
<body>
  <div class="page">
    <header class="hero">
      <p class="hero-eyebrow">Personalized Financing Review</p>
      <h1>Preliminary Review Summary</h1>
      <p>Based on the information you provided, these are potential financing paths our team may review with you. This is not a lending decision.</p>
    </header>
    <div class="content">
      <h2>1. Review Summary</h2>
      <dl class="summary-grid">
        <div class="summary-item full"><dt>Property</dt><dd>${escapeHtml(data.propertyAddress || "On file")}</dd></div>
        <div class="summary-item"><dt>Funding goal discussed</dt><dd>${escapeHtml(data.requestedFunds)}</dd></div>
        <div class="summary-item"><dt>Submission date</dt><dd>${escapeHtml(data.submissionDate)}</dd></div>
        <div class="summary-item"><dt>Review status</dt><dd>${escapeHtml(data.reviewStatus)}</dd></div>
        <div class="summary-item"><dt>Review type</dt><dd>${escapeHtml(reviewType)}</dd></div>
        <div class="summary-item"><dt>Queue</dt><dd>${escapeHtml(priorityLabel)}</dd></div>
      </dl>

      <h2>2. Financing Paths We May Review</h2>
      ${pathsHtml}

      <h2>3. What Happens Next</h2>
      <ol class="steps">${stepsHtml}</ol>

      <div class="contact">
        <h2>4. Contact Information</h2>
        <p><strong>${escapeHtml(FINANCING_REVIEW_CONTACT.siteName)}</strong></p>
        <p>${escapeHtml(FINANCING_REVIEW_CONTACT.company)}</p>
        <p>${escapeHtml(FINANCING_REVIEW_CONTACT.advisorName)} · ${escapeHtml(FINANCING_REVIEW_CONTACT.advisorTitle)}</p>
        <p>${escapeHtml(FINANCING_REVIEW_CONTACT.phone)} · ${escapeHtml(FINANCING_REVIEW_CONTACT.email)}</p>
        <p>${escapeHtml(FINANCING_REVIEW_CONTACT.nmls)} · ${escapeHtml(FINANCING_REVIEW_CONTACT.companyNmls)}</p>
        <p>Licensed in: ${escapeHtml(FINANCING_REVIEW_CONTACT.licensedStates)}</p>
      </div>

      <p class="disclaimer">${escapeHtml(FINANCING_REVIEW_DISCLAIMER)}</p>
    </div>
    <div class="footer">${escapeHtml(SITE_URL)} · ${escapeHtml(SITE_NAME)}</div>
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
  anchor.download = `personalized-financing-review-${dateStamp}.html`;
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
