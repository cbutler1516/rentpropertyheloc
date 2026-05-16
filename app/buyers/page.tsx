import type { Metadata } from "next";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import { InternalPage } from "../components/internal-page";

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
      lead="For buyers who want to understand the loan process before pressure, deadlines, and competing advice take over."
      focus="The strongest purchase files are built before the offer. We help buyers understand readiness, timing, leverage, and the sequence of decisions that shape the loan outcome."
      strategyVisual="football-buyers"
      sections={[
        {
          label: "01 / Readiness",
          title: "Know where you stand",
          body: "Income, credit, cash, and timing all tell a story. The first move is understanding the story before a lender writes it for you.",
        },
        {
          label: "02 / Positioning",
          title: "Structure the file",
          body: "A clean file moves differently. The playbook turns scattered documents and assumptions into a prepared borrower profile.",
        },
        {
          label: "03 / Execution",
          title: "Move with confidence",
          body: "When the right property appears, the strategy is already built. The buyer can focus on the decision, not the scramble.",
        },
      ]}
      closing={{
        title: "Prepare before the search gets loud.",
        body: "The buyer path is designed to replace uncertainty with a calm sequence: understand the field, prepare the file, and enter the market with leverage.",
      }}
      extraSections={<ConversionCTA {...conversionCtas.buyerStrategy} />}
    />
  );
}
