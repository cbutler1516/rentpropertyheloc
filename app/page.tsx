import type { Metadata } from "next";
import { FooterBrand } from "./components/brand";
import { buildPageMetadata } from "./lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Mortgage Strategy for Buyers, Homeowners & Investors",
  description:
    "Education-first mortgage guidance—videos, guides, and a simple intake for buyers, homeowners, and investors. HELOC, DSCR, and equity paths. Licensed in multiple states.",
  path: "/",
});
import { ComplianceFooter } from "./components/compliance-footer";
import { FooterSocialLinks } from "./components/footer-social-links";
import { FounderAdvisorSection } from "./components/founder-advisor-section";
import { HeroVideo } from "./components/hero-video";
import { FeaturedContentSection } from "./components/featured-content-section";
import { LeadCaptureForm } from "./components/lead-capture-form";
import { LiquidityStrategyStrip } from "./components/liquidity-strategy-strip";
import { ProofLayer } from "./components/proof-layer";
import { PageAmbient } from "./components/page-ambient";
import { RevealGroup } from "./components/reveal-group";
import { SiteNav } from "./components/site-nav";
import { StickyMobileCta } from "./components/sticky-mobile-cta";
import { TrackedAnchor, TrackedLink } from "./components/tracked-link";

const paths = [
  {
    label: "Buy a Home",
    title: "Know your number before you search.",
    href: "/buyers",
    description: "Payment, cash to close, and timing—without a calculator maze.",
    cta: "Buy a Home",
  },
  {
    label: "Use Equity / Refinance",
    title: "Keep your rate. Access capital.",
    href: "/homeowners",
    description: "Refinance timing, HELOC, or hold—the right tool for the goal.",
    cta: "Explore HELOC Options",
  },
  {
    label: "Invest",
    title: "Rental and portfolio financing.",
    href: "/investors",
    description: "DSCR, bridge, and acquisition capital for landlords and operators.",
    cta: "Investment Property Financing",
  },
  {
    label: "Commercial",
    title: "Sponsors and asset clarity.",
    href: "/commercial",
    description: "Structure-first context for operators and commercial sponsors.",
    cta: "Commercial Financing",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#050505] pb-20 md:pb-0">
      <PageAmbient />
      <div
        className="playbook-grid playbook-grid-animated strategy-lines pointer-events-none fixed inset-0 z-0 opacity-50"
        aria-hidden
      />
      <div
        className="vignette pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
      />
      <div
        className="glow-orb-slow pointer-events-none fixed top-[8%] left-1/2 z-[1] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[#5b21b6]/25 blur-[140px]"
        aria-hidden
      />
      <div
        className="glow-orb pointer-events-none fixed -top-32 left-1/2 z-[1] h-[480px] w-[640px] -translate-x-1/2 rounded-full bg-[#7c3aed]/15 blur-[120px]"
        aria-hidden
      />

      <SiteNav />

      <main className="relative z-10 flex flex-1 flex-col">
        <section
          className="relative isolate mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20"
          data-analytics-section="homepage_hero"
        >
          <HeroVideo
            src="/videos/loan-playbook-football-hero.mp4"
            loading="eager"
          />
          <div className="relative z-10 flex flex-col">
            <p className="hero-enter hero-enter-d1 relative mb-6 font-mono text-xs tracking-[0.4em] text-[#7c3aed] uppercase">
              Buyers · Homeowners · Investors
            </p>
            <h1 className="hero-enter hero-enter-d2 hero-headline-glow relative max-w-5xl text-[clamp(2.25rem,7vw,4.75rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-white">
              Make the loan
              <br />
              <span className="text-zinc-500">make sense.</span>
            </h1>
            <p className="hero-enter hero-enter-d3 relative mt-6 max-w-lg text-base leading-relaxed text-zinc-400 md:mt-8 md:max-w-2xl md:text-lg">
              Clear guidance for buying a home, using equity, and investor
              financing—including HELOC strategy and DSCR paths.
            </p>
            <div className="hero-enter hero-enter-d4 relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
              <TrackedAnchor
                href="#paths"
                location="homepage_hero"
                label="Choose Your Path"
                className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
              >
                Choose Your Path
              </TrackedAnchor>
              <TrackedAnchor
                href="/strategy-review"
                location="homepage_hero"
                label="Review My Options"
                className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
              >
                Review My Options
              </TrackedAnchor>
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section
          id="paths"
          data-analytics-section="homepage_paths"
          className="section-flow section-light relative border-t border-zinc-200/80"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup stagger={120}>
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#6d28d9] uppercase">
                Start here
              </p>
              <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-zinc-900 md:mt-6 md:text-5xl">
                What are you trying to do?
              </h2>
              <p className="reveal-item mt-4 max-w-xl text-base leading-relaxed text-zinc-600 md:text-lg">
                Four clear lanes. Pick one—we&apos;ll point you to the right
                videos, guides, and next step.
              </p>
            </RevealGroup>

            <RevealGroup
              className="mt-10 grid gap-4 md:mt-12 md:grid-cols-2 lg:grid-cols-4"
              stagger={120}
            >
              {paths.map((path) => (
                <TrackedLink
                  key={path.label}
                  href={path.href}
                  location="homepage_audience_path"
                  label={path.cta}
                  className="reveal-item path-card-light group flex min-h-[13rem] flex-col rounded-lg p-6 md:min-h-[14rem] md:p-7"
                >
                  <span className="font-mono text-[10px] tracking-[0.28em] text-[#6d28d9] uppercase">
                    {path.label}
                  </span>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.03em] text-zinc-900">
                    {path.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 group-hover:text-zinc-700">
                    {path.description}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#5b21b6]">
                    {path.cta}
                    <span aria-hidden>→</span>
                  </span>
                </TrackedLink>
              ))}
            </RevealGroup>
            <p className="mt-10 text-center text-sm text-zinc-600">
              Based in Washington. Licensed in multiple states.{" "}
              <TrackedLink
                href="/agents"
                location="homepage_agents_discreet"
                className="text-zinc-500 hover:text-zinc-800"
              >
                Agent resources
              </TrackedLink>
            </p>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <LiquidityStrategyStrip location="homepage" />

        <FeaturedContentSection
          surface="homepage"
          title="Worth your time"
          lead="One video, one guide, and local context—nothing extra."
          eyebrow="Featured"
          tone="light"
          limit={3}
        />

        <FounderAdvisorSection audience="general" />

        <ProofLayer />

        <section
          id="cta"
          className="section-flow section-light relative border-t border-zinc-200/80"
          data-analytics-section="lead_capture"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="content-panel-light rounded-xl px-6 py-14 md:px-14 md:py-20">
              <RevealGroup className="relative" stagger={110}>
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#6d28d9] uppercase">
                  Quick question
                </p>
                <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-zinc-900 md:mt-6 md:text-5xl">
                  Tell us what you&apos;re working on.
                </h2>
                <p className="reveal-item mt-6 max-w-lg text-base leading-relaxed text-zinc-600 md:mt-8 md:text-lg">
                  A short form or a structured intake—we respond with context,
                  not a rate quote.
                </p>
                <LeadCaptureForm
                  formType="Buyer Strategy Call"
                  submitLabel="Start My Strategy"
                  intent="buyer"
                />
                <p className="reveal-item mt-5 font-mono text-[10px] tracking-widest text-zinc-500 uppercase">
                  No-pressure guidance · Not a loan application
                </p>
                <p className="reveal-item mt-4 text-sm text-zinc-600">
                  Prefer a guided intake?{" "}
                  <TrackedLink
                    href="/strategy-review"
                    location="homepage_cta_intake"
                    className="font-medium text-[#5b21b6] hover:text-[#4c1d95]"
                  >
                    Review My Options →
                  </TrackedLink>
                </p>
              </RevealGroup>
            </div>
          </div>
        </section>
      </main>

      <StickyMobileCta
        href="/strategy-review"
        label="Review Options"
        location="homepage_sticky"
      />

      <footer className="relative z-10 border-t border-zinc-900/60 py-12 md:py-14">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-5 px-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase md:flex-row md:px-10">
          <FooterBrand />
          <span>© {new Date().getFullYear()} The Loan Playbook</span>
        </div>
        <FooterSocialLinks />
        <ComplianceFooter />
      </footer>
    </div>
  );
}
