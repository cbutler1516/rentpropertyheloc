import { buildLeadCreatePayload } from "@/lib/leads/extract-attribution";
import { LEAD_SOURCE, SUBMIT_ERROR_MESSAGE } from "@/lib/leads/constants";
import type { LeadSubmitResult, SubmitLeadInput } from "@/lib/leads/types";

export async function submitLead(input: SubmitLeadInput): Promise<LeadSubmitResult> {
  const createdAt = new Date().toISOString();
  const payload = buildLeadCreatePayload(input, createdAt);

  try {
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...payload,
        source: LEAD_SOURCE,
      }),
    });

    const result = (await response.json()) as LeadSubmitResult;

    if (!response.ok || !result.success) {
      return {
        success: false,
        error: result.error ?? SUBMIT_ERROR_MESSAGE,
      };
    }

    return result;
  } catch {
    return {
      success: false,
      error: SUBMIT_ERROR_MESSAGE,
    };
  }
}
