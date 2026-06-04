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

type DashboardVariant = "full" | "compact" | "prominent";

type RequestReviewDashboardProps = {
  phase?: ReviewProcessPhase;
  funnelStep?: number;
  variant?: DashboardVariant;
  className?: string;
};

export function RequestReviewDashboard({
  phase = "intro",
  funnelStep = 1,
  variant = "full",
  className,
}: RequestReviewDashboardProps) {
  const compact = variant === "compact";
  const prominent = variant === "prominent";
  const reduceMotion = useReducedMotion();
  const header = getReviewProcessHeader(phase);
  const tagline = getReviewProcessTagline(phase);
  const steps = getReviewProcessSteps(phase, funnelStep);
  const liveBadge = showLiveReviewBadge(phase);

  return (
    <div
      className={cn(
        "relative flex h-full w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-[#0a1628] to-teal-950",
        compact ? "p-3 sm:p-4" : prominent ? "p-6 sm:p-8 lg:p-9" : "p-5 sm:p-7 lg:p-8",
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
          compact ? "p-3" : prominent ? "p-5 sm:p-6" : "p-4 sm:p-5",
        )}
      >
        <div
          className={cn(
            "flex items-center justify-between gap-2 border-b border-white/15 pb-3",
            prominent && "pb-4",
          )}
        >
          <div className="flex items-center gap-2.5">
            {liveBadge ? (
              <span
                className={cn(
                  "relative shrink-0 rounded-full bg-emerald-400",
                  compact ? "h-2 w-2" : prominent ? "h-2.5 w-2.5" : "h-2 w-2",
                  !reduceMotion && "animate-pulse",
                )}
                aria-hidden
              />
            ) : (
              <span
                className={cn(
                  "shrink-0 rounded-full bg-white/30",
                  compact ? "h-2 w-2" : prominent ? "h-2.5 w-2.5" : "h-2 w-2",
                )}
                aria-hidden
              />
            )}
            <p
              className={cn(
                "font-bold uppercase tracking-[0.16em] text-white",
                compact ? "text-[9px]" : prominent ? "text-xs sm:text-sm" : "text-[10px] sm:text-[11px]",
              )}
            >
              {header}
            </p>
          </div>
          {liveBadge ? (
            <span
              className={cn(
                "rounded-full border border-teal-400/30 bg-teal-500/10 px-2 py-0.5 font-medium text-teal-200",
                compact ? "text-[8px]" : prominent ? "text-[10px] sm:text-xs" : "text-[9px] sm:text-[10px]",
              )}
            >
              Live review
            </span>
          ) : null}
        </div>

        <ol
          className={cn(
            "space-y-0",
            compact ? "mt-2.5" : prominent ? "mt-5" : "mt-4",
          )}
          aria-label="Review progress"
        >
          {steps.map((step, index) => (
            <DashboardStepRow
              key={step.id}
              label={step.label}
              status={step.status}
              index={index}
              isLast={index === steps.length - 1}
              variant={variant}
              reduceMotion={reduceMotion}
            />
          ))}
        </ol>

        <p
          className={cn(
            "border-t border-white/15 pt-3 leading-relaxed text-slate-300",
            compact ? "mt-2.5 text-[9px]" : prominent ? "mt-5 text-xs sm:text-sm" : "mt-3 text-[10px] sm:text-xs text-slate-400",
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
  variant,
  reduceMotion,
}: {
  label: string;
  status: ReviewProcessStepStatus;
  index: number;
  isLast: boolean;
  variant: DashboardVariant;
  reduceMotion: boolean | null;
}) {
  const compact = variant === "compact";
  const prominent = variant === "prominent";
  const complete = status === "complete";
  const inProgress = status === "in-progress";
  const active = status === "active";

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, x: -6 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.07, duration: 0.3 }}
      className={cn(
        "relative flex last:pb-0",
        compact ? "gap-2.5 pb-3" : prominent ? "gap-3.5 pb-4 sm:gap-4 sm:pb-5" : "gap-2.5 pb-3 sm:gap-3",
      )}
    >
      {!isLast ? (
        <span
          className={cn(
            "absolute w-px",
            compact
              ? "left-[9px] top-5 h-[calc(100%-12px)]"
              : prominent
                ? "left-[13px] top-8 h-[calc(100%-18px)] sm:left-[15px] sm:top-9"
                : "left-[9px] top-5 h-[calc(100%-16px)] sm:left-[10px] sm:top-6",
            complete ? "bg-teal-400/60" : "bg-white/15",
          )}
          aria-hidden
        />
      ) : null}

      <StepIndicator
        status={status}
        variant={variant}
        reduceMotion={reduceMotion}
      />

      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <p
            className={cn(
              "font-semibold leading-snug",
              compact ? "text-[10px]" : prominent ? "text-sm sm:text-base" : "text-xs sm:text-sm",
              complete || inProgress || active ? "text-white" : "text-slate-400",
            )}
          >
            {label}
          </p>
          {inProgress ? (
            <StatusBadge variant={variant} reduceMotion={reduceMotion} label="In progress" />
          ) : null}
          {active ? (
            <StatusBadge variant={variant} reduceMotion={reduceMotion} label="Current step" tone="teal" />
          ) : null}
        </div>
      </div>
    </motion.li>
  );
}

function StatusBadge({
  variant,
  reduceMotion,
  label,
  tone = "amber",
}: {
  variant: DashboardVariant;
  reduceMotion: boolean | null;
  label: string;
  tone?: "amber" | "teal";
}) {
  const compact = variant === "compact";
  const prominent = variant === "prominent";
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
        compact ? "text-[8px]" : prominent ? "text-[10px] sm:text-xs" : "text-[9px]",
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
  variant,
  reduceMotion,
}: {
  status: ReviewProcessStepStatus;
  variant: DashboardVariant;
  reduceMotion: boolean | null;
}) {
  const compact = variant === "compact";
  const prominent = variant === "prominent";
  const size = compact
    ? "h-[18px] w-[18px]"
    : prominent
      ? "h-7 w-7 sm:h-8 sm:w-8"
      : "h-5 w-5 sm:h-[22px] sm:w-[22px]";
  const iconSize = compact ? "h-2.5 w-2.5" : prominent ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-3 w-3";
  const dotSize = compact ? "h-1.5 w-1.5" : prominent ? "h-2.5 w-2.5" : "h-2 w-2";

  if (status === "complete") {
    return (
      <span
        className={cn(
          "relative z-[1] flex shrink-0 items-center justify-center rounded-full bg-teal-500 text-white shadow-sm shadow-teal-500/30",
          size,
        )}
        aria-hidden
      >
        <svg viewBox="0 0 12 12" className={iconSize} fill="none">
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
          <span className={cn("rounded-full bg-teal-300", dotSize)} />
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
