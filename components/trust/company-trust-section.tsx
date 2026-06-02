"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PhoneLink } from "@/components/trust/phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { TeamTrustVisual } from "@/components/trust/team-trust-visual";
import { NMLS_CONSUMER_ACCESS_URL } from "@/lib/contact";
import { CALL_OUR_TEAM_LABEL } from "@/lib/contact";
import { ADVISOR, COMPANY_TRUST } from "@/lib/trust-content";
import { cn } from "@/lib/cn";
import Link from "next/link";

type CompanyTrustSectionProps = {
  variant?: "homepage" | "funnel" | "compact" | "full";
  className?: string;
};

/** @deprecated Use CompanyTrustSection */
export const AdvisorCredibilitySection = CompanyTrustSection;

export function CompanyTrustSection({
  variant = "homepage",
  className,
}: CompanyTrustSectionProps) {
  if (variant === "homepage") {
    return (
      <Section id="guidance" divider className={cn("bg-white py-12 sm:py-16", className)}>
        <Reveal>
          <SectionHeader
            tone="light"
            eyebrow="Expert support"
            title={COMPANY_TRUST.headline}
            description={COMPANY_TRUST.body[0]}
          />
        </Reveal>
        <Reveal delay={0.06} className="mt-8 lg:mt-10">
          <HomepageTrustCard />
        </Reveal>
      </Section>
    );
  }

  const compact = variant === "compact" || variant === "funnel";

  const content = (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm",
        compact ? "p-4 sm:p-5" : "p-6 sm:p-8",
      )}
    >
      <div
        className={cn(
          "flex flex-col gap-5",
          compact ? "sm:flex-row sm:items-start" : "lg:flex-row lg:items-center lg:gap-8",
        )}
      >
        <div className={cn("shrink-0", compact ? "mx-auto w-full max-w-[200px] sm:mx-0" : "mx-auto w-full max-w-md lg:mx-0 lg:max-w-sm")}>
          <TeamTrustVisual
            frameClassName={compact ? "w-full" : "w-full"}
            sizes={compact ? "200px" : "384px"}
          />
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          <h2
            className={cn(
              "font-bold tracking-tight text-slate-900",
              compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl",
            )}
          >
            {COMPANY_TRUST.headline}
          </h2>

          <div className={cn("space-y-2 text-slate-600", compact ? "mt-3 text-xs sm:text-sm" : "mt-4 text-sm sm:text-base")}>
            {COMPANY_TRUST.body.map((paragraph) => (
              <p key={paragraph} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <TrustPointsList compact={compact} className={compact ? "mt-3" : "mt-5"} />

          {variant === "full" ? (
            <p className="mt-4 text-xs leading-relaxed text-slate-500">
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

          <TrustCtaRow compact={compact} ctaLocation={`company-trust-${variant}`} />
        </div>
      </div>
    </div>
  );

  if (variant === "funnel" || variant === "compact" || variant === "full") {
    return <div className={className}>{content}</div>;
  }

  return null;
}

function HomepageTrustCard() {
  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_40px_rgba(15,23,42,0.06)] ring-1 ring-slate-100">
      <div className="flex flex-col gap-8 p-6 sm:p-8 lg:flex-row lg:items-stretch lg:gap-0 lg:p-0">
        <div className="min-w-0 flex-1 p-0 text-center lg:p-10 lg:text-left">
          <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {COMPANY_TRUST.headline}
          </h3>
          <div className="mt-4 max-w-xl space-y-3 text-sm leading-relaxed text-slate-600 sm:text-base lg:max-w-lg">
            {COMPANY_TRUST.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <TrustPointsList className="mt-6 justify-center lg:justify-start" />

          <TrustCtaRow className="mt-8 justify-center lg:justify-start" ctaLocation="company-trust-homepage" />
        </div>

        <div className="relative mx-auto w-full max-w-lg shrink-0 lg:mx-0 lg:max-w-[42%] lg:min-h-[280px]">
          <TeamTrustVisual
            priority
            sizes="(max-width: 1024px) 100vw, 448px"
            className="h-full min-h-[220px] rounded-none lg:min-h-full lg:rounded-none"
            frameClassName="h-full min-h-[220px] w-full rounded-none lg:min-h-full"
          />
        </div>
      </div>
    </div>
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
        "flex flex-col gap-2",
        !compact && "sm:flex-row sm:flex-wrap sm:gap-x-6",
        className,
      )}
    >
      {COMPANY_TRUST.trustPoints.map((point) => (
        <li
          key={point}
          className={cn(
            "flex items-center gap-2 font-medium text-slate-700",
            compact ? "justify-center text-xs sm:justify-start sm:text-sm" : "text-sm",
          )}
        >
          <span
            aria-hidden
            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs text-teal-700"
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
        compact ? "mt-4" : "mt-5",
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
