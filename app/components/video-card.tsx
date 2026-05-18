"use client";

import { trackEvent } from "../lib/analytics-events";
import type { VideoContent } from "../lib/content-sources";
import { TrackedLink } from "./tracked-link";

export function VideoCard({
  video,
  compact = false,
}: {
  video: VideoContent;
  compact?: boolean;
}) {
  const hasEmbed = video.embedUrl !== "Embed URL pending";
  const showEmbed = hasEmbed && !compact;
  const isPublished = video.status === "published";
  const description =
    compact && video.description.length > 132
      ? `${video.description.slice(0, 126).trim()}...`
      : video.description;
  const trackVideoClick = () => {
    trackEvent("video_card_interaction", {
      platform: video.platform,
      category: video.category,
      video_title: video.title,
      status: video.status ?? "planned",
    });
  };

  return (
    <article className="reveal-item card-lift group relative flex h-full flex-col overflow-hidden border border-zinc-900/80 bg-[#050505]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/0 via-transparent to-transparent opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100 group-hover:from-[#5b21b6]/[0.08]"
        aria-hidden
      />
      <div className="relative aspect-[4/5] border-b border-zinc-900/80 bg-[#080808] p-5 md:aspect-[9/11]">
        {showEmbed ? (
          <iframe
            src={video.embedUrl}
            title={`${video.title} TikTok embed`}
            className="absolute inset-0 h-full w-full border-0"
            allow="encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        ) : (
          <>
            <div
              className="absolute inset-0 opacity-35"
              style={{
                background:
                  "linear-gradient(135deg, rgba(124, 58, 237, 0.18), transparent 45%), repeating-linear-gradient(0deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px)",
              }}
              aria-hidden
            />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                <span>{video.category}</span>
                <span className="text-zinc-600">
                  {isPublished ? "Curated" : video.status === "todo" ? "TODO" : "Planned"}
                </span>
              </div>
              <div>
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10">
                  <span className="h-0 w-0 border-y-[7px] border-l-[11px] border-y-transparent border-l-[#c4b5fd]/80" />
                </div>
                <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
                  {video.thumbnailLabel}
                </p>
              </div>
            </div>
          </>
        )}
        {hasEmbed ? (
          <div className="pointer-events-none absolute top-5 left-5 rounded-full border border-black/40 bg-black/70 px-3 py-2 font-mono text-[9px] tracking-[0.2em] text-[#c4b5fd] uppercase backdrop-blur">
            {video.category}
          </div>
        ) : null}
      </div>
      <div className={`relative flex flex-1 flex-col ${compact ? "p-6" : "p-7"}`}>
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          {video.platform}
        </p>
        <h3
          className={`${compact ? "mt-4 text-xl" : "mt-5 text-2xl"} font-semibold tracking-[-0.02em] text-white`}
        >
          {video.title}
        </h3>
        <p
          className={`${compact ? "mt-4 text-sm" : "mt-5"} flex-1 leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400`}
        >
          {description}
        </p>
        <div className="mt-7 border-t border-zinc-900/80 pt-5">
          <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-700 uppercase">
            {hasEmbed
              ? compact
                ? "Curated card / embed on featured view"
                : "TikTok embed connected"
              : `Embed placeholder: ${video.embedUrl}`}
          </p>
          {!isPublished ? (
            <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-600">
              Video URL pending
            </span>
          ) : (
            <a
              href={video.ctaHref}
              target="_blank"
              rel="noreferrer"
              onClick={trackVideoClick}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] hover:text-white"
            >
              {video.ctaLabel}
              <span className="text-[#7c3aed]" aria-hidden>
                →
              </span>
            </a>
          )}
          {video.relatedArticleHref ? (
            <TrackedLink
              href={video.relatedArticleHref}
              location="video_card_related_article"
              label={video.relatedArticleLabel ?? "Read related guide"}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] hover:text-white"
            >
              {video.relatedArticleLabel ?? "Read related guide"}
              <span className="text-[#7c3aed]" aria-hidden>
                →
              </span>
            </TrackedLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
