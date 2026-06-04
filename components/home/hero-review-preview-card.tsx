"use client";

import { cn } from "@/lib/cn";
import {
  HERO_SAMPLE_PREVIEW_ITEMS,
  HERO_SAMPLE_PREVIEW_LABEL,
  HERO_VALUE_BADGE,
  HERO_VALUE_BENEFITS,
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
            className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-teal-50/95 to-transparent"
            aria-hidden
          />

          <div className="relative p-5 sm:p-6">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">
              {HERO_VALUE_BADGE}
            </p>
            <h2 className="mt-2 text-lg font-bold tracking-tight text-navy-950 sm:text-xl">
              {HERO_VALUE_HEADLINE}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{HERO_VALUE_SUBHEADLINE}</p>

            <ul className="mt-5 space-y-2.5" aria-label="Review benefits">
              {HERO_VALUE_BENEFITS.map((benefit, index) => (
                <BenefitRow
                  key={benefit.title}
                  benefit={benefit}
                  index={index}
                  reduceMotion={reduceMotion}
                />
              ))}
            </ul>

            <div className="mt-5 border-t border-slate-100 pt-4">
              <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-2">
                {HERO_VALUE_FOOTER_POINTS.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-xs font-medium text-slate-600"
                  >
                    <span
                      aria-hidden
                      className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[10px] text-teal-700"
                    >
                      ✓
                    </span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <SamplePreviewThumbnail className="mt-5" reduceMotion={reduceMotion} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function BenefitRow({
  benefit,
  index,
  reduceMotion,
}: {
  benefit: (typeof HERO_VALUE_BENEFITS)[number];
  index: number;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.1 + index * 0.06, duration: 0.32 }}
      className="group rounded-xl border border-slate-100 bg-slate-50/70 p-3 transition hover:border-teal-200/80 hover:bg-teal-50/40 hover:shadow-sm sm:p-3.5"
    >
      <div className="flex gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-base shadow-sm ring-1 ring-slate-200/80 transition group-hover:ring-teal-200/80"
          aria-hidden
        >
          {benefit.icon}
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold leading-tight text-slate-900">{benefit.title}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-[0.8125rem]">
            {benefit.description}
          </p>
        </div>
      </div>
    </motion.li>
  );
}

function SamplePreviewThumbnail({
  className,
  reduceMotion,
}: {
  className?: string;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.38, duration: 0.35 }}
      className={cn("rounded-xl border border-slate-200/90 bg-gradient-to-br from-slate-50 to-white p-3.5", className)}
      aria-hidden
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-500">
          {HERO_SAMPLE_PREVIEW_LABEL}
        </p>
        <span className="rounded-full border border-slate-200 bg-white px-2 py-0.5 text-[9px] font-medium text-slate-500">
          Illustrative
        </span>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {HERO_SAMPLE_PREVIEW_ITEMS.map((item) => (
          <div
            key={item}
            className="rounded-lg border border-slate-200/80 bg-white px-2.5 py-2 shadow-sm"
          >
            <span className="mb-1.5 block h-1 w-8 rounded-full bg-teal-200/80" aria-hidden />
            <p className="text-[10px] font-semibold leading-tight text-slate-700 sm:text-[11px]">
              {item}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
