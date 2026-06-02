import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { FooterNavLink } from "@/components/layout/footer-nav-link";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { CtaLink } from "@/components/ui/cta-link";
import { PhoneLink } from "@/components/trust/phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { StateAvailabilitySection } from "@/components/trust/state-availability-section";
import { BRAND } from "@/lib/brand";
import { PLATFORM_STATEMENT } from "@/lib/brand-positioning";
import { COMPLIANCE_SHORT, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL, PRIMARY_CTA_SHORT } from "@/lib/cta";
import { NMLS_CONSUMER_ACCESS_URL } from "@/lib/contact";
import { NMLS_LABEL } from "@/lib/legal/nmls";
import { PRIVACY_POLICY_PATH, TERMS_OF_USE_PATH } from "@/lib/legal/routes";
import { FOOTER_LINKS, SITE_NAME, SITE_URL } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white pb-[max(3rem,env(safe-area-inset-bottom))] pt-12 md:pb-12">
      <Container>
        <div className="grid gap-10 sm:grid-cols-2 sm:gap-12 lg:grid-cols-[1.25fr_1fr_1fr_1fr] lg:gap-8">
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-600 sm:mt-5">
              {PLATFORM_STATEMENT}
            </p>
            <CtaLink
              href={PRIMARY_CTA_HREF}
              size="md"
              className="mt-5 w-full sm:mt-6 sm:w-auto"
              ctaLocation="footer"
            >
              <span className="md:hidden">{PRIMARY_CTA_SHORT}</span>
              <span className="hidden md:inline">{PRIMARY_CTA_LABEL}</span>
            </CtaLink>
            <p className="mt-4 text-sm">
              <PhoneLink />
            </p>
            <p className="mt-3">
              <StrategyCallLink
                variant="ghost"
                className="text-sm text-teal-700"
                ctaLocation="footer"
              />
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Topics</p>
            <ul className="mt-4 space-y-1">
              {FOOTER_LINKS.topics.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Resources
            </p>
            <ul className="mt-4 space-y-1">
              {FOOTER_LINKS.resources.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">Legal</p>
            <ul className="mt-4 space-y-1">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <FooterNavLink href={link.href}>{link.label}</FooterNavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-slate-200 pt-8 sm:mt-12 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <div
              className="flex h-9 w-9 items-center justify-center rounded border border-slate-300 bg-slate-50 text-[9px] font-bold leading-tight text-slate-600"
              aria-label="Equal Housing Lender"
              title="Equal Housing Lender"
            >
              EHL
            </div>
            <p className="max-w-md text-[11px] leading-relaxed text-slate-500">
              Equal Housing Lender. RentPropertyHELOC.com is an educational and lead-generation
              platform connecting investors with licensed mortgage professionals. {NMLS_LABEL}.{" "}
              <a
                href={NMLS_CONSUMER_ACCESS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-teal-700 underline-offset-2 hover:underline"
              >
                NMLS Consumer Access
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
            <FooterNavLink href={PRIVACY_POLICY_PATH}>Privacy Policy</FooterNavLink>
            <FooterNavLink href={TERMS_OF_USE_PATH}>Terms of Use</FooterNavLink>
            <FooterNavLink href="/disclosures">Disclosures</FooterNavLink>
            <FooterNavLink href="/about">About</FooterNavLink>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-200 pt-8">
          <StateAvailabilitySection variant="footer" />
        </div>

        <ComplianceNote className="mt-6 text-left text-[11px] sm:text-xs">{COMPLIANCE_SHORT}</ComplianceNote>

        <p className="mt-5 text-xs text-slate-400 sm:mt-6">
          © {year} {SITE_NAME}. All rights reserved. {SITE_URL.replace("https://", "")}
        </p>
      </Container>
    </footer>
  );
}
