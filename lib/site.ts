import { PRIVACY_POLICY_PATH, TERMS_OF_USE_PATH } from "@/lib/legal/routes";
import { BRAND } from "@/lib/brand";
import { NAV_CTA_LABEL } from "@/lib/cta";

export const SITE_NAME = BRAND.name;
export const SITE_URL = "https://rentpropertyheloc.com";
export const SITE_HEADLINE = BRAND.headline;
export const SITE_TAGLINE = BRAND.subheadline;
export const SITE_DESCRIPTOR = BRAND.descriptor;

export type SiteLink = { href: string; label: string };

export const NAV_LINKS: readonly SiteLink[] = [
  { href: "/#overview", label: "Overview" },
  { href: "/#dashboard", label: "Estimator" },
  { href: "/#scenarios", label: "Scenarios" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const FOOTER_LINKS = {
  topics: [
    { href: "/rental-property-heloc", label: "Rental property HELOC" },
    { href: "/heloc-on-investment-property", label: "HELOC on investment property" },
    { href: "/no-tax-return-heloc", label: "No tax return HELOC" },
    {
      href: "/use-equity-to-buy-another-rental",
      label: "Use equity to buy another rental",
    },
    { href: "/cash-out-vs-heloc", label: "Cash-out vs HELOC" },
    { href: "/investor-second-mortgage", label: "Investor second mortgage" },
    { href: "/condo-investor-heloc", label: "Condo investor HELOC" },
    { href: "/2-4-unit-rental-heloc", label: "2–4 unit rental HELOC" },
    { href: "/check-options", label: NAV_CTA_LABEL },
  ],
  resources: [
    { href: "/about", label: "About" },
    { href: "/scenarios", label: "Investor scenario library" },
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
