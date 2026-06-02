"use client";

import { ENRICHMENT_BENEFIT_CARDS } from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type EnrichmentBenefitCardsProps = {
  className?: string;
  compact?: boolean;
};

export function EnrichmentBenefitCards({ className, compact }: EnrichmentBenefitCardsProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4",
        className,
      )}
    >
      {ENRICHMENT_BENEFIT_CARDS.map((card, index) => (
        <motion.div
          key={card.id}
          initial={reduceMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : index * 0.05, duration: 0.25 }}
          className={cn(
            "rounded-xl border border-slate-200/90 bg-white shadow-sm",
            compact ? "px-3 py-2.5" : "px-3 py-3 sm:px-3.5 sm:py-3.5",
          )}
        >
          <span className={cn("block", compact ? "text-lg" : "text-xl")} aria-hidden>
            {card.icon}
          </span>
          <p
            className={cn(
              "mt-1 font-semibold leading-tight text-slate-900",
              compact ? "text-[11px]" : "text-[11px] sm:text-xs",
            )}
          >
            {card.title}
          </p>
          {card.line ? (
            <p className="mt-0.5 text-[10px] leading-snug text-slate-500">{card.line}</p>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
