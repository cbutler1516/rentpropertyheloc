"use client";

import { useEffect, useRef, useState } from "react";

type HeroVideoProps = {
  src: string;
  className?: string;
  loading?: "eager" | "lazy";
};

export function HeroVideo({
  src,
  className = "",
  loading = "lazy",
}: HeroVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [canLoad, setCanLoad] = useState(loading === "eager");
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setHasError(true);
      return;
    }

    if (loading === "eager") {
      setCanLoad(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setCanLoad(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, [loading]);

  return (
    <div
      ref={rootRef}
      className={`hero-video-layer ${className}`}
      data-ready={isReady ? "true" : undefined}
      data-hidden={hasError ? "true" : undefined}
      aria-hidden
    >
      {canLoad && !hasError ? (
        <video
          className="hero-video-media"
          autoPlay
          muted
          loop
          playsInline
          preload={loading === "eager" ? "auto" : "metadata"}
          onLoadedData={() => setIsReady(true)}
          onCanPlay={() => setIsReady(true)}
          onError={() => setHasError(true)}
        >
          <source src={src} type="video/mp4" />
        </video>
      ) : null}
      <div className="hero-video-overlay" />
    </div>
  );
}
