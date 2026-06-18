import { PRIVACY_POLICY_PATH, TERMS_OF_USE_PATH } from "@/lib/legal/routes";
import { BRAND } from "@/lib/brand";
import { PRIMARY_CTA_LABEL } from "@/lib/cta";

export const SITE_NAME = BRAND.name;
export const SITE_URL = "https://rentpropertyheloc.com";
export const SITE_HEADLINE = BRAND.headline;
export const SITE_TAGLINE = BRAND.subheadline;
export const SITE_DESCRIPTOR = BRAND.descriptor;

export type SiteLink = { href: string; label: string };

/** Header navigation — conversion-focused, minimal. */
export const NAV_LINKS: readonly SiteLink[] = [
  { href: "/#overview", label: "Overview" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const FOOTER_LINKS = {
  topics: [
    { href: "/rental-property-heloc", label: "Rental property HELOC" },
    { href: "/owner-occupied-heloc", label: "Owner-occupied HELOC" },
    { href: "/home-equity-options", label: "Home equity options" },
    { href: "/check-options", label: PRIMARY_CTA_LABEL },
  ],
  resources: [
    { href: "/#faq", label: "FAQ" },
    { href: "/heloc-for-primary-residence", label: "Primary residence HELOC" },
    { href: "/scenarios", label: "Scenario examples" },
    { href: "/licensing-information", label: "Licensing" },
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
  { path: "/check-options", label: "HELOC review funnel", public: true },
  { path: "/rental-property-heloc", label: "Topic — rental property HELOC", public: true },
  { path: "/heloc-on-investment-property", label: "Topic — HELOC on investment property", public: true },
  { path: "/owner-occupied-heloc", label: "Topic — owner-occupied HELOC", public: true },
  { path: "/home-equity-options", label: "Topic — home equity options", public: true },
  { path: "/heloc-for-primary-residence", label: "Topic — primary residence HELOC", public: true },
  { path: "/no-tax-return-heloc", label: "Topic — no tax return HELOC", public: true },
  { path: "/use-equity-to-buy-another-rental", label: "Topic — use equity for next rental", public: true },
  { path: "/cash-out-vs-heloc", label: "Topic — cash-out vs HELOC", public: true },
  { path: "/investor-second-mortgage", label: "Topic — investor second mortgage", public: true },
  { path: "/condo-investor-heloc", label: "Topic — condo investor HELOC", public: true },
  { path: "/2-4-unit-rental-heloc", label: "Topic — 2–4 unit HELOC", public: true },
  { path: "/two-to-four-unit-heloc", label: "Legacy 2–4 unit redirect", public: true },
  { path: "/scenarios", label: "Scenario library", public: true },
  { path: "/faq", label: "FAQ", public: true },
  { path: PRIVACY_POLICY_PATH, label: "Privacy Policy", public: true },
  { path: TERMS_OF_USE_PATH, label: "Terms of Use", public: true },
  { path: "/privacy", label: "Privacy redirect", public: true },
  { path: "/terms", label: "Terms redirect", public: true },
  { path: "/licensing-information", label: "Licensing", public: true },
  { path: "/disclosures", label: "Disclosures redirect", public: true },
  { path: "/brand", label: "Brand system (noindex)", public: true },
  { path: "/admin/leads-health", label: "Lead pipeline health", public: false },
  { path: "/admin/conversions", label: "Conversion overview", public: false },
  { path: "/admin/partial-leads", label: "Partial leads", public: false },
  { path: "/admin/fast-track-leads", label: "Fast track leads", public: false },
] as const;
