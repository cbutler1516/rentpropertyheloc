"use client";

import { Container } from "@/components/layout/container";
import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import {
  BORROWER_TRUST_HEADLINE,
  BORROWER_TRUST_SUBHEADLINE,
  CLIENT_TESTIMONIALS,
  type ClientTestimonial,
} from "@/lib/trust-reviews";
import {
  HOME_INVESTOR_TESTIMONIALS_HEADLINE,
  HOME_INVESTOR_TESTIMONIALS_SUBHEADLINE,
} from "@/lib/home-investor-trust";
import { cn } from "@/lib/cn";

type BorrowerTrustSectionProps = {
  variant?: "hero" | "section" | "compact" | "embedded";
  className?: string;
};

function StarRating({ className }: { className?: string }) {
  return (
    <p
      className={cn("mb-2.5 text-sm leading-none tracking-wide sm:text-base", className)}
      aria-label="5 out of 5 stars"
    >
      ⭐⭐⭐⭐⭐
    </p>
  );
}

function TestimonialCard({
  review,
  compact,
}: {
  review: ClientTestimonial;
  compact?: boolean;
}) {
  return (
    <figure
      className={cn(
        "flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white shadow-[0_2px_12px_rgba(15,23,42,0.04)]",
        compact ? "p-3.5" : "p-4 sm:p-5",
      )}
    >
      <StarRating />
      <blockquote
        className={cn(
          "flex-1 leading-relaxed text-slate-700",
          compact ? "text-xs" : "text-sm",
        )}
      >
        &ldquo;{review.excerpt}&rdquo;
      </blockquote>
      <figcaption className={cn("mt-3 border-t border-slate-100 pt-3", compact && "mt-2.5 pt-2.5")}>
        <p className={cn("font-semibold text-slate-900", compact ? "text-xs" : "text-sm")}>
          {review.reviewerDisplayName}
        </p>
      </figcaption>
    </figure>
  );
}

function TestimonialsGrid({
  compact,
  hero,
}: {
  compact?: boolean;
  hero?: boolean;
}) {
  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4",
        hero || !compact
          ? "grid-cols-1 sm:grid-cols-2"
          : "grid-cols-1",
      )}
    >
      {CLIENT_TESTIMONIALS.map((review) => (
        <TestimonialCard key={review.id} review={review} compact={compact || hero} />
      ))}
    </div>
  );
}

function SectionHeading({
  compact,
  centered,
  headline = BORROWER_TRUST_HEADLINE,
  subheadline = BORROWER_TRUST_SUBHEADLINE,
}: {
  compact?: boolean;
  centered?: boolean;
  headline?: string;
  subheadline?: string;
}) {
  return (
    <div className={cn(centered && "text-center", compact ? "mb-4" : "mb-5 sm:mb-6")}>
      <h2
        id="borrower-trust-heading"
        className={cn(
          "font-bold tracking-tight text-slate-900",
          compact ? "text-base sm:text-lg" : "text-lg sm:text-xl md:text-2xl",
        )}
      >
        {headline}
      </h2>
      <p
        className={cn(
          "mt-1 leading-relaxed text-slate-600",
          compact ? "text-xs sm:text-sm" : "text-sm sm:text-base",
          centered && "mx-auto max-w-2xl",
        )}
      >
        {subheadline}
      </p>
    </div>
  );
}

export function BorrowerTrustSection({
  variant = "section",
  className,
}: BorrowerTrustSectionProps) {
  const compact = variant === "compact";

  if (variant === "hero") {
    return (
      <section
        className={cn(
          "border-b border-slate-200/80 bg-gradient-to-b from-slate-50 to-white py-8 sm:py-10",
          className,
        )}
        aria-labelledby="borrower-trust-heading"
      >
        <Container className="max-w-6xl">
          <SectionHeading
            compact
            centered
            headline={HOME_INVESTOR_TESTIMONIALS_HEADLINE}
            subheadline={HOME_INVESTOR_TESTIMONIALS_SUBHEADLINE}
          />
          <TestimonialsGrid hero />
        </Container>
      </section>
    );
  }

  if (variant === "embedded") {
    return (
      <div className={cn("rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 sm:p-6", className)}>
        <SectionHeading compact />
        <TestimonialsGrid compact />
      </div>
    );
  }

  if (compact) {
    return (
      <div className={cn("rounded-xl border border-slate-200/90 bg-white p-4 shadow-sm", className)}>
        <SectionHeading compact />
        <TestimonialsGrid compact />
      </div>
    );
  }

  return (
    <Section divider muted className={cn("py-12 sm:py-16 md:py-20", className)}>
      <Reveal>
        <SectionHeader
          tone="light"
          eyebrow="Client feedback"
          title={BORROWER_TRUST_HEADLINE}
          description={BORROWER_TRUST_SUBHEADLINE}
        />
      </Reveal>
      <Reveal delay={0.06} className="mx-auto mt-8 max-w-6xl lg:mt-10">
        <TestimonialsGrid />
      </Reveal>
    </Section>
  );
}
