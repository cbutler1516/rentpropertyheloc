import type { Metadata } from "next";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import { BookingCtaSection } from "../components/booking-cta";
import { InternalPage } from "../components/internal-page";
import { LiquidityStrategyStrip } from "../components/liquidity-strategy-strip";
import { ScenarioReviewCta } from "../components/scenario-review-cta";

export const metadata: Metadata = {
  title: "Homeowners | The Loan Playbook",
  description:
    "Refinance timing, HELOC strategy, and equity decisions for homeowners who want clarity—not rate noise.",
};

export default function HomeownersPage() {
  return (
    <InternalPage
      contentSurface="homeowners"
      featuredLimit={2}
      showFeatured
      featuredTitle="Equity & timing"
      featuredLead="HELOC, refinance, and hold scenarios—two starting points."
      eyebrow="Homeowner Strategy"
      title="Your home is an asset—with options."
      lead="Refinance, HELOC, and equity moves should follow the plan—not the headline."
      focus="Rate timing, cash flow, flexibility, and long-term fit."
      strategyVisual="tennis-about"
      heroVideoSrc="/videos/loan-playbook-learn-film-room.mp4"
      founderAudience="homeowner"
      primaryCta={{ href: "/strategy-review", label: "Review My Options" }}
      stickyCta={{ href: "/strategy-review", label: "Review Options" }}
      sections={[
        {
          label: "01 / Timing",
          title: "When a move actually fits",
          body: "Break-even, cash flow, and future flexibility matter more than a rate post.",
        },
        {
          label: "02 / Equity",
          title: "Choose the right tool",
          body: "HELOC, cash-out, or leaving the first mortgage alone—each solves a different problem.",
        },
        {
          label: "03 / Execution",
          title: "Structure before submission",
          body: "Documentation and sequencing should be clear before you apply.",
        },
      ]}
      closing={{
        title: "Make the equity decision deliberately.",
        body: "Understand timing. Compare paths. Move with context.",
      }}
      extraSections={
        <>
          <LiquidityStrategyStrip location="homeowners" />
          <section className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <ScenarioReviewCta audience="homeowner" location="homeowners_page" />
          </section>
          <div id="homeowner-strategy">
            <ConversionCTA
              {...conversionCtas.homeownerStrategy}
              submitLabel="Review My Options"
            />
          </div>
          <BookingCtaSection
            location="homeowners_page"
            types={["strategy", "residential"]}
          />
        </>
      }
    />
  );
}
