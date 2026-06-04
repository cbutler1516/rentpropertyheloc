"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type FunnelStepHeaderProps = {
  title: string;
  subtitle?: string;
  encouragement?: string | null;
  className?: string;
};

export function FunnelStepHeader({
  title,
  subtitle,
  encouragement,
  className,
}: FunnelStepHeaderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("space-y-2.5 sm:space-y-3", className)}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="funnel-step-title text-balance text-lg font-bold leading-[1.22] tracking-tight text-slate-900 sm:text-xl md:text-2xl lg:text-[1.65rem] lg:leading-[1.25]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 max-w-2xl text-pretty text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem] lg:max-w-3xl lg:text-base">
            {subtitle}
          </p>
        ) : null}
      </motion.div>
      {encouragement ? (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="inline-flex max-w-full items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1 text-[11px] font-medium text-teal-800 sm:text-xs"
          role="status"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-teal-500" aria-hidden />
          <span className="truncate">{encouragement}</span>
        </motion.p>
      ) : null}
    </div>
  );
}
