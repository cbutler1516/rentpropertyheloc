import { RevealGroup } from "@/app/components/reveal-group";
import { TrackedLink } from "@/app/components/tracked-link";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

type RefiHelocWatchProps = {
  update: DailyMarketUpdate;
};

export function RefiHelocWatch({ update }: RefiHelocWatchProps) {
  const { refiHeloc } = update;

  return (
    <MarketSection
      id="refi-heloc-watch"
      eyebrow="Refi / HELOC watch"
      title={refiHeloc.headline}
      lead={refiHeloc.summary}
      variant="white"
    >
      <RevealGroup stagger={70}>
        <ul className="reveal-item market-bullet-list">
          {refiHeloc.bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <TrackedLink
          href={refiHeloc.href}
          location="market_refi_heloc"
          label={refiHeloc.ctaLabel}
          className="reveal-item market-text-link mt-6 inline-flex"
        >
          {refiHeloc.ctaLabel} →
        </TrackedLink>
      </RevealGroup>
    </MarketSection>
  );
}
