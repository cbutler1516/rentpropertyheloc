import { PLAYBOOK_BRAND, PDF_DISCLAIMER, formatReportDate } from "../lib/brand";

type PlaybookReportPrintChromeProps = {
  pathLabel: string;
  clientName?: string;
  agentName?: string | null;
  createdAt?: string;
  reportUrl: string;
  slug: string;
};

export function PlaybookReportPrintChrome({
  pathLabel,
  clientName,
  agentName,
  createdAt,
  reportUrl,
  slug,
}: PlaybookReportPrintChromeProps) {
  const reportDate = formatReportDate(createdAt);

  return (
    <>
      <div className="playbook-print-only playbook-print-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
          <div>
            <p style={{ fontSize: "9pt", letterSpacing: "0.2em", textTransform: "uppercase", color: "#5b21b6", margin: 0 }}>
              {PLAYBOOK_BRAND.siteName}
            </p>
            <p style={{ fontSize: "8pt", color: "#666", margin: "4px 0 0" }}>
              {PLAYBOOK_BRAND.lendingPartnerFull}
            </p>
          </div>
          <div style={{ textAlign: "right", fontSize: "8pt", color: "#666" }}>
            <p style={{ margin: 0 }}>Strategist</p>
            <p style={{ margin: "2px 0 0", fontWeight: 600, color: "#111" }}>
              {PLAYBOOK_BRAND.strategist}
            </p>
          </div>
        </div>
        <h1 style={{ fontSize: "16pt", fontWeight: 600, margin: "12px 0 8px", color: "#111" }}>
          Playbook Report — {pathLabel}
        </h1>
        <div style={{ fontSize: "9pt", color: "#444", lineHeight: 1.5 }}>
          {clientName ? (
            <p style={{ margin: "0 0 4px" }}>
              <strong>Prepared for:</strong> {clientName}
            </p>
          ) : null}
          {agentName ? (
            <p style={{ margin: "0 0 4px" }}>
              <strong>Shared by:</strong> {agentName}
            </p>
          ) : null}
          <p style={{ margin: "0 0 4px" }}>
            <strong>Report date:</strong> {reportDate}
          </p>
          <p style={{ margin: 0, wordBreak: "break-all" }}>
            <strong>Report link:</strong> {reportUrl}
          </p>
        </div>
      </div>

      <div className="playbook-print-only playbook-print-footer">
        <p style={{ margin: 0 }}>
          <strong>{PLAYBOOK_BRAND.siteName}</strong> · {PLAYBOOK_BRAND.lendingPartner} ·{" "}
          {PDF_DISCLAIMER}
        </p>
        <p style={{ margin: "4px 0 0" }}>
          Report ID: {slug}
        </p>
      </div>
    </>
  );
}
