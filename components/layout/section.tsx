import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";
import { Container } from "./container";

export type SectionTone = "light" | "dark";

type SectionProps = HTMLAttributes<HTMLElement> & {
  id?: string;
  tone?: SectionTone;
  muted?: boolean;
  divider?: boolean;
};

export function Section({
  id,
  tone = "light",
  muted,
  divider = false,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-16 sm:py-20 md:py-24 lg:py-28",
        id && "site-anchor-section",
        tone === "dark" && "bg-navy-950 text-white",
        tone === "light" && !muted && "section-light text-ink",
        tone === "light" && muted && "bg-surface-100/80 text-ink",
        divider &&
          tone === "light" &&
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-slate-200/90 before:to-transparent",
        divider &&
          tone === "dark" &&
          "before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/15 before:to-transparent",
        className,
      )}
      {...props}
    >
      <Container className="max-w-full">{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  tone?: SectionTone;
}) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "mb-12 max-w-2xl sm:mb-14 md:mb-16 lg:max-w-3xl",
        align === "center" ? "mx-auto text-center" : "text-left",
      )}
    >
      {eyebrow ? (
        <p
          className={cn(
            "mb-2.5 text-[10px] font-semibold uppercase tracking-[0.18em] sm:mb-3 sm:text-xs sm:tracking-[0.2em]",
            isLight ? "text-teal-700" : "text-accent-bright",
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl md:leading-tight",
          isLight ? "text-slate-900" : "text-white",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-3 text-sm leading-relaxed sm:mt-4 sm:text-base md:text-lg",
            isLight ? "text-slate-600" : "text-white/75",
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
