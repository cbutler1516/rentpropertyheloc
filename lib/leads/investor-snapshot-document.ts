import {
  getProfileStrengthLabel,
  getUnlockedFinancingPaths,
  SNAPSHOT_DOWNLOAD_DISCLAIMER,
} from "@/lib/leads/investor-review-gamification";

export type InvestorSnapshotData = {
  propertyAddress: string;
  requestedFunds: string;
  submissionDate: string;
  reviewStatus: string;
  profileStrength: number;
  priorityReviewActive: boolean;
  profileComplete?: boolean;
  /** @deprecated Use profileStrength */
  opportunityScore?: number;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildInvestorSnapshotHtml(data: InvestorSnapshotData): string {
  const strength = data.profileStrength ?? data.opportunityScore ?? 0;
  const label = getProfileStrengthLabel(strength);
  const priority = data.priorityReviewActive ? "Priority Review Activated" : "Standard Review Queue";
  const unlockedPaths = getUnlockedFinancingPaths(strength);
  const pathsHtml = unlockedPaths.length
    ? unlockedPaths
        .map(
          (path) =>
            `<li><strong>${escapeHtml(path.name)}</strong> — ${escapeHtml(path.description)}</li>`,
        )
        .join("")
    : "<li>No financing paths unlocked yet.</li>";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Investor Snapshot — RentPropertyHELOC</title>
  <style>
    * { box-sizing: border-box; }
    body { font-family: system-ui, -apple-system, Segoe UI, sans-serif; color: #0f172a; margin: 0; padding: 2rem; background: #f8fafc; }
    .card { max-width: 640px; margin: 0 auto; background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 2rem; }
    h1 { font-size: 1.375rem; margin: 0 0 0.25rem; }
    h2 { font-size: 0.875rem; margin: 1.5rem 0 0.75rem; text-transform: uppercase; letter-spacing: 0.08em; color: #64748b; }
    .eyebrow { font-size: 0.6875rem; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #0d9488; margin-bottom: 1rem; }
    .score { display: inline-block; margin: 1rem 0; padding: 0.75rem 1rem; border-radius: 12px; background: #f0fdfa; border: 1px solid #99f6e4; }
    .score-num { font-size: 1.75rem; font-weight: 800; color: #115e59; }
    dl { margin: 1.5rem 0 0; display: grid; gap: 0.875rem; }
    dt { font-size: 0.6875rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: #64748b; }
    dd { margin: 0.2rem 0 0; font-size: 0.9375rem; font-weight: 600; color: #0f172a; }
    ul { margin: 0; padding-left: 1.1rem; display: grid; gap: 0.5rem; font-size: 0.8125rem; line-height: 1.45; color: #334155; }
    .disclaimer { margin-top: 1.75rem; padding-top: 1rem; border-top: 1px solid #e2e8f0; font-size: 0.6875rem; line-height: 1.5; color: #64748b; }
    @media print { body { background: #fff; padding: 0; } .card { border: none; box-shadow: none; } }
  </style>
</head>
<body>
  <div class="card">
    <p class="eyebrow">Investor Equity Snapshot${data.profileComplete ? " — Updated" : ""}</p>
    <h1>Your Review Summary</h1>
    <div class="score">
      <div class="score-num">${strength}%</div>
      <div style="font-size:0.8125rem;font-weight:600;color:#0f766e;margin-top:0.25rem;">Profile Strength — ${escapeHtml(label)}</div>
    </div>
    <dl>
      <div><dt>Property Address</dt><dd>${escapeHtml(data.propertyAddress || "On file")}</dd></div>
      <div><dt>Requested Funds</dt><dd>${escapeHtml(data.requestedFunds)}</dd></div>
      <div><dt>Submission Date</dt><dd>${escapeHtml(data.submissionDate)}</dd></div>
      <div><dt>Review Status</dt><dd>${escapeHtml(data.reviewStatus)}</dd></div>
      <div><dt>Priority Review</dt><dd>${escapeHtml(priority)}</dd></div>
      <div><dt>Profile Strength</dt><dd>${strength}% — ${escapeHtml(label)}</dd></div>
    </dl>
    <h2>Financing Paths We&apos;ll Review</h2>
    <ul>${pathsHtml}</ul>
    <p class="disclaimer">${SNAPSHOT_DOWNLOAD_DISCLAIMER}</p>
  </div>
</body>
</html>`;
}

export function downloadInvestorSnapshot(data: InvestorSnapshotData): void {
  const html = buildInvestorSnapshotHtml(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  const dateStamp = new Date().toISOString().slice(0, 10);
  const suffix = data.profileComplete ? "-complete" : "";
  anchor.href = url;
  anchor.download = `investor-snapshot-${dateStamp}${suffix}.html`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function printInvestorSnapshot(data: InvestorSnapshotData): void {
  const html = buildInvestorSnapshotHtml(data);
  const printWindow = window.open("", "_blank", "noopener,noreferrer");
  if (!printWindow) {
    downloadInvestorSnapshot(data);
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
}
