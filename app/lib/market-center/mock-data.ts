import type { DailyMarketUpdate } from "./types";

const publishedAt = "2026-05-18T06:00:00.000Z";

/** Static mock — replace with Supabase + cron + OpenAI pipeline */
export const MOCK_DAILY_MARKET_UPDATE: DailyMarketUpdate = {
  id: "market-update-2026-05-18",
  slug: "2026-05-18",
  title: "Rates steady, buyers regain leverage in Seattle",
  publishedAt,
  videoSlug: "market-strategy-over-rate-noise",
  videoTitle: "Strategy over rate noise",
  videoUrl: "/videos/hero/market-strategy-over-rate-noise.mp4",
  rateSummary:
    "30-year conventional pricing held in a mid-6% band this week. Buydown and ARM structures are back in listing conversations where sellers want to clear inventory before summer.",
  treasurySummary:
    "The 10-year Treasury eased slightly, giving rate-sensitive buyers a short window to re-shop without headline panic.",
  localMarketSummary:
    "Puget Sound showings are up week-over-week. Well-priced homes under $950K are seeing multiple offers again; overpriced listings are adjusting within 14–21 days.",
  todaysPlay:
    "Lead with payment clarity, not rate fear. Pre-approved buyers under $900K should be shopping concessions and buydown math before Memorial Day.",
  buyerTalkingPoint:
    "Your payment is a structure problem, not a headline problem—let's model three paths before you stretch or pause.",
  sellerTalkingPoint:
    "Buyers are comparing total cost. A small concession or buydown often beats another price cut that signals distress.",
  agentScript:
    "Here's what moved overnight: Treasury dipped, 30-year held, and Seattle inventory under $950K is turning faster. I'll send you a two-minute market read and three financing plays for your buyers today.",
  cta: {
    label: "Book a strategy call",
    href: "/strategy-review",
  },
  pulse: [
    {
      id: "thirty-year-fixed",
      label: "30-year fixed",
      value: "6.42%",
      delta: "-0.03",
      trend: "down",
      note: "Conventional, strong credit",
    },
    {
      id: "ten-year-treasury",
      label: "10-year Treasury",
      value: "4.28%",
      delta: "-0.05",
      trend: "down",
      note: "Benchmark drift",
    },
    {
      id: "rate-trend",
      label: "Rate trend",
      value: "Stable",
      delta: "→",
      trend: "flat",
      note: "No lock panic",
    },
    {
      id: "buyer-leverage",
      label: "Buyer leverage",
      value: "Improving",
      delta: "↑",
      trend: "up",
      note: "Concessions returning",
    },
    {
      id: "inventory-trend",
      label: "Inventory trend",
      value: "+4.2%",
      delta: "WoW",
      trend: "up",
      note: "New listings Seattle MSA",
    },
    {
      id: "price-reductions",
      label: "Price reductions",
      value: "18%",
      delta: "of active",
      trend: "neutral",
      note: "Sellers adjusting",
    },
  ],
  seattle: {
    headline: "Seattle metro — buyers selective, well-priced homes moving",
    summary:
      "Eastside and Seattle proper are splitting: turnkey listings under a million are competitive; aspirational pricing above $1.2M needs financing creativity or a reset.",
    metrics: [
      { label: "Median list (Seattle)", value: "$875K", context: "Single-family" },
      { label: "Avg days on market", value: "19", context: "Down 3 vs last week" },
      { label: "Pending ratio", value: "1.04", context: "Balanced band" },
      { label: "Avg concession", value: "$12.4K", context: "Buyers under $950K" },
    ],
  },
  talkingPoints: {
    buyer:
      "Your payment is a structure problem, not a headline problem—let's model three paths before you stretch or pause.",
    seller:
      "Buyers are comparing total cost. A small concession or buydown often beats another price cut that signals distress.",
    script:
      "Here's what moved overnight: Treasury dipped, 30-year held, and Seattle inventory under $950K is turning faster. I'll send you a two-minute market read and three financing plays for your buyers today.",
  },
  refiHeloc: {
    headline: "Refi / HELOC watch",
    summary:
      "Homeowners with sub-4% first mortgages should default to HELOC or second-lien strategy before replacing the whole loan. Cash-out only wins when hold period and use-of-funds justify resetting the stack.",
    bullets: [
      "HELOC lines opening with more flexible draws in Q2",
      "Break-even refi still 18–24 months for many 2020–2021 purchases",
      "Investor HELOC demand up for acquisition reserves",
    ],
    href: "/learn/heloc-strategy",
    ctaLabel: "Explore HELOC strategy",
  },
  commercial: {
    headline: "Commercial corner",
    summary:
      "Bridge quotes are tightening for stabilized multifamily in the Puget Sound. Sponsors with clear exit timing are seeing faster term sheets than generic office plays.",
    href: "/commercial",
    ctaLabel: "Commercial financing",
  },
};
