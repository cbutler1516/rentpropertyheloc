import { MOCK_DAILY_MARKET_UPDATE } from "./mock-data";
import { normalizeDailyMarketUpdate } from "./normalize";
import type { DailyMarketUpdate } from "./types";

/** Clone mock template for a new admin editing session */
export function createEditableMarketUpdate(
  base?: Partial<DailyMarketUpdate>,
): DailyMarketUpdate {
  const today = new Date().toISOString().slice(0, 10);
  return normalizeDailyMarketUpdate({
    ...MOCK_DAILY_MARKET_UPDATE,
    id: `market-update-${today}`,
    slug: today,
    publishedAt: new Date().toISOString(),
    ...base,
  });
}
