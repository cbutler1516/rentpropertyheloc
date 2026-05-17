import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import {
  ConversionCTA,
  conversionCtas,
} from "../components/conversion-cta";
import {
  FeatureCard,
  PageHero,
  SectionHeader,
  StatRow,
} from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { SocialLinkGrid } from "../components/social-link-grid";
import {
  TrackedAnchor,
  TrackedButton,
  TrackedLink,
} from "../components/tracked-link";
import { VideoCard } from "../components/video-card";
import { VideoEmbedCard } from "../components/video-embed-card";
import { videoSections } from "../lib/content-sources";
import { featuredVideoEmbedGroups } from "../lib/video-embeds";

export const metadata: Metadata = {
  title: "Videos | The Loan Playbook",
  description:
    "A social media hub for mortgage education videos, market updates, agent education, buyer education, and AI creative concepts from The Loan Playbook.",
};

const videoFilters = [
  "All",
  "TikTok",
  "Reels",
  "Shorts",
  "Explainers",
  "Market",
  "Agents",
  "Buyers",
  "AI / Sora",
];

const featuredVideo = videoSections
  .flatMap((section) => section.videos)
  .find((video) => video.title === "What buyers misunderstand about pre-approval");

const landingPageSystem = [
  {
    label: "Article",
    title: "Turn the topic into search content",
    body: "Every video concept can become a Learn article, FAQ cluster, or landing page that supports buyer education and organic discovery.",
  },
  {
    label: "Shorts",
    title: "Cut the lesson into social formats",
    body: "A single mortgage strategy can become a TikTok, Reel, Short, carousel, newsletter blurb, and agent talking point.",
  },
  {
    label: "CTA",
    title: "Route viewers into compliant next steps",
    body: "Content should guide people toward education, strategy calls, or partner conversations without implying rates, approval, or commitments.",
  },
];

function VideoGrid({
  videos,
}: {
  videos: (typeof videoSections)[number]["videos"];
}) {
  return (
    <RevealGroup
      className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
      stagger={130}
    >
      {videos.map((video) => (
        <VideoCard key={`${video.platform}-${video.title}`} video={video} />
      ))}
    </RevealGroup>
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
          title="Watch the playbook in motion."
          lead="A premium social media hub for short-form mortgage plays, educational explainers, market updates, agent support, buyer education, and future long-form strategy videos."
          focusLabel="Content System"
          focus="The video hub turns mortgage education into repeatable, compliance-aware formats for TikTok, Instagram Reels, Facebook Reels, YouTube Shorts, long-form explainers, and future AI/Sora creative concepts."
          visual="basketball-agents"
          videoSrc="/videos/loan-playbook-videos-media-studio.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="#tiktok"
              location="videos_hero"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Browse Video Lanes
            </TrackedAnchor>
            <TrackedLink
              href="/learn"
              location="videos_hero"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Explore Learn Hub
            </TrackedLink>
          </div>
          <StatRow
            className="reveal-item mt-20"
            stats={[
              { value: "6", label: "Destinations" },
              { value: "9", label: "Content lanes" },
              { value: "0", label: "Live APIs yet" },
            ]}
          />
        </PageHero>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.85fr_1.15fr] md:px-10">
            <div>
              <SectionHeader
                eyebrow="Featured Module"
                title="A hero slot for the next flagship video."
                lead="Use this module for the most important current explainer, featured campaign, or launch video before the deeper category lanes."
              />
              <div
                className="mt-10 flex flex-wrap gap-3"
                aria-label="Video category filters"
              >
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
              <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-zinc-700 uppercase">
                Filter UI placeholder only. No client-side filtering yet.
              </p>
            </div>
            {featuredVideo ? <VideoCard video={featuredVideo} /> : null}
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {featuredVideoEmbedGroups.map((group, index) => (
          <section
            key={group.eyebrow}
            className={`section-flow relative ${
              index % 2 === 1 ? "section-matte border-y border-zinc-900/40" : ""
            }`}
          >
            <div className="section-bridge-top" aria-hidden />
            <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
              <SectionHeader
                eyebrow={group.eyebrow}
                title={group.title}
                lead={group.lead}
              />
              <RevealGroup
                className="mt-16 grid gap-7 md:mt-20 md:grid-cols-2 lg:grid-cols-3"
                stagger={120}
              >
                {group.videos.map((video) => (
                  <VideoEmbedCard
                    key={`${group.eyebrow}-${video.platform}-${video.title}`}
                    video={video}
                  />
                ))}
              </RevealGroup>
            </div>
            <div className="section-bridge-bottom" aria-hidden />
          </section>
        ))}

        {videoSections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className={`section-flow relative ${
              index % 2 === 0
                ? "section-matte border-y border-zinc-900/40"
                : ""
            }`}
          >
            <div className="section-bridge-top" aria-hidden />
            {index % 2 === 0 ? (
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
                aria-hidden
              />
            ) : null}
            <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
              <SectionHeader
                eyebrow={section.eyebrow}
                title={section.title}
                lead={section.lead}
              />
              <VideoGrid videos={section.videos} />
            </div>
            <div className="section-bridge-bottom" aria-hidden />
          </section>
        ))}

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Social Destinations"
              title="Every publishing lane has a place in the content system."
              lead="Placeholder URLs are marked until exact handles are connected. Each destination is treated as educational media, not a rate quote or commitment to lend."
            />
            <SocialLinkGrid />
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Video To Landing Page"
              title="Turn every useful video into a deeper education asset."
              lead="The video hub is not just a gallery. It is a production map for SEO articles, social clips, landing pages, agent resources, and newsletter content."
            />
            <RevealGroup
              className="mt-16 grid gap-7 md:mt-20 md:grid-cols-3 md:gap-8"
              stagger={120}
            >
              {landingPageSystem.map((item) => (
                <FeatureCard
                  key={item.label}
                  label={item.label}
                  title={item.title}
                  body={item.body}
                  className="card-lift border border-zinc-900/80"
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <ConversionCTA {...conversionCtas.newsletter} />
      </main>

      <footer className="relative z-10 border-t border-zinc-900/60 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase md:flex-row md:items-center md:justify-between md:px-10">
          <FooterBrand />
          <span>© {new Date().getFullYear()} The Loan Playbook</span>
        </div>
        <ComplianceFooter />
      </footer>
    </div>
  );
}
