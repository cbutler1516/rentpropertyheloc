"use client";

import { cn } from "@/lib/cn";
import { useRef, useState } from "react";

type VideoPlayerProps = {
  src: string;
  poster?: string;
  className?: string;
  label?: string;
};

export function VideoPlayer({ src, poster, className, label = "Video" }: VideoPlayerProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-accent/25 bg-navy-900/80 shadow-[0_0_60px_rgba(34,211,238,0.15)]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-accent/40 via-transparent to-accent-bright/30 opacity-60"
        aria-hidden
      />
      <div className="relative aspect-video w-full overflow-hidden rounded-[calc(1.5rem-1px)] bg-gradient-to-br from-navy-800 to-navy-950">
        {failed ? (
          <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
            <p className="text-sm font-medium text-white/80">{label}</p>
            <p className="text-xs text-white/50">
              Add <span className="font-mono text-accent/90">{src}</span> to enable playback.
            </p>
          </div>
        ) : (
          <video
            ref={ref}
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
            poster={poster}
            onError={() => setFailed(true)}
          >
            <source src={src} type="video/mp4" />
          </video>
        )}
      </div>
    </div>
  );
}
