"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type FunnelOptionCardProps = {
  label: string;
  badge?: string;
  selected?: boolean;
  pending?: boolean;
  onSelect: () => void;
  className?: string;
};

export function FunnelOptionCard({
  label,
  badge,
  selected,
  pending,
  onSelect,
  className,
}: FunnelOptionCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      disabled={pending}
      whileTap={reduceMotion ? undefined : { scale: 0.99 }}
      className={cn(
        "funnel-tap-target group relative flex min-h-[56px] w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-all duration-150 sm:py-4",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600",
        selected || pending
          ? "border-teal-500 bg-teal-50/80 shadow-[0_0_0_1px_rgba(13,148,136,0.18),0_2px_8px_rgba(13,148,136,0.08)]"
          : "border-slate-200 bg-white shadow-sm hover:border-teal-300 hover:bg-slate-50/60 hover:shadow-md",
        pending && "pointer-events-none",
        className,
      )}
    >
      <span className="flex min-w-0 flex-col gap-0.5 pr-3">
        <span className="text-base font-semibold text-slate-900">{label}</span>
        {badge ? (
          <span className="text-[11px] font-medium leading-snug text-slate-500 group-hover:text-teal-700 transition-colors">
            {badge}
          </span>
        ) : null}
      </span>
      <span
        className={cn(
          "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition",
          selected || pending
            ? "border-teal-600 bg-teal-600 text-white"
            : "border-slate-300 bg-white text-transparent group-hover:border-teal-400",
        )}
        aria-hidden
      >
        ✓
      </span>
    </motion.button>
  );
}
