import { Suspense } from "react";
import { FooterBrand } from "@/app/components/brand";
import { ComplianceFooter } from "@/app/components/compliance-footer";
import { SiteNav } from "@/app/components/site-nav";
import { PageAmbient } from "@/app/components/page-ambient";
import { CampaignLeadForm } from "./campaign-lead-form";
import type { PublishedPageRecord } from "../lib/types";

type CampaignPublicViewProps = {
  page: PublishedPageRecord;
  previewMode?: boolean;
};

function SectionBlock({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  if (!body?.trim()) return null;
  return (
    <section className="border-t border-white/[0.06] py-12">
      <h2 className="font-mono text-[10px] tracking-[0.2em] text-[#c9a227] uppercase">
        {title}
      </h2>
      <div className="mt-4 whitespace-pre-wrap text-base leading-relaxed text-zinc-300">
        {body}
      </div>
    </section>
  );
}

export function CampaignPublicView({
  page,
  previewMode = false,
}: CampaignPublicViewProps) {
  const { sections } = page.landingPage;

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050505] pb-24 text-white">
      <PageAmbient enableParallax={false} />
      <SiteNav />

      {previewMode && (
        <div className="relative z-20 border-b border-amber-500/40 bg-amber-500/15 px-4 py-2 text-center text-sm text-amber-100">
          Preview mode — not published. Form submissions are disabled.
        </div>
      )}

      <main className="relative z-10 mx-auto max-w-3xl px-4 pt-12 pb-20 sm:px-6">
        <header className="pb-10">
          <p className="font-mono text-[10px] tracking-[0.22em] text-[#7c3aed] uppercase">
            {page.packageTitle}
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {sections.heroHeadline}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-400">
            {sections.heroSubheadline}
          </p>
          <a
            href="#campaign-lead-form"
            className="btn-primary mt-8 inline-flex h-12 items-center justify-center bg-white px-8 text-sm font-medium tracking-wide text-black hover:bg-zinc-100"
          >
            {sections.primaryCta.split("\n")[0] || "Get started"}
          </a>
        </header>

        <SectionBlock title="The problem" body={sections.problemSection} />
        <SectionBlock title="Why it matters now" body={sections.whyItMattersNow} />
        <SectionBlock title="Key benefits" body={sections.keyBenefits} />
        <SectionBlock title="Who this is for" body={sections.whoThisIsFor} />
        <SectionBlock title="FAQ" body={sections.faqSection} />

        <section
          id="campaign-lead-form"
          className="scroll-mt-24 border-t border-white/[0.06] py-12"
        >
          <Suspense fallback={<p className="text-zinc-500">Loading form…</p>}>
            <CampaignLeadForm
              slug={page.slug}
              leadCapture={page.leadCapture}
              landingPage={page.landingPage}
              previewMode={previewMode}
            />
          </Suspense>
        </section>

        <footer className="border-t border-white/[0.06] pt-8">
          <p className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-500">
            {sections.complianceDisclaimer}
          </p>
          <div className="mt-8">
            <ComplianceFooter />
            <FooterBrand className="mt-4" />
          </div>
        </footer>
      </main>
    </div>
  );
}
