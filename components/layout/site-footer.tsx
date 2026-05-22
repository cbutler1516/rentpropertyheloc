import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { CtaLink } from "@/components/ui/cta-link";
import { COMPLIANCE_SHORT, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { FOOTER_LINKS, SITE_NAME, SITE_URL } from "@/lib/site";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 pb-10 pt-14">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr] lg:gap-12">
          <div>
            <p className="text-lg font-semibold text-white">{SITE_NAME}</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/65">
              Investor-focused education on rental-property HELOC options. Not a commitment to
              lend.
            </p>
            <CtaLink href={PRIMARY_CTA_HREF} size="md" className="mt-6">
              {PRIMARY_CTA_LABEL}
            </CtaLink>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Topics
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.topics.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-accent-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition hover:text-accent-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ComplianceNote className="mt-10 border-t border-white/10 pt-8">
          {COMPLIANCE_SHORT}
        </ComplianceNote>

        <p className="mt-6 text-xs text-white/45">
          © {new Date().getFullYear()} {SITE_NAME}. {SITE_URL.replace("https://", "")}
        </p>
      </Container>
    </footer>
  );
}
