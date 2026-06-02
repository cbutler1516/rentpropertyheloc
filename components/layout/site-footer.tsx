import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { FooterNavLink } from "@/components/layout/footer-nav-link";
import { CtaLink } from "@/components/ui/cta-link";
import { PhoneLink } from "@/components/trust/phone-link";
import { StrategyCallLink } from "@/components/trust/strategy-call-link";
import { PLATFORM_STATEMENT } from "@/lib/brand-positioning";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL, PRIMARY_CTA_SHORT } from "@/lib/cta";
import { FOOTER_FINE_PRINT, NMLS_CONSUMER_ACCESS_HOME } from "@/lib/legal/compliance";
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

        <div className="mt-10 border-t border-slate-200 pt-6 sm:mt-12">
          <div className="space-y-2 text-xs leading-relaxed text-slate-400">
            {FOOTER_FINE_PRINT.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
            <FooterNavLink href="/disclosures" className="text-slate-400 hover:text-slate-600">
              Licensing & Disclosures
            </FooterNavLink>
            <FooterNavLink href={PRIVACY_POLICY_PATH} className="text-slate-400 hover:text-slate-600">
              Privacy Policy
            </FooterNavLink>
            <FooterNavLink href={TERMS_OF_USE_PATH} className="text-slate-400 hover:text-slate-600">
              Terms of Use
            </FooterNavLink>
            <a
              href={NMLS_CONSUMER_ACCESS_HOME}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 underline-offset-2 transition hover:text-slate-600 hover:underline"
            >
              NMLS Consumer Access
            </a>
          </div>

          <p className="mt-5 text-xs text-slate-400">
            © {year} {SITE_NAME}. All rights reserved. {SITE_URL.replace("https://", "")}
          </p>
        </div>
      </Container>
    </footer>
  );
}
