"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CopyButton } from "@/app/content-engine/components/copy-button";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { AdminShell } from "@/app/admin/deal-analyzer/components/admin-shell";
import { createEditableMarketUpdate } from "@/app/lib/market-center/form-defaults";
import { normalizeDailyMarketUpdate } from "@/app/lib/market-center/normalize";
import {
  generateRealtorEmailPreview,
  generateSocialCaptionPreview,
} from "@/app/lib/market-center/previews";
import type {
  DailyMarketUpdate,
  MarketCenterStoreSnapshot,
  MarketPulseCardId,
  MarketTrend,
} from "@/app/lib/market-center/types";

const TREND_OPTIONS: MarketTrend[] = ["up", "down", "flat", "neutral"];

type MarketCenterAdminProps = {
  initialSnapshot: MarketCenterStoreSnapshot;
};

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      {children}
    </div>
  );
}

function formatSavedAt(iso: string | undefined) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function editionToForm(edition: DailyMarketUpdate): DailyMarketUpdate {
  return normalizeDailyMarketUpdate(edition);
}

export function MarketCenterAdmin({ initialSnapshot }: MarketCenterAdminProps) {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [form, setForm] = useState<DailyMarketUpdate>(() => {
    const source = initialSnapshot.draft ?? initialSnapshot.published;
    return source ? editionToForm(source) : createEditableMarketUpdate();
  });
  const [status, setStatus] = useState<"idle" | "saving" | "publishing">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const emailPreview = useMemo(() => generateRealtorEmailPreview(form), [form]);
  const socialPreview = useMemo(() => generateSocialCaptionPreview(form), [form]);

  const patch = useCallback(
    (partial: Partial<DailyMarketUpdate>) => {
      setForm((prev) => normalizeDailyMarketUpdate({ ...prev, ...partial }));
    },
    [],
  );

  const refreshSnapshot = useCallback(async () => {
    const res = await fetch("/api/admin/market-center", { credentials: "include" });
    if (res.status === 401) {
      router.refresh();
      return;
    }
    const json = (await res.json()) as MarketCenterStoreSnapshot;
    setSnapshot(json);
    return json;
  }, [router]);

  useEffect(() => {
    void refreshSnapshot();
  }, [refreshSnapshot]);

  async function saveDraft() {
    setStatus("saving");
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/market-center", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ update: form }),
      });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const json = (await res.json()) as MarketCenterStoreSnapshot & { error?: string };
      if (!res.ok) {
        setError(json.error ?? "Could not save draft.");
        return;
      }
      setSnapshot(json);
      if (json.draft) setForm(editionToForm(json.draft));
      setMessage("Draft saved.");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setStatus("idle");
    }
  }

  async function publishEdition() {
    setStatus("publishing");
    setError(null);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/market-center", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ update: form, publish: true }),
      });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const json = (await res.json()) as MarketCenterStoreSnapshot & { error?: string };
      if (!res.ok) {
        setError(json.error ?? "Could not publish.");
        return;
      }
      setSnapshot(json);
      setMessage("Published — /market now shows this edition.");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setStatus("idle");
    }
  }

  function loadDraftIntoForm() {
    if (snapshot.draft) {
      setForm(editionToForm(snapshot.draft));
      setMessage("Loaded draft into editor.");
    }
  }

  function loadPublishedIntoForm() {
    if (snapshot.published) {
      setForm(editionToForm(snapshot.published));
      setMessage("Loaded published edition into editor.");
    }
  }

  function updatePulse(
    id: MarketPulseCardId,
    field: keyof DailyMarketUpdate["pulse"][number],
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      pulse: prev.pulse.map((card) =>
        card.id === id ? { ...card, [field]: value } : card,
      ),
    }));
  }

  function updateSeattleMetric(
    index: number,
    field: "label" | "value" | "context",
    value: string,
  ) {
    setForm((prev) => ({
      ...prev,
      seattle: {
        ...prev.seattle,
        metrics: prev.seattle.metrics.map((metric, i) =>
          i === index ? { ...metric, [field]: value } : metric,
        ),
      },
    }));
  }

  const sidebar = (
    <ul className="space-y-1 text-sm text-zinc-400">
      <li>
        <Link
          href="/admin/deal-analyzer"
          className="block rounded-lg px-3 py-2 hover:bg-white/[0.04] hover:text-zinc-200"
        >
          Deal Analyzer
        </Link>
      </li>
      <li className="rounded-lg bg-[#7c3aed]/10 px-3 py-2 text-[#c4b5fd]">
        Market Center
      </li>
      <li>
        <Link
          href="/market"
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-lg px-3 py-2 hover:bg-white/[0.04] hover:text-zinc-200"
        >
          Preview /market →
        </Link>
      </li>
    </ul>
  );

  async function handleLogout() {
    await fetch("/api/deal-analyzer/admin/auth", { method: "DELETE" });
    router.refresh();
  }

  return (
    <AdminShell
      sidebar={sidebar}
      headerActions={
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/market"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-full px-4 font-mono text-[9px] tracking-[0.16em] text-zinc-400 uppercase transition-colors hover:bg-white/5 hover:text-white"
          >
            Preview /market
          </Link>
          <Button type="button" variant="ghost" size="sm" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      }
    >
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-white">
            Market Center Admin
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Edit the daily realtor briefing published on{" "}
            <Link href="/market" className="text-[#c4b5fd] hover:text-white">
              /market
            </Link>
            .
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-5 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Published
            </p>
            <p className="mt-1 text-sm text-zinc-200">
              {snapshot.published ? snapshot.published.title : "None"}
            </p>
            <p className="text-xs text-zinc-500">
              {formatSavedAt(snapshot.published?.savedAt)}
            </p>
          </div>
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Draft
            </p>
            <p className="mt-1 text-sm text-zinc-200">
              {snapshot.draft ? snapshot.draft.title : "None"}
            </p>
            <p className="text-xs text-zinc-500">
              {formatSavedAt(snapshot.draft?.savedAt)}
            </p>
          </div>
        </div>

        {message ? (
          <p className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-100">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
            {error}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            size="sm"
            disabled={status !== "idle"}
            onClick={() => void saveDraft()}
          >
            {status === "saving" ? "Saving…" : "Save draft"}
          </Button>
          <Button
            type="button"
            variant="default"
            size="sm"
            disabled={status !== "idle"}
            onClick={() => void publishEdition()}
          >
            {status === "publishing" ? "Publishing…" : "Publish edition"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={loadDraftIntoForm}>
            Load draft
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={loadPublishedIntoForm}>
            Load published
          </Button>
        </div>

        <form
          className="space-y-10"
          onSubmit={(event) => {
            event.preventDefault();
            void saveDraft();
          }}
        >
          <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6">
            <h3 className="text-sm font-medium text-zinc-200">Edition metadata</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="ID">
                <Input
                  value={form.id}
                  onChange={(e) => patch({ id: e.target.value })}
                />
              </Field>
              <Field label="Slug">
                <Input
                  value={form.slug}
                  onChange={(e) => patch({ slug: e.target.value })}
                />
              </Field>
              <Field label="Title">
                <Input
                  value={form.title}
                  onChange={(e) => patch({ title: e.target.value })}
                />
              </Field>
              <Field label="Published at (ISO)">
                <Input
                  value={form.publishedAt}
                  onChange={(e) => patch({ publishedAt: e.target.value })}
                />
              </Field>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6">
            <h3 className="text-sm font-medium text-zinc-200">Featured commentary</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Video title">
                <Input
                  value={form.videoTitle}
                  onChange={(e) => patch({ videoTitle: e.target.value })}
                />
              </Field>
              <Field label="Video slug">
                <Input
                  value={form.videoSlug}
                  onChange={(e) => patch({ videoSlug: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Video URL">
              <Input
                value={form.videoUrl}
                onChange={(e) => patch({ videoUrl: e.target.value })}
              />
            </Field>
            <Field label="Rate summary">
              <Textarea
                rows={3}
                value={form.rateSummary}
                onChange={(e) => patch({ rateSummary: e.target.value })}
              />
            </Field>
            <Field label="Treasury summary">
              <Textarea
                rows={2}
                value={form.treasurySummary}
                onChange={(e) => patch({ treasurySummary: e.target.value })}
              />
            </Field>
            <Field label="Local market summary">
              <Textarea
                rows={3}
                value={form.localMarketSummary}
                onChange={(e) => patch({ localMarketSummary: e.target.value })}
              />
            </Field>
          </section>

          <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6">
            <h3 className="text-sm font-medium text-zinc-200">Today&apos;s play & CTA</h3>
            <Field label="Today's play">
              <Textarea
                rows={3}
                value={form.todaysPlay}
                onChange={(e) => patch({ todaysPlay: e.target.value })}
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="CTA label">
                <Input
                  value={form.cta.label}
                  onChange={(e) =>
                    patch({ cta: { ...form.cta, label: e.target.value } })
                  }
                />
              </Field>
              <Field label="CTA href">
                <Input
                  value={form.cta.href}
                  onChange={(e) =>
                    patch({ cta: { ...form.cta, href: e.target.value } })
                  }
                />
              </Field>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6">
            <h3 className="text-sm font-medium text-zinc-200">Market pulse</h3>
            <div className="grid gap-4">
              {form.pulse.map((card) => (
                <div
                  key={card.id}
                  className="grid gap-3 rounded-xl border border-white/[0.06] p-4 sm:grid-cols-2 lg:grid-cols-4"
                >
                  <p className="font-mono text-[9px] tracking-[0.18em] text-[#c9a227] uppercase sm:col-span-2 lg:col-span-4">
                    {card.label}
                  </p>
                  <Field label="Value">
                    <Input
                      value={card.value}
                      onChange={(e) => updatePulse(card.id, "value", e.target.value)}
                    />
                  </Field>
                  <Field label="Delta">
                    <Input
                      value={card.delta ?? ""}
                      onChange={(e) => updatePulse(card.id, "delta", e.target.value)}
                    />
                  </Field>
                  <Field label="Trend">
                    <select
                      className="flex h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 text-sm text-white"
                      value={card.trend}
                      onChange={(e) =>
                        updatePulse(card.id, "trend", e.target.value as MarketTrend)
                      }
                    >
                      {TREND_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Note">
                    <Input
                      value={card.note ?? ""}
                      onChange={(e) => updatePulse(card.id, "note", e.target.value)}
                    />
                  </Field>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6">
            <h3 className="text-sm font-medium text-zinc-200">Seattle snapshot</h3>
            <Field label="Headline">
              <Input
                value={form.seattle.headline}
                onChange={(e) =>
                  patch({ seattle: { ...form.seattle, headline: e.target.value } })
                }
              />
            </Field>
            <Field label="Summary">
              <Textarea
                rows={3}
                value={form.seattle.summary}
                onChange={(e) =>
                  patch({ seattle: { ...form.seattle, summary: e.target.value } })
                }
              />
            </Field>
            {form.seattle.metrics.map((metric, index) => (
              <div
                key={`${metric.label}-${index}`}
                className="grid gap-3 rounded-xl border border-white/[0.06] p-4 sm:grid-cols-3"
              >
                <Field label={`Metric ${index + 1} label`}>
                  <Input
                    value={metric.label}
                    onChange={(e) => updateSeattleMetric(index, "label", e.target.value)}
                  />
                </Field>
                <Field label="Value">
                  <Input
                    value={metric.value}
                    onChange={(e) => updateSeattleMetric(index, "value", e.target.value)}
                  />
                </Field>
                <Field label="Context">
                  <Input
                    value={metric.context ?? ""}
                    onChange={(e) =>
                      updateSeattleMetric(index, "context", e.target.value)
                    }
                  />
                </Field>
              </div>
            ))}
          </section>

          <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6">
            <h3 className="text-sm font-medium text-zinc-200">Agent talking points</h3>
            <Field label="Buyer talking point">
              <Textarea
                rows={2}
                value={form.buyerTalkingPoint}
                onChange={(e) => patch({ buyerTalkingPoint: e.target.value })}
              />
            </Field>
            <Field label="Seller talking point">
              <Textarea
                rows={2}
                value={form.sellerTalkingPoint}
                onChange={(e) => patch({ sellerTalkingPoint: e.target.value })}
              />
            </Field>
            <Field label="Agent script">
              <Textarea
                rows={3}
                value={form.agentScript}
                onChange={(e) => patch({ agentScript: e.target.value })}
              />
            </Field>
          </section>

          <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6">
            <h3 className="text-sm font-medium text-zinc-200">Refi / HELOC watch</h3>
            <Field label="Headline">
              <Input
                value={form.refiHeloc.headline}
                onChange={(e) =>
                  patch({
                    refiHeloc: { ...form.refiHeloc, headline: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Summary">
              <Textarea
                rows={3}
                value={form.refiHeloc.summary}
                onChange={(e) =>
                  patch({
                    refiHeloc: { ...form.refiHeloc, summary: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Bullets (one per line)">
              <Textarea
                rows={4}
                value={form.refiHeloc.bullets.join("\n")}
                onChange={(e) =>
                  patch({
                    refiHeloc: {
                      ...form.refiHeloc,
                      bullets: e.target.value
                        .split("\n")
                        .map((line) => line.trim())
                        .filter(Boolean),
                    },
                  })
                }
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="CTA href">
                <Input
                  value={form.refiHeloc.href}
                  onChange={(e) =>
                    patch({
                      refiHeloc: { ...form.refiHeloc, href: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="CTA label">
                <Input
                  value={form.refiHeloc.ctaLabel}
                  onChange={(e) =>
                    patch({
                      refiHeloc: { ...form.refiHeloc, ctaLabel: e.target.value },
                    })
                  }
                />
              </Field>
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6">
            <h3 className="text-sm font-medium text-zinc-200">Commercial corner</h3>
            <Field label="Headline">
              <Input
                value={form.commercial.headline}
                onChange={(e) =>
                  patch({
                    commercial: { ...form.commercial, headline: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Summary">
              <Textarea
                rows={3}
                value={form.commercial.summary}
                onChange={(e) =>
                  patch({
                    commercial: { ...form.commercial, summary: e.target.value },
                  })
                }
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="CTA href">
                <Input
                  value={form.commercial.href}
                  onChange={(e) =>
                    patch({
                      commercial: { ...form.commercial, href: e.target.value },
                    })
                  }
                />
              </Field>
              <Field label="CTA label">
                <Input
                  value={form.commercial.ctaLabel}
                  onChange={(e) =>
                    patch({
                      commercial: { ...form.commercial, ctaLabel: e.target.value },
                    })
                  }
                />
              </Field>
            </div>
          </section>
        </form>

        <section className="space-y-6 rounded-2xl border border-[#c9a227]/20 bg-zinc-950/50 p-6">
          <h3 className="text-sm font-medium text-zinc-200">Distribution previews</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                Realtor email
              </p>
              <CopyButton text={emailPreview} label="Copy email" />
            </div>
            <pre className="max-h-64 overflow-auto rounded-xl border border-white/[0.06] bg-black/40 p-4 text-xs leading-relaxed whitespace-pre-wrap text-zinc-300">
              {emailPreview}
            </pre>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
                Social caption
              </p>
              <CopyButton text={socialPreview} label="Copy social" />
            </div>
            <pre className="max-h-40 overflow-auto rounded-xl border border-white/[0.06] bg-black/40 p-4 text-xs leading-relaxed whitespace-pre-wrap text-zinc-300">
              {socialPreview}
            </pre>
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
