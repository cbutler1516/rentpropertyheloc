import { RevealGroup } from "@/app/components/reveal-group";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";
import { CollapsibleDetail, DirectionArrow } from "./market-ui";

export function RateMovementVisual({ update }: { update: DailyMarketUpdate }) {
  const { rateTrendVisual: visual } = update;

  return (
    <MarketSection
      id="rate-movement"
      eyebrow="Rate movement"
      title={visual.headline}
      variant="warm"
    >
      <RevealGroup stagger={60}>
        <div className="reveal-item brief-rate-hero">
          <p className="brief-rate-hero-label">{visual.thirtyYearLabel}</p>
          <p className="brief-rate-hero-value">{visual.thirtyYearValue}</p>
        </div>
        <div className="reveal-item brief-rate-timeline">
          {visual.points.map((point, index) => (
            <div key={point.label} className="brief-rate-step">
              {index > 0 ? <span className="brief-rate-connector" aria-hidden /> : null}
              <div className="brief-rate-step-card">
                <div className="flex items-center justify-between gap-2">
                  <span className="brief-rate-step-label">{point.label}</span>
                  <DirectionArrow direction={point.direction} />
                </div>
                <p className="brief-rate-step-value">{point.value}</p>
              </div>
            </div>
          ))}
        </div>
        <CollapsibleDetail label="More detail" children={visual.detailNote ?? ""} />
      </RevealGroup>
    </MarketSection>
  );
}
