import { RevealGroup } from "@/app/components/reveal-group";
import { TrackedLink } from "@/app/components/tracked-link";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MoodBadge } from "./market-ui";

type BriefHeroProps = {
  update: DailyMarketUpdate;
};

function formatBriefDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "America/Los_Angeles",
  }).format(new Date(iso));
}

export function BriefHero({ update }: BriefHeroProps) {
  return (
    <header className="brief-hero" data-analytics-section="market_brief_hero">
      <div className="brief-hero-inner mx-auto w-full max-w-7xl px-6 pb-12 pt-28 md:px-10 md:pb-16 md:pt-32">
        <RevealGroup stagger={90}>
          <p className="reveal-item market-eyebrow">Daily agent brief</p>
          <h1 className="reveal-item brief-hero-title">
            Today&apos;s Market Briefing for Real Estate Agents
          </h1>
          <div className="reveal-item mt-4 flex flex-wrap items-center gap-3">
            <span className="market-badge">{formatBriefDate(update.publishedAt)}</span>
            <MoodBadge mood={update.marketMood} />
          </div>
          <p className="reveal-item brief-hero-takeaway">{update.agentTakeaway}</p>
        </RevealGroup>

        <RevealGroup className="mt-10" stagger={80}>
          <div className="reveal-item brief-hero-video overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-950 shadow-sm">
            <video
              className="aspect-video w-full object-cover"
              controls
              playsInline
              preload="metadata"
              poster={
                update.videoSlug
                  ? `/images/video-thumbnails/${update.videoSlug}.jpg`
                  : undefined
              }
            >
              <source src={update.videoUrl} type="video/mp4" />
            </video>
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 bg-zinc-950 px-5 py-4">
              <div>
                <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
                  Featured video
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-200">
                  {update.videoTitle}
                </p>
              </div>
              <TrackedLink
                href={`/videos/${update.videoSlug}`}
                location="market_brief_video"
                label={update.videoTitle}
                className="text-sm font-medium text-[#c4b5fd] hover:text-white"
              >
                Watch full →
              </TrackedLink>
            </div>
          </div>
        </RevealGroup>
      </div>
    </header>
  );
}
