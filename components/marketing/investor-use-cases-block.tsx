"use client";

import { SectionHeader } from "@/components/layout/section";
import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { UseCaseIcon } from "@/components/marketing/use-case-icon";
import { MotionCard } from "@/components/motion/motion-card";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_SHORT } from "@/lib/cta";
import {
  INVESTOR_EQUITY_USE_CASES,
  USE_CASES_COMPLIANCE,
} from "@/lib/marketing/content";
import { cn } from "@/lib/cn";
import Link from "next/link";

type InvestorUseCasesBlockProps = {
  compact?: boolean;
  showFooterLink?: boolean;
  className?: string;
};

export function InvestorUseCasesBlock({
  compact = false,
  showFooterLink = false,
  className,
}: InvestorUseCasesBlockProps) {
  return (
    <div className={className}>
      <Reveal>
        <div className={compact ? "mb-6" : undefined}>
          <SectionHeader
            tone="light"
            eyebrow="Use cases"
            title="Ways investors use rental property equity"
            description="Common paths for second-position equity access on investment property—subject to approval."
          />
        </div>
      </Reveal>

      <StaggerReveal
        className={cn(
          "grid gap-3 sm:gap-4",
          compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3 lg:gap-5",
        )}
      >
        {INVESTOR_EQUITY_USE_CASES.map((item) => (
          <StaggerItem key={item.id}>
            <MotionCard>
              <Card className={cn("card-surface flex h-full flex-col", compact ? "p-4" : "p-5")}>
                <UseCaseIcon icon={item.id} />
                <h3 className="mt-3 text-base font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                  {item.description}
                </p>
                <Link
                  href={PRIMARY_CTA_HREF}
                  className="mt-4 inline-flex text-sm font-semibold text-teal-700 underline-offset-4 hover:underline"
                >
                  {PRIMARY_CTA_SHORT} →
                </Link>
              </Card>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <Reveal delay={0.1} className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
        <p className="text-center text-[11px] leading-relaxed text-slate-500 sm:text-left sm:text-xs">
          {USE_CASES_COMPLIANCE}
        </p>
        {!compact ? (
          <CtaLink href={PRIMARY_CTA_HREF} size="md" variant="secondary" className="shrink-0">
            {PRIMARY_CTA_SHORT}
          </CtaLink>
        ) : null}
      </Reveal>

      {showFooterLink ? (
        <p className="mt-4 text-center text-sm">
          <Link
            href="/scenarios"
            className="inline-flex min-h-11 items-center justify-center font-medium text-teal-700 hover:underline sm:min-h-0"
          >
            View illustrative scenario examples →
          </Link>
        </p>
      ) : null}

      {!compact ? <CtaReassurance className="mx-auto mt-4 max-w-lg" /> : null}
    </div>
  );
}
