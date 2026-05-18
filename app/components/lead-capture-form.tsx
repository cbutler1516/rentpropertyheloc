"use client";

import { useId, useState, type FormEvent } from "react";
import { trackLeadFormStart, trackLeadSubmit } from "../lib/analytics-events";

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

const roleOptions = [
  "Buyer",
  "Real estate agent",
  "Managing broker / owner",
  "Investor / operator",
  "Other",
];

function getLeadIntent(formType: LeadFormType): LeadIntent {
  if (formType === "Homeowner Strategy Review") return "homeowner";
  if (formType === "Agent Partnership Conversation") return "agent";
  if (formType === "Managing Broker Partnership") return "broker";
  if (formType === "Commercial Scenario Review") return "commercial";
  if (formType === "Newsletter Signup") return "newsletter";

  return "buyer";
}

export function LeadCaptureForm({
  formType,
  submitLabel,
  intent,
}: LeadCaptureFormProps) {
  const formId = useId();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasTrackedStart, setHasTrackedStart] = useState(false);
  const leadIntent = intent ?? getLeadIntent(formType);

  function trackFormStart() {
    if (hasTrackedStart) return;

    setHasTrackedStart(true);
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
      role: String(formData.get("role") ?? ""),
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
      className="reveal-item mt-10 grid gap-4 md:grid-cols-2"
      onSubmit={onSubmit}
      onFocusCapture={trackFormStart}
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
          placeholder="Phone"
          className="input-glow h-14 w-full border border-zinc-800 bg-[#050505] px-5 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
        />
      </div>

      <div>
        <label htmlFor={`${formId}-role`} className="sr-only">
          Role or inquiry type
        </label>
        <select
          id={`${formId}-role`}
          name="role"
          required
          defaultValue=""
          className="input-glow h-14 w-full border border-zinc-800 bg-[#050505] px-5 text-zinc-300 transition-all duration-[var(--duration-hover)] outline-none focus:border-[#7c3aed]/60"
        >
          <option value="" disabled>
            Role / type
          </option>
          {roleOptions.map((role) => (
            <option key={role} value={role}>
              {role}
            </option>
          ))}
        </select>
      </div>

      <div className="md:col-span-2">
        <label htmlFor={`${formId}-message`} className="sr-only">
          Message or scenario
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          rows={4}
          placeholder="Message / scenario"
          className="input-glow min-h-28 w-full resize-y border border-zinc-800 bg-[#050505] px-5 py-4 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
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
          By submitting, you agree to be contacted about your inquiry. This is
          not a loan application or commitment to lend.
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
