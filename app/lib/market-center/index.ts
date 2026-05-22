import { getPublishedUpdateSync, loadMarketCenterStore } from "./local-store";
import { MOCK_DAILY_MARKET_UPDATE } from "./mock-data";
import type { DailyMarketUpdate, MarketCenterStoreSnapshot } from "./types";

export type {
  AgentScripts,
  BigThreeItem,
  BondFedWatch,
  DailyMarketUpdate,
  MarketBigThree,
  MarketCenterEdition,
  MarketCenterStoreSnapshot,
  MarketMood,
  MarketTrend,
  MarketUpdateStatus,
  NewsletterCta,
  RateTrendPoint,
  RateTrendVisual,
  RealEstatePulse,
  RealEstatePulseCard,
  RealEstatePulseCardId,
  TodayPlay,
} from "./types";

export { MARKET_MOOD_LABELS, REAL_ESTATE_PULSE_IDS } from "./types";

export { generateRealtorEmailPreview, generateSocialCaptionPreview } from "./previews";
export { normalizeDailyMarketUpdate } from "./normalize";

/**
 * Latest published market update.
 * Future: `supabase.from('market_updates').select().order('published_at').limit(1)`
 */
export async function getLatestMarketUpdate(): Promise<DailyMarketUpdate> {
  const { getPublishedUpdate } = await import("./repository");
  const published = await getPublishedUpdate();
  return published ?? MOCK_DAILY_MARKET_UPDATE;
}

/** Sync accessor for Server Components */
export function getLatestMarketUpdateSync(): DailyMarketUpdate {
  return getPublishedUpdateSync() ?? MOCK_DAILY_MARKET_UPDATE;
}

/** Admin / API — full draft + published snapshot */
export function getMarketCenterStoreSnapshot(): MarketCenterStoreSnapshot {
  return loadMarketCenterStore();
}
