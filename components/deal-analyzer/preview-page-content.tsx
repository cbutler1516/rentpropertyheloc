"use client";

import { DealAnalyzerShell } from "@/components/deal-analyzer/deal-analyzer-shell";
import { LockedPreviewReport } from "@/components/deal-analyzer/locked-preview-report";
import { getDealAnalyzerSession } from "@/lib/deal-analyzer/session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { DealAnalyzerSession } from "@/lib/deal-analyzer/types";

export function PreviewPageContent() {
  const router = useRouter();
  const [session, setSession] = useState<DealAnalyzerSession | null>(null);

  useEffect(() => {
    const data = getDealAnalyzerSession();
    if (!data) {
      router.replace("/deal-analyzer/analyze");
      return;
    }
    setSession(data);
  }, [router]);

  if (!session) {
    return (
      <DealAnalyzerShell step={2} title="Loading preview…">
        <p className="text-sm text-slate-500">Loading your scenario…</p>
      </DealAnalyzerShell>
    );
  }

  return (
    <DealAnalyzerShell
      step={2}
      title="Preview your Playbook Report"
      subtitle="Key metrics are blurred until you complete the lead step with consent."
    >
      <LockedPreviewReport analysis={session.analysis} />
    </DealAnalyzerShell>
  );
}
