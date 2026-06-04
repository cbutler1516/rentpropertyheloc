"use client";

import { cn } from "@/lib/cn";
import { PRE_SUBMIT_MILESTONES } from "@/lib/leads/investor-review-gamification";
import { FUNNEL_QUESTION_COUNT } from "@/lib/leads/funnel-config";
import { motion, useReducedMotion } from "framer-motion";

type FunnelProgressProps = {
  currentStep: number;
  totalSteps?: number;
  compact?: boolean;
  className?: string;
};

export function FunnelProgress({
  currentStep,
  totalSteps = FUNNEL_QUESTION_COUNT,
  compact = true,
  className,
}: FunnelProgressProps) {
  const reduceMotion = useReducedMotion();
  const clampedStep = Math.min(Math.max(currentStep, 1), totalSteps);
  const progressPercent = Math.round((clampedStep / totalSteps) * 100);
  const currentMilestone =
    PRE_SUBMIT_MILESTONES.find((milestone) => milestone.step === clampedStep) ??
    PRE_SUBMIT_MILESTONES[PRE_SUBMIT_MILESTONES.length - 1];

  return (
    <div className={cn("min-w-0 flex-1", className)}>
      <div className="flex items-center justify-between gap-3">
        <p className="truncate text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs">
          Step {clampedStep} of {totalSteps}
          <span className="hidden font-medium normal-case tracking-normal text-slate-400 sm:inline">
            {" "}
            · {currentMilestone.label}
          </span>
        </p>
        <span className="shrink-0 text-[11px] font-semibold tabular-nums text-teal-700 sm:text-xs">
          {progressPercent}%
        </span>
      </div>

      <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-brand-progress"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {!compact ? (
        <div className="mt-2 flex items-center gap-1.5">
          {PRE_SUBMIT_MILESTONES.map((milestone) => {
            const isComplete = clampedStep > milestone.step;
            const isCurrent = clampedStep === milestone.step;

            return (
              <div key={milestone.step} className="flex min-w-0 flex-1 items-center gap-1.5">
                <span
                  className={cn(
                    "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                    isComplete && "bg-teal-600 text-white",
                    isCurrent && "bg-teal-100 text-teal-800 ring-2 ring-teal-500/30",
                    !isComplete && !isCurrent && "bg-slate-100 text-slate-400",
                  )}
                  aria-hidden
                >
                  {isComplete ? "✓" : milestone.step}
                </span>
                <span
                  className={cn(
                    "truncate text-[10px] font-medium sm:text-[11px]",
                    isCurrent ? "text-teal-800" : isComplete ? "text-slate-600" : "text-slate-400",
                  )}
                >
                  {milestone.label}
                </span>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="mt-2 hidden items-center justify-between gap-2 sm:flex">
          {PRE_SUBMIT_MILESTONES.map((milestone) => {
            const isComplete = clampedStep > milestone.step;
            const isCurrent = clampedStep === milestone.step;

            return (
              <span
                key={milestone.step}
                className={cn(
                  "truncate text-[10px] font-medium sm:text-[11px]",
                  isCurrent && "font-semibold text-teal-800",
                  isComplete && !isCurrent && "text-slate-600",
                  !isComplete && !isCurrent && "text-slate-400",
                )}
              >
                {milestone.label}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
