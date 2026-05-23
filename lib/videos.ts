/**
 * Central video asset map — swap filenames here when replacing media.
 * Files live in /public/videos/
 */
export const SITE_VIDEOS = {
  /** Cinematic aerial — hero background (muted loop) */
  heroBackground: "/videos/drone-neighborhood-loop.mp4",
  /** Primary talking-head explainer — audio on, controls */
  explainer: "/videos/blonde-pitch.mp4",
  /** How-it-works section ambient + card */
  howItWorks: "/videos/investor-fintech-commercial.mp4",
  /** Rental equity / portfolio review */
  rentalEquity: "/videos/investor-rental-review.mp4",
  /** Investor growth / commercial variant */
  investorGrowth: "/videos/investor-fintech-commercial-alt.mp4",
  /** Alternate portfolio ambient */
  portfolioAmbient: "/videos/investor-rental-review-alt.mp4",
  /** Optional hero alternate */
  heroBackgroundAlt: "/videos/drone-neighborhood-loop-alt.mp4",
} as const;

export type SiteVideoKey = keyof typeof SITE_VIDEOS;

export const VIDEO_CARDS = [
  {
    key: "howItWorks" as const,
    title: "How it works",
    description:
      "See the digital review flow investors use before drawing on rental equity—programs may be available, subject to approval.",
    src: SITE_VIDEOS.howItWorks,
  },
  {
    key: "rentalEquity" as const,
    title: "Rental equity in focus",
    description:
      "Property value, lien position, and available equity reviewed together—not a commitment to lend.",
    src: SITE_VIDEOS.rentalEquity,
  },
  {
    key: "investorGrowth" as const,
    title: "Portfolio momentum",
    description:
      "Funding possible in as little as 7 days when documentation and third-party items are complete.",
    src: SITE_VIDEOS.investorGrowth,
  },
] as const;
