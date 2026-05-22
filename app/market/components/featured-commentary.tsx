import { RevealGroup } from "@/app/components/reveal-group";
import { TrackedLink } from "@/app/components/tracked-link";
import type { DailyMarketUpdate } from "@/app/lib/market-center";
import { MarketSection } from "./market-section";

type FeaturedCommentaryProps = {
  update: DailyMarketUpdate;
};

export function FeaturedCommentary({ update }: FeaturedCommentaryProps) {
  return (
    <MarketSection
      id="featured-commentary"
      eyebrow="Featured daily commentary"
      title={update.videoTitle}
      lead={update.rateSummary}
      variant="white"
    >
      <RevealGroup className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]" stagger={80}>
        <div className="reveal-item market-video-panel overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-950 shadow-sm">
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
          <div className="border-t border-zinc-800/80 bg-zinc-950 px-5 py-4 md:px-6">
            <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
              {update.title}
            </p>
            <TrackedLink
              href={`/videos/${update.videoSlug}`}
              location="market_featured_video"
              label={update.videoTitle}
              className="mt-2 inline-flex text-sm font-medium text-zinc-200 hover:text-white"
            >
              Full video page →
            </TrackedLink>
          </div>
        </div>
        <div className="reveal-item flex flex-col gap-4">
          <div className="market-summary-card">
            <p className="market-summary-label">Rate summary</p>
            <p className="market-summary-body">{update.rateSummary}</p>
          </div>
          <div className="market-summary-card">
            <p className="market-summary-label">Treasury summary</p>
            <p className="market-summary-body">{update.treasurySummary}</p>
          </div>
          <div className="market-summary-card">
            <p className="market-summary-label">Local market</p>
            <p className="market-summary-body">{update.localMarketSummary}</p>
          </div>
        </div>
      </RevealGroup>
    </MarketSection>
  );
}
