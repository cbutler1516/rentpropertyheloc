import type { Metadata } from "next";
import { ApplicationCta } from "../../components/application-cta";
import { FooterBrand } from "../../components/brand";
import { ComplianceFooter } from "../../components/compliance-footer";
import { FooterSocialLinks } from "../../components/footer-social-links";
import { LeadCaptureForm } from "../../components/lead-capture-form";
import { MicroOptIn } from "../../components/micro-opt-in";
import { PageHero, SectionHeader } from "../../components/design-system";
import { PageAmbient } from "../../components/page-ambient";
import { RevealGroup } from "../../components/reveal-group";
import { SchedulingLink } from "../../components/scheduling-cta";
import { SiteNav } from "../../components/site-nav";
import { StickyMobileCta } from "../../components/sticky-mobile-cta";
import { TrackedAnchor, TrackedLink } from "../../components/tracked-link";
import { getSocialPostBySlug } from "../../lib/social-posts";

export const metadata: Metadata = {
  title: "Buyer Readiness Strategy | The Loan Playbook",
  description:
    "Know your payment, cash to close, loan options, and timeline before the home search gets serious.",
  openGraph: {
    title: "Before you search, know your number.",
    description:
      "Most buyers start too late. Build the number, file, and next move before touring homes.",
    type: "article",
  },
};

const buyerReadinessVideo = getSocialPostBySlug("buyer-readiness-before-search");

const buyerAnxiety = [
  "Shopping before understanding payment",
  "Underestimating cash to close",
  "Focusing only on rate",
  "Waiting too long",
  "Touring homes before a plan",
];

const clarityItems = [
  "Payment",
  "Cash to close",
  "Offer strategy",
  "Loan options",
  "Timeline",
];

const howItWorks = [
  {
    label: "Step 01",
    title: "Share the goal",
    body: "Where, when, and what you want the payment to feel like.",
  },
  {
    label: "Step 02",
    title: "Build the number",
    body: "Payment, cash, options, and timing.",
  },
  {
    label: "Step 03",
    title: "Make the move",
    body: "Shop with a cleaner path.",
  },
];

const trustSignals = [
  "Licensed multi-state lending context",
  "Residential + commercial experience",
  "Education-first approach",
];

const relatedGuides = [
  {
    label: "Guide",
    title: "Seller concessions",
    href: "/learn/seller-concessions",
  },
  {
    label: "Explainer",
    title: "2-1 buydowns",
    href: "/learn/2-1-buydowns",
  },
  {
    label: "Framework",
    title: "Jumbo loans",
    href: "/learn/jumbo-loans",
  },
];

