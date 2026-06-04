"use client";

import { MotionCard } from "@/components/motion/motion-card";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { INVESTOR_EQUITY_STRATEGIES } from "@/lib/marketing/content";
import { cn } from "@/lib/cn";

type InvestorEquityStrategiesBlockProps = {
  className?: string;
};

export function InvestorEquityStrategiesBlock({ className }: InvestorEquityStrategiesBlockProps) {
  const { sectionLabel, headline, subheadline, disclaimer, cards } = INVESTOR_EQUITY_STRATEGIES;

  return (
    <div className={className}>
      <Reveal>
        <div className="max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-teal-700 sm:text-xs">
            {sectionLabel}
          </p>
          <h2 className="mt-2.5 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl md:text-[1.75rem] md:leading-tight">
            {headline}
          </h2>
          <p className="mt-2.5 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[0.9375rem]">
            {subheadline}
          </p>
        </div>
      </Reveal>

      <StaggerReveal className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-5">
        {cards.map((card) => (
          <StaggerItem key={card.id}>
            <MotionCard className="h-full">
              <Card
                className={cn(
                  "card-surface group h-full border border-slate-200/90 bg-white p-5 shadow-[0_2px_12px_rgba(15,23,42,0.04)]",
                  "transition duration-200 hover:border-teal-200/80 hover:shadow-[0_8px_28px_rgba(15,23,42,0.08)] sm:p-6",
                )}
              >
                <span
                  aria-hidden
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-2xl transition group-hover:bg-teal-100/90"
                >
                  {card.icon}
                </span>
                <h3 className="mt-4 text-base font-bold tracking-tight text-slate-900 sm:text-[1.0625rem]">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
              </Card>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerReveal>

      <Reveal delay={0.06}>
        <p className="mt-5 max-w-3xl text-[11px] leading-relaxed text-slate-500 sm:mt-6 sm:text-xs">
          {disclaimer}
        </p>
      </Reveal>
    </div>
  );
}
