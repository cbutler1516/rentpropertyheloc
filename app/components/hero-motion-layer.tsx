"use client";

import { useEffect, useRef } from "react";
import { SportsStrategyLayer } from "./sports-strategy-layer";

export function HeroMotionLayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const rafId = useRef(0);
  const nextTransform = useRef("translate3d(0, 0, 0)");

  useEffect(() => {
    const motionRoot = containerRef.current;
    const container = motionRoot?.parentElement;
    if (!motionRoot || !container) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduced || coarse) return;

    const applyTransform = () => {
      if (boardRef.current) {
        boardRef.current.style.transform = nextTransform.current;
      }
      rafId.current = 0;
    };

    const scheduleTransform = (transform: string) => {
      nextTransform.current = transform;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(applyTransform);
      }
    };

    const onMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = Math.max(
        -0.5,
        Math.min(0.5, (e.clientX - rect.left) / rect.width - 0.5),
      );
      const y = Math.max(
        -0.5,
        Math.min(0.5, (e.clientY - rect.top) / rect.height - 0.5),
      );

      scheduleTransform(`translate3d(${x * 12}px, ${y * 8}px, 0)`);
    };

    const onLeave = () => {
      scheduleTransform("translate3d(0, 0, 0)");
    };

    container.addEventListener("pointermove", onMove, { passive: true });
    container.addEventListener("pointerleave", onLeave);

    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-motion-root pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      <div ref={boardRef} className="hero-motion-board absolute inset-0">
        <SportsStrategyLayer variant="football-home" />
      </div>
    </div>
  );
}
