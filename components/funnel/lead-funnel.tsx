"use client";

import { FunnelConfirmation } from "@/components/funnel/funnel-confirmation";
import { FunnelAddressStep } from "@/components/funnel/funnel-address-step";
import { FunnelContactStep } from "@/components/funnel/funnel-contact-step";
import { FunnelRequestedFundsStep } from "@/components/funnel/funnel-requested-funds-step";
import { FunnelProgress } from "@/components/funnel/funnel-progress";
import { FunnelStepHeader } from "@/components/funnel/funnel-step-header";
import {
  trackContactStepViewed,
  trackLeadStepCompleted,
  trackLeadSubmittedWithRouting,
} from "@/lib/analytics/conversion-events";
import { SUBMIT_ERROR_MESSAGE } from "@/lib/leads/constants";
import {
  FUNNEL_QUESTION_COUNT,
  FUNNEL_STEP_COUNT,
  FUNNEL_VERSION,
  getFunnelStepId,
  getFunnelStepTitle,
} from "@/lib/leads/funnel-config";
import { getStepEncouragement } from "@/lib/leads/funnel-encouragement";
import { extractQueryParams, extractUtmParams } from "@/lib/leads/extract-attribution";
import { getJourneySlugForPropertyType } from "@/lib/leads/investor-journeys";
import {
  applyRangeSelection,
  getEquityStrategyFromParams,
  getInitialFunnelStep,
  mergePrefillIntoFunnelData,
  parseCheckOptionsPrefill,
} from "@/lib/leads/parse-prefill";
import { submitLead } from "@/lib/leads/submit-lead";
import { scrollToPostSubmitTop } from "@/lib/funnel/scroll-to-post-submit-top";
import { usePartialLeadSave } from "@/lib/leads/use-partial-lead-save";
import { cn } from "@/lib/cn";
import { normalizePhoneForStorage } from "@/lib/phone-format";
import type { LeadFunnelData, PropertyTypeId, RoutingTier } from "@/lib/leads/types";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type LeadFunnelProps = {
  onSubmittedChange?: (submitted: boolean) => void;
};

