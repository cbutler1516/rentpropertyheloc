import { formatPercent } from "@/lib/deal-analyzer/calculators/math";

export function calculateDscr(monthlyIncome: number, monthlyDebtService: number): number {
  if (monthlyDebtService <= 0) return 0;
  return monthlyIncome / monthlyDebtService;
}

export function calculateCapRate(annualNOI: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0;
  return (annualNOI / propertyValue) * 100;
}

export function calculateCashFlow(
  monthlyRent: number,
  monthlyExpenses: number,
  monthlyDebtService: number,
): number {
  return monthlyRent - monthlyExpenses - monthlyDebtService;
}

export function formatDscrRatio(dscr: number): string {
  if (!Number.isFinite(dscr) || dscr <= 0) return "—";
  return `${dscr.toFixed(2)}x`;
}
