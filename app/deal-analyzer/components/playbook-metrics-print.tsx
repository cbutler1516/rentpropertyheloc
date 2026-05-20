import { formatCurrency, formatNumber, formatPercent } from "@/lib/utils";
import type { DealAnalysisResult } from "../lib/types";

type PlaybookMetricsPrintProps = {
  analysis: DealAnalysisResult;
};

export function PlaybookMetricsPrint({ analysis }: PlaybookMetricsPrintProps) {
  const rows: Array<{ label: string; value: string }> = [
    { label: "Est. monthly payment", value: formatCurrency(analysis.payment.total) },
    { label: "Loan amount", value: formatCurrency(analysis.loanAmount) },
    { label: "LTV", value: formatPercent(analysis.ltv, 1) },
    { label: "Down / equity", value: formatCurrency(analysis.downPaymentAmount) },
  ];

  if (analysis.investor) {
    rows.push(
      { label: "DSCR", value: `${formatNumber(analysis.investor.dscr, 2)}x` },
      { label: "Cap rate", value: formatPercent(analysis.investor.capRate, 2) },
      {
        label: "Monthly cash flow",
        value: formatCurrency(analysis.investor.monthlyCashFlow),
      },
    );
  }

  if (analysis.commercial) {
    rows.push(
      { label: "DSCR", value: `${formatNumber(analysis.commercial.dscr, 2)}x` },
      { label: "Cap rate", value: formatPercent(analysis.commercial.capRate, 2) },
      {
        label: "Debt yield",
        value: formatPercent(analysis.commercial.debtYield, 2),
      },
    );
  }

  if (analysis.refinance) {
    rows.push(
      {
        label: "Current payment",
        value: formatCurrency(analysis.refinance.currentPayment),
      },
      {
        label: "Proposed payment",
        value: formatCurrency(analysis.refinance.newPayment),
      },
      {
        label: "Break-even",
        value: analysis.refinance.breakEvenMonths
          ? `${analysis.refinance.breakEvenMonths} mo`
          : "—",
      },
    );
  }

  return (
    <section className="playbook-print-only playbook-print-avoid-break mb-6">
      <h2
        style={{
          fontSize: "11pt",
          fontWeight: 600,
          marginBottom: "0.5rem",
          color: "#111",
        }}
      >
        Deal snapshot — key metrics
      </h2>
      <div className="playbook-metrics-print-grid">
        {rows.map((row) => (
          <div key={row.label} className="playbook-metrics-print-cell">
            <div className="playbook-metrics-print-label">{row.label}</div>
            <div className="playbook-metrics-print-value">{row.value}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
