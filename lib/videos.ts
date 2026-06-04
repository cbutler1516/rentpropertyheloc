/**
 * Central video asset map — swap filenames here when replacing media.
 * Files live in /public/videos/
 */

/** Homepage talking-head explainer (below-the-fold overview section) */
export const EXPLAINER_VIDEO = "/videos/brunette-heloc-vid-1.mp4" as const;

export const SITE_VIDEOS = {
  /** Cinematic luxury aerial — hero background (muted loop) */
  heroBackground: "/videos/Luxury_real_estate_drone_footage_202606031728.mp4",
  /** First usable frame of hero background — avoids black flash on load */
  heroBackgroundPoster: "/images/hero/hero-background-poster.jpg",
  /** Primary talking-head explainer — overview section */
  explainer: EXPLAINER_VIDEO,
  howItWorks: "/videos/investor-fintech-commercial.mp4",
  rentalEquity: "/videos/investor-rental-review.mp4",
  investorGrowth: "/videos/investor-fintech-commercial-alt.mp4",
  portfolioAmbient: "/videos/investor-rental-review-alt.mp4",
  heroBackgroundAlt: "/videos/drone-neighborhood-loop-alt.mp4",
  ambientResidential: "/videos/drone-neighborhood-loop.mp4",
  ambientPortfolio: "/videos/drone-neighborhood-loop-alt.mp4",
  ambientRenovated: "/videos/drone-neighborhood-loop-alt.mp4",
} as const;

export type SiteVideoKey = keyof typeof SITE_VIDEOS;

export type AmbientOverlayVariant = "property" | "portfolio" | "interior";

export const VIDEO_CARDS = [
  {
    key: "residential",
    tag: "Residential",
    title: "Rental neighborhoods",
    description:
      "Slow aerial context around income properties—built for investors reviewing financing options, not consumer home tours.",
    src: SITE_VIDEOS.ambientResidential,
    overlay: "property" as AmbientOverlayVariant,
  },
  {
    key: "portfolio",
    tag: "Portfolio",
    title: "Scale across assets",
    description:
      "Portfolio-level visuals that support a personalized review—subject to approval.",
    src: SITE_VIDEOS.ambientPortfolio,
    overlay: "portfolio" as AmbientOverlayVariant,
  },
  {
    key: "renovated",
    tag: "Asset quality",
    title: "Renovated rentals",
    description:
      "Modern interiors and curb appeal—context for value-add scenarios, not a commitment to lend.",
    src: SITE_VIDEOS.ambientRenovated,
    overlay: "interior" as AmbientOverlayVariant,
  },
] as const;
