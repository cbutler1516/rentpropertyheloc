import { CTA_REASSURANCE } from "@/lib/cta";
import { cn } from "@/lib/cn";

type CtaReassuranceProps = {
  className?: string;
  tone?: "light" | "dark" | "muted";
  align?: "left" | "center";
};

export function CtaReassurance({
  className,
  tone = "muted",
  align = "center",
}: CtaReassuranceProps) {
  return (
    <p
      className={cn(
        "text-[11px] leading-relaxed sm:text-xs",
        align === "center" && "text-center",
        tone === "dark" && "text-white/65",
        tone === "light" && "text-slate-600",
        tone === "muted" && "text-slate-500",
        className,
      )}
    >
      {CTA_REASSURANCE}
    </p>
  );
}
