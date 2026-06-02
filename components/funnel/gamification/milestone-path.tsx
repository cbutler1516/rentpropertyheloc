"use client";

import type { MilestoneStatus, ReviewMilestone } from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type MilestonePathProps = {
  milestones: ReviewMilestone[];
  className?: string;
  variant?: "horizontal" | "vertical";
};

export function MilestonePath({
  milestones,
  className,
  variant = "horizontal",
}: MilestonePathProps) {
  const reduceMotion = useReducedMotion();

  if (variant === "vertical") {
    return (
      <ol className={cn("space-y-0", className)} aria-label="Review milestones">
        {milestones.map((milestone, index) => (
          <VerticalMilestone
            key={milestone.id}
            milestone={milestone}
            index={index}
            isLast={index === milestones.length - 1}
            reduceMotion={reduceMotion}
          />
        ))}
      </ol>
    );
  }

  return (
    <div className={cn("-mx-1 overflow-x-auto pb-1", className)}>
      <ol
        className="flex min-w-max items-start gap-0 px-1"
        aria-label="Review milestones"
      >
        {milestones.map((milestone, index) => (
          <HorizontalMilestone
            key={milestone.id}
            milestone={milestone}
            index={index}
            isLast={index === milestones.length - 1}
            reduceMotion={reduceMotion}
          />
        ))}
      </ol>
    </div>
  );
}

function HorizontalMilestone({
  milestone,
  index,
  isLast,
  reduceMotion,
}: {
  milestone: ReviewMilestone;
  index: number;
  isLast: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <li className="flex w-[5.5rem] shrink-0 flex-col items-center sm:w-[6.25rem]">
      <div className="flex w-full items-center">
        <motion.div
          initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: reduceMotion ? 0 : index * 0.06, duration: 0.25 }}
          className={cn(
            "relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl shadow-sm sm:h-14 sm:w-14 sm:text-2xl",
            statusStyles[milestone.status],
          )}
        >
          <span aria-hidden>{milestone.icon}</span>
        </motion.div>
        {!isLast ? (
          <span
            className={cn(
              "mx-1 h-0.5 flex-1 rounded-full",
              milestone.status === "complete" ? "bg-teal-300" : "bg-slate-200",
            )}
            aria-hidden
          />
        ) : null}
      </div>
      <p
        className={cn(
          "mt-2 px-0.5 text-center text-[10px] font-semibold leading-tight sm:text-[11px]",
          milestone.status === "locked" ? "text-slate-400" : "text-slate-700",
        )}
      >
        {milestone.label}
      </p>
    </li>
  );
}

function VerticalMilestone({
  milestone,
  index,
  isLast,
  reduceMotion,
}: {
  milestone: ReviewMilestone;
  index: number;
  isLast: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <li className="relative flex gap-3 pb-4 last:pb-0">
      {!isLast ? (
        <span
          className={cn(
            "absolute left-[21px] top-11 h-[calc(100%-28px)] w-px",
            milestone.status === "complete" ? "bg-teal-300" : "bg-slate-200",
          )}
          aria-hidden
        />
      ) : null}
      <motion.div
        initial={reduceMotion ? false : { scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: reduceMotion ? 0 : index * 0.06, duration: 0.25 }}
        className={cn(
          "relative z-[1] flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl shadow-sm sm:h-14 sm:w-14 sm:text-2xl",
          statusStyles[milestone.status],
        )}
      >
        <span aria-hidden>{milestone.icon}</span>
      </motion.div>
      <div className="min-w-0 pt-2">
        <p
          className={cn(
            "text-sm font-semibold",
            milestone.status === "locked" ? "text-slate-400" : "text-slate-900",
          )}
        >
          {milestone.label}
        </p>
        <p className="text-[11px] capitalize text-slate-500">{milestone.status}</p>
      </div>
    </li>
  );
}

const statusStyles: Record<MilestoneStatus, string> = {
  complete: "bg-teal-600 text-white ring-2 ring-teal-100",
  current: "bg-white text-slate-900 ring-2 ring-teal-500 shadow-md shadow-teal-500/15",
  pending: "border border-slate-200 bg-slate-50 text-slate-400",
  locked: "border border-dashed border-slate-200 bg-slate-50/80 text-slate-300",
};
