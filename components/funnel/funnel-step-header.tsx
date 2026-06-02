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
    <div className={cn("space-y-3", className)}>
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 className="text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl md:text-[1.75rem]">
          {title}
        </h2>
        {subtitle ? (
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{subtitle}</p>
        ) : null}
      </motion.div>
      {encouragement ? (
        <motion.p
          initial={reduceMotion ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.08 }}
          className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-xs font-medium text-teal-800"
          role="status"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-teal-500" aria-hidden />
          {encouragement}
        </motion.p>
      ) : null}
    </div>
  );
}
