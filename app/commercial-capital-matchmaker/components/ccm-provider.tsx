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
import { emptyIntake } from "../lib/defaults";
import {
  captureLead,
  createLeadRecord,
  patchLead,
  strategyReviewToIntake,
} from "../lib/leads";
import { isIntakeReadyForAnalysis, runCcmAnalysis } from "../lib/run-analysis";
import { buildLawFirmSampleSession } from "../lib/sample-strategy";
import { loadCcmSession, saveCcmSession } from "../lib/storage";
import type {
  CcmLeadRecord,
  CcmSession,
  DealIntake,
  LeadQualityTag,
  LeadSource,
  LeadStatus,
  StrategyReviewSubmission,
} from "../lib/types";

type CcmContextValue = CcmSession & {
  hydrated: boolean;
  setIntake: (patch: Partial<DealIntake>) => void;
  resetIntake: () => void;
  submitIntake: () => boolean;
  submitStrategyReview: (
    form: StrategyReviewSubmission,
    source?: LeadSource,
  ) => boolean;
  loadSampleStrategy: () => void;
  updateLeadQuality: (leadId: string, qualityTag: LeadQualityTag) => void;
  updateLeadStatus: (leadId: string, status: LeadStatus) => void;
  updateLeadNotes: (leadId: string, notes: string) => void;
  markLeadReviewed: (leadId: string) => void;
  markLeadDocsNeeded: (leadId: string) => void;
  markLeadLenderReady: (leadId: string) => void;
  archiveLead: (leadId: string) => void;
  clearAll: () => void;
};

const CcmContext = createContext<CcmContextValue | null>(null);

function statusPatch(status: LeadStatus): Partial<CcmLeadRecord> {
  const patch: Partial<CcmLeadRecord> = { status };
  if (status === "reviewed") patch.qualityTag = "needs-review";
  if (status === "docs-needed") patch.qualityTag = "docs-needed";
  if (status === "lender-ready") patch.qualityTag = "lender-ready";
  return patch;
}

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

      const lead = createLeadRecord({
        source: "intake",
        intake: prev.intake,
        recommendation: analysis.recommendation,
        matchCount: analysis.matches.length,
      });

      return {
        ...prev,
        ...analysis,
        leads: captureLead(prev.leads, lead),
      };
    });

    return ok;
  }, []);

  const submitStrategyReview = useCallback(
    (form: StrategyReviewSubmission, source: LeadSource = "strategy-review"): boolean => {
      if (!form.consent || !form.name.trim() || !form.email.includes("@")) {
        return false;
      }

      let ok = false;

      setSession((prev) => {
        const intake = strategyReviewToIntake(form);
        intake.dealNotes = [
          `Transaction: ${form.transactionType}`,
          form.propertyAddress ? `Address: ${form.propertyAddress}` : "",
          form.estimatedValue ? `Est. value: ${form.estimatedValue}` : "",
          form.requestedLoanAmount ? `Loan request: ${form.requestedLoanAmount}` : "",
          form.phone ? `Phone: ${form.phone}` : "",
          form.notes,
        ]
          .filter(Boolean)
          .join("\n");

        const lead = createLeadRecord({
          source,
          intake,
          recommendation: prev.recommendation,
          matchCount: prev.matches.length,
          strategyReview: form,
          recommendedFollowUp:
            "Chris Butler to review deal package and respond with capital path guidance within one business day.",
          missingDocuments: [
            "Purchase agreement or term sheet",
            "Trailing T-12 / operating statement",
            "Sponsor personal financial statement",
            "Entity documents",
            "Tax returns or business financials",
            "Property debt schedule",
          ],
        });

        ok = true;

        return {
          ...prev,
          intake: {
            ...prev.intake,
            sponsorName: form.name,
            sponsorEmail: form.email,
            companyName: form.company,
          },
          leads: captureLead(prev.leads, lead),
        };
      });

      return ok;
    },
    [],
  );

  const loadSampleStrategy = useCallback(() => {
    const sample = buildLawFirmSampleSession();
    setSession((prev) => ({
      ...prev,
      ...sample,
    }));
  }, []);

  const updateLeadNotes = useCallback((leadId: string, notes: string) => {
    setSession((prev) => ({
      ...prev,
      leads: patchLead(prev.leads, leadId, { notes }),
    }));
  }, []);

  const updateLeadQuality = useCallback(
    (leadId: string, qualityTag: LeadQualityTag) => {
      setSession((prev) => ({
        ...prev,
        leads: patchLead(prev.leads, leadId, { qualityTag }),
      }));
    },
    [],
  );

  const updateLeadStatus = useCallback((leadId: string, status: LeadStatus) => {
    setSession((prev) => ({
      ...prev,
      leads: patchLead(prev.leads, leadId, statusPatch(status)),
    }));
  }, []);

  const markLeadReviewed = useCallback(
    (leadId: string) => {
      setSession((prev) => ({
        ...prev,
        leads: patchLead(prev.leads, leadId, statusPatch("reviewed")),
      }));
    },
    [],
  );

  const markLeadDocsNeeded = useCallback(
    (leadId: string) => {
      setSession((prev) => ({
        ...prev,
        leads: patchLead(prev.leads, leadId, statusPatch("docs-needed")),
      }));
    },
    [],
  );

  const markLeadLenderReady = useCallback(
    (leadId: string) => {
      setSession((prev) => ({
        ...prev,
        leads: patchLead(prev.leads, leadId, statusPatch("lender-ready")),
      }));
    },
    [],
  );

  const archiveLead = useCallback(
    (leadId: string) => {
      setSession((prev) => ({
        ...prev,
        leads: patchLead(prev.leads, leadId, statusPatch("archived")),
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
      submitStrategyReview,
      loadSampleStrategy,
      updateLeadQuality,
      updateLeadStatus,
      updateLeadNotes,
      markLeadReviewed,
      markLeadDocsNeeded,
      markLeadLenderReady,
      archiveLead,
      clearAll,
    }),
    [
      session,
      hydrated,
      setIntake,
      resetIntake,
      submitIntake,
      submitStrategyReview,
      loadSampleStrategy,
      updateLeadQuality,
      updateLeadStatus,
      updateLeadNotes,
      markLeadReviewed,
      markLeadDocsNeeded,
      markLeadLenderReady,
      archiveLead,
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
