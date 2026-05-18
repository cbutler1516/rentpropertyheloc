type MediaThumbnailProps = {
  title: string;
  category: string;
  platform?: string;
  thumbnailLabel?: string;
  thumbnailSrc?: string;
  runtime?: string;
  className?: string;
};

export function MediaThumbnail({
  title,
  category,
  platform,
  thumbnailLabel,
  thumbnailSrc,
  runtime,
  className = "",
}: MediaThumbnailProps) {
  return (
    <div
      className={`relative overflow-hidden bg-[#080808] ${className}`}
      aria-label={`${title} thumbnail`}
    >
      {thumbnailSrc ? (
        <div
          className="absolute inset-0 bg-cover bg-center opacity-90 transition duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:scale-[1.03] group-hover:opacity-100"
          style={{ backgroundImage: `url(${thumbnailSrc})` }}
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-0 transition duration-[var(--duration-hover)] group-hover:scale-[1.02]"
          style={{
            background:
              "radial-gradient(circle at 25% 18%, rgba(124, 58, 237, 0.26), transparent 34%), linear-gradient(145deg, rgba(24, 24, 27, 0.95), rgba(5, 5, 5, 0.92) 58%, rgba(76, 29, 149, 0.26)), repeating-linear-gradient(90deg, rgba(255,255,255,0.035), rgba(255,255,255,0.035) 1px, transparent 1px, transparent 22px)",
          }}
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-black/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#5b21b6]/20 to-transparent opacity-70"
        aria-hidden
      />
      <div className="relative flex h-full flex-col justify-between p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[9px] tracking-[0.2em] text-[#c4b5fd] uppercase backdrop-blur">
            {category}
          </span>
          {runtime ?? platform ? (
            <span className="rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[9px] tracking-[0.18em] text-zinc-400 uppercase backdrop-blur">
              {runtime ?? platform}
            </span>
          ) : null}
        </div>
        <div>
          {thumbnailLabel ? (
            <p className="font-mono text-[9px] tracking-[0.22em] text-zinc-500 uppercase">
              {thumbnailLabel}
            </p>
          ) : null}
          <h3 className="mt-3 max-w-xs text-2xl font-semibold leading-tight tracking-[-0.04em] text-white">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
