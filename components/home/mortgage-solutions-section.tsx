"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { FooterNavLink } from "@/components/layout/footer-nav-link";
import { MORTGAGE_SOLUTION_LINKS } from "@/lib/mortgage-products/content";

export function MortgageSolutionsSection() {
  return (
    <Section id="mortgage-solutions" divider className="bg-surface-50 py-8 sm:py-10 md:py-12">
      <Reveal>
        <SectionHeader
          eyebrow="Mortgage solutions"
          title="Loan programs with strategy-first guidance"
          description="Explore purchase, equity, investor, and commercial paths — each with educational guides and Deal Analyzer support."
          align="center"
        />
      </Reveal>
      <Reveal delay={0.06}>
        <ul className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-4">
          {MORTGAGE_SOLUTION_LINKS.map((link) => (
            <li key={link.href}>
              <FooterNavLink
                href={link.href}
                className="flex min-h-[52px] items-center rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-sm transition hover:border-teal-200 hover:bg-teal-50/50 hover:text-teal-900"
              >
                {link.label}
              </FooterNavLink>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-center text-sm text-slate-600">
          <FooterNavLink href="/mortgage-resources" className="font-semibold text-teal-700">
            Browse all mortgage resources →
          </FooterNavLink>
        </p>
      </Reveal>
    </Section>
  );
}
