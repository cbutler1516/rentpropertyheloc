import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { FooterSocialLinks } from "../components/footer-social-links";
import { PageHero, SectionHeader } from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { SocialFollowSection } from "../components/social-follow-section";
import { SocialPostCard } from "../components/social-post-card";
import { TrackedAnchor, TrackedLink } from "../components/tracked-link";
import { getPublishedHeroVideos } from "../lib/hero-videos";

export const metadata: Metadata = {
  title: "Social Channels | The Loan Playbook",
  description:
    "Follow The Loan Playbook on TikTok, Instagram, Facebook, YouTube, and LinkedIn—plus watch pages for every published video.",
};

const publishedVideos = getPublishedHeroVideos();

export default function SocialHubPage() {
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
      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Social Channels"
          title="Follow the playbook everywhere."
          lead="Short clips on social—and full watch pages when you want more context."
          focusLabel="Next Step"
          focus="Watch quickly. Go deeper when you're ready."
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="https://www.tiktok.com/@theloanplaybook"
              target="_blank"
              rel="noreferrer"
              location="social_hub_hero"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Follow on TikTok
            </TrackedAnchor>
            <TrackedLink
              href="/videos"
              location="social_hub_hero"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Watch Videos
            </TrackedLink>
          </div>
        </PageHero>

        <SocialFollowSection
          eyebrow="Follow The Loan Playbook"
          title="Follow the channels."
          lead="TikTok, Instagram, Facebook, YouTube, and LinkedIn."
          showFlywheel={false}
          showHubLink={false}
        />

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Watch Pages"
              title="Published videos"
              lead="Each card opens a full page with the video, takeaways, and related guides."
            />
            <RevealGroup
              className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              stagger={90}
            >
              {publishedVideos.map((post) => (
                <SocialPostCard key={post.slug} post={post} />
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
