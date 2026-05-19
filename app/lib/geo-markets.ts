import type { ScenarioAudience } from "./scenario-registry";

export type GeoMarket = {
  slug: string;
  name: string;
  regionLabel: string;
  title: string;
  description: string;
  heroLead: string;
  heroFocus: string;
  localContext: string[];
  buyerScenarios: string[];
  homeownerScenarios: string[];
  agentScenarios: string[];
  luxuryNote?: string;
  searchPhrases: string[];
  primaryAudience: ScenarioAudience;
};

export const geoMarkets: GeoMarket[] = [
  {
    slug: "seattle",
    name: "Seattle",
    regionLabel: "Puget Sound",
    title: "Mortgage strategy for Seattle buyers and homeowners.",
    description:
      "Local financing context for Seattle condos, townhomes, competitive offers, and equity decisions.",
    heroLead: "Seattle moves fast. Your financing story should be ready before the offer window.",
    heroFocus: "Condo warrantability. Offer strength. Payment clarity.",
    localContext: [
      "Competitive offers often need financing clarity early.",
      "Condo and townhome inventory is common in core neighborhoods.",
      "Equity and refinance decisions follow a distinct urban price path.",
    ],
    buyerScenarios: [
      "first-time-buyers",
      "condo-financing",
      "seller-concessions",
      "buy-before-sell",
    ],
    homeownerScenarios: ["refinance-timing", "heloc-vs-cash-out", "heloc-strategy"],
    agentScenarios: ["agent-financing", "seller-concessions"],
    searchPhrases: ["Seattle mortgage advisor", "Seattle home loan strategy"],
    primaryAudience: "buyer",
  },
  {
    slug: "bellevue",
    name: "Bellevue",
    regionLabel: "Eastside",
    title: "Mortgage strategy for Bellevue and Eastside buyers.",
    description:
      "Higher-balance purchases, jumbo context, and offer strategy for Bellevue-area markets.",
    heroLead: "Eastside purchases often need reserves, documentation, and a cleaner offer story.",
    heroFocus: "Jumbo fit. Reserves. Offer confidence.",
    localContext: [
      "Higher price points are common across Bellevue and nearby Eastside cities.",
      "Jumbo documentation and reserve expectations matter early.",
      "Seller concessions and buydowns appear in slower negotiation windows.",
    ],
    buyerScenarios: ["jumbo-buyers", "physician-loans", "seller-concessions", "condo-financing"],
    homeownerScenarios: ["heloc-strategy", "refinance-timing"],
    agentScenarios: ["agent-financing", "jumbo-buyers"],
    luxuryNote: "Luxury and jumbo paths are common on the Eastside—structure before touring.",
    searchPhrases: ["Bellevue mortgage", "Eastside jumbo loan strategy"],
    primaryAudience: "buyer",
  },
  {
    slug: "kirkland",
    name: "Kirkland",
    regionLabel: "Eastside",
    title: "Mortgage strategy for Kirkland buyers and homeowners.",
    description:
      "Waterfront-adjacent and Eastside financing guidance for Kirkland-area purchases and equity moves.",
    heroLead: "Kirkland buyers often balance lifestyle location with disciplined financing structure.",
    heroFocus: "Payment. Reserves. Condo and single-family fit.",
    localContext: [
      "Mix of single-family, townhome, and condo inventory.",
      "Commute and lifestyle pricing influence offer strategy.",
      "Equity access is a common homeowner conversation.",
    ],
    buyerScenarios: ["jumbo-buyers", "condo-financing", "first-time-buyers"],
    homeownerScenarios: ["heloc-strategy", "refinance-timing"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Kirkland mortgage advisor", "Kirkland home financing"],
    primaryAudience: "buyer",
  },
  {
    slug: "tacoma",
    name: "Tacoma",
    regionLabel: "South Sound",
    title: "Mortgage strategy for Tacoma and South Sound buyers.",
    description:
      "Affordability, payment planning, and first-time buyer strategy for Tacoma-area markets.",
    heroLead: "South Sound buyers often optimize for payment and cash-to-close first.",
    heroFocus: "Affordability. Credits. First-time readiness.",
    localContext: [
      "Payment and cash-to-close often drive the search more than headline price.",
      "First-time and move-up buyers are common.",
      "Seller concessions can matter in negotiation.",
    ],
    buyerScenarios: ["first-time-buyers", "seller-concessions", "2-1-buydowns"],
    homeownerScenarios: ["refinance-timing", "heloc-vs-cash-out"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Tacoma mortgage", "South Sound home loan"],
    primaryAudience: "buyer",
  },
  {
    slug: "green-lake",
    name: "Green Lake",
    regionLabel: "Seattle",
    title: "Mortgage strategy for Green Lake and north Seattle buyers.",
    description:
      "Neighborhood-level financing context for Green Lake, Wallingford, and nearby Seattle pockets.",
    heroLead: "Tight Seattle neighborhoods reward buyers who show up with a clear financing story.",
    heroFocus: "Offer strength. Condo review. Payment clarity.",
    localContext: [
      "Walkable neighborhoods with limited inventory and fast decisions.",
      "Older condos and townhomes may need early warrantability review.",
      "Move-up and buy-before-sell timing appears often.",
    ],
    buyerScenarios: ["condo-financing", "buy-before-sell", "jumbo-buyers"],
    homeownerScenarios: ["heloc-strategy", "refinance-timing"],
    agentScenarios: ["agent-financing", "seller-concessions"],
    searchPhrases: ["Green Lake mortgage", "north Seattle home loan"],
    primaryAudience: "buyer",
  },
  {
    slug: "washington-state",
    name: "Washington State",
    regionLabel: "Pacific Northwest",
    title: "Washington State mortgage strategy and licensing context.",
    description:
      "Multi-market guidance for Washington buyers, homeowners, agents, and investors.",
    heroLead: "Washington markets differ by price point, inventory, and financing path.",
    heroFocus: "Licensed context. Scenario fit. Clear next step.",
    localContext: [
      "Puget Sound, Eastside, and South Sound markets behave differently.",
      "State licensing and program availability shape options.",
      "Self-employed and jumbo paths are common across the state.",
    ],
    buyerScenarios: [
      "first-time-buyers",
      "self-employed-borrowers",
      "jumbo-buyers",
      "seller-concessions",
    ],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing", "investment-property-strategy"],
    searchPhrases: ["Washington mortgage advisor", "Washington home loan strategy"],
    primaryAudience: "buyer",
  },
  {
    slug: "luxury-jumbo",
    name: "Luxury & Jumbo Markets",
    regionLabel: "Pacific Northwest",
    title: "Luxury and jumbo mortgage strategy in Washington.",
    description:
      "Higher-balance financing, reserves, documentation, and offer strategy for luxury purchases.",
    heroLead: "Luxury purchases fail quietly when documentation and reserves are late.",
    heroFocus: "Jumbo fit. Reserves. Appraisal and offer risk.",
    localContext: [
      "Bellevue, Kirkland, and Seattle luxury pockets share jumbo documentation pressure.",
      "Physician and self-employed paths overlap with jumbo frequently.",
      "Seller credits and buydowns still appear in higher price bands.",
    ],
    buyerScenarios: ["jumbo-buyers", "physician-loans", "condo-financing", "buy-before-sell"],
    homeownerScenarios: ["heloc-strategy", "refinance-timing"],
    agentScenarios: ["agent-financing", "jumbo-buyers"],
    luxuryNote: "Treat luxury as a documentation and timing problem—not just a bigger loan amount.",
    searchPhrases: ["jumbo loan Washington", "luxury home financing Seattle"],
    primaryAudience: "buyer",
  },
];

export function getGeoMarketBySlug(slug: string) {
  return geoMarkets.find((market) => market.slug === slug);
}
