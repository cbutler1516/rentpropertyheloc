"use client";

import { Container } from "@/components/layout/container";
import { AmbientBackground } from "@/components/layout/ambient-background";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { MotionCard } from "@/components/motion/motion-card";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { DASHBOARD_DATA } from "@/lib/home-content";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function MetricBlock({
  label,
  value,
  sub,
}: {
  label: string;
  value: string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200/60 bg-slate-50/80 p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-bold tabular-nums text-navy-950 sm:text-2xl">{value}</p>
      {sub ? <p className="mt-1 text-xs text-slate-500">{sub}</p> : null}
    </div>
  );
}

export function EquityDashboardSection() {
  const equityPercent = Math.round(
    (DASHBOARD_DATA.availableEquity /
      (DASHBOARD_DATA.propertyValue - DASHBOARD_DATA.mortgageBalance)) *
      100,
  );

  return (
    <section id="dashboard" className="relative overflow-hidden py-20 sm:py-28 lg:py-32">
      <AmbientBackground />
      <Container className="relative">
        <Reveal className="mx-auto mb-14 max-w-2xl text-center sm:mb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
            Portfolio view
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Investor equity dashboard
          </h2>
          <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
            Illustrative snapshot of how rental collateral, income, and available equity may
            appear in review—subject to approval.
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <MotionCard className="mx-auto max-w-4xl overflow-hidden rounded-3xl border border-white/15 bg-white shadow-[0_32px_100px_rgba(0,0,0,0.45)]">
            <div className="border-b border-slate-200/80 bg-slate-50 px-5 py-4 sm:px-8">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500">Property</p>
                  <p className="text-lg font-semibold text-navy-950">
                    {DASHBOARD_DATA.propertyName}
                  </p>
                </div>
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  {DASHBOARD_DATA.status}
                </span>
              </div>
            </div>

            <div className="p-5 sm:p-8">
              <StaggerReveal className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <StaggerItem>
                  <MetricBlock
                    label="Property value"
                    value={formatCurrency(DASHBOARD_DATA.propertyValue)}
                  />
                </StaggerItem>
                <StaggerItem>
                  <MetricBlock
                    label="Mortgage balance"
                    value={formatCurrency(DASHBOARD_DATA.mortgageBalance)}
                  />
                </StaggerItem>
                <StaggerItem>
                  <MetricBlock
                    label="Est. available equity"
                    value={formatCurrency(DASHBOARD_DATA.availableEquity)}
                    sub="May be available · subject to approval"
                  />
                </StaggerItem>
                <StaggerItem>
                  <MetricBlock
                    label="Rental income"
                    value={`${formatCurrency(DASHBOARD_DATA.monthlyRent)}/mo`}
                  />
                </StaggerItem>
              </StaggerReveal>

              <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
                <div className="rounded-2xl border border-slate-200/80 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-navy-950">Equity utilization</p>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-accent to-accent-bright"
                      style={{ width: `${Math.min(equityPercent, 100)}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-slate-500">
                    Illustrative capacity only—not an offer or approval amount.
                  </p>
                </div>

                <div className="rounded-2xl border border-accent/30 bg-gradient-to-br from-navy-950 to-navy-900 p-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent-bright">
                    Eligibility
                  </p>
                  <p className="mt-3 text-lg font-semibold">{DASHBOARD_DATA.eligibility}</p>
                  <p className="mt-2 text-sm text-white/65">
                    Final terms depend on credit, property, and lender guidelines.
                  </p>
                  <CtaLink href={PRIMARY_CTA_HREF} size="md" className="mt-5 w-full">
                    {PRIMARY_CTA_LABEL}
                  </CtaLink>
                </div>
              </div>
            </div>
          </MotionCard>
        </Reveal>
      </Container>
    </section>
  );
}
