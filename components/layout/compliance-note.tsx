import { cn } from "@/lib/cn";
import type { SectionTone } from "@/components/layout/section";

export function ComplianceNote({
  children,
  className,
  tone = "light",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: SectionTone;
}) {
  return (
    <p
      className={cn(
        "text-xs leading-relaxed sm:text-[0.8125rem]",
        tone === "light" ? "text-slate-500" : "text-white/55",
        className,
      )}
    >
      {children}
    </p>
  );
}
