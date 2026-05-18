"use client";

import { useId, useState, type FormEvent } from "react";
import {
  trackLeadFormStart,
  trackMicroConversion,
} from "../lib/analytics-events";
import type { LeadIntent } from "./lead-capture-form";

type SubmitState = "idle" | "submitting" | "success" | "error";

type MicroOptInProps = {
  eyebrow?: string;
  title: string;
  body?: string;
  submitLabel: string;
  optInType: string;
  intent: LeadIntent;
  location: string;
};

export function MicroOptIn({
  eyebrow = "Low-Friction Opt-In",
  title,
  body = "Useful mortgage context. No spam.",
  submitLabel,
  optInType,
  intent,
  location,
}: MicroOptInProps) {
  const formId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  function trackStart() {
    if (hasTrackedStart) return;

    setHasTrackedStart(true);
    trackLeadFormStart({
      formType: optInType,
      leadIntent: intent,
      page: typeof window !== "undefined" ? window.location.href : "",
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("company") ?? "");

    if (honeypot) {
      setSubmitState("success");
      form.reset();
      return;
    }

    const payload = {
      formType: optInType,
      leadIntent: intent,
      email: String(formData.get("email") ?? ""),
      page: typeof window !== "undefined" ? window.location.href : "",
      submittedAt: new Date().toISOString(),
    };

    const endpoint = process.env.NEXT_PUBLIC_LEAD_FORM_ENDPOINT;

    try {
      if (endpoint) {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error(`Micro opt-in request failed with ${response.status}`);
        }
      } else {
        await new Promise((resolve) => window.setTimeout(resolve, 350));
      }

      trackMicroConversion({
        optInType,
        leadIntent: intent,
        location,
      });
      setSubmitState("success");
      form.reset();
    } catch (error) {
      console.error(error);
      setSubmitState("error");
    }
  }

  const disabled = submitState === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      onFocusCapture={trackStart}
      className="reveal-item border border-zinc-900/80 bg-[#050505] p-6 md:p-7"
      data-analytics-section="micro_conversion"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
        {eyebrow}
      </p>
      <h3 className="mt-4 text-2xl font-semibold tracking-[-0.03em] text-white">
        {title}
      </h3>
      <p className="mt-4 text-sm leading-relaxed text-zinc-500">{body}</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <label htmlFor={`${formId}-email`} className="sr-only">
          Email
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          className="input-glow h-12 w-full border border-zinc-800 bg-[#050505] px-4 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
        />
        <button
          type="submit"
          disabled={disabled}
          className="btn-primary h-12 bg-white px-6 text-sm font-medium tracking-wide text-black hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {disabled ? "Sending..." : submitLabel}
        </button>
      </div>
      {submitState === "success" ? (
        <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-[#a78bfa] uppercase">
          You are on the list.
        </p>
      ) : null}
      {submitState === "error" ? (
        <p className="mt-4 font-mono text-[10px] tracking-[0.18em] text-red-300 uppercase">
          Could not submit. Please try again.
        </p>
      ) : null}
    </form>
  );
}
