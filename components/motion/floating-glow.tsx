"use client";

import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

export function FloatingGlow({
  className,
  color = "cyan",
}: {
  className?: string;
  color?: "cyan" | "green";
}) {
  const reduceMotion = useReducedMotion();
  const bg =
    color === "cyan"
      ? "bg-[radial-gradient(circle,rgba(34,211,238,0.35)_0%,transparent_70%)]"
      : "bg-[radial-gradient(circle,rgba(74,222,128,0.28)_0%,transparent_70%)]";

  if (reduceMotion) {
    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute blur-3xl", bg, className)}
      />
    );
  }

  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute blur-3xl", bg, className)}
      animate={{ y: [0, -18, 0], opacity: [0.55, 0.85, 0.55] }}
      transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}
