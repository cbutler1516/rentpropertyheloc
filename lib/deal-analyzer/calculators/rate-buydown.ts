import { estimateMonthlyPayment, formatCurrency } from "@/lib/deal-analyzer/calculators/math";

export function rateBuydownSavings(
  principal: number,
  termYears: number,
  baseRatePercent: number,
  boughtDownRatePercent: number,
): { basePayment: number; reducedPayment: number; monthlySavings: number; annualSavings: number } {
  const basePayment = estimateMonthlyPayment(principal, baseRatePercent, termYears);
  const reducedPayment = estimateMonthlyPayment(principal, boughtDownRatePercent, termYears);
  const monthlySavings = Math.max(0, basePayment - reducedPayment);
  return {
    basePayment,
    reducedPayment,
    monthlySavings,
    annualSavings: monthlySavings * 12,
  };
}

export function formatBuydownSummary(
  principal: number,
  termYears: number,
  baseRatePercent: number,
  boughtDownRatePercent: number,
): string {
  const { monthlySavings, reducedPayment } = rateBuydownSavings(
    principal,
    termYears,
    baseRatePercent,
    boughtDownRatePercent,
  );
  return `Buydown may reduce payment to ${formatCurrency(reducedPayment)} (est. ${formatCurrency(monthlySavings)}/mo vs base rate — educational only).`;
}
