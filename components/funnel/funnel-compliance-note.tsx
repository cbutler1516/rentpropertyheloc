import { FUNNEL_COMPLIANCE_DISCLAIMER } from "@/lib/legal/compliance";
import { cn } from "@/lib/cn";

type FunnelComplianceNoteProps = {
  className?: string;
};

export function FunnelComplianceNote({ className }: FunnelComplianceNoteProps) {
  return (
    <p className={cn("text-[11px] leading-relaxed text-slate-400", className)}>
      {FUNNEL_COMPLIANCE_DISCLAIMER}
    </p>
  );
}
