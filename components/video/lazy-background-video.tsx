"use client";

import { BackgroundVideo } from "@/components/video/background-video";
import { cn } from "@/lib/cn";
import { useEffect, useRef, useState } from "react";

type LazyBackgroundVideoProps = {
  src: string;
  className?: string;
  overlayClassName?: string;
  /** Lower video opacity for section ambience */
  subtle?: boolean;
};

export function LazyBackgroundVideo({
  src,
  className,
  overlayClassName,
  subtle = true,
}: LazyBackgroundVideoProps) {
  const rootRef = useRef<HTMLDivElement>(null);
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
      { rootMargin: "120px", threshold: 0.01 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={rootRef} className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="absolute inset-0 bg-navy-950" />
      {load ? (
        <BackgroundVideo
          src={src}
          overlayClassName={cn(
            subtle && "bg-navy-950/88 from-navy-950/82 via-navy-950/92 to-navy-950",
            overlayClassName,
          )}
          videoClassName={subtle ? "!opacity-35 sm:!opacity-40" : undefined}
        />
      ) : null}
    </div>
  );
}
