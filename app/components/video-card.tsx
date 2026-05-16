import type { VideoContent } from "../lib/content-sources";

export function VideoCard({ video }: { video: VideoContent }) {
  return (
    <article className="reveal-item card-lift group relative flex h-full flex-col overflow-hidden border border-zinc-900/80 bg-[#050505]">
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/0 via-transparent to-transparent opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100 group-hover:from-[#5b21b6]/[0.08]"
        aria-hidden
      />
      <div className="relative aspect-[9/14] border-b border-zinc-900/80 bg-[#080808] p-5">
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
              {video.status === "todo" ? "TODO" : "Planned"}
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
      </div>
      <div className="relative flex flex-1 flex-col p-7">
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          {video.platform}
        </p>
        <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-white">
          {video.title}
        </h3>
        <p className="mt-5 flex-1 leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400">
          {video.description}
        </p>
        <div className="mt-7 border-t border-zinc-900/80 pt-5">
          <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-700 uppercase">
            Embed placeholder: {video.embedUrl}
          </p>
          <a
            href={video.ctaHref}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] hover:text-white"
          >
            {video.ctaLabel}
            <span className="text-[#7c3aed]" aria-hidden>
              →
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
