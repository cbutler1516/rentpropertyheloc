"use client";

import { trackVideoPlayed } from "@/lib/analytics/conversion-events";
import { cn } from "@/lib/cn";
import { SITE_VIDEOS } from "@/lib/videos";
import { useRef, useState } from "react";

type HeroExplainerVideoProps = {
  className?: string;
  label?: string;
  variant?: "dark" | "light";
};

export function HeroExplainerVideo({
  className,
  label = "60-second overview",
  variant = "dark",
}: HeroExplainerVideoProps) {
  const light = variant === "light";
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
      <p
        className={cn(
          "mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] sm:mb-3 sm:text-xs sm:tracking-[0.2em]",
          light ? "text-teal-700" : "text-accent-bright",
        )}
      >
        {label}
      </p>
      <div className="relative min-h-[0]">
        <div
          className={cn(
            "pointer-events-none absolute -inset-px rounded-2xl md:rounded-[1.35rem]",
            light
              ? "bg-gradient-to-br from-teal-200/50 via-transparent to-cyan-200/40 opacity-90"
              : "bg-gradient-to-br from-accent/40 via-transparent to-accent-bright/30 opacity-70 md:opacity-80",
          )}
          aria-hidden
        />
        <div
          className={cn(
            "relative overflow-hidden rounded-2xl md:rounded-[1.25rem]",
            light
              ? "border border-slate-200 bg-white shadow-[0_12px_40px_rgba(15,23,42,0.08)]"
              : "border border-white/12 bg-navy-900/40 shadow-[0_16px_48px_rgba(0,0,0,0.35)] md:backdrop-blur-xl",
          )}
        >
          <div
            className={cn(
              "relative aspect-[16/10] w-full max-h-[220px] sm:aspect-video sm:max-h-none",
              light ? "bg-slate-100" : "bg-navy-900 max-h-[220px]",
              !ready && !failed && (light ? "animate-pulse bg-slate-200/80" : "animate-pulse bg-navy-800/80"),
            )}
          >
            {failed ? (
              <div className="flex h-full min-h-[180px] flex-col items-center justify-center gap-2 px-4 text-center sm:min-h-0">
                <p className={cn("text-sm", light ? "text-slate-700" : "text-white/80")}>
                  Overview video
                </p>
                <p className={cn("text-xs", light ? "text-slate-500" : "text-white/50")}>
                  Add {SITE_VIDEOS.explainer} to public/videos.
                </p>
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
        <p
          className={cn(
            "mt-2.5 text-center text-[11px] leading-relaxed sm:mt-3 sm:text-xs",
            light ? "text-slate-500 sm:text-center" : "text-white/50 sm:text-left",
          )}
        >
          Tap controls for sound. Illustrative—not a commitment to lend.
        </p>
      </div>
    </div>
  );
}
