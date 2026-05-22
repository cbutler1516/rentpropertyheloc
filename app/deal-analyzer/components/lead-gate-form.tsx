"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import {
  trackDealAnalyzerEvent,
  trackDealAnalyzerEventOnce,
} from "../lib/analytics/track-client";
import { SMS_CALL_CONSENT_TEXT } from "../lib/consent";
import type { ClientRole, LeadCapture } from "../lib/types";
import { useDealAnalyzer } from "./deal-analyzer-provider";
import {
  useDealAnalyzerBasePath,
  usePartnerAgent,
} from "./partner-agent-provider";

const roles: ClientRole[] = [
  "Buyer",
  "Agent",
  "Investor",
  "Commercial Client",
];

const referralOptions = [
  "",
  "Agent referral",
  "Client referral",
  "Social media",
  "Google search",
  "The Loan Playbook site",
  "Other",
];

export function LeadGateForm() {
  const router = useRouter();
  const { submitLead, analysis } = useDealAnalyzer();
  const partner = usePartnerAgent();
  const basePath = useDealAnalyzerBasePath();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [consentChecked, setConsentChecked] = useState(false);
  const [form, setForm] = useState<Omit<LeadCapture, "smsCallConsent">>({
    name: "",
    email: "",
    phone: "",
    role: "Buyer",
    notes: "",
    referralSource: "",
    agentName: "",
  });

  useEffect(() => {
    trackDealAnalyzerEventOnce("lead_form_viewed", {
      eventName: "lead_form_viewed",
      dealType: analysis?.path,
      agentId: partner?.agent?.id,
      referralCode: partner?.agent?.referralCode,
    });
  }, [analysis?.path, partner?.agent?.id, partner?.agent?.referralCode]);

  useEffect(() => {
    if (!partner?.agent) return;
    setForm((prev) => ({
      ...prev,
      role: "Buyer",
      agentName: partner.agent.name,
      referralSource: "Agent referral",
    }));
  }, [partner?.agent]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!consentChecked) {
      setError("Please check the consent box to continue.");
      return;
    }

    setSubmitting(true);

    const result = await submitLead({
      ...form,
      smsCallConsent: true,
    });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error);
      return;
    }

    if (result.source === "local") {
      void trackDealAnalyzerEvent({
        eventName: "lead_submitted",
        dealType: analysis?.path,
        agentId: partner?.agent?.id,
        referralCode: partner?.agent?.referralCode,
      });
      void trackDealAnalyzerEvent({
        eventName: "report_generated",
        dealType: analysis?.path,
        metadata: { source: "local" },
      });
    }

    router.push(`/deal-analyzer/report/${result.slug}`);
  }

  if (!analysis) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Complete your deal details first</CardTitle>
          <CardDescription>
            Run the analyzer with your scenario before unlocking the report.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="gold"
            onClick={() => router.push(`${basePath}/analyze`)}
          >
            Back to analyzer
          </Button>
        </CardContent>
      </Card>
    );
  }

  const showAgentName = form.role === "Agent" && !partner?.agent;
  const partnerLocked = Boolean(partner?.agent);

  return (
    <Card className="border-[#c9a227]/20">
      <CardHeader>
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
          Step 3 — Unlock your full report
        </p>
        <CardTitle>Almost there</CardTitle>
        <CardDescription>
          Share contact details to unlock payment numbers, charts, Coach&apos;s
          Notes, and your private shareable Playbook link.
        </CardDescription>
        {partner?.agent ? (
          <p className="mt-3 rounded-xl border border-[#7c3aed]/25 bg-[#7c3aed]/10 px-4 py-3 text-sm text-zinc-300">
            Referred by{" "}
            <span className="font-medium text-white">{partner.agent.name}</span>
            {partner.agent.company ? (
              <span className="text-zinc-500"> · {partner.agent.company}</span>
            ) : null}
            . Chris Butler at Broadview Lending will prepare your financing
            strategy.
          </p>
        ) : null}
      </CardHeader>
      <CardContent>
        {error ? (
          <p
            className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300"
            role="alert"
          >
            {error}
          </p>
        ) : null}
        <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="lead-name">Name</Label>
            <Input
              id="lead-name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-email">Email</Label>
            <Input
              id="lead-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lead-phone">Phone</Label>
            <Input
              id="lead-phone"
              type="tel"
              required
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="lead-role">I am a</Label>
            <Select
              id="lead-role"
              value={form.role}
              disabled={partnerLocked}
              onChange={(e) =>
                setForm({ ...form, role: e.target.value as ClientRole })
              }
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </Select>
          </div>
          {showAgentName ? (
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="lead-agent">Your name (agent)</Label>
              <Input
                id="lead-agent"
                placeholder="Shown on reports you share with clients"
                value={form.agentName ?? ""}
                onChange={(e) =>
                  setForm({ ...form, agentName: e.target.value })
                }
              />
            </div>
          ) : null}
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="lead-referral">How did you hear about us?</Label>
            <Select
              id="lead-referral"
              value={form.referralSource ?? ""}
              disabled={partnerLocked}
              onChange={(e) =>
                setForm({ ...form, referralSource: e.target.value })
              }
            >
              {referralOptions.map((opt) => (
                <option key={opt || "none"} value={opt}>
                  {opt || "Select…"}
                </option>
              ))}
            </Select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="lead-notes">Notes (optional)</Label>
            <Textarea
              id="lead-notes"
              placeholder="Timeline, property type, or what you want to stress-test..."
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
          </div>

          <div className="md:col-span-2">
            <label className="flex cursor-pointer gap-3 rounded-xl border border-white/[0.08] bg-zinc-950/50 p-4">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 shrink-0 rounded border-zinc-600 bg-zinc-950 text-[#c9a227] focus:ring-[#7c3aed]/40"
                checked={consentChecked}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setConsentChecked(checked);
                  if (checked) {
                    void trackDealAnalyzerEvent({
                      eventName: "consent_checked",
                      dealType: analysis?.path,
                    });
                  }
                }}
                required
                aria-describedby="consent-description"
              />
              <span id="consent-description" className="text-xs leading-relaxed text-zinc-400">
                {SMS_CALL_CONSENT_TEXT}
              </span>
            </label>
          </div>

          <div className="flex flex-col gap-3 md:col-span-2 sm:flex-row sm:items-center">
            <Button
              type="submit"
              variant="gold"
              size="lg"
              className="w-full sm:w-auto"
              disabled={submitting || !consentChecked}
            >
              {submitting
                ? "Building your Playbook Report…"
                : "Unlock My Full Playbook"}
            </Button>
            <button
              type="button"
              className="font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase hover:text-zinc-300"
              onClick={() => router.push(`${basePath}/analyze?step=preview`)}
            >
              ← Back to preview
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
