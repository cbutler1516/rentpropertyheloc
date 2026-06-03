"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PhoneLink } from "@/components/trust/phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { TeamTrustVisual } from "@/components/trust/team-trust-visual";
import { NMLS_CONSUMER_ACCESS_URL } from "@/lib/contact";
import { CALL_OUR_TEAM_LABEL } from "@/lib/contact";
import { ADVISOR, COMPANY_TRUST } from "@/lib/trust-content";
import type { ReviewProcessPhase } from "@/lib/trust/review-process";
import { cn } from "@/lib/cn";
import Link from "next/link";

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
      <Section id="guidance" divider className={cn("bg-white py-14 sm:py-16 md:py-20", className)}>
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
          compact ? "sm:flex-row sm:items-center sm:gap-5" : "lg:flex-row lg:items-stretch lg:gap-8",
        )}
      >
        <div
          className={cn(
            "shrink-0",
            compact
              ? "mx-auto w-full max-w-[220px] sm:mx-0 sm:max-w-[240px]"
              : "mx-auto w-full max-w-md lg:mx-0 lg:max-w-[44%]",
          )}
        >
          <TeamTrustVisual
            compact={compact}
            phase={reviewPhase}
            funnelStep={funnelStep}
            frameClassName="w-full"
            sizes={compact ? "240px" : "384px"}
          />
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <TrustCardContent compact={compact} showLicensing={variant === "full"} ctaLocation={`company-trust-${variant}`} />
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
    <div className="mx-auto max-w-6xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_12px_48px_rgba(15,23,42,0.08)] ring-1 ring-slate-100/80">
      <div className="flex flex-col lg:flex-row lg:items-stretch">
        <div className="flex min-w-0 flex-1 flex-col justify-center px-6 py-8 sm:px-10 sm:py-10 lg:px-12 lg:py-14">
          <TrustCardContent ctaLocation="company-trust-homepage" />
        </div>

        <div className="relative w-full shrink-0 lg:w-[46%] lg:min-h-[340px]">
          <TeamTrustVisual
            priority
            phase={reviewPhase}
            funnelStep={funnelStep}
            sizes="(max-width: 1024px) 100vw, 520px"
            className="h-full min-h-[260px] w-full lg:min-h-full"
            frameClassName="h-full min-h-[260px] w-full rounded-none lg:min-h-full lg:rounded-none lg:rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}

function TrustCardContent({
  compact = false,
  showLicensing = false,
  ctaLocation,
}: {
  compact?: boolean;
  showLicensing?: boolean;
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
          compact ? "mt-3 text-xs leading-relaxed sm:text-sm" : "mt-5 max-w-xl text-base leading-relaxed sm:text-[1.0625rem]",
        )}
      >
        {COMPANY_TRUST.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <TrustPointsList compact={compact} className={compact ? "mt-4" : "mt-7"} />

      {showLicensing ? (
        <p className="mt-5 text-xs leading-relaxed text-slate-500">
          Licensed in: {ADVISOR.licensedStates}.{" "}
          <Link
            href={NMLS_CONSUMER_ACCESS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-teal-700 underline-offset-2 hover:underline"
          >
            NMLS Consumer Access
          </Link>
        </p>
      ) : null}

      <TrustCtaRow compact={compact} className={compact ? "mt-4" : "mt-8"} ctaLocation={ctaLocation} />
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
        "flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center",
        className,
      )}
    >
      <StrategyCallLink size={compact ? "sm" : "md"} ctaLocation={ctaLocation} />
      <PhoneLink
        size={compact ? "sm" : "md"}
        showIcon={false}
        label={CALL_OUR_TEAM_LABEL}
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 no-underline shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
      />
    </div>
  );
}
