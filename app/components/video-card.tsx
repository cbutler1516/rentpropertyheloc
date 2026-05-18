"use client";

import { trackEvent } from "../lib/analytics-events";
import type { VideoContent } from "../lib/content-sources";
import { MediaThumbnail } from "./media-thumbnail";
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
    <article className="reveal-item card-lift group relative flex h-full flex-col overflow-hidden border border-zinc-900/80 bg-[#050505] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/0 via-transparent to-transparent opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100 group-hover:from-[#5b21b6]/[0.08]"
        aria-hidden
      />
      <div className="relative aspect-[4/5] border-b border-zinc-900/80 bg-[#080808] md:aspect-[9/11]">
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
          <MediaThumbnail
            title={video.title}
            category={video.category}
            platform={video.platform}
            thumbnailLabel={isPublished ? "Curated" : video.thumbnailLabel}
            thumbnailSrc={video.thumbnailSrc}
            thumbnailFocalPoint={video.thumbnailFocalPoint}
            runtime={video.runtime}
            className="h-full"
          />
        )}
        {hasEmbed ? (
          <div className="pointer-events-none absolute top-5 left-5 rounded-full border border-black/40 bg-black/70 px-3 py-2 font-mono text-[9px] tracking-[0.2em] text-[#c4b5fd] uppercase backdrop-blur">
            {video.category}
          </div>
        ) : null}
      </div>
      <div className={`relative flex flex-1 flex-col ${compact ? "p-5" : "p-7"}`}>
        <p className="font-mono text-[9px] tracking-[0.24em] text-[#7c3aed] uppercase">
          {video.platform}
        </p>
        <h3
          className={`${compact ? "mt-3 text-lg" : "mt-4 text-2xl"} font-semibold tracking-[-0.03em] text-white`}
        >
          {video.title}
        </h3>
        {!compact ? (
          <p className="mt-4 flex-1 leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
            {description}
          </p>
        ) : null}
        <div className="mt-6 border-t border-zinc-900/80 pt-4">
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
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] hover:text-white"
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
              className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-[var(--duration-hover)] hover:text-white"
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
