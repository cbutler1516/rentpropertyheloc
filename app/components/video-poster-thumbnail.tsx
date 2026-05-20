"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const POSTER_SEEK_SECONDS = 1.5;

type VideoPosterThumbnailProps = {
  posterSrc?: string;
  videoSrc: string;
  title: string;
  category: string;
  platform?: string;
  className?: string;
  /** Desktop hover / focus: muted loop preview */
  previewOnHover?: boolean;
  /** First featured card: subtle muted loop when in view (md+, desktop) */
  subtleAutoplay?: boolean;
};

export function VideoPosterThumbnail({
  posterSrc,
  videoSrc,
  title,
  category,
  platform,
  className = "",
  previewOnHover = true,
  subtleAutoplay = false,
}: VideoPosterThumbnailProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [posterOk, setPosterOk] = useState(false);
  const [posterFailed, setPosterFailed] = useState(!posterSrc);
  const [frameReady, setFrameReady] = useState(false);
  const [canPreview, setCanPreview] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [inView, setInView] = useState(false);

  const useVideoPoster = posterFailed || !posterOk;
  const wantsPreview =
    canPreview &&
    videoSrc &&
    ((isHovering && previewOnHover) || (subtleAutoplay && inView));
  const showVideo = useVideoPoster || wantsPreview;
  const videoVisible = showVideo && (frameReady || wantsPreview);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px) and (hover: hover)");
    const update = () => setCanPreview(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!subtleAutoplay || !rootRef.current) return;
    const node = rootRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting && entry.intersectionRatio >= 0.35),
      { threshold: [0, 0.35, 0.6] },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [subtleAutoplay]);

  const seekPosterFrame = useCallback(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;
    const target = Number.isFinite(video.duration)
      ? Math.min(POSTER_SEEK_SECONDS, Math.max(0, video.duration - 0.1))
      : POSTER_SEEK_SECONDS;
    video.currentTime = target;
  }, [videoSrc]);

  const handleVideoLoadedMetadata = () => {
    if (!useVideoPoster) return;
    seekPosterFrame();
  };

  const handleVideoSeeked = () => {
    setFrameReady(true);
  };

  const handleVideoError = () => {
    setFrameReady(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc) return;

    if (wantsPreview) {
      video.preload = "metadata";
      void video.play();
      return () => {
        video.pause();
      };
    }

    video.pause();
  }, [wantsPreview, videoSrc]);

  return (
    <div
      ref={rootRef}
      className={`relative overflow-hidden bg-[#0a0a0a] ${className}`}
      aria-label={`${title} preview`}
      onMouseEnter={() => previewOnHover && setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onFocus={() => previewOnHover && setIsHovering(true)}
      onBlur={() => setIsHovering(false)}
    >
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(124,58,237,0.18),transparent_42%),linear-gradient(160deg,#18181b_0%,#050505_55%)]"
        aria-hidden
      />

      {videoSrc ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterOk ? posterSrc : undefined}
          muted
          loop
          playsInline
          preload={useVideoPoster || wantsPreview ? "metadata" : "none"}
          onLoadedMetadata={handleVideoLoadedMetadata}
          onSeeked={handleVideoSeeked}
          onError={handleVideoError}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
            videoVisible ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden
        />
      ) : null}

      {posterSrc && !posterFailed ? (
        <Image
          src={posterSrc}
          alt=""
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover transition-opacity duration-300 ${
            wantsPreview ? "opacity-0" : posterOk ? "opacity-100" : "opacity-0"
          }`}
          onLoad={() => {
            setPosterOk(true);
            setPosterFailed(false);
          }}
          onError={() => {
            setPosterOk(false);
            setPosterFailed(true);
            const video = videoRef.current;
            if (video && video.readyState >= 1) {
              seekPosterFrame();
            }
          }}
        />
      ) : null}

      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/15"
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
