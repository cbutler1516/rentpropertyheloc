"use client";

type VideoPosterThumbnailProps = {
  videoSrc: string;
  title: string;
  category: string;
  platform?: string;
  className?: string;
};

export function VideoPosterThumbnail({
  videoSrc,
  title,
  category,
  platform,
  className = "",
}: VideoPosterThumbnailProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#080808] ${className}`}
      aria-label={`${title} preview`}
    >
      <video
        src={videoSrc}
        muted
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
        onLoadedMetadata={(event) => {
          const video = event.currentTarget;
          const seekTo = Number.isFinite(video.duration)
            ? Math.min(1, video.duration * 0.08)
            : 0.5;
          try {
            video.currentTime = seekTo;
          } catch {
            /* seek may fail before data loads */
          }
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/10"
        aria-hidden
      />
      <div className="relative flex h-full min-h-[12rem] flex-col justify-between p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="max-w-[70%] truncate rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[8px] tracking-[0.18em] text-[#c4b5fd] uppercase backdrop-blur md:text-[9px]">
            {category}
          </span>
          {platform ? (
            <span className="shrink-0 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[8px] tracking-[0.16em] text-zinc-400 uppercase backdrop-blur md:text-[9px]">
              {platform}
            </span>
          ) : null}
        </div>
        <h3 className="max-w-xs text-[1.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-2xl">
          {title}
        </h3>
      </div>
    </div>
  );
}
