"use client";

import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";

type BackgroundVideoProps = {
  src: string;
  className?: string;
  overlayClassName?: string;
};

export function BackgroundVideo({ src, className, overlayClassName }: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => setActive(true);
    const onError = () => setActive(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);

    video.load();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [src]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,211,238,0.2),transparent_50%),linear-gradient(160deg,#06101f_0%,#0c1a30_45%,#06101f_100%)]"
        aria-hidden
      />
      <video
        ref={videoRef}
        className={cn(
          "absolute inset-0 h-full w-full object-cover transition-opacity duration-1000",
          active ? "opacity-100" : "opacity-0",
        )}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden
      >
        <source src={src} type="video/mp4" />
      </video>
      <div
        className={cn(
          "absolute inset-0 bg-navy-950/75 bg-gradient-to-b from-navy-950/60 via-navy-950/80 to-navy-950",
          overlayClassName,
        )}
        aria-hidden
      />
    </div>
  );
}
