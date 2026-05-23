import { LogoMark } from "@/components/brand/logo-mark";
import { cn } from "@/lib/cn";
import { BRAND, type LogoVariant } from "@/lib/brand";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
};

function Wordmark({
  stacked = false,
  light = false,
}: {
  stacked?: boolean;
  light?: boolean;
}) {
  const line1 = light ? "text-navy-950" : "text-white";
  const line2 = light ? "text-navy-800" : "text-white/90";
  const accent = light ? "text-accent" : "text-gradient-brand";

  if (stacked) {
    return (
      <div className="flex flex-col leading-none">
        <span className={cn("text-sm font-bold tracking-[0.2em]", line1)}>RENT</span>
        <span className={cn("mt-1 text-sm font-bold tracking-[0.2em]", line2)}>PROPERTY</span>
        <span className={cn("mt-1 text-sm font-bold tracking-[0.22em]", accent)}>HELOC</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col leading-tight sm:leading-none">
      <span className={cn("text-[11px] font-bold tracking-[0.28em] sm:text-xs", line1)}>
        RENT <span className={line2}>PROPERTY</span>
      </span>
      <span className={cn("text-sm font-bold tracking-[0.2em] sm:text-base", accent)}>HELOC</span>
    </div>
  );
}

export function Logo({ variant = "navbar", className }: LogoProps) {
  const light = variant === "light";
  const mono = variant === "monochrome";
  const markVariant = light ? "light" : mono ? "monochrome" : "color";

  if (variant === "icon") {
    return (
      <span className={cn("inline-flex", className)} aria-label={BRAND.name}>
        <LogoMark size={48} variant={markVariant} />
      </span>
    );
  }

  if (variant === "horizontal") {
    return (
      <span className={cn("inline-flex items-center gap-3", className)} aria-label={BRAND.name}>
        <LogoMark size={44} variant={markVariant} />
        <Wordmark light={light} />
      </span>
    );
  }

  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex items-center gap-4", className)} aria-label={BRAND.name}>
        <LogoMark size={52} variant={markVariant} />
        <Wordmark stacked light={light} />
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-3",
        variant === "navbar" && "gap-2.5",
        className,
      )}
      aria-label={BRAND.name}
    >
      <LogoMark size={variant === "navbar" ? 36 : 44} variant={markVariant} />
      <Wordmark light={light} />
    </span>
  );
}
