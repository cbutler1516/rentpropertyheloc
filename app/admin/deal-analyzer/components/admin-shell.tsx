import Link from "next/link";
import type { ReactNode } from "react";
import { WordmarkLockup } from "@/app/components/brand";

type AdminShellProps = {
  children: ReactNode;
  sidebar?: ReactNode;
  headerActions?: ReactNode;
};

export function AdminShell({
  children,
  sidebar,
  headerActions,
}: AdminShellProps) {
  return (
    <div className="deal-analyzer-shell relative flex min-h-screen overflow-hidden bg-[#030712] text-white">
      <div
        className="pointer-events-none absolute inset-0 playbook-grid playbook-grid-animated opacity-35"
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

      <aside className="relative z-20 hidden w-64 shrink-0 flex-col border-r border-white/[0.06] bg-[#030712]/90 backdrop-blur-xl lg:flex xl:w-72">
        <div className="border-b border-white/[0.06] px-5 py-5">
          <Link href="/deal-analyzer" className="nav-brand" aria-label="Deal Analyzer">
            <WordmarkLockup />
          </Link>
          <p className="mt-3 font-mono text-[9px] tracking-[0.22em] text-[#c9a227] uppercase">
            Internal · Leads
          </p>
        </div>
        {sidebar ? (
          <nav className="flex-1 overflow-y-auto px-4 py-4">{sidebar}</nav>
        ) : null}
        <div className="mt-auto space-y-2 border-t border-white/[0.06] px-5 py-4">
          <Link
            href="/admin/deal-analyzer/agents"
            className="block font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase transition-colors hover:text-zinc-300"
          >
            Partner agents →
          </Link>
          <Link
            href="/deal-analyzer"
            className="block font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase transition-colors hover:text-zinc-300"
          >
            Public Deal Analyzer →
          </Link>
          <Link
            href="/"
            className="block font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase transition-colors hover:text-zinc-400"
          >
            Main site
          </Link>
        </div>
      </aside>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] bg-[#030712]/80 px-5 py-4 backdrop-blur-xl lg:px-8">
          <div className="min-w-0">
            <div className="lg:hidden">
              <WordmarkLockup />
            </div>
            <h1 className="text-lg font-medium tracking-tight md:text-xl">
              Deal Analyzer Admin
            </h1>
            <p className="text-xs text-zinc-500">
              Leads, reports, and follow-up priorities for Chris
            </p>
          </div>
          {headerActions}
        </header>
        <main className="flex-1 overflow-auto px-5 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
