"use client";

import type { DealAnalyzerEventName } from "./event-names";
import { getDealAnalyzerSessionId } from "./session";
import type { TrackDealAnalyzerEventInput } from "./types";

type TrackOptions = Omit<
  TrackDealAnalyzerEventInput,
  "eventName" | "sessionId"
> & {
  eventName: DealAnalyzerEventName;
};

const firedOnceKeys = new Set<string>();

/** Fire at most once per browser session for a given dedupe key. */
export function trackDealAnalyzerEventOnce(
  dedupeKey: string,
  options: TrackOptions,
): void {
  if (firedOnceKeys.has(dedupeKey)) return;
  firedOnceKeys.add(dedupeKey);
  void trackDealAnalyzerEvent(options);
}

export async function trackDealAnalyzerEvent(
  options: TrackOptions,
): Promise<void> {
  if (typeof window === "undefined") return;

  const sessionId = getDealAnalyzerSessionId();
  const pagePath = options.pagePath ?? window.location.pathname;

  try {
    await fetch("/api/deal-analyzer/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: options.eventName,
        sessionId,
        leadId: options.leadId ?? null,
        reportId: options.reportId ?? null,
        agentId: options.agentId ?? null,
        referralCode: options.referralCode ?? null,
        dealType: options.dealType ?? null,
        pagePath,
        metadata: options.metadata ?? {},
      }),
      keepalive: true,
    });
  } catch {
    /* analytics must not block UX */
  }
}
