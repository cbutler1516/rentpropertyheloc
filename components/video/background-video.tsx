"use client";

import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";

type BackgroundVideoProps = {
  src: string;
  className?: string;
  overlayClassName?: string;
  /** When true, overlayClassName replaces the default dark overlay stack */
  replaceDefaultOverlay?: boolean;
  priority?: boolean;
  videoClassName?: string;
  /** Skip background video on small screens to save bandwidth */
  mobileStatic?: boolean;
  preload?: "auto" | "metadata" | "none";
};

export function BackgroundVideo({
  src,
  className,
  overlayClassName,
  replaceDefaultOverlay = false,
  priority = false,
  videoClassName,
  mobileStatic = true,
  preload,
}: BackgroundVideoProps) {
  const videoPreload = preload ?? (priority ? "auto" : "none");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  const [loadVideo, setLoadVideo] = useState(!mobileStatic);

  useEffect(() => {
    if (!mobileStatic) {
      setLoadVideo(true);
      return;
    }

    const mq = window.matchMedia("(min-width: 768px)");
    const apply = () => setLoadVideo(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [mobileStatic]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;

    const onCanPlay = () => setActive(true);
    const onError = () => setActive(false);

    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("error", onError);
    video.load();

    return () => {
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("error", onError);
    };
  }, [src, loadVideo]);

  return (
    <div className={cn("absolute inset-0", className)}>
      <div
        className={cn(
          "absolute inset-0",
          replaceDefaultOverlay
            ? "bg-[linear-gradient(160deg,rgba(4,8,16,0.35)_0%,rgba(10,18,32,0.2)_50%,rgba(4,8,16,0.35)_100%)]"
            : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,211,238,0.16),transparent_50%),linear-gradient(160deg,#040810_0%,#0a1220_50%,#040810_100%)]",
        )}
        aria-hidden
      />
      {loadVideo ? (
        <video
          ref={videoRef}
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700",
            active ? cn("opacity-70 md:opacity-85", videoClassName) : "opacity-0",
          )}
          autoPlay
          muted
          loop
          playsInline
          preload={videoPreload}
          aria-hidden
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <div
        className={cn(
          "absolute inset-0",
          replaceDefaultOverlay
            ? overlayClassName
            : cn(
                "bg-navy-950/85 bg-gradient-to-b from-navy-950/75 via-navy-950/88 to-navy-950",
                overlayClassName,
              ),
        )}
        aria-hidden
      />
    </div>
  );
}
