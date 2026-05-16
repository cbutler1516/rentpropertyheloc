import type { Metadata } from "next";
import Link from "next/link";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import {
  CTASection,
  PageHero,
  SectionHeader,
  StatRow,
} from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { SocialLinkGrid } from "../components/social-link-grid";
import { VideoCard } from "../components/video-card";
import { videoSections } from "../lib/content-sources";

export const metadata: Metadata = {
  title: "Videos | The Loan Playbook",
  description:
    "A social media hub for mortgage education videos, market updates, agent education, buyer education, and AI creative concepts from The Loan Playbook.",
};

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
        className="playbook-grid playbook-grid-animated pointer-events-none fixed inset-0 z-0 opacity-30"
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
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <a
              href="#tiktok"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Browse Video Lanes
            </a>
            <Link
              href="/learn"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Explore Learn Hub
            </Link>
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

        <CTASection
          eyebrow="Turn Content Into Strategy"
          title="Build a media system around the questions buyers actually ask."
          body="Use the video hub to organize short-form plays, social content, explainers, market updates, agent education, buyer education, and creative experiments into one premium education engine."
          actions={[
            {
              href: "/learn",
              label: "Turn Content Into Strategy",
              variant: "primary",
            },
            { href: "/agents", label: "Agent Platform" },
          ]}
        />
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
