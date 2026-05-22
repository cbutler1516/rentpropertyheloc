"use client";

import { useEffect } from "react";
import { captureUtmFromUrl } from "../lib/analytics/utm";
import { trackDealAnalyzerEventOnce } from "../lib/analytics/track-client";

type PartnerLandingAnalyticsProps = {
  agentId: string;
  referralCode: string;
  agentSlug: string;
};

export function PartnerLandingAnalytics({
  agentId,
  referralCode,
  agentSlug,
}: PartnerLandingAnalyticsProps) {
  useEffect(() => {
    captureUtmFromUrl();
    trackDealAnalyzerEventOnce(`partner:${agentSlug}`, {
      eventName: "partner_landing_view",
      agentId,
      referralCode,
      pagePath: `/partners/${agentSlug}`,
      metadata: { agentSlug },
    });
  }, [agentId, referralCode, agentSlug]);

  return null;
}
