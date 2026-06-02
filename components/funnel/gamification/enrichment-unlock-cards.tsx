"use client";

import {
  ENRICHMENT_UNLOCK_CARDS,
  isUnlockCardUnlocked,
  type EnrichmentUnlockCard,
} from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type EnrichmentUnlockCardsProps = {
  data: Record<string, string | undefined>;
  className?: string;
  compact?: boolean;
  variant?: "light" | "dark";
};

export function EnrichmentUnlockCards({
  data,
  className,
  compact,
  variant = "light",
}: EnrichmentUnlockCardsProps) {
  const reduceMotion = useReducedMotion();
  const isDark = variant === "dark";

  return (
    <div className={cn("grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-4", className)}>
      {ENRICHMENT_UNLOCK_CARDS.map((card, index) => (
        <UnlockCard
          key={card.id}
          card={card}
          unlocked={isUnlockCardUnlocked(card, data)}
          index={index}
          compact={compact}
          isDark={isDark}
          reduceMotion={reduceMotion}
        />
      ))}
    </div>
  );
}

function UnlockCard({
  card,
  unlocked,
  index,
  compact,
  isDark,
  reduceMotion,
}: {
  card: EnrichmentUnlockCard;
  unlocked: boolean;
  index: number;
  compact?: boolean;
  isDark: boolean;
  reduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: reduceMotion ? 0 : index * 0.05, duration: 0.25 }}
      className={cn(
        "rounded-xl border px-3 py-2.5 transition sm:px-3.5 sm:py-3",
        compact && "py-2.5",
        isDark
          ? unlocked
            ? "border-teal-300/30 bg-teal-400/10"
            : "border-white/10 bg-white/5 opacity-75"
          : unlocked
            ? "border-teal-200 bg-teal-50/80 shadow-sm"
            : "border-slate-200/90 bg-slate-50/80 opacity-80",
      )}
    >
      <div className="flex items-start justify-between gap-1">
        <span className={cn("block", compact ? "text-lg" : "text-xl")} aria-hidden>
          {card.icon}
        </span>
        <span
          className={cn(
            "rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide",
            unlocked
              ? isDark
                ? "bg-teal-400/20 text-teal-100"
                : "bg-teal-100 text-teal-800"
              : isDark
                ? "bg-white/10 text-teal-200/60"
                : "bg-slate-200/80 text-slate-500",
          )}
        >
          {unlocked ? "Unlocked" : "Locked"}
        </span>
      </div>
      <p
        className={cn(
          "mt-1 font-semibold leading-tight",
          compact ? "text-[11px]" : "text-[11px] sm:text-xs",
          isDark ? "text-white" : unlocked ? "text-teal-900" : "text-slate-700",
        )}
      >
        {card.title}
      </p>
      <p
        className={cn(
          "mt-0.5 text-[10px] leading-snug",
          isDark ? "text-teal-100/70" : "text-slate-500",
        )}
      >
        {unlocked ? card.line : "Complete more details to unlock"}
      </p>
    </motion.div>
  );
}
