"use client";

import { GlassPanel } from "@/components/ui/glass-panel";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

const chips = [
  { label: "Available equity", value: "$124.6K", position: "top-6 right-4 sm:right-8" },
  { label: "Rental income", value: "$3.2K/mo", position: "bottom-20 left-2 sm:left-6" },
  { label: "Status", value: "Review ready", position: "bottom-6 right-6 sm:right-12" },
] as const;

export function HeroFloatingUi({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative hidden min-h-[320px] lg:block", className)}>
      <div className="absolute inset-0 rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-sm" />
      {chips.map((chip, index) => {
        const panel = (
          <GlassPanel className="px-4 py-3">
            <p className="text-[10px] font-medium uppercase tracking-wider text-white/50">
              {chip.label}
            </p>
            <p className="mt-1 text-sm font-semibold text-white">{chip.value}</p>
          </GlassPanel>
        );

        if (reduceMotion) {
          return (
            <div key={chip.label} className={cn("absolute z-10 w-36", chip.position)}>
              {panel}
            </div>
          );
        }

        return (
          <motion.div
            key={chip.label}
            className={cn("absolute z-10 w-36 sm:w-40", chip.position)}
            animate={{ y: [0, index % 2 === 0 ? -8 : 8, 0] }}
            transition={{
              duration: 5 + index,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {panel}
          </motion.div>
        );
      })}
      <div className="absolute inset-8 rounded-2xl border border-dashed border-white/10" aria-hidden />
    </div>
  );
}
