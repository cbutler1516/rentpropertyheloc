import type { SeoPageConfig } from "@/lib/seo/types";
import {
  DEFAULT_SEO_PROCESS_STEPS,
  GEO_HELOC_FAQS,
  SEO_COMPLIANCE,
  withGuidanceTagline,
} from "@/lib/seo/shared-content";

export const INVESTOR_EXPANSION_SEO_PATHS = [
  "/investment-property-heloc",
  "/heloc-on-rental-property",
  "/investor-home-equity-line",
  "/use-rental-property-equity-to-buy-another-property",
  "/cash-out-vs-heloc-for-investors",
] as const;

export type InvestorExpansionSeoPath = (typeof INVESTOR_EXPANSION_SEO_PATHS)[number];

export const INVESTOR_EXPANSION_SEO_PAGES: Record<InvestorExpansionSeoPath, SeoPageConfig> = {
  "/investment-property-heloc": {
    path: "/investment-property-heloc",
    metadata: {
      title: "Investment Property HELOC",
      description:
        "Explore HELOC options on investment property collateral for qualifying investors—subject to approval and lender guidelines.",
      ogTitle: "Investment Property HELOC | Investor Equity",
      ogDescription:
        "Revolving equity on investment real estate may fund acquisitions, reserves, and renovations—subject to approval.",
    },
    hero: {
      eyebrow: "Investment property equity",
      h1: "Investment property HELOC options for investors",
      intro: withGuidanceTagline(
        "An investment property HELOC is a revolving line secured by non-owner-occupied real estate—single-family rentals, small multifamily, and other investor collateral when programs may be available, subject to approval.",
      ),
      highlights: [
        "Non-owner-occupied underwriting focus",
        "Revolving capital for portfolio growth",
        "Investor-specialist guidance",
      ],
    },
    whatItIs: {
      title: "What is an investment property HELOC?",
      paragraphs: [
        "Unlike owner-occupied HELOCs, investment property lines are underwritten for rental or non-owner-occupied use. Lenders review property type, estimated value, liens, rents or cash flow, credit, and documentation path.",
        "Proceeds may support acquisitions, renovations, reserves, or debt repositioning—subject to program use-of-funds rules and investor guidelines.",
      ],
    },
    whoItFits: {
      title: "Who investment property HELOCs may fit",
      items: [
        "Landlords with stabilized rentals and meaningful equity",
        "Investors scaling from one property to a portfolio",
        "Borrowers preserving a favorable first mortgage on the asset",
        "Self-employed investors exploring alternative documentation on select programs",
      ],
    },
    useCases: {
      title: "Investor use cases",
      items: [
        {
          title: "Acquire the next rental",
          description: "Use equity for down payment, closing costs, or carry reserves.",
        },
        {
          title: "Renovate for rent growth",
          description: "Fund value-add work between lease turns.",
        },
        {
          title: "Portfolio liquidity",
          description: "Maintain revolving capacity across multiple assets.",
        },
        {
          title: "Bridge timing gaps",
          description: "Cover short-term needs between closings or refis.",
        },
      ],
    },
    process: { title: "How the investor review works", steps: DEFAULT_SEO_PROCESS_STEPS },
    secondPosition: {
      title: "Second-position HELOC on investment property",
      paragraphs: [
        "Many investors add a HELOC behind an existing first mortgage to avoid resetting a low rate. Combined LTV, lien position, and rent coverage are key underwriting factors—subject to approval.",
        "Not every investment property or borrower will qualify. Property condition, occupancy, and entity vesting may affect available programs.",
      ],
    },
    faqs: [
      GEO_HELOC_FAQS.rentalProperty,
      GEO_HELOC_FAQS.buyAnotherProperty,
      GEO_HELOC_FAQS.equityNeeded,
      {
        question: "Is an investment property HELOC different from a rental HELOC?",
        answer:
          "Terms vary by lender, but both generally refer to non-owner-occupied collateral. Property type, unit count, and documentation requirements differ from primary-residence products.",
      },
      {
        question: "Does this guarantee investor approval?",
        answer: `No. ${SEO_COMPLIANCE}`,
      },
    ],
    relatedPaths: [
      "/rental-property-heloc",
      "/heloc-on-investment-property",
      "/heloc-on-rental-property",
      "/investor-home-equity-line",
    ],
    service: {
      name: "Investment Property HELOC Review",
      description: "Educational review of revolving HELOC options on investment property collateral.",
      serviceType: "Investment property HELOC review",
    },
  },

  "/heloc-on-rental-property": {
    path: "/heloc-on-rental-property",
    metadata: {
      title: "HELOC on Rental Property",
      description:
        "Learn how a HELOC on rental property collateral may work for landlords—programs may be available, subject to approval.",
      ogTitle: "HELOC on Rental Property | Landlord Guide",
      ogDescription:
        "Revolving rental property equity for acquisitions, renovations, and reserves—subject to approval.",
    },
    hero: {
      eyebrow: "Rental property",
      h1: "HELOC on a rental property",
      intro: withGuidanceTagline(
        "Landlords with equity in a rental home, condo, or small multifamily building may explore revolving HELOC programs—distinct from primary-residence lines and subject to investor underwriting.",
      ),
      highlights: [
        "Built for landlord collateral",
        "Second-lien options may preserve first rate",
        "Quick review—about 60 seconds",
      ],
    },
    whatItIs: {
      title: "How a rental property HELOC works",
      paragraphs: [
        "A HELOC on rental property is secured by non-owner-occupied real estate. You may draw during the draw period and repay to restore capacity—when approved and subject to program terms.",
        "Underwriting typically considers appraised value, existing mortgage balance, property type, rental income or market rents, credit, and state availability.",
      ],
    },
    whoItFits: {
      title: "Landlord profiles that may qualify",
      items: [
        "Single-family rental owners with strong equity",
        "Investors with long-term hold strategies",
        "Owners who want flexibility without cash-out refi",
        "Portfolio builders funding the next acquisition",
      ],
    },
    useCases: {
      title: "Why landlords use rental HELOCs",
      items: [
        {
          title: "Down payment for property #2+",
          description: "Recycle equity into the next deal—subject to approval.",
        },
        {
          title: "Turnover and capex",
          description: "Fund repairs, appliances, or cosmetic updates between tenants.",
        },
        {
          title: "Reserve fund",
          description: "Cover vacancy, insurance deductibles, or rate-lock deposits.",
        },
        {
          title: "Rate arbitrage",
          description: "Keep a low first mortgage; add second-lien liquidity.",
        },
      ],
    },
    process: { title: "Start a rental HELOC review", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      GEO_HELOC_FAQS.rentalProperty,
      GEO_HELOC_FAQS.buyAnotherProperty,
      {
        question: "Can I get a HELOC if the rental is in an LLC?",
        answer:
          "Entity vesting may be allowed on certain investor programs. Guarantee and documentation requirements vary—subject to approval.",
      },
      {
        question: "Do I need tax returns for a rental HELOC?",
        answer:
          "Documentation paths vary. Some programs may allow bank statements or asset-based qualification on select files—subject to approval.",
      },
    ],
    relatedPaths: [
      "/rental-property-heloc",
      "/investment-property-heloc",
      "/no-tax-return-heloc",
      "/use-rental-property-equity-to-buy-another-property",
    ],
    service: {
      name: "Rental Property HELOC Review",
      description: "Educational review of HELOC options secured by rental property collateral.",
      serviceType: "Rental property HELOC review",
    },
  },

  "/investor-home-equity-line": {
    path: "/investor-home-equity-line",
    metadata: {
      title: "Investor Home Equity Line",
      description:
        "Explore investor home equity lines on rental and investment collateral—revolving access subject to approval.",
      ogTitle: "Investor Home Equity Line | Portfolio Liquidity",
      ogDescription:
        "Revolving investor equity lines for acquisitions, reserves, and growth—subject to approval.",
    },
    hero: {
      eyebrow: "Investor equity line",
      h1: "Investor home equity line options",
      intro: withGuidanceTagline(
        "An investor home equity line functions like a HELOC on non-owner-occupied collateral—revolving capacity investors use for deals, reserves, and portfolio flexibility when programs may be available.",
      ),
      highlights: [
        "Revolving—not one-time disbursement",
        "Rental and investment focus",
        "Human-reviewed investor intake",
      ],
    },
    whatItIs: {
      title: "What is an investor equity line?",
      paragraphs: [
        "Investor equity lines are typically second-lien revolving products secured by investment real estate. They differ from DSCR purchase loans, which fund acquisitions directly—equity lines unlock value in assets you already own.",
        "Line size, index, margin, draw period, and repayment terms vary by lender, property type, and combined loan-to-value—subject to approval.",
      ],
    },
    whoItFits: {
      title: "When an investor equity line may help",
      items: [
        "Investors with idle equity in stabilized rentals",
        "Portfolio owners who want dry powder for opportunities",
        "Landlords avoiding first-mortgage refinance",
        "Active acquirers needing flexible capital between closings",
      ],
    },
    useCases: {
      title: "Portfolio strategies",
      items: [
        {
          title: "Opportunity fund",
          description: "Draw when a deal surfaces; repay after refinance or sale.",
        },
        {
          title: "Cross-collateral planning",
          description: "Discuss which asset's equity best supports the next move.",
        },
        {
          title: "Renovation bursts",
          description: "Fund multiple unit turns across a portfolio over time.",
        },
        {
          title: "Debt optimization",
          description: "Compare line rate to higher-cost balances—subject to guidelines.",
        },
      ],
    },
    process: { title: "Review investor equity options", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      GEO_HELOC_FAQS.rentalProperty,
      GEO_HELOC_FAQS.bestWayToAccess,
      GEO_HELOC_FAQS.equityNeeded,
      {
        question: "Is an investor equity line the same as a HELOC?",
        answer:
          "Colloquially, investors often use the terms interchangeably for revolving second-lien lines on investment property. Product names and guidelines vary by lender.",
      },
    ],
    relatedPaths: [
      "/investment-property-heloc",
      "/rental-property-heloc",
      "/heloc-on-rental-property",
      "/2-4-unit-rental-heloc",
    ],
    service: {
      name: "Investor Home Equity Line Review",
      description: "Educational review of revolving investor equity lines on rental and investment collateral.",
      serviceType: "Investor home equity line review",
    },
  },

  "/use-rental-property-equity-to-buy-another-property": {
    path: "/use-rental-property-equity-to-buy-another-property",
    metadata: {
      title: "Use Rental Equity to Buy Another Property",
      description:
        "Learn how investors use rental property equity via HELOC for the next acquisition—subject to approval.",
      ogTitle: "Use Rental Equity for Next Property | Investor Guide",
      ogDescription:
        "Access rental equity for down payments and reserves on your next investment—subject to approval.",
    },
    hero: {
      eyebrow: "Portfolio growth",
      h1: "Use rental property equity to buy another property",
      intro: withGuidanceTagline(
        "Experienced investors often recycle equity from an existing rental into down payment, closing costs, or reserves for the next acquisition—commonly through a HELOC or home equity line on the rental collateral.",
      ),
      highlights: [
        "Acquisition-focused investor path",
        "Revolving access between deals",
        "Subject to approval and reserves requirements",
      ],
    },
    whatItIs: {
      title: "How rental equity funds the next deal",
      paragraphs: [
        "A HELOC on a stabilized rental may provide proceeds you deploy toward another purchase. Lenders review both the collateral property and your overall profile—including reserves, credit, and the new deal's structure.",
        "This strategy does not guarantee approval on either the line or the purchase loan. Each file is underwritten separately—subject to program guidelines.",
      ],
    },
    whoItFits: {
      title: "Investor scenarios",
      items: [
        "Landlords with strong equity in property #1 funding property #2",
        "Investors bridging between BRRRR-style steps",
        "Owners who want to move quickly when a deal appears",
        "Portfolio builders using equity instead of liquidating assets",
      ],
    },
    useCases: {
      title: "Common capital uses",
      items: [
        {
          title: "Down payment",
          description: "Deploy line proceeds toward the next property's equity requirement.",
        },
        {
          title: "Closing costs",
          description: "Cover title, escrow, and lender fees at acquisition.",
        },
        {
          title: "Post-close reserves",
          description: "Maintain liquidity after closing—subject to lender reserve rules.",
        },
        {
          title: "Light value-add before rent",
          description: "Fund quick renovations on the new asset after purchase.",
        },
      ],
    },
    process: { title: "Plan your equity recycle", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      GEO_HELOC_FAQS.buyAnotherProperty,
      GEO_HELOC_FAQS.rentalProperty,
      GEO_HELOC_FAQS.equityNeeded,
      {
        question: "Can I use primary-residence equity to buy a rental?",
        answer:
          "Some investors use owner-occupied equity for investment purchases. Use of funds and occupancy rules differ by program—disclose intent during review.",
      },
    ],
    relatedPaths: [
      "/use-equity-to-buy-another-rental",
      "/rental-property-heloc",
      "/investment-property-heloc",
      "/heloc-on-rental-property",
    ],
    service: {
      name: "Rental Equity Acquisition Review",
      description: "Educational review of using rental property HELOC equity for another acquisition.",
      serviceType: "Investor acquisition equity review",
    },
  },

  "/cash-out-vs-heloc-for-investors": {
    path: "/cash-out-vs-heloc-for-investors",
    metadata: {
      title: "Cash-Out vs HELOC for Investors",
      description:
        "Compare cash-out refinance and HELOC on investment property for accessing rental equity—subject to approval.",
      ogTitle: "Investor Cash-Out vs HELOC | Comparison Guide",
      ogDescription:
        "Should investors refinance or use a HELOC on rental collateral? Compare paths—subject to approval.",
    },
    hero: {
      eyebrow: "Investor comparison",
      h1: "Cash-out refinance vs HELOC for investors",
      intro: withGuidanceTagline(
        "Investors access rental equity through cash-out refinance (new first mortgage + lump sum) or a HELOC (revolving second lien). The right structure depends on your rate, hold period, and capital needs.",
      ),
      highlights: [
        "Investor-specific comparison",
        "Preserve low first rates when possible",
        "Licensed specialist walkthrough",
      ],
    },
    whatItIs: {
      title: "Two ways to access rental equity",
      paragraphs: [
        "Cash-out refinance replaces the existing rental mortgage and delivers proceeds at closing—useful when today's rate works and you need a defined amount upfront.",
        "A HELOC may preserve a favorable first mortgage while providing revolving access—subject to second-lien CLTV, rent coverage, and investor guidelines.",
      ],
    },
    whoItFits: {
      title: "When each may fit investors",
      items: [
        "HELOC: strong first rate, need flexible or repeated access",
        "Cash-out: want one new loan and lump-sum proceeds",
        "HELOC: active acquirers drawing between deals",
        "Cash-out: long hold, rate environment favors refi",
      ],
    },
    useCases: {
      title: "Investor decision factors",
      items: [
        {
          title: "Rate math",
          description: "Compare blended cost of keeping first + HELOC vs. new cash-out rate.",
        },
        {
          title: "Speed to capital",
          description: "Timeline for refi vs. line setup varies by file completeness.",
        },
        {
          title: "Repeat draws",
          description: "HELOC suits multiple draws; cash-out is one-time at closing.",
        },
        {
          title: "Prepayment and exit",
          description: "Hold period affects whether resetting the first makes sense.",
        },
      ],
    },
    process: { title: "Compare investor structures", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      GEO_HELOC_FAQS.helocVsCashOut,
      GEO_HELOC_FAQS.rentalProperty,
      {
        question: "Which is better for BRRRR investors?",
        answer:
          "BRRRR strategies vary. Some investors use HELOCs for acquisition or rehab, then refinance out. The fit depends on ARV, timeline, and rates—subject to approval on each step.",
      },
      {
        question: "Can I compare both in one review?",
        answer:
          "Yes. Share the rental address, occupancy, and goals so a specialist can discuss paths that may be available—subject to approval.",
      },
    ],
    relatedPaths: [
      "/cash-out-vs-heloc",
      "/cash-out-refi-vs-heloc",
      "/rental-property-heloc",
      "/investment-property-heloc",
    ],
    service: {
      name: "Investor Cash-Out vs HELOC Comparison",
      description: "Educational comparison of cash-out refinance and HELOC for investment property owners.",
      serviceType: "Investor equity comparison review",
    },
  },
};
