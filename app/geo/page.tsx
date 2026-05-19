import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { ArticleCard, PageHero, SectionHeader } from "../components/design-system";
import { FooterSocialLinks } from "../components/footer-social-links";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { TrackedLink } from "../components/tracked-link";
import { geoMarkets } from "../lib/geo-markets";

export const metadata: Metadata = {
  title: "Washington Mortgage Markets | The Loan Playbook",
  description:
    "Local mortgage strategy for Seattle, Bellevue, Kirkland, Tacoma, Green Lake, and Washington State—without spammy geo pages.",
};

export default function GeoHubPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <PageAtmosphere />
      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Local Markets"
          title="Washington financing context—specific, not spammy."
          lead="Geographic pages built around real buyer and homeowner decisions in Puget Sound and statewide markets."
          focusLabel="GEO Strategy"
          focus="Capture local intent with scenario depth and clear CTAs."
          videoSrc="/videos/loan-playbook-commercial-golf.mp4"
        >
          <HeroCtas />
        </PageHero>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Pacific Northwest"
              title="Markets we cover."
              lead="Each page links to relevant scenarios, guides, and videos—not duplicate boilerplate."
            />
            <RevealGroup
              className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
              stagger={80}
            >
              {geoMarkets.map((market) => (
                <ArticleCard
                  key={market.slug}
                  label={market.regionLabel}
                  title={market.name}
                  excerpt={market.heroLead}
                  href={`/geo/${market.slug}`}
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

function HeroCtas() {
  return (
    <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
      <TrackedLink
        href="/scenarios"
        location="geo_hub_hero"
        label="Browse Scenarios"
        className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
      >
        Browse Scenarios
      </TrackedLink>
      <TrackedLink
        href="/learn/buyer-readiness"
        location="geo_hub_hero"
        label="Start Strategy Call"
        className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
      >
        Start Strategy Call
      </TrackedLink>
    </div>
  );
}
