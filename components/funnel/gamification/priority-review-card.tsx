"use client";

import { motion, useReducedMotion } from "framer-motion";

type PriorityReviewCardProps = {
  className?: string;
};

export function PriorityReviewCard({ className }: PriorityReviewCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className="relative overflow-hidden rounded-2xl border border-amber-200/90 bg-gradient-to-br from-amber-50 via-white to-amber-50/40 p-4 shadow-[0_8px_30px_rgba(245,158,11,0.12)] sm:p-5">
        <div
          className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-200/30 blur-2xl"
          aria-hidden
        />
        <div className="relative flex items-start gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 text-xl shadow-md shadow-amber-500/25"
            aria-hidden
          >
            ⚡
          </span>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-amber-800">
              Priority Review Activated
            </p>
            <p className="mt-1 text-sm font-semibold leading-snug text-amber-950">
              Your request is in the fast-track queue
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-amber-900/80">
              Complete the remaining details below to help our team review your request as quickly
              as possible.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
