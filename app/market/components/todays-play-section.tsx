import { RevealGroup } from "@/app/components/reveal-group";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

export function TodaysPlaySection({ update }: { update: DailyMarketUpdate }) {
  const { todayPlay: play } = update;

  return (
    <MarketSection
      id="todays-play"
      eyebrow="Today's play"
      title="One clear action"
      variant="graphite"
    >
      <RevealGroup stagger={70}>
        <blockquote className="reveal-item market-play-callout">{play.action}</blockquote>
        <dl className="reveal-item brief-play-grid">
          <div>
            <dt>Who to call</dt>
            <dd>{play.whoToCall}</dd>
          </div>
          <div>
            <dt>What to say</dt>
            <dd>{play.whatToSay}</dd>
          </div>
          <div>
            <dt>Why now</dt>
            <dd>{play.whyNow}</dd>
          </div>
        </dl>
      </RevealGroup>
    </MarketSection>
  );
}
