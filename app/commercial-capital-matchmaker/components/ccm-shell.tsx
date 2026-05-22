import Link from "next/link";
import type { ReactNode } from "react";
import { WordmarkLockup } from "@/app/components/brand";

const CCM_DISCLAIMER =
  "Broadview Lending · Commercial Capital Matchmaker provides preliminary strategy guidance—not a loan commitment, approval, or offer. Confirm paths and terms with Chris Butler before lender outreach.";

type CcmShellProps = {
  children: ReactNode;
  eyebrow?: string;
};

export function CcmShell({
  children,
  eyebrow = "Commercial Capital Matchmaker",
}: CcmShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050505] text-white">
      <div
        className="playbook-grid playbook-grid-animated pointer-events-none fixed inset-0 z-0 opacity-35"
        aria-hidden
      />
      <div
        className="vignette pointer-events-none fixed inset-0 z-[1]"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed -top-24 right-0 z-[1] h-80 w-80 rounded-full bg-[#7c3aed]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none fixed bottom-0 left-0 z-[1] h-64 w-64 rounded-full bg-[#c9a227]/10 blur-3xl"
        aria-hidden
      />

      <header className="nav-glass relative z-10 border-b border-white/[0.06]">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 md:px-10">
          <Link
            href="/commercial-capital-matchmaker"
            className="nav-brand"
            aria-label="Commercial Capital Matchmaker home"
          >
            <WordmarkLockup />
          </Link>
          <nav
            className="hidden items-center gap-5 font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase md:flex"
            aria-label="Matchmaker navigation"
          >
            <span className="text-[#c9a227]">{eyebrow}</span>
            <Link href="/commercial-capital-matchmaker/sample" className="hover:text-zinc-300">
              Sample
            </Link>
            <Link
              href="/commercial-capital-matchmaker/strategy-review"
              className="hover:text-zinc-300"
            >
              Review
            </Link>
            <Link href="/commercial-capital-matchmaker/intake" className="hover:text-zinc-300">
              Intake
            </Link>
            <Link href="/commercial-capital-matchmaker/results" className="hover:text-zinc-300">
              Strategy
            </Link>
            <Link href="/commercial-capital-matchmaker/summary" className="hover:text-zinc-300">
              Memo
            </Link>
            <Link href="/commercial-capital-matchmaker/admin" className="hover:text-zinc-300">
              Leads
            </Link>
            <Link href="/" className="hover:text-zinc-300">
              Main site
            </Link>
          </nav>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-20">
        {children}
      </main>

      <footer className="relative z-10 border-t border-white/[0.06] px-6 py-8 md:px-10">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-zinc-500">
          {CCM_DISCLAIMER}
        </p>
      </footer>
    </div>
  );
}
