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

const FEATURED_SLUGS = new Set([
  "buyer-preapproval-first-step",
  "buyer-power-seller-concessions-spring",
  "homeowner-buy-before-sell-program",
  "buyer-jumbo-loan-myths",
  "homeowner-refinance-break-even-roi",
  "market-strategy-over-rate-noise",
]);

function isFeatured(slug: string) {
  return FEATURED_SLUGS.has(slug);
}

function isInvestorVideo(video: HeroVideo) {
  return video.audience === "commercial";
}

function isAgentVideo(video: HeroVideo) {
  return video.heroGroup === "agent" || video.slug.startsWith("agent-");
}

function isMarketVideo(video: HeroVideo) {
  return video.heroGroup === "market";
}

function isHomeownerVideo(video: HeroVideo) {
  return (
    video.audience === "homeowner" ||
    video.slug.startsWith("homeowner-")
  );
}

function isBuyerVideo(video: HeroVideo) {
  return video.audience === "buyer" && !video.slug.startsWith("homeowner-");
}

function videosForSection(
  predicate: (video: HeroVideo) => boolean,
  excludeFeatured = true,
) {
  return publishedVideos.filter((video) => {
    if (excludeFeatured && isFeatured(video.slug)) return false;
    return predicate(video);
  });
}

function VideoSection({
  id,
  eyebrow,
  title,
  lead,
  videos,
  matte = false,
  light = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  lead: string;
  videos: HeroVideo[];
  matte?: boolean;
  light?: boolean;
}) {
  if (videos.length === 0) return null;

  const sectionClass = light
    ? "section-light border-y border-zinc-200/80"
    : matte
      ? "section-matte border-y border-zinc-900/40"
      : "";

  return (
    <section
      id={id}
      data-analytics-section={`videos_${id}`}
      className={`section-flow relative ${sectionClass}`}
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className={light ? "[&_h2]:text-zinc-900 [&_p]:text-zinc-600" : ""}>
          <SectionHeader eyebrow={eyebrow} title={title} lead={lead} />
        </div>
        <RevealGroup
          className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          stagger={80}
        >
          {videos.map((video, index) => (
            <PublishedVideoCard
              key={video.slug}
              video={video}
              subtleAutoplay={id === "featured-videos" && index === 0}
            />
          ))}
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}

export default function VideosPage() {
  const featuredVideos = publishedVideos.filter((v) => isFeatured(v.slug));
  const investorVideos = videosForSection(isInvestorVideo);
  const buyerVideos = videosForSection(isBuyerVideo);
  const homeownerVideos = videosForSection(isHomeownerVideo);
  const marketVideos = videosForSection(isMarketVideo);
  const agentVideos = videosForSection(isAgentVideo);

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
          lead="Curated clips with full watch pages, takeaways, and next steps."
          videos={featuredVideos}
          matte
          light
        />

        <VideoSection
          id="investor-strategy"
          eyebrow="Investors"
          title="Investor Strategy"
          lead="DSCR, bridge, and structure-first context for operators."
          videos={investorVideos}
        />

        <VideoSection
          id="buyer-videos"
          eyebrow="Buyers"
          title="Buyers"
          lead="Payment, readiness, concessions, and move-up timing."
          videos={buyerVideos}
        />

        <VideoSection
          id="homeowner-videos"
          eyebrow="Homeowners"
          title="Homeowners"
          lead="Refinance timing, equity paths, and annual review context."
          videos={homeownerVideos}
          light
        />

        <VideoSection
          id="market-updates"
          eyebrow="Market"
          title="Market Updates"
          lead="Strategy and macro context when headlines get loud."
          videos={marketVideos}
        />

        <VideoSection
          id="agent-strategy"
          eyebrow="Agents"
          title="Agent Strategy"
          lead="Financing talking points before the offer window."
          videos={agentVideos}
          matte
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
