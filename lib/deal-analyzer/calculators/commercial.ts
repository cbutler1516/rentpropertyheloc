import { calculateCapRate, calculateDscr, formatDscrRatio } from "@/lib/deal-analyzer/calculators/dscr";
import { estimateMonthlyPayment, formatCurrency, formatPercent } from "@/lib/deal-analyzer/calculators/math";

export function commercialMetrics(
  propertyValue: number,
  annualNOI: number,
  loanAmount: number,
  annualRatePercent: number,
  termYears: number,
): {
  monthlyNOI: number;
  capRate: number;
  annualDebtService: number;
  monthlyDebtService: number;
  commercialDscr: number;
  cashFlowAfterDebt: number;
} {
  const monthlyNOI = annualNOI / 12;
  const monthlyDebtService = estimateMonthlyPayment(loanAmount, annualRatePercent, termYears);
  const annualDebtService = monthlyDebtService * 12;
  const commercialDscr = calculateDscr(monthlyNOI, monthlyDebtService);
  const capRate = calculateCapRate(annualNOI, propertyValue);
  const cashFlowAfterDebt = monthlyNOI - monthlyDebtService;

  return {
    monthlyNOI,
    capRate,
    annualDebtService,
    monthlyDebtService,
    commercialDscr,
    cashFlowAfterDebt,
  };
}

export function summarizeCommercialDscr(dscr: number): string {
  const ratio = formatDscrRatio(dscr);
  if (dscr >= 1.25) return `Estimated DSCR ${ratio} — may meet common lender thresholds (subject to approval).`;
  if (dscr >= 1.0) return `Estimated DSCR ${ratio} — review structure and reserves with a strategist.`;
  return `Estimated DSCR ${ratio} — cash flow may be tight; educational model only.`;
}
