import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { Badge } from "@/components/ui/badge";
import { CtaLink } from "@/components/ui/cta-link";
import {
  COMPLIANCE_SHORT,
  COMPLIANCE_TIMING,
  PRIMARY_CTA_HREF,
  PRIMARY_CTA_LABEL,
  SECONDARY_CTA_HREF,
  SECONDARY_CTA_LABEL,
} from "@/lib/cta";
import { HERO_STATS } from "@/lib/home-content";
import { SITE_TAGLINE } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-20 pt-14 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_15%_10%,rgba(34,211,238,0.16),transparent_50%),radial-gradient(ellipse_at_85%_0%,rgba(74,222,128,0.1),transparent_42%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-navy-950" />
      <Container className="relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-14">
          <div className="max-w-2xl">
            <Badge className="mb-6">Rental-property HELOC</Badge>
            <h1 className="text-[2rem] font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Put rental equity to work{" "}
              <span className="bg-gradient-to-r from-accent to-accent-bright bg-clip-text text-transparent">
                without resetting the mortgage
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/75 sm:text-xl sm:leading-relaxed">
              {SITE_TAGLINE}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <CtaLink href={PRIMARY_CTA_HREF} size="lg" className="w-full sm:w-auto">
                {PRIMARY_CTA_LABEL}
              </CtaLink>
              <CtaLink
                href={SECONDARY_CTA_HREF}
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                {SECONDARY_CTA_LABEL}
              </CtaLink>
            </div>
            <ComplianceNote className="mt-6 max-w-xl">
              {COMPLIANCE_SHORT} {COMPLIANCE_TIMING}
            </ComplianceNote>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
              At a glance
            </p>
            <ul className="mt-6 divide-y divide-white/10">
              {HERO_STATS.map((stat) => (
                <li
                  key={stat.label}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <span className="text-sm text-white/60">{stat.label}</span>
                  <span className="text-right text-base font-semibold text-white sm:text-lg">
                    {stat.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs leading-relaxed text-white/45">
              Figures shown are illustrative. All programs subject to approval and lender
              guidelines.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
