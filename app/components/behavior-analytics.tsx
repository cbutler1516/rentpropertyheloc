"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { trackScrollDepth, trackSectionView } from "../lib/analytics-events";

const scrollMilestones = [25, 50, 75, 100] as const;

const behaviorPathPrefixes = [
  "/",
  "/buyers",
  "/homeowners",
  "/agents",
  "/commercial",
  "/videos",
  "/learn",
  "/guides",
  "/markets",
  "/washington-mortgage",
];

function shouldTrackBehavior(pathname: string) {
  return behaviorPathPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

export function BehaviorAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (!shouldTrackBehavior(pathname)) return;

    const firedMilestones = new Set<number>();

    function handleScroll() {
      const documentHeight = document.documentElement.scrollHeight;
      const viewportHeight = window.innerHeight;
      const scrollableHeight = Math.max(documentHeight - viewportHeight, 1);
      const scrollPercent = Math.min(
        100,
        Math.round((window.scrollY / scrollableHeight) * 100),
      );

      scrollMilestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !firedMilestones.has(milestone)) {
          firedMilestones.add(milestone);
          trackScrollDepth(milestone);
        }
      });
    }

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  useEffect(() => {
    if (!shouldTrackBehavior(pathname) || !("IntersectionObserver" in window)) {
      return;
    }

    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-analytics-section]"),
    );
    if (!sections.length) return;

    const seenSections = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const sectionId = entry.target.getAttribute("data-analytics-section");
          if (!sectionId || seenSections.has(sectionId)) return;

          seenSections.add(sectionId);
          trackSectionView(sectionId);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -20% 0px", threshold: 0.3 },
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
