import type { Metadata } from "next";
import Link from "next/link";
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
  StatRow,
} from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SchedulingCTASection } from "../components/scheduling-cta";
import { SiteNav } from "../components/site-nav";

export const metadata: Metadata = {
  title: "Agents | The Loan Playbook",
  description:
    "A mortgage strategy, education, compliant co-marketing, and media support platform for modern real estate agents.",
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

const contentSupport = [
  {
    label: "Education Engine",
    title: "Borrower education agents can actually use",
    body: "Short explainers and buyer-facing frameworks agents can use.",
  },
  {
    label: "Co-Branded Media",
    title: "Compliance-aware co-marketing support",
    body: "Premium content for newsletters, social, consults, and follow-up.",
  },
  {
    label: "Local Authority",
    title: "A sharper way to show market fluency",
    body: "A modern way to discuss financing trends and buyer decisions.",
  },
];

const transactionOutcomes = [
  "Cleaner buyer expectations before showings begin.",
  "Stronger financing conversations before offers are written.",
  "Fewer surprises between contract, underwriting, and closing.",
  "A more strategic handoff between agent, buyer, and lending team.",
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
          eyebrow="Agent Partnership Platform"
          title="Help buyers move clearer."
          lead="Financing context before pressure."
          focusLabel="Platform Thesis"
          focus="Buyer readiness. Premium education. No sales-script feel."
          visual="basketball-agents"
          videoSrc="/videos/loan-playbook-basketball-agents.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/agents/financing-playbook"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Agent Financing Playbook
            </Link>
          </div>
          <StatRow
            className="reveal-item mt-20"
            stats={[
              { value: "01", label: "Readiness" },
              { value: "02", label: "Media" },
              { value: "03", label: "Partnership" },
            ]}
          />
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
              lead="A simple buyer sequence."
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

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#5b21b6]/[0.035] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Media + Education Engine"
              title="Useful content. Less mortgage noise."
              lead="Premium education agents can actually use."
            />

            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
              stagger={130}
            >
              {contentSupport.map((item) => (
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

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup
              className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-20"
              stagger={130}
            >
              <div>
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  Transaction Quality
                </p>
                <h2 className="reveal-item mt-5 text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                  Cleaner files. Cleaner transactions.
                </h2>
                <p className="reveal-item mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500">
                  Make complexity visible earlier.
                </p>
              </div>

              <div className="reveal-item grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70">
                {transactionOutcomes.map((outcome, index) => (
                  <div key={outcome} className="bg-[#050505] p-7 md:p-8">
                    <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                      Outcome {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-4 text-xl leading-snug tracking-[-0.02em] text-zinc-200">
                      {outcome}
                    </p>
                  </div>
                ))}
              </div>
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <div id="agent-strategy">
          <ConversionCTA {...conversionCtas.agentPartnership} />
        </div>
        <SchedulingCTASection type="agent" />
      </main>

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
