import type { SocialPlatform } from "./social-links";

export type SocialPostAudience = "buyer" | "homeowner" | "agent" | "commercial";

export type SocialPost = {
  slug: string;
  platform: Exclude<SocialPlatform, "Broadview Lending">;
  postUrl: string;
  title: string;
  topic: string;
  category: string;
  thumbnail: string;
  thumbnailSrc?: string;
  thumbnailFocalPoint?: string;
  runtime?: string;
  shortSummary: string;
  audience?: SocialPostAudience;
  topicClusterId?: string;
  guideSlugs?: string[];
  marketSlugs?: string[];
  transcriptParagraphs?: string[];
  relatedLearnArticle?: {
    href: string;
    label: string;
  };
  relatedGuideHrefs?: Array<{ href: string; label: string }>;
  landingPageSlug: string;
  transcript?: string;
  cta: {
    label: string;
    href: string;
  };
  embedUrl?: string;
  status: "published" | "planned";
};

export type HeroVideoFaq = { question: string; answer: string };

export type HeroVideo = SocialPost & {
  expandedSummary: string;
  keyTakeaways: string[];
  faq?: HeroVideoFaq[];
  dominantCta: { label: string; href: string };
  localVideoSrc?: string;
  localRelevanceDetail?: string;
  heroGroup:
    | "buyer-readiness"
    | "seller-concessions"
    | "refinance"
    | "market"
    | "washington";
};

const TIKTOK_PROFILE = "https://www.tiktok.com/@theloanplaybook";

function localHeroSrc(slug: string) {
  return `/videos/hero/${slug}.mp4`;
}

function heroBase(config: {
  slug: string;
  title: string;
  topic: string;
  category: string;
  shortSummary: string;
  expandedSummary: string;
  audience: SocialPostAudience;
  heroGroup: HeroVideo["heroGroup"];
  dominantCta: HeroVideo["dominantCta"];
  keyTakeaways: string[];
  transcriptParagraphs: string[];
  faq?: HeroVideoFaq[];
  guideSlugs?: string[];
  marketSlugs?: string[];
  topicClusterId?: string;
  localRelevanceDetail?: string;
  relatedLearnArticle?: SocialPost["relatedLearnArticle"];
  relatedGuideHrefs?: SocialPost["relatedGuideHrefs"];
  embedUrl?: string;
  postUrl?: string;
}): HeroVideo {
  return {
    slug: config.slug,
    platform: "TikTok",
    postUrl: config.postUrl ?? TIKTOK_PROFILE,
    title: config.title,
    topic: config.topic,
    category: config.category,
    thumbnail: "Hero video",
    shortSummary: config.shortSummary,
    expandedSummary: config.expandedSummary,
    audience: config.audience,
    heroGroup: config.heroGroup,
    topicClusterId: config.topicClusterId,
    guideSlugs: config.guideSlugs,
    marketSlugs: config.marketSlugs,
    relatedLearnArticle: config.relatedLearnArticle,
    relatedGuideHrefs: config.relatedGuideHrefs,
    landingPageSlug: config.slug,
    transcriptParagraphs: config.transcriptParagraphs,
    keyTakeaways: config.keyTakeaways,
    faq: config.faq,
    dominantCta: config.dominantCta,
    localVideoSrc: localHeroSrc(config.slug),
    localRelevanceDetail: config.localRelevanceDetail,
    cta: { label: "Watch on TikTok", href: config.postUrl ?? TIKTOK_PROFILE },
    embedUrl: config.embedUrl,
    status: "published",
  };
}

