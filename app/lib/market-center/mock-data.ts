import type { DailyMarketUpdate } from "./types";

const publishedAt = "2026-05-18T06:00:00.000Z";

/** Static mock — replace with Supabase, live feeds, and AI daily summary */
export const MOCK_DAILY_MARKET_UPDATE: DailyMarketUpdate = {
  id: "market-update-2026-05-18",
  slug: "2026-05-18",
  title: "Rates ease slightly — buyers get a short window",
  publishedAt,
  videoSlug: "market-strategy-over-rate-noise",
  videoTitle: "Strategy over rate noise",
  videoUrl: "/videos/hero/market-strategy-over-rate-noise.mp4",
  marketMood: "buyer-friendly",
  agentTakeaway:
    "Lead with payment clarity, not headline panic — well-priced listings under $950K are moving again.",
  bigThree: {
    rates: {
      direction: "down",
      summary:
        "30-year conventional held near 6.4%. No lock panic — buyers can re-shop without a scary jump.",
      agentTakeaway:
        "Tell buyers: your payment is about structure and timing, not yesterday's headline.",
    },
    bonds: {
      direction: "down",
      summary:
        "10-year Treasury dipped. Mortgage rates often follow with a short lag — watch the next few days.",
      agentTakeaway:
        "If a buyer paused last month, today is a good day to re-open the conversation.",
    },
    housing: {
      direction: "up",
      summary:
        "More listings hit the market. Well-priced homes are competitive; overpriced ones are getting cuts.",
      agentTakeaway:
        "Sellers need a reality check on price — buyers are comparing total cost, not list price alone.",
    },
  },
  rateTrendVisual: {
    headline: "30-year fixed — where it's been",
    thirtyYearLabel: "30-year fixed (est.)",
    thirtyYearValue: "6.42%",
    points: [
      { label: "Yesterday", value: "6.45%", direction: "down" },
      { label: "Today", value: "6.42%", direction: "down" },
      { label: "7-day", value: "6.48%", direction: "flat" },
      { label: "30-day", value: "6.55%", direction: "down" },
    ],
    detailNote:
      "Estimates for strong-credit conventional. Your buyer's exact rate depends on credit, down payment, and product.",
  },
  bondFedWatch: {
    treasury10Year: {
      value: "4.28%",
      direction: "down",
      note: "Benchmark eased — mortgage pricing often follows.",
    },
    mbs: {
      label: "Mortgage bonds (MBS)",
      direction: "flat",
      note: "Stable after last week's volatility.",
    },
    fedNarrative:
      "Fed held steady. The story is patience — no rush to cut, no signal of hikes. Markets are reading 'higher for longer, but not escalating.'",
    inflationNote:
      "Inflation is cooling slowly. That keeps pressure off sudden rate spikes, but don't promise big drops.",
    whyAgentsCare:
      "When Treasury drifts lower, buyers get breathing room. You can re-engage paused buyers without overpromising.",
    detailNote:
      "Next Fed speak and jobs data can move numbers quickly — use ranges, not guarantees.",
  },
  realEstatePulse: {
    cards: [
      {
        id: "inventory",
        label: "Inventory",
        value: "+4.2%",
        direction: "up",
        plainEnglish: "More homes to show — buyers have options again.",
      },
      {
        id: "price-reductions",
        label: "Price reductions",
        value: "18%",
        direction: "neutral",
        plainEnglish: "Nearly 1 in 5 active listings cut price — sellers are adjusting.",
      },
      {
        id: "buyer-leverage",
        label: "Buyer leverage",
        value: "Improving",
        direction: "up",
        plainEnglish: "Concessions and buydowns are back in play under $950K.",
      },
      {
        id: "seller-concessions",
        label: "Seller concessions",
        value: "$12.4K avg",
        direction: "up",
        plainEnglish: "Sellers are helping with closing costs on competitive deals.",
      },
      {
        id: "days-on-market",
        label: "Days on market",
        value: "19",
        direction: "down",
        plainEnglish: "Well-priced homes are moving faster than last month.",
      },
    ],
    seattleNote:
      "Seattle metro: turnkey homes under $1M are seeing multiple offers; listings above $1.2M need sharper pricing or seller creativity.",
  },
  agentScripts: {
    buyerScript:
      "Rates dipped slightly this week — that's a window, not a guarantee. Let's run your payment at today's numbers before you write an offer.",
    sellerScript:
      "Buyers are comparing total monthly cost. A small concession or buydown often beats a price cut that makes your home look desperate.",
    socialPostIdea:
      "Rates eased this week. If you paused your home search in March, let's talk — your buying power may look better than you think. DM me for a 2-minute market read.",
    listingAppointmentPoint:
      "Open with inventory up 4% — buyers have choices. Price for the payment buyers will actually qualify at, not the aspirational comp from last spring.",
  },
  todayPlay: {
    action: "Re-engage buyers who paused because of rates.",
    whoToCall:
      "Buyers who went quiet 30–60 days ago with pre-approval still in hand.",
    whatToSay:
      "Treasury eased and 30-year held steady — I want to refresh your payment picture before Memorial Day listings hit.",
    whyNow:
      "A short rate window plus rising inventory means buyers can be selective without sitting out.",
  },
  newsletterCta: {
    headline: "Get the daily agent market brief",
    subhead:
      "Rates, bonds, housing pulse, and scripts you can use today — in your inbox each morning.",
    buttonLabel: "Subscribe to daily brief",
  },
};
