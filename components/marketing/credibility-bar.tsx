import { CREDIBILITY_ITEMS } from "@/lib/brand-positioning";
import { cn } from "@/lib/cn";

type CredibilityBarProps = {
  className?: string;
  tone?: "light" | "dark";
};

export function CredibilityBar({ className, tone = "light" }: CredibilityBarProps) {
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2.5 sm:gap-3",
        className,
      )}
      aria-label="Credibility and licensing"
    >
      {CREDIBILITY_ITEMS.map((item) => (
        <span
          key={item}
          className={cn(
            "inline-flex items-center rounded-full border px-3 py-1.5 text-[10px] font-medium sm:text-[11px]",
            isDark
              ? "border-white/15 bg-white/5 text-white/75"
              : "border-slate-200 bg-white text-slate-600 shadow-sm",
          )}
        >
          {item === "Equal Housing Lender" ? (
            <>
              <span
                className={cn(
                  "mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded border text-[7px] font-bold leading-none",
                  isDark ? "border-white/25 text-white/80" : "border-slate-300 text-slate-500",
                )}
                aria-hidden
              >
                =
              </span>
              {item}
            </>
          ) : (
            item
          )}
        </span>
      ))}
    </div>
  );
}
