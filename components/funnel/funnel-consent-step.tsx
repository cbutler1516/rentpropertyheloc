"use client";

import { FunnelConsentSection } from "@/components/funnel/funnel-consent-section";
import { Button } from "@/components/ui/button";
import { FUNNEL_SUBMIT_LABEL } from "@/lib/leads/constants";
import {
  getConsentFieldErrors,
  getVisibleConsentFieldError,
  hasConsentFieldErrors,
  type ConsentTouchedFields,
} from "@/lib/leads/consent-field-validation";
import { cn } from "@/lib/cn";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useMemo, useState } from "react";

type FunnelConsentStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  submitting?: boolean;
  submitError?: string | null;
  onSubmit: () => void;
};

export function FunnelConsentStep({
  data,
  onChange,
  submitting = false,
  submitError,
  onSubmit,
}: FunnelConsentStepProps) {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [touched, setTouched] = useState<ConsentTouchedFields>({});

  const fieldErrors = useMemo(() => getConsentFieldErrors(data), [data]);

  function handleSubmitClick() {
    setSubmitAttempted(true);
    const errors = getConsentFieldErrors(data);
    if (hasConsentFieldErrors(errors)) return;
    onSubmit();
  }

  const consentError = getVisibleConsentFieldError(
    "consent",
    fieldErrors,
    touched,
    submitAttempted,
  );

  return (
    <>
      <div className="space-y-4">
        <FunnelConsentSection
          tcpaConsent={data.tcpaConsent}
          onTcpaChange={(checked) => onChange({ tcpaConsent: checked })}
          onBlur={() => setTouched((prev) => ({ ...prev, consent: true }))}
          aria-invalid={Boolean(consentError)}
          aria-describedby={consentError ? "consent-error" : undefined}
        />

        {consentError ? (
          <p id="consent-error" className="text-sm leading-relaxed text-red-600" role="alert">
            {consentError}
          </p>
        ) : null}

        {submitError ? (
          <p className="text-sm leading-relaxed text-red-600" role="alert">
            {submitError}
          </p>
        ) : null}

        <Button
          type="button"
          size="lg"
          className="thumb-btn hidden h-12 w-full text-base md:flex lg:max-w-md"
          disabled={submitting}
          onClick={handleSubmitClick}
        >
          {submitting ? "Submitting…" : FUNNEL_SUBMIT_LABEL}
        </Button>
      </div>

      <div
        className={cn(
          "mobile-sticky-glass fixed inset-x-0 bottom-0 z-30 border-t border-slate-200/90 px-4 pt-2.5 md:hidden",
          "pb-[max(0.75rem,env(safe-area-inset-bottom))]",
        )}
      >
        <Button
          type="button"
          size="lg"
          className="thumb-btn h-12 w-full text-base shadow-sm"
          disabled={submitting}
          onClick={handleSubmitClick}
        >
          {submitting ? "Submitting…" : FUNNEL_SUBMIT_LABEL}
        </Button>
      </div>
    </>
  );
}
