import { HERO_TRUST_ITEMS } from "@/lib/marketing/content";
import { cn } from "@/lib/cn";

type HeroTrustStripProps = {
  className?: string;
  tone?: "dark" | "light";
};

export function HeroTrustStrip({ className, tone = "dark" }: HeroTrustStripProps) {
  const isDark = tone === "dark";

  return (
    <ul
      className={cn(
        "flex flex-wrap gap-x-3 gap-y-2 sm:gap-x-4",
        className,
      )}
      aria-label="Investor reassurance highlights"
    >
      {HERO_TRUST_ITEMS.map((item) => (
        <li
          key={item}
          className={cn(
            "inline-flex items-center gap-1.5 text-[11px] leading-snug sm:text-xs",
            isDark ? "text-white/70" : "text-slate-600",
          )}
        >
          <span
            className={cn(
              "h-1 w-1 shrink-0 rounded-full",
              isDark ? "bg-teal-400/80" : "bg-teal-600",
            )}
            aria-hidden
          />
          {item}
        </li>
      ))}
    </ul>
  );
}
