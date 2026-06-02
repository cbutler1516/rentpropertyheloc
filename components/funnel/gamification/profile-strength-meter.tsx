"use client";

import {
  MAX_PROFILE_STRENGTH,
  getProfileStrengthLabel,
} from "@/lib/leads/investor-review-gamification";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";
import { useId } from "react";

type ProfileStrengthMeterProps = {
  strength: number;
  size?: "md" | "lg";
  className?: string;
  celebrate?: boolean;
};

export function ProfileStrengthMeter({
  strength,
  size = "md",
  className,
  celebrate = false,
}: ProfileStrengthMeterProps) {
  const reduceMotion = useReducedMotion();
  const gradientId = useId().replace(/:/g, "");
  const clamped = Math.max(0, Math.min(MAX_PROFILE_STRENGTH, strength));
  const progress = clamped / MAX_PROFILE_STRENGTH;
  const label = getProfileStrengthLabel(clamped);
  const isComplete = clamped >= MAX_PROFILE_STRENGTH;
  const dimension = size === "lg" ? 120 : 96;
  const stroke = size === "lg" ? 7 : 6;
  const radius = (dimension - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - progress);

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={cn("mx-auto shrink-0 sm:mx-0", className)}
      aria-label={`Profile strength ${clamped} percent. ${label}`}
    >
      <motion.div
        animate={
          isComplete && celebrate && !reduceMotion
            ? { boxShadow: ["0 0 0 0 rgba(52,211,153,0.4)", "0 0 0 12px rgba(52,211,153,0)"] }
            : {}
        }
        transition={{ duration: 1.2, repeat: isComplete && celebrate ? 2 : 0 }}
        className="relative rounded-full"
      >
        <div className="relative" style={{ width: dimension, height: dimension }}>
          <svg width={dimension} height={dimension} className="-rotate-90" aria-hidden>
            <circle
              cx={dimension / 2}
              cy={dimension / 2}
              r={radius}
              fill="none"
              stroke={celebrate ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.12)"}
              strokeWidth={stroke}
            />
            <motion.circle
              cx={dimension / 2}
              cy={dimension / 2}
              r={radius}
              fill="none"
              stroke={`url(#${gradientId})`}
              strokeWidth={stroke}
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={reduceMotion ? false : { strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{
                duration: reduceMotion ? 0 : 0.85,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.1,
              }}
            />
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={isComplete ? "#fde68a" : "#5eead4"} />
                <stop offset="100%" stopColor={isComplete ? "#34d399" : "#34d399"} />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-1">
            <p className="text-[8px] font-semibold uppercase tracking-wide text-teal-200/80 sm:text-[9px]">
              {isComplete ? "Complete" : "Strength"}
            </p>
            <motion.p
              key={clamped}
              initial={reduceMotion ? false : { scale: 0.85, opacity: 0.6 }}
              animate={{ scale: isComplete ? [1, 1.08, 1] : 1, opacity: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.4 }}
              className={cn(
                "font-bold tabular-nums leading-none",
                isComplete ? "text-amber-100" : "text-white",
                size === "lg" ? "text-3xl" : "text-2xl",
              )}
            >
              {clamped}%
            </motion.p>
          </div>
        </div>
      </motion.div>
      <p className="mt-1.5 text-center text-[10px] font-semibold uppercase tracking-wide text-teal-200/80 sm:text-left">
        Profile Strength
      </p>
      <p
        className={cn(
          "mt-0.5 text-center text-[11px] font-medium sm:text-left",
          isComplete ? "text-amber-100" : "text-teal-100",
        )}
      >
        {label}
      </p>
    </motion.div>
  );
}

export function ProfileStrengthBar({
  strength,
  className,
  variant = "dark",
}: {
  strength: number;
  className?: string;
  variant?: "dark" | "light";
}) {
  const reduceMotion = useReducedMotion();
  const clamped = Math.max(0, Math.min(MAX_PROFILE_STRENGTH, strength));
  const isComplete = clamped >= MAX_PROFILE_STRENGTH;
  const isLight = variant === "light";

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-2">
        <p
          className={cn(
            "text-[10px] font-semibold uppercase tracking-[0.14em]",
            isLight ? "text-teal-800" : "text-teal-200/80",
          )}
        >
          Profile strength
        </p>
        <motion.span
          key={clamped}
          initial={reduceMotion ? false : { scale: 1.15 }}
          animate={{ scale: 1 }}
          className={cn(
            "text-xs font-bold tabular-nums",
            isComplete ? "text-amber-600" : isLight ? "text-teal-900" : "text-teal-100",
          )}
        >
          {clamped}%
        </motion.span>
      </div>
      <div
        className={cn(
          "h-2 overflow-hidden rounded-full",
          isLight ? "bg-teal-100" : "bg-white/10",
        )}
      >
        <motion.div
          className={cn(
            "h-full rounded-full",
            isComplete
              ? "bg-gradient-to-r from-amber-300 via-teal-300 to-emerald-400"
              : "bg-gradient-to-r from-teal-300 to-emerald-300",
          )}
          initial={reduceMotion ? false : { width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

export function ProfileStrengthBoostToast({
  message,
  className,
}: {
  message: string;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.p
      initial={reduceMotion ? false : { opacity: 0, y: -4, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -4 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 shadow-sm",
        className,
      )}
      role="status"
    >
      <span aria-hidden>↑</span> {message}
    </motion.p>
  );
}
