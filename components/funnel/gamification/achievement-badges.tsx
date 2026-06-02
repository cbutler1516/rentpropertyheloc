"use client";

import type { AchievementBadge } from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type AchievementBadgesProps = {
  badges: AchievementBadge[];
  className?: string;
};

export function AchievementBadges({ badges, className }: AchievementBadgesProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("flex flex-wrap gap-2", className)} aria-label="Achievements unlocked">
      {badges.map((badge, index) => (
        <motion.div
          key={badge.id}
          initial={reduceMotion ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: reduceMotion ? 0 : index * 0.05, duration: 0.25 }}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[11px] font-semibold sm:text-xs",
            badge.unlocked
              ? "border-teal-200 bg-teal-50 text-teal-900"
              : "border-slate-200 bg-slate-50 text-slate-400",
          )}
        >
          <span aria-hidden>{badge.icon}</span>
          <span>{badge.label}</span>
          {badge.unlocked ? (
            <span className="text-teal-600" aria-hidden>
              ✓
            </span>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
