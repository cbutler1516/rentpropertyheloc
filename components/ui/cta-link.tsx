"use client";

import { trackCtaClicked } from "@/lib/analytics/conversion-events";
import { cn } from "@/lib/cn";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { ComponentProps, MouseEvent } from "react";

type CtaVariant = "primary" | "secondary" | "ghost";
type CtaSize = "sm" | "md" | "lg";

const variantClasses: Record<CtaVariant, string> = {
  primary:
    "bg-brand-gradient bg-brand-gradient-hover text-brand-navy shadow-[0_1px_2px_rgba(15,23,42,0.06),0_4px_14px_rgba(23,212,212,0.28)] hover:brightness-105 active:brightness-95",
  secondary:
    "border border-slate-200 bg-white text-slate-700 hover:border-brand-secondary/40 hover:bg-slate-50",
  ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
};

const variantClassesDark: Partial<Record<CtaVariant, string>> = {
  primary:
    "bg-brand-gradient bg-brand-gradient-hover text-brand-navy shadow-[0_4px_20px_rgba(23,212,212,0.3)] hover:brightness-110",
  ghost: "text-white/70 hover:bg-white/10 hover:text-white",
  secondary:
    "border border-white/15 bg-white/5 text-white/80 hover:border-white/25 hover:bg-white/10",
};

const sizeClasses: Record<CtaSize, string> = {
  sm: "min-h-[44px] h-11 px-5 text-sm",
  md: "min-h-[44px] h-11 px-6 text-sm",
  lg: "min-h-[48px] h-12 px-6 text-[0.9375rem] sm:px-8 sm:text-base",
};

type CtaLinkProps = ComponentProps<typeof Link> & {
  variant?: CtaVariant;
  size?: CtaSize;
  onDark?: boolean;
  /** When set, fires cta_clicked for conversion / retargeting audiences */
  ctaLocation?: string;
};

export function CtaLink({
  className,
  variant = "primary",
  size = "md",
  onDark = false,
  ctaLocation,
  onClick,
  href,
  ...props
}: CtaLinkProps) {
  const reduceMotion = useReducedMotion();

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (ctaLocation) {
      trackCtaClicked({
        ctaLocation,
        href: typeof href === "string" ? href : undefined,
      });
    }
    onClick?.(event);
  }

  return (
    <motion.div
      className="flex w-full sm:inline-flex sm:w-auto"
      whileHover={reduceMotion ? undefined : { scale: 1.01 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.15 }}
    >
      <Link
        className={cn(
          "inline-flex w-full items-center justify-center rounded-full text-center font-semibold transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
          onDark && variantClassesDark[variant]
            ? variantClassesDark[variant]
            : variantClasses[variant],
          !onDark && variant === "primary" && "text-brand-navy",
          sizeClasses[size],
          className,
        )}
        href={href}
        onClick={handleClick}
        {...props}
      />
    </motion.div>
  );
}
