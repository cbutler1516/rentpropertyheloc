import type { SocialPlatform } from "./social-links";

export type SocialPost = {
  slug: string;
  platform: Exclude<SocialPlatform, "Broadview Lending">;
  postUrl: string;
  title: string;
  topic: string;
  category: string;
  thumbnail: string;
  thumbnailSrc?: string;
  runtime?: string;
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
    title: "Before Zillow, know your number.",
    topic: "Buyer readiness",
    category: "Buyer Education",
    thumbnail: "Live TikTok",
    shortSummary:
      "Payment and cash clarity before the search gets emotional.",
    relatedLearnArticle: {
      href: "/learn/seller-concessions",
      label: "Explore Guide",
    },
    landingPageSlug: "buyer-readiness-before-search",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Watch",
      href: "https://www.tiktok.com/@theloanplaybook/video/7637204481389726990",
    },
    embedUrl: tiktokEmbedUrl("7637204481389726990"),
    status: "published",
  },
  {
    slug: "mortgage-strategy-clear-idea",
    platform: "TikTok",
    postUrl: "https://www.tiktok.com/@theloanplaybook/video/7608394728236780814",
    title: "Most buyers focus on the wrong number.",
    topic: "Mortgage structure",
    category: "Mortgage Strategy",
    thumbnail: "Live TikTok",
    shortSummary:
      "A clearer way to think about payment before the offer.",
    relatedLearnArticle: {
      href: "/learn/2-1-buydowns",
      label: "Explore Guide",
    },
    landingPageSlug: "mortgage-strategy-clear-idea",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Watch",
      href: "https://www.tiktok.com/@theloanplaybook/video/7608394728236780814",
    },
    embedUrl: tiktokEmbedUrl("7608394728236780814"),
    status: "published",
  },
  {
    slug: "market-context-without-noise",
    platform: "TikTok",
    postUrl: "https://www.tiktok.com/@theloanplaybook/video/7598267421841050894",
    title: "Rates moved. What actually changes?",
    topic: "Market context",
    category: "Market Update",
    thumbnail: "Live TikTok",
    shortSummary:
      "Payment, timing, and confidence after the market moves.",
    relatedLearnArticle: {
      href: "/learn/refinance-timing",
      label: "Review Timing",
    },
    landingPageSlug: "market-context-without-noise",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Watch",
      href: "https://www.tiktok.com/@theloanplaybook/video/7598267421841050894",
    },
    embedUrl: tiktokEmbedUrl("7598267421841050894"),
    status: "published",
  },
  {
    slug: "agent-financing-conversation",
    platform: "TikTok",
    postUrl: "https://www.tiktok.com/@theloanplaybook/video/7584678562507132215",
    title: "The pre-approval is not the whole story.",
    topic: "Agent education",
    category: "Agent Strategy",
    thumbnail: "Live TikTok",
    shortSummary:
      "A better financing conversation before the offer.",
    relatedLearnArticle: {
      href: "/learn/jumbo-loans",
      label: "Agent Playbook",
    },
    landingPageSlug: "agent-financing-conversation",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Watch",
      href: "https://www.tiktok.com/@theloanplaybook/video/7584678562507132215",
    },
    embedUrl: tiktokEmbedUrl("7584678562507132215"),
    status: "published",
  },
  {
    slug: "creative-mortgage-media-test",
    platform: "TikTok",
    postUrl: "https://www.tiktok.com/@theloanplaybook/video/7584525269541686558",
    title: "Mortgage content should not feel like rate ads.",
    topic: "Creative media",
    category: "Creative / AI Marketing",
    thumbnail: "Live TikTok",
    shortSummary:
      "Premium media energy for serious mortgage education.",
    relatedLearnArticle: {
      href: "/learn/heloc-strategy",
      label: "Explore Equity",
    },
    landingPageSlug: "creative-mortgage-media-test",
    transcript: "Transcript pending. This field is ready for manual import.",
    cta: {
      label: "Watch",
      href: "https://www.tiktok.com/@theloanplaybook/video/7584525269541686558",
    },
    embedUrl: tiktokEmbedUrl("7584525269541686558"),
    status: "published",
  },
];

export function getSocialPostBySlug(slug: string) {
  return socialPosts.find((post) => post.slug === slug);
}
