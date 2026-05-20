export type DealPath =
  | "buy-home"
  | "refinance"
  | "investor-dscr"
  | "commercial";

export type ClientRole =
  | "Buyer"
  | "Agent"
  | "Investor"
  | "Commercial Client";

export type BuydownType = "none" | "2-1" | "1-0";

export type BaseDealInputs = {
  path: DealPath;
  propertyValue: number;
  interestRate: number;
  loanTermYears: number;
  annualPropertyTax: number;
  annualInsurance: number;
  monthlyHoa: number;
};

export type BuyHomeInputs = BaseDealInputs & {
  path: "buy-home";
  downPaymentPercent: number;
  sellerConcession: number;
  buydownType: BuydownType;
};

export type RefinanceInputs = BaseDealInputs & {
  path: "refinance";
  currentBalance: number;
  currentRate: number;
  cashOutAmount: number;
  estimatedClosingCosts: number;
};

export type InvestorDscrInputs = BaseDealInputs & {
  path: "investor-dscr";
  downPaymentPercent: number;
  monthlyRent: number;
  vacancyRate: number;
  monthlyManagement: number;
  monthlyMaintenance: number;
};

export type CommercialInputs = BaseDealInputs & {
  path: "commercial";
  downPaymentPercent: number;
  annualNoi: number;
  annualOtherIncome: number;
  annualOperatingExpenses: number;
};

export type DealInputs =
  | BuyHomeInputs
  | RefinanceInputs
  | InvestorDscrInputs
  | CommercialInputs;

export type PaymentBreakdown = {
  principalAndInterest: number;
  propertyTax: number;
  insurance: number;
  hoa: number;
  total: number;
};

export type BuydownAnalysis = {
  type: BuydownType;
  yearOnePayment: number;
  yearTwoPayment: number;
  standardPayment: number;
  yearOneSavings: number;
  yearTwoSavings: number;
  totalTwoYearSavings: number;
};

export type SellerConcessionAnalysis = {
  concessionAmount: number;
  percentOfPrice: number;
  estimatedCashToCloseBefore: number;
  estimatedCashToCloseAfter: number;
  cashToCloseReduction: number;
};

export type RefinanceComparison = {
  currentPayment: number;
  newPayment: number;
  monthlySavings: number;
  annualSavings: number;
  breakEvenMonths: number | null;
  newLoanAmount: number;
};

export type InvestorMetrics = {
  monthlyRent: number;
  effectiveGrossIncome: number;
  operatingExpenses: number;
  noi: number;
  dscr: number;
  capRate: number;
  monthlyCashFlow: number;
  annualCashFlow: number;
};

export type DealAnalysisResult = {
  path: DealPath;
  loanAmount: number;
  downPaymentAmount: number;
  ltv: number;
  payment: PaymentBreakdown;
  buydown?: BuydownAnalysis;
  sellerConcession?: SellerConcessionAnalysis;
  refinance?: RefinanceComparison;
  investor?: InvestorMetrics;
  commercial?: {
    noi: number;
    dscr: number;
    capRate: number;
    debtYield: number;
    monthlyCashFlow: number;
  };
  chartData: {
    paymentBreakdown: Array<{ name: string; value: number }>;
    cashFlowSeries?: Array<{ label: string; income: number; expense: number }>;
    refinanceSeries?: Array<{ label: string; current: number; proposed: number }>;
    dscrGauge?: { dscr: number; target: number };
  };
};

export type LeadCapture = {
  name: string;
  email: string;
  phone: string;
  role: ClientRole;
  notes: string;
  referralSource?: string;
  agentName?: string;
  /** Required true at submit — SMS/call/email contact consent */
  smsCallConsent: boolean;
};

export type DealAnalyzerSession = {
  inputs: DealInputs | null;
  analysis: DealAnalysisResult | null;
  lead: LeadCapture | null;
  reportSlug: string | null;
  reportUnlocked: boolean;
};

export const defaultSession: DealAnalyzerSession = {
  inputs: null,
  analysis: null,
  lead: null,
  reportSlug: null,
  reportUnlocked: false,
};
