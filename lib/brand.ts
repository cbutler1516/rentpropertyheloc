export const BRAND = {
  name: "Rent Property HELOC",
  shortName: "RPH",
  monogram: "RPH",
  tagline: "The modern operating system for residential rental property equity.",
  headline: "Access rental property equity faster — without tax returns.",
  subheadline:
    "Explore HELOC options on rental collateral through a streamlined digital review—programs may be available, subject to approval.",
  descriptor:
    "A modern platform for residential real estate investors seeking strategic leverage, liquidity, and portfolio growth.",
} as const;

export const BRAND_ASSETS = {
  /** Navbar / dark navy header — white wordmark, cyan gradient accents */
  header: "/images/branding/rph-logo-header.png",
  /** Light background lockup — navy wordmark, cyan gradient accents */
  light: "/images/branding/rph-logo-light.png",
  icon: "/brand/logo-icon.png",
  iconSvg: "/brand/logo-icon.svg",
  /** @deprecated Use BRAND_ASSETS.header */
  dark: "/images/branding/rph-logo-header.png",
  /** @deprecated Use BRAND_ASSETS.light */
  primary: "/images/branding/rph-logo-light.png",
  /** @deprecated Use BRAND_ASSETS.light */
  horizontal: "/images/branding/rph-logo-light.png",
  /** @deprecated Use BRAND_ASSETS.light */
  stacked: "/images/branding/rph-logo-light.png",
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
