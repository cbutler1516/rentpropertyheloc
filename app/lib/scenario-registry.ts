import type { LeadFormType } from "../components/lead-capture-form";
import type { MoneyFunnel } from "./money-funnels";
import { moneyFunnels } from "./money-funnels";
import { scenarioFunnels } from "./scenario-funnels";

export type ScenarioAudience = "buyer" | "homeowner" | "agent" | "commercial";

export type ScenarioRegistryEntry = {
  slug: string;
  title: string;
  description: string;
  audience: ScenarioAudience;
  emotionalHook: string;
  href: string;
  searchPhrases: string[];
  relatedScenarioSlugs: string[];
  geoSlugs: string[];
  videoSlug?: string;
};

const registry: ScenarioRegistryEntry[] = [
  {
    slug: "buy-before-sell",
    title: "Buy Before Sell",
    description:
      "Bridge timing, equity, and payment strategy when you need to buy before your current home sells.",
    audience: "buyer",
    emotionalHook: "You found the next home before your current one is under contract.",
    href: "/scenarios/buy-before-sell",
    searchPhrases: ["buy before sell mortgage", "bridge loan home purchase", "contingent sale financing"],
    relatedScenarioSlugs: ["first-time-buyers", "seller-concessions", "jumbo-buyers"],
    geoSlugs: ["seattle", "bellevue", "kirkland", "washington-state"],
    videoSlug: "buyer-readiness-before-search",
  },
  {
    slug: "first-time-buyers",
    title: "First-Time Buyers",
    description:
      "Payment, cash to close, and offer confidence for buyers entering the market for the first time.",
    audience: "buyer",
    emotionalHook: "The process feels fast. The numbers should feel clear first.",
    href: "/learn/buyer-readiness",
    searchPhrases: ["first time home buyer mortgage", "first time buyer payment strategy"],
    relatedScenarioSlugs: ["seller-concessions", "condo-financing", "buy-before-sell"],
    geoSlugs: ["seattle", "tacoma", "washington-state"],
    videoSlug: "buyer-readiness-before-search",
  },
  {
    slug: "self-employed-borrowers",
    title: "Self-Employed Borrowers",
    description:
      "Income documentation, bank statements, and structure for borrowers who do not fit a simple W-2 profile.",
    audience: "buyer",
    emotionalHook: "Your tax return does not tell the whole story of how you earn.",
    href: "/scenarios/self-employed-borrowers",
    searchPhrases: ["self employed mortgage", "bank statement loan", "1099 borrower financing"],
    relatedScenarioSlugs: ["jumbo-buyers", "investment-property-strategy", "first-time-buyers"],
    geoSlugs: ["seattle", "bellevue", "washington-state"],
  },
  {
    slug: "jumbo-buyers",
    title: "Jumbo Buyers",
    description:
      "Higher-balance purchases need reserves, documentation, and offer strategy—not just a larger loan amount.",
    audience: "buyer",
    emotionalHook: "A bigger purchase needs a cleaner financing story.",
    href: "/learn/jumbo-loans",
    searchPhrases: ["jumbo loan strategy", "high balance mortgage", "luxury home financing"],
    relatedScenarioSlugs: ["physician-loans", "condo-financing", "seller-concessions"],
    geoSlugs: ["bellevue", "kirkland", "green-lake", "washington-state"],
  },
  {
    slug: "heloc-vs-cash-out",
    title: "HELOC vs Cash-Out",
    description:
      "Compare equity access paths when you need flexibility without resetting the entire first mortgage.",
    audience: "homeowner",
    emotionalHook: "You have equity—but the right tool depends on the goal.",
    href: "/learn/heloc-strategy",
    searchPhrases: ["heloc vs cash out refinance", "home equity strategy", "access equity without refinancing"],
    relatedScenarioSlugs: ["refinance-timing", "heloc-strategy", "investment-property-strategy"],
    geoSlugs: ["seattle", "bellevue", "washington-state"],
    videoSlug: "creative-mortgage-media-test",
  },
  {
    slug: "heloc-strategy",
    title: "HELOC Strategy",
    description:
      "Equity access, liquidity, and payment planning without replacing the entire first mortgage.",
    audience: "homeowner",
    emotionalHook: "Sometimes the smartest move is leaving the first mortgage alone.",
    href: "/learn/heloc-strategy",
    searchPhrases: ["heloc strategy", "home equity line of credit planning"],
    relatedScenarioSlugs: ["heloc-vs-cash-out", "refinance-timing"],
    geoSlugs: ["seattle", "washington-state"],
    videoSlug: "creative-mortgage-media-test",
  },
  {
    slug: "seller-concessions",
    title: "Seller Concessions",
    description:
      "Payment relief, cash to close, and negotiation strategy when seller credits are on the table.",
    audience: "buyer",
    emotionalHook: "A credit can change the monthly payment more than buyers expect.",
    href: "/learn/seller-concessions",
    searchPhrases: ["seller concessions mortgage", "seller credit buyer strategy"],
    relatedScenarioSlugs: ["first-time-buyers", "2-1-buydowns", "jumbo-buyers"],
    geoSlugs: ["seattle", "tacoma", "washington-state"],
    videoSlug: "buyer-readiness-before-search",
  },
  {
    slug: "2-1-buydowns",
    title: "2-1 Buydowns",
    description:
      "Temporary payment relief, seller credits, and long-term payment planning for buyers and agents.",
    audience: "buyer",
    emotionalHook: "The first-year payment can breathe—but the future payment still matters.",
    href: "/learn/2-1-buydowns",
    searchPhrases: ["2-1 buydown mortgage", "temporary buydown seller credit"],
    relatedScenarioSlugs: ["seller-concessions", "first-time-buyers"],
    geoSlugs: ["washington-state", "seattle"],
    videoSlug: "mortgage-strategy-clear-idea",
  },
  {
    slug: "refinance-timing",
    title: "Refinance Timing",
    description:
      "Payment, equity, cash flow, and flexibility when rates move or goals change.",
    audience: "homeowner",
    emotionalHook: "Rate headlines are loud. Your household plan should be louder.",
    href: "/learn/refinance-timing",
    searchPhrases: ["when to refinance", "refinance timing strategy"],
    relatedScenarioSlugs: ["heloc-vs-cash-out", "heloc-strategy"],
    geoSlugs: ["seattle", "bellevue", "washington-state"],
    videoSlug: "market-context-without-noise",
  },
  {
    slug: "physician-loans",
    title: "Physician Loans",
    description:
      "Flexible down payment and student-debt context for physicians, dentists, and residents in transition.",
    audience: "buyer",
    emotionalHook: "Your career path is not a standard W-2 timeline—and your loan strategy should not pretend it is.",
    href: "/scenarios/physician-loans",
    searchPhrases: ["physician mortgage loan", "doctor home loan program"],
    relatedScenarioSlugs: ["jumbo-buyers", "first-time-buyers"],
    geoSlugs: ["seattle", "bellevue", "kirkland"],
  },
  {
    slug: "agent-financing",
    title: "Real Estate Agent Financing",
    description:
      "Financing education and buyer conversation tools for agents who want cleaner offers and fewer surprises.",
    audience: "agent",
    emotionalHook: "Your clients remember how the financing felt—not just the rate quote.",
    href: "/agents/financing-playbook",
    searchPhrases: ["real estate agent mortgage partner", "agent buyer financing education"],
    relatedScenarioSlugs: ["seller-concessions", "first-time-buyers", "buy-before-sell"],
    geoSlugs: ["seattle", "bellevue", "washington-state"],
    videoSlug: "agent-financing-conversation",
  },
  {
    slug: "condo-financing",
    title: "Condo Financing",
    description:
      "HOA, warrantability, reserves, and offer strategy for condo buyers in competitive urban markets.",
    audience: "buyer",
    emotionalHook: "The condo looked simple until the HOA and warrantability questions showed up.",
    href: "/scenarios/condo-financing",
    searchPhrases: ["condo mortgage financing", "non warrantable condo loan"],
    relatedScenarioSlugs: ["first-time-buyers", "jumbo-buyers", "buy-before-sell"],
    geoSlugs: ["seattle", "bellevue", "kirkland", "green-lake"],
  },
  {
    slug: "investment-property-strategy",
    title: "Investment Property Strategy",
    description:
      "Rental income, reserves, and structure for buyers adding or scaling investment property.",
    audience: "commercial",
    emotionalHook: "The spreadsheet works until underwriting asks different questions.",
    href: "/scenarios/investment-property-strategy",
    searchPhrases: ["investment property mortgage", "rental property financing strategy"],
    relatedScenarioSlugs: ["self-employed-borrowers", "dscr-overview"],
    geoSlugs: ["seattle", "tacoma", "washington-state"],
  },
  {
    slug: "dscr-overview",
    title: "DSCR & Rental Strategy",
    description:
      "When rental income—not personal income—drives the financing conversation.",
    audience: "commercial",
    emotionalHook: "The property needs to carry the story, not just the borrower.",
    href: "/learn/dscr-loans",
    searchPhrases: ["dscr loan", "rental property dscr financing"],
    relatedScenarioSlugs: ["investment-property-strategy", "commercial-lending"],
    geoSlugs: ["washington-state"],
  },
  {
    slug: "commercial-lending",
    title: "Commercial Lending",
    description:
      "Asset, sponsor, and capital stack clarity for investors and operators.",
    audience: "commercial",
    emotionalHook: "Commercial deals reward structure before speed.",
    href: "/commercial",
    searchPhrases: ["commercial mortgage advisor", "commercial real estate financing"],
    relatedScenarioSlugs: ["investment-property-strategy", "dscr-overview"],
    geoSlugs: ["seattle", "bellevue", "washington-state"],
  },
];

export const scenarioRegistry = registry;

export function getScenarioBySlug(slug: string) {
  return scenarioRegistry.find((entry) => entry.slug === slug);
}

export function getScenariosByAudience(audience: ScenarioAudience) {
  return scenarioRegistry.filter((entry) => entry.audience === audience);
}

export function getScenarioFunnel(slug: string): MoneyFunnel | undefined {
  const hosted = Object.values(scenarioFunnels).find((funnel) => funnel.slug === slug);
  if (hosted) return hosted;

  return Object.values(moneyFunnels).find((funnel) => funnel.slug === slug);
}

export function getScenarioFormType(audience: ScenarioAudience): LeadFormType {
  if (audience === "homeowner") return "Homeowner Strategy Review";
  if (audience === "agent") return "Agent Partnership Conversation";
  if (audience === "commercial") return "Commercial Scenario Review";
  return "Buyer Strategy Call";
}

export const hostedScenarioSlugs = Object.values(scenarioFunnels).map(
  (funnel) => funnel.slug,
);
