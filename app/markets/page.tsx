import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { ArticleCard, PageHero, SectionHeader } from "../components/design-system";
import { FooterSocialLinks } from "../components/footer-social-links";
import { LicensingTrust } from "../components/licensing-trust";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { TrackedLink } from "../components/tracked-link";
import { getStrategicGeoMarkets } from "../lib/geo-markets";
import { stateMarkets } from "../lib/state-markets";

export const metadata: Metadata = {
  title: "Licensed Mortgage Markets | The Loan Playbook",
  description:
    "State and metro mortgage strategy across licensed markets—Washington, Arizona, California, Texas, Florida, and more. Depth over thin local pages.",
};

export default function MarketsHubPage() {
  const metros = getStrategicGeoMarkets();

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <PageAtmosphere />
      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Local Markets"
          title="Licensed state and metro financing context."
          lead="State authority pages and selective major metros—built around guides, trust, and conversion—not hundreds of thin city pages."
          focusLabel="Market Strategy"
          focus="Topical authority. Semantic links. Clear next step."
          videoSrc="/videos/loan-playbook-commercial-golf.mp4"
        >
          <div className="reveal-item mt-8 max-w-2xl">
            <LicensingTrust />
          </div>
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedLink
              href="/guides"
              location="markets_hub_hero"
              label="Browse Financing Guides"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Browse Financing Guides
            </TrackedLink>
            <TrackedLink
              href="/washington-mortgage"
              location="markets_hub_hero"
              label="Washington State"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Washington Strategy
            </TrackedLink>
          </div>
        </PageHero>

        <section className="section-flow relative border-b border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Licensed States"
              title="State mortgage strategy."
              lead="Each state page covers local financing considerations, guide relevance, major metros, and a clear CTA."
            />
            <RevealGroup
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              stagger={80}
            >
              {stateMarkets.map((state) => (
                <ArticleCard
                  key={state.routeSlug}
                  label={`${state.regionLabel} · ${state.abbreviation}`}
                  title={state.name}
                  excerpt={state.heroLead}
                  href={`/${state.routeSlug}`}
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
              eyebrow="Major Metros"
              title="Selective metro authority pages."
              lead="Only strategic metros with distinct financing context—each links to guides, learn articles, and videos."
            />
            <RevealGroup
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              stagger={80}
            >
              {metros.map((market) => (
                <ArticleCard
                  key={market.slug}
                  label={market.regionLabel}
                  title={market.name}
                  excerpt={market.heroLead}
                  href={`/markets/${market.slug}`}
                />
              ))}
            </RevealGroup>
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
