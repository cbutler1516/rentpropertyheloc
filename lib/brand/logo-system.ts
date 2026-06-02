export const LOGO_COLORS = {
  navy: "#0a1220",
  navyDeep: "#040810",
  teal: "#0d9488",
  tealBright: "#14b8a6",
  white: "#ffffff",
} as const;

export const LOGO_CONCEPT_IDS = [
  "monogram",
  "equity-arrow",
  "building-growth",
  "keyhole-capital",
  "typography-only",
] as const;

export type LogoConceptId = (typeof LOGO_CONCEPT_IDS)[number];

export type LogoSystemVariant = "primary" | "compact" | "icon" | "header" | "footer";

/** Recommended primary — RP with upward equity arrow */
export const PRIMARY_LOGO_CONCEPT: LogoConceptId = "equity-arrow";

export type LogoConceptMeta = {
  id: LogoConceptId;
  name: string;
  tagline: string;
};

export const LOGO_CONCEPTS: LogoConceptMeta[] = [
  {
    id: "monogram",
    name: "RP Monogram",
    tagline: "Geometric initials in a refined fintech frame.",
  },
  {
    id: "equity-arrow",
    name: "RP + Upward Equity Arrow",
    tagline: "Capital access with upward equity momentum.",
  },
  {
    id: "building-growth",
    name: "Building + Growth Line",
    tagline: "Portfolio assets paired with investor growth.",
  },
  {
    id: "keyhole-capital",
    name: "Keyhole + Capital Access",
    tagline: "Unlocking rental property equity capital.",
  },
  {
    id: "typography-only",
    name: "Typography Only",
    tagline: "Confident wordmark for premium editorial contexts.",
  },
];

export function getLogoConcept(id: LogoConceptId): LogoConceptMeta {
  return LOGO_CONCEPTS.find((concept) => concept.id === id) ?? LOGO_CONCEPTS[1];
}
