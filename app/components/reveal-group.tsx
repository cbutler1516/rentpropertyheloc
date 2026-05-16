"use client";

import { useEffect, useRef, type ReactNode } from "react";

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  /** ms between each .reveal-item */
  stagger?: number;
};

export function RevealGroup({
  children,
  className = "",
  stagger = 130,
}: RevealGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;

    const items = root.querySelectorAll<HTMLElement>(".reveal-item");
    if (!items.length) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      items.forEach((item) => item.classList.add("reveal-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const item = entry.target as HTMLElement;
          const index = Number(item.dataset.revealIndex ?? 0);
          window.setTimeout(() => {
            item.classList.add("reveal-visible");
            item.addEventListener(
              "transitionend",
              () => {
                item.style.willChange = "auto";
              },
              { once: true },
            );
          }, index * stagger);
          observer.unobserve(item);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -6% 0px" },
    );

    items.forEach((item, index) => {
      item.dataset.revealIndex = String(index);
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
