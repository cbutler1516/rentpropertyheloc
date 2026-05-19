import { FooterBrand } from "./brand";
import { ComplianceFooter } from "./compliance-footer";
import { ArticleCard, PageHero, SectionHeader } from "./design-system";
import { FooterSocialLinks } from "./footer-social-links";
import { LeadCaptureForm } from "./lead-capture-form";
import { LicensingTrust } from "./licensing-trust";
import { PageAmbient } from "./page-ambient";
import { RevealGroup } from "./reveal-group";
import { RelatedContentRail } from "./related-content-rail";
import { SiteNav } from "./site-nav";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import { getGeoMarketsByStateKey } from "../lib/geo-markets";
import type { StateMarket } from "../lib/state-markets";
import { getLocalAuthoritySnippet } from "../lib/local-authority";
import { getScenarioFormType } from "../lib/scenario-registry";

export function StateLandingPage({ market }: { market: StateMarket }) {
  const metros = getGeoMarketsByStateKey(market.key);
  const formType = getScenarioFormType("buyer");

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
          focusLabel="State Strategy"
          focus={market.heroFocus}
          videoSrc="/videos/loan-playbook-commercial-golf.mp4"
        >
          <div className="reveal-item mt-8 max-w-2xl space-y-6">
            {market.key === "washington" ? (
              <p className="text-sm leading-relaxed text-zinc-500">
                {getLocalAuthoritySnippet("general")}
              </p>
            ) : null}
            <LicensingTrust />
          </div>
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="#state-cta"
              location={`state_${market.key}_hero`}
              label="Start Strategy Conversation"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Start Strategy Conversation
            </TrackedAnchor>
            <TrackedAnchor
              href="/guides"
              location={`state_${market.key}_hero`}
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
              title={`Financing considerations in ${market.name}.`}
              lead="Market-specific strategy—not generic boilerplate. Focused on decisions buyers, homeowners, and agents actually face."
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
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative border-b border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Financing Paths"
              title="Financing topics by situation."
              lead="Jumbo, condo, first-time, and refinance themes—mapped to how this state actually buys."
            />
            <RevealGroup className="mt-12 grid gap-6 md:grid-cols-2" stagger={80}>
              {market.financingHighlights.map((highlight) => (
                <article
                  key={highlight.label}
                  className="reveal-item border border-zinc-900/80 bg-[#050505] p-8"
                >
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {highlight.label}
                  </p>
                  <p className="mt-5 text-base leading-relaxed text-zinc-400">
                    {highlight.detail}
                  </p>
                </article>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {metros.length > 0 ? (
          <section className="section-flow relative border-b border-zinc-900/40">
            <div className="section-bridge-top" aria-hidden />
            <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
              <SectionHeader
                eyebrow="Major Markets"
                title={`${market.name} metro strategy.`}
                lead="Selective metro pages—depth over thin city spam. Each links to guides and local CTAs."
              />
              <RevealGroup
                className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                stagger={80}
              >
                {metros.map((metro) => (
                  <ArticleCard
                    key={metro.slug}
                    label={metro.regionLabel}
                    title={metro.name}
                    excerpt={metro.heroLead}
                    href={`/markets/${metro.slug}`}
                  />
                ))}
              </RevealGroup>
              <MarketsHubLink marketKey={market.key} />
            </div>
            <div className="section-bridge-bottom" aria-hidden />
          </section>
        ) : null}

        <RelatedContentRail
          title="Buyer guides"
          lead={`Common buyer paths in ${market.name}.`}
          scenarioSlugs={market.buyerScenarios}
          videoSlugs={market.videoSlugs}
          guideLinks={
            market.guideHrefs?.map((guide) => ({
              label: "Guide",
              title: guide.label,
              href: guide.href,
            })) ?? []
          }
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

        {market.commercialScenarios && market.commercialScenarios.length > 0 ? (
          <RelatedContentRail
            title="Commercial & investor"
            lead="Strategy for investment and commercial-adjacent paths."
            scenarioSlugs={market.commercialScenarios}
            guideLinks={[
              { label: "Commercial", title: "Commercial strategy hub", href: "/commercial" },
            ]}
          />
        ) : null}

        <section
          id="state-cta"
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
            <LeadCaptureForm formType={formType} submitLabel="Start Strategy Conversation" />
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

function MarketsHubLink({ marketKey }: { marketKey: StateMarket["key"] }) {
  return (
    <div className="mt-10">
      <TrackedLink
        href="/markets"
        location={`state_${marketKey}_metros`}
        label="Browse all markets"
        className="text-sm font-medium text-zinc-400 hover:text-white"
      >
        Browse all licensed markets →
      </TrackedLink>
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

