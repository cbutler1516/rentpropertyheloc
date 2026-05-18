import { FooterBrand } from "./components/brand";
import { ComplianceFooter } from "./components/compliance-footer";
import { FooterSocialLinks } from "./components/footer-social-links";
import { HeroVideo } from "./components/hero-video";
import { LeadCaptureForm } from "./components/lead-capture-form";
import { StatRow } from "./components/design-system";
import { PageAmbient } from "./components/page-ambient";
import { RevealGroup } from "./components/reveal-group";
import { SiteNav } from "./components/site-nav";
import { TrackedAnchor, TrackedLink } from "./components/tracked-link";

const paths = [
  {
    label: "Home Buyers",
    title: "Know your number first.",
    href: "/buyers",
    description:
      "Readiness, payment, cash-to-close, loan options, and offer prep in one clear path.",
    cta: "Start Buyer Path",
  },
  {
    label: "Real Estate Agents",
    title: "Give buyers clearer context.",
    href: "/agents",
    description:
      "Buyer education and lending context agents can use in real conversations.",
    cta: "Explore Agent Path",
  },
  {
    label: "Managing Brokers / Partners",
    title: "Build a cleaner finance layer.",
    href: "/partners",
    description:
      "Education infrastructure and compliant partnership paths for firms.",
    cta: "Explore Partner Path",
  },
  {
    label: "Commercial / Investors",
    title: "Make the deal legible.",
    href: "/commercial",
    description:
      "Asset, sponsor, capital stack, risk, and execution path made legible.",
    cta: "Review Commercial Financing Options",
  },
];

const authorityStats = [
  { value: "9", label: "Licensed states" },
  { value: "2", label: "Residential + commercial" },
  { value: "1", label: "Education-first platform" },
];

const founderHighlights = [
  "Experienced mortgage advisor",
  "Former real estate development background",
  "Residential and commercial strategy",
  "Capital-markets mindset",
  "Education-first media platform",
  "Licensed multi-state lending context",
];

const educationLinks = [
  {
    label: "Learn",
    title: "Read the guides.",
    body: "Seller concessions, buydowns, jumbo, HELOC, and refinance timing.",
    href: "/learn",
    cta: "Read Buyer Guides",
  },
  {
    label: "Videos",
    title: "Watch the clips.",
    body: "Short-form explainers, market context, and buyer education.",
    href: "/videos",
    cta: "Watch Videos",
  },
];

