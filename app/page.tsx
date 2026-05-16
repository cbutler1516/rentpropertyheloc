import Link from "next/link";
import { FooterBrand } from "./components/brand";
import { ComplianceFooter } from "./components/compliance-footer";
import { StatRow } from "./components/design-system";
import { HeroMotionLayer } from "./components/hero-motion-layer";
import { PageAmbient } from "./components/page-ambient";
import { RevealGroup } from "./components/reveal-group";
import { SiteNav } from "./components/site-nav";
import { homeHubLinks } from "./lib/content-sources";

const paths = [
  {
    label: "01",
    title: "First Move",
    subtitle: "First-time buyers",
    description:
      "Map the field before you tour a single home. Timing, positioning, and pre-game prep.",
  },
  {
    label: "02",
    title: "Reset",
    subtitle: "Refinance & reposition",
    description:
      "When the board changes, your strategy should too. Audit, adjust, execute.",
  },
  {
    label: "03",
    title: "Portfolio",
    subtitle: "Investors & builders",
    description:
      "Multi-property plays demand a different playbook. Structure wins over speed.",
  },
];

const strategyPillars = [
  {
    tag: "SCOUT",
    title: "Read the field",
    body: "Market conditions, lender tendencies, and your leverage—mapped before you act.",
  },
  {
    tag: "PLAN",
    title: "Design the sequence",
    body: "Every document, deadline, and decision ordered like a game plan, not a checklist.",
  },
  {
    tag: "EXECUTE",
    title: "Run the play",
    body: "Submission becomes execution. No surprises. No scrambling at the buzzer.",
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
          <HeroMotionLayer />
          <div className="relative z-10 flex flex-col">
          <p className="hero-enter hero-enter-d1 relative mb-8 font-mono text-xs tracking-[0.4em] text-[#7c3aed] uppercase">
            Strategy Lab · Season One
          </p>
          <h1 className="hero-enter hero-enter-d2 hero-headline-glow relative max-w-5xl text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-white">
            Win the loan
            <br />
            <span className="text-zinc-500">before you apply.</span>
          </h1>
          <p className="hero-enter hero-enter-d3 relative mt-10 max-w-xl text-lg leading-relaxed text-zinc-400 md:mt-12 md:text-xl">
            The Loan Playbook is a cinematic strategy system for borrowers who
            refuse to enter the process blind. Film-room clarity. Game-day
            execution.
          </p>
          <div className="hero-enter hero-enter-d4 relative mt-14 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-16">
            <a
              href="#cta"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Enter the Playbook
            </a>
            <a
              href="#strategy"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              See the Framework
            </a>
          </div>
          <StatRow
            className="hero-enter hero-enter-d5 relative mt-24 md:mt-28"
            stats={[
              { value: "3", label: "Core phases" },
              { value: "1", label: "Unified playbook" },
              { value: "0", label: "Template guesswork" },
            ]}
          />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* Problem */}
        <section
          id="problem"
          className="section-flow section-matte relative border-t border-zinc-900/40 backdrop-blur-sm"
        >
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.04] via-transparent to-[#5b21b6]/[0.02]"
            aria-hidden
          />
          <RevealGroup
            className="relative mx-auto grid w-full max-w-7xl gap-16 px-6 md:grid-cols-2 md:gap-28 md:px-10"
            stagger={140}
          >
            <div data-parallax="0.04">
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                The Problem
              </p>
              <h2 className="reveal-item mt-5 text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                Most borrowers
                <br />
                play without a plan.
              </h2>
            </div>
            <div
              data-parallax="0.03"
              className="flex flex-col justify-center space-y-9 text-lg leading-relaxed text-zinc-400 md:space-y-10"
            >
              <p className="reveal-item">
                The lending process wasn&apos;t built for clarity. It was built
                for volume. You get rate quotes, document lists, and urgency—but
                rarely a strategy.
              </p>
              <p className="reveal-item">
                That&apos;s how strong applicants lose on timing, weak files
                slip through unprepared, and everyone feels like they&apos;re
                reacting instead of directing.
              </p>
              <p className="reveal-item border-l-2 border-[#5b21b6] pl-7 text-white transition-[border-color] duration-[var(--duration-hover)] ease-[var(--ease-soft)] hover:border-[#7c3aed]">
                The Loan Playbook exists because the outcome is decided long
                before underwriting opens your file.
              </p>
            </div>
          </RevealGroup>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* Strategy */}
        <section id="strategy" className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#5b21b6]/[0.02] to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup
              stagger={120}
              className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-14"
            >
              <div data-parallax="0.035">
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  The Strategy
                </p>
                <h2 className="reveal-item mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                  A three-phase system
                  <br />
                  built like a war room.
                </h2>
              </div>
              <p
                className="reveal-item max-w-md text-zinc-500"
                data-parallax="0.025"
              >
                Borrow the discipline of elite sports analysis: scout, plan,
                execute. Applied to the most consequential financial move most
                people will ever make.
              </p>
            </RevealGroup>

            <RevealGroup
              className="mt-20 grid gap-px bg-zinc-900/80 md:mt-28 md:grid-cols-3"
              stagger={150}
            >
              {strategyPillars.map((pillar) => (
                  <article
                    key={pillar.tag}
                    className="reveal-item group relative h-full bg-[#050505] p-9 transition-[background-color] duration-[var(--duration-hover)] ease-[var(--ease-soft)] hover:bg-[#0a0a0a] md:p-11"
                  >
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/0 to-transparent opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100 group-hover:from-[#5b21b6]/[0.06]"
                      aria-hidden
                    />
                    <span className="relative font-mono text-[10px] tracking-[0.3em] text-[#7c3aed]">
                      {pillar.tag}
                    </span>
                    <h3 className="relative mt-7 text-2xl font-semibold tracking-tight text-white">
                      {pillar.title}
                    </h3>
                    <p className="relative mt-5 leading-relaxed text-zinc-500 transition-[color] duration-[var(--duration-hover)] group-hover:text-zinc-400">
                      {pillar.body}
                    </p>
                    <div
                      className="relative mt-10 h-px w-12 bg-zinc-800 transition-all duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:w-full group-hover:bg-[#7c3aed]/50"
                      aria-hidden
                    />
                  </article>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* Choose Your Path */}
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
                Choose Your Path
              </p>
              <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                Every borrower runs
                <br />a different offense.
              </h2>
            </RevealGroup>

            <RevealGroup
              className="mt-20 grid gap-7 md:mt-28 md:grid-cols-3 md:gap-8"
              stagger={150}
            >
              {paths.map((path) => (
                  <a
                    key={path.label}
                    href="#cta"
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
                    <span className="relative font-mono text-5xl font-semibold tracking-tighter text-zinc-900 transition-all duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:text-[#5b21b6]/50">
                      {path.label}
                    </span>
                    <h3 className="relative mt-7 text-2xl font-semibold text-white transition-transform duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:translate-x-0.5">
                      {path.title}
                    </h3>
                    <p className="relative mt-2 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                      {path.subtitle}
                    </p>
                    <p className="relative mt-5 flex-1 leading-relaxed text-zinc-500 transition-[color] duration-[var(--duration-hover)] group-hover:text-zinc-400">
                      {path.description}
                    </p>
                    <span className="relative mt-10 inline-flex items-center gap-2 text-sm font-medium text-white opacity-0 transition-all duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:translate-x-1 group-hover:opacity-100">
                      Select path
                      <span className="text-[#7c3aed]" aria-hidden>
                        →
                      </span>
                    </span>
                  </a>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* Content Hub */}
        <section className="section-flow relative border-t border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup
              stagger={120}
              className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-14"
            >
              <div data-parallax="0.025">
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  Content Hub
                </p>
                <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                  Education, media,
                  <br />
                  and partner resources.
                </h2>
              </div>
              <p
                className="reveal-item max-w-md text-zinc-500"
                data-parallax="0.02"
              >
                The Loan Playbook now connects the Learn hub, video platform,
                agent and partner systems, and Broadview Lending resources into
                one educational media structure.
              </p>
            </RevealGroup>

            <RevealGroup
              className="mt-16 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:mt-20 md:grid-cols-5"
              stagger={90}
            >
              {homeHubLinks.map((item) =>
                item.external ? (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="reveal-item group relative flex min-h-[18rem] flex-col bg-[#050505] p-7 transition-colors duration-[var(--duration-hover)] hover:bg-[#0a0a0a]"
                  >
                    <span className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                      {item.label}
                    </span>
                    <h3 className="relative mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
                      {item.title}
                    </h3>
                    <p className="relative mt-5 flex-1 leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
                      {item.body}
                    </p>
                    <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] group-hover:text-white">
                      Open resource
                      <span className="text-[#7c3aed]" aria-hidden>
                        →
                      </span>
                    </span>
                  </a>
                ) : (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="reveal-item group relative flex min-h-[18rem] flex-col bg-[#050505] p-7 transition-colors duration-[var(--duration-hover)] hover:bg-[#0a0a0a]"
                  >
                    <span className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                      {item.label}
                    </span>
                    <h3 className="relative mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
                      {item.title}
                    </h3>
                    <p className="relative mt-5 flex-1 leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
                      {item.body}
                    </p>
                    <span className="relative mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] group-hover:text-white">
                      Explore lane
                      <span className="text-[#7c3aed]" aria-hidden>
                        →
                      </span>
                    </span>
                  </Link>
                ),
              )}
            </RevealGroup>
            <p className="mt-8 max-w-2xl font-mono text-[10px] tracking-[0.18em] text-zinc-700 uppercase">
              Educational resources only. Content does not imply loan approval,
              rate availability, or a commitment to lend.
            </p>
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
                    Ready
                  </p>
                  <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-6xl">
                    Stop guessing.
                    <br />
                    Start running the playbook.
                  </h2>
                  <p className="reveal-item mt-8 max-w-lg text-lg leading-relaxed text-zinc-400 md:mt-10">
                    Get early access to the full strategy system—frameworks,
                    sequences, and film-room breakdowns for your loan.
                  </p>
                  <form className="reveal-item mt-12 flex max-w-md flex-col gap-4 sm:flex-row md:mt-14">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      className="input-glow h-14 flex-1 border border-zinc-800 bg-[#050505] px-5 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
                    />
                    <button
                      type="submit"
                      className="btn-primary h-14 shrink-0 bg-[#5b21b6] px-8 text-sm font-medium tracking-wide text-white hover:bg-[#6d28d9]"
                    >
                      Request Access
                    </button>
                  </form>
                  <p className="reveal-item mt-5 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                    No spam · Strategy only
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
        <ComplianceFooter />
      </footer>
    </div>
  );
}
