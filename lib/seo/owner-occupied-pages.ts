import { SEO_GUIDANCE_TAGLINE } from "@/lib/brand-positioning";
import type { SeoPageConfig } from "@/lib/seo/types";
import { INVESTOR_PROCESS_STEPS } from "@/lib/marketing/content";

const PROCESS_STEPS = INVESTOR_PROCESS_STEPS.map(({ title, description }) => ({
  title,
  description,
}));

const COMPLIANCE =
  "Programs may be available for qualifying properties, subject to approval, property eligibility, credit, income, and lender guidelines. Not a commitment to lend.";

export const OWNER_OCCUPIED_SEO_PATHS = [
  "/owner-occupied-heloc",
  "/home-equity-options",
  "/heloc-for-primary-residence",
] as const;

export type OwnerOccupiedSeoPath = (typeof OWNER_OCCUPIED_SEO_PATHS)[number];

export const OWNER_OCCUPIED_SEO_PAGES: Record<OwnerOccupiedSeoPath, SeoPageConfig> = {
  "/owner-occupied-heloc": {
    path: "/owner-occupied-heloc",
    metadata: {
      title: "Owner-Occupied HELOC",
      description:
        "Explore owner-occupied HELOC and home equity line options for primary residences—programs may be available, subject to approval.",
      ogTitle: "Owner-Occupied HELOC | Home Equity Review",
      ogDescription:
        "Review revolving home equity options for your primary residence in about 60 seconds—subject to approval.",
    },
    hero: {
      eyebrow: "Primary residence equity",
      h1: "Owner-occupied HELOC options for homeowners",
      intro: `A home equity line of credit (HELOC) on your primary residence may provide revolving access to equity for renovations, debt consolidation, reserves, or other goals—when programs may be available, subject to approval. ${SEO_GUIDANCE_TAGLINE}`,
      highlights: [
        "Revolving access—draw and repay as needs change",
        "Primary residence and owner-occupied focus",
        "Licensed guidance—not just an automated quote",
      ],
    },
    whatItIs: {
      title: "What is an owner-occupied HELOC?",
      paragraphs: [
        "An owner-occupied HELOC is typically a revolving line of credit secured by the home you live in as your primary residence. Unlike a one-time cash-out refinance, a HELOC may let you draw, repay, and reuse available capacity during the draw period—when approved and subject to program terms.",
        "Lenders generally review equity, credit, income documentation, occupancy, and property type. Line size, rate structure, and repayment terms vary by lender and state availability.",
      ],
    },
    whoItFits: {
      title: "Who an owner-occupied HELOC may fit",
      intro: "Every file is reviewed individually. Common homeowner profiles include:",
      items: [
        "Homeowners with meaningful equity in a primary residence",
        "Borrowers who want revolving liquidity without replacing a low-rate first mortgage",
        "Owners funding renovations, debt consolidation, or major expenses",
        "Homeowners comparing HELOC vs. cash-out refinance structures",
      ],
    },
    useCases: {
      title: "Common uses for primary-residence equity",
      items: [
        {
          title: "Home improvements",
          description:
            "Fund renovations or repairs while keeping monthly payments flexible during the draw period—subject to approval.",
        },
        {
          title: "Debt consolidation",
          description:
            "Explore using equity to reorganize higher-rate balances—eligibility and savings depend on your full financial picture.",
        },
        {
          title: "Reserves and flexibility",
          description:
            "Maintain a revolving line for unexpected expenses or planned projects without a new first mortgage.",
        },
        {
          title: "Major life expenses",
          description:
            "Education, medical, or relocation costs may be reviewed against program guidelines—subject to approval.",
        },
      ],
    },
    process: {
      title: "How the review works",
      intro: "A streamlined digital intake—about 60 seconds to start.",
      steps: PROCESS_STEPS,
    },
    faqs: [
      {
        question: "Is an owner-occupied HELOC the same as an investment-property HELOC?",
        answer:
          "No. Owner-occupied programs are underwritten for primary residences. Rental and investment properties follow different occupancy, documentation, and guideline requirements.",
      },
      {
        question: "Does a HELOC guarantee approval or a specific rate?",
        answer: `No. A HELOC review is not an approval or commitment to lend. ${COMPLIANCE}`,
      },
      {
        question: "How quickly can funding happen?",
        answer:
          "Timelines depend on documentation, appraisal, title, and lender processing. Some files may move quickly when third-party items are complete—subject to approval.",
      },
      {
        question: "Will this review affect my credit?",
        answer:
          "Starting a review does not by itself mean a hard credit pull. A licensed specialist can explain when credit is accessed during a full application.",
      },
    ],
    relatedPaths: ["/heloc-for-primary-residence", "/home-equity-options", "/rental-property-heloc"],
    service: {
      name: "Owner-Occupied HELOC Review",
      description: "Educational review of revolving home equity options for primary residences.",
    },
  },
  "/home-equity-options": {
    path: "/home-equity-options",
    metadata: {
      title: "Home Equity Options",
      description:
        "Compare home equity options for primary residences, second homes, and rental properties—programs may be available, subject to approval.",
      ogTitle: "Home Equity Options | HELOC Review",
      ogDescription:
        "Explore HELOC and home equity paths for homeowners and investors—subject to approval.",
    },
    hero: {
      eyebrow: "Home equity",
      h1: "Home equity options for homeowners and investors",
      intro: `Whether you live in the property, use it as a second home, or rent it out, equity may be available through different HELOC and home equity structures—when programs may be available, subject to approval. ${SEO_GUIDANCE_TAGLINE}`,
      highlights: [
        "Primary, second home, and rental paths",
        "Revolving and term structures may vary by occupancy",
        "Strategy-first review in about 60 seconds",
      ],
    },
    whatItIs: {
      title: "What are home equity options?",
      paragraphs: [
        "Home equity options include revolving HELOCs and other second-lien structures secured by real estate you own. The right path depends on how you use the property—primary residence, second home, or rental/investment.",
        "Occupancy affects documentation, maximum combined loan-to-value, and available programs. A personalized review helps identify what may be available for your scenario—subject to approval.",
      ],
    },
    whoItFits: {
      title: "Who home equity financing may fit",
      items: [
        "Homeowners with equity in a primary residence",
        "Owners of second homes or vacation properties",
        "Landlords and investors with rental collateral",
        "Borrowers comparing HELOC vs. cash-out refinance",
      ],
    },
    useCases: {
      title: "Ways property owners use equity",
      items: [
        {
          title: "Improve or maintain the property",
          description: "Renovations, repairs, or upgrades—owner-occupied or rental—subject to program rules.",
        },
        {
          title: "Access flexible capital",
          description: "Revolving lines may suit changing needs better than a single lump-sum loan.",
        },
        {
          title: "Invest or grow a portfolio",
          description: "Investors may use rental equity for acquisitions or reserves—subject to approval.",
        },
        {
          title: "Reposition existing debt",
          description: "Compare consolidating or restructuring balances against program guidelines.",
        },
      ],
    },
    process: {
      title: "How it works",
      steps: PROCESS_STEPS,
    },
    faqs: [
      {
        question: "Can one review cover different property types?",
        answer:
          "Yes. Share the property address and how you use the home—primary, rental, or second home—so the review follows the right occupancy path.",
      },
      {
        question: "Are investor and owner-occupied programs the same?",
        answer:
          "No. Occupancy, documentation, and guidelines differ. Availability varies by property type, equity, credit, and state.",
      },
      {
        question: "Is this a loan application?",
        answer: `This is an educational review to explore options that may be available. ${COMPLIANCE}`,
      },
    ],
    relatedPaths: ["/owner-occupied-heloc", "/heloc-for-primary-residence", "/rental-property-heloc"],
    service: {
      name: "Home Equity Options Review",
      description: "Compare HELOC and home equity paths by property use and occupancy.",
    },
  },
  "/heloc-for-primary-residence": {
    path: "/heloc-for-primary-residence",
    metadata: {
      title: "HELOC for Primary Residence",
      description:
        "Learn how a HELOC on your primary residence may work—revolving equity access for homeowners, subject to approval.",
      ogTitle: "HELOC for Primary Residence",
      ogDescription:
        "Explore primary-residence HELOC options with a quick personalized review—subject to approval.",
    },
    hero: {
      eyebrow: "Primary residence",
      h1: "HELOC for your primary residence",
      intro: `A primary-residence HELOC may offer revolving access to the equity in the home you live in—useful for projects, flexibility, or financial planning when programs may be available, subject to approval. ${SEO_GUIDANCE_TAGLINE}`,
      highlights: [
        "Built for owner-occupied collateral",
        "Quick online review—about 60 seconds",
        "Licensed specialist follow-up",
      ],
    },
    whatItIs: {
      title: "What is a primary-residence HELOC?",
      paragraphs: [
        "A HELOC on your primary residence is typically a second-lien revolving line secured by the home you occupy as your main residence. During the draw period, you may access funds up to your approved limit and repay to restore capacity—subject to program terms.",
        "Underwriting usually considers appraised value, existing mortgage balance, credit, income, and occupancy verification. This review does not guarantee approval or specific terms.",
      ],
    },
    whoItFits: {
      title: "When a primary-residence HELOC may be worth exploring",
      items: [
        "You have substantial equity and want revolving access",
        "You prefer not to refinance a low first-mortgage rate",
        "You need funds for renovations or planned expenses",
        "You want to compare HELOC vs. other equity products",
      ],
    },
    useCases: {
      title: "Common primary-residence uses",
      items: [
        {
          title: "Renovations and upgrades",
          description: "Kitchen, bath, ADU, or energy improvements—draw as invoices are due.",
        },
        {
          title: "Financial flexibility",
          description: "Keep a line available for emergencies or opportunity costs.",
        },
        {
          title: "Consolidation review",
          description: "Explore whether equity access fits your debt-paydown plan—subject to approval.",
        },
        {
          title: "Major purchases",
          description: "Large expenses may be reviewed against income and program limits.",
        },
      ],
    },
    process: {
      title: "How the review works",
      steps: PROCESS_STEPS,
    },
    faqs: [
      {
        question: "Do I need to leave my current first mortgage in place?",
        answer:
          "Many homeowners use a HELOC as a second lien to preserve a favorable first-mortgage rate. Structure depends on equity, guidelines, and lender programs.",
      },
      {
        question: "How much equity can I access?",
        answer:
          "Combined loan-to-value limits vary by occupancy, credit, and program. A specialist reviews illustrative ranges—subject to approval and appraisal.",
      },
      {
        question: "Does starting a review commit me to a loan?",
        answer: `No. ${COMPLIANCE}`,
      },
    ],
    relatedPaths: ["/owner-occupied-heloc", "/home-equity-options", "/cash-out-vs-heloc"],
    service: {
      name: "Primary Residence HELOC Review",
      description: "Educational review of HELOC options secured by a primary residence.",
    },
  },
};
