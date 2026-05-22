import { LeadCaptureForm } from "@/app/components/lead-capture-form";
import { RevealGroup } from "@/app/components/reveal-group";
import { MarketSection } from "./market-section";

export function MarketEmailSignup() {
  return (
    <MarketSection
      id="market-email"
      eyebrow="Agent market updates"
      title="Get the morning briefing in your inbox"
      lead="Rates, Seattle signal, and talking points—built for listing appointments and buyer consults."
      variant="warm"
      className="border-t border-zinc-200/80"
    >
      <RevealGroup stagger={80}>
        <div className="reveal-item content-panel-light mx-auto max-w-2xl rounded-2xl p-6 md:p-10">
          <LeadCaptureForm
            formType="Newsletter Signup"
            submitLabel="Subscribe to market updates"
            intent="agent"
          />
          <p className="mt-4 text-center text-xs leading-relaxed text-zinc-500">
            For licensed real estate professionals. Educational market
            commentary—not a commitment to lend.
          </p>
        </div>
      </RevealGroup>
    </MarketSection>
  );
}
