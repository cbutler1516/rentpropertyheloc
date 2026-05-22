export const HERO_STATS = [
  { label: "Typical draw period", value: "10 years" },
  { label: "Collateral focus", value: "Non-owner-occupied" },
  { label: "Funding timeline", value: "As little as 7 days" },
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
    title: "Rental collateral considered",
    description:
      "Investor-oriented HELOC structures may be available on non-owner-occupied rentals—not limited to a primary residence.",
    icon: "building",
  },
  {
    title: "Revolving access",
    description:
      "Draw, repay, and redraw within the draw period instead of resetting the entire mortgage for each capital need.",
    icon: "cycle",
  },
  {
    title: "Portfolio-level planning",
    description:
      "Coordinate lines across multiple assets to support disciplined deployment—not one-off, reactive financing.",
    icon: "chart",
  },
  {
    title: "Defined mechanics upfront",
    description:
      "Draw periods, repayment expectations, and rate behavior are reviewed before you proceed—subject to final approval.",
    icon: "shield",
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
