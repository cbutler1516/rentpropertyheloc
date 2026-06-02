import { POSITIONING_LINE } from "@/lib/brand-positioning";
import { cn } from "@/lib/cn";

type BrandPillarsProps = {
  className?: string;
  tone?: "dark" | "light";
};

/** Single positioning line — no badge rows. */
export function BrandPillars({ className, tone = "dark" }: BrandPillarsProps) {
  const isDark = tone === "dark";

  return (
    <p
      className={cn(
        "text-[10px] font-semibold uppercase tracking-[0.18em] sm:text-xs",
        isDark ? "text-teal-300/90" : "text-teal-700",
        className,
      )}
    >
      {POSITIONING_LINE}
    </p>
  );
}
