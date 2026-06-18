/** Mortgage resources hub — future content center */

import { MORTGAGE_PRODUCT_PATHS, MORTGAGE_SOLUTION_LINKS } from "@/lib/mortgage-products/content";
import { SEO_PAGE_PATHS } from "@/lib/seo/pages";

export const MORTGAGE_RESOURCES_HERO = {
  eyebrow: "Mortgage resources",
  title: "Guides, programs, and tools for smarter financing",
  lead:
    "The Loan Playbook mortgage resources hub — loan program guides, investor education, calculators, and strategy content for buyers, agents, and operators.",
} as const;

export const FEATURED_GUIDES = [
  { href: "/learn", label: "Learn hub", description: "Education and topic deep-dives" },
  { href: "/strategy-call", label: "Strategy call", description: "Custom mortgage strategy session" },
  { href: "/deal-analyzer", label: "Deal Analyzer", description: "Compare scenarios and build reports" },
  { href: "/scenarios", label: "Scenario library", description: "Investor financing examples" },
] as const;

export const CALCULATOR_LINKS = [
  { href: "/check-options", label: "Build My Loan Playbook", description: "Start your financing review" },
  { href: "/deal-analyzer", label: "Deal Analyzer", description: "Model purchase, refi, and investor paths" },
  { href: "/commercial", label: "Commercial strategy", description: "Commercial financing overview" },
] as const;

export const MARKET_INSIGHTS = [
  { href: "/learn", label: "Market explainers", description: "Rate and market education from Chris" },
  { href: "/faq", label: "FAQ", description: "Common financing questions" },
] as const;

export const BUYER_RESOURCES = [
  { href: "/buyers", label: "Buyers", description: "Purchase-loan strategy" },
  { href: "/conventional-loans", label: "Conventional loans" },
  { href: "/fha-loans", label: "FHA loans" },
  { href: "/va-loans", label: "VA loans" },
  { href: "/jumbo-loans", label: "Jumbo loans" },
] as const;

export const INVESTOR_RESOURCES = [
  { href: "/investors", label: "Investors", description: "Portfolio and rental strategy" },
  { href: "/dscr-loans", label: "DSCR loans" },
  { href: "/bank-statement-loans", label: "Bank statement loans" },
  { href: "/heloc", label: "HELOC" },
  { href: "/rental-property-heloc", label: "Rental property HELOC guide" },
] as const;

export const ALL_PROGRAM_LINKS = MORTGAGE_SOLUTION_LINKS;

export const SEO_TOPIC_LINKS = SEO_PAGE_PATHS.map((path) => ({
  href: path,
  label: path.replace(/^\//, "").replace(/-/g, " "),
}));

export const MORTGAGE_RESOURCES_SECTIONS = [
  {
    id: "featured-guides",
    title: "Featured guides",
    links: FEATURED_GUIDES,
  },
  {
    id: "loan-programs",
    title: "Loan programs",
    links: ALL_PROGRAM_LINKS,
  },
  {
    id: "calculators",
    title: "Calculators & tools",
    links: CALCULATOR_LINKS,
  },
  {
    id: "market-insights",
    title: "Market insights",
    links: MARKET_INSIGHTS,
  },
  {
    id: "buyer-resources",
    title: "Buyer resources",
    links: BUYER_RESOURCES,
  },
  {
    id: "investor-resources",
    title: "Investor resources",
    links: INVESTOR_RESOURCES,
  },
] as const;

export const MORTGAGE_RESOURCES_PATHS = [
  "/mortgage-resources",
  ...MORTGAGE_PRODUCT_PATHS,
] as const;
