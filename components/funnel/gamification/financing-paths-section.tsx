"use client";

import {
  FINANCING_PATHS_TO_REVIEW,
  getNextFinancingPath,
  getUnlockedFinancingPaths,
  SNAPSHOT_SCORE_DISCLAIMER,
} from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type FinancingPathsSectionProps = {
  profileStrength: number;
  className?: string;
  variant?: "default" | "compact";
};

export function FinancingPathsSection({
  profileStrength,
  className,
  variant = "default",
}: FinancingPathsSectionProps) {
  const reduceMotion = useReducedMotion();
  const unlocked = getUnlockedFinancingPaths(profileStrength);
  const nextPath = getNextFinancingPath(profileStrength);
  const compact = variant === "compact";

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          Financing paths we&apos;ll review
        </p>
        <span className="text-[10px] font-semibold tabular-nums text-teal-700">
          {unlocked.length} active
        </span>
      </div>
      <p className="mt-1 text-[11px] leading-relaxed text-slate-500">
        Paths unlock as your profile strengthens — subject to review and program availability.
      </p>

      <ul className={cn("mt-3 space-y-2", compact && "space-y-1.5")}>
        {FINANCING_PATHS_TO_REVIEW.map((path, index) => {
          const isUnlocked = profileStrength >= path.unlockStrength;
          return (
            <motion.li
              key={path.id}
              initial={reduceMotion ? false : { opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: reduceMotion ? 0 : index * 0.05, duration: 0.25 }}
              className={cn(
                "rounded-xl border px-3 py-2.5",
                isUnlocked
                  ? "border-teal-200/90 bg-white shadow-sm"
                  : "border-dashed border-slate-200 bg-slate-50/50 opacity-75",
              )}
            >
              <div className="flex items-start gap-2.5">
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-base",
                    isUnlocked ? "bg-teal-50" : "bg-slate-100 grayscale",
                  )}
                  aria-hidden
                >
                  {path.icon}
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                    <p
                      className={cn(
                        "text-xs font-semibold",
                        isUnlocked ? "text-slate-900" : "text-slate-500",
                      )}
                    >
                      {path.name}
                    </p>
                    {!isUnlocked ? (
                      <span className="text-[9px] font-semibold text-slate-400">
                        Unlocks at {path.unlockStrength}%
                      </span>
                    ) : (
                      <span className="text-[9px] font-bold uppercase text-teal-600">
                        In review queue
                      </span>
                    )}
                  </div>
                  {!compact ? (
                    <p className="mt-0.5 text-[10px] leading-snug text-slate-500">
                      {path.description}
                    </p>
                  ) : null}
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>

      {nextPath ? (
        <p className="mt-3 rounded-lg border border-amber-100 bg-amber-50/80 px-3 py-2 text-[11px] leading-relaxed text-amber-900">
          <span className="font-semibold">Next unlock:</span> {nextPath.name} at{" "}
          {nextPath.unlockStrength}% profile strength
        </p>
      ) : (
        <p className="mt-3 rounded-lg border border-teal-100 bg-teal-50/80 px-3 py-2 text-[11px] leading-relaxed text-teal-900">
          All financing paths are active for your review. {SNAPSHOT_SCORE_DISCLAIMER}
        </p>
      )}
    </div>
  );
}
