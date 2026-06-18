import type { MortgageProductConfig } from "@/lib/mortgage-products/types";

const COMPLIANCE_NOTE =
  "Educational overview only — not a commitment to lend. Subject to credit, income, asset, property, and program approval.";

const DEFAULT_PROCESS = [
  { title: "Share your scenario", description: "Goals, property, timeline, and numbers — not just a rate request." },
  { title: "Compare paths", description: "Model purchase, refi, equity, and investor options side by side in the Deal Analyzer." },
  { title: "Build your playbook", description: "Align structure and payment with your plan before you submit." },
  { title: "Execute with clarity", description: "Move forward with licensed partner guidance when you are ready." },
];

function product(
  path: string,
  metadata: MortgageProductConfig["metadata"],
  hero: MortgageProductConfig["hero"],
  whoItsFor: MortgageProductConfig["whoItsFor"],
  benefits: MortgageProductConfig["benefits"],
  considerations: MortgageProductConfig["considerations"],
  scenarios: MortgageProductConfig["scenarios"],
  faqs: MortgageProductConfig["faqs"],
  relatedPaths: string[],
  service: MortgageProductConfig["service"],
): MortgageProductConfig {
  return {
    path,
    metadata,
    hero,
    whoItsFor,
    benefits,
    considerations,
    scenarios,
    faqs,
    relatedPaths,
    service,
  };
}

export const MORTGAGE_PRODUCT_PATHS = [
  "/conventional-loans",
  "/fha-loans",
  "/va-loans",
  "/jumbo-loans",
  "/dscr-loans",
  "/bank-statement-loans",
  "/heloc",
  "/cash-out-refinance",
  "/commercial-loans",
] as const;

export type MortgageProductPath = (typeof MORTGAGE_PRODUCT_PATHS)[number];

