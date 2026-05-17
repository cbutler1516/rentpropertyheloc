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
    body: "A letter can confirm access to financing. It does not always explain readiness, risk, structure, cash timing, or whether the buyer understands the next move.",
  },
  {
    label: "02 / Market Pace",
    title: "Financing questions now shape strategy",
    body: "Rates, credits, seller concessions, buydowns, liquidity, and underwriting timing all influence how a buyer competes and how an agent advises.",
  },
  {
    label: "03 / Trust",
    title: "Clients remember who gave them context",
    body: "Modern agents win by helping buyers think clearly before emotion and deadlines take over. Better lending strategy strengthens the entire advisory experience.",
  },
];

const readinessSteps = [
  {
    step: "Scout",
    title: "Map the buyer profile",
    body: "Income, credit, cash, timing, debt, goals, and risk areas are organized into a clear borrower readout before the transaction is live.",
  },
  {
    step: "Plan",
    title: "Build the financing sequence",
    body: "The buyer understands what needs to happen first, what can wait, and which decisions affect purchase power, offer strength, and closing confidence.",
  },
  {
    step: "Execute",
    title: "Enter the market prepared",
    body: "When the right property appears, the buyer already knows the financing playbook instead of learning it under pressure.",
  },
];

const contentSupport = [
  {
    label: "Education Engine",
    title: "Borrower education agents can actually use",
    body: "Short-form explainers, strategic talking points, and buyer-facing frameworks designed to make financing feel clear without turning the agent into a lender.",
  },
  {
    label: "Co-Branded Media",
    title: "Compliance-aware co-marketing support",
    body: "Premium, practical mortgage strategy content that can support newsletters, social posts, buyer consults, open house follow-ups, and agent education campaigns with appropriate review.",
  },
  {
    label: "Local Authority",
    title: "A sharper way to show market fluency",
    body: "The platform helps agents speak to financing trends, affordability shifts, and buyer strategy in a way that feels intelligent, modern, and client-first.",
  },
];

const marketIntelligence = [
  {
    label: "Rate Environment",
    title: "Translate market movement",
    body: "Turn changing rate conditions into simple buyer strategy: timing, payment sensitivity, lock discussions, and realistic decision ranges.",
  },
  {
    label: "Offer Structure",
    title: "Connect financing to negotiation",
    body: "Clarify how credits, buydowns, cash reserves, appraisal risk, and closing timelines affect offer construction and seller confidence.",
  },
  {
    label: "Buyer Psychology",
    title: "Reduce hesitation with context",
    body: "Help buyers understand what is changing, what is controllable, and what should be decided before they are emotionally attached to a home.",
  },
  {
    label: "Execution Risk",
    title: "See friction before it becomes urgent",
    body: "Identify weak points in documentation, timing, assets, and loan structure early enough to protect momentum later.",
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
          title="A sharper lending strategy layer for modern agents."
          lead="The Loan Playbook helps real estate professionals educate buyers, clarify financing decisions, and build a cleaner path from first conversation to closing."
          focusLabel="Platform Thesis"
          focus="This is not a recruiting pitch or transactional sales script. It is a buyer-readiness, mortgage education, and compliant co-marketing support system designed to make the agent relationship more strategic over time."
          visual="basketball-agents"
          videoSrc="/videos/loan-playbook-basketball-agents.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#agent-strategy"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Start a Strategy Conversation
            </a>
            <Link
              href="/strategy"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              View the Framework
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
              title="Modern agents need more than a pre-approval letter."
              lead="Financing now shapes buyer confidence, negotiation strategy, offer quality, and transaction flow. The agent who can frame those decisions earlier creates a calmer client experience."
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
              title="Prepare the buyer before the market gets emotional."
              lead="The platform turns lending preparation into a structured sequence buyers can understand before they are negotiating, competing, or reacting to deadlines."
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
              title="Co-branded content without generic mortgage noise."
              lead="Agents need useful material that makes them sound more strategic, not templated. The Loan Playbook supports education-led marketing that feels premium and client-first."
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

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="grid gap-14 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
              <SectionHeader
                eyebrow="Market Intelligence"
                title="Financing strategy belongs inside the market conversation."
                lead="The platform helps agents connect market conditions to buyer decisions in a way that feels calm, informed, and practical."
              />

              <RevealGroup className="grid gap-px border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2">
                {marketIntelligence.map((item) => (
                  <FeatureCard
                    key={item.label}
                    label={item.label}
                    title={item.title}
                    body={item.body}
                  />
                ))}
              </RevealGroup>
            </div>
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
                  Cleaner files create cleaner transactions.
                </h2>
                <p className="reveal-item mt-8 max-w-2xl text-lg leading-relaxed text-zinc-500">
                  Stronger buyer readiness does not remove complexity. It makes
                  complexity visible earlier, so the agent can protect momentum
                  instead of managing avoidable confusion later.
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

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup
              className="grid gap-12 border-t border-zinc-900/80 pt-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20 md:pt-16"
              stagger={130}
            >
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                Partnership Philosophy
              </p>
              <div>
                <h2 className="reveal-item max-w-4xl text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                  Built for long-term real estate relationships, not one-off lead capture.
                </h2>
                <div className="mt-10 grid gap-8 text-lg leading-relaxed text-zinc-400 md:grid-cols-2">
                  <p className="reveal-item">
                    The Loan Playbook is designed to become a strategic layer
                    around the agent relationship: education before urgency,
                    clarity before pressure, and consistent borrower support
                    long after the first conversation.
                  </p>
                  <p className="reveal-item">
                    The partnership model is intentionally quiet and high-trust.
                    It supports the agent&apos;s brand, gives buyers better
                    context, and keeps co-marketing or lead-generation concepts
                    subject to RESPA, state, licensing, and company-specific
                    compliance review.
                  </p>
                </div>
              </div>
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <div id="agent-strategy">
          <ConversionCTA {...conversionCtas.agentPartnership} />
        </div>
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
