"use client";

import { BrandPillars } from "@/components/marketing/brand-pillars";
import { FUNNEL_INTRO_COPY } from "@/lib/brand-positioning";
import { motion, useReducedMotion } from "framer-motion";

export function FunnelIntro() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="mb-4 text-center sm:mb-5"
    >
      <BrandPillars tone="light" className="mb-3" />
      <h1 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl md:text-2xl">
        {FUNNEL_INTRO_COPY}
      </h1>
      <p className="mt-1.5 text-xs text-slate-500 sm:text-sm">~60 seconds · No obligation</p>
    </motion.div>
  );
}
