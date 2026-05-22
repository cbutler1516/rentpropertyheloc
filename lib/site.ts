export const SITE_NAME = "RentPropertyHELOC";
export const SITE_URL = "https://rentpropertyheloc.com";
export const SITE_TAGLINE =
  "Access revolving equity on rental collateral—structured for investors who move on opportunity, not slogans.";

export const NAV_LINKS = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#program", label: "Program" },
  { href: "/#use-cases", label: "Use cases" },
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