/** First curated hero publish set (8). */
export const heroVideos: HeroVideo[] = [
  heroBase({
    slug: "buyer-preapproval-first-step",
    title: "Pre-approval is the first step—not the listing search.",
    topic: "Buyer readiness",
    category: "Buyer Education",
    heroGroup: "buyer-readiness",
    audience: "buyer",
    topicClusterId: "puget-sound",
    guideSlugs: ["first-time-buyers", "buy-before-sell"],
    marketSlugs: ["seattle", "bellevue"],
    shortSummary:
      "Payment and cash clarity before Zillow, open houses, or offer pressure.",
    expandedSummary:
      "Strong purchases start with a verified financing picture: payment range, cash to close, and timeline. In competitive Puget Sound markets, that clarity belongs before the search—not after you fall in love with a home.",
    dominantCta: {
      label: "Start Your Buyer Strategy",
      href: "#video-cta",
    },
    keyTakeaways: [
      "Pre-approval confirms what you can actually afford—not what an app estimates.",
      "Cash to close and monthly payment should be clear before touring.",
      "In Seattle and Eastside markets, sellers expect financing to be prepared early.",
    ],
    transcriptParagraphs: [
      "Most buyers open Zillow before they know their real payment range. That is backwards.",
      "Pre-approval is not a formality—it is the first step. It tells you what you can afford, what cash you need, and how strong your offer can look.",
      "In competitive Puget Sound markets, showing up prepared is part of the offer story.",
    ],
    faq: [
      {
        question: "Is pre-approval required before touring homes?",
        answer:
          "Not legally—but strategically, yes. You avoid falling for homes outside your real payment range and you show sellers you are prepared.",
      },
      {
        question: "How is this different on the Eastside or in Seattle?",
        answer:
          "Tighter inventory and multiple-offer dynamics reward buyers who can document income, assets, and structure early—especially for condos and jumbo paths.",
      },
    ],
    relatedLearnArticle: {
      href: "/learn/buyer-readiness",
      label: "Buyer readiness guide",
    },
    relatedGuideHrefs: [
      { href: "/guides/buy-before-sell", label: "Buy before sell" },
    ],
    localRelevanceDetail:
      "Tech-income documentation, condo reviews, and jumbo thresholds show up often in Seattle and Bellevue offers—pre-approval surfaces those issues before you write.",
  }),
  heroBase({
    slug: "buyer-prequalified-vs-preapproved",
    title: "Pre-qualified is not the same as pre-approved.",
    topic: "Buyer readiness",
    category: "Buyer Education",
    heroGroup: "buyer-readiness",
    audience: "buyer",
    topicClusterId: "puget-sound",
    guideSlugs: ["first-time-buyers"],
    marketSlugs: ["seattle", "kirkland"],
    shortSummary:
      "Why a soft quote is not the same as a verified pre-approval letter.",
    expandedSummary:
      "Pre-qualification is often based on self-reported numbers. Pre-approval means income, assets, and credit were reviewed. Sellers and agents in Washington markets treat those very differently.",
    dominantCta: {
      label: "Start Your Buyer Strategy",
      href: "#video-cta",
    },
    keyTakeaways: [
      "Pre-qualified = estimate. Pre-approved = reviewed.",
      "Listing agents discount soft letters in competitive neighborhoods.",
      "Know which letter you have before you tour or write.",
    ],
    transcriptParagraphs: [
      "Pre-qualified sounds official—but it often means nobody verified your numbers yet.",
      "Pre-approved means income, assets, and credit were actually reviewed.",
      "In a competitive offer, that difference matters.",
    ],
    faq: [
      {
        question: "Can I still shop with only a pre-qualification?",
        answer:
          "You can tour, but you may not know your real ceiling—and sellers may not take your offer as seriously until you are fully pre-approved.",
      },
    ],
    relatedLearnArticle: {
      href: "/learn/buyer-readiness",
      label: "Buyer readiness guide",
    },
    localRelevanceDetail:
      "Move-up and tech buyers in Kirkland and Seattle often need full documentation before jumbo or complex-income paths are clear.",
  }),
  heroBase({
    slug: "buyer-power-seller-concessions-spring",
    title: "Seller concessions in a spring market—what actually moves the needle.",
    topic: "Seller concessions",
    category: "Offer Strategy",
    heroGroup: "seller-concessions",
    audience: "buyer",
    topicClusterId: "puget-sound",
    guideSlugs: ["seller-concessions", "2-1-buydowns"],
    marketSlugs: ["seattle", "bellevue"],
    shortSummary:
      "When concessions help payment—not just price—and how to frame them in offers.",
    expandedSummary:
      "Seller concessions can improve cash to close or temporary payment structure when negotiated with intent. The goal is a stronger net offer story, not a random credit line item.",
    dominantCta: {
      label: "Explore Seller Options",
      href: "#video-cta",
    },
    keyTakeaways: [
      "Concessions should tie to payment or closing costs—not vague “seller paid” language.",
      "Spring inventory in Washington still rewards clean, documented offers.",
      "Pair concessions with the right loan structure (buydown, ARM, fixed).",
    ],
    transcriptParagraphs: [
      "Seller concessions are back in conversation—but not every concession helps the buyer the same way.",
      "The win is structuring concessions toward payment, closing costs, or rate buydown—not just a bigger price credit with no plan.",
      "In spring markets around Seattle and the Eastside, the financing story still has to be clean.",
    ],
    relatedLearnArticle: {
      href: "/learn/seller-concessions",
      label: "Seller concessions guide",
    },
    relatedGuideHrefs: [
      { href: "/learn/2-1-buydowns", label: "2-1 buydown guide" },
    ],
    localRelevanceDetail:
      "Bellevue and Seattle spring listings often see multiple offers—concessions work best when your lender letter explains how the credit improves your terms.",
  }),
  heroBase({
    slug: "buyer-buydown-and-arm-options",
    title: "Buydown and ARM options—in plain language.",
    topic: "Payment structure",
    category: "Mortgage Strategy",
    heroGroup: "seller-concessions",
    audience: "buyer",
    topicClusterId: "puget-sound",
    guideSlugs: ["2-1-buydowns", "seller-concessions"],
    marketSlugs: ["bellevue", "kirkland"],
    shortSummary:
      "Temporary payment tools, ARM basics, and what still has to fit long-term.",
    expandedSummary:
      "2-1 buydowns and ARM products can change early-year payments—but the long-term payment and exit plan still matter. Use them with a strategy, not as a substitute for affordability.",
    dominantCta: {
      label: "Explore Seller Options",
      href: "#video-cta",
    },
    keyTakeaways: [
      "Buydowns lower payments early—they do not erase the long-term payment.",
      "ARMs can fit short holds; know adjustment timing before you commit.",
      "Seller concessions can fund buydowns when structured correctly.",
    ],
    transcriptParagraphs: [
      "Buydowns and ARMs are back in buyer conversations—but they are tools, not magic.",
      "A 2-1 buydown can help early payments. An ARM can fit a shorter hold. Either way, you need to know what happens after year one.",
      "If a seller concession is on the table, it may fund the buydown—but the long-term payment still has to fit your plan.",
    ],
    relatedLearnArticle: {
      href: "/learn/2-1-buydowns",
      label: "2-1 buydown guide",
    },
    localRelevanceDetail:
      "Eastside move-up buyers sometimes use buydowns to bridge payment shock—pair with a buy-before-sell plan when timing both sides.",
  }),
  heroBase({
    slug: "homeowner-refinance-break-even-roi",
    title: "Refinance break-even and ROI—not rate panic.",
    topic: "Refinance timing",
    category: "Homeowner Strategy",
    heroGroup: "refinance",
    audience: "homeowner",
    topicClusterId: "puget-sound",
    guideSlugs: ["refinance-timing", "heloc-strategy", "heloc-vs-cash-out"],
    marketSlugs: ["seattle", "bellevue"],
    shortSummary:
      "When a refinance actually pays back—and when waiting is the better move.",
    expandedSummary:
      "Rate headlines rarely tell the whole story for Washington homeowners sitting on strong equity. Break-even months, cash flow, and how long you will keep the loan should drive the decision.",
    dominantCta: {
      label: "Review Refinance Timing",
      href: "#video-cta",
    },
    keyTakeaways: [
      "Break-even = costs recovered by monthly savings (or cash flow goal).",
      "Short hold periods may favor different products than “lowest rate.”",
      "Equity-rich Seattle homeowners should compare refi vs HELOC paths.",
    ],
    transcriptParagraphs: [
      "When rates move, everyone asks if they should refinance. The better question: will you keep the loan long enough for the savings to beat the costs?",
      "Break-even is simple math—total costs divided by monthly savings. If you might move in two years, that math changes.",
      "Sometimes the right move is not a full refinance—it is a HELOC or cash-out strategy with a different ROI frame.",
    ],
    faq: [
      {
        question: "What costs belong in break-even math?",
        answer:
          "Lender fees, third-party costs, and any prepaid items that are not refunded—your advisor should show a line-item comparison.",
      },
    ],
    relatedLearnArticle: {
      href: "/learn/refinance-timing",
      label: "Refinance timing guide",
    },
    relatedGuideHrefs: [
      { href: "/learn/heloc-strategy", label: "HELOC strategy" },
    ],
    localRelevanceDetail:
      "Puget Sound homeowners often have meaningful equity—compare refinance, HELOC, and hold scenarios before chasing a headline rate.",
  }),
  heroBase({
    slug: "homeowner-buy-before-sell-program",
    title: "Buy before you sell—sequencing for move-up households.",
    topic: "Buy before sell",
    category: "Move-Up Strategy",
    heroGroup: "washington",
    audience: "buyer",
    topicClusterId: "puget-sound",
    guideSlugs: ["buy-before-sell", "jumbo-buyers"],
    marketSlugs: ["seattle", "bellevue", "kirkland"],
    shortSummary:
      "How Washington move-up buyers bridge timing without losing the next home.",
    expandedSummary:
      "Move-up buyers in Seattle and the Eastside often need to secure the next home before their current sale closes. Bridge and buy-before-sell structures exist—but they require clear equity, timing, and exit planning.",
    dominantCta: {
      label: "Talk Through a Scenario",
      href: "#video-cta",
    },
    keyTakeaways: [
      "Buy-before-sell is a timing strategy—not a way to skip qualification.",
      "Equity and departure plans must be documented up front.",
      "Common for Eastside move-up and tech-income households upgrading schools or space.",
    ],
    transcriptParagraphs: [
      "If you need to buy before you sell, you are not alone—especially in move-up markets around Seattle and the Eastside.",
      "Buy-before-sell programs help you qualify on the next home while you still own the current one—but they require a clear plan for the sale, the equity, and the exit.",
      "This is not a loophole. It is sequencing—and it has to be documented early.",
    ],
    relatedLearnArticle: {
      href: "/guides/buy-before-sell",
      label: "Buy-before-sell guide",
    },
    localRelevanceDetail:
      "Bellevue and Kirkland move-up buyers frequently compete while still owning—bridge clarity can be the difference between winning and missing the next home.",
  }),
  heroBase({
    slug: "buyer-jumbo-loan-myths",
    title: "Jumbo loan myths—before you tour Eastside or Seattle inventory.",
    topic: "Jumbo financing",
    category: "Jumbo Education",
    heroGroup: "washington",
    audience: "buyer",
    topicClusterId: "puget-sound",
    guideSlugs: ["jumbo-buyers", "self-employed-borrowers"],
    marketSlugs: ["bellevue", "seattle"],
    shortSummary:
      "What jumbo buyers get wrong about down payment, reserves, and approval.",
    expandedSummary:
      "Jumbo paths in Washington are not one-size-fits-all. Myths about 20% down, perfect credit, and “big bank only” approvals block buyers who could be prepared earlier—especially tech and self-employed earners on the Eastside.",
    dominantCta: {
      label: "Start Your Buyer Strategy",
      href: "#video-cta",
    },
    keyTakeaways: [
      "Jumbo does not always mean 20% down—options vary by lender and scenario.",
      "Reserves and documentation matter as much as rate.",
      "Bellevue and Seattle jumbo inventory rewards early structure conversations.",
    ],
    transcriptParagraphs: [
      "Jumbo loans come with myths—20% down, perfect credit, only big banks.",
      "Reality: jumbo guidelines vary, and preparation matters more than headlines.",
      "If you are shopping Bellevue or Seattle jumbo inventory, know your structure before you tour.",
    ],
    relatedLearnArticle: {
      href: "/learn/jumbo-loans",
      label: "Jumbo loans guide",
    },
    relatedGuideHrefs: [
      { href: "/guides/jumbo-buyers", label: "Jumbo buyers guide" },
    ],
    localRelevanceDetail:
      "Tech RSUs, self-employed income, and multi-property households are common in Bellevue—document the full picture before offer week.",
  }),
  heroBase({
    slug: "market-strategy-over-rate-noise",
    title: "Strategy over rate noise.",
    topic: "Market commentary",
    category: "Market Update",
    heroGroup: "market",
    audience: "homeowner",
    topicClusterId: "puget-sound",
    guideSlugs: ["refinance-timing", "heloc-strategy"],
    marketSlugs: ["seattle"],
    shortSummary:
      "What to focus on when headlines scream about rates—and what to ignore.",
    expandedSummary:
      "Macro rate moves are only one input. Household plans, equity, payment tolerance, and hold period should frame whether you buy, refi, or wait—especially in Washington markets with strong long-term demand.",
    dominantCta: {
      label: "Review Refinance Timing",
      href: "#video-cta",
    },
    keyTakeaways: [
      "Headline rates are not your personalized payment scenario.",
      "Strategy includes timing, structure, and flexibility—not just “lowest rate.”",
      "Puget Sound homeowners should separate macro noise from household ROI.",
    ],
    transcriptParagraphs: [
      "When rates are in the news, everyone panics—or freezes.",
      "Strategy means asking what actually changed for your household: payment, timeline, equity, and flexibility.",
      "Rate noise is loud. Your plan should be louder.",
    ],
    relatedLearnArticle: {
      href: "/learn/refinance-timing",
      label: "Refinance timing guide",
    },
    localRelevanceDetail:
      "Seattle-area homeowners with strong equity positions often have more options than a rate headline suggests—including HELOC and timed refinance paths.",
  }),
];

/** Legacy TikTok landing slugs → canonical hero slug. */
export const legacyVideoSlugAliases: Record<string, string> = {
  "buyer-readiness-before-search": "buyer-preapproval-first-step",
  "mortgage-strategy-clear-idea": "buyer-buydown-and-arm-options",
  "market-context-without-noise": "homeowner-refinance-break-even-roi",
  "agent-financing-conversation": "buyer-prequalified-vs-preapproved",
  "creative-mortgage-media-test": "market-strategy-over-rate-noise",
};

export function resolveVideoSlug(slug: string) {
  return legacyVideoSlugAliases[slug] ?? slug;
}

export function getHeroVideoBySlug(slug: string): HeroVideo | undefined {
  const resolved = resolveVideoSlug(slug);
  return heroVideos.find((video) => video.slug === resolved);
}

export function isPublishedHeroSlug(slug: string) {
  const resolved = resolveVideoSlug(slug);
  return heroVideos.some((video) => video.slug === resolved);
}

export function getPublishedHeroVideos() {
  return heroVideos;
}
