export const FAQ_ITEMS = [
  {
    question: "Can I access equity without refinancing my first mortgage?",
    answer:
      "Often, yes. A HELOC is typically a second-lien revolving line that may let you access equity while keeping your existing first mortgage in place—when combined loan-to-value, credit, and program guidelines allow. This is not a guarantee of approval or specific terms.",
  },
  {
    question: "Can I get a HELOC on a rental property?",
    answer:
      "Revolving HELOC programs on non-owner-occupied rental collateral may be available for qualifying property owners, subject to approval, property type, equity, credit, and lender guidelines. Investor paths are underwritten differently than primary-residence products.",
  },
  {
    question: "Can I get a HELOC on a second home?",
    answer:
      "Second-home and vacation-property HELOC programs may be available separately from primary-residence and rental paths, subject to approval, occupancy verification, equity, and state availability. Guidelines vary by lender.",
  },
  {
    question: "How much equity do I need?",
    answer:
      "Combined loan-to-value limits vary by occupancy, property type, credit, and program. Many files require meaningful equity after existing liens—limits are lender-specific and subject to approval. A review may discuss illustrative ranges only.",
  },
  {
    question: "Is this a loan application?",
    answer:
      "No. This is an educational review to explore financing options that may be available. It is not a loan application, approval, or commitment to lend. A licensed specialist can explain next steps if you choose to proceed.",
  },
  {
    question: "How quickly will someone review my request?",
    answer:
      "Many requests receive follow-up within one business day when contact information is complete. Funding timelines depend on documentation, third-party items, and lender processing—subject to approval. Faster timelines are not guaranteed.",
  },
  {
    question: "Will this affect my credit?",
    answer:
      "Starting a review does not by itself mean a hard credit inquiry. If you move forward with a full application, a licensed specialist can explain when credit is accessed and how inquiries may appear on your report.",
  },
  {
    question: "What types of properties can be reviewed?",
    answer:
      "Primary residences, second homes, vacation properties, and rental or investment properties may be reviewed on different occupancy paths—subject to approval and property eligibility. Share your address and how you use the property to follow the right path.",
  },
] as const;

/** @deprecated Import FAQ_ITEMS directly */
export const HERO_STATS = [
  { label: "Typical draw period", value: "10 years" },
  { label: "Collateral focus", value: "Residential property" },
  { label: "Funding timeline", value: "As little as 7 days" },
] as const;

export const METRICS = [
  {
    value: "$25M+",
    label: "Investor equity explored",
    note: "Illustrative review volume",
  },
  {
    value: "Digital-first",
    label: "Fast online review",
    note: "Simple intake, clear next steps",
  },
  {
    value: "Property owners",
    label: "Homeowners & investors",
    note: "Primary, second home, and rental paths",
  },
  {
    value: "7 days",
    label: "Funding possible in as little as 7 days",
    note: "When your file is complete—subject to approval",
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Share a few quick details",
    description:
      "Property address, how much you want to access, and a credit estimate—about 60 seconds.",
  },
  {
    step: "02",
    title: "Review your options together",
    description:
      "A licensed professional helps evaluate rental property HELOC, second mortgage, and other paths—subject to approval.",
  },
  {
    step: "03",
    title: "Build your strategy",
    description:
      "Add property details when you're ready. Personalized recommendations—not a one-product pitch.",
  },
  {
    step: "04",
    title: "Access your equity",
    description:
      "Use revolving capacity for acquisitions, renovations, or reserves—not a commitment to lend.",
  },
] as const;

export const INVESTOR_USE_CASES = [
  {
    title: "Acquire another rental",
    description:
      "Fund the next down payment or closing costs while keeping your existing first mortgage.",
  },
  {
    title: "Renovate or reposition",
    description:
      "Improve rent or property value on your investment property—subject to approval.",
  },
  {
    title: "Build reserves",
    description:
      "Stay liquid for vacancies and repairs without selling a cash-flowing rental.",
  },
  {
    title: "Consolidate expensive debt",
    description:
      "Simplify higher-cost balances when structure and approval support it.",
  },
  {
    title: "Recycle into the next deal",
    description:
      "Draw, repay, and redeploy equity access as portfolio growth opportunities appear.",
  },
] as const;

export const PROGRAM_HIGHLIGHTS = [
  {
    title: "No tax return path may be available",
    description:
      "Select programs may use alternative documentation for self-employed investors and LLC owners—subject to approval.",
    icon: "shield",
  },
  {
    title: "Every property type",
    description:
      "Primary residences, second homes, rentals, and investment properties—subject to approval.",
    icon: "building",
  },
  {
    title: "Revolving equity access",
    description:
      "Draw, repay, and redeploy without replacing your first mortgage every time you need capital.",
    icon: "cycle",
  },
  {
    title: "Portfolio growth",
    description:
      "Coordinate equity access across assets to fund acquisitions, renovations, and reserves.",
    icon: "chart",
  },
] as const;

export const FUNDING_TIMELINES = [
  { stage: "Day 1–2", detail: "Online intake and property snapshot" },
  { stage: "Day 3–5", detail: "Documentation and third-party ordering" },
  { stage: "Day 5–7+", detail: "Closing may be available when the file is complete" },
] as const;

export const INVESTOR_EDUCATION_BLOCKS = [
  {
    id: "heloc-vs-cashout",
    title: "HELOC vs. cash-out refinance",
    summary:
      "A rental HELOC adds revolving access behind your mortgage. Cash-out refinance replaces the first lien—better when you want one long-term rate, not flexible draws.",
    bullets: [
      "HELOC: draw, repay, and re-access during the draw period",
      "Cash-out: single disbursement, new amortization schedule",
      "Investor programs differ on occupancy, DSCR, and reserves",
    ],
  },
  {
    id: "equity-for-acquisitions",
    title: "Using rental equity to buy another property",
    summary:
      "Many investors access non-owner-occupied equity for down payments, closing costs, or reserves—without selling the cash-flowing asset.",
    bullets: [
      "Keep existing mortgage terms on the collateral property",
      "Pair with entity or portfolio lending on the new purchase",
      "Illustrative only—subject to approval",
    ],
  },
  {
    id: "second-position",
    title: "Second-position financing explained",
    summary:
      "A second-lien HELOC sits behind your current mortgage. Lenders focus on combined loan-to-value, rental income, and credit.",
    bullets: [
      "Investor CLTV caps are often lower than owner-occupied options",
      "Rental income documentation matters",
      "A fit when you want speed and flexibility vs. a full refi",
    ],
  },
  {
    id: "use-cases",
    title: "Common investor use cases",
    summary:
      "Investors explore lines for acquisitions, renovations, reserves, or debt consolidation across a portfolio.",
    bullets: [
      "Bridge capital between acquisitions",
      "Rehab or value-add before refinance",
      "Portfolio liquidity without selling winners",
    ],
  },
  {
    id: "timelines",
    title: "Funding timelines & review process",
    summary:
      "Digital intake and property review run in parallel where possible. Timelines depend on appraisal, title, and documentation.",
    bullets: [
      "Funding in as little as 7 days may be available when files are complete",
      "Appraisal and title drive most of the calendar",
      "Not a commitment to lend until approved",
    ],
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
