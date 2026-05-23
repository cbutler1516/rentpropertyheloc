"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FunnelProgress } from "@/components/forms/funnel-progress";
import {
  FUNNEL_GHOST,
  FUNNEL_SECONDARY,
  MoneyStep,
  OptionButton,
  StepNav,
  StepShell,
  TrustBullets,
} from "@/components/forms/funnel-steps";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { trackLeadFormStarted, trackLeadStepCompleted } from "@/lib/analytics/events";
import { submitLead } from "@/lib/lead/submit-lead";
import {
  FUNNEL_STEP_COUNT,
  mergeFunnelPrefill,
  parseFunnelPrefill,
  PROPERTY_TYPES,
  US_STATES,
  type LeadFunnelData,
} from "@/lib/lead-funnel";
import { COMPLIANCE_SHORT, COMPLIANCE_TIMING, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const STEP_NAMES = [
  "property_type",
  "property_state",
  "property_value",
  "mortgage_balance",
  "desired_funds",
  "monthly_rent",
  "contact_info",
  "confirmation",
] as const;

export function QualificationFunnel() {
  const reduceMotion = useReducedMotion();
  const router = useRouter();
  const searchParams = useSearchParams();
  const startedRef = useRef(false);
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [data, setData] = useState<LeadFunnelData>(() =>
    mergeFunnelPrefill(parseFunnelPrefill(searchParams)),
  );

  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    trackLeadFormStarted("check_options_funnel");
  }, []);

  useEffect(() => {
    const prefill = parseFunnelPrefill(searchParams);
    if (Object.keys(prefill).length > 0) {
      setData((prev) => mergeFunnelPrefill({ ...prev, ...prefill }));
      if (prefill.propertyType) setStep(2);
    }
  }, [searchParams]);

  function patch(partial: Partial<LeadFunnelData>) {
    setData((prev) => ({ ...prev, ...partial }));
  }

  function goNext() {
    trackLeadStepCompleted(step, STEP_NAMES[step - 1] ?? `step_${step}`);
    setStep((s) => Math.min(s + 1, FUNNEL_STEP_COUNT));
  }

  function goBack() {
    setStep((s) => Math.max(s - 1, 1));
  }

  async function handleContactSubmit() {
    setSubmitting(true);
    try {
      await submitLead(data);
      trackLeadStepCompleted(7, "contact_info");
      setStep(8);
    } finally {
      setSubmitting(false);
    }
  }

  const transition = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -16 },
        transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
      };

  return (
    <Card className="overflow-hidden border-slate-200/80 bg-white p-0 shadow-[0_20px_60px_rgba(15,23,42,0.12)]">
      <header className="border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white px-5 py-5 sm:px-8 sm:py-6">
        <FunnelProgress step={step} total={FUNNEL_STEP_COUNT} />
        <p className="mt-4 text-xs text-slate-500">
          Takes about 60 seconds · Not a commitment to lend · Subject to approval
        </p>
      </header>
      <div className="px-5 py-6 sm:px-8 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div key={step} {...transition}>
            {step === 1 && (
              <StepShell
                title="What type of rental property do you own?"
                subtitle="Select the option that best matches your asset."
              >
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {PROPERTY_TYPES.map((type) => (
                    <OptionButton
                      key={type.id}
                      selected={data.propertyType === type.id}
                      onClick={() => {
                        patch({ propertyType: type.id });
                        goNext();
                      }}
                    >
                      {type.label}
                    </OptionButton>
                  ))}
                </div>
              </StepShell>
            )}
            {step === 2 && (
              <StepShell
                title="Where is the property located?"
                subtitle="State where the rental is located."
              >
                <div className="space-y-3">
                  <Label htmlFor="propertyState">Property state</Label>
                  <select
                    id="propertyState"
                    value={data.propertyState}
                    onChange={(e) => patch({ propertyState: e.target.value })}
                    className="h-12 min-h-[44px] w-full rounded-xl border border-slate-200 bg-white px-4 text-base text-navy-950 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30 sm:text-sm"
                  >
                    <option value="">Select state</option>
                    {US_STATES.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                </div>
                <StepNav onBack={goBack} onNext={goNext} nextDisabled={!data.propertyState} />
              </StepShell>
            )}
            {step === 3 && (
              <MoneyStep
                title="Estimated property value"
                subtitle="Your best estimate of current market value."
                value={data.propertyValue}
                onChange={(v) => patch({ propertyValue: v })}
                onBack={goBack}
                onNext={goNext}
                min={50_000}
              />
            )}
            {step === 4 && (
              <MoneyStep
                title="Current mortgage balance"
                subtitle="Outstanding balance on the first lien, if any."
                value={data.mortgageBalance}
                onChange={(v) => patch({ mortgageBalance: Math.min(v, data.propertyValue) })}
                onBack={goBack}
                onNext={goNext}
                max={data.propertyValue}
              />
            )}
            {step === 5 && (
              <MoneyStep
                title="Desired cash amount"
                subtitle="How much equity access are you exploring?"
                value={data.desiredFunds}
                onChange={(v) => patch({ desiredFunds: v })}
                onBack={goBack}
                onNext={goNext}
                hint="Illustrative—final amounts subject to approval and property eligibility."
              />
            )}
            {step === 6 && (
              <MoneyStep
                title="Monthly rental income"
                subtitle="Gross rent collected per month."
                value={data.monthlyRent}
                onChange={(v) => patch({ monthlyRent: v })}
                onBack={goBack}
                onNext={goNext}
                suffix="/mo"
              />
            )}
            {step === 7 && (
              <StepShell
                title="How should we reach you?"
                subtitle="A licensed loan officer will follow up with options that may be available."
              >
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    void handleContactSubmit();
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input
                        id="firstName"
                        value={data.firstName}
                        onChange={(e) => patch({ firstName: e.target.value })}
                        required
                        autoComplete="given-name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input
                        id="lastName"
                        value={data.lastName}
                        onChange={(e) => patch({ lastName: e.target.value })}
                        required
                        autoComplete="family-name"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={data.email}
                      onChange={(e) => patch({ email: e.target.value })}
                      required
                      autoComplete="email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={data.phone}
                      onChange={(e) => patch({ phone: e.target.value })}
                      required
                      autoComplete="tel"
                    />
                  </div>
                  <TrustBullets />
                  <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      size="lg"
                      className={FUNNEL_GHOST}
                      onClick={goBack}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      size="lg"
                      className="min-h-[48px] flex-1 sm:flex-none sm:px-10"
                      disabled={submitting}
                    >
                      {submitting ? "Submitting…" : PRIMARY_CTA_LABEL}
                    </Button>
                  </div>
                  <p className="text-center text-xs leading-relaxed text-slate-500">
                    By submitting, you agree to be contacted about HELOC options. Not a loan
                    application. {COMPLIANCE_SHORT}
                  </p>
                </form>
              </StepShell>
            )}
            {step === 8 && (
              <StepShell title="You're all set" subtitle="Here's what happens next.">
                <div className="rounded-xl border border-emerald-200/80 bg-emerald-50/80 p-5 text-center">
                  <p className="text-lg font-semibold text-navy-950">Request received</p>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    A licensed loan officer will review your rental portfolio details and follow up
                    with structures that may be available—subject to approval and property
                    eligibility.
                  </p>
                  <p className="mt-3 text-xs text-slate-500">{COMPLIANCE_TIMING}</p>
                </div>
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  className={FUNNEL_SECONDARY}
                  onClick={() => router.push("/")}
                >
                  Back to homepage
                </Button>
              </StepShell>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </Card>
  );
}

export function FunnelLoading() {
  return (
    <Card className="animate-pulse border-slate-200/80 bg-white p-8">
      <div className="h-2 rounded-full bg-slate-200" />
      <div className="mt-8 h-8 w-2/3 rounded-lg bg-slate-200" />
      <div className="mt-4 h-12 rounded-xl bg-slate-100" />
    </Card>
  );
}
