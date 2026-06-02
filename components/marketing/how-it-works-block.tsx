"use client";

import { SectionHeader } from "@/components/layout/section";
import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { Reveal, StaggerItem, StaggerReveal } from "@/components/motion/reveal";
import { CtaLink } from "@/components/ui/cta-link";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL, PRIMARY_CTA_SHORT } from "@/lib/cta";
import { INVESTOR_PROCESS_STEPS } from "@/lib/marketing/content";
import { cn } from "@/lib/cn";
import { motion, useReducedMotion } from "framer-motion";

type HowItWorksBlockProps = {
  id?: string;
  compact?: boolean;
  showCta?: boolean;
  className?: string;
};

export function HowItWorksBlock({
  id = "how-it-works",
  compact = false,
  showCta = true,
  className,
}: HowItWorksBlockProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn(compact ? "py-0" : "", className)} id={id}>
      <Reveal>
        <div className={compact ? "mb-6" : undefined}>
          <SectionHeader
            tone="light"
            eyebrow="How It Works"
            title="Your investor journey"
            description="Four steps from property snapshot to personalized guidance."
          />
        </div>
      </Reveal>

      <StaggerReveal
        className={cn(
          "relative grid gap-4",
          compact ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-4 lg:gap-5",
        )}
      >
        {INVESTOR_PROCESS_STEPS.map((item, index) => (
          <StaggerItem key={item.step}>
            <JourneyStepCard
              item={item}
              index={index}
              compact={compact}
              reduceMotion={reduceMotion}
              isLast={index === INVESTOR_PROCESS_STEPS.length - 1}
            />
          </StaggerItem>
        ))}
      </StaggerReveal>

      {showCta ? (
        <Reveal delay={0.12} className="mt-8 flex flex-col items-center gap-3">
          <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="glow-accent w-full max-w-md sm:w-auto">
            <span className="md:hidden">{PRIMARY_CTA_SHORT}</span>
            <span className="hidden md:inline">{PRIMARY_CTA_LABEL}</span>
          </CtaLink>
          <CtaReassurance className="max-w-md" />
        </Reveal>
      ) : null}
    </div>
  );
}

function JourneyStepCard({
  item,
  index,
  compact,
  reduceMotion,
  isLast,
}: {
  item: (typeof INVESTOR_PROCESS_STEPS)[number];
  index: number;
  compact: boolean;
  reduceMotion: boolean | null;
  isLast: boolean;
}) {
  return (
    <div className="relative h-full">
      {!isLast && !compact ? (
        <span
          className="pointer-events-none absolute left-[calc(50%+2rem)] top-7 hidden h-0.5 w-[calc(100%-4rem)] bg-gradient-to-r from-teal-300 to-teal-100 lg:block"
          aria-hidden
        />
      ) : null}
      <motion.div
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-30px" }}
        transition={{ delay: reduceMotion ? 0 : index * 0.08, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "card-surface relative h-full overflow-hidden rounded-2xl border border-slate-200/90",
          compact ? "p-4" : "p-5 sm:p-6",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.06),transparent_60%)]"
          aria-hidden
        />
        <div className="relative">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-teal-700">
            {item.step}
          </p>
          <motion.div
            initial={reduceMotion ? false : { scale: 0.85 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: reduceMotion ? 0 : index * 0.08 + 0.1, type: "spring", stiffness: 260, damping: 20 }}
            className="mt-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-600 to-teal-700 text-2xl shadow-lg shadow-teal-900/10 ring-2 ring-teal-100"
          >
            <span aria-hidden>{item.icon}</span>
          </motion.div>
          <h3 className="mt-4 text-base font-semibold leading-snug text-slate-900 sm:text-lg">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
        </div>
      </motion.div>
    </div>
  );
}
