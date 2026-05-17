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
      lead="For investors, operators, and builders who need a sharper framework for capital, collateral, and execution risk."
      focus="Commercial files are judged through a different lens. The playbook clarifies the asset, the operator, the capital stack, and the story behind the transaction."
      strategyVisual="golf-commercial"
      heroVideoSrc="/videos/loan-playbook-commercial-golf.mp4"
      sections={[
        {
          label: "01 / Asset",
          title: "Define the collateral",
          body: "Property type, income, condition, location, and use case all influence how the market will read the opportunity.",
        },
        {
          label: "02 / Sponsor",
          title: "Position the borrower",
          body: "Experience, liquidity, guarantees, and operating history shape confidence before terms are ever discussed.",
        },
        {
          label: "03 / Capital",
          title: "Sequence the structure",
          body: "Debt, equity, reserves, and timeline need to work as one system. The structure should support the strategy, not fight it.",
        },
      ]}
      closing={{
        title: "Make the deal legible.",
        body: "The commercial path is built around clarity: show the asset, explain the operator, and structure the financing with intention.",
      }}
      extraSections={<ConversionCTA {...conversionCtas.commercialReview} />}
    />
  );
}
