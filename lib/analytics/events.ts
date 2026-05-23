export type ConversionEvent =
  | "lead_form_started"
  | "lead_step_completed"
  | "lead_form_submitted"
  | "calculator_used"
  | "video_played";

export type ConversionEventPayload = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: Record<string, unknown>[];
  }
}

export function trackConversionEvent(
  event: ConversionEvent,
  payload: ConversionEventPayload = {},
): void {
  if (typeof window === "undefined") return;

  const detail = { event, ...payload, timestamp: Date.now() };

  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push(detail);

  if (typeof window.gtag === "function") {
    window.gtag("event", event, payload);
  }

  if (typeof window.fbq === "function" && event === "lead_form_submitted") {
    window.fbq("track", "Lead", payload);
  }

  if (process.env.NODE_ENV === "development") {
    console.debug("[conversion]", detail);
  }
}

export function trackLeadFormStarted(source: string) {
  trackConversionEvent("lead_form_started", { source });
}

export function trackLeadStepCompleted(step: number, stepName: string) {
  trackConversionEvent("lead_step_completed", { step, step_name: stepName });
}

export function trackLeadFormSubmitted(leadId?: string) {
  trackConversionEvent("lead_form_submitted", { lead_id: leadId });
}

export function trackCalculatorUsed() {
  trackConversionEvent("calculator_used");
}

export function trackVideoPlayed(videoId: string) {
  trackConversionEvent("video_played", { video_id: videoId });
}
