import type { Metadata } from "next";
import { CommercialCalculatorLoader } from "../../components/commercial-calculator-loader";
import { CommercialCalculatorView } from "../../components/commercial-calculator-view";
import { FooterBrand } from "../../components/brand";
import { ComplianceFooter } from "../../components/compliance-footer";
import { FooterSocialLinks } from "../../components/footer-social-links";
import { PageHero } from "../../components/design-system";
import { PageAmbient } from "../../components/page-ambient";
import { SiteNav } from "../../components/site-nav";
import { TrackedAnchor } from "../../components/tracked-link";

export const metadata: Metadata = {
  title: "Commercial Mortgage Calculator | The Loan Playbook",
  description:
    "Run DSCR, LTV, payment, bridge, development, SBA, and refinance scenarios before starting the conversation.",
};

export default function CommercialCalculatorPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <CommercialCalculatorView />
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
        className="pointer-events-none fixed top-24 left-1/2 z-[1] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[#7c3aed]/15 blur-[120px]"
        aria-hidden
      />
      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Commercial Calculator"
          title="Commercial Mortgage Calculator"
          lead="Run DSCR, LTV, payment, bridge, development, SBA, and refinance scenarios before starting the conversation."
          focusLabel="Use Case"
          focus="Estimate the structure first. Talk through the scenario when ready."
          videoSrc="/videos/loan-playbook-commercial-golf.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="https://link.theradcrm.com/widget/booking/BAoGsdcWyItX8Cn7qGN2"
              target="_blank"
              rel="noreferrer"
              location="commercial_calculator_hero"
              label="Schedule Commercial Review"
              eventType="commercial_schedule"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Schedule Commercial Review
            </TrackedAnchor>
            <TrackedAnchor
              href="tel:2062225650"
              location="commercial_calculator_hero"
              label="Talk Through a Scenario"
              eventType="commercial_call"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Talk Through a Scenario
            </TrackedAnchor>
          </div>
        </PageHero>

        <section
          id="calculator"
          className="relative mx-auto w-full max-w-7xl px-4 pb-20 md:px-6"
        >
          {/* TODO: Add the residential calculator in a separate phase after the commercial calculator deploys successfully. */}
          <div className="relative overflow-hidden rounded-[1.75rem] border border-zinc-900/80 bg-[linear-gradient(135deg,rgba(124,58,237,0.16),rgba(5,5,5,0.96)_34%,rgba(24,24,27,0.98))] p-2 shadow-[0_32px_120px_rgba(0,0,0,0.5)] md:p-3">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(124,58,237,0.22),transparent_45%)]"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[1.25rem] border border-white/10">
              <CommercialCalculatorLoader />
            </div>
          </div>
          <p className="mx-auto mt-6 max-w-4xl px-2 text-center font-mono text-[10px] leading-relaxed tracking-[0.16em] text-zinc-600 uppercase">
            Calculations are estimates only and are not a commitment to lend.
            Final terms depend on lender review, underwriting, property
            analysis, sponsor strength, and market conditions.
          </p>
        </section>
      </main>

      <footer className="relative z-10 border-t border-zinc-900/60 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase md:flex-row md:items-center md:justify-between md:px-10">
          <FooterBrand />
          <span>© {new Date().getFullYear()} The Loan Playbook</span>
        </div>
        <FooterSocialLinks />
        <ComplianceFooter />
      </footer>
    </div>
  );
}
