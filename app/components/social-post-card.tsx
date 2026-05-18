import type { SocialPost } from "../lib/social-posts";
import { MediaThumbnail } from "./media-thumbnail";
import { TrackedAnchor, TrackedLink } from "./tracked-link";

export function SocialPostCard({ post }: { post: SocialPost }) {
  return (
    <article className="reveal-item card-lift group relative flex h-full flex-col overflow-hidden border border-zinc-900/80 bg-[#050505] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">
      <MediaThumbnail
        title={post.title}
        category={post.category}
        platform={post.platform}
        thumbnailLabel={post.thumbnail}
        thumbnailSrc={post.thumbnailSrc}
        thumbnailFocalPoint={post.thumbnailFocalPoint}
        runtime={post.runtime}
        className="aspect-[4/5] border-b border-zinc-900/80"
      />
      <div className="relative flex flex-1 flex-col p-5 md:p-6">
        <p className="font-mono text-[9px] tracking-[0.24em] text-[#7c3aed] uppercase">
          {post.topic}
        </p>
        <p className="mt-4 flex-1 text-sm leading-relaxed text-zinc-600 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
          {post.shortSummary}
        </p>
        <div className="mt-6 grid gap-3 border-t border-zinc-900/80 pt-4">
          <TrackedLink
            href={`/social/${post.slug}`}
            location="social_post_card"
            label="View post page"
            className="inline-flex items-center gap-2 text-sm font-medium text-white"
          >
            View
            <span className="text-[#7c3aed]" aria-hidden>
              →
            </span>
          </TrackedLink>
          <TrackedAnchor
            href={post.postUrl}
            target="_blank"
            rel="noreferrer"
            location="social_post_card"
            label={post.cta.label}
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 transition-colors duration-[var(--duration-hover)] hover:text-white"
          >
            {post.cta.label}
            <span className="text-[#7c3aed]" aria-hidden>
              →
            </span>
          </TrackedAnchor>
        </div>
      </div>
    </article>
  );
}
