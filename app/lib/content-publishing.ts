/**
 * Publishing workflow helpers — add content without redesigning templates.
 * See content-library/metadata/ for video inventory.
 */

import { heroVideos } from "./hero-videos";
import { geoMarkets } from "./geo-markets";
import { hostedScenarioSlugs } from "./scenario-registry";
import { topicClusters } from "./content-engine";

export type PublishingContentType =
  | "hero-video"
  | "guide"
  | "market"
  | "local-commentary"
  | "featured-slot";

export type PublishingRecipe = {
  type: PublishingContentType;
  title: string;
  summary: string;
  files: string[];
  steps: string[];
};

export const publishingRecipes: PublishingRecipe[] = [
  {
    type: "hero-video",
    title: "Hero video landing page",
    summary: "Curated TikTok → premium /videos/[slug] page (not full library).",
    files: [
      "content-library/tiktok/{slug}.mp4",
      "public/videos/hero/{slug}.mp4",
      "app/lib/hero-videos.ts",
      "app/lib/video-library.ts (status: published)",
    ],
    steps: [
      "Pick a curated candidate from content-library/metadata/hero-video-candidates.md.",
      "Add a heroVideos entry with takeaways, FAQ, dominantCta, and guide/market slugs.",
      "Copy the MP4 to public/videos/hero/ for self-hosted playback.",
      "Run build — generateStaticParams picks up new slugs automatically.",
    ],
  },
  {
    type: "guide",
    title: "Financing guide",
    summary: "Scenario / guide page under /guides/[slug].",
    files: [
      "app/lib/scenario-registry.ts",
      "app/guides/[slug]/page.tsx (or registry host)",
    ],
    steps: [
      "Register the guide in scenario-registry with audience, href, and related video slugs.",
      "Link from hero videos, featured slots, and related-content rails.",
    ],
  },
  {
    type: "market",
    title: "Metro market page",
    summary: "GEO landing under /markets/[slug].",
    files: ["app/lib/geo-markets.ts", "app/markets/[slug]/page.tsx"],
    steps: [
      "Add market entry in geo-markets with stateKey and hero focus.",
      "Cross-link from topic cluster puget-sound and relevant hero videos.",
    ],
  },
  {
    type: "local-commentary",
    title: "Topic cluster commentary",
    summary: "Regional narrative reused on videos, featured content, and state pages.",
    files: ["app/lib/content-engine.ts (topicClusters)", "app/lib/local-authority.ts"],
    steps: [
      "Update topicClusters[id].commentary for the region narrative.",
      "Use getLocalAuthoritySnippet(audience) on audience hubs for subtle local copy.",
    ],
  },
  {
    type: "featured-slot",
    title: "Featured content on a surface",
    summary: "Homepage, buyers, homeowners, or agents featured rail.",
    files: ["app/lib/content-engine.ts (featuredSlotsBySurface)"],
    steps: [
      "Edit featuredSlotsBySurface[surface] in content-engine.ts.",
      "Ensure referenced video and guide slugs exist.",
    ],
  },
];

export function listPublishedHeroSlugs() {
  return heroVideos.map((video) => video.slug);
}

export function listMarketSlugs() {
  return geoMarkets.map((market) => market.slug);
}

export function listHostedGuideSlugs() {
  return [...hostedScenarioSlugs];
}

export function listTopicClusterIds() {
  return Object.keys(topicClusters);
}

export function getPublishingRecipe(type: PublishingContentType) {
  return publishingRecipes.find((recipe) => recipe.type === type);
}
