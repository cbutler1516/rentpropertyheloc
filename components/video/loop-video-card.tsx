"use client";

import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";

type LoopVideoCardProps = {
  src: string;
  title: string;
  description: string;
  className?: string;
};

export function LoopVideoCard({ src, title, description, className }: LoopVideoCardProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "80px", threshold: 0.08 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!load || !video) return;
    video.play().catch(() => undefined);
  }, [load]);

  return (
    <article
      ref={rootRef}
      className={cn(
        "group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm",
        className,
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-900">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-800 to-navy-950" />
        {load ? (
          <>
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-80 transition duration-500 group-hover:opacity-90"
              muted
              loop
              playsInline
              preload="metadata"
              aria-hidden
            >
              <source src={src} type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/30 to-transparent" />
          </>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-white/65">{description}</p>
      </div>
    </article>
  );
}
