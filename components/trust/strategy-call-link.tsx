"use client";

import { trackCtaClicked } from "@/lib/analytics/conversion-events";
import { BOOKING_URL, BOOK_STRATEGY_CALL_LABEL } from "@/lib/contact";
import { cn } from "@/lib/cn";
import type { ComponentProps, MouseEvent } from "react";

type StrategyCallLinkVariant = "primary" | "secondary" | "ghost" | "inline";
type StrategyCallLinkSize = "sm" | "md" | "lg";

const variantClasses: Record<StrategyCallLinkVariant, string> = {
  primary:
    "inline-flex items-center justify-center rounded-xl bg-teal-700 font-semibold text-white shadow-sm transition hover:bg-teal-800",
  secondary:
    "inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white font-semibold text-slate-800 shadow-sm transition hover:bg-slate-50",
  ghost:
    "inline-flex items-center justify-center font-semibold text-teal-700 underline-offset-2 transition hover:underline",
  inline: "font-semibold text-teal-700 underline-offset-2 transition hover:underline",
};

const variantClassesDark: Partial<Record<StrategyCallLinkVariant, string>> = {
  secondary:
    "inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 font-semibold text-white transition hover:border-white/30 hover:bg-white/10",
};

const sizeClasses: Record<StrategyCallLinkSize, string> = {
  sm: "min-h-[44px] px-5 text-sm",
  md: "min-h-[44px] px-6 text-sm",
  lg: "min-h-[48px] px-6 text-[0.9375rem] sm:px-8 sm:text-base",
};

type StrategyCallLinkProps = Omit<ComponentProps<"a">, "href" | "target" | "rel"> & {
  variant?: StrategyCallLinkVariant;
  size?: StrategyCallLinkSize;
  onDark?: boolean;
  ctaLocation?: string;
};

export function StrategyCallLink({
  className,
  children = BOOK_STRATEGY_CALL_LABEL,
  variant = "primary",
  size = "md",
  onDark = false,
  ctaLocation,
  onClick,
  ...props
}: StrategyCallLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (ctaLocation) {
      trackCtaClicked({
        ctaLocation,
        href: BOOKING_URL,
      });
    }
    onClick?.(event);
  }

  const sized = variant !== "inline";

  return (
    <a
      href={BOOKING_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        variantClasses[variant],
        onDark && variantClassesDark[variant],
        sized && sizeClasses[size],
        className,
      )}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}
