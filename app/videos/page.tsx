import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { FooterSocialLinks } from "../components/footer-social-links";
import { PageHero, SectionHeader } from "../components/design-system";
import { MicroOptIn } from "../components/micro-opt-in";
import { PageAmbient } from "../components/page-ambient";
import { PublishedVideoCard } from "../components/published-video-card";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { SocialFollowSection } from "../components/social-follow-section";
import { TrackedAnchor } from "../components/tracked-link";
import {
  getPublishedHeroVideos,
  type HeroVideo,
} from "../lib/hero-videos";

export const metadata: Metadata = {
  title: "Videos | The Loan Playbook",
  description:
    "Short mortgage videos for payment clarity, buyer support, market context, agent conversations, and next steps.",
};

const publishedVideos = getPublishedHeroVideos();

const buyerSlugs = new Set([
  "buyer-preapproval-first-step",
  "buyer-power-seller-concessions-spring",
  "buyer-buydown-and-arm-options",
  "buyer-jumbo-loan-myths",
  "homeowner-buy-before-sell-program",
]);

const marketSlugs = new Set([
  "market-strategy-over-rate-noise",
  "homeowner-refinance-break-even-roi",
]);

const agentSlugs = new Set(["buyer-prequalified-vs-preapproved"]);

function videosForSlugs(slugs: Set<string>) {
  return publishedVideos.filter((video) => slugs.has(video.slug));
}

function VideoSection({
  id,
  eyebrow,
  title,
  lead,
  videos,
  matte = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  videos: HeroVideo[];
  matte?: boolean;
}) {
  if (videos.length === 0) return null;

  return (
    <section
      id={id}
      data-analytics-section={`videos_${id}`}
      className={`section-flow relative ${matte ? "section-matte border-y border-zinc-900/40" : ""}`}
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
        <RevealGroup
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={80}
        >
          {videos.map((video) => (
            <PublishedVideoCard key={video.slug} video={video} />
          ))}
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}

export default function VideosPage() {
  const featuredVideos = publishedVideos;
  const buyerVideos = videosForSlugs(buyerSlugs);
  const marketVideos = videosForSlugs(marketSlugs);
  const agentVideos = videosForSlugs(agentSlugs);

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
          eyebrow="Mortgage Videos"
          title="Short clips. Clearer decisions."
          lead="Quick mortgage context for buyers, homeowners, agents, and investors."
          focusLabel="Focus"
          focus="Watch a clip. Go deeper when you're ready."
          visual="basketball-agents"
          videoSrc="/videos/loan-playbook-videos-media-studio.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="#featured-videos"
              location="videos_hero"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Watch Videos
            </TrackedAnchor>
          </div>
        </PageHero>

        <VideoSection
          id="featured-videos"
          eyebrow="Featured"
          title="Featured Videos"
          lead="Full watch pages with takeaways, guides, and next steps."
          videos={featuredVideos}
          matte
        />

        <VideoSection
          id="buyer-videos"
          eyebrow="Buyers"
          title="Buyer Videos"
          lead="Payment, readiness, concessions, and move-up timing."
          videos={buyerVideos}
        />

        <VideoSection
          id="market-updates"
          eyebrow="Market"
          title="Market Updates"
          lead="Strategy and timing when headlines get loud."
          videos={marketVideos}
          matte
        />

        <VideoSection
          id="agent-strategy"
          eyebrow="Agents"
          title="Agent Strategy"
          lead="Financing context before the offer window."
          videos={agentVideos}
        />

        <SocialFollowSection
          eyebrow="Follow The Loan Playbook"
          title="Follow the channels."
          lead="TikTok, Instagram, Facebook, YouTube, and LinkedIn."
          showFlywheel={false}
        />

        <section
          className="section-flow relative"
          data-analytics-section="micro_conversion"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <MicroOptIn
              eyebrow="Stay in the loop"
              title="Get market updates."
              body="New videos, guide drops, and mortgage context—no rate spam."
              submitLabel="Get Updates"
              optInType="Market Updates"
              intent="newsletter"
              location="videos_market_updates"
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
