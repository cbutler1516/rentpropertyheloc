import { RevealGroup } from "@/app/components/reveal-group";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

export function AgentScriptsSection({ update }: { update: DailyMarketUpdate }) {
  const { agentScripts: scripts } = update;

  return (
    <MarketSection
      id="agent-scripts"
      eyebrow="What agents should say today"
      title="Copy-ready scripts"
      lead="Use these in texts, showings, listing appointments, and social."
      variant="white"
    >
      <RevealGroup className="grid gap-5 lg:grid-cols-2" stagger={70}>
        <article className="reveal-item brief-script-card">
          <p className="brief-script-label">Buyer script</p>
          <p className="brief-script-body">{scripts.buyerScript}</p>
        </article>
        <article className="reveal-item brief-script-card">
          <p className="brief-script-label">Seller script</p>
          <p className="brief-script-body">{scripts.sellerScript}</p>
        </article>
        <article className="reveal-item brief-script-card brief-script-card-accent lg:col-span-2">
          <p className="brief-script-label brief-script-label-gold">Social post idea</p>
          <p className="brief-script-body">{scripts.socialPostIdea}</p>
        </article>
        <article className="reveal-item brief-script-card lg:col-span-2">
          <p className="brief-script-label">Listing appointment talking point</p>
          <p className="brief-script-body">{scripts.listingAppointmentPoint}</p>
        </article>
      </RevealGroup>
    </MarketSection>
  );
}
