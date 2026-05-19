import type { HeroVideo } from "../lib/hero-videos";
import { withVideoThumbnail } from "../lib/video-thumbnails";
import { TrackedAnchor, TrackedLink } from "./tracked-link";
import { VideoCardThumbnail } from "./video-card-thumbnail";

function getGuideLink(video: HeroVideo) {
  if (video.relatedLearnArticle) {
    return video.relatedLearnArticle;
  }
  const guide = video.relatedGuideHrefs?.[0];
  if (guide) return guide;
  return null;
}

export function PublishedVideoCard({ video }: { video: HeroVideo }) {
  const post = withVideoThumbnail(video);
  const guide = getGuideLink(post);
  const showTikTok = post.platform === "TikTok" && Boolean(post.cta.href);

  return (
    <article className="reveal-item card-lift group relative flex h-full flex-col overflow-hidden border border-zinc-900/80 bg-[#050505] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <TrackedLink
        href={`/videos/${post.slug}`}
        location="published_video_card"
        label={post.title}
        eventType="thumbnail"
        className="relative block"
      >
        <VideoCardThumbnail
          video={post}
          className="aspect-[4/5] border-b border-zinc-900/80"
        />
      </TrackedLink>
      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <p className="font-mono text-[9px] tracking-[0.24em] text-[#7c3aed] uppercase">
          {post.topic}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
          {post.shortSummary}
        </p>
        <div className="mt-6 flex flex-col gap-2 border-t border-zinc-900/80 pt-4">
          <TrackedLink
            href={`/videos/${post.slug}`}
            location="published_video_card"
            label="Watch Video"
            eventType="thumbnail"
            className="inline-flex items-center gap-2 text-sm font-medium text-white"
          >
            Watch Video
            <span className="text-[#7c3aed]" aria-hidden>
              →
            </span>
          </TrackedLink>
          {showTikTok ? (
            <TrackedAnchor
              href={post.cta.href}
              target="_blank"
              rel="noreferrer"
              location="published_video_card"
              label="Watch on TikTok"
              eventType="video"
              platform={post.platform}
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-[var(--duration-hover)] hover:text-white"
            >
              Watch on TikTok
              <span className="text-[#7c3aed]" aria-hidden>
                →
              </span>
            </TrackedAnchor>
          ) : null}
          {guide ? (
            <TrackedLink
              href={guide.href}
              location="published_video_card"
              label={guide.label}
              eventType="related_guide"
              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors duration-[var(--duration-hover)] hover:text-white"
            >
              Read Guide
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
