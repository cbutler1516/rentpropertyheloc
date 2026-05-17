import { FooterBrand } from "./components/brand";
import { ComplianceFooter } from "./components/compliance-footer";
import { HeroVideo } from "./components/hero-video";
import { LeadCaptureForm } from "./components/lead-capture-form";
import { FeatureCard, StatRow } from "./components/design-system";
import { PageAmbient } from "./components/page-ambient";
import { RevealGroup } from "./components/reveal-group";
import {
  SchedulingCTASection,
  SchedulingLink,
} from "./components/scheduling-cta";
import { SiteNav } from "./components/site-nav";
import { TrackedAnchor, TrackedLink } from "./components/tracked-link";
import { VideoEmbedCard } from "./components/video-embed-card";
import { featuredVideoEmbedGroups } from "./lib/video-embeds";

const paths = [
  {
    label: "Home Buyers",
    title: "Understand your options before you start shopping.",
    href: "/buyers",
    description:
      "For buyers who want clear guidance on readiness, payment, cash-to-close, loan options, and offer preparation. Start with education, then move into a consultation when you are ready.",
    cta: "Start Your Home Buying Strategy",
  },
  {
    label: "Real Estate Agents",
    title: "Help clients win with smarter financing strategy.",
    href: "/agents",
    description:
      "For agents who need buyer education, lending context, and compliant co-marketing support that makes financing easier to explain.",
    cta: "Explore Agent Partnerships",
  },
  {
    label: "Managing Brokers / Partners",
    title: "Build a compliant mortgage partnership ecosystem.",
    href: "/partners",
    description:
      "For brokerage leaders, team owners, and firms evaluating buyer readiness, agent adoption, education infrastructure, and partnership models.",
    cta: "Schedule a Broker Conversation",
  },
  {
    label: "Commercial / Investors",
    title: "Structure financing with a capital-markets mindset.",
    href: "/commercial",
    description:
      "For investors, operators, and commercial borrowers who need to clarify asset, sponsor, capital stack, risk, and execution path.",
    cta: "Review Commercial Financing Options",
  },
];

const strategyPillars = [
  {
    tag: "SCOUT",
    title: "Diagnose the scenario",
    body: "Clarify borrower goals, loan options, property context, market conditions, and timing before the conversation becomes reactive.",
  },
  {
    tag: "PLAN",
    title: "Structure the path",
    body: "Organize payment, cash-to-close, documentation, credits, risk areas, and next steps into a decision framework people can understand.",
  },
  {
    tag: "EXECUTE",
    title: "Move with context",
    body: "Use education and preparation to support cleaner buyer conversations, better agent alignment, and more confident lending decisions.",
  },
];

const authorityStats = [
  { value: "9", label: "Licensed states" },
  { value: "2", label: "Residential + commercial" },
  { value: "1", label: "Education-first platform" },
];

const authorityProof = [
  {
    label: "Education First",
    title: "Guidance before pressure",
    body: "The platform starts with context, definitions, and tradeoffs before anyone is pushed toward an application or transaction decision.",
  },
  {
    label: "Multi-State Lending",
    title: "Licensed across key markets",
    body: "Licensing and program availability vary, but the platform is built around multi-state residential lending conversations.",
  },
  {
    label: "Residential + Commercial",
    title: "One lens across different deal types",
    body: "The same discipline applies to buyer readiness, refinance timing, investment property, and commercial structure.",
  },
  {
    label: "Strategy-Focused",
    title: "More than rate comparison",
    body: "Payment, cash, timing, property, borrower profile, and risk are treated as a connected decision system.",
  },
  {
    label: "Media Ecosystem",
    title: "Education built for modern attention",
    body: "Articles, video, social content, and partner resources give mortgage education more than one path to reach people.",
  },
  {
    label: "Compliance Aware",
    title: "Partnerships with guardrails",
    body: "Agent and brokerage concepts are framed around education, documented value, disclosures, and RESPA/state/licensing review.",
  },
];

