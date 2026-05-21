import type { MetadataRoute } from "next";
import { SEO_LANDING_SLUGS } from "../deal-analyzer/lib/seo-landing-content";
import { geoMarkets } from "./geo-markets";
import { heroVideos } from "./hero-videos";
import { learnArticles } from "./learn-articles";
import { scenarioFunnels } from "./scenario-funnels";
import { stateMarkets } from "./state-markets";

/** Canonical production origin for sitemap and robots. */
export const SITEMAP_BASE_URL = "https://theloanplaybook.com";

const staticLearnSlugs = [
  "buyer-readiness",
  "refinance-timing",
  "heloc-strategy",
  "seller-concessions",
  "2-1-buydowns",
] as const;

const corePaths = [
  "/",
  "/about",
  "/apply",
  "/agents",
  "/agents/financing-playbook",
  "/buyers",
  "/homeowners",
  "/commercial",
  "/commercial-capital-matchmaker",
  "/commercial-capital-matchmaker/intake",
  "/commercial-capital-matchmaker/results",
  "/commercial-capital-matchmaker/summary",
  "/commercial-capital-matchmaker/admin",
  "/investors",
  "/partners",
  "/privacy",
  "/terms",
  "/guides",
  "/learn",
  "/markets",
  "/social",
  "/strategy",
  "/strategy-review",
  "/videos",
] as const;

function normalizePath(path: string) {
  if (!path || path === "/") return "/";
  const withSlash = path.startsWith("/") ? path : `/${path}`;
  return withSlash.replace(/\/+$/, "") || "/";
}

function addPath(paths: Set<string>, path: string) {
  paths.add(normalizePath(path));
}

/** All public, indexable paths (deduped). Safe for server-only sitemap generation. */
export function getPublicSitemapPaths(): string[] {
  const paths = new Set<string>();

  for (const path of corePaths) {
    addPath(paths, path);
  }

  for (const state of stateMarkets) {
    addPath(paths, `/${state.routeSlug}`);
  }

  for (const market of geoMarkets) {
    addPath(paths, `/markets/${market.slug}`);
  }

  for (const funnel of Object.values(scenarioFunnels)) {
    addPath(paths, `/guides/${funnel.slug}`);
  }

  for (const article of learnArticles) {
    addPath(paths, `/learn/${article.slug}`);
  }

  for (const slug of staticLearnSlugs) {
    addPath(paths, `/learn/${slug}`);
  }

  for (const video of heroVideos) {
    if (video.status === "published") {
      addPath(paths, `/videos/${video.slug}`);
    }
  }

  addPath(paths, "/deal-analyzer");
  addPath(paths, "/deal-analyzer/analyze");
  for (const slug of SEO_LANDING_SLUGS) {
    addPath(paths, `/deal-analyzer/${slug}`);
  }

  return [...paths].sort((a, b) => a.localeCompare(b));
}

type SitemapPriority = MetadataRoute.Sitemap[number]["priority"];
type SitemapFrequency = MetadataRoute.Sitemap[number]["changeFrequency"];

function getPriority(path: string): SitemapPriority {
  if (path === "/") return 1;
  if (
    [
      "/buyers",
      "/homeowners",
      "/agents",
      "/commercial",
      "/videos",
      "/strategy-review",
      "/apply",
    ].includes(path)
  ) {
    return 0.9;
  }
  if (
    path === "/learn" ||
    path === "/guides" ||
    path === "/markets" ||
    path.startsWith("/washington-mortgage") ||
    path.endsWith("-mortgage")
  ) {
    return 0.8;
  }
  if (path.startsWith("/videos/") || path.startsWith("/guides/")) {
    return 0.7;
  }
  if (path.startsWith("/deal-analyzer/") && path !== "/deal-analyzer/analyze") {
    return 0.75;
  }
  if (path === "/deal-analyzer") {
    return 0.8;
  }
  return 0.6;
}

function getChangeFrequency(path: string): SitemapFrequency {
  if (path === "/") return "weekly";
  if (
    path === "/videos" ||
    path === "/learn" ||
    path === "/markets" ||
    path.startsWith("/videos/")
  ) {
    return "weekly";
  }
  if (path === "/strategy-review" || path === "/apply") {
    return "monthly";
  }
  return "monthly";
}

export function buildSitemapEntry(path: string): MetadataRoute.Sitemap[number] {
  const normalized = normalizePath(path);
  const url =
    normalized === "/"
      ? SITEMAP_BASE_URL
      : `${SITEMAP_BASE_URL}${normalized}`;

  return {
    url,
    lastModified: new Date(),
    changeFrequency: getChangeFrequency(normalized),
    priority: getPriority(normalized),
  };
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
  return getPublicSitemapPaths().map(buildSitemapEntry);
}
