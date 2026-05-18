import type { Metadata } from "next";
import { FooterBrand } from "./brand";
import { ComplianceFooter } from "./compliance-footer";
import { FooterSocialLinks } from "./footer-social-links";
import { LeadCaptureForm } from "./lead-capture-form";
import { PageHero, SectionHeader } from "./design-system";
import { PageAmbient } from "./page-ambient";
import { RevealGroup } from "./reveal-group";
import { SchedulingLink } from "./scheduling-cta";
import { SiteNav } from "./site-nav";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import type { MoneyFunnel } from "../lib/money-funnels";
import { getSocialPostBySlug, type SocialPost } from "../lib/social-posts";

export function createMoneyFunnelMetadata(funnel: MoneyFunnel): Metadata {
  return {
    title: `${funnel.eyebrow} | The Loan Playbook`,
    description: funnel.description,
    openGraph: {
      title: funnel.title,
      description: funnel.description,
      type: "article",
    },
  };
}

export function MoneyFunnelPage({ funnel }: { funnel: MoneyFunnel }) {
  const featuredPost = getSocialPostBySlug(funnel.videoSlug);
  const relatedPosts = funnel.relatedSocialSlugs
    .map((slug) => getSocialPostBySlug(slug))
    .filter((post): post is SocialPost => Boolean(post));

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

      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow={funnel.eyebrow}
          title={funnel.title}
          lead={funnel.heroLead}
          focusLabel="Flow"
          focus="Video -> landing page -> consultation."
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

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16 md:px-10">
            <RevealGroup
              className="relative overflow-hidden border border-zinc-900/80 bg-[#050505] p-4 md:p-6"
              stagger={90}
            >
              <div className="reveal-item relative aspect-[9/12] overflow-hidden bg-[#080808]">
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
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div
                      className="playbook-grid pointer-events-none absolute inset-0 opacity-25"
                      aria-hidden
                    />
                    <p className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                      Featured video
                    </p>
                    <p className="relative font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
                      Embed pending
                    </p>
                  </div>
                )}
              </div>
            </RevealGroup>

            <RevealGroup className="flex flex-col justify-center" stagger={110}>
              <SectionHeader
                eyebrow="Watch First"
                title={featuredPost?.title ?? "Featured video"}
                lead={featuredPost?.shortSummary ?? "Video placeholder ready."}
              />
              {featuredPost ? (
                <TrackedAnchor
                  href={featuredPost.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  location={`${funnel.slug}_featured_video`}
                  label={featuredPost.cta.label}
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
              eyebrow="Takeaways"
              title="Know the move."
              lead="Quick points before the conversation."
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
              eyebrow="Mistakes"
              title="Avoid the obvious traps."
              lead="Simple issues that create late friction."
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
              eyebrow="Clarify"
              title="What we organize."
              lead="The core inputs behind the next move."
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
            <SectionHeader eyebrow="How It Works" title="Short path. Clear output." />
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
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section id="funnel-cta" className="section-flow relative">
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
                />
                {funnel.bookingType ? (
                  <SchedulingLink
                    type={funnel.bookingType}
                    className="btn-ghost reveal-item mt-5 inline-flex h-12 w-fit items-center justify-center border border-zinc-800 px-7 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
                  />
                ) : null}
                <p className="reveal-item mt-5 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                  Educational content only · No rate quote or loan commitment
                </p>
              </RevealGroup>
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
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
                    href={`/social/${post.slug}`}
                    location={`${funnel.slug}_related_videos`}
                    label={post.title}
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
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="relative mx-auto w-full max-w-7xl px-6 py-16 md:px-10 md:py-20">
          <RevealGroup
            className="grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-2"
            stagger={80}
          >
            <div className="reveal-item bg-[#050505] p-7">
              <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                Transcript
              </p>
              <p className="mt-5 text-sm leading-relaxed text-zinc-500">
                {funnel.transcriptPlaceholder}
              </p>
            </div>
            <div className="reveal-item bg-[#050505] p-7">
              <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                FAQ Placeholder
              </p>
              <ul className="mt-5 grid gap-3 text-sm leading-relaxed text-zinc-500">
                {funnel.faqPlaceholder.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </RevealGroup>
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