const founderHighlights = [
  "Experienced mortgage advisor",
  "Former real estate development background",
  "Residential and commercial strategy",
  "Capital-markets mindset",
  "Education-first media platform",
  "Licensed multi-state lending context",
];

const homepageVideoProof = featuredVideoEmbedGroups[0]?.videos.slice(0, 3) ?? [];

const educationLinks = [
  {
    label: "Learn",
    title: "Read buyer guides and financing explainers.",
    body: "Explore seller concessions, buydowns, jumbo loans, HELOC strategy, refinance timing, FHA, VA, DSCR, and commercial lending topics.",
    href: "/learn",
    cta: "Read Buyer Guides",
  },
  {
    label: "Videos",
    title: "Watch mortgage strategy videos.",
    body: "Browse short-form explainers, market context, agent education, buyer topics, and future long-form video modules.",
    href: "/videos",
    cta: "Watch Mortgage Strategy Videos",
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
            Mortgage Strategy Platform
          </p>
          <h1 className="hero-enter hero-enter-d2 hero-headline-glow relative max-w-5xl text-[clamp(2.75rem,8vw,5.5rem)] leading-[0.95] font-semibold tracking-[-0.04em] text-white">
            Make the loan
            <br />
            <span className="text-zinc-500">make sense.</span>
          </h1>
          <p className="hero-enter hero-enter-d3 relative mt-10 max-w-xl text-lg leading-relaxed text-zinc-400 md:mt-12 md:text-xl">
            The Loan Playbook is a mortgage strategy, education, and media
            platform for buyers, agents, and real estate firms that want lending
            decisions explained before the pressure starts.
          </p>
          <div className="hero-enter hero-enter-d4 relative mt-14 flex flex-col gap-4 sm:flex-row sm:items-center md:mt-16">
            <TrackedAnchor
              href="#cta"
              location="homepage_hero"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Book a Consultation
            </TrackedAnchor>
            <TrackedAnchor
              href="#paths"
              location="homepage_hero"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              See Who We Help
            </TrackedAnchor>
          </div>
          <StatRow
            className="hero-enter hero-enter-d5 relative mt-24 md:mt-28"
            stats={[
              { value: "4", label: "Audience paths" },
              { value: "2", label: "Residential + commercial" },
              { value: "9", label: "Licensed states" },
            ]}
          />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* What It Is */}
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
                What It Is
              </p>
              <h2 className="reveal-item mt-5 text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                Mortgage guidance
                <br />
                with a clear next step.
              </h2>
            </div>
            <div
              data-parallax="0.03"
              className="flex flex-col justify-center space-y-9 text-lg leading-relaxed text-zinc-400 md:space-y-10"
            >
              <p className="reveal-item">
                The Loan Playbook helps people understand mortgage decisions
                before they become urgent: buying, refinancing, commercial
                financing, agent education, and brokerage partnerships.
              </p>
              <p className="reveal-item">
                It combines advisory guidance, educational articles, video
                explainers, and partnership resources into one premium platform
                for every side of real estate.
              </p>
              <p className="reveal-item border-l-2 border-[#5b21b6] pl-7 text-white transition-[border-color] duration-[var(--duration-hover)] ease-[var(--ease-soft)] hover:border-[#7c3aed]">
                Start with the audience path that fits you, then move into the
                right guide, video, consultation, or partnership conversation.
              </p>
            </div>
          </RevealGroup>
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
                Mortgage strategy
                <br />
                for every stage.
              </h2>
              <p className="reveal-item mt-6 max-w-2xl text-lg leading-relaxed text-zinc-500">
                Pick the role that best matches your situation. Each path leads
                to focused resources and a clear next conversation.
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

        {/* Founder Authority */}
        <section className="section-flow relative border-t border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.82fr_1.18fr] md:gap-16 md:px-10">
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
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
                      Portrait placeholder
                    </p>
                    <h3 className="mt-4 max-w-xs text-3xl font-semibold tracking-[-0.03em] text-white">
                      Mortgage strategy, real estate context, and media.
                    </h3>
                  </div>
                </div>
              </div>
            </RevealGroup>

            <RevealGroup className="flex flex-col justify-center" stagger={120}>
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                Authority
              </p>
              <h2 className="reveal-item mt-5 max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-6xl">
                A mortgage platform built with a developer&apos;s eye and an advisor&apos;s discipline.
              </h2>
              <p className="reveal-item mt-8 max-w-3xl text-lg leading-relaxed text-zinc-400">
                The Loan Playbook is shaped by hands-on mortgage advisory work,
                real estate development experience, residential and commercial
                strategy, and a capital-markets mindset. The goal is not to make
                lending louder. It is to make the decisions more legible.
              </p>
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
                <SchedulingLink
                  type="buyer"
                  className="btn-primary inline-flex h-14 w-fit items-center justify-center bg-white px-8 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
                />
              </div>
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* Why Different */}
        <section className="section-flow relative border-t border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup
              stagger={120}
              className="grid gap-12 md:grid-cols-[0.85fr_1.15fr] md:gap-20"
            >
              <div>
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  Why We&apos;re Different
                </p>
                <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                  Advisory experience, real estate context, and education-first media.
                </h2>
              </div>
              <div className="flex flex-col justify-center">
                <p className="reveal-item text-lg leading-relaxed text-zinc-400">
                  The platform is built for practical decision-making: buyer
                  readiness, agent conversations, commercial structure,
                  multi-state lending, and compliance-aware partnerships.
                </p>
                <StatRow className="reveal-item mt-12" stats={authorityStats} />
              </div>
            </RevealGroup>

            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
              stagger={120}
            >
              {authorityProof.map((item) => (
                <FeatureCard
                  key={item.label}
                  label={item.label}
                  title={item.title}
                  body={item.body}
                  className="card-lift border border-zinc-900/80"
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {/* Framework */}
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
                  How It Works
                </p>
                <h2 className="reveal-item mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                  A simple framework for
                  <br />
                  better mortgage decisions.
                </h2>
              </div>
              <p
                className="reveal-item max-w-md text-zinc-500"
                data-parallax="0.025"
              >
                The process stays simple: diagnose the scenario, structure the
                options, then move into the right resource or conversation.
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

        {/* Learn + Videos */}
        <section className="section-flow relative border-t border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup
              stagger={120}
              className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-14"
            >
              <div data-parallax="0.025">
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  Learn + Videos
                </p>
                <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                  Start with education.
                  <br />
                  Move with confidence.
                </h2>
              </div>
              <p
                className="reveal-item max-w-md text-zinc-500"
                data-parallax="0.02"
              >
                Not ready to talk yet? Use the Learn hub and video library to
                understand mortgage topics before choosing a consultation or
                partnership conversation.
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

        {/* Media Proof */}
        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup
              stagger={120}
              className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-14"
            >
              <div>
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  Featured Mortgage Strategy Videos
                </p>
                <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                  Proof that this is a media platform, not a static brochure.
                </h2>
              </div>
              <p className="reveal-item max-w-md text-zinc-500">
                TikTok, Instagram, and YouTube embed slots are ready for approved
                content. Until live post URLs are connected, each module stays a
                clean placeholder.
              </p>
            </RevealGroup>

            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
              stagger={120}
            >
              {homepageVideoProof.map((video) => (
                <VideoEmbedCard key={`${video.platform}-${video.title}`} video={video} />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <SchedulingCTASection type="buyer" />

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
                    Tell us what
                    <br />
                    you&apos;re working on.
                  </h2>
                  <p className="reveal-item mt-8 max-w-lg text-lg leading-relaxed text-zinc-400 md:mt-10">
                    Whether you are buying a home, supporting clients, exploring
                    a brokerage partnership, or reviewing a commercial scenario,
                    we&apos;ll follow up to learn more about your goals.
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
        <ComplianceFooter />
      </footer>
    </div>
  );
}
