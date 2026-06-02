import { cn } from "@/lib/cn";

type WordmarkProps = {
  stacked?: boolean;
  light?: boolean;
  compact?: boolean;
  showAccentBar?: boolean;
  className?: string;
};

export function Wordmark({
  stacked = false,
  light = false,
  compact = false,
  showAccentBar = false,
  className,
}: WordmarkProps) {
  const line1 = light ? "text-navy-950" : "text-white";
  const line2 = light ? "text-navy-800" : "text-white/90";
  const accent = light ? "text-accent" : "text-gradient-brand";

  if (compact) {
    return (
      <span
        className={cn(
          "text-[10px] font-bold uppercase tracking-[0.22em] sm:text-[11px]",
          line1,
          className,
        )}
      >
        Rent Property <span className={accent}>HELOC</span>
      </span>
    );
  }

  if (stacked) {
    return (
      <div className={cn("flex flex-col leading-none", className)}>
        <span className={cn("text-sm font-bold tracking-[0.2em]", line1)}>RENT</span>
        <span className={cn("mt-1 text-sm font-bold tracking-[0.2em]", line2)}>PROPERTY</span>
        <span className={cn("mt-1 text-sm font-bold tracking-[0.22em]", accent)}>HELOC</span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col leading-tight sm:leading-none",
        showAccentBar && "border-l-2 border-accent pl-3",
        className,
      )}
    >
      <span className={cn("text-[11px] font-bold tracking-[0.28em] sm:text-xs", line1)}>
        RENT <span className={line2}>PROPERTY</span>
      </span>
      <span className={cn("text-sm font-bold tracking-[0.2em] sm:text-base", accent)}>HELOC</span>
    </div>
  );
}
