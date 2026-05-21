import type { Metadata } from "next";
import Link from "next/link";
import { FooterBrand } from "../components/brand";
import { ComplianceFooter } from "../components/compliance-footer";
import { SiteNav } from "../components/site-nav";
import { companyLicensing } from "../lib/licensing";
import { buildPageMetadata } from "../lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Privacy Policy",
  description:
    "How The Loan Playbook handles contact information submitted through educational forms and strategy intake.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="relative min-h-screen bg-[#050505] text-white">
      <SiteNav />
      <main className="relative z-10 mx-auto max-w-3xl px-6 py-16 md:px-10 md:py-24">
        <p className="font-mono text-xs tracking-[0.35em] text-[#7c3aed] uppercase">
          Privacy
        </p>
        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.03em] md:text-4xl">
          Privacy policy
        </h1>
        <div className="mt-8 space-y-6 text-sm leading-relaxed text-zinc-400 md:text-base">
          <p>
            The Loan Playbook provides educational mortgage strategy content. When
            you submit a form, we collect the information you provide (such as name,
            email, phone, and inquiry details) to respond to your request.
          </p>
          <p>
            We may contact you by phone, text, or email about your inquiry. Consent
            is not required as a condition of service. You may opt out of marketing
            texts by replying STOP.
          </p>
          <p>
            We do not sell your personal information. Information may be shared with
            {companyLicensing.lendingPartnerName} and licensed loan officers as needed
            to review your scenario. Data is handled consistent with applicable
            privacy laws and lender partner requirements.
          </p>
          <p>
            This site is for educational purposes. Submitting a form is not a loan
            application or commitment to lend.
          </p>
          <p>
            Questions: contact through{" "}
            <Link href="/strategy-review" className="text-zinc-300 hover:text-white">
              Review Options
            </Link>
            .
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
