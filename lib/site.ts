import { BRAND } from "@/lib/brand";

export const SITE_NAME = BRAND.name;
export const SITE_URL = "https://rentpropertyheloc.com";
export const SITE_HEADLINE = BRAND.headline;
export const SITE_TAGLINE = BRAND.subheadline;
export const SITE_DESCRIPTOR = BRAND.descriptor;

export const NAV_LINKS = [
  { href: "/#overview", label: "Overview" },
  { href: "/#dashboard", label: "Dashboard" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#program", label: "Program" },
  { href: "/#faq", label: "FAQ" },
] as const;

export const FOOTER_LINKS = {
  legal: [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/disclosures", label: "Disclosures" },
  ],
  topics: [
    { href: "/rental-property-heloc", label: "Rental property HELOC" },
    { href: "/heloc-on-investment-property", label: "HELOC on investment property" },
    { href: "/no-tax-return-heloc", label: "No tax return HELOC" },
    {
      href: "/use-equity-to-buy-another-rental",
      label: "Use equity to buy another rental",
    },
  ],
} as const;
