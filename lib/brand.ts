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
  /** Dark background lockup — white wordmark, cyan gradient accents */
  dark: "/brand/logo-dark.png",
  /** Light background lockup — navy wordmark, cyan gradient accents */
  light: "/brand/logo-light.png",
  icon: "/brand/logo-icon.png",
  iconSvg: "/brand/logo-icon.svg",
  /** @deprecated Use BRAND_ASSETS.light */
  primary: "/brand/logo-light.png",
  /** @deprecated Use BRAND_ASSETS.light */
  horizontal: "/brand/logo-light.png",
  /** @deprecated Use BRAND_ASSETS.light */
  stacked: "/brand/logo-light.png",
} as const;

export const LOGO_DARK_ASPECT = {
  width: 810,
  height: 323,
} as const;

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
  "relative h-11 w-[170px] max-w-[180px] sm:h-12 sm:w-[270px] sm:max-w-[280px]";

export const LOGO_FOOTER_FRAME =
  "relative h-9 w-[150px] max-w-[180px] sm:h-10 sm:w-[220px] sm:max-w-[240px]";

export const LOGO_LIGHT_SECTION_FRAME =
  "relative h-10 w-[170px] max-w-[180px] sm:h-11 sm:w-[240px] sm:max-w-[280px]";
