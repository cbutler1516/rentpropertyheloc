import {
  getPublishedUpdateSync,
  loadMarketCenterStore,
  publishMarketCenterDraft,
  publishMarketCenterEdition,
  saveMarketCenterDraft,
} from "./local-store";
import { normalizeDailyMarketUpdate } from "./normalize";
import type { DailyMarketUpdate, MarketCenterStoreSnapshot } from "./types";

/** Local file store — replace with SupabaseMarketCenterRepository */
export async function loadMarketCenterSnapshot(): Promise<MarketCenterStoreSnapshot> {
  return loadMarketCenterStore();
}

export async function saveDraftMarketUpdate(
  update: DailyMarketUpdate,
): Promise<MarketCenterStoreSnapshot> {
  saveMarketCenterDraft(normalizeDailyMarketUpdate(update));
  return loadMarketCenterStore();
}

export async function publishMarketUpdate(
  update: DailyMarketUpdate,
): Promise<MarketCenterStoreSnapshot> {
  publishMarketCenterEdition(normalizeDailyMarketUpdate(update));
  return loadMarketCenterStore();
}

export async function publishStoredDraft(): Promise<MarketCenterStoreSnapshot> {
  publishMarketCenterDraft();
  return loadMarketCenterStore();
}

export async function getPublishedUpdate(): Promise<DailyMarketUpdate | null> {
  return getPublishedUpdateSync();
}
