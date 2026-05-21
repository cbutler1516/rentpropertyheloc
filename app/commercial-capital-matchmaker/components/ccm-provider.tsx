"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { nanoid } from "nanoid";
import { emptyIntake } from "../lib/defaults";
import {
  buildRecommendedFollowUp,
  inferLeadQualityTag,
} from "../lib/lead-quality";
import { isIntakeReadyForAnalysis, runCcmAnalysis } from "../lib/run-analysis";
import { buildSampleSession } from "../lib/sample-strategy";
import { loadCcmSession, saveCcmSession } from "../lib/storage";
import type {
  CcmLeadRecord,
  CcmSession,
  DealIntake,
  LeadQualityTag,
} from "../lib/types";

type CcmContextValue = CcmSession & {
  hydrated: boolean;
  setIntake: (patch: Partial<DealIntake>) => void;
  resetIntake: () => void;
  submitIntake: () => boolean;
  loadSampleStrategy: () => void;
  updateLeadQuality: (leadId: string, qualityTag: LeadQualityTag) => void;
  clearAll: () => void;
};

const CcmContext = createContext<CcmContextValue | null>(null);

export function CcmProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<CcmSession>({
    intake: emptyIntake,
    recommendation: null,
    matches: [],
    summary: null,
    leads: [],
  });
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSession(loadCcmSession());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveCcmSession(session);
  }, [session, hydrated]);

  const setIntake = useCallback((patch: Partial<DealIntake>) => {
    setSession((prev) => ({
      ...prev,
      intake: { ...prev.intake, ...patch },
    }));
  }, []);

  const resetIntake = useCallback(() => {
    setSession((prev) => ({
      ...prev,
      intake: emptyIntake,
      recommendation: null,
      matches: [],
      summary: null,
    }));
  }, []);

  const submitIntake = useCallback((): boolean => {
    let ok = false;

    setSession((prev) => {
      if (!isIntakeReadyForAnalysis(prev.intake)) return prev;

      const analysis = runCcmAnalysis(prev.intake);
      if (!analysis) return prev;

      ok = true;

      const lead: CcmLeadRecord = {
        id: nanoid(10),
        createdAt: new Date().toISOString(),
        qualityTag: inferLeadQualityTag(prev.intake, analysis.recommendation),
        recommendedFollowUp: buildRecommendedFollowUp(
          prev.intake,
          analysis.recommendation,
        ),
        intake: prev.intake,
        recommendation: analysis.recommendation,
        matchCount: analysis.matches.length,
      };

      return {
        ...prev,
        ...analysis,
        leads: [
          lead,
          ...prev.leads.filter(
            (l) => l.intake.sponsorEmail !== prev.intake.sponsorEmail,
          ),
        ].slice(0, 50),
      };
    });

    return ok;
  }, []);

  const loadSampleStrategy = useCallback(() => {
    const sample = buildSampleSession();
    setSession((prev) => ({
      ...prev,
      ...sample,
    }));
  }, []);

  const updateLeadQuality = useCallback(
    (leadId: string, qualityTag: LeadQualityTag) => {
      setSession((prev) => ({
        ...prev,
        leads: prev.leads.map((lead) =>
          lead.id === leadId ? { ...lead, qualityTag } : lead,
        ),
      }));
    },
    [],
  );

  const clearAll = useCallback(() => {
    setSession({
      intake: emptyIntake,
      recommendation: null,
      matches: [],
      summary: null,
      leads: [],
    });
  }, []);

  const value = useMemo<CcmContextValue>(
    () => ({
      ...session,
      hydrated,
      setIntake,
      resetIntake,
      submitIntake,
      loadSampleStrategy,
      updateLeadQuality,
      clearAll,
    }),
    [
      session,
      hydrated,
      setIntake,
      resetIntake,
      submitIntake,
      loadSampleStrategy,
      updateLeadQuality,
      clearAll,
    ],
  );

  return <CcmContext.Provider value={value}>{children}</CcmContext.Provider>;
}

export function useCcm() {
  const ctx = useContext(CcmContext);
  if (!ctx) {
    throw new Error("useCcm must be used within CcmProvider");
  }
  return ctx;
}
