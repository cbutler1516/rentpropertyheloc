import { PhoneLink } from "@/components/trust/phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { ADVISOR } from "@/lib/trust-content";
import { cn } from "@/lib/cn";

type CompactReviewSummaryProps = {
  propertyAddress: string;
  requestedFunds: string;
  showPriority: boolean;
  className?: string;
};

export function CompactReviewSummary({
  propertyAddress,
  requestedFunds,
  showPriority,
  className,
}: CompactReviewSummaryProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/90 bg-slate-50/70 p-3.5 text-sm shadow-sm",
        className,
      )}
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-teal-800">
        <span
          aria-hidden
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-[10px] text-white"
        >
          ✓
        </span>
        Review Started
      </p>
      <dl className="mt-3 space-y-2.5">
        <SummaryItem label="Property" value={propertyAddress} />
        <SummaryItem label="Requested Funds" value={requestedFunds || "On file"} />
        <SummaryItem
          label="Priority Review Status"
          value={showPriority ? "Active" : "Standard"}
        />
      </dl>
    </div>
  );
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-[11px] font-medium uppercase tracking-wide text-slate-500">{label}</dt>
      <dd className="mt-0.5 text-sm leading-snug text-slate-800">{value}</dd>
    </div>
  );
}

type EnrichmentAdvisorHelpProps = {
  className?: string;
};

export function EnrichmentAdvisorHelp({ className }: EnrichmentAdvisorHelpProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/90 bg-white p-3.5 text-sm shadow-sm",
        className,
      )}
    >
      <p className="text-sm font-semibold text-slate-900">Need help?</p>
      <div className="mt-2.5 flex flex-col gap-2">
        <StrategyCallLink size="sm" className="w-full justify-center" ctaLocation="enrichment-advisor-help" />
        <PhoneLink
          size="sm"
          showIcon={false}
          label={`Call ${ADVISOR.phone}`}
          className="inline-flex min-h-[40px] w-full items-center justify-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-xs font-semibold text-slate-800 no-underline transition hover:bg-slate-100"
        />
      </div>
    </div>
  );
}
