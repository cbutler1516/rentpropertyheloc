"use client";

import { cn } from "@/lib/cn";
import {
  HERO_TRUST_FOOTER,
  HERO_TRUST_ITEMS,
  HERO_TRUST_TITLE,
} from "@/lib/hero-preview";
import { motion, useReducedMotion } from "framer-motion";

type HeroTrustCardProps = {
  className?: string;
};

export function HeroTrustCard({ className }: HeroTrustCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.aside
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
      className={cn("w-full max-w-sm", className)}
      aria-label="What you'll get from your review"
    >
      <div className="rounded-xl border border-white/20 bg-white/92 px-3.5 py-3 shadow-[0_6px_24px_rgba(15,23,42,0.18)] ring-1 ring-teal-500/20 backdrop-blur-sm sm:px-4 sm:py-3.5">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">
          {HERO_TRUST_TITLE}
        </p>

        <ul className="mt-2 space-y-1" aria-label="Review includes">
          {HERO_TRUST_ITEMS.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2 text-xs font-medium leading-tight text-slate-800"
            >
              <span
                aria-hidden
                className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[9px] font-bold text-teal-800"
              >
                ✓
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 border-t border-slate-100/90 pt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-500">
          {HERO_TRUST_FOOTER.map((point, index) => (
            <span key={point} className="inline-flex items-center gap-3">
              {index > 0 ? (
                <span aria-hidden className="hidden h-2.5 w-px bg-slate-200 sm:inline-block" />
              ) : null}
              {point}
            </span>
          ))}
        </p>
      </div>
    </motion.aside>
  );
}
