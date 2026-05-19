import type { Metadata } from "next";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import { InternalPage } from "../components/internal-page";
import { TrackedLink } from "../components/tracked-link";

export const metadata: Metadata = {
  title: "Commercial | The Loan Playbook",
  description:
    "Commercial financing guidance for borrowers, investors, and operators who need the deal to read clearly.",
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
          <section className="section-flow relative">
            <div className="section-bridge-top" aria-hidden />
            <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
              <TrackedLink
                href="/commercial/calculator"
                location="commercial_calculator_feature"
                label="Open Calculator"
                className="card-lift group relative block overflow-hidden border border-zinc-900/80 bg-[#050505] p-8 md:p-10"
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(ellipse at top left, rgba(91, 33, 182, 0.14), transparent 60%)",
                  }}
                  aria-hidden
                />
                <p className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                  Commercial Tool
                </p>
                <h2 className="relative mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                  Commercial Mortgage Calculator
                </h2>
                <p className="relative mt-6 max-w-3xl text-lg leading-relaxed text-zinc-500">
                  Run DSCR, LTV, payment, bridge, development, SBA, and
                  refinance scenarios before starting the conversation.
                </p>
                <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-white transition-all duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:translate-x-1">
                  Open Calculator
                  <span className="text-[#7c3aed]" aria-hidden>
                    →
                  </span>
                </span>
              </TrackedLink>
            </div>
            <div className="section-bridge-bottom" aria-hidden />
          </section>
          <div id="commercial-review">
            <ConversionCTA {...conversionCtas.commercialReview} />
          </div>
        </>
      }
    />
  );
}
