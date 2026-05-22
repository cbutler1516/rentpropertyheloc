import { RevealGroup } from "@/app/components/reveal-group";
import { TrackedLink } from "@/app/components/tracked-link";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

type TodaysPlayProps = {
  update: DailyMarketUpdate;
};

export function TodaysPlay({ update }: TodaysPlayProps) {
  return (
    <MarketSection
      id="todays-play"
      eyebrow="Today's play"
      title="Lead with this move"
      variant="graphite"
    >
      <RevealGroup stagger={70}>
        <blockquote className="reveal-item market-play-callout">
          {update.todaysPlay}
        </blockquote>
        <div className="reveal-item mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <TrackedLink
            href={update.cta.href}
            location="market_todays_play"
            label={update.cta.label}
            className="market-btn-primary market-btn-on-dark"
          >
            {update.cta.label}
          </TrackedLink>
          <p className="text-sm text-zinc-400">
            Shareable script and talking points below.
          </p>
        </div>
      </RevealGroup>
    </MarketSection>
  );
}
