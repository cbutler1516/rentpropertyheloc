import type { SeoPageConfig } from "@/lib/seo/types";
import { INVESTOR_PROCESS_STEPS } from "@/lib/marketing/content";

const DEFAULT_PROCESS_STEPS = INVESTOR_PROCESS_STEPS.map(({ title, description }) => ({
  title,
  description,
}));

export const SEO_PAGE_PATHS = [
  "/rental-property-heloc",
  "/heloc-on-investment-property",
  "/no-tax-return-heloc",
  "/use-equity-to-buy-another-rental",
  "/cash-out-vs-heloc",
  "/investor-second-mortgage",
  "/condo-investor-heloc",
  "/two-to-four-unit-heloc",
] as const;

export type SeoPagePath = (typeof SEO_PAGE_PATHS)[number];

export const SEO_PAGES: Record<SeoPagePath, SeoPageConfig> = {
  "/rental-property-heloc": {
    path: "/rental-property-heloc",
    metadata: {
      title: "Rental Property HELOC for Investors",
      description:
        "Learn how revolving rental property HELOC programs may be available for qualifying investors—subject to approval, property eligibility, and lender guidelines.",
      ogTitle: "Rental Property HELOC | Investor Equity Review",
      ogDescription:
        "Revolving equity on rental collateral may help fund acquisitions, reserves, and renovations—programs may be available, subject to approval.",
    },
    hero: {
      eyebrow: "Rental property equity",
      h1: "Rental property HELOC options for investors",
      intro:
        "A rental property HELOC is a revolving line secured by non-owner-occupied collateral. Investors use available equity for acquisitions, renovations, reserves, and portfolio flexibility—when programs may be available, subject to approval. Compare investor equity options with guidance from a licensed mortgage professional.",
      highlights: [
        "Revolving access—draw and repay as deals surface",
        "Rental collateral focus—not primary-residence consumer positioning",
        "Licensed professional guidance—not just an automated engine",
      ],
    },
    whatItIs: {
      title: "What is a rental property HELOC?",
      paragraphs: [
        "A home equity line of credit (HELOC) on a rental property is typically structured as revolving credit secured by investment real estate. Unlike a one-time cash-out refinance, a HELOC may allow you to draw, repay, and redeploy capacity as capital needs change—when approved and subject to program terms.",
        "Investor programs often evaluate property type, estimated value, existing liens, credit, and documentation path. Line size, index, draw period, and repayment terms vary by lender and state availability.",
      ],
    },
    whoItFits: {
      title: "Who a rental HELOC may fit",
      intro: "Every file is reviewed individually. Common investor profiles include:",
      items: [
        "Landlords with meaningful equity in stabilized rentals",
        "Investors who want revolving liquidity without replacing a low-rate first mortgage",
        "Portfolio owners funding the next acquisition, renovation, or reserve bucket",
        "Self-employed or LLC owners exploring alternative documentation paths on select programs",
      ],
    },
    useCases: {
      title: "Common investor use cases",
      items: [
        {
          title: "Next rental acquisition",
          description:
            "Use available equity for down payment, closing costs, or carry reserves between closings—subject to approval and program guidelines.",
        },
        {
          title: "Value-add renovations",
          description:
            "Fund kitchen, bath, or unit turns while keeping dry powder for unexpected capex or vacancy periods.",
        },
        {
          title: "Portfolio reserves",
          description:
            "Maintain revolving capacity for insurance deductibles, turnover, or rate-lock timing on future purchases.",
        },
        {
          title: "Debt repositioning",
          description:
            "Consolidate higher-cost balances or free monthly cash flow when structure and lien position allow—terms vary.",
        },
      ],
    },
    process: {
      title: "How the review process works",
      intro: "A quick online review helps surface rate options that may be available for your rental property—no obligation.",
      steps: [...DEFAULT_PROCESS_STEPS],
    },
    secondPosition: {
      title: "Second-position financing on rentals",
      paragraphs: [
        "Many investors keep an existing first mortgage and add a HELOC in second lien position. That may preserve a favorable first-rate while unlocking equity for new deals—when lien position, combined loan-to-value, and lender guidelines allow.",
        "Second-position programs are subject to approval, property review, and investor underwriting. Not all properties or borrowers will qualify.",
      ],
    },
    faqs: [
      {
        question: "Is a rental property HELOC the same as a primary residence HELOC?",
        answer:
          "No. Investor programs are generally underwritten for non-owner-occupied collateral with different documentation, occupancy, and guideline requirements. Availability varies by property type and state.",
      },
      {
        question: "Do I need tax returns for a rental HELOC?",
        answer:
          "Some programs may allow alternative documentation such as bank statements or asset-based qualification on select files. Documentation requirements vary and are subject to approval.",
      },
      {
        question: "How fast can funding happen?",
        answer:
          "Timing depends on documentation completeness, third-party items, and lender workflow. Funding may be possible in as little as 7 days when the file is complete—subject to approval. This is not a guarantee.",
      },
    ],
    relatedPaths: [
      "/heloc-on-investment-property",
      "/no-tax-return-heloc",
      "/use-equity-to-buy-another-rental",
      "/two-to-four-unit-heloc",
    ],
    service: {
      name: "Rental Property HELOC Review",
      description:
        "Educational review of revolving equity options secured by rental property collateral for qualifying investors.",
    },
  },

  "/heloc-on-investment-property": {
    path: "/heloc-on-investment-property",
    metadata: {
      title: "HELOC on Investment Property",
      description:
        "How HELOC programs on investment-property collateral may work for landlords and portfolio investors—subject to approval and lender guidelines.",
      ogTitle: "HELOC on Investment Property | Investor Guide",
    },
    hero: {
      eyebrow: "Investment property equity",
      h1: "HELOC on investment property for landlords",
      intro:
        "When collateral is non-owner-occupied, documentation and line structure often differ from consumer HELOCs. See what revolving options may be available for your investment property—subject to approval. Compare investor equity options with guidance from a licensed mortgage professional.",
      highlights: [
        "Built for rental and investment property collateral",
        "May sit in second position behind an existing first mortgage",
        "Strategy-focused review with a licensed professional",
      ],
    },
    whatItIs: {
      title: "What is a HELOC on an investment property?",
      paragraphs: [
        "A HELOC on an investment property is revolving credit secured by real estate that is not your primary residence. Lenders typically review rental income or cash flow, equity, credit, lien position, and property condition against investor guidelines.",
        "Programs may be available for single-family rentals, small multifamily, condos, and other non-owner-occupied types—subject to property eligibility and state availability.",
      ],
    },
    whoItFits: {
      title: "Who this may fit",
      items: [
        "Landlords with one or more investment properties and usable equity",
        "Investors who prefer revolving capacity over a one-time cash-out refinance",
        "Borrowers with LLC or entity ownership structures accepted by the program",
        "Owners exploring bank-statement or alternative doc paths on select lenders",
      ],
    },
    useCases: {
      title: "Why investors use investment-property HELOCs",
      items: [
        {
          title: "Acquisition bridge",
          description:
            "Access equity for earnest money, down payment, or gap funding while longer-term financing is arranged.",
        },
        {
          title: "Renovation draws",
          description:
            "Fund light or heavy value-add work without selling the asset or resetting the entire first mortgage.",
        },
        {
          title: "Operating flexibility",
          description:
            "Cover turnover, capex, or short vacancies from a revolving line rather than liquidating other assets.",
        },
        {
          title: "Rate arbitrage",
          description:
            "Keep a low fixed first rate and tap equity through a separate line when spreads make sense—terms vary.",
        },
      ],
    },
    process: {
      title: "How the review process works",
      steps: [...DEFAULT_PROCESS_STEPS],
    },
    secondPosition: {
      title: "Second lien on investment collateral",
      paragraphs: [
        "A HELOC often registers behind an existing first mortgage. Combined loan-to-value, payment reserves, and property cash flow may all factor into approval—guidelines vary by investor and state.",
        "This site provides educational information and a path to review options; it is not a commitment to lend or an offer of credit.",
      ],
    },
    faqs: [
      {
        question: "Can I get a HELOC if the property is in an LLC?",
        answer:
          "Some programs may allow entity vesting or require personal guarantees. Structure and documentation requirements vary and are subject to approval.",
      },
      {
        question: "Does a short-term rental qualify?",
        answer:
          "STR and long-term rental properties may be considered on select programs. Property type, seasonality, and lender guidelines determine eligibility.",
      },
      {
        question: "Will this replace my first mortgage?",
        answer:
          "Not necessarily. Many investors add a HELOC in second position to preserve an existing first loan. Available structures depend on equity and program guidelines.",
      },
    ],
    relatedPaths: [
      "/rental-property-heloc",
      "/condo-investor-heloc",
      "/two-to-four-unit-heloc",
      "/no-tax-return-heloc",
    ],
    service: {
      name: "Investment Property HELOC Review",
      description:
        "Review of revolving equity line options for non-owner-occupied investment real estate.",
    },
  },

  "/no-tax-return-heloc": {
    path: "/no-tax-return-heloc",
    metadata: {
      title: "No Tax Return HELOC for Rental Investors",
      description:
        "Alternative documentation paths for rental HELOCs may be available on select programs—bank statements, assets, or other investor docs, subject to approval.",
      ogTitle: "No Tax Return Rental HELOC | Documentation Options",
    },
    hero: {
      eyebrow: "Alternative documentation",
      h1: "No tax return HELOC paths for rental investors",
      intro:
        "Self-employed landlords and LLC owners sometimes qualify using bank statements, asset statements, or other investor documentation instead of full personal tax returns—when select programs may be available, subject to approval.",
      highlights: [
        "May suit self-employed and entity-owned rentals",
        "Documentation requirements vary by program",
        "Not all borrowers or properties will qualify",
      ],
    },
    whatItIs: {
      title: "What does “no tax return” mean for a rental HELOC?",
      paragraphs: [
        "It does not mean “no documentation.” It usually means the lender may accept alternative income or asset verification instead of two years of personal tax returns on qualifying investor programs.",
        "Bank-statement programs, for example, may review business or personal deposits over a defined period. Asset-based paths may use verified liquid assets to support repayment. Every file is underwritten individually—terms and eligibility vary.",
      ],
    },
    whoItFits: {
      title: "Who alternative documentation may fit",
      items: [
        "Self-employed investors with strong deposit history",
        "LLC or S-corp owners where tax returns do not reflect cash flow",
        "Portfolio landlords with multiple rentals and complex returns",
        "Borrowers with substantial verified assets and equity in collateral",
      ],
    },
    useCases: {
      title: "Common reasons investors explore alt-doc HELOCs",
      items: [
        {
          title: "Faster alignment with cash flow",
          description:
            "Deposits or assets may better reflect operating performance than a single tax year—subject to program rules.",
        },
        {
          title: "Entity-heavy portfolios",
          description:
            "When income flows through entities, alternative paths may reduce friction—documentation requirements vary.",
        },
        {
          title: "Revolving acquisition capacity",
          description:
            "Pair alt-doc qualification with a HELOC to fund the next deal when approved.",
        },
        {
          title: "Renovation liquidity",
          description:
            "Draw for capex without a full doc cash-out refinance—subject to lien position and guidelines.",
        },
      ],
    },
    process: {
      title: "How the review process works",
      intro: "Start with a short scenario review; documentation path is matched after initial fit is explored.",
      steps: [...DEFAULT_PROCESS_STEPS],
    },
    faqs: [
      {
        question: "Is a no-tax-return HELOC guaranteed?",
        answer:
          "No. Alternative documentation is available only on select programs and subject to credit approval, property review, and lender guidelines. This is not a commitment to lend.",
      },
      {
        question: "What documents might still be required?",
        answer:
          "Typical items may include bank statements, asset statements, lease or rent rolls, entity documents, identification, and property information. Requirements vary.",
      },
      {
        question: "Are rates higher on alt-doc programs?",
        answer:
          "Pricing depends on credit, LTV, lien position, property type, and program. Terms are disclosed during review and are subject to change until locked, if applicable.",
      },
    ],
    relatedPaths: [
      "/rental-property-heloc",
      "/heloc-on-investment-property",
      "/investor-second-mortgage",
      "/cash-out-vs-heloc",
    ],
    service: {
      name: "Alternative Documentation HELOC Review",
      description:
        "Educational review of rental HELOC programs that may allow non-traditional income documentation.",
    },
  },

  "/use-equity-to-buy-another-rental": {
    path: "/use-equity-to-buy-another-rental",
    metadata: {
      title: "Use Rental Equity to Buy Another Property",
      description:
        "How investors use existing rental equity for down payments, reserves, and the next acquisition—programs may be available, subject to approval.",
      ogTitle: "Use Equity to Buy Another Rental | Investor Guide",
    },
    hero: {
      eyebrow: "Portfolio growth",
      h1: "Use rental equity to buy another property",
      intro:
        "Revolving HELOC capacity on a stabilized rental may help fund the next down payment, closing costs, or reserves—when programs may be available, subject to approval and property eligibility. Compare investor equity options with guidance from a licensed mortgage professional.",
      highlights: [
        "Keep deploying capital without selling winners",
        "Revolving structure for serial acquisitions",
        "Personalized strategy review—not a one-product pitch",
      ],
    },
    whatItIs: {
      title: "How equity from one rental can fund the next",
      paragraphs: [
        "Investors often treat equity in Property A as a liquidity source for Property B. A HELOC may provide revolving access up to an approved limit, so you draw for earnest money or closing and repay or redraw as your portfolio strategy evolves.",
        "Lenders typically evaluate combined leverage, reserves, and experience. Line size and lien position depend on equity, credit, and guidelines—terms vary.",
      ],
    },
    whoItFits: {
      title: "Who this strategy may fit",
      items: [
        "Investors scaling from one rental to two or more",
        "Owners with strong equity in a paid-down or low-LTV rental",
        "Buy-and-hold operators who want flexible dry powder",
        "Value-add investors bridging renovation spend between acquisitions",
      ],
    },
    useCases: {
      title: "Ways investors deploy equity for the next deal",
      items: [
        {
          title: "Down payment and closing",
          description:
            "Cover required cash to close on the next purchase while preserving other liquid reserves.",
        },
        {
          title: "Earnest money and option fees",
          description:
            "Secure contracts quickly in competitive markets—subject to available line and approval.",
        },
        {
          title: "Post-close reserves",
          description:
            "Hold six months of PITI or capex reserves without selling securities or other assets.",
        },
        {
          title: "Light bridge before DSCR close",
          description:
            "Short-term draws may bridge timing between acquisition and long-term rental financing—terms vary.",
        },
      ],
    },
    process: {
      title: "How the review process works",
      steps: [...DEFAULT_PROCESS_STEPS],
    },
    secondPosition: {
      title: "Second-position HELOC while you scale",
      paragraphs: [
        "Many investors keep the first mortgage on the equity-rich rental and add a HELOC in second position. That may unlock cash for the next purchase without disturbing a favorable first-rate—when CLTV and guidelines allow.",
        "Each new acquisition has its own financing requirements. This page is educational and does not guarantee any structure or approval.",
      ],
    },
    faqs: [
      {
        question: "How much equity can I typically access?",
        answer:
          "Available equity depends on estimated value, existing liens, program CLTV limits, and property type. Use the on-site estimator for an illustrative snapshot—not an offer of credit.",
      },
      {
        question: "Can I use a HELOC for the full purchase price?",
        answer:
          "Generally no. Lenders expect down payment and reserves from acceptable sources. HELOC funds may supplement equity you already have—subject to approval.",
      },
      {
        question: "Does using equity affect future refinances?",
        answer:
          "Additional liens change combined leverage and may affect future refinancing options. Consider hold period and total leverage with your advisors.",
      },
    ],
    relatedPaths: [
      "/rental-property-heloc",
      "/cash-out-vs-heloc",
      "/two-to-four-unit-heloc",
      "/heloc-on-investment-property",
    ],
    service: {
      name: "Rental Equity for Acquisition Review",
      description:
        "Educational review of using rental property HELOC equity for subsequent investment purchases.",
    },
  },

  "/cash-out-vs-heloc": {
    path: "/cash-out-vs-heloc",
    metadata: {
      title: "Cash-Out Refinance vs HELOC on Rentals",
      description:
        "Compare cash-out refinance and rental HELOC strategies for investors—revolving access, lien position, and when each may be available, subject to approval.",
      ogTitle: "Cash-Out vs HELOC for Rental Investors",
    },
    hero: {
      eyebrow: "Investor strategy",
      h1: "Cash-out refinance vs HELOC on rental property",
      intro:
        "Both paths access rental property equity, but structure differs: a cash-out refinance replaces your first mortgage with a new balance, while a HELOC may sit in second position as revolving credit. See what may fit your portfolio—subject to approval. Compare investor equity options with guidance from a licensed mortgage professional.",
      highlights: [
        "HELOC: revolving draws, may preserve first rate",
        "Cash-out: one-time proceeds, new first loan terms",
        "Licensed professional helps compare paths for your goals",
      ],
    },
    whatItIs: {
      title: "What is the difference?",
      paragraphs: [
        "A cash-out refinance pays off your existing first mortgage and funds a new, larger first loan—you receive lump-sum proceeds at closing subject to LTV limits and approval.",
        "A rental HELOC typically leaves the first mortgage in place and adds a revolving second lien. You draw when needed, pay interest on outstanding balance, and may repay and redraw per program terms.",
      ],
    },
    whoItFits: {
      title: "When each approach may make sense",
      items: [
        "HELOC may fit when you want flexibility, multiple draws, or to keep a low first rate",
        "Cash-out may fit when you want one fixed structure and do not need revolving access",
        "HELOC may fit serial acquirers funding several deals over time",
        "Cash-out may fit large one-time debt consolidation with long hold periods—terms vary",
      ],
    },
    useCases: {
      title: "Investor scenarios to compare",
      items: [
        {
          title: "Serial acquisitions",
          description:
            "HELOC revolving capacity may fund deal one, repay after refinance, and redraw for deal two—subject to program limits.",
        },
        {
          title: "Single large project",
          description:
            "A cash-out lump sum may fund a major renovation or payoff—if new first terms are acceptable.",
        },
        {
          title: "Rate environment",
          description:
            "If your first rate is attractive, second-position HELOC access may avoid resetting the entire loan—guidelines vary.",
        },
        {
          title: "Closing costs and timing",
          description:
            "Cost and speed differ by product and file completeness. Neither path is guaranteed until approved.",
        },
      ],
    },
    process: {
      title: "How to explore your options",
      steps: [...DEFAULT_PROCESS_STEPS],
    },
    secondPosition: {
      title: "Why investors often choose a second-position HELOC",
      paragraphs: [
        "Preserving a favorable first mortgage while tapping equity is a common portfolio tactic. Combined LTV, payment qualification, and property cash flow still apply—subject to investor guidelines.",
        "Cash-out remains appropriate when resetting the first loan improves overall cost of capital for your strategy. This comparison is educational, not financial advice.",
      ],
    },
    faqs: [
      {
        question: "Which is faster—cash-out or HELOC?",
        answer:
          "Timing depends on documentation, appraisals, title, and lender workflow. Either may move quickly when the file is complete—subject to approval. Not a guarantee of speed.",
      },
      {
        question: "Can I have both on the same property?",
        answer:
          "You generally have one first mortgage. A HELOC is typically subordinate. You would not stack two first liens; structure depends on approval and guidelines.",
      },
      {
        question: "Does a HELOC always have a variable rate?",
        answer:
          "Many HELOCs are variable, but product features vary. Review index, margin, caps, and conversion options if offered—terms disclosed during review.",
      },
    ],
    relatedPaths: [
      "/rental-property-heloc",
      "/investor-second-mortgage",
      "/use-equity-to-buy-another-rental",
      "/no-tax-return-heloc",
    ],
    service: {
      name: "Cash-Out vs HELOC Comparison Review",
      description:
        "Educational comparison of cash-out refinance and rental HELOC strategies for investment property owners.",
    },
  },

  "/investor-second-mortgage": {
    path: "/investor-second-mortgage",
    metadata: {
      title: "Investor Second Mortgage & HELOC on Rentals",
      description:
        "Second-position financing and HELOC options on rental property may be available for qualifying investors—subject to approval and combined LTV guidelines.",
      ogTitle: "Investor Second Mortgage | Rental Equity",
    },
    hero: {
      eyebrow: "Second lien position",
      h1: "Investor second mortgage and HELOC options",
      intro:
        "A second-position loan or HELOC sits behind your existing first mortgage, which may let you access rental property equity without refinancing a favorable first rate—when programs may be available, subject to approval. Compare investor equity options with guidance from a licensed mortgage professional.",
      highlights: [
        "May preserve your current first mortgage",
        "Second-position financing guidelines apply",
        "Investor-specific recommendations from a licensed professional",
      ],
    },
    whatItIs: {
      title: "What is investor second-position financing?",
      paragraphs: [
        "Second-position credit registers after your first mortgage lien. Products may include a HELOC (revolving) or a closed-end second lien (installment), depending on lender and investor guidelines.",
        "Underwriting usually considers combined loan-to-value, property type, rental income or cash flow, credit, and reserves. State availability and documentation requirements vary.",
      ],
    },
    whoItFits: {
      title: "Who second-position programs may fit",
      items: [
        "Owners with substantial equity and an existing low-rate first mortgage",
        "Investors who need targeted liquidity rather than a full refinance",
        "Landlords with stable rental cash flow supporting total housing debt",
        "Borrowers meeting CLTV limits for their property type and market",
      ],
    },
    useCases: {
      title: "Common uses for a second lien",
      items: [
        {
          title: "Acquisition funding",
          description:
            "Tap equity for the next rental without disturbing the first loan—subject to approval.",
        },
        {
          title: "Renovation and capex",
          description:
            "Fund improvements while maintaining revolving flexibility with a HELOC structure.",
        },
        {
          title: "Reserve line",
          description:
            "Standby capacity for vacancies, insurance claims, or opportunistic purchases.",
        },
        {
          title: "Selective paydowns",
          description:
            "Address higher-cost business or property debt when structure aligns—terms vary.",
        },
      ],
    },
    process: {
      title: "How the review process works",
      steps: [...DEFAULT_PROCESS_STEPS],
    },
    secondPosition: {
      title: "Combined LTV and lien stacking",
      paragraphs: [
        "Lenders cap combined exposure across first and second liens. Strong equity, credit, and property performance may support higher combined limits on select programs—always subject to approval.",
        "Title, subordination, and insurance requirements apply. This information is educational and not an offer of credit.",
      ],
    },
    faqs: [
      {
        question: "Is a HELOC the same as a second mortgage?",
        answer:
          "A HELOC is often a second lien, but it is revolving. A closed-end second is also subordinate but typically disburses a fixed amount. Product choice depends on your strategy and approval.",
      },
      {
        question: "Will my first lender allow a second lien?",
        answer:
          "Most first mortgages permit subordinate financing within note terms, but subordination and insurer rules may apply. Your file is reviewed against current guidelines.",
      },
      {
        question: "What if I sell the property?",
        answer:
          "Proceeds at sale typically pay off liens in order of priority. Payoff quotes include first and second balances—consult your closing team for specifics.",
      },
    ],
    relatedPaths: [
      "/rental-property-heloc",
      "/cash-out-vs-heloc",
      "/heloc-on-investment-property",
      "/two-to-four-unit-heloc",
    ],
    service: {
      name: "Investor Second Position Financing Review",
      description:
        "Educational review of second-lien and HELOC options behind an existing rental property mortgage.",
    },
  },

  "/condo-investor-heloc": {
    path: "/condo-investor-heloc",
    metadata: {
      title: "Condo Investor HELOC Options",
      description:
        "HELOC programs on non-owner-occupied condos may be available for qualifying investors—warrantability, HOA, and lender guidelines apply, subject to approval.",
      ogTitle: "Condo Investor HELOC | Rental Equity Guide",
    },
    hero: {
      eyebrow: "Condo collateral",
      h1: "Condo investor HELOC options",
      intro:
        "Condominium rentals can qualify for investor HELOC programs when the project, occupancy, and borrower profile meet lender guidelines—programs may be available, subject to approval.",
      highlights: [
        "Non-owner-occupied condo focus",
        "Warrantability and HOA factors matter",
        "Quick scenario review available online",
      ],
    },
    whatItIs: {
      title: "What is a condo investor HELOC?",
      paragraphs: [
        "It is revolving equity credit secured by an investment condo unit. Lenders often review HOA health, owner-occupancy ratios, insurance, and project warrantability in addition to borrower credit and equity.",
        "Line size and pricing may differ from single-family rentals due to project risk overlays. State availability and documentation requirements vary.",
      ],
    },
    whoItFits: {
      title: "When a condo HELOC may be considered",
      items: [
        "Investors with equity in stabilized condo rentals",
        "Projects that meet warrantability or non-warrantable program rules",
        "Borrowers with acceptable credit and combined LTV for the unit",
        "Owners who want revolving access without refinancing the first mortgage",
      ],
    },
    useCases: {
      title: "Investor use cases for condo equity",
      items: [
        {
          title: "Next condo or SFR purchase",
          description:
            "Redirect equity into another acquisition or diversify property type—subject to approval.",
        },
        {
          title: "Special assessments and HOA items",
          description:
            "Cover one-time HOA assessments or building repairs from a line when needed.",
        },
        {
          title: "Interior upgrades",
          description:
            "Fund kitchen, bath, or flooring between tenants to support rent growth.",
        },
        {
          title: "Reserve flexibility",
          description:
            "Maintain liquidity for vacancies or rate changes in the association budget.",
        },
      ],
    },
    process: {
      title: "How the review process works",
      intro: "Condo-specific questions may include HOA docs, master policy, and project status—after initial fit is explored.",
      steps: [...DEFAULT_PROCESS_STEPS],
    },
    faqs: [
      {
        question: "Do all condo projects qualify?",
        answer:
          "No. Warrantability, litigation, rental caps, and investor concentration limits may affect eligibility. Some lenders offer non-warrantable paths on select programs—subject to approval.",
      },
      {
        question: "Can the condo be in an LLC?",
        answer:
          "Entity vesting may be allowed on certain programs. Documentation and guarantee requirements vary.",
      },
      {
        question: "Is STR allowed for condo HELOCs?",
        answer:
          "Short-term rental use may be restricted by lender, HOA, or local rules. Occupancy and use must be disclosed and approved per guidelines.",
      },
    ],
    relatedPaths: [
      "/heloc-on-investment-property",
      "/rental-property-heloc",
      "/two-to-four-unit-heloc",
      "/no-tax-return-heloc",
    ],
    service: {
      name: "Condo Investor HELOC Review",
      description:
        "Educational review of revolving equity options for non-owner-occupied condominium investments.",
    },
  },

  "/two-to-four-unit-heloc": {
    path: "/two-to-four-unit-heloc",
    metadata: {
      title: "2–4 Unit Rental HELOC Options",
      description:
        "HELOC programs on duplex, triplex, and fourplex rentals may be available for qualifying investors—subject to approval, property eligibility, and guidelines.",
      ogTitle: "2–4 Unit Rental HELOC | Small Multifamily Equity",
    },
    hero: {
      eyebrow: "Small multifamily",
      h1: "2–4 unit rental HELOC options",
      intro:
        "Duplexes, triplexes, and fourplexes may qualify for investor HELOC programs when collateral, rents, and borrower profile align with lender guidelines—programs may be available, subject to approval.",
      highlights: [
        "Residential 2–4 unit investment focus",
        "Rent rolls and unit mix may be reviewed",
        "Revolving equity for growth and reserves",
      ],
    },
    whatItIs: {
      title: "What is a 2–4 unit investor HELOC?",
      paragraphs: [
        "Small multifamily properties (two to four units) are often underwritten with residential investor guidelines rather than commercial mortgages. A HELOC may provide revolving access to equity across the building—when approved.",
        "Lenders may review gross rents, vacancy assumptions, expenses, and condition. Combined LTV limits and lien position rules apply—terms vary by program and state.",
      ],
    },
    whoItFits: {
      title: "Who small multifamily HELOCs may fit",
      items: [
        "House hackers transitioning units to full rental",
        "Investors scaling from SFR into 2–4 unit assets",
        "Owners with strong in-place rents and manageable vacancy",
        "Borrowers with equity supporting combined lien limits",
      ],
    },
    useCases: {
      title: "Common 2–4 unit equity strategies",
      items: [
        {
          title: "Unit renovations",
          description:
            "Upgrade kitchens, baths, or common areas to support rent growth between leases.",
        },
        {
          title: "Next property down payment",
          description:
            "Use building equity to fund another acquisition—subject to approval and reserves.",
        },
        {
          title: "Operating reserves",
          description:
            "Cover turnover, maintenance, or seasonal vacancy across multiple doors.",
        },
        {
          title: "Refinance alternative",
          description:
            "Access equity via second position instead of resetting a favorable first—when guidelines allow.",
        },
      ],
    },
    process: {
      title: "How the review process works",
      steps: [...DEFAULT_PROCESS_STEPS],
    },
    secondPosition: {
      title: "Second-position HELOC on 2–4 units",
      paragraphs: [
        "As with single-family rentals, many investors add a HELOC behind an existing first mortgage. Rent coverage of total debt service and property condition are key factors—subject to investor underwriting.",
        "Five-plus unit buildings may fall under different commercial guidelines; this page focuses on two- to four-unit residential investment properties.",
      ],
    },
    faqs: [
      {
        question: "Do I need commercial financing for a fourplex?",
        answer:
          "Many fourplex properties use residential investor (1–4 unit) guidelines. Five or more units often require commercial products. Eligibility depends on property and program.",
      },
      {
        question: "Are rents used for qualification?",
        answer:
          "Rental income or cash flow may support underwriting on investor programs. Documentation requirements vary and are subject to approval.",
      },
      {
        question: "Can I live in one unit and HELOC the building?",
        answer:
          "Owner-occupancy in one unit may change program options. Non-owner-occupied and house-hack scenarios are reviewed differently—disclose occupancy accurately.",
      },
    ],
    relatedPaths: [
      "/rental-property-heloc",
      "/heloc-on-investment-property",
      "/use-equity-to-buy-another-rental",
      "/investor-second-mortgage",
    ],
    service: {
      name: "2–4 Unit Rental HELOC Review",
      description:
        "Educational review of revolving equity options for duplex, triplex, and fourplex investment properties.",
    },
  },
};

export function getSeoPageConfig(path: string): SeoPageConfig | undefined {
  return SEO_PAGES[path as SeoPagePath];
}

export function getSeoPageLabel(path: string): string {
  const config = getSeoPageConfig(path);
  return config?.hero.h1 ?? path;
}
