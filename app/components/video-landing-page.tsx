import { FooterBrand } from "./brand";
import { CollapsibleSection } from "./collapsible-section";
import { ComplianceFooter } from "./compliance-footer";
import { FooterSocialLinks } from "./footer-social-links";
import { HeroVideoPlayer } from "./hero-video-player";
import { LeadCaptureForm } from "./lead-capture-form";
import { MicroOptIn } from "./micro-opt-in";
import { PageAmbient } from "./page-ambient";
import { RevealGroup } from "./reveal-group";
import { RelatedContentRail } from "./related-content-rail";
import { SiteNav } from "./site-nav";
import { StickyMobileCta } from "./sticky-mobile-cta";
import { TrustLayer } from "./trust-layer";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import { SectionHeader } from "./design-system";
import {
  formatTranscriptParagraphs,
  getPublishedVideos,
  getVideoPublishingContext,
} from "../lib/content-engine";
import type { HeroVideo } from "../lib/hero-videos";
import { getScenarioFormType } from "../lib/scenario-registry";

const APPLY_HREF = "https://www.broadviewlending.com/apply";

export function VideoLandingPage({ post }: { post: HeroVideo }) {
  const context = getVideoPublishingContext(post.slug);

  if (!context) return null;

  const { cluster, audience, related, optIn } = context;
  const formType = getScenarioFormType(audience);
  const otherVideos = getPublishedVideos()
    .filter((entry) => entry.slug !== post.slug)
    .slice(0, 3);
  const transcriptBlocks = formatTranscriptParagraphs(
    post.transcript,
    post.transcriptParagraphs,
  );
  const localDetail = post.localRelevanceDetail ?? cluster?.commentary;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] pb-24 text-white md:pb-0">
      <PageAmbient enableParallax={false} />
      <PageAtmosphere />
      <SiteNav />

      <main className="relative z-10">
        <section className="relative isolate overflow-hidden border-b border-zinc-900/40">
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/20 via-[#050505] to-[#050505]"
            aria-hidden
          />
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 pb-14 pt-12 md:px-10 md:pb-20 md:pt-20">
            <RevealGroup stagger={90}>
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                {post.category} · {post.topic}
              </p>
              <h1 className="reveal-item mt-6 max-w-4xl text-[clamp(2.35rem,6.2vw,4.75rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-white">
                {post.title}
              </h1>
              <p className="reveal-item mt-6 max-w-2xl text-base leading-relaxed text-zinc-300 md:mt-8 md:text-lg">
                {post.shortSummary}
              </p>
              <p className="reveal-item mt-4 hidden max-w-3xl text-base leading-relaxed text-zinc-500 md:block">
                {post.expandedSummary}
              </p>
              <div className="reveal-item mt-8 flex flex-col gap-3 sm:flex-row sm:items-center md:mt-10">
                <TrackedAnchor
                  href={post.dominantCta.href}
                  location="video_landing_hero"
                  label={post.dominantCta.label}
                  className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
                >
                  {post.dominantCta.label}
                </TrackedAnchor>
                <TrackedAnchor
                  href={post.cta.href}
                  target="_blank"
                  rel="noreferrer"
                  location="video_landing_hero"
                  label="Watch on TikTok"
                  eventType="video"
                  className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-8 text-sm font-medium tracking-wide text-zinc-400 hover:border-[#7c3aed]/50 hover:text-white"
                >
                  Watch on TikTok
                </TrackedAnchor>
              </div>
            </RevealGroup>
          </div>
        </section>

        <section
          className="section-flow section-matte relative border-b border-zinc-900/40"
          data-analytics-section="featured_video"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 md:px-10">
            <RevealGroup
              className="relative overflow-hidden border border-zinc-900/80 bg-[#050505] p-3"
              stagger={90}
            >
              <div className="reveal-item">
                <HeroVideoPlayer
                  title={post.title}
                  category={post.category}
                  platform={post.platform}
                  embedUrl={post.embedUrl}
                  localVideoSrc={post.localVideoSrc}
                  posterSrc={post.thumbnailSrc}
                  thumbnailFocalPoint={post.thumbnailFocalPoint}
                />
              </div>
            </RevealGroup>

            <RevealGroup className="flex flex-col gap-5" stagger={110}>
              <article className="border border-zinc-900/80 bg-[#050505] p-6 md:p-7">
                <h2 className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                  Key takeaways
                </h2>
                <ul className="mt-5 space-y-3">
                  {post.keyTakeaways.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm leading-relaxed text-zinc-300 md:text-base"
                    >
                      <span
                        className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#7c3aed]"
                        aria-hidden
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              {(cluster || post.localRelevanceDetail) && localDetail ? (
                <article className="border border-zinc-900/80 bg-[#050505] p-6 md:p-7">
                  <h2 className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    Local relevance
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {localDetail}
                  </p>
                  {cluster ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {cluster.marketSlugs.slice(0, 3).map((slug) => (
                        <TrackedLink
                          key={slug}
                          href={`/markets/${slug}`}
                          location="video_local_market"
                          label={slug}
                          className="rounded-full border border-zinc-800 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-zinc-400 uppercase hover:border-[#7c3aed]/50 hover:text-white"
                        >
                          {slug.replace(/-/g, " ")}
                        </TrackedLink>
                      ))}
                      {cluster.stateRouteSlug ? (
                        <TrackedLink
                          href={`/${cluster.stateRouteSlug}`}
                          location="video_local_state"
                          label="Washington strategy"
                          className="rounded-full border border-zinc-800 px-4 py-2 font-mono text-[10px] tracking-[0.16em] text-zinc-400 uppercase hover:border-[#7c3aed]/50 hover:text-white"
                        >
                          Washington overview
                        </TrackedLink>
                      ) : null}
                    </div>
                  ) : null}
                </article>
              ) : null}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {post.faq && post.faq.length > 0 ? (
          <section className="section-flow relative border-b border-zinc-900/40">
            <div className="relative mx-auto w-full max-w-3xl px-6 md:px-10">
              <SectionHeader
                eyebrow="FAQ"
                title="Common questions"
                lead="Straight answers—education first, not rate quotes."
              />
              <div className="mt-10 space-y-4">
                {post.faq.map((item) => (
                  <article
                    key={item.question}
                    className="border border-zinc-900/80 bg-[#050505] p-6 md:p-7"
                  >
                    <h3 className="text-lg font-medium text-white">
                      {item.question}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                      {item.answer}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        <section className="section-flow relative border-b border-zinc-900/40">
          <div className="relative mx-auto w-full max-w-3xl px-6 md:px-10">
            <CollapsibleSection title="Transcript" eyebrow="Optional">
              {transcriptBlocks.length > 0 ? (
                <div className="space-y-5">
                  {transcriptBlocks.map((paragraph, index) => (
                    <p
                      key={`${index}-${paragraph.slice(0, 24)}`}
                      className="text-sm leading-[1.7] text-zinc-400 md:text-base"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-zinc-500">Transcript coming soon.</p>
              )}
            </CollapsibleSection>
          </div>
        </section>

        <RelatedContentRail
          title="Related guides"
          lead="Go deeper on the financing topics behind this video."
          scenarioSlugs={related.guideSlugs}
          guideLinks={related.guideLinks}
          geoSlugs={related.marketSlugs}
          stateRouteSlugs={related.stateRouteSlugs}
          videoSlugs={otherVideos.map((v) => v.slug)}
        />

        <section
          id="video-cta"
          className="section-flow relative border-t border-zinc-900/40"
          data-analytics-section="lead_capture"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-12 md:px-10">
            <RevealGroup stagger={100}>
              <SectionHeader
                eyebrow="Next step"
                title="Talk through your scenario"
                lead="Share your goal and timeline. We respond with context—not a rate quote."
              />
              <div className="reveal-item mt-6 space-y-4">
                <MicroOptIn
                  eyebrow="Stay in context"
                  title={optIn.title}
                  body={optIn.body}
                  submitLabel={optIn.submitLabel}
                  optInType={optIn.optInType}
                  intent={audience}
                  location={`video_${post.slug}_opt_in`}
                />
                <TrackedAnchor
                  href={APPLY_HREF}
                  target="_blank"
                  rel="noreferrer"
                  location="video_landing_apply"
                  label="Apply through Broadview Lending"
                  className="inline-flex text-sm text-zinc-500 underline-offset-4 hover:text-zinc-300 hover:underline"
                >
                  Apply through Broadview Lending →
                </TrackedAnchor>
              </div>
            </RevealGroup>
            <div className="reveal-item">
              <LeadCaptureForm
                formType={formType}
                submitLabel={post.dominantCta.label}
              />
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative border-t border-zinc-900/40">
          <div className="relative mx-auto w-full max-w-3xl px-6 md:px-10">
            <TrustLayer variant="compact" showReviews={false} />
          </div>
        </section>
      </main>

      <StickyMobileCta
        href={post.dominantCta.href}
        label={post.dominantCta.label}
        location={`video_${post.slug}_sticky`}
      />

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
