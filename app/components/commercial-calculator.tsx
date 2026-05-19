"use client";
// @ts-nocheck

import React, { useState, useEffect, useMemo } from 'react';
import { trackEvent } from '../lib/analytics-events';

const createIcon = (label) =>
  function Icon({ className = "", style = {} }) {
    return (
      <svg
        aria-hidden
        className={className}
        style={style}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="4" y="4" width="16" height="16" rx="4" opacity="0.12" />
        <path d="M8 12h8" />
        <path d="M12 8v8" opacity="0.65" />
        <title>{label}</title>
      </svg>
    );
  };

const Calculator = createIcon("Calculator");
const DollarSign = createIcon("Dollar sign");
const Percent = createIcon("Percent");
const Calendar = createIcon("Calendar");
const TrendingUp = createIcon("Trending up");
const Building = createIcon("Building");
const PieChart = createIcon("Pie chart");
const RefreshCw = createIcon("Refresh");
const Banknote = createIcon("Banknote");
const HardHat = createIcon("Hard hat");
const Plus = createIcon("Plus");
const Trash2 = createIcon("Trash");
const Phone = createIcon("Phone");
const Mail = createIcon("Mail");
const Globe = createIcon("Globe");
const MapPin = createIcon("Map pin");
const FileText = createIcon("File text");
const CalendarCheck = createIcon("Calendar check");
const Info = createIcon("Info");
const CheckCircle2 = createIcon("Check");
const AlertCircle = createIcon("Alert");
const Briefcase = createIcon("Briefcase");
const RotateCcw = createIcon("Rotate");
const ArrowUpDown = createIcon("Arrow up down");
const Shield = createIcon("Shield");
const Clock = createIcon("Clock");
const Zap = createIcon("Zap");
const Home = createIcon("Home");
const Store = createIcon("Store");
const Factory = createIcon("Factory");
const Wrench = createIcon("Wrench");
const Hammer = createIcon("Hammer");
const Layers = createIcon("Layers");

const ADVISOR = {
  name: "Chris Butler",
  titleLine1: "Mortgage Loan Originator",
  titleLine2: "Commercial Loan Advisor",
  personalNMLS: "1585236",
  corpNMLS: "181106",
  phone: "(206) 222-5650",
  phoneRaw: "2062225650",
  fax: "",
  email: "cbutler@barrettfinancial.com",
  websiteDisplay: "barrettfinancial.com",
  websiteUrl: "https://www.barrettfinancial.com",
  officeAddress1: "",
  officeAddress2: "",
  calendarUrl: "https://link.theradcrm.com/widget/booking/BAoGsdcWyItX8Cn7qGN2",
  headshot: null,
  callbackPromise: "Direct line — no call centers, no runarounds",
};

const ROUTING = {
  primaryEmail: ADVISOR.email,
  divisionCC: "commercial@barrettfinancial.com",
  scenarioFormUrl: "https://massifmortgageforms.fillout.com/t/sdDvnvf7SLus",
};

const BARRETT = {
  navy: '#152E63', navyDeep: '#0E1F42', navyHover: '#1F3F7A',
  gold: '#C59E5E', goldSoft: '#E8D5A8', goldDeep: '#A8854A',
  ink: '#0A1426', slate: '#475569', line: '#E2E8F0', surface: '#F8FAFC', white: '#FFFFFF',
  green: '#16A34A', amber: '#CA8A04', red: '#DC2626',
};

const FONT_STACK = "'Avenir Next', 'Avenir', 'Helvetica Neue', Helvetica, Arial, sans-serif";

const formatCurrency = (a) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(a || 0);
const formatCurrencyDetailed = (a) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(a || 0);
const formatPercent = (d) => (d || 0).toFixed(2) + '%';
const formatNumberWithCommas = (v) => {
  if (v === '' || v === null || v === undefined) return '';
  const num = parseFloat(v);
  if (isNaN(num)) return '';
  return num.toLocaleString('en-US');
};
const stripCommas = (v) => typeof v === 'string' ? v.replace(/,/g, '') : v;
const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

const Tooltip = ({ text }) => {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-block">
      <button type="button" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }} className="inline-flex" aria-label="More info">
        <Info className="w-3.5 h-3.5" style={{ color: BARRETT.slate }} />
      </button>
      {open && (
        <span className="absolute z-20 right-0 top-5 w-64 p-3 rounded-md shadow-lg text-xs font-normal normal-case"
          style={{ backgroundColor: BARRETT.navyDeep, color: BARRETT.white, fontFamily: FONT_STACK, letterSpacing: 'normal', lineHeight: '1.5' }}>
          {text}
        </span>
      )}
    </span>
  );
};

const InputField = ({ label, icon: Icon, value, onChange, placeholder, hint, readOnly, type = "currency", step = "0.01", tooltip }) => {
  const isCurrency = type === "currency";
  const displayValue = isCurrency ? formatNumberWithCommas(value) : value;
  const handleChange = (e) => {
    const raw = isCurrency ? stripCommas(e.target.value) : e.target.value;
    if (isCurrency && raw !== '' && isNaN(parseFloat(raw))) return;
    onChange(raw);
  };
  return (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
        <Icon className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
        <span className="flex-1">{label}</span>
        {tooltip && <Tooltip text={tooltip} />}
      </label>
      <input type={isCurrency ? "text" : type} step={isCurrency ? undefined : step} value={displayValue} onChange={handleChange}
        className={`w-full px-4 py-3 border rounded-md transition-all focus:outline-none focus:ring-2 ${readOnly ? 'cursor-not-allowed' : ''}`}
        style={{ borderColor: BARRETT.line, backgroundColor: readOnly ? BARRETT.surface : BARRETT.white, color: BARRETT.ink, fontFamily: FONT_STACK, fontSize: '15px' }}
        onFocus={(e) => !readOnly && (e.target.style.borderColor = BARRETT.navy)}
        onBlur={(e) => (e.target.style.borderColor = BARRETT.line)}
        placeholder={placeholder} readOnly={readOnly} inputMode={isCurrency ? "decimal" : "text"} />
      {hint && <p className="text-xs mt-1.5" style={{ color: BARRETT.slate }}>{hint}</p>}
    </div>
  );
};

const PaymentTypeField = ({ value, onChange }) => (
  <div>
    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
      <Calculator className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
      Payment Type
    </label>
    <div className="flex gap-2">
      {[{ id: 'io', label: 'Interest Only (I/O)' }, { id: 'pi', label: 'Fully Amortized (P&I)' }].map(opt => (
        <button key={opt.id} type="button" onClick={() => onChange(opt.id)}
          className="flex-1 px-4 py-3 rounded-md font-medium transition-all text-sm"
          style={{
            border: `2px solid ${value === opt.id ? BARRETT.navy : BARRETT.line}`,
            backgroundColor: value === opt.id ? BARRETT.navy : BARRETT.white,
            color: value === opt.id ? BARRETT.white : BARRETT.slate,
            fontFamily: FONT_STACK,
          }}>{opt.label}</button>
      ))}
    </div>
  </div>
);

const SectionHeading = ({ icon: Icon, children }) => (
  <h3 className="flex items-center gap-2.5 pb-3 mb-1 border-b" style={{ color: BARRETT.navy, borderColor: BARRETT.line, fontFamily: FONT_STACK }}>
    <Icon className="w-4 h-4" style={{ color: BARRETT.gold }} />
    <span className="text-sm font-bold uppercase tracking-wider" style={{ letterSpacing: '0.1em' }}>{children}</span>
  </h3>
);

