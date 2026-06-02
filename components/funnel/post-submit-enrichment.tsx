"use client";

import { FastTrackHeroCard } from "@/components/funnel/gamification/fast-track-hero-card";
import { EnrichmentUnlockCards } from "@/components/funnel/gamification/enrichment-unlock-cards";
import { FinancingInsightsPanel } from "@/components/funnel/gamification/financing-insights-panel";
import { FinancingPathsSection } from "@/components/funnel/gamification/financing-paths-section";
import { ProfileCompleteCelebration } from "@/components/funnel/gamification/profile-complete-celebration";
import { ProfileStrengthBoostToast } from "@/components/funnel/gamification/profile-strength-meter";
import { FunnelOptionCard } from "@/components/funnel/funnel-option-card";
import { Button } from "@/components/ui/button";
import { AUTO_ADVANCE_DELAY_MS, FUNNEL_PROPERTY_OPTIONS } from "@/lib/leads/funnel-config";
import {
  calculateProfileStrength,
  getProfileStrengthBoostMessage,
  isEnrichmentStepComplete,
  isProfileComplete,
  MAX_PROFILE_STRENGTH,
  type ProfileStrengthField,
} from "@/lib/leads/investor-review-gamification";
import type { InvestorSnapshotData } from "@/lib/leads/investor-snapshot-document";
import { downloadInvestorSnapshot } from "@/lib/leads/investor-snapshot-document";
import {
  CREDIT_SCORE_RANGES,
  FUNDING_TIMELINE_OPTIONS,
  MORTGAGE_BALANCE_RANGES,
  PROPERTY_COUNT_OPTIONS,
  PROPERTY_RENTED_OPTIONS,
  type CreditScoreRangeId,
  type FundingTimelineId,
  type MortgageBalanceRangeId,
  type PropertyCountId,
  type PropertyRentedId,
  type PropertyValueRangeId,
} from "@/lib/leads/funnel-ranges";
import type { PropertyTypeId } from "@/lib/leads/types";
import { trackEnrichmentCompleted } from "@/lib/analytics/conversion-events";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type EnrichmentData = {
  propertyType: PropertyTypeId | "";
  propertyValueRange: PropertyValueRangeId | "";
  mortgageBalanceRange: MortgageBalanceRangeId | "";
  creditScoreRange: CreditScoreRangeId | "";
  propertyCount: PropertyCountId | "";
  fundingTimeline: FundingTimelineId | "";
  propertyRented: PropertyRentedId | "";
};

type SnapshotContext = {
  propertyAddress: string;
  requestedFunds: string;
  submissionDate: string;
};

type PostSubmitEnrichmentProps = {
  leadId: string;
  className?: string;
  embedded?: boolean;
  continuousFlow?: boolean;
  focused?: boolean;
  showPriority?: boolean;
  snapshotContext?: SnapshotContext;
  onProfileStrengthChange?: (strength: number) => void;
  onProfileComplete?: () => void;
  onEnrichmentSaved?: () => void;
};

const ENRICHMENT_STEP_COUNT = 3;

