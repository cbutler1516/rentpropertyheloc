"use client";

import { trackLeadFormStarted } from "@/lib/analytics/conversion-events";
import type { JourneySlug } from "@/lib/leads/investor-journeys";
import { getJourney } from "@/lib/leads/investor-journeys";
import { useEffect, useRef } from "react";

type JourneyPageTrackerProps = {
  slug: JourneySlug;
};

export function JourneyPageTracker({ slug }: JourneyPageTrackerProps) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    const journey = getJourney(slug);
    trackLeadFormStarted({
      journey: slug,
      propertyType: journey.propertyType,
      source: "check-options-journey-page",
    });
  }, [slug]);

  return null;
}
