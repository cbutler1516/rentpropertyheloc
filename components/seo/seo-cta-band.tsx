import { Container } from "@/components/layout/container";
import { CtaReassurance } from "@/components/marketing/cta-reassurance";
import { PlatformPhoneLink } from "@/components/trust/platform-phone-link";
import { CtaLink } from "@/components/ui/cta-link";
import { QUESTIONS_CALL_TEAM_LABEL } from "@/lib/contact";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { cn } from "@/lib/cn";

type SeoCtaBandProps = {
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
  ctaLocation?: string;
};

export function SeoCtaBand({
  title = "Investor financing with real human guidance",
  description = "Financing specialist review · Multiple financing paths · ~60 seconds",
  className,
  compact,
  ctaLocation = "seo-cta-band",
}: SeoCtaBandProps) {
  return (
    <div
      className={cn(
        compact ? "py-8 sm:py-10" : "border-y border-slate-200/80 bg-slate-50/50 py-10 sm:py-12",
        className,
      )}
    >
      <Container className="max-w-3xl">
        <div
          className={cn(
            "text-center",
            !compact &&
              "rounded-2xl border border-slate-200/90 bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10",
          )}
        >
          <h2 className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{description}</p>
          <div className="mt-6">
            <CtaLink
              href={PRIMARY_CTA_HREF}
              size="lg"
              className="w-full sm:w-auto"
              ctaLocation={ctaLocation}
            >
              {PRIMARY_CTA_LABEL}
            </CtaLink>
          </div>
          <CtaReassurance className="mx-auto mt-3 max-w-md" />
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-600">
            <PlatformPhoneLink size="sm" label={QUESTIONS_CALL_TEAM_LABEL} className="justify-center" />
          </p>
          <p className="mx-auto mt-4 max-w-md text-[11px] leading-relaxed text-slate-500">
            Programs may be available for qualifying rental properties, subject to approval. Not a
            commitment to lend. Terms and eligibility vary. State availability varies.
          </p>
        </div>
      </Container>
    </div>
  );
}
