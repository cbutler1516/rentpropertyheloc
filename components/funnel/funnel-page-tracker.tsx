"use client";

import { trackLeadFormStarted } from "@/lib/analytics/conversion-events";
import { FUNNEL_VERSION } from "@/lib/leads/funnel-config";
import { useEffect, useRef } from "react";

export function FunnelPageTracker() {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    trackLeadFormStarted({
      source: "check-options-funnel",
      funnelVersion: FUNNEL_VERSION,
    });
  }, []);

  return null;
}
