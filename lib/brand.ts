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
  horizontal: "/brand/logo-horizontal.png",
  stacked: "/brand/logo-stacked.png",
  icon: "/brand/logo-icon.png",
  iconSvg: "/brand/logo-icon.svg",
} as const;

export const BRAND_COLORS = {
  primary: "#17D4D4",
  secondary: "#00B8D9",
  navy: "#082B5B",
  dark: "#111827",
} as const;

export type LogoVariant =
  | "horizontal"
  | "stacked"
  | "icon"
  | "navbar"
  | "footer"
  | "monochrome"
  | "light";
