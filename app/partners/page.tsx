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
  title: "Partners | The Loan Playbook",
  description:
    "A modern real estate finance partnership platform for brokerage leaders, teams, and firm owners.",
};

const problemAreas = [
  {
    label: "01 / Readiness",
    title: "Growth depends on cleaner buyer conversations",
    body: "Brokerage growth is harder when agents are forced to manage financing confusion late in the transaction. Buyers need stronger context before urgency affects confidence.",
  },
  {
    label: "02 / Content",
    title: "Education has become a business-development channel",
    body: "Teams need modern mortgage strategy content that supports trust, client education, and agent authority without feeling generic or promotional.",
  },
  {
    label: "03 / Execution",
    title: "Financing friction affects the whole brand",
    body: "Late-stage surprises, weak expectations, and unclear loan structure can affect the client experience well beyond a single transaction.",
  },
];

const platformPillars = [
  {
    step: "Education",
    title: "Co-branded buyer education",
    body: "Premium lending explainers, readiness frameworks, and financing strategy content that brokerages can use to support agents and clients.",
  },
  {
    step: "Media",
    title: "Mortgage strategy content engine",
    body: "Short-form and editorial concepts built around market context, buyer decision-making, affordability, and transaction preparation.",
  },
  {
    step: "Lead Gen",
    title: "Compliant lead-generation pathways",
    body: "Buyer-facing strategy conversations, content pathways, and readiness prompts designed to create compliant intake without pressuring the relationship.",
  },
  {
    step: "Adoption",
    title: "Agent adoption support",
    body: "A platform agents can understand quickly: clear talking points, simple frameworks, and useful buyer preparation tools.",
  },
];

const brokerValue = [
  {
    label: "Agent Tools",
    title: "A stronger advisory layer for the field",
    body: "Agents get a sharper way to frame financing strategy, readiness, and offer confidence without becoming mortgage technicians.",
  },
  {
    label: "Client Experience",
    title: "Buyers feel prepared earlier",
    body: "The firm benefits when buyers understand their financing path before showings, negotiations, and contract deadlines raise the stakes.",
  },
  {
    label: "Differentiation",
    title: "A more modern finance partnership story",
    body: "Brokerages can position lending education as part of a premium client experience, not a back-office handoff.",
  },
];

const partnershipModels = [
  {
    label: "Co-Marketing",
    title: "Education-led campaigns",
    body: "Co-branded buyer education, market explainers, and social content built around strategy and readiness rather than rate promotion.",
  },
  {
    label: "Lead Generation",
    title: "Buyer strategy pathways",
    body: "Content and consultation flows that invite buyers into clearer financing conversations, with appropriate disclosures and compliance review.",
  },
  {
    label: "Platform Enablement",
    title: "Agent education infrastructure",
    body: "Training topics, office-hours concepts, and practical frameworks that help teams speak more confidently about financing strategy.",
  },
  {
    label: "Strategic Relationships",
    title: "Firm-level lending conversations",
    body: "A structured way to evaluate lending collaboration, service standards, education needs, and compliant business-development opportunities.",
  },
];

const platformEconomics = [
  {
    label: "Cost of Confusion",
    title: "Reduce avoidable friction",
    body: "A better education layer can lower the operational cost of unclear buyer expectations, repeated explanations, and late-stage financing surprises.",
  },
  {
    label: "Content Leverage",
    title: "Turn expertise into repeatable media",
    body: "Articles, short-form videos, and buyer guides can support agent adoption and compliant marketing without recreating the same explanation every week.",
  },
  {
    label: "Measured Opportunity",
    title: "Evaluate value without compensation promises",
    body: "Platform economics should be reviewed around approved services, documented scope, compliance requirements, and measurable education outcomes, not transaction steering.",
  },
];

