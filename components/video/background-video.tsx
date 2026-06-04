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
  /** Poster shown immediately until the video can play */
  poster?: string;
  /** Skip black leader frames at the start of the source (seconds) */
  startTime?: number;
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
  poster,
  startTime = 0,
  mobileStatic = true,
  preload,
}: BackgroundVideoProps) {
  const videoPreload = preload ?? (priority ? "auto" : "none");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [loadVideo, setLoadVideo] = useState(!mobileStatic);
  const startAppliedRef = useRef(false);

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
    setVideoReady(false);
    startAppliedRef.current = false;
  }, [src]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !loadVideo) return;

    const applyStartTime = () => {
      if (startTime <= 0 || startAppliedRef.current) return;
      if (video.duration && startTime >= video.duration) return;
      video.currentTime = startTime;
      startAppliedRef.current = true;
    };

    const markReady = () => {
      if (startTime > 0 && video.currentTime < startTime * 0.5) {
        video.currentTime = startTime;
      }
      setVideoReady(true);
    };

    const onLoadedMetadata = () => {
      applyStartTime();
    };

    const onCanPlay = () => {
      markReady();
    };

    const onTimeUpdate = () => {
      if (startTime <= 0) return;
      if (video.currentTime > 0 && video.currentTime < startTime * 0.25) {
        video.currentTime = startTime;
      }
    };

    const onError = () => setVideoReady(false);

    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("canplay", onCanPlay);
    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("error", onError);

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      applyStartTime();
    }
    if (video.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      markReady();
    }

    return () => {
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("canplay", onCanPlay);
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("error", onError);
    };
  }, [src, loadVideo, startTime]);

  const mediaClassName = cn(
    "absolute inset-0 h-full w-full object-cover object-center",
    videoClassName,
  );

  return (
    <div className={cn("absolute inset-0", className)}>
      {poster ? (
        <img
          src={poster}
          alt=""
          aria-hidden
          className={mediaClassName}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
        />
      ) : (
        <div
          className={cn(
            "absolute inset-0",
            replaceDefaultOverlay
              ? "bg-[linear-gradient(160deg,rgba(4,8,16,0.35)_0%,rgba(10,18,32,0.2)_50%,rgba(4,8,16,0.35)_100%)]"
              : "bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,211,238,0.16),transparent_50%),linear-gradient(160deg,#040810_0%,#0a1220_50%,#040810_100%)]",
          )}
          aria-hidden
        />
      )}
      {loadVideo ? (
        <video
          ref={videoRef}
          className={cn(mediaClassName, !videoReady && "!opacity-0")}
          autoPlay
          muted
          loop
          playsInline
          preload={videoPreload}
          poster={poster}
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
