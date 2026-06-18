import type { SeoPageConfig } from "@/lib/seo/types";
import {
  DEFAULT_SEO_PROCESS_STEPS,
  GEO_HELOC_FAQS,
  SEO_COMPLIANCE,
  withGuidanceTagline,
} from "@/lib/seo/shared-content";

type StateDef = {
  slug: string;
  name: string;
  abbr: string;
  marketNote: string;
};

const STATES: StateDef[] = [
  {
    slug: "washington",
    name: "Washington",
    abbr: "WA",
    marketNote: "From Seattle metro single-family rentals to statewide owner-occupied homes",
  },
  {
    slug: "oregon",
    name: "Oregon",
    abbr: "OR",
    marketNote: "Portland-area investors and Willamette Valley homeowners",
  },
  {
    slug: "arizona",
    name: "Arizona",
    abbr: "AZ",
    marketNote: "Phoenix and Tucson growth markets for rentals and primary homes",
  },
  {
    slug: "california",
    name: "California",
    abbr: "CA",
    marketNote: "High-equity coastal and inland markets across owner and investor profiles",
  },
  {
    slug: "colorado",
    name: "Colorado",
    abbr: "CO",
    marketNote: "Front Range homeowners and mountain-market second homes",
  },
  {
    slug: "florida",
    name: "Florida",
    abbr: "FL",
    marketNote: "Sun Belt rentals, snowbird second homes, and primary residences",
  },
  {
    slug: "illinois",
    name: "Illinois",
    abbr: "IL",
    marketNote: "Chicagoland and statewide equity for owners and landlords",
  },
  {
    slug: "michigan",
    name: "Michigan",
    abbr: "MI",
    marketNote: "Metro Detroit investors and Michigan primary-residence homeowners",
  },
  {
    slug: "texas",
    name: "Texas",
    abbr: "TX",
    marketNote: "Dallas, Houston, Austin, and San Antonio equity markets",
  },
];

function buildStatePage(state: StateDef): SeoPageConfig {
  const path = `/${state.slug}-heloc`;
  return {
    path,
    metadata: {
      title: `${state.name} HELOC Options`,
      description: `Explore ${state.name} HELOC and home equity options for primary residences, rental properties, and investment real estate—programs may be available, subject to approval.`,
      ogTitle: `${state.name} HELOC | Home Equity Review`,
      ogDescription: `Compare ${state.name} HELOC paths for homeowners and investors in about 60 seconds—subject to approval.`,
    },
    hero: {
      eyebrow: `${state.name} home equity`,
      h1: `${state.name} HELOC options for homeowners and investors`,
      intro: withGuidanceTagline(
        `${state.marketNote}. A ${state.name} HELOC review explores revolving home equity programs that may be available for primary residences, rentals, and investment properties—subject to approval, property eligibility, and lender guidelines.`,
      ),
      highlights: [
        `Licensed ${state.name} market guidance`,
        "Primary, rental, and investment property paths",
        "About 60 seconds to start your review",
      ],
    },
    whatItIs: {
      title: `How HELOC programs work in ${state.name}`,
      paragraphs: [
        `A home equity line of credit (HELOC) in ${state.name} is typically a revolving line secured by real estate you own. Owner-occupied, second-home, and non-owner-occupied programs follow different occupancy and documentation rules—availability varies by property type, equity, credit, and lender.`,
        `This educational review helps ${state.name} property owners compare paths that may fit their goals without replacing a favorable first mortgage when a second-lien HELOC is appropriate—subject to approval and combined loan-to-value limits.`,
      ],
    },
    whoItFits: {
      title: `Primary residence HELOC in ${state.name}`,
      intro: `Homeowners living in their ${state.name} property as a primary residence may explore owner-occupied HELOC programs when equity and credit align with guidelines.`,
      items: [
        `${state.name} homeowners with meaningful equity after existing liens`,
        "Borrowers who want revolving access without a full first-mortgage refinance",
        "Owners funding renovations, debt consolidation, or major expenses",
        "Homeowners comparing HELOC vs. cash-out refinance structures",
      ],
    },
    useCases: {
      title: `Rental property HELOC in ${state.name}`,
      items: [
        {
          title: "Single-family rental equity",
          description: `Access revolving capacity on stabilized ${state.name} rentals—subject to investor underwriting and property review.`,
        },
        {
          title: "Portfolio reserves",
          description:
            "Maintain liquidity for turnover, insurance deductibles, or timing the next acquisition.",
        },
        {
          title: "Value-add renovations",
          description:
            "Fund unit turns or property improvements while preserving dry powder for vacancy periods.",
        },
        {
          title: "Next property down payment",
          description:
            "Use rental equity toward a future purchase—subject to approval and program use-of-funds rules.",
        },
      ],
    },
    process: {
      title: `Start your ${state.name} HELOC review`,
      intro: "A streamlined intake—about 60 seconds to begin. No obligation.",
      steps: DEFAULT_SEO_PROCESS_STEPS,
    },
    secondPosition: {
      title: `Investment property financing in ${state.name}`,
      paragraphs: [
        `Investment and rental collateral in ${state.name} may qualify for non-owner-occupied HELOC programs when property type, rents, equity, and borrower profile meet lender guidelines—subject to approval.`,
        `Second-lien HELOCs may allow investors to keep an existing first mortgage while unlocking equity for acquisitions, reserves, or renovations. Five-plus unit and commercial assets may follow different product paths.`,
      ],
    },
    faqs: [
      {
        question: `Are HELOC programs available in ${state.name}?`,
        answer: `${state.name} is among the states where licensed lending partners may offer HELOC and home equity programs for qualifying properties—subject to approval, property eligibility, and lender guidelines. Availability varies by occupancy and collateral type.`,
      },
      GEO_HELOC_FAQS.primaryResidence,
      GEO_HELOC_FAQS.rentalProperty,
      GEO_HELOC_FAQS.equityNeeded,
      GEO_HELOC_FAQS.helocVsCashOut,
      {
        question: `Does this review guarantee a ${state.name} HELOC?`,
        answer: `No. This is an educational review to explore options that may be available. ${SEO_COMPLIANCE}`,
      },
    ],
    relatedPaths: [
      "/owner-occupied-heloc",
      "/rental-property-heloc",
      "/home-equity-options",
      "/heloc-for-primary-residence",
      "/investment-property-heloc",
    ],
    service: {
      name: `${state.name} HELOC Review`,
      description: `Educational review of HELOC and home equity options for ${state.name} property owners and investors.`,
      areaServed: state.name,
      serviceType: `${state.name} home equity line of credit review`,
    },
  };
}

export const STATE_SEO_PATHS = [
  "/washington-heloc",
  "/oregon-heloc",
  "/arizona-heloc",
  "/california-heloc",
  "/colorado-heloc",
  "/florida-heloc",
  "/illinois-heloc",
  "/michigan-heloc",
  "/texas-heloc",
] as const;

export type StateSeoPath = (typeof STATE_SEO_PATHS)[number];

export const STATE_SEO_PAGES: Record<StateSeoPath, SeoPageConfig> = Object.fromEntries(
  STATES.map((state) => {
    const config = buildStatePage(state);
    return [config.path, config] as const;
  }),
) as Record<StateSeoPath, SeoPageConfig>;
