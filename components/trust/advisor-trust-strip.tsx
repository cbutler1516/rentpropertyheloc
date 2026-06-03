"use client";

import { PhoneLink } from "@/components/trust/phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { CALL_OUR_TEAM_LABEL } from "@/lib/contact";
import { COMPANY_TRUST } from "@/lib/trust-content";
import { cn } from "@/lib/cn";

type AdvisorTrustStripProps = {
  className?: string;
};

export function AdvisorTrustStrip({ className }: AdvisorTrustStripProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-slate-200/90 bg-slate-50/80 px-4 py-3",
        className,
      )}
    >
      <p className="text-sm font-semibold text-slate-900">{COMPANY_TRUST.headline}</p>
      <p className="mt-1 text-xs leading-snug text-slate-600">{COMPANY_TRUST.body[0]}</p>
      <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
        {COMPANY_TRUST.trustPoints.map((point) => (
          <li key={point} className="flex items-center gap-1 text-[11px] font-medium text-slate-700">
            <span aria-hidden className="text-teal-600">
              ✓
            </span>
            {point}
          </li>
        ))}
      </ul>
      <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
        <StrategyCallLink
          variant="inline"
          className="text-xs"
          ctaLocation="advisor-trust-strip"
        />
        <PhoneLink
          size="sm"
          showIcon={false}
          label={CALL_OUR_TEAM_LABEL}
          className="font-semibold leading-none"
        />
      </div>
    </div>
  );
}