export default function Home() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-x-hidden bg-[#050505]">
      <PageAmbient />
      {/* Layered atmosphere */}
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
      <div
        className="glow-orb-delayed pointer-events-none fixed right-[-10%] bottom-[15%] z-[1] h-[420px] w-[420px] rounded-full bg-[#4c1d95]/20 blur-[110px]"
        aria-hidden
      />
      <div
        className="ambient-drift pointer-events-none fixed bottom-0 left-[-5%] z-[1] h-[300px] w-[300px] rounded-full bg-[#5b21b6]/10 blur-[90px]"
        aria-hidden
      />
      <div
        className="scan-line pointer-events-none fixed inset-x-0 top-0 z-[2] h-px bg-gradient-to-r from-transparent via-[#7c3aed]/30 to-transparent"
        aria-hidden
      />

      <SiteNav />

      <main className="relative z-10 flex flex-1 flex-col">
        {/* Hero */}
        <section className="relative isolate mx-auto flex w-full max-w-7xl flex-col justify-center px-6 pb-32 pt-16 md:px-10 md:pb-44 md:pt-28">
          <HeroVideo
            src="/videos/loan-playbook-football-hero.mp4"
            loading="eager"
          />
          <div className="relative z-10 flex flex-col">
          <p className="hero-enter hero-enter-d1 relative mb-8 font-mono text-xs tracking-[0.4em] text-[#7c3aed] uppercase">
            Mortgage Media Platform
          </p>
          <h1 className="hero-enter hero-enter-d2 hero-headline-glow relative max-w-5xl text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-white">
            Make the loan
            <br />
            <span className="text-zinc-500">make sense.</span>
          </h1>
          <p className="hero-enter hero-enter-d3 relative mt-10 max-w-xl text-lg leading-relaxed text-zinc-400 md:mt-12 md:text-xl">
            Mortgage guidance and media for buyers, agents, and real estate firms.
          </p>
          <div className="hero-enter hero-enter-d4 relative mt-14 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-16">
            <TrackedAnchor
              href="#paths"
              location="homepage_hero"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Find Your Path
            </TrackedAnchor>
          </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* Who We Help */}
        <section
          id="paths"
          className="section-flow section-matte relative border-t border-zinc-900/40 backdrop-blur-sm"
        >
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5b21b6]/[0.04] to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup stagger={120}>
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                Who We Help
              </p>
              <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                Pick your lane.
              </h2>
              <p className="reveal-item mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
                Four paths. One clear next move.
              </p>
            </RevealGroup>

            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
              stagger={150}
            >
              {paths.map((path) => (
                  <TrackedLink
                    key={path.label}
                    href={path.href}
                    location="homepage_audience_path"
                    label={path.cta}
                    className="reveal-item card-lift group relative flex h-full flex-col border border-zinc-900/80 bg-[#050505] p-9 md:p-11"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100"
                      style={{
                        background:
                          "radial-gradient(ellipse at top left, rgba(91, 33, 182, 0.12), transparent 60%)",
                      }}
                      aria-hidden
                    />
                    <span className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                      {path.label}
                    </span>
                    <h3 className="relative mt-7 text-2xl font-semibold text-white transition-transform duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:translate-x-0.5">
                      {path.title}
                    </h3>
                    <p className="relative mt-5 flex-1 leading-relaxed text-zinc-500 transition-[color] duration-[var(--duration-hover)] group-hover:text-zinc-400">
                      {path.description}
                    </p>
                    <span className="relative mt-10 inline-flex items-center gap-2 text-sm font-medium text-white transition-all duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:translate-x-1">
                      {path.cta}
                      <span className="text-[#7c3aed]" aria-hidden>
                        →
                      </span>
                    </span>
                  </TrackedLink>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* Featured Videos / Learn */}
        <section className="section-flow relative border-t border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup
              stagger={120}
              className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-14"
            >
              <div data-parallax="0.025">
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  Featured Videos / Learn
                </p>
                <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                  Watch the idea.
                  <br />
                  Read the guide.
                </h2>
              </div>
              <p
                className="reveal-item max-w-md text-zinc-500"
                data-parallax="0.02"
              >
                Watch first. Go deeper when ready.
              </p>
            </RevealGroup>

            <RevealGroup
              className="mt-16 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:mt-20 md:grid-cols-2"
              stagger={90}
            >
              {educationLinks.map((item) => (
                <TrackedLink
                  key={item.label}
                  href={item.href}
                  location="homepage_education"
                  label={item.cta}
                  className="reveal-item group relative flex min-h-[18rem] flex-col bg-[#050505] p-8 transition-colors duration-[var(--duration-hover)] hover:bg-[#0a0a0a] md:p-10"
                >
                  <span className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {item.label}
                  </span>
                  <h3 className="relative mt-6 text-3xl font-semibold tracking-[-0.03em] text-white">
                    {item.title}
                  </h3>
                  <p className="relative mt-5 flex-1 leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
                    {item.body}
                  </p>
                  <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] group-hover:text-white">
                    {item.cta}
                    <span className="text-[#7c3aed]" aria-hidden>
                      →
                    </span>
                  </span>
                </TrackedLink>
              ))}
            </RevealGroup>
            <p className="mt-8 max-w-2xl font-mono text-[10px] tracking-[0.18em] text-zinc-700 uppercase">
              Educational resources only. Content does not imply loan approval,
              rate availability, or a commitment to lend.
            </p>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* Authority */}
        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.78fr_1.22fr] md:gap-16 md:px-10">
            <RevealGroup
              className="relative overflow-hidden border border-zinc-900/80 bg-[#050505] p-6 md:p-8"
              stagger={100}
            >
              <div className="reveal-item relative aspect-[4/5] overflow-hidden border border-zinc-900/80 bg-[#080808]">
                <div
                  className="playbook-grid pointer-events-none absolute inset-0 opacity-25"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#7c3aed]/15 via-transparent to-black/50"
                  aria-hidden
                />
                <div className="relative flex h-full flex-col justify-between p-6">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    Founder Profile
                  </p>
                  <h3 className="max-w-xs self-end text-3xl font-semibold tracking-[-0.03em] text-white">
                    Mortgage, real estate, and media.
                  </h3>
                </div>
              </div>
            </RevealGroup>

            <RevealGroup className="flex flex-col justify-center" stagger={120}>
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                Authority
              </p>
              <h2 className="reveal-item mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-6xl">
                Built by an advisor.
                <br />
                Shaped like media.
              </h2>
              <p className="reveal-item mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400">
                Advisory work, development context, commercial finance, and
                education-first media.
              </p>
              <StatRow className="reveal-item mt-10" stats={authorityStats} />
              <div className="reveal-item mt-10 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2">
                {founderHighlights.map((item) => (
                  <div key={item} className="bg-[#050505] p-4">
                    <p className="font-mono text-[10px] tracking-[0.18em] text-zinc-500 uppercase">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
              <div className="reveal-item mt-10 flex flex-col gap-4 sm:flex-row">
                <TrackedLink
                  href="/about"
                  location="homepage_authority"
                  className="btn-ghost inline-flex h-14 w-fit items-center justify-center border border-zinc-800 px-8 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
                >
                  Learn More
                </TrackedLink>
              </div>
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* CTA */}
        <section id="cta" className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
              <div
                data-parallax="0.03"
                className="cta-panel group relative overflow-hidden border border-zinc-900/80 bg-[#0a0a0a] px-8 py-20 md:px-20 md:py-28"
              >
                <div
                  className="playbook-grid playbook-grid-animated pointer-events-none absolute inset-0 opacity-30"
                  aria-hidden
                />
                <div
                  className="cta-glow pointer-events-none absolute -top-1/2 left-1/2 h-full w-full -translate-x-1/2 rounded-full bg-[#5b21b6]/15 blur-[100px]"
                  aria-hidden
                />
                <div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/12 via-transparent to-transparent"
                  aria-hidden
                />
                <RevealGroup className="relative" stagger={110}>
                  <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                    Start the Conversation
                  </p>
                  <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-6xl">
                    Start the conversation.
                  </h2>
                  <p className="reveal-item mt-8 max-w-lg text-lg leading-relaxed text-zinc-400 md:mt-10">
                    Tell us the audience, goal, and timeline.
                  </p>
                  <LeadCaptureForm
                    formType="Buyer Strategy Call"
                    submitLabel="Start the Conversation"
                  />
                  <p className="reveal-item mt-5 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                    Educational content only · No rate quote or loan commitment
                  </p>
                </RevealGroup>
              </div>
          </div>
        </section>
      </main>

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
