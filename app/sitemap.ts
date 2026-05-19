import type { MetadataRoute } from "next";
import { geoMarkets } from "./lib/geo-markets";
import { learnArticles } from "./lib/learn-articles";
import { scenarioRegistry, hostedScenarioSlugs } from "./lib/scenario-registry";
import { socialPosts } from "./lib/social-posts";
import { stateMarkets } from "./lib/state-markets";

const siteUrl = "https://www.theloanplaybook.com";

const staticLearnPages = [
  "buyer-readiness",
  "refinance-timing",
  "heloc-strategy",
  "seller-concessions",
  "2-1-buydowns",
] as const;

const corePages = [
  "",
  "/about",
  "/agents",
  "/agents/financing-playbook",
  "/apply",
  "/buyers",
  "/commercial",
  "/guides",
  "/learn",
  "/markets",
  "/partners",
  "/social",
  "/strategy",
  "/videos",
];

function entry(path: string): MetadataRoute.Sitemap[number] {
  return {
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const guidePaths = new Set<string>([
    ...hostedScenarioSlugs.map((slug) => `/guides/${slug}`),
    ...scenarioRegistry.map((item) => item.href).filter((href) => href.startsWith("/guides/")),
  ]);

  const learnPaths = new Set<string>(
    learnArticles.map((article) => `/learn/${article.slug}`),
  );
  for (const slug of staticLearnPages) {
    learnPaths.add(`/learn/${slug}`);
  }

  return [
    ...corePages.map((path) => entry(path)),
    ...stateMarkets.map((state) => entry(`/${state.routeSlug}`)),
    ...geoMarkets.map((market) => entry(`/markets/${market.slug}`)),
    ...Array.from(guidePaths).map((path) => entry(path)),
    ...Array.from(learnPaths).map((path) => entry(path)),
    ...socialPosts
      .filter((post) => post.status === "published")
      .map((post) => entry(`/videos/${post.slug}`)),
  ];
}
