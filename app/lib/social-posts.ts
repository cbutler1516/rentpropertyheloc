import type { SocialPlatform } from "./social-links";

export type SocialPost = {
  slug: string;
  platform: Exclude<SocialPlatform, "Broadview Lending">;
  postUrl: string;
  title: string;
  topic: string;
  category: string;
  thumbnail: string;
  shortSummary: string;
  relatedLearnArticle?: {
    href: string;
    label: string;
  };
  landingPageSlug: string;
  transcript?: string;
  cta: {
    label: string;
    href: string;
  };
  embedUrl?: string;
  status: "published" | "planned";
};

function tiktokEmbedUrl(videoId: string) {
  return `https://www.tiktok.com/embed/v2/${videoId}`;
}

export const socialPosts: SocialPost[] = [
  {
    slug: "buyer-readiness-before-search",
    platform: "TikTok",
    postUrl: "https://www.tiktok.com/@theloanplaybook/video/7637204481389726990",
    title: "Buyer readiness before the search starts",
    topic: "Buyer readiness",
    category: "Buyer Education",
    thumbnail: "Live TikTok",
    shortSummary:
      "A short clip on why buyers should understand the file, payment, and next steps before shopping gets serious.",
    relatedLearnArticle: {
      href: "/learn/seller-concessions",
      label: "Read buyer strategy guides",
    },
    landingPageSlug: "buyer-readiness-before-search",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Watch Clip",
      href: "https://www.tiktok.com/@theloanplaybook/video/7637204481389726990",
    },
    embedUrl: tiktokEmbedUrl("7637204481389726990"),
    status: "published",
  },
  {
    slug: "mortgage-strategy-clear-idea",
    platform: "TikTok",
    postUrl: "https://www.tiktok.com/@theloanplaybook/video/7608394728236780814",
    title: "Mortgage strategy in one clear idea",
    topic: "Mortgage structure",
    category: "Mortgage Strategy",
    thumbnail: "Live TikTok",
    shortSummary:
      "A strategy-style clip designed to make one mortgage decision easier to understand without quoting rates.",
    relatedLearnArticle: {
      href: "/learn/2-1-buydowns",
      label: "Read the 2-1 buydown guide",
    },
    landingPageSlug: "mortgage-strategy-clear-idea",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Open on TikTok",
      href: "https://www.tiktok.com/@theloanplaybook/video/7608394728236780814",
    },
    embedUrl: tiktokEmbedUrl("7608394728236780814"),
    status: "published",
  },
  {
    slug: "market-context-without-noise",
    platform: "TikTok",
    postUrl: "https://www.tiktok.com/@theloanplaybook/video/7598267421841050894",
    title: "Market context without the noise",
    topic: "Market context",
    category: "Market Update",
    thumbnail: "Live TikTok",
    shortSummary:
      "A market-context clip for translating changing conditions into practical borrower and agent conversations.",
    relatedLearnArticle: {
      href: "/learn/refinance-timing",
      label: "Read the refinance timing guide",
    },
    landingPageSlug: "market-context-without-noise",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Watch Market Clip",
      href: "https://www.tiktok.com/@theloanplaybook/video/7598267421841050894",
    },
    embedUrl: tiktokEmbedUrl("7598267421841050894"),
    status: "published",
  },
  {
    slug: "agent-financing-conversation",
    platform: "TikTok",
    postUrl: "https://www.tiktok.com/@theloanplaybook/video/7584678562507132215",
    title: "Agent-facing financing conversation",
    topic: "Agent education",
    category: "Agent Strategy",
    thumbnail: "Live TikTok",
    shortSummary:
      "A clip for agents who want cleaner buyer conversations around financing readiness and expectations.",
    relatedLearnArticle: {
      href: "/learn/jumbo-loans",
      label: "Read the jumbo loan guide",
    },
    landingPageSlug: "agent-financing-conversation",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Watch Agent Clip",
      href: "https://www.tiktok.com/@theloanplaybook/video/7584678562507132215",
    },
    embedUrl: tiktokEmbedUrl("7584678562507132215"),
    status: "published",
  },
  {
    slug: "creative-mortgage-media-test",
    platform: "TikTok",
    postUrl: "https://www.tiktok.com/@theloanplaybook/video/7584525269541686558",
    title: "Creative mortgage media test",
    topic: "Creative media",
    category: "Creative / AI Marketing",
    thumbnail: "Live TikTok",
    shortSummary:
      "A creative slot showing how mortgage education can feel more like premium media than rate advertising.",
    relatedLearnArticle: {
      href: "/learn/heloc-strategy",
      label: "Read the HELOC strategy guide",
    },
    landingPageSlug: "creative-mortgage-media-test",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Open Creative Clip",
      href: "https://www.tiktok.com/@theloanplaybook/video/7584525269541686558",
    },
    embedUrl: tiktokEmbedUrl("7584525269541686558"),
    status: "published",
  },
];

export function getSocialPostBySlug(slug: string) {
  return socialPosts.find((post) => post.slug === slug);
}
