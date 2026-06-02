"use client";

import { trackSeoPageViewed } from "@/lib/analytics/conversion-events";
import { useEffect, useRef } from "react";

type SeoPageAnalyticsProps = {
  path: string;
  topic?: string;
};

export function SeoPageAnalytics({ path, topic }: SeoPageAnalyticsProps) {
  const trackedRef = useRef(false);

  useEffect(() => {
    if (trackedRef.current) return;
    trackedRef.current = true;

    trackSeoPageViewed({
      pagePath: path,
      source: "seo_landing",
      topic,
    });
  }, [path, topic]);

  return null;
}
