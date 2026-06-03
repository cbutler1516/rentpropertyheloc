"use client";

import { cn } from "@/lib/cn";
import {
  HERO_VALUE_BADGE,
  HERO_VALUE_BENEFITS,
  HERO_VALUE_FOOTER_NOTE,
  HERO_VALUE_FOOTER_POINTS,
  HERO_VALUE_HEADLINE,
  HERO_VALUE_SUBHEADLINE,
} from "@/lib/hero-preview";
import { motion, useReducedMotion } from "framer-motion";

type HeroReviewPreviewCardProps = {
  className?: string;
};

export function HeroReviewPreviewCard({ className }: HeroReviewPreviewCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "w-full max-w-[17.5rem] mx-auto sm:max-w-xs md:max-w-[19rem] md:mx-0 lg:max-w-[20rem]",
        className,
      )}
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-br from-teal-400/25 via-transparent to-cyan-400/15 opacity-70"
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/95 shadow-[0_12px_32px_rgba(15,23,42,0.18)] backdrop-blur-sm">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-teal-50/80 to-transparent"
            aria-hidden
          />

          <div className="relative px-4 py-4 sm:px-[1.125rem] sm:py-[1.125rem]">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-teal-700">
              {HERO_VALUE_BADGE}
            </p>
            <h2 className="mt-1.5 text-base font-bold leading-snug tracking-tight text-navy-950">
              {HERO_VALUE_HEADLINE}
            </h2>
            <p className="mt-1.5 text-xs leading-relaxed text-slate-600">{HERO_VALUE_SUBHEADLINE}</p>

            <ul className="mt-3.5 space-y-1.5" aria-label="Review benefits">
              {HERO_VALUE_BENEFITS.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={reduceMotion ? false : { opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.04, duration: 0.28 }}
                  className="flex items-center gap-2 text-xs font-medium text-slate-800"
                >
                  <span
                    aria-hidden
                    className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[9px] text-teal-700"
                  >
                    ✓
                  </span>
                  {benefit}
                </motion.li>
              ))}
            </ul>

            <div className="mt-3.5 border-t border-slate-100 pt-3">
              <ul className="flex flex-col gap-1.5">
                {HERO_VALUE_FOOTER_POINTS.map((point) => (
                  <li key={point} className="flex items-center gap-2 text-[11px] text-slate-600">
                    <span
                      aria-hidden
                      className="flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[9px] text-teal-700"
                    >
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
              <p className="mt-2.5 text-[10px] leading-relaxed text-slate-500">{HERO_VALUE_FOOTER_NOTE}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
