"use client";

import { CtaLink } from "@/components/ui/cta-link";
import { cn } from "@/lib/cn";
import { HERO_CTA_LABEL, HERO_FUNNEL_HREF } from "@/lib/cta";
import {
  HERO_PREVIEW_FOOTER,
  HERO_PREVIEW_STEPS,
  HERO_PREVIEW_SUBTITLE,
  HERO_PREVIEW_TITLE,
} from "@/lib/hero-preview";
import { motion, useReducedMotion } from "framer-motion";

type HeroReviewPreviewCardProps = {
  className?: string;
};

export function HeroReviewPreviewCard({ className }: HeroReviewPreviewCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("w-full max-w-md mx-auto md:max-w-none md:mx-0", className)}
    >
      <div className="relative">
        <div
          className="pointer-events-none absolute -inset-px rounded-[1.35rem] bg-gradient-to-br from-teal-400/35 via-transparent to-cyan-400/25 opacity-80"
          aria-hidden
        />
        <div className="relative overflow-hidden rounded-[1.25rem] border border-white/20 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.28)]">
          <div
            className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-teal-50/90 to-transparent"
            aria-hidden
          />

          <div className="relative p-5 sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700">
                  Review preview
                </p>
                <h2 className="mt-1.5 text-lg font-bold tracking-tight text-navy-950 sm:text-xl">
                  {HERO_PREVIEW_TITLE}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{HERO_PREVIEW_SUBTITLE}</p>
              </div>
              <span
                className="hidden shrink-0 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-teal-800 sm:inline-flex"
                aria-hidden
              >
                Sample
              </span>
            </div>

            <ol className="mt-5 space-y-0" aria-label="Review outcome preview">
              {HERO_PREVIEW_STEPS.map((step, index) => (
                <PreviewStepRow
                  key={step}
                  label={step}
                  index={index}
                  isLast={index === HERO_PREVIEW_STEPS.length - 1}
                  reduceMotion={reduceMotion}
                />
              ))}
            </ol>

            <p className="mt-4 border-t border-slate-100 pt-4 text-xs leading-relaxed text-slate-500">
              {HERO_PREVIEW_FOOTER}
            </p>

            <CtaLink
              href={HERO_FUNNEL_HREF}
              size="lg"
              className="glow-accent-hero mt-5 w-full"
              ctaLocation="hero-preview-card"
            >
              {HERO_CTA_LABEL}
            </CtaLink>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function PreviewStepRow({
  label,
  index,
  isLast,
  reduceMotion,
}: {
  label: string;
  index: number;
  isLast: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.12 + index * 0.06, duration: 0.32 }}
      className="relative flex gap-3 pb-3.5 last:pb-0"
    >
      {!isLast ? (
        <span
          className="absolute left-[11px] top-6 h-[calc(100%-12px)] w-px bg-teal-200"
          aria-hidden
        />
      ) : null}
      <span
        className="relative z-[1] flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full bg-teal-600 text-white shadow-sm shadow-teal-600/25"
        aria-hidden
      >
        <svg viewBox="0 0 12 12" className="h-3 w-3" fill="none">
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <p className="pt-0.5 text-sm font-medium leading-tight text-slate-800">{label}</p>
    </motion.li>
  );
}
