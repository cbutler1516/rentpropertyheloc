import { MARKET_MOOD_LABELS } from "./types";
import type { DailyMarketUpdate } from "./types";

export function generateRealtorEmailPreview(update: DailyMarketUpdate): string {
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(update.publishedAt));

  return [
    `Subject: Agent Market Brief — ${update.title}`,
    "",
    `Good morning,`,
    "",
    `Your ${date} brief · Mood: ${MARKET_MOOD_LABELS[update.marketMood]}`,
    "",
    update.agentTakeaway,
    "",
    `RATES — ${update.bigThree.rates.summary}`,
    `→ ${update.bigThree.rates.agentTakeaway}`,
    "",
    `BONDS — ${update.bigThree.bonds.summary}`,
    `→ ${update.bigThree.bonds.agentTakeaway}`,
    "",
    `HOUSING — ${update.bigThree.housing.summary}`,
    `→ ${update.bigThree.housing.agentTakeaway}`,
    "",
    `TODAY'S PLAY`,
    update.todayPlay.action,
    `Who: ${update.todayPlay.whoToCall}`,
    `Say: ${update.todayPlay.whatToSay}`,
    `Why now: ${update.todayPlay.whyNow}`,
    "",
    `BUYER SCRIPT`,
    update.agentScripts.buyerScript,
    "",
    `SELLER SCRIPT`,
    update.agentScripts.sellerScript,
    "",
    `Watch: ${update.videoTitle}`,
    "theloanplaybook.com/market",
    "",
    "— The Loan Playbook · Educational market commentary, not a commitment to lend.",
  ].join("\n");
}

export function generateSocialCaptionPreview(update: DailyMarketUpdate): string {
  return [
    update.agentScripts.socialPostIdea,
    "",
    `${MARKET_MOOD_LABELS[update.marketMood]} · ${update.rateTrendVisual.thirtyYearValue} 30-yr est.`,
    "",
    "Full brief → theloanplaybook.com/market",
    "",
    "#SeattleRealEstate #RealtorTips #MarketBrief",
  ].join("\n");
}
