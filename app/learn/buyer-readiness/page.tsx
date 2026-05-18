import type { Metadata } from "next";
import { FooterBrand } from "../../components/brand";
import { ComplianceFooter } from "../../components/compliance-footer";
import { FooterSocialLinks } from "../../components/footer-social-links";
import { LeadCaptureForm } from "../../components/lead-capture-form";
import { PageHero, SectionHeader } from "../../components/design-system";
import { PageAmbient } from "../../components/page-ambient";
import { RevealGroup } from "../../components/reveal-group";
import { SchedulingLink } from "../../components/scheduling-cta";
import { SiteNav } from "../../components/site-nav";
import { TrackedAnchor, TrackedLink } from "../../components/tracked-link";
import { getSocialPostBySlug } from "../../lib/social-posts";

export const metadata: Metadata = {
  title: "Buyer Readiness | The Loan Playbook",
  description:
    "A concise buyer readiness landing page for understanding payment, cash to close, offer strategy, loan options, and timeline before the home search.",
  openGraph: {
    title: "Before you search, know your number.",
    description:
      "Understand the numbers and next steps before the home search gets serious.",
    type: "article",
  },
};

const buyerReadinessVideo = getSocialPostBySlug("buyer-readiness-before-search");

const buyerMistakes = [
  {
    label: "01",
    title: "Shopping before knowing payment",
    body: "A price range is not the same as a monthly number.",
  },
  {
    label: "02",
    title: "Underestimating cash to close",
    body: "Down payment, costs, credits, and reserves all matter.",
  },
  {
    label: "03",
    title: "Waiting too long to prepare",
    body: "The best file is built before the offer.",
  },
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
    body: "Tell us where you are trying to buy and when.",
  },
  {
    label: "Step 02",
    title: "Review the numbers",
    body: "Clarify payment, cash, and loan fit.",
  },
  {
    label: "Step 03",
    title: "Build the next move",
    body: "Leave with a cleaner buyer path.",
  },
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

      <SiteNav />

      <main className="relative z-10">
        <PageHero
          eyebrow="Buyer Readiness"
          title="Before you search, know your number."
          lead="A concise buyer path for payment, cash, offer strength, loan options, and timing."
          focusLabel="Start Here"
          focus="Know the number. Build the file. Shop with context."
        >
          <div className="reveal-item mt-12 flex flex-col gap-4 sm:flex-row">
            <TrackedAnchor
              href="#buyer-strategy"
              location="buyer_readiness_hero"
              className="btn-primary inline-flex h-14 items-center justify-center bg-white px-10 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
            >
              Start Your Buyer Strategy
            </TrackedAnchor>
            <SchedulingLink
              type="buyer"
              className="btn-ghost inline-flex h-14 items-center justify-center border border-zinc-800 px-10 text-sm font-medium tracking-wide text-zinc-300 hover:border-[#7c3aed]/50 hover:text-white"
            />
          </div>
        </PageHero>

        <section className="section-flow section-matte relative border-y border-zinc-900/40">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 md:grid-cols-[0.9fr_1.1fr] md:items-center md:gap-16 md:px-10">
            <RevealGroup
              className="relative overflow-hidden border border-zinc-900/80 bg-[#050505] p-4 md:p-6"
              stagger={90}
            >
              <div className="reveal-item relative aspect-[9/12] overflow-hidden bg-[#080808]">
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
                A short clip. A clearer start.
              </h2>
              <p className="reveal-item mt-6 max-w-xl text-lg leading-relaxed text-zinc-500">
                Start with the idea, then use this page to organize the next
                conversation.
              </p>
              {buyerReadinessVideo ? (
                <TrackedAnchor
                  href={buyerReadinessVideo.postUrl}
                  target="_blank"
                  rel="noreferrer"
                  location="buyer_readiness_video"
                  label={buyerReadinessVideo.cta.label}
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
              eyebrow="Common Mistakes"
              title="What slows buyers down."
              lead="The search gets easier when the numbers are understood first."
            />
            <RevealGroup
              className="mt-14 grid gap-px overflow-hidden border border-zinc-900/80 bg-zinc-900/70 md:grid-cols-3"
              stagger={110}
            >
              {buyerMistakes.map((mistake) => (
                <article key={mistake.label} className="reveal-item bg-[#050505] p-8">
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {mistake.label}
                  </p>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
                    {mistake.title}
                  </h3>
                  <p className="mt-5 leading-relaxed text-zinc-500">
                    {mistake.body}
                  </p>
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
              eyebrow="What We Clarify"
              title="The five numbers and moves that matter."
              lead="No rate quotes here. Just the buyer context you need before shopping."
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
              title="Simple, visual, direct."
              lead="A short path from early questions to a cleaner buying plan."
            />
            <RevealGroup
              className="mt-14 grid gap-7 md:grid-cols-3 md:gap-8"
              stagger={100}
            >
              {howItWorks.map((step) => (
                <article
                  key={step.label}
                  className="reveal-item card-lift border border-zinc-900/80 bg-[#050505] p-8"
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
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section id="buyer-strategy" className="section-flow section-matte relative border-y border-zinc-900/40">
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
                  Send the basics. We&apos;ll follow up about readiness, payment,
                  cash to close, loan options, and timeline.
                </p>
                <LeadCaptureForm
                  formType="Buyer Strategy Call"
                  submitLabel="Start Your Buyer Strategy"
                />
                <p className="reveal-item mt-5 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
                  Educational content only · No rate quote or loan commitment
                </p>
              </RevealGroup>
            </div>
          </div>
          <div className="section-bridge-bottom" aria-hidden />
        </section>

        <section className="section-flow relative">
          <div className="section-bridge-top" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-6 md:px-10">
            <SectionHeader
              eyebrow="Related Guides"
              title="Go deeper before you write the offer."
              lead="Three guides that make the buyer conversation sharper."
            />
            <RevealGroup
              className="mt-14 grid gap-7 md:grid-cols-3 md:gap-8"
              stagger={100}
            >
              {relatedGuides.map((guide) => (
                <TrackedLink
                  key={guide.href}
                  href={guide.href}
                  location="buyer_readiness_related_guides"
                  label={guide.title}
                  className="reveal-item card-lift group border border-zinc-900/80 bg-[#050505] p-8"
                >
                  <p className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
                    {guide.label}
                  </p>
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-white">
                    {guide.title}
                  </h3>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-300 transition-colors duration-[var(--duration-hover)] group-hover:text-white">
                    Read Guide
                    <span className="text-[#7c3aed]" aria-hidden>
                      →
                    </span>
                  </span>
                </TrackedLink>
              ))}
            </RevealGroup>
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
