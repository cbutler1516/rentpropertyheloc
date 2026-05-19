import type { Metadata } from "next";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import { InternalPage } from "../components/internal-page";
import { LicensedMarketsRail } from "../components/licensed-markets-rail";

export const metadata: Metadata = {
  title: "Commercial | The Loan Playbook",
  description:
    "Commercial financing guidance for borrowers, investors, and operators who need the deal to read clearly.",
};

export default function CommercialPage() {
  return (
    <InternalPage
      contentSurface="commercial"
      featuredTitle="Featured for investors"
      featuredLead="Structure-first guides and market context for commercial-adjacent paths."
      eyebrow="Commercial Strategy"
      title="Commercial lending rewards structure, not speed."
      lead="For investors and operators who need the deal to read clearly."
      focus="Clarify the asset, sponsor, capital stack, and execution risk before chasing terms."
      strategyVisual="golf-commercial"
      heroVideoSrc="/videos/loan-playbook-commercial-golf.mp4"
      primaryCta={{
        href: "#commercial-review",
        label: "Review Commercial Options",
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
        <>
          <LicensedMarketsRail
            title="Licensed markets for investor strategy."
            lead="Texas, Florida, Arizona, and other states where commercial-adjacent paths are common."
            showMetros={false}
          />
          <div id="commercial-review">
            <ConversionCTA {...conversionCtas.commercialReview} />
          </div>
        </>
      }
    />
  );
}
