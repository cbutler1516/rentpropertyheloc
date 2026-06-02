"use client";

import {
  getProfileStrengthNextUnlockLabel,
  isProfileComplete,
  MAX_PROFILE_STRENGTH,
} from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";
import { motion } from "framer-motion";

type PostSubmitProfileStrengthProps = {
  strength: number;
  className?: string;
  variant?: "panel" | "inline";
};

const ENRICHMENT_PROGRESS_HELPER =
  "Complete a few quick questions to help us review your financing options.";

export function PostSubmitProfileStrength({
  strength,
  className,
  variant = "panel",
}: PostSubmitProfileStrengthProps) {
  const complete = isProfileComplete(strength);
  const nextLabel = getProfileStrengthNextUnlockLabel(strength);

  if (variant === "inline") {
    return (
      <div className={cn("rounded-xl border border-slate-200/80 bg-slate-50/60 p-3.5", className)}>
        <p className="text-sm font-semibold text-slate-900">
          Profile {strength}% Complete
        </p>
        <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-teal-100">
          <motion.div
            className={cn(
              "h-full rounded-full",
              complete ? "bg-gradient-to-r from-teal-500 to-emerald-500" : "bg-teal-600",
            )}
            initial={false}
            animate={{ width: `${Math.min(strength, MAX_PROFILE_STRENGTH)}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <p className="mt-2 text-xs leading-relaxed text-slate-500">
          {ENRICHMENT_PROGRESS_HELPER}
        </p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/90 bg-white p-4 shadow-sm sm:p-5",
        className,
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-500">
        Profile strength
      </p>
      <div className="mt-3 flex items-baseline justify-between gap-2">
        <span
          className={cn(
            "text-3xl font-bold tabular-nums tracking-tight",
            complete ? "text-amber-700" : "text-teal-900",
          )}
        >
          {strength}%
        </span>
      </div>
      <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-teal-100">
        <motion.div
          className={cn(
            "h-full rounded-full",
            complete
              ? "bg-gradient-to-r from-amber-400 via-teal-400 to-emerald-500"
              : "bg-gradient-to-r from-teal-500 to-teal-600",
          )}
          initial={false}
          animate={{ width: `${Math.min(strength, MAX_PROFILE_STRENGTH)}%` }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <p
        className={cn(
          "mt-3 text-sm leading-snug",
          complete ? "font-semibold text-amber-800" : "text-slate-600",
        )}
      >
        {nextLabel}
      </p>
    </div>
  );
}
