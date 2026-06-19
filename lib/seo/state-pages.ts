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

type StateEnhancement = {
  metadata?: Partial<SeoPageConfig["metadata"]>;
  hero?: Partial<SeoPageConfig["hero"]>;
  whatItIs?: Partial<SeoPageConfig["whatItIs"]>;
  secondPosition?: SeoPageConfig["secondPosition"];
  relatedPaths?: string[];
};

/** Phase 1 — priority state hubs with richer unique copy */
const PHASE1_STATE_ENHANCEMENTS: Record<string, StateEnhancement> = {
  washington: {
    metadata: {
      title: "Washington HELOC & Home Equity Review",
      description:
        "Explore Washington HELOC options for Seattle metro homeowners, Puget Sound rentals, and vacation properties—programs may be available, subject to approval.",
      ogDescription:
        "Compare Washington home equity paths for primary homes, rentals, and second homes in about 60 seconds—subject to approval.",
    },
    hero: {
      h1: "Washington HELOC options for homeowners and rental investors",
      intro: undefined,
    },
    whatItIs: {
      title: "Washington home equity programs overview",
      paragraphs: [
        "Washington property owners—from Seattle and Bellevue to Spokane and Tacoma—may explore revolving HELOC and home equity options on primary residences, second homes, and rental collateral when programs may be available, subject to approval.",
        "Pacific Northwest markets often carry meaningful equity. A second-lien HELOC may help preserve an existing first-mortgage rate while accessing capital for renovations, reserves, or the next acquisition—when combined loan-to-value and guidelines allow.",
      ],
    },
    secondPosition: {
      title: "Second home & investment property HELOC in Washington",
      paragraphs: [
        "Vacation cabins, Olympic Peninsula getaways, and non-owner-occupied rentals in Washington may follow different occupancy paths than primary-residence HELOCs—subject to approval, property review, and lender guidelines.",
        "Investors with Washington rental collateral may explore revolving equity for acquisitions, unit turns, or portfolio reserves without automatically replacing a favorable first mortgage.",
      ],
    },
    relatedPaths: [
      "/owner-occupied-heloc",
      "/rental-property-heloc",
      "/second-home-heloc",
      "/heloc-for-primary-residence",
      "/home-equity-options",
    ],
  },
  texas: {
    metadata: {
      title: "Texas HELOC & Home Equity Review",
      description:
        "Explore Texas HELOC options across Dallas, Houston, Austin, and San Antonio for primary homes, rentals, and investment properties—subject to approval.",
      ogDescription:
        "Compare Texas home equity paths for homeowners and investors—about 60 seconds to start, subject to approval.",
    },
    hero: {
      h1: "Texas HELOC options for homeowners and property investors",
    },
    whatItIs: {
      title: "Texas home equity overview",
      paragraphs: [
        "Texas homeowners and investors may explore HELOC and home equity line options secured by primary residences, second homes, and rental properties—availability varies by property type, equity, credit, and lender guidelines.",
        "Many Texas property owners prefer a second-lien HELOC to keep an existing first mortgage in place while funding renovations, debt repositioning, or the next rental acquisition—subject to approval.",
      ],
    },
    secondPosition: {
      title: "Second home & rental property HELOC in Texas",
      paragraphs: [
        "Gulf Coast second homes, Hill Country retreats, and Texas rental portfolios may qualify for non-owner-occupied or second-home HELOC programs when collateral, equity, and borrower profile align with guidelines—subject to approval.",
        "Revolving lines may suit active acquirers who want flexible capital between Dallas, Houston, and Austin metro deals.",
      ],
    },
    relatedPaths: [
      "/owner-occupied-heloc",
      "/rental-property-heloc",
      "/investment-property-heloc",
      "/heloc-for-primary-residence",
      "/cash-out-refi-vs-heloc",
    ],
  },
  florida: {
    metadata: {
      title: "Florida HELOC & Home Equity Review",
      description:
        "Explore Florida HELOC options for primary residences, snowbird second homes, and Sun Belt rentals—programs may be available, subject to approval.",
      ogDescription:
        "Compare Florida home equity options for owners and investors—subject to approval, not a commitment to lend.",
    },
    hero: {
      h1: "Florida HELOC options for homeowners, snowbirds, and investors",
    },
    whatItIs: {
      title: "Florida home equity programs overview",
      paragraphs: [
        "Florida property owners—including full-time residents, seasonal second-home owners, and rental investors—may explore HELOC paths when equity and program guidelines align, subject to approval.",
        "Coastal condos, single-family rentals, and owner-occupied homes follow different occupancy rules. An educational review helps compare structures that may fit your property use.",
      ],
    },
    secondPosition: {
      title: "Second home & investment property HELOC in Florida",
      paragraphs: [
        "Snowbird second homes and Florida vacation properties may qualify for dedicated second-home HELOC programs separate from primary-residence and full-time rental paths—subject to approval and occupancy verification.",
        "Investors with Florida rental collateral may use revolving equity for reserves, hurricane-season repairs, or the next acquisition—when lender guidelines allow.",
      ],
    },
    relatedPaths: [
      "/second-home-heloc",
      "/vacation-home-heloc",
      "/rental-property-heloc",
      "/owner-occupied-heloc",
      "/home-equity-options",
    ],
  },
  arizona: {
    metadata: {
      title: "Arizona HELOC & Home Equity Review",
      description:
        "Explore Arizona HELOC options in Phoenix, Tucson, and statewide markets for primary homes, rentals, and second homes—subject to approval.",
      ogDescription:
        "Compare Arizona home equity paths for homeowners and investors in about 60 seconds—subject to approval.",
    },
    hero: {
      h1: "Arizona HELOC options for homeowners and rental investors",
    },
    whatItIs: {
      title: "Arizona home equity overview",
      paragraphs: [
        "Arizona property owners in growth markets like Phoenix and Tucson may explore revolving HELOC options on primary residences, desert second homes, and rental collateral—programs may be available, subject to approval.",
        "High-equity Arizona files often compare a second-lien HELOC against cash-out refinance to preserve an existing first rate—terms vary by lender and property type.",
      ],
    },
    secondPosition: {
      title: "Second home & investment property HELOC in Arizona",
      paragraphs: [
        "Desert vacation homes and Arizona long-term rentals may follow separate investor or second-home underwriting paths—subject to approval, property eligibility, and state availability.",
        "Revolving equity may help fund value-add renovations or down payments on the next Phoenix-metro rental—subject to program use-of-funds rules.",
      ],
    },
    relatedPaths: [
      "/owner-occupied-heloc",
      "/rental-property-heloc",
      "/heloc-on-rental-property",
      "/heloc-for-primary-residence",
      "/home-equity-options",
    ],
  },
  california: {
    metadata: {
      title: "California HELOC & Home Equity Review",
      description:
        "Explore California HELOC options for coastal and inland homeowners, vacation properties, and rental investors—programs may be available, subject to approval.",
      ogDescription:
        "Compare California home equity paths across primary, second-home, and rental collateral—subject to approval.",
    },
    hero: {
      h1: "California HELOC options for high-equity homeowners and investors",
    },
    whatItIs: {
      title: "California home equity programs overview",
      paragraphs: [
        "California's high-equity markets—from Los Angeles and San Diego to the Bay Area and Central Valley—may support owner-occupied, second-home, and rental HELOC programs when guidelines allow, subject to approval.",
        "Many California owners explore second-lien HELOCs to access substantial equity without resetting a historically low first-mortgage rate—combined loan-to-value limits apply.",
      ],
    },
    secondPosition: {
      title: "Second home & investment property HELOC in California",
      paragraphs: [
        "Mountain cabins, wine-country second homes, and California rental portfolios each follow distinct occupancy and documentation paths—subject to approval and property review.",
        "Investors may use revolving lines for ADU projects, unit renovations, or acquisition reserves across multi-market portfolios.",
      ],
    },
    relatedPaths: [
      "/owner-occupied-heloc",
      "/home-equity-options",
      "/rental-property-heloc",
      "/second-home-heloc",
      "/cash-out-refi-vs-heloc",
    ],
  },
};

function buildStatePage(state: StateDef): SeoPageConfig {
  const path = `/${state.slug}-heloc`;
  const base: SeoPageConfig = {
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

  const enhancement = PHASE1_STATE_ENHANCEMENTS[state.slug];
  if (!enhancement) return base;

  return {
    ...base,
    metadata: { ...base.metadata, ...enhancement.metadata },
    hero: {
      ...base.hero,
      ...enhancement.hero,
      intro: enhancement.hero?.intro ?? base.hero.intro,
    },
    whatItIs: enhancement.whatItIs
      ? { ...base.whatItIs, ...enhancement.whatItIs }
      : base.whatItIs,
    secondPosition: enhancement.secondPosition ?? base.secondPosition,
    relatedPaths: enhancement.relatedPaths ?? base.relatedPaths,
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
