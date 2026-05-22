import { RevealGroup } from "@/app/components/reveal-group";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";
import { CollapsibleDetail, DirectionArrow } from "./market-ui";

export function BondFedWatchSection({ update }: { update: DailyMarketUpdate }) {
  const { bondFedWatch: watch } = update;

  return (
    <MarketSection
      id="bond-fed"
      eyebrow="Bond & Fed watch"
      title="What bonds and the Fed mean for your buyers"
      variant="white"
    >
      <RevealGroup className="grid gap-4 md:grid-cols-2" stagger={60}>
        <div className="reveal-item brief-scorecard">
          <div className="flex items-start justify-between gap-2">
            <p className="brief-scorecard-label">10-year Treasury</p>
            <DirectionArrow direction={watch.treasury10Year.direction} />
          </div>
          <p className="brief-scorecard-value">{watch.treasury10Year.value}</p>
          <p className="brief-scorecard-note">{watch.treasury10Year.note}</p>
        </div>
        <div className="reveal-item brief-scorecard">
          <div className="flex items-start justify-between gap-2">
            <p className="brief-scorecard-label">{watch.mbs.label}</p>
            <DirectionArrow direction={watch.mbs.direction} />
          </div>
          <p className="brief-scorecard-note mt-6">{watch.mbs.note}</p>
        </div>
      </RevealGroup>
      <RevealGroup className="mt-6 space-y-4" stagger={50}>
        <div className="reveal-item brief-narrative-block">
          <p className="brief-narrative-label">Fed narrative</p>
          <p>{watch.fedNarrative}</p>
        </div>
        <div className="reveal-item brief-narrative-block">
          <p className="brief-narrative-label">Inflation / rate pressure</p>
          <p>{watch.inflationNote}</p>
        </div>
        <div className="reveal-item brief-why-care">
          <p className="brief-why-care-label">Why agents should care</p>
          <p>{watch.whyAgentsCare}</p>
        </div>
        <CollapsibleDetail label="Technical notes" children={watch.detailNote ?? ""} />
      </RevealGroup>
    </MarketSection>
  );
}
