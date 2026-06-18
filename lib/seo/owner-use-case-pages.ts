import type { SeoPageConfig } from "@/lib/seo/types";
import {
  DEFAULT_SEO_PROCESS_STEPS,
  GEO_HELOC_FAQS,
  SEO_COMPLIANCE,
  withGuidanceTagline,
} from "@/lib/seo/shared-content";

export const OWNER_USE_CASE_SEO_PATHS = [
  "/home-equity-line-of-credit",
  "/cash-out-refi-vs-heloc",
  "/debt-consolidation-heloc",
  "/home-improvement-heloc",
] as const;

export type OwnerUseCaseSeoPath = (typeof OWNER_USE_CASE_SEO_PATHS)[number];

export const OWNER_USE_CASE_SEO_PAGES: Record<OwnerUseCaseSeoPath, SeoPageConfig> = {
  "/home-equity-line-of-credit": {
    path: "/home-equity-line-of-credit",
    metadata: {
      title: "Home Equity Line of Credit (HELOC)",
      description:
        "Learn how a home equity line of credit works for primary residences and second homes—revolving access subject to approval.",
      ogTitle: "Home Equity Line of Credit | HELOC Guide",
      ogDescription:
        "Understand HELOC draw periods, repayment, and how to explore options for your home—subject to approval.",
    },
    hero: {
      eyebrow: "HELOC basics",
      h1: "What is a home equity line of credit?",
      intro: withGuidanceTagline(
        "A home equity line of credit (HELOC) is a revolving line secured by your home. You may draw, repay, and reuse available capacity during the draw period—when approved and subject to program terms.",
      ),
      highlights: [
        "Revolving access—not a one-time lump sum",
        "Primary residence and second-home paths",
        "Compare options in about 60 seconds",
      ],
    },
    whatItIs: {
      title: "How a HELOC works",
      paragraphs: [
        "During the draw period, you can access funds up to your approved limit and make interest-only or principal payments depending on program terms. After the draw period, repayment typically converts to amortizing payments.",
        "HELOCs are usually second-lien products, which may let you keep an existing first mortgage in place—subject to combined loan-to-value limits, credit, income, and lender guidelines.",
      ],
    },
    whoItFits: {
      title: "Who a HELOC may fit",
      items: [
        "Homeowners with substantial equity in a primary or second home",
        "Borrowers who want flexible, recurring access to funds",
        "Owners who prefer not to refinance a low first-mortgage rate",
        "Homeowners comparing HELOC vs. home equity loan or cash-out refinance",
      ],
    },
    useCases: {
      title: "Common HELOC uses",
      items: [
        {
          title: "Ongoing projects",
          description: "Draw as renovation invoices arrive instead of taking one large lump sum.",
        },
        {
          title: "Financial cushion",
          description: "Keep a line available for emergencies or planned expenses.",
        },
        {
          title: "Debt repositioning",
          description: "Explore consolidating higher-rate balances—subject to approval and savings analysis.",
        },
        {
          title: "Opportunity timing",
          description: "Access capital when opportunities surface without a new first mortgage.",
        },
      ],
    },
    process: { title: "How the review works", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      GEO_HELOC_FAQS.primaryResidence,
      GEO_HELOC_FAQS.equityNeeded,
      GEO_HELOC_FAQS.bestWayToAccess,
      {
        question: "Is a HELOC the same as a home equity loan?",
        answer:
          "No. A home equity loan is typically a fixed lump sum with set payments. A HELOC is revolving—you draw, repay, and may redraw during the draw period—subject to program terms.",
      },
      {
        question: "Does exploring a HELOC commit me to a loan?",
        answer: `No. ${SEO_COMPLIANCE}`,
      },
    ],
    relatedPaths: [
      "/owner-occupied-heloc",
      "/heloc-for-primary-residence",
      "/cash-out-refi-vs-heloc",
      "/home-equity-options",
    ],
    service: {
      name: "Home Equity Line of Credit Review",
      description: "Educational review of revolving HELOC options for owner-occupied and second-home collateral.",
      serviceType: "Home equity line of credit review",
    },
  },

  "/cash-out-refi-vs-heloc": {
    path: "/cash-out-refi-vs-heloc",
    metadata: {
      title: "Cash-Out Refinance vs HELOC",
      description:
        "Compare cash-out refinance and HELOC for accessing primary-residence equity—programs may be available, subject to approval.",
      ogTitle: "Cash-Out Refi vs HELOC | Homeowner Guide",
      ogDescription:
        "Should you refinance or use a HELOC? Compare structures for homeowners—subject to approval.",
    },
    hero: {
      eyebrow: "Homeowner comparison",
      h1: "Cash-out refinance vs HELOC for homeowners",
      intro: withGuidanceTagline(
        "Both paths access home equity, but they work differently. Cash-out refinance replaces your first mortgage with a new loan and lump sum. A HELOC adds a revolving second lien—often preserving your existing first rate.",
      ),
      highlights: [
        "Side-by-side structure comparison",
        "Primary and second-home focus",
        "Licensed guidance—not generic calculators",
      ],
    },
    whatItIs: {
      title: "Understanding both options",
      paragraphs: [
        "Cash-out refinance resets your entire first mortgage at today's rates and delivers proceeds at closing. A HELOC may let you tap equity without disturbing a favorable first-mortgage rate—subject to second-lien CLTV limits.",
        "The better fit depends on your current rate, how much equity you need, whether you want revolving access, and how long you plan to stay in the home. This review explores options that may fit—subject to approval.",
      ],
    },
    whoItFits: {
      title: "When each path may make sense",
      items: [
        "HELOC: strong first rate, need flexible or phased access to equity",
        "Cash-out refi: want one new loan, fixed structure, and today's rate works",
        "HELOC: ongoing projects or uncertain total draw amount",
        "Cash-out refi: large one-time need and rate environment favors refinance",
      ],
    },
    useCases: {
      title: "Homeowner scenarios to compare",
      items: [
        {
          title: "Kitchen or whole-home remodel",
          description: "HELOC may match phased draws; cash-out fits a single large budget upfront.",
        },
        {
          title: "Rate preservation",
          description: "HELOC second lien may keep a low first-mortgage rate in place.",
        },
        {
          title: "Debt consolidation",
          description: "Compare total cost, term, and payment impact of both structures.",
        },
        {
          title: "Long-term stay vs. move soon",
          description: "Timeline affects whether resetting the first mortgage makes sense.",
        },
      ],
    },
    process: { title: "Compare your options", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      GEO_HELOC_FAQS.helocVsCashOut,
      GEO_HELOC_FAQS.primaryResidence,
      GEO_HELOC_FAQS.equityNeeded,
      {
        question: "Which option has lower closing costs?",
        answer:
          "Closing costs vary by product, lender, and loan size. HELOCs often have lower upfront costs than full refinances, but total cost depends on rate, term, and how long you keep the line—compare both in a personalized review.",
      },
      {
        question: "Can I explore both paths in one review?",
        answer:
          "Yes. Share your property, occupancy, and goals so a specialist can discuss structures that may be available—subject to approval.",
      },
    ],
    relatedPaths: [
      "/owner-occupied-heloc",
      "/home-equity-line-of-credit",
      "/home-equity-options",
      "/cash-out-vs-heloc",
    ],
    service: {
      name: "Cash-Out vs HELOC Homeowner Comparison",
      description: "Educational comparison of cash-out refinance and HELOC for owner-occupied homes.",
      serviceType: "Home equity comparison review",
    },
  },

  "/debt-consolidation-heloc": {
    path: "/debt-consolidation-heloc",
    metadata: {
      title: "HELOC for Debt Consolidation",
      description:
        "Explore using a HELOC to consolidate high-rate debt secured by primary-residence equity—subject to approval.",
      ogTitle: "Debt Consolidation HELOC | Homeowner Review",
      ogDescription:
        "Learn how a HELOC may help reorganize debt using home equity—subject to approval and full financial review.",
    },
    hero: {
      eyebrow: "Debt consolidation",
      h1: "Using a HELOC for debt consolidation",
      intro: withGuidanceTagline(
        "Some homeowners explore a HELOC to pay off higher-rate credit cards, personal loans, or other balances—converting unsecured debt to secured home equity debt. Whether this makes sense depends on your full financial picture and program eligibility.",
      ),
      highlights: [
        "Primary-residence equity focus",
        "Payment and term comparison guidance",
        "Not financial advice—educational review only",
      ],
    },
    whatItIs: {
      title: "How debt consolidation with a HELOC works",
      paragraphs: [
        "A HELOC may provide funds to pay off existing balances. Because the line is secured by your home, rates may be lower than unsecured debt—but your home collateral is at risk if payments are not maintained.",
        "Savings depend on rate difference, fees, repayment term, and spending habits after consolidation. A licensed specialist can discuss illustrative scenarios—subject to approval—not a guarantee of savings.",
      ],
    },
    whoItFits: {
      title: "When consolidation may be worth exploring",
      items: [
        "Homeowners with equity and higher-rate unsecured balances",
        "Borrowers committed to not re-accumulating card debt after payoff",
        "Owners who understand secured vs. unsecured debt tradeoffs",
        "Homeowners comparing HELOC vs. cash-out refinance for payoff",
      ],
    },
    useCases: {
      title: "Common consolidation goals",
      items: [
        {
          title: "Lower monthly payments",
          description: "Explore whether extended amortization on secured debt reduces monthly outflow—terms vary.",
        },
        {
          title: "Simplify billing",
          description: "Replace multiple minimum payments with one line payment structure.",
        },
        {
          title: "Rate reduction review",
          description: "Compare HELOC rate to weighted average of existing unsecured rates.",
        },
        {
          title: "Cash-flow planning",
          description: "Align draw and repayment with budget—subject to program limits.",
        },
      ],
    },
    process: { title: "Start a consolidation review", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      {
        question: "Is consolidating debt with a HELOC always a good idea?",
        answer:
          "Not always. Converting unsecured debt to secured debt increases home collateral risk. Whether it fits depends on rates, terms, discipline, and your overall plan—discuss with a licensed specialist.",
      },
      GEO_HELOC_FAQS.primaryResidence,
      GEO_HELOC_FAQS.equityNeeded,
      {
        question: "Will this review provide financial advice?",
        answer: `No. This is an educational financing review, not tax or financial planning advice. ${SEO_COMPLIANCE}`,
      },
    ],
    relatedPaths: [
      "/owner-occupied-heloc",
      "/home-equity-line-of-credit",
      "/cash-out-refi-vs-heloc",
      "/heloc-for-primary-residence",
    ],
    service: {
      name: "Debt Consolidation HELOC Review",
      description: "Educational review of HELOC options for homeowners exploring debt consolidation.",
      serviceType: "Debt consolidation HELOC review",
    },
  },

  "/home-improvement-heloc": {
    path: "/home-improvement-heloc",
    metadata: {
      title: "HELOC for Home Improvements",
      description:
        "Fund renovations and home improvements with a HELOC on your primary residence—programs may be available, subject to approval.",
      ogTitle: "Home Improvement HELOC | Renovation Financing",
      ogDescription:
        "Explore revolving HELOC access for kitchen, bath, ADU, and whole-home projects—subject to approval.",
    },
    hero: {
      eyebrow: "Home improvements",
      h1: "HELOC for home improvements and renovations",
      intro: withGuidanceTagline(
        "Renovation costs rarely arrive all at once. A HELOC may let you draw funds as contractors invoice—keeping flexibility during a kitchen remodel, bath upgrade, ADU build, or whole-home refresh.",
      ),
      highlights: [
        "Draw as projects progress",
        "Primary residence and second-home paths",
        "Preserve a low first rate when a second lien fits",
      ],
    },
    whatItIs: {
      title: "Why homeowners use HELOCs for projects",
      paragraphs: [
        "Unlike a single lump-sum home equity loan, a HELOC matches phased renovation spending—you pay interest on what you draw during the draw period, subject to program terms.",
        "Project scope, contractor schedules, and permit timelines vary. Revolving access may reduce the need to over-borrow upfront or run up high-rate cards between draws.",
      ],
    },
    whoItFits: {
      title: "Renovation profiles that may fit",
      items: [
        "Homeowners mid-project needing staged funding",
        "Owners planning multi-room or multi-phase upgrades",
        "Borrowers with equity supporting a second-lien line",
        "Homeowners comparing HELOC vs. cash-out for a large remodel",
      ],
    },
    useCases: {
      title: "Popular improvement uses",
      items: [
        {
          title: "Kitchen and bath remodels",
          description: "Draw at demo, rough-in, and finish milestones.",
        },
        {
          title: "ADU or addition",
          description: "Fund long-horizon builds with revolving capacity—subject to approval.",
        },
        {
          title: "Roof, HVAC, and systems",
          description: "Cover major replacements without a full refinance.",
        },
        {
          title: "Curb appeal and outdoor",
          description: "Landscaping, deck, or pool projects phased over seasons.",
        },
      ],
    },
    process: { title: "Explore renovation financing", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      {
        question: "Can I use a HELOC for any home improvement?",
        answer:
          "Use of funds must align with program guidelines and disclosed purpose. Most owner-occupied HELOCs allow property-related improvements—confirm with your specialist during review.",
      },
      GEO_HELOC_FAQS.primaryResidence,
      GEO_HELOC_FAQS.equityNeeded,
      {
        question: "Do I need contractor quotes before applying?",
        answer:
          "Quotes help you plan draw timing but are not always required to start an educational review. Full underwriting may request project details—subject to approval.",
      },
    ],
    relatedPaths: [
      "/owner-occupied-heloc",
      "/heloc-for-primary-residence",
      "/home-equity-line-of-credit",
      "/home-equity-options",
    ],
    service: {
      name: "Home Improvement HELOC Review",
      description: "Educational review of HELOC options for renovation and home improvement projects.",
      serviceType: "Home improvement HELOC review",
    },
  },
};
