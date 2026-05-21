"use client";

import Link from "next/link";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
} from "react";
import {
  trackFormAbandonment,
  trackLeadFormStart,
  trackLeadSubmit,
} from "../lib/analytics-events";
import { LEAD_FORM_CONSENT_HTML } from "../lib/compliance-consent";
import { leadIntentChipOptions } from "../lib/lead-intent-options";

export type LeadFormType =
  | "Buyer Strategy Call"
  | "Homeowner Strategy Review"
  | "Agent Partnership Conversation"
  | "Managing Broker Partnership"
  | "Commercial Scenario Review"
  | "Newsletter Signup";

export type LeadIntent =
  | "buyer"
  | "homeowner"
  | "agent"
  | "broker"
  | "commercial"
  | "newsletter";

type LeadCaptureFormProps = {
  formType: LeadFormType;
  submitLabel: string;
  intent?: LeadIntent;
};

type SubmitState = "idle" | "submitting" | "success" | "error";

function getLeadIntent(formType: LeadFormType): LeadIntent {
  if (formType === "Homeowner Strategy Review") return "homeowner";
  if (formType === "Agent Partnership Conversation") return "agent";
  if (formType === "Managing Broker Partnership") return "broker";
  if (formType === "Commercial Scenario Review") return "commercial";
  if (formType === "Newsletter Signup") return "newsletter";

  return "buyer";
}

function defaultIntentChip(formType: LeadFormType): string {
  if (formType === "Homeowner Strategy Review") return "Refinance";
  if (formType === "Commercial Scenario Review") return "Commercial property";
  if (formType === "Agent Partnership Conversation") return "Not sure yet";
  if (formType === "Newsletter Signup") return "Not sure yet";
  return "Buy a home";
}

