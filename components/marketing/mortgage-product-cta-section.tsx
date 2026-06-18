import { Container } from "@/components/layout/container";
import { CtaLink } from "@/components/ui/cta-link";
import {
  ANALYZE_SCENARIO_HREF,
  ANALYZE_SCENARIO_LABEL,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  SCHEDULE_STRATEGY_CALL_LABEL,
  STRATEGY_CALL_HREF,
} from "@/lib/cta";
import { cn } from "@/lib/cn";

type MortgageProductCtaSectionProps = {
  title?: string;
  className?: string;
  compact?: boolean;
  ctaLocationPrefix?: string;
};

export function MortgageProductCtaSection({
  title,
  className,
  compact,
  ctaLocationPrefix = "mortgage-product",
}: MortgageProductCtaSectionProps) {
  return (
    <div className={cn(compact ? "py-0" : "py-8 sm:py-10", className)}>
      <Container className="max-w-3xl">
        {title ? (
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h2>
        ) : null}
        <div
          className={cn(
            "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
            title ? "mt-6" : undefined,
          )}
        >
          <CtaLink
            href={PRIMARY_CTA_HREF}
            size="lg"
            className="w-full sm:w-auto"
            ctaLocation={`${ctaLocationPrefix}-playbook`}
          >
            {PRIMARY_CTA_LABEL}
          </CtaLink>
          <CtaLink
            href={ANALYZE_SCENARIO_HREF}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            ctaLocation={`${ctaLocationPrefix}-analyze`}
          >
            {ANALYZE_SCENARIO_LABEL}
          </CtaLink>
          <CtaLink
            href={STRATEGY_CALL_HREF}
            variant="secondary"
            size="lg"
            className="w-full sm:w-auto"
            ctaLocation={`${ctaLocationPrefix}-strategy-call`}
          >
            {SCHEDULE_STRATEGY_CALL_LABEL}
          </CtaLink>
        </div>
      </Container>
    </div>
  );
}
