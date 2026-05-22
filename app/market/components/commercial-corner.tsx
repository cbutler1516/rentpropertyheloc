import { RevealGroup } from "@/app/components/reveal-group";
import { TrackedLink } from "@/app/components/tracked-link";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

type CommercialCornerProps = {
  update: DailyMarketUpdate;
};

export function CommercialCorner({ update }: CommercialCornerProps) {
  const { commercial } = update;

  return (
    <MarketSection
      id="commercial-corner"
      eyebrow="Commercial corner"
      title={commercial.headline}
      lead={commercial.summary}
      variant="graphite"
    >
      <RevealGroup stagger={60}>
        <TrackedLink
          href={commercial.href}
          location="market_commercial_corner"
          label={commercial.ctaLabel}
          className="reveal-item market-btn-primary market-btn-on-dark"
        >
          {commercial.ctaLabel}
        </TrackedLink>
      </RevealGroup>
    </MarketSection>
  );
}
