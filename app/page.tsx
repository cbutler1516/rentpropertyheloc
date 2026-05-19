import { FooterBrand } from "./components/brand";
import { ComplianceFooter } from "./components/compliance-footer";
import { FooterSocialLinks } from "./components/footer-social-links";
import { FounderAdvisorSection } from "./components/founder-advisor-section";
import { HeroVideo } from "./components/hero-video";
import { FeaturedContentSection } from "./components/featured-content-section";
import { LeadCaptureForm } from "./components/lead-capture-form";
import { ProofLayer } from "./components/proof-layer";
import { PageAmbient } from "./components/page-ambient";
import { RevealGroup } from "./components/reveal-group";
import { SiteNav } from "./components/site-nav";
import { StickyMobileCta } from "./components/sticky-mobile-cta";
import { TrackedAnchor, TrackedLink } from "./components/tracked-link";

const paths = [
  {
    label: "Buy a Home",
    title: "Know your number first.",
    href: "/buyers",
    description: "Payment, cash, and timing before the search.",
    cta: "Start Buyer Strategy",
  },
  {
    label: "Lower My Payment",
    title: "Review refinance timing.",
    href: "/homeowners",
    description: "Break-even and cash flow—not rate panic.",
    cta: "Review Timing",
  },
  {
    label: "Use My Equity",
    title: "Compare equity paths.",
    href: "/learn/heloc-strategy",
    description: "HELOC, cash-out, or hold—each solves a different problem.",
    cta: "Explore Equity",
  },
  {
    label: "Agent Support",
    title: "Sharpen buyer conversations.",
    href: "/agents",
    description: "Financing context before the offer window.",
    cta: "Agent Resources",
  },
  {
    label: "Commercial",
    title: "Make the deal legible.",
    href: "/commercial",
    description: "Asset, sponsor, structure, and next steps.",
    cta: "Commercial Review",
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
              Mortgage Strategy · Residential · Commercial
            </p>
            <h1 className="hero-enter hero-enter-d2 hero-headline-glow relative max-w-5xl text-[clamp(2.25rem,7vw,4.75rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-white">
              Make the loan
              <br />
              <span className="text-zinc-500">make sense.</span>
            </h1>
            <p className="hero-enter hero-enter-d3 relative mt-6 max-w-lg text-base leading-relaxed text-zinc-400 md:mt-8 md:max-w-2xl md:text-lg">
              Education-first mortgage guidance for buyers, homeowners, agents,
              and real estate partners.
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
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section
          id="paths"
          data-analytics-section="homepage_paths"
          className="section-flow section-matte relative border-t border-zinc-900/40 backdrop-blur-sm"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup stagger={120}>
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                Your next move
              </p>
              <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                What are you trying to do?
              </h2>
              <p className="reveal-item mt-4 max-w-xl text-base leading-relaxed text-zinc-500 md:text-lg">
                One clear path—no calculator maze.
              </p>
            </RevealGroup>

            <RevealGroup
              className="mt-10 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:mt-12 md:grid-cols-2 lg:grid-cols-5"
              stagger={150}
            >
              {paths.map((path, index) => (
                <TrackedLink
                  key={path.label}
                  href={path.href}
                  location="homepage_audience_path"
                  label={path.cta}
                  className={`reveal-item group relative flex h-full min-h-[14rem] flex-col bg-[#050505] p-6 transition-colors duration-[var(--duration-hover)] hover:bg-[#0a0a0a] md:min-h-[15rem] md:p-7 ${
                    index === 0 ? "lg:col-span-2" : "lg:col-span-1"
                  }`}
                >
                  <span className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {path.label}
                  </span>
                  <h3 className="relative mt-6 text-2xl font-semibold tracking-[-0.03em] text-white">
                    {path.title}
                  </h3>
                  <p className="relative mt-4 flex-1 text-sm leading-relaxed text-zinc-500 group-hover:text-zinc-400">
                    {path.description}
                  </p>
                  <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-white">
                    {path.cta}
                    <span className="text-[#7c3aed]" aria-hidden>
                      →
                    </span>
                  </span>
                </TrackedLink>
              ))}
            </RevealGroup>
            <p className="mt-10 text-center text-sm text-zinc-500">
              Based in Washington. Licensed in multiple states.
            </p>
            <p className="mt-4 text-center text-sm text-zinc-600">
              Puget Sound expertise:{" "}
              <TrackedLink
                href="/washington-mortgage"
                location="homepage_local"
                label="Washington"
                className="text-zinc-400 hover:text-white"
              >
                Washington
              </TrackedLink>
              {" · "}
              <TrackedLink
                href="/markets/seattle"
                location="homepage_local"
                label="Seattle"
                className="text-zinc-400 hover:text-white"
              >
                Seattle
              </TrackedLink>
              {" · "}
              <TrackedLink
                href="/markets/bellevue"
                location="homepage_local"
                label="Bellevue"
                className="text-zinc-400 hover:text-white"
              >
                Bellevue
              </TrackedLink>
            </p>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <FeaturedContentSection
          surface="homepage"
          title="Start here"
          lead="Three picks—video, guide, and market depth."
          eyebrow="Featured"
        />

        <FounderAdvisorSection audience="general" />

        <ProofLayer />

        <section
          id="cta"
          className="section-flow relative"
          data-analytics-section="lead_capture"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="cta-panel group relative overflow-hidden border border-zinc-900/80 bg-[#0a0a0a] px-6 py-16 md:px-16 md:py-24">
              <RevealGroup className="relative" stagger={110}>
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  Next step
                </p>
                <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                  Talk through your scenario.
                </h2>
                <p className="reveal-item mt-6 max-w-lg text-base leading-relaxed text-zinc-400 md:mt-8 md:text-lg">
                  Share your goal and timeline. We respond with context—not a
                  rate quote.
                </p>
                <LeadCaptureForm
                  formType="Buyer Strategy Call"
                  submitLabel="Start Your Strategy"
                  intent="buyer"
                />
                <p className="reveal-item mt-5 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                  No-pressure guidance · Not a loan application
                </p>
              </RevealGroup>
            </div>
          </div>
        </section>
      </main>

      <StickyMobileCta
        href="#cta"
        label="Start Your Strategy"
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
