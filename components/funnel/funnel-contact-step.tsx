"use client";

import { FunnelConsentSection } from "@/components/funnel/funnel-consent-section";
import { PhoneInput } from "@/components/funnel/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FUNNEL_SUBMIT_LABEL } from "@/lib/leads/constants";
import {
  getContactFieldErrors,
  getVisibleContactFieldError,
  hasContactFieldErrors,
  type ContactFieldKey,
  type ContactTouchedFields,
} from "@/lib/leads/contact-field-validation";
import { cn } from "@/lib/cn";
import type { LeadFunnelData } from "@/lib/leads/types";
import { useMemo, useState } from "react";

type FunnelContactStepProps = {
  data: LeadFunnelData;
  onChange: (partial: Partial<LeadFunnelData>) => void;
  submitting?: boolean;
  submitError?: string | null;
  onSubmit: () => void;
};

export function FunnelContactStep({
  data,
  onChange,
  submitting = false,
  submitError,
  onSubmit,
}: FunnelContactStepProps) {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [touched, setTouched] = useState<ContactTouchedFields>({});

  const fieldErrors = useMemo(() => getContactFieldErrors(data), [data]);

  function markTouched(field: ContactFieldKey) {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }

  function visibleError(field: ContactFieldKey) {
    return getVisibleContactFieldError(field, fieldErrors, touched, submitAttempted);
  }

  function handleSubmitClick() {
    setSubmitAttempted(true);
    const errors = getContactFieldErrors(data);
    if (hasContactFieldErrors(errors)) return;
    onSubmit();
  }

  return (
    <>
      <div className="funnel-contact-scroll space-y-3.5 sm:space-y-4">
        <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2 sm:gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">
              First name <RequiredMark />
            </Label>
            <Input
              id="firstName"
              value={data.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              onBlur={() => markTouched("firstName")}
              autoComplete="given-name"
              aria-invalid={Boolean(visibleError("firstName"))}
              aria-describedby={visibleError("firstName") ? "firstName-error" : undefined}
              className="funnel-form-field h-12 text-base"
            />
            <FieldError id="firstName-error" message={visibleError("firstName")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">
              Last name <RequiredMark />
            </Label>
            <Input
              id="lastName"
              value={data.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              onBlur={() => markTouched("lastName")}
              autoComplete="family-name"
              aria-invalid={Boolean(visibleError("lastName"))}
              aria-describedby={visibleError("lastName") ? "lastName-error" : undefined}
              className="funnel-form-field h-12 text-base"
            />
            <FieldError id="lastName-error" message={visibleError("lastName")} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5 lg:grid-cols-2 lg:gap-4">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email <RequiredMark />
            </Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              onBlur={() => markTouched("email")}
              autoComplete="email"
              inputMode="email"
              placeholder="name@example.com"
              aria-invalid={Boolean(visibleError("email"))}
              aria-describedby={visibleError("email") ? "email-error" : undefined}
              className="funnel-form-field h-12 text-base"
            />
            <FieldError id="email-error" message={visibleError("email")} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone <RequiredMark />
            </Label>
            <PhoneInput
              id="phone"
              value={data.phone}
              onChange={(digits) => onChange({ phone: digits })}
              onBlur={() => markTouched("phone")}
              aria-invalid={Boolean(visibleError("phone"))}
              aria-describedby={visibleError("phone") ? "phone-error" : undefined}
              className="funnel-form-field h-12 text-base"
            />
            <FieldError id="phone-error" message={visibleError("phone")} />
          </div>
        </div>

        <div className="space-y-2">
          <FunnelConsentSection
            tcpaConsent={data.tcpaConsent}
            onTcpaChange={(checked) => onChange({ tcpaConsent: checked })}
            onBlur={() => markTouched("consent")}
            aria-invalid={Boolean(visibleError("consent"))}
            aria-describedby={visibleError("consent") ? "consent-error" : undefined}
          />
          <FieldError id="consent-error" message={visibleError("consent")} />
        </div>

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

function FieldError({ id, message }: { id?: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-1.5 text-sm leading-relaxed text-red-600" role="alert">
      {message}
    </p>
  );
}

function RequiredMark() {
  return (
    <span className="font-medium text-teal-700" aria-hidden>
      *
    </span>
  );
}
