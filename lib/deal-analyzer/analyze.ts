import {
  calculateCashFlow,
  calculateCapRate,
  calculateDscr,
  calculateLtvMetric,
  commercialMetrics,
  estimateMonthlyPayment,
  formatCurrency,
  formatDscrRatio,
  formatPercent,
  helocVsCashOutComparison,
  parseNumber,
  rateBuydownSavings,
  refinanceComparison,
  sellerConcessionImpact,
} from "@/lib/deal-analyzer/calculators";
import type { AnalysisResult, DealType } from "@/lib/deal-analyzer/types";

export function analyzeDeal(
  dealType: DealType,
  inputs: Record<string, number | string | boolean>,
): AnalysisResult {
  switch (dealType) {
    case "buy-home":
      return analyzeBuyHome(inputs);
    case "refinance":
      return analyzeRefinance(inputs);
    case "investor-dscr":
      return analyzeInvestorDscr(inputs);
    case "commercial":
      return analyzeCommercial(inputs);
    default:
      return analyzeBuyHome(inputs);
  }
}

function analyzeBuyHome(inputs: Record<string, number | string | boolean>): AnalysisResult {
  const price = parseNumber(inputs.purchasePrice);
  const downPayment = parseNumber(inputs.downPayment);
  const rate = parseNumber(inputs.interestRate, 6.5);
  const termYears = parseNumber(inputs.loanTermYears, 30);
  const taxes = parseNumber(inputs.monthlyTaxes);
  const insurance = parseNumber(inputs.monthlyInsurance);
  const concession = parseNumber(inputs.sellerConcession);
  const buydownRate = parseNumber(inputs.buydownRate, rate);

  const { effectivePrice, concessionPercent } = sellerConcessionImpact(price, concession);
  const loanAmount = Math.max(0, effectivePrice - downPayment);
  const pi = estimateMonthlyPayment(loanAmount, rate, termYears);
  const totalPayment = pi + taxes + insurance;
  const ltv = calculateLtvMetric(loanAmount, price);
  const buydown = rateBuydownSavings(loanAmount, termYears, rate, buydownRate);

  const metrics = [
    { label: "Est. monthly P&I", value: formatCurrency(pi) },
    { label: "Est. total payment", value: formatCurrency(totalPayment), note: "Includes taxes & insurance entered" },
    { label: "Loan amount", value: formatCurrency(loanAmount) },
    { label: "LTV", value: ltv.label, note: ltv.note },
    { label: "Cash to close (down)", value: formatCurrency(downPayment) },
    ...(concession > 0
      ? [
          {
            label: "Seller concession",
            value: formatCurrency(concession),
            note: `${formatPercent(concessionPercent)} of price`,
          },
        ]
      : []),
    ...(buydownRate < rate
      ? [{ label: "Buydown monthly savings", value: formatCurrency(buydown.monthlySavings), note: "Educational estimate" }]
      : []),
  ];

  return {
    dealType: "buy-home",
    summary: `Purchase scenario on ${formatCurrency(price)} with ${formatCurrency(downPayment)} down — est. ${formatCurrency(totalPayment)}/mo all-in.`,
    metrics,
    calculations: {
      purchasePrice: price,
      effectivePrice,
      loanAmount,
      monthlyPI: pi,
      totalPayment,
      ltv: ltv.ltv,
      concessionPercent,
      buydownMonthlySavings: buydown.monthlySavings,
    },
    warnings: price <= 0 ? ["Enter a purchase price to model payments."] : [],
  };
}

