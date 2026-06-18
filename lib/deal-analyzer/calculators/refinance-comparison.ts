import { estimateMonthlyPayment, formatCurrency } from "@/lib/deal-analyzer/calculators/math";

export function refinanceComparison(
  currentBalance: number,
  currentRatePercent: number,
  currentTermRemainingYears: number,
  newRatePercent: number,
  newTermYears: number,
  closingCosts: number,
): {
  currentPayment: number;
  newPayment: number;
  monthlySavings: number;
  breakEvenMonths: number | null;
} {
  const currentPayment = estimateMonthlyPayment(
    currentBalance,
    currentRatePercent,
    currentTermRemainingYears,
  );
  const newPayment = estimateMonthlyPayment(currentBalance, newRatePercent, newTermYears);
  const monthlySavings = currentPayment - newPayment;
  const breakEvenMonths =
    monthlySavings > 0 && closingCosts > 0 ? Math.ceil(closingCosts / monthlySavings) : null;

  return { currentPayment, newPayment, monthlySavings, breakEvenMonths };
}

export function helocVsCashOutComparison(
  propertyValue: number,
  mortgageBalance: number,
  cashOutAmount: number,
  helocRatePercent: number,
  cashOutRatePercent: number,
  termYears: number,
): {
  availableEquity: number;
  helocPaymentOnDraw: number;
  cashOutPayment: number;
  newLoanAmount: number;
} {
  const availableEquity = Math.max(0, propertyValue - mortgageBalance);
  const draw = Math.min(cashOutAmount, availableEquity);
  const newLoanAmount = mortgageBalance + cashOutAmount;
  const helocPaymentOnDraw = estimateMonthlyPayment(draw, helocRatePercent, termYears);
  const cashOutPayment = estimateMonthlyPayment(newLoanAmount, cashOutRatePercent, termYears);
  return { availableEquity, helocPaymentOnDraw, cashOutPayment, newLoanAmount };
}
