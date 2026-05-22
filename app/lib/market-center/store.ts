import type { DailyMarketUpdate, MarketCenterStoreSnapshot } from "./types";

/**
 * Repository interface — implement with Supabase when the table exists.
 */
export type MarketCenterRepository = {
  loadSnapshot(): Promise<MarketCenterStoreSnapshot>;
  saveDraft(update: DailyMarketUpdate): Promise<void>;
  publish(update: DailyMarketUpdate): Promise<void>;
  publishDraft(): Promise<DailyMarketUpdate | null>;
  getPublished(): Promise<DailyMarketUpdate | null>;
};
