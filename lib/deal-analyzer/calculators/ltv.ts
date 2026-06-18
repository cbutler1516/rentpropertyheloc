import { formatPercent, parseNumber } from "@/lib/deal-analyzer/calculators/math";

export function calculateLtv(loanAmount: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0;
  return (loanAmount / propertyValue) * 100;
}

export function calculateLtvMetric(loanAmount: number, propertyValue: number) {
  const ltv = calculateLtv(loanAmount, propertyValue);
  return {
    ltv,
    label: formatPercent(ltv),
    note: ltv > 80 ? "May require PMI or alternative structure — subject to approval." : undefined,
  };
}

export function sellerConcessionImpact(
  purchasePrice: number,
  concessionAmount: number,
): { effectivePrice: number; concessionPercent: number } {
  const price = parseNumber(purchasePrice);
  const concession = parseNumber(concessionAmount);
  const effectivePrice = Math.max(0, price - concession);
  const concessionPercent = price > 0 ? (concession / price) * 100 : 0;
  return { effectivePrice, concessionPercent };
}
