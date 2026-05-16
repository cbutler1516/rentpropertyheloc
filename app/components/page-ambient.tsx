"use client";

import { useEffect } from "react";

/** Scroll-linked ambient depth: CSS vars + subtle section parallax. */
export function PageAmbient({
  enableParallax = true,
}: {
  enableParallax?: boolean;
}) {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduced) return;

    let raf = 0;

    const update = () => {
      const y = window.scrollY;
      const doc = document.documentElement;
      doc.style.setProperty("--scroll-y", `${y}`);
      doc.style.setProperty("--scroll-ambient", `${y * 0.35}`);

      if (enableParallax) {
        const vh = window.innerHeight;
        const layers =
          document.querySelectorAll<HTMLElement>("[data-parallax]");

        layers.forEach((el) => {
          const strength = Number(el.dataset.parallax) || 0.04;
          const rect = el.getBoundingClientRect();
          const center = rect.top + rect.height * 0.5;
          const offset = ((center - vh * 0.5) / vh) * strength * 100;
          el.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
        });
      }

      raf = 0;
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [enableParallax]);

  return null;
}
