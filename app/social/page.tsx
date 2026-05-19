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
import { socialPosts } from "../lib/social-posts";

export const metadata: Metadata = {
  title: "Social Channels | The Loan Playbook",
  description:
    "The main social channels for The Loan Playbook, including TikTok, Instagram, Facebook, YouTube, LinkedIn, and post landing pages.",
};

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
          lead="Main profiles, short clips, and related guide paths."
          focusLabel="Next Step"
          focus="Watch quickly. Go deeper when ready."
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
          title="Main social profiles."
          lead="TikTok, Instagram, Facebook, YouTube, and LinkedIn anchor the distribution system."
          showFlywheel={false}
          showHubLink={false}
        />

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Post Landing Pages"
              title="Curated posts, ready to scale."
              lead="Each card can become its own page with transcript, related guide, thumbnail, CTA, and campaign copy."
            />
            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-5"
              stagger={90}
            >
              {socialPosts.map((post) => (
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
