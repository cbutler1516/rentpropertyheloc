import type { SocialPost } from "../lib/social-posts";
import { TrackedAnchor, TrackedLink } from "./tracked-link";

export function SocialPostCard({ post }: { post: SocialPost }) {
  return (
    <article className="reveal-item card-lift group relative flex h-full flex-col overflow-hidden border border-zinc-900/80 bg-[#050505]">
      <div className="relative aspect-[4/5] border-b border-zinc-900/80 bg-[#080808] p-6">
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background:
              "linear-gradient(135deg, rgba(124, 58, 237, 0.2), transparent 45%), repeating-linear-gradient(0deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 1px, transparent 1px, transparent 18px)",
          }}
          aria-hidden
        />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex items-center justify-between gap-4 font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
            <span>{post.platform}</span>
            <span className="text-zinc-600">{post.thumbnail}</span>
          </div>
          <div>
            <p className="font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
              {post.category}
            </p>
            <h3 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
              {post.title}
            </h3>
          </div>
        </div>
      </div>
      <div className="relative flex flex-1 flex-col p-7">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          {post.topic}
        </p>
        <p className="mt-5 flex-1 text-sm leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
          {post.shortSummary}
        </p>
        <div className="mt-7 grid gap-3 border-t border-zinc-900/80 pt-5">
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