function analyzeRefinance(inputs: Record<string, number | string | boolean>): AnalysisResult {
  const balance = parseNumber(inputs.currentBalance);
  const currentRate = parseNumber(inputs.currentRate, 7);
  const remainingYears = parseNumber(inputs.remainingTermYears, 28);
  const newRate = parseNumber(inputs.newRate, 6.25);
  const newTerm = parseNumber(inputs.newTermYears, 30);
  const closingCosts = parseNumber(inputs.closingCosts, 5000);
  const cashOut = parseNumber(inputs.cashOutAmount);
  const propertyValue = parseNumber(inputs.propertyValue);
  const helocRate = parseNumber(inputs.helocRate, 8);
  const cashOutRate = parseNumber(inputs.cashOutRate, newRate);

  const refi = refinanceComparison(balance, currentRate, remainingYears, newRate, newTerm, closingCosts);
  const equityCompare =
    cashOut > 0 && propertyValue > 0
      ? helocVsCashOutComparison(propertyValue, balance, cashOut, helocRate, cashOutRate, newTerm)
      : null;

  const metrics = [
    { label: "Current est. payment", value: formatCurrency(refi.currentPayment) },
    { label: "New est. payment", value: formatCurrency(refi.newPayment) },
    {
      label: "Monthly savings",
      value: formatCurrency(refi.monthlySavings),
      note: refi.monthlySavings < 0 ? "Payment may increase" : undefined,
    },
    {
      label: "Break-even (closing costs)",
      value: refi.breakEvenMonths ? `${refi.breakEvenMonths} months` : "—",
    },
    ...(equityCompare
      ? [
          { label: "HELOC payment on draw", value: formatCurrency(equityCompare.helocPaymentOnDraw) },
          { label: "Cash-out payment", value: formatCurrency(equityCompare.cashOutPayment) },
        ]
      : []),
  ];

  return {
    dealType: "refinance",
    summary: `Refinance model: ${formatCurrency(refi.monthlySavings)}/mo est. savings vs current — educational only.`,
    metrics,
    calculations: {
      currentPayment: refi.currentPayment,
      newPayment: refi.newPayment,
      monthlySavings: refi.monthlySavings,
      breakEvenMonths: refi.breakEvenMonths,
      cashOutAmount: cashOut,
    },
    warnings: balance <= 0 ? ["Enter current loan balance."] : [],
  };
}

function analyzeInvestorDscr(inputs: Record<string, number | string | boolean>): AnalysisResult {
  const value = parseNumber(inputs.propertyValue);
  const rent = parseNumber(inputs.monthlyRent);
  const expenses = parseNumber(inputs.monthlyExpenses);
  const down = parseNumber(inputs.downPayment);
  const rate = parseNumber(inputs.interestRate, 7.5);
  const termYears = parseNumber(inputs.loanTermYears, 30);

  const loanAmount = Math.max(0, value - down);
  const debtService = estimateMonthlyPayment(loanAmount, rate, termYears);
  const dscr = calculateDscr(rent, debtService);
  const cashFlow = calculateCashFlow(rent, expenses, debtService);
  const annualNOI = (rent - expenses) * 12;
  const capRate = calculateCapRate(annualNOI, value);

  const metrics = [
    { label: "Monthly rent", value: formatCurrency(rent) },
    { label: "Est. debt service", value: formatCurrency(debtService) },
    { label: "DSCR", value: formatDscrRatio(dscr) },
    { label: "Monthly cash flow", value: formatCurrency(cashFlow) },
    { label: "Cap rate", value: formatPercent(capRate) },
    { label: "LTV", value: calculateLtvMetric(loanAmount, value).label },
  ];

  return {
    dealType: "investor-dscr",
    summary: `Investor rental model — est. DSCR ${formatDscrRatio(dscr)}, cash flow ${formatCurrency(cashFlow)}/mo.`,
    metrics,
    calculations: {
      propertyValue: value,
      loanAmount,
      dscr,
      cashFlow,
      capRate,
      monthlyDebtService: debtService,
    },
    warnings: rent <= 0 ? ["Enter estimated monthly rent."] : [],
  };
}

function analyzeCommercial(inputs: Record<string, number | string | boolean>): AnalysisResult {
  const value = parseNumber(inputs.propertyValue);
  const annualNOI = parseNumber(inputs.annualNOI);
  const down = parseNumber(inputs.downPayment);
  const rate = parseNumber(inputs.interestRate, 7.25);
  const termYears = parseNumber(inputs.loanTermYears, 25);

  const loanAmount = Math.max(0, value - down);
  const m = commercialMetrics(value, annualNOI, loanAmount, rate, termYears);

  const metrics = [
    { label: "Annual NOI", value: formatCurrency(annualNOI) },
    { label: "Monthly NOI", value: formatCurrency(m.monthlyNOI) },
    { label: "Cap rate", value: formatPercent(m.capRate) },
    { label: "Est. debt service", value: formatCurrency(m.monthlyDebtService) },
    { label: "Commercial DSCR", value: formatDscrRatio(m.commercialDscr) },
    { label: "Cash flow after debt", value: formatCurrency(m.cashFlowAfterDebt) },
    { label: "Loan amount", value: formatCurrency(loanAmount) },
  ];

  return {
    dealType: "commercial",
    summary: `Commercial scenario — NOI ${formatCurrency(annualNOI)}, est. DSCR ${formatDscrRatio(m.commercialDscr)}.`,
    metrics,
    calculations: {
      propertyValue: value,
      annualNOI,
      loanAmount,
      commercialDscr: m.commercialDscr,
      capRate: m.capRate,
      cashFlowAfterDebt: m.cashFlowAfterDebt,
    },
    warnings: annualNOI <= 0 ? ["Enter annual NOI for commercial modeling."] : [],
  };
}
