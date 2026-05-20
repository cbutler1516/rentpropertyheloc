import type { InvestorMetrics } from "../types";
import type { PaymentBreakdown } from "../types";

export function analyzeInvestorDeal(params: {
  propertyValue: number;
  monthlyRent: number;
  vacancyRate: number;
  monthlyManagement: number;
  monthlyMaintenance: number;
  payment: PaymentBreakdown;
}): InvestorMetrics {
  const {
    propertyValue,
    monthlyRent,
    vacancyRate,
    monthlyManagement,
    monthlyMaintenance,
    payment,
  } = params;

  const effectiveGrossIncome = monthlyRent * 12 * (1 - vacancyRate / 100);
  const operatingExpenses =
    (monthlyManagement + monthlyMaintenance) * 12 +
    payment.propertyTax * 12 +
    payment.insurance * 12 +
    payment.hoa * 12;
  const noi = effectiveGrossIncome - operatingExpenses;
  const annualDebtService = payment.total * 12;
  const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
  const capRate = propertyValue > 0 ? (noi / propertyValue) * 100 : 0;
  const monthlyCashFlow = monthlyRent - payment.total - monthlyManagement - monthlyMaintenance;
  const annualCashFlow = monthlyCashFlow * 12;

  return {
    monthlyRent,
    effectiveGrossIncome,
    operatingExpenses,
    noi,
    dscr,
    capRate,
    monthlyCashFlow,
    annualCashFlow,
  };
}
