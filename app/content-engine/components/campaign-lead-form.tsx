"use client";

import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import {
  LEAD_CAPTURE_FIELD_KEYS,
  type LeadCaptureFieldKey,
  type LeadCaptureRecord,
  type LandingPageRecord,
} from "../lib/types";

type CampaignLeadFormProps = {
  slug: string;
  leadCapture?: LeadCaptureRecord;
  landingPage: LandingPageRecord;
  previewMode?: boolean;
};

const INPUT_FIELDS: LeadCaptureFieldKey[] = LEAD_CAPTURE_FIELD_KEYS.filter(
  (k) => k !== "smsCallConsent" && k !== "emailOptIn",
);

export function CampaignLeadForm({
  slug,
  leadCapture,
  landingPage,
  previewMode = false,
}: CampaignLeadFormProps) {
  const searchParams = useSearchParams();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const fields = leadCapture?.fields;
  const consent = leadCapture?.consent;

  const isEnabled = (key: LeadCaptureFieldKey) =>
    fields?.[key]?.enabled !== false;

  const labelFor = (key: LeadCaptureFieldKey) =>
    fields?.[key]?.label ?? key;

  const placeholderFor = (key: LeadCaptureFieldKey) =>
    fields?.[key]?.placeholder ?? "";

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (previewMode) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    setError(null);
    const form = new FormData(event.currentTarget);

    const lead = {
      firstName: String(form.get("firstName") ?? "").trim(),
      lastName: String(form.get("lastName") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      buyerTimeline: String(form.get("buyerTimeline") ?? "").trim(),
      loanTypeInterest: String(form.get("loanTypeInterest") ?? "").trim(),
      purchasePriceOrLoanAmount: String(
        form.get("purchasePriceOrLoanAmount") ?? "",
      ).trim(),
      creditRange: String(form.get("creditRange") ?? "").trim(),
      agentStatus: String(form.get("agentStatus") ?? "").trim(),
      notes: String(form.get("notes") ?? "").trim(),
      smsCallConsent: form.get("smsCallConsent") === "on",
      emailOptIn: form.get("emailOptIn") === "on",
    };

    try {
      const response = await fetch("/api/content-engine/campaign-leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          lead,
          utm: {
            utmSource: searchParams.get("utm_source") ?? undefined,
            utmMedium: searchParams.get("utm_medium") ?? undefined,
            utmCampaign: searchParams.get("utm_campaign") ?? undefined,
            utmTerm: searchParams.get("utm_term") ?? undefined,
            utmContent: searchParams.get("utm_content") ?? undefined,
          },
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Submission failed.");
      }
      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Submission failed.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center">
        <p className="font-mono text-[10px] tracking-[0.2em] text-emerald-300 uppercase">
          Thank you
        </p>
        <div className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-zinc-200">
          {landingPage.sections.thankYouPageCopy ||
            "Thanks — we'll be in touch shortly."}
        </div>
      </div>
    );
  }

  return (
    <form
      id="campaign-lead-form"
      onSubmit={(e) => void handleSubmit(e)}
      className="space-y-4 rounded-xl border border-white/10 bg-black/40 p-6"
    >
      <p className="font-mono text-[9px] tracking-[0.18em] text-[#c9a227] uppercase">
        Request your playbook review
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        {INPUT_FIELDS.map((key) => {
          if (!isEnabled(key)) return null;
          const required = fields?.[key]?.required ?? key === "email";
          const isTextarea = key === "notes";
          return (
            <div
              key={key}
              className={key === "notes" ? "sm:col-span-2" : undefined}
            >
              <Label htmlFor={key}>
                {labelFor(key)}
                {required ? " *" : ""}
              </Label>
              {isTextarea ? (
                <Textarea
                  id={key}
                  name={key}
                  className="mt-1 bg-black/50"
                  placeholder={placeholderFor(key)}
                  rows={3}
                />
              ) : (
                <Input
                  id={key}
                  name={key}
                  type={key === "email" ? "email" : "text"}
                  required={required}
                  className="mt-1 bg-black/50"
                  placeholder={placeholderFor(key)}
                />
              )}
            </div>
          );
        })}
      </div>

      {isEnabled("smsCallConsent") && (
        <label className="flex gap-2 text-xs text-zinc-400">
          <input type="checkbox" name="smsCallConsent" className="mt-0.5" />
          <span>
            {consent?.smsCallConsentCopy ||
              "I agree to receive calls and texts about my inquiry."}
          </span>
        </label>
      )}

      {isEnabled("emailOptIn") && (
        <label className="flex gap-2 text-xs text-zinc-400">
          <input type="checkbox" name="emailOptIn" className="mt-0.5" />
          <span>
            {consent?.emailOptInCopy ||
              "I'd like to receive educational email updates."}
          </span>
        </label>
      )}

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <Button type="submit" disabled={submitting} className="w-full sm:w-auto">
        {previewMode
          ? "Preview submit"
          : submitting
            ? "Submitting…"
            : landingPage.sections.primaryCta.split("\n")[0] || "Submit"}
      </Button>
    </form>
  );
}
