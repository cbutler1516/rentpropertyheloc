"use client";

import { Container } from "@/components/layout/container";
import { MotionCard } from "@/components/motion/motion-card";
import { StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { METRICS } from "@/lib/home-content";

export function MetricsRow() {
  return (
    <section className="relative border-y border-white/10 bg-navy-900/40 py-10 sm:py-12">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.06),transparent_65%)]" aria-hidden />
      <Container className="relative">
        <StaggerReveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {METRICS.map((metric) => (
            <StaggerItem key={metric.label}>
              <MotionCard className="glass-panel h-full rounded-2xl p-5 sm:p-6">
                <p className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  {metric.value}
                </p>
                <p className="mt-2 text-sm font-semibold text-accent-bright">{metric.label}</p>
                <p className="mt-2 text-xs leading-relaxed text-white/50">{metric.note}</p>
              </MotionCard>
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Container>
    </section>
  );
}
