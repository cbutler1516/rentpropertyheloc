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

const AUTO_ADVANCE_MS = 200;
const SINGLE_SELECT_STEPS = new Set([
  "goal",
  "timeline",
  "property",
  "market",
  "experience",
]);

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

function isStepComplete(
  stepId: "goal" | IntakeStepId,
  snapshot: IntakeFormData,
): boolean {
  if (stepId === "goal") return Boolean(snapshot.goalId);
  if (stepId === "timeline") return Boolean(snapshot.timeline);
  if (stepId === "financials") {
    return Boolean(snapshot.purchasePrice.trim() || snapshot.loanAmount.trim());
  }
  if (stepId === "property") return Boolean(snapshot.propertyType);
  if (stepId === "goals") return snapshot.goals.trim().length >= 8;
  if (stepId === "market") return Boolean(snapshot.stateMarket);
  if (stepId === "experience") return Boolean(snapshot.experience);
  if (stepId === "contact") {
    return (
      snapshot.name.trim().length > 1 &&
      snapshot.email.includes("@") &&
      snapshot.phone.trim().length >= 7
    );
  }
  return false;
}

export function StrategyIntakeFunnel() {
  const formId = useId();
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<IntakeFormData>(emptyForm);
  const [pendingChoice, setPendingChoice] = useState<string | null>(null);
  const [isAdvancing, setIsAdvancing] = useState(false);
  const [submitState, setSubmitState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const dataRef = useRef(data);
  const startedRef = useRef(false);
  const submittedRef = useRef(false);
  const abandonTrackedRef = useRef(false);
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const funnelTopRef = useRef<HTMLDivElement>(null);
  const stepHeadingRef = useRef<HTMLHeadingElement>(null);

  const goal = getIntakeGoal(data.goalId);
  const followUpSteps = data.goalId ? getIntakeStepsForGoal(data.goalId) : [];
  const totalSteps = getTotalIntakeSteps(data.goalId);
  const currentStepId: "goal" | IntakeStepId =
    stepIndex === 0 ? "goal" : followUpSteps[stepIndex - 1];
  const progressPercent = Math.round(((stepIndex + 1) / totalSteps) * 100);
  const needsContinue = !SINGLE_SELECT_STEPS.has(currentStepId);

  const pagePath =
    typeof window !== "undefined" ? window.location.pathname : "/strategy-review";

  useEffect(() => {
    dataRef.current = data;
  }, [data]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  useEffect(() => {
    stepHeadingRef.current?.focus({ preventScroll: true });
  }, [stepIndex, currentStepId]);

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

  const scrollToFunnelTop = useCallback(() => {
    funnelTopRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, []);

  const submitIntake = useCallback(
    async (snapshot: IntakeFormData) => {
      const activeGoal = getIntakeGoal(snapshot.goalId);
      if (!activeGoal) return;

      setSubmitState("submitting");
      setErrorMessage("");

      const payload = {
        formType: activeGoal.formType,
        leadIntent: activeGoal.leadIntent,
        intakeGoal: snapshot.goalId,
        timeline: snapshot.timeline,
        purchasePrice: snapshot.purchasePrice,
        loanAmount: snapshot.loanAmount,
        propertyType: snapshot.propertyType,
        goals: snapshot.goals,
        stateMarket: snapshot.stateMarket,
        experience: snapshot.experience,
        name: snapshot.name,
        email: snapshot.email,
        phone: snapshot.phone,
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
          goalId: snapshot.goalId,
          leadIntent: activeGoal.leadIntent,
          formType: activeGoal.formType,
          page: payload.page,
        });
        setSubmitState("success");
      } catch {
        setSubmitState("error");
        setErrorMessage("Something went wrong. Please try again.");
      }
    },
    [pagePath],
  );

  const advanceToNextStep = useCallback(
    (snapshot: IntakeFormData, fromStepIndex: number) => {
      const steps = snapshot.goalId ? getIntakeStepsForGoal(snapshot.goalId) : [];
      const stepId: "goal" | IntakeStepId =
        fromStepIndex === 0 ? "goal" : steps[fromStepIndex - 1];

      if (!isStepComplete(stepId, snapshot)) return;

      if (stepId === "contact") {
        void submitIntake(snapshot);
        return;
      }

      const nextIndex = fromStepIndex + 1;
      const nextStepId = nextIndex === 0 ? "goal" : steps[nextIndex - 1];

      trackIntakeFunnelStep({
        stepId: String(nextStepId),
        stepIndex: nextIndex,
        goalId: snapshot.goalId,
        page: pagePath,
      });

      setStepIndex(nextIndex);
      setPendingChoice(null);
      scrollToFunnelTop();
    },
    [pagePath, scrollToFunnelTop, submitIntake],
  );

  const scheduleAutoAdvance = useCallback(
    (snapshot: IntakeFormData, fromStepIndex: number) => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);

      advanceTimerRef.current = setTimeout(() => {
        advanceToNextStep(snapshot, fromStepIndex);
        setIsAdvancing(false);
        advanceTimerRef.current = null;
      }, AUTO_ADVANCE_MS);
    },
    [advanceToNextStep],
  );

  const selectAndAdvance = useCallback(
    (
      snapshot: IntakeFormData,
      choiceLabel: string,
      fromStepIndex: number,
    ) => {
      if (isAdvancing || submitState === "submitting") return;

      markStarted();
      setIsAdvancing(true);
      setPendingChoice(choiceLabel);
      setData(snapshot);
      dataRef.current = snapshot;
      scheduleAutoAdvance(snapshot, fromStepIndex);
    },
    [isAdvancing, markStarted, scheduleAutoAdvance, submitState],
  );

  function updateField<K extends keyof IntakeFormData>(
    key: K,
    value: IntakeFormData[K],
  ) {
    markStarted();
    setData((prev) => {
      const next = { ...prev, [key]: value };
      dataRef.current = next;
      return next;
    });
  }

  function handleGoalSelect(goalId: IntakeGoalId) {
    const snapshot = { ...emptyForm, goalId };
    selectAndAdvance(snapshot, goalId, stepIndex);
  }

  function handleSelectField<K extends keyof IntakeFormData>(
    key: K,
    value: IntakeFormData[K],
  ) {
    const snapshot = { ...dataRef.current, [key]: value };
    selectAndAdvance(snapshot, String(value), stepIndex);
  }

  function handleContinue() {
    if (isAdvancing || submitState === "submitting") return;
    advanceToNextStep(dataRef.current, stepIndex);
  }

  function goBack() {
    if (stepIndex === 0 || isAdvancing) return;
    if (advanceTimerRef.current) {
      clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = null;
    }
    setIsAdvancing(false);
    setPendingChoice(null);
    setStepIndex((index) => index - 1);
    scrollToFunnelTop();
  }

  const canContinue = isStepComplete(currentStepId, data);

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
      ref={funnelTopRef}
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
        <div
          className="mt-3 h-1 overflow-hidden bg-zinc-900"
          role="progressbar"
          aria-valuenow={progressPercent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Intake progress"
        >
          <div
            className="h-full bg-[#7c3aed] transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <form
        id={formId}
        className="px-6 py-8 md:px-10 md:py-10"
        onSubmit={(event) => {
          event.preventDefault();
          if (needsContinue) handleContinue();
        }}
      >
        <div
          key={`${stepIndex}-${currentStepId}`}
          className="intake-step-enter"
          aria-live="polite"
          aria-atomic="true"
        >
          {currentStepId === "goal" ? (
            <div>
              <h2
                ref={stepHeadingRef}
                tabIndex={-1}
                className="text-2xl font-semibold tracking-[-0.03em] text-white outline-none md:text-3xl"
              >
                What are you trying to accomplish?
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">
                Tap the path closest to your situation—we&apos;ll tailor the next
                questions.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {intakeGoals.map((item) => (
                  <li key={item.id}>
                    <GoalOption
                      label={item.label}
                      description={item.description}
                      selected={
                        data.goalId === item.id || pendingChoice === item.id
                      }
                      disabled={isAdvancing}
                      onSelect={() => handleGoalSelect(item.id)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {currentStepId === "timeline" ? (
            <StepShell
              title="What's your timeline?"
              lead="Rough timing helps frame structure—not pressure."
              headingRef={stepHeadingRef}
            >
              <SelectGrid
                options={timelineOptions}
                value={data.timeline}
                pendingValue={pendingChoice}
                disabled={isAdvancing}
                onSelect={(value) => handleSelectField("timeline", value)}
              />
            </StepShell>
          ) : null}

          {currentStepId === "financials" ? (
            <StepShell
              title="Estimated numbers"
              lead="Ballpark is fine. We'll refine—not quote off a guess."
              headingRef={stepHeadingRef}
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
            <StepShell
              title="Property type"
              lead="What are you financing?"
              headingRef={stepHeadingRef}
            >
              <SelectGrid
                options={propertyTypeOptions}
                value={data.propertyType}
                pendingValue={pendingChoice}
                disabled={isAdvancing}
                onSelect={(value) => handleSelectField("propertyType", value)}
              />
            </StepShell>
          ) : null}

          {currentStepId === "goals" ? (
            <StepShell
              title="What matters most right now?"
              lead="Payment, speed, flexibility, equity, or something else."
              headingRef={stepHeadingRef}
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
            <StepShell
              title="State / market"
              lead="Where is the property or search focused?"
              headingRef={stepHeadingRef}
            >
              <SelectGrid
                options={stateOptions}
                value={data.stateMarket}
                pendingValue={pendingChoice}
                disabled={isAdvancing}
                onSelect={(value) => handleSelectField("stateMarket", value)}
              />
            </StepShell>
          ) : null}

          {currentStepId === "experience" ? (
            <StepShell
              title="Experience level"
              lead="Helps us match depth and pace."
              headingRef={stepHeadingRef}
            >
              <SelectGrid
                options={experienceOptions}
                value={data.experience}
                pendingValue={pendingChoice}
                disabled={isAdvancing}
                onSelect={(value) => handleSelectField("experience", value)}
              />
            </StepShell>
          ) : null}

          {currentStepId === "contact" ? (
            <StepShell
              title="How should we reach you?"
              lead="For strategy follow-up only—not a loan application."
              headingRef={stepHeadingRef}
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
        </div>

        {submitState === "error" ? (
          <p className="mt-6 font-mono text-[10px] tracking-[0.18em] text-red-300 uppercase">
            {errorMessage}
          </p>
        ) : null}

        <div
          className={`mt-10 flex gap-3 ${
            needsContinue
              ? "flex-col-reverse sm:flex-row sm:items-center sm:justify-between"
              : "justify-start"
          }`}
        >
          <button
            type="button"
            onClick={goBack}
            disabled={stepIndex === 0 || submitState === "submitting" || isAdvancing}
            className="btn-ghost inline-flex h-12 items-center justify-center border border-zinc-800 px-6 text-sm font-medium text-zinc-400 hover:border-zinc-700 hover:text-white disabled:opacity-40"
          >
            Back
          </button>
          {needsContinue ? (
            <button
              type="submit"
              disabled={!canContinue || submitState === "submitting" || isAdvancing}
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitState === "submitting"
                ? "Sending..."
                : currentStepId === "contact"
                  ? "Review Your Strategy"
                  : "Continue"}
            </button>
          ) : null}
        </div>
      </form>
    </div>
  );
}

function StepShell({
  title,
  lead,
  children,
  headingRef,
}: {
  title: string;
  lead: string;
  children: ReactNode;
  headingRef?: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="text-2xl font-semibold tracking-[-0.03em] text-white outline-none md:text-3xl"
      >
        {title}
      </h2>
      <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-500">{lead}</p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function GoalOption({
  label,
  description,
  selected,
  disabled,
  onSelect,
}: {
  label: string;
  description: string;
  selected: boolean;
  disabled: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      aria-pressed={selected}
      className={`w-full border p-5 text-left transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
        selected
          ? "intake-option-selected"
          : "border-zinc-800 bg-[#050505] hover:border-zinc-700"
      }`}
    >
      <span className="text-base font-medium text-white">{label}</span>
      <span className="mt-2 block text-sm leading-relaxed text-zinc-500">
        {description}
      </span>
    </button>
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
      <label
        htmlFor={id}
        className="mb-2 block font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase"
      >
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
  pendingValue,
  disabled,
  onSelect,
}: {
  options: readonly string[];
  value: string;
  pendingValue?: string | null;
  disabled?: boolean;
  onSelect: (value: string) => void;
}) {
  return (
    <ul className="grid gap-2 sm:grid-cols-2" role="listbox" aria-label="Choose one">
      {options.map((option) => {
        const selected = value === option || pendingValue === option;
        return (
          <li key={option} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={selected}
              disabled={disabled}
              onClick={() => onSelect(option)}
              className={`w-full border px-4 py-3 text-left text-sm transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                selected
                  ? "intake-option-selected"
                  : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
              }`}
            >
              {option}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
