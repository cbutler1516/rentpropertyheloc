"use client";

import { DealAnalyzerShell } from "@/components/deal-analyzer/deal-analyzer-shell";
import {
  LeadGateForm,
  type LeadFormState,
} from "@/components/deal-analyzer/lead-gate-form";
import { LocalTestBanner } from "@/components/deal-analyzer/local-test-banner";
import {
  clearDealAnalyzerSession,
  getDealAnalyzerSession,
  getOrCreateSessionId,
  saveLocalReport,
} from "@/lib/deal-analyzer/session";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { DealAnalyzerSession } from "@/lib/deal-analyzer/types";

const initialLead: LeadFormState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  notes: "",
  smsCallConsent: false,
};

export function LeadPageContent() {
  const router = useRouter();
  const [session, setSession] = useState<DealAnalyzerSession | null>(null);
  const [lead, setLead] = useState<LeadFormState>(initialLead);
  const [error, setError] = useState<string>();
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const data = getDealAnalyzerSession();
    if (!data) {
      router.replace("/deal-analyzer/analyze");
      return;
    }
    setSession(data);
  }, [router]);

  async function handleSubmit() {
    if (!session) return;
    setError(undefined);
    setSubmitting(true);

    try {
      const params = new URLSearchParams(window.location.search);
      const body = {
        name: lead.name,
        email: lead.email,
        phone: lead.phone || undefined,
        role: lead.role || undefined,
        notes: lead.notes || undefined,
        smsCallConsent: lead.smsCallConsent,
        dealType: session.dealType,
        inputs: session.inputs,
        analysis: session.analysis,
        sessionId: getOrCreateSessionId(),
        utmSource: params.get("utm_source") ?? undefined,
        utmMedium: params.get("utm_medium") ?? undefined,
        utmCampaign: params.get("utm_campaign") ?? undefined,
        utmTerm: params.get("utm_term") ?? undefined,
        utmContent: params.get("utm_content") ?? undefined,
      };

      const res = await fetch("/api/deal-analyzer/reports", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const json = (await res.json()) as {
        success?: boolean;
        error?: string;
        reportSlug?: string;
        localOnly?: boolean;
        report?: unknown;
      };

      if (!res.ok || !json.success || !json.reportSlug) {
        setError(json.error ?? "Unable to generate report. Please try again.");
        setSubmitting(false);
        return;
      }

      if (json.localOnly && json.report) {
        saveLocalReport(json.report as import("@/lib/deal-analyzer/types").FullDealAnalyzerReport);
      }

      clearDealAnalyzerSession();
      router.push(`/deal-analyzer/report/${json.reportSlug}`);
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  if (!session) {
    return (
      <DealAnalyzerShell step={3} title="Loading…">
        <p className="text-sm text-slate-500">Loading…</p>
      </DealAnalyzerShell>
    );
  }

  return (
    <DealAnalyzerShell
      step={3}
      title="Unlock your full Playbook Report"
      subtitle="Share contact info and consent so we can generate your shareable report."
    >
      <LocalTestBanner />
      <LeadGateForm
        values={lead}
        onChange={(patch) => setLead((prev) => ({ ...prev, ...patch }))}
        error={error}
        submitting={submitting}
        onSubmit={handleSubmit}
      />
    </DealAnalyzerShell>
  );
}
