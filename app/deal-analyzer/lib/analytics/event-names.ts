export const DEAL_ANALYZER_EVENT_NAMES = [
  "seo_landing_view",
  "partner_landing_view",
  "analyzer_started",
  "path_selected",
  "preview_viewed",
  "lead_form_viewed",
  "consent_checked",
  "lead_submitted",
  "report_generated",
  "report_link_copied",
  "report_message_copied",
  "report_pdf_printed",
  "crm_push_succeeded",
  "crm_push_failed",
  "follow_up_generated",
] as const;

export type DealAnalyzerEventName =
  (typeof DEAL_ANALYZER_EVENT_NAMES)[number];

const eventNameSet = new Set<string>(DEAL_ANALYZER_EVENT_NAMES);

export function isDealAnalyzerEventName(
  value: string,
): value is DealAnalyzerEventName {
  return eventNameSet.has(value);
}
