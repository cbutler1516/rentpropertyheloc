"use client";

import { cn } from "@/lib/cn";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps } from "react";

type CtaVariant = "primary" | "secondary" | "ghost";
type CtaSize = "sm" | "md" | "lg";

const variantClasses: Record<CtaVariant, string> = {
  primary:
    "bg-accent text-navy-950 shadow-[0_0_24px_rgba(34,211,238,0.35)] hover:bg-accent-bright",
  secondary:
    "border border-white/20 bg-white/5 text-white hover:border-accent/50 hover:bg-white/10",
  ghost: "text-white/80 hover:bg-white/10 hover:text-white",
};

const sizeClasses: Record<CtaSize, string> = {
  sm: "h-11 min-h-[44px] px-4 text-sm",
  md: "h-11 min-h-[44px] px-6 text-sm",
  lg: "h-12 min-h-[48px] px-8 text-base sm:whitespace-nowrap",
};

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: CtaVariant;
  size?: CtaSize;
};

export function CtaLink({
  className,
  variant = "primary",
  size = "md",
  ...props
}: CtaLinkProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="inline-flex w-full sm:w-auto"
      whileHover={reduceMotion ? undefined : { scale: 1.02 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        className={cn(
          "inline-flex w-full items-center justify-center rounded-full text-center font-semibold transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    </motion.div>
  );
}
