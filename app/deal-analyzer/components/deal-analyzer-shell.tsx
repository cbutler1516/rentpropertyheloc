import Link from "next/link";
import type { ReactNode } from "react";
import { WordmarkLockup } from "@/app/components/brand";
import { DEAL_ANALYZER_DISCLAIMER } from "../lib/constants";

type DealAnalyzerShellProps = {
  children: ReactNode;
  eyebrow?: string;
};

export function DealAnalyzerShell({
  children,
  eyebrow = "Deal Analyzer",
}: DealAnalyzerShellProps) {
  return (
    <div className="deal-analyzer-shell relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div
        className="pointer-events-none absolute inset-0 playbook-grid playbook-grid-animated opacity-40"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full bg-[#7c3aed]/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#c9a227]/10 blur-3xl"
        aria-hidden
      />

      <header className="deal-analyzer-chrome relative z-10 border-b border-white/[0.06] bg-[#030712]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-5 md:px-10">
          <Link
            href="/deal-analyzer"
            className="nav-brand"
            aria-label="Deal Analyzer home"
          >
            <WordmarkLockup />
          </Link>
          <div className="hidden items-center gap-6 md:flex">
            <span className="font-mono text-[9px] tracking-[0.24em] text-[#c9a227] uppercase">
              {eyebrow}
            </span>
            <Link
              href="/"
              className="font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase transition-colors hover:text-zinc-300"
            >
              Main site
            </Link>
          </div>
        </div>
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-6 py-10 md:px-10 md:py-14">
        {children}
      </main>

      <footer className="deal-analyzer-chrome relative z-10 border-t border-white/[0.06] px-6 py-8 md:px-10">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-zinc-500">
          {DEAL_ANALYZER_DISCLAIMER}
        </p>
      </footer>
    </div>
  );
}
