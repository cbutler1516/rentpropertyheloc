"use client";

import { FunnelTrustStrip } from "@/components/funnel/funnel-trust-strip";
import { FunnelComplianceNote } from "@/components/funnel/funnel-compliance-note";
import { FunnelIntro } from "@/components/funnel/funnel-intro";
import { LeadFunnel } from "@/components/funnel/lead-funnel";
import { scrollToPostSubmitTop } from "@/lib/funnel/scroll-to-post-submit-top";
import { FUNNEL_SECTION_ID } from "@/lib/cta";
import { scrollToSection } from "@/lib/scroll-to-section";
import { Suspense, useEffect, useState } from "react";

export function CheckOptionsPageContent() {
  const [isPostSubmit, setIsPostSubmit] = useState(false);

  useEffect(() => {
    if (!isPostSubmit) return;
    scrollToPostSubmitTop();
    const timer = window.setTimeout(scrollToPostSubmitTop, 0);
    return () => window.clearTimeout(timer);
  }, [isPostSubmit]);

  useEffect(() => {
    if (window.location.hash !== `#${FUNNEL_SECTION_ID}`) return;
    const timer = window.setTimeout(() => {
      scrollToSection(`#${FUNNEL_SECTION_ID}`);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div id={FUNNEL_SECTION_ID} className="site-anchor-section">
      {!isPostSubmit ? (
        <>
          <FunnelIntro />
          <FunnelTrustStrip />
        </>
      ) : null}
      <Suspense
        fallback={
          <div className="card-surface h-[70dvh] animate-pulse rounded-2xl" aria-hidden />
        }
      >
        <LeadFunnel onSubmittedChange={setIsPostSubmit} />
      </Suspense>
      <FunnelComplianceNote className="mx-auto mt-3 max-w-3xl px-1 sm:mt-4 lg:max-w-4xl" />
    </div>
  );
}
