import type { DealAnalysisResult, DealInputs } from "../types";
import { analyzeBuydown } from "./buydown";
import { analyzeInvestorDeal } from "./investor";
import {
  calculateLoanAmount,
  calculateLtv,
  calculatePaymentBreakdown,
} from "./mortgage";
import { analyzeRefinance } from "./refinance";
import { analyzeSellerConcession } from "./seller-concession";

export function analyzeDeal(inputs: DealInputs): DealAnalysisResult {
  const {
    propertyValue,
    interestRate,
    loanTermYears,
    annualPropertyTax,
    annualInsurance,
    monthlyHoa,
  } = inputs;

  let loanAmount = 0;
  let downPaymentAmount = 0;
  let downPaymentPercent = 0;

  if (inputs.path === "refinance") {
    loanAmount = inputs.currentBalance + inputs.cashOutAmount;
    downPaymentAmount = Math.max(propertyValue - loanAmount, 0);
    downPaymentPercent =
      propertyValue > 0 ? (downPaymentAmount / propertyValue) * 100 : 0;
  } else {
    downPaymentPercent = inputs.downPaymentPercent;
    loanAmount = calculateLoanAmount(propertyValue, downPaymentPercent);
    downPaymentAmount = propertyValue - loanAmount;
  }

  const payment = calculatePaymentBreakdown(
    loanAmount,
    interestRate,
    loanTermYears,
    annualPropertyTax,
    annualInsurance,
    monthlyHoa,
  );

  const ltv = calculateLtv(loanAmount, propertyValue);
  const paymentBreakdown = [
    { name: "Principal & Interest", value: payment.principalAndInterest },
    { name: "Property Tax", value: payment.propertyTax },
    { name: "Insurance", value: payment.insurance },
    { name: "HOA", value: payment.hoa },
  ].filter((item) => item.value > 0);

  const result: DealAnalysisResult = {
    path: inputs.path,
    loanAmount,
    downPaymentAmount,
    ltv,
    payment,
    chartData: { paymentBreakdown },
  };

  if (inputs.path === "buy-home") {
    result.buydown = analyzeBuydown(
      loanAmount,
      interestRate,
      loanTermYears,
      annualPropertyTax,
      annualInsurance,
      monthlyHoa,
      inputs.buydownType,
    );
    result.sellerConcession = analyzeSellerConcession(
      propertyValue,
      inputs.downPaymentPercent,
      inputs.sellerConcession,
    );
  }

  if (inputs.path === "refinance") {
    result.refinance = analyzeRefinance({
      currentBalance: inputs.currentBalance,
      currentRate: inputs.currentRate,
      newRate: interestRate,
      termYears: loanTermYears,
      cashOutAmount: inputs.cashOutAmount,
      propertyValue,
      annualPropertyTax,
      annualInsurance,
      monthlyHoa,
      estimatedClosingCosts: inputs.estimatedClosingCosts,
    });
    result.chartData.refinanceSeries = [
      {
        label: "Monthly Payment",
        current: result.refinance.currentPayment,
        proposed: result.refinance.newPayment,
      },
      {
        label: "Annual Savings",
        current: 0,
        proposed: Math.max(result.refinance.annualSavings, 0),
      },
    ];
  }

  if (inputs.path === "investor-dscr") {
    result.investor = analyzeInvestorDeal({
      propertyValue,
      monthlyRent: inputs.monthlyRent,
      vacancyRate: inputs.vacancyRate,
      monthlyManagement: inputs.monthlyManagement,
      monthlyMaintenance: inputs.monthlyMaintenance,
      payment,
    });
    result.chartData.cashFlowSeries = [
      {
        label: "Rent",
        income: inputs.monthlyRent,
        expense: 0,
      },
      {
        label: "Debt Service",
        income: 0,
        expense: payment.total,
      },
      {
        label: "Ops & Mgmt",
        income: 0,
        expense: inputs.monthlyManagement + inputs.monthlyMaintenance,
      },
    ];
    result.chartData.dscrGauge = {
      dscr: result.investor.dscr,
      target: 1.0,
    };
  }

  if (inputs.path === "commercial") {
    const noi =
      inputs.annualNoi + inputs.annualOtherIncome - inputs.annualOperatingExpenses;
    const annualDebtService = payment.total * 12;
    const dscr = annualDebtService > 0 ? noi / annualDebtService : 0;
    const capRate = propertyValue > 0 ? (noi / propertyValue) * 100 : 0;
    const debtYield = loanAmount > 0 ? (noi / loanAmount) * 100 : 0;
    const monthlyCashFlow = noi / 12 - payment.total;

    result.commercial = {
      noi,
      dscr,
      capRate,
      debtYield,
      monthlyCashFlow,
    };
    result.chartData.dscrGauge = { dscr, target: 1.25 };
    result.chartData.cashFlowSeries = [
      { label: "NOI (mo)", income: noi / 12, expense: 0 },
      { label: "Debt Service", income: 0, expense: payment.total },
    ];
  }

  return result;
}
