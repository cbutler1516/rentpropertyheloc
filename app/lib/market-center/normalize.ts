import { MOCK_DAILY_MARKET_UPDATE } from "./mock-data";
import type { DailyMarketUpdate, MarketTrend } from "./types";

function trend(value: unknown, fallback: MarketTrend = "neutral"): MarketTrend {
  if (value === "up" || value === "down" || value === "flat" || value === "neutral") {
    return value;
  }
  return fallback;
}

/** Upgrade legacy stored editions to the briefing schema */
function migrateLegacyRecord(raw: Record<string, unknown>): DailyMarketUpdate {
  const base = structuredClone(MOCK_DAILY_MARKET_UPDATE);
  const pulse = Array.isArray(raw.pulse) ? raw.pulse : [];
  const findPulse = (id: string) =>
    pulse.find((p) => typeof p === "object" && p && (p as { id?: string }).id === id) as
      | { value?: string; trend?: MarketTrend; note?: string }
      | undefined;

  const thirty = findPulse("thirty-year-fixed");
  const treasury = findPulse("ten-year-treasury");
  const inventory = findPulse("inventory-trend");
  const reductions = findPulse("price-reductions");
  const leverage = findPulse("buyer-leverage");

  return {
    ...base,
    id: typeof raw.id === "string" ? raw.id : base.id,
    slug: typeof raw.slug === "string" ? raw.slug : base.slug,
    title: typeof raw.title === "string" ? raw.title : base.title,
    publishedAt:
      typeof raw.publishedAt === "string" ? raw.publishedAt : base.publishedAt,
    videoUrl: typeof raw.videoUrl === "string" ? raw.videoUrl : base.videoUrl,
    videoSlug: typeof raw.videoSlug === "string" ? raw.videoSlug : base.videoSlug,
    videoTitle:
      typeof raw.videoTitle === "string" ? raw.videoTitle : base.videoTitle,
    agentTakeaway:
      typeof raw.agentTakeaway === "string"
        ? raw.agentTakeaway
        : typeof raw.todaysPlay === "string"
          ? raw.todaysPlay
          : base.agentTakeaway,
    bigThree: {
      rates: {
        direction: trend(thirty?.trend, "flat"),
        summary:
          typeof raw.rateSummary === "string"
            ? raw.rateSummary
            : base.bigThree.rates.summary,
        agentTakeaway: base.bigThree.rates.agentTakeaway,
      },
      bonds: {
        direction: trend(treasury?.trend, "flat"),
        summary:
          typeof raw.treasurySummary === "string"
            ? raw.treasurySummary
            : base.bigThree.bonds.summary,
        agentTakeaway: base.bigThree.bonds.agentTakeaway,
      },
      housing: {
        direction: trend(inventory?.trend, "neutral"),
        summary:
          typeof raw.localMarketSummary === "string"
            ? raw.localMarketSummary
            : base.bigThree.housing.summary,
        agentTakeaway: base.bigThree.housing.agentTakeaway,
      },
    },
    agentScripts: {
      buyerScript:
        typeof raw.buyerTalkingPoint === "string"
          ? raw.buyerTalkingPoint
          : base.agentScripts.buyerScript,
      sellerScript:
        typeof raw.sellerTalkingPoint === "string"
          ? raw.sellerTalkingPoint
          : base.agentScripts.sellerScript,
      socialPostIdea: base.agentScripts.socialPostIdea,
      listingAppointmentPoint: base.agentScripts.listingAppointmentPoint,
    },
    todayPlay: {
      action:
        typeof raw.todaysPlay === "string" ? raw.todaysPlay : base.todayPlay.action,
      whoToCall: base.todayPlay.whoToCall,
      whatToSay:
        typeof raw.agentScript === "string"
          ? raw.agentScript
          : base.todayPlay.whatToSay,
      whyNow: base.todayPlay.whyNow,
    },
    realEstatePulse: {
      ...base.realEstatePulse,
      cards: base.realEstatePulse.cards.map((card) => {
        if (card.id === "inventory" && inventory?.value) {
          return { ...card, value: inventory.value, direction: trend(inventory.trend) };
        }
        if (card.id === "price-reductions" && reductions?.value) {
          return {
            ...card,
            value: reductions.value,
            direction: trend(reductions.trend),
          };
        }
        if (card.id === "buyer-leverage" && leverage?.value) {
          return { ...card, value: leverage.value, direction: trend(leverage.trend) };
        }
        return card;
      }),
      seattleNote:
        typeof raw.localMarketSummary === "string"
          ? raw.localMarketSummary
          : base.realEstatePulse.seattleNote,
    },
  };
}

export function normalizeDailyMarketUpdate(
  update: DailyMarketUpdate | Record<string, unknown>,
): DailyMarketUpdate {
  if (
    typeof update === "object" &&
    update !== null &&
    "bigThree" in update &&
    update.bigThree
  ) {
    return update as DailyMarketUpdate;
  }
  return migrateLegacyRecord(update as Record<string, unknown>);
}
