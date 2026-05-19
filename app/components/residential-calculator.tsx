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
const Home = createIcon("Home");
const PieChart = createIcon("Pie chart");
const RefreshCw = createIcon("Refresh");
const Banknote = createIcon("Banknote");
const Phone = createIcon("Phone");
const Mail = createIcon("Mail");
const Globe = createIcon("Globe");
const MapPin = createIcon("Map pin");
const FileText = createIcon("File text");
const CalendarCheck = createIcon("Calendar check");
const Info = createIcon("Info");
const CheckCircle2 = createIcon("Check");
const AlertCircle = createIcon("Alert");
const Shield = createIcon("Shield");
const Clock = createIcon("Clock");
const Zap = createIcon("Zap");
const Building = createIcon("Building");
const Heart = createIcon("Heart");
const Star = createIcon("Star");
const Flag = createIcon("Flag");
const Briefcase = createIcon("Briefcase");
const BarChart = createIcon("Bar chart");
const RotateCcw = createIcon("Rotate");
const ArrowUpDown = createIcon("Arrow up down");
const Key = createIcon("Key");
const Layers = createIcon("Layers");

const ADVISOR = {
  name: "Chris Butler",
  titleLine1: "Mortgage Loan Originator",
  titleLine2: "Residential Loan Advisor",
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
  divisionCC: "residential@barrettfinancial.com",
  scenarioFormUrl: "https://massifmortgageforms.fillout.com/t/sdDvnvf7SLus",
};

// LP = The Loan Playbook design tokens (violet on near-black editorial canvas).
// Variable name `BARRETT` retained throughout the file as a stable token alias.
const BARRETT = {
  navy: '#050505',       // canvas / primary dark
  navyDeep: '#000000',   // deepest contrast
  navyHover: '#18181b',  // zinc-900 hover surface
  gold: '#7c3aed',       // violet-600 — primary accent
  goldSoft: '#c4b5fd',   // violet-300 — soft accent
  goldDeep: '#5b21b6',   // violet-800 — deep accent
  ink: '#0a0a0a',        // body text on light surfaces
  slate: '#71717a',      // zinc-500 — muted text
  line: '#e4e4e7',       // zinc-200 — hairlines
  surface: '#fafafa',    // zinc-50 — light surface
  white: '#FFFFFF',
  green: '#16A34A',
  amber: '#CA8A04',
  red: '#DC2626',
  // Editorial extensions:
  violetSurface: '#ede9fe', // violet-50 — soft fill on white
  violetTint: '#f5f3ff',    // violet-50 lighter — tab hover bg
  zincDark: '#18181b',      // zinc-900 — dark card bg
  zincMid: '#27272a',       // zinc-800 — dark card borders
};

const FONT_STACK = "'Geist', 'Geist Fallback', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Helvetica, Arial, sans-serif";
const MONO_STACK = "'Geist Mono', 'Geist Mono Fallback', ui-monospace, SFMono-Regular, Menlo, monospace";

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

