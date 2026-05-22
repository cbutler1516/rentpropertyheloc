export const HERO_STATS = [
  { label: "Typical draw window", value: "10 years" },
  { label: "Investor-friendly", value: "Rental OK" },
  { label: "Use of funds", value: "Flexible" },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Review your rental portfolio",
    description:
      "Share property addresses, ownership structure, and existing liens so we can map eligible equity.",
  },
  {
    step: "02",
    title: "Match program structure",
    description:
      "We align line size, index, and documentation to your hold strategy—long-term cash flow or value-add.",
  },
  {
    step: "03",
    title: "Close and deploy capital",
    description:
      "Draw on your HELOC for acquisitions, renovations, reserves, or debt repositioning as opportunities appear.",
  },
] as const;

export const PROGRAM_HIGHLIGHTS = [
  {
    title: "Rental property eligible",
    description:
      "Programs designed for non-owner-occupied collateral—not just your primary residence.",
    icon: "building",
  },
  {
    title: "Revolving liquidity",
    description:
      "Access capital when you need it without refinancing the entire property each time.",
    icon: "cycle",
  },
  {
    title: "Portfolio-scale thinking",
    description:
      "Structure lines across multiple assets to support disciplined, repeatable investing.",
    icon: "chart",
  },
  {
    title: "Transparent terms",
    description:
      "Clear draw periods, repayment expectations, and rate mechanics before you commit.",
    icon: "shield",
  },
] as const;

export const INVESTOR_USE_CASES = [
  {
    title: "Acquire the next rental",
    description:
      "Bridge down payment or closing costs while long-term financing is arranged.",
  },
  {
    title: "Fund value-add renovations",
    description:
      "Finance kitchen, bath, or systems upgrades that lift rent and property value.",
  },
  {
    title: "Stabilize cash reserves",
    description:
      "Maintain operating liquidity for vacancies, capex, or insurance deductibles.",
  },
  {
    title: "Reposition existing debt",
    description:
      "Pay off higher-cost balances and simplify monthly obligations across the portfolio.",
  },
] as const;

export const FAQ_ITEMS = [
  {
    question: "Can I use a HELOC on a rental property?",
    answer:
      "Yes—select investor-focused lenders allow HELOCs secured by non-owner-occupied rentals. Eligibility depends on equity, occupancy, and your overall financial profile.",
  },
  {
    question: "How is this different from a cash-out refinance?",
    answer:
      "A HELOC is revolving: you draw, repay, and draw again during the draw period. Cash-out refis replace your entire mortgage with a new fixed loan—better when you want a one-time lump sum and long-term rate lock.",
  },
  {
    question: "What documentation will I need?",
    answer:
      "Expect property details, rent rolls or leases, entity documents if applicable, tax returns, and proof of reserves. Requirements vary by lender and line size.",
  },
  {
    question: "How fast can I close?",
    answer:
      "Timelines depend on appraisal, title, and underwriting volume. Many investor lines close in a few weeks when files are complete upfront.",
  },
  {
    question: "Is this financial advice?",
    answer:
      "No. This site provides educational marketing information. Speak with a licensed loan officer and tax advisor before acting.",
  },
] as const;
