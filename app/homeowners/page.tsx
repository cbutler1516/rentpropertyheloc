import type { Metadata } from "next";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import { BookingCtaSection } from "../components/booking-cta";
import { InternalPage } from "../components/internal-page";

export const metadata: Metadata = {
  title: "Homeowners | The Loan Playbook",
  description:
    "Refinance timing, HELOC strategy, and equity decisions for homeowners who want clarity—not rate noise.",
};

export default function HomeownersPage() {
  return (
    <InternalPage
      contentSurface="homeowners"
      featuredTitle="Featured for homeowners"
      featuredLead="Timing, equity, and payment context when your goals change."
      eyebrow="Homeowner Strategy"
      title="Your home is an asset—with options."
      lead="Refinance, HELOC, and equity moves should follow the plan—not the headline."
      focus="Rate timing, cash flow, flexibility, and long-term fit."
      strategyVisual="tennis-about"
      heroVideoSrc="/videos/loan-playbook-learn-film-room.mp4"
      founderAudience="homeowner"
      primaryCta={{ href: "#homeowner-strategy", label: "Review Refinance Timing" }}
      stickyCta={{ href: "#homeowner-strategy", label: "Review Timing" }}
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
          <div id="homeowner-strategy">
            <ConversionCTA {...conversionCtas.homeownerStrategy} />
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
