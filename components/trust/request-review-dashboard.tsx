"use client";

import {
  getReviewProcessHeader,
  getReviewProcessSteps,
  getReviewProcessTagline,
  showLiveReviewBadge,
  type ReviewProcessPhase,
  type ReviewProcessStepStatus,
} from "@/lib/trust/review-process";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type RequestReviewDashboardProps = {
  phase?: ReviewProcessPhase;
  funnelStep?: number;
  variant?: "full" | "compact";
  className?: string;
};

export function RequestReviewDashboard({
  phase = "intro",
  funnelStep = 1,
  variant = "full",
  className,
}: RequestReviewDashboardProps) {
  const compact = variant === "compact";
  const reduceMotion = useReducedMotion();
  const header = getReviewProcessHeader(phase);
  const tagline = getReviewProcessTagline(phase);
  const steps = getReviewProcessSteps(phase, funnelStep);
  const liveBadge = showLiveReviewBadge(phase);

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
            {liveBadge ? (
              <span
                className={cn(
                  "relative flex h-2 w-2 shrink-0 rounded-full bg-emerald-400",
                  !reduceMotion && "animate-pulse",
                )}
                aria-hidden
              />
            ) : (
              <span
                className="flex h-2 w-2 shrink-0 rounded-full bg-white/25"
                aria-hidden
              />
            )}
            <p
              className={cn(
                "font-bold uppercase tracking-[0.16em] text-white",
                compact ? "text-[9px]" : "text-[10px] sm:text-[11px]",
              )}
            >
              {header}
            </p>
          </div>
          {liveBadge ? (
            <span
              className={cn(
                "rounded-full border border-teal-400/30 bg-teal-500/10 px-2 py-0.5 font-medium text-teal-200",
                compact ? "text-[8px]" : "text-[9px] sm:text-[10px]",
              )}
            >
              Live review
            </span>
          ) : null}
        </div>

        <ol
          className={cn("mt-3 space-y-0", compact ? "mt-2.5" : "mt-4")}
          aria-label="Review progress"
        >
          {steps.map((step, index) => (
            <DashboardStepRow
              key={step.id}
              label={step.label}
              status={step.status}
              index={index}
              isLast={index === steps.length - 1}
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
          {tagline}
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
  status: ReviewProcessStepStatus;
  index: number;
  isLast: boolean;
  compact: boolean;
  reduceMotion: boolean | null;
}) {
  const complete = status === "complete";
  const inProgress = status === "in-progress";
  const active = status === "active";

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

      <StepIndicator
        status={status}
        compact={compact}
        reduceMotion={reduceMotion}
      />

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <p
            className={cn(
              "font-semibold leading-tight",
              compact ? "text-[10px]" : "text-xs sm:text-sm",
              complete || inProgress || active ? "text-white" : "text-slate-500",
            )}
          >
            {label}
          </p>
          {inProgress ? (
            <StatusBadge compact={compact} reduceMotion={reduceMotion} label="In progress" />
          ) : null}
          {active ? (
            <StatusBadge compact={compact} reduceMotion={reduceMotion} label="Current step" tone="teal" />
          ) : null}
        </div>
      </div>
    </motion.li>
  );
}

function StatusBadge({
  compact,
  reduceMotion,
  label,
  tone = "amber",
}: {
  compact: boolean;
  reduceMotion: boolean | null;
  label: string;
  tone?: "amber" | "teal";
}) {
  const toneClasses =
    tone === "teal"
      ? "border-teal-400/30 bg-teal-500/10 text-teal-200"
      : "border-amber-400/30 bg-amber-500/10 text-amber-200";
  const dotClass = tone === "teal" ? "bg-teal-300" : "bg-amber-400";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-1.5 py-px font-medium",
        toneClasses,
        compact ? "text-[8px]" : "text-[9px]",
      )}
    >
      {!reduceMotion ? (
        <span className="relative flex h-1.5 w-1.5">
          <span
            className={cn(
              "absolute inline-flex h-full w-full animate-ping rounded-full opacity-60",
              dotClass,
            )}
          />
          <span className={cn("relative inline-flex h-1.5 w-1.5 rounded-full", dotClass)} />
        </span>
      ) : (
        <span aria-hidden>⏳</span>
      )}
      {label}
    </span>
  );
}

function StepIndicator({
  status,
  compact,
  reduceMotion,
}: {
  status: ReviewProcessStepStatus;
  compact: boolean;
  reduceMotion: boolean | null;
}) {
  const size = compact ? "h-[18px] w-[18px]" : "h-5 w-5 sm:h-[22px] sm:w-[22px]";

  if (status === "complete") {
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

  if (status === "in-progress" || status === "active") {
    return (
      <span
        className={cn(
          "relative z-[1] flex shrink-0 items-center justify-center rounded-full border-2 bg-teal-500/20",
          status === "active" ? "border-teal-300/90" : "border-teal-400/80",
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
