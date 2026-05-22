import { LeadCaptureForm } from "@/app/components/lead-capture-form";
import { RevealGroup } from "@/app/components/reveal-group";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

export function NewsletterBriefCta({ update }: { update: DailyMarketUpdate }) {
  const { newsletterCta: cta } = update;

  return (
    <MarketSection
      id="market-email"
      eyebrow="Daily brief"
      title={cta.headline}
      lead={cta.subhead}
      variant="warm"
      className="border-t border-zinc-200/80"
    >
      <RevealGroup stagger={80}>
        <div className="reveal-item content-panel-light mx-auto max-w-2xl rounded-2xl p-6 md:p-10">
          <LeadCaptureForm
            formType="Newsletter Signup"
            submitLabel={cta.buttonLabel}
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
