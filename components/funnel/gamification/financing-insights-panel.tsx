"use client";

import {
  FINANCING_INSIGHTS,
  isFinancingInsightUnlocked,
} from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type FinancingInsightsPanelProps = {
  data: Record<string, string | undefined>;
  className?: string;
  compact?: boolean;
};

export function FinancingInsightsPanel({
  data,
  className,
  compact,
}: FinancingInsightsPanelProps) {
  const reduceMotion = useReducedMotion();
  const unlockedCount = FINANCING_INSIGHTS.filter((insight) =>
    isFinancingInsightUnlocked(insight, data),
  ).length;

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Financing insights
        </p>
        <span className="text-[10px] font-semibold tabular-nums text-teal-700">
          {unlockedCount}/{FINANCING_INSIGHTS.length} unlocked
        </span>
      </div>
      <div
        className={cn(
          "mt-3 grid gap-2",
          compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2",
        )}
      >
        {FINANCING_INSIGHTS.map((insight, index) => {
          const unlocked = isFinancingInsightUnlocked(insight, data);
          return (
            <motion.div
              key={insight.id}
              initial={reduceMotion ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : index * 0.04, duration: 0.25 }}
              className={cn(
                "rounded-xl border px-3 py-2.5 transition",
                unlocked
                  ? "border-teal-200 bg-gradient-to-br from-teal-50 to-white shadow-sm"
                  : "border-slate-200/80 bg-slate-50/60",
              )}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base",
                    unlocked ? "bg-teal-100" : "bg-slate-200/80 grayscale opacity-60",
                  )}
                  aria-hidden
                >
                  {insight.icon}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-1">
                    <p
                      className={cn(
                        "text-xs font-semibold leading-tight",
                        unlocked ? "text-teal-900" : "text-slate-600",
                      )}
                    >
                      {insight.title}
                    </p>
                    <span
                      className={cn(
                        "shrink-0 text-[9px] font-bold uppercase",
                        unlocked ? "text-teal-600" : "text-slate-400",
                      )}
                    >
                      {unlocked ? "Unlocked" : "Locked"}
                    </span>
                  </div>
                  <p className="mt-1 text-[10px] leading-snug text-slate-500">
                    {unlocked ? insight.unlockedCopy : insight.lockedCopy}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
