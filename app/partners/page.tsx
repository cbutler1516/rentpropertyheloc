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
  SectionHeader,
} from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { TrackedAnchor } from "../components/tracked-link";

export const metadata: Metadata = {
  title: "Partners | The Loan Playbook",
  description:
    "Mortgage partnership options for managing brokers, teams, brokerages, and firm owners.",
};

const problemAreas = [
  {
    label: "01 / Readiness",
    title: "Firms need a clearer finance layer",
    body: "Brokerage growth is harder when financing confusion appears late.",
  },
  {
    label: "02 / Content",
    title: "Teams need reusable education",
    body: "Buyer-facing content should support advisors without feeling generic.",
  },
  {
    label: "03 / Execution",
    title: "Financing friction affects the brand",
    body: "Weak expectations affect clients, agents, and leadership.",
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
          eyebrow="Brokerage Partnerships"
          title="A cleaner finance layer for firms."
          lead="For managing brokers, teams, brokerages, and firms exploring compliant partnership models."
          focusLabel="Partner Path"
          focus="Firm-level education, agent adoption, lead paths, and compliance review."
          visual="golf-commercial"
          videoSrc="/videos/loan-playbook-commercial-golf.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="#partnership-conversation"
              location="partners_hero"
              label="Explore Partnership Options"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Explore Partnership Options
            </TrackedAnchor>
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
              eyebrow="Brokerage Growth Problem"
              title="Clarity, earlier."
              lead="Most firms lack a modern finance education layer."
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
                  Review before launch.
                </h2>
                <p className="reveal-item mt-8 text-lg leading-relaxed text-zinc-400">
                  Co-marketing, lead generation, education, and partnership
                  structures should be reviewed for RESPA, state, licensing,
                  company-specific, and transaction-specific requirements.
                </p>
              </div>
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="relative z-10 border-t border-zinc-900/60 py-20">
          <div className="mx-auto max-w-3xl px-6 md:px-10">
            <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
              Deal Analyzer · Agent partners
            </p>
            <h2 className="mt-4 text-3xl font-medium text-white">
              Real estate agents: branded financing playbooks
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-400">
              Chris Butler prepares the strategy; your clients get a custom Playbook
              Report through your partner link. Ask Chris for your{" "}
              <span className="text-zinc-200">/partners/[your-slug]</span> page and
              co-branded Deal Analyzer access.
            </p>
          </div>
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
