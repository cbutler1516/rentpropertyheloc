import type { Metadata } from "next";
import { ApplicationCta } from "./application-cta";
import { FooterBrand } from "./brand";
import { ComplianceFooter } from "./compliance-footer";
import { FooterSocialLinks } from "./footer-social-links";
import { LeadCaptureForm, type LeadIntent } from "./lead-capture-form";
import { MediaThumbnail } from "./media-thumbnail";
import { MicroOptIn } from "./micro-opt-in";
import { PageHero, SectionHeader } from "./design-system";
import { PageAmbient } from "./page-ambient";
import { RevealGroup } from "./reveal-group";
import { SchedulingLink } from "./scheduling-cta";
import { SiteNav } from "./site-nav";
import { StickyMobileCta } from "./sticky-mobile-cta";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import { optInCopyByAudience } from "../lib/content-engine";
import type { MoneyFunnel } from "../lib/money-funnels";
import type { HeroVideo } from "../lib/hero-videos";
import { getSocialPostBySlug } from "../lib/social-posts";

const applicationCtaSlugs = new Set([
  "seller-concessions",
  "refinance-timing",
  "heloc-strategy",
]);

export function createMoneyFunnelMetadata(funnel: MoneyFunnel): Metadata {
  return {
    title: `${funnel.eyebrow} | The Loan Playbook`,
    description: funnel.description,
    openGraph: {
      title: funnel.ogTitle ?? funnel.title,
      description: funnel.ogDescription ?? funnel.description,
      images: [
        {
          url: "/loan-playbook-social-preview.svg",
          width: 1200,
          height: 630,
          alt: `${funnel.eyebrow} preview`,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: funnel.ogTitle ?? funnel.title,
      description: funnel.ogDescription ?? funnel.description,
      images: ["/loan-playbook-social-preview.svg"],
    },
  };
}

function getFunnelIntent(funnel: MoneyFunnel): LeadIntent {
  if (funnel.formType === "Homeowner Strategy Review") return "homeowner";
  if (funnel.formType === "Agent Partnership Conversation") return "agent";
  if (funnel.formType === "Commercial Scenario Review") return "commercial";

  return "buyer";
}

function getMicroOptInCopy(intent: LeadIntent) {
  if (intent === "homeowner") return optInCopyByAudience.homeowner;
  if (intent === "agent") return optInCopyByAudience.agent;
  if (intent === "commercial") return optInCopyByAudience.commercial;
  return optInCopyByAudience.buyer;
}

export function MoneyFunnelPage({ funnel }: { funnel: MoneyFunnel }) {
  const featuredPost = getSocialPostBySlug(funnel.videoSlug);
  const relatedPosts = funnel.relatedSocialSlugs
    .map((slug) => getSocialPostBySlug(slug))
    .filter((post): post is HeroVideo => Boolean(post));
  const leadIntent = getFunnelIntent(funnel);
  const optIn = getMicroOptInCopy(leadIntent);
  const showApplicationCta = applicationCtaSlugs.has(funnel.slug);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] pb-24 text-white md:pb-0">
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

      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow={funnel.eyebrow}
          title={funnel.title}
          lead={funnel.heroLead}
          focusLabel="Flow"
          focus={funnel.heroFocus ?? "Video -> landing page -> consultation."}
          videoSrc={funnel.heroVideoSrc}
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="#funnel-cta"
              location={`${funnel.slug}_hero`}
              label={funnel.ctaLabel}
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              {funnel.ctaLabel}
            </TrackedAnchor>
          </div>
        </PageHero>

        <section
          className="section-flow section-matte relative border-y border-zinc-900/40"
          data-analytics-section="featured_video"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16 md:px-10">
            <RevealGroup
              className="relative overflow-hidden border border-zinc-900/80 bg-[#050505] p-3 shadow-[0_32px_120px_rgba(0,0,0,0.35)] md:p-5"
              stagger={90}
            >
              <div className="reveal-item relative aspect-[9/12] overflow-hidden border border-zinc-900/80 bg-[#080808]">
                {featuredPost?.embedUrl ? (
                  <iframe
                    src={featuredPost.embedUrl}
                    title={`${featuredPost.title} embed`}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <MediaThumbnail
                    title={funnel.videoTitle ?? featuredPost?.title ?? "Featured video"}
                    category={featuredPost?.category ?? funnel.eyebrow}
                    platform={featuredPost?.platform}
                    thumbnailLabel="Featured"
                    thumbnailSrc={featuredPost?.thumbnailSrc ?? funnel.thumbnailSrc}
                    thumbnailFocalPoint={
                      featuredPost?.thumbnailFocalPoint ?? funnel.thumbnailFocalPoint
                    }
                    runtime={featuredPost?.runtime}
                    className="h-full"
                  />
                )}
              </div>
            </RevealGroup>

            <RevealGroup className="flex flex-col justify-center" stagger={110}>
              <SectionHeader
                eyebrow="Watch First"
                title={funnel.videoTitle ?? featuredPost?.title ?? "Featured video"}
                lead={funnel.videoLead ?? featuredPost?.shortSummary ?? "Video placeholder ready."}
              />
              {featuredPost ? (
                <TrackedAnchor
                  href={featuredPost.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  location={`${funnel.slug}_featured_video`}
                  label={featuredPost.cta.label}
                  eventType="video"
                  className="btn-ghost reveal-item mt-8 inline-flex h-14 w-fit items-center justify-center border border-zinc-800 px-8 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
                >
                  Watch
                </TrackedAnchor>
              ) : null}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow={funnel.takeawaysEyebrow ?? "Takeaways"}
              title={funnel.takeawaysTitle ?? "Know the move."}
              lead={funnel.takeawaysLead ?? "Quick points before the conversation."}
            />
            <RevealGroup
              className="mt-14 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2 lg:grid-cols-4"
              stagger={80}
            >
              {funnel.takeaways.map((takeaway, index) => (
                <article key={takeaway} className="reveal-item bg-[#050505] p-7">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-white">
                    {takeaway}
                  </h3>
                </article>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.82fr_1.18fr] md:gap-16 md:px-10">
            <SectionHeader
              eyebrow={funnel.mistakesEyebrow ?? "Mistakes"}
              title={funnel.mistakesTitle ?? "Avoid the obvious traps."}
              lead={funnel.mistakesLead ?? "Simple issues that create late friction."}
            />
            <RevealGroup className="grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70">
              {funnel.mistakes.map((mistake) => (
                <div key={mistake} className="reveal-item bg-[#050505] p-6">
                  <p className="text-lg leading-snug tracking-[-0.02em] text-zinc-200">
                    {mistake}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow={funnel.clarifiesEyebrow ?? "Clarify"}
              title={funnel.clarifiesTitle ?? "What we organize."}
              lead={funnel.clarifiesLead ?? "The core inputs behind the next move."}
            />
            <RevealGroup
              className="mt-12 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2 lg:grid-cols-5"
              stagger={60}
            >
              {funnel.clarifies.map((item) => (
                <div key={item} className="reveal-item bg-[#050505] p-6">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                    Input
                  </p>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-white">
                    {item}
                  </h3>
                </div>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow={funnel.howItWorksEyebrow ?? "How It Works"}
              title={funnel.howItWorksTitle ?? "Short path. Clear output."}
              lead={funnel.howItWorksLead}
            />
            <RevealGroup
              className="mt-12 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
              stagger={90}
            >
              {funnel.howItWorks.map((step, index) => (
                <article key={step.title} className="reveal-item bg-[#050505] p-7">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-500">
                    {step.body}
                  </p>
                </article>
              ))}
            </RevealGroup>
            {funnel.trustSignals?.length ? (
              <RevealGroup
                className="mt-10 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
                stagger={80}
              >
                {funnel.trustSignals.map((signal) => (
                  <div key={signal} className="reveal-item bg-[#050505] p-6">
                    <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                      Guidance
                    </p>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                      {signal}
                    </p>
                  </div>
                ))}
              </RevealGroup>
            ) : null}
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section
          id="funnel-cta"
          className="section-flow relative"
          data-analytics-section="lead_capture"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="cta-panel group relative overflow-hidden border border-zinc-900/80 bg-[#0a0a0a] px-8 py-16 md:px-16 md:py-20">
              <div
                className="playbook-grid pointer-events-none absolute inset-0 opacity-30"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/12 via-transparent to-transparent"
                aria-hidden
              />
              <RevealGroup className="relative" stagger={110}>
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  {funnel.ctaLabel}
                </p>
                <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
                  {funnel.ctaTitle}
                </h2>
                <p className="reveal-item mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
                  {funnel.ctaBody}
                </p>
                <LeadCaptureForm
                  formType={funnel.formType}
                  submitLabel={funnel.ctaLabel}
                  intent={leadIntent}
                />
                {funnel.bookingType ? (
                  <SchedulingLink
                    type={funnel.bookingType}
                    className="btn-ghost reveal-item mt-5 inline-flex h-12 w-fit items-center justify-center border border-zinc-800 px-7 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
                  />
                ) : null}
                <p className="reveal-item mt-5 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                  Strategy-first · Education-first · No-pressure guidance
                </p>
              </RevealGroup>
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section
          className="section-flow section-matte relative border-y border-zinc-900/40"
          data-analytics-section="featured_guides"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[1fr_1fr] md:gap-16 md:px-10">
            <div>
              <SectionHeader eyebrow="Related Guides" title="Read next." />
              <RevealGroup className="mt-10 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70">
                {funnel.relatedGuides.map((guide) => (
                  <TrackedLink
                    key={guide.href}
                    href={guide.href}
                    location={`${funnel.slug}_related_guides`}
                    label={guide.title}
                    eventType="related_guide"
                    className="reveal-item group bg-[#050505] p-6"
                  >
                    <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                      {guide.label}
                    </p>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-white">
                      {guide.title}
                    </h3>
                  </TrackedLink>
                ))}
              </RevealGroup>
            </div>
            <div>
              <SectionHeader eyebrow="Related Videos" title="Watch next." />
              <RevealGroup className="mt-10 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70">
                {relatedPosts.map((post) => (
                  <TrackedLink
                    key={post.slug}
                    href={`/videos/${post.slug}`}
                    location={`${funnel.slug}_related_videos`}
                    label={post.title}
                    eventType="thumbnail"
                    className="reveal-item group bg-[#050505] p-6"
                  >
                    <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                      {post.platform}
                    </p>
                    <h3 className="mt-4 text-xl font-semibold tracking-[-0.02em] text-white">
                      {post.title}
                    </h3>
                  </TrackedLink>
                ))}
              </RevealGroup>
            </div>
            <div className="md:col-span-2">
              {showApplicationCta ? (
                <div className="mb-10">
                  <ApplicationCta
                    location={`${funnel.slug}_application`}
                    title="Ready for lender review?"
                    body="Continue to the secure application through Broadview Lending, powered by Barrett Financial Group."
                    label="Apply Through Broadview Lending"
                  />
                </div>
              ) : null}
              <MicroOptIn
                title={optIn.title}
                body={optIn.body}
                submitLabel={optIn.submitLabel}
                optInType={optIn.optInType}
                intent={leadIntent}
                location={`${funnel.slug}_related_content`}
              />
            </div>
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
      <StickyMobileCta
        href="#funnel-cta"
        label={funnel.ctaLabel}
        eyebrow={funnel.eyebrow}
        location={`${funnel.slug}_mobile_sticky`}
      />
    </div>
  );
}
