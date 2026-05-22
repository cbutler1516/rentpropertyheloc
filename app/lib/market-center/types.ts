/** CMS / Supabase-ready daily agent market brief */

export type MarketTrend = "up" | "down" | "flat" | "neutral";

export type MarketMood =
  | "buyer-friendly"
  | "neutral"
  | "rate-pressure"
  | "opportunity-window";

export type BigThreeItem = {
  direction: MarketTrend;
  summary: string;
  agentTakeaway: string;
};

export type MarketBigThree = {
  rates: BigThreeItem;
  bonds: BigThreeItem;
  housing: BigThreeItem;
};

export type RateTrendPoint = {
  label: string;
  value: string;
  direction: MarketTrend;
};

export type RateTrendVisual = {
  headline: string;
  thirtyYearLabel: string;
  thirtyYearValue: string;
  points: RateTrendPoint[];
  detailNote?: string;
};

export type BondFedWatch = {
  treasury10Year: { value: string; direction: MarketTrend; note: string };
  mbs: { label: string; direction: MarketTrend; note: string };
  fedNarrative: string;
  inflationNote: string;
  whyAgentsCare: string;
  detailNote?: string;
};

export type RealEstatePulseCardId =
  | "inventory"
  | "price-reductions"
  | "buyer-leverage"
  | "seller-concessions"
  | "days-on-market";

export type RealEstatePulseCard = {
  id: RealEstatePulseCardId;
  label: string;
  value: string;
  direction: MarketTrend;
  plainEnglish: string;
};

export type RealEstatePulse = {
  cards: RealEstatePulseCard[];
  seattleNote: string;
};

export type AgentScripts = {
  buyerScript: string;
  sellerScript: string;
  socialPostIdea: string;
  listingAppointmentPoint: string;
};

export type TodayPlay = {
  action: string;
  whoToCall: string;
  whatToSay: string;
  whyNow: string;
};

export type NewsletterCta = {
  headline: string;
  subhead: string;
  buttonLabel: string;
};

/**
 * Daily market brief — maps 1:1 to a future Supabase row + feeds/AI pipeline.
 */
export type DailyMarketUpdate = {
  id: string;
  slug: string;
  title: string;
  publishedAt: string;
  videoUrl: string;
  videoSlug: string;
  videoTitle: string;
  marketMood: MarketMood;
  agentTakeaway: string;
  bigThree: MarketBigThree;
  rateTrendVisual: RateTrendVisual;
  bondFedWatch: BondFedWatch;
  realEstatePulse: RealEstatePulse;
  agentScripts: AgentScripts;
  todayPlay: TodayPlay;
  newsletterCta: NewsletterCta;
};

export type MarketUpdateStatus = "draft" | "published";

export type MarketCenterEdition = DailyMarketUpdate & {
  status: MarketUpdateStatus;
  savedAt: string;
};

export type MarketCenterStoreSnapshot = {
  draft: MarketCenterEdition | null;
  published: MarketCenterEdition | null;
};

export const MARKET_MOOD_LABELS: Record<MarketMood, string> = {
  "buyer-friendly": "Buyer-Friendly",
  neutral: "Neutral",
  "rate-pressure": "Rate Pressure",
  "opportunity-window": "Opportunity Window",
};

export const REAL_ESTATE_PULSE_IDS: RealEstatePulseCardId[] = [
  "inventory",
  "price-reductions",
  "buyer-leverage",
  "seller-concessions",
  "days-on-market",
];
