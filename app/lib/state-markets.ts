import type { Metadata } from "next";

export type StateMarketKey =
  | "washington"
  | "arizona"
  | "california"
  | "colorado"
  | "florida"
  | "idaho"
  | "illinois"
  | "michigan"
  | "oregon"
  | "texas";

export type FinancingHighlight = {
  label: string;
  detail: string;
};

export type StateMarket = {
  key: StateMarketKey;
  routeSlug: string;
  name: string;
  abbreviation: string;
  regionLabel: string;
  title: string;
  description: string;
  heroLead: string;
  heroFocus: string;
  localContext: string[];
  financingHighlights: FinancingHighlight[];
  metroSlugs: string[];
  buyerScenarios: string[];
  homeownerScenarios: string[];
  agentScenarios: string[];
  commercialScenarios?: string[];
  videoSlugs?: string[];
  guideHrefs?: { href: string; label: string }[];
  searchPhrases: string[];
};

export const stateMarkets: StateMarket[] = [
  {
    key: "washington",
    routeSlug: "washington-mortgage",
    name: "Washington",
    abbreviation: "WA",
    regionLabel: "Pacific Northwest",
    title: "Washington mortgage strategy for buyers, homeowners, and agents.",
    description:
      "Puget Sound and statewide financing guidance—jumbo, condo, first-time, and refinance strategy with licensed context.",
    heroLead:
      "Washington markets move fast on the Eastside and in core Seattle neighborhoods—financing clarity is part of the offer.",
    heroFocus: "Jumbo & condo paths. Buy-before-sell. Agent-ready clarity.",
    localContext: [
      "Puget Sound, Eastside, and South Sound price bands and inventory behave very differently.",
      "Condo and townhome warrantability often matters before offer—not after inspection.",
      "Self-employed, physician, and jumbo documentation paths are common across the state.",
    ],
    financingHighlights: [
      {
        label: "Jumbo & luxury",
        detail:
          "Bellevue, Kirkland, Seattle, and waterfront pockets often cross conforming limits—reserves and documentation timing matter early.",
      },
      {
        label: "Condo & townhome",
        detail:
          "Older buildings and boutique inventory benefit from early HOA and warrantability review.",
      },
      {
        label: "First-time & move-up",
        detail:
          "Payment, credits, and buy-before-sell sequencing are frequent South Sound and suburban themes.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Rate timing, HELOC vs cash-out, and equity use show up often for established homeowners.",
      },
    ],
    metroSlugs: ["seattle", "bellevue", "kirkland", "tacoma"],
    buyerScenarios: [
      "first-time-buyers",
      "jumbo-buyers",
      "condo-financing",
      "buy-before-sell",
      "self-employed-borrowers",
    ],
    homeownerScenarios: ["refinance-timing", "heloc-strategy", "heloc-vs-cash-out"],
    agentScenarios: ["agent-financing", "seller-concessions", "investment-property-strategy"],
    guideHrefs: [
      { href: "/buyers", label: "Buyer strategy hub" },
      { href: "/agents", label: "Agent resources" },
    ],
    searchPhrases: [
      "Washington mortgage advisor",
      "Seattle area home loan strategy",
      "Washington jumbo loan",
    ],
  },
  {
    key: "arizona",
    routeSlug: "arizona-mortgage",
    name: "Arizona",
    abbreviation: "AZ",
    regionLabel: "Southwest",
    title: "Arizona mortgage strategy for Phoenix, Scottsdale, and statewide buyers.",
    description:
      "Desert market financing—relocation, second homes, jumbo pockets, and payment strategy with licensed Arizona context.",
    heroLead:
      "Arizona draws relocation and second-home buyers—scenario fit and reserves often matter more than headline rate.",
    heroFocus: "Relocation. Jumbo pockets. Investor & second-home fit.",
    localContext: [
      "Greater Phoenix and Scottsdale serve different price bands and negotiation dynamics.",
      "Snowbird and second-home use can affect occupancy and documentation.",
      "New construction and master-planned communities appear alongside resale inventory.",
    ],
    financingHighlights: [
      {
        label: "Scottsdale & luxury",
        detail:
          "Higher price bands in North Scottsdale and Paradise Valley often need jumbo planning and reserve clarity.",
      },
      {
        label: "Relocation buyers",
        detail:
          "Out-of-state moves benefit from early pre-approval narrative and timeline alignment with listing activity.",
      },
      {
        label: "First-time & payment",
        detail:
          "Payment-focused buyers in Phoenix suburbs often weigh credits, buydowns, and cash-to-close.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Long-term Arizona homeowners evaluate rate timing and equity access for upgrades or consolidation.",
      },
    ],
    metroSlugs: ["scottsdale", "phoenix"],
    buyerScenarios: [
      "first-time-buyers",
      "jumbo-buyers",
      "investment-property-strategy",
      "2-1-buydowns",
    ],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing", "seller-concessions"],
    searchPhrases: ["Arizona mortgage advisor", "Scottsdale home loan", "Phoenix mortgage strategy"],
  },
  {
    key: "california",
    routeSlug: "california-mortgage",
    name: "California",
    abbreviation: "CA",
    regionLabel: "West Coast",
    title: "California mortgage strategy for coastal and Southern California markets.",
    description:
      "High-balance, condo, and complex-income financing for San Diego, Orange County, and statewide California buyers.",
    heroLead:
      "California purchases often combine high balances, tight inventory, and complex income documentation.",
    heroFocus: "Jumbo fit. Condo review. Self-employed paths.",
    localContext: [
      "Southern California coastal markets frequently exceed conforming loan limits.",
      "Condo warrantability and HOA health can gate otherwise strong offers.",
      "Self-employed and variable-income documentation is common across the state.",
    ],
    financingHighlights: [
      {
        label: "Jumbo & high balance",
        detail:
          "Orange County and San Diego coastal inventory often requires jumbo reserves, appraisal awareness, and clean documentation.",
      },
      {
        label: "Condo & HOA",
        detail:
          "Boutique and older condo stock benefits from early warrantability and budget review.",
      },
      {
        label: "First-time & move-up",
        detail:
          "Payment planning and family help/gift documentation appear often in competitive submarkets.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Established owners weigh rate timing against tax and equity goals—structure before shopping rate.",
      },
    ],
    metroSlugs: ["san-diego", "orange-county"],
    buyerScenarios: [
      "jumbo-buyers",
      "condo-financing",
      "self-employed-borrowers",
      "physician-loans",
    ],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing", "investment-property-strategy"],
    searchPhrases: [
      "California mortgage advisor",
      "San Diego jumbo loan",
      "Orange County home financing",
    ],
  },
  {
    key: "colorado",
    routeSlug: "colorado-mortgage",
    name: "Colorado",
    abbreviation: "CO",
    regionLabel: "Mountain West",
    title: "Colorado mortgage strategy for Denver metro and statewide buyers.",
    description:
      "Front Range financing—payment strategy, jumbo pockets, relocation, and refinance context for Colorado homeowners.",
    heroLead:
      "Denver metro growth and mountain-adjacent demand create distinct financing paths by neighborhood and price band.",
    heroFocus: "Denver metro. Jumbo pockets. Relocation timing.",
    localContext: [
      "Denver and inner-ring suburbs differ sharply from mountain and resort-adjacent markets.",
      "Relocation from coastal markets is common—documentation and timing need alignment early.",
      "Condos and townhomes in urban cores may need warrantability review.",
    ],
    financingHighlights: [
      {
        label: "Denver metro jumbo",
        detail:
          "Cherry Hills, central Denver, and select suburbs cross conforming limits—plan reserves early.",
      },
      {
        label: "Condo & urban core",
        detail:
          "LoDo and Capitol Hill inventory may require HOA and warrantability diligence.",
      },
      {
        label: "First-time buyers",
        detail:
          "Payment and cash-to-close often drive decisions in competitive entry-level bands.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Long-term Front Range owners evaluate equity for upgrades and rate timing.",
      },
    ],
    metroSlugs: ["denver"],
    buyerScenarios: ["first-time-buyers", "jumbo-buyers", "condo-financing", "buy-before-sell"],
    homeownerScenarios: ["refinance-timing", "heloc-vs-cash-out"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Colorado mortgage advisor", "Denver home loan strategy"],
  },
  {
    key: "florida",
    routeSlug: "florida-mortgage",
    name: "Florida",
    abbreviation: "FL",
    regionLabel: "Southeast",
    title: "Florida mortgage strategy for Miami, Tampa, and statewide markets.",
    description:
      "Condo-heavy coastal financing, relocation, investor activity, and jumbo strategy with licensed Florida context.",
    heroLead:
      "Florida deals often hinge on condo rules, insurance context, and occupancy—financing should be framed before touring.",
    heroFocus: "Condo diligence. Relocation. Investor fit.",
    localContext: [
      "South Florida condo inventory requires early building and association review.",
      "Relocation and international buyer narratives appear alongside domestic moves.",
      "Insurance and wind/hazard context can affect timing and total housing cost.",
    ],
    financingHighlights: [
      {
        label: "Condo & high-rise",
        detail:
          "Miami and Tampa condo paths need warrantability, budget, and special-assessment awareness.",
      },
      {
        label: "Jumbo & waterfront",
        detail:
          "Coastal and waterfront pockets often exceed conforming limits with appraisal sensitivity.",
      },
      {
        label: "Relocation & second home",
        detail:
          "Occupancy and documentation should match how the property will actually be used.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Florida homeowners often weigh cash-out, HELOC, and rate timing against insurance and tax context.",
      },
    ],
    metroSlugs: ["miami", "tampa"],
    buyerScenarios: ["condo-financing", "jumbo-buyers", "investment-property-strategy", "first-time-buyers"],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing", "investment-property-strategy"],
    searchPhrases: ["Florida mortgage advisor", "Miami condo loan", "Tampa home financing"],
  },
  {
    key: "idaho",
    routeSlug: "idaho-mortgage",
    name: "Idaho",
    abbreviation: "ID",
    regionLabel: "Mountain West",
    title: "Idaho mortgage strategy for Treasure Valley and statewide buyers.",
    description:
      "Growth-market financing for Boise-area and Idaho buyers—payment strategy, relocation, and refinance without thin city spam.",
    heroLead:
      "Idaho’s growth markets reward buyers who align payment, timeline, and documentation before writing offers.",
    heroFocus: "Treasure Valley. Relocation. Payment clarity.",
    localContext: [
      "Treasure Valley growth has pulled relocation from higher-cost states—timeline alignment matters.",
      "New construction and suburban resale compete in the same buyer pool.",
      "Rural and acreage properties may have different appraisal and program constraints.",
    ],
    financingHighlights: [
      {
        label: "Relocation buyers",
        detail:
          "Out-of-state moves should align pre-approval narrative with local agent and seller expectations.",
      },
      {
        label: "First-time & payment",
        detail:
          "Cash-to-close and payment bands often drive Idaho entry-level decisions.",
      },
      {
        label: "New construction",
        detail:
          "Builder timelines and rate-lock strategy should be planned with the contract—not after.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Rapid appreciation has made equity decisions common for established Idaho homeowners.",
      },
    ],
    metroSlugs: [],
    buyerScenarios: ["first-time-buyers", "buy-before-sell", "2-1-buydowns"],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Idaho mortgage advisor", "Boise home loan strategy"],
  },
  {
    key: "illinois",
    routeSlug: "illinois-mortgage",
    name: "Illinois",
    abbreviation: "IL",
    regionLabel: "Midwest",
    title: "Illinois mortgage strategy for Chicagoland and statewide buyers.",
    description:
      "Condo-heavy urban financing, suburban move-up strategy, and refinance context for Illinois homeowners and agents.",
    heroLead:
      "Illinois buyers balance Chicago condo rules with suburban payment strategy—scenario fit should be clear early.",
    heroFocus: "Condo paths. Move-up timing. Agent clarity.",
    localContext: [
      "Chicago and collar-county markets operate on different price and inventory cycles.",
      "Condo warrantability and association health matter in urban core purchases.",
      "Property tax and housing cost context should inform payment planning.",
    ],
    financingHighlights: [
      {
        label: "Condo & townhome",
        detail:
          "Urban condo inventory benefits from early warrantability and budget review.",
      },
      {
        label: "First-time & move-up",
        detail:
          "Credits, concessions, and buydowns appear in both entry-level and move-up negotiations.",
      },
      {
        label: "Self-employed",
        detail:
          "Complex income documentation is common in professional and small-business households.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Long-term Illinois owners weigh rate timing against tax and equity goals.",
      },
    ],
    metroSlugs: [],
    buyerScenarios: ["condo-financing", "first-time-buyers", "self-employed-borrowers", "seller-concessions"],
    homeownerScenarios: ["refinance-timing", "heloc-vs-cash-out"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Illinois mortgage advisor", "Chicago home loan strategy"],
  },
  {
    key: "michigan",
    routeSlug: "michigan-mortgage",
    name: "Michigan",
    abbreviation: "MI",
    regionLabel: "Great Lakes",
    title: "Michigan mortgage strategy for buyers, homeowners, and agents.",
    description:
      "Payment-focused financing, move-up strategy, and refinance guidance for Michigan markets with licensed context.",
    heroLead:
      "Michigan buyers often optimize for payment, credits, and clear financing narrative in competitive submarkets.",
    heroFocus: "Payment planning. Move-up. Refinance timing.",
    localContext: [
      "Metro Detroit and West Michigan serve different buyer profiles and price bands.",
      "Seasonal inventory swings can affect negotiation and concession strategy.",
      "Move-up and first-time paths both benefit from early scenario framing.",
    ],
    financingHighlights: [
      {
        label: "First-time buyers",
        detail:
          "Cash-to-close, credits, and payment bands drive many Michigan entry-level decisions.",
      },
      {
        label: "Move-up & buy-before-sell",
        detail:
          "Contingency sequencing and bridge-style thinking appear in move-up searches.",
      },
      {
        label: "Self-employed",
        detail:
          "Documentation paths for business owners should be aligned before offer.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Established homeowners evaluate rate timing and equity use for upgrades.",
      },
    ],
    metroSlugs: [],
    buyerScenarios: ["first-time-buyers", "buy-before-sell", "seller-concessions", "self-employed-borrowers"],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Michigan mortgage advisor", "Detroit area home loan"],
  },
  {
    key: "oregon",
    routeSlug: "oregon-mortgage",
    name: "Oregon",
    abbreviation: "OR",
    regionLabel: "Pacific Northwest",
    title: "Oregon mortgage strategy for Portland metro and statewide buyers.",
    description:
      "Pacific Northwest financing—condo, jumbo pockets, first-time, and refinance strategy with licensed Oregon context.",
    heroLead:
      "Oregon buyers navigate Portland metro complexity alongside Willamette Valley and coastal markets with different rules.",
    heroFocus: "Portland metro. Condo paths. Jumbo pockets.",
    localContext: [
      "Portland urban condos and inner-eastside inventory often need early warrantability review.",
      "Willamette Valley and Bend-adjacent markets attract relocation and second-home interest.",
      "Self-employed and tech-income documentation paths are common.",
    ],
    financingHighlights: [
      {
        label: "Condo & townhome",
        detail:
          "Portland urban inventory benefits from HOA and warrantability diligence before offer.",
      },
      {
        label: "Jumbo pockets",
        detail:
          "Select Portland and Lake Oswego bands cross conforming limits—plan reserves early.",
      },
      {
        label: "First-time buyers",
        detail:
          "Payment and cash-to-close planning matters in competitive entry-level segments.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Long-term Oregon owners weigh HELOC vs cash-out and rate timing.",
      },
    ],
    metroSlugs: [],
    buyerScenarios: ["condo-financing", "jumbo-buyers", "first-time-buyers", "self-employed-borrowers"],
    homeownerScenarios: ["refinance-timing", "heloc-strategy"],
    agentScenarios: ["agent-financing"],
    searchPhrases: ["Oregon mortgage advisor", "Portland home loan strategy"],
  },
  {
    key: "texas",
    routeSlug: "texas-mortgage",
    name: "Texas",
    abbreviation: "TX",
    regionLabel: "South Central",
    title: "Texas mortgage strategy for Austin, Dallas, Houston, and statewide buyers.",
    description:
      "Major Texas metro financing—jumbo, new construction, relocation, and investor strategy with licensed context.",
    heroLead:
      "Texas metros scale from first-time suburbs to jumbo urban cores—financing should match the actual submarket.",
    heroFocus: "Austin. DFW. Houston. New construction & jumbo.",
    localContext: [
      "Austin, Dallas, and Houston serve different industries, price bands, and inventory types.",
      "New construction and master-planned communities are common in suburban growth corridors.",
      "Property tax context should inform true payment planning—not just rate.",
    ],
    financingHighlights: [
      {
        label: "Jumbo & urban core",
        detail:
          "Inner-loop Austin, Preston Hollow, and River Oaks bands often need jumbo documentation early.",
      },
      {
        label: "New construction",
        detail:
          "Builder contracts, rate locks, and timeline risk should be planned with the purchase agreement.",
      },
      {
        label: "Relocation & investor",
        detail:
          "Corporate relocation and rental-property strategy both need occupancy and documentation alignment.",
      },
      {
        label: "Refinance & equity",
        detail:
          "Texas homeowners frequently evaluate cash-out and rate timing in appreciation-heavy cycles.",
      },
    ],
    metroSlugs: ["austin", "dallas", "houston"],
    buyerScenarios: [
      "jumbo-buyers",
      "first-time-buyers",
      "investment-property-strategy",
      "self-employed-borrowers",
    ],
    homeownerScenarios: ["refinance-timing", "heloc-vs-cash-out"],
    agentScenarios: ["agent-financing", "investment-property-strategy"],
    commercialScenarios: ["investment-property-strategy"],
    searchPhrases: [
      "Texas mortgage advisor",
      "Austin jumbo loan",
      "Dallas home financing",
      "Houston mortgage strategy",
    ],
  },
];

export function getStateMarketByRouteSlug(routeSlug: string) {
  return stateMarkets.find((market) => market.routeSlug === routeSlug);
}

export function getStateMarketByKey(key: StateMarketKey) {
  return stateMarkets.find((market) => market.key === key);
}

export function createStateMarketMetadata(market: StateMarket): Metadata {
  return {
    title: `${market.title} | The Loan Playbook`,
    description: market.description,
    keywords: market.searchPhrases,
    openGraph: {
      title: market.title,
      description: market.description,
      type: "website",
    },
  };
}
