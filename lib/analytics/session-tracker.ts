import type { ConversionEventName } from "@/lib/analytics/event-types";

const STORAGE_KEY = "rph_analytics_session_v1";

export type AnalyticsSessionSnapshot = {
  startedAt: string;
  eventCount: number;
  lastEvent: { name: ConversionEventName; at: string } | null;
  counts: Partial<Record<ConversionEventName, number>>;
};

const CONVERSION_EVENT_KEYS: ConversionEventName[] = [
  "funnel_started",
  "funnel_step_completed",
  "contact_step_viewed",
  "lead_submitted",
  "address_completed",
  "enrichment_completed",
  "fast_track_lead",
  "review_lead",
  "nurture_lead",
  "page_view",
  "seo_page_viewed",
  "cta_clicked",
  "calculator_viewed",
  "calculator_interacted",
];

function emptySnapshot(): AnalyticsSessionSnapshot {
  return {
    startedAt: new Date().toISOString(),
    eventCount: 0,
    lastEvent: null,
    counts: {},
  };
}

function readSnapshot(): AnalyticsSessionSnapshot {
  if (typeof window === "undefined") return emptySnapshot();

  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return emptySnapshot();
    return JSON.parse(raw) as AnalyticsSessionSnapshot;
  } catch {
    return emptySnapshot();
  }
}

function writeSnapshot(snapshot: AnalyticsSessionSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

export function recordAnalyticsSessionEvent(name: ConversionEventName): void {
  if (typeof window === "undefined") return;

  const snapshot = readSnapshot();
  const at = new Date().toISOString();

  snapshot.eventCount += 1;
  snapshot.lastEvent = { name, at };
  snapshot.counts[name] = (snapshot.counts[name] ?? 0) + 1;

  writeSnapshot(snapshot);
}

export function getAnalyticsSessionSnapshot(): AnalyticsSessionSnapshot {
  return readSnapshot();
}

export function getConversionOverviewFromSession(): {
  funnelStarts: number;
  leadSubmissions: number;
  addressCompletions: number;
  enrichmentCompletions: number;
  fastTrackLeads: number;
  reviewLeads: number;
  nurtureLeads: number;
  totalEvents: number;
  lastEvent: AnalyticsSessionSnapshot["lastEvent"];
  startedAt: string;
} {
  const snapshot = readSnapshot();
  const count = (name: ConversionEventName) => snapshot.counts[name] ?? 0;

  return {
    funnelStarts: count("funnel_started"),
    leadSubmissions: count("lead_submitted"),
    addressCompletions: count("address_completed"),
    enrichmentCompletions: count("enrichment_completed"),
    fastTrackLeads: count("fast_track_lead"),
    reviewLeads: count("review_lead"),
    nurtureLeads: count("nurture_lead"),
    totalEvents: snapshot.eventCount,
    lastEvent: snapshot.lastEvent,
    startedAt: snapshot.startedAt,
  };
}

export function resetAnalyticsSession(): void {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_KEY);
}

export { CONVERSION_EVENT_KEYS };
