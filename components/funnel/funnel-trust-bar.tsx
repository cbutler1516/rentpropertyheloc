import { cn } from "@/lib/cn";

type FunnelTrustBarProps = {
  className?: string;
  compact?: boolean;
  tone?: "light" | "dark";
};

export function FunnelTrustBar({ className, compact, tone = "dark" }: FunnelTrustBarProps) {
  const isLight = tone === "light";

  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3",
        isLight ? "border-slate-200 bg-slate-50" : "border-white/10 bg-white/[0.04]",
        compact && "py-2.5",
        className,
      )}
    >
      <ul
        className={cn(
          "flex flex-col gap-1.5 text-[11px] leading-relaxed sm:flex-row sm:flex-wrap sm:gap-x-5 sm:gap-y-1 sm:text-xs",
          isLight ? "text-slate-600" : "text-white/60",
          compact && "gap-1 text-[10px] sm:text-[11px]",
        )}
      >
        <li className="flex items-center gap-2">
          <span
            className={cn(
              "h-1.5 w-1.5 shrink-0 rounded-full",
              isLight ? "bg-teal-600" : "bg-accent-bright",
            )}
            aria-hidden
          />
          Takes about 60 seconds
        </li>
        <li className="flex items-center gap-2">
          <span
            className={cn("h-1.5 w-1.5 shrink-0 rounded-full", isLight ? "bg-teal-400" : "bg-accent")}
            aria-hidden
          />
          No obligation · Designed for investors
        </li>
      </ul>
      {!compact ? (
        <p
          className={cn(
            "mt-2.5 text-[10px] leading-relaxed sm:text-[11px]",
            isLight ? "text-slate-500" : "text-white/45",
          )}
        >
          Options subject to review and approval. Not a commitment to lend.
        </p>
      ) : null}
    </div>
  );
}
