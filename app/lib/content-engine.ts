import { getGeoMarketBySlug } from "./geo-markets";
import {
  getScenarioBySlug,
  getScenariosByAudience,
  type ScenarioAudience,
} from "./scenario-registry";
import { getSocialPostBySlug, socialPosts } from "./social-posts";
import { getStateMarketByRouteSlug } from "./state-markets";

export type ContentAudience = ScenarioAudience;
export type ContentSurface =
  | "homepage"
  | "buyers"
  | "homeowners"
  | "agents"
  | "commercial";

export type FeaturedContentType = "video" | "guide" | "market" | "commentary";

export type FeaturedContentItem = {
  type: FeaturedContentType;
  label: string;
  title: string;
  excerpt: string;
  href: string;
};

export type TopicCluster = {
  id: string;
  name: string;
  regionLabel: string;
  commentary: string;
  guideSlugs: string[];
  marketSlugs: string[];
  videoSlugs: string[];
  stateRouteSlug?: string;
};

export type RelatedContentBundle = {
  guideSlugs: string[];
  marketSlugs: string[];
  videoSlugs: string[];
  stateRouteSlugs: string[];
  guideLinks: Array<{ label: string; title: string; href: string }>;
};

export type OptInCopy = {
  title: string;
  body: string;
  submitLabel: string;
  optInType: string;
};

export const topicClusters: Record<string, TopicCluster> = {
  "puget-sound": {
    id: "puget-sound",
    name: "Puget Sound & Eastside",
    regionLabel: "Washington",
    commentary:
      "Seattle, Bellevue, Kirkland, and the Eastside reward buyers who show up with financing clarity early—especially for condos, jumbo paths, tech income, and buy-before-sell timing.",
    guideSlugs: [
      "buy-before-sell",
      "jumbo-buyers",
      "condo-financing",
      "self-employed-borrowers",
      "first-time-buyers",
    ],
    marketSlugs: ["seattle", "bellevue", "kirkland", "tacoma"],
    videoSlugs: [
      "buyer-preapproval-first-step",
      "buyer-jumbo-loan-myths",
      "homeowner-buy-before-sell-program",
    ],
    stateRouteSlug: "washington-mortgage",
  },
};

type FeaturedSlot =
  | { type: "video"; videoSlug: string }
  | { type: "guide"; guideSlug: string }
  | { type: "market"; marketSlug: string }
  | { type: "commentary"; topicClusterId: string };

const featuredSlotsBySurface: Record<ContentSurface, FeaturedSlot[]> = {
  homepage: [
    { type: "video", videoSlug: "buyer-preapproval-first-step" },
    { type: "guide", guideSlug: "buy-before-sell" },
    { type: "commentary", topicClusterId: "puget-sound" },
  ],
  buyers: [
    { type: "video", videoSlug: "buyer-preapproval-first-step" },
    { type: "guide", guideSlug: "first-time-buyers" },
    { type: "market", marketSlug: "seattle" },
  ],
  homeowners: [
    { type: "video", videoSlug: "homeowner-refinance-break-even-roi" },
    { type: "guide", guideSlug: "refinance-timing" },
    { type: "guide", guideSlug: "heloc-strategy" },
  ],
  agents: [
    { type: "video", videoSlug: "buyer-prequalified-vs-preapproved" },
    { type: "guide", guideSlug: "agent-financing" },
    { type: "market", marketSlug: "bellevue" },
  ],
  commercial: [
    { type: "guide", guideSlug: "investment-property-strategy" },
    { type: "guide", guideSlug: "dscr-overview" },
    { type: "commentary", topicClusterId: "puget-sound" },
  ],
};

export const optInCopyByAudience: Record<ContentAudience, OptInCopy> = {
  buyer: {
    title: "Puget Sound buyer briefings",
    body: "Payment clarity, offer prep, and local market notes—no rate spam.",
    submitLabel: "Get Buyer Briefings",
    optInType: "Buyer Market Briefings",
  },
  homeowner: {
    title: "Homeowner timing notes",
    body: "Refinance, HELOC, and equity context when the market moves.",
    submitLabel: "Get Timing Notes",
    optInType: "Homeowner Timing Notes",
  },
  agent: {
    title: "Agent financing briefings",
    body: "Buyer conversation context and local market framing for your clients.",
    submitLabel: "Get Agent Briefings",
    optInType: "Agent Financing Briefings",
  },
  commercial: {
    title: "Investor structure updates",
    body: "Rental, DSCR, and commercial-adjacent financing context.",
    submitLabel: "Get Investor Updates",
    optInType: "Investor Structure Updates",
  },
};

function unique<T>(values: T[]) {
  return [...new Set(values)];
}

