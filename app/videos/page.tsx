import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { FooterSocialLinks } from "../components/footer-social-links";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import {
  PageHero,
  SectionHeader,
} from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { SocialFollowSection } from "../components/social-follow-section";
import { SocialPostCard } from "../components/social-post-card";
import {
  TrackedAnchor,
  TrackedButton,
  TrackedLink,
} from "../components/tracked-link";
import { VideoCard } from "../components/video-card";
import { videoSections, type VideoContent } from "../lib/content-sources";
import { socialPosts } from "../lib/social-posts";

export const metadata: Metadata = {
  title: "Videos | The Loan Playbook",
  description:
    "A social media hub for mortgage education videos, market updates, agent education, buyer education, and AI creative concepts from The Loan Playbook.",
};

const videoFilters = [
  "TikTok",
  "Shorts",
  "Market",
  "Agents",
  "Buyers",
];

const allVideos = videoSections.flatMap((section) => section.videos);

const featuredVideo = allVideos.find(
  (video) => video.title === "Most buyers focus on the wrong number.",
);
const curatedSocialPosts = socialPosts.slice(0, 5);

const categorizedVideoLanes: Array<{
  id: string;
  title: string;
  intro: string;
  videos: VideoContent[];
}> = [
  {
    id: "buyer-education",
    title: "Buyers",
    intro: "Payment, readiness, and cash-to-close.",
    videos: allVideos.filter((video) =>
      ["Buyer Education", "Buyer education", "Buyer readiness"].includes(
        video.category,
      ),
    ),
  },
  {
    id: "mortgage-strategy",
    title: "Mortgage Plays",
    intro: "Structure, buydowns, concessions, payment.",
    videos: allVideos.filter((video) =>
      [
        "Mortgage Strategy",
        "Short-form mortgage play",
        "Offer strategy",
        "Strategy explainer",
        "Featured play",
        "Long-form explainer",
      ].includes(video.category),
    ),
  },
  {
    id: "market-updates",
    title: "Market",
    intro: "Context without noise.",
    videos: allVideos.filter((video) =>
      ["Market Update", "Market update"].includes(video.category),
    ),
  },
  {
    id: "agent-strategy",
    title: "Agents",
    intro: "Cleaner buyer conversations.",
    videos: allVideos.filter((video) =>
      ["Agent Strategy", "Agent education"].includes(video.category),
    ),
  },
  {
    id: "creative-ai-marketing",
    title: "Creative / AI Marketing",
    intro: "Premium mortgage media tests.",
    videos: allVideos.filter((video) =>
      ["Creative / AI Marketing", "AI / Sora"].includes(video.category),
    ),
  },
].map((lane) => ({
  ...lane,
  videos: lane.videos.filter((video) => video.title !== featuredVideo?.title),
}));

function FeaturedVideoSection({ video }: { video?: VideoContent }) {
  if (!video) return null;

  const hasEmbed = video.embedUrl !== "Embed URL pending";
  const description =
    video.description.length > 150
      ? `${video.description.slice(0, 144).trim()}...`
      : video.description;

  return (
    <section
      id="featured-video"
      className="section-flow section-matte relative border-y border-zinc-900/40"
    >
      <div className="section-bridge-top" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.04] via-transparent to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.92fr_1.08fr] md:items-center md:gap-16 md:px-10">
        <RevealGroup
          className="relative overflow-hidden border border-zinc-900/80 bg-[#050505] p-4 md:p-6"
          stagger={100}
        >
          <div className="reveal-item relative aspect-[9/12] overflow-hidden bg-[#080808] md:aspect-[9/10]">
            {hasEmbed ? (
              <iframe
                src={video.embedUrl}
                title={`${video.title} TikTok embed`}
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
                  Featured video placeholder
                </p>
                <p className="relative font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
                  Embed URL pending
                </p>
              </div>
            )}
          </div>
        </RevealGroup>

        <RevealGroup className="flex flex-col justify-center" stagger={120}>
          <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
            {video.category}
          </p>
          <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white md:mt-6 md:text-6xl">
            {video.title}
          </h2>
          <p className="reveal-item mt-8 max-w-2xl text-lg leading-relaxed text-zinc-400 md:text-xl">
            {description}
          </p>
          <div className="reveal-item mt-10 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href={video.ctaHref}
              target="_blank"
              rel="noreferrer"
              location="videos_featured"
              label="Open on TikTok"
              className="btn-primary inline-flex h-14 w-fit items-center justify-center bg-white px-8 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Watch
            </TrackedAnchor>
            {video.relatedArticleHref ? (
              <TrackedLink
                href={video.relatedArticleHref}
                location="videos_featured"
                label={video.relatedArticleLabel ?? "Read full breakdown"}
                className="btn-ghost inline-flex h-14 w-fit items-center justify-center border border-zinc-800 px-8 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
              >
                Read
              </TrackedLink>
            ) : null}
          </div>
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}

