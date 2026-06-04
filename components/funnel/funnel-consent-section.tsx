"use client";

import { TCPA_CONSENT_DETAIL, TCPA_CONSENT_TEXT } from "@/lib/leads/constants";
import { PRIVACY_POLICY_PATH, TERMS_OF_USE_PATH } from "@/lib/legal/routes";
import { cn } from "@/lib/cn";
import Link from "next/link";

type FunnelConsentSectionProps = {
  tcpaConsent: boolean;
  onTcpaChange: (checked: boolean) => void;
  onBlur?: () => void;
  className?: string;
  "aria-invalid"?: boolean;
  "aria-describedby"?: string;
};

export function FunnelConsentSection({
  tcpaConsent,
  onTcpaChange,
  onBlur,
  className,
  "aria-invalid": ariaInvalid,
  "aria-describedby": ariaDescribedBy,
}: FunnelConsentSectionProps) {
  const describedBy = [
    ariaDescribedBy,
    TCPA_CONSENT_DETAIL ? "tcpa-consent-detail" : undefined,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cn("space-y-2", className)}>
      <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-lg py-1 sm:min-h-0 sm:py-0.5">
        <input
          type="checkbox"
          checked={tcpaConsent}
          onChange={(e) => onTcpaChange(e.target.checked)}
          onBlur={onBlur}
          aria-invalid={ariaInvalid}
          aria-describedby={describedBy || undefined}
          className="mt-0.5 h-5 w-5 shrink-0 rounded border-slate-300 text-teal-600 focus:ring-teal-500 sm:mt-1 sm:h-4 sm:w-4"
        />
        <span className="text-[13px] leading-[1.55] text-slate-600 sm:text-xs sm:leading-relaxed">
          {TCPA_CONSENT_TEXT}{" "}
          <span className="font-medium text-slate-700" aria-hidden>
            *
          </span>
        </span>
      </label>

      {TCPA_CONSENT_DETAIL ? (
        <details id="tcpa-consent-detail" className="rounded-lg border border-slate-200/80 bg-slate-50/80 px-3 py-2">
          <summary className="cursor-pointer text-[11px] font-medium text-slate-600 marker:content-none [&::-webkit-details-marker]:hidden">
            View Consent Details
          </summary>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{TCPA_CONSENT_DETAIL}</p>
          <p className="mt-2 text-[11px] leading-relaxed text-slate-500">
            See our{" "}
            <Link
              href={PRIVACY_POLICY_PATH}
              className="font-medium text-teal-700 underline-offset-2 hover:underline"
            >
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link
              href={TERMS_OF_USE_PATH}
              className="font-medium text-teal-700 underline-offset-2 hover:underline"
            >
              Terms of Use
            </Link>
            .
          </p>
        </details>
      ) : null}
    </div>
  );
}
