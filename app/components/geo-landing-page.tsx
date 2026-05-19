import type { Metadata } from "next";
import { FooterBrand } from "./brand";
import { ComplianceFooter } from "./compliance-footer";
import { FooterSocialLinks } from "./footer-social-links";
import { LeadCaptureForm } from "./lead-capture-form";
import { PageHero, SectionHeader } from "./design-system";
import { PageAmbient } from "./page-ambient";
import { RevealGroup } from "./reveal-group";
import { LicensingTrust } from "./licensing-trust";
import { RelatedContentRail } from "./related-content-rail";
import { SiteNav } from "./site-nav";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import type { GeoMarket } from "../lib/geo-markets";
import { getGeoMarketsByStateKey, getStateRouteForGeoMarket } from "../lib/geo-markets";
import { getStateMarketByKey } from "../lib/state-markets";
import { getScenarioFormType } from "../lib/scenario-registry";

export function createGeoMetadata(market: GeoMarket): Metadata {
  return {
    title: `${market.title} | The Loan Playbook`,
    description: market.description,
    openGraph: {
      title: market.title,
      description: market.description,
      type: "article",
    },
  };
}

export function GeoLandingPage({ market }: { market: GeoMarket }) {
  const formType = getScenarioFormType(market.primaryAudience);
  const stateRoute = getStateRouteForGeoMarket(market);
  const stateMarket = getStateMarketByKey(market.stateKey);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] pb-24 text-white md:pb-0">
      <PageAmbient enableParallax={false} />
      <PageAtmosphere />
      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow={`${market.regionLabel} / ${market.name}`}
          title={market.title}
          lead={market.heroLead}
          focusLabel="Local Context"
          focus={market.heroFocus}
          videoSrc="/videos/loan-playbook-commercial-golf.mp4"
        >
          {stateRoute && stateMarket ? (
            <div className="reveal-item mt-8 max-w-2xl space-y-4">
              <LicensingTrust />
              <TrackedLink
                href={`/${stateRoute}`}
                location={`market_${market.slug}_state`}
                label={`${stateMarket.name} overview`}
                className="inline-flex text-sm font-medium text-zinc-400 hover:text-white"
              >
                ← {stateMarket.name} statewide strategy
              </TrackedLink>
            </div>
          ) : (
            <div className="reveal-item mt-8 max-w-2xl">
              <LicensingTrust />
            </div>
          )}
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="#market-cta"
              location={`market_${market.slug}_hero`}
              label="Start Strategy Conversation"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Start Strategy Conversation
            </TrackedAnchor>
            <TrackedAnchor
              href="/guides"
              location={`market_${market.slug}_hero`}
              label="Browse Financing Guides"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Browse Financing Guides
            </TrackedAnchor>
          </div>
        </PageHero>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Local Context"
              title={`What matters in ${market.name}.`}
              lead="Local context without generic filler—focused on financing decisions buyers and homeowners actually face."
            />
            <RevealGroup
              className="mt-12 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
              stagger={90}
            >
              {market.localContext.map((item, index) => (
                <article key={item} className="reveal-item bg-[#050505] p-7">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-5 text-lg leading-snug text-zinc-200">{item}</p>
                </article>
              ))}
            </RevealGroup>
            {market.luxuryNote ? (
              <p className="mt-10 max-w-3xl text-base leading-relaxed text-zinc-500">
                {market.luxuryNote}
              </p>
            ) : null}
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <RelatedContentRail
          title="Buyer guides"
          lead={`Common buyer paths in ${market.name}.`}
          scenarioSlugs={market.buyerScenarios}
        />

        <RelatedContentRail
          title="Homeowner guides"
          lead="Refinance, equity, and timing decisions."
          scenarioSlugs={market.homeownerScenarios}
        />

        <RelatedContentRail
          title="Agent resources"
          lead="Financing clarity for client conversations."
          scenarioSlugs={market.agentScenarios}
        />

        {stateRoute ? (
          <RelatedContentRail
            title="Statewide context"
            lead="Broader licensing and market strategy for this state."
            stateRouteSlugs={[stateRoute]}
            geoSlugs={getGeoMarketsByStateKey(market.stateKey)
              .filter((metro) => metro.slug !== market.slug)
              .slice(0, 3)
              .map((metro) => metro.slug)}
          />
        ) : null}

        <section
          id="market-cta"
          className="section-flow relative"
          data-analytics-section="lead_capture"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10">
            <div>
              <SectionHeader
                eyebrow="Next Step"
                title={`Talk through a ${market.name} financing goal.`}
                lead="Send the goal, property type, and timeline. We will help frame the next move."
              />
              <div className="mt-8">
                <LicensingTrust variant="banner" />
              </div>
            </div>
            <LeadCaptureForm
              formType={formType}
              submitLabel="Start Strategy Conversation"
            />
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
      <div
        className="pointer-events-none fixed top-[-12rem] right-[-8rem] z-[1] h-[36rem] w-[36rem] rounded-full bg-[#5b21b6]/15 blur-[120px]"
        aria-hidden
      />
    </>
  );
}