export function LeadCaptureForm({
  formType,
  submitLabel,
  intent,
}: LeadCaptureFormProps) {
  const formId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fieldsStarted, setFieldsStarted] = useState(0);
  const [selectedIntent, setSelectedIntent] = useState(() =>
    defaultIntentChip(formType),
  );
  const abandonmentTracked = useRef(false);
  const hasTrackedStartRef = useRef(false);
  const submitStateRef = useRef(submitState);
  const fieldsStartedRef = useRef(0);
  const leadIntent = intent ?? getLeadIntent(formType);
  const showIntentChips = formType !== "Newsletter Signup";

  useEffect(() => {
    submitStateRef.current = submitState;
  }, [submitState]);

  useEffect(() => {
    fieldsStartedRef.current = fieldsStarted;
  }, [fieldsStarted]);

  function countStartedFields(form: HTMLFormElement) {
    const names = ["name", "email", "phone", "role", "message"] as const;
    return names.filter((name) => {
      const field = form.elements.namedItem(name);
      if (!field) return false;
      const value =
        field instanceof HTMLInputElement || field instanceof HTMLTextAreaElement
          ? field.value.trim()
          : "";
      return value.length > 0;
    }).length;
  }

  const trackAbandonmentOnce = useCallback(
    (form: HTMLFormElement | null) => {
      if (
        abandonmentTracked.current ||
        !hasTrackedStartRef.current ||
        submitStateRef.current !== "idle"
      ) {
        return;
      }
      abandonmentTracked.current = true;
      const started = form ? countStartedFields(form) : fieldsStartedRef.current;
      trackFormAbandonment({
        formType,
        leadIntent,
        fieldsStarted: started,
        page: typeof window !== "undefined" ? window.location.pathname : "",
      });
    },
    [formType, leadIntent],
  );

  useEffect(() => {
    function onPageHide() {
      const form = document.getElementById(formId) as HTMLFormElement | null;
      trackAbandonmentOnce(form);
    }

    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [formId, trackAbandonmentOnce]);

  function trackFormStart() {
    if (hasTrackedStartRef.current) return;

    hasTrackedStartRef.current = true;
    trackLeadFormStart({
      formType,
      leadIntent,
      page: typeof window !== "undefined" ? window.location.href : "",
    });
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitState("submitting");
    setErrorMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const honeypot = String(formData.get("company") ?? "");

    if (honeypot) {
      setSubmitState("success");
      form.reset();
      return;
    }

    const payload = {
      formType,
      leadIntent,
      name: String(formData.get("name") ?? ""),
      email: String(formData.get("email") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      role: String(formData.get("role") ?? selectedIntent),
      message: String(formData.get("message") ?? ""),
      consent: formData.get("consent") === "on",
      page: typeof window !== "undefined" ? window.location.href : "",
      submittedAt: new Date().toISOString(),
    };

    const endpoint = process.env.NEXT_PUBLIC_LEAD_FORM_ENDPOINT;

    try {
      if (!endpoint) {
        console.warn(
          "NEXT_PUBLIC_LEAD_FORM_ENDPOINT is not set. Simulating lead capture success in preview mode.",
        );
        await new Promise((resolve) => window.setTimeout(resolve, 450));
        trackLeadSubmit({
          formType,
          leadIntent,
          role: payload.role,
          page: payload.page,
        });
        setSubmitState("success");
        form.reset();
        setSelectedIntent(defaultIntentChip(formType));
        return;
      }

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Lead form request failed with ${response.status}`);
      }

      trackLeadSubmit({
        formType,
        leadIntent,
        role: payload.role,
        page: payload.page,
      });
      setSubmitState("success");
      form.reset();
      setSelectedIntent(defaultIntentChip(formType));
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Something went wrong submitting the form. Please try again.",
      );
      setSubmitState("error");
    }
  }

  const disabled = submitState === "submitting";

  return (
    <form
      id={formId}
      className="reveal-item mt-8 grid gap-3 md:mt-10 md:grid-cols-2 md:gap-4"
      onSubmit={onSubmit}
      onFocusCapture={(event) => {
        trackFormStart();
        const count = countStartedFields(event.currentTarget);
        if (count > fieldsStarted) setFieldsStarted(count);
      }}
      onChange={(event) => {
        const count = countStartedFields(event.currentTarget);
        if (count > fieldsStarted) setFieldsStarted(count);
      }}
      data-analytics-section="lead_capture"
    >
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      <input type="hidden" name="role" value={selectedIntent} />

      <div>
        <label htmlFor={`${formId}-name`} className="sr-only">
          Name
        </label>
        <input
          id={`${formId}-name`}
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Your name"
          className="input-glow h-14 w-full border border-zinc-800 bg-[#050505] px-5 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
        />
      </div>

      <div>
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
          className="input-glow h-14 w-full border border-zinc-800 bg-[#050505] px-5 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-phone`} className="sr-only">
          Phone
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          autoComplete="tel"
          placeholder="Phone (optional)"
          className="input-glow h-14 w-full border border-zinc-800 bg-[#050505] px-5 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
        />
      </div>

      {showIntentChips ? (
        <fieldset className="md:col-span-2">
          <legend className="mb-3 font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
            What are you looking to do?
          </legend>
          <ul className="flex flex-wrap gap-2">
            {leadIntentChipOptions.map((option) => {
              const active = selectedIntent === option.value;
              return (
                <li key={option.value}>
                  <button
                    type="button"
                    disabled={disabled}
                    onClick={() => setSelectedIntent(option.value)}
                    className={`rounded-full border px-3 py-2 font-mono text-[9px] tracking-[0.12em] uppercase transition-colors ${
                      active
                        ? "border-[#7c3aed]/60 bg-[#7c3aed]/15 text-[#e9d5ff]"
                        : "border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-200"
                    }`}
                  >
                    {option.label}
                  </button>
                </li>
              );
            })}
          </ul>
        </fieldset>
      ) : null}

      <div className="md:col-span-2">
        <label htmlFor={`${formId}-message`} className="sr-only">
          Optional notes
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={3}
          placeholder="Optional notes (timeline, property, goals)"
          className="input-glow min-h-24 w-full resize-y border border-zinc-800 bg-[#050505] px-5 py-4 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
        />
      </div>

      <label className="md:col-span-2 flex gap-3 text-sm leading-relaxed text-zinc-500">
        <input
          name="consent"
          type="checkbox"
          required
          className="mt-1 h-4 w-4 shrink-0 accent-[#7c3aed]"
        />
        <span>
          {LEAD_FORM_CONSENT_HTML}{" "}
          <Link href="/privacy" className="text-zinc-400 underline-offset-2 hover:text-white hover:underline">
            Privacy Policy
          </Link>
          .
        </span>
      </label>

      <button
        type="submit"
        disabled={disabled}
        className="btn-primary h-14 bg-white px-8 text-sm font-medium tracking-wide text-black hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-60 md:col-span-2"
      >
        {disabled ? "Submitting..." : submitLabel}
      </button>

      {submitState === "success" ? (
        <p className="md:col-span-2 font-mono text-[10px] tracking-[0.18em] text-[#a78bfa] uppercase">
          Received. We will follow up about your inquiry.
        </p>
      ) : null}

      {submitState === "error" ? (
        <p className="md:col-span-2 font-mono text-[10px] tracking-[0.18em] text-red-300 uppercase">
          {errorMessage}
        </p>
      ) : null}
    </form>
  );
}
