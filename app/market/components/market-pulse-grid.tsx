import { RevealGroup } from "@/app/components/reveal-group";
import type { DailyMarketUpdate, MarketTrend } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

type MarketPulseGridProps = {
  update: DailyMarketUpdate;
};

const trendLabel: Record<MarketTrend, string> = {
  up: "Rising",
  down: "Easing",
  flat: "Flat",
  neutral: "Watch",
};

function trendClass(trend: MarketTrend) {
  if (trend === "up") return "market-trend-up";
  if (trend === "down") return "market-trend-down";
  if (trend === "flat") return "market-trend-flat";
  return "market-trend-neutral";
}

export function MarketPulseGrid({ update }: MarketPulseGridProps) {
  return (
    <MarketSection
      id="market-pulse"
      eyebrow="Market pulse"
      title="Six signals for your morning huddle"
      lead="Rate, macro, and local leverage at a glance—updated with each daily edition."
      variant="warm"
    >
      <RevealGroup
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        stagger={60}
      >
        {update.pulse.map((card) => (
          <article
            key={card.id}
            className="reveal-item market-pulse-card"
            data-pulse-id={card.id}
          >
            <div className="flex items-start justify-between gap-3">
              <p className="market-pulse-label">{card.label}</p>
              <span
                className={`market-trend-pill ${trendClass(card.trend)}`}
              >
                {trendLabel[card.trend]}
              </span>
            </div>
            <p className="market-pulse-value">{card.value}</p>
            {card.delta ? (
              <p className="market-pulse-delta">{card.delta}</p>
            ) : null}
            {card.note ? (
              <p className="market-pulse-note">{card.note}</p>
            ) : null}
          </article>
        ))}
      </RevealGroup>
    </MarketSection>
  );
}
