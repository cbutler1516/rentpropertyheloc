import type { Metadata } from "next";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import { InternalPage } from "../components/internal-page";
import { SchedulingCTASection } from "../components/scheduling-cta";

export const metadata: Metadata = {
  title: "Buyers | The Loan Playbook",
  description:
    "A strategic loan preparation experience for buyers who want clarity before they move.",
};

export default function BuyersPage() {
  return (
    <InternalPage
      eyebrow="Buyer Strategy"
      title="Enter the market with a plan, not a guess."
      lead="For buyers who want clarity before the search gets loud."
      focus="Readiness, timing, leverage, and loan choices should be clear before the offer."
      strategyVisual="football-buyers"
      sections={[
        {
          label: "01 / Readiness",
          title: "Know where you stand",
          body: "Income, credit, cash, and timing tell the real story.",
        },
        {
          label: "02 / Positioning",
          title: "Structure the file",
          body: "Turn scattered documents into a prepared borrower profile.",
        },
        {
          label: "03 / Execution",
          title: "Move with confidence",
          body: "When the right property appears, the plan is already built.",
        },
      ]}
      closing={{
        title: "Prepare before the search gets loud.",
        body: "Understand the field. Prepare the file. Enter with leverage.",
      }}
      extraSections={
        <>
          <ConversionCTA {...conversionCtas.buyerStrategy} />
          <SchedulingCTASection type="buyer" />
        </>
      }
    />
  );
}
