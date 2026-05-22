"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, type FormEvent } from "react";
import { INTAKE_CONTACT_CONSENT } from "@/app/lib/compliance-consent";
import { getBookingUrl } from "@/app/lib/booking-urls";
import { dealPurposeOptions } from "../lib/form-options";
import {
  ccmAccentLabel,
  ccmBtnGhost,
  ccmBtnPrimary,
  ccmGoldLabel,
  ccmPanelElevated,
} from "../lib/ccm-ui";
import type { LeadSource, StrategyReviewSubmission } from "../lib/types";
import { useCcm } from "./ccm-provider";

const fieldClass =
  "input-glow h-12 w-full rounded-xl bg-white/[0.03] px-4 text-white ring-1 ring-white/[0.08] outline-none placeholder:text-zinc-600 focus:ring-[#7c3aed]/50";

const emptyForm: StrategyReviewSubmission = {
  name: "",
  email: "",
  phone: "",
  company: "",
  propertyAddress: "",
  transactionType: "",
  estimatedValue: "",
  requestedLoanAmount: "",
  notes: "",
  consent: false,
};

export function StrategyReviewForm() {
  const searchParams = useSearchParams();
  const sourceParam = searchParams.get("source");
  const source: LeadSource =
    sourceParam === "memo-cta" ? "memo-cta" : "strategy-review";

  const { intake, submitStrategyReview, hydrated } = useCcm();
  const [form, setForm] = useState<StrategyReviewSubmission>(() => ({
    ...emptyForm,
    name: intake.sponsorName,
    email: intake.sponsorEmail,
    company: intake.companyName,
    notes: intake.dealNotes,
  }));
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const commercialHref = getBookingUrl("commercial");

  const patch = (partial: Partial<StrategyReviewSubmission>) => {
    setForm((prev) => ({ ...prev, ...partial }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.consent) {
      setError("Please confirm consent to be contacted about your deal.");
      return;
    }
    if (!form.name.trim() || !form.email.includes("@")) {
      setError("Enter your name and a valid email.");
      return;
    }
    const ok = submitStrategyReview(form, source);
    if (!ok) {
      setError("Could not save your submission. Try again.");
      return;
    }
    setSubmitted(true);
  };

  if (!hydrated) {
    return <p className="text-sm text-zinc-500">Loading…</p>;
  }

  if (submitted) {
    return (
      <div className={`${ccmPanelElevated} mx-auto max-w-2xl space-y-6 p-10 md:p-14`}>
        <p className={ccmGoldLabel}>Received</p>
        <h2 className="text-2xl font-semibold text-white">
          Your deal package is queued for Broadview review.
        </h2>
        <p className="text-sm leading-relaxed text-zinc-400">
          Chris Butler and the Broadview team will use your submission to frame
          capital path options. This is not a loan approval—expect outreach to
          clarify documents and timing.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <a href={commercialHref} className={ccmBtnPrimary}>
            Schedule Strategy Call
          </a>
          <Link
            href="/commercial-capital-matchmaker/results"
            className={ccmBtnGhost}
          >
            View capital strategy
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-10">
      <div className="space-y-4">
        <p className={ccmGoldLabel}>Broadview deal review</p>
        <h1 className="text-3xl font-semibold tracking-tight text-white md:text-4xl">
          Send your deal for capital strategy review
        </h1>
        <p className="text-base leading-relaxed text-zinc-400">
          Higher-intent submission for sponsors who want Chris Butler to review
          structure, lender fit, and document readiness—not a formal loan
          application.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className={`${ccmPanelElevated} space-y-6 p-8 md:p-10`}
      >
        <div className="grid gap-4 md:grid-cols-2">
          <label className="block md:col-span-2">
            <span className={ccmAccentLabel}>Name</span>
            <input
              className={`${fieldClass} mt-2`}
              value={form.name}
              onChange={(e) => patch({ name: e.target.value })}
              required
              autoComplete="name"
            />
          </label>
          <label className="block">
            <span className={ccmAccentLabel}>Email</span>
            <input
              type="email"
              className={`${fieldClass} mt-2`}
              value={form.email}
              onChange={(e) => patch({ email: e.target.value })}
              required
              autoComplete="email"
            />
          </label>
          <label className="block">
            <span className={ccmAccentLabel}>Phone</span>
            <input
              type="tel"
              className={`${fieldClass} mt-2`}
              value={form.phone}
              onChange={(e) => patch({ phone: e.target.value })}
              autoComplete="tel"
            />
          </label>
          <label className="block md:col-span-2">
            <span className={ccmAccentLabel}>Company</span>
            <input
              className={`${fieldClass} mt-2`}
              value={form.company}
              onChange={(e) => patch({ company: e.target.value })}
            />
          </label>
          <label className="block md:col-span-2">
            <span className={ccmAccentLabel}>Property address</span>
            <input
              className={`${fieldClass} mt-2`}
              value={form.propertyAddress}
              onChange={(e) => patch({ propertyAddress: e.target.value })}
              placeholder="Street, city, state"
            />
          </label>
          <label className="block md:col-span-2">
            <span className={ccmAccentLabel}>Transaction type</span>
            <select
              className={`${fieldClass} mt-2`}
              value={form.transactionType}
              onChange={(e) => patch({ transactionType: e.target.value })}
              required
            >
              <option value="" className="bg-zinc-900">
                Select…
              </option>
              {dealPurposeOptions.map((opt) => (
                <option key={opt.value} value={opt.label} className="bg-zinc-900">
                  {opt.label}
                </option>
              ))}
              <option value="Owner-user acquisition" className="bg-zinc-900">
                Owner-user acquisition
              </option>
            </select>
          </label>
          <label className="block">
            <span className={ccmAccentLabel}>Est. value / purchase price</span>
            <input
              className={`${fieldClass} mt-2`}
              value={form.estimatedValue}
              onChange={(e) => patch({ estimatedValue: e.target.value })}
              placeholder="$2,400,000"
            />
          </label>
          <label className="block">
            <span className={ccmAccentLabel}>Requested loan amount</span>
            <input
              className={`${fieldClass} mt-2`}
              value={form.requestedLoanAmount}
              onChange={(e) => patch({ requestedLoanAmount: e.target.value })}
              placeholder="$2,000,000"
            />
          </label>
          <label className="block md:col-span-2">
            <span className={ccmAccentLabel}>Notes</span>
            <textarea
              className={`${fieldClass} mt-2 min-h-[120px] resize-y py-3`}
              value={form.notes}
              onChange={(e) => patch({ notes: e.target.value })}
              placeholder="Timing, occupancy, entity structure, or lender conversations so far."
            />
          </label>
        </div>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => patch({ consent: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-zinc-600"
          />
          <span className="text-xs leading-relaxed text-zinc-500">
            {INTAKE_CONTACT_CONSENT}
          </span>
        </label>

        {error ? (
          <p className="text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" className={ccmBtnPrimary}>
          Send My Deal to Broadview
        </button>
      </form>
    </div>
  );
}
