"use client";

import { computePartialCompletionPercent } from "@/lib/leads/partial-completion";
import {
  trackPartialLeadAbandoned,
  trackPartialLeadStarted,
  trackPartialLeadUpdated,
} from "@/lib/analytics/conversion-events";
import { FUNNEL_VERSION } from "@/lib/leads/funnel-config";
import {
  clearPartialSessionProgress,
  getOrCreatePartialSessionId,
  savePartialProgressLocally,
} from "@/lib/leads/partial-lead-session";
import type { LeadFunnelData } from "@/lib/leads/types";
import type { EquityStrategy } from "@/lib/equity-calculator";
import { useCallback, useEffect, useRef } from "react";

const DEBOUNCE_MS = 1400;

type PartialSaveInput = {
  data: LeadFunnelData;
  step: number;
  journey: string;
  equityStrategy: EquityStrategy;
  submitted: boolean;
  sourceUrl?: string;
  queryParams?: Record<string, string>;
  utm?: Record<string, string>;
};

function buildPartialPayload(input: PartialSaveInput, options?: { abandoned?: boolean }) {
  const { data, step, journey, equityStrategy, sourceUrl, queryParams, utm } = input;
  const sessionId = getOrCreatePartialSessionId();
  const completionPercent = computePartialCompletionPercent(data, step);
  const abandoned = options?.abandoned === true;

  return {
    sessionId,
    funnelVersion: FUNNEL_VERSION,
    propertyType: data.propertyType || undefined,
    propertyStreet: data.propertyStreet || undefined,
    propertyCity: data.propertyCity || undefined,
    propertyState: data.propertyState || undefined,
    propertyZip: data.propertyZip || undefined,
    equityAccessRange: data.equityAccessRange || undefined,
    creditScoreRange: data.creditScoreRange || undefined,
    propertyValue: data.propertyValue,
    mortgageBalance: data.mortgageBalance,
    desiredCashAmount: data.desiredCashAmount,
    equityStrategy,
    currentStep: step,
    journey,
    sourceUrl,
    queryParams,
    utm,
    completionPercent,
    abandonedAtStep: abandoned ? step : undefined,
    isAbandoned: abandoned,
  };
}

function hasMeaningfulProgress(data: LeadFunnelData): boolean {
  return Boolean(
    data.propertyStreet?.trim() ||
      data.equityAccessRange ||
      data.creditScoreRange,
  );
}

export function usePartialLeadSave(input: PartialSaveInput) {
  const startedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPayloadRef = useRef<string>("");
  const abandonedRef = useRef(false);

  const postPartial = useCallback(async (payload: ReturnType<typeof buildPartialPayload>) => {
    try {
      await fetch("/api/leads/partial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        keepalive: true,
      });
    } catch {
      // silent — local backup already saved
    }
  }, []);

  const flushSave = useCallback(
    async (options?: { abandoned?: boolean }) => {
      if (input.submitted || !hasMeaningfulProgress(input.data)) return;

      const payload = buildPartialPayload(input, options);
      const serialized = JSON.stringify(payload);
      if (!options?.abandoned && serialized === lastPayloadRef.current) return;
      lastPayloadRef.current = serialized;

      savePartialProgressLocally(payload as unknown as Record<string, unknown>);

      const analyticsBase = {
        sessionId: payload.sessionId,
        step: input.step,
        journey: input.journey,
        completionPercent: payload.completionPercent,
        propertyType: payload.propertyType,
        equityStrategy: payload.equityStrategy,
      };

      if (options?.abandoned) {
        trackPartialLeadAbandoned({
          ...analyticsBase,
          abandonedStep: input.step,
        });
      } else if (!startedRef.current) {
        startedRef.current = true;
        trackPartialLeadStarted(analyticsBase);
      } else {
        trackPartialLeadUpdated(analyticsBase);
      }

      await postPartial(payload);
    },
    [input, postPartial],
  );

  useEffect(() => {
    if (input.submitted || !hasMeaningfulProgress(input.data)) return;

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      void flushSave();
    }, DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [input.data, input.step, input.equityStrategy, input.submitted, flushSave]);

  useEffect(() => {
    if (input.submitted) {
      clearPartialSessionProgress();
      return;
    }

    const onLeave = () => {
      if (input.submitted || abandonedRef.current || !hasMeaningfulProgress(input.data)) return;
      abandonedRef.current = true;
      void flushSave({ abandoned: true });
    };

    window.addEventListener("pagehide", onLeave);
    return () => window.removeEventListener("pagehide", onLeave);
  }, [input.submitted, input.data, flushSave]);
}
