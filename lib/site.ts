import { PRIVACY_POLICY_PATH, TERMS_OF_USE_PATH } from "@/lib/legal/routes";
import { BRAND } from "@/lib/brand";
import { PLAYBOOK_HERO } from "@/lib/playbook-content";

export const SITE_NAME = BRAND.name;
export const SITE_URL = "https://theloanplaybook.com";
export const SITE_HEADLINE = BRAND.headline;
export const SITE_TAGLINE = BRAND.subheadline;
export const SITE_DESCRIPTOR = BRAND.descriptor;

export type SiteLink = { href: string; label: string };

export const NAV_LINKS: readonly SiteLink[] = [
  { href: "/", label: "Home" },
  { href: "/buyers", label: "Buyers" },
  { href: "/agents", label: "Agents" },
  { href: "/investors", label: "Investors" },
  { href: "/commercial", label: "Commercial" },
  { href: "/deal-analyzer", label: "Deal Analyzer" },
  { href: "/learn", label: "Learn" },
  { href: "/partners", label: "Partners" },
  { href: "/about", label: "About" },
  { href: "/strategy-call", label: "Book Strategy Call" },
] as const;

export const FOOTER_LINKS = {
  topics: [
    { href: "/buyers", label: "Buyers" },
    { href: "/investors", label: "Investors" },
    { href: "/commercial", label: "Commercial" },
    { href: "/deal-analyzer", label: "Deal Analyzer" },
    { href: "/mortgage-resources", label: "Mortgage resources" },
    { href: "/learn", label: "Learn" },
    { href: "/check-options", label: PLAYBOOK_HERO.primaryCta },
  ],
  resources: [
    { href: "/agents", label: "Agents" },
    { href: "/partners", label: "Partners" },
    { href: "/about", label: "About" },
    { href: "/strategy-call", label: "Book strategy call" },
    { href: "/conventional-loans", label: "Conventional loans" },
    { href: "/dscr-loans", label: "DSCR loans" },
    { href: "/scenarios", label: "Scenario library" },
    { href: "/faq", label: "FAQ" },
  ],
} as const satisfies {
  topics: readonly SiteLink[];
  resources: readonly SiteLink[];
};

export const TOPIC_PAGE_LINKS: readonly SiteLink[] = FOOTER_LINKS.topics.filter(
  (link) => link.href !== "/check-options",
);

export const CHECK_OPTIONS_HREF = "/check-options";

export function getRelatedLinksForPath(
  currentPath: string,
  pool: readonly SiteLink[] = TOPIC_PAGE_LINKS,
  limit = 3,
): SiteLink[] {
  return pool.filter((link) => link.href !== currentPath).slice(0, limit);
}

export const PUBLIC_ROUTE_CHECKLIST = [
  { path: "/", label: "Homepage", public: true },
  { path: "/buyers", label: "Buyers", public: true },
  { path: "/agents", label: "Agents", public: true },
  { path: "/investors", label: "Investors", public: true },
  { path: "/commercial", label: "Commercial", public: true },
  { path: "/deal-analyzer", label: "Deal Analyzer", public: true },
  { path: "/learn", label: "Learn hub", public: true },
  { path: "/partners", label: "Partners", public: true },
  { path: "/strategy-call", label: "Strategy call", public: true },
  { path: "/mortgage-resources", label: "Mortgage resources", public: true },
  { path: "/conventional-loans", label: "Conventional loans", public: true },
  { path: "/fha-loans", label: "FHA loans", public: true },
  { path: "/va-loans", label: "VA loans", public: true },
  { path: "/jumbo-loans", label: "Jumbo loans", public: true },
  { path: "/dscr-loans", label: "DSCR loans", public: true },
  { path: "/bank-statement-loans", label: "Bank statement loans", public: true },
  { path: "/heloc", label: "HELOC", public: true },
  { path: "/cash-out-refinance", label: "Cash-out refinance", public: true },
  { path: "/commercial-loans", label: "Commercial loans", public: true },
  { path: "/contact", label: "Contact", public: true },
  { path: "/check-options", label: "Options hub", public: true },
  { path: "/check-options/sfr", label: "SFR journey funnel", public: true },
  { path: "/check-options/multifamily-small", label: "2–4 unit journey funnel", public: true },
  { path: "/check-options/short-term-rental", label: "STR journey funnel", public: true },
  { path: "/check-options/multifamily", label: "Multifamily journey funnel", public: true },
  { path: "/rental-property-heloc", label: "Topic — rental property HELOC", public: true },
  { path: "/heloc-on-investment-property", label: "Topic — HELOC on investment property", public: true },
  { path: "/no-tax-return-heloc", label: "Topic — no tax return HELOC", public: true },
  { path: "/use-equity-to-buy-another-rental", label: "Topic — use equity for next rental", public: true },
  { path: "/cash-out-vs-heloc", label: "Topic — cash-out vs HELOC", public: true },
  { path: "/investor-second-mortgage", label: "Topic — investor second mortgage", public: true },
  { path: "/condo-investor-heloc", label: "Topic — condo investor HELOC", public: true },
  { path: "/2-4-unit-rental-heloc", label: "Topic — 2–4 unit HELOC", public: true },
  { path: "/two-to-four-unit-heloc", label: "Legacy 2–4 unit redirect", public: true },
  { path: "/scenarios", label: "Investor scenario library", public: true },
  { path: "/faq", label: "FAQ", public: true },
  { path: PRIVACY_POLICY_PATH, label: "Privacy Policy", public: true },
  { path: TERMS_OF_USE_PATH, label: "Terms of Use", public: true },
  { path: "/privacy", label: "Privacy redirect", public: true },
  { path: "/terms", label: "Terms redirect", public: true },
  { path: "/about", label: "About", public: true },
  { path: "/licensing-information", label: "Licensing redirect", public: true },
  { path: "/disclosures", label: "Disclosures redirect", public: true },
  { path: "/brand", label: "Brand system (noindex)", public: true },
  { path: "/admin/leads-health", label: "Lead pipeline health", public: false },
  { path: "/admin/conversions", label: "Conversion overview", public: false },
  { path: "/admin/partial-leads", label: "Partial leads", public: false },
  { path: "/admin/fast-track-leads", label: "Fast track leads", public: false },
] as const;
