import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { CtaLink } from "@/components/ui/cta-link";
import type { MarketingPageConfig } from "@/lib/marketing-pages";
import { marketingComplianceFooter } from "@/lib/marketing-pages";

type MarketingLandingPageProps = {
  config: MarketingPageConfig;
};

export function MarketingLandingPage({ config }: MarketingLandingPageProps) {
  return (
    <div className="section-light py-10 sm:py-14 md:py-16">
      <Container className="max-w-4xl">
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 sm:text-xs">
          {config.eyebrow}
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
          {config.title}
        </h1>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
          {config.lead}
        </p>

        <ul className="mt-8 space-y-3">
          {config.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-3 text-sm text-slate-700 sm:text-[0.9375rem]"
            >
              <span
                aria-hidden
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-teal-100 text-[10px] font-bold text-teal-800"
              >
                ✓
              </span>
              {bullet}
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <CtaLink href={config.primaryCta.href} size="lg" ctaLocation={`${config.path}-primary`}>
            {config.primaryCta.label}
          </CtaLink>
          {config.secondaryCta ? (
            <CtaLink
              href={config.secondaryCta.href}
              variant="secondary"
              size="lg"
              ctaLocation={`${config.path}-secondary`}
            >
              {config.secondaryCta.label}
            </CtaLink>
          ) : null}
        </div>

        <ComplianceNote className="mt-10">{marketingComplianceFooter()}</ComplianceNote>
      </Container>
    </div>
  );
}
