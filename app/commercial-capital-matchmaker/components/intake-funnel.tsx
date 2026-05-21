"use client";

import { useRouter } from "next/navigation";
import { useCallback, useId, useRef, useState } from "react";
import {
  dealPurposeOptions,
  INTAKE_STEPS,
  leveragePostureOptions,
  loanAmountOptions,
  occupancyOptions,
  propertyTypeOptions,
  sponsorExperienceOptions,
  timelineOptions,
} from "../lib/form-options";
import { ccmAccentLabel, ccmBtnGhost, ccmBtnPrimary, ccmPanelElevated } from "../lib/ccm-ui";
import type { DealIntake, IntakeStepId } from "../lib/types";
import { useCcm } from "./ccm-provider";
import { IntakeOption } from "./intake-option";

const fieldClass =
  "input-glow h-14 w-full rounded-xl bg-white/[0.03] px-5 text-white ring-1 ring-white/[0.08] transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:ring-[#7c3aed]/50";

function isStepComplete(stepId: IntakeStepId, intake: DealIntake): boolean {
  switch (stepId) {
    case "property-type":
      return Boolean(intake.propertyType);
    case "deal-purpose":
      return Boolean(intake.dealPurpose);
    case "loan-size":
      return Boolean(intake.loanAmountRange);
    case "occupancy":
      return Boolean(intake.occupancyStatus);
    case "sponsor-experience":
      return Boolean(intake.sponsorExperience);
    case "timeline":
      return Boolean(intake.timeline);
    case "leverage":
      return Boolean(intake.leveragePosture);
    case "contact":
      return (
        intake.sponsorName.trim().length > 1 && intake.sponsorEmail.includes("@")
      );
    default:
      return false;
  }
}

