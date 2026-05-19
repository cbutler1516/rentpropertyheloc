import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { ArticleCard, PageHero, SectionHeader } from "../components/design-system";
import { FooterSocialLinks } from "../components/footer-social-links";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { TrackedLink } from "../components/tracked-link";
import {
  getScenariosByAudience,
  scenarioRegistry,
  type ScenarioAudience,
} from "../lib/scenario-registry";

export const metadata: Metadata = {
  title: "Mortgage Scenarios | The Loan Playbook",
  description:
    "Scenario-based mortgage guidance for buyers, homeowners, agents, and commercial borrowers—built for search, social traffic, and clear next steps.",
};

const audienceLabels: Record<ScenarioAudience, string> = {
  buyer: "Buyer Scenarios",
  homeowner: "Homeowner Scenarios",
  agent: "Agent Scenarios",
  commercial: "Commercial Scenarios",
};

function ScenarioGroup({ audience }: { audience: ScenarioAudience }) {
  const scenarios = getScenariosByAudience(audience);

  return (
    <section className="section-flow relative">
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader
          eyebrow={audienceLabels[audience]}
          title={audienceLabels[audience]}
          lead="Emotionally specific paths with a clear next step—not generic mortgage content."
        />
        <RevealGroup
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={80}
        >
          {scenarios.map((scenario) => (
            <ArticleCard
              key={scenario.slug}
              label={audienceLabels[audience]}
              title={scenario.title}
              excerpt={scenario.emotionalHook}
              href={scenario.href}
            />
          ))}
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}

export default function ScenariosHubPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <PageAtmosphere />
      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Scenario Library"
          title="Real borrower and agent scenarios—not generic mortgage content."
          lead="Each path is built for search intent, social traffic, and a clear strategy conversation."
          focusLabel="Strategy First"
          focus="Relevance. Clarity. Next step."
          videoSrc="/videos/loan-playbook-learn-film-room.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedLink
              href="/learn/buyer-readiness"
              location="scenarios_hub_hero"
              label="Start Buyer Strategy"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Start Buyer Strategy
            </TrackedLink>
            <TrackedLink
              href="/geo"
              location="scenarios_hub_hero"
              label="Browse Local Markets"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Browse Local Markets
            </TrackedLink>
          </div>
        </PageHero>

        <ScenarioGroup audience="buyer" />
        <ScenarioGroup audience="homeowner" />
        <ScenarioGroup audience="agent" />
        <ScenarioGroup audience="commercial" />

        <section className="section-flow section-matte relative border-t border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <p className="font-mono text-[10px] tracking-[0.24em] text-zinc-600 uppercase">
              Strategy pages are the primary growth layer for search, social, and lead capture.
            </p>
            <p className="mt-4 max-w-3xl text-sm text-zinc-500">
              {scenarioRegistry.length} scenario paths indexed for buyers, homeowners,
              agents, and commercial borrowers across Washington markets.
            </p>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-900/60 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase md:flex-row md:items-center md:justify-between md:px-10">
          <FooterBrand />
          <span>© {new Date().getFullYear()} The Loan Playbook</span>
        </div>
        <FooterSocialLinks />
        <ComplianceFooter />
      </footer>
    </div>
  );
}

function PageAtmosphere() {
  return (
    <>
      <div
        className="playbook-grid pointer-events-none fixed inset-0 z-0 opacity-30"
        aria-hidden
      />
      <div className="vignette pointer-events-none fixed inset-0 z-[1]" aria-hidden />
    </>
  );
}

