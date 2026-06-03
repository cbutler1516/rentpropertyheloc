import { CompanyTrustVisual } from "@/components/trust/company-trust-visual";
import { TEAM_TRUST_IMAGE_ALT } from "@/lib/trust-content";
import { cn } from "@/lib/cn";

type TeamTrustVisualProps = {
  className?: string;
  frameClassName?: string;
  priority?: boolean;
  sizes?: string;
  compact?: boolean;
};

export function TeamTrustVisual({
  className,
  frameClassName,
  compact = false,
}: TeamTrustVisualProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden shadow-md ring-1 ring-slate-200/80",
        frameClassName,
        className,
      )}
      role="img"
      aria-label={TEAM_TRUST_IMAGE_ALT}
    >
      <CompanyTrustVisual variant={compact ? "compact" : "full"} className="h-full w-full" />
    </div>
  );
}
