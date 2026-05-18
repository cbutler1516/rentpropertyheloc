import Link from "next/link";
import type { ReactNode } from "react";
import { HeroVideo } from "./hero-video";
import { RevealGroup } from "./reveal-group";
import {
  SportsStrategyLayer,
  type SportsStrategyVariant,
} from "./sports-strategy-layer";
import { TrackedLink } from "./tracked-link";

type Action = {
  label: string;
  href: string;
  variant?: "primary" | "ghost";
};

type BaseProps = {
  className?: string;
};

function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function StrategyVisual({
  variant,
  className,
}: BaseProps & { variant: SportsStrategyVariant }) {
  return <SportsStrategyLayer variant={variant} className={className} />;
}

export function PageHero({
  eyebrow,
  title,
  lead,
  visual,
  videoSrc,
  focusLabel = "Current Focus",
  focus,
  children,
  className,
}: BaseProps & {
  eyebrow: ReactNode;
  title: ReactNode;
  lead: ReactNode;
  visual?: SportsStrategyVariant;
  videoSrc?: string;
  focusLabel?: string;
  focus?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-7xl px-6 pb-28 pt-20 md:px-10 md:pb-36 md:pt-28",
        className,
      )}
    >
      {videoSrc ? <HeroVideo src={videoSrc} loading="eager" /> : null}
      {visual && !videoSrc ? (
        <StrategyVisual variant={visual} className="internal-strategy-visual" />
      ) : null}
      <RevealGroup className="relative z-10 max-w-4xl" stagger={130}>
        <p className="reveal-item font-mono text-xs tracking-[0.4em] text-[#7c3aed] uppercase">
          {eyebrow}
        </p>
        <h1 className="reveal-item mt-6 text-[clamp(2.6rem,6vw,5rem)] leading-[0.96] font-semibold tracking-[-0.04em] text-white">
          {title}
        </h1>
        <p className="reveal-item mt-7 max-w-xl text-lg leading-relaxed text-zinc-400 md:text-xl">
          {lead}
        </p>
        {children}
      </RevealGroup>

      {focus ? (
        <div className="relative z-10 mt-14 border-t border-zinc-900/80 pt-8 md:mt-20 md:pt-10">
          <RevealGroup
            className="grid gap-8 md:grid-cols-[0.7fr_1.3fr] md:gap-16"
            stagger={120}
          >
            <p className="reveal-item font-mono text-[10px] tracking-[0.32em] text-zinc-600 uppercase">
              {focusLabel}
            </p>
            <p className="reveal-item max-w-2xl text-2xl leading-snug tracking-[-0.02em] text-zinc-200 md:text-3xl">
              {focus}
            </p>
          </RevealGroup>
        </div>
      ) : null}
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
  className,
}: BaseProps & {
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <RevealGroup
      className={cn(
        align === "center" && "mx-auto max-w-3xl text-center",
        align === "left" && "max-w-3xl",
        className,
      )}
      stagger={120}
    >
      {eyebrow ? (
        <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="reveal-item mt-5 text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
        {title}
      </h2>
      {lead ? (
        <p className="reveal-item mt-5 max-w-xl text-base leading-relaxed text-zinc-500 md:text-lg">
          {lead}
        </p>
      ) : null}
    </RevealGroup>
  );
}

export function FeatureCard({
  label,
  title,
  body,
  children,
  className,
}: BaseProps & {
  label?: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <article
      className={cn(
        "reveal-item group relative h-full bg-[#050505] p-7 transition-[background-color] duration-[var(--duration-hover)] ease-[var(--ease-soft)] hover:bg-[#0a0a0a] md:p-9",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/0 to-transparent opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100 group-hover:from-[#5b21b6]/[0.06]"
        aria-hidden
      />
      {label ? (
        <p className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          {label}
        </p>
      ) : null}
      <h3 className="relative mt-5 text-2xl font-semibold tracking-[-0.02em] text-white">
        {title}
      </h3>
      {body ? (
        <p className="relative mt-4 text-sm leading-relaxed text-zinc-500 transition-colors duration-[var(--duration-hover)] group-hover:text-zinc-400 md:text-base">
          {body}
        </p>
      ) : null}
      {children ? <div className="relative mt-6">{children}</div> : null}
      <div
        className="relative mt-8 h-px w-10 bg-zinc-800 transition-all duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:w-full group-hover:bg-[#7c3aed]/40"
        aria-hidden
      />
    </article>
  );
}

export function ProcessStep({
  step,
  title,
  body,
  className,
}: BaseProps & {
  step: ReactNode;
  title: ReactNode;
  body: ReactNode;
}) {
  return (
    <FeatureCard
      label={step}
      title={title}
      body={body}
        className={cn("md:p-9", className)}
    />
  );
}

export function StatRow({
  stats,
  className,
}: BaseProps & {
  stats: Array<{ value: ReactNode; label: ReactNode }>;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-3 gap-8 border-t border-zinc-900/80 pt-12 md:max-w-2xl md:gap-10 md:pt-14",
        className,
      )}
      aria-label="Key metrics"
    >
      {stats.map((stat, index) => (
        <div key={index} className="stat-cell cursor-default">
          <p className="stat-value text-3xl font-semibold tracking-tight text-white transition-all duration-500 md:text-4xl">
            {stat.value}
          </p>
          <p className="mt-2 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
            {stat.label}
          </p>
        </div>
      ))}
    </div>
  );
}

export function CTASection({
  eyebrow = "Next Move",
  title,
  body,
  actions,
  children,
  className,
  analyticsSection,
}: BaseProps & {
  eyebrow?: ReactNode;
  title: ReactNode;
  body: ReactNode;
  actions?: Action[];
  children?: ReactNode;
  analyticsSection?: string;
}) {
  return (
    <section
      className={cn(
        "relative mx-auto w-full max-w-7xl px-6 py-28 md:px-10 md:py-36",
        className,
      )}
      data-analytics-section={analyticsSection}
    >
      <RevealGroup
        className="grid gap-10 border-t border-zinc-900/80 pt-10 md:grid-cols-[0.9fr_1.1fr] md:gap-20 md:pt-14"
        stagger={130}
      >
        <div>
          <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
            {eyebrow}
          </p>
          <h2 className="reveal-item mt-5 text-4xl font-semibold tracking-[-0.03em] text-white md:text-5xl">
            {title}
          </h2>
        </div>
        <div className="flex flex-col justify-center">
          <p className="reveal-item max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            {body}
          </p>
          {actions?.length ? (
            <div className="reveal-item mt-10 flex flex-wrap gap-4">
              {actions.map((action) => (
                <TrackedLink
                  key={`${action.href}-${action.label}`}
                  href={action.href}
                  location="cta_section"
                  className={cn(
                    "inline-flex h-14 w-fit items-center justify-center px-8 text-sm font-medium tracking-wide",
                    action.variant === "primary"
                      ? "btn-primary bg-white text-black hover:bg-zinc-100"
                      : "btn-ghost border border-zinc-800 text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white",
                  )}
                >
                  {action.label}
                </TrackedLink>
              ))}
            </div>
          ) : null}
          {children}
        </div>
      </RevealGroup>
    </section>
  );
}

export function ArticleCard({
  label,
  title,
  excerpt,
  href,
  className,
}: BaseProps & {
  label?: ReactNode;
  title: ReactNode;
  excerpt: ReactNode;
  href: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "reveal-item card-lift group relative flex h-full flex-col border border-zinc-900/80 bg-[#050505] p-9 md:p-11",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[var(--duration-hover)] group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(ellipse at top left, rgba(91, 33, 182, 0.12), transparent 60%)",
        }}
        aria-hidden
      />
      {label ? (
        <span className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
          {label}
        </span>
      ) : null}
      <h3 className="relative mt-7 text-2xl font-semibold text-white transition-transform duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:translate-x-0.5">
        {title}
      </h3>
      <p className="relative mt-5 flex-1 leading-relaxed text-zinc-500 transition-[color] duration-[var(--duration-hover)] group-hover:text-zinc-400">
        {excerpt}
      </p>
      <span className="relative mt-10 inline-flex items-center gap-2 text-sm font-medium text-white opacity-0 transition-all duration-[var(--duration-hover)] ease-[var(--ease-premium)] group-hover:translate-x-1 group-hover:opacity-100">
        Read more
        <span className="text-[#7c3aed]" aria-hidden>
          →
        </span>
      </span>
    </Link>
  );
}
