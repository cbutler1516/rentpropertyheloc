"use client";

import { trackVideoPlayed } from "@/lib/analytics/conversion-events";
import { cn } from "@/lib/cn";
import { SITE_VIDEOS } from "@/lib/videos";
import { useRef, useState } from "react";

type HeroExplainerVideoProps = {
  className?: string;
  label?: string;
};

export function HeroExplainerVideo({
  className,
  label = "60-second overview",
}: HeroExplainerVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);

  function handlePlay() {
    if (playedRef.current) return;
    playedRef.current = true;
    trackVideoPlayed({ source: "hero-explainer", video: SITE_VIDEOS.explainer });
  }

  return (
    <div className={cn("w-full max-w-lg mx-auto lg:max-w-none lg:mx-0", className)}>
      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-accent-bright sm:mb-3 sm:text-xs sm:tracking-[0.2em]">
        {label}
      </p>
      <div className="relative min-h-[0]">
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-accent/40 via-transparent to-accent-bright/30 opacity-70 md:rounded-[1.35rem] md:opacity-80"
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-2xl border border-white/12 bg-navy-900/40 shadow-[0_16px_48px_rgba(0,0,0,0.35)] md:rounded-[1.25rem] md:backdrop-blur-xl">
          <div
            className={cn(
              "relative aspect-[16/10] w-full max-h-[220px] bg-navy-900 sm:aspect-video sm:max-h-none",
              !ready && !failed && "animate-pulse bg-navy-800/80",
            )}
          >
            {failed ? (
              <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-2 px-4 text-center sm:min-h-0">
                <p className="text-sm text-white/80">Overview video</p>
                <p className="text-xs text-white/50">Add {SITE_VIDEOS.explainer} to public/videos.</p>
              </div>
            ) : (
              <video
                ref={ref}
                className="h-full w-full object-cover"
                src={SITE_VIDEOS.explainer}
                controls
                playsInline
                autoPlay
                muted
                preload="metadata"
                onLoadedData={() => setReady(true)}
                onPlay={handlePlay}
                onError={() => setFailed(true)}
              />
            )}
          </div>
        </div>
        <p className="mt-2.5 text-center text-[11px] leading-relaxed text-white/50 sm:mt-3 sm:text-left sm:text-xs">
          Tap controls for sound. Illustrative—not a commitment to lend.
        </p>
      </div>
    </div>
  );
}
