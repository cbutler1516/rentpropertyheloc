import { RevealGroup } from "@/app/components/reveal-group";
import { TrackedLink } from "@/app/components/tracked-link";
import type { DailyMarketUpdate } from "@/app/lib/market-center";

type MarketHeroProps = {
  update: DailyMarketUpdate;
};

function formatPublishedDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(iso));
}

export function MarketHero({ update }: MarketHeroProps) {
  return (
    <header
      className="market-hero relative border-b border-zinc-200/80"
      data-analytics-section="market_hero"
    >
      <div className="market-hero-inner mx-auto w-full max-w-7xl px-6 pb-14 pt-28 md:px-10 md:pb-20 md:pt-32">
        <RevealGroup stagger={100}>
          <p className="reveal-item market-eyebrow">Agent Market Desk</p>
          <h1 className="reveal-item market-hero-title">
            The Market Center for Modern Real Estate Agents
          </h1>
          <p className="reveal-item market-hero-lead">
            Daily rate context, local Seattle signal, and client-ready talking
            points—packaged like a morning briefing, not a mortgage dashboard.
          </p>
          <div className="reveal-item mt-6 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
            <span className="market-badge">{formatPublishedDate(update.publishedAt)}</span>
            <span className="market-badge market-badge-gold">Today&apos;s edition</span>
          </div>
          <div className="reveal-item mt-8 flex flex-col gap-3 sm:flex-row">
            <TrackedLink
              href="#featured-commentary"
              location="market_hero"
              label="Watch commentary"
              className="market-btn-primary"
            >
              Watch today&apos;s commentary
            </TrackedLink>
            <TrackedLink
              href="#market-email"
              location="market_hero"
              label="Agent market updates"
              className="market-btn-secondary"
            >
              Get agent market updates
            </TrackedLink>
          </div>
        </RevealGroup>
      </div>
    </header>
  );
}
