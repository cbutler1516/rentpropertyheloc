import type { ScenarioAudience } from "./scenario-registry";
import type { StateMarketKey } from "./state-markets";
import { stateMarkets } from "./state-markets";

export type GeoMarket = {
  slug: string;
  name: string;
  stateKey: StateMarketKey;
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
    stateKey: "washington",
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
    stateKey: "washington",
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
    stateKey: "washington",
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
    stateKey: "washington",
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
    slug: "scottsdale",
    name: "Scottsdale",
    stateKey: "arizona",
    regionLabel: "Greater Phoenix",
    title: "Mortgage strategy for Scottsdale and North Valley buyers.",
    description:
      "Luxury pockets, relocation, and jumbo financing context for Scottsdale-area purchases.",
    heroLead:
      "Scottsdale purchases often cross into jumbo territory—reserves and documentation should be ready early.",
    heroFocus: "Jumbo pockets. Relocation. Second-home fit.",
    localContext: [
      "North Scottsdale and Paradise Valley serve higher price bands with jumbo documentation pressure.",
      "Relocation and second-home buyers are common.",
      "Golf and resort-adjacent inventory can affect appraisal and insurance context.",
    ],
    buyerScenarios: ["jumbo-buyers", "investment-property-strategy", "first-time-buyers"],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing", "seller-concessions"],
    luxuryNote: "Treat Scottsdale luxury as a documentation and timing problem—not just a bigger loan amount.",
    searchPhrases: ["Scottsdale mortgage advisor", "Scottsdale jumbo loan"],
    primaryAudience: "buyer",
  },
  {
    slug: "phoenix",
    name: "Phoenix",
    stateKey: "arizona",
    regionLabel: "Greater Phoenix",
    title: "Mortgage strategy for Phoenix metro buyers and homeowners.",
    description:
      "Payment strategy, new construction, and relocation financing for Phoenix-area markets.",
    heroLead:
      "Phoenix metro growth pulls relocation buyers—align pre-approval and timeline before touring.",
    heroFocus: "Relocation. Payment. New construction.",
    localContext: [
      "Suburban growth corridors compete with urban infill on different price paths.",
      "New construction timelines affect rate-lock and closing planning.",
      "Investor and second-home activity appears alongside owner-occupant demand.",
    ],
    buyerScenarios: ["first-time-buyers", "2-1-buydowns", "investment-property-strategy"],
    homeownerScenarios: ["refinance-timing", "heloc-vs-cash-out"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Phoenix mortgage advisor", "Phoenix home loan strategy"],
    primaryAudience: "buyer",
  },
  {
    slug: "san-diego",
    name: "San Diego",
    stateKey: "california",
    regionLabel: "Southern California",
    title: "Mortgage strategy for San Diego buyers and homeowners.",
    description:
      "Coastal high-balance, condo, and complex-income financing for San Diego County markets.",
    heroLead:
      "San Diego purchases often combine coastal pricing with condo and jumbo documentation requirements.",
    heroFocus: "Jumbo fit. Condo review. Self-employed paths.",
    localContext: [
      "Coastal and inland submarkets follow different price and inventory cycles.",
      "Condo warrantability matters in urban and beach-adjacent inventory.",
      "Military and relocation narratives are common across the county.",
    ],
    buyerScenarios: ["jumbo-buyers", "condo-financing", "self-employed-borrowers", "physician-loans"],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["San Diego mortgage advisor", "San Diego jumbo loan"],
    primaryAudience: "buyer",
  },
  {
    slug: "orange-county",
    name: "Orange County",
    stateKey: "california",
    regionLabel: "Southern California",
    title: "Mortgage strategy for Orange County buyers and homeowners.",
    description:
      "High-balance and jumbo strategy for coastal and inland Orange County markets.",
    heroLead:
      "Orange County buyers frequently exceed conforming limits—structure financing before the offer window.",
    heroFocus: "Jumbo documentation. Reserves. Offer strength.",
    localContext: [
      "Coastal and inland cities serve different buyer profiles and price bands.",
      "Jumbo reserves and income documentation often gate otherwise strong offers.",
      "Condo and townhome inventory benefits from early warrantability review.",
    ],
    buyerScenarios: ["jumbo-buyers", "condo-financing", "buy-before-sell", "self-employed-borrowers"],
    homeownerScenarios: ["heloc-strategy", "refinance-timing"],
    agentScenarios: ["agent-financing", "investment-property-strategy"],
    luxuryNote: "Orange County luxury is often a jumbo documentation exercise—plan reserves early.",
    searchPhrases: ["Orange County mortgage advisor", "Orange County jumbo loan"],
    primaryAudience: "buyer",
  },
  {
    slug: "austin",
    name: "Austin",
    stateKey: "texas",
    regionLabel: "Central Texas",
    title: "Mortgage strategy for Austin metro buyers and homeowners.",
    description:
      "Tech relocation, jumbo pockets, and new construction financing for Austin-area markets.",
    heroLead:
      "Austin’s mix of urban core, suburban growth, and jumbo pockets needs scenario-specific financing—not generic rate shopping.",
    heroFocus: "Relocation. Jumbo core. New construction.",
    localContext: [
      "Inner-loop and Westlake-adjacent bands often cross conforming limits.",
      "Corporate relocation drives tight timeline expectations.",
      "New construction and master-planned communities are common in growth corridors.",
    ],
    buyerScenarios: ["jumbo-buyers", "self-employed-borrowers", "first-time-buyers", "buy-before-sell"],
    homeownerScenarios: ["refinance-timing", "heloc-vs-cash-out"],
    agentScenarios: ["agent-financing", "investment-property-strategy"],
    searchPhrases: ["Austin mortgage advisor", "Austin jumbo loan strategy"],
    primaryAudience: "buyer",
  },
  {
    slug: "dallas",
    name: "Dallas",
    stateKey: "texas",
    regionLabel: "North Texas",
    title: "Mortgage strategy for Dallas and DFW buyers.",
    description:
      "DFW financing—jumbo, new construction, relocation, and payment strategy with local market context.",
    heroLead:
      "DFW spans many submarkets—financing should match the neighborhood, price band, and timeline.",
    heroFocus: "DFW submarkets. Jumbo. New construction.",
    localContext: [
      "Preston Hollow and Park Cities pockets often need jumbo planning.",
      "Suburban master-planned communities compete with urban infill on different paths.",
      "Property tax context should inform true payment planning.",
    ],
    buyerScenarios: ["jumbo-buyers", "first-time-buyers", "investment-property-strategy"],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Dallas mortgage advisor", "DFW home loan strategy"],
    primaryAudience: "buyer",
  },
  {
    slug: "houston",
    name: "Houston",
    stateKey: "texas",
    regionLabel: "Gulf Coast",
    title: "Mortgage strategy for Houston metro buyers and homeowners.",
    description:
      "Houston-area financing—flood and insurance context, jumbo, and investor strategy with licensed Texas context.",
    heroLead:
      "Houston deals benefit when financing, insurance, and flood context are framed before offer—not after inspection.",
    heroFocus: "Insurance context. Jumbo. Investor fit.",
    localContext: [
      "Flood zone and insurance context can affect total housing cost and timing.",
      "River Oaks and Memorial corridors often cross into jumbo territory.",
      "Energy-sector income documentation appears frequently.",
    ],
    buyerScenarios: ["jumbo-buyers", "self-employed-borrowers", "investment-property-strategy"],
    homeownerScenarios: ["refinance-timing", "heloc-vs-cash-out"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Houston mortgage advisor", "Houston home loan strategy"],
    primaryAudience: "buyer",
  },
  {
    slug: "miami",
    name: "Miami",
    stateKey: "florida",
    regionLabel: "South Florida",
    title: "Mortgage strategy for Miami and South Florida buyers.",
    description:
      "Condo-heavy, high-rise, and jumbo financing context for Miami-Dade and South Florida markets.",
    heroLead:
      "Miami purchases often start with condo building review—financing should follow warrantability, not the other way around.",
    heroFocus: "Condo diligence. Jumbo. Occupancy clarity.",
    localContext: [
      "High-rise and boutique condo inventory requires early association and warrantability review.",
      "International and relocation buyer narratives are common.",
      "Insurance and wind/hazard context affects total housing cost.",
    ],
    buyerScenarios: ["condo-financing", "jumbo-buyers", "investment-property-strategy"],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing", "investment-property-strategy"],
    searchPhrases: ["Miami mortgage advisor", "Miami condo loan strategy"],
    primaryAudience: "buyer",
  },
  {
    slug: "tampa",
    name: "Tampa",
    stateKey: "florida",
    regionLabel: "Gulf Coast",
    title: "Mortgage strategy for Tampa Bay buyers and homeowners.",
    description:
      "Tampa Bay financing—condo, relocation, payment strategy, and refinance context.",
    heroLead:
      "Tampa Bay buyers balance waterfront pricing with payment-focused suburban corridors—scenario fit should be clear early.",
    heroFocus: "Relocation. Condo paths. Payment planning.",
    localContext: [
      "Waterfront and condo inventory may need warrantability and insurance review.",
      "Relocation from higher-cost states is common.",
      "Investor and second-home activity appears alongside owner-occupant demand.",
    ],
    buyerScenarios: ["condo-financing", "first-time-buyers", "investment-property-strategy"],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Tampa mortgage advisor", "Tampa Bay home loan"],
    primaryAudience: "buyer",
  },
  {
    slug: "denver",
    name: "Denver",
    stateKey: "colorado",
    regionLabel: "Front Range",
    title: "Mortgage strategy for Denver metro buyers and homeowners.",
    description:
      "Front Range financing—condo, jumbo pockets, relocation, and refinance strategy for Denver-area markets.",
    heroLead:
      "Denver metro buyers navigate urban condo rules alongside suburban payment strategy in a relocation-heavy market.",
    heroFocus: "Urban condo. Jumbo pockets. Relocation.",
    localContext: [
      "LoDo and Capitol Hill condos often need warrantability diligence.",
      "Cherry Hills and central Denver bands cross conforming limits.",
      "Relocation from coastal markets drives tight timeline expectations.",
    ],
    buyerScenarios: ["condo-financing", "jumbo-buyers", "first-time-buyers", "buy-before-sell"],
    homeownerScenarios: ["refinance-timing", "heloc-vs-cash-out"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Denver mortgage advisor", "Denver home loan strategy"],
    primaryAudience: "buyer",
  },
];

const strategicMetroSlugs = new Set(stateMarkets.flatMap((state) => state.metroSlugs));

export function getGeoMarketBySlug(slug: string) {
  return geoMarkets.find((market) => market.slug === slug);
}

export function getGeoMarketsByStateKey(stateKey: StateMarketKey) {
  return geoMarkets.filter((market) => market.stateKey === stateKey);
}

export function getStrategicGeoMarkets() {
  return geoMarkets.filter((market) => strategicMetroSlugs.has(market.slug));
}

export function getStateRouteForGeoMarket(market: GeoMarket) {
  return stateMarkets.find((state) => state.key === market.stateKey)?.routeSlug;
}