export default function PartnersPage() {
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
          eyebrow="Brokerage Partnership Platform"
          title="A modern lending partnership platform for real estate firms."
          lead="The Loan Playbook helps managing brokers, firm owners, and team leaders build a more strategic finance layer around agent adoption, buyer readiness, education, and compliant partnership conversations."
          focusLabel="Executive Thesis"
          focus="This is a platform for firm-level lending strategy: better buyer preparation, stronger agent tools, premium content infrastructure, and partnership models reviewed through the right compliance lens."
          visual="golf-commercial"
          videoSrc="/videos/loan-playbook-commercial-golf.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#partnership-conversation"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Explore a Partnership Conversation
            </a>
            <Link
              href="/agents"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              View Agent Platform
            </Link>
          </div>
          <StatRow
            className="reveal-item mt-20"
            stats={[
              { value: "01", label: "Adoption" },
              { value: "02", label: "Readiness" },
              { value: "03", label: "Compliance" },
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
              eyebrow="Brokerage Growth Problem"
              title="Brokerages need better financing clarity before transactions are at risk."
              lead="Agents are expected to advise buyers through a market where financing decisions shape confidence, offer strategy, and execution. Most firms do not have a modern education layer built for that moment."
            />

            <RevealGroup
              className="mt-16 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:mt-20 md:grid-cols-3"
              stagger={120}
            >
              {problemAreas.map((item) => (
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
              eyebrow="The Platform"
              title="Education, media, compliant lead generation, buyer strategy, and agent adoption."
              lead="The Loan Playbook is designed as an operating layer around real estate finance conversations. It gives leadership a clearer way to support agents without turning lending into a sales script."
            />

            <RevealGroup
              className="mt-16 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:mt-20 md:grid-cols-4"
              stagger={110}
            >
              {platformPillars.map((pillar) => (
                <ProcessStep
                  key={pillar.step}
                  step={pillar.step}
                  title={pillar.title}
                  body={pillar.body}
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
              eyebrow="Broker Value"
              title="A better finance layer can become a firm-level advantage."
              lead="The value is not just lender access. It is stronger tools for agents, a better client experience for buyers, and a more differentiated advisory standard for the firm."
            />

            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
              stagger={130}
            >
              {brokerValue.map((item) => (
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
            <div className="grid gap-14 md:grid-cols-[0.82fr_1.18fr] md:gap-20">
              <SectionHeader
                eyebrow="Partnership Models"
                title="Flexible structures for education-led growth and lending strategy."
                lead="Partnership design depends on RESPA, state, licensing, company-specific compliance, market needs, and business objectives. The conversation starts with structure, not promises."
              />

              <RevealGroup
                className="grid gap-px border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2"
                stagger={120}
              >
                {partnershipModels.map((model) => (
                  <FeatureCard
                    key={model.label}
                    label={model.label}
                    title={model.title}
                    body={model.body}
                  />
                ))}
              </RevealGroup>
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Platform Economics"
              title="A partnership should create operational value without promising compensation."
              lead="The business case is education infrastructure, agent enablement, content leverage, compliant intake, and a better client experience. Any structure should be documented and reviewed before launch."
            />
            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
              stagger={130}
            >
              {platformEconomics.map((item) => (
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
              className="grid gap-12 border border-zinc-900/80 bg-[#050505] p-8 md:grid-cols-[0.72fr_1.28fr] md:gap-16 md:p-12"
              stagger={130}
            >
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                Compliance Note
              </p>
              <div>
                <h2 className="reveal-item text-3xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
                  Partnership structure must be reviewed before it is activated.
                </h2>
                <p className="reveal-item mt-8 text-lg leading-relaxed text-zinc-400">
                  Any co-marketing, lead generation, education platform, or
                  partnership structure should be reviewed for RESPA, state,
                  licensing, company-specific compliance, and
                  transaction-specific requirements. The Loan Playbook is
                  structured around education, compliant services, and approved
                  business-development activity, not transaction steering.
                </p>
                <p className="reveal-item mt-6 text-sm leading-relaxed text-zinc-600">
                  Structures should be documented and approved before launch by
                  the appropriate legal, licensing, and company-level review
                  process.
                </p>
              </div>
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <div id="partnership-conversation">
          <ConversionCTA {...conversionCtas.brokerPartnership} />
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
