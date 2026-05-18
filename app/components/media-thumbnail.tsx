type MediaThumbnailProps = {
  title: string;
  category: string;
  platform?: string;
  thumbnailLabel?: string;
  thumbnailSrc?: string;
  thumbnailFocalPoint?: string;
  runtime?: string;
  className?: string;
};

function getCategoryTreatment(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("buyer")) {
    return {
      accent: "#A78BFA",
      text: "text-[#ddd6fe]",
      background:
        "radial-gradient(circle at 72% 18%, rgba(167, 139, 250, 0.22), transparent 32%), linear-gradient(145deg, rgba(24, 24, 27, 0.94), rgba(5, 5, 5, 0.92) 58%, rgba(59, 130, 246, 0.16)), repeating-linear-gradient(0deg, rgba(255,255,255,0.032), rgba(255,255,255,0.032) 1px, transparent 1px, transparent 24px)",
    };
  }

  if (normalized.includes("market")) {
    return {
      accent: "#C4B5FD",
      text: "text-[#c4b5fd]",
      background:
        "linear-gradient(135deg, rgba(124, 58, 237, 0.22), transparent 34%), linear-gradient(90deg, rgba(39, 39, 42, 0.92), rgba(5, 5, 5, 0.96)), repeating-linear-gradient(90deg, rgba(196,181,253,0.08), rgba(196,181,253,0.08) 1px, transparent 1px, transparent 34px)",
    };
  }

  if (normalized.includes("agent")) {
    return {
      accent: "#8B5CF6",
      text: "text-[#c4b5fd]",
      background:
        "radial-gradient(circle at 18% 18%, rgba(139, 92, 246, 0.2), transparent 34%), linear-gradient(145deg, rgba(15, 15, 18, 0.98), rgba(5, 5, 5, 0.94) 58%, rgba(39, 39, 42, 0.5)), repeating-linear-gradient(135deg, rgba(255,255,255,0.035), rgba(255,255,255,0.035) 1px, transparent 1px, transparent 28px)",
    };
  }

  if (normalized.includes("creative") || normalized.includes("ai")) {
    return {
      accent: "#7C3AED",
      text: "text-[#ddd6fe]",
      background:
        "radial-gradient(circle at 24% 22%, rgba(124, 58, 237, 0.32), transparent 30%), radial-gradient(circle at 78% 68%, rgba(99, 102, 241, 0.18), transparent 34%), linear-gradient(145deg, rgba(5,5,5,0.98), rgba(24,24,27,0.92))",
    };
  }

  if (normalized.includes("commercial")) {
    return {
      accent: "#A78BFA",
      text: "text-[#c4b5fd]",
      background:
        "linear-gradient(145deg, rgba(24,24,27,0.96), rgba(5,5,5,0.94)), repeating-linear-gradient(90deg, rgba(255,255,255,0.04), rgba(255,255,255,0.04) 1px, transparent 1px, transparent 42px), repeating-linear-gradient(0deg, rgba(167,139,250,0.05), rgba(167,139,250,0.05) 1px, transparent 1px, transparent 38px)",
    };
  }

  return {
    accent: "#7C3AED",
    text: "text-[#c4b5fd]",
    background:
      "radial-gradient(circle at 25% 18%, rgba(124, 58, 237, 0.26), transparent 34%), linear-gradient(145deg, rgba(24, 24, 27, 0.95), rgba(5, 5, 5, 0.92) 58%, rgba(76, 29, 149, 0.26)), repeating-linear-gradient(90deg, rgba(255,255,255,0.035), rgba(255,255,255,0.035) 1px, transparent 1px, transparent 22px)",
  };
}

export function MediaThumbnail({
  title,
  category,
  platform,
  thumbnailLabel,
  thumbnailSrc,
  thumbnailFocalPoint = "center",
  runtime,
  className = "",
}: MediaThumbnailProps) {
  const treatment = getCategoryTreatment(category);

  return (
    <div
      className={`relative overflow-hidden bg-[#080808] ${className}`}
      aria-label={`${title} thumbnail`}
    >
      {thumbnailSrc ? (
        <div
          className="absolute inset-0 bg-cover opacity-90 transition duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:scale-[1.03] group-hover:opacity-100"
          style={{
            backgroundImage: `url(${thumbnailSrc}), ${treatment.background}`,
            backgroundPosition: thumbnailFocalPoint,
          }}
          aria-hidden
        />
      ) : (
        <div
          className="absolute inset-0 transition duration-[var(--duration-hover)] group-hover:scale-[1.02]"
          style={{
            background: treatment.background,
          }}
          aria-hidden
        />
      )}
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background: `linear-gradient(135deg, ${treatment.accent}24, transparent 38%)`,
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/5"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#5b21b6]/20 to-transparent opacity-70"
        aria-hidden
      />
      <div className="relative flex h-full flex-col justify-between p-4 md:p-5">
        <div className="flex items-center justify-between gap-3">
          <span
            className={`max-w-[70%] truncate rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[8px] tracking-[0.18em] uppercase backdrop-blur md:text-[9px] ${treatment.text}`}
          >
            {category}
          </span>
          {runtime ?? platform ? (
            <span className="shrink-0 rounded-full border border-white/10 bg-black/45 px-3 py-1.5 font-mono text-[8px] tracking-[0.16em] text-zinc-400 uppercase backdrop-blur md:text-[9px]">
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
          <h3 className="mt-3 max-w-xs text-[1.35rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-2xl">
            {title}
          </h3>
        </div>
      </div>
    </div>
  );
}
