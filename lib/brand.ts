export const BRAND = {
  name: "Rent Property HELOC",
  shortName: "RPH",
  monogram: "RPH",
  tagline: "The modern operating system for residential rental property equity.",
  headline: "Keep Your Rate. Access Your Equity.",
  subheadline:
    "See how much capital may be available from your home, rental property, or investment portfolio — in about 60 seconds.",
  descriptor:
    "A streamlined review for homeowners and investors exploring HELOC and home equity options—subject to approval.",
} as const;

export const BRAND_ASSETS = {
  /** Dark navy site header — horizontal lockup, white wordmark + teal accents */
  header: "/brand/rph-logo-header-horizontal.png",
  /** Light background horizontal lockup */
  light: "/brand/rph-logo-light-horizontal.png",
  icon: "/brand/logo-icon.png",
  iconSvg: "/brand/logo-icon.svg",
  /** Source SVG for header lockup (reference / regeneration) */
  headerSvg: "/brand/rph-logo-header-horizontal.svg",
  lightSvg: "/brand/rph-logo-light-horizontal.svg",
  /** @deprecated Use BRAND_ASSETS.header for navbar; legacy asset */
  dark: "/brand/logo-dark.png",
  /** @deprecated Use BRAND_ASSETS.light */
  primary: "/brand/rph-logo-light-horizontal.png",
  /** @deprecated Use BRAND_ASSETS.light */
  horizontal: "/brand/rph-logo-light-horizontal.png",
  /** @deprecated Use BRAND_ASSETS.light */
  stacked: "/brand/logo-stacked.png",
} as const;

/** Shared horizontal lockup aspect ratio (814×324) */
export const LOGO_HORIZONTAL_ASPECT = {
  width: 814,
  height: 324,
} as const;

export const LOGO_HEADER_ASPECT = LOGO_HORIZONTAL_ASPECT;

/** @deprecated Use LOGO_HORIZONTAL_ASPECT */
export const LOGO_DARK_ASPECT = LOGO_HORIZONTAL_ASPECT;

export const LOGO_LIGHT_ASPECT = LOGO_HORIZONTAL_ASPECT;

/** @deprecated Use LOGO_LIGHT_ASPECT */
export const LOGO_PRIMARY_ASPECT = LOGO_LIGHT_ASPECT;

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

/** Width-driven frame — height follows 814:324 aspect ratio */
export const LOGO_NAVBAR_FRAME =
  "relative block aspect-[814/324] w-[140px] shrink-0 md:w-[180px]";

export const LOGO_FOOTER_FRAME =
  "relative block aspect-[814/324] w-[160px] shrink-0 sm:w-[190px]";

export const LOGO_LIGHT_SECTION_FRAME =
  "relative block aspect-[814/324] w-[170px] shrink-0 sm:w-[200px]";
