import type { DealAnalysisResult, DealInputs, LeadCapture } from "../types";
import type { PlaybookNarrative } from "../narrative-types";

export type StoredReportPayload = {
  slug: string;
  createdAt: string;
  lead: LeadCapture;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
  narrative: PlaybookNarrative;
  referralSource: string | null;
  agentName: string | null;
};

export type PersistReportResult =
  | { ok: true; slug: string; source: "supabase" | "local" }
  | { ok: false; error: string };
