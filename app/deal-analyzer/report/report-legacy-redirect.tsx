"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDealAnalyzer } from "../components/deal-analyzer-provider";

export function ReportLegacyRedirect() {
  const router = useRouter();
  const { hydrated, reportSlug, inputs, analysis, reportUnlocked } =
    useDealAnalyzer();

  useEffect(() => {
    if (!hydrated) return;

    if (reportSlug && reportUnlocked) {
      router.replace(`/deal-analyzer/report/${reportSlug}`);
      return;
    }

    if (analysis && inputs && !reportUnlocked) {
      router.replace("/deal-analyzer/analyze?step=preview");
      return;
    }

    router.replace("/deal-analyzer/analyze");
  }, [
    hydrated,
    reportSlug,
    inputs,
    analysis,
    reportUnlocked,
    router,
  ]);

  return (
    <p className="text-sm text-zinc-500">Redirecting to your Playbook Report…</p>
  );
}
