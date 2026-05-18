import type { SocialPlatform } from "./social-links";

export type VideoContent = {
  title: string;
  platform: SocialPlatform | "Facebook Reels" | "Instagram Reels" | "YouTube Shorts";
  category: string;
  description: string;
  thumbnailLabel: string;
  thumbnailSrc?: string;
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
        title: "Buyer readiness before the search starts",
        platform: "TikTok",
        category: "Buyer Education",
        description:
          "A published TikTok short introducing why buyers should understand the file, payment, and next steps before shopping gets serious.",
        thumbnailLabel: "Live TikTok",
        embedUrl: tiktokEmbedUrl("7637204481389726990"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7637204481389726990",
        ctaLabel: "Watch Clip",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Read buyer strategy guides",
        status: "published",
      },
      {
        title: "Mortgage strategy in one clear idea",
        platform: "TikTok",
        category: "Mortgage Strategy",
        description:
          "A published TikTok strategy clip designed to make one mortgage decision easier to understand without quoting rates or promising outcomes.",
        thumbnailLabel: "Live TikTok",
        embedUrl: tiktokEmbedUrl("7608394728236780814"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7608394728236780814",
        ctaLabel: "Open on TikTok",
        relatedArticleHref: "/learn/2-1-buydowns",
        relatedArticleLabel: "Read the 2-1 buydown guide",
        status: "published",
      },
      {
        title: "Market context without the noise",
        platform: "TikTok",
        category: "Market Update",
        description:
          "A published TikTok market-context slot for translating changing conditions into practical borrower and agent conversations.",
        thumbnailLabel: "Live TikTok",
        embedUrl: tiktokEmbedUrl("7598267421841050894"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7598267421841050894",
        ctaLabel: "Watch Market Clip",
        relatedArticleHref: "/learn/refinance-timing",
        relatedArticleLabel: "Read the refinance timing guide",
        status: "published",
      },
      {
        title: "Agent-facing financing conversation",
        platform: "TikTok",
        category: "Agent Strategy",
        description:
          "A published TikTok clip for agents who want cleaner buyer conversations around financing readiness, expectations, and next steps.",
        thumbnailLabel: "Live TikTok",
        embedUrl: tiktokEmbedUrl("7584678562507132215"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7584678562507132215",
        ctaLabel: "Watch Agent Clip",
        relatedArticleHref: "/learn/jumbo-loans",
        relatedArticleLabel: "Read the jumbo loan guide",
        status: "published",
      },
      {
        title: "Creative mortgage media test",
        platform: "TikTok",
        category: "Creative / AI Marketing",
        description:
          "A published TikTok creative slot showing how mortgage education can feel more like premium media than generic rate advertising.",
        thumbnailLabel: "Live TikTok",
        embedUrl: tiktokEmbedUrl("7584525269541686558"),
        ctaHref: "https://www.tiktok.com/@theloanplaybook/video/7584525269541686558",
        ctaLabel: "Open Creative Clip",
        relatedArticleHref: "/learn/heloc-strategy",
        relatedArticleLabel: "Read the HELOC strategy guide",
        status: "published",
      },
      {
        title: "2-1 buydown in under 60 seconds",
        platform: "TikTok",
        category: "Short-form mortgage play",
        description:
          "A simple explanation of how the payment steps down, who funds it, and when it belongs in the strategy.",
        thumbnailLabel: "TikTok thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/2-1-buydowns",
        relatedArticleLabel: "Read the 2-1 buydown guide",
        status: "todo",
      },
      {
        title: "FHA does not mean weak buyer",
        platform: "TikTok",
        category: "Buyer education",
        description:
          "A direct myth-busting clip built for buyer education and agent reposting.",
        thumbnailLabel: "TikTok thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/fha-loans",
        relatedArticleLabel: "Read the FHA loan guide",
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
        title: "Seller credit or lower price?",
        platform: "Instagram Reels",
        category: "Offer strategy",
        description:
          "Short tactical comparison for buyers weighing cash, payment, and negotiation leverage.",
        thumbnailLabel: "Instagram thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Read the seller concessions guide",
        status: "todo",
      },
      {
        title: "Cash-to-close explained cleanly",
        platform: "Instagram Reels",
        category: "Buyer education",
        description:
          "A visual script for down payment, closing costs, reserves, and seller credits.",
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
        title: "How credits affect offer conversations",
        platform: "Facebook Reels",
        category: "Agent education",
        description:
          "A clear explainer for agents who want to connect negotiation terms to financing outcomes.",
        thumbnailLabel: "Facebook thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Read the seller concessions guide",
        status: "todo",
      },
      {
        title: "When to start preparing for a loan",
        platform: "Facebook Reels",
        category: "Buyer readiness",
        description:
          "A simple readiness timeline for buyers who want to avoid scrambling later.",
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
        title: "What buyers misunderstand about pre-approval",
        platform: "YouTube Shorts",
        category: "Featured play",
        description:
          "Why readiness is more than a letter and how buyers can prepare earlier.",
        thumbnailLabel: "YouTube thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/buyers",
        relatedArticleLabel: "Explore buyer resources",
        status: "todo",
      },
      {
        title: "Your payment is not just the rate",
        platform: "YouTube Shorts",
        category: "Buyer education",
        description:
          "A buyer-facing breakdown of taxes, insurance, loan structure, credits, and timing.",
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
        title: "Refinance timing watchlist",
        platform: "YouTube",
        category: "Long-form explainer",
        description:
          "A deeper format for tracking break-even, cash flow, and rate opportunity without implying a quote.",
        thumbnailLabel: "Long-form thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/refinance-timing",
        relatedArticleLabel: "Read the refinance timing guide",
        status: "todo",
      },
      {
        title: "Seller concessions vs. price reductions",
        platform: "YouTube",
        category: "Strategy explainer",
        description:
          "A side-by-side explanation of how credits can change cash-to-close, payment design, and offer strategy.",
        thumbnailLabel: "Long-form thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Read the seller concessions guide",
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
        title: "Rates moved. What actually changes?",
        platform: "YouTube Shorts",
        category: "Market update",
        description:
          "A calm explanation of payment movement, buyer psychology, and what should be recalculated.",
        thumbnailLabel: "Market thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/refinance-timing",
        relatedArticleLabel: "Read the refinance timing guide",
        status: "todo",
      },
      {
        title: "Inventory and financing strategy",
        platform: "Instagram Reels",
        category: "Market update",
        description:
          "How available homes, seller motivation, and financing terms can shift offer strategy.",
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
        title: "The financing questions to ask before showings",
        platform: "Instagram Reels",
        category: "Agent education",
        description:
          "A practical content format agents can use to improve buyer conversations early.",
        thumbnailLabel: "Agent thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/agents",
        relatedArticleLabel: "Explore agent resources",
        status: "todo",
      },
      {
        title: "Pre-approval quality signals",
        platform: "TikTok",
        category: "Agent education",
        description:
          "Short checklist-style video for recognizing what makes a buyer file feel prepared.",
        thumbnailLabel: "Agent thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/agents",
        relatedArticleLabel: "Explore agent resources",
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
        title: "Know the file before the lender does",
        platform: "YouTube Shorts",
        category: "Buyer education",
        description:
          "A readiness explainer covering income, credit, cash, debt, timing, and documentation.",
        thumbnailLabel: "Buyer thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/buyers",
        relatedArticleLabel: "Explore buyer resources",
        status: "todo",
      },
      {
        title: "Payment design before home shopping",
        platform: "Instagram Reels",
        category: "Buyer education",
        description:
          "A clean visual script connecting rate, taxes, insurance, credits, and cash-to-close.",
        thumbnailLabel: "Buyer thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn/seller-concessions",
        relatedArticleLabel: "Read buyer payment guides",
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
        title: "Strategy board motion tests",
        platform: "YouTube",
        category: "AI / Sora",
        description:
          "Future cinematic experiments translating loan strategy into premium sports-board visuals.",
        thumbnailLabel: "AI thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/videos",
        relatedArticleLabel: "Explore video strategy",
        status: "todo",
      },
      {
        title: "Loan routes and decision trees",
        platform: "Instagram Reels",
        category: "AI / Sora",
        description:
          "Creative tests for turning mortgage pathways into elegant route diagrams and editorial clips.",
        thumbnailLabel: "AI thumbnail TODO",
        embedUrl: TODO_EMBED_URL,
        ctaHref: TODO_VIDEO_URL,
        ctaLabel: "Video URL pending",
        relatedArticleHref: "/learn",
        relatedArticleLabel: "Explore Learn hub",
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
