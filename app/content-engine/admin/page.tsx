import type { Metadata } from "next";
import Link from "next/link";
import { WordmarkLockup } from "@/app/components/brand";
import { QaAdminDashboard } from "./components/qa-admin-dashboard";

export const metadata: Metadata = {
  title: "Content Engine QA Admin | The Loan Playbook",
  description: "Production readiness and end-to-end QA for the AI Content Engine.",
  robots: { index: false, follow: false },
};

export default function ContentEngineAdminPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030712] text-white">
      <div
        className="pointer-events-none absolute inset-0 playbook-grid opacity-[0.12]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[24rem] w-[24rem] rounded-full bg-red-500/10 blur-3xl"
        aria-hidden
      />

      <header className="relative z-10 border-b border-white/[0.06] bg-[#030712]/90 px-5 py-4 backdrop-blur-xl lg:px-8">
        <Link href="/content-engine" className="nav-brand inline-flex" aria-label="Content Engine">
          <WordmarkLockup />
        </Link>
      </header>

      <main className="relative z-10 mx-auto max-w-5xl px-5 py-8 lg:px-8 lg:py-10">
        <QaAdminDashboard />
      </main>
    </div>
  );
}
