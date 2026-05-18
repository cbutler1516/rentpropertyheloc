import type { SocialPlatform } from "./social-links";

export type VideoContent = {
  title: string;
  platform: SocialPlatform | "Facebook Reels" | "Instagram Reels" | "YouTube Shorts";
  category: string;
  description: string;
  thumbnailLabel: string;
  thumbnailSrc?: string;
  thumbnailFocalPoint?: string;
  runtime?: string;
  embedUrl: string;
  ctaHref: string;
  ctaLabel: string;
  relatedArticleHref?: string;
  relatedArticleLabel?: string;
  status?: "published" | "planned" | "todo";
};

export type ExternalArticle = {
  title: string;
  source: string;
  category: string;
  excerpt: string;
  href: string;
  status?: "placeholder" | "import-ready";
};

export type HubLink = {
  label: string;
  title: string;
  body: string;
  href: string;
  external?: boolean;
};

const TODO_VIDEO_URL = "/videos";
const TODO_EMBED_URL = "Embed URL pending";

function tiktokEmbedUrl(videoId: string) {
  return `https://www.tiktok.com/embed/v2/${videoId}`;
}

export const videoSections: Array<{
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  videos: VideoContent[];
}> = [
  {
    id: "tiktok",
    eyebrow: "TikTok",
    title: "Short mortgage plays built for fast discovery.",
    lead: "TikTok slots are prepared for quick borrower education, myth-busting, and one-idea lending explainers.",
    videos: [
      {
        title: "Before Zillow, know your number.",
        platform: "TikTok",
        category: "Buyer Education",
        description:
          "Payment and cash clarity before the search gets emotional.",
        thumbnailLabel: "Live TikTok",
        thumbnailSrc: "/thumbnails/buyer-readiness.jpg",
        embedUrl: tiktokEmbedUrl("7637204481389726990"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7637204481389726990",
        ctaLabel: "Watch",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Explore Guide",
        status: "published",
      },
      {
        title: "Most buyers focus on the wrong number.",
        platform: "TikTok",
        category: "Mortgage Strategy",
        description:
          "A clearer way to think about payment before the offer.",
        thumbnailLabel: "Live TikTok",
        thumbnailSrc: "/thumbnails/two-one-buydown.jpg",
        embedUrl: tiktokEmbedUrl("7608394728236780814"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7608394728236780814",
        ctaLabel: "Watch",
        relatedArticleHref: "/learn/2-1-buydowns",
        relatedArticleLabel: "Explore Guide",
        status: "published",
      },
      {
        title: "Rates moved. What actually changes?",
        platform: "TikTok",
        category: "Market Update",
        description:
          "Payment, timing, and confidence after the market moves.",
        thumbnailLabel: "Live TikTok",
        thumbnailSrc: "/thumbnails/refinance-timing.jpg",
        embedUrl: tiktokEmbedUrl("7598267421841050894"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7598267421841050894",
        ctaLabel: "Watch",
        relatedArticleHref: "/learn/refinance-timing",
        relatedArticleLabel: "Review Timing",
        status: "published",
      },
      {
        title: "The pre-approval is not the whole story.",
        platform: "TikTok",
        category: "Agent Strategy",
        description:
          "A better financing conversation before the offer.",
        thumbnailLabel: "Live TikTok",
        thumbnailSrc: "/thumbnails/agent-financing-playbook.jpg",
        embedUrl: tiktokEmbedUrl("7584678562507132215"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7584678562507132215",
        ctaLabel: "Watch",
        relatedArticleHref: "/learn/jumbo-loans",
        relatedArticleLabel: "Explore Guide",
        status: "published",
      },
      {
        title: "Mortgage content should not feel like rate ads.",
        platform: "TikTok",
        category: "Creative / AI Marketing",
        description:
          "Premium media energy for serious mortgage education.",
        thumbnailLabel: "Live TikTok",
        thumbnailSrc: "/thumbnails/heloc-strategy.jpg",
        embedUrl: tiktokEmbedUrl("7584525269541686558"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7584525269541686558",
        ctaLabel: "Watch",
        relatedArticleHref: "/learn/heloc-strategy",
        relatedArticleLabel: "Explore Equity",
        status: "published",
      },
      {
        title: "Can the first-year payment breathe?",
        platform: "TikTok",
        category: "Short-form mortgage play",
        description:
          "Temporary relief only works when the full path fits.",
        thumbnailLabel: "TikTok thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/2-1-buydowns",
        relatedArticleLabel: "Explore Guide",
        status: "todo",
      },
      {
        title: "FHA does not mean weak buyer.",
        platform: "TikTok",
        category: "Buyer education",
        description:
          "A better way to explain buyer strength.",
        thumbnailLabel: "TikTok thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/fha-loans",
        relatedArticleLabel: "Explore Guide",
        status: "todo",
      },
    ],
  },
  {
    id: "instagram-reels",
    eyebrow: "Instagram Reels",
    title: "Visual explainers for buyers, agents, and partners.",
    lead: "Instagram content can hold polished Reels, carousel scripts, and concise strategy clips.",
    videos: [
      {
        title: "A credit may beat a price cut.",
        platform: "Instagram Reels",
        category: "Offer strategy",
        description:
          "Cash, payment, and leverage in one offer move.",
        thumbnailLabel: "Instagram thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Explore Guide",
        status: "todo",
      },
      {
        title: "The number buyers forget.",
        platform: "Instagram Reels",
        category: "Buyer education",
        description:
          "Down payment is only part of the cash story.",
        thumbnailLabel: "Instagram thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Read about credits and cash-to-close",
        status: "todo",
      },
    ],
  },
  {
    id: "facebook-reels",
    eyebrow: "Facebook Reels",
    title: "Educational reposts for broader buyer audiences.",
    lead: "Facebook Reels can carry practical mortgage education without turning the hub into rate advertising.",
    videos: [
      {
        title: "Credits change the offer conversation.",
        platform: "Facebook Reels",
        category: "Agent education",
        description:
          "Where negotiation terms meet monthly payment.",
        thumbnailLabel: "Facebook thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Explore Guide",
        status: "todo",
      },
      {
        title: "Most buyers start too late.",
        platform: "Facebook Reels",
        category: "Buyer readiness",
        description:
          "The file should be built before the house appears.",
        thumbnailLabel: "Facebook thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/buyers",
        relatedArticleLabel: "Explore buyer resources",
        status: "todo",
      },
    ],
  },
  {
    id: "youtube-shorts",
    eyebrow: "YouTube Shorts",
    title: "Searchable short-form education with room to grow.",
    lead: "YouTube Shorts can become the bridge between social clips and deeper long-form explainers.",
    videos: [
      {
        title: "Pre-approval is not the finish line.",
        platform: "YouTube Shorts",
        category: "Featured play",
        description:
          "The letter matters. The file matters more.",
        thumbnailLabel: "YouTube thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/buyers",
        relatedArticleLabel: "Explore buyer resources",
        status: "todo",
      },
      {
        title: "Your payment is not just the rate.",
        platform: "YouTube Shorts",
        category: "Buyer education",
        description:
          "Taxes, insurance, credits, and timing all show up monthly.",
        thumbnailLabel: "YouTube thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Read about payment structure",
        status: "todo",
      },
    ],
  },
  {
    id: "long-form-explainers",
    eyebrow: "Long-Form Explainers",
    title: "Deeper film-room breakdowns for complex decisions.",
    lead: "Long-form slots are prepared for embeds, chapters, scripts, and educational disclaimers.",
    videos: [
      {
        title: "Should you refinance or wait?",
        platform: "YouTube",
        category: "Long-form explainer",
        description:
          "Timing is payment, cost, cash flow, and horizon.",
        thumbnailLabel: "Long-form thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/refinance-timing",
        relatedArticleLabel: "Review Timing",
        status: "todo",
      },
      {
        title: "Credit or price cut?",
        platform: "YouTube",
        category: "Strategy explainer",
        description:
          "The better move depends on cash and payment.",
        thumbnailLabel: "Long-form thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Explore Guide",
        status: "todo",
      },
    ],
  },
  {
    id: "market-updates",
    eyebrow: "Market Updates",
    title: "Market context without panic or noise.",
    lead: "These formats turn rate movement, inventory shifts, affordability pressure, and refinance timing into educational context.",
    videos: [
      {
        title: "Rates moved. Now what?",
        platform: "YouTube Shorts",
        category: "Market update",
        description:
          "Recalculate payment before reacting.",
        thumbnailLabel: "Market thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/refinance-timing",
        relatedArticleLabel: "Review Timing",
        status: "todo",
      },
      {
        title: "When sellers have room to negotiate.",
        platform: "Instagram Reels",
        category: "Market update",
        description:
          "Inventory can change the financing conversation.",
        thumbnailLabel: "Market thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Read offer strategy guides",
        status: "todo",
      },
    ],
  },
  {
    id: "agent-education",
    eyebrow: "Agent Education",
    title: "Videos agents can use to create better buyer conversations.",
    lead: "Agent-facing content should be practical, clear, and repostable without sounding like generic mortgage marketing.",
    videos: [
      {
        title: "Ask this before the first showing.",
        platform: "Instagram Reels",
        category: "Agent education",
        description:
          "A cleaner buyer conversation starts earlier.",
        thumbnailLabel: "Agent thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/agents",
        relatedArticleLabel: "Agent Playbook",
        status: "todo",
      },
      {
        title: "What makes a buyer actually ready?",
        platform: "TikTok",
        category: "Agent education",
        description:
          "The signals behind a stronger file.",
        thumbnailLabel: "Agent thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/agents",
        relatedArticleLabel: "Agent Playbook",
        status: "todo",
      },
    ],
  },
  {
    id: "buyer-education",
    eyebrow: "Buyer Education",
    title: "Buyer-ready explainers that reduce confusion early.",
    lead: "These videos help borrowers understand the decisions behind the loan before urgency and deadlines take over.",
    videos: [
      {
        title: "Know your file before the lender does.",
        platform: "YouTube Shorts",
        category: "Buyer education",
        description:
          "Income, credit, cash, debt, timing, documents.",
        thumbnailLabel: "Buyer thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/buyers",
        relatedArticleLabel: "Start Buyer Path",
        status: "todo",
      },
      {
        title: "Design the payment before shopping.",
        platform: "Instagram Reels",
        category: "Buyer education",
        description:
          "Rate is only one part of the monthly number.",
        thumbnailLabel: "Buyer thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Understand Payment",
        status: "todo",
      },
    ],
  },
  {
    id: "ai-sora",
    eyebrow: "AI / Sora Creative Mortgage Videos",
    title: "Cinematic strategy visuals for future content systems.",
    lead: "Experimental concepts for turning lending strategy into premium visual language without sports logos, generic mortgage imagery, or salesy content.",
    videos: [
      {
        title: "Mortgage education should feel cinematic.",
        platform: "YouTube",
        category: "AI / Sora",
        description:
          "Visual tests for premium mortgage storytelling.",
        thumbnailLabel: "AI thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/videos",
        relatedArticleLabel: "Media Hub",
        status: "todo",
      },
      {
        title: "Every loan has a route.",
        platform: "Instagram Reels",
        category: "AI / Sora",
        description:
          "Decision paths, made visual.",
        thumbnailLabel: "AI thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn",
        relatedArticleLabel: "Learn Hub",
        status: "todo",
      },
    ],
  },
];

export const broadviewArticles: ExternalArticle[] = [
  {
    title: "Fed Presses Pause on Rate Cuts",
    source: "Broadview Lending",
    category: "Market commentary",
    excerpt:
      "Placeholder import slot for Broadview market commentary. Educational only and not a rate quote or loan approval.",
    href: "https://www.broadviewlending.com/blog",
    status: "placeholder",
  },
  {
    title: "How to Market Yourself as an Investor-Friendly Real Estate Agent",
    source: "Broadview Lending",
    category: "Agent education",
    excerpt:
      "Placeholder import slot for agent-facing investor content from the Broadview Lending blog.",
    href: "https://www.broadviewlending.com/blog",
    status: "placeholder",
  },
  {
    title: "Existing Home Sales Hit 10-Month High",
    source: "Broadview Lending",
    category: "Housing market",
    excerpt:
      "Placeholder import slot for housing market context that can support future Learn hub articles.",
    href: "https://www.broadviewlending.com/blog",
    status: "placeholder",
  },
  {
    title: "December Brought Big Upside Jobs Surprise",
    source: "Broadview Lending",
    category: "Economic update",
    excerpt:
      "Placeholder import slot for labor market commentary and borrower education context.",
    href: "https://www.broadviewlending.com/blog",
    status: "placeholder",
  },
  {
    title: "Pending Home Sales and Home Prices Rise",
    source: "Broadview Lending",
    category: "Housing market",
    excerpt:
      "Placeholder import slot for market trend coverage that can become a future Loan Playbook explainer.",
    href: "https://www.broadviewlending.com/blog",
    status: "placeholder",
  },
];

export const homeHubLinks: HubLink[] = [
  {
    label: "Learn",
    title: "Education hub",
    body: "Loan guides, buyer strategy, agent education, and Broadview Lending article imports.",
    href: "/learn",
  },
  {
    label: "Videos",
    title: "Media hub",
    body: "TikTok, Reels, Shorts, explainers, market updates, and creative mortgage videos.",
    href: "/videos",
  },
  {
    label: "Agents",
    title: "Agent platform",
    body: "Content, market intelligence, and transaction education for real estate partners.",
    href: "/agents",
  },
  {
    label: "Partners",
    title: "Partner platform",
    body: "Brokerage and leadership-level lending education infrastructure.",
    href: "/partners",
  },
  {
    label: "Broadview",
    title: "Broadview Lending",
    body: "External lending partner resource and blog for broader mortgage education.",
    href: "https://www.broadviewlending.com",
    external: true,
  },
];
