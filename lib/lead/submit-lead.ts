import type { LeadFunnelData } from "@/lib/lead-funnel";
import { trackLeadFormSubmitted } from "@/lib/analytics/events";

export type LeadSubmissionResult = {
  ok: boolean;
  leadId: string;
  message: string;
};

/** Client-side submission — wire Supabase, Resend, CRM webhook in this module. */
export async function submitLead(data: LeadFunnelData): Promise<LeadSubmissionResult> {
  const leadId = `lead_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

  // await fetch("/api/leads", { method: "POST", body: JSON.stringify(data) });

  trackLeadFormSubmitted(leadId);

  if (process.env.NODE_ENV === "development") {
    console.debug("[lead submission]", { leadId, data });
  }

  return {
    ok: true,
    leadId,
    message:
      "Your request was received. A licensed loan officer will follow up with options that may be available—subject to approval.",
  };
}
