import type { PropertyTypeId } from "@/lib/leads/types";

export type JourneySlug =
  | "sfr"
  | "multifamily-small"
  | "short-term-rental"
  | "multifamily";

export type JourneyTheme = "sfr" | "str" | "plex" | "portfolio";

export type JourneyDashboardDefaults = {
  propertyName: string;
  propertyValue: number;
  mortgageBalance: number;
  monthlyRent: number;
};

export type JourneyConfirmation = {
  headline: string;
  nextSteps: string[];
  complianceNote: string;
  ctaLabel: string;
  ctaHref: string;
};

export type InvestorJourneyConfig = {
  slug: JourneySlug;
  propertyType: PropertyTypeId;
  theme: JourneyTheme;
  eyebrow: string;
  headline: string;
  subheadline: string;
  examplesTitle: string;
  examples: { title: string; detail: string }[];
  trustBullets: string[];
  dashboardDefaults: JourneyDashboardDefaults;
  confirmation: JourneyConfirmation;
  metaTitle: string;
  metaDescription: string;
};

export const INVESTOR_JOURNEYS: Record<JourneySlug, InvestorJourneyConfig> = {
  sfr: {
    slug: "sfr",
    propertyType: "single-family",
    theme: "sfr",
    eyebrow: "Single-family rental",
    headline: "HELOC options for your single-family rental",
    subheadline:
      "Access equity on your single-family rental—keep your first mortgage and see rate options online.",
    examplesTitle: "Common SFR investor scenarios",
    examples: [
      {
        title: "Long-term hold in suburban market",
        detail:
          "Access equity on a leased SFR to fund the next down payment while keeping your existing first-lien rate.",
      },
      {
        title: "Value-add before refinance",
        detail:
          "Draw for kitchen, roof, or systems work—programs may be available subject to approval after renovation.",
      },
      {
        title: "Reserves between acquisitions",
        detail:
          "Revolving line capacity for carrying costs while you source the next rental off-market.",
      },
    ],
    trustBullets: [
      "Built for rental property owners",
      "Explore options online",
      "Subject to approval · Not a commitment to lend",
    ],
    dashboardDefaults: {
      propertyName: "1842 Oakridge Dr · SFR rental",
      propertyValue: 425_000,
      mortgageBalance: 268_000,
      monthlyRent: 2_650,
    },
    confirmation: {
      headline: "Your single-family rental review is underway",
      nextSteps: [
        "A licensed loan officer will reach out to confirm property details and your investment objective.",
        "Have your lease, insurance, and mortgage statement ready for a faster SFR collateral review.",
        "You'll receive illustrative HELOC structures that may be available—subject to approval and eligibility.",
      ],
      complianceNote:
        "This is not a loan application or commitment to lend. Programs may be available for qualifying non-owner-occupied single-family rentals, subject to approval, property eligibility, and lender guidelines. Funding possible in as little as 7 days when documentation and third-party items are complete.",
      ctaLabel: "Review next steps",
      ctaHref: "/#how-it-works",
    },
    metaTitle: "Single-Family Rental HELOC Options",
    metaDescription:
      "Check HELOC options for a single-family rental property. Programs may be available, subject to approval.",
  },
  "multifamily-small": {
    slug: "multifamily-small",
    propertyType: "duplex-triplex-fourplex",
    theme: "plex",
    eyebrow: "2–4 unit rentals",
    headline: "HELOC options for duplex, triplex & fourplex rentals",
    subheadline:
      "Access equity on duplex, triplex, and fourplex rentals—flexible second-position financing for portfolio growth.",
    examplesTitle: "Small multifamily examples",
    examples: [
      {
        title: "House-hack transition to full rental",
        detail:
          "Unlock equity on a duplex you’ve outgrown while tenants cover both units—subject to approval.",
      },
      {
        title: "Triplex renovation hold",
        detail:
          "Line capacity for unit turns between leases without a full cash-out refinance.",
      },
      {
        title: "Fourplex acquisition bridge",
        detail:
          "Illustrative equity review on a 4-unit before you assign or close the next small multifamily deal.",
      },
    ],
    trustBullets: [
      "2–4 unit investment property focus",
      "Access equity without selling",
      "Subject to approval · Not a commitment to lend",
    ],
    dashboardDefaults: {
      propertyName: "612 Maple St · Triplex",
      propertyValue: 620_000,
      mortgageBalance: 410_000,
      monthlyRent: 5_400,
    },
    confirmation: {
      headline: "Your duplex / triplex / fourplex review is underway",
      nextSteps: [
        "A loan officer will contact you to walk through unit mix, rent roll, and lien position on the property.",
        "Prepare leases (or rent roll), entity documents if applicable, and current mortgage details for each unit.",
        "You'll receive options aligned to small multifamily collateral—subject to approval, not a commitment to lend.",
      ],
      complianceNote:
        "This is not a loan application or commitment to lend. Programs may be available for qualifying 2–4 unit non-owner-occupied rentals, subject to approval, property eligibility, and lender guidelines. Funding possible in as little as 7 days when documentation and third-party items are complete.",
      ctaLabel: "See the review process",
      ctaHref: "/#how-it-works",
    },
    metaTitle: "Duplex & Small Multifamily HELOC Options",
    metaDescription:
      "Check HELOC options for duplex, triplex, or fourplex rentals. Subject to approval and property eligibility.",
  },
  "short-term-rental": {
    slug: "short-term-rental",
    propertyType: "str-vacation",
    theme: "str",
    eyebrow: "Short-term rental",
    headline: "HELOC options for Airbnb & vacation rentals",
    subheadline:
      "Access equity on Airbnb and vacation rentals—move quickly with flexible funding options where programs may be available.",
    examplesTitle: "STR investor examples",
    examples: [
      {
        title: "Seasonal beach or mountain market",
        detail:
          "Equity access between peak seasons for furnishings, marketing, or property upgrades.",
      },
      {
        title: "Mid-term furnished rental",
        detail:
          "Travel-nurse or corporate stay models with variable income—alternative documentation may be available.",
      },
      {
        title: "Portfolio of micro-STRs",
        detail:
          "Coordinate liquidity across multiple STR assets for down payments on the next market.",
      },
    ],
    trustBullets: [
      "Short-term rental collateral focus",
      "Explore options online",
      "Subject to approval · Not a commitment to lend",
    ],
    dashboardDefaults: {
      propertyName: "Pine Hollow Cabin · STR",
      propertyValue: 515_000,
      mortgageBalance: 332_000,
      monthlyRent: 6_200,
    },
    confirmation: {
      headline: "Your short-term rental review is underway",
      nextSteps: [
        "A licensed loan officer will follow up to discuss seasonality, STR income, and how the property is operated.",
        "Gather platform statements, average daily rate context, and insurance suited to short-term use if available.",
        "You'll receive illustrative line scenarios that may be available—subject to approval and STR eligibility.",
      ],
      complianceNote:
        "This is not a loan application or commitment to lend. Programs may be available for qualifying short-term or vacation rentals, subject to approval, property eligibility, and lender guidelines. Income and documentation requirements vary. Funding possible in as little as 7 days when documentation and third-party items are complete.",
      ctaLabel: "Review what happens next",
      ctaHref: "/#how-it-works",
    },
    metaTitle: "Short-Term Rental HELOC Options",
    metaDescription:
      "Check HELOC options for Airbnb and vacation rental properties. Programs may be available, subject to approval.",
  },
  multifamily: {
    slug: "multifamily",
    propertyType: "other",
    theme: "portfolio",
    eyebrow: "Multifamily portfolio",
    headline: "HELOC options for multifamily investors",
    subheadline:
      "Access equity across your multifamily portfolio—flexible funding for growth without selling assets.",
    examplesTitle: "Portfolio investor examples",
    examples: [
      {
        title: "5+ unit value-add project",
        detail:
          "Draw for common-area and unit upgrades across a small apartment building—subject to approval.",
      },
      {
        title: "Cross-collateral planning",
        detail:
          "Explore equity on your strongest multifamily asset to fund reserves across the portfolio.",
      },
      {
        title: "Acquisition line strategy",
        detail:
          "Revolving capacity for earnest money and closing costs while you stabilize new units.",
      },
    ],
    trustBullets: [
      "Built for rental property owners",
      "Access equity without selling",
      "Subject to approval · Not a commitment to lend",
    ],
    dashboardDefaults: {
      propertyName: "Riverside 8-plex · Portfolio",
      propertyValue: 1_280_000,
      mortgageBalance: 820_000,
      monthlyRent: 14_800,
    },
    confirmation: {
      headline: "Your multifamily portfolio review is underway",
      nextSteps: [
        "A loan officer will connect to review property count, rent roll, and how this asset fits your portfolio strategy.",
        "Have entity documents, operating statements, and mortgage summaries ready for a smoother file build.",
        "You'll receive structures that may be available for your multifamily collateral—subject to approval and guidelines.",
      ],
      complianceNote:
        "This is not a loan application or commitment to lend. Programs may be available for qualifying multifamily and portfolio-scale rentals, subject to approval, property eligibility, and lender guidelines. Funding possible in as little as 7 days when documentation and third-party items are complete.",
      ctaLabel: "Schedule your options review",
      ctaHref: "/#how-it-works",
    },
    metaTitle: "Multifamily Rental HELOC Options",
    metaDescription:
      "Check HELOC options for multifamily rental portfolios. Programs may be available, subject to approval.",
  },
};

