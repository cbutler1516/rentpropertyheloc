/** Strip to digits only for currency storage/submission. */
export function parseCurrencyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Format digit string with US grouping (no $ prefix). */
export function formatCurrencyDisplay(digits: string): string {
  if (!digits) return "";
  const n = Number(digits);
  if (!Number.isFinite(n)) return "";
  return n.toLocaleString("en-US");
}

/** Parse percent input (digits + optional single decimal). */
export function parsePercentInput(value: string): string {
  const cleaned = value.replace(/[^\d.]/g, "");
  const parts = cleaned.split(".");
  if (parts.length <= 1) return parts[0] ?? "";
  return `${parts[0]}.${parts.slice(1).join("").slice(0, 2)}`;
}

export function parsePercentNumber(value: string): number | null {
  const raw = parsePercentInput(value);
  if (!raw) return null;
  const n = Number(raw);
  return Number.isFinite(n) ? n : null;
}

/** loan = purchase * (1 - downPayment% / 100), rounded to whole dollars. */
export function calculateLoanAmountDigits(
  purchaseDigits: string,
  downPaymentPercent: string,
): string {
  const price = Number(purchaseDigits);
  const pct = parsePercentNumber(downPaymentPercent);
  if (!purchaseDigits || !Number.isFinite(price) || price <= 0) return "";
  if (pct === null || pct < 0 || pct > 100) return "";
  return String(Math.round(price * (1 - pct / 100)));
}

export function hasFinancialsInput(snapshot: {
  purchasePrice: string;
  loanAmount: string;
}): boolean {
  return Boolean(
    parseCurrencyDigits(snapshot.purchasePrice) ||
      parseCurrencyDigits(snapshot.loanAmount),
  );
}
