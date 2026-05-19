import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FooterBrand } from "../../components/brand";
import { ComplianceFooter } from "../../components/compliance-footer";
import { FooterSocialLinks } from "../../components/footer-social-links";
import { PageHero, SectionHeader } from "../../components/design-system";
import { MediaThumbnail } from "../../components/media-thumbnail";
import { PageAmbient } from "../../components/page-ambient";
import { RevealGroup } from "../../components/reveal-group";
import { RelatedContentRail } from "../../components/related-content-rail";
import { SiteNav } from "../../components/site-nav";
import { TrackedAnchor, TrackedLink } from "../../components/tracked-link";
import { getScenarioBySlug } from "../../lib/scenario-registry";
import { getSocialPostBySlug, socialPosts } from "../../lib/social-posts";

type VideoPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return socialPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: VideoPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getSocialPostBySlug(slug);

  if (!post) {
    return { title: "Video | The Loan Playbook" };
  }

  return {
    title: `${post.title} | The Loan Playbook`,
    description: post.shortSummary,
    openGraph: {
      title: post.title,
      description: post.shortSummary,
      url: `/videos/${post.slug}`,
      type: "video.other",
    },
  };
}

export default async function VideoLandingPage({ params }: VideoPageProps) {
  const { slug } = await params;
  const post = getSocialPostBySlug(slug);

  if (!post) notFound();

  const relatedScenario = getScenarioBySlug(
    post.topic.toLowerCase().replace(/\s+/g, "-"),
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <PageAtmosphere />
      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow={`${post.platform} / ${post.category}`}
          title={post.title}
          lead={post.shortSummary}
          focusLabel="Video SEO"
          focus="Short video → indexed landing page → strategy call."
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href={post.postUrl}
              target="_blank"
              rel="noreferrer"
              location="video_landing_hero"
              label={post.cta.label}
              eventType="video"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              {post.cta.label}
            </TrackedAnchor>
            {post.relatedLearnArticle ? (
              <TrackedLink
                href={post.relatedLearnArticle.href}
                location="video_landing_hero"
                label={post.relatedLearnArticle.label}
                className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
              >
                {post.relatedLearnArticle.label}
              </TrackedLink>
            ) : null}
          </div>
        </PageHero>

        <section
          className="section-flow section-matte relative border-y border-zinc-900/40"
          data-analytics-section="featured_video"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10">
            <RevealGroup
              className="relative overflow-hidden border border-zinc-900/80 bg-[#050505] p-3"
              stagger={90}
            >
              <div className="reveal-item relative aspect-[9/12] overflow-hidden border border-zinc-900/80 bg-[#080808]">
                {post.embedUrl ? (
                  <iframe
                    src={post.embedUrl}
                    title={`${post.title} embed`}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <MediaThumbnail
                    title={post.title}
                    category={post.category}
                    platform={post.platform}
                    thumbnailSrc={post.thumbnailSrc}
                    thumbnailFocalPoint={post.thumbnailFocalPoint}
                    className="h-full"
                  />
                )}
              </div>
            </RevealGroup>

            <RevealGroup className="flex flex-col justify-center" stagger={110}>
              <SectionHeader
                eyebrow="Watch & Read"
                title="Turn short-form content into search assets."
                lead="Transcript support, related guides, and a clear CTA keep the page useful beyond the scroll."
              />
              <article className="reveal-item mt-8 border border-zinc-900/80 bg-[#050505] p-7">
                <h2 className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                  Transcript
                </h2>
                <p className="mt-5 leading-relaxed text-zinc-400">
                  {post.transcript ?? "Transcript pending import."}
                </p>
              </article>
              <article className="reveal-item mt-6 border border-zinc-900/80 bg-[#050505] p-7">
                <h2 className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                  Scenario relevance
                </h2>
                <p className="mt-5 leading-relaxed text-zinc-400">
                  Topic: {post.topic}. Category: {post.category}. Use the related
                  guides below for the full financing context behind this clip.
                </p>
              </article>
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <RelatedContentRail
          title="Related guides"
          lead="Deeper reads connected to this video."
          guideLinks={
            post.relatedLearnArticle
              ? [
                  {
                    label: "Guide",
                    title: post.relatedLearnArticle.label,
                    href: post.relatedLearnArticle.href,
                  },
                ]
              : []
          }
          videoSlugs={socialPosts
            .filter((entry) => entry.slug !== post.slug)
            .slice(0, 2)
            .map((entry) => entry.slug)}
        />

        {relatedScenario ? (
          <RelatedContentRail
            title="Related guide"
            lead="A structured path for this topic."
            scenarioSlugs={[relatedScenario.slug]}
          />
        ) : null}
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
