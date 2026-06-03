"use client";

import { REVIEW_DASHBOARD, type ReviewDashboardStepStatus } from "@/lib/trust-content";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type RequestReviewDashboardProps = {
  variant?: "full" | "compact";
  className?: string;
};

export function RequestReviewDashboard({
  variant = "full",
  className,
}: RequestReviewDashboardProps) {
  const compact = variant === "compact";
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0a1628] to-teal-950",
        compact ? "p-3 sm:p-4" : "p-5 sm:p-7 lg:p-8",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_0%,rgba(45,212,191,0.12),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-teal-500/10 blur-3xl"
        aria-hidden
      />

      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "relative rounded-xl border border-white/10 bg-white/[0.04] shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-sm",
          compact ? "p-3" : "p-4 sm:p-5",
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "relative flex h-2 w-2 shrink-0 rounded-full bg-emerald-400",
                !reduceMotion && "animate-pulse",
              )}
              aria-hidden
            />
            <p
              className={cn(
                "font-bold uppercase tracking-[0.16em] text-white",
                compact ? "text-[9px]" : "text-[10px] sm:text-[11px]",
              )}
            >
              {REVIEW_DASHBOARD.statusLabel}
            </p>
          </div>
          <span
            className={cn(
              "rounded-full border border-teal-400/30 bg-teal-500/10 px-2 py-0.5 font-medium text-teal-200",
              compact ? "text-[8px]" : "text-[9px] sm:text-[10px]",
            )}
          >
            Live review
          </span>
        </div>

        <ol
          className={cn("mt-3 space-y-0", compact ? "mt-2.5" : "mt-4")}
          aria-label="Review progress"
        >
          {REVIEW_DASHBOARD.steps.map((step, index) => (
            <DashboardStepRow
              key={step.id}
              label={step.label}
              status={step.status}
              index={index}
              isLast={index === REVIEW_DASHBOARD.steps.length - 1}
              compact={compact}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>

        <p
          className={cn(
            "mt-3 border-t border-white/10 pt-3 leading-snug text-slate-400",
            compact ? "text-[9px]" : "text-[10px] sm:text-xs",
          )}
        >
          {REVIEW_DASHBOARD.tagline}
        </p>
      </motion.div>
    </div>
  );
}

function DashboardStepRow({
  label,
  status,
  index,
  isLast,
  compact,
  reduceMotion,
}: {
  label: string;
  status: ReviewDashboardStepStatus;
  index: number;
  isLast: boolean;
  compact: boolean;
  reduceMotion: boolean | null;
}) {
  const complete = status === "complete";
  const inProgress = status === "in-progress";

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.07, duration: 0.3 }}
      className="relative flex gap-2.5 pb-3 last:pb-0 sm:gap-3"
    >
      {!isLast ? (
        <span
          className={cn(
            "absolute left-[9px] top-5 w-px sm:left-[10px] sm:top-6",
            compact ? "h-[calc(100%-12px)]" : "h-[calc(100%-16px)]",
            complete ? "bg-teal-500/50" : "bg-white/10",
          )}
          aria-hidden
        />
      ) : null}

      <StepIndicator complete={complete} inProgress={inProgress} compact={compact} reduceMotion={reduceMotion} />

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <p
            className={cn(
              "font-semibold leading-tight",
              compact ? "text-[10px]" : "text-xs sm:text-sm",
              complete || inProgress ? "text-white" : "text-slate-500",
            )}
          >
            {label}
          </p>
          {inProgress ? (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full border border-amber-400/30 bg-amber-500/10 px-1.5 py-px font-medium text-amber-200",
                compact ? "text-[8px]" : "text-[9px]",
              )}
            >
              {!reduceMotion ? (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                </span>
              ) : (
                <span aria-hidden>⏳</span>
              )}
              In progress
            </span>
          ) : null}
        </div>
      </div>
    </motion.li>
  );
}

function StepIndicator({
  complete,
  inProgress,
  compact,
  reduceMotion,
}: {
  complete: boolean;
  inProgress: boolean;
  compact: boolean;
  reduceMotion: boolean | null;
}) {
  const size = compact ? "h-[18px] w-[18px]" : "h-5 w-5 sm:h-[22px] sm:w-[22px]";

  if (complete) {
    return (
      <span
        className={cn(
          "relative z-[1] flex shrink-0 items-center justify-center rounded-full bg-teal-500 text-white shadow-sm shadow-teal-500/30",
          size,
        )}
        aria-hidden
      >
        <svg viewBox="0 0 12 12" className={compact ? "h-2.5 w-2.5" : "h-3 w-3"} fill="none">
          <path
            d="M2.5 6L5 8.5L9.5 3.5"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    );
  }

  if (inProgress) {
    return (
      <span
        className={cn(
          "relative z-[1] flex shrink-0 items-center justify-center rounded-full border-2 border-teal-400/80 bg-teal-500/20",
          size,
        )}
        aria-hidden
      >
        {!reduceMotion ? (
          <span className={cn("rounded-full bg-teal-300", compact ? "h-1.5 w-1.5" : "h-2 w-2")} />
        ) : (
          <span className={compact ? "text-[10px]" : "text-xs"}>⏳</span>
        )}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "relative z-[1] flex shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/5",
        size,
      )}
      aria-hidden
    />
  );
}
