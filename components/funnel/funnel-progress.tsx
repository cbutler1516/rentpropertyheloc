"use client";

import { cn } from "@/lib/cn";
import { getMilestoneMomentumMessage } from "@/lib/leads/funnel-encouragement";
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
  compact,
  className,
}: FunnelProgressProps) {
  const reduceMotion = useReducedMotion();
  const clampedStep = Math.min(Math.max(currentStep, 1), totalSteps);
  const momentumMessage = getMilestoneMomentumMessage(clampedStep, totalSteps);
  const progressPercent = Math.round((clampedStep / totalSteps) * 100);

  return (
    <div className={cn("space-y-2.5", className)}>
      <div className="flex items-center justify-between gap-2">
        <motion.span
          key={momentumMessage}
          initial={reduceMotion ? false : { opacity: 0, x: -4 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.25 }}
          className={cn(
            "font-semibold text-slate-800",
            compact ? "text-xs" : "text-sm",
          )}
        >
          {momentumMessage}
        </motion.span>
        <span className="text-[10px] font-medium tabular-nums text-slate-400">
          {progressPercent}%
        </span>
      </div>

      <div className="h-1 overflow-hidden rounded-full bg-slate-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-teal-600"
          initial={false}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <div className="flex items-center gap-1">
        {PRE_SUBMIT_MILESTONES.map((milestone, index) => {
          const stepNumber = milestone.step;
          const isComplete = clampedStep > stepNumber;
          const isCurrent = clampedStep === stepNumber;
          const isLast = index === PRE_SUBMIT_MILESTONES.length - 1;

          return (
            <div key={milestone.step} className="flex min-w-0 flex-1 items-center gap-1">
              <motion.div
                initial={false}
                animate={{
                  scale: isCurrent ? 1.06 : isComplete ? 1 : 0.96,
                }}
                transition={{ duration: reduceMotion ? 0 : 0.3, type: "spring", stiffness: 300, damping: 22 }}
                className={cn(
                  "flex min-w-0 flex-1 flex-col items-center rounded-xl px-1 py-2 sm:px-1.5",
                  isCurrent && "bg-teal-50 ring-1 ring-teal-200/80 shadow-sm shadow-teal-500/10",
                  isComplete && "opacity-100",
                  !isComplete && !isCurrent && "opacity-50",
                )}
              >
                <motion.span
                  animate={
                    isComplete && !reduceMotion
                      ? { scale: [1, 1.15, 1], transition: { duration: 0.35 } }
                      : {}
                  }
                  className={cn(
                    "leading-none",
                    compact ? "text-xl" : "text-2xl sm:text-[1.75rem]",
                  )}
                  aria-hidden
                >
                  {isComplete ? "✓" : milestone.icon}
                </motion.span>
                <span
                  className={cn(
                    "mt-1 truncate text-[9px] font-semibold sm:text-[10px]",
                    isCurrent ? "text-teal-800" : isComplete ? "text-teal-700" : "text-slate-500",
                  )}
                >
                  {milestone.label}
                </span>
              </motion.div>
              {!isLast ? (
                <motion.span
                  initial={false}
                  animate={{
                    backgroundColor: isComplete ? "rgb(45 212 191)" : "rgb(226 232 240)",
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.35 }}
                  className="h-0.5 w-2 shrink-0 rounded-full sm:w-3"
                  aria-hidden
                />
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
