import type { DailyMarketUpdate } from "./types";

/** Keep top-level talking fields and nested talkingPoints in sync */
export function normalizeDailyMarketUpdate(
  update: DailyMarketUpdate,
): DailyMarketUpdate {
  return {
    ...update,
    talkingPoints: {
      buyer: update.buyerTalkingPoint,
      seller: update.sellerTalkingPoint,
      script: update.agentScript,
    },
  };
}
