"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type HeroVideoProps = {
  src: string;
  className?: string;
  loading?: "eager" | "lazy";
};

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onStoreChange: () => void) {
  const mediaQuery = window.matchMedia(reducedMotionQuery);
  mediaQuery.addEventListener("change", onStoreChange);
  return () => mediaQuery.removeEventListener("change", onStoreChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function getReducedMotionServerSnapshot() {
  return false;
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

export function HeroVideo({
  src,
  className = "",
  loading = "lazy",
}: HeroVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [canLoad, setCanLoad] = useState(loading === "eager");
  const [isReady, setIsReady] = useState(false);
  const [hasError, setHasError] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion || loading === "eager") return;

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
  }, [loading, prefersReducedMotion]);

  const shouldRenderVideo =
    !prefersReducedMotion && !hasError && (canLoad || loading === "eager");
  const shouldHideLayer = prefersReducedMotion || hasError;

  return (
    <div
      ref={rootRef}
      className={`hero-video-layer ${className}`}
      data-ready={isReady ? "true" : undefined}
      data-hidden={shouldHideLayer ? "true" : undefined}
      aria-hidden
    >
      {shouldRenderVideo ? (
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
