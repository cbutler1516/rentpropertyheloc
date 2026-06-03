"use client";

import { FunnelComplianceNote } from "@/components/funnel/funnel-compliance-note";
import { FunnelIntro } from "@/components/funnel/funnel-intro";
import { LeadFunnel } from "@/components/funnel/lead-funnel";
import { scrollToPostSubmitTop } from "@/lib/funnel/scroll-to-post-submit-top";
import { Suspense, useEffect, useState } from "react";

export function CheckOptionsPageContent() {
  const [isPostSubmit, setIsPostSubmit] = useState(false);

  useEffect(() => {
    if (!isPostSubmit) return;
    scrollToPostSubmitTop();
    const timer = window.setTimeout(scrollToPostSubmitTop, 0);
    return () => window.clearTimeout(timer);
  }, [isPostSubmit]);

  return (
    <>
      {!isPostSubmit ? <FunnelIntro /> : null}
      <Suspense
        fallback={
          <div className="card-surface h-[70dvh] animate-pulse rounded-2xl" aria-hidden />
        }
      >
        <LeadFunnel onSubmittedChange={setIsPostSubmit} />
      </Suspense>
      <FunnelComplianceNote className="mt-4 px-1" />
    </>
  );
}
