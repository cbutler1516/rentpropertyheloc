import type { DealAnalyzerUtm } from "./analytics/types";
import { getDealAnalyzerSessionId } from "./analytics/session";
import { getStoredUtm } from "./analytics/utm";
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
  agentId?: string | null;
  referralCode?: string | null;
  partnerAgentName?: string | null;
};

function getAttributionForSave(): {
  sessionId: string;
  utm: DealAnalyzerUtm | null;
} {
  return {
    sessionId:
      typeof window !== "undefined" ? getDealAnalyzerSessionId() : "",
    utm: typeof window !== "undefined" ? getStoredUtm() : null,
  };
}

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
      agentName: payload.partnerAgentName ?? payload.lead.agentName,
      partnerAgentName: payload.partnerAgentName ?? undefined,
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
    agentName: payload.partnerAgentName ?? payload.lead.agentName,
    partnerAgentName: payload.partnerAgentName ?? undefined,
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
      const { sessionId, utm } = getAttributionForSave();
      const res = await fetch("/api/deal-analyzer/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug,
          lead: payload.lead,
          inputs: payload.inputs,
          analysis: payload.analysis,
          narrative,
          agentId: payload.agentId ?? null,
          referralCode: payload.referralCode ?? null,
          sessionId: sessionId || null,
          utm,
        }),
      });

      const data = (await res.json()) as {
        slug?: string;
        reportId?: string;
        leadId?: string;
        error?: string;
      };

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
        reportId: data.reportId,
        leadId: data.leadId,
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
    agentName: payload.partnerAgentName ?? payload.lead.agentName ?? null,
    agentId: payload.agentId ?? null,
    referralCode: payload.referralCode ?? null,
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
