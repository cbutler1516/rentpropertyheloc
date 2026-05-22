import { RevealGroup } from "@/app/components/reveal-group";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";
import { DirectionArrow } from "./market-ui";

export function RealEstatePulseSection({ update }: { update: DailyMarketUpdate }) {
  const { realEstatePulse: pulse } = update;

  return (
    <MarketSection
      id="real-estate-pulse"
      eyebrow="Real estate market pulse"
      title="What's happening in housing"
      variant="warm"
    >
      <RevealGroup
        className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        stagger={55}
      >
        {pulse.cards.map((card) => (
          <article key={card.id} className="reveal-item brief-pulse-card">
            <div className="flex items-start justify-between gap-2">
              <p className="brief-pulse-label">{card.label}</p>
              <DirectionArrow direction={card.direction} />
            </div>
            <p className="brief-pulse-value">{card.value}</p>
            <p className="brief-pulse-plain">{card.plainEnglish}</p>
          </article>
        ))}
      </RevealGroup>
      <RevealGroup className="mt-8" stagger={50}>
        <div className="reveal-item brief-seattle-note">
          <p className="brief-seattle-note-label">Seattle / local note</p>
          <p>{pulse.seattleNote}</p>
        </div>
      </RevealGroup>
    </MarketSection>
  );
}