export const MORTGAGE_PRODUCTS: Record<MortgageProductPath, MortgageProductConfig> = {
  "/conventional-loans": product(
    "/conventional-loans",
    {
      title: "Conventional Loans",
      description:
        "Conventional mortgage strategy for buyers and homeowners — payment clarity, structure options, and playbook planning. Educational estimates only.",
      ogTitle: "Conventional Mortgage Loans | The Loan Playbook",
      ogDescription:
        "Strategy-first conventional loan guidance for purchase and refinance — subject to approval.",
    },
    {
      eyebrow: "Purchase & refinance",
      h1: "Conventional loan strategy for buyers and homeowners",
      intro:
        "Conventional financing is the backbone of most purchase and refinance plans. The Loan Playbook helps you compare structure, payment, and timing before you shop — not after you are under contract.",
    },
    {
      title: "Who conventional loans are for",
      intro: "Common profiles we review — each file is evaluated individually:",
      items: [
        "First-time and move-up buyers with stable income and credit",
        "Homeowners refinancing to adjust term, rate, or equity position",
        "Buyers comparing fixed vs ARM and buydown structures",
        "Borrowers who want clarity on cash to close before making offers",
      ],
    },
    {
      title: "Benefits of a strategy-first conventional review",
      items: [
        "Payment and cash-to-close modeling before you tour homes",
        "Side-by-side comparison with FHA, VA, and jumbo paths when relevant",
        "Playbook Reports for confident offers and agent consults",
        "Human strategy review — not automated rate bait",
      ],
    },
    {
      title: "Things to consider",
      items: [
        "Down payment, reserves, and debt-to-income affect program eligibility",
        "Appraisal, documentation, and property type can change available options",
        "Rates and terms vary by lender, market, and borrower profile",
        COMPLIANCE_NOTE,
      ],
    },
    {
      title: "Example scenarios",
      items: [
        {
          title: "Move-up buyer",
          description:
            "Compare keeping a low first rate vs selling and purchasing with a new conventional loan — model payment and equity tradeoffs.",
        },
        {
          title: "First-time buyer",
          description:
            "Understand monthly payment ranges, PMI context, and concession strategies before writing an offer.",
        },
        {
          title: "Refinance timing",
          description:
            "Evaluate break-even on rate reduction vs keeping current terms when equity goals differ.",
        },
      ],
    },
    [
      {
        question: "What credit score do I need for a conventional loan?",
        answer:
          "Guidelines vary by lender and program. Many conventional paths may be available with mid-tier credit when other factors are strong — subject to approval and automated underwriting results.",
      },
      {
        question: "Is this page a loan offer?",
        answer:
          "No. This is educational strategy content. Any financing would be subject to credit, income, asset, property, and program approval through licensed partners.",
      },
    ],
    ["/fha-loans", "/jumbo-loans", "/cash-out-refinance", "/heloc"],
    {
      name: "Conventional Mortgage Strategy",
      description: "Strategy-first conventional purchase and refinance guidance from The Loan Playbook.",
    },
  ),

  "/fha-loans": product(
    "/fha-loans",
    {
      title: "FHA Loans",
      description:
        "FHA loan strategy for buyers — down payment context, payment modeling, and playbook planning. Not a commitment to lend.",
      ogTitle: "FHA Mortgage Loans | Homebuyer Strategy",
    },
    {
      eyebrow: "Homebuyer programs",
      h1: "FHA loan strategy for qualified buyers",
      intro:
        "FHA programs may help buyers with flexible down payment and credit guidelines when they qualify. We model how FHA fits your payment, cash to close, and long-term plan — alongside conventional alternatives.",
    },
    {
      title: "Who FHA loans are for",
      items: [
        "First-time buyers exploring lower down payment paths",
        "Borrowers rebuilding credit with documented income",
        "Buyers comparing FHA vs conventional for the same property",
        "Households prioritizing entry with defined upgrade timeline",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Down payment and monthly payment clarity upfront",
        "Comparison with conventional and VA paths in one playbook",
        "Agent-ready Playbook Reports for buyer consults",
        "Strategy call support when the numbers need a human review",
      ],
    },
    {
      title: "Things to consider",
      items: [
        "FHA property standards and mortgage insurance rules apply",
        "Loan limits and county guidelines affect eligibility",
        "Lifetime MI rules differ from conventional PMI removal paths",
        COMPLIANCE_NOTE,
      ],
    },
    {
      title: "Example scenarios",
      items: [
        {
          title: "FHA vs conventional on the same home",
          description: "Model payment, cash to close, and MI cost over your expected hold period.",
        },
        {
          title: "Gift funds and reserves",
          description: "Understand documentation expectations before underwriting — guidelines vary.",
        },
      ],
    },
    [
      {
        question: "Can I use FHA for a second home or investment property?",
        answer:
          "FHA is generally designed for primary residence scenarios. Investor and second-home paths typically use other programs — subject to approval.",
      },
    ],
    ["/conventional-loans", "/va-loans", "/jumbo-loans"],
    { name: "FHA Loan Strategy", description: "FHA homebuyer financing strategy and comparison guidance." },
  ),

  "/va-loans": product(
    "/va-loans",
    {
      title: "VA Loans",
      description:
        "VA loan strategy for eligible veterans and service members — benefit use, structure, and playbook planning. Subject to approval.",
      ogTitle: "VA Mortgage Loans | Veteran Homebuyer Strategy",
    },
    {
      eyebrow: "Veteran benefits",
      h1: "VA loan strategy for eligible veterans and service members",
      intro:
        "VA financing may offer favorable terms for those who qualify. The Loan Playbook helps you understand how VA fits purchase, refinance, and equity goals — compared with other paths you may also qualify for.",
    },
    {
      title: "Who VA loans are for",
      items: [
        "Active duty, veterans, and eligible surviving spouses",
        "Buyers using VA for the first time or on a subsequent use",
        "Veterans comparing VA vs conventional with similar credit profiles",
        "Homeowners exploring VA refinance or IRRRL context",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Zero-down context modeled against your full financial picture",
        "Funding fee and payment clarity in Playbook Reports",
        "Comparison with conventional and jumbo when dual eligibility exists",
        "Licensed partner execution when you are ready to move",
      ],
    },
    {
      title: "Things to consider",
      items: [
        "Eligibility, entitlement, and occupancy rules apply",
        "VA appraisal and property requirements differ from other programs",
        "Subsequent use and funding fee tiers affect total cost",
        COMPLIANCE_NOTE,
      ],
    },
    {
      title: "Example scenarios",
      items: [
        {
          title: "First VA purchase",
          description: "Model payment with and without down payment to align with reserve goals.",
        },
        {
          title: "VA vs conventional",
          description: "When you qualify for both, compare total cost over your hold horizon.",
        },
      ],
    },
    [
      {
        question: "Do I need a down payment on a VA loan?",
        answer:
          "Many eligible borrowers may finance with no down payment subject to entitlement, price, and lender guidelines — not a guarantee for every file.",
      },
    ],
    ["/conventional-loans", "/fha-loans", "/cash-out-refinance"],
    { name: "VA Loan Strategy", description: "VA purchase and refinance strategy for eligible borrowers." },
  ),

  "/jumbo-loans": product(
    "/jumbo-loans",
    {
      title: "Jumbo Loans",
      description:
        "Jumbo mortgage strategy for high-value purchases and refinances — structure, reserves, and playbook modeling. Educational only.",
      ogTitle: "Jumbo Mortgage Loans | High-Value Home Strategy",
    },
    {
      eyebrow: "High-value homes",
      h1: "Jumbo loan strategy for higher loan amounts",
      intro:
        "When loan amounts exceed conforming limits, jumbo programs may apply with different reserve, credit, and documentation standards. We model structure and payment before you commit to a price range.",
    },
    {
      title: "Who jumbo loans are for",
      items: [
        "Buyers purchasing above local conforming limits",
        "Homeowners with significant equity refinancing large balances",
        "Self-employed borrowers with complex income documentation",
        "Move-up buyers bridging from conforming to jumbo territory",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Reserve and asset positioning reviewed in context",
        "ARM vs fixed modeling for larger balances",
        "Playbook Reports for luxury and competitive markets",
        "Bank statement and alternative doc paths compared when relevant",
      ],
    },
    {
      title: "Things to consider",
      items: [
        "Higher loan amounts often require stronger reserves and documentation",
        "Appraisal and property type scrutiny may be stricter",
        "Rates and terms vary significantly across jumbo investors",
        COMPLIANCE_NOTE,
      ],
    },
    {
      title: "Example scenarios",
      items: [
        {
          title: "Coastal or urban purchase",
          description: "Model jumbo payment bands against conforming limit breakpoints in your county.",
        },
        {
          title: "Large balance refi",
          description: "Compare keeping a low first rate vs restructuring when equity goals change.",
        },
      ],
    },
    [
      {
        question: "What is the difference between conforming and jumbo?",
        answer:
          "Conforming loans meet agency size limits; jumbo loans exceed those limits and follow investor-specific guidelines — availability varies by lender and property.",
      },
    ],
    ["/conventional-loans", "/bank-statement-loans", "/heloc"],
    { name: "Jumbo Mortgage Strategy", description: "High-balance purchase and refinance strategy guidance." },
  ),

  "/dscr-loans": product(
    "/dscr-loans",
    {
      title: "DSCR Loans",
      description:
        "DSCR investor loan strategy — rental income-based qualification context for landlords. Investor DSCR loans subject to approval.",
      ogTitle: "DSCR Loans | Investor Rental Financing Strategy",
    },
    {
      eyebrow: "Investor financing",
      h1: "DSCR loan strategy for rental property investors",
      intro:
        "Debt Service Coverage Ratio (DSCR) programs may qualify investors based on property cash flow rather than personal income documentation — when programs are available and the file meets guidelines.",
    },
    {
      title: "Who DSCR loans are for",
      items: [
        "Landlords acquiring or refinancing rentals",
        "Investors with strong rents but complex personal tax profiles",
        "Portfolio builders scaling beyond W-2 documentation paths",
        "Operators evaluating long-term hold vs bridge strategies",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Rental income context modeled in investor Playbook Reports",
        "Compared with conventional investor and HELOC paths",
        "Deal Analyzer scenarios for acquisition math",
        "Strategy calls for portfolio-level planning",
      ],
    },
    {
      title: "Things to consider",
      items: [
        "DSCR thresholds, property type, and seasoning rules vary",
        "Rates and points often differ from agency investor products",
        "Prepayment and reserve requirements vary by investor",
        COMPLIANCE_NOTE,
      ],
    },
    {
      title: "Example scenarios",
      items: [
        {
          title: "New rental acquisition",
          description: "Stress-test rent coverage and down payment against target cash-on-cash goals.",
        },
        {
          title: "Refinance stabilized rental",
          description: "Compare DSCR refi vs keeping existing terms when rates and prepay differ.",
        },
      ],
    },
    [
      {
        question: "Do DSCR loans require tax returns?",
        answer:
          "Many DSCR programs focus on property income and may not require personal tax returns — documentation requirements vary by lender and are subject to approval.",
      },
    ],
    ["/bank-statement-loans", "/heloc", "/commercial-loans"],
    { name: "DSCR Investor Loan Strategy", description: "Rental income-based investor financing strategy." },
  ),

  "/bank-statement-loans": product(
    "/bank-statement-loans",
    {
      title: "Bank Statement Loans",
      description:
        "Bank statement and alternative documentation mortgage strategy for self-employed borrowers. Subject to program approval.",
      ogTitle: "Bank Statement Mortgage Loans | Self-Employed Strategy",
    },
    {
      eyebrow: "Alternative documentation",
      h1: "Bank statement loan strategy for self-employed borrowers",
      intro:
        "When tax returns do not reflect full cash flow, bank statement and alternative documentation programs may be available on select files — subject to lender guidelines and approval.",
    },
    {
      title: "Who bank statement loans are for",
      items: [
        "Self-employed owners and 1099 contractors",
        "Business owners with significant write-offs on tax returns",
        "Investors documenting income through deposits",
        "Borrowers comparing full-doc vs alternative paths",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Documentation path compared with conventional and DSCR options",
        "Payment modeling before you spend time on the wrong program",
        "Playbook Reports summarizing viable paths",
        "Human review when deposit patterns need context",
      ],
    },
    {
      title: "Things to consider",
      items: [
        "Statement period length and expense factors vary by program",
        "Rates and costs may differ from full-documentation agency loans",
        "Business vs personal account rules apply",
        COMPLIANCE_NOTE,
      ],
    },
    {
      title: "Example scenarios",
      items: [
        {
          title: "Sole proprietor purchase",
          description: "Compare bank statement qualification vs waiting for another tax year of returns.",
        },
        {
          title: "Investor with LLC income",
          description: "Evaluate whether DSCR or bank statement paths fit the property and entity structure.",
        },
      ],
    },
    [
      {
        question: "How many months of bank statements are typically reviewed?",
        answer:
          "Programs commonly use 12 or 24 months — requirements vary by lender and are subject to approval.",
      },
    ],
    ["/dscr-loans", "/jumbo-loans", "/conventional-loans"],
    { name: "Bank Statement Loan Strategy", description: "Alternative income documentation mortgage strategy." },
  ),

  "/heloc": product(
    "/heloc",
    {
      title: "HELOC",
      description:
        "HELOC strategy for homeowners and investors — revolving equity access, draw timing, and comparison with refi paths. Educational estimates only.",
      ogTitle: "HELOC Strategy | Home Equity Line of Credit",
    },
    {
      eyebrow: "Equity access",
      h1: "HELOC strategy for homeowners and investors",
      intro:
        "A home equity line of credit may provide revolving access to equity for renovations, acquisitions, reserves, or debt repositioning — when programs are available and the property qualifies.",
    },
    {
      title: "Who HELOCs are for",
      items: [
        "Homeowners with equity who want flexible draws over time",
        "Investors keeping a favorable first mortgage in place",
        "Owners funding renovations or the next acquisition",
        "Borrowers comparing HELOC vs cash-out refinance",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Revolving access modeled against your hold and draw plan",
        "Second-lien positioning compared with first-lien refi",
        "Investor and primary residence paths in one playbook",
        "Links to deep-dive investor HELOC education on the Learn hub",
      ],
    },
    {
      title: "Things to consider",
      items: [
        "Index, margin, draw period, and repayment terms vary",
        "Combined LTV and lien position affect approval",
        "Variable rates can change over the life of the line",
        COMPLIANCE_NOTE,
      ],
    },
    {
      title: "Example scenarios",
      items: [
        {
          title: "Renovation reserve",
          description: "Draw as projects progress instead of taking a lump sum at closing.",
        },
        {
          title: "Investor second lien",
          description: "Keep a low first rate and add revolving capacity for the next deal.",
        },
      ],
    },
    [
      {
        question: "HELOC vs cash-out refinance — which is better?",
        answer:
          "It depends on your first rate, how much you need, and whether you want revolving access. The Deal Analyzer models both — neither path is universally better.",
      },
    ],
    ["/cash-out-refinance", "/dscr-loans", "/rental-property-heloc"],
    { name: "HELOC Strategy", description: "Home equity line of credit strategy for owners and investors." },
  ),

  "/cash-out-refinance": product(
    "/cash-out-refinance",
    {
      title: "Cash-Out Refinance",
      description:
        "Cash-out refinance strategy — lump-sum equity access vs HELOC and rate tradeoffs. Not a commitment to lend.",
      ogTitle: "Cash-Out Refinance Strategy | Equity Access",
    },
    {
      eyebrow: "Refinance & equity",
      h1: "Cash-out refinance strategy for equity goals",
      intro:
        "Cash-out refinance replaces your existing mortgage with a new first lien and may deliver lump-sum equity at closing — when you qualify and the structure fits your plan.",
    },
    {
      title: "Who cash-out refinance is for",
      items: [
        "Homeowners needing a defined lump sum at closing",
        "Investors consolidating debt or funding acquisitions",
        "Owners whose first rate is still competitive vs current market",
        "Borrowers who prefer one fixed payment over revolving draws",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Single payment clarity after closing",
        "Modeled against HELOC and second-lien alternatives",
        "Break-even timing on rate change vs equity need",
        "Playbook Reports for agent and advisor consults",
      ],
    },
    {
      title: "Things to consider",
      items: [
        "Replacing a low first rate may increase total interest cost",
        "Closing costs and seasoning rules apply",
        "Cash-out LTV limits vary by occupancy and property type",
        COMPLIANCE_NOTE,
      ],
    },
    {
      title: "Example scenarios",
      items: [
        {
          title: "Debt consolidation",
          description: "Compare weighted average cost vs new first lien payment — educational modeling only.",
        },
        {
          title: "Investor acquisition fund",
          description: "Lump-sum equity vs HELOC for down payment on the next rental.",
        },
      ],
    },
    [
      {
        question: "How much equity can I access with cash-out?",
        answer:
          "Maximum cash-out LTV depends on occupancy, credit, property type, and investor guidelines — subject to approval and appraisal.",
      },
    ],
    ["/heloc", "/conventional-loans", "/dscr-loans"],
    { name: "Cash-Out Refinance Strategy", description: "First-lien equity access refinance strategy." },
  ),

  "/commercial-loans": product(
    "/commercial-loans",
    {
      title: "Commercial Loans",
      description:
        "Commercial mortgage strategy for sponsors and operators — multifamily, mixed-use, and business property financing context. Subject to approval.",
      ogTitle: "Commercial Mortgage Loans | Sponsor Strategy",
    },
    {
      eyebrow: "Commercial financing",
      h1: "Commercial loan strategy for sponsors and operators",
      intro:
        "Commercial financing spans bridge, agency, portfolio bank, and sponsor equity structures. The Loan Playbook provides strategy-first context before capital markets conversations — not generic consumer funnel flow.",
    },
    {
      title: "Who commercial loans are for",
      items: [
        "Multifamily and mixed-use sponsors",
        "Operators refinancing stabilized assets",
        "Business owners with owner-occupied commercial property needs",
        "Investors bridging from residential portfolio to commercial scale",
      ],
    },
    {
      title: "Benefits",
      items: [
        "Structure-first review aligned with sponsor goals",
        "Connection to licensed commercial partner network for execution",
        "Residential investor context when portfolio strategy spans asset types",
        "Strategy calls for deals that need human capital markets judgment",
      ],
    },
    {
      title: "Things to consider",
      items: [
        "Recourse, prepay, and rate structures vary widely",
        "Sponsor experience and asset performance drive terms",
        "Timelines depend on third-party reports and legal workflow",
        COMPLIANCE_NOTE,
      ],
    },
    {
      title: "Example scenarios",
      items: [
        {
          title: "Stabilized multifamily refi",
          description: "Evaluate agency vs portfolio bank paths when occupancy and NOI are proven.",
        },
        {
          title: "Value-add bridge",
          description: "Short-term capital context before permanent takeout — educational planning only.",
        },
      ],
    },
    [
      {
        question: "Does The Loan Playbook close commercial loans directly?",
        answer:
          "We provide strategy guidance and connect qualified scenarios to licensed commercial partners — execution is subject to approval and program fit.",
      },
    ],
    ["/dscr-loans", "/commercial", "/bank-statement-loans"],
    { name: "Commercial Mortgage Strategy", description: "Commercial real estate financing strategy for sponsors." },
  ),
};

export const MORTGAGE_SOLUTION_LINKS = [
  { href: "/conventional-loans", label: "Conventional" },
  { href: "/fha-loans", label: "FHA" },
  { href: "/va-loans", label: "VA" },
  { href: "/jumbo-loans", label: "Jumbo" },
  { href: "/dscr-loans", label: "DSCR" },
  { href: "/bank-statement-loans", label: "Bank Statement" },
  { href: "/heloc", label: "HELOC" },
  { href: "/commercial-loans", label: "Commercial" },
] as const;

export const MORTGAGE_PRODUCT_PROCESS_STEPS = DEFAULT_PROCESS;