export const JOURNEY_SLUGS = Object.keys(INVESTOR_JOURNEYS) as JourneySlug[];

export function isJourneySlug(value: string): value is JourneySlug {
  return value in INVESTOR_JOURNEYS;
}

export function getJourney(slug: JourneySlug): InvestorJourneyConfig {
  return INVESTOR_JOURNEYS[slug];
}

/** Hero quick-start option → dedicated funnel path */
export const HERO_JOURNEY_ROUTES = [
  { heroId: "single-family", label: "Single Family", slug: "sfr" as const },
  { heroId: "condo", label: "Condo", slug: "sfr" as const },
  { heroId: "two-to-four-unit", label: "2–4 Unit", slug: "multifamily-small" as const },
  { heroId: "other", label: "Other", slug: "multifamily" as const },
] as const;

export function getJourneyPath(slug: JourneySlug): string {
  return `/check-options/${slug}`;
}

export function getJourneySlugForPropertyType(
  propertyType: PropertyTypeId,
): JourneySlug {
  switch (propertyType) {
    case "single-family":
    case "condo":
    case "townhome":
      return "sfr";
    case "two-to-four-unit":
    case "duplex":
    case "triplex":
    case "fourplex":
    case "duplex-triplex-fourplex":
      return "multifamily-small";
    case "str-vacation":
    case "str-airbnb":
      return "short-term-rental";
    case "other":
    case "small-multifamily":
    case "fourplex-plus":
      return "multifamily";
    default:
      return "sfr";
  }
}

