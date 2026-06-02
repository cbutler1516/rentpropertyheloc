"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PhoneLink } from "@/components/trust/phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { NMLS_CONSUMER_ACCESS_URL } from "@/lib/contact";
import { AdvisorImage } from "@/components/trust/advisor-image";
import { ADVISOR, ADVISOR_HEADSHOT_FRAME_CLASS } from "@/lib/trust-content";
import { cn } from "@/lib/cn";
import Link from "next/link";

type AdvisorCredibilitySectionProps = {
  variant?: "homepage" | "funnel" | "compact" | "full";
  className?: string;
};

export function AdvisorCredibilitySection({
  variant = "homepage",
  className,
}: AdvisorCredibilitySectionProps) {
  if (variant === "homepage") {
    return (
      <Section id="advisor" divider className={cn("bg-white py-12 sm:py-16", className)}>
        <Reveal>
          <SectionHeader
            tone="light"
            eyebrow="Real guidance"
            title={ADVISOR.homepageHeadline}
            description="Not an automated form—a licensed professional reviews every request."
          />
        </Reveal>
        <Reveal delay={0.06} className="mt-8 lg:mt-10">
          <HomepageAdvisorCard />
        </Reveal>
      </Section>
    );
  }

  const compact = variant === "compact" || variant === "funnel";
  const trustItems =
    variant === "full" ? ADVISOR.credentials : ADVISOR.homepageTrustPoints;

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
          compact ? "sm:flex-row sm:items-start" : "lg:flex-row lg:items-start lg:gap-8",
        )}
      >
        <div className={cn("shrink-0", compact ? "mx-auto sm:mx-0" : "mx-auto lg:mx-0")}>
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-slate-100 ring-2 ring-teal-100/80",
              ADVISOR_HEADSHOT_FRAME_CLASS,
              compact ? "w-32 sm:w-36" : "w-36 sm:w-40",
            )}
          >
            <AdvisorImage
              variant="portrait"
              sizes={compact ? "128px" : "160px"}
            />
          </div>
        </div>

        <div className="min-w-0 flex-1 text-center sm:text-left">
          {variant === "full" ? (
            <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-teal-700">
              Your advisor
            </p>
          ) : null}
          <h2
            className={cn(
              "font-bold tracking-tight text-slate-900",
              compact ? "text-lg sm:text-xl" : "text-xl sm:text-2xl",
            )}
          >
            {variant === "full"
              ? "Meet Your Investor Lending Advisor"
              : ADVISOR.homepageHeadline}
          </h2>
          {variant === "full" ? (
            <p className="mt-2 text-lg font-semibold text-slate-900">{ADVISOR.name}</p>
          ) : (
            <p className="mt-1 text-sm font-medium text-slate-700">{ADVISOR.name}</p>
          )}
          {variant === "full" ? (
            <>
              <p className="mt-1 text-sm font-medium text-slate-700">{ADVISOR.title}</p>
              <p className="mt-0.5 text-sm font-medium text-teal-800">{ADVISOR.nmls}</p>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {ADVISOR.company} · {ADVISOR.companyNmls}
              </p>
            </>
          ) : compact ? (
            <p className="mt-3 text-xs leading-relaxed text-slate-600 sm:text-sm">
              {ADVISOR.homepageLead} {ADVISOR.homepageBody}
            </p>
          ) : (
            <>
              <p className="mt-3 text-sm font-medium text-slate-800">{ADVISOR.homepageLead}</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">{ADVISOR.homepageBody}</p>
            </>
          )}

          <ul className={cn("space-y-1.5 text-sm text-slate-600", compact ? "mt-3" : "mt-4")}>
            {trustItems.map((item) => (
              <li key={item} className="flex items-start justify-center gap-2 sm:justify-start">
                <span aria-hidden className="mt-0.5 shrink-0 text-teal-600">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

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

          <AdvisorCtaRow compact={compact} ctaLocation={`advisor-section-${variant}`} />
        </div>
      </div>
    </div>
  );

  if (variant === "funnel" || variant === "compact" || variant === "full") {
    return <div className={className}>{content}</div>;
  }

  return null;
}

function HomepageAdvisorCard() {
  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-slate-50/80 via-white to-teal-50/30 shadow-sm">
      <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-start lg:gap-10 lg:p-10">
        <div className="mx-auto shrink-0 text-center lg:mx-0 lg:text-left">
          <div
            className={cn(
              "relative overflow-hidden rounded-2xl bg-slate-100 shadow-md ring-1 ring-slate-200/80",
              ADVISOR_HEADSHOT_FRAME_CLASS,
              "w-40 sm:w-44 lg:w-48",
            )}
          >
            <AdvisorImage
              variant="portrait"
              sizes="(max-width: 1024px) 176px, 192px"
              priority
            />
          </div>
          <p className="mt-3 text-sm font-semibold text-slate-900">{ADVISOR.name}</p>
        </div>

        <div className="min-w-0 flex-1 text-center lg:text-left">
          <p className="text-base font-semibold leading-snug text-slate-900 sm:text-lg">
            {ADVISOR.homepageLead}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base lg:max-w-lg">
            {ADVISOR.homepageBody}
          </p>

          <ul className="mt-5 flex flex-col items-center gap-2 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 lg:justify-start">
            {ADVISOR.homepageTrustPoints.map((point) => (
              <li
                key={point}
                className="flex items-center gap-2 text-sm font-medium text-slate-700"
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

          <AdvisorCtaRow className="mt-6 justify-center lg:justify-start" ctaLocation="advisor-section-homepage" />
        </div>
      </div>
    </div>
  );
}

function AdvisorCtaRow({
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
        label={`Call ${ADVISOR.phone}`}
        className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-800 no-underline shadow-sm transition hover:bg-slate-50 hover:text-slate-900"
      />
    </div>
  );
}
