"use client";

import { useCallback, useEffect, useState } from "react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Select } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { CopyButton } from "@/app/content-engine/components/copy-button";
import { LEAD_STATUSES, type LeadStatus } from "@/app/deal-analyzer/lib/follow-up-types";
import type { DealAnalyzerReportRow } from "@/app/deal-analyzer/lib/admin/types";
type FollowUpFormState = {
  textMessage: string;
  emailSubject: string;
  emailBody: string;
  agentPartnerMessage: string;
  callNotesText: string;
  priorityReason: string;
  recommendedTiming: string;
  leadStatus: LeadStatus;
  nextFollowUpAt: string;
};

type AdminFollowUpDrawerProps = {
  row: DealAnalyzerReportRow | null;
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
};

function toDatetimeLocal(iso: string | null): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromDatetimeLocal(value: string): string | null {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function FollowUpField({
  label,
  value,
  onChange,
  multiline = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <Label>{label}</Label>
        <CopyButton text={value} label="Copy" />
      </div>
      {multiline ? (
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={multiline === true ? 5 : 3}
          className="min-h-[100px] font-mono text-xs leading-relaxed"
        />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

export function AdminFollowUpDrawer({
  row,
  open,
  onClose,
  onSaved,
}: AdminFollowUpDrawerProps) {
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [followUpId, setFollowUpId] = useState<string | null>(null);
  const [source, setSource] = useState<"ai" | "static" | null>(null);
  const [form, setForm] = useState<FollowUpFormState>({
    textMessage: "",
    emailSubject: "",
    emailBody: "",
    agentPartnerMessage: "",
    callNotesText: "",
    priorityReason: "",
    recommendedTiming: "",
    leadStatus: "New",
    nextFollowUpAt: "",
  });

  const loadFollowUp = useCallback(async (reportId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/deal-analyzer/admin/follow-ups?reportId=${encodeURIComponent(reportId)}`,
        { credentials: "include" },
      );
      const data = (await res.json()) as {
        followUp?: {
          id: string;
          textMessage: string;
          emailSubject: string;
          emailBody: string;
          agentPartnerMessage: string;
          callNotes: string[];
          priorityReason: string;
          recommendedTiming: string;
          nextFollowUpAt: string | null;
        } | null;
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Could not load follow-up.");
        return;
      }

      if (data.followUp) {
        setFollowUpId(data.followUp.id);
        setForm((prev) => ({
          ...prev,
          textMessage: data.followUp!.textMessage,
          emailSubject: data.followUp!.emailSubject,
          emailBody: data.followUp!.emailBody,
          agentPartnerMessage: data.followUp!.agentPartnerMessage,
          callNotesText: data.followUp!.callNotes.join("\n"),
          priorityReason: data.followUp!.priorityReason,
          recommendedTiming: data.followUp!.recommendedTiming,
          nextFollowUpAt: toDatetimeLocal(data.followUp!.nextFollowUpAt),
        }));
      } else {
        setFollowUpId(null);
      }
    } catch {
      setError("Could not load follow-up.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!open || !row) return;
    setFollowUpId(row.followUpId);
    setSource(null);
    setForm({
      textMessage: "",
      emailSubject: "",
      emailBody: "",
      agentPartnerMessage: "",
      callNotesText: "",
      priorityReason: "",
      recommendedTiming: "",
      leadStatus: row.leadStatus,
      nextFollowUpAt: toDatetimeLocal(row.nextFollowUpAt),
    });
    void loadFollowUp(row.id);
  }, [open, row, loadFollowUp]);

  async function handleGenerate() {
    if (!row) return;
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch("/api/deal-analyzer/admin/generate-follow-up", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId: row.id }),
      });
      const data = (await res.json()) as {
        followUp?: {
          id: string;
          textMessage: string;
          emailSubject: string;
          emailBody: string;
          agentPartnerMessage: string;
          callNotes: string[];
          priorityReason: string;
          recommendedTiming: string;
          nextFollowUpAt: string | null;
        };
        source?: "ai" | "static";
        error?: string;
      };

      if (!res.ok) {
        setError(data.error ?? "Generation failed.");
        return;
      }

      if (data.followUp) {
        setFollowUpId(data.followUp.id);
        setSource(data.source ?? "static");
        setForm((prev) => ({
          ...prev,
          textMessage: data.followUp!.textMessage,
          emailSubject: data.followUp!.emailSubject,
          emailBody: data.followUp!.emailBody,
          agentPartnerMessage: data.followUp!.agentPartnerMessage,
          callNotesText: data.followUp!.callNotes.join("\n"),
          priorityReason: data.followUp!.priorityReason,
          recommendedTiming: data.followUp!.recommendedTiming,
          nextFollowUpAt: toDatetimeLocal(data.followUp!.nextFollowUpAt),
          leadStatus: "Followed Up",
        }));
        onSaved();
      }
    } catch {
      setError("Generation failed.");
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave() {
    if (!row || !followUpId) {
      setError("Generate a follow-up first.");
      return;
    }

    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/deal-analyzer/admin/follow-ups/${followUpId}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          leadId: row.leadId,
          textMessage: form.textMessage,
          emailSubject: form.emailSubject,
          emailBody: form.emailBody,
          agentPartnerMessage: form.agentPartnerMessage,
          callNotes: form.callNotesText
            .split("\n")
            .map((l) => l.trim())
            .filter(Boolean),
          priorityReason: form.priorityReason,
          recommendedTiming: form.recommendedTiming,
          leadStatus: form.leadStatus,
          nextFollowUpAt: fromDatetimeLocal(form.nextFollowUpAt),
        }),
      });
      const data = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(data.error ?? "Save failed.");
        return;
      }

      onSaved();
      onClose();
    } catch {
      setError("Save failed.");
    } finally {
      setSaving(false);
    }
  }

  if (!open || !row) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        aria-label="Close follow-up drawer"
        onClick={onClose}
      />
      <aside
        className="relative flex h-full w-full max-w-lg flex-col border-l border-white/[0.08] bg-[#030712] shadow-2xl"
        role="dialog"
        aria-labelledby="follow-up-drawer-title"
      >
        <header className="border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#c9a227] uppercase">
                Follow-up workflow
              </p>
              <h2 id="follow-up-drawer-title" className="text-lg font-medium text-white">
                {row.leadName}
              </h2>
              <p className="text-xs text-zinc-500">
                {row.dealTypeLabel} · {row.slug}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase hover:text-zinc-300"
            >
              Close
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {row.needsFollowUp ? (
              <Badge variant="warning">Needs follow-up</Badge>
            ) : (
              <Badge variant="success">On track</Badge>
            )}
            <Badge variant="default">{row.leadStatus}</Badge>
            {source ? (
              <Badge variant="purple">{source === "ai" ? "AI draft" : "Template"}</Badge>
            ) : null}
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
          {error ? (
            <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          ) : null}

          {loading ? (
            <p className="text-sm text-zinc-500">Loading follow-up…</p>
          ) : (
            <>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label>Lead status</Label>
                  <Select
                    value={form.leadStatus}
                    onChange={(e) =>
                      setForm({ ...form, leadStatus: e.target.value as LeadStatus })
                    }
                  >
                    {LEAD_STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="next-follow-up">Next follow-up</Label>
                  <Input
                    id="next-follow-up"
                    type="datetime-local"
                    value={form.nextFollowUpAt}
                    onChange={(e) =>
                      setForm({ ...form, nextFollowUpAt: e.target.value })
                    }
                  />
                </div>
              </div>

              <FollowUpField
                label="Priority reason"
                value={form.priorityReason}
                onChange={(v) => setForm({ ...form, priorityReason: v })}
              />
              <FollowUpField
                label="Recommended timing"
                value={form.recommendedTiming}
                onChange={(v) => setForm({ ...form, recommendedTiming: v })}
              />
              <FollowUpField
                label="Text message"
                value={form.textMessage}
                onChange={(v) => setForm({ ...form, textMessage: v })}
                multiline
              />
              <FollowUpField
                label="Email subject"
                value={form.emailSubject}
                onChange={(v) => setForm({ ...form, emailSubject: v })}
              />
              <FollowUpField
                label="Email body"
                value={form.emailBody}
                onChange={(v) => setForm({ ...form, emailBody: v })}
                multiline
              />
              <FollowUpField
                label="Agent partner message"
                value={form.agentPartnerMessage}
                onChange={(v) => setForm({ ...form, agentPartnerMessage: v })}
                multiline
              />
              <FollowUpField
                label="Call notes (one per line)"
                value={form.callNotesText}
                onChange={(v) => setForm({ ...form, callNotesText: v })}
                multiline
              />
            </>
          )}
        </div>

        <footer className="border-t border-white/[0.06] px-5 py-4 flex flex-col gap-2 sm:flex-row">
          <Button
            type="button"
            variant="gold"
            className="flex-1"
            onClick={handleGenerate}
            disabled={generating || loading}
          >
            {generating ? "Generating…" : followUpId ? "Regenerate" : "Generate Follow-Up"}
          </Button>
          <Button
            type="button"
            variant="secondary"
            className="flex-1"
            onClick={handleSave}
            disabled={saving || !followUpId}
          >
            {saving ? "Saving…" : "Save workflow"}
          </Button>
        </footer>
      </aside>
    </div>
  );
}
