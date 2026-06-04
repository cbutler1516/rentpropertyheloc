"use client";

import { Section } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import {
  CALL_OUR_TEAM_LABEL,
  PLATFORM_PHONE_DISPLAY,
  PLATFORM_PHONE_TEL,
} from "@/lib/contact";
import { HERO_FUNNEL_HREF, START_YOUR_REVIEW_LABEL } from "@/lib/cta";
import { INVESTOR_SUPPORT_SECTION } from "@/lib/trust-content";
import { cn } from "@/lib/cn";

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
  const compact = variant === "compact" || variant === "funnel";

  const card = (
    <PostSubmitProcessCard compact={compact} ctaLocation={`company-trust-${variant}`} />
  );

  if (variant === "homepage") {
    return (
      <Section
        id="guidance"
        divider
        className={cn("bg-white py-8 sm:py-10 md:py-12", className)}
      >
        <Reveal>
          <div className="max-w-3xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700 sm:text-xs">
              {INVESTOR_SUPPORT_SECTION.sectionLabel}
            </p>
            <h2 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-[1.75rem] md:leading-tight">
              {INVESTOR_SUPPORT_SECTION.headline}
            </h2>
            <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
              {INVESTOR_SUPPORT_SECTION.subheadline}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.05} className="mt-6 sm:mt-7">
          {card}
        </Reveal>
      </Section>
    );
  }

  if (variant === "funnel" || variant === "compact" || variant === "full") {
    return <div className={className}>{card}</div>;
  }

  return null;
}

function PostSubmitProcessCard({
  compact = false,
  ctaLocation,
}: {
  compact?: boolean;
  ctaLocation?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-200/90 bg-white shadow-[0_2px_16px_rgba(15,23,42,0.04)]",
        compact ? "p-4 sm:p-5" : "p-5 sm:p-6 lg:p-7",
      )}
    >
      <div
        className={cn(
          "grid gap-6",
          compact ? "sm:grid-cols-2 sm:gap-5" : "lg:grid-cols-2 lg:gap-8 lg:gap-x-10",
        )}
      >
        <ProcessTimeline compact={compact} />
        <BenefitsPanel compact={compact} ctaLocation={ctaLocation} />
      </div>
    </div>
  );
}

function ProcessTimeline({ compact = false }: { compact?: boolean }) {
  const steps = INVESTOR_SUPPORT_SECTION.timeline;

  return (
    <ol className={cn(compact ? "space-y-3" : "space-y-3.5")}>
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <div className="flex flex-col items-center pt-0.5">
              <span
                aria-hidden
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-full bg-teal-100 font-bold text-teal-800",
                  compact ? "h-6 w-6 text-[10px]" : "h-7 w-7 text-xs",
                )}
              >
                {index + 1}
              </span>
              {index < steps.length - 1 ? (
                <span
                  aria-hidden
                  className="mt-1 w-px flex-1 min-h-[1rem] bg-slate-200"
                />
              ) : null}
            </div>
            <div className="min-w-0 pb-0.5">
              <p
                className={cn(
                  "font-semibold text-slate-900",
                  compact ? "text-sm" : "text-sm sm:text-[0.9375rem]",
                )}
              >
                {step.title}
              </p>
              <p
                className={cn(
                  "mt-0.5 leading-relaxed text-slate-600",
                  compact ? "text-xs" : "text-sm",
                )}
              >
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
  );
}

function BenefitsPanel({
  compact = false,
  ctaLocation,
}: {
  compact?: boolean;
  ctaLocation?: string;
}) {
  return (
    <div className="flex flex-col">
      <h3
        className={cn(
          "font-semibold tracking-tight text-slate-900",
          compact ? "text-sm" : "text-base sm:text-lg",
        )}
      >
        {INVESTOR_SUPPORT_SECTION.benefitsHeadline}
      </h3>
      <ul className={cn("mt-3 space-y-2 sm:mt-4", compact && "space-y-1.5")}>
        {INVESTOR_SUPPORT_SECTION.benefits.map((benefit) => (
          <li
            key={benefit}
            className={cn(
              "flex items-start gap-2 text-slate-700",
              compact ? "text-xs" : "text-sm",
            )}
          >
            <span
              aria-hidden
              className={cn(
                "mt-0.5 flex shrink-0 items-center justify-center rounded-full bg-teal-100 text-teal-700",
                compact ? "h-4 w-4 text-[9px]" : "h-5 w-5 text-[10px]",
              )}
            >
              ✓
            </span>
            <span className="leading-snug">{benefit}</span>
          </li>
        ))}
      </ul>
      <SupportCtaRow compact={compact} className="mt-5 sm:mt-6" ctaLocation={ctaLocation} />
    </div>
  );
}

function SupportCtaRow({
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
        "flex flex-col gap-2.5 sm:flex-row sm:flex-wrap sm:items-stretch",
        className,
      )}
    >
      <CallTeamButton compact={compact} />
      <CtaLink
        href={HERO_FUNNEL_HREF}
        variant="secondary"
        size={compact ? "sm" : "md"}
        className="w-full justify-center sm:w-auto"
        ctaLocation={ctaLocation ? `${ctaLocation}-start-review` : "company-trust-start-review"}
      >
        {START_YOUR_REVIEW_LABEL}
      </CtaLink>
    </div>
  );
}

function CallTeamButton({ compact = false }: { compact?: boolean }) {
  return (
    <a
      href={`tel:${PLATFORM_PHONE_TEL}`}
      className={cn(
        "inline-flex min-h-[44px] flex-col items-center justify-center rounded-xl bg-brand-gradient px-5 text-center text-brand-navy shadow-sm transition hover:brightness-105",
        compact ? "py-2 text-sm sm:flex-1" : "py-2.5 sm:flex-1",
      )}
    >
      <span className="text-sm font-semibold leading-tight">{CALL_OUR_TEAM_LABEL}</span>
      <span className={cn("font-medium text-brand-navy/80", compact ? "text-xs" : "text-sm")}>
        {PLATFORM_PHONE_DISPLAY}
      </span>
    </a>
  );
}
