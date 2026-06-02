export const HERO_STATS = [
  { label: "Typical draw period", value: "10 years" },
  { label: "Collateral focus", value: "Non-owner-occupied" },
  { label: "Funding timeline", value: "As little as 7 days" },
] as const;

export const METRICS = [
  {
    value: "$25M+",
    label: "Investor reviews started",
    note: "Illustrative aggregate review volume",
  },
  {
    value: "Digital-first",
    label: "Fast digital review",
    note: "Streamlined intake and document flow",
  },
  {
    value: "Rental-only",
    label: "Rental property focused",
    note: "Built around non-owner-occupied collateral",
  },
  {
    value: "7 days",
    label: "Funding possible in as little as 7 days",
    note: "May be available when file is complete—subject to approval",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Map portfolio equity",
    description:
      "Outline rental addresses, ownership structure, and existing liens so available equity can be evaluated against program guidelines.",
  },
  {
    step: "02",
    title: "Review structure options",
    description:
      "Line size, index, and documentation paths are aligned to your hold period—cash-flow hold or value-add execution.",
  },
  {
    step: "03",
    title: "Draw when capital is needed",
    description:
      "Use approved revolving capacity for acquisitions, renovations, reserves, or balance-sheet repositioning as deals surface.",
  },
] as const;

export const PROGRAM_HIGHLIGHTS = [
  {
    title: "No tax return path may be available",
    description:
      "Select programs may allow alternative documentation for self-employed investors and LLC owners—subject to approval.",
    icon: "shield",
  },
  {
    title: "Rental collateral focus",
    description:
      "Duplexes, townhomes, long-term rentals, and STR assets—not primary-residence consumer HELOC positioning.",
    icon: "building",
  },
  {
    title: "Revolving liquidity",
    description:
      "Draw, repay, and redeploy without replacing a low-rate first mortgage each time capital is needed.",
    icon: "cycle",
  },
  {
    title: "Portfolio-scale strategy",
    description:
      "Coordinate equity access across assets to fund acquisitions, renovations, and reserves with discipline.",
    icon: "chart",
  },
] as const;

export const INVESTOR_USE_CASES = [
  {
    title: "Fund the next acquisition",
    description:
      "Bridge down payment or closing needs while permanent financing is lined up—without pausing your pipeline.",
  },
  {
    title: "Execute value-add work",
    description:
      "Finance renovations that improve rent, reduce turnover, or prepare a unit for repositioning.",
  },
  {
    title: "Protect operating reserves",
    description:
      "Keep liquidity for vacancies, maintenance spikes, or insurance events without selling performing assets.",
  },
  {
    title: "Simplify higher-cost debt",
    description:
      "Consolidate expensive balances where structure and approval support a cleaner monthly picture.",
  },
] as const;

export const TESTIMONIALS = [
  {
    quote:
      "We mapped equity across three rentals in one review—clear numbers before we pursued the next acquisition.",
    name: "Jordan M.",
    role: "4-door portfolio, Phoenix",
  },
  {
    quote:
      "The revolving structure let us fund a renovation draw without touching the underlying mortgage rate.",
    name: "Priya K.",
    role: "Value-add investor, Austin",
  },
  {
    quote:
      "Documentation path was straightforward. Timeline came in faster than our last refi experience.",
    name: "Marcus T.",
    role: "LLC-held rentals, Denver",
  },
] as const;

export const PORTFOLIO_STORIES = [
  {
    title: "Duplex → four-unit pipeline",
    summary:
      "Used available equity on a stabilized duplex to bridge capital for a four-unit under contract.",
    outcome: "Illustrative scenario · subject to approval",
  },
  {
    title: "Reserve rebuild after turnover",
    summary:
      "Drew selectively to replenish operating reserves after a long vacancy—not a full refinance event.",
    outcome: "Illustrative scenario · programs may vary",
  },
  {
    title: "Cross-collateral clarity",
    summary:
      "Reviewed line capacity across two LLC-held assets before committing to a value-add scope.",
    outcome: "Illustrative scenario · not a guarantee of terms",
  },
] as const;

export const FUNDING_TIMELINES = [
  { stage: "Day 1–2", detail: "Digital intake and portfolio snapshot" },
  { stage: "Day 3–5", detail: "Documentation and third-party ordering" },
  { stage: "Day 5–7+", detail: "Underwriting and closing may be available when complete" },
] as const;

export const TRUST_INDICATORS = [
  "Subject to approval",
  "Non-owner-occupied focus",
  "Licensed loan officer review",
  "No obligation options check",
] as const;

export const FAQ_ITEMS = [
  {
    question: "Can a HELOC be secured by a rental property?",
    answer:
      "In many cases, yes. Investor-focused programs may be available on non-owner-occupied collateral. Eligibility is subject to approval, equity, occupancy, and lender guidelines.",
  },
  {
    question: "How does a HELOC compare with a cash-out refinance?",
    answer:
      "A HELOC is revolving—you draw, repay, and access again during the draw period. A cash-out refinance replaces the existing mortgage with a new term loan, which can make sense for a single, long-term rate lock.",
  },
  {
    question: "What documentation is typically required?",
    answer:
      "Expect property details, rent rolls or leases, entity documents where applicable, income verification, and reserves. Alternative documentation paths may be available on select programs, subject to approval.",
  },
  {
    question: "How quickly can funding happen?",
    answer:
      "Timelines depend on appraisal, title, and underwriting conditions. Closings in as little as 7 days may be available when the file is complete and third-party items are in place.",
  },
  {
    question: "Is this site offering financial advice?",
    answer:
      "No. Content here is educational marketing only. Consult a licensed loan officer and tax professional before making financing decisions.",
  },
] as const;

export const DASHBOARD_DATA = {
  propertyName: "1842 Oakridge Dr · Rental",
  propertyValue: 485000,
  mortgageBalance: 312400,
  availableEquity: 124600,
  monthlyRent: 3200,
  status: "Review ready",
  eligibility: "Programs may be available",
} as const;