export default function BuyerReadinessPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] pb-24 text-white md:pb-0">
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
          eyebrow="Buyer Readiness"
          title="Before you search, know your number."
          lead="Most buyers start too late. Start with payment, cash, and timing."
          focusLabel="Start Here"
          focus="The payment matters more than the price."
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="#buyer-strategy"
              location="buyer_readiness_hero"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Start Your Buyer Strategy
            </TrackedAnchor>
          </div>
        </PageHero>

        <section
          className="section-flow section-matte relative border-y border-zinc-900/40"
          data-analytics-section="featured_video"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.86fr_1.14fr] md:items-center md:gap-16 md:px-10">
            <RevealGroup
              className="relative overflow-hidden border border-zinc-900/80 bg-[#050505] p-3 md:p-5"
              stagger={90}
            >
              <div className="reveal-item relative aspect-[9/11] overflow-hidden bg-[#080808] md:aspect-[9/10]">
                {buyerReadinessVideo?.embedUrl ? (
                  <iframe
                    src={buyerReadinessVideo.embedUrl}
                    title={`${buyerReadinessVideo.title} TikTok embed`}
                    className="absolute inset-0 h-full w-full border-0"
                    allow="encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                  />
                ) : (
                  <div className="relative flex h-full flex-col justify-between p-6">
                    <div
                      className="playbook-grid pointer-events-none absolute inset-0 opacity-25"
                      aria-hidden
                    />
                    <p className="relative font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                      TikTok
                    </p>
                    <p className="relative font-mono text-[10px] tracking-[0.22em] text-zinc-600 uppercase">
                      Embed pending
                    </p>
                  </div>
                )}
              </div>
            </RevealGroup>

            <RevealGroup className="flex flex-col justify-center" stagger={110}>
              <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                Watch First
              </p>
              <h2 className="reveal-item mt-5 text-4xl font-semibold tracking-[-0.03em] text-white md:mt-6 md:text-5xl">
                Know the first move.
              </h2>
              <p className="reveal-item mt-6 max-w-md text-lg leading-relaxed text-zinc-500">
                One idea before the search gets emotional.
              </p>
              {buyerReadinessVideo ? (
                <TrackedAnchor
                  href={buyerReadinessVideo.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  location="buyer_readiness_video"
                  label={buyerReadinessVideo.cta.label}
                  eventType="video"
                  className="btn-ghost reveal-item mt-8 inline-flex h-14 w-fit items-center justify-center border border-zinc-800 px-8 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
                >
                  Watch on TikTok
                </TrackedAnchor>
              ) : null}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Buyer Anxiety"
              title="What buyers usually get wrong."
              lead="The search feels different when the number is real."
            />
            <RevealGroup
              className="mt-14 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2 lg:grid-cols-5"
              stagger={70}
            >
              {buyerAnxiety.map((item, index) => (
                <article key={item} className="reveal-item bg-[#050505] p-7">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-white">
                    {item}
                  </h3>
                </article>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.8fr_1.2fr] md:gap-16 md:px-10">
            <SectionHeader
              eyebrow="Clarify"
              title="The number behind the search."
              lead="No rate quote. Just the inputs that shape the next move."
            />
            <RevealGroup
              className="grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 sm:grid-cols-2 lg:grid-cols-5"
              stagger={70}
            >
              {clarityItems.map((item) => (
                <div key={item} className="reveal-item bg-[#050505] p-6">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                    Clarify
                  </p>
                  <h3 className="mt-5 text-xl font-semibold tracking-[-0.02em] text-white">
                    {item}
                  </h3>
                </div>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="How It Works"
              title="Simple path. Clearer buyer."
            />
            <RevealGroup
              className="mt-12 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
              stagger={100}
            >
              {howItWorks.map((step) => (
                <article
                  key={step.label}
                  className="reveal-item bg-[#050505] p-7 md:p-8"
                >
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {step.label}
                  </p>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
                    {step.title}
                  </h3>
                  <p className="mt-5 leading-relaxed text-zinc-500">
                    {step.body}
                  </p>
                </article>
              ))}
            </RevealGroup>
            <RevealGroup
              className="mt-10 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
              stagger={80}
            >
              {trustSignals.map((signal) => (
                <div key={signal} className="reveal-item bg-[#050505] p-6">
                  <p className="font-mono text-[10px] tracking-[0.24em] text-[#7c3aed] uppercase">
                    Trust
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                    {signal}
                  </p>
                </div>
              ))}
            </RevealGroup>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section
          id="buyer-strategy"
          className="section-flow section-matte relative border-y border-zinc-900/40"
          data-analytics-section="lead_capture"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
            <div className="cta-panel group relative overflow-hidden border border-zinc-900/80 bg-[#0a0a0a] px-8 py-16 md:px-16 md:py-20">
              <div
                className="playbook-grid pointer-events-none absolute inset-0 opacity-30"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#5b21b6]/12 via-transparent to-transparent"
                aria-hidden
              />
              <RevealGroup className="relative" stagger={110}>
                <p className="reveal-item font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
                  Start Your Buyer Strategy
                </p>
                <h2 className="reveal-item mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white md:text-6xl">
                  Know your number before the search.
                </h2>
                <p className="reveal-item mt-8 max-w-xl text-lg leading-relaxed text-zinc-400">
                  Send the basics. We&apos;ll help you frame payment, cash, options,
                  and timing.
                </p>
                <LeadCaptureForm
                  formType="Buyer Strategy Call"
                  submitLabel="Start Your Buyer Strategy"
                  intent="buyer"
                />
                <SchedulingLink
                  type="buyer"
                  className="btn-ghost reveal-item mt-5 inline-flex h-12 w-fit items-center justify-center border border-zinc-800 px-7 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
                />
                <p className="reveal-item mt-5 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                  Strategy-first · Education-first · No-pressure guidance
                </p>
              </RevealGroup>
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section
          className="section-flow relative"
          data-analytics-section="featured_guides"
        >
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Related Guides"
              title="Read next."
              lead="Go deeper before the offer."
            />
            <div className="mt-10">
              <ApplicationCta
                location="buyer_readiness_application"
                title="Ready for full pre-approval?"
                body="Start the secure application when you are ready for a full mortgage review."
                label="Continue With Full Pre-Approval"
              />
            </div>
            <RevealGroup
              className="mt-10 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
              stagger={100}
            >
              {relatedGuides.map((guide) => (
                <TrackedLink
                  key={guide.href}
                  href={guide.href}
                  location="buyer_readiness_related_guides"
                  label={guide.title}
                  eventType="related_guide"
                  className="reveal-item group bg-[#050505] p-7"
                >
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {guide.label}
                  </p>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.02em] text-white">
                    {guide.title}
                  </h3>
                  <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] group-hover:text-white">
                    Read Guide
                    <span className="text-[#7c3aed]" aria-hidden>
                      →
                    </span>
                  </span>
                </TrackedLink>
              ))}
            </RevealGroup>
            <div className="mt-10">
              <MicroOptIn
                title="Get buyer prep tips."
                body="Payment, cash-to-close, and offer prep notes."
                submitLabel="Get Tips"
                optInType="Buyer Prep Tips"
                intent="buyer"
                location="buyer_readiness_related_guides"
              />
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
      <StickyMobileCta
        href="#buyer-strategy"
        label="Start Strategy"
        eyebrow="Buyer Readiness"
        location="buyer_readiness_mobile_sticky"
      />
    </div>
  );
}
