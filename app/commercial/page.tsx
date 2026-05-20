import type { Metadata } from "next";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import { BookingCtaSection } from "../components/booking-cta";
import { InternalPage } from "../components/internal-page";
import { LicensedMarketsRail } from "../components/licensed-markets-rail";
import { TrackedLink } from "../components/tracked-link";
import { buildPageMetadata } from "../lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Commercial & Investor Financing",
  description:
    "Structure-first guidance for investors, operators, and builders—DSCR, bridge, development, and commercial paths with Chris Butler as strategist and advisor.",
  path: "/commercial",
});

export default function CommercialPage() {
  return (
    <InternalPage
      contentSurface="commercial"
      founderAudience="commercial"
      featuredTitle="Featured for investors"
      featuredLead="DSCR, bridge, and structure-first guides—not generic LO pitch decks."
      eyebrow="Investor & Commercial Strategy"
      title="Capital strategy for operators—not generic LO branding."
      lead="For investors, builders, and sponsors who need the deal to read clearly before terms."
      focus="Clarify asset, sponsor, reserves, and exit—then sequence debt and equity with intent."
      strategyVisual="golf-commercial"
      heroVideoSrc="/videos/loan-playbook-commercial-golf.mp4"
      primaryCta={{
        href: "/strategy-review",
        label: "Review Your Strategy",
      }}
      sections={[
        {
          label: "01 / Asset",
          title: "Define the collateral",
          body: "Property type, income, condition, location, and use case shape the read.",
        },
        {
          label: "02 / Sponsor",
          title: "Position the operator",
          body: "Experience, liquidity, guarantees, and track record—not just a credit score.",
        },
        {
          label: "03 / Capital",
          title: "Sequence the structure",
          body: "DSCR, bridge, construction, and commercial paths each solve a different problem.",
        },
      ]}
      closing={{
        title: "Make the deal legible.",
        body: "Show the asset. Explain the operator. Structure with intention.",
      }}
      extraSections={
        <>
          <section className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="border border-zinc-900/80 bg-[#050505] p-7 md:p-8">
              <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                Paths we frame
              </p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  "DSCR & rental portfolios",
                  "Bridge & transitional debt",
                  "Builder / development financing",
                  "Investor acquisitions",
                  "Refinance & recapitalization",
                  "Agent & advisor partnerships",
                ].map((item) => (
                  <li
                    key={item}
                    className="text-sm leading-relaxed text-zinc-400"
                  >
                    {item}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-relaxed text-zinc-500">
                Prefer the structured intake?{" "}
                <TrackedLink
                  href="/strategy-review"
                  location="commercial_intake_link"
                  className="text-zinc-300 hover:text-white"
                >
                  Review your strategy →
                </TrackedLink>
              </p>
            </div>
          </section>
          <LicensedMarketsRail
            title="Licensed markets for investor strategy."
            lead="Washington roots with multi-state licensing for investor and commercial-adjacent paths."
            showMetros={false}
          />
          <div id="commercial-review">
            <ConversionCTA
              {...conversionCtas.commercialReview}
              submitLabel="Review Your Strategy"
            />
          </div>
          <BookingCtaSection
            location="commercial_page"
            types={["strategy", "investor", "commercial"]}
            lead="Optional sessions for investors, builders, and commercial sponsors."
          />
        </>
      }
    />
  );
}
