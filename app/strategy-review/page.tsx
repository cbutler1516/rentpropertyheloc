import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { FooterSocialLinks } from "../components/footer-social-links";
import { JsonLd } from "../components/json-ld";
import { PageAmbient } from "../components/page-ambient";
import { SiteNav } from "../components/site-nav";
import { StickyMobileCta } from "../components/sticky-mobile-cta";
import { StrategyIntakeFunnel } from "../components/strategy-intake-funnel";
import { breadcrumbSchema, webSiteSchema } from "../lib/structured-data";
import { buildPageMetadata } from "../lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Review Your Options",
  description:
    "Tell us what you are trying to accomplish. A short, structured intake for buyers, homeowners, investors, builders, and agent partners.",
  path: "/strategy-review",
});

export default function StrategyReviewPage() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] pb-20 text-white md:pb-0">
      <JsonLd
        data={[
          webSiteSchema(),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Review Your Options", path: "/strategy-review" },
          ]),
        ]}
      />
      <PageAmbient enableParallax={false} />
      <div
        className="playbook-grid pointer-events-none fixed inset-0 z-0 opacity-30"
        aria-hidden
      />
      <SiteNav />

      <main className="relative z-10">
        <section
          className="relative mx-auto w-full max-w-3xl px-6 pb-16 pt-12 md:px-10 md:pb-24 md:pt-20"
          data-analytics-section="strategy_intake_hero"
        >
          <p className="font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
            Strategy intake
          </p>
          <h1 className="mt-5 text-[clamp(2rem,5vw,3.25rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
            Review your options.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-zinc-400 md:text-lg">
            A few quick questions so we can respond with useful context—not a
            rate quote. Most people finish in under two minutes.
          </p>
          <div className="mt-10">
            <StrategyIntakeFunnel />
          </div>
          <p className="mt-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase">
            Not a loan application · Broadview Lending / Barrett Financial Group
          </p>
        </section>
      </main>

      <StickyMobileCta
        href="#strategy-intake"
        label="Review Options"
        location="strategy_review_sticky"
      />

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