const LoanProductField = ({ value, onChange, options }) => (
  <div>
    <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
      <Calculator className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
      Loan Product
    </label>
    <div className="grid grid-cols-2 gap-2">
      {options.map(opt => (
        <button key={opt.id} type="button" onClick={() => onChange(opt.id)}
          className="px-3 py-2.5 rounded-md font-medium transition-all text-xs text-left"
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
    occupancy: 'primary',
    loanProgram: 'conventional',
    purchasePrice: 550000, downPayment: 110000, downPaymentMode: 'dollar', downPaymentPct: 20, loanAmount: 440000,
    interestRate: 6.75, loanTerm: 30,
    propertyTaxRate: 1.1, homeInsuranceAnnual: 1800, hoaMonthly: 0,
    grossMonthlyIncome: 9500, monthlyDebts: 650,
    creditScore: 740, closingCostsPct: 3.0,
  },
  rateTerm: {
    homeValue: 650000, currentLoanBalance: 425000, closingCosts: 6500,
    interestRate: 6.25, loanTerm: 30,
    currentRate: 7.5, currentPayment: 2970,
    propertyTaxRate: 1.1, homeInsuranceAnnual: 1800, hoaMonthly: 0,
    grossMonthlyIncome: 9500, monthlyDebts: 650, creditScore: 740,
  },
  cashOut: {
    homeValue: 750000, currentLoanBalance: 350000, cashOutAmount: 100000, closingCosts: 8000,
    interestRate: 6.85, loanTerm: 30,
    propertyTaxRate: 1.1, homeInsuranceAnnual: 1800, hoaMonthly: 0,
    cashOutPurpose: 'home-improvement',
    grossMonthlyIncome: 9500, monthlyDebts: 650, creditScore: 740,
  },
  heloc: {
    homeValue: 750000, currentMortgageBalance: 350000, creditLineRequested: 100000,
    interestRate: 8.5, drawPeriodYears: 10, repaymentPeriodYears: 20,
    grossMonthlyIncome: 9500, monthlyDebts: 650, creditScore: 740,
  },
  fha: {
    purchasePrice: 425000, downPayment: 14875, downPaymentPct: 3.5,
    interestRate: 6.5, loanTerm: 30,
    propertyTaxRate: 1.1, homeInsuranceAnnual: 1500, hoaMonthly: 0,
    grossMonthlyIncome: 7500, monthlyDebts: 500, creditScore: 680,
    isFirstTimeBuyer: true,
  },
  va: {
    purchasePrice: 525000, downPayment: 0,
    interestRate: 6.25, loanTerm: 30,
    propertyTaxRate: 1.1, homeInsuranceAnnual: 1700, hoaMonthly: 0,
    grossMonthlyIncome: 8500, monthlyDebts: 550, creditScore: 720,
    isFirstTimeUse: true, hasDisabilityRating: false, serviceCategory: 'regular',
  },
  investor: {
    investorMode: 'dscr', // 'dscr' | 'bankStatement'
    // Shared
    purchasePrice: 550000, downPayment: 137500, downPaymentPct: 25,
    interestRate: 7.875, loanTerm: 30,
    propertyTaxRate: 1.1, homeInsuranceAnnual: 2400, hoaMonthly: 0,
    creditScore: 740,
    prepayPenalty: 'none', // 'none' | '3yr' | '5yr'
    // DSCR-specific
    monthlyRent: 4200,
    vacancyRate: 5,
    propertyMgmtPct: 8,
    targetDSCR: 1.0,
    // Bank Statement-specific
    statementMonths: 12, // 12 or 24
    monthlyBankDeposits: 38000,
    expenseFactor: 50, // % treated as expenses
    monthlyDebts: 850,
  },
  affordability: {
    grossAnnualIncome: 120000, monthlyDebts: 650,
    downPayment: 80000, interestRate: 6.75, loanTerm: 30,
    propertyTaxRate: 1.1, homeInsuranceAnnual: 1800, hoaMonthly: 0,
    targetDTI: 43, creditScore: 740,
  },
};

const PRESETS = {
  purchase: [
    { label: 'First-Time Buyer', icon: Key, values: { occupancy: 'primary', loanProgram: 'conventional', purchasePrice: 425000, downPayment: 21250, downPaymentMode: 'dollar', downPaymentPct: 5, loanAmount: 403750, interestRate: 6.75, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 1500, hoaMonthly: 0, grossMonthlyIncome: 7500, monthlyDebts: 450, creditScore: 720, closingCostsPct: 3.0 } },
    { label: 'Move-Up Home', icon: Home, values: { occupancy: 'primary', loanProgram: 'conventional', purchasePrice: 750000, downPayment: 150000, downPaymentMode: 'dollar', downPaymentPct: 20, loanAmount: 600000, interestRate: 6.5, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 2200, hoaMonthly: 0, grossMonthlyIncome: 14000, monthlyDebts: 800, creditScore: 760, closingCostsPct: 2.5 } },
    { label: 'Jumbo', icon: Star, values: { occupancy: 'primary', loanProgram: 'jumbo', purchasePrice: 1500000, downPayment: 300000, downPaymentMode: 'dollar', downPaymentPct: 20, loanAmount: 1200000, interestRate: 6.85, loanTerm: 30, propertyTaxRate: 1.2, homeInsuranceAnnual: 4500, hoaMonthly: 0, grossMonthlyIncome: 25000, monthlyDebts: 1500, creditScore: 780, closingCostsPct: 2.0 } },
    { label: 'Second Home', icon: Heart, values: { occupancy: 'second-home', loanProgram: 'conventional', purchasePrice: 600000, downPayment: 60000, downPaymentMode: 'dollar', downPaymentPct: 10, loanAmount: 540000, interestRate: 7.0, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 2000, hoaMonthly: 250, grossMonthlyIncome: 16000, monthlyDebts: 1200, creditScore: 760, closingCostsPct: 2.5 } },
    { label: 'Investment Property', icon: Building, values: { occupancy: 'investment', loanProgram: 'conventional', purchasePrice: 400000, downPayment: 100000, downPaymentMode: 'dollar', downPaymentPct: 25, loanAmount: 300000, interestRate: 7.25, loanTerm: 30, propertyTaxRate: 1.2, homeInsuranceAnnual: 1800, hoaMonthly: 0, grossMonthlyIncome: 12000, monthlyDebts: 700, creditScore: 740, closingCostsPct: 3.0 } },
  ],
  rateTerm: [
    { label: 'Drop From 7.5% → 6.25%', icon: TrendingUp, values: { homeValue: 650000, currentLoanBalance: 425000, closingCosts: 6500, interestRate: 6.25, loanTerm: 30, currentRate: 7.5, currentPayment: 2970, propertyTaxRate: 1.1, homeInsuranceAnnual: 1800, hoaMonthly: 0, grossMonthlyIncome: 9500, monthlyDebts: 650, creditScore: 740 } },
    { label: '30 → 15 Year', icon: Clock, values: { homeValue: 750000, currentLoanBalance: 400000, closingCosts: 6000, interestRate: 5.75, loanTerm: 15, currentRate: 6.75, currentPayment: 2594, propertyTaxRate: 1.1, homeInsuranceAnnual: 2000, hoaMonthly: 0, grossMonthlyIncome: 14000, monthlyDebts: 600, creditScore: 770 } },
    { label: 'Remove PMI', icon: Shield, values: { homeValue: 525000, currentLoanBalance: 380000, closingCosts: 5500, interestRate: 6.5, loanTerm: 30, currentRate: 6.75, currentPayment: 2515, propertyTaxRate: 1.1, homeInsuranceAnnual: 1700, hoaMonthly: 0, grossMonthlyIncome: 8500, monthlyDebts: 500, creditScore: 740 } },
  ],
  cashOut: [
    { label: 'Home Improvement', icon: Home, values: { homeValue: 750000, currentLoanBalance: 350000, cashOutAmount: 100000, closingCosts: 8000, interestRate: 6.85, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 1800, hoaMonthly: 0, cashOutPurpose: 'home-improvement', grossMonthlyIncome: 9500, monthlyDebts: 650, creditScore: 740 } },
    { label: 'Debt Consolidation', icon: Banknote, values: { homeValue: 600000, currentLoanBalance: 280000, cashOutAmount: 60000, closingCosts: 6500, interestRate: 6.85, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 1700, hoaMonthly: 0, cashOutPurpose: 'debt-consolidation', grossMonthlyIncome: 8500, monthlyDebts: 1800, creditScore: 720 } },
    { label: 'Investment Capital', icon: TrendingUp, values: { homeValue: 900000, currentLoanBalance: 380000, cashOutAmount: 200000, closingCosts: 10000, interestRate: 7.0, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 2200, hoaMonthly: 0, cashOutPurpose: 'investment', grossMonthlyIncome: 16000, monthlyDebts: 800, creditScore: 760 } },
  ],
  heloc: [
    { label: 'Standard HELOC', icon: Layers, values: { homeValue: 750000, currentMortgageBalance: 350000, creditLineRequested: 100000, interestRate: 8.5, drawPeriodYears: 10, repaymentPeriodYears: 20, grossMonthlyIncome: 9500, monthlyDebts: 650, creditScore: 740 } },
    { label: 'Large Equity Line', icon: Banknote, values: { homeValue: 1200000, currentMortgageBalance: 400000, creditLineRequested: 300000, interestRate: 8.25, drawPeriodYears: 10, repaymentPeriodYears: 20, grossMonthlyIncome: 18000, monthlyDebts: 900, creditScore: 770 } },
  ],
  fha: [
    { label: 'FTHB Low Down', icon: Key, values: { purchasePrice: 425000, downPayment: 14875, downPaymentPct: 3.5, interestRate: 6.5, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 1500, hoaMonthly: 0, grossMonthlyIncome: 7500, monthlyDebts: 500, creditScore: 680, isFirstTimeBuyer: true } },
    { label: 'Repeat Buyer FHA', icon: Home, values: { purchasePrice: 350000, downPayment: 12250, downPaymentPct: 3.5, interestRate: 6.5, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 1400, hoaMonthly: 0, grossMonthlyIncome: 6500, monthlyDebts: 600, creditScore: 700, isFirstTimeBuyer: false } },
  ],
  va: [
    { label: 'First-Time VA Use', icon: Flag, values: { purchasePrice: 525000, downPayment: 0, interestRate: 6.25, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 1700, hoaMonthly: 0, grossMonthlyIncome: 8500, monthlyDebts: 550, creditScore: 720, isFirstTimeUse: true, hasDisabilityRating: false, serviceCategory: 'regular' } },
    { label: 'Disabled Veteran (Fee Waived)', icon: Shield, values: { purchasePrice: 525000, downPayment: 0, interestRate: 6.25, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 1700, hoaMonthly: 0, grossMonthlyIncome: 8500, monthlyDebts: 550, creditScore: 720, isFirstTimeUse: true, hasDisabilityRating: true, serviceCategory: 'regular' } },
    { label: 'Subsequent VA Use', icon: Flag, values: { purchasePrice: 625000, downPayment: 0, interestRate: 6.25, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 1900, hoaMonthly: 0, grossMonthlyIncome: 10000, monthlyDebts: 700, creditScore: 740, isFirstTimeUse: false, hasDisabilityRating: false, serviceCategory: 'regular' } },
  ],
  investor: [
    { label: 'DSCR · Cash-Flowing Rental', icon: BarChart, values: { investorMode: 'dscr', purchasePrice: 450000, downPayment: 112500, downPaymentPct: 25, interestRate: 7.875, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 2000, hoaMonthly: 0, creditScore: 740, prepayPenalty: '3yr', monthlyRent: 3800, vacancyRate: 5, propertyMgmtPct: 8, targetDSCR: 1.0, statementMonths: 12, monthlyBankDeposits: 35000, expenseFactor: 50, monthlyDebts: 800 } },
    { label: 'DSCR · Tight Coverage', icon: TrendingUp, values: { investorMode: 'dscr', purchasePrice: 650000, downPayment: 162500, downPaymentPct: 25, interestRate: 8.125, loanTerm: 30, propertyTaxRate: 1.2, homeInsuranceAnnual: 2800, hoaMonthly: 150, creditScore: 720, prepayPenalty: '5yr', monthlyRent: 4500, vacancyRate: 5, propertyMgmtPct: 8, targetDSCR: 1.0, statementMonths: 12, monthlyBankDeposits: 35000, expenseFactor: 50, monthlyDebts: 800 } },
    { label: 'Bank Statement · 12-mo', icon: Briefcase, values: { investorMode: 'bankStatement', purchasePrice: 750000, downPayment: 150000, downPaymentPct: 20, interestRate: 8.25, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 2400, hoaMonthly: 0, creditScore: 740, prepayPenalty: 'none', monthlyRent: 0, vacancyRate: 5, propertyMgmtPct: 8, targetDSCR: 1.0, statementMonths: 12, monthlyBankDeposits: 45000, expenseFactor: 50, monthlyDebts: 1200 } },
    { label: 'Bank Statement · 24-mo', icon: Briefcase, values: { investorMode: 'bankStatement', purchasePrice: 950000, downPayment: 237500, downPaymentPct: 25, interestRate: 8.125, loanTerm: 30, propertyTaxRate: 1.1, homeInsuranceAnnual: 3000, hoaMonthly: 0, creditScore: 760, prepayPenalty: 'none', monthlyRent: 0, vacancyRate: 5, propertyMgmtPct: 8, targetDSCR: 1.0, statementMonths: 24, monthlyBankDeposits: 55000, expenseFactor: 50, monthlyDebts: 1500 } },
  ],
};

// Estimate PMI rate based on LTV and credit score (annual % of loan amount)
const estimatePMIRate = (ltv, creditScore) => {
  if (ltv <= 80) return 0;
  const score = parseFloat(creditScore) || 700;
  // Rough industry table — varies by lender
  if (score >= 760) {
    if (ltv <= 85) return 0.19;
    if (ltv <= 90) return 0.23;
    if (ltv <= 95) return 0.30;
    return 0.38;
  } else if (score >= 740) {
    if (ltv <= 85) return 0.23;
    if (ltv <= 90) return 0.28;
    if (ltv <= 95) return 0.38;
    return 0.52;
  } else if (score >= 720) {
    if (ltv <= 85) return 0.28;
    if (ltv <= 90) return 0.38;
    if (ltv <= 95) return 0.55;
    return 0.78;
  } else if (score >= 700) {
    if (ltv <= 85) return 0.34;
    if (ltv <= 90) return 0.49;
    if (ltv <= 95) return 0.71;
    return 0.96;
  } else if (score >= 680) {
    if (ltv <= 85) return 0.43;
    if (ltv <= 90) return 0.66;
    if (ltv <= 95) return 0.94;
    return 1.21;
  } else {
    if (ltv <= 85) return 0.62;
    if (ltv <= 90) return 0.94;
    if (ltv <= 95) return 1.30;
    return 1.55;
  }
};

// FHA MIP: 1.75% upfront (financed), monthly varies by LTV/term
const calculateFHAMIP = (loanAmount, ltv, termYears) => {
  const upfront = loanAmount * 0.0175;
  let annualRate = 0.55;
  if (termYears > 15) {
    if (ltv <= 90) annualRate = 0.50;
    else if (ltv <= 95) annualRate = 0.50;
    else annualRate = 0.55;
  } else {
    if (ltv <= 78) annualRate = 0.15;
    else if (ltv <= 90) annualRate = 0.40;
    else annualRate = 0.65;
  }
  const monthlyMIP = (loanAmount * (annualRate / 100)) / 12;
  return { upfront, monthlyMIP, annualRate };
};

// VA Funding Fee
const calculateVAFundingFee = (loanAmount, downPaymentPct, isFirstTimeUse, hasDisabilityRating) => {
  if (hasDisabilityRating) return { rate: 0, fee: 0 };
  let rate;
  if (isFirstTimeUse) {
    if (downPaymentPct < 5) rate = 2.15;
    else if (downPaymentPct < 10) rate = 1.50;
    else rate = 1.25;
  } else {
    if (downPaymentPct < 5) rate = 3.30;
    else if (downPaymentPct < 10) rate = 1.50;
    else rate = 1.25;
  }
  return { rate, fee: loanAmount * (rate / 100) };
};

// DSCR — debt-service coverage ratio. Effective rent (after vacancy/mgmt) divided by full PITIA.
const calculateDSCR = (monthlyRent, vacancyRate, propertyMgmtPct, totalMonthlyPITIA) => {
  const rent = parseFloat(monthlyRent) || 0;
  const vac = (parseFloat(vacancyRate) || 0) / 100;
  const mgmt = (parseFloat(propertyMgmtPct) || 0) / 100;
  const effectiveRent = rent * (1 - vac) * (1 - mgmt);
  const piti = parseFloat(totalMonthlyPITIA) || 0;
  if (piti <= 0) return 0;
  return effectiveRent / piti;
};

// Bank Statement — qualifying income from deposits less expense factor.
const calculateBankStatementIncome = (monthlyBankDeposits, expenseFactor) => {
  const deposits = parseFloat(monthlyBankDeposits) || 0;
  const factor = (parseFloat(expenseFactor) || 0) / 100;
  return deposits * (1 - factor);
};

// Investor pricing adders — Non-QM pricing penalties stack on top of base rate.
// Returned in basis points above the entered rate, for advisor commentary only.
const estimateInvestorPricingAdders = ({ creditScore, ltv, prepayPenalty, dscr, mode }) => {
  const adders = [];
  const score = parseFloat(creditScore) || 700;
  if (score < 680) adders.push({ label: 'Sub-680 FICO', bps: 75 });
  else if (score < 720) adders.push({ label: 'FICO 680-719', bps: 25 });
  if (ltv > 75) adders.push({ label: `LTV ${ltv.toFixed(0)}% (>75)`, bps: 50 });
  else if (ltv > 70) adders.push({ label: `LTV ${ltv.toFixed(0)}% (>70)`, bps: 25 });
  if (prepayPenalty === 'none') adders.push({ label: 'No prepay penalty', bps: 75 });
  else if (prepayPenalty === '3yr') adders.push({ label: '3yr prepay', bps: 25 });
  if (mode === 'dscr' && dscr < 1.0) adders.push({ label: `DSCR <1.0`, bps: 50 });
  if (mode === 'bankStatement') adders.push({ label: 'Bank statement program', bps: 50 });
  return adders;
};

const generateAdvisorTake = (results, activeTab, context = {}, advisorFirstName = 'your advisor') => {
  const insights = [];
  if (!results || results.loanAmount <= 0) return insights;

  // DTI analysis
  if (results.dti > 0) {
    if (results.dti <= 36) insights.push({ tone: 'positive', text: `DTI at ${results.dti.toFixed(1)}% is in the sweet spot — front and back-end both look strong. Best pricing tier.` });
    else if (results.dti <= 43) insights.push({ tone: 'positive', text: `DTI at ${results.dti.toFixed(1)}% is within the QM safe harbor. Most lenders comfortable here.` });
    else if (results.dti <= 50) insights.push({ tone: 'neutral', text: `DTI at ${results.dti.toFixed(1)}% is workable on government loans (FHA/VA up to 55-57% with compensating factors), tight for conventional.` });
    else insights.push({ tone: 'concern', text: `DTI at ${results.dti.toFixed(1)}% exceeds most program limits. Need either income docs, pay down debt, or smaller loan to qualify.` });
  }

  // LTV analysis
  if (results.ltv > 0) {
    if (activeTab === 'fha') {
      if (results.ltv <= 96.5) insights.push({ tone: 'positive', text: `${results.ltv.toFixed(1)}% LTV is normal for FHA — 3.5% down is the program's whole point.` });
      else insights.push({ tone: 'concern', text: `${results.ltv.toFixed(1)}% LTV exceeds FHA 96.5% max LTV.` });
    } else if (activeTab === 'va') {
      insights.push({ tone: 'positive', text: `${results.ltv.toFixed(1)}% LTV — VA allows 100% financing, no down payment required.` });
    } else if (activeTab === 'investor') {
      if (results.ltv <= 65) insights.push({ tone: 'positive', text: `${results.ltv.toFixed(1)}% LTV — strong sponsor position. Best pricing tier and most investor appetite.` });
      else if (results.ltv <= 75) insights.push({ tone: 'positive', text: `${results.ltv.toFixed(1)}% LTV is the Non-QM investor sweet spot. Pricing holds.` });
      else if (results.ltv <= 80) insights.push({ tone: 'neutral', text: `${results.ltv.toFixed(1)}% LTV — typical investor cap. Expect pricing adders above 75%.` });
      else insights.push({ tone: 'concern', text: `${results.ltv.toFixed(1)}% LTV exceeds most investor program limits. 80% is the common ceiling.` });
    } else if (results.ltv <= 60) insights.push({ tone: 'positive', text: `${results.ltv.toFixed(1)}% LTV is conservative — lowest rate tier, no PMI, strongest lender appetite.` });
    else if (results.ltv <= 80) insights.push({ tone: 'positive', text: `${results.ltv.toFixed(1)}% LTV avoids PMI on conventional loans. Mainstream territory.` });
    else if (results.ltv <= 90) insights.push({ tone: 'neutral', text: `${results.ltv.toFixed(1)}% LTV triggers PMI on conventional. Build to 80% to drop it, or consider lender-paid options.` });
    else if (results.ltv <= 95) insights.push({ tone: 'neutral', text: `${results.ltv.toFixed(1)}% LTV — PMI cost is meaningful. Worth comparing FHA total cost vs conventional with PMI.` });
    else if (results.ltv <= 97) insights.push({ tone: 'neutral', text: `${results.ltv.toFixed(1)}% LTV — 97% conventional or FHA 96.5%. Higher PMI/MIP, but gets you in the door.` });
  }

  // PMI specific
  if (results.pmiMonthly > 0 && activeTab !== 'fha' && activeTab !== 'va' && activeTab !== 'investor') {
    if (results.ltv <= 90) insights.push({ tone: 'neutral', text: `PMI of ${formatCurrency(results.pmiMonthly)}/mo will drop automatically at 78% LTV — or request removal at 80%.` });
    else insights.push({ tone: 'neutral', text: `PMI of ${formatCurrency(results.pmiMonthly)}/mo adds to your monthly. Strategies: lender-paid MI (higher rate, no monthly), bigger down payment, or piggyback 80/10/10.` });
  }

  // Credit score
  const score = parseFloat(context.creditScore) || 0;
  if (score > 0) {
    if (score >= 760) insights.push({ tone: 'positive', text: `Credit score ${score} — top tier. You qualify for the best rates available.` });
    else if (score >= 740) insights.push({ tone: 'positive', text: `Credit score ${score} — strong. Near-best pricing on most products.` });
    else if (score >= 700) insights.push({ tone: 'neutral', text: `Credit score ${score} — solid. A 20-40 point bump could unlock meaningfully better pricing.` });
    else if (score >= 660) insights.push({ tone: 'neutral', text: `Credit score ${score} — works for FHA easily; conventional gets pricier here. Worth running both.` });
    else if (score >= 620) insights.push({ tone: 'concern', text: `Credit score ${score} — at the FHA floor (580 with 3.5% down, 500 with 10% down). Limited conventional options.` });
    else insights.push({ tone: 'concern', text: `Credit score ${score} — below standard program floors. Likely need credit repair before applying, or look at non-QM lenders.` });
  }

  // Refi-specific: break-even analysis
  if (activeTab === 'rateTerm' && context.currentPayment && results.monthlyPI) {
    const monthlySavings = context.currentPayment - results.monthlyPI;
    if (monthlySavings > 0) {
      const breakeven = Math.ceil((parseFloat(context.closingCosts) || 0) / monthlySavings);
      if (breakeven <= 24) insights.push({ tone: 'positive', text: `Saves ${formatCurrency(monthlySavings)}/mo. Break-even in ~${breakeven} months — clear win if you'll stay 3+ years.` });
      else if (breakeven <= 48) insights.push({ tone: 'neutral', text: `Saves ${formatCurrency(monthlySavings)}/mo. Break-even in ~${breakeven} months. Worth it if you're not moving soon.` });
      else insights.push({ tone: 'concern', text: `Saves ${formatCurrency(monthlySavings)}/mo but break-even is ~${breakeven} months. May not recoup costs unless you stay long-term.` });
    } else if (monthlySavings < 0) {
      insights.push({ tone: 'concern', text: `New payment is higher than current. Refi only makes sense if you're shortening the term or pulling cash out.` });
    }
  }

  // Cash-out: purpose-specific
  if (activeTab === 'cashOut') {
    if (context.cashOutPurpose === 'debt-consolidation') {
      insights.push({ tone: 'neutral', text: `Debt consolidation: math usually works when you're rolling 18%+ credit card debt into 7% mortgage. Just don't run the cards back up.` });
    } else if (context.cashOutPurpose === 'home-improvement') {
      insights.push({ tone: 'positive', text: `Home improvement is a strong use case — likely adds to home value, plus interest may be tax-deductible (consult your CPA).` });
    } else if (context.cashOutPurpose === 'investment') {
      insights.push({ tone: 'neutral', text: `Pulling equity to invest elsewhere: the spread has to clear your new mortgage rate after-tax. Run the numbers carefully.` });
    }
    if (results.ltv > 80) insights.push({ tone: 'concern', text: `Cash-out at ${results.ltv.toFixed(1)}% LTV — conventional caps at 80% for cash-out. You may be looking at FHA cash-out (85%) or VA (up to 100%).` });
  }

  // HELOC-specific
  if (activeTab === 'heloc') {
    const cltv = results.cltv || 0;
    if (cltv <= 80) insights.push({ tone: 'positive', text: `Combined LTV at ${cltv.toFixed(1)}% — comfortably within most HELOC lender limits (80-85% CLTV cap).` });
    else if (cltv <= 90) insights.push({ tone: 'neutral', text: `Combined LTV at ${cltv.toFixed(1)}% — some lenders go up to 89.99%, but rates step up sharply above 80%.` });
    else insights.push({ tone: 'concern', text: `Combined LTV at ${cltv.toFixed(1)}% exceeds most HELOC limits. Need more equity or a smaller line.` });
    insights.push({ tone: 'neutral', text: `HELOCs are variable-rate. The ${context.interestRate}% you see today moves with Prime — budget for fluctuation.` });
  }

  // VA-specific
  if (activeTab === 'va') {
    if (context.hasDisabilityRating) {
      insights.push({ tone: 'positive', text: `Funding fee waived due to disability rating — meaningful savings (typically 1.25-3.30% of loan amount).` });
    }
    if (results.dti > 41) {
      insights.push({ tone: 'neutral', text: `DTI above 41% on VA — residual income test matters more than ratios. If your residual income passes, this still works.` });
    }
  }

  // Investor — DSCR and Bank Statement advisor insights
  if (activeTab === 'investor') {
    const mode = context.investorMode || 'dscr';
    if (mode === 'dscr') {
      const dscr = results.dscr || 0;
      if (dscr >= 1.25) insights.push({ tone: 'positive', text: `DSCR of ${dscr.toFixed(2)} clears the 1.20 threshold most investors price aggressively. Rate sheet looks favorable.` });
      else if (dscr >= 1.10) insights.push({ tone: 'positive', text: `DSCR of ${dscr.toFixed(2)} qualifies in the standard tier. Pricing is competitive.` });
      else if (dscr >= 1.00) insights.push({ tone: 'neutral', text: `DSCR of ${dscr.toFixed(2)} is at break-even. Loan qualifies but expect a pricing adder (~25-50 bps). Reserves matter more here.` });
      else if (dscr >= 0.75) insights.push({ tone: 'concern', text: `DSCR of ${dscr.toFixed(2)} is sub-1.0 — only specific "no-ratio" or low-DSCR investor programs apply. Higher down payment usually required.` });
      else insights.push({ tone: 'concern', text: `DSCR of ${dscr.toFixed(2)} won't cash flow this deal. Reassess rent assumptions or restructure with more down.` });
      if (parseFloat(context.vacancyRate) < 5) insights.push({ tone: 'neutral', text: `Vacancy assumption under 5% is aggressive — most underwriters stress-test at 5-8%. Verify your operating proforma holds at standard assumptions.` });
      insights.push({ tone: 'neutral', text: `DSCR programs qualify the property, not the borrower. No personal income docs, no DTI ratio — but expect rate ~150-200 bps over conventional.` });
    } else if (mode === 'bankStatement') {
      const annualIncome = (results.bankStatementMonthlyIncome || 0) * 12;
      const months = parseInt(context.statementMonths) || 12;
      insights.push({ tone: 'positive', text: `Bank statement program qualifies on ${months} months of business deposits — no tax returns required. Self-employed friendly.` });
      if (annualIncome > 0) {
        insights.push({ tone: 'neutral', text: `Qualifying income of ${formatCurrency(annualIncome)}/yr derived from deposits less expense factor. Underwriter may adjust the expense factor (typically 30-50%) based on industry and CPA letter.` });
      }
      if (results.dti > 50) insights.push({ tone: 'concern', text: `DTI of ${results.dti.toFixed(1)}% is tight even for bank statement programs (typical max ~50%). Consider larger down or debt paydown.` });
      else if (results.dti > 0 && results.dti <= 43) insights.push({ tone: 'positive', text: `DTI of ${results.dti.toFixed(1)}% is comfortable for Non-QM bank statement guidelines.` });
      insights.push({ tone: 'neutral', text: `Bank statement loans price ~125-175 bps over conventional. The premium buys you out of tax-return underwriting.` });
    }
    if (context.prepayPenalty === 'none') {
      insights.push({ tone: 'neutral', text: `No prepay penalty adds ~50-75 bps to your rate. If you plan to refi within 5 years, it's usually worth it. If you'll hold long-term, accept the penalty for lower pricing.` });
    } else if (context.prepayPenalty === '3yr' || context.prepayPenalty === '5yr') {
      insights.push({ tone: 'positive', text: `${context.prepayPenalty === '3yr' ? '3-year' : '5-year'} prepay penalty trades flexibility for pricing — saves ~25-75 bps. Standard play for buy-and-hold investors.` });
    }
  }

  // Investment property warning
  if (activeTab === 'purchase' && context.occupancy === 'investment') {
    insights.push({ tone: 'neutral', text: `Investment property: expect a rate ~0.5-0.75% higher than primary and 20-25% down minimum. Lenders also require reserves.` });
  }
  if (activeTab === 'purchase' && context.occupancy === 'second-home') {
    insights.push({ tone: 'neutral', text: `Second home: 10% down minimum. Property must be a reasonable distance from your primary and not rented out long-term.` });
  }

  // Affordability stretch
  if (results.frontEndDTI > 0) {
    if (results.frontEndDTI > 35 && results.dti < 50) {
      insights.push({ tone: 'neutral', text: `Front-end (housing) DTI is ${results.frontEndDTI.toFixed(1)}% — above the comfortable 28-31% range. Manageable but tight on month-to-month budget.` });
    }
  }

  // All-positive close
  const allPositive = insights.length > 0 && insights.every(i => i.tone === 'positive');
  if (allPositive) {
    insights.push({ tone: 'positive', text: `Numbers tell a clean story. Worth a real conversation with ${advisorFirstName} on lender and rate placement.` });
  }

  return insights;
};

const ResidentialMortgageCalculator = () => {
  const [activeTab, setActiveTab] = useState('purchase');

  const [purchaseInputs, setPurchaseInputs] = useState(DEFAULTS.purchase);
  const [rateTermInputs, setRateTermInputs] = useState(DEFAULTS.rateTerm);
  const [cashOutInputs, setCashOutInputs] = useState(DEFAULTS.cashOut);
  const [helocInputs, setHelocInputs] = useState(DEFAULTS.heloc);
  const [fhaInputs, setFhaInputs] = useState(DEFAULTS.fha);
  const [vaInputs, setVaInputs] = useState(DEFAULTS.va);
  const [investorInputs, setInvestorInputs] = useState(DEFAULTS.investor);
  const [affordabilityInputs, setAffordabilityInputs] = useState(DEFAULTS.affordability);

  const [purchaseMode, setPurchaseMode] = useState('payment');

  const [results, setResults] = useState({
    loanAmount: 0, monthlyPI: 0, monthlyPITI: 0, totalMonthlyPayment: 0,
    propertyTaxMonthly: 0, insuranceMonthly: 0, hoaMonthly: 0, pmiMonthly: 0,
    ltv: 0, cltv: 0, dti: 0, frontEndDTI: 0,
    totalInterestPaid: 0, totalCostOfLoan: 0,
    upfrontMIP: 0, monthlyMIP: 0,
    vaFundingFee: 0, vaFundingFeeRate: 0,
    usdaUpfront: 0, usdaMonthlyFee: 0, // legacy fields kept for safety; investor tab uses dscr below
    dscr: 0, effectiveRent: 0, bankStatementMonthlyIncome: 0,
    breakEvenMonths: 0, monthlySavings: 0,
    helocInterestOnlyPayment: 0, helocFullPayment: 0,
  });

  const [affordabilityResults, setAffordabilityResults] = useState({
    maxHomePrice: 0, maxLoanAmount: 0, maxMonthlyPITI: 0,
    maxByDTI: 0, maxByFrontEnd: 0, governingConstraint: '',
  });

  const [amortizationSchedule, setAmortizationSchedule] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);

  const calculatePaymentForLoan = (principal, annualRate, amortMonths) => {
    if (!principal || !annualRate || !amortMonths) return 0;
    const monthlyRate = annualRate / 12;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, amortMonths)) / (Math.pow(1 + monthlyRate, amortMonths) - 1);
  };

  const calculateAffordability = () => {
    const grossMonthlyIncome = (parseFloat(affordabilityInputs.grossAnnualIncome) || 0) / 12;
    const monthlyDebts = parseFloat(affordabilityInputs.monthlyDebts) || 0;
    const downPayment = parseFloat(affordabilityInputs.downPayment) || 0;
    const annualRate = (parseFloat(affordabilityInputs.interestRate) || 0) / 100;
    const termMonths = (parseFloat(affordabilityInputs.loanTerm) || 30) * 12;
    const targetDTI = (parseFloat(affordabilityInputs.targetDTI) || 43) / 100;
    const taxRate = (parseFloat(affordabilityInputs.propertyTaxRate) || 0) / 100;
    const annualInsurance = parseFloat(affordabilityInputs.homeInsuranceAnnual) || 0;
    const hoaMonthly = parseFloat(affordabilityInputs.hoaMonthly) || 0;

    if (!grossMonthlyIncome || !annualRate) {
      setAffordabilityResults({ maxHomePrice: 0, maxLoanAmount: 0, maxMonthlyPITI: 0, maxByDTI: 0, maxByFrontEnd: 0, governingConstraint: '' });
      return;
    }

    // Back-end DTI: total debts / income
    const maxTotalMonthlyDebt = grossMonthlyIncome * targetDTI;
    const maxPITIByBackEnd = Math.max(0, maxTotalMonthlyDebt - monthlyDebts);

    // Front-end DTI: cap PITI at 31% of gross (conservative)
    const maxPITIByFrontEnd = grossMonthlyIncome * 0.31;

    const maxPITI = Math.min(maxPITIByBackEnd, maxPITIByFrontEnd);
    const governingConstraint = maxPITIByBackEnd <= maxPITIByFrontEnd ? 'Back-End DTI' : 'Front-End DTI';

    // Solve for max home price iteratively (since PITI includes tax+insurance based on price)
    // PITI = PI + (price * taxRate)/12 + annualInsurance/12 + hoaMonthly
    // PI = loanAmount * factor; loanAmount = price - downPayment
    const monthlyRate = annualRate / 12;
    const piFactor = monthlyRate > 0 ? (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1) : 1 / termMonths;
    const monthlyTaxFactor = taxRate / 12;
    const fixedMonthly = (annualInsurance / 12) + hoaMonthly;

    // maxPITI = (price - downPayment) * piFactor + price * monthlyTaxFactor + fixedMonthly
    // Solve for price:
    // maxPITI - fixedMonthly + downPayment * piFactor = price * (piFactor + monthlyTaxFactor)
    const numerator = maxPITI - fixedMonthly + downPayment * piFactor;
    const denominator = piFactor + monthlyTaxFactor;
    const maxHomePrice = denominator > 0 ? Math.max(0, numerator / denominator) : 0;
    const maxLoanAmount = Math.max(0, maxHomePrice - downPayment);

    setAffordabilityResults({
      maxHomePrice, maxLoanAmount, maxMonthlyPITI: maxPITI,
      maxByDTI: maxPITIByBackEnd, maxByFrontEnd: maxPITIByFrontEnd,
      governingConstraint,
    });
  };

  const calculateMortgage = () => {
    if (activeTab === 'purchase' && purchaseMode === 'affordability') {
      calculateAffordability();
      return;
    }

    let principal, homeValue, annualRate, termMonths;
    let propertyTaxAnnual = 0, insuranceAnnual = 0, hoaMonthly = 0;
    let grossMonthlyIncome = 0, monthlyDebts = 0, creditScore = 700;
    let pmiMonthly = 0, upfrontMIP = 0, monthlyMIP = 0;
    let vaFundingFee = 0, vaFundingFeeRate = 0;
    let usdaUpfront = 0, usdaMonthlyFee = 0; // legacy holdovers; investor tab uses dscr below
    let dscr = 0, effectiveRent = 0, bankStatementMonthlyIncome = 0;
    let cltv = 0, helocInterestOnlyPayment = 0, helocFullPayment = 0;
    let breakEvenMonths = 0, monthlySavings = 0;

    if (activeTab === 'purchase') {
      principal = parseFloat(purchaseInputs.loanAmount) || 0;
      homeValue = parseFloat(purchaseInputs.purchasePrice) || 0;
      annualRate = (parseFloat(purchaseInputs.interestRate) || 0) / 100;
      termMonths = (parseFloat(purchaseInputs.loanTerm) || 30) * 12;
      propertyTaxAnnual = homeValue * ((parseFloat(purchaseInputs.propertyTaxRate) || 0) / 100);
      insuranceAnnual = parseFloat(purchaseInputs.homeInsuranceAnnual) || 0;
      hoaMonthly = parseFloat(purchaseInputs.hoaMonthly) || 0;
      grossMonthlyIncome = parseFloat(purchaseInputs.grossMonthlyIncome) || 0;
      monthlyDebts = parseFloat(purchaseInputs.monthlyDebts) || 0;
      creditScore = parseFloat(purchaseInputs.creditScore) || 700;
      const ltv = homeValue > 0 ? (principal / homeValue) * 100 : 0;
      const pmiRate = estimatePMIRate(ltv, creditScore);
      pmiMonthly = (principal * (pmiRate / 100)) / 12;
    } else if (activeTab === 'rateTerm') {
      const currentBalance = parseFloat(rateTermInputs.currentLoanBalance) || 0;
      const closingCosts = parseFloat(rateTermInputs.closingCosts) || 0;
      principal = currentBalance + closingCosts;
      homeValue = parseFloat(rateTermInputs.homeValue) || 0;
      annualRate = (parseFloat(rateTermInputs.interestRate) || 0) / 100;
      termMonths = (parseFloat(rateTermInputs.loanTerm) || 30) * 12;
      propertyTaxAnnual = homeValue * ((parseFloat(rateTermInputs.propertyTaxRate) || 0) / 100);
      insuranceAnnual = parseFloat(rateTermInputs.homeInsuranceAnnual) || 0;
      hoaMonthly = parseFloat(rateTermInputs.hoaMonthly) || 0;
      grossMonthlyIncome = parseFloat(rateTermInputs.grossMonthlyIncome) || 0;
      monthlyDebts = parseFloat(rateTermInputs.monthlyDebts) || 0;
      creditScore = parseFloat(rateTermInputs.creditScore) || 700;
      const ltv = homeValue > 0 ? (principal / homeValue) * 100 : 0;
      const pmiRate = estimatePMIRate(ltv, creditScore);
      pmiMonthly = (principal * (pmiRate / 100)) / 12;
    } else if (activeTab === 'cashOut') {
      const currentBalance = parseFloat(cashOutInputs.currentLoanBalance) || 0;
      const cashOut = parseFloat(cashOutInputs.cashOutAmount) || 0;
      const closingCosts = parseFloat(cashOutInputs.closingCosts) || 0;
      principal = currentBalance + cashOut + closingCosts;
      homeValue = parseFloat(cashOutInputs.homeValue) || 0;
      annualRate = (parseFloat(cashOutInputs.interestRate) || 0) / 100;
      termMonths = (parseFloat(cashOutInputs.loanTerm) || 30) * 12;
      propertyTaxAnnual = homeValue * ((parseFloat(cashOutInputs.propertyTaxRate) || 0) / 100);
      insuranceAnnual = parseFloat(cashOutInputs.homeInsuranceAnnual) || 0;
      hoaMonthly = parseFloat(cashOutInputs.hoaMonthly) || 0;
      grossMonthlyIncome = parseFloat(cashOutInputs.grossMonthlyIncome) || 0;
      monthlyDebts = parseFloat(cashOutInputs.monthlyDebts) || 0;
      creditScore = parseFloat(cashOutInputs.creditScore) || 700;
      const ltv = homeValue > 0 ? (principal / homeValue) * 100 : 0;
      const pmiRate = estimatePMIRate(ltv, creditScore);
      pmiMonthly = (principal * (pmiRate / 100)) / 12;
    } else if (activeTab === 'heloc') {
      const lineRequested = parseFloat(helocInputs.creditLineRequested) || 0;
      const currentMtg = parseFloat(helocInputs.currentMortgageBalance) || 0;
      principal = lineRequested;
      homeValue = parseFloat(helocInputs.homeValue) || 0;
      annualRate = (parseFloat(helocInputs.interestRate) || 0) / 100;
      termMonths = (parseFloat(helocInputs.repaymentPeriodYears) || 20) * 12;
      grossMonthlyIncome = parseFloat(helocInputs.grossMonthlyIncome) || 0;
      monthlyDebts = parseFloat(helocInputs.monthlyDebts) || 0;
      creditScore = parseFloat(helocInputs.creditScore) || 700;
      cltv = homeValue > 0 ? ((currentMtg + lineRequested) / homeValue) * 100 : 0;
      const monthlyRate = annualRate / 12;
      helocInterestOnlyPayment = principal * monthlyRate;
      helocFullPayment = calculatePaymentForLoan(principal, annualRate, termMonths);
    } else if (activeTab === 'fha') {
      const purchasePrice = parseFloat(fhaInputs.purchasePrice) || 0;
      const dp = parseFloat(fhaInputs.downPayment) || 0;
      const basePrincipal = Math.max(0, purchasePrice - dp);
      annualRate = (parseFloat(fhaInputs.interestRate) || 0) / 100;
      termMonths = (parseFloat(fhaInputs.loanTerm) || 30) * 12;
      const baseLTV = purchasePrice > 0 ? (basePrincipal / purchasePrice) * 100 : 0;
      const mip = calculateFHAMIP(basePrincipal, baseLTV, parseFloat(fhaInputs.loanTerm) || 30);
      upfrontMIP = mip.upfront;
      monthlyMIP = mip.monthlyMIP;
      principal = basePrincipal + upfrontMIP; // UFMIP financed
      homeValue = purchasePrice;
      propertyTaxAnnual = homeValue * ((parseFloat(fhaInputs.propertyTaxRate) || 0) / 100);
      insuranceAnnual = parseFloat(fhaInputs.homeInsuranceAnnual) || 0;
      hoaMonthly = parseFloat(fhaInputs.hoaMonthly) || 0;
      grossMonthlyIncome = parseFloat(fhaInputs.grossMonthlyIncome) || 0;
      monthlyDebts = parseFloat(fhaInputs.monthlyDebts) || 0;
      creditScore = parseFloat(fhaInputs.creditScore) || 680;
    } else if (activeTab === 'va') {
      const purchasePrice = parseFloat(vaInputs.purchasePrice) || 0;
      const dp = parseFloat(vaInputs.downPayment) || 0;
      const dpPct = purchasePrice > 0 ? (dp / purchasePrice) * 100 : 0;
      const basePrincipal = Math.max(0, purchasePrice - dp);
      const va = calculateVAFundingFee(basePrincipal, dpPct, vaInputs.isFirstTimeUse, vaInputs.hasDisabilityRating);
      vaFundingFee = va.fee;
      vaFundingFeeRate = va.rate;
      principal = basePrincipal + vaFundingFee; // funding fee typically financed
      homeValue = purchasePrice;
      annualRate = (parseFloat(vaInputs.interestRate) || 0) / 100;
      termMonths = (parseFloat(vaInputs.loanTerm) || 30) * 12;
      propertyTaxAnnual = homeValue * ((parseFloat(vaInputs.propertyTaxRate) || 0) / 100);
      insuranceAnnual = parseFloat(vaInputs.homeInsuranceAnnual) || 0;
      hoaMonthly = parseFloat(vaInputs.hoaMonthly) || 0;
      grossMonthlyIncome = parseFloat(vaInputs.grossMonthlyIncome) || 0;
      monthlyDebts = parseFloat(vaInputs.monthlyDebts) || 0;
      creditScore = parseFloat(vaInputs.creditScore) || 700;
    } else if (activeTab === 'investor') {
      const purchasePrice = parseFloat(investorInputs.purchasePrice) || 0;
      const dp = parseFloat(investorInputs.downPayment) || 0;
      const basePrincipal = Math.max(0, purchasePrice - dp);
      principal = basePrincipal;
      homeValue = purchasePrice;
      annualRate = (parseFloat(investorInputs.interestRate) || 0) / 100;
      termMonths = (parseFloat(investorInputs.loanTerm) || 30) * 12;
      propertyTaxAnnual = homeValue * ((parseFloat(investorInputs.propertyTaxRate) || 0) / 100);
      insuranceAnnual = parseFloat(investorInputs.homeInsuranceAnnual) || 0;
      hoaMonthly = parseFloat(investorInputs.hoaMonthly) || 0;
      creditScore = parseFloat(investorInputs.creditScore) || 700;
      // Income source depends on mode:
      if (investorInputs.investorMode === 'bankStatement') {
        grossMonthlyIncome = calculateBankStatementIncome(investorInputs.monthlyBankDeposits, investorInputs.expenseFactor);
        monthlyDebts = parseFloat(investorInputs.monthlyDebts) || 0;
      } else {
        // DSCR — no personal income gate, no DTI
        grossMonthlyIncome = 0;
        monthlyDebts = 0;
      }
    }

    if (!principal || !annualRate || !termMonths || !homeValue) {
      setResults(prev => ({ ...prev, loanAmount: principal || 0 }));
      return;
    }

    const ltv = (principal / homeValue) * 100;
    const monthlyPI = activeTab === 'heloc' ? helocFullPayment : calculatePaymentForLoan(principal, annualRate, termMonths);
    const propertyTaxMonthly = propertyTaxAnnual / 12;
    const insuranceMonthly = insuranceAnnual / 12;

    // PITI build-up (HELOC has no escrow attached to the line itself)
    let totalMonthlyPayment;
    if (activeTab === 'heloc') {
      totalMonthlyPayment = helocInterestOnlyPayment;
    } else {
      totalMonthlyPayment = monthlyPI + propertyTaxMonthly + insuranceMonthly + hoaMonthly + pmiMonthly + monthlyMIP + usdaMonthlyFee;
    }

    const monthlyPITI = activeTab === 'heloc' ? helocInterestOnlyPayment : (monthlyPI + propertyTaxMonthly + insuranceMonthly + hoaMonthly);

    // DTI
    const dti = grossMonthlyIncome > 0 ? ((totalMonthlyPayment + monthlyDebts) / grossMonthlyIncome) * 100 : 0;
    const frontEndDTI = grossMonthlyIncome > 0 ? (totalMonthlyPayment / grossMonthlyIncome) * 100 : 0;

    // Total interest & cost over life of loan
    let totalInterestPaid = 0;
    let balance = principal;
    const schedule = [];
    const monthlyRate = annualRate / 12;
    for (let month = 1; month <= termMonths; month++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = monthlyPI - interestPayment;
      balance -= principalPayment;
      totalInterestPaid += interestPayment;
      if (month <= 12 || month % 12 === 0 || month === termMonths) {
        schedule.push({
          month,
          payment: monthlyPI,
          principal: principalPayment,
          interest: interestPayment,
          balance: Math.max(0, balance),
        });
      }
    }
    const totalCostOfLoan = monthlyPI * termMonths;

    // Refi break-even
    if (activeTab === 'rateTerm') {
      const currentPmt = parseFloat(rateTermInputs.currentPayment) || 0;
      monthlySavings = currentPmt - monthlyPI;
      const closing = parseFloat(rateTermInputs.closingCosts) || 0;
      breakEvenMonths = monthlySavings > 0 ? Math.ceil(closing / monthlySavings) : 0;
    }

    // Investor — DSCR + Bank Statement post-PITI calculations
    if (activeTab === 'investor') {
      if (investorInputs.investorMode === 'dscr') {
        const rent = parseFloat(investorInputs.monthlyRent) || 0;
        const vac = (parseFloat(investorInputs.vacancyRate) || 0) / 100;
        const mgmt = (parseFloat(investorInputs.propertyMgmtPct) || 0) / 100;
        effectiveRent = rent * (1 - vac) * (1 - mgmt);
        dscr = totalMonthlyPayment > 0 ? effectiveRent / totalMonthlyPayment : 0;
      } else if (investorInputs.investorMode === 'bankStatement') {
        bankStatementMonthlyIncome = calculateBankStatementIncome(investorInputs.monthlyBankDeposits, investorInputs.expenseFactor);
      }
    }

    setResults({
      loanAmount: principal, monthlyPI, monthlyPITI, totalMonthlyPayment,
      propertyTaxMonthly, insuranceMonthly, hoaMonthly, pmiMonthly,
      ltv, cltv, dti, frontEndDTI,
      totalInterestPaid, totalCostOfLoan,
      upfrontMIP, monthlyMIP,
      vaFundingFee, vaFundingFeeRate,
      usdaUpfront, usdaMonthlyFee,
      dscr, effectiveRent, bankStatementMonthlyIncome,
      breakEvenMonths, monthlySavings,
      helocInterestOnlyPayment, helocFullPayment,
    });
    setAmortizationSchedule(schedule);
  };

  useEffect(() => {
    calculateMortgage();
    setShowSchedule(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, purchaseMode, purchaseInputs, rateTermInputs, cashOutInputs, helocInputs, fhaInputs, vaInputs, investorInputs, affordabilityInputs]);

  const handlePurchaseChange = (field, value) => {
    setPurchaseInputs(prev => {
      const newInputs = { ...prev, [field]: value };
      const mode = field === 'downPaymentMode' ? value : prev.downPaymentMode;
      const purchasePrice = parseFloat(field === 'purchasePrice' ? value : prev.purchasePrice) || 0;

      if (field === 'downPayment') {
        const dp = parseFloat(value) || 0;
        newInputs.downPaymentPct = purchasePrice > 0 ? parseFloat(((dp / purchasePrice) * 100).toFixed(2)) : prev.downPaymentPct;
      }
      if (field === 'downPaymentPct') {
        const pct = parseFloat(value) || 0;
        newInputs.downPayment = Math.round(purchasePrice * (pct / 100));
      }
      if (field === 'purchasePrice') {
        if (mode === 'percent') {
          const pct = parseFloat(prev.downPaymentPct) || 0;
          newInputs.downPayment = Math.round(purchasePrice * (pct / 100));
        } else {
          const dp = parseFloat(prev.downPayment) || 0;
          newInputs.downPaymentPct = purchasePrice > 0 ? parseFloat(((dp / purchasePrice) * 100).toFixed(2)) : prev.downPaymentPct;
        }
      }
      if (field === 'downPaymentMode') {
        if (value === 'percent') {
          const dp = parseFloat(prev.downPayment) || 0;
          newInputs.downPaymentPct = purchasePrice > 0 ? parseFloat(((dp / purchasePrice) * 100).toFixed(2)) : prev.downPaymentPct;
        } else {
          const pct = parseFloat(prev.downPaymentPct) || 0;
          newInputs.downPayment = Math.round(purchasePrice * (pct / 100));
        }
      }
      const downPayment = parseFloat(newInputs.downPayment) || 0;
      newInputs.loanAmount = Math.max(0, purchasePrice - downPayment);
      return newInputs;
    });
  };

  const resetCurrentTab = () => {
    if (activeTab === 'purchase') {
      setPurchaseInputs(DEFAULTS.purchase);
      if (purchaseMode === 'affordability') setAffordabilityInputs(DEFAULTS.affordability);
    }
    if (activeTab === 'rateTerm') setRateTermInputs(DEFAULTS.rateTerm);
    if (activeTab === 'cashOut') setCashOutInputs(DEFAULTS.cashOut);
    if (activeTab === 'heloc') setHelocInputs(DEFAULTS.heloc);
    if (activeTab === 'fha') setFhaInputs(DEFAULTS.fha);
    if (activeTab === 'va') setVaInputs(DEFAULTS.va);
    if (activeTab === 'investor') setInvestorInputs(DEFAULTS.investor);
  };

  const handleScheduleCall = () => {
    trackEvent('residential_calculator_schedule_click', { destination: ADVISOR.calendarUrl });
    window.open(ADVISOR.calendarUrl, '_blank', 'noopener,noreferrer');
  };

  const applyPreset = (preset) => {
    trackEvent('residential_calculator_scenario_click', { scenario: preset.label, tab: activeTab });
    if (activeTab === 'purchase') {
      const v = preset.values;
      const purchasePrice = parseFloat(v.purchasePrice) || 0;
      const downPayment = parseFloat(v.downPayment) || 0;
      const downPaymentPct = purchasePrice > 0 ? parseFloat(((downPayment / purchasePrice) * 100).toFixed(2)) : 20;
      setPurchaseInputs({
        downPaymentMode: v.downPaymentMode || 'dollar',
        downPaymentPct: v.downPaymentPct || downPaymentPct,
        ...v,
      });
      setPurchaseMode('payment');
    }
    else if (activeTab === 'rateTerm') setRateTermInputs(preset.values);
    else if (activeTab === 'cashOut') setCashOutInputs(preset.values);
    else if (activeTab === 'heloc') setHelocInputs(preset.values);
    else if (activeTab === 'fha') setFhaInputs(preset.values);
    else if (activeTab === 'va') setVaInputs(preset.values);
    else if (activeTab === 'investor') setInvestorInputs(preset.values);
  };

  const getDTIColor = (dti) => {
    if (dti > 0 && dti <= 36) return BARRETT.green;
    if (dti <= 43) return BARRETT.amber;
    if (dti > 0) return BARRETT.red;
    return BARRETT.slate;
  };
  const getDTIStatus = (dti) => {
    if (dti <= 28) return 'Excellent';
    if (dti <= 36) return 'Strong';
    if (dti <= 43) return 'Within QM';
    if (dti <= 50) return 'Govt Only';
    if (dti > 0) return 'Exceeds Limits';
    return '—';
  };

  const tabs = [
    { id: 'purchase', label: 'Purchase', icon: Home },
    { id: 'rateTerm', label: 'Rate & Term Refi', icon: RefreshCw },
    { id: 'cashOut', label: 'Cash-Out Refi', icon: Banknote },
    { id: 'heloc', label: 'HELOC', icon: Layers },
    { id: 'fha', label: 'FHA', icon: Key },
    { id: 'va', label: 'VA', icon: Flag },
    { id: 'investor', label: 'Investor', icon: BarChart },
  ];

  const advisorTakeContext = useMemo(() => {
    const ctx = {};
    if (activeTab === 'purchase') {
      ctx.occupancy = purchaseInputs.occupancy;
      ctx.creditScore = purchaseInputs.creditScore;
      ctx.loanProgram = purchaseInputs.loanProgram;
    } else if (activeTab === 'rateTerm') {
      ctx.creditScore = rateTermInputs.creditScore;
      ctx.currentPayment = parseFloat(rateTermInputs.currentPayment);
      ctx.closingCosts = rateTermInputs.closingCosts;
    } else if (activeTab === 'cashOut') {
      ctx.creditScore = cashOutInputs.creditScore;
      ctx.cashOutPurpose = cashOutInputs.cashOutPurpose;
    } else if (activeTab === 'heloc') {
      ctx.creditScore = helocInputs.creditScore;
      ctx.interestRate = helocInputs.interestRate;
    } else if (activeTab === 'fha') {
      ctx.creditScore = fhaInputs.creditScore;
      ctx.isFirstTimeBuyer = fhaInputs.isFirstTimeBuyer;
    } else if (activeTab === 'va') {
      ctx.creditScore = vaInputs.creditScore;
      ctx.hasDisabilityRating = vaInputs.hasDisabilityRating;
      ctx.isFirstTimeUse = vaInputs.isFirstTimeUse;
    } else if (activeTab === 'investor') {
      ctx.creditScore = investorInputs.creditScore;
      ctx.investorMode = investorInputs.investorMode;
      ctx.prepayPenalty = investorInputs.prepayPenalty;
      ctx.vacancyRate = investorInputs.vacancyRate;
      ctx.propertyMgmtPct = investorInputs.propertyMgmtPct;
      ctx.statementMonths = investorInputs.statementMonths;
      ctx.expenseFactor = investorInputs.expenseFactor;
    }
    return ctx;
  }, [activeTab, purchaseInputs, rateTermInputs, cashOutInputs, helocInputs, fhaInputs, vaInputs, investorInputs]);

  const advisorInsights = useMemo(() => generateAdvisorTake(results, activeTab, advisorTakeContext, ADVISOR.name.split(' ')[0]), [results, activeTab, advisorTakeContext]);

  // ----- INPUT RENDERERS -----

  const OccupancyToggle = ({ value, onChange }) => (
    <div>
      <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
        <Home className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
        Property Type
      </label>
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: 'primary', label: 'Primary', sub: 'You live there' },
          { id: 'second-home', label: 'Second Home', sub: 'Vacation/family' },
          { id: 'investment', label: 'Investment', sub: 'Rental property' },
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

  const renderPurchaseInputs = () => {
    if (purchaseMode === 'affordability') {
      return (
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SectionHeading icon={TrendingUp}>Income & Debts</SectionHeading>
            <InputField label="Gross Annual Income" icon={DollarSign} value={affordabilityInputs.grossAnnualIncome} onChange={(v) => setAffordabilityInputs(p => ({ ...p, grossAnnualIncome: v }))} hint="All borrowers combined, before taxes" />
            <InputField label="Monthly Debt Payments" icon={Banknote} value={affordabilityInputs.monthlyDebts} onChange={(v) => setAffordabilityInputs(p => ({ ...p, monthlyDebts: v }))} hint="Car, student loans, credit card minimums, child support" />
            <InputField label="Cash Available for Down Payment" icon={DollarSign} value={affordabilityInputs.downPayment} onChange={(v) => setAffordabilityInputs(p => ({ ...p, downPayment: v }))} />
            <InputField label="Target DTI (%)" icon={Percent} type="number" step="0.5" value={affordabilityInputs.targetDTI} onChange={(v) => setAffordabilityInputs(p => ({ ...p, targetDTI: v }))} hint="43% is QM safe harbor; 50%+ possible on FHA/VA" tooltip="Debt-to-Income ratio. Conventional generally caps at 43-45%. Government loans (FHA/VA) can stretch to 55-57% with strong compensating factors." />
          </div>
          <div className="space-y-5">
            <SectionHeading icon={Calculator}>Loan Terms & Housing Costs</SectionHeading>
            <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={affordabilityInputs.interestRate} onChange={(v) => setAffordabilityInputs(p => ({ ...p, interestRate: v }))} />
            <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="1" value={affordabilityInputs.loanTerm} onChange={(v) => setAffordabilityInputs(p => ({ ...p, loanTerm: v }))} />
            <InputField label="Property Tax Rate (%)" icon={Percent} type="number" step="0.05" value={affordabilityInputs.propertyTaxRate} onChange={(v) => setAffordabilityInputs(p => ({ ...p, propertyTaxRate: v }))} hint="Annual rate as % of home value (varies by state/county)" />
            <InputField label="Home Insurance (Annual)" icon={Shield} value={affordabilityInputs.homeInsuranceAnnual} onChange={(v) => setAffordabilityInputs(p => ({ ...p, homeInsuranceAnnual: v }))} />
            <InputField label="HOA Monthly" icon={Building} value={affordabilityInputs.hoaMonthly} onChange={(v) => setAffordabilityInputs(p => ({ ...p, hoaMonthly: v }))} hint="Leave 0 if no HOA" />
            <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
              <p className="text-xs leading-relaxed" style={{ color: BARRETT.slate }}>
                <strong style={{ color: BARRETT.navy }}>How this works:</strong> Given your income, debts, and down payment, this works backward to find the maximum home price you'd qualify for at your target DTI.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-6">
        <OccupancyToggle value={purchaseInputs.occupancy} onChange={(v) => handlePurchaseChange('occupancy', v)} />

        <LoanProductField
          value={purchaseInputs.loanProgram}
          onChange={(v) => handlePurchaseChange('loanProgram', v)}
          options={[
            { id: 'conventional', label: 'Conventional', sub: 'Conforming up to limit' },
            { id: 'jumbo', label: 'Jumbo', sub: 'Above conforming' },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SectionHeading icon={Home}>Property & Down Payment</SectionHeading>
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

            <InputField label="Loan Amount" icon={DollarSign} value={purchaseInputs.loanAmount} readOnly hint="Auto-calculated" />
            <InputField label="Credit Score" icon={Star} type="number" step="1" value={purchaseInputs.creditScore} onChange={(v) => handlePurchaseChange('creditScore', v)} hint="Mid-score from credit pull (FICO)" tooltip="Lenders use your middle FICO score across the 3 bureaus. Higher scores unlock better rates and lower PMI rates." />
          </div>
          <div className="space-y-5">
            <SectionHeading icon={Calculator}>Loan Terms</SectionHeading>
            <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={purchaseInputs.interestRate} onChange={(v) => handlePurchaseChange('interestRate', v)} hint="May 2026: 30-yr conventional ~6.5-7%" />
            <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="1" value={purchaseInputs.loanTerm} onChange={(v) => handlePurchaseChange('loanTerm', v)} hint="Common: 30, 20, 15, or 10 years" />
            <InputField label="Property Tax Rate (%)" icon={Percent} type="number" step="0.05" value={purchaseInputs.propertyTaxRate} onChange={(v) => handlePurchaseChange('propertyTaxRate', v)} hint="Annual % of home value. Varies by state/county." />
            <InputField label="Home Insurance (Annual)" icon={Shield} value={purchaseInputs.homeInsuranceAnnual} onChange={(v) => handlePurchaseChange('homeInsuranceAnnual', v)} />
            <InputField label="HOA Monthly" icon={Building} value={purchaseInputs.hoaMonthly} onChange={(v) => handlePurchaseChange('hoaMonthly', v)} hint="Leave 0 if no HOA" />
          </div>
        </div>

        <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
          <SectionHeading icon={DollarSign}>Income & Debts (for DTI)</SectionHeading>
          <div className="grid md:grid-cols-2 gap-5 mt-4">
            <InputField label="Gross Monthly Income" icon={DollarSign} value={purchaseInputs.grossMonthlyIncome} onChange={(v) => handlePurchaseChange('grossMonthlyIncome', v)} hint="All borrowers combined, before taxes" />
            <InputField label="Monthly Debt Payments" icon={Banknote} value={purchaseInputs.monthlyDebts} onChange={(v) => handlePurchaseChange('monthlyDebts', v)} hint="Car, student, credit card minimums, child support" />
          </div>
        </div>
      </div>
    );
  };

  const renderRateTermInputs = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SectionHeading icon={Home}>Current Loan & Home Value</SectionHeading>
          <InputField label="Current Home Value" icon={DollarSign} value={rateTermInputs.homeValue} onChange={(v) => setRateTermInputs(p => ({ ...p, homeValue: v }))} hint="Recent appraisal or estimate (Zillow/Redfin)" />
          <InputField label="Current Loan Balance" icon={DollarSign} value={rateTermInputs.currentLoanBalance} onChange={(v) => setRateTermInputs(p => ({ ...p, currentLoanBalance: v }))} />
          <InputField label="Current Interest Rate (%)" icon={Percent} type="number" step="0.01" value={rateTermInputs.currentRate} onChange={(v) => setRateTermInputs(p => ({ ...p, currentRate: v }))} hint="The rate you have today" />
          <InputField label="Current Monthly Payment (P&I)" icon={DollarSign} value={rateTermInputs.currentPayment} onChange={(v) => setRateTermInputs(p => ({ ...p, currentPayment: v }))} hint="Principal & interest only, not PITI" />
          <InputField label="Estimated Closing Costs" icon={DollarSign} value={rateTermInputs.closingCosts} onChange={(v) => setRateTermInputs(p => ({ ...p, closingCosts: v }))} hint="Can be rolled into the new loan" />
          <InputField label="Credit Score" icon={Star} type="number" step="1" value={rateTermInputs.creditScore} onChange={(v) => setRateTermInputs(p => ({ ...p, creditScore: v }))} />
        </div>
        <div className="space-y-5">
          <SectionHeading icon={Calculator}>New Loan Terms</SectionHeading>
          <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>New Loan Amount</p>
            <p className="text-2xl font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>{formatCurrency(parseFloat(rateTermInputs.currentLoanBalance || 0) + parseFloat(rateTermInputs.closingCosts || 0))}</p>
            <p className="text-xs mt-1" style={{ color: BARRETT.slate }}>Current balance + closing costs</p>
          </div>
          <InputField label="New Interest Rate (%)" icon={Percent} type="number" step="0.01" value={rateTermInputs.interestRate} onChange={(v) => setRateTermInputs(p => ({ ...p, interestRate: v }))} />
          <InputField label="New Loan Term (Years)" icon={Calendar} type="number" step="1" value={rateTermInputs.loanTerm} onChange={(v) => setRateTermInputs(p => ({ ...p, loanTerm: v }))} />
          <InputField label="Property Tax Rate (%)" icon={Percent} type="number" step="0.05" value={rateTermInputs.propertyTaxRate} onChange={(v) => setRateTermInputs(p => ({ ...p, propertyTaxRate: v }))} />
          <InputField label="Home Insurance (Annual)" icon={Shield} value={rateTermInputs.homeInsuranceAnnual} onChange={(v) => setRateTermInputs(p => ({ ...p, homeInsuranceAnnual: v }))} />
          <InputField label="HOA Monthly" icon={Building} value={rateTermInputs.hoaMonthly} onChange={(v) => setRateTermInputs(p => ({ ...p, hoaMonthly: v }))} />
        </div>
      </div>
      <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
        <SectionHeading icon={DollarSign}>Income & Debts</SectionHeading>
        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <InputField label="Gross Monthly Income" icon={DollarSign} value={rateTermInputs.grossMonthlyIncome} onChange={(v) => setRateTermInputs(p => ({ ...p, grossMonthlyIncome: v }))} />
          <InputField label="Monthly Debt Payments" icon={Banknote} value={rateTermInputs.monthlyDebts} onChange={(v) => setRateTermInputs(p => ({ ...p, monthlyDebts: v }))} />
        </div>
      </div>
    </div>
  );

  const renderCashOutInputs = () => (
    <div className="space-y-6">
      <div>
        <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
          <FileText className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
          Cash-Out Purpose
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 'home-improvement', label: 'Home Improvement' },
            { id: 'debt-consolidation', label: 'Debt Consolidation' },
            { id: 'investment', label: 'Investment' },
            { id: 'other', label: 'Other' },
          ].map(opt => (
            <button key={opt.id} type="button" onClick={() => setCashOutInputs(p => ({ ...p, cashOutPurpose: opt.id }))}
              className="px-3 py-2.5 rounded-md font-medium transition-all text-xs"
              style={{
                border: `2px solid ${cashOutInputs.cashOutPurpose === opt.id ? BARRETT.navy : BARRETT.line}`,
                backgroundColor: cashOutInputs.cashOutPurpose === opt.id ? BARRETT.navy : BARRETT.white,
                color: cashOutInputs.cashOutPurpose === opt.id ? BARRETT.white : BARRETT.slate,
                fontFamily: FONT_STACK,
              }}>{opt.label}</button>
          ))}
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SectionHeading icon={Home}>Home & Cash Out</SectionHeading>
          <InputField label="Current Home Value" icon={DollarSign} value={cashOutInputs.homeValue} onChange={(v) => setCashOutInputs(p => ({ ...p, homeValue: v }))} />
          <InputField label="Current Loan Balance" icon={DollarSign} value={cashOutInputs.currentLoanBalance} onChange={(v) => setCashOutInputs(p => ({ ...p, currentLoanBalance: v }))} />
          <InputField label="Cash to Receive" icon={Banknote} value={cashOutInputs.cashOutAmount} onChange={(v) => setCashOutInputs(p => ({ ...p, cashOutAmount: v }))} hint="Cash in your pocket at closing" />
          <InputField label="Estimated Closing Costs" icon={DollarSign} value={cashOutInputs.closingCosts} onChange={(v) => setCashOutInputs(p => ({ ...p, closingCosts: v }))} />
          <InputField label="Credit Score" icon={Star} type="number" step="1" value={cashOutInputs.creditScore} onChange={(v) => setCashOutInputs(p => ({ ...p, creditScore: v }))} hint="Cash-out typically needs 680+ for conventional" />
        </div>
        <div className="space-y-5">
          <SectionHeading icon={Calculator}>New Loan Terms</SectionHeading>
          <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>New Loan Amount</p>
            <p className="text-2xl font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>{formatCurrency(parseFloat(cashOutInputs.currentLoanBalance || 0) + parseFloat(cashOutInputs.cashOutAmount || 0) + parseFloat(cashOutInputs.closingCosts || 0))}</p>
            <p className="text-xs mt-1" style={{ color: BARRETT.slate }}>Balance + cash out + closing costs</p>
          </div>
          <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={cashOutInputs.interestRate} onChange={(v) => setCashOutInputs(p => ({ ...p, interestRate: v }))} hint="Cash-out rates run ~0.25-0.50% higher than rate/term" />
          <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="1" value={cashOutInputs.loanTerm} onChange={(v) => setCashOutInputs(p => ({ ...p, loanTerm: v }))} />
          <InputField label="Property Tax Rate (%)" icon={Percent} type="number" step="0.05" value={cashOutInputs.propertyTaxRate} onChange={(v) => setCashOutInputs(p => ({ ...p, propertyTaxRate: v }))} />
          <InputField label="Home Insurance (Annual)" icon={Shield} value={cashOutInputs.homeInsuranceAnnual} onChange={(v) => setCashOutInputs(p => ({ ...p, homeInsuranceAnnual: v }))} />
          <InputField label="HOA Monthly" icon={Building} value={cashOutInputs.hoaMonthly} onChange={(v) => setCashOutInputs(p => ({ ...p, hoaMonthly: v }))} />
        </div>
      </div>
      <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
        <SectionHeading icon={DollarSign}>Income & Debts</SectionHeading>
        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <InputField label="Gross Monthly Income" icon={DollarSign} value={cashOutInputs.grossMonthlyIncome} onChange={(v) => setCashOutInputs(p => ({ ...p, grossMonthlyIncome: v }))} />
          <InputField label="Monthly Debt Payments" icon={Banknote} value={cashOutInputs.monthlyDebts} onChange={(v) => setCashOutInputs(p => ({ ...p, monthlyDebts: v }))} hint="After debts you're paying off with cash-out, if applicable" />
        </div>
      </div>
    </div>
  );

  const renderHelocInputs = () => (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SectionHeading icon={Home}>Home & First Mortgage</SectionHeading>
          <InputField label="Current Home Value" icon={DollarSign} value={helocInputs.homeValue} onChange={(v) => setHelocInputs(p => ({ ...p, homeValue: v }))} />
          <InputField label="Current 1st Mortgage Balance" icon={DollarSign} value={helocInputs.currentMortgageBalance} onChange={(v) => setHelocInputs(p => ({ ...p, currentMortgageBalance: v }))} hint="Existing 1st mortgage. Leave 0 if home is paid off." />
          <InputField label="Credit Line Requested" icon={Layers} value={helocInputs.creditLineRequested} onChange={(v) => setHelocInputs(p => ({ ...p, creditLineRequested: v }))} hint="Maximum draw amount" />
          <InputField label="Credit Score" icon={Star} type="number" step="1" value={helocInputs.creditScore} onChange={(v) => setHelocInputs(p => ({ ...p, creditScore: v }))} hint="Most HELOC lenders want 680+" />
        </div>
        <div className="space-y-5">
          <SectionHeading icon={Calculator}>HELOC Terms</SectionHeading>
          <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.surface, borderColor: BARRETT.gold }}>
            <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: BARRETT.slate, letterSpacing: '0.08em' }}>Combined LTV (CLTV)</p>
            <p className="text-2xl font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>
              {(() => {
                const hv = parseFloat(helocInputs.homeValue) || 0;
                const m1 = parseFloat(helocInputs.currentMortgageBalance) || 0;
                const ln = parseFloat(helocInputs.creditLineRequested) || 0;
                return hv > 0 ? `${(((m1 + ln) / hv) * 100).toFixed(1)}%` : '—';
              })()}
            </p>
            <p className="text-xs mt-1" style={{ color: BARRETT.slate }}>(1st mortgage + HELOC) / home value</p>
          </div>
          <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={helocInputs.interestRate} onChange={(v) => setHelocInputs(p => ({ ...p, interestRate: v }))} hint="HELOC rates are variable, tied to Prime" tooltip="HELOC rates are typically Prime + margin. As Prime moves, your rate moves." />
          <InputField label="Draw Period (Years)" icon={Calendar} type="number" step="1" value={helocInputs.drawPeriodYears} onChange={(v) => setHelocInputs(p => ({ ...p, drawPeriodYears: v }))} hint="Interest-only during draw. Typical: 10 years." />
          <InputField label="Repayment Period (Years)" icon={Calendar} type="number" step="1" value={helocInputs.repaymentPeriodYears} onChange={(v) => setHelocInputs(p => ({ ...p, repaymentPeriodYears: v }))} hint="Principal & interest after draw. Typical: 20 years." />
        </div>
      </div>
      <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
        <SectionHeading icon={DollarSign}>Income & Debts</SectionHeading>
        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <InputField label="Gross Monthly Income" icon={DollarSign} value={helocInputs.grossMonthlyIncome} onChange={(v) => setHelocInputs(p => ({ ...p, grossMonthlyIncome: v }))} />
          <InputField label="Monthly Debt Payments" icon={Banknote} value={helocInputs.monthlyDebts} onChange={(v) => setHelocInputs(p => ({ ...p, monthlyDebts: v }))} hint="Includes the 1st mortgage P&I" />
        </div>
      </div>
    </div>
  );

  const renderFhaInputs = () => (
    <div className="space-y-6">
      <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: '#FFFBEB', borderColor: BARRETT.amber }}>
        <p className="text-sm" style={{ color: BARRETT.ink }}>
          <strong style={{ color: BARRETT.navy }}>FHA Loan:</strong> 3.5% down (or 10% with 500-579 score), competitive rates, and easier qualifying than conventional. Includes upfront MIP (1.75%) and monthly MIP for the life of the loan in most cases.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SectionHeading icon={Home}>Property & Down Payment</SectionHeading>
          <InputField label="Purchase Price" icon={DollarSign} value={fhaInputs.purchasePrice} onChange={(v) => setFhaInputs(p => ({ ...p, purchasePrice: v }))} hint="Must be within FHA county loan limit" />
          <InputField label="Down Payment (%)" icon={Percent} type="number" step="0.5" value={fhaInputs.downPaymentPct} onChange={(v) => {
            const pct = parseFloat(v) || 0;
            const price = parseFloat(fhaInputs.purchasePrice) || 0;
            setFhaInputs(p => ({ ...p, downPaymentPct: v, downPayment: Math.round(price * (pct / 100)) }));
          }} hint="Minimum 3.5% (FICO 580+) or 10% (FICO 500-579)" />
          <InputField label="Down Payment ($)" icon={DollarSign} value={fhaInputs.downPayment} readOnly hint="Auto-calculated from %" />
          <InputField label="Credit Score" icon={Star} type="number" step="1" value={fhaInputs.creditScore} onChange={(v) => setFhaInputs(p => ({ ...p, creditScore: v }))} hint="FHA floor: 580 for 3.5% down, 500 for 10% down" />
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={fhaInputs.isFirstTimeBuyer} onChange={(e) => setFhaInputs(p => ({ ...p, isFirstTimeBuyer: e.target.checked }))} className="w-4 h-4" />
              <span className="text-sm font-medium" style={{ color: BARRETT.navy }}>First-Time Home Buyer</span>
              <Tooltip text="FTHB status may unlock down payment assistance programs that pair with FHA." />
            </label>
          </div>
        </div>
        <div className="space-y-5">
          <SectionHeading icon={Calculator}>Loan Terms</SectionHeading>
          <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={fhaInputs.interestRate} onChange={(v) => setFhaInputs(p => ({ ...p, interestRate: v }))} hint="FHA rates often slightly below conventional" />
          <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="1" value={fhaInputs.loanTerm} onChange={(v) => setFhaInputs(p => ({ ...p, loanTerm: v }))} hint="30 or 15 years standard" />
          <InputField label="Property Tax Rate (%)" icon={Percent} type="number" step="0.05" value={fhaInputs.propertyTaxRate} onChange={(v) => setFhaInputs(p => ({ ...p, propertyTaxRate: v }))} />
          <InputField label="Home Insurance (Annual)" icon={Shield} value={fhaInputs.homeInsuranceAnnual} onChange={(v) => setFhaInputs(p => ({ ...p, homeInsuranceAnnual: v }))} />
          <InputField label="HOA Monthly" icon={Building} value={fhaInputs.hoaMonthly} onChange={(v) => setFhaInputs(p => ({ ...p, hoaMonthly: v }))} />
        </div>
      </div>
      <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
        <SectionHeading icon={DollarSign}>Income & Debts</SectionHeading>
        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <InputField label="Gross Monthly Income" icon={DollarSign} value={fhaInputs.grossMonthlyIncome} onChange={(v) => setFhaInputs(p => ({ ...p, grossMonthlyIncome: v }))} />
          <InputField label="Monthly Debt Payments" icon={Banknote} value={fhaInputs.monthlyDebts} onChange={(v) => setFhaInputs(p => ({ ...p, monthlyDebts: v }))} />
        </div>
      </div>
    </div>
  );

  const renderVaInputs = () => (
    <div className="space-y-6">
      <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: '#EFF6FF', borderColor: BARRETT.navy }}>
        <p className="text-sm" style={{ color: BARRETT.ink }}>
          <strong style={{ color: BARRETT.navy }}>VA Loan:</strong> Available to eligible veterans, active-duty service members, and certain surviving spouses. 100% financing, no PMI ever, and competitive rates. Funding fee waived for those with disability ratings.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-5">
          <SectionHeading icon={Flag}>Veteran Status & Property</SectionHeading>
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={vaInputs.isFirstTimeUse} onChange={(e) => setVaInputs(p => ({ ...p, isFirstTimeUse: e.target.checked }))} className="w-4 h-4" />
              <span className="text-sm font-medium" style={{ color: BARRETT.navy }}>First-Time Use of VA Entitlement</span>
              <Tooltip text="Funding fee is lower for first-time VA loan use. Subsequent uses come with a higher fee unless waived." />
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={vaInputs.hasDisabilityRating} onChange={(e) => setVaInputs(p => ({ ...p, hasDisabilityRating: e.target.checked }))} className="w-4 h-4" />
              <span className="text-sm font-medium" style={{ color: BARRETT.navy }}>Has VA Disability Rating (Funding Fee Waived)</span>
              <Tooltip text="Veterans receiving VA disability compensation, Purple Heart recipients, and surviving spouses of veterans who died in service are exempt from the funding fee." />
            </label>
          </div>
          <InputField label="Purchase Price" icon={DollarSign} value={vaInputs.purchasePrice} onChange={(v) => setVaInputs(p => ({ ...p, purchasePrice: v }))} hint="No max in most counties — VA loans allow $0 down up to ~$766k+ in 2026" />
          <InputField label="Down Payment ($)" icon={DollarSign} value={vaInputs.downPayment} onChange={(v) => setVaInputs(p => ({ ...p, downPayment: v }))} hint="Optional — VA allows $0 down. Putting 5%+ reduces funding fee." />
          <InputField label="Credit Score" icon={Star} type="number" step="1" value={vaInputs.creditScore} onChange={(v) => setVaInputs(p => ({ ...p, creditScore: v }))} hint="VA has no minimum — lender overlays usually 580-620+" />
        </div>
        <div className="space-y-5">
          <SectionHeading icon={Calculator}>Loan Terms</SectionHeading>
          <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={vaInputs.interestRate} onChange={(v) => setVaInputs(p => ({ ...p, interestRate: v }))} hint="VA rates often 0.25-0.50% below conventional" />
          <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="1" value={vaInputs.loanTerm} onChange={(v) => setVaInputs(p => ({ ...p, loanTerm: v }))} />
          <InputField label="Property Tax Rate (%)" icon={Percent} type="number" step="0.05" value={vaInputs.propertyTaxRate} onChange={(v) => setVaInputs(p => ({ ...p, propertyTaxRate: v }))} />
          <InputField label="Home Insurance (Annual)" icon={Shield} value={vaInputs.homeInsuranceAnnual} onChange={(v) => setVaInputs(p => ({ ...p, homeInsuranceAnnual: v }))} />
          <InputField label="HOA Monthly" icon={Building} value={vaInputs.hoaMonthly} onChange={(v) => setVaInputs(p => ({ ...p, hoaMonthly: v }))} />
        </div>
      </div>
      <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
        <SectionHeading icon={DollarSign}>Income & Debts</SectionHeading>
        <div className="grid md:grid-cols-2 gap-5 mt-4">
          <InputField label="Gross Monthly Income" icon={DollarSign} value={vaInputs.grossMonthlyIncome} onChange={(v) => setVaInputs(p => ({ ...p, grossMonthlyIncome: v }))} />
          <InputField label="Monthly Debt Payments" icon={Banknote} value={vaInputs.monthlyDebts} onChange={(v) => setVaInputs(p => ({ ...p, monthlyDebts: v }))} />
        </div>
      </div>
    </div>
  );

  const renderInvestorInputs = () => {
    const mode = investorInputs.investorMode || 'dscr';
    return (
      <div className="space-y-6">
        <div className="p-4 rounded-md border-l-4" style={{ backgroundColor: BARRETT.violetSurface, borderColor: BARRETT.gold }}>
          <p className="text-sm" style={{ color: BARRETT.ink }}>
            <strong style={{ color: BARRETT.gold }}>Investor / Non-QM:</strong> Qualify the property (DSCR) or qualify on bank deposits (Bank Statement) — no tax returns required. Typical pricing runs 125-200 bps above conventional. Investment / business-purpose loans only.
          </p>
        </div>

        {/* Sub-mode toggle */}
        <div>
          <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
            <Layers className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
            Qualification Method
          </label>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" onClick={() => setInvestorInputs(p => ({ ...p, investorMode: 'dscr' }))}
              className="px-4 py-3 rounded-md text-sm font-medium transition-all text-left"
              style={{
                backgroundColor: mode === 'dscr' ? BARRETT.gold : BARRETT.white,
                color: mode === 'dscr' ? BARRETT.white : BARRETT.navy,
                border: `1px solid ${mode === 'dscr' ? BARRETT.gold : BARRETT.line}`,
              }}>
              <div className="font-semibold">DSCR</div>
              <div className="text-xs mt-1 opacity-90">Property cash-flows the debt. No income docs.</div>
            </button>
            <button type="button" onClick={() => setInvestorInputs(p => ({ ...p, investorMode: 'bankStatement' }))}
              className="px-4 py-3 rounded-md text-sm font-medium transition-all text-left"
              style={{
                backgroundColor: mode === 'bankStatement' ? BARRETT.gold : BARRETT.white,
                color: mode === 'bankStatement' ? BARRETT.white : BARRETT.navy,
                border: `1px solid ${mode === 'bankStatement' ? BARRETT.gold : BARRETT.line}`,
              }}>
              <div className="font-semibold">Bank Statement</div>
              <div className="text-xs mt-1 opacity-90">12/24 mo deposits = qualifying income.</div>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <SectionHeading icon={Home}>Property & Down</SectionHeading>
            <InputField label="Purchase Price" icon={DollarSign} value={investorInputs.purchasePrice} onChange={(v) => setInvestorInputs(p => ({ ...p, purchasePrice: v }))} hint="Subject property — non-owner occupied" />
            <InputField label="Down Payment ($)" icon={DollarSign} value={investorInputs.downPayment} onChange={(v) => setInvestorInputs(p => ({ ...p, downPayment: v }))} hint={mode === 'dscr' ? 'Most DSCR programs require 20-25% down' : '15-25% typical for bank statement'} />
            <InputField label="Credit Score" icon={Star} type="number" step="1" value={investorInputs.creditScore} onChange={(v) => setInvestorInputs(p => ({ ...p, creditScore: v }))} hint="Most investor programs require 660-680+; best pricing at 740+" />
            <div>
              <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
                <Clock className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
                Prepay Penalty
                <Tooltip text="Investor loans often carry a prepay penalty in exchange for a lower rate. 'None' adds ~50-75 bps to rate. 3yr or 5yr penalties are standard for buy-and-hold." />
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[{v: 'none', l: 'None'}, {v: '3yr', l: '3-year'}, {v: '5yr', l: '5-year'}].map(o => (
                  <button key={o.v} type="button" onClick={() => setInvestorInputs(p => ({ ...p, prepayPenalty: o.v }))}
                    className="px-3 py-2 rounded-md text-xs font-medium transition-all"
                    style={{
                      backgroundColor: investorInputs.prepayPenalty === o.v ? BARRETT.gold : BARRETT.white,
                      color: investorInputs.prepayPenalty === o.v ? BARRETT.white : BARRETT.navy,
                      border: `1px solid ${investorInputs.prepayPenalty === o.v ? BARRETT.gold : BARRETT.line}`,
                    }}>{o.l}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <SectionHeading icon={Calculator}>Loan Terms & PITI</SectionHeading>
            <InputField label="Interest Rate (%)" icon={Percent} type="number" step="0.01" value={investorInputs.interestRate} onChange={(v) => setInvestorInputs(p => ({ ...p, interestRate: v }))} hint="Non-QM investor rate — typically 125-200 bps over conventional" />
            <InputField label="Loan Term (Years)" icon={Calendar} type="number" step="1" value={investorInputs.loanTerm} onChange={(v) => setInvestorInputs(p => ({ ...p, loanTerm: v }))} hint="30-year fixed most common; 40-yr I/O available on some DSCR" />
            <InputField label="Property Tax Rate (%)" icon={Percent} type="number" step="0.05" value={investorInputs.propertyTaxRate} onChange={(v) => setInvestorInputs(p => ({ ...p, propertyTaxRate: v }))} />
            <InputField label="Insurance (Annual)" icon={Shield} value={investorInputs.homeInsuranceAnnual} onChange={(v) => setInvestorInputs(p => ({ ...p, homeInsuranceAnnual: v }))} hint="Landlord / DP-3 policies — usually 15-25% higher than owner-occupied" />
            <InputField label="HOA Monthly" icon={Building} value={investorInputs.hoaMonthly} onChange={(v) => setInvestorInputs(p => ({ ...p, hoaMonthly: v }))} />
          </div>
        </div>

        {/* DSCR-specific block */}
        {mode === 'dscr' && (
          <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
            <SectionHeading icon={BarChart}>Rental Underwriting</SectionHeading>
            <div className="grid md:grid-cols-3 gap-5 mt-4">
              <InputField label="Monthly Rent" icon={DollarSign} value={investorInputs.monthlyRent} onChange={(v) => setInvestorInputs(p => ({ ...p, monthlyRent: v }))} hint="Market rent or in-place rent (use 1007 / lease)" />
              <InputField label="Vacancy Rate (%)" icon={Percent} type="number" step="0.5" value={investorInputs.vacancyRate} onChange={(v) => setInvestorInputs(p => ({ ...p, vacancyRate: v }))} hint="5% standard; underwriters stress 5-8%" tooltip="Vacancy haircut accounts for turnover periods between tenants. Most lenders apply 5-8% regardless of historical occupancy." />
              <InputField label="Mgmt Fee (%)" icon={Percent} type="number" step="0.5" value={investorInputs.propertyMgmtPct} onChange={(v) => setInvestorInputs(p => ({ ...p, propertyMgmtPct: v }))} hint="8-10% typical; can be 0 if self-managing" />
            </div>
          </div>
        )}

        {/* Bank Statement-specific block */}
        {mode === 'bankStatement' && (
          <div className="pt-6 border-t" style={{ borderColor: BARRETT.line }}>
            <SectionHeading icon={Briefcase}>Bank Statement Qualification</SectionHeading>
            <div className="grid md:grid-cols-2 gap-5 mt-4">
              <div>
                <label className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: BARRETT.navy, letterSpacing: '0.08em' }}>
                  <Calendar className="w-3.5 h-3.5" style={{ color: BARRETT.gold }} />
                  Statement Period
                  <Tooltip text="12-month programs price 25-50 bps higher than 24-month. Most self-employed borrowers go 24-month for the better pricing if their deposits are consistent." />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[{v: 12, l: '12 months'}, {v: 24, l: '24 months'}].map(o => (
                    <button key={o.v} type="button" onClick={() => setInvestorInputs(p => ({ ...p, statementMonths: o.v }))}
                      className="px-3 py-2 rounded-md text-xs font-medium transition-all"
                      style={{
                        backgroundColor: investorInputs.statementMonths === o.v ? BARRETT.gold : BARRETT.white,
                        color: investorInputs.statementMonths === o.v ? BARRETT.white : BARRETT.navy,
                        border: `1px solid ${investorInputs.statementMonths === o.v ? BARRETT.gold : BARRETT.line}`,
                      }}>{o.l}</button>
                  ))}
                </div>
              </div>
              <InputField label="Avg Monthly Deposits" icon={DollarSign} value={investorInputs.monthlyBankDeposits} onChange={(v) => setInvestorInputs(p => ({ ...p, monthlyBankDeposits: v }))} hint="Average across the statement period — business or personal" />
              <InputField label="Expense Factor (%)" icon={Percent} type="number" step="5" value={investorInputs.expenseFactor} onChange={(v) => setInvestorInputs(p => ({ ...p, expenseFactor: v }))} hint="30-50% standard; CPA letter can establish lower" tooltip="The lender treats this % of deposits as business expenses, so qualifying income = deposits × (1 − factor). Service businesses often get 30%; product/inventory businesses 50%+." />
              <InputField label="Other Monthly Debts" icon={Banknote} value={investorInputs.monthlyDebts} onChange={(v) => setInvestorInputs(p => ({ ...p, monthlyDebts: v }))} hint="Car, student, credit card minimums — used in DTI" />
            </div>
          </div>
        )}
      </div>
    );
  };

  // ----- RESULTS PANELS -----

  const renderResultsPanel = () => {
    if (activeTab === 'purchase' && purchaseMode === 'affordability') {
      return (
        <div>
          <h2 className="text-lg font-bold mb-6 pb-3 border-b" style={{ color: BARRETT.navy, borderColor: BARRETT.line, fontFamily: FONT_STACK }}>Affordability Analysis</h2>
          <div className="rounded-md p-6 mb-5" style={{ backgroundColor: BARRETT.navy, color: BARRETT.white }}>
            <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(124, 58, 237, 0.3)' }}>
              <ArrowUpDown className="w-4 h-4" style={{ color: BARRETT.gold }} />
              <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: BARRETT.gold, letterSpacing: '0.15em' }}>You Could Afford</h3>
            </div>
            <div className="space-y-4">
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Maximum Home Price</div>
                <div className="text-3xl font-bold" style={{ color: BARRETT.gold }}>{formatCurrency(affordabilityResults.maxHomePrice)}</div>
                {affordabilityResults.governingConstraint && (
                  <div className="text-xs mt-1" style={{ color: '#CBD5E1' }}>Constrained by: <span className="font-semibold">{affordabilityResults.governingConstraint}</span></div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Max Loan Amount</div>
                  <div className="text-base font-bold">{formatCurrency(affordabilityResults.maxLoanAmount)}</div>
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Max Monthly PITI</div>
                  <div className="text-base font-bold">{formatCurrency(affordabilityResults.maxMonthlyPITI)}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-md p-6 mb-5" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}`, borderTop: `3px solid ${BARRETT.gold}` }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>Both Constraints</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span style={{ color: BARRETT.slate }}>By Back-End DTI:</span>
                <span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(affordabilityResults.maxByDTI)}/mo</span>
              </div>
              <div className="flex justify-between text-sm">
                <span style={{ color: BARRETT.slate }}>By Front-End (31%):</span>
                <span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(affordabilityResults.maxByFrontEnd)}/mo</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const isHeloc = activeTab === 'heloc';

    return (
      <div>
        <h2 className="text-lg font-bold mb-6 pb-3 border-b" style={{ color: BARRETT.navy, borderColor: BARRETT.line, fontFamily: FONT_STACK }}>Your Mortgage Snapshot</h2>

        {/* KEY RATIOS — navy card */}
        <div className="rounded-md p-6 mb-5" style={{ backgroundColor: BARRETT.navy, color: BARRETT.white }}>
          <div className="flex items-center gap-2 mb-4 pb-3 border-b" style={{ borderColor: 'rgba(124, 58, 237, 0.3)' }}>
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
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>{isHeloc ? 'CLTV' : 'LTV'}</div>
                <div className="text-lg font-bold">{formatPercent(isHeloc ? results.cltv : results.ltv)}</div>
              </div>
              {activeTab === 'investor' && investorInputs.investorMode === 'dscr' ? (
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>DSCR</div>
                  <div className="text-lg font-bold" style={{ color: (results.dscr || 0) >= 1.20 ? '#86EFAC' : (results.dscr || 0) >= 1.0 ? '#FCD34D' : '#FCA5A5' }}>
                    {(results.dscr || 0).toFixed(2)}
                  </div>
                </div>
              ) : results.dti > 0 && (
                <div>
                  <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>DTI</div>
                  <div className="text-lg font-bold" style={{ color: getDTIColor(results.dti) }}>{results.dti.toFixed(1)}%</div>
                </div>
              )}
            </div>
            {activeTab === 'investor' && investorInputs.investorMode === 'dscr' ? (
              <div className="pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>Coverage Status</div>
                <div className="flex items-baseline gap-3">
                  <div className="text-base font-bold" style={{ color: (results.dscr || 0) >= 1.20 ? '#86EFAC' : (results.dscr || 0) >= 1.0 ? '#FCD34D' : '#FCA5A5' }}>
                    {(results.dscr || 0) >= 1.20 ? 'Strong' : (results.dscr || 0) >= 1.0 ? 'Break-even' : 'Sub-1.0'}
                  </div>
                  <div className="text-xs" style={{ color: '#CBD5E1' }}>Effective rent: {formatCurrencyDetailed(results.effectiveRent || 0)}/mo</div>
                </div>
              </div>
            ) : results.dti > 0 && (
              <div className="pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.1)' }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: '#94A3B8' }}>DTI Status</div>
                <div className="flex items-baseline gap-3">
                  <div className="text-base font-bold" style={{ color: getDTIColor(results.dti) }}>{getDTIStatus(results.dti)}</div>
                  {results.frontEndDTI > 0 && (
                    <div className="text-xs" style={{ color: '#CBD5E1' }}>Front-end: {results.frontEndDTI.toFixed(1)}%</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* MONTHLY PAYMENT BREAKDOWN — gold accent card */}
        <div className="rounded-md p-6 mb-5" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}`, borderTop: `3px solid ${BARRETT.gold}` }}>
          <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>
            {isHeloc ? 'HELOC Payment' : 'Monthly Payment'}
          </h3>
          {isHeloc ? (
            <div className="space-y-3">
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: BARRETT.slate }}>Interest-Only (Draw Period)</div>
                <div className="text-2xl font-bold" style={{ color: BARRETT.navy }}>{formatCurrencyDetailed(results.helocInterestOnlyPayment)}</div>
              </div>
              <div className="pt-3 border-t" style={{ borderColor: BARRETT.line }}>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: BARRETT.slate }}>P&I (Repayment Period)</div>
                <div className="text-base font-semibold" style={{ color: BARRETT.navy }}>{formatCurrencyDetailed(results.helocFullPayment)}</div>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div>
                <div className="text-xs uppercase tracking-wider mb-1" style={{ color: BARRETT.slate }}>Total Monthly (PITI{(results.pmiMonthly > 0 || results.monthlyMIP > 0) ? '+MI' : ''})</div>
                <div className="text-2xl font-bold" style={{ color: BARRETT.navy }}>{formatCurrencyDetailed(results.totalMonthlyPayment)}</div>
              </div>
              <div className="pt-3 border-t space-y-2 text-sm" style={{ borderColor: BARRETT.line }}>
                <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Principal & Interest:</span><span className="font-semibold" style={{ color: BARRETT.ink }}>{formatCurrencyDetailed(results.monthlyPI)}</span></div>
                {results.propertyTaxMonthly > 0 && (
                  <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Property Tax:</span><span className="font-semibold" style={{ color: BARRETT.ink }}>{formatCurrencyDetailed(results.propertyTaxMonthly)}</span></div>
                )}
                {results.insuranceMonthly > 0 && (
                  <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Home Insurance:</span><span className="font-semibold" style={{ color: BARRETT.ink }}>{formatCurrencyDetailed(results.insuranceMonthly)}</span></div>
                )}
                {results.hoaMonthly > 0 && (
                  <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>HOA:</span><span className="font-semibold" style={{ color: BARRETT.ink }}>{formatCurrencyDetailed(results.hoaMonthly)}</span></div>
                )}
                {results.pmiMonthly > 0 && (
                  <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>PMI:</span><span className="font-semibold" style={{ color: BARRETT.amber }}>{formatCurrencyDetailed(results.pmiMonthly)}</span></div>
                )}
                {results.monthlyMIP > 0 && (
                  <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>FHA MIP:</span><span className="font-semibold" style={{ color: BARRETT.amber }}>{formatCurrencyDetailed(results.monthlyMIP)}</span></div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* PROGRAM-SPECIFIC CARDS */}
        {(activeTab === 'fha' && results.upfrontMIP > 0) && (
          <div className="rounded-md p-5 mb-5" style={{ backgroundColor: BARRETT.surface, border: `1px solid ${BARRETT.line}` }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>FHA MIP Detail</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Upfront MIP (1.75%, financed):</span><span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(results.upfrontMIP)}</span></div>
              <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Monthly MIP:</span><span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrencyDetailed(results.monthlyMIP)}</span></div>
            </div>
          </div>
        )}

        {(activeTab === 'va' && results.vaFundingFee >= 0) && (
          <div className="rounded-md p-5 mb-5" style={{ backgroundColor: BARRETT.surface, border: `1px solid ${BARRETT.line}` }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>VA Funding Fee</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: BARRETT.slate }}>Funding Fee {vaInputs.hasDisabilityRating ? '(Waived)' : `(${results.vaFundingFeeRate.toFixed(2)}%)`}:</span>
                <span className="font-bold" style={{ color: vaInputs.hasDisabilityRating ? BARRETT.green : BARRETT.navy }}>{formatCurrency(results.vaFundingFee)}</span>
              </div>
              <div className="text-xs italic" style={{ color: BARRETT.slate }}>
                {vaInputs.hasDisabilityRating ? 'Fee waived due to disability rating ✓' : 'Typically rolled into the loan'}
              </div>
            </div>
          </div>
        )}

        {/* INVESTOR — DSCR coverage card */}
        {(activeTab === 'investor' && investorInputs.investorMode === 'dscr' && results.loanAmount > 0) && (
          <div className="rounded-md p-5 mb-5" style={{ backgroundColor: BARRETT.surface, border: `1px solid ${BARRETT.line}` }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>DSCR Coverage</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Gross Monthly Rent:</span><span className="font-semibold" style={{ color: BARRETT.ink }}>{formatCurrency(parseFloat(investorInputs.monthlyRent) || 0)}</span></div>
              <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Less Vacancy ({investorInputs.vacancyRate || 0}%) & Mgmt ({investorInputs.propertyMgmtPct || 0}%):</span><span className="font-semibold" style={{ color: BARRETT.slate }}>−{formatCurrency((parseFloat(investorInputs.monthlyRent) || 0) - (results.effectiveRent || 0))}</span></div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: BARRETT.line }}><span style={{ color: BARRETT.slate }}>Effective Rent:</span><span className="font-bold" style={{ color: BARRETT.ink }}>{formatCurrencyDetailed(results.effectiveRent || 0)}</span></div>
              <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>÷ Total PITI:</span><span className="font-semibold" style={{ color: BARRETT.slate }}>{formatCurrencyDetailed(results.totalMonthlyPayment || 0)}</span></div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: BARRETT.line }}>
                <span className="font-bold uppercase tracking-wider text-xs" style={{ color: BARRETT.navy }}>DSCR:</span>
                <span className="font-bold text-lg" style={{ color: (results.dscr || 0) >= 1.20 ? BARRETT.green : (results.dscr || 0) >= 1.0 ? BARRETT.amber : BARRETT.red }}>
                  {(results.dscr || 0).toFixed(2)}
                </span>
              </div>
              <div className="text-xs mt-2" style={{ color: BARRETT.slate }}>
                {(results.dscr || 0) >= 1.20 ? '✓ Best pricing tier' : (results.dscr || 0) >= 1.0 ? '◐ Qualifies with adders' : '⚠ Sub-1.0 — no-ratio program needed'}
              </div>
            </div>
          </div>
        )}

        {/* INVESTOR — Bank Statement income card */}
        {(activeTab === 'investor' && investorInputs.investorMode === 'bankStatement' && results.loanAmount > 0) && (
          <div className="rounded-md p-5 mb-5" style={{ backgroundColor: BARRETT.surface, border: `1px solid ${BARRETT.line}` }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>Bank Statement Income</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Avg Monthly Deposits ({investorInputs.statementMonths}-mo):</span><span className="font-semibold" style={{ color: BARRETT.ink }}>{formatCurrency(parseFloat(investorInputs.monthlyBankDeposits) || 0)}</span></div>
              <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Less Expense Factor ({investorInputs.expenseFactor || 0}%):</span><span className="font-semibold" style={{ color: BARRETT.slate }}>−{formatCurrency((parseFloat(investorInputs.monthlyBankDeposits) || 0) - (results.bankStatementMonthlyIncome || 0))}</span></div>
              <div className="flex justify-between pt-2 border-t" style={{ borderColor: BARRETT.line }}>
                <span className="font-bold uppercase tracking-wider text-xs" style={{ color: BARRETT.navy }}>Qualifying Income:</span>
                <span className="font-bold" style={{ color: BARRETT.gold }}>{formatCurrencyDetailed(results.bankStatementMonthlyIncome || 0)}/mo</span>
              </div>
              <div className="flex justify-between text-xs"><span style={{ color: BARRETT.slate }}>Annualized:</span><span className="font-semibold" style={{ color: BARRETT.slate }}>{formatCurrency((results.bankStatementMonthlyIncome || 0) * 12)}/yr</span></div>
            </div>
          </div>
        )}

        {/* REFI BREAK-EVEN */}
        {activeTab === 'rateTerm' && results.monthlySavings !== 0 && (
          <div className="rounded-md p-5 mb-5" style={{ backgroundColor: BARRETT.surface, border: `1px solid ${BARRETT.line}` }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>Refi Break-Even</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span style={{ color: BARRETT.slate }}>Monthly Savings:</span>
                <span className="font-bold" style={{ color: results.monthlySavings > 0 ? BARRETT.green : BARRETT.red }}>
                  {results.monthlySavings > 0 ? '+' : ''}{formatCurrencyDetailed(results.monthlySavings)}
                </span>
              </div>
              {results.breakEvenMonths > 0 && (
                <div className="flex justify-between">
                  <span style={{ color: BARRETT.slate }}>Break-Even:</span>
                  <span className="font-bold" style={{ color: BARRETT.navy }}>{results.breakEvenMonths} months</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* LIFETIME COST */}
        {!isHeloc && results.totalInterestPaid > 0 && (
          <div className="rounded-md p-5 mb-5" style={{ backgroundColor: BARRETT.surface, border: `1px solid ${BARRETT.line}` }}>
            <h3 className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: BARRETT.navy, letterSpacing: '0.15em' }}>Lifetime Cost</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Total Interest Paid:</span><span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(results.totalInterestPaid)}</span></div>
              <div className="flex justify-between"><span style={{ color: BARRETT.slate }}>Total of Payments:</span><span className="font-bold" style={{ color: BARRETT.navy }}>{formatCurrency(results.totalCostOfLoan)}</span></div>
            </div>
          </div>
        )}

        {!isHeloc && (
          <button onClick={() => setShowSchedule(!showSchedule)}
            className="w-full py-3 px-4 rounded-md font-medium transition-all hover:opacity-90 text-sm uppercase tracking-wider"
            style={{ backgroundColor: BARRETT.navy, color: BARRETT.white, fontFamily: FONT_STACK, letterSpacing: '0.1em' }}>
            {showSchedule ? 'Hide' : 'Show'} Amortization Schedule
          </button>
        )}
      </div>
    );
  };

  // ----- PRESETS / ADVISOR CARDS -----

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

  const renderAdvisorTakeCard = () => {
    if (!advisorInsights || advisorInsights.length === 0) return null;
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
          {advisorInsights.map((insight, idx) => {
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
          <a href={`tel:${ADVISOR.phoneRaw}`} onClick={() => trackEvent('residential_calculator_call_click', { location: 'advisor_mini_card' })} className="text-sm font-semibold flex items-center gap-1.5 hover:underline" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>
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
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs font-medium uppercase mb-3" style={{ color: BARRETT.gold, letterSpacing: '0.18em', fontFamily: MONO_STACK }}>01 / Residential Strategy</p>
              <h1 className="text-4xl font-semibold" style={{ fontFamily: FONT_STACK, letterSpacing: '-0.03em', lineHeight: '1.05' }}>Run the scenario.<br/><span style={{ color: BARRETT.goldSoft }}>Make the move make sense.</span></h1>
              <p className="text-sm mt-4 max-w-xl" style={{ color: '#a1a1aa', letterSpacing: '-0.01em' }}>Purchase, refinance, equity, and investor scenarios — clear payment, clear coverage, clear next step.</p>
            </div>
            <div className="flex gap-2 no-print">
              <button onClick={resetCurrentTab}
                className="px-4 py-2.5 rounded-md text-xs font-medium transition-all hover:bg-white/10 flex items-center gap-2"
                style={{ border: `1px solid rgba(255,255,255,0.2)`, color: BARRETT.white, fontFamily: FONT_STACK, letterSpacing: '0.02em' }}>
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
                <button key={tab.id} onClick={() => { trackEvent('residential_calculator_tab_change', { tab: tab.id }); setActiveTab(tab.id); setPurchaseMode('payment'); }}
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
        {renderAdvisorMiniCard()}

        {/* Purchase mode toggle (Affordability) */}
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
              <button onClick={() => setPurchaseMode('affordability')}
                className="px-4 py-2 rounded-md text-xs font-semibold transition-all flex items-center gap-1.5"
                style={{
                  backgroundColor: purchaseMode === 'affordability' ? BARRETT.navy : BARRETT.white,
                  color: purchaseMode === 'affordability' ? BARRETT.white : BARRETT.slate,
                  border: `1px solid ${purchaseMode === 'affordability' ? BARRETT.navy : BARRETT.line}`,
                  fontFamily: FONT_STACK,
                }}>
                <ArrowUpDown className="w-3.5 h-3.5" /> Affordability (How Much Can I Borrow?)
              </button>
            </div>
          </div>
        )}

        {/* Presets row */}
        <div className="no-print">{renderPresets()}</div>

        {/* 4-column layout: inputs (2 cols) | results (1 col) | Advisor Take (1 col) */}
        <div className="grid lg:grid-cols-4 gap-6">
          <div className="lg:col-span-2 rounded-lg p-6 lg:p-8" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
            {activeTab === 'purchase' && renderPurchaseInputs()}
            {activeTab === 'rateTerm' && renderRateTermInputs()}
            {activeTab === 'cashOut' && renderCashOutInputs()}
            {activeTab === 'heloc' && renderHelocInputs()}
            {activeTab === 'fha' && renderFhaInputs()}
            {activeTab === 'va' && renderVaInputs()}
            {activeTab === 'investor' && renderInvestorInputs()}
          </div>

          <div className="lg:col-span-1 lg:sticky lg:top-20 lg:self-start">
            <div className="rounded-lg p-6" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
              {renderResultsPanel()}
            </div>
          </div>

          {!(activeTab === 'purchase' && purchaseMode === 'affordability') && (
            <div className="lg:col-span-1 lg:sticky lg:top-20 lg:self-start">
              {renderAdvisorTakeCard()}
            </div>
          )}
        </div>

        {/* AMORTIZATION SCHEDULE */}
        {showSchedule && amortizationSchedule.length > 0 && (
          <div className="mt-8 rounded-lg p-6 overflow-x-auto" style={{ backgroundColor: BARRETT.white, border: `1px solid ${BARRETT.line}` }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-4" style={{ color: BARRETT.navy, letterSpacing: '0.1em' }}>Amortization Schedule</h3>
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

        {/* CTA SECTION */}
        <div className="mt-6 rounded-lg shadow-sm overflow-hidden no-print" style={{ backgroundColor: BARRETT.white, borderTop: `4px solid ${BARRETT.gold}` }}>
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-xl font-bold" style={{ color: BARRETT.navy, fontFamily: FONT_STACK }}>
                Ready to turn this scenario into a real pre-approval?
              </h2>
              <p className="text-sm mt-2" style={{ color: BARRETT.slate }}>
                {ADVISOR.name.split(' ')[0]} can shop your scenario across multiple lenders for the best rate and program fit.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <button onClick={handleScheduleCall}
                className="p-6 rounded-md text-left transition-all hover:opacity-95"
                style={{ backgroundColor: BARRETT.gold, color: BARRETT.white, fontFamily: FONT_STACK }}>
                <CalendarCheck className="w-7 h-7 mb-3" style={{ color: BARRETT.white }} />
                <div className="font-bold text-base mb-1">Schedule a Call</div>
                <div className="text-xs" style={{ color: 'rgba(255,255,255,0.92)' }}>
                  Book 15 minutes directly with {ADVISOR.name.split(' ')[0]} — opens his calendar.
                </div>
              </button>
              <a href={`tel:${ADVISOR.phoneRaw}`} onClick={() => trackEvent('residential_calculator_call_click', { location: 'cta_section' })}
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
                <a href={`tel:${ADVISOR.phoneRaw}`} onClick={() => trackEvent('residential_calculator_call_click', { location: 'footer_card' })} className="hover:underline" style={{ color: BARRETT.navy }}>{ADVISOR.phone}</a>
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
          Calculations are estimates only. Actual rates, terms, qualification, PMI/MIP rates, fees, and program eligibility depend on lender review of full application, property analysis, credit profile, and current market conditions. Not a commitment to lend. Equal Housing Lender. Barrett Financial Group, L.L.C. NMLS #181106.
        </p>
      </div>
    </div>
  );
};

export default ResidentialMortgageCalculator;
