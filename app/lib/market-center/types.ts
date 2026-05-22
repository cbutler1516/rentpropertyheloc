/** CMS / Supabase-ready daily market update record */
export type MarketPulseCardId =
  | "thirty-year-fixed"
  | "ten-year-treasury"
  | "rate-trend"
  | "buyer-leverage"
  | "inventory-trend"
  | "price-reductions";

export type MarketTrend = "up" | "down" | "flat" | "neutral";

export type MarketPulseCard = {
  id: MarketPulseCardId;
  label: string;
  value: string;
  delta?: string;
  trend: MarketTrend;
  note?: string;
};

export type SeattleSnapshot = {
  headline: string;
  summary: string;
  metrics: Array<{
    label: string;
    value: string;
    context?: string;
  }>;
};

export type AgentTalkingPoints = {
  buyer: string;
  seller: string;
  script: string;
};

export type RefiHelocWatch = {
  headline: string;
  summary: string;
  bullets: string[];
  href: string;
  ctaLabel: string;
};

export type CommercialCornerBrief = {
  headline: string;
  summary: string;
  href: string;
  ctaLabel: string;
};

export type MarketUpdateCta = {
  label: string;
  href: string;
};

/**
 * Daily market update — maps 1:1 to a future Supabase row + OpenAI summary payload.
 */
export type DailyMarketUpdate = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  videoUrl: string;
  videoSlug: string;
  videoTitle: string;
  rateSummary: string;
  treasurySummary: string;
  localMarketSummary: string;
  todaysPlay: string;
  buyerTalkingPoint: string;
  sellerTalkingPoint: string;
  agentScript: string;
  cta: MarketUpdateCta;
  pulse: MarketPulseCard[];
  seattle: SeattleSnapshot;
  talkingPoints: AgentTalkingPoints;
  refiHeloc: RefiHelocWatch;
  commercial: CommercialCornerBrief;
};

export type MarketUpdateStatus = "draft" | "published";

/** Stored edition with admin metadata — maps to a future Supabase row */
export type MarketCenterEdition = DailyMarketUpdate & {
  status: MarketUpdateStatus;
  savedAt: string;
};

export type MarketCenterStoreSnapshot = {
  draft: MarketCenterEdition | null;
  published: MarketCenterEdition | null;
};
