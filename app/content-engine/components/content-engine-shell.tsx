import Link from "next/link";
import type { ReactNode } from "react";
import { WordmarkLockup } from "@/app/components/brand";

type ContentEngineShellProps = {
  children: ReactNode;
  sidebar: ReactNode;
};

export function ContentEngineShell({
  children,
  sidebar,
}: ContentEngineShellProps) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#0a1628] text-white">
      <div
        className="pointer-events-none absolute inset-0 playbook-grid opacity-[0.18]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[28rem] w-[28rem] rounded-full bg-[#7c3aed]/15 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-[#c9a227]/10 blur-3xl"
        aria-hidden
      />

      <aside className="relative z-20 hidden w-72 shrink-0 flex-col border-r border-white/[0.06] bg-[#07111f]/90 backdrop-blur-xl lg:flex">
        <div className="border-b border-white/[0.06] px-5 py-5">
          <Link
            href="/content-engine"
            className="nav-brand"
            aria-label="Content Engine home"
          >
            <WordmarkLockup />
          </Link>
          <p className="mt-3 font-mono text-[9px] tracking-[0.22em] text-[#c9a227] uppercase">
            AI Content Engine
          </p>
        </div>
        {sidebar}
        <div className="mt-auto border-t border-white/[0.06] px-5 py-4">
          <Link
            href="/"
            className="font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase transition-colors hover:text-zinc-300"
          >
            ← Main site
          </Link>
        </div>
      </aside>

      <div className="relative z-10 flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-white/[0.06] bg-[#07111f]/70 px-5 py-4 backdrop-blur-xl lg:px-8">
          <div className="lg:hidden">
            <Link href="/content-engine" className="nav-brand">
              <WordmarkLockup />
            </Link>
          </div>
          <div className="min-w-0 flex-1">
            <h1 className="text-lg font-medium tracking-tight text-white md:text-xl">
              Content Studio
            </h1>
            <p className="text-xs text-zinc-500">
              Paste once. Ship everywhere. Playbook-grade mortgage content.
            </p>
          </div>
          <span className="hidden shrink-0 rounded-full border border-[#7c3aed]/30 bg-[#7c3aed]/10 px-3 py-1 font-mono text-[9px] tracking-[0.2em] text-[#c4b5fd] uppercase sm:inline-flex">
            Strategy Mode
          </span>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
