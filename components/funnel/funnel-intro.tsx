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
      className="mx-auto mb-3 max-w-2xl text-center sm:mb-4 lg:mb-5 lg:max-w-3xl"
    >
      <BrandPillars tone="light" className="mb-2.5 sm:mb-3" />
      <h1 className="text-balance text-lg font-bold tracking-tight text-slate-900 sm:text-xl lg:text-2xl">
        {FUNNEL_INTRO_COPY}
      </h1>
      <p className="mt-1 text-xs text-slate-500 sm:text-sm">~60 seconds · No obligation</p>
    </motion.div>
  );
}
