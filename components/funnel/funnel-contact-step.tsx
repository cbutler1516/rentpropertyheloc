"use client";

import { PhoneInput } from "@/components/funnel/phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  onContinue: () => void;
};

export function FunnelContactStep({ data, onChange, onContinue }: FunnelContactStepProps) {
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [touched, setTouched] = useState<ContactTouchedFields>({});

  const fieldErrors = useMemo(() => getContactFieldErrors(data), [data]);

  function markTouched(field: ContactFieldKey) {
    setTouched((prev) => (prev[field] ? prev : { ...prev, [field]: true }));
  }

  function visibleError(field: ContactFieldKey) {
    return getVisibleContactFieldError(field, fieldErrors, touched, submitAttempted);
  }

  function handleContinueClick() {
    setSubmitAttempted(true);
    const errors = getContactFieldErrors(data);
    if (hasContactFieldErrors(errors)) return;
    onContinue();
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
              Mobile phone <RequiredMark />
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

        <Button
          type="button"
          size="lg"
          className="thumb-btn hidden h-12 w-full text-base md:flex lg:max-w-md"
          onClick={handleContinueClick}
        >
          Continue
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
          onClick={handleContinueClick}
        >
          Continue
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
