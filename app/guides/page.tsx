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
  title: "Mortgage Guides | The Loan Playbook",
  description:
    "Financing guides for buyers, homeowners, agents, and commercial borrowers—clear paths for search, social traffic, and strategy conversations.",
};

const audienceLabels: Record<ScenarioAudience, string> = {
  buyer: "Buyer Guides",
  homeowner: "Homeowner Guides",
  agent: "Agent Guides",
  commercial: "Commercial Guides",
};

function GuideGroup({ audience }: { audience: ScenarioAudience }) {
  const guides = getScenariosByAudience(audience);

  return (
    <section className="section-flow relative">
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader
          eyebrow={audienceLabels[audience]}
          title={audienceLabels[audience]}
          lead="Specific financing situations with a clear next step—not generic mortgage content."
        />
        <RevealGroup
          className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={80}
        >
          {guides.map((guide) => (
            <ArticleCard
              key={guide.slug}
              label={audienceLabels[audience]}
              title={guide.title}
              excerpt={guide.emotionalHook}
              href={guide.href}
            />
          ))}
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}

export default function GuidesHubPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <PageAtmosphere />
      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Financing Guides"
          title="Real borrower and agent situations—not generic mortgage content."
          lead="Each guide is built for search intent, social traffic, and a clear strategy conversation."
          focusLabel="Strategy First"
          focus="Relevance. Clarity. Next step."
          videoSrc="/videos/loan-playbook-learn-film-room.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedLink
              href="/learn/buyer-readiness"
              location="guides_hub_hero"
              label="Start Buyer Strategy"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Start Buyer Strategy
            </TrackedLink>
            <TrackedLink
              href="/markets"
              location="guides_hub_hero"
              label="Browse Local Markets"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Browse Local Markets
            </TrackedLink>
          </div>
        </PageHero>

        <GuideGroup audience="buyer" />
        <GuideGroup audience="homeowner" />
        <GuideGroup audience="agent" />
        <GuideGroup audience="commercial" />

        <section className="section-flow section-matte relative border-t border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <p className="font-mono text-[10px] tracking-[0.24em] text-zinc-600 uppercase">
              Guides connect strategy content to local market context and clear CTAs.
            </p>
            <p className="mt-4 max-w-3xl text-sm text-zinc-500">
              {scenarioRegistry.length} financing paths indexed for buyers, homeowners,
              agents, and commercial borrowers across licensed markets.
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
