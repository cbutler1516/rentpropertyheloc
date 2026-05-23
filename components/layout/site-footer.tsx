import { Logo } from "@/components/brand/logo";
import { Container } from "@/components/layout/container";
import { ComplianceNote } from "@/components/layout/compliance-note";
import { CtaLink } from "@/components/ui/cta-link";
import { BRAND } from "@/lib/brand";
import { COMPLIANCE_SHORT, PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { FOOTER_LINKS, SITE_NAME, SITE_URL } from "@/lib/site";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.08] bg-navy-950 pb-12 pt-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr] lg:gap-10">
          <div>
            <Logo variant="navbar" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/60">{BRAND.tagline}</p>
            <CtaLink href={PRIMARY_CTA_HREF} size="md" className="mt-6">
              {PRIMARY_CTA_LABEL}
            </CtaLink>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Topics
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.topics.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-accent-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/45">
              Legal
            </p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_LINKS.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition hover:text-accent-bright"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/brand"
                  className="text-sm text-white/65 transition hover:text-accent-bright"
                >
                  Brand system
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <ComplianceNote className="mt-12 border-t border-white/10 pt-8">
          {COMPLIANCE_SHORT}
        </ComplianceNote>

        <p className="mt-6 text-xs text-white/40">
          © {new Date().getFullYear()} {SITE_NAME}. {SITE_URL.replace("https://", "")}
        </p>
      </Container>
    </footer>
  );
}