function resolveFeaturedSlot(slot: FeaturedSlot): FeaturedContentItem | null {
  if (slot.type === "video") {
    const video = getSocialPostBySlug(slot.videoSlug);
    if (!video) return null;
    return {
      type: "video",
      label: video.category,
      title: video.title,
      excerpt: video.shortSummary,
      href: `/videos/${video.slug}`,
    };
  }

  if (slot.type === "guide") {
    const guide = getScenarioBySlug(slot.guideSlug);
    if (!guide) return null;
    return {
      type: "guide",
      label: "Financing Guide",
      title: guide.title,
      excerpt: guide.emotionalHook,
      href: guide.href,
    };
  }

  if (slot.type === "market") {
    const market = getGeoMarketBySlug(slot.marketSlug);
    if (!market) return null;
    return {
      type: "market",
      label: market.regionLabel,
      title: market.name,
      excerpt: market.heroLead,
      href: `/markets/${market.slug}`,
    };
  }

  const cluster = topicClusters[slot.topicClusterId];
  if (!cluster) return null;
  return {
    type: "commentary",
    label: cluster.regionLabel,
    title: cluster.name,
    excerpt: cluster.commentary,
    href: cluster.stateRouteSlug
      ? `/${cluster.stateRouteSlug}`
      : `/markets/${cluster.marketSlugs[0] ?? ""}`,
  };
}

export function getFeaturedContent(surface: ContentSurface, limit = 3) {
  return featuredSlotsBySurface[surface]
    .map(resolveFeaturedSlot)
    .filter((item): item is FeaturedContentItem => Boolean(item))
    .slice(0, limit);
}

export function getRelatedBundle(input: {
  audience?: ContentAudience;
  topicClusterId?: string;
  guideSlugs?: string[];
  marketSlugs?: string[];
  videoSlugs?: string[];
  stateRouteSlugs?: string[];
  guideLinks?: Array<{ label: string; title: string; href: string }>;
  limitPerType?: number;
}): RelatedContentBundle {
  const cluster = input.topicClusterId
    ? topicClusters[input.topicClusterId]
    : undefined;
  const limit = input.limitPerType ?? 4;

  const guideSlugs = unique([
    ...(input.guideSlugs ?? []),
    ...(cluster?.guideSlugs ?? []),
    ...(input.audience
      ? getScenariosByAudience(input.audience).slice(0, 2).map((g) => g.slug)
      : []),
  ]).slice(0, limit);

  const marketSlugs = unique([
    ...(input.marketSlugs ?? []),
    ...(cluster?.marketSlugs ?? []),
  ]).slice(0, limit);

  const videoSlugs = unique([
    ...(input.videoSlugs ?? []),
    ...(cluster?.videoSlugs ?? []),
  ]).slice(0, limit);

  const stateRouteSlugs = unique([
    ...(input.stateRouteSlugs ?? []),
    ...(cluster?.stateRouteSlug ? [cluster.stateRouteSlug] : []),
  ]);

  const guideLinks = input.guideLinks ?? [];

  return {
    guideSlugs,
    marketSlugs,
    videoSlugs,
    stateRouteSlugs,
    guideLinks,
  };
}

export function getTopicCluster(id: string) {
  return topicClusters[id];
}

export function getVideoPublishingContext(slug: string) {
  const post = getSocialPostBySlug(slug);
  if (!post) return null;

  const cluster = post.topicClusterId
    ? topicClusters[post.topicClusterId]
    : undefined;

  const audience: ContentAudience =
    (post.audience as ContentAudience | undefined) ?? "buyer";

  const related = getRelatedBundle({
    audience,
    topicClusterId: post.topicClusterId,
    guideSlugs: post.guideSlugs,
    marketSlugs: post.marketSlugs,
    guideLinks: [
      ...(post.relatedLearnArticle
        ? [
            {
              label: "Learn",
              title: post.relatedLearnArticle.label,
              href: post.relatedLearnArticle.href,
            },
          ]
        : []),
      ...(post.relatedGuideHrefs?.map((guide) => ({
        label: "Guide",
        title: guide.label,
        href: guide.href,
      })) ?? []),
    ],
  });

  return {
    post,
    cluster,
    audience,
    related,
    optIn: optInCopyByAudience[audience],
  };
}

export function formatTranscriptParagraphs(
  transcript?: string,
  paragraphs?: string[],
) {
  if (paragraphs && paragraphs.length > 0) return paragraphs;
  if (!transcript) return [];
  return transcript
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
}

export function getPublishedVideos() {
  return socialPosts.filter((post) => post.status === "published");
}

export function getStateMarketSummary(routeSlug: string) {
  return getStateMarketByRouteSlug(routeSlug);
}
