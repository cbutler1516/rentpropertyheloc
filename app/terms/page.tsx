import type { Metadata } from "next";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { SiteNav } from "../components/site-nav";
import { complianceDisclosures } from "../lib/licensing";
import { buildPageMetadata } from "../lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Terms of Use",
  description:
    "Terms of use for The Loan Playbook educational website and content.",
  path: "/terms",
});

export default function TermsPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      <SiteNav />
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <p className="font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
          Terms
        </p>
        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          Terms of use
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-400 md:text-base">
          <p>{complianceDisclosures.consumerEducation}</p>
          <p>{complianceDisclosures.noCommitment}</p>
          <p>{complianceDisclosures.socialMedia}</p>
          <p>
            Content may change without notice. Do not rely on this site as the sole
            basis for a financing decision—confirm terms with a licensed loan officer.
          </p>
        </div>
      </main>
      <footer className="border-t border-zinc-900/60 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 font-mono text-[10px] tracking-widest text-zinc-600 uppercase md:flex-row md:items-center md:justify-between md:px-10">
          <FooterBrand />
          <span>© {new Date().getFullYear()} The Loan Playbook</span>
        </div>
        <ComplianceFooter />
      </footer>
    </div>
  );
}
