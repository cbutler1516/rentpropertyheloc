/**
 * The Loan Playbook — brand asset paths and dimensions.
 * Placeholders live in /public/images/branding/ (tlp-* naming).
 */

export const BRAND = {
  name: "The Loan Playbook",
  shortName: "TLP",
  monogram: "LP",
  tagline:
    "A modern mortgage company built around strategy, education, and client-specific financing playbooks.",
  headline: "A Modern Mortgage Company Built Around Strategy.",
  subheadline:
    "The Loan Playbook helps buyers, homeowners, investors, agents, and business owners compare financing options, understand the numbers, and move with a smarter plan.",
  descriptor:
    "Mortgage advisory, Deal Analyzer technology, and playbook reports for purchase, equity, investor, and commercial paths.",
} as const;

export const BRAND_ASSETS = {
  /** Light background wordmark */
  light: "/images/branding/tlp-logo-light.png",
  /** Dark / navy header wordmark */
  dark: "/images/branding/tlp-logo-dark.png",
  /** App icon mark */
  icon: "/images/branding/tlp-icon.png",
  /** Vector icon for monochrome surfaces */
  iconSvg: "/brand/logo-icon.svg",
  /** Default Open Graph share image (1200×630) */
  og: "/images/branding/tlp-og-image.png",
  /** @deprecated Use BRAND_ASSETS.dark */
  header: "/images/branding/tlp-logo-dark.png",
  /** @deprecated Use BRAND_ASSETS.light */
  primary: "/images/branding/tlp-logo-light.png",
  /** @deprecated Use BRAND_ASSETS.light */
  horizontal: "/images/branding/tlp-logo-light.png",
  /** @deprecated Use BRAND_ASSETS.light */
  stacked: "/images/branding/tlp-logo-light.png",
} as const;

export const LOGO_LIGHT_ASPECT = {
  width: 814,
  height: 324,
} as const;

export const LOGO_DARK_ASPECT = {
  width: 858,
  height: 349,
} as const;

/** @deprecated Use LOGO_DARK_ASPECT */
export const LOGO_HEADER_ASPECT = LOGO_DARK_ASPECT;

/** @deprecated Use LOGO_LIGHT_ASPECT */
export const LOGO_PRIMARY_ASPECT = LOGO_LIGHT_ASPECT;

export const OG_IMAGE_ASPECT = {
  width: 1200,
  height: 630,
} as const;

export const BRAND_COLORS = {
  primary: "#17D4D4",
  secondary: "#00B8D9",
  navy: "#082B5B",
  dark: "#111827",
} as const;

export type LogoVariant =
  | "dark"
  | "horizontal"
  | "stacked"
  | "icon"
  | "navbar"
  | "footer"
  | "monochrome"
  | "light";

export const LOGO_NAVBAR_FRAME =
  "relative h-9 w-[130px] max-w-[145px] md:h-11 md:w-[240px] md:max-w-[260px]";

export const LOGO_FOOTER_FRAME =
  "relative h-9 w-[150px] max-w-[180px] sm:h-10 sm:w-[220px] sm:max-w-[240px]";

export const LOGO_LIGHT_SECTION_FRAME =
  "relative h-10 w-[170px] max-w-[180px] sm:h-11 sm:w-[240px] sm:max-w-[280px]";
