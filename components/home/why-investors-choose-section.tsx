"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { MotionCard } from "@/components/motion/motion-card";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { Card } from "@/components/ui/card";
import { WHY_INVESTORS_CHOOSE } from "@/lib/brand-positioning";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

export function WhyInvestorsChooseSection() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="why-investors" divider className="bg-white py-14 sm:py-20">
      <Reveal>
        <SectionHeader
          tone="light"
          title={WHY_INVESTORS_CHOOSE.headline}
          description="Short, focused guidance—not a generic lead form."
        />
      </Reveal>

      <StaggerReveal className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
        {WHY_INVESTORS_CHOOSE.cards.map((card, index) => (
          <StaggerItem key={card.title}>
            <MotionCard>
              <Card className="card-surface group h-full p-5 text-center sm:p-6">
                <motion.div
                  initial={reduceMotion ? false : { scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ delay: reduceMotion ? 0 : index * 0.06, duration: 0.3 }}
                  className={cn(
                    "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl text-2xl shadow-sm",
                    "bg-gradient-to-br from-teal-50 to-teal-100/80 ring-1 ring-teal-100",
                    "transition group-hover:shadow-md group-hover:ring-teal-200",
                  )}
                >
                  <span aria-hidden>{card.icon}</span>
                </motion.div>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{card.description}</p>
              </Card>
            </MotionCard>
          </StaggerItem>
        ))}
      </StaggerReveal>
    </Section>
  );
}
