"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { SEO_LANDING_SLUGS } from "../lib/seo-landing-content";
import { captureUtmFromUrl } from "../lib/analytics/utm";
import { trackDealAnalyzerEventOnce } from "../lib/analytics/track-client";

const SEO_SLUG_SET = new Set<string>(SEO_LANDING_SLUGS);

export function DealAnalyzerAnalyticsTracker() {
  const pathname = usePathname();

  useEffect(() => {
    captureUtmFromUrl();
  }, []);

  useEffect(() => {
    if (!pathname?.startsWith("/deal-analyzer")) return;

    const segments = pathname.split("/").filter(Boolean);
    const slug = segments[1];

    if (segments.length === 2 && slug && SEO_SLUG_SET.has(slug)) {
      trackDealAnalyzerEventOnce(`seo:${pathname}`, {
        eventName: "seo_landing_view",
        pagePath: pathname,
        metadata: { landingSlug: slug },
      });
    }
  }, [pathname]);

  return null;
}
