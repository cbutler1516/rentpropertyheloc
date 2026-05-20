"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { analyzeDeal } from "../lib/calculators/analyze-deal";
import { persistDealReport } from "../lib/persist-report";
import { loadSession, saveSession } from "../lib/storage";
import type {
  DealAnalysisResult,
  DealAnalyzerSession,
  DealInputs,
  LeadCapture,
} from "../lib/types";
import { defaultSession } from "../lib/types";

type SubmitLeadResult =
  | { ok: true; slug: string }
  | { ok: false; error: string };

type DealAnalyzerContextValue = DealAnalyzerSession & {
  setInputs: (inputs: DealInputs) => void;
  submitLead: (lead: LeadCapture) => Promise<SubmitLeadResult>;
  reset: () => void;
  hydrated: boolean;
};

const DealAnalyzerContext = createContext<DealAnalyzerContextValue | null>(null);

export function DealAnalyzerProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<DealAnalyzerSession>(defaultSession);
  const [hydrated, setHydrated] = useState(false);
  const sessionRef = useRef(session);

  useEffect(() => {
    sessionRef.current = session;
  }, [session]);

  useEffect(() => {
    setSession(loadSession());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated) saveSession(session);
  }, [session, hydrated]);

  const setInputs = useCallback((inputs: DealInputs) => {
    const analysis: DealAnalysisResult = analyzeDeal(inputs);
    setSession((prev) => ({
      ...prev,
      inputs,
      analysis,
      reportUnlocked: false,
      reportSlug: null,
    }));
  }, []);

  const submitLead = useCallback(
    async (lead: LeadCapture): Promise<SubmitLeadResult> => {
      const { inputs, analysis } = sessionRef.current;

      if (!inputs || !analysis) {
        return { ok: false, error: "Complete your deal details first." };
      }

      const result = await persistDealReport({ lead, inputs, analysis });

      if (!result.ok) {
        return { ok: false, error: result.error };
      }

      setSession((prev) => ({
        ...prev,
        lead,
        reportSlug: result.slug,
        reportUnlocked: true,
      }));

      return { ok: true, slug: result.slug };
    },
    [],
  );

  const reset = useCallback(() => {
    setSession(defaultSession);
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("loan-playbook-deal-analyzer");
    }
  }, []);

  const value = useMemo(
    () => ({
      ...session,
      setInputs,
      submitLead,
      reset,
      hydrated,
    }),
    [session, setInputs, submitLead, reset, hydrated],
  );

  return (
    <DealAnalyzerContext.Provider value={value}>
      {children}
    </DealAnalyzerContext.Provider>
  );
}

export function useDealAnalyzer() {
  const ctx = useContext(DealAnalyzerContext);
  if (!ctx) {
    throw new Error("useDealAnalyzer must be used within DealAnalyzerProvider");
  }
  return ctx;
}
