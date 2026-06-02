"use client";

import {
  BASE_POST_SUBMIT_SCORE,
  MAX_INVESTOR_REVIEW_SCORE,
  getScoreBoostHint,
} from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type InvestorReviewScoreProps = {
  score: number;
  enrichmentAnswerCount: number;
  className?: string;
};

export function InvestorReviewScore({
  score,
  enrichmentAnswerCount,
  className,
}: InvestorReviewScoreProps) {
  const reduceMotion = useReducedMotion();
  const clamped = Math.max(BASE_POST_SUBMIT_SCORE, Math.min(MAX_INVESTOR_REVIEW_SCORE, score));
  const percent = (clamped / MAX_INVESTOR_REVIEW_SCORE) * 100;
  const hint = getScoreBoostHint(enrichmentAnswerCount);

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white to-slate-50/80 p-4 shadow-sm sm:p-5",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
            📈 Investor Review Score
          </p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <motion.span
              key={clamped}
              initial={reduceMotion ? false : { scale: 0.95, opacity: 0.6 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="text-3xl font-bold tabular-nums tracking-tight text-slate-900"
            >
              {clamped}
            </motion.span>
            <span className="text-sm font-medium text-slate-400">
              / {MAX_INVESTOR_REVIEW_SCORE}
            </span>
          </p>
        </div>
        <div className="rounded-xl bg-teal-50 px-2.5 py-1.5 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-teal-700">Level</p>
          <p className="text-sm font-bold text-teal-900">
            {clamped >= 95 ? "Elite" : clamped >= 85 ? "Strong" : "Building"}
          </p>
        </div>
      </div>

      <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal-600 via-teal-500 to-emerald-400"
          animate={{ width: `${percent}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <p className="mt-2.5 text-xs leading-relaxed text-slate-600">{hint}</p>
    </div>
  );
}
