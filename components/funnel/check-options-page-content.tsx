"use client";

import { FunnelComplianceNote } from "@/components/funnel/funnel-compliance-note";
import { FunnelIntro } from "@/components/funnel/funnel-intro";
import { LeadFunnel } from "@/components/funnel/lead-funnel";
import { CompanyTrustSection } from "@/components/trust/company-trust-section";
import { cn } from "@/lib/cn";
import { scrollToPostSubmitTop } from "@/lib/funnel/scroll-to-post-submit-top";
import type { ReviewProcessPhase } from "@/lib/trust/review-process";
import { Suspense, useEffect, useState } from "react";

export function CheckOptionsPageContent() {
  const [isPostSubmit, setIsPostSubmit] = useState(false);
  const [reviewPhase, setReviewPhase] = useState<ReviewProcessPhase>("address");
  const [funnelStep, setFunnelStep] = useState(1);

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
        <CompanyTrustSection
          variant="compact"
          className="mb-4 lg:hidden"
          reviewPhase={reviewPhase}
          funnelStep={funnelStep}
        />
      ) : null}
      <div
        className={cn(
          "mb-4",
          !isPostSubmit &&
            "lg:grid lg:grid-cols-[minmax(280px,1fr)_1.2fr] lg:items-start lg:gap-6",
        )}
      >
        {!isPostSubmit ? (
          <CompanyTrustSection
            variant="funnel"
            className="hidden lg:block"
            reviewPhase={reviewPhase}
            funnelStep={funnelStep}
          />
        ) : null}
        <Suspense
          fallback={
            <div className="card-surface h-[70dvh] animate-pulse rounded-2xl" aria-hidden />
          }
        >
          <LeadFunnel
            onSubmittedChange={setIsPostSubmit}
            onReviewPhaseChange={setReviewPhase}
            onFunnelStepChange={setFunnelStep}
          />
        </Suspense>
      </div>
      <FunnelComplianceNote className="mt-4 px-1" />
    </>
  );
}

