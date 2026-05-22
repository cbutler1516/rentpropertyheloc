import type { DailyMarketUpdate } from "./types";

export function generateRealtorEmailPreview(update: DailyMarketUpdate): string {
  const date = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(update.publishedAt));

  const pulseLines = update.pulse
    .map((card) => `• ${card.label}: ${card.value}${card.delta ? ` (${card.delta})` : ""}`)
    .join("\n");

  return [
    `Subject: Market Center — ${update.title}`,
    "",
    `Good morning,`,
    "",
    `Here's your ${date} briefing from The Loan Playbook Market Center.`,
    "",
    `TODAY'S PLAY`,
    update.todaysPlay,
    "",
    `RATE SUMMARY`,
    update.rateSummary,
    "",
    `TREASURY`,
    update.treasurySummary,
    "",
    `SEATTLE / LOCAL`,
    update.localMarketSummary,
    "",
    `MARKET PULSE`,
    pulseLines,
    "",
    `BUYER TALKING POINT`,
    update.buyerTalkingPoint,
    "",
    `SELLER TALKING POINT`,
    update.sellerTalkingPoint,
    "",
    `AGENT SCRIPT`,
    update.agentScript,
    "",
    `Watch today's commentary: ${update.videoTitle}`,
    `${update.cta.label}: ${update.cta.href}`,
    "",
    "— The Loan Playbook · Educational market commentary, not a commitment to lend.",
  ].join("\n");
}

export function generateSocialCaptionPreview(update: DailyMarketUpdate): string {
  const play =
    update.todaysPlay.length > 140
      ? `${update.todaysPlay.slice(0, 137)}…`
      : update.todaysPlay;

  return [
    `📊 ${update.title}`,
    "",
    play,
    "",
    `30-yr ${update.pulse.find((p) => p.id === "thirty-year-fixed")?.value ?? "—"} · Seattle inventory watch`,
    "",
    `Full market read → theloanplaybook.com/market`,
    "",
    "#SeattleRealEstate #MortgageStrategy #MarketUpdate",
  ].join("\n");
}
