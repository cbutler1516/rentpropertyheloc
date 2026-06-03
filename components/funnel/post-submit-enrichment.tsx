"use client";

import { FastTrackHeroCard } from "@/components/funnel/gamification/fast-track-hero-card";
import { EnrichmentUnlockCards } from "@/components/funnel/gamification/enrichment-unlock-cards";
import { FinancingInsightsPanel } from "@/components/funnel/gamification/financing-insights-panel";
import { FinancingPathsSection } from "@/components/funnel/gamification/financing-paths-section";
import { ProfileCompleteCelebration } from "@/components/funnel/gamification/profile-complete-celebration";
import { ProfileStrengthBoostToast } from "@/components/funnel/gamification/profile-strength-meter";
import { PostSubmitProfileStrength } from "@/components/funnel/gamification/post-submit-profile-strength";
import { FunnelOptionCard } from "@/components/funnel/funnel-option-card";
import { Button } from "@/components/ui/button";
import { AUTO_ADVANCE_DELAY_MS, FUNNEL_PROPERTY_OPTIONS } from "@/lib/leads/funnel-config";
import {
  calculateProfileStrength,
  getProfileStrengthBoostMessage,
  isEnrichmentDataComplete,
  isEnrichmentStepComplete,
  isProfileComplete,
  MAX_PROFILE_STRENGTH,
  type ProfileStrengthField,
} from "@/lib/leads/investor-review-gamification";
import type { FinancingReviewData } from "@/lib/leads/financing-review-document";
import {
  CREDIT_SCORE_RANGES,
  FUNDING_TIMELINE_OPTIONS,
  MORTGAGE_BALANCE_RANGES,
  PROPERTY_COUNT_OPTIONS,
  type CreditScoreRangeId,
  type FundingTimelineId,
  type MortgageBalanceRangeId,
  type PropertyCountId,
  type PropertyValueRangeId,
} from "@/lib/leads/funnel-ranges";
import type { PropertyTypeId } from "@/lib/leads/types";
import { cn } from "@/lib/cn";
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
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [pendingSelection, setPendingSelection] = useState<string | null>(null);
  const [boostMessage, setBoostMessage] = useState<string | null>(null);
  const [lastBoostField, setLastBoostField] = useState<ProfileStrengthField | null>(null);

  const profileStrength = useMemo(() => calculateProfileStrength(data), [data]);
  const profileComplete = isProfileComplete(profileStrength);

  const snapshotData: FinancingReviewData | null = useMemo(() => {
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
        }),
      });
      setSubmitted(true);
      trackEnrichmentCompleted({ leadId });
      onEnrichmentSaved?.();
      const complete = isEnrichmentDataComplete(data);
      if (complete) {
        onProfileComplete?.();
      }
    } catch {
      setSubmitted(true);
      trackEnrichmentCompleted({ leadId });
      onEnrichmentSaved?.();
    } finally {
      setSubmitting(false);
    }
  }, [leadId, data, onProfileComplete, onEnrichmentSaved, snapshotContext, showPriority]);

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
    const stepComplete = isEnrichmentStepComplete(step, nextData);

    if (stepComplete && step < ENRICHMENT_STEP_COUNT) {
      scheduleAdvance(step + 1, selectionKey);
    } else if (stepComplete && step === ENRICHMENT_STEP_COUNT) {
      setPendingSelection(selectionKey);
      if (advanceTimerRef.current) clearTimeout(advanceTimerRef.current);
      advanceTimerRef.current = setTimeout(() => {
        setPendingSelection(null);
        void submitEnrichment();
      }, AUTO_ADVANCE_DELAY_MS);
    }
  }

  if (skipped) {
    return null;
  }

  if (submitted && snapshotData && !focused) {
    const reviewData: FinancingReviewData = {
      ...snapshotData,
      profileStrength: profileComplete ? MAX_PROFILE_STRENGTH : snapshotData.profileStrength,
      profileComplete: profileComplete,
    };

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
            snapshotData={reviewData}
            autoOpenReviewModal
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
      <div className={focused ? "space-y-3" : continuousFlow ? "space-y-5" : "space-y-5 px-1 sm:px-0"}>
        {!focused ? (
          <FastTrackHeroCard profileStrength={profileStrength} showPriority={showPriority} />
        ) : (
          <PostSubmitProfileStrength strength={profileStrength} variant="inline" />
        )}

        {!focused ? (
          <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-6 lg:border-t lg:border-slate-100 lg:pt-5">
            <div className="border-t border-slate-100 pt-4 lg:border-t-0 lg:pt-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h4 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                    {stepSectionTitles[step]}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500">
                    Section {step} of {ENRICHMENT_STEP_COUNT}
                  </p>
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
        ) : null}

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
            className="space-y-0"
          >
            {step === 1 ? (
              <>
                <EnrichmentGroup icon="🏠" title="Property Type">
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
                <EnrichmentGroup icon="💰" title="Mortgage Balance" showDivider>
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
                <EnrichmentGroup icon="📈" title="Credit Score">
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
                <EnrichmentGroup icon="🏘️" title="Investment Properties Owned" showDivider>
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
              </>
            ) : null}

            {step === 3 ? (
              <EnrichmentGroup icon="⏱️" title="Funding Timeline">
                <div className="grid gap-2 sm:grid-cols-2">
                  {FUNDING_TIMELINE_OPTIONS.map((option) => (
                    <FunnelOptionCard
                      key={option.id}
                      label={option.label}
                      selected={data.fundingTimeline === option.id}
                      pending={
                        pendingSelection === `timeline-${option.id}` || submitting
                      }
                      onSelect={() =>
                        handleSelect("fundingTimeline", option.id, `timeline-${option.id}`)
                      }
                    />
                  ))}
                </div>
              </EnrichmentGroup>
            ) : null}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-2 border-t border-slate-100 pt-3 sm:flex-row sm:items-center sm:justify-between">
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
            ) : submitting ? (
              <span className="text-sm font-medium text-slate-600">Saving your profile…</span>
            ) : null}
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

const stepSectionTitles: Record<number, string> = {
  1: "Tell Us About Your Property",
  2: "Tell Us About Your Investor Profile",
  3: "When Do You Need Funding?",
};

function EnrichmentGroup({
  icon,
  title,
  children,
  showDivider = false,
}: {
  icon?: string;
  title: string;
  children: React.ReactNode;
  showDivider?: boolean;
}) {
  return (
    <section
      className={cn(
        showDivider && "mt-5 border-t border-slate-100/90 pt-5",
        !showDivider && "pt-0.5",
      )}
    >
      <h3 className="mb-3 flex items-center gap-2 text-base font-semibold tracking-tight text-slate-900 sm:text-lg">
        {icon ? (
          <span aria-hidden className="text-base leading-none sm:text-lg">
            {icon}
          </span>
        ) : null}
        {title}
      </h3>
      {children}
    </section>
  );
}
