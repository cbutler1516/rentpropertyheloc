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
  title: "Partners | The Loan Playbook",
  description:
    "A modern real estate finance partnership platform for brokerage leaders, teams, and firm owners.",
};

const problemAreas = [
  {
    label: "01 / Readiness",
    title: "Growth depends on cleaner buyer conversations",
    body: "Growth is harder when financing confusion appears late.",
  },
  {
    label: "02 / Content",
    title: "Education has become a business-development channel",
    body: "Teams need useful education that does not feel generic.",
  },
  {
    label: "03 / Execution",
    title: "Financing friction affects the whole brand",
    body: "Weak expectations affect more than one transaction.",
  },
];

const platformPillars = [
  {
    step: "Education",
    title: "Co-branded buyer education",
    body: "Premium explainers and readiness frameworks for agents and clients.",
  },
  {
    step: "Media",
    title: "Mortgage strategy content engine",
    body: "Short-form and editorial concepts built around real buyer decisions.",
  },
  {
    step: "Lead Gen",
    title: "Compliant lead-generation pathways",
    body: "Content pathways and readiness prompts for compliant intake.",
  },
  {
    step: "Adoption",
    title: "Agent adoption support",
    body: "Clear talking points, simple frameworks, and useful buyer tools.",
  },
];

const brokerValue = [
  {
    label: "Agent Tools",
    title: "A stronger advisory layer for the field",
    body: "Agents frame readiness and offer confidence without becoming lenders.",
  },
  {
    label: "Client Experience",
    title: "Buyers feel prepared earlier",
    body: "Buyers understand the path before deadlines raise the stakes.",
  },
  {
    label: "Differentiation",
    title: "A more modern finance partnership story",
    body: "Lending education becomes part of the client experience.",
  },
];

const partnershipModels = [
  {
    label: "Co-Marketing",
    title: "Education-led campaigns",
    body: "Co-branded education and social content built around readiness.",
  },
  {
    label: "Lead Generation",
    title: "Buyer strategy pathways",
    body: "Consultation flows with appropriate disclosures and review.",
  },
  {
    label: "Platform Enablement",
    title: "Agent education infrastructure",
    body: "Training topics and frameworks teams can use quickly.",
  },
  {
    label: "Strategic Relationships",
    title: "Firm-level lending conversations",
    body: "A structured review of collaboration, service, education, and compliance.",
  },
];

const platformEconomics = [
  {
    label: "Cost of Confusion",
    title: "Reduce avoidable friction",
    body: "A better education layer reduces repeated explanations.",
  },
  {
    label: "Content Leverage",
    title: "Turn expertise into repeatable media",
    body: "Articles, videos, and guides turn expertise into repeatable media.",
  },
  {
    label: "Measured Opportunity",
    title: "Evaluate value without compensation promises",
    body: "Evaluate approved services, documented scope, compliance, and outcomes.",
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
          title="A modern lending platform for real estate firms."
          lead="Buyer readiness, agent adoption, education, and compliant partnership conversations."
          focusLabel="Executive Thesis"
          focus="Firm-level education, agent tools, premium content, and partnership models reviewed through the right compliance lens."
          visual="golf-commercial"
          videoSrc="/videos/loan-playbook-commercial-golf.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#partnership-conversation"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Start Partnership Review
            </a>
            <Link
              href="/agents"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Explore Agent Partnerships
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
              title="Better financing clarity, earlier."
              lead="Most firms do not have a modern education layer for the moments financing matters most."
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
              title="Education, media, lead paths, and adoption."
              lead="A clearer way to support agents without turning lending into a sales script."
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
              title="A finance layer can become a firm advantage."
              lead="Stronger tools for agents. A clearer experience for buyers."
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
        <SchedulingCTASection type="broker" />
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
