import { DEAL_ANALYZER_CONSENT_TEXT } from "@/lib/deal-analyzer/constants";
import { DEAL_TYPES, type DealType } from "@/lib/deal-analyzer/types";
import type { AnalysisResult } from "@/lib/deal-analyzer/types";

export type CreateReportBody = {
  name?: string;
  email?: string;
  phone?: string;
  role?: string;
  notes?: string;
  smsCallConsent?: boolean;
  dealType?: string;
  inputs?: Record<string, unknown>;
  analysis?: AnalysisResult;
  sessionId?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
  utmTerm?: string;
  utmContent?: string;
};

export function parseCreateReportBody(body: unknown): {
  ok: true;
  data: {
    name: string;
    email: string;
    phone?: string;
    role?: string;
    notes?: string;
    smsCallConsent: boolean;
    dealType: DealType;
    inputs: Record<string, unknown>;
    analysis: AnalysisResult;
    sessionId?: string;
    utmSource?: string;
    utmMedium?: string;
    utmCampaign?: string;
    utmTerm?: string;
    utmContent?: string;
  };
} | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body." };
  }

  const b = body as CreateReportBody;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const phone = typeof b.phone === "string" ? b.phone.trim() : undefined;
  const role = typeof b.role === "string" ? b.role.trim() : undefined;
  const notes = typeof b.notes === "string" ? b.notes.trim() : undefined;

  if (!name) return { ok: false, error: "Name is required." };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Valid email is required." };
  }
  if (!b.smsCallConsent) {
    return { ok: false, error: "Consent is required before generating your Playbook Report." };
  }
  if (!b.dealType || !DEAL_TYPES.includes(b.dealType as DealType)) {
    return { ok: false, error: "Invalid deal type." };
  }
  if (!b.analysis || typeof b.analysis !== "object") {
    return { ok: false, error: "Analysis data is required." };
  }

  return {
    ok: true,
    data: {
      name,
      email,
      phone,
      role,
      notes,
      smsCallConsent: true,
      dealType: b.dealType as DealType,
      inputs: b.inputs ?? {},
      analysis: b.analysis,
      sessionId: typeof b.sessionId === "string" ? b.sessionId : undefined,
      utmSource: typeof b.utmSource === "string" ? b.utmSource : undefined,
      utmMedium: typeof b.utmMedium === "string" ? b.utmMedium : undefined,
      utmCampaign: typeof b.utmCampaign === "string" ? b.utmCampaign : undefined,
      utmTerm: typeof b.utmTerm === "string" ? b.utmTerm : undefined,
      utmContent: typeof b.utmContent === "string" ? b.utmContent : undefined,
    },
  };
}

export function getConsentIp(request: Request): string | undefined {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || undefined;
}

export function getConsentUserAgent(request: Request): string | undefined {
  return request.headers.get("user-agent") || undefined;
}

export { DEAL_ANALYZER_CONSENT_TEXT };
