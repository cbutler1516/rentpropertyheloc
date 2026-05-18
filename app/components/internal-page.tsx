import {
  CTASection,
  PageHero,
  ProcessStep,
} from "./design-system";
import type { ReactNode } from "react";
import { FooterBrand } from "./brand";
import { ComplianceFooter } from "./compliance-footer";
import { PageAmbient } from "./page-ambient";
import { RevealGroup } from "./reveal-group";
import { SiteNav } from "./site-nav";
import type { SportsStrategyVariant } from "./sports-strategy-layer";
import { TrackedAnchor } from "./tracked-link";

type InternalPageProps = {
  eyebrow: string;
  title: string;
  lead: string;
  focus: string;
  strategyVisual?: SportsStrategyVariant;
  heroVideoSrc?: string;
  sections: Array<{
    label: string;
    title: string;
    body: string;
  }>;
  closing: {
    title: string;
    body: string;
  };
  extraSections?: ReactNode;
  primaryCta?: {
    href: string;
    label: string;
  };
  secondaryCta?: {
    href: string;
    label: string;
  };
};

export function InternalPage({
  eyebrow,
  title,
  lead,
  focus,
  strategyVisual,
  heroVideoSrc,
  sections,
  closing,
  extraSections,
  primaryCta,
  secondaryCta,
}: InternalPageProps) {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <PageAmbient enableParallax={false} />
      <div
        className="playbook-grid pointer-events-none fixed inset-0 z-0 opacity-30"
        aria-hidden
      />
      <div
        className="vignette pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
      />
      <div
        className="ambient-drift pointer-events-none fixed top-[-12rem] right-[-8rem] z-[1] h-[36rem] w-[36rem] rounded-full bg-[#5b21b6]/15 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-[-12rem] left-[-10rem] z-[1] h-[30rem] w-[30rem] rounded-full bg-[#4c1d95]/10 blur-[110px]"
        aria-hidden
      />

      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow={eyebrow}
          title={title}
          lead={lead}
          focus={focus}
          visual={strategyVisual}
          videoSrc={heroVideoSrc}
        >
          {primaryCta ? (
            <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
              <TrackedAnchor
                href={primaryCta.href}
                location="internal_page_hero"
                label={primaryCta.label}
                className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
              >
                {primaryCta.label}
              </TrackedAnchor>
              {secondaryCta ? (
                <TrackedAnchor
                  href={secondaryCta.href}
                  location="internal_page_hero"
                  label={secondaryCta.label}
                  className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
                >
                  {secondaryCta.label}
                </TrackedAnchor>
              ) : null}
            </div>
          ) : null}
        </PageHero>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#5b21b6]/[0.035] via-transparent to-transparent"
            aria-hidden
          />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <RevealGroup
              className="grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
              stagger={140}
            >
              {sections.map((section) => (
                <ProcessStep
                  key={section.label}
                  step={section.label}
                  title={section.title}
                  body={section.body}
                />
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        {extraSections}

        {primaryCta && !extraSections ? (
          <CTASection
            title={closing.title}
            body={closing.body}
            analyticsSection="lead_capture"
            actions={[
              { href: primaryCta.href, label: primaryCta.label, variant: "primary" },
            ]}
          />
        ) : null}
      </main>

      <footer className="relative z-10 border-t border-zinc-900/60 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase md:flex-row md:items-center md:justify-between md:px-10">
          <FooterBrand />
          <span>© {new Date().getFullYear()} The Loan Playbook</span>
        </div>
        <ComplianceFooter />
      </footer>
    </div>
  );
}
