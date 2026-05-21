import type { Metadata } from "next";
import { BookingCtaSection } from "../components/booking-cta";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import { InternalPage } from "../components/internal-page";
import { LiquidityStrategyStrip } from "../components/liquidity-strategy-strip";
import { ScenarioReviewCta } from "../components/scenario-review-cta";
import { buildPageMetadata } from "../lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Investor Mortgage Strategy",
  description:
    "DSCR, rental portfolio, and investor financing context—structure-first guidance for operators and landlords.",
  path: "/investors",
});

export default function InvestorsPage() {
  return (
    <InternalPage
      contentSurface="commercial"
      founderAudience="commercial"
      featuredLimit={2}
      showFeatured
      featuredTitle="Investor picks"
      featuredLead="DSCR and portfolio context—not generic rate posts."
      eyebrow="Investor Strategy"
      title="Financing for rental and portfolio investors."
      lead="For landlords and operators who need the deal to read clearly before terms."
      focus="Clarify income, asset, reserves, and exit—then match DSCR or bridge structure."
      strategyVisual="golf-commercial"
      heroVideoSrc="/videos/loan-playbook-commercial-golf.mp4"
      primaryCta={{
        href: "/strategy-review",
        label: "Review My Options",
      }}
      sections={[
        {
          label: "01 / Asset",
          title: "Define the property",
          body: "Rent roll, condition, and use case shape the lender read.",
        },
        {
          label: "02 / Sponsor",
          title: "Document the operator",
          body: "Experience, liquidity, and track record—not just a credit score.",
        },
        {
          label: "03 / Structure",
          title: "Sequence the debt",
          body: "DSCR, bridge, and portfolio paths each solve a different hold period.",
        },
      ]}
      closing={{
        title: "Make the investment legible.",
        body: "Show the asset. Explain the operator. Structure with intention.",
      }}
      extraSections={
        <>
          <LiquidityStrategyStrip location="investors" />
          <section className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <ScenarioReviewCta audience="commercial" location="investors_page" />
          </section>
          <div id="investor-strategy">
            <ConversionCTA
              {...conversionCtas.commercialReview}
              submitLabel="Review Investment Strategy"
            />
          </div>
          <BookingCtaSection
            location="investors_page"
            types={["strategy", "investor"]}
            lead="Optional sessions for rental and portfolio investors."
          />
        </>
      }
    />
  );
}
