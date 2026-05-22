import { RevealGroup } from "@/app/components/reveal-group";
import { TrackedLink } from "@/app/components/tracked-link";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

type SeattleSnapshotProps = {
  update: DailyMarketUpdate;
};

export function SeattleSnapshotSection({ update }: SeattleSnapshotProps) {
  const { seattle } = update;

  return (
    <MarketSection
      id="seattle-snapshot"
      eyebrow="Seattle snapshot"
      title={seattle.headline}
      lead={seattle.summary}
      variant="white"
    >
      <RevealGroup
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        stagger={70}
      >
        {seattle.metrics.map((metric) => (
          <div key={metric.label} className="reveal-item market-metric-card">
            <p className="market-metric-label">{metric.label}</p>
            <p className="market-metric-value">{metric.value}</p>
            {metric.context ? (
              <p className="market-metric-context">{metric.context}</p>
            ) : null}
          </div>
        ))}
      </RevealGroup>
      <RevealGroup className="mt-8" stagger={60}>
        <TrackedLink
          href="/markets/seattle"
          location="market_seattle_snapshot"
          label="Seattle market page"
          className="reveal-item market-text-link"
        >
          Full Seattle financing context →
        </TrackedLink>
      </RevealGroup>
    </MarketSection>
  );
}
