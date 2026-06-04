"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PlatformEmailLink } from "@/components/trust/platform-email-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { TeamTrustVisual } from "@/components/trust/team-trust-visual";
import { COMPANY_TRUST } from "@/lib/trust-content";
import type { ReviewProcessPhase } from "@/lib/trust/review-process";
import { cn } from "@/lib/cn";

type CompanyTrustSectionProps = {
  variant?: "homepage" | "funnel" | "compact" | "full";
  className?: string;
  reviewPhase?: ReviewProcessPhase;
  funnelStep?: number;
};

/** @deprecated Use CompanyTrustSection */
export const AdvisorCredibilitySection = CompanyTrustSection;

export function CompanyTrustSection({
  variant = "homepage",
  className,
  reviewPhase = "intro",
  funnelStep = 1,
}: CompanyTrustSectionProps) {
  if (variant === "homepage") {
    return (
      <Section id="guidance" divider className={cn("bg-white py-12 sm:py-14 md:py-16 lg:py-20", className)}>
        <Reveal>
          <SectionHeader
            tone="light"
            eyebrow="Expert support"
            title={COMPANY_TRUST.headline}
            description={COMPANY_TRUST.body[0]}
          />
        </Reveal>
        <Reveal delay={0.06} className="mt-10 lg:mt-12">
          <HomepageTrustCard reviewPhase={reviewPhase} funnelStep={funnelStep} />
        </Reveal>
      </Section>
    );
  }

  const compact = variant === "compact" || variant === "funnel";

  const content = (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_4px_24px_rgba(15,23,42,0.05)]",
        compact ? "p-4 sm:p-5" : "p-6 sm:p-8",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-6",
          compact ? "sm:flex-row sm:items-center sm:gap-6" : "lg:flex-row lg:items-center lg:gap-8",
        )}
      >
        <div
          className={cn(
            "shrink-0",
            compact
              ? "mx-auto w-full max-w-[280px] sm:mx-0 sm:max-w-[300px]"
              : "mx-auto w-full max-w-md lg:mx-0 lg:w-[48%] lg:max-w-none",
          )}
        >
          <TeamTrustVisual
            compact={compact}
            prominent={!compact}
            phase={reviewPhase}
            funnelStep={funnelStep}
            frameClassName="w-full"
            sizes={compact ? "300px" : "480px"}
          />
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left lg:w-[52%]">
          <TrustCardContent compact={compact} ctaLocation={`company-trust-${variant}`} />
        </div>
      </div>
    </div>
  );

  if (variant === "funnel" || variant === "compact" || variant === "full") {
    return <div className={className}>{content}</div>;
  }

  return null;
}

function HomepageTrustCard({
  reviewPhase,
  funnelStep,
}: {
  reviewPhase: ReviewProcessPhase;
  funnelStep: number;
}) {
  return (
    <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_16px_56px_rgba(15,23,42,0.1)] ring-1 ring-slate-100/80">
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="order-1 w-full shrink-0 lg:w-[48%] xl:w-[47%]">
          <TeamTrustVisual
            prominent
            phase={reviewPhase}
            funnelStep={funnelStep}
            sizes="(max-width: 1024px) 100vw, 540px"
            className="h-full w-full"
            frameClassName="h-full w-full rounded-none lg:rounded-none lg:rounded-l-2xl"
          />
        </div>

        <div className="order-2 flex min-w-0 flex-1 flex-col justify-center px-6 py-7 sm:px-8 sm:py-8 lg:w-[52%] lg:px-10 lg:py-10 xl:px-12">
          <TrustCardContent ctaLocation="company-trust-homepage" />
        </div>
      </div>
    </div>
  );
}

function TrustCardContent({
  compact = false,
  ctaLocation,
}: {
  compact?: boolean;
  ctaLocation?: string;
}) {
  return (
    <>
      <h2
        className={cn(
          "font-bold tracking-tight text-slate-900",
          compact
            ? "text-lg sm:text-xl"
            : "text-2xl sm:text-3xl lg:text-[2rem] lg:leading-tight",
        )}
      >
        {COMPANY_TRUST.headline}
      </h2>

      <div
        className={cn(
          "space-y-3 text-slate-600",
          compact ? "mt-3 text-xs leading-relaxed sm:text-sm" : "mt-4 max-w-lg text-[0.9375rem] leading-relaxed sm:text-base",
        )}
      >
        {COMPANY_TRUST.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <TrustPointsList compact={compact} className={compact ? "mt-4" : "mt-6"} />

      <TrustCtaRow compact={compact} className={compact ? "mt-4" : "mt-7"} ctaLocation={ctaLocation} />
    </>
  );
}

function TrustPointsList({
  compact = false,
  className,
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "flex flex-col gap-2.5",
        !compact && "sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2",
        className,
      )}
    >
      {COMPANY_TRUST.trustPoints.map((point) => (
        <li
          key={point}
          className={cn(
            "flex items-center gap-2.5 font-medium text-slate-800",
            compact ? "justify-center text-xs sm:justify-start sm:text-sm" : "text-sm sm:text-[0.9375rem]",
          )}
        >
          <span
            aria-hidden
            className={cn(
              "flex shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700",
              compact ? "h-4 w-4 text-[10px]" : "h-5 w-5 text-xs",
            )}
          >
            ✓
          </span>
          {point}
        </li>
      ))}
    </ul>
  );
}

function TrustCtaRow({
  compact = false,
  className,
  ctaLocation,
}: {
  compact?: boolean;
  className?: string;
  ctaLocation?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-stretch",
        className,
      )}
    >
      <StrategyCallLink
        size={compact ? "sm" : "md"}
        ctaLocation={ctaLocation}
        className="w-full justify-center sm:w-auto"
      />
      <PlatformEmailLink
        size={compact ? "sm" : "md"}
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 no-underline shadow-sm transition hover:bg-slate-50 hover:text-teal-900 sm:w-auto"
      />
    </div>
  );
}
