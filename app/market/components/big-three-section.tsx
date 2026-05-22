import { RevealGroup } from "@/app/components/reveal-group";
import type { DailyMarketUpdate, MarketBigThree } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";
import { DirectionArrow } from "./market-ui";

const LABELS: Record<keyof MarketBigThree, string> = {
  rates: "Rates",
  bonds: "Bonds",
  housing: "Housing",
};

export function BigThreeSection({ update }: { update: DailyMarketUpdate }) {
  const topics = (["rates", "bonds", "housing"] as const).map((key) => ({
    key,
    label: LABELS[key],
    ...update.bigThree[key],
  }));

  return (
    <MarketSection
      id="big-three"
      eyebrow="The 3 big things today"
      title="What moved the market"
      lead="Plain English — plus what to say to clients."
      variant="white"
    >
      <RevealGroup className="grid gap-5 lg:grid-cols-3" stagger={70}>
        {topics.map((item) => (
          <article key={item.key} className="reveal-item brief-big-card">
            <div className="flex items-start justify-between gap-3">
              <h3 className="brief-big-card-title">{item.label}</h3>
              <DirectionArrow direction={item.direction} />
            </div>
            <p className="brief-big-card-summary">{item.summary}</p>
            <div className="brief-big-card-takeaway">
              <p className="brief-big-card-takeaway-label">Agent takeaway</p>
              <p>{item.agentTakeaway}</p>
            </div>
          </article>
        ))}
      </RevealGroup>
    </MarketSection>
  );
}
