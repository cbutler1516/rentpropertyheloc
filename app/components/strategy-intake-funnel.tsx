"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  trackIntakeFunnelAbandon,
  trackIntakeFunnelStart,
  trackIntakeFunnelStep,
  trackIntakeFunnelSubmit,
  trackLeadFormStart,
} from "../lib/analytics-events";
import {
  experienceOptions,
  getIntakeGoal,
  getIntakeStepsForGoal,
  getTotalIntakeSteps,
  intakeGoals,
  propertyTypeOptions,
  stateOptions,
  timelineOptions,
  type IntakeGoalId,
  type IntakeStepId,
} from "../lib/strategy-intake";

const fieldClass =
  "input-glow h-14 w-full border border-zinc-800 bg-[#050505] px-5 text-white transition-all duration-[var(--duration-hover)] placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60";

type IntakeFormData = {
  goalId: IntakeGoalId | "";
  timeline: string;
  purchasePrice: string;
  loanAmount: string;
  propertyType: string;
  goals: string;
  stateMarket: string;
  experience: string;
  name: string;
  email: string;
  phone: string;
};

const emptyForm: IntakeFormData = {
  goalId: "",
  timeline: "",
  purchasePrice: "",
  loanAmount: "",
  propertyType: "",
  goals: "",
  stateMarket: "",
  experience: "",
  name: "",
  email: "",
  phone: "",
};

function readUtmParams() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    utm_source: params.get("utm_source") ?? undefined,
    utm_medium: params.get("utm_medium") ?? undefined,
    utm_campaign: params.get("utm_campaign") ?? undefined,
    utm_content: params.get("utm_content") ?? undefined,
  };
}

