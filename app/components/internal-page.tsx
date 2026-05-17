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
        />

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

        <CTASection
          title={closing.title}
          body={closing.body}
          actions={[{ href: "/strategy", label: "View Strategy Framework" }]}
        />
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
