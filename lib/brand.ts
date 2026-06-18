export const BRAND = {
  name: "Rent Property HELOC",
  shortName: "RPH",
  monogram: "RPH",
  tagline: "The modern operating system for residential rental property equity.",
  headline: "Keep Your Rate. Access Your Equity.",
  subheadline:
    "Explore HELOC and home equity financing options for primary residences, second homes, and investment properties in about 60 seconds.",
  descriptor:
    "A streamlined review for homeowners and investors exploring HELOC and home equity options—subject to approval.",
} as const;

export const BRAND_ASSETS = {
  /** Dark navy site header — white wordmark + teal accents */
  header: "/brand/logo-header.png",
  /** Light background lockup */
  light: "/brand/logo-light.png",
  icon: "/brand/logo-icon.png",
  iconSvg: "/brand/logo-icon.svg",
  /** Source SVG for header lockup (reference / regeneration) */
  headerSvg: "/brand/logo-header.svg",
  /** @deprecated Use BRAND_ASSETS.header for navbar; legacy asset */
  dark: "/brand/logo-dark.png",
  /** @deprecated Use BRAND_ASSETS.light */
  primary: "/brand/logo-light.png",
  /** @deprecated Use BRAND_ASSETS.light */
  horizontal: "/brand/logo-horizontal.png",
  /** @deprecated Use BRAND_ASSETS.light */
  stacked: "/brand/logo-stacked.png",
} as const;

export const LOGO_HEADER_ASPECT = {
  width: 858,
  height: 349,
} as const;

/** @deprecated Use LOGO_HEADER_ASPECT */
export const LOGO_DARK_ASPECT = LOGO_HEADER_ASPECT;

export const LOGO_LIGHT_ASPECT = {
  width: 814,
  height: 324,
} as const;

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

export const LOGO_NAVBAR_FRAME =
  "relative h-9 w-[130px] max-w-[145px] md:h-11 md:w-[240px] md:max-w-[260px]";

export const LOGO_FOOTER_FRAME =
  "relative h-9 w-[150px] max-w-[180px] sm:h-10 sm:w-[220px] sm:max-w-[240px]";

export const LOGO_LIGHT_SECTION_FRAME =
  "relative h-10 w-[170px] max-w-[180px] sm:h-11 sm:w-[240px] sm:max-w-[280px]";