const AdvisorAvatar = ({ size = 106 }) => {
  const ringSize = size + 6;
  return (
    <div className="shrink-0 relative">
      <div className="rounded-full" style={{
        width: `${ringSize}px`, height: `${ringSize}px`, padding: '3px',
        background: `linear-gradient(135deg, ${BARRETT.gold} 0%, #B08947 100%)`,
        boxShadow: '0 4px 12px rgba(21, 46, 99, 0.15)',
      }}>
        <div className="rounded-full overflow-hidden flex items-center justify-center" style={{
          width: `${size}px`, height: `${size}px`,
          backgroundColor: BARRETT.navy, border: `2px solid ${BARRETT.white}`,
        }}>
          {ADVISOR.headshot ? (
            <img src={ADVISOR.headshot} alt={ADVISOR.name} className="w-full h-full object-cover" />
          ) : (
            <span style={{ color: BARRETT.gold, fontFamily: FONT_STACK, fontSize: `${size * 0.38}px`, fontWeight: 700 }}>
              {getInitials(ADVISOR.name)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const DEFAULTS = {
  purchase: {
    occupancy: 'investment',
    purchasePrice: 1500000, downPayment: 375000, downPaymentMode: 'dollar', downPaymentPct: 25, loanAmount: 1125000,
    interestRate: 6.5, loanTerm: 10, amortization: 25, paymentType: 'pi', noi: 135000,
    noiSource: 't12', closingCostsPct: 2.5, reservesMonths: 6,
  },
  rateTerm: {
    propertyValue: 2000000, currentLoanBalance: 1200000, closingCosts: 20000,
    interestRate: 6.5, loanTerm: 10, amortization: 25, paymentType: 'pi', noi: 180000,
    noiSource: 't12',
  },
  cashOut: {
    propertyValue: 2500000, currentLoanBalance: 1000000, cashOutAmount: 400000, closingCosts: 25000,
    interestRate: 6.75, loanTerm: 10, amortization: 25, paymentType: 'pi', noi: 220000,
    noiSource: 't12', originalCashInvested: 600000,
  },
  development: {
    sponsorExperience: 'experienced',
    totalProjectCost: 5000000, equityInjection: 1500000, completedValue: 6500000,
    interestRate: 9.0, loanTerm: 24, amortization: 30, paymentType: 'io',
  },
  bridge: {
    asIsValue: 1500000, purchasePrice: 1300000, rehabBudget: 250000, stabilizedValue: 2200000,
    proFormaNOI: 200000, interestRate: 10.5, loanTerm: 18, paymentType: 'io', points: 1.5,
    occupancyAtClose: 60, targetStabilizedOccupancy: 95, exitStrategy: 'refinance',
    sponsorExperience: 'experienced',
  },
  maxLoan: {
    noi: 180000, targetDSCR: 1.25, targetLTV: 75, propertyValue: 2400000,
    interestRate: 6.5, amortization: 25, paymentType: 'pi',
  },
  sba: {
    program: '7a', businessStatus: 'existing', franchiseStatus: 'non-franchise',
    propertyType: 'standard', propertyUse: 'owner-occupied-re',
    projectCost: 1500000, equityInjection: 150000, workingCapital: 0,
    bankRate: 7.0, bankTermYears: 25, bankResetYears: 7,
    cdcRate: 6.0, cdcTermYears: 25,
    interestRate: 11.0, loanTerm: 25,
    isUSCitizenOwned: false, equityIsBorrowed: false, hasIndustryExperience: false,
    creditScore: 720, annualBusinessIncome: 180000, monthsLiquidity: 6,
  },
  draws: [
    { id: 1, month: 1, amount: 1100000 },
    { id: 2, month: 8, amount: 1200000 },
    { id: 3, month: 16, amount: 1200000 }
  ],
};

const PRESETS = {
  purchase: [
    { label: 'Multifamily 5+', icon: Home, values: { occupancy: 'investment', purchasePrice: 1500000, downPayment: 375000, loanAmount: 1125000, interestRate: 6.5, loanTerm: 10, amortization: 30, paymentType: 'pi', noi: 135000, noiSource: 't12', closingCostsPct: 2.5, reservesMonths: 6 } },
    { label: 'Office', icon: Briefcase, values: { occupancy: 'investment', purchasePrice: 3000000, downPayment: 900000, loanAmount: 2100000, interestRate: 7.25, loanTerm: 7, amortization: 25, paymentType: 'pi', noi: 270000, noiSource: 't12', closingCostsPct: 2.5, reservesMonths: 9 } },
    { label: 'Retail', icon: Store, values: { occupancy: 'investment', purchasePrice: 1800000, downPayment: 540000, loanAmount: 1260000, interestRate: 6.85, loanTerm: 10, amortization: 25, paymentType: 'pi', noi: 155000, noiSource: 't12', closingCostsPct: 2.5, reservesMonths: 6 } },
    { label: 'Industrial', icon: Factory, values: { occupancy: 'investment', purchasePrice: 4000000, downPayment: 1000000, loanAmount: 3000000, interestRate: 6.5, loanTerm: 10, amortization: 25, paymentType: 'pi', noi: 340000, noiSource: 't12', closingCostsPct: 2.5, reservesMonths: 6 } },
    { label: 'Owner-Occ Office', icon: Building, values: { occupancy: 'owner-occupied', purchasePrice: 1500000, downPayment: 150000, loanAmount: 1350000, interestRate: 6.75, loanTerm: 25, amortization: 25, paymentType: 'pi', noi: 0, noiSource: 't12', closingCostsPct: 3.0, reservesMonths: 6 } },
  ],
  rateTerm: [
    { label: 'Multifamily Refi', icon: Home, values: { propertyValue: 2000000, currentLoanBalance: 1200000, closingCosts: 20000, interestRate: 6.25, loanTerm: 10, amortization: 30, paymentType: 'pi', noi: 180000, noiSource: 't12' } },
    { label: 'Maturing CMBS', icon: RefreshCw, values: { propertyValue: 4500000, currentLoanBalance: 2800000, closingCosts: 45000, interestRate: 6.0, loanTerm: 10, amortization: 30, paymentType: 'pi', noi: 380000, noiSource: 't12' } },
    { label: 'Retail Refi', icon: Store, values: { propertyValue: 1800000, currentLoanBalance: 1100000, closingCosts: 18000, interestRate: 6.5, loanTerm: 10, amortization: 25, paymentType: 'pi', noi: 155000, noiSource: 't12' } },
  ],
  cashOut: [
    { label: 'Equity Pull', icon: Banknote, values: { propertyValue: 2500000, currentLoanBalance: 1000000, cashOutAmount: 400000, closingCosts: 25000, interestRate: 6.85, loanTerm: 10, amortization: 25, paymentType: 'pi', noi: 220000, noiSource: 't12', originalCashInvested: 600000 } },
    { label: 'Portfolio Recap', icon: TrendingUp, values: { propertyValue: 3500000, currentLoanBalance: 1400000, cashOutAmount: 600000, closingCosts: 32000, interestRate: 6.85, loanTerm: 10, amortization: 25, paymentType: 'pi', noi: 295000, noiSource: 't12', originalCashInvested: 800000 } },
  ],
  development: [
    { label: 'Ground-Up Multifamily', icon: Home, values: { sponsorExperience: 'experienced', totalProjectCost: 5000000, equityInjection: 1500000, completedValue: 6500000, interestRate: 8.75, loanTerm: 24, amortization: 30, paymentType: 'io' } },
    { label: 'Spec Multifamily', icon: Hammer, values: { sponsorExperience: 'experienced', totalProjectCost: 3000000, equityInjection: 1050000, completedValue: 4000000, interestRate: 9.5, loanTerm: 20, amortization: 30, paymentType: 'io' } },
    { label: 'Industrial Build', icon: Factory, values: { sponsorExperience: 'experienced', totalProjectCost: 4500000, equityInjection: 1350000, completedValue: 5800000, interestRate: 9.0, loanTerm: 18, amortization: 25, paymentType: 'io' } },
  ],
  bridge: [
    { label: 'Value-Add Multifamily', icon: Home, values: { asIsValue: 1500000, purchasePrice: 1300000, rehabBudget: 250000, stabilizedValue: 2200000, proFormaNOI: 200000, interestRate: 10.0, loanTerm: 18, paymentType: 'io', points: 1.5, occupancyAtClose: 60, targetStabilizedOccupancy: 95, exitStrategy: 'refinance', sponsorExperience: 'experienced' } },
    { label: 'Lease-Up Office', icon: Briefcase, values: { asIsValue: 3000000, purchasePrice: 2700000, rehabBudget: 200000, stabilizedValue: 3800000, proFormaNOI: 320000, interestRate: 10.75, loanTerm: 24, paymentType: 'io', points: 2.0, occupancyAtClose: 50, targetStabilizedOccupancy: 90, exitStrategy: 'refinance', sponsorExperience: 'experienced' } },
    { label: 'Reposition / Reno', icon: Wrench, values: { asIsValue: 1200000, purchasePrice: 1000000, rehabBudget: 400000, stabilizedValue: 1900000, proFormaNOI: 175000, interestRate: 11.0, loanTerm: 18, paymentType: 'io', points: 2.0, occupancyAtClose: 30, targetStabilizedOccupancy: 95, exitStrategy: 'refinance', sponsorExperience: 'experienced' } },
    { label: 'CMBS Maturity', icon: Clock, values: { asIsValue: 4500000, purchasePrice: 0, rehabBudget: 0, stabilizedValue: 5000000, proFormaNOI: 425000, interestRate: 9.5, loanTerm: 12, paymentType: 'io', points: 1.0, occupancyAtClose: 92, targetStabilizedOccupancy: 95, exitStrategy: 'refinance', sponsorExperience: 'experienced' } },
  ],
  sba: [
    { label: 'Owner-Occ RE 7(a)', icon: Building, values: { program: '7a', businessStatus: 'existing', franchiseStatus: 'non-franchise', propertyType: 'standard', propertyUse: 'owner-occupied-re', projectCost: 1500000, equityInjection: 150000, workingCapital: 0, bankRate: 7.0, bankTermYears: 25, bankResetYears: 7, cdcRate: 6.0, cdcTermYears: 25, interestRate: 11.0, loanTerm: 25, isUSCitizenOwned: true, equityIsBorrowed: false, hasIndustryExperience: true, creditScore: 720, annualBusinessIncome: 180000, monthsLiquidity: 6 } },
    { label: 'Business Acquisition', icon: Briefcase, values: { program: '7a', businessStatus: 'existing', franchiseStatus: 'non-franchise', propertyType: 'standard', propertyUse: 'business-acq', projectCost: 750000, equityInjection: 112500, workingCapital: 50000, bankRate: 7.0, bankTermYears: 10, bankResetYears: 7, cdcRate: 6.0, cdcTermYears: 25, interestRate: 11.5, loanTerm: 10, isUSCitizenOwned: true, equityIsBorrowed: false, hasIndustryExperience: true, creditScore: 700, annualBusinessIncome: 200000, monthsLiquidity: 6 } },
    { label: 'Franchise Startup', icon: Store, values: { program: '7a', businessStatus: 'startup', franchiseStatus: 'franchise', propertyType: 'standard', propertyUse: 'business-acq', projectCost: 800000, equityInjection: 80000, workingCapital: 75000, bankRate: 7.0, bankTermYears: 10, bankResetYears: 7, cdcRate: 6.0, cdcTermYears: 25, interestRate: 11.5, loanTerm: 10, isUSCitizenOwned: true, equityIsBorrowed: false, hasIndustryExperience: true, creditScore: 720, annualBusinessIncome: 0, monthsLiquidity: 8 } },
    { label: 'Manufacturing 504', icon: Factory, values: { program: '504', businessStatus: 'existing', franchiseStatus: 'non-franchise', propertyType: 'standard', propertyUse: 'owner-occupied-re', projectCost: 3000000, equityInjection: 300000, workingCapital: 0, bankRate: 6.75, bankTermYears: 25, bankResetYears: 10, cdcRate: 6.0, cdcTermYears: 25, interestRate: 11.0, loanTerm: 25, isUSCitizenOwned: true, equityIsBorrowed: false, hasIndustryExperience: true, creditScore: 720, annualBusinessIncome: 450000, monthsLiquidity: 6 } },
    { label: 'Hotel 504 (Special-Use)', icon: Building, values: { program: '504', businessStatus: 'existing', franchiseStatus: 'franchise', propertyType: 'special-use', propertyUse: 'owner-occupied-re', projectCost: 5000000, equityInjection: 750000, workingCapital: 0, bankRate: 7.25, bankTermYears: 25, bankResetYears: 10, cdcRate: 6.0, cdcTermYears: 25, interestRate: 11.5, loanTerm: 25, isUSCitizenOwned: true, equityIsBorrowed: false, hasIndustryExperience: true, creditScore: 740, annualBusinessIncome: 600000, monthsLiquidity: 9 } },
  ],
};

const estimateBrokerFee = (loanAmount) => {
  if (!loanAmount || loanAmount <= 0) return { fee: 0, rate: 0 };
  if (loanAmount < 1000000) return { fee: 12000, rate: (12000 / loanAmount) * 100 };
  if (loanAmount <= 5000000) return { fee: loanAmount * 0.0112, rate: 1.12 };
  if (loanAmount <= 10000000) return { fee: loanAmount * 0.01, rate: 1.0 };
  if (loanAmount <= 15000000) return { fee: loanAmount * 0.0075, rate: 0.75 };
  return { fee: loanAmount * 0.005, rate: 0.5 };
};

const generateMikesTake = (results, activeTab, context = {}, advisorFirstName = 'your advisor') => {
  const insights = [];
  if (!results || results.loanAmount <= 0) return insights;

  const isStabilized = activeTab === 'purchase' || activeTab === 'rateTerm' || activeTab === 'cashOut';
  const isTransitional = activeTab === 'bridge' || activeTab === 'development';

  if (isStabilized && results.dscr > 0) {
    if (results.dscr >= 1.45) insights.push({ tone: 'positive', text: `DSCR at ${results.dscr.toFixed(2)}x is strong — comfortable margin if rates move against you, opens up best lender pricing.` });
    else if (results.dscr >= 1.30) insights.push({ tone: 'positive', text: `DSCR at ${results.dscr.toFixed(2)}x is solid for most lenders. Good positioning across bank, CMBS, and agency channels.` });
    else if (results.dscr >= 1.25) insights.push({ tone: 'neutral', text: `DSCR at ${results.dscr.toFixed(2)}x clears the standard 1.25x lender floor. Workable, but tighter scenarios get more scrutiny.` });
    else if (results.dscr >= 1.20) insights.push({ tone: 'neutral', text: `DSCR at ${results.dscr.toFixed(2)}x is at the edge. Some bank/agency lenders will work with this; CMBS will not.` });
    else if (results.dscr >= 1.01) insights.push({ tone: 'concern', text: `DSCR at ${results.dscr.toFixed(2)}x is below the 1.25x threshold most lenders want. We'd need to restructure or shop creative lenders.` });
    else insights.push({ tone: 'concern', text: `DSCR below 1.0 means NOI doesn't cover debt service. We'd need bigger down, lower rate, or longer amortization to make this work.` });
  }

  if (results.ltv > 0) {
    const isSBA = activeTab === 'sba';
    const isAgency = context.amortization && context.amortization >= 30;
    if (isSBA) {
      if (results.ltv <= 90) insights.push({ tone: 'positive', text: `${results.ltv.toFixed(0)}% LTV is normal for SBA — these programs are designed for higher leverage.` });
      else insights.push({ tone: 'concern', text: `${results.ltv.toFixed(0)}% LTV exceeds typical SBA limits. Need to verify equity injection.` });
    } else if (results.ltv <= 65) insights.push({ tone: 'positive', text: `${results.ltv.toFixed(0)}% LTV is conservative — strong lender appetite, often gets best pricing.` });
    else if (results.ltv <= 75) insights.push({ tone: 'positive', text: `${results.ltv.toFixed(0)}% LTV is mainstream territory for stabilized CRE. Most lenders fit here.` });
    else if (results.ltv <= 80 && isAgency) insights.push({ tone: 'positive', text: `${results.ltv.toFixed(0)}% LTV is fine for agency (Fannie/Freddie) on multifamily — they go up to 80%.` });
    else if (results.ltv <= 80) insights.push({ tone: 'neutral', text: `${results.ltv.toFixed(0)}% LTV is on the high side for non-multifamily. Some lenders cap at 75%; we'd shop multiple to find the right fit.` });
    else if (results.ltv <= 85) insights.push({ tone: 'concern', text: `${results.ltv.toFixed(0)}% LTV is aggressive. Limited lender pool — bridge or specialty territory; expect higher rates.` });
    else insights.push({ tone: 'concern', text: `${results.ltv.toFixed(0)}% LTV is very aggressive. May require seller carry, mezz debt, or restructure.` });
  }

  if (activeTab === 'purchase' && results.capRate > 0 && context.occupancy !== 'owner-occupied') {
    if (results.capRate >= 8) insights.push({ tone: 'positive', text: `${results.capRate.toFixed(2)}% cap rate is strong — pricing makes sense for the cash flow.` });
    else if (results.capRate >= 6) insights.push({ tone: 'neutral', text: `${results.capRate.toFixed(2)}% cap rate is reasonable for current market — depends on the asset class and location.` });
    else if (results.capRate > 0) insights.push({ tone: 'neutral', text: `${results.capRate.toFixed(2)}% cap rate is tight — this is an appreciation play more than a cash flow play.` });
  }

  if (results.cashOnCash > 0) {
    if (results.cashOnCash >= 12) insights.push({ tone: 'positive', text: `Cash-on-cash at ${results.cashOnCash.toFixed(2)}% is excellent for this rate environment.` });
    else if (results.cashOnCash >= 8) insights.push({ tone: 'positive', text: `Cash-on-cash at ${results.cashOnCash.toFixed(2)}% is solid — money working harder than most alternatives.` });
    else if (results.cashOnCash >= 4) insights.push({ tone: 'neutral', text: `Cash-on-cash at ${results.cashOnCash.toFixed(2)}% is moderate — lean on appreciation and tax benefits.` });
  } else if (results.cashOnCash < 0 && isStabilized) {
    insights.push({ tone: 'concern', text: `Cash-on-cash is negative — the deal is underwater on cash flow. Need either higher NOI, lower price, or different structure.` });
  }

  if (isStabilized && context.noiSource === 'proforma') {
    insights.push({ tone: 'concern', text: `Heads up: pro forma NOI on a stabilized purchase/refi. Lenders underwrite to T-12 trailing actuals. Pro forma is recognized for new construction or value-add bridge — not perm financing on stabilized deals.` });
  }

  if (results.balloonPayment > 0 && results.balloonPayment > results.loanAmount * 0.5) {
    insights.push({ tone: 'neutral', text: `Heads up: balloon of ${formatCurrency(results.balloonPayment)} at maturity. Plan refi/exit before year ${activeTab === 'development' || activeTab === 'bridge' ? '2' : '10'}.` });
  }

  if (isTransitional && results.ltc > 0) {
    if (activeTab === 'development') {
      if (results.ltc <= 70) insights.push({ tone: 'positive', text: `${results.ltc.toFixed(0)}% LTC is conservative for ground-up — lenders love seeing 30%+ skin in the game.` });
      else if (results.ltc <= 75) insights.push({ tone: 'positive', text: `${results.ltc.toFixed(0)}% LTC is mainstream for ground-up construction.` });
      else if (results.ltc <= 80) insights.push({ tone: 'neutral', text: `${results.ltc.toFixed(0)}% LTC is the upper end — most ground-up lenders want 25–30% equity. Fewer options at this leverage.` });
      else insights.push({ tone: 'concern', text: `${results.ltc.toFixed(0)}% LTC is aggressive for ground-up. Most construction lenders cap at 75–80% LTC.` });
    } else if (activeTab === 'bridge') {
      if (results.ltc <= 75) insights.push({ tone: 'positive', text: `${results.ltc.toFixed(0)}% LTC is solid for bridge — bridge lenders typically max at 75–80% LTC including rehab.` });
      else if (results.ltc <= 80) insights.push({ tone: 'neutral', text: `${results.ltc.toFixed(0)}% LTC is at the bridge ceiling. Workable but limits lender pool.` });
      else insights.push({ tone: 'concern', text: `${results.ltc.toFixed(0)}% LTC exceeds typical bridge limits. Need stronger sponsor or lower-leverage structure.` });
    }
  }

  if (activeTab === 'bridge' && context.stabilizedLTV > 0) {
    if (context.stabilizedLTV <= 65) insights.push({ tone: 'positive', text: `${context.stabilizedLTV.toFixed(0)}% LTV at stabilized value is conservative — clean refi exit picture.` });
    else if (context.stabilizedLTV <= 70) insights.push({ tone: 'neutral', text: `${context.stabilizedLTV.toFixed(0)}% LTV at stabilized value is workable for refi exit, but tight.` });
    else insights.push({ tone: 'concern', text: `${context.stabilizedLTV.toFixed(0)}% LTV at stabilized value is high — refi exit may not pay off the bridge in full.` });
  }

  if (activeTab === 'development' && context.sponsorExperience) {
    if (context.sponsorExperience === 'first-time') {
      insights.push({ tone: 'concern', text: `First-time developer flagged — open tryouts for ground-up construction ended in 2019. Lenders want verified completed projects within 3–5 years. May need experienced co-sponsor or fee developer.` });
    } else if (context.sponsorExperience === 'limited') {
      insights.push({ tone: 'neutral', text: `Limited construction track record — workable with a strong GC and clear exit, but expect more scrutiny.` });
    }
  }

  if (activeTab === 'bridge' && context.loanTerm) {
    const months = parseInt(context.loanTerm) || 18;
    if (months > 24) insights.push({ tone: 'neutral', text: `${months}-month bridge term is on the long side. Most bridge lenders cap at 24–36 months; longer terms come with extension fees.` });
  }

  const allPositive = insights.length > 0 && insights.every(i => i.tone === 'positive');
  if (allPositive) {
    insights.push({ tone: 'positive', text: `Numbers tell a clean story. Worth a real conversation with ${advisorFirstName} on lender placement.` });
  }

  return insights;
};

const CommercialRealEstateCalculator = () => {
  const [activeTab, setActiveTab] = useState('purchase');
  const [purchaseMode, setPurchaseMode] = useState('payment');

  const [purchaseInputs, setPurchaseInputs] = useState(DEFAULTS.purchase);
  const [rateTermInputs, setRateTermInputs] = useState(DEFAULTS.rateTerm);
  const [cashOutInputs, setCashOutInputs] = useState(DEFAULTS.cashOut);
  const [developmentInputs, setDevelopmentInputs] = useState(DEFAULTS.development);
  const [bridgeInputs, setBridgeInputs] = useState(DEFAULTS.bridge);
  const [maxLoanInputs, setMaxLoanInputs] = useState(DEFAULTS.maxLoan);
  const [sbaInputs, setSbaInputs] = useState(DEFAULTS.sba);

  const [draws, setDraws] = useState(DEFAULTS.draws);
  const [newDraw, setNewDraw] = useState({ month: '', amount: '' });

  const [results, setResults] = useState({
    loanAmount: 0, monthlyPayment: 0, interestOnlyPayment: 0, balloonPayment: 0,
    ltv: 0, ltc: 0, dscr: 0, annualDebtService: 0, capRate: 0, debtYield: 0, cashOnCash: 0,
    isInterestOnly: false, stabilizedLTV: 0, brokerFee: 0, brokerFeeRate: 0,
  });
  const [maxLoanResults, setMaxLoanResults] = useState({
    maxByDSCR: 0, maxByLTV: 0, qualifyingLoan: 0, monthlyPayment: 0, capRate: 0, governingConstraint: '',
  });

  const [sba504Results, setSba504Results] = useState({
    bankAmount: 0, cdcAmount: 0, equityAmount: 0,
    bankPayment: 0, cdcPayment: 0, blendedPayment: 0,
    bankAnnual: 0, cdcAnnual: 0, blendedAnnual: 0,
    requiredEquityPct: 10, requiredEquityAmount: 0,
  });

  const [drawSchedule, setDrawSchedule] = useState([]);
  const [totalInterestReserve, setTotalInterestReserve] = useState(0);
  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showDrawSchedule, setShowDrawSchedule] = useState(false);

  const addDraw = () => {
    if (newDraw.month && newDraw.amount) {
      const monthNum = parseInt(newDraw.month);
      const loanTerm = parseInt(developmentInputs.loanTerm);
      if (monthNum >= 1 && monthNum <= loanTerm) {
        setDraws(prev => [...prev, { id: Date.now(), month: monthNum, amount: parseFloat(newDraw.amount) }].sort((a, b) => a.month - b.month));
        setNewDraw({ month: '', amount: '' });
      }
    }
  };
  const removeDraw = (id) => setDraws(prev => prev.filter(d => d.id !== id));

  const calculateDrawSchedule = () => {
    const loanTermMonths = parseInt(developmentInputs.loanTerm) || 0;
    const monthlyRate = (parseFloat(developmentInputs.interestRate) / 100) / 12;
    let schedule = []; let cumulativeBalance = 0; let totalInterest = 0;
    for (let month = 1; month <= loanTermMonths; month++) {
      const drawThisMonth = draws.filter(d => d.month === month).reduce((sum, d) => sum + d.amount, 0);
      cumulativeBalance += drawThisMonth;
      const monthlyInterest = cumulativeBalance * monthlyRate;
      totalInterest += monthlyInterest;
      schedule.push({ month, draw: drawThisMonth, cumulativeBalance, monthlyInterest, cumulativeInterest: totalInterest });
    }
    setDrawSchedule(schedule);
    setTotalInterestReserve(totalInterest);
  };

  const calculatePaymentForLoan = (principal, annualRate, amortMonths) => {
    if (!principal || !annualRate || !amortMonths) return 0;
    const monthlyRate = annualRate / 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, amortMonths)) / (Math.pow(1 + monthlyRate, amortMonths) - 1);
  };

  const calculateSBA504 = () => {
    const projectCost = parseFloat(sbaInputs.projectCost) || 0;
    const propertyType = sbaInputs.propertyType;
    const businessStatus = sbaInputs.businessStatus;
    let requiredEquityPct = 10;
    if (propertyType === 'special-use' && businessStatus === 'startup') requiredEquityPct = 20;
    else if (propertyType === 'special-use' || businessStatus === 'startup') requiredEquityPct = 15;
    const requiredEquityAmount = projectCost * (requiredEquityPct / 100);
    const equityAmount = parseFloat(sbaInputs.equityInjection) || 0;
    const cdcAmount = projectCost * 0.4;
    const bankAmount = projectCost - cdcAmount - equityAmount;
    const bankRate = (parseFloat(sbaInputs.bankRate) || 0) / 100;
    const bankAmortMonths = (parseFloat(sbaInputs.bankTermYears) || 0) * 12;
    const cdcRate = (parseFloat(sbaInputs.cdcRate) || 0) / 100;
    const cdcAmortMonths = (parseFloat(sbaInputs.cdcTermYears) || 0) * 12;
    const bankPayment = calculatePaymentForLoan(bankAmount, bankRate, bankAmortMonths);
    const cdcPayment = calculatePaymentForLoan(cdcAmount, cdcRate, cdcAmortMonths);
    const blendedPayment = bankPayment + cdcPayment;
    const bankAnnual = bankPayment * 12;
    const cdcAnnual = cdcPayment * 12;
    const blendedAnnualSum = bankAnnual + cdcAnnual;
    setSba504Results({
      bankAmount, cdcAmount, equityAmount,
      bankPayment, cdcPayment, blendedPayment,
      bankAnnual, cdcAnnual, blendedAnnual: blendedAnnualSum,
      requiredEquityPct, requiredEquityAmount,
    });
    return {
      principal: bankAmount + cdcAmount,
      annualDebtService: blendedAnnualSum,
      monthlyPayment: blendedPayment,
      blendedRate: ((bankAnnual + cdcAnnual) / (bankAmount + cdcAmount)) * 100 || 0,
    };
  };

  const calculateMaxLoan = () => {
    const noi = parseFloat(maxLoanInputs.noi) || 0;
    const targetDSCR = parseFloat(maxLoanInputs.targetDSCR) || 1.25;
    const targetLTV = parseFloat(maxLoanInputs.targetLTV) || 75;
    const propertyValue = parseFloat(maxLoanInputs.propertyValue) || 0;
    const annualRate = (parseFloat(maxLoanInputs.interestRate) || 0) / 100;
    const amortMonths = (parseFloat(maxLoanInputs.amortization) || 0) * 12;
    const paymentType = maxLoanInputs.paymentType;
    if (!noi || !annualRate) {
      setMaxLoanResults({ maxByDSCR: 0, maxByLTV: 0, qualifyingLoan: 0, monthlyPayment: 0, capRate: 0, governingConstraint: '' });
      return;
    }
    const maxAnnualDebtService = noi / targetDSCR;
    const maxMonthlyPayment = maxAnnualDebtService / 12;
    const monthlyRate = annualRate / 12;
    let maxByDSCR;
    if (paymentType === 'io') {
      maxByDSCR = monthlyRate > 0 ? maxMonthlyPayment / monthlyRate : 0;
    } else {
      if (amortMonths > 0 && monthlyRate > 0) {
        const factor = (monthlyRate * Math.pow(1 + monthlyRate, amortMonths)) / (Math.pow(1 + monthlyRate, amortMonths) - 1);
        maxByDSCR = maxMonthlyPayment / factor;
      } else { maxByDSCR = 0; }
    }
    const maxByLTV = propertyValue * (targetLTV / 100);
    const qualifyingLoan = Math.min(maxByDSCR, maxByLTV);
    const governingConstraint = maxByDSCR <= maxByLTV ? 'DSCR' : 'LTV';
    let monthlyPayment;
    if (paymentType === 'io') monthlyPayment = qualifyingLoan * monthlyRate;
    else monthlyPayment = calculatePaymentForLoan(qualifyingLoan, annualRate, amortMonths);
    const capRate = noi > 0 && propertyValue > 0 ? (noi / propertyValue) * 100 : 0;
    setMaxLoanResults({ maxByDSCR, maxByLTV, qualifyingLoan, monthlyPayment, capRate, governingConstraint });
  };

  const calculateMortgage = () => {
    let principal, propertyValue, annualRate, loanTermMonths, amortizationMonths, noi, ltc = 0, paymentType;
    let totalCashInvested = 0;
    let stabilizedLTV = 0;

    if (activeTab === 'purchase') {
      if (purchaseMode === 'maxLoan') { calculateMaxLoan(); return; }
      principal = parseFloat(purchaseInputs.loanAmount);
      propertyValue = parseFloat(purchaseInputs.purchasePrice);
      annualRate = parseFloat(purchaseInputs.interestRate) / 100;
      loanTermMonths = parseFloat(purchaseInputs.loanTerm) * 12;
      amortizationMonths = parseFloat(purchaseInputs.amortization) * 12;
      noi = parseFloat(purchaseInputs.noi) || 0;
      paymentType = purchaseInputs.paymentType;
      const closingCosts = (parseFloat(purchaseInputs.purchasePrice) || 0) * (parseFloat(purchaseInputs.closingCostsPct) / 100 || 0);
      const monthlyEstimate = principal && annualRate && amortizationMonths ? calculatePaymentForLoan(principal, annualRate, amortizationMonths) : 0;
      const reservesEstimate = monthlyEstimate * (parseFloat(purchaseInputs.reservesMonths) || 0);
      totalCashInvested = (parseFloat(purchaseInputs.downPayment) || 0) + closingCosts + reservesEstimate;
    } else if (activeTab === 'rateTerm') {
      const currentBalance = parseFloat(rateTermInputs.currentLoanBalance) || 0;
      const closingCosts = parseFloat(rateTermInputs.closingCosts) || 0;
      principal = currentBalance + closingCosts;
      propertyValue = parseFloat(rateTermInputs.propertyValue);
      annualRate = parseFloat(rateTermInputs.interestRate) / 100;
      loanTermMonths = parseFloat(rateTermInputs.loanTerm) * 12;
      amortizationMonths = parseFloat(rateTermInputs.amortization) * 12;
      noi = parseFloat(rateTermInputs.noi) || 0;
      paymentType = rateTermInputs.paymentType;
      totalCashInvested = Math.max(0, propertyValue - principal);
    } else if (activeTab === 'cashOut') {
      const currentBalance = parseFloat(cashOutInputs.currentLoanBalance) || 0;
      const cashOut = parseFloat(cashOutInputs.cashOutAmount) || 0;
      const closingCosts = parseFloat(cashOutInputs.closingCosts) || 0;
      principal = currentBalance + cashOut + closingCosts;
      propertyValue = parseFloat(cashOutInputs.propertyValue);
      annualRate = parseFloat(cashOutInputs.interestRate) / 100;
      loanTermMonths = parseFloat(cashOutInputs.loanTerm) * 12;
      amortizationMonths = parseFloat(cashOutInputs.amortization) * 12;
      noi = parseFloat(cashOutInputs.noi) || 0;
      paymentType = cashOutInputs.paymentType;
      const originalCash = parseFloat(cashOutInputs.originalCashInvested) || 0;
      totalCashInvested = Math.max(1, originalCash - cashOut);
    } else if (activeTab === 'development') {
      const totalCost = parseFloat(developmentInputs.totalProjectCost) || 0;
      const equity = parseFloat(developmentInputs.equityInjection) || 0;
      principal = totalCost - equity;
      propertyValue = parseFloat(developmentInputs.completedValue);
      annualRate = parseFloat(developmentInputs.interestRate) / 100;
      loanTermMonths = parseFloat(developmentInputs.loanTerm);
      amortizationMonths = parseFloat(developmentInputs.amortization) * 12;
      noi = 0;
      ltc = totalCost > 0 ? (principal / totalCost) * 100 : 0;
      paymentType = developmentInputs.paymentType;
      totalCashInvested = equity;
      calculateDrawSchedule();
    } else if (activeTab === 'bridge') {
      const purchase = parseFloat(bridgeInputs.purchasePrice) || 0;
      const asIs = parseFloat(bridgeInputs.asIsValue) || 0;
      const rehab = parseFloat(bridgeInputs.rehabBudget) || 0;
      const stabilized = parseFloat(bridgeInputs.stabilizedValue) || 0;
      const isAcquisition = purchase > 0;
      const baseValue = isAcquisition ? purchase : asIs;
      const totalCost = baseValue + rehab;
      principal = totalCost * 0.75;
      propertyValue = stabilized;
      annualRate = parseFloat(bridgeInputs.interestRate) / 100;
      loanTermMonths = parseFloat(bridgeInputs.loanTerm);
      amortizationMonths = 0;
      noi = parseFloat(bridgeInputs.proFormaNOI) || 0;
      ltc = totalCost > 0 ? (principal / totalCost) * 100 : 0;
      stabilizedLTV = stabilized > 0 ? (principal / stabilized) * 100 : 0;
      paymentType = 'io';
      totalCashInvested = totalCost - principal;
    } else if (activeTab === 'sba') {
      if (sbaInputs.program === '504') {
        const result = calculateSBA504();
        principal = result.principal;
        propertyValue = parseFloat(sbaInputs.projectCost) || 0;
        annualRate = result.blendedRate / 100;
        loanTermMonths = (parseFloat(sbaInputs.cdcTermYears) || 25) * 12;
        amortizationMonths = loanTermMonths;
        noi = parseFloat(sbaInputs.annualBusinessIncome) || 0;
        paymentType = 'pi';
        totalCashInvested = parseFloat(sbaInputs.equityInjection) || 0;
        ltc = propertyValue > 0 ? (principal / propertyValue) * 100 : 0;
        const ltv = (principal / propertyValue) * 100;
        const dscr = noi > 0 ? noi / result.annualDebtService : 0;
        const debtYield = principal > 0 && noi > 0 ? (noi / principal) * 100 : 0;
        const annualCashFlow = noi - result.annualDebtService;
        const cashOnCash = totalCashInvested > 0 && noi > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
        const brokerFee = estimateBrokerFee(principal);
        setResults({
          loanAmount: principal,
          monthlyPayment: result.monthlyPayment,
          interestOnlyPayment: 0, balloonPayment: 0,
          ltv, ltc, dscr, annualDebtService: result.annualDebtService,
          capRate: 0, debtYield, cashOnCash,
          isInterestOnly: false, stabilizedLTV: 0, brokerFee: brokerFee.fee, brokerFeeRate: brokerFee.rate,
        });
        setAmortizationSchedule([]);
        return;
      } else {
        const projectCost = parseFloat(sbaInputs.projectCost) || 0;
        const equity = parseFloat(sbaInputs.equityInjection) || 0;
        const workingCap = parseFloat(sbaInputs.workingCapital) || 0;
        principal = projectCost - equity + workingCap;
        propertyValue = projectCost;
        annualRate = parseFloat(sbaInputs.interestRate) / 100;
        loanTermMonths = parseFloat(sbaInputs.loanTerm) * 12;
        amortizationMonths = parseFloat(sbaInputs.loanTerm) * 12;
        noi = parseFloat(sbaInputs.annualBusinessIncome) || 0;
        paymentType = 'pi';
        totalCashInvested = equity;
        ltc = projectCost > 0 ? (principal / projectCost) * 100 : 0;
      }
    }

    const monthlyRate = annualRate / 12;
    const isInterestOnly = paymentType === 'io';
    if (!principal || !annualRate || !loanTermMonths || !propertyValue) return;

    const ltv = (principal / propertyValue) * 100;
    const capRate = noi > 0 && propertyValue > 0 ? (noi / propertyValue) * 100 : 0;
    const interestOnlyPayment = principal * monthlyRate;

    let monthlyPayment, balloonPayment, annualDebtService;
    if (isInterestOnly) {
      monthlyPayment = interestOnlyPayment;
      balloonPayment = principal;
      annualDebtService = monthlyPayment * 12;
    } else {
      monthlyPayment = calculatePaymentForLoan(principal, annualRate, amortizationMonths);
      annualDebtService = monthlyPayment * 12;
      let balance = principal;
      for (let month = 1; month <= loanTermMonths; month++) {
        const interestPayment = balance * monthlyRate;
        const principalPayment = monthlyPayment - interestPayment;
        balance -= principalPayment;
      }
      balloonPayment = Math.max(0, balance);
    }

    const dscr = noi > 0 ? noi / annualDebtService : 0;
    const debtYield = principal > 0 && noi > 0 ? (noi / principal) * 100 : 0;
    const annualCashFlow = noi - annualDebtService;
    const cashOnCash = totalCashInvested > 0 && noi > 0 ? (annualCashFlow / totalCashInvested) * 100 : 0;
    const brokerFee = estimateBrokerFee(principal);

    const schedule = [];
    let balance = principal;
    for (let month = 1; month <= loanTermMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = isInterestOnly ? 0 : monthlyPayment - interestPayment;
      balance -= principalPayment;
      if (month <= 12 || month % 12 === 0 || month === loanTermMonths) {
        schedule.push({ month, payment: monthlyPayment, principal: principalPayment, interest: interestPayment, balance: Math.max(0, balance) });
      }
    }
    setResults({
      loanAmount: principal, monthlyPayment, interestOnlyPayment, balloonPayment,
      ltv, ltc, dscr, annualDebtService, capRate, debtYield, cashOnCash, isInterestOnly,
      stabilizedLTV, brokerFee: brokerFee.fee, brokerFeeRate: brokerFee.rate,
    });
    setAmortizationSchedule(schedule);
  };

  useEffect(() => {
    calculateMortgage();
    setShowSchedule(false);
    setShowDrawSchedule(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, purchaseMode, purchaseInputs, rateTermInputs, cashOutInputs, developmentInputs, bridgeInputs, maxLoanInputs, sbaInputs, draws]);

  const handlePurchaseChange = (field, value) => {
    setPurchaseInputs(prev => {
      const newInputs = { ...prev, [field]: value };
      const mode = field === 'downPaymentMode' ? value : prev.downPaymentMode;
      const purchasePrice = parseFloat(field === 'purchasePrice' ? value : prev.purchasePrice) || 0;

      // When user types in $ mode and changes downPayment: also update the % so the toggle shows the right value if they switch
      if (field === 'downPayment') {
        const dp = parseFloat(value) || 0;
        newInputs.downPaymentPct = purchasePrice > 0 ? parseFloat(((dp / purchasePrice) * 100).toFixed(2)) : prev.downPaymentPct;
      }

      // When user types in % mode and changes downPaymentPct: recalculate the dollar amount
      if (field === 'downPaymentPct') {
        const pct = parseFloat(value) || 0;
        newInputs.downPayment = Math.round(purchasePrice * (pct / 100));
      }

      // When purchase price changes: keep whichever mode is active as the source of truth
      if (field === 'purchasePrice') {
        if (mode === 'percent') {
          // Recalculate $ from %
          const pct = parseFloat(prev.downPaymentPct) || 0;
          newInputs.downPayment = Math.round(purchasePrice * (pct / 100));
        } else {
          // Recalculate % from $ (so the % stays accurate if they toggle)
          const dp = parseFloat(prev.downPayment) || 0;
          newInputs.downPaymentPct = purchasePrice > 0 ? parseFloat(((dp / purchasePrice) * 100).toFixed(2)) : prev.downPaymentPct;
        }
      }

      // When toggling modes: sync the other field so the displayed value is correct
      if (field === 'downPaymentMode') {
        if (value === 'percent') {
          // Switching to %: recalculate % from current $ amount
          const dp = parseFloat(prev.downPayment) || 0;
          newInputs.downPaymentPct = purchasePrice > 0 ? parseFloat(((dp / purchasePrice) * 100).toFixed(2)) : prev.downPaymentPct;
        } else {
          // Switching to $: recalculate $ from current %
          const pct = parseFloat(prev.downPaymentPct) || 0;
          newInputs.downPayment = Math.round(purchasePrice * (pct / 100));
        }
      }

      // Always recalculate loan amount from the latest down payment
      const downPayment = parseFloat(newInputs.downPayment) || 0;
      newInputs.loanAmount = Math.max(0, purchasePrice - downPayment);

      return newInputs;
    });
  };

  const resetCurrentTab = () => {
    if (activeTab === 'purchase') setPurchaseInputs(DEFAULTS.purchase);
    if (activeTab === 'rateTerm') setRateTermInputs(DEFAULTS.rateTerm);
    if (activeTab === 'cashOut') setCashOutInputs(DEFAULTS.cashOut);
    if (activeTab === 'development') { setDevelopmentInputs(DEFAULTS.development); setDraws(DEFAULTS.draws); }
    if (activeTab === 'bridge') setBridgeInputs(DEFAULTS.bridge);
    if (activeTab === 'sba') setSbaInputs(DEFAULTS.sba);
    if (purchaseMode === 'maxLoan') setMaxLoanInputs(DEFAULTS.maxLoan);
  };

  const buildScenarioSummary = () => {
    const tab = activeTab === 'purchase' ? (purchaseMode === 'maxLoan' ? 'Max Loan Analysis' : `Purchase (${purchaseInputs.occupancy === 'owner-occupied' ? 'Owner-Occupied' : 'Investment'})`)
      : activeTab === 'rateTerm' ? 'Rate & Term Refinance'
      : activeTab === 'cashOut' ? 'Cash-Out Refinance'
      : activeTab === 'development' ? 'Development / Construction'
      : activeTab === 'bridge' ? 'Bridge Loan'
      : activeTab === 'sba' ? `SBA ${sbaInputs.program === '7a' ? '7(a)' : '504'} (${sbaInputs.businessStatus})` : 'Scenario';
    const lines = [`SCENARIO TYPE: ${tab}`, ''];

    if (activeTab === 'purchase' && purchaseMode === 'payment') {
      lines.push(`Property Use: ${purchaseInputs.occupancy === 'owner-occupied' ? 'Owner-Occupied' : 'Investment'}`);
      lines.push(`Purchase Price: ${formatCurrency(purchaseInputs.purchasePrice)}`);
      lines.push(`Down Payment: ${formatCurrency(purchaseInputs.downPayment)}`);
      lines.push(`Loan Amount: ${formatCurrency(purchaseInputs.loanAmount)}`);
      lines.push(`Interest Rate: ${purchaseInputs.interestRate}%`);
      lines.push(`Loan Term: ${purchaseInputs.loanTerm} years`);
      lines.push(`Amortization: ${purchaseInputs.amortization} years`);
      if (purchaseInputs.occupancy !== 'owner-occupied') lines.push(`NOI: ${formatCurrency(purchaseInputs.noi)} (${purchaseInputs.noiSource === 'proforma' ? 'Pro Forma' : 'T-12 Actual'})`);
    } else if (activeTab === 'purchase' && purchaseMode === 'maxLoan') {
      lines.push(`NOI: ${formatCurrency(maxLoanInputs.noi)}`);
      lines.push(`Target DSCR: ${maxLoanInputs.targetDSCR}x`);
      lines.push(`Target LTV: ${maxLoanInputs.targetLTV}%`);
      lines.push(`Property Value: ${formatCurrency(maxLoanInputs.propertyValue)}`);
      lines.push(`Interest Rate: ${maxLoanInputs.interestRate}%`);
    } else if (activeTab === 'rateTerm') {
      lines.push(`Property Value: ${formatCurrency(rateTermInputs.propertyValue)}`);
      lines.push(`Current Loan Balance: ${formatCurrency(rateTermInputs.currentLoanBalance)}`);
      lines.push(`Closing Costs: ${formatCurrency(rateTermInputs.closingCosts)}`);
      lines.push(`Interest Rate: ${rateTermInputs.interestRate}%`);
      lines.push(`NOI: ${formatCurrency(rateTermInputs.noi)} (${rateTermInputs.noiSource === 'proforma' ? 'Pro Forma' : 'T-12 Actual'})`);
    } else if (activeTab === 'cashOut') {
      lines.push(`Property Value: ${formatCurrency(cashOutInputs.propertyValue)}`);
      lines.push(`Current Loan Balance: ${formatCurrency(cashOutInputs.currentLoanBalance)}`);
      lines.push(`Cash Out Amount: ${formatCurrency(cashOutInputs.cashOutAmount)}`);
      lines.push(`Closing Costs: ${formatCurrency(cashOutInputs.closingCosts)}`);
      lines.push(`Interest Rate: ${cashOutInputs.interestRate}%`);
      lines.push(`NOI: ${formatCurrency(cashOutInputs.noi)} (${cashOutInputs.noiSource === 'proforma' ? 'Pro Forma' : 'T-12 Actual'})`);
    } else if (activeTab === 'development') {
      lines.push(`Sponsor Experience: ${developmentInputs.sponsorExperience}`);
      lines.push(`Total Project Cost: ${formatCurrency(developmentInputs.totalProjectCost)}`);
      lines.push(`Equity Injection: ${formatCurrency(developmentInputs.equityInjection)}`);
      lines.push(`Completed Value: ${formatCurrency(developmentInputs.completedValue)}`);
      lines.push(`Interest Rate: ${developmentInputs.interestRate}%`);
      lines.push(`Loan Term: ${developmentInputs.loanTerm} months`);
    } else if (activeTab === 'bridge') {
      lines.push(`As-Is Value: ${formatCurrency(bridgeInputs.asIsValue)}`);
      if (bridgeInputs.purchasePrice > 0) lines.push(`Purchase Price: ${formatCurrency(bridgeInputs.purchasePrice)}`);
      lines.push(`Rehab Budget: ${formatCurrency(bridgeInputs.rehabBudget)}`);
      lines.push(`Stabilized Value: ${formatCurrency(bridgeInputs.stabilizedValue)}`);
      lines.push(`Pro Forma NOI: ${formatCurrency(bridgeInputs.proFormaNOI)}`);
      lines.push(`Interest Rate: ${bridgeInputs.interestRate}%`);
      lines.push(`Loan Term: ${bridgeInputs.loanTerm} months`);
      lines.push(`Origination Points: ${bridgeInputs.points}%`);
      lines.push(`Exit Strategy: ${bridgeInputs.exitStrategy}`);
      lines.push(`Sponsor Experience: ${bridgeInputs.sponsorExperience}`);
    } else if (activeTab === 'sba') {
      lines.push(`SBA Program: ${sbaInputs.program === '7a' ? '7(a)' : '504'}`);
      lines.push(`Business Status: ${sbaInputs.businessStatus}`);
      if (sbaInputs.businessStatus === 'startup') lines.push(`Franchise Status: ${sbaInputs.franchiseStatus}`);
      if (sbaInputs.program === '504') lines.push(`Property Type: ${sbaInputs.propertyType}`);
      lines.push(`Project Cost: ${formatCurrency(sbaInputs.projectCost)}`);
      lines.push(`Equity Injection: ${formatCurrency(sbaInputs.equityInjection)}`);
      lines.push(`Equity Borrowed?: ${sbaInputs.equityIsBorrowed ? 'YES (DISQUALIFYING)' : 'No (Verified)'}`);
      if (sbaInputs.program === '7a') {
        lines.push(`Working Capital: ${formatCurrency(sbaInputs.workingCapital)}`);
        lines.push(`Interest Rate: ${sbaInputs.interestRate}%`);
        lines.push(`Loan Term: ${sbaInputs.loanTerm} years`);
      } else {
        lines.push(`Bank Portion (50%): ${formatCurrency(sba504Results.bankAmount)} @ ${sbaInputs.bankRate}% / ${sbaInputs.bankTermYears}yr (resets ${sbaInputs.bankResetYears}yr)`);
        lines.push(`CDC Portion (40%): ${formatCurrency(sba504Results.cdcAmount)} @ ${sbaInputs.cdcRate}% / ${sbaInputs.cdcTermYears}yr fixed`);
      }
      lines.push(`Credit Score: ${sbaInputs.creditScore}`);
      lines.push(`Months Post-Closing Liquidity: ${sbaInputs.monthsLiquidity}`);
      lines.push(`100% US Citizen-Owned: ${sbaInputs.isUSCitizenOwned ? 'Yes' : 'No'}`);
      lines.push(`Industry Experience: ${sbaInputs.hasIndustryExperience ? 'Yes' : 'No'}`);
    }

    lines.push('', '--- CALCULATED RESULTS ---');
    if (activeTab === 'purchase' && purchaseMode === 'maxLoan') {
      lines.push(`Max Loan by DSCR: ${formatCurrency(maxLoanResults.maxByDSCR)}`);
      lines.push(`Max Loan by LTV: ${formatCurrency(maxLoanResults.maxByLTV)}`);
      lines.push(`Qualifying Loan Amount: ${formatCurrency(maxLoanResults.qualifyingLoan)}`);
      lines.push(`Governing Constraint: ${maxLoanResults.governingConstraint}`);
      lines.push(`Estimated Monthly Payment: ${formatCurrencyDetailed(maxLoanResults.monthlyPayment)}`);
    } else {
      lines.push(`Loan Amount: ${formatCurrency(results.loanAmount)}`);
      lines.push(`Monthly Payment: ${formatCurrencyDetailed(results.monthlyPayment)}`);
      lines.push(`Annual Debt Service: ${formatCurrency(results.annualDebtService)}`);
      lines.push(`LTV: ${formatPercent(results.ltv)}`);
      if (results.ltc > 0) lines.push(`LTC: ${formatPercent(results.ltc)}`);
      if (results.stabilizedLTV > 0) lines.push(`Stabilized LTV: ${formatPercent(results.stabilizedLTV)}`);
      if (results.dscr > 0) lines.push(`DSCR: ${results.dscr.toFixed(2)}x`);
      if (results.capRate > 0) lines.push(`Cap Rate: ${formatPercent(results.capRate)}`);
      if (results.debtYield > 0) lines.push(`Debt Yield: ${formatPercent(results.debtYield)}`);
      if (results.cashOnCash !== 0) lines.push(`Cash-on-Cash Return: ${formatPercent(results.cashOnCash)}`);
      if (results.balloonPayment > 0) lines.push(`Balloon Payment at Maturity: ${formatCurrency(results.balloonPayment)}`);
      if (activeTab === 'development') lines.push(`Estimated Interest Reserve: ${formatCurrency(totalInterestReserve)}`);
      if (results.brokerFee > 0) lines.push(`Estimated Broker Fee: ${formatCurrency(results.brokerFee)} (${results.brokerFeeRate?.toFixed(2)}%)`);
    }
    return lines.join('\n');
  };

  const handleScheduleCall = () => {
    trackEvent('commercial_calculator_schedule_click', { destination: ADVISOR.calendarUrl });
    window.open(ADVISOR.calendarUrl, '_blank', 'noopener,noreferrer');
  };

  const applyPreset = (preset) => {
    trackEvent('commercial_calculator_scenario_click', { scenario: preset.label, tab: activeTab });
    if (activeTab === 'purchase') {
      // Auto-fill the down payment toggle fields if missing from preset
      const v = preset.values;
      const purchasePrice = parseFloat(v.purchasePrice) || 0;
      const downPayment = parseFloat(v.downPayment) || 0;
      const downPaymentPct = purchasePrice > 0 ? parseFloat(((downPayment / purchasePrice) * 100).toFixed(2)) : 25;
      setPurchaseInputs({
        downPaymentMode: v.downPaymentMode || 'dollar',
        downPaymentPct: v.downPaymentPct || downPaymentPct,
        ...v,
      });
      setPurchaseMode('payment');
    }
    else if (activeTab === 'rateTerm') setRateTermInputs(preset.values);
    else if (activeTab === 'cashOut') setCashOutInputs(preset.values);
    else if (activeTab === 'development') {
      setDevelopmentInputs(preset.values);
      const loan = (preset.values.totalProjectCost || 0) - (preset.values.equityInjection || 0);
      const term = parseInt(preset.values.loanTerm) || 18;
      const drawAmount = loan / 3;
      setDraws([
        { id: 1, month: 1, amount: Math.round(drawAmount) },
        { id: 2, month: Math.floor(term / 2), amount: Math.round(drawAmount) },
        { id: 3, month: term - 2, amount: Math.round(loan - 2 * Math.round(drawAmount)) },
      ]);
    }
    else if (activeTab === 'bridge') setBridgeInputs(preset.values);
    else if (activeTab === 'sba') setSbaInputs(preset.values);
  };

  const getDSCRColor = (dscr) => {
    if (dscr >= 1.40) return BARRETT.green;
    if (dscr >= 1.25) return BARRETT.amber;
    if (dscr > 0) return BARRETT.red;
    return BARRETT.slate;
  };
  const getDSCRStatus = (dscr) => {
    if (dscr >= 1.50) return 'Great';
    if (dscr >= 1.40) return 'Good';
    if (dscr >= 1.25) return 'Acceptable';
    if (dscr >= 1.20) return 'Tight';
    if (dscr >= 1.01) return 'Below Threshold';
    return 'Not Acceptable';
  };

  const tabs = [
    { id: 'purchase', label: 'Purchase', icon: Building },
    { id: 'rateTerm', label: 'Rate & Term Refi', icon: RefreshCw },
    { id: 'cashOut', label: 'Cash-Out Refi', icon: Banknote },
    { id: 'bridge', label: 'Bridge', icon: Layers },
    { id: 'development', label: 'Development', icon: HardHat },
    { id: 'sba', label: 'SBA', icon: Briefcase },
  ];

  const sbaQualificationFlags = useMemo(() => {
    const flags = [];
    const projectCost = parseFloat(sbaInputs.projectCost) || 0;
    const equity = parseFloat(sbaInputs.equityInjection) || 0;
    const equityPct = projectCost > 0 ? (equity / projectCost) * 100 : 0;
    const credit = parseFloat(sbaInputs.creditScore) || 0;
    const isStartup = sbaInputs.businessStatus === 'startup';
    const isFranchise = sbaInputs.franchiseStatus === 'franchise';
    const isSpecialUse = sbaInputs.propertyType === 'special-use';

    if (sbaInputs.equityIsBorrowed) {
      flags.push({ type: 'red', text: 'EQUITY IS BORROWED — SBA does not allow borrowed equity injection. Disqualifying for SBA.' });
    }
    if (sbaInputs.isUSCitizenOwned) flags.push({ type: 'green', text: '100% US citizen-owned ✓' });
    else flags.push({ type: 'red', text: 'SBA requires 100% US citizen ownership (effective 3/1/2026). Consider conventional commercial alternatives.' });

    if (credit >= 700) flags.push({ type: 'green', text: `Credit score ${credit} — strong` });
    else if (credit >= 650) flags.push({ type: 'amber', text: `Credit score ${credit} — review needed (most SBA lenders want 700+)` });
    else if (credit > 0) flags.push({ type: 'red', text: `Credit score ${credit} — likely below threshold` });

    if (sbaInputs.hasIndustryExperience) flags.push({ type: 'green', text: 'Industry/management experience ✓' });
    else if (isStartup) flags.push({ type: 'red', text: 'No industry experience on a startup deal — significant risk factor for lenders' });
    else flags.push({ type: 'amber', text: 'No industry experience — bring to manager for review' });

    if (sbaInputs.program === '504') {
      let requiredPct = 10;
      if (isSpecialUse && isStartup) requiredPct = 20;
      else if (isSpecialUse || isStartup) requiredPct = 15;
      if (equityPct >= requiredPct) flags.push({ type: 'green', text: `Equity injection ${equityPct.toFixed(1)}% meets ${requiredPct}% minimum (504 ${isSpecialUse ? 'special-use' : 'standard'}${isStartup ? ' + startup' : ''})` });
      else flags.push({ type: 'red', text: `Equity injection ${equityPct.toFixed(1)}% below required ${requiredPct}% for 504 ${isSpecialUse ? 'special-use' : 'standard'}${isStartup ? ' + startup' : ''}` });
    } else {
      if (isStartup) {
        if (isFranchise) {
          if (equityPct >= 10) flags.push({ type: 'green', text: `Established franchise with ${equityPct.toFixed(1)}% down — 90% financing available` });
          else flags.push({ type: 'red', text: `Franchise startup with ${equityPct.toFixed(1)}% down — 10% minimum required` });
        } else {
          if (equityPct >= 25) flags.push({ type: 'green', text: `Non-franchise startup with strong equity ${equityPct.toFixed(1)}% ✓` });
          else if (equityPct >= 15) flags.push({ type: 'amber', text: `Non-franchise startup at ${equityPct.toFixed(1)}% — workable but lender will scrutinize mitigants` });
          else if (equityPct >= 10) flags.push({ type: 'amber', text: `${equityPct.toFixed(1)}% is the floor for non-franchise startups; lender may push for more` });
          else flags.push({ type: 'red', text: `${equityPct.toFixed(1)}% below 10% floor for non-franchise startups` });
        }
      } else {
        if (equityPct >= 10) flags.push({ type: 'green', text: `Equity injection ${equityPct.toFixed(1)}% ✓ for existing business` });
        else flags.push({ type: 'amber', text: `Equity injection ${equityPct.toFixed(1)}% — most 7(a) lenders want 10%+ even for existing businesses` });
      }
    }

    const liquidity = parseFloat(sbaInputs.monthsLiquidity) || 0;
    if (isStartup) {
      if (liquidity >= 6) flags.push({ type: 'green', text: `${liquidity} months post-closing liquidity ✓` });
      else flags.push({ type: 'red', text: `Only ${liquidity} months post-closing liquidity — startups need 6+ months` });
    } else {
      if (liquidity >= 3) flags.push({ type: 'green', text: `${liquidity} months post-closing liquidity ✓` });
      else flags.push({ type: 'amber', text: `${liquidity} months post-closing liquidity — most lenders want 3+ months for existing businesses` });
    }

    if (sbaInputs.program === '7a' && projectCost > 0 && projectCost < 500000 && isStartup) {
      flags.push({ type: 'amber', text: 'Startup loan under $500K — bring to manager (other lender overlays may exist)' });
    }
    if (projectCost > 0 && projectCost < 300000) {
      flags.push({ type: 'red', text: 'Under $300K — typically below division minimum; redirect to SBA Microloan' });
    }
    if (sbaInputs.program === '7a' && projectCost > 5000000) {
      flags.push({ type: 'red', text: 'Over $5M — exceeds SBA 7(a) maximum; consider 504 + conventional combo' });
    }
    return flags;
  }, [sbaInputs]);

  const mikesTakeContext = useMemo(() => {
    const ctx = {};
    if (activeTab === 'purchase') {
      ctx.occupancy = purchaseInputs.occupancy;
      ctx.noiSource = purchaseInputs.noiSource;
      ctx.amortization = parseFloat(purchaseInputs.amortization);
    }
    if (activeTab === 'rateTerm') {
      ctx.noiSource = rateTermInputs.noiSource;
      ctx.amortization = parseFloat(rateTermInputs.amortization);
    }
    if (activeTab === 'cashOut') {
      ctx.noiSource = cashOutInputs.noiSource;
      ctx.amortization = parseFloat(cashOutInputs.amortization);
    }
    if (activeTab === 'development') ctx.sponsorExperience = developmentInputs.sponsorExperience;
    if (activeTab === 'bridge') {
      ctx.exitStrategy = bridgeInputs.exitStrategy;
      ctx.loanTerm = bridgeInputs.loanTerm;
      ctx.sponsorExperience = bridgeInputs.sponsorExperience;
      ctx.stabilizedLTV = results.stabilizedLTV;
    }
    return ctx;
  }, [activeTab, purchaseInputs, rateTermInputs, cashOutInputs, developmentInputs, bridgeInputs, results.stabilizedLTV]);

  const mikesInsights = useMemo(() => generateMikesTake(results, activeTab, mikesTakeContext, ADVISOR.name.split(' ')[0]),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [results, activeTab, mikesTakeContext]);

  const OccupancyToggle = ({ value, onChange }) => (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
        <Building className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
        Property Use
        <Tooltip text="Owner-occupied = the borrower's business operates on the property. Routes to SBA 7(a)/504. Investment = leased to tenants. Routes to conventional/agency/CMBS." />
      </label>
      <div className="flex gap-2">
        {[
          { id: 'investment', label: 'Investment', sub: 'Conventional / Agency / CMBS' },
          { id: 'owner-occupied', label: 'Owner-Occupied', sub: 'SBA 7(a) / 504 territory' },
        ].map(opt => (
          <button key={opt.id} type="button" onClick={() => onChange(opt.id)}
            className="flex-1 px-3 py-3 rounded-md font-medium transition-all text-xs text-left"
            style={{
              border: `2px solid ${value === opt.id ? BARRETT.navy : BARRETT.line}`,
              backgroundColor: value === opt.id ? BARRETT.navy : BARRETT.white,
              color: value === opt.id ? BARRETT.white : BARRETT.slate,
              fontFamily: FONT_STACK,
            }}>
            <div className="font-bold text-sm">{opt.label}</div>
            <div className="text-xs mt-0.5 opacity-80">{opt.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const NOISourceToggle = ({ value, onChange }) => (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
        <FileText className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
        NOI Source
        <Tooltip text="Lenders underwrite to T-12 trailing actual NOI on stabilized purchases/refis. Pro forma NOI is only recognized for new construction or value-add bridge loans." />
      </label>
      <div className="flex gap-2">
        {[
          { id: 't12', label: 'T-12 Actual', sub: 'Trailing 12-month performance' },
          { id: 'proforma', label: 'Pro Forma', sub: 'Projected — bridge/dev only' },
        ].map(opt => (
          <button key={opt.id} type="button" onClick={() => onChange(opt.id)}
            className="flex-1 px-3 py-2.5 rounded-md font-medium transition-all text-xs text-left"
            style={{
              border: `2px solid ${value === opt.id ? BARRETT.navy : BARRETT.line}`,
              backgroundColor: value === opt.id ? BARRETT.navy : BARRETT.white,
              color: value === opt.id ? BARRETT.white : BARRETT.slate,
              fontFamily: FONT_STACK,
            }}>
            <div className="font-bold text-sm">{opt.label}</div>
            <div className="text-xs mt-0.5 opacity-80">{opt.sub}</div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderPurchaseInputs = () => {
    if (purchaseMode === 'maxLoan') {
      return (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SectionHeading icon={TrendingUp}>Income & Targets</SectionHeading>
            <InputField label="Net Operating Income (NOI)" icon={DollarSign} value={maxLoanInputs.noi} onChange={(v) => setMaxLoanInputs(p => ({ ...p, noi: v }))} hint="Annual NOI from the property" />
            <InputField label="Target DSCR" icon={Percent} type="number" step="0.01" value={maxLoanInputs.targetDSCR} onChange={(v) => setMaxLoanInputs(p => ({ ...p, targetDSCR: v }))} hint="Most lenders require 1.25x minimum" />
            <InputField label="Target LTV (%)" icon={Percent} type="number" step="0.5" value={maxLoanInputs.targetLTV} onChange={(v) => setMaxLoanInputs(p => ({ ...p, targetLTV: v }))} hint="Typical max: 65–75% CRE, up to 80% multifamily/agency" />
            <InputField label="Estimated Property Value" icon={Building} value={maxLoanInputs.propertyValue} onChange={(v) => setMaxLoanInputs(p => ({ ...p, propertyValue: v }))} hint="Used to calculate the LTV constraint" />
          </div>
          <div className="space-y-5">
            <SectionHeading icon={Calculator}>Loan Terms</SectionHeading>
            <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={maxLoanInputs.interestRate} onChange={(v) => setMaxLoanInputs(p => ({ ...p, interestRate: v }))} />
            <PaymentTypeField value={maxLoanInputs.paymentType} onChange={(v) => setMaxLoanInputs(p => ({ ...p, paymentType: v }))} />
            {maxLoanInputs.paymentType === 'pi' && (
              <InputField label="Amortization (Years)" icon={TrendingUp} type="number" step="1" value={maxLoanInputs.amortization} onChange={(v) => setMaxLoanInputs(p => ({ ...p, amortization: v }))} hint="CRE: 20–25 yrs; multifamily/agency: up to 30" />
            )}
            <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
              <p className="text-xs leading-relaxed" style={{ color: BARRETT.slate }}>
                <strong style={{ color: BARRETT.navy }}>How this works:</strong> Given your target DSCR and LTV, this works backward to find the largest loan a lender would underwrite. The qualifying loan is the lower of the two constraints.
              </p>
            </div>
          </div>
        </div>
      );
    }
    const isOwnerOcc = purchaseInputs.occupancy === 'owner-occupied';
    return (
      <div className="space-y-6">
        <OccupancyToggle value={purchaseInputs.occupancy} onChange={(v) => handlePurchaseChange('occupancy', v)} />
        {isOwnerOcc && (
          <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: '#FFFBEB', borderColor: BARRETT.amber }}>
            <p className="text-sm" style={{ color: BARRETT.ink }}>
              <strong style={{ color: BARRETT.navy }}>Owner-occupied detected.</strong> SBA 7(a)/504 are typically the better fit — they allow up to 90% financing (vs. 70-75% conventional) and offer longer fixed terms. Consider also running this scenario in the <strong>SBA tab</strong>.
            </p>
          </div>
        )}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SectionHeading icon={Building}>Property Information</SectionHeading>
            <InputField label="Purchase Price" icon={DollarSign} value={purchaseInputs.purchasePrice} onChange={(v) => handlePurchaseChange('purchasePrice', v)} />

            {/* Down Payment with $/% toggle */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
                  <DollarSign className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
                  Down Payment
                </label>
                <div className="inline-flex rounded-md overflow-hidden" style={{ border: `1px solid ${BARRETT.line}` }}>
                  {[{ id: 'dollar', label: '$' }, { id: 'percent', label: '%' }].map(opt => (
                    <button key={opt.id} type="button" onClick={() => handlePurchaseChange('downPaymentMode', opt.id)}
                      className="px-3 py-1 text-xs font-bold transition-all"
                      style={{
                        backgroundColor: purchaseInputs.downPaymentMode === opt.id ? BARRETT.navy : BARRETT.white,
                        color: purchaseInputs.downPaymentMode === opt.id ? BARRETT.white : BARRETT.slate,
                        fontFamily: FONT_STACK,
                      }}>{opt.label}</button>
                  ))}
                </div>
              </div>
              {purchaseInputs.downPaymentMode === 'percent' ? (
                <>
                  <input type="text" inputMode="decimal" value={purchaseInputs.downPaymentPct}
                    onChange={(e) => { const raw = stripCommas(e.target.value); if (raw === '' || !isNaN(parseFloat(raw))) handlePurchaseChange('downPaymentPct', raw); }}
                    className="w-full px-4 py-3 border rounded-md transition-all focus:outline-none focus:ring-2"
                    style={{ borderColor: BARRETT.line, backgroundColor: BARRETT.white, color: BARRETT.ink, fontFamily: FONT_STACK, fontSize: '15px' }}
                    onFocus={(e) => (e.target.style.borderColor = BARRETT.navy)}
                    onBlur={(e) => (e.target.style.borderColor = BARRETT.line)} />
                  <p className="text-xs mt-1.5" style={{ color: BARRETT.slate }}>
                    = <strong style={{ color: BARRETT.navy }}>{formatCurrency(purchaseInputs.downPayment)}</strong> at {parseFloat(purchaseInputs.downPaymentPct || 0).toFixed(2)}% of purchase price
                  </p>
                </>
              ) : (
                <>
                  <input type="text" inputMode="decimal" value={formatNumberWithCommas(purchaseInputs.downPayment)}
                    onChange={(e) => { const raw = stripCommas(e.target.value); if (raw === '' || !isNaN(parseFloat(raw))) handlePurchaseChange('downPayment', raw); }}
                    className="w-full px-4 py-3 border rounded-md transition-all focus:outline-none focus:ring-2"
                    style={{ borderColor: BARRETT.line, backgroundColor: BARRETT.white, color: BARRETT.ink, fontFamily: FONT_STACK, fontSize: '15px' }}
                    onFocus={(e) => (e.target.style.borderColor = BARRETT.navy)}
                    onBlur={(e) => (e.target.style.borderColor = BARRETT.line)} />
                  <p className="text-xs mt-1.5" style={{ color: BARRETT.slate }}>
                    = <strong style={{ color: BARRETT.navy }}>{parseFloat(purchaseInputs.downPaymentPct || 0).toFixed(2)}%</strong> of purchase price
                  </p>
                </>
              )}
            </div>

            {!isOwnerOcc && (
              <>
                <InputField label="Net Operating Income (NOI)" icon={DollarSign} value={purchaseInputs.noi} onChange={(v) => handlePurchaseChange('noi', v)} hint="Annual NOI for DSCR calculation" tooltip="Net Operating Income: gross rent minus operating expenses (taxes, insurance, maintenance, management). Never includes debt service." />
                <NOISourceToggle value={purchaseInputs.noiSource} onChange={(v) => handlePurchaseChange('noiSource', v)} />
              </>
            )}
          </div>
          <div className="space-y-5">
            <SectionHeading icon={Calculator}>Loan Terms</SectionHeading>
            <InputField label="Loan Amount" icon={DollarSign} value={purchaseInputs.loanAmount} readOnly hint="Auto-calculated" />
            <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={purchaseInputs.interestRate} onChange={(v) => handlePurchaseChange('interestRate', v)} hint="April 2026: conventional 5.5–7%, agency multifamily 5.5–6.5%" />
            <PaymentTypeField value={purchaseInputs.paymentType} onChange={(v) => handlePurchaseChange('paymentType', v)} />
            <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="0.5" value={purchaseInputs.loanTerm} onChange={(v) => handlePurchaseChange('loanTerm', v)} hint="Duration before balloon" />
            {purchaseInputs.paymentType === 'pi' && (
              <InputField label="Amortization Period (Years)" icon={TrendingUp} type="number" step="1" value={purchaseInputs.amortization} onChange={(v) => handlePurchaseChange('amortization', v)} hint="CRE: 20–25 yrs; multifamily/agency: up to 30 yrs" />
            )}
          </div>
        </div>
        {!isOwnerOcc && (
          <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
            <SectionHeading icon={DollarSign}>Total Cash Required (for accurate Cash-on-Cash)</SectionHeading>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <InputField label="Closing Costs (%)" icon={Percent} type="number" step="0.1" value={purchaseInputs.closingCostsPct} onChange={(v) => handlePurchaseChange('closingCostsPct', v)} hint="Typical CRE: 2–3% of purchase price" />
              <InputField label="Reserves (Months of Payment)" icon={Calendar} type="number" step="1" value={purchaseInputs.reservesMonths} onChange={(v) => handlePurchaseChange('reservesMonths', v)} hint="Most lenders require 6 months minimum" />
            </div>
          </div>
        )}
      </div>
    );
  };

  const renderRateTermInputs = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SectionHeading icon={Building}>Property & Current Loan</SectionHeading>
          <InputField label="Current Property Value" icon={DollarSign} value={rateTermInputs.propertyValue} onChange={(v) => setRateTermInputs(p => ({ ...p, propertyValue: v }))} />
          <InputField label="Current Loan Balance" icon={DollarSign} value={rateTermInputs.currentLoanBalance} onChange={(v) => setRateTermInputs(p => ({ ...p, currentLoanBalance: v }))} />
          <InputField label="Estimated Closing Costs" icon={DollarSign} value={rateTermInputs.closingCosts} onChange={(v) => setRateTermInputs(p => ({ ...p, closingCosts: v }))} hint="Can be rolled into the new loan" />
          <InputField label="Net Operating Income (NOI)" icon={DollarSign} value={rateTermInputs.noi} onChange={(v) => setRateTermInputs(p => ({ ...p, noi: v }))} hint="Annual NOI for DSCR calculation" />
          <NOISourceToggle value={rateTermInputs.noiSource} onChange={(v) => setRateTermInputs(p => ({ ...p, noiSource: v }))} />
        </div>
        <div className="space-y-5">
          <SectionHeading icon={Calculator}>New Loan Terms</SectionHeading>
          <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>New Loan Amount</p>
            <p className="text-2xl font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>{formatCurrency(parseFloat(rateTermInputs.currentLoanBalance || 0) + parseFloat(rateTermInputs.closingCosts || 0))}</p>
            <p className="text-xs mt-1" style={{ color: BARRETT.slate }}>Current balance + closing costs</p>
          </div>
          <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={rateTermInputs.interestRate} onChange={(v) => setRateTermInputs(p => ({ ...p, interestRate: v }))} />
          <PaymentTypeField value={rateTermInputs.paymentType} onChange={(v) => setRateTermInputs(p => ({ ...p, paymentType: v }))} />
          <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="0.5" value={rateTermInputs.loanTerm} onChange={(v) => setRateTermInputs(p => ({ ...p, loanTerm: v }))} hint="Duration before balloon" />
          {rateTermInputs.paymentType === 'pi' && (
            <InputField label="Amortization Period (Years)" icon={TrendingUp} type="number" step="1" value={rateTermInputs.amortization} onChange={(v) => setRateTermInputs(p => ({ ...p, amortization: v }))} hint="Period over which payments are calculated" />
          )}
        </div>
      </div>
    </div>
  );

  const renderCashOutInputs = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SectionHeading icon={Building}>Property & Cash Out</SectionHeading>
          <InputField label="Current Property Value" icon={DollarSign} value={cashOutInputs.propertyValue} onChange={(v) => setCashOutInputs(p => ({ ...p, propertyValue: v }))} />
          <InputField label="Current Loan Balance" icon={DollarSign} value={cashOutInputs.currentLoanBalance} onChange={(v) => setCashOutInputs(p => ({ ...p, currentLoanBalance: v }))} />
          <InputField label="Cash Out Amount" icon={Banknote} value={cashOutInputs.cashOutAmount} onChange={(v) => setCashOutInputs(p => ({ ...p, cashOutAmount: v }))} hint="Additional cash to receive at closing" />
          <InputField label="Estimated Closing Costs" icon={DollarSign} value={cashOutInputs.closingCosts} onChange={(v) => setCashOutInputs(p => ({ ...p, closingCosts: v }))} />
          <InputField label="Net Operating Income (NOI)" icon={DollarSign} value={cashOutInputs.noi} onChange={(v) => setCashOutInputs(p => ({ ...p, noi: v }))} hint="Annual NOI for DSCR calculation" />
          <NOISourceToggle value={cashOutInputs.noiSource} onChange={(v) => setCashOutInputs(p => ({ ...p, noiSource: v }))} />
          <InputField label="Original Cash Invested" icon={DollarSign} value={cashOutInputs.originalCashInvested} onChange={(v) => setCashOutInputs(p => ({ ...p, originalCashInvested: v }))} hint="Down payment + improvements at original purchase. Used for accurate cash-on-cash after refi." tooltip="Cash-out refinances RETURN capital to the borrower. Accurate cash-on-cash = original cash invested minus cash pulled out via this refi." />
        </div>
        <div className="space-y-5">
          <SectionHeading icon={Calculator}>New Loan Terms</SectionHeading>
          <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>New Loan Amount</p>
            <p className="text-2xl font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>{formatCurrency(parseFloat(cashOutInputs.currentLoanBalance || 0) + parseFloat(cashOutInputs.cashOutAmount || 0) + parseFloat(cashOutInputs.closingCosts || 0))}</p>
            <p className="text-xs mt-1" style={{ color: BARRETT.slate }}>Current balance + cash out + closing costs</p>
          </div>
          <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={cashOutInputs.interestRate} onChange={(v) => setCashOutInputs(p => ({ ...p, interestRate: v }))} />
          <PaymentTypeField value={cashOutInputs.paymentType} onChange={(v) => setCashOutInputs(p => ({ ...p, paymentType: v }))} />
          <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="0.5" value={cashOutInputs.loanTerm} onChange={(v) => setCashOutInputs(p => ({ ...p, loanTerm: v }))} hint="Duration before balloon" />
          {cashOutInputs.paymentType === 'pi' && (
            <InputField label="Amortization Period (Years)" icon={TrendingUp} type="number" step="1" value={cashOutInputs.amortization} onChange={(v) => setCashOutInputs(p => ({ ...p, amortization: v }))} hint="Period over which payments are calculated" />
          )}
        </div>
      </div>
    </div>
  );

  const totalDrawn = draws.reduce((sum, d) => sum + d.amount, 0);
  const totalLoanAmount = parseFloat(developmentInputs.totalProjectCost || 0) - parseFloat(developmentInputs.equityInjection || 0);
  const remainingToDraw = totalLoanAmount - totalDrawn;

  const renderDevelopmentInputs = () => (
    <div className="space-y-8">
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
          <Shield className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
          Sponsor Construction Experience
          <Tooltip text="Open tryouts for ground-up construction ended in 2019. Lenders require verified completed projects within 3-5 years. First-time developers typically need an experienced co-sponsor or fee developer." />
        </label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'experienced', label: 'Experienced', sub: '3+ similar projects in 5 yrs' },
            { id: 'limited', label: 'Limited', sub: '1-2 projects, smaller scale' },
            { id: 'first-time', label: 'First-Time', sub: 'No prior ground-up' },
          ].map(opt => (
            <button key={opt.id} type="button" onClick={() => setDevelopmentInputs(p => ({ ...p, sponsorExperience: opt.id }))}
              className="px-3 py-3 rounded-md font-medium transition-all text-xs text-left"
              style={{
                border: `2px solid ${developmentInputs.sponsorExperience === opt.id ? BARRETT.navy : BARRETT.line}`,
                backgroundColor: developmentInputs.sponsorExperience === opt.id ? BARRETT.navy : BARRETT.white,
                color: developmentInputs.sponsorExperience === opt.id ? BARRETT.white : BARRETT.slate,
                fontFamily: FONT_STACK,
              }}>
              <div className="font-bold text-sm">{opt.label}</div>
              <div className="text-xs mt-0.5 opacity-80">{opt.sub}</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SectionHeading icon={HardHat}>Project Costs</SectionHeading>
          <InputField label="Total Project Cost" icon={DollarSign} value={developmentInputs.totalProjectCost} onChange={(v) => setDevelopmentInputs(p => ({ ...p, totalProjectCost: v }))} hint="All-in development budget" />
          <InputField label="Equity Injection" icon={DollarSign} value={developmentInputs.equityInjection} onChange={(v) => setDevelopmentInputs(p => ({ ...p, equityInjection: v }))} hint="Lenders typically want 25-30%+" />
          <p className="text-xs leading-relaxed -mt-2" style={{ color: BARRETT.slate }}>Includes: land/acquisition, hard costs, soft costs, interest reserves, contingency.</p>
          <InputField label="Completed/Stabilized Value" icon={Building} value={developmentInputs.completedValue} onChange={(v) => setDevelopmentInputs(p => ({ ...p, completedValue: v }))} hint="Appraised value upon completion" />
        </div>
        <div className="space-y-5">
          <SectionHeading icon={Calculator}>Loan Terms</SectionHeading>
          <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>Loan Amount</p>
            <p className="text-2xl font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>{formatCurrency(totalLoanAmount)}</p>
            <p className="text-xs mt-1" style={{ color: BARRETT.slate }}>Total project cost − equity injection</p>
          </div>
          <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={developmentInputs.interestRate} onChange={(v) => setDevelopmentInputs(p => ({ ...p, interestRate: v }))} hint="April 2026: ground-up construction 8–10%" />
          <PaymentTypeField value={developmentInputs.paymentType} onChange={(v) => setDevelopmentInputs(p => ({ ...p, paymentType: v }))} />
          <InputField label="Loan Term (Months)" icon={Calendar} type="number" step="1" value={developmentInputs.loanTerm} onChange={(v) => setDevelopmentInputs(p => ({ ...p, loanTerm: v }))} hint="Construction period (e.g., 18-24 months)" />
          {developmentInputs.paymentType === 'pi' && (
            <InputField label="Amortization Period (Years)" icon={TrendingUp} type="number" step="1" value={developmentInputs.amortization} onChange={(v) => setDevelopmentInputs(p => ({ ...p, amortization: v }))} />
          )}
        </div>
      </div>

      <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
        <SectionHeading icon={Calendar}>Draw Schedule</SectionHeading>
        <p className="text-sm mt-3 mb-5" style={{ color: BARRETT.slate }}>Interest is calculated only on amounts drawn. Add your planned draws below.</p>
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <input type="number" placeholder="Month" value={newDraw.month} onChange={(e) => setNewDraw(p => ({ ...p, month: e.target.value }))}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2" style={{ borderColor: BARRETT.line, fontFamily: FONT_STACK }} min="1" max={developmentInputs.loanTerm} />
          </div>
          <div className="flex-[2]">
            <input type="text" placeholder="Draw Amount" value={formatNumberWithCommas(newDraw.amount)}
              onChange={(e) => { const raw = stripCommas(e.target.value); if (raw === '' || !isNaN(parseFloat(raw))) setNewDraw(p => ({ ...p, amount: raw })); }}
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2" style={{ borderColor: BARRETT.line, fontFamily: FONT_STACK }} inputMode="decimal" />
          </div>
          <button onClick={addDraw} className="px-5 py-3 rounded-md font-medium flex items-center gap-2 transition-all hover:opacity-90" style={{ backgroundColor: BARRETT.navy, color: BARRETT.white, fontFamily: FONT_STACK }}>
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
        {draws.length > 0 && (
          <div className="rounded-md p-5 mb-5" style={{ backgroundColor: BARRETT.surface, border: `1px solid ${BARRETT.line}` }}>
            <div className="space-y-2">
              {draws.map(draw => (
                <div key={draw.id} className="flex items-center justify-between px-4 py-3 rounded" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
                  <span style={{ color: BARRETT.ink, fontFamily: FONT_STACK }}>
                    <strong style={{ color: BARRETT.navy }}>Month {draw.month}:</strong> {formatCurrency(draw.amount)}
                  </span>
                  <button onClick={() => removeDraw(draw.id)} className="p-1.5 rounded transition-colors hover:bg-red-50" style={{ color: BARRETT.red }}>
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t space-y-2" style={{ borderColor: BARRETT.line }}>
              <div className="flex justify-between text-sm">
                <span style={{ color: BARRETT.slate }}>Total Drawn:</span>
                <span className="font-semibold" style={{ color: BARRETT.navy }}>{formatCurrency(totalDrawn)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: BARRETT.slate }}>Remaining to Draw:</span>
                <span className="font-semibold" style={{ color: remainingToDraw < 0 ? BARRETT.red : BARRETT.navy }}>{formatCurrency(remainingToDraw)}</span>
              </div>
            </div>
          </div>
        )}
        <div className="p-5 rounded-md flex justify-between items-center" style={{ backgroundColor: BARRETT.navy, color: BARRETT.white }}>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BARRETT.goldSoft, letterSpacing: '0.1em' }}>Estimated Interest Reserve Needed</p>
            <p className="text-xs" style={{ color: '#CBD5E1' }}>Total interest over construction period based on draw schedule</p>
          </div>
          <p className="text-3xl font-bold" style={{ color: BARRETT.gold, fontFamily: FONT_STACK }}>{formatCurrency(totalInterestReserve)}</p>
        </div>
        <button onClick={() => setShowDrawSchedule(!showDrawSchedule)}
          className="mt-4 w-full py-3 px-4 rounded-md font-medium transition-all hover:bg-slate-50"
          style={{ border: `2px solid ${BARRETT.navy}`, color: BARRETT.navy, fontFamily: FONT_STACK }}>
          {showDrawSchedule ? 'Hide' : 'Show'} Detailed Draw Schedule
        </button>
      </div>
    </div>
  );

  const renderBridgeInputs = () => {
    const baseValue = (parseFloat(bridgeInputs.purchasePrice) || 0) > 0 ? parseFloat(bridgeInputs.purchasePrice) : parseFloat(bridgeInputs.asIsValue);
    const totalCost = baseValue + (parseFloat(bridgeInputs.rehabBudget) || 0);
    return (
      <div className="space-y-8">
        <div className="p-4 rounded-md" style={{ backgroundColor: BARRETT.surface, border: `1px solid ${BARRETT.line}` }}>
          <p className="text-sm leading-relaxed" style={{ color: BARRETT.ink }}>
            <strong style={{ color: BARRETT.navy }}>Bridge loans</strong> are short-term financing (6–36 months) for value-add, lease-up, repositioning, or maturing-loan situations. Higher rates than perm financing in exchange for speed and flexibility. Lenders underwrite to <em>both</em> Loan-to-Cost (acquisition + rehab) AND Loan-to-Stabilized-Value (the refi exit picture).
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SectionHeading icon={Building}>Property & Project</SectionHeading>
            <InputField label="As-Is Value" icon={DollarSign} value={bridgeInputs.asIsValue} onChange={(v) => setBridgeInputs(p => ({ ...p, asIsValue: v }))} hint="Current appraised value before rehab" />
            <InputField label="Purchase Price (if acquisition)" icon={DollarSign} value={bridgeInputs.purchasePrice} onChange={(v) => setBridgeInputs(p => ({ ...p, purchasePrice: v }))} hint="Leave 0 if refinancing existing property" />
            <InputField label="Rehab / CapEx Budget" icon={Wrench} value={bridgeInputs.rehabBudget} onChange={(v) => setBridgeInputs(p => ({ ...p, rehabBudget: v }))} hint="Renovation, lease-up costs, capital improvements" />
            <InputField label="Stabilized Value" icon={TrendingUp} value={bridgeInputs.stabilizedValue} onChange={(v) => setBridgeInputs(p => ({ ...p, stabilizedValue: v }))} hint="Projected value after stabilization" />
            <InputField label="Pro Forma NOI (Stabilized)" icon={DollarSign} value={bridgeInputs.proFormaNOI} onChange={(v) => setBridgeInputs(p => ({ ...p, proFormaNOI: v }))} hint="Required for refi exit underwriting" />
          </div>
          <div className="space-y-5">
            <SectionHeading icon={Calculator}>Bridge Loan Terms</SectionHeading>
            <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
              <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>Total Project Cost</p>
              <p className="text-xl font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(totalCost)}</p>
              <p className="text-xs mt-1" style={{ color: BARRETT.slate }}>Acquisition (or as-is) + rehab budget</p>
            </div>
            <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={bridgeInputs.interestRate} onChange={(v) => setBridgeInputs(p => ({ ...p, interestRate: v }))} hint="April 2026: bridge 8–14.5% depending on leverage & risk" />
            <InputField label="Origination Points (%)" icon={Percent} type="number" step="0.25" value={bridgeInputs.points} onChange={(v) => setBridgeInputs(p => ({ ...p, points: v }))} hint="Typical: 1–2% of loan amount" />
            <InputField label="Loan Term (Months)" icon={Calendar} type="number" step="1" value={bridgeInputs.loanTerm} onChange={(v) => setBridgeInputs(p => ({ ...p, loanTerm: v }))} hint="Typical: 12–36 months" />
            <p className="text-xs italic" style={{ color: BARRETT.slate }}>Bridge loans are always Interest-Only — full principal due at maturity.</p>
          </div>
        </div>

        <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
          <SectionHeading icon={Layers}>Sponsor & Exit Strategy</SectionHeading>
          <p className="text-sm mt-3 mb-5" style={{ color: BARRETT.slate }}>Bridge lenders REQUIRE a clearly defined exit strategy. This is the single biggest underwriting factor after sponsor strength.</p>
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>Exit Strategy</label>
              <div className="space-y-2">
                {[
                  { id: 'refinance', label: 'Refinance to Permanent', sub: 'Most common — refi into 10-yr CMBS or agency once stabilized' },
                  { id: 'sale', label: 'Sale at Stabilization', sub: 'Sell after value-add complete' },
                  { id: 'hold', label: 'Hold (CMBS Maturity)', sub: 'Buy time on a maturing loan' },
                ].map(opt => (
                  <button key={opt.id} type="button" onClick={() => setBridgeInputs(p => ({ ...p, exitStrategy: opt.id }))}
                    className="w-full px-3 py-2.5 rounded-md font-medium transition-all text-xs text-left"
                    style={{
                      border: `2px solid ${bridgeInputs.exitStrategy === opt.id ? BARRETT.navy : BARRETT.line}`,
                      backgroundColor: bridgeInputs.exitStrategy === opt.id ? BARRETT.navy : BARRETT.white,
                      color: bridgeInputs.exitStrategy === opt.id ? BARRETT.white : BARRETT.slate,
                      fontFamily: FONT_STACK,
                    }}>
                    <div className="font-bold text-sm">{opt.label}</div>
                    <div className="text-xs mt-0.5 opacity-80">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <InputField label="Current Occupancy (%)" icon={Percent} type="number" step="1" value={bridgeInputs.occupancyAtClose} onChange={(v) => setBridgeInputs(p => ({ ...p, occupancyAtClose: v }))} hint="At time of bridge close" />
              <InputField label="Target Stabilized Occupancy (%)" icon={Percent} type="number" step="1" value={bridgeInputs.targetStabilizedOccupancy} onChange={(v) => setBridgeInputs(p => ({ ...p, targetStabilizedOccupancy: v }))} hint="Required for refi exit" />
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>Sponsor Bridge Experience</label>
                <div className="space-y-1.5">
                  {[
                    { id: 'experienced', label: 'Experienced (3+ deals)' },
                    { id: 'limited', label: 'Limited (1-2 deals)' },
                    { id: 'first-time', label: 'First-Time (no track record)' },
                  ].map(opt => (
                    <button key={opt.id} type="button" onClick={() => setBridgeInputs(p => ({ ...p, sponsorExperience: opt.id }))}
                      className="w-full px-3 py-2 rounded-md font-medium transition-all text-xs text-left"
                      style={{
                        border: `2px solid ${bridgeInputs.sponsorExperience === opt.id ? BARRETT.navy : BARRETT.line}`,
                        backgroundColor: bridgeInputs.sponsorExperience === opt.id ? BARRETT.navy : BARRETT.white,
                        color: bridgeInputs.sponsorExperience === opt.id ? BARRETT.white : BARRETT.slate,
                        fontFamily: FONT_STACK,
                      }}>{opt.label}</button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderSBAInputs = () => {
    const projectCost = parseFloat(sbaInputs.projectCost) || 0;
    const equity = parseFloat(sbaInputs.equityInjection) || 0;
    const equityPct = projectCost > 0 ? (equity / projectCost) * 100 : 0;
    const is504 = sbaInputs.program === '504';

    return (
      <div className="space-y-8">
        <div>
          <SectionHeading icon={Briefcase}>SBA Loan Program</SectionHeading>
          <div className="flex gap-2 mt-4">
            {[{ id: '7a', label: 'SBA 7(a)', sub: 'Up to $5M | acquisitions, working capital, RE' }, { id: '504', label: 'SBA 504', sub: 'Real estate / fixed assets | dual-loan structure' }].map(opt => (
              <button key={opt.id} type="button" onClick={() => setSbaInputs(p => ({ ...p, program: opt.id }))}
                className="flex-1 px-5 py-4 rounded-md font-medium transition-all text-sm text-left"
                style={{
                  border: `2px solid ${sbaInputs.program === opt.id ? BARRETT.navy : BARRETT.line}`,
                  backgroundColor: sbaInputs.program === opt.id ? BARRETT.navy : BARRETT.white,
                  color: sbaInputs.program === opt.id ? BARRETT.white : BARRETT.slate,
                  fontFamily: FONT_STACK,
                }}>
                <div className="font-bold">{opt.label}</div>
                <div className="text-xs mt-0.5 opacity-80">{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>Business Status</label>
            <div className="grid grid-cols-2 gap-2">
              {[{ id: 'existing', label: 'Existing', sub: '2+ years operations' }, { id: 'startup', label: 'Startup', sub: '<2 years' }].map(opt => (
                <button key={opt.id} type="button" onClick={() => setSbaInputs(p => ({ ...p, businessStatus: opt.id }))}
                  className="px-3 py-3 rounded-md font-medium transition-all text-xs text-left"
                  style={{
                    border: `2px solid ${sbaInputs.businessStatus === opt.id ? BARRETT.navy : BARRETT.line}`,
                    backgroundColor: sbaInputs.businessStatus === opt.id ? BARRETT.navy : BARRETT.white,
                    color: sbaInputs.businessStatus === opt.id ? BARRETT.white : BARRETT.slate,
                    fontFamily: FONT_STACK,
                  }}>
                  <div className="font-bold text-sm">{opt.label}</div>
                  <div className="text-xs mt-0.5 opacity-80">{opt.sub}</div>
                </button>
              ))}
            </div>
          </div>

          {sbaInputs.businessStatus === 'startup' && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>Franchise Status</label>
              <div className="grid grid-cols-2 gap-2">
                {[{ id: 'franchise', label: 'Franchise', sub: '50+ locations' }, { id: 'non-franchise', label: 'Non-Franchise', sub: 'Standalone' }].map(opt => (
                  <button key={opt.id} type="button" onClick={() => setSbaInputs(p => ({ ...p, franchiseStatus: opt.id }))}
                    className="px-3 py-3 rounded-md font-medium transition-all text-xs text-left"
                    style={{
                      border: `2px solid ${sbaInputs.franchiseStatus === opt.id ? BARRETT.navy : BARRETT.line}`,
                      backgroundColor: sbaInputs.franchiseStatus === opt.id ? BARRETT.navy : BARRETT.white,
                      color: sbaInputs.franchiseStatus === opt.id ? BARRETT.white : BARRETT.slate,
                      fontFamily: FONT_STACK,
                    }}>
                    <div className="font-bold text-sm">{opt.label}</div>
                    <div className="text-xs mt-0.5 opacity-80">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {is504 && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider mb-2 block" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
                Property Type
                <Tooltip text="Special-use properties (hotels, gas stations, car washes, churches, restaurants) require higher borrower equity: 15% standard, 20% if also a startup." />
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[{ id: 'standard', label: 'Standard', sub: 'Office, retail, industrial' }, { id: 'special-use', label: 'Special-Use', sub: 'Hotel, gas, car wash' }].map(opt => (
                  <button key={opt.id} type="button" onClick={() => setSbaInputs(p => ({ ...p, propertyType: opt.id }))}
                    className="px-3 py-3 rounded-md font-medium transition-all text-xs text-left"
                    style={{
                      border: `2px solid ${sbaInputs.propertyType === opt.id ? BARRETT.navy : BARRETT.line}`,
                      backgroundColor: sbaInputs.propertyType === opt.id ? BARRETT.navy : BARRETT.white,
                      color: sbaInputs.propertyType === opt.id ? BARRETT.white : BARRETT.slate,
                      fontFamily: FONT_STACK,
                    }}>
                    <div className="font-bold text-sm">{opt.label}</div>
                    <div className="text-xs mt-0.5 opacity-80">{opt.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SectionHeading icon={DollarSign}>Project Details</SectionHeading>
            <InputField label={is504 ? 'Project Cost (RE + Fixed Assets)' : 'Total Project Cost'} icon={DollarSign} value={sbaInputs.projectCost} onChange={(v) => setSbaInputs(p => ({ ...p, projectCost: v }))} hint={is504 ? '504 covers building + fixed assets' : 'Acquisition, equipment, working capital, etc.'} />
            <InputField label="Equity Injection" icon={DollarSign} value={sbaInputs.equityInjection} onChange={(v) => setSbaInputs(p => ({ ...p, equityInjection: v }))} hint="Cannot be borrowed funds" tooltip="SBA requires verified source of funds. Borrowed equity (HELOC, family loan, MCA) does not qualify." />
            <label className="flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors" style={{ border: `1px solid ${sbaInputs.equityIsBorrowed ? BARRETT.red : BARRETT.line}`, backgroundColor: sbaInputs.equityIsBorrowed ? '#FEF2F2' : BARRETT.white }}>
              <input type="checkbox" checked={sbaInputs.equityIsBorrowed} onChange={(e) => setSbaInputs(p => ({ ...p, equityIsBorrowed: e.target.checked }))} className="mt-0.5" />
              <div>
                <div className="text-sm font-semibold" style={{ color: sbaInputs.equityIsBorrowed ? BARRETT.red : BARRETT.navy }}>Equity is borrowed funds</div>
                <div className="text-xs" style={{ color: BARRETT.slate }}>HELOC, family loan, MCA, etc. — disqualifying for SBA</div>
              </div>
            </label>
            {!is504 && (
              <InputField label="Working Capital (optional)" icon={DollarSign} value={sbaInputs.workingCapital} onChange={(v) => setSbaInputs(p => ({ ...p, workingCapital: v }))} hint="Additional working capital request (above project cost)" />
            )}
            <InputField label="Annual Business Income / NOI" icon={TrendingUp} value={sbaInputs.annualBusinessIncome} onChange={(v) => setSbaInputs(p => ({ ...p, annualBusinessIncome: v }))} hint="For DSCR — leave 0 for startups" />

            {is504 && (
              <div className="p-4 rounded-md border-l-4 mt-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
                <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>504 Structure</p>
                <div className="space-y-2 text-xs" style={{ color: BARRETT.slate }}>
                  <div className="flex justify-between"><span>Bank/Lender (50%):</span><span className="font-semibold" style={{ color: BARRETT.navy }}>{formatCurrency(projectCost * 0.5)}</span></div>
                  <div className="flex justify-between"><span>SBA CDC (40%):</span><span className="font-semibold" style={{ color: BARRETT.navy }}>{formatCurrency(projectCost * 0.4)}</span></div>
                  <div className="flex justify-between pt-1 border-t" style={{ borderColor: BARRETT.line }}>
                    <span>Borrower Required ({sba504Results.requiredEquityPct}%):</span>
                    <span className="font-semibold" style={{ color: BARRETT.navy }}>{formatCurrency(sba504Results.requiredEquityAmount)}</span>
                  </div>
                </div>
                <p className="text-xs mt-2 italic" style={{ color: BARRETT.slate }}>Standard 10% • Special-use OR startup 15% • Both 20%</p>
              </div>
            )}
          </div>

          <div className="space-y-5">
            <SectionHeading icon={Calculator}>Loan Terms & Borrower</SectionHeading>
            {is504 ? (
              <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>504 Loan Components</p>
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Bank (50%):</span><span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(sba504Results.bankAmount)}</span></div>
                  <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>CDC (40%):</span><span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(sba504Results.cdcAmount)}</span></div>
                  <div className="flex justify-between pt-1.5 border-t" style={{ borderColor: BARRETT.line }}>
                    <span className="font-semibold" style={{ color: BARRETT.navy }}>Total Loans:</span>
                    <span className="font-bold text-base" style={{ color: BARRETT.navy }}>{formatCurrency(sba504Results.bankAmount + sba504Results.cdcAmount)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>Estimated Loan Amount</p>
                <p className="text-2xl font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>{formatCurrency(projectCost - equity + (parseFloat(sbaInputs.workingCapital) || 0))}</p>
                <p className="text-xs mt-1" style={{ color: BARRETT.slate }}>Project cost − equity + working capital</p>
                {equityPct > 0 && (<p className="text-xs mt-2" style={{ color: BARRETT.navy }}>Equity injection: <strong>{equityPct.toFixed(1)}%</strong></p>)}
              </div>
            )}

            {is504 ? (
              <div className="space-y-4">
                <div className="p-3 rounded" style={{ backgroundColor: BARRETT.surface, border: `1px solid ${BARRETT.line}` }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>Bank Portion (50%)</p>
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="Bank Rate (%)" icon={Percent} type="number" step="0.01" value={sbaInputs.bankRate} onChange={(v) => setSbaInputs(p => ({ ...p, bankRate: v }))} hint="Conventional, may reset 5-10 yrs" />
                    <InputField label="Bank Amort (Yrs)" icon={Calendar} type="number" step="1" value={sbaInputs.bankTermYears} onChange={(v) => setSbaInputs(p => ({ ...p, bankTermYears: v }))} hint="Typically 25 yrs" />
                  </div>
                  <div className="mt-3">
                    <InputField label="Bank Rate Reset (Yrs)" icon={Clock} type="number" step="1" value={sbaInputs.bankResetYears} onChange={(v) => setSbaInputs(p => ({ ...p, bankResetYears: v }))} hint="Bank typically fixes rate 5-10 yrs, then resets" />
                  </div>
                </div>
                <div className="p-3 rounded" style={{ backgroundColor: '#F0FDF4', border: `1px solid ${BARRETT.green}33` }}>
                  <p className="text-xs font-bold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>CDC Portion (40%) — Fixed Long-Term</p>
                  <div className="grid grid-cols-2 gap-3">
                    <InputField label="CDC Rate (%)" icon={Percent} type="number" step="0.01" value={sbaInputs.cdcRate} onChange={(v) => setSbaInputs(p => ({ ...p, cdcRate: v }))} hint="Apr 2026: ~5.5–6.5%" />
                    <InputField label="CDC Term (Yrs)" icon={Calendar} type="number" step="1" value={sbaInputs.cdcTermYears} onChange={(v) => setSbaInputs(p => ({ ...p, cdcTermYears: v }))} hint="10, 20, or 25 yrs fixed" />
                  </div>
                </div>
              </div>
            ) : (
              <>
                <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={sbaInputs.interestRate} onChange={(v) => setSbaInputs(p => ({ ...p, interestRate: v }))} hint="7(a): Prime + 2.75–4.75% (Apr 2026 Prime ~7.5% → ~10.25–12.25%)" />
                <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="1" value={sbaInputs.loanTerm} onChange={(v) => setSbaInputs(p => ({ ...p, loanTerm: v }))} hint="7(a): up to 25 yrs RE, 10 yrs equipment/working cap" />
              </>
            )}

            <InputField label="Credit Score (FICO)" icon={Shield} type="number" step="1" value={sbaInputs.creditScore} onChange={(v) => setSbaInputs(p => ({ ...p, creditScore: v }))} hint="Lender threshold: 700+ preferred" />
            <InputField label="Months Post-Closing Liquidity" icon={Clock} type="number" step="1" value={sbaInputs.monthsLiquidity} onChange={(v) => setSbaInputs(p => ({ ...p, monthsLiquidity: v }))} hint="Cash reserves remaining after equity injection (startups need 6+ mo)" />

            <div className="space-y-2 pt-2">
              <label className="flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors hover:bg-slate-50" style={{ border: `1px solid ${BARRETT.line}` }}>
                <input type="checkbox" checked={sbaInputs.isUSCitizenOwned} onChange={(e) => setSbaInputs(p => ({ ...p, isUSCitizenOwned: e.target.checked }))} className="mt-0.5" />
                <div>
                  <div className="text-sm font-semibold" style={{ color: BARRETT.navy }}>100% US Citizen-Owned</div>
                  <div className="text-xs" style={{ color: BARRETT.slate }}>Required by SBA effective 3/1/2026. Otherwise, ask about conventional commercial.</div>
                </div>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-md cursor-pointer transition-colors hover:bg-slate-50" style={{ border: `1px solid ${BARRETT.line}` }}>
                <input type="checkbox" checked={sbaInputs.hasIndustryExperience} onChange={(e) => setSbaInputs(p => ({ ...p, hasIndustryExperience: e.target.checked }))} className="mt-0.5" />
                <div>
                  <div className="text-sm font-semibold" style={{ color: BARRETT.navy }}>Industry / Management Experience</div>
                  <div className="text-xs" style={{ color: BARRETT.slate }}>Direct experience in this business type</div>
                </div>
              </label>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
          <SectionHeading icon={CheckCircle2}>Qualification Snapshot</SectionHeading>
          <p className="text-sm mt-3 mb-4" style={{ color: BARRETT.slate }}>Quick assessment based on SBA underwriting criteria. Borderline deals can still close — multiple lenders have different overlays.</p>
          <div className="space-y-2">
            {sbaQualificationFlags.map((flag, idx) => {
              const colors = {
                green: { bg: '#F0FDF4', text: BARRETT.green, icon: CheckCircle2 },
                amber: { bg: '#FFFBEB', text: BARRETT.amber, icon: AlertCircle },
                red: { bg: '#FEF2F2', text: BARRETT.red, icon: AlertCircle },
              }[flag.type];
              const IconComp = colors.icon;
              return (
                <div key={idx} className="flex items-center gap-3 px-4 py-3 rounded-md" style={{ backgroundColor: colors.bg, border: `1px solid ${colors.text}33` }}>
                  <IconComp className="w-4 h-4 shrink-0" style={{ color: colors.text }} />
                  <span className="text-sm" style={{ color: BARRETT.ink }}>{flag.text}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderResultsPanel = () => {
    if (activeTab === 'purchase' && purchaseMode === 'maxLoan') {
      return (
        <div>
          <h2 className="text-lg font-bold mb-6 pb-3 border-b" style={{ color: BARRETT.navy, borderColor: BARRETT.line, fontFamily: FONT_STACK }}>Max Loan Analysis</h2>
          <div className="rounded-md p-6 mb-5" style={{ backgroundColor: BARRETT.navy, color: BARRETT.white }}>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(197, 158, 94, 0.3)' }}>
              <TrendingUp className="w-4 h-4" style={{ color: BARRETT.gold }} />
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: BARRETT.gold, letterSpacing: '0.15em' }}>Qualifying Loan</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Maximum You Qualify For</div>
                <div className="text-3xl font-bold" style={{ color: BARRETT.gold }}>{formatCurrency(maxLoanResults.qualifyingLoan)}</div>
                {maxLoanResults.governingConstraint && (
                  <div className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Constrained by: <span className="font-semibold">{maxLoanResults.governingConstraint}</span></div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Max by DSCR</div>
                  <div className="text-base font-bold">{formatCurrency(maxLoanResults.maxByDSCR)}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Max by LTV</div>
                  <div className="text-base font-bold">{formatCurrency(maxLoanResults.maxByLTV)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md p-6 mb-5" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}`, borderTop: `3px solid ${BARRETT.gold}` }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>Estimated Payment</h3>
            <div className="space-y-3">
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: BARRETT.slate }}>Monthly</div>
                <div className="text-2xl font-bold" style={{ color: BARRETT.navy }}>{formatCurrencyDetailed(maxLoanResults.monthlyPayment)}</div>
              </div>
              <div className="pt-3 border-t" style={{ borderColor: BARRETT.line }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: BARRETT.slate }}>Cap Rate</div>
                <div className="text-base font-semibold" style={{ color: BARRETT.navy }}>{formatPercent(maxLoanResults.capRate)}</div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div>
        <h2 className="text-lg font-bold mb-6 pb-3 border-b" style={{ color: BARRETT.navy, borderColor: BARRETT.line, fontFamily: FONT_STACK }}>Financial Summary</h2>
        <div className="rounded-md p-6 mb-5" style={{ backgroundColor: BARRETT.navy, color: BARRETT.white }}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(197, 158, 94, 0.3)' }}>
            <PieChart className="w-4 h-4" style={{ color: BARRETT.gold }} />
            <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: BARRETT.gold, letterSpacing: '0.15em' }}>Key Ratios</h3>
          </div>
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Loan Amount</div>
              <div className="text-2xl font-bold" style={{ color: BARRETT.white }}>{formatCurrency(results.loanAmount)}</div>
            </div>
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>LTV</div>
                <div className="text-lg font-bold">{formatPercent(results.ltv)}</div>
              </div>
              {results.capRate > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Cap Rate</div>
                  <div className="text-lg font-bold">{formatPercent(results.capRate)}</div>
                </div>
              )}
            </div>
            {results.dscr > 0 && (
              <div className="pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>DSCR</div>
                <div className="flex items-baseline gap-3">
                  <div className="text-2xl font-bold" style={{ color: getDSCRColor(results.dscr) }}>{results.dscr.toFixed(2)}x</div>
                  <div className="text-xs uppercase font-semibold tracking-wider" style={{ color: getDSCRColor(results.dscr), letterSpacing: '0.08em' }}>
                    {getDSCRStatus(results.dscr)}
                  </div>
                </div>
              </div>
            )}
            {results.debtYield > 0 && (
              <div className="grid grid-cols-2 gap-4 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Debt Yield</div>
                  <div className="text-base font-bold">{formatPercent(results.debtYield)}</div>
                </div>
                {results.cashOnCash !== 0 && (
                  <div>
                    <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Cash-on-Cash</div>
                    <div className="text-base font-bold" style={{ color: results.cashOnCash >= 0 ? BARRETT.gold : BARRETT.red }}>
                      {formatPercent(results.cashOnCash)}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="rounded-md p-6 mb-5" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}`, borderTop: `3px solid ${BARRETT.gold}` }}>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>Monthly Payments</h3>
          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: BARRETT.slate }}>
                {results.isInterestOnly ? 'Interest Only Payment' : 'Principal & Interest'}
              </div>
              <div className="text-2xl font-bold" style={{ color: BARRETT.navy }}>{formatCurrencyDetailed(results.monthlyPayment)}</div>
            </div>
            {!results.isInterestOnly && (
              <div className="pt-3 border-t" style={{ borderColor: BARRETT.line }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: BARRETT.slate }}>Interest Only</div>
                <div className="text-base font-semibold" style={{ color: BARRETT.slate }}>{formatCurrencyDetailed(results.interestOnlyPayment)}</div>
              </div>
            )}
            <div className="pt-3 border-t" style={{ borderColor: BARRETT.line }}>
              <div className="text-xs uppercase tracking-wider mb-1" style={{ color: BARRETT.slate }}>Annual Debt Service</div>
              <div className="text-lg font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(results.annualDebtService)}</div>
            </div>
            {results.brokerFee > 0 && (
              <div className="pt-3 border-t" style={{ borderColor: BARRETT.line }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: BARRETT.slate }}>Estimated Broker Fee</div>
                <div className="text-base font-semibold" style={{ color: BARRETT.gold }}>{formatCurrency(results.brokerFee)} <span className="text-xs" style={{ color: BARRETT.slate }}>({results.brokerFeeRate?.toFixed(2)}%)</span></div>
              </div>
            )}
          </div>
        </div>
        <button onClick={() => setShowSchedule(!showSchedule)}
          className="w-full py-3 px-4 rounded-md font-medium transition-all hover:opacity-90 text-sm uppercase tracking-wider"
          style={{ backgroundColor: BARRETT.navy, color: BARRETT.white, fontFamily: FONT_STACK, letterSpacing: '0.1em' }}>
          {showSchedule ? 'Hide' : 'Show'} {results.isInterestOnly ? 'Payment' : 'Amortization'} Schedule
        </button>
      </div>
    );
  };

  const render504ResultsPanel = () => (
    <div className="lg:col-span-4 grid md:grid-cols-3 gap-5">
      <div className="rounded-md p-6" style={{ backgroundColor: BARRETT.navy, color: BARRETT.white }}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(197, 158, 94, 0.3)' }}>
          <Layers className="w-4 h-4" style={{ color: BARRETT.gold }} />
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: BARRETT.gold, letterSpacing: '0.15em' }}>Bank Portion (50%)</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span style={{ color: '#94A3B8' }}>Amount:</span><span className="font-bold">{formatCurrency(sba504Results.bankAmount)}</span></div>
          <div className="flex justify-between"><span style={{ color: '#94A3B8' }}>Rate:</span><span className="font-bold">{sbaInputs.bankRate}%</span></div>
          <div className="flex justify-between"><span style={{ color: '#94A3B8' }}>Amort:</span><span className="font-bold">{sbaInputs.bankTermYears} yrs</span></div>
          <div className="flex justify-between"><span style={{ color: '#94A3B8' }}>Resets:</span><span className="font-bold">{sbaInputs.bankResetYears} yrs</span></div>
          <div className="flex justify-between pt-2 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
            <span style={{ color: '#94A3B8' }}>Monthly:</span>
            <span className="font-bold text-base" style={{ color: BARRETT.gold }}>{formatCurrencyDetailed(sba504Results.bankPayment)}</span>
          </div>
        </div>
      </div>
      <div className="rounded-md p-6" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}`, borderTop: `3px solid ${BARRETT.green}` }}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: BARRETT.line }}>
          <Shield className="w-4 h-4" style={{ color: BARRETT.green }} />
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>CDC Portion (40%)</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Amount:</span><span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(sba504Results.cdcAmount)}</span></div>
          <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Rate:</span><span className="font-bold" style={{ color: BARRETT.navy }}>{sbaInputs.cdcRate}% <span className="text-xs italic">fixed</span></span></div>
          <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Term:</span><span className="font-bold" style={{ color: BARRETT.navy }}>{sbaInputs.cdcTermYears} yrs</span></div>
          <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Reset:</span><span className="font-bold" style={{ color: BARRETT.green }}>None — fully fixed</span></div>
          <div className="flex justify-between pt-2 border-t" style={{ borderColor: BARRETT.line }}>
            <span style={{ color: BARRETT.slate }}>Monthly:</span>
            <span className="font-bold text-base" style={{ color: BARRETT.navy }}>{formatCurrencyDetailed(sba504Results.cdcPayment)}</span>
          </div>
        </div>
      </div>
      <div className="rounded-md p-6" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}`, borderTop: `3px solid ${BARRETT.gold}` }}>
        <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: BARRETT.line }}>
          <Calculator className="w-4 h-4" style={{ color: BARRETT.gold }} />
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>Blended (Total)</h3>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Total Loans:</span><span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(sba504Results.bankAmount + sba504Results.cdcAmount)}</span></div>
          <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Borrower Equity:</span><span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(sba504Results.equityAmount)}</span></div>
          {results.dscr > 0 && (
            <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>DSCR:</span><span className="font-bold" style={{ color: getDSCRColor(results.dscr) }}>{results.dscr.toFixed(2)}x</span></div>
          )}
          <div className="flex justify-between pt-2 border-t" style={{ borderColor: BARRETT.line }}>
            <span style={{ color: BARRETT.slate, fontWeight: 600 }}>Total Monthly:</span>
            <span className="font-bold text-lg" style={{ color: BARRETT.gold }}>{formatCurrencyDetailed(sba504Results.blendedPayment)}</span>
          </div>
          <div className="text-xs italic mt-2" style={{ color: BARRETT.slate }}>
            Bank portion will reset rate at year {sbaInputs.bankResetYears}; CDC stays fixed.
          </div>
        </div>
      </div>
    </div>
  );

  const renderPresets = () => {
    const presets = PRESETS[activeTab];
    if (!presets || !presets.length) return null;
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Zap className="w-4 h-4" style={{ color: BARRETT.gold }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>Quick Start: Common Scenarios</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map((preset, idx) => {
            const Icon = preset.icon;
            return (
              <button key={idx} onClick={() => applyPreset(preset)}
                className="px-3 py-2 rounded-md text-xs font-semibold transition-all hover:bg-white flex items-center gap-2"
                style={{ backgroundColor: BARRETT.surface, color: BARRETT.navy, border: `1px solid ${BARRETT.line}`, fontFamily: FONT_STACK }}>
                <Icon className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
                {preset.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const renderMikesTakeCard = () => {
    if (!mikesInsights || mikesInsights.length === 0) return null;
    const firstName = ADVISOR.name.split(' ')[0];
    return (
      <div className="rounded-md p-6 mb-5" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}`, borderTop: `3px solid ${BARRETT.navy}` }}>
        <div className="flex items-center gap-3 mb-4 pb-3 border-b" style={{ borderColor: BARRETT.line }}>
          <AdvisorAvatar size={42} />
          <div>
            <div className="text-sm font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>{firstName}'s Take</div>
            <div className="text-xs" style={{ color: BARRETT.slate }}>Quick read on this scenario</div>
          </div>
        </div>
        <ul className="space-y-2.5">
          {mikesInsights.map((insight, idx) => {
            const config = {
              positive: { color: BARRETT.green, icon: CheckCircle2 },
              neutral: { color: BARRETT.amber, icon: AlertCircle },
              concern: { color: BARRETT.red, icon: AlertCircle },
            }[insight.tone];
            const IconComp = config.icon;
            return (
              <li key={idx} className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: BARRETT.ink }}>
                <IconComp className="w-4 h-4 shrink-0 mt-0.5" style={{ color: config.color }} />
                <span>{insight.text}</span>
              </li>
            );
          })}
        </ul>
        <div className="mt-4 pt-4 border-t text-xs italic" style={{ borderColor: BARRETT.line, color: BARRETT.slate }}>
          Quick reads only — not a commitment to lend. Final terms set by underwriting.
        </div>
      </div>
    );
  };

  const renderAdvisorMiniCard = () => (
    <div className="rounded-lg shadow-sm mb-6 overflow-hidden no-print" style={{ backgroundColor: BARRETT.white, borderTop: `3px solid ${BARRETT.gold}` }}>
      <div className="px-6 py-4 flex items-center gap-4 flex-wrap">
        <AdvisorAvatar size={56} />
        <div className="flex-1 min-w-[200px]">
          <div className="flex items-baseline gap-3 flex-wrap">
            <div className="text-base font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>{ADVISOR.name}</div>
            <div className="text-xs uppercase tracking-wider" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>{ADVISOR.titleLine2}</div>
          </div>
          <div className="text-xs mt-1.5 flex items-center gap-1.5" style={{ color: BARRETT.slate }}>
            <Clock className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
            {ADVISOR.callbackPromise}
          </div>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <a href={`tel:${ADVISOR.phoneRaw}`} onClick={() => trackEvent('commercial_calculator_call_click', { location: 'advisor_mini_card' })} className="text-sm font-semibold flex items-center gap-1.5 hover:underline" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>
            <Phone className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
            {ADVISOR.phone}
          </a>
          <button onClick={handleScheduleCall}
            className="text-xs uppercase tracking-wider font-semibold flex items-center gap-1.5 px-3 py-2 rounded transition-all hover:opacity-90"
            style={{ backgroundColor: BARRETT.navy, color: BARRETT.white, fontFamily: FONT_STACK, letterSpacing: '0.08em' }}>
            <CalendarCheck className="w-3.5 h-3.5" />
            Book a Call
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: BARRETT.surface, fontFamily: FONT_STACK, color: BARRETT.ink }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ backgroundColor: BARRETT.navy, color: BARRETT.white }}>
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: BARRETT.gold, letterSpacing: '0.18em' }}>Barrett Financial Group · Commercial Division</p>
              <h1 className="text-3xl font-bold" style={{ fontFamily: FONT_STACK }}>Commercial Real Estate Calculator</h1>
              <p className="text-sm mt-2" style={{ color: '#CBD5E1' }}>Run scenarios • See lender-grade ratios</p>
            </div>
            <div className="flex gap-2 no-print">
              <button onClick={resetCurrentTab}
                className="px-4 py-2.5 rounded-md text-xs font-semibold transition-all hover:bg-white/10 flex items-center gap-2"
                style={{ border: `1px solid rgba(255,255,255,0.3)`, color: BARRETT.white, fontFamily: FONT_STACK }}>
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="border-b sticky top-0 z-30 no-print" style={{ borderColor: BARRETT.line, backgroundColor: BARRETT.white }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-1 overflow-x-auto">
            {tabs.map(tab => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button key={tab.id} onClick={() => { trackEvent('commercial_calculator_tab_change', { tab: tab.id }); setActiveTab(tab.id); setPurchaseMode('payment'); }}
                  className="px-4 py-4 flex items-center gap-2 text-sm font-semibold transition-all whitespace-nowrap"
                  style={{
                    color: isActive ? BARRETT.navy : BARRETT.slate,
                    borderBottom: `3px solid ${isActive ? BARRETT.gold : 'transparent'}`,
                    fontFamily: FONT_STACK,
                  }}>
                  <Icon className="w-4 h-4" style={{ color: isActive ? BARRETT.gold : BARRETT.slate }} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Advisor mini-card — top-of-page trust signal */}
        {renderAdvisorMiniCard()}

        {/* Purchase mode toggle (Max Loan) */}
        {activeTab === 'purchase' && (
          <div className="mb-6 no-print">
            <div className="flex gap-2">
              <button onClick={() => setPurchaseMode('payment')}
                className="px-4 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: purchaseMode === 'payment' ? BARRETT.navy : BARRETT.white,
                  color: purchaseMode === 'payment' ? BARRETT.white : BARRETT.slate,
                  border: `1px solid ${purchaseMode === 'payment' ? BARRETT.navy : BARRETT.line}`,
                  fontFamily: FONT_STACK,
                }}>
                <Calculator className="w-3.5 h-3.5" /> Payment Calculator
              </button>
              <button onClick={() => setPurchaseMode('maxLoan')}
                className="px-4 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: purchaseMode === 'maxLoan' ? BARRETT.navy : BARRETT.white,
                  color: purchaseMode === 'maxLoan' ? BARRETT.white : BARRETT.slate,
                  border: `1px solid ${purchaseMode === 'maxLoan' ? BARRETT.navy : BARRETT.line}`,
                  fontFamily: FONT_STACK,
                }}>
                <ArrowUpDown className="w-3.5 h-3.5" /> Max Loan Reverse-Calc
              </button>
            </div>
          </div>
        )}

        {/* Presets row */}
        <div className="no-print">{renderPresets()}</div>

        {/* 4-column layout: inputs (2 cols) | results (1 col) | Mike's Take (1 col) */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* INPUT PANEL */}
          <div className={`${activeTab === 'development' || activeTab === 'sba' || activeTab === 'bridge' ? 'lg:col-span-4' : 'lg:col-span-2'} rounded-lg p-6 lg:p-8`} style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
            {activeTab === 'purchase' && renderPurchaseInputs()}
            {activeTab === 'rateTerm' && renderRateTermInputs()}
            {activeTab === 'cashOut' && renderCashOutInputs()}
            {activeTab === 'development' && renderDevelopmentInputs()}
            {activeTab === 'bridge' && renderBridgeInputs()}
            {activeTab === 'sba' && renderSBAInputs()}
          </div>

          {/* RESULTS PANEL — own column for purchase/rateTerm/cashOut */}
          {(activeTab === 'purchase' || activeTab === 'rateTerm' || activeTab === 'cashOut') && (
            <>
              <div className="lg:col-span-1 lg:sticky lg:top-20 lg:self-start">
                <div className="rounded-lg p-6" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
                  {renderResultsPanel()}
                </div>
              </div>
              {/* Mike's Take — own dedicated column, side-by-side with results */}
              {!(activeTab === 'purchase' && purchaseMode === 'maxLoan') && (
                <div className="lg:col-span-1 lg:sticky lg:top-20 lg:self-start">
                  {renderMikesTakeCard()}
                </div>
              )}
            </>
          )}

          {/* For development/bridge/sba: results render full-width within their own panels (handled by render functions) */}
          {(activeTab === 'development' || activeTab === 'bridge') && (
            <div className="lg:col-span-4">
              <div className="rounded-lg p-6" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
                {renderResultsPanel()}
              </div>
              {/* Mike's Take full-width below results for transitional deals */}
              {mikesInsights && mikesInsights.length > 0 && (
                <div className="mt-5">
                  {renderMikesTakeCard()}
                </div>
              )}
            </div>
          )}

          {activeTab === 'sba' && (
            <div className="lg:col-span-4">
              <div className="rounded-lg p-6" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
                {renderResultsPanel()}
              </div>
              {/* SBA 504 dual-loan 3-card breakdown */}
              {sbaInputs.program === '504' && (
                <div className="mt-6 grid lg:grid-cols-3 gap-5">
                  {render504ResultsPanel()}
                </div>
              )}
              {/* Mike's Take full-width below SBA results */}
              {mikesInsights && mikesInsights.length > 0 && (
                <div className="mt-5">
                  {renderMikesTakeCard()}
                </div>
              )}
            </div>
          )}
        </div>

        {/* AMORTIZATION SCHEDULE */}
        {showSchedule && amortizationSchedule.length > 0 && (
          <div className="mt-8 rounded-lg p-6 overflow-x-auto" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: BARRETT.navy, letterSpacing: '0.1em' }}>
              {results.isInterestOnly ? 'Payment' : 'Amortization'} Schedule
            </h3>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: BARRETT.surface, borderBottom: `2px solid ${BARRETT.gold}` }}>
                  <th className="px-3 py-2 text-left text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Month</th>
                  <th className="px-3 py-2 text-right text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Payment</th>
                  <th className="px-3 py-2 text-right text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Principal</th>
                  <th className="px-3 py-2 text-right text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Interest</th>
                  <th className="px-3 py-2 text-right text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Balance</th>
                </tr>
              </thead>
              <tbody>
                {amortizationSchedule.map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: `1px solid ${BARRETT.line}` }}>
                    <td className="px-3 py-2" style={{ color: BARRETT.ink }}>{row.month}</td>
                    <td className="px-3 py-2 text-right" style={{ color: BARRETT.ink }}>{formatCurrencyDetailed(row.payment)}</td>
                    <td className="px-3 py-2 text-right" style={{ color: BARRETT.ink }}>{formatCurrencyDetailed(row.principal)}</td>
                    <td className="px-3 py-2 text-right" style={{ color: BARRETT.ink }}>{formatCurrencyDetailed(row.interest)}</td>
                    <td className="px-3 py-2 text-right font-semibold" style={{ color: BARRETT.navy }}>{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DRAW SCHEDULE TABLE (development) */}
        {showDrawSchedule && drawSchedule.length > 0 && (
          <div className="mt-8 rounded-lg p-6 overflow-x-auto" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: BARRETT.navy, letterSpacing: '0.1em' }}>Detailed Draw Schedule</h3>
            <table className="w-full text-sm">
              <thead>
                <tr style={{ backgroundColor: BARRETT.surface, borderBottom: `2px solid ${BARRETT.gold}` }}>
                  <th className="px-3 py-2 text-left text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Month</th>
                  <th className="px-3 py-2 text-right text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Draw</th>
                  <th className="px-3 py-2 text-right text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Cumulative Balance</th>
                  <th className="px-3 py-2 text-right text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Interest This Month</th>
                  <th className="px-3 py-2 text-right text-xs uppercase tracking-wider" style={{ color: BARRETT.navy }}>Cumulative Interest</th>
                </tr>
              </thead>
              <tbody>
                {drawSchedule.filter(r => r.draw > 0 || r.month % 3 === 0 || r.month === drawSchedule.length).map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: `1px solid ${BARRETT.line}` }}>
                    <td className="px-3 py-2" style={{ color: BARRETT.ink }}>{row.month}</td>
                    <td className="px-3 py-2 text-right" style={{ color: row.draw > 0 ? BARRETT.gold : BARRETT.slate, fontWeight: row.draw > 0 ? 600 : 400 }}>{row.draw > 0 ? formatCurrency(row.draw) : '—'}</td>
                    <td className="px-3 py-2 text-right" style={{ color: BARRETT.ink }}>{formatCurrency(row.cumulativeBalance)}</td>
                    <td className="px-3 py-2 text-right" style={{ color: BARRETT.ink }}>{formatCurrencyDetailed(row.monthlyInterest)}</td>
                    <td className="px-3 py-2 text-right font-semibold" style={{ color: BARRETT.navy }}>{formatCurrency(row.cumulativeInterest)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CTA SECTION — friction-ordered: Schedule (fastest) > Email > Submit */}
        <div className="mt-6 rounded-lg shadow-sm overflow-hidden no-print" style={{ backgroundColor: BARRETT.white, borderTop: `4px solid ${BARRETT.gold}` }}>
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>
                Ready to take this from spreadsheet to deal?
              </h2>
              <p className="text-sm mt-2" style={{ color: BARRETT.slate }}>
                {ADVISOR.name.split(' ')[0]} can pull live quotes from 3,000+ commercial lenders.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {/* PRIMARY: Schedule a Call */}
              <button onClick={handleScheduleCall}
                className="p-6 rounded-md text-left transition-all hover:opacity-95"
                style={{ backgroundColor: BARRETT.gold, color: BARRETT.white, fontFamily: FONT_STACK }}>
                <CalendarCheck className="w-7 h-7 mb-3" style={{ color: BARRETT.white }} />
                <div className="font-bold text-base mb-1">Schedule a Call</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  Book 15 minutes directly with {ADVISOR.name.split(' ')[0]} — opens his calendar.
                </div>
              </button>

              {/* SECONDARY: Call Direct */}
              <a href={`tel:${ADVISOR.phoneRaw}`} onClick={() => trackEvent('commercial_calculator_call_click', { location: 'cta_section' })}
                className="p-6 rounded-md text-left transition-all hover:opacity-95 block"
                style={{ backgroundColor: BARRETT.navy, color: BARRETT.white, fontFamily: FONT_STACK, textDecoration: 'none' }}>
                <Phone className="w-7 h-7 mb-3" style={{ color: BARRETT.gold }} />
                <div className="font-bold text-base mb-1">Call {ADVISOR.name.split(' ')[0]} Direct</div>
                <div className="text-xs" style={{ color: '#CBD5E1' }}>
                  {ADVISOR.phone} — {ADVISOR.callbackPromise.toLowerCase()}.
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* ADVISOR FOOTER CARD */}
        <div className="mt-8 rounded-lg p-6 lg:p-8" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            <div className="flex items-start gap-4">
              <AdvisorAvatar size={106} />
              <div>
                <p className="text-lg font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>{ADVISOR.name}</p>
                <p className="text-xs" style={{ color: BARRETT.slate }}>{ADVISOR.titleLine1}</p>
                <p className="text-xs" style={{ color: BARRETT.slate }}>{ADVISOR.titleLine2}</p>
                <p className="text-xs mt-2" style={{ color: BARRETT.navy }}>NMLS #{ADVISOR.personalNMLS} | Corp #{ADVISOR.corpNMLS}</p>
              </div>
            </div>
            <div className="space-y-2 text-sm" style={{ color: BARRETT.slate }}>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
                <a href={`tel:${ADVISOR.phoneRaw}`} onClick={() => trackEvent('commercial_calculator_call_click', { location: 'footer_card' })} className="hover:underline" style={{ color: BARRETT.navy }}>{ADVISOR.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
                <a href={`mailto:${ADVISOR.email}`} className="hover:underline" style={{ color: BARRETT.navy }}>{ADVISOR.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
                <a href={ADVISOR.websiteUrl} target="_blank" rel="noopener noreferrer" className="hover:underline" style={{ color: BARRETT.navy }}>{ADVISOR.websiteDisplay}</a>
              </div>
              {(ADVISOR.officeAddress1 || ADVISOR.officeAddress2) && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5" style={{ color: BARRETT.gold }} />
                  <div className="text-xs">
                    {ADVISOR.officeAddress1 && <div>{ADVISOR.officeAddress1}</div>}
                    {ADVISOR.officeAddress2 && <div>{ADVISOR.officeAddress2}</div>}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* DISCLAIMER */}
        <p className="text-xs text-center mt-6 px-4" style={{ color: BARRETT.slate, lineHeight: '1.6' }}>
          Calculations are estimates only. Actual rates, terms, and qualification depend on lender review of full application, property analysis, sponsor strength, and current market conditions. Not a commitment to lend. Equal Housing Lender. Barrett Financial Group, L.L.C. NMLS #181106.
        </p>
      </div>
    </div>
  );
};

export default CommercialRealEstateCalculator;
