import type { RefinanceComparison } from "../types";
import { calculateMonthlyPI } from "./mortgage";

export function analyzeRefinance(params: {
  currentBalance: number;
  currentRate: number;
  newRate: number;
  termYears: number;
  cashOutAmount: number;
  propertyValue: number;
  annualPropertyTax: number;
  annualInsurance: number;
  monthlyHoa: number;
  estimatedClosingCosts: number;
}): RefinanceComparison {
  const {
    currentBalance,
    currentRate,
    newRate,
    termYears,
    cashOutAmount,
    propertyValue,
    annualPropertyTax,
    annualInsurance,
    monthlyHoa,
    estimatedClosingCosts,
  } = params;

  const newLoanAmount = currentBalance + cashOutAmount;
  const currentPI = calculateMonthlyPI(currentBalance, currentRate, termYears);
  const newPI = calculateMonthlyPI(newLoanAmount, newRate, termYears);
  const tax = annualPropertyTax / 12;
  const ins = annualInsurance / 12;

  const currentPayment = currentPI + tax + ins + monthlyHoa;
  const newPayment = newPI + tax + ins + monthlyHoa;
  const monthlySavings = currentPayment - newPayment;
  const annualSavings = monthlySavings * 12;
  const breakEvenMonths =
    monthlySavings > 0
      ? Math.ceil(estimatedClosingCosts / monthlySavings)
      : null;

  return {
    currentPayment,
    newPayment,
    monthlySavings,
    annualSavings,
    breakEvenMonths,
    newLoanAmount,
  };
}