export function PostSubmitEnrichment({
  leadId,
  className,
  embedded = false,
  continuousFlow = false,
  focused = false,
  showPriority = false,
  snapshotContext,
  onProfileStrengthChange,
  onProfileComplete,
  onEnrichmentSaved,
}: PostSubmitEnrichmentProps) {
  const reduceMotion = useReducedMotion();
  const advanceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const submitTriggeredRef = useRef(false);
  const prevStrengthRef = useRef(calculateProfileStrength({}));

  const [step, setStep] = useState(1);
  const [data, setData] = useState<EnrichmentData>({
    propertyType: "",
    propertyValueRange: "",
    mortgageBalanceRange: "",
    creditScoreRange: "",
    propertyCount: "",
    fundingTimeline: "",
    propertyRented: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const [boostMessage, setBoostMessage] = useState<string | null>(null);
  const [lastBoostField, setLastBoostField] = useState<ProfileStrengthField | null>(null);

  const profileStrength = useMemo(() => calculateProfileStrength(data), [data]);
  const profileComplete = isProfileComplete(profileStrength);
  const hasAnyAnswer = useMemo(
    () => Object.values(data).some((value) => Boolean(value?.trim())),
    [data],
  );

  const snapshotData: InvestorSnapshotData | null = useMemo(() => {
    if (!snapshotContext) return null;
    return {
      ...snapshotContext,
      reviewStatus: profileComplete
        ? "Profile Complete — Review In Progress"
        : "Review Started",
      profileStrength,
      priorityReviewActive: showPriority,
      profileComplete: profileComplete && submitted,
    };
  }, [snapshotContext, profileStrength, profileComplete, showPriority, submitted]);

  useEffect(() => {
    onProfileStrengthChange?.(profileStrength);
    if (profileStrength > prevStrengthRef.current && lastBoostField) {
      setBoostMessage(getProfileStrengthBoostMessage(lastBoostField));
      const timer = setTimeout(() => setBoostMessage(null), 2200);
      prevStrengthRef.current = profileStrength;
      return () => clearTimeout(timer);
    }
    prevStrengthRef.current = profileStrength;
  }, [profileStrength, onProfileStrengthChange, lastBoostField]);

  useEffect(() => {
    return () => {
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    };
  }, []);

  const submitEnrichment = useCallback(async () => {
    if (submitTriggeredRef.current) return;
    submitTriggeredRef.current = true;
    setSubmitting(true);
    try {
      await fetch("/api/leads/enrich", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId,
          propertyType: data.propertyType || undefined,
          propertyValueRange: data.propertyValueRange || undefined,
          mortgageBalanceRange: data.mortgageBalanceRange || undefined,
          creditScoreRange: data.creditScoreRange || undefined,
          propertyCount: data.propertyCount || undefined,
          fundingTimeline: data.fundingTimeline || undefined,
          propertyRented: data.propertyRented || undefined,
        }),
      });
      setSubmitted(true);
      trackEnrichmentCompleted({ leadId });
      onEnrichmentSaved?.();
      const complete = isProfileComplete(calculateProfileStrength(data));
      if (complete) {
        onProfileComplete?.();
        if (snapshotContext) {
          downloadInvestorSnapshot({
            propertyAddress: snapshotContext.propertyAddress,
            requestedFunds: snapshotContext.requestedFunds,
            submissionDate: snapshotContext.submissionDate,
            reviewStatus: "Profile Complete — Review In Progress",
            profileStrength: MAX_PROFILE_STRENGTH,
            priorityReviewActive: showPriority,
            profileComplete: true,
          });
        }
      }
    } catch {
      setSubmitted(true);
      trackEnrichmentCompleted({ leadId });
      onEnrichmentSaved?.();
    } finally {
      setSubmitting(false);
    }
  }, [leadId, data, onProfileComplete, onEnrichmentSaved, snapshotContext, showPriority]);

  const handleSubmit = useCallback(async () => {
    if (!hasAnyAnswer) return;
    await submitEnrichment();
  }, [hasAnyAnswer, submitEnrichment]);

  function patch(partial: Partial<EnrichmentData>, field?: ProfileStrengthField) {
    setData((prev) => ({ ...prev, ...partial }));
    if (field) setLastBoostField(field);
  }

  function scheduleAdvance(nextStep: number, selectionKey: string) {
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    setPendingSelection(selectionKey);
    advanceTimerRef.current = setTimeout(() => {
      setPendingSelection(null);
      setStep(nextStep);
    }, AUTO_ADVANCE_DELAY_MS);
  }

  function handleSelect<K extends keyof EnrichmentData>(
    field: K,
    value: EnrichmentData[K],
    selectionKey: string,
  ) {
    const nextData = { ...data, [field]: value };
    patch({ [field]: value }, field as ProfileStrengthField);

    if (isEnrichmentStepComplete(step, nextData) && step < ENRICHMENT_STEP_COUNT) {
      scheduleAdvance(step + 1, selectionKey);
    }
  }

  useEffect(() => {
    if (step !== 3 || !data.propertyRented || submitting || submitted) return;
    if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
    advanceTimerRef.current = setTimeout(() => {
      void submitEnrichment();
    }, AUTO_ADVANCE_DELAY_MS);
  }, [step, data.propertyRented, submitting, submitted, submitEnrichment]);

  if (skipped) {
    return null;
  }

  if (submitted && snapshotData && !focused) {
    return (
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className={className}
      >
        {profileComplete ? (
          <ProfileCompleteCelebration
            profileStrength={MAX_PROFILE_STRENGTH}
            showPriority={showPriority}
            snapshotData={snapshotData}
          />
        ) : (
          <>
            <FastTrackHeroCard profileStrength={profileStrength} showPriority={showPriority} />
            <p className="mt-3 text-center text-sm font-medium text-slate-700">
              Review started — your details were saved. Our team will continue your review.
            </p>
          </>
        )}
      </motion.div>
    );
  }

  if (submitted && focused) {
    return null;
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: embedded ? 0.1 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      <div className={focused ? "space-y-4" : continuousFlow ? "space-y-5" : "space-y-5 px-1 sm:px-0"}>
        {!focused ? (
          <FastTrackHeroCard profileStrength={profileStrength} showPriority={showPriority} />
        ) : null}

        {!focused ? (
          <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-6 lg:border-t lg:border-slate-100 lg:pt-5">
            <div className="border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">
                    Step {step} of {ENRICHMENT_STEP_COUNT}
                  </p>
                  <h4 className="mt-1 text-sm font-semibold text-slate-900 sm:text-base lg:text-lg">
                    {stepHeadlines[step]}
                  </h4>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <AnimatePresence mode="wait">
                    {boostMessage ? (
                      <ProfileStrengthBoostToast key={boostMessage} message={boostMessage} />
                    ) : null}
                  </AnimatePresence>
                  <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold tabular-nums text-teal-800 ring-1 ring-teal-100">
                    {profileStrength}% strength
                  </span>
                </div>
              </div>
              <EnrichmentUnlockCards data={data} className="mt-4" compact />
            </div>

            <div className="mt-4 border-t border-slate-100 pt-4 lg:mt-0 lg:border-t-0 lg:pt-0">
              <FinancingInsightsPanel data={data} compact />
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">
                Review started — finish your investor profile
              </p>
              <h4 className="mt-1 text-base font-semibold text-slate-900 sm:text-lg">
                Step {step} of {ENRICHMENT_STEP_COUNT}: {stepHeadlines[step]}
              </h4>
            </div>
            <div className="flex flex-col items-end gap-1">
              <AnimatePresence mode="wait">
                {boostMessage ? (
                  <ProfileStrengthBoostToast key={boostMessage} message={boostMessage} />
                ) : null}
              </AnimatePresence>
              <span className="rounded-full bg-teal-50 px-2.5 py-1 text-[11px] font-bold tabular-nums text-teal-800 ring-1 ring-teal-100">
                {profileStrength}% profile
              </span>
            </div>
          </div>
        )}

        {!focused ? (
          <div className="hidden lg:block">
            <FinancingPathsSection profileStrength={profileStrength} variant="compact" />
          </div>
        ) : null}

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -8 }}
            transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            {step === 1 ? (
              <>
                <EnrichmentGroup title="Property type">
                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                    {FUNNEL_PROPERTY_OPTIONS.map((option) => (
                      <FunnelOptionCard
                        key={option.id}
                        label={option.label}
                        selected={data.propertyType === option.id}
                        pending={pendingSelection === `type-${option.id}`}
                        onSelect={() =>
                          handleSelect("propertyType", option.id, `type-${option.id}`)
                        }
                      />
                    ))}
                  </div>
                </EnrichmentGroup>
                <EnrichmentGroup title="Mortgage balance">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {MORTGAGE_BALANCE_RANGES.map((option) => (
                      <FunnelOptionCard
                        key={option.id}
                        label={option.label}
                        selected={data.mortgageBalanceRange === option.id}
                        pending={pendingSelection === `mortgage-${option.id}`}
                        onSelect={() =>
                          handleSelect("mortgageBalanceRange", option.id, `mortgage-${option.id}`)
                        }
                      />
                    ))}
                  </div>
                </EnrichmentGroup>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <EnrichmentGroup title="Credit score">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {CREDIT_SCORE_RANGES.map((option) => (
                      <FunnelOptionCard
                        key={option.id}
                        label={option.label}
                        selected={data.creditScoreRange === option.id}
                        pending={pendingSelection === `credit-${option.id}`}
                        onSelect={() =>
                          handleSelect("creditScoreRange", option.id, `credit-${option.id}`)
                        }
                      />
                    ))}
                  </div>
                </EnrichmentGroup>
                <EnrichmentGroup title="Investment properties owned">
                  <div className="grid grid-cols-1 gap-2 min-[400px]:grid-cols-3">
                    {PROPERTY_COUNT_OPTIONS.map((option) => (
                      <FunnelOptionCard
                        key={option.id}
                        label={option.label}
                        selected={data.propertyCount === option.id}
                        pending={pendingSelection === `count-${option.id}`}
                        onSelect={() =>
                          handleSelect("propertyCount", option.id, `count-${option.id}`)
                        }
                      />
                    ))}
                  </div>
                </EnrichmentGroup>
                <EnrichmentGroup title="Funding timeline">
                  <div className="grid gap-2 sm:grid-cols-2">
                    {FUNDING_TIMELINE_OPTIONS.map((option) => (
                      <FunnelOptionCard
                        key={option.id}
                        label={option.label}
                        selected={data.fundingTimeline === option.id}
                        pending={pendingSelection === `timeline-${option.id}`}
                        onSelect={() =>
                          handleSelect("fundingTimeline", option.id, `timeline-${option.id}`)
                        }
                      />
                    ))}
                  </div>
                </EnrichmentGroup>
              </>
            ) : null}

            {step === 3 ? (
              <EnrichmentGroup title="Is the property currently rented?">
                <div className="grid grid-cols-2 gap-2 sm:max-w-md">
                  {PROPERTY_RENTED_OPTIONS.map((option) => (
                    <FunnelOptionCard
                      key={option.id}
                      label={option.label}
                      selected={data.propertyRented === option.id}
                      pending={pendingSelection === `rented-${option.id}` || submitting}
                      onSelect={() => {
                        setPendingSelection(`rented-${option.id}`);
                        patch({ propertyRented: option.id }, "propertyRented");
                      }}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  Selecting an option saves your profile and continues your review.
                </p>
              </EnrichmentGroup>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            {step > 1 ? (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                onClick={() => {
                  if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
                  setPendingSelection(null);
                  setStep((current) => Math.max(1, current - 1));
                }}
              >
                Back
              </Button>
            ) : null}
            {step < ENRICHMENT_STEP_COUNT ? (
              <Button
                type="button"
                size="sm"
                className="rounded-xl"
                disabled={!isEnrichmentStepComplete(step, data)}
                onClick={() => {
                  if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
                  setPendingSelection(null);
                  setStep((current) => Math.min(ENRICHMENT_STEP_COUNT, current + 1));
                }}
              >
                Continue
              </Button>
            ) : (
              <Button
                type="button"
                size="lg"
                className="thumb-btn h-11 text-sm sm:max-w-xs"
                disabled={submitting || !data.propertyRented}
                onClick={handleSubmit}
              >
                {submitting ? "Saving…" : "Save & continue review"}
              </Button>
            )}
          </div>
          <button
            type="button"
            onClick={() => setSkipped(true)}
            className="min-h-[44px] px-2 text-center text-xs font-medium text-slate-400 underline-offset-2 transition hover:text-slate-600 hover:underline sm:min-h-0"
          >
            Skip for now
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const stepHeadlines: Record<number, string> = {
  1: "Property details",
  2: "Investor profile",
  3: "Rental status",
};

function EnrichmentGroup({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-700">{title}</p>
      {children}
    </div>
  );
}
