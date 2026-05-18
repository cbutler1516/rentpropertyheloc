import type { Metadata } from "next";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import { InternalPage } from "../components/internal-page";

export const metadata: Metadata = {
  title: "Commercial | The Loan Playbook",
  description:
    "A strategic lending framework for commercial borrowers, investors, and operators.",
};

export default function CommercialPage() {
  return (
    <InternalPage
      eyebrow="Commercial Strategy"
      title="Commercial lending rewards structure, not speed."
      lead="For investors and operators who need the deal to read clearly."
      focus="Clarify the asset, sponsor, capital stack, and execution risk before chasing terms."
      strategyVisual="golf-commercial"
      heroVideoSrc="/videos/loan-playbook-commercial-golf.mp4"
      primaryCta={{
        href: "#commercial-review",
        label: "Review Commercial Financing Options",
      }}
      sections={[
        {
          label: "01 / Asset",
          title: "Define the collateral",
          body: "Property type, income, condition, location, and use case shape the read.",
        },
        {
          label: "02 / Sponsor",
          title: "Position the borrower",
          body: "Experience, liquidity, guarantees, and operating history build confidence.",
        },
        {
          label: "03 / Capital",
          title: "Sequence the structure",
          body: "Debt, equity, reserves, and timeline need to work as one system.",
        },
      ]}
      closing={{
        title: "Make the deal legible.",
        body: "Show the asset. Explain the operator. Structure with intention.",
      }}
      extraSections={
        <div id="commercial-review">
          <ConversionCTA {...conversionCtas.commercialReview} />
        </div>
      }
    />
  );
}
