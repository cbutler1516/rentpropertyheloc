import type { SellerConcessionAnalysis } from "../types";

export function analyzeSellerConcession(
  propertyValue: number,
  downPaymentPercent: number,
  concessionAmount: number,
  estimatedClosingCosts = 12_000,
): SellerConcessionAnalysis {
  const downPayment = propertyValue * (downPaymentPercent / 100);
  const before = downPayment + estimatedClosingCosts;
  const after = Math.max(before - concessionAmount, 0);

  return {
    concessionAmount,
    percentOfPrice:
      propertyValue > 0 ? (concessionAmount / propertyValue) * 100 : 0,
    estimatedCashToCloseBefore: before,
    estimatedCashToCloseAfter: after,
    cashToCloseReduction: before - after,
  };
}
