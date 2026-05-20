import type { PaymentBreakdown } from "../types";

export function calculateLoanAmount(
  propertyValue: number,
  downPaymentPercent: number,
): number {
  const down = propertyValue * (downPaymentPercent / 100);
  return Math.max(propertyValue - down, 0);
}

export function calculateMonthlyPI(
  principal: number,
  annualRatePercent: number,
  termYears: number,
): number {
  if (principal <= 0) return 0;
  const monthlyRate = annualRatePercent / 100 / 12;
  const months = termYears * 12;
  if (monthlyRate === 0) return principal / months;
  const factor = Math.pow(1 + monthlyRate, months);
  return (principal * monthlyRate * factor) / (factor - 1);
}

export function calculatePaymentBreakdown(
  loanAmount: number,
  annualRatePercent: number,
  termYears: number,
  annualPropertyTax: number,
  annualInsurance: number,
  monthlyHoa: number,
  rateOverride?: number,
): PaymentBreakdown {
  const rate = rateOverride ?? annualRatePercent;
  const principalAndInterest = calculateMonthlyPI(
    loanAmount,
    rate,
    termYears,
  );
  const propertyTax = annualPropertyTax / 12;
  const insurance = annualInsurance / 12;
  const hoa = monthlyHoa;
  return {
    principalAndInterest,
    propertyTax,
    insurance,
    hoa,
    total: principalAndInterest + propertyTax + insurance + hoa,
  };
}

export function calculateLtv(loanAmount: number, propertyValue: number): number {
  if (propertyValue <= 0) return 0;
  return (loanAmount / propertyValue) * 100;
}
