import type { Metadata } from "next";
import { ApplyPageView } from "../components/apply-page-view";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { FooterSocialLinks } from "../components/footer-social-links";
import { PageHero, SectionHeader } from "../components/design-system";
import { PageAmbient } from "../components/page-ambient";
import { RevealGroup } from "../components/reveal-group";
import { SiteNav } from "../components/site-nav";
import { TrackedAnchor, TrackedLink } from "../components/tracked-link";

const applicationUrl =
  "https://broadviewlending.my1003app.com/1585236/register?time=1779152717351";

const nextSteps = [
  "You will leave The Loan Playbook and continue in a secure mortgage application portal.",
  "The application collects the details needed for a full review.",
  "If something is unclear, the strategy conversation can still happen alongside the application.",
];

const prepItems = [
  "Income and employment information",
  "Assets, debts, and property details if available",
  "Best contact details for follow-up",
];

export const metadata: Metadata = {
  title: "Apply | The Loan Playbook",
  description:
    "Start the secure mortgage application process through the Broadview Lending application portal.",
};

export default function ApplyPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] text-white">
      <ApplyPageView />
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

      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Secure Application"
          title="Ready to move forward?"
          lead="Start the application when you are ready for a full mortgage review."
          focusLabel="What Happens"
          focus="Strategy-first guidance stays available. The application simply starts the secure review."
          videoSrc="/videos/loan-playbook-tennis-about.mp4"
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href={applicationUrl}
              target="_blank"
              rel="noreferrer"
              location="apply_hero"
              label="Start Secure Application"
              eventType="apply_cta"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Start Secure Application
            </TrackedAnchor>
            <TrackedLink
              href="/learn/buyer-readiness"
              location="apply_hero"
              label="Review Buyer Strategy"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            >
              Review Buyer Strategy
            </TrackedLink>
          </div>
        </PageHero>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-10">
            <SectionHeader
              eyebrow="Application Transition"
              title="You are moving into the secure portal."
              lead="No iframe. No clutter. Just a clean handoff to the encrypted application experience."
            />
            <RevealGroup className="grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70">
              {nextSteps.map((step, index) => (
                <div key={step} className="reveal-item bg-[#050505] p-6">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-lg leading-snug tracking-[-0.02em] text-zinc-200">
                    {step}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="grid gap-10 md:grid-cols-[1fr_1fr] md:gap-14">
              <RevealGroup
                className="border border-zinc-900/80 bg-[#050505] p-7 md:p-9"
                stagger={90}
              >
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  Secure + Guided
                </p>
                <h2 className="reveal-item mt-5 text-3xl font-semibold tracking-[-0.03em] text-white md:text-4xl">
                  Encrypted application. No-pressure support.
                </h2>
                <p className="reveal-item mt-6 leading-relaxed text-zinc-500">
                  The application portal is designed for full mortgage review.
                  The Loan Playbook remains your strategy layer before, during,
                  and after the application.
                </p>
              </RevealGroup>

              <RevealGroup
                className="grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70"
                stagger={80}
              >
                {prepItems.map((item) => (
                  <div key={item} className="reveal-item bg-[#050505] p-6">
                    <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                      Prep
                    </p>
                    <p className="mt-4 text-lg leading-snug text-zinc-200">
                      {item}
                    </p>
                  </div>
                ))}
              </RevealGroup>
            </div>

            <div className="mt-12 flex flex-col gap-4 sm:flex-row">
              <TrackedAnchor
                href={applicationUrl}
                target="_blank"
                rel="noreferrer"
                location="apply_body"
                label="Start Secure Application"
                eventType="apply_cta"
                className="btn-primary inline-flex h-14 w-fit items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
              >
                Start Secure Application
              </TrackedAnchor>
              <p className="max-w-md font-mono text-[10px] leading-relaxed tracking-[0.16em] text-zinc-600 uppercase">
                Secure portal · Strategy-first support · No-pressure guidance
              </p>
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
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
