"use client";

import { useEffect } from "react";
import { storePartnerLandingAttribution } from "../lib/analytics/partner-landing-attribution";
import { trackDealAnalyzerEventOnce } from "../lib/analytics/track-client";
import type { SeoLandingSlug } from "../lib/seo-landing-content";
import { partnerSeoLandingPath } from "../lib/seo-landing-content";

type PartnerSeoLandingAnalyticsProps = {
  agentId: string;
  referralCode: string;
  agentSlug: string;
  calculatorSlug: SeoLandingSlug;
};

export function PartnerSeoLandingAnalytics({
  agentId,
  referralCode,
  agentSlug,
  calculatorSlug,
}: PartnerSeoLandingAnalyticsProps) {
  const pagePath = partnerSeoLandingPath(agentSlug, calculatorSlug);

  useEffect(() => {
    storePartnerLandingAttribution({
      slug: calculatorSlug,
      path: pagePath,
      agentSlug,
    });
    trackDealAnalyzerEventOnce(`partner-seo:${pagePath}`, {
      eventName: "seo_landing_view",
      agentId,
      referralCode,
      pagePath,
      metadata: { partner: true, landingSlug: calculatorSlug },
    });
  }, [agentId, referralCode, agentSlug, calculatorSlug, pagePath]);

  return null;
}