function VideoLane({
  lane,
  index,
}: {
  lane: (typeof categorizedVideoLanes)[number];
  index: number;
}) {
  if (!lane.videos.length) return null;

  return (
    <section
      id={lane.id}
      className={`section-flow relative ${
        index % 2 === 1 ? "section-matte border-y border-zinc-900/40" : ""
      }`}
    >
      <div className="section-bridge-top" aria-hidden />
      <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
        <SectionHeader eyebrow="Video Lane" title={lane.title} lead={lane.intro} />
        <RevealGroup
          className="mt-8 grid gap-6 md:-mx-10 md:flex md:snap-x md:gap-8 md:overflow-x-auto md:px-10 md:pb-4"
          stagger={100}
        >
          {lane.videos.map((video) => (
            <div
              key={`${lane.id}-${video.platform}-${video.title}`}
              className="md:min-w-[21rem] md:snap-start lg:min-w-[23rem]"
            >
              <VideoCard video={video} compact />
            </div>
          ))}
        </RevealGroup>
      </div>
      <div className="section-bridge-bottom" aria-hidden />
    </section>
  );
}

export default function VideosPage() {
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
      <div
        className="pointer-events-none fixed bottom-[-12rem] left-[-10rem] z-[1] h-[30rem] w-[30rem] rounded-full bg-[#4c1d95]/10 blur-[110px]"
        aria-hidden
      />

      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Video + Social Hub"
          title="Mortgage media, curated."
          lead="Short clips, featured guides, and social channels in one place."
          focusLabel="Flow"
          focus="Watch -> read -> book."
          visual="basketball-agents"
          videoSrc="/videos/loan-playbook-videos-media-studio.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="#buyer-education"
              location="videos_hero"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Browse Lanes
            </TrackedAnchor>
          </div>
        </PageHero>

        <FeaturedVideoSection video={featuredVideo} />

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Curated Posts"
              title="One embed. Clean cards."
              lead="Fast today. Landing pages ready next."
            />
            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-2 md:gap-8 lg:grid-cols-5"
              stagger={90}
            >
              {curatedSocialPosts.map((post) => (
                <SocialPostCard key={post.slug} post={post} />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="relative mx-auto w-full max-w-7xl px-6 py-8 md:px-10 md:py-12">
          <div className="flex flex-wrap gap-3" aria-label="Video category filters">
            {videoFilters.map((filter) => (
              <TrackedButton
                key={filter}
                eventName="video_filter_click"
                payload={{ filter }}
                className="border border-zinc-900 bg-[#050505] px-4 py-3 font-mono text-[10px] tracking-[0.2em] text-zinc-600 uppercase transition-colors duration-[var(--duration-hover)] hover:border-[#7c3aed]/40 hover:text-zinc-300"
              >
                {filter}
              </TrackedButton>
            ))}
          </div>
        </section>

        {categorizedVideoLanes.map((lane, index) => (
          <VideoLane key={lane.id} lane={lane} index={index} />
        ))}

        <SocialFollowSection
          eyebrow="Social Destinations"
          title="Follow the channels."
          lead="Main profiles now. Post pages next."
          showFlywheel={false}
        />

        <ConversionCTA {...conversionCtas.newsletter} />
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
