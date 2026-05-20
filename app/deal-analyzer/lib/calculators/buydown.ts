import type { BuydownAnalysis, BuydownType } from "../types";
import { calculatePaymentBreakdown } from "./mortgage";

export function analyzeBuydown(
  loanAmount: number,
  annualRatePercent: number,
  termYears: number,
  annualPropertyTax: number,
  annualInsurance: number,
  monthlyHoa: number,
  buydownType: BuydownType,
): BuydownAnalysis | undefined {
  if (buydownType === "none") return undefined;

  const standard = calculatePaymentBreakdown(
    loanAmount,
    annualRatePercent,
    termYears,
    annualPropertyTax,
    annualInsurance,
    monthlyHoa,
  );

  const yearOneRate =
    buydownType === "2-1"
      ? Math.max(annualRatePercent - 2, 0)
      : Math.max(annualRatePercent - 1, 0);
  const yearTwoRate =
    buydownType === "2-1"
      ? Math.max(annualRatePercent - 1, 0)
      : annualRatePercent;

  const yearOne = calculatePaymentBreakdown(
    loanAmount,
    annualRatePercent,
    termYears,
    annualPropertyTax,
    annualInsurance,
    monthlyHoa,
    yearOneRate,
  );
  const yearTwo = calculatePaymentBreakdown(
    loanAmount,
    annualRatePercent,
    termYears,
    annualPropertyTax,
    annualInsurance,
    monthlyHoa,
    yearTwoRate,
  );

  const yearOneSavings = (standard.total - yearOne.total) * 12;
  const yearTwoSavings = (standard.total - yearTwo.total) * 12;

  return {
    type: buydownType,
    yearOnePayment: yearOne.total,
    yearTwoPayment: yearTwo.total,
    standardPayment: standard.total,
    yearOneSavings,
    yearTwoSavings,
    totalTwoYearSavings: yearOneSavings + yearTwoSavings,
  };
}
