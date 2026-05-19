import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FooterBrand } from "../../components/brand";
import { ComplianceFooter } from "../../components/compliance-footer";
import { FooterSocialLinks } from "../../components/footer-social-links";
import { PageHero, SectionHeader } from "../../components/design-system";
import { PageAmbient } from "../../components/page-ambient";
import { RevealGroup } from "../../components/reveal-group";
import { SiteNav } from "../../components/site-nav";
import { RelatedContentRail } from "../../components/related-content-rail";
import { SocialFollowSection } from "../../components/social-follow-section";
import { TrackedAnchor, TrackedLink } from "../../components/tracked-link";
import { getSocialPostBySlug, socialPosts } from "../../lib/social-posts";

type SocialPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return socialPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: SocialPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getSocialPostBySlug(slug);

  if (!post) {
    return {
      title: "Social Post | The Loan Playbook",
    };
  }

  return {
    title: `${post.title} | The Loan Playbook`,
    description: post.shortSummary,
    openGraph: {
      title: post.title,
      description: post.shortSummary,
      url: `/social/${post.slug}`,
      type: "article",
    },
  };
}

export default async function SocialPostPage({ params }: SocialPostPageProps) {
  const { slug } = await params;
  const post = getSocialPostBySlug(slug);

  if (!post) notFound();

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
          eyebrow={`${post.platform} / ${post.category}`}
          title={post.title}
          lead={post.shortSummary}
          focusLabel="Content Flywheel"
          focus="Short video -> deeper guide -> compliant strategy call."
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href={`/videos/${post.slug}`}
              location="social_post_hero"
              label="Full video page"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Full Video Page
            </TrackedAnchor>
            <TrackedAnchor
              href={post.postUrl}
              target="_blank"
              rel="noreferrer"
              location="social_post_hero"
              label={post.cta.label}
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              {post.cta.label}
            </TrackedAnchor>
            {post.relatedLearnArticle ? (
              <TrackedLink
                href={post.relatedLearnArticle.href}
                location="social_post_hero"
                label={post.relatedLearnArticle.label}
                className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
              >
                {post.relatedLearnArticle.label}
              </TrackedLink>
            ) : null}
          </div>
        </PageHero>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-10">
            <RevealGroup
              className="relative overflow-hidden border border-zinc-900/80 bg-[#050505] p-4 md:p-6"
              stagger={90}
            >
              <div className="reveal-item relative aspect-[9/12] overflow-hidden bg-[#080808]">
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
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div
                      className="playbook-grid pointer-events-none absolute inset-0 opacity-25"
                      aria-hidden
                    />
                    <p className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                      {post.platform}
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
                eyebrow="Landing Page Ready"
                title="Watch, read, then take the next step."
                lead="This route is ready for thumbnail assets, transcript copy, related articles, and dedicated campaign CTAs as each post becomes a full landing page."
              />
              <div className="reveal-item mt-8 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2">
                {[
                  ["Platform", post.platform],
                  ["Topic", post.topic],
                  ["Category", post.category],
                  ["Landing slug", post.landingPageSlug],
                ].map(([label, value]) => (
                  <div key={label} className="bg-[#050505] p-5">
                    <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
                      {label}
                    </p>
                    <p className="mt-3 text-sm text-zinc-300">{value}</p>
                  </div>
                ))}
              </div>
              <div className="reveal-item mt-8 border border-zinc-900/80 bg-[#050505] p-7">
                <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                  Transcript
                </p>
                <p className="mt-5 leading-relaxed text-zinc-500">
                  {post.transcript ?? "Transcript pending."}
                </p>
              </div>
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <RelatedContentRail
          title="Related guides"
          lead="Continue from the clip to structured financing guidance."
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
          videoSlugs={[post.slug]}
        />

        <SocialFollowSection
          title="Follow the full channel mix."
          lead="The profile network stays live while individual post pages are added one by one."
          showFlywheel={false}
        />
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