export function IntakeFunnel() {
  const formId = useId();
  const router = useRouter();
  const { intake, setIntake, submitIntake, hydrated } = useCcm();
  const [stepIndex, setStepIndex] = useState(0);
  const [error, setError] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  const currentStep = INTAKE_STEPS[stepIndex];
  const progressPercent = Math.round(((stepIndex + 1) / INTAKE_STEPS.length) * 100);
  const stepComplete = currentStep
    ? isStepComplete(currentStep.id, intake)
    : false;

  const goNext = useCallback(() => {
    if (!currentStep || !isStepComplete(currentStep.id, intake)) return;
    setError("");
    if (stepIndex < INTAKE_STEPS.length - 1) {
      setStepIndex((i) => i + 1);
      headingRef.current?.focus();
    }
  }, [currentStep, intake, stepIndex]);

  const goBack = () => {
    setError("");
    if (stepIndex > 0) setStepIndex((i) => i - 1);
  };

  const handleSubmit = () => {
    if (!isStepComplete("contact", intake)) {
      setError("Enter sponsor name and a valid email to continue.");
      return;
    }
    const ok = submitIntake();
    if (!ok) {
      setError("Complete each step above—then we will build your capital strategy.");
      return;
    }
    router.push("/commercial-capital-matchmaker/results");
  };

  if (!hydrated) {
    return (
      <div className={`${ccmPanelElevated} p-12 text-center text-sm text-zinc-500`}>
        Loading…
      </div>
    );
  }

  return (
    <div className={ccmPanelElevated}>
      <div className="px-8 py-8 md:px-12 md:py-10">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
            Step {stepIndex + 1} of {INTAKE_STEPS.length}
          </p>
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
            {progressPercent}%
          </p>
        </div>
        <div
          className="mt-3 h-1 overflow-hidden bg-zinc-900"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="h-full bg-[#7c3aed] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className="mt-3 text-sm text-zinc-500">{currentStep?.momentum}</p>
      </div>

      <form
        id={formId}
        className="px-8 pb-10 md:px-12 md:pb-14"
        onSubmit={(e) => {
          e.preventDefault();
          if (stepIndex === INTAKE_STEPS.length - 1) handleSubmit();
          else goNext();
        }}
      >
        <h2
          ref={headingRef}
          tabIndex={-1}
          className="text-2xl font-semibold tracking-[-0.03em] text-white outline-none md:text-3xl"
        >
          {currentStep?.title}
        </h2>
        {currentStep?.helper ? (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
            {currentStep.helper}
          </p>
        ) : null}

        <div className="mt-10">
          {currentStep?.id === "property-type" ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {propertyTypeOptions.map((opt) => (
                <li key={opt.value}>
                  <IntakeOption
                    label={opt.label}
                    description={opt.description}
                    selected={intake.propertyType === opt.value}
                    onSelect={() => setIntake({ propertyType: opt.value })}
                  />
                </li>
              ))}
            </ul>
          ) : null}

          {currentStep?.id === "deal-purpose" ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {dealPurposeOptions.map((opt) => (
                <li key={opt.value}>
                  <IntakeOption
                    label={opt.label}
                    description={opt.description}
                    selected={intake.dealPurpose === opt.value}
                    onSelect={() => setIntake({ dealPurpose: opt.value })}
                  />
                </li>
              ))}
            </ul>
          ) : null}

          {currentStep?.id === "loan-size" ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {loanAmountOptions.map((opt) => (
                <li key={opt.value}>
                  <IntakeOption
                    label={opt.label}
                    selected={intake.loanAmountRange === opt.value}
                    onSelect={() => setIntake({ loanAmountRange: opt.value })}
                  />
                </li>
              ))}
            </ul>
          ) : null}

          {currentStep?.id === "occupancy" ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {occupancyOptions.map((opt) => (
                <li key={opt.value}>
                  <IntakeOption
                    label={opt.label}
                    description={opt.description}
                    selected={intake.occupancyStatus === opt.value}
                    onSelect={() => setIntake({ occupancyStatus: opt.value })}
                  />
                </li>
              ))}
            </ul>
          ) : null}

          {currentStep?.id === "sponsor-experience" ? (
            <ul className="grid gap-3">
              {sponsorExperienceOptions.map((opt) => (
                <li key={opt.value}>
                  <IntakeOption
                    label={opt.label}
                    selected={intake.sponsorExperience === opt.value}
                    onSelect={() => setIntake({ sponsorExperience: opt.value })}
                  />
                </li>
              ))}
            </ul>
          ) : null}

          {currentStep?.id === "timeline" ? (
            <ul className="grid gap-3 sm:grid-cols-2">
              {timelineOptions.map((opt) => (
                <li key={opt.value}>
                  <IntakeOption
                    label={opt.label}
                    selected={intake.timeline === opt.value}
                    onSelect={() => setIntake({ timeline: opt.value })}
                  />
                </li>
              ))}
            </ul>
          ) : null}

          {currentStep?.id === "leverage" ? (
            <ul className="grid gap-3">
              {leveragePostureOptions.map((opt) => (
                <li key={opt.value}>
                  <IntakeOption
                    label={opt.label}
                    description={opt.description}
                    selected={intake.leveragePosture === opt.value}
                    onSelect={() => setIntake({ leveragePosture: opt.value })}
                  />
                </li>
              ))}
            </ul>
          ) : null}

          {currentStep?.id === "contact" ? (
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block md:col-span-2">
                <span className={ccmAccentLabel}>Your name</span>
                <input
                  className={`${fieldClass} mt-2`}
                  value={intake.sponsorName}
                  onChange={(e) => setIntake({ sponsorName: e.target.value })}
                  placeholder="Alex Morgan"
                  autoComplete="name"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                  Email
                </span>
                <input
                  type="email"
                  className={`${fieldClass} mt-2`}
                  value={intake.sponsorEmail}
                  onChange={(e) => setIntake({ sponsorEmail: e.target.value })}
                  placeholder="alex@company.com"
                  autoComplete="email"
                />
              </label>
              <label className="block">
                <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                  Company (optional)
                </span>
                <input
                  className={`${fieldClass} mt-2`}
                  value={intake.companyName}
                  onChange={(e) => setIntake({ companyName: e.target.value })}
                  placeholder="Morgan Capital Group"
                />
              </label>
              <label className="block md:col-span-2">
                <span className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                  Deal notes (optional)
                </span>
                <textarea
                  className={`${fieldClass} mt-2 min-h-[120px] resize-y py-4`}
                  value={intake.dealNotes}
                  onChange={(e) => setIntake({ dealNotes: e.target.value })}
                  placeholder="Key context—location, NOI, business plan, or constraints."
                />
              </label>
            </div>
          ) : null}
        </div>

        {error ? (
          <p className="mt-6 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <div className="mt-10 flex flex-wrap items-center gap-3">
          {stepIndex > 0 ? (
            <button type="button" onClick={goBack} className={ccmBtnGhost}>
              Back
            </button>
          ) : null}
          {stepIndex < INTAKE_STEPS.length - 1 ? (
            <button
              type="submit"
              disabled={!stepComplete}
              className={`${ccmBtnPrimary} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              Continue
            </button>
          ) : (
            <button
              type="submit"
              disabled={!stepComplete}
              className={`${ccmBtnPrimary} disabled:cursor-not-allowed disabled:opacity-40`}
            >
              Build my capital strategy
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