export function LeadFunnel({ onSubmittedChange }: LeadFunnelProps) {
  const searchParams = useSearchParams();
  const reduceMotion = useReducedMotion();
  const confirmationRef = useRef<HTMLDivElement>(null);
  const historyInitializedRef = useRef(false);

  const initialData = useMemo(() => {
    const fromUrl = parseCheckOptionsPrefill(searchParams);
    return mergePrefillIntoFunnelData(fromUrl);
  }, [searchParams]);

  const initialStep = useMemo(() => {
    const stepParam = searchParams.get("step");
    const parsedStep = stepParam ? Number(stepParam) : NaN;
    if (Number.isFinite(parsedStep) && parsedStep >= 1 && parsedStep <= FUNNEL_STEP_COUNT) {
      return parsedStep;
    }
    return getInitialFunnelStep(initialData);
  }, [searchParams, initialData]);

  const [step, setStep] = useState(initialStep);
  const [data, setData] = useState<LeadFunnelData>(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [leadId, setLeadId] = useState<string | undefined>(undefined);
  const [routingTier, setRoutingTier] = useState<RoutingTier | undefined>(undefined);
  const [submittedAt, setSubmittedAt] = useState<string>("");
  const [tcpaConsentAt, setTcpaConsentAt] = useState<string>("");

  const journey = useMemo(
    () => getJourneySlugForPropertyType(data.propertyType as PropertyTypeId) ?? "sfr",
    [data.propertyType],
  );

  const equityStrategy = useMemo(
    () => getEquityStrategyFromParams(searchParams),
    [searchParams],
  );

  const isConfirmationView = submitted || step === FUNNEL_STEP_COUNT;

  useEffect(() => {
    onSubmittedChange?.(isConfirmationView);
  }, [isConfirmationView, onSubmittedChange]);

  const showPrimaryResidenceNote = equityStrategy === "primary_residence";

  const syncHistory = useCallback(
    (nextStep: number, replace = false) => {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      url.searchParams.set("step", String(nextStep));
      if (data.propertyType) url.searchParams.set("propertyType", data.propertyType);
      if (equityStrategy === "primary_residence") {
        url.searchParams.set("equityStrategy", "primary_residence");
      } else {
        url.searchParams.delete("equityStrategy");
      }
      const method = replace ? "replaceState" : "pushState";
      window.history[method]({ funnelStep: nextStep }, "", url);
    },
    [data.propertyType, equityStrategy],
  );

  useEffect(() => {
    if (historyInitializedRef.current) return;
    historyInitializedRef.current = true;
    syncHistory(step, true);
  }, [step, syncHistory]);

  useEffect(() => {
    const onPopState = (event: PopStateEvent) => {
      const historyStep = event.state?.funnelStep;
      if (typeof historyStep === "number" && historyStep >= 1 && historyStep <= FUNNEL_STEP_COUNT) {
        setStep(historyStep);
      }
    };
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  useEffect(() => {
    if (!submitted) return;
    scrollToPostSubmitTop();
    const timer = window.setTimeout(scrollToPostSubmitTop, 0);
    return () => window.clearTimeout(timer);
  }, [submitted]);

  useEffect(() => {
    if (step === 3) {
      trackContactStepViewed({ journey, funnelVersion: FUNNEL_VERSION });
    }
  }, [step, journey]);

  useEffect(() => {
    document.documentElement.setAttribute("data-funnel-active", "true");
    return () => {
      document.documentElement.removeAttribute("data-funnel-active");
    };
  }, []);

  usePartialLeadSave({
    data,
    step,
    journey,
    equityStrategy,
    submitted,
    sourceUrl: typeof window !== "undefined" ? window.location.href : undefined,
    queryParams:
      typeof window !== "undefined" ? extractQueryParams(searchParams) : undefined,
    utm: typeof window !== "undefined" ? extractUtmParams(searchParams) : undefined,
  });

  function patch(partial: Partial<LeadFunnelData>) {
    setSubmitError(null);
    setData((prev) => applyRangeSelection(prev, partial));
  }

  function goNext(fromStep: number) {
    const stepId = getFunnelStepId(fromStep);
    trackLeadStepCompleted(fromStep, stepId, {
      journey,
      funnelVersion: FUNNEL_VERSION,
      propertyType: data.propertyType || undefined,
    });
    const nextStep = Math.min(fromStep + 1, FUNNEL_STEP_COUNT);
    patch({ funnelStepCompleted: fromStep });
    setStep(nextStep);
    syncHistory(nextStep);
  }

  function goBack() {
    setStep((current) => {
      if (current <= 1) return current;
      const next = Math.max(current - 1, 1);
      syncHistory(next);
      return next;
    });
  }

  async function handleSubmit() {
    if (!data.equityAccessRange) {
      setSubmitError("Select how much you'd like to access.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    const consentAt = tcpaConsentAt || new Date().toISOString();
    setTcpaConsentAt(consentAt);

    const submissionData: LeadFunnelData = {
      ...data,
      funnelStepCompleted: 3,
    };

    const result = await submitLead({
      ...submissionData,
      phone: normalizePhoneForStorage(submissionData.phone),
      journey,
      funnelVersion: FUNNEL_VERSION,
      tcpaConsentAt: consentAt,
      sourceUrl: window.location.href,
      queryParams: extractQueryParams(searchParams),
      utm: extractUtmParams(searchParams),
    });

    setSubmitting(false);

    if (result.success) {
      trackLeadSubmittedWithRouting(result.routingTier, {
        journey,
        leadId: result.id,
        funnelVersion: FUNNEL_VERSION,
        tcpaConsent: true,
        marketingOptIn: data.marketingOptIn,
        propertyType: data.propertyType || undefined,
        equityStrategy,
        estimatedFundsRange: data.equityAccessRange || undefined,
      });
      setLeadId(result.id);
      setRoutingTier(result.routingTier);
      setSubmittedAt(consentAt);
      setSubmitted(true);
      setStep(FUNNEL_STEP_COUNT);
      syncHistory(FUNNEL_STEP_COUNT);
    } else {
      setSubmitError(result.error ?? SUBMIT_ERROR_MESSAGE);
    }
  }

  if (isConfirmationView) {
    return (
      <div
        id="post-submit-start"
        ref={confirmationRef}
        className="mx-auto w-full max-w-7xl scroll-mt-20"
      >
        <FunnelConfirmation
          propertyType={data.propertyType}
          leadId={leadId}
          routingTier={routingTier}
          propertyStreet={data.propertyStreet}
          propertyCity={data.propertyCity}
          propertyState={data.propertyState}
          propertyZip={data.propertyZip}
          equityAccessRange={data.equityAccessRange}
          submittedAt={submittedAt || new Date().toISOString()}
        />
      </div>
    );
  }

  const stepId = getFunnelStepId(step);
  const encouragement = getStepEncouragement(stepId, {
    equityAccessRange: data.equityAccessRange,
    creditScoreRange: data.creditScoreRange,
  });

  return (
    <div className="mx-auto flex w-full max-w-lg flex-col md:max-w-xl lg:max-w-2xl">
      {showPrimaryResidenceNote ? (
        <div className="mb-4 rounded-xl border border-sky-200/80 bg-sky-50/90 px-4 py-3 text-sm leading-relaxed text-sky-950">
          You selected a primary-residence equity scenario. A licensed mortgage professional will
          review whether a primary-residence HELOC or similar option may fit your goals.
        </div>
      ) : null}

      <div className="sticky top-0 z-10 -mx-4 border-b border-slate-100 bg-[var(--color-surface-50)]/95 px-4 py-3 backdrop-blur-sm sm:-mx-0 sm:rounded-t-2xl sm:border sm:border-b-0 sm:bg-white">
        <div className="flex items-center gap-3">
          {step > 1 ? (
            <button
              type="button"
              onClick={goBack}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-slate-600 transition hover:bg-slate-100"
              aria-label="Go back"
            >
              ←
            </button>
          ) : (
            <div className="w-10 shrink-0" aria-hidden />
          )}
          <div className="min-w-0 flex-1">
            <FunnelProgress currentStep={step} totalSteps={FUNNEL_QUESTION_COUNT} compact />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "card-surface flex-1 rounded-b-2xl px-4 py-5 sm:px-6 sm:py-7",
          step === 3 && "max-md:pb-28",
        )}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="max-md:funnel-mobile-flat space-y-5 sm:space-y-6"
          >
            <FunnelStepHeader
              title={getStepTitle(step)}
              subtitle={getStepSubtitle(step)}
              encouragement={encouragement}
            />

            {step === 1 ? (
              <FunnelAddressStep data={data} onChange={patch} onContinue={() => goNext(1)} />
            ) : null}

            {step === 2 ? (
              <FunnelRequestedFundsStep
                data={data}
                onChange={patch}
                onContinue={() => goNext(2)}
              />
            ) : null}

            {step === 3 ? (
              <FunnelContactStep
                data={data}
                onChange={patch}
                submitting={submitting}
                submitError={submitError}
                onSubmit={handleSubmit}
              />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return "Which rental property should we review?";
    case 2:
      return "How much would you like to access?";
    case 3:
      return "Start your personalized review";
    default:
      return getFunnelStepTitle(step);
  }
}

function getStepSubtitle(step: number): string | undefined {
  switch (step) {
    case 1:
      return "Enter your rental property address. A licensed mortgage professional will review your scenario.";
    case 2:
      return "Select the range that best matches your goal. This is not a loan offer.";
    case 3:
      return "Share your contact details so our team can follow up with financing options.";
    default:
      return undefined;
  }
}
