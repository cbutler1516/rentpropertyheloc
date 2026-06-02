"use client";

import { FunnelIntro } from "@/components/funnel/funnel-intro";
import { LeadFunnel } from "@/components/funnel/lead-funnel";
import { AdvisorCredibilitySection } from "@/components/trust/advisor-credibility-section";
import { cn } from "@/lib/cn";
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
      {!isPostSubmit ? (
        <AdvisorCredibilitySection variant="compact" className="mb-4 lg:hidden" />
      ) : null}
      <div
        className={cn(
          "mb-4",
          !isPostSubmit &&
            "lg:grid lg:grid-cols-[minmax(280px,1fr)_1.2fr] lg:items-start lg:gap-6",
        )}
      >
        {!isPostSubmit ? (
          <AdvisorCredibilitySection variant="funnel" className="hidden lg:block" />
        ) : null}
        <Suspense
          fallback={
            <div className="card-surface h-[70dvh] animate-pulse rounded-2xl" aria-hidden />
          }
        >
          <LeadFunnel onSubmittedChange={setIsPostSubmit} />
        </Suspense>
      </div>
    </>
  );
}
