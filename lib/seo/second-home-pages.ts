import type { SeoPageConfig } from "@/lib/seo/types";
import {
  DEFAULT_SEO_PROCESS_STEPS,
  GEO_HELOC_FAQS,
  SEO_COMPLIANCE,
  withGuidanceTagline,
} from "@/lib/seo/shared-content";

export const SECOND_HOME_SEO_PATHS = ["/second-home-heloc", "/vacation-home-heloc"] as const;

export type SecondHomeSeoPath = (typeof SECOND_HOME_SEO_PATHS)[number];

export const SECOND_HOME_SEO_PAGES: Record<SecondHomeSeoPath, SeoPageConfig> = {
  "/second-home-heloc": {
    path: "/second-home-heloc",
    metadata: {
      title: "Second Home HELOC",
      description:
        "Explore HELOC options on second homes and vacation properties—programs may be available, subject to approval and occupancy guidelines.",
      ogTitle: "Second Home HELOC | Vacation Property Equity",
      ogDescription:
        "Revolving equity access for second homes—subject to approval, property eligibility, and lender guidelines.",
    },
    hero: {
      eyebrow: "Second home equity",
      h1: "Second home HELOC options",
      intro: withGuidanceTagline(
        "A second home HELOC is a revolving line secured by a property you own but do not use as your primary residence—such as a vacation home or part-time residence. Programs differ from primary-residence and rental investor lines.",
      ),
      highlights: [
        "Second-home occupancy focus",
        "Revolving access for projects and flexibility",
        "Distinct from rental investor underwriting",
      ],
    },
    whatItIs: {
      title: "What is a second home HELOC?",
      paragraphs: [
        "Second-home HELOCs are underwritten for properties used occasionally by the owner—not as a primary residence and not as a full-time rental. Lenders verify occupancy, equity, credit, and income under second-home guidelines.",
        "Proceeds may fund improvements, maintenance, or financial flexibility—subject to program use-of-funds rules and combined loan-to-value limits on the second home.",
      ],
    },
    whoItFits: {
      title: "Who second home HELOCs may fit",
      items: [
        "Owners of vacation or weekend homes with meaningful equity",
        "Borrowers who want revolving access without refinancing the first",
        "Second-home owners planning renovations or upgrades",
        "Owners comparing HELOC vs. cash-out on the vacation property",
      ],
    },
    useCases: {
      title: "Common second home uses",
      items: [
        {
          title: "Renovation and furnishing",
          description: "Update a cabin, beach house, or ski property between seasons.",
        },
        {
          title: "Maintenance reserves",
          description: "Cover HOA, insurance, or unexpected repairs remotely.",
        },
        {
          title: "Seasonal flexibility",
          description: "Draw for travel-season improvements or property prep.",
        },
        {
          title: "Financial planning",
          description: "Maintain a line for planned second-home expenses.",
        },
      ],
    },
    process: { title: "Explore second home equity", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      GEO_HELOC_FAQS.secondHome,
      GEO_HELOC_FAQS.primaryResidence,
      GEO_HELOC_FAQS.equityNeeded,
      {
        question: "Is a second home HELOC the same as a rental property HELOC?",
        answer:
          "No. Second-home programs expect owner use, not tenant occupancy. Full-time rentals follow investor non-owner-occupied guidelines with different documentation and pricing.",
      },
      {
        question: "Can I rent my second home occasionally?",
        answer:
          "Short-term or occasional rental may affect program eligibility. Disclose intended use accurately—subject to lender, HOA, and local rules.",
      },
      {
        question: "Does this guarantee approval?",
        answer: `No. ${SEO_COMPLIANCE}`,
      },
    ],
    relatedPaths: [
      "/vacation-home-heloc",
      "/owner-occupied-heloc",
      "/home-equity-options",
      "/heloc-for-primary-residence",
    ],
    service: {
      name: "Second Home HELOC Review",
      description: "Educational review of HELOC options for second homes and part-time residences.",
      serviceType: "Second home HELOC review",
    },
  },

  "/vacation-home-heloc": {
    path: "/vacation-home-heloc",
    metadata: {
      title: "Vacation Home HELOC",
      description:
        "Learn how a HELOC on a vacation home may provide revolving equity access—subject to approval and second-home guidelines.",
      ogTitle: "Vacation Home HELOC | Second Home Equity",
      ogDescription:
        "Explore revolving HELOC options for vacation and seasonal homes—subject to approval.",
    },
    hero: {
      eyebrow: "Vacation property",
      h1: "Vacation home HELOC options",
      intro: withGuidanceTagline(
        "Whether it's a beach condo, mountain cabin, or desert retreat, a vacation home HELOC may unlock revolving equity for upgrades, maintenance, and flexibility—when programs may be available for second-home occupancy.",
      ),
      highlights: [
        "Vacation and seasonal property focus",
        "About 60 seconds to start",
        "Licensed second-home guidance",
      ],
    },
    whatItIs: {
      title: "How a vacation home HELOC works",
      paragraphs: [
        "A vacation home HELOC functions like other revolving home equity lines—secured by the property, with draw and repayment periods defined by the lender. Underwriting follows second-home occupancy rules, not primary-residence or full-time rental paths.",
        "Combined loan-to-value limits, credit, income, and property location all affect eligibility—subject to approval and state availability.",
      ],
    },
    whoItFits: {
      title: "Vacation homeowners who may explore a HELOC",
      items: [
        "Owners with equity in a seasonal or weekend property",
        "Borrowers planning a major vacation-home renovation",
        "Owners who prefer a second lien over refinancing the first",
        "Homeowners with both primary and vacation properties",
      ],
    },
    useCases: {
      title: "Vacation property equity uses",
      items: [
        {
          title: "Kitchen, bath, or deck upgrades",
          description: "Improve comfort and value between visiting seasons.",
        },
        {
          title: "HOA and assessment coverage",
          description: "Fund special assessments or community upgrades.",
        },
        {
          title: "Insurance or storm repairs",
          description: "Respond to weather-related damage with available equity.",
        },
        {
          title: "Furnishing and turn-key prep",
          description: "Outfit a new vacation purchase for rental-ready or personal use.",
        },
      ],
    },
    process: { title: "Start a vacation home review", steps: DEFAULT_SEO_PROCESS_STEPS },
    faqs: [
      GEO_HELOC_FAQS.secondHome,
      GEO_HELOC_FAQS.bestWayToAccess,
      {
        question: "Can I use a vacation home HELOC on any property type?",
        answer:
          "Eligible property types vary by lender—single-family, condo, and townhome may qualify subject to HOA, insurance, and guideline review.",
      },
      {
        question: "How is vacation home occupancy verified?",
        answer:
          "Lenders may review use declarations, tax records, and application disclosures. Accurate occupancy classification is required.",
      },
    ],
    relatedPaths: [
      "/second-home-heloc",
      "/home-equity-options",
      "/owner-occupied-heloc",
      "/washington-heloc",
    ],
    service: {
      name: "Vacation Home HELOC Review",
      description: "Educational review of HELOC options for vacation and seasonal homes.",
      serviceType: "Vacation home HELOC review",
    },
  },
};
