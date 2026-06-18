/** Monthly principal & interest (fixed-rate amortization). */
export function estimateMonthlyPayment(
  principal: number,
  annualRatePercent: number,
  termYears: number,
): number {
  if (principal <= 0 || termYears <= 0) return 0;
  const n = termYears * 12;
  if (annualRatePercent <= 0) return principal / n;
  const r = annualRatePercent / 100 / 12;
  const factor = Math.pow(1 + r, n);
  return (principal * r * factor) / (factor - 1);
}

export function formatCurrency(value: number, decimals = 0): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimals,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function parseNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const parsed = parseFloat(value.replace(/[^0.-]/g, ""));
    return Number.isFinite(parsed) ? parsed : fallback;
  }
  return fallback;
}