export function getJourneyThemeClasses(theme: JourneyTheme): {
  page: string;
  accent: string;
  badge: string;
  exampleCard: string;
  assumptions: string;
} {
  switch (theme) {
    case "sfr":
      return {
        page: "journey-theme-sfr",
        accent: "text-teal-700",
        badge: "bg-emerald-50 text-emerald-800 border-emerald-100",
        exampleCard: "border-slate-200/90 bg-white",
        assumptions: "border-slate-200 bg-gradient-to-br from-slate-50 to-white",
      };
    case "str":
      return {
        page: "journey-theme-str",
        accent: "text-amber-800",
        badge: "bg-amber-50 text-amber-900 border-amber-100",
        exampleCard: "border-amber-100/90 bg-gradient-to-br from-amber-50/40 to-white",
        assumptions: "border-amber-100 bg-gradient-to-br from-amber-50/30 to-white",
      };
    case "plex":
      return {
        page: "journey-theme-plex",
        accent: "text-sky-800",
        badge: "bg-sky-50 text-sky-900 border-sky-100",
        exampleCard: "border-sky-100/90 bg-gradient-to-br from-sky-50/40 to-white",
        assumptions: "border-sky-100 bg-gradient-to-br from-sky-50/30 to-white",
      };
    case "portfolio":
      return {
        page: "journey-theme-portfolio",
        accent: "text-slate-800",
        badge: "bg-slate-100 text-slate-800 border-slate-200",
        exampleCard: "border-slate-200 bg-gradient-to-br from-slate-50 to-white",
        assumptions: "border-slate-200 bg-gradient-to-br from-slate-100/50 to-white",
      };
  }
}