export function StrategyIntakeFunnel() {
  const formId = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<IntakeFormData>(emptyForm);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const startedRef = useRef(false);
  const submittedRef = useRef(false);
  const abandonTrackedRef = useRef(false);

  const goal = getIntakeGoal(data.goalId);
  const followUpSteps = data.goalId
    ? getIntakeStepsForGoal(data.goalId)
    : [];
  const totalSteps = getTotalIntakeSteps(data.goalId);
  const currentStepId: "goal" | IntakeStepId =
    stepIndex === 0 ? "goal" : followUpSteps[stepIndex - 1];
  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100);

  const pagePath =
    typeof window !== "undefined" ? window.location.pathname : "/strategy-review";

  const markStarted = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackIntakeFunnelStart({ goalId: data.goalId || undefined, page: pagePath });
    trackLeadFormStart({
      formType: goal?.formType ?? "Strategy Intake",
      leadIntent: goal?.leadIntent,
      page: pagePath,
    });
  }, [data.goalId, goal, pagePath]);

  const trackAbandon = useCallback(() => {
    if (abandonTrackedRef.current || submittedRef.current || !startedRef.current) {
      return;
    }
    abandonTrackedRef.current = true;
    trackIntakeFunnelAbandon({
      goalId: data.goalId || undefined,
      stepId: currentStepId,
      stepIndex,
      page: pagePath,
    });
  }, [currentStepId, data.goalId, pagePath, stepIndex]);

  useEffect(() => {
    function onPageHide() {
      trackAbandon();
    }
    window.addEventListener("pagehide", onPageHide);
    return () => window.removeEventListener("pagehide", onPageHide);
  }, [trackAbandon]);

  function updateField<K extends keyof IntakeFormData>(
    key: K,
    value: IntakeFormData[K],
  ) {
    markStarted();
    setData((prev) => ({ ...prev, [key]: value }));
  }

  function canAdvance(): boolean {
    if (currentStepId === "goal") return Boolean(data.goalId);
    if (currentStepId === "timeline") return Boolean(data.timeline);
    if (currentStepId === "financials") {
      return Boolean(data.purchasePrice.trim() || data.loanAmount.trim());
    }
    if (currentStepId === "property") return Boolean(data.propertyType);
    if (currentStepId === "goals") return data.goals.trim().length >= 8;
    if (currentStepId === "market") return Boolean(data.stateMarket);
    if (currentStepId === "experience") return Boolean(data.experience);
    if (currentStepId === "contact") {
      return (
        data.name.trim().length > 1 &&
        data.email.includes("@") &&
        data.phone.trim().length >= 7
      );
    }
    return false;
  }

  function goNext() {
    if (!canAdvance()) return;
    if (currentStepId === "contact") {
      void submitIntake();
      return;
    }
    const nextIndex = stepIndex + 1;
    const nextStepId =
      nextIndex === 0 ? "goal" : followUpSteps[nextIndex - 1];
    trackIntakeFunnelStep({
      stepId: String(nextStepId),
      stepIndex: nextIndex,
      goalId: data.goalId,
      page: pagePath,
    });
    setStepIndex(nextIndex);
  }

  function goBack() {
    if (stepIndex === 0) return;
    setStepIndex((index) => index - 1);
  }

  async function submitIntake() {
    if (!goal) return;
    setSubmitState("submitting");
    setErrorMessage("");

    const payload = {
      formType: goal.formType,
      leadIntent: goal.leadIntent,
      intakeGoal: data.goalId,
      timeline: data.timeline,
      purchasePrice: data.purchasePrice,
      loanAmount: data.loanAmount,
      propertyType: data.propertyType,
      goals: data.goals,
      stateMarket: data.stateMarket,
      experience: data.experience,
      name: data.name,
      email: data.email,
      phone: data.phone,
      consent: true,
      page: typeof window !== "undefined" ? window.location.href : pagePath,
      submittedAt: new Date().toISOString(),
      ...readUtmParams(),
    };

    const endpoint = process.env.NEXT_PUBLIC_LEAD_FORM_ENDPOINT;

    try {
      if (!endpoint) {
        await new Promise((resolve) => window.setTimeout(resolve, 500));
      } else {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          throw new Error(`Intake submit failed: ${response.status}`);
        }
      }

      submittedRef.current = true;
      trackIntakeFunnelSubmit({
        goalId: data.goalId,
        leadIntent: goal.leadIntent,
        formType: goal.formType,
        page: payload.page,
      });
      setSubmitState("success");
    } catch {
      setSubmitState("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  }

  if (submitState === "success") {
    return (
      <div
        className="border border-zinc-900/80 bg-[#0a0a0a] p-8 md:p-12"
        data-analytics-section="intake_success"
      >
        <p className="font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
          Received
        </p>
        <h2 className="mt-5 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
          We&apos;ll review your strategy.
        </h2>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
          Expect context-first follow-up—not a rate quote. If your timeline is
          urgent, note that in your message next time.
        </p>
      </div>
    );
  }

  return (
    <div
      id="strategy-intake"
      className="border border-zinc-900/80 bg-[#0a0a0a]"
      data-analytics-section="strategy_intake"
    >
      <div className="border-b border-zinc-900/80 px-6 py-5 md:px-10">
        <div className="flex items-center justify-between gap-4">
          <p className="font-mono text-[10px] tracking-[0.28em] text-zinc-500 uppercase">
            Step {stepIndex + 1} of {totalSteps}
          </p>
          <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
            {progressPercent}%
          </p>
        </div>
        <div className="mt-3 h-1 overflow-hidden bg-zinc-900">
          <div
            className="h-full bg-[#7c3aed] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
            aria-hidden
          />
        </div>
      </div>

      <form
        id={formId}
        className="px-6 py-8 md:px-10 md:py-10"
        onSubmit={(event) => {
          event.preventDefault();
          goNext();
        }}
      >
        {currentStepId === "goal" ? (
          <div>
            <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
              What are you trying to accomplish?
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
              Choose the path closest to your situation. We&apos;ll tailor the
              next questions.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {intakeGoals.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      markStarted();
                      setData({ ...emptyForm, goalId: item.id });
                      setStepIndex(0);
                    }}
                    className={`w-full border p-5 text-left transition-colors duration-[var(--duration-hover)] ${
                      data.goalId === item.id
                        ? "border-[#7c3aed]/60 bg-[#5b21b6]/10"
                        : "border-zinc-800 bg-[#050505] hover:border-zinc-700"
                    }`}
                  >
                    <span className="text-base font-medium text-white">
                      {item.label}
                    </span>
                    <span className="mt-2 block text-sm leading-relaxed text-zinc-500">
                      {item.description}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {currentStepId === "timeline" ? (
          <StepShell
            title="What's your timeline?"
            lead="Rough timing helps frame structure—not pressure."
          >
            <SelectGrid
              options={timelineOptions}
              value={data.timeline}
              onChange={(value) => updateField("timeline", value)}
            />
          </StepShell>
        ) : null}

        {currentStepId === "financials" ? (
          <StepShell
            title="Estimated numbers"
            lead="Ballpark is fine. We'll refine—not quote off a guess."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Estimated purchase price"
                id={`${formId}-price`}
                value={data.purchasePrice}
                onChange={(v) => updateField("purchasePrice", v)}
                placeholder="$750,000"
              />
              <Field
                label="Estimated loan amount"
                id={`${formId}-loan`}
                value={data.loanAmount}
                onChange={(v) => updateField("loanAmount", v)}
                placeholder="$600,000"
              />
            </div>
          </StepShell>
        ) : null}

        {currentStepId === "property" ? (
          <StepShell title="Property type" lead="What are you financing?">
            <SelectGrid
              options={propertyTypeOptions}
              value={data.propertyType}
              onChange={(value) => updateField("propertyType", value)}
            />
          </StepShell>
        ) : null}

        {currentStepId === "goals" ? (
          <StepShell
            title="What matters most right now?"
            lead="Payment, speed, flexibility, equity, or something else."
          >
            <textarea
              value={data.goals}
              onChange={(event) => updateField("goals", event.target.value)}
              rows={4}
              placeholder="Example: Buy in Bellevue before selling in Kirkland; need bridge clarity and jumbo structure."
              className="input-glow min-h-32 w-full resize-y border border-zinc-800 bg-[#050505] px-5 py-4 text-white placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
            />
          </StepShell>
        ) : null}

        {currentStepId === "market" ? (
          <StepShell title="State / market" lead="Where is the property or search focused?">
            <SelectGrid
              options={stateOptions}
              value={data.stateMarket}
              onChange={(value) => updateField("stateMarket", value)}
            />
          </StepShell>
        ) : null}

        {currentStepId === "experience" ? (
          <StepShell title="Experience level" lead="Helps us match depth and pace.">
            <SelectGrid
              options={experienceOptions}
              value={data.experience}
              onChange={(value) => updateField("experience", value)}
            />
          </StepShell>
        ) : null}

        {currentStepId === "contact" ? (
          <StepShell
            title="How should we reach you?"
            lead="For strategy follow-up only—not a loan application."
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Name"
                id={`${formId}-name`}
                value={data.name}
                onChange={(v) => updateField("name", v)}
                placeholder="Your name"
                required
              />
              <Field
                label="Email"
                id={`${formId}-email`}
                type="email"
                value={data.email}
                onChange={(v) => updateField("email", v)}
                placeholder="you@email.com"
                required
              />
              <Field
                label="Phone"
                id={`${formId}-phone`}
                type="tel"
                value={data.phone}
                onChange={(v) => updateField("phone", v)}
                placeholder="Phone"
                className="sm:col-span-2"
                required
              />
            </div>
            <p className="mt-5 text-sm leading-relaxed text-zinc-500">
              By continuing, you agree to be contacted about your inquiry. This
              is not a loan application or commitment to lend.
            </p>
          </StepShell>
        ) : null}

        {submitState === "error" ? (
          <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-red-300 uppercase">
            {errorMessage}
          </p>
        ) : null}

        <div className="mt-10 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={goBack}
            disabled={stepIndex === 0 || submitState === "submitting"}
            className="btn-ghost inline-flex h-12 items-center justify-center border border-zinc-800 px-6 text-sm font-medium text-zinc-400 hover:border-zinc-700 hover:text-white disabled:opacity-40"
          >
            Back
          </button>
          <button
            type="submit"
            disabled={!canAdvance() || submitState === "submitting"}
            className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {submitState === "submitting"
              ? "Sending..."
              : currentStepId === "contact"
                ? "Review Your Strategy"
                : "Continue"}
          </button>
        </div>
      </form>
    </div>
  );
}

function StepShell({
  title,
  lead,
  children,
}: {
  title: string;
  lead: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">{lead}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  className = "",
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        required={required}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className={fieldClass}
      />
    </div>
  );
}

function SelectGrid({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2">
      {options.map((option) => (
        <li key={option}>
          <button
            type="button"
            onClick={() => onChange(option)}
            className={`w-full border px-4 py-3 text-left text-sm transition-colors ${
              value === option
                ? "border-[#7c3aed]/60 bg-[#5b21b6]/10 text-white"
                : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
            }`}
          >
            {option}
          </button>
        </li>
      ))}
    </ul>
  );
}
