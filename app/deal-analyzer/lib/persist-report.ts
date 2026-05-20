import { generateReportSlug } from "./generate-slug";
import { saveLocalReport } from "./local-reports";
import type { PlaybookNarrative } from "./narrative-types";
import { isSupabaseConfigured } from "./supabase/env";
import type { PersistReportResult } from "./supabase/types";
import type { DealAnalysisResult, DealInputs, LeadCapture } from "./types";

export type SaveReportPayload = {
  lead: LeadCapture;
  inputs: DealInputs;
  analysis: DealAnalysisResult;
};

async function fetchNarrative(
  payload: SaveReportPayload,
): Promise<PlaybookNarrative> {
  const res = await fetch("/api/deal-analyzer/generate-narrative", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      dealType: payload.inputs.path,
      leadRole: payload.lead.role,
      leadName: payload.lead.name,
      referralSource: payload.lead.referralSource,
      agentName: payload.lead.agentName,
      notes: payload.lead.notes,
      inputs: payload.inputs,
      analysis: payload.analysis,
    }),
  });

  if (res.ok) {
    const data = (await res.json()) as { narrative: PlaybookNarrative };
    if (data.narrative) return data.narrative;
  }

  const { generateStaticNarrative } = await import("./report-content");
  return generateStaticNarrative(payload.inputs, payload.analysis, {
    leadRole: payload.lead.role,
    leadName: payload.lead.name,
    agentName: payload.lead.agentName,
  });
}

export async function persistDealReport(
  payload: SaveReportPayload,
): Promise<PersistReportResult> {
  if (!payload.lead.smsCallConsent) {
    return {
      ok: false,
      error: "SMS/call consent is required to unlock your report.",
    };
  }

  const narrative = await fetchNarrative(payload);
  const slug = generateReportSlug();

  if (isSupabaseConfigured()) {
    try {
      const res = await fetch("/api/deal-analyzer/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          lead: payload.lead,
          inputs: payload.inputs,
          analysis: payload.analysis,
          narrative,
        }),
      });

      const data = (await res.json()) as { slug?: string; error?: string };

      if (!res.ok) {
        return {
          ok: false,
          error: data.error ?? "Could not save report. Please try again.",
        };
      }

      return {
        ok: true,
        slug: data.slug ?? slug,
        source: "supabase",
      };
    } catch {
      return {
        ok: false,
        error: "Network error while saving your report. Please try again.",
      };
    }
  }

  saveLocalReport({
    slug,
    createdAt: new Date().toISOString(),
    lead: payload.lead,
    inputs: payload.inputs,
    analysis: payload.analysis,
    narrative,
    referralSource: payload.lead.referralSource ?? null,
    agentName: payload.lead.agentName ?? null,
  });

  return { ok: true, slug, source: "local" };
}

export async function fetchDealReportBySlug(
  slug: string,
): Promise<
  | { ok: true; data: import("./supabase/types").StoredReportPayload }
  | { ok: false; error: string; status?: number }
> {
  if (isSupabaseConfigured()) {
    try {
      const res = await fetch(
        `/api/deal-analyzer/reports/${encodeURIComponent(slug)}`,
      );
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 404) {
          const local =
            typeof window !== "undefined"
              ? (await import("./local-reports")).loadLocalReport(slug)
              : null;
          if (local) return { ok: true, data: local };
        }
        return {
          ok: false,
          error: data.error ?? "Report not found.",
          status: res.status,
        };
      }

      return {
        ok: true,
        data: data as import("./supabase/types").StoredReportPayload,
      };
    } catch {
      const local =
        typeof window !== "undefined"
          ? (await import("./local-reports")).loadLocalReport(slug)
          : null;
      if (local) return { ok: true, data: local };
      return { ok: false, error: "Could not load report." };
    }
  }

  const local = (await import("./local-reports")).loadLocalReport(slug);
  if (local) return { ok: true, data: local };
  return { ok: false, error: "Report not found.", status: 404 };
}
