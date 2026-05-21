import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import {
  FeatureCard,
  PageHero,
  ProcessStep,
  SectionHeader,
} from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { FeaturedContentSection } from "../components/featured-content-section";
import { ScenarioReviewCta } from "../components/scenario-review-cta";
import { LicensedMarketsRail } from "../components/licensed-markets-rail";
import { StickyMobileCta } from "../components/sticky-mobile-cta";
import { TrustStack } from "../components/trust-stack";
import { TrackedLink } from "../components/tracked-link";

export const metadata: Metadata = {
  title: "Agents | The Loan Playbook",
  description:
    "Mortgage strategy and buyer support for agents who want clearer financing conversations.",
};

const whyAgentsNeedStrategy = [
  {
    label: "01 / Buyer Signal",
    title: "Pre-approval is not the full picture",
    body: "A letter does not explain readiness, risk, cash timing, or next moves.",
  },
  {
    label: "02 / Market Pace",
    title: "Financing questions now shape strategy",
    body: "Rates, credits, concessions, liquidity, and timing shape the offer.",
  },
  {
    label: "03 / Trust",
    title: "Clients remember who gave them context",
    body: "Clear financing context makes the entire advisory experience stronger.",
  },
];

const readinessSteps = [
  {
    step: "Scout",
    title: "Map the buyer profile",
    body: "Organize income, credit, cash, timing, debt, goals, and risk early.",
  },
  {
    step: "Plan",
    title: "Build the financing sequence",
    body: "Clarify what happens first and what affects offer strength.",
  },
  {
    step: "Execute",
    title: "Enter the market prepared",
    body: "The buyer knows the plan before the property appears.",
  },
];

export default function AgentsPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <div
        className="playbook-grid pointer-events-none fixed inset-0 z-0 opacity-30"
        aria-hidden
      />
      <div
        className="vignette pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
      />
      <div
        className="ambient-drift pointer-events-none fixed top-[-12rem] right-[-8rem] z-[1] h-[36rem] w-[36rem] rounded-full bg-[#5b21b6]/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-[-12rem] left-[-10rem] z-[1] h-[30rem] w-[30rem] rounded-full bg-[#4c1d95]/10 blur-[110px]"
        aria-hidden
      />

      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Agent Support"
          title="Help buyers move clearer."
          lead="For individual agents who want better lending strategy and buyer support."
          focusLabel="Agent Path"
          focus="Buyer readiness, financing context, and cleaner client conversations."
          visual="basketball-agents"
          videoSrc="/videos/loan-playbook-basketball-agents.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedLink
              href="#agent-strategy"
              location="agents_hero"
              label="Talk With Our Team"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Talk With Our Team
            </TrackedLink>
            <TrackedLink
              href="/agents/financing-playbook"
              location="agents_hero"
              label="Agent playbook"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Agent Playbook
            </TrackedLink>
          </div>
        </PageHero>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Why It Matters"
              title="More than a pre-approval letter."
              lead="Financing shapes confidence, offers, and flow."
            />

            <RevealGroup
              className="mt-16 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:mt-20 md:grid-cols-3"
              stagger={120}
            >
              {whyAgentsNeedStrategy.map((item) => (
                <FeatureCard
                  key={item.label}
                  label={item.label}
                  title={item.title}
                  body={item.body}
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Buyer Readiness System"
              title="Prepare before pressure."
              lead="For firm-level adoption, teams, or brokerage partnerships, use the Partners path."
            />

            <RevealGroup
              className="mt-16 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:mt-20 md:grid-cols-3"
              stagger={120}
            >
              {readinessSteps.map((step) => (
                <ProcessStep
                  key={step.step}
                  step={step.step}
                  title={step.title}
                  body={step.body}
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-light relative border-y border-zinc-200/80">
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10 py-12">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#6d28d9] uppercase">
              Industry resource
            </p>
            <h2 className="mt-4 max-w-2xl text-2xl font-semibold tracking-[-0.03em] text-zinc-900">
              Built for agents—not consumer homebuyer traffic.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-600">
              Financing talking points for your clients. Brokerage programs live
              under{" "}
              <TrackedLink
                href="/partners"
                location="agents_partners_link"
                className="font-medium text-[#5b21b6] hover:text-[#4c1d95]"
              >
                Agent Partnerships
              </TrackedLink>
              .
            </p>
          </div>
        </section>

        <FeaturedContentSection
          surface="agents"
          title="For your clients"
          lead="Two clips and guides worth forwarding."
          limit={2}
          tone="light"
        />

        <LicensedMarketsRail
          title="Local context for client conversations."
          lead="Share state and metro pages when geography shapes the financing story."
        />

        <TrustStack audience="agent" />

        <section className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
          <ScenarioReviewCta audience="agent" location="agents_page" />
        </section>

        <div id="agent-strategy">
          <ConversionCTA {...conversionCtas.agentPartnership} />
        </div>
      </main>

      <StickyMobileCta
        href="/strategy-review"
        label="Review Options"
        location="agents_sticky"
      />

      <footer className="relative z-10 border-t border-zinc-900/60 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase md:flex-row md:items-center md:justify-between md:px-10">
          <FooterBrand />
          <span>© {new Date().getFullYear()} The Loan Playbook</span>
        </div>
        <ComplianceFooter />
      </footer>
    </div>
  );
}
