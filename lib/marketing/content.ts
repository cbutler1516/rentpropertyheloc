export type MarketingUseCaseIcon =
  | "acquire"
  | "renovate"
  | "reserves"
  | "consolidate"
  | "recycle";

export const HERO_TRUST_ITEMS = [
  "Licensed lending partners",
  "Equal Housing Opportunity",
  "Secure online process",
] as const;

export const INVESTOR_PROCESS_STEPS = [
  {
    step: "Step 1",
    icon: "🏠",
    title: "Tell Us About Your Property",
    description: "Share your rental address in about 60 seconds.",
  },
  {
    step: "Step 2",
    icon: "💰",
    title: "Tell Us How Much You'd Like To Access",
    description: "Pick the equity range that fits your goals.",
  },
  {
    step: "Step 3",
    icon: "📋",
    title: "Review Your Options",
    description: "See paths that may fit—subject to approval and review.",
  },
  {
    step: "Step 4",
    icon: "📞",
    title: "Talk With A Financing Specialist",
    description: "Get personalized guidance on your next move.",
  },
] as const;

export const INVESTOR_EQUITY_STRATEGIES = {
  sectionLabel: "Investor strategies",
  headline: "Common Ways Investors Use Equity",
  subheadline:
    "Rental property equity may provide flexibility for acquisitions, improvements, liquidity, and other investment goals. Financing options are subject to qualification and lender review.",
  disclaimer:
    "Examples are provided for informational purposes only. Financing options, loan amounts, and eligibility vary by borrower, property, and lender guidelines.",
  cards: [
    {
      id: "acquire",
      icon: "🏠",
      title: "Acquire Another Rental",
      description:
        "Use available equity to help fund down payments, closing costs, or acquisition opportunities for additional investment properties.",
    },
    {
      id: "renovate",
      icon: "🔨",
      title: "Renovate Existing Properties",
      description:
        "Access capital for updates, repairs, or value-add improvements that may enhance rental appeal and long-term property value.",
    },
    {
      id: "reserves",
      icon: "💰",
      title: "Build Cash Reserves",
      description:
        "Create liquidity that may help support future opportunities, vacancies, maintenance expenses, or unexpected costs.",
    },
    {
      id: "consolidate",
      icon: "📊",
      title: "Consolidate Investment Debt",
      description:
        "Explore ways to simplify existing investment-related debt obligations and improve financial flexibility.",
    },
  ],
} as const;

export const INVESTOR_EQUITY_USE_CASES: {
  id: MarketingUseCaseIcon;
  title: string;
  description: string;
}[] = [
  {
    id: "acquire",
    title: "Acquire another rental",
    description:
      "Fund a down payment or closing costs on the next deal while keeping your first mortgage in place.",
  },
  {
    id: "renovate",
    title: "Renovate or reposition",
    description:
      "Improve rent or property value before your next move—subject to approval on select programs.",
  },
  {
    id: "reserves",
    title: "Build reserves",
    description:
      "Stay liquid for vacancies, repairs, or insurance—without selling a cash-flowing asset.",
  },
  {
    id: "consolidate",
    title: "Consolidate expensive debt",
    description:
      "Simplify higher-cost balances when structure and approval support a cleaner monthly picture.",
  },
  {
    id: "recycle",
    title: "Recycle into the next deal",
    description:
      "Draw, repay, and redeploy equity access as new investment property opportunities appear.",
  },
];

export type InvestorScenarioExample = {
  id: string;
  label: string;
  propertyValue: number;
  existingLoan: number;
  equityAccessLabel: string;
  useCase: string;
};

export const INVESTOR_SCENARIO_EXAMPLES: InvestorScenarioExample[] = [
  {
    id: "sfr-example",
    label: "Single-family rental",
    propertyValue: 650_000,
    existingLoan: 355_000,
    equityAccessLabel: "$65,000–$130,000",
    useCase: "Renovation or reserves",
  },
  {
    id: "condo-example",
    label: "Condo investment property",
    propertyValue: 475_000,
    existingLoan: 250_000,
    equityAccessLabel: "$40,000–$90,000",
    useCase: "Flexibility capital",
  },
  {
    id: "multifamily-example",
    label: "2–4 unit property",
    propertyValue: 950_000,
    existingLoan: 525_000,
    equityAccessLabel: "$100,000–$185,000",
    useCase: "Acquisition capital",
  },
];

export const FUNDING_TIMELINE_STEPS = [
  {
    title: "Quick online review",
    detail:
      "Share your rental property details online—a financing specialist guides the next steps.",
  },
  {
    title: "Personalized option review",
    detail:
      "Compare HELOC, second-position financing, and other investor paths that may fit your goals.",
  },
  {
    title: "Strategy discussion",
    detail:
      "Discuss structure, lien position, and timing with a financing specialist and lending partners.",
  },
  {
    title: "Funding timeline",
    detail:
      "Funding may be available in as little as 7 days when the file is complete—not guaranteed.",
  },
] as const;

export const SCENARIO_DISCLAIMER =
  "Illustrative examples only. Values and ranges are hypothetical—not offers, approval amounts, or guarantees.";

export const USE_CASES_COMPLIANCE =
  "Programs may be available for qualifying rental properties, subject to approval. Not a commitment to lend.";
