import { RevealGroup } from "@/app/components/reveal-group";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

type AgentTalkingPointsProps = {
  update: DailyMarketUpdate;
};

export function AgentTalkingPoints({ update }: AgentTalkingPointsProps) {
  const { talkingPoints } = update;

  return (
    <MarketSection
      id="agent-talking-points"
      eyebrow="Agent talking points"
      title="Client-ready language"
      lead="Copy, adapt, or voice-note these lines in showings and listing appointments."
      variant="warm"
    >
      <RevealGroup className="grid gap-5 lg:grid-cols-3" stagger={80}>
        <article className="reveal-item market-talk-card">
          <p className="market-talk-label">Buyer talking point</p>
          <p className="market-talk-body">{talkingPoints.buyer}</p>
        </article>
        <article className="reveal-item market-talk-card">
          <p className="market-talk-label">Seller talking point</p>
          <p className="market-talk-body">{talkingPoints.seller}</p>
        </article>
        <article className="reveal-item market-talk-card market-talk-card-script">
          <p className="market-talk-label market-talk-label-gold">Agent script</p>
          <p className="market-talk-body">{talkingPoints.script}</p>
        </article>
      </RevealGroup>
    </MarketSection>
  );
}
