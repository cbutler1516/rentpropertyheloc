"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CopyButton } from "@/app/content-engine/components/copy-button";
import { AdminShell } from "@/app/admin/deal-analyzer/components/admin-shell";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import { createEditableMarketUpdate } from "@/app/lib/market-center/form-defaults";
import { normalizeDailyMarketUpdate } from "@/app/lib/market-center/normalize";
import {
  generateRealtorEmailPreview,
  generateSocialCaptionPreview,
} from "@/app/lib/market-center/previews";
import {
  MARKET_MOOD_LABELS,
  REAL_ESTATE_PULSE_IDS,
} from "@/app/lib/market-center/types";
import type {
  DailyMarketUpdate,
  MarketCenterStoreSnapshot,
  MarketMood,
  MarketTrend,
} from "@/app/lib/market-center/types";

const TREND_OPTIONS: MarketTrend[] = ["up", "down", "flat", "neutral"];
const MOOD_OPTIONS = Object.keys(MARKET_MOOD_LABELS) as MarketMood[];
const BIG_THREE_KEYS = ["rates", "bonds", "housing"] as const;

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

function TrendSelect({
  value,
  onChange,
}: {
  value: MarketTrend;
  onChange: (value: MarketTrend) => void;
}) {
  return (
    <select
      className="flex h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 text-sm text-white"
      value={value}
      onChange={(e) => onChange(e.target.value as MarketTrend)}
    >
      {TREND_OPTIONS.map((t) => (
        <option key={t} value={t}>
          {t}
        </option>
      ))}
    </select>
  );
}

function AdminSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-white/[0.08] bg-zinc-950/50 p-6">
      <h3 className="text-sm font-medium text-zinc-200">{title}</h3>
      {children}
    </section>
  );
}

function formatSavedAt(iso: string | undefined) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

export function MarketCenterAdmin({ initialSnapshot }: MarketCenterAdminProps) {
  const router = useRouter();
  const [snapshot, setSnapshot] = useState(initialSnapshot);
  const [form, setForm] = useState<DailyMarketUpdate>(() => {
    const source = initialSnapshot.draft ?? initialSnapshot.published;
    return source
      ? normalizeDailyMarketUpdate(source)
      : createEditableMarketUpdate();
  });
  const [status, setStatus] = useState<"idle" | "saving" | "publishing">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const emailPreview = useMemo(() => generateRealtorEmailPreview(form), [form]);
  const socialPreview = useMemo(
    () => generateSocialCaptionPreview(form),
    [form],
  );

  const patch = useCallback((partial: Partial<DailyMarketUpdate>) => {
    setForm((prev) => normalizeDailyMarketUpdate({ ...prev, ...partial }));
  }, []);

  const refreshSnapshot = useCallback(async () => {
    const res = await fetch("/api/admin/market-center", { credentials: "include" });
    if (res.status === 401) {
      router.refresh();
      return;
    }
    const json = (await res.json()) as MarketCenterStoreSnapshot;
    setSnapshot(json);
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
      if (json.draft) setForm(normalizeDailyMarketUpdate(json.draft));
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
      setMessage("Published — /market is live with this brief.");
    } catch {
      setError("Could not reach the server.");
    } finally {
      setStatus("idle");
    }
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
        Market Brief
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

  return (
    <AdminShell
      sidebar={sidebar}
      headerActions={
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/market"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-full px-4 font-mono text-[9px] tracking-[0.16em] text-zinc-400 uppercase hover:bg-white/5 hover:text-white"
          >
            Preview /market
          </Link>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={async () => {
              await fetch("/api/deal-analyzer/admin/auth", { method: "DELETE" });
              router.refresh();
            }}
          >
            Sign out
          </Button>
        </div>
      }
    >
      <div className="mx-auto max-w-4xl space-y-8">
        <div>
          <h2 className="text-xl font-medium tracking-tight text-white">
            Market Brief Admin
          </h2>
          <p className="mt-1 text-sm text-zinc-500">
            Daily agent briefing for{" "}
            <Link href="/market" className="text-[#c4b5fd] hover:text-white">
              /market
            </Link>
          </p>
        </div>

        <div className="grid gap-4 rounded-2xl border border-white/[0.08] bg-zinc-950/60 p-5 sm:grid-cols-2">
          <div>
            <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
              Published
            </p>
            <p className="mt-1 text-sm text-zinc-200">
              {snapshot.published?.title ?? "None"}
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
              {snapshot.draft?.title ?? "None"}
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
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              snapshot.draft &&
              setForm(normalizeDailyMarketUpdate(snapshot.draft))
            }
          >
            Load draft
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() =>
              snapshot.published &&
              setForm(normalizeDailyMarketUpdate(snapshot.published))
            }
          >
            Load published
          </Button>
        </div>

        <form
          className="space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            void saveDraft();
          }}
        >
          <AdminSection title="Brief hero">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Edition title">
                <Input value={form.title} onChange={(e) => patch({ title: e.target.value })} />
              </Field>
              <Field label="Slug">
                <Input value={form.slug} onChange={(e) => patch({ slug: e.target.value })} />
              </Field>
              <Field label="Published at (ISO)">
                <Input
                  value={form.publishedAt}
                  onChange={(e) => patch({ publishedAt: e.target.value })}
                />
              </Field>
              <Field label="Market mood">
                <select
                  className="flex h-11 w-full rounded-xl border border-zinc-800 bg-zinc-950/80 px-4 text-sm text-white"
                  value={form.marketMood}
                  onChange={(e) =>
                    patch({ marketMood: e.target.value as MarketMood })
                  }
                >
                  {MOOD_OPTIONS.map((m) => (
                    <option key={m} value={m}>
                      {MARKET_MOOD_LABELS[m]}
                    </option>
                  ))}
                </select>
              </Field>
            </div>
            <Field label="Agent takeaway (one sentence)">
              <Textarea
                rows={2}
                value={form.agentTakeaway}
                onChange={(e) => patch({ agentTakeaway: e.target.value })}
              />
            </Field>
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
          </AdminSection>

          <AdminSection title="The 3 big things">
            {BIG_THREE_KEYS.map((key) => (
              <div
                key={key}
                className="space-y-3 rounded-xl border border-white/[0.06] p-4"
              >
                <p className="font-mono text-[9px] tracking-[0.18em] text-[#c9a227] uppercase">
                  {key}
                </p>
                <Field label="Direction">
                  <TrendSelect
                    value={form.bigThree[key].direction}
                    onChange={(direction) =>
                      setForm((prev) => ({
                        ...prev,
                        bigThree: {
                          ...prev.bigThree,
                          [key]: { ...prev.bigThree[key], direction },
                        },
                      }))
                    }
                  />
                </Field>
                <Field label="Summary">
                  <Textarea
                    rows={2}
                    value={form.bigThree[key].summary}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        bigThree: {
                          ...prev.bigThree,
                          [key]: { ...prev.bigThree[key], summary: e.target.value },
                        },
                      }))
                    }
                  />
                </Field>
                <Field label="Agent takeaway">
                  <Textarea
                    rows={2}
                    value={form.bigThree[key].agentTakeaway}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        bigThree: {
                          ...prev.bigThree,
                          [key]: {
                            ...prev.bigThree[key],
                            agentTakeaway: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                </Field>
              </div>
            ))}
          </AdminSection>

          <AdminSection title="Rate movement visual">
            <Field label="Headline">
              <Input
                value={form.rateTrendVisual.headline}
                onChange={(e) =>
                  patch({
                    rateTrendVisual: {
                      ...form.rateTrendVisual,
                      headline: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="30-year label">
                <Input
                  value={form.rateTrendVisual.thirtyYearLabel}
                  onChange={(e) =>
                    patch({
                      rateTrendVisual: {
                        ...form.rateTrendVisual,
                        thirtyYearLabel: e.target.value,
                      },
                    })
                  }
                />
              </Field>
              <Field label="30-year value">
                <Input
                  value={form.rateTrendVisual.thirtyYearValue}
                  onChange={(e) =>
                    patch({
                      rateTrendVisual: {
                        ...form.rateTrendVisual,
                        thirtyYearValue: e.target.value,
                      },
                    })
                  }
                />
              </Field>
            </div>
            {form.rateTrendVisual.points.map((point, index) => (
              <div
                key={point.label}
                className="grid gap-3 rounded-lg border border-white/[0.06] p-3 sm:grid-cols-3"
              >
                <Field label="Label">
                  <Input
                    value={point.label}
                    onChange={(e) => {
                      const points = [...form.rateTrendVisual.points];
                      points[index] = { ...point, label: e.target.value };
                      patch({ rateTrendVisual: { ...form.rateTrendVisual, points } });
                    }}
                  />
                </Field>
                <Field label="Value">
                  <Input
                    value={point.value}
                    onChange={(e) => {
                      const points = [...form.rateTrendVisual.points];
                      points[index] = { ...point, value: e.target.value };
                      patch({ rateTrendVisual: { ...form.rateTrendVisual, points } });
                    }}
                  />
                </Field>
                <Field label="Direction">
                  <TrendSelect
                    value={point.direction}
                    onChange={(direction) => {
                      const points = [...form.rateTrendVisual.points];
                      points[index] = { ...point, direction };
                      patch({ rateTrendVisual: { ...form.rateTrendVisual, points } });
                    }}
                  />
                </Field>
              </div>
            ))}
            <Field label="Detail note (collapsed on site)">
              <Textarea
                rows={2}
                value={form.rateTrendVisual.detailNote ?? ""}
                onChange={(e) =>
                  patch({
                    rateTrendVisual: {
                      ...form.rateTrendVisual,
                      detailNote: e.target.value,
                    },
                  })
                }
              />
            </Field>
          </AdminSection>

          <AdminSection title="Bond & Fed watch">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="10-year Treasury value">
                <Input
                  value={form.bondFedWatch.treasury10Year.value}
                  onChange={(e) =>
                    patch({
                      bondFedWatch: {
                        ...form.bondFedWatch,
                        treasury10Year: {
                          ...form.bondFedWatch.treasury10Year,
                          value: e.target.value,
                        },
                      },
                    })
                  }
                />
              </Field>
              <Field label="10-year direction">
                <TrendSelect
                  value={form.bondFedWatch.treasury10Year.direction}
                  onChange={(direction) =>
                    patch({
                      bondFedWatch: {
                        ...form.bondFedWatch,
                        treasury10Year: {
                          ...form.bondFedWatch.treasury10Year,
                          direction,
                        },
                      },
                    })
                  }
                />
              </Field>
            </div>
            <Field label="10-year note">
              <Input
                value={form.bondFedWatch.treasury10Year.note}
                onChange={(e) =>
                  patch({
                    bondFedWatch: {
                      ...form.bondFedWatch,
                      treasury10Year: {
                        ...form.bondFedWatch.treasury10Year,
                        note: e.target.value,
                      },
                    },
                  })
                }
              />
            </Field>
            <Field label="MBS label">
              <Input
                value={form.bondFedWatch.mbs.label}
                onChange={(e) =>
                  patch({
                    bondFedWatch: {
                      ...form.bondFedWatch,
                      mbs: { ...form.bondFedWatch.mbs, label: e.target.value },
                    },
                  })
                }
              />
            </Field>
            <Field label="MBS direction">
              <TrendSelect
                value={form.bondFedWatch.mbs.direction}
                onChange={(direction) =>
                  patch({
                    bondFedWatch: {
                      ...form.bondFedWatch,
                      mbs: { ...form.bondFedWatch.mbs, direction },
                    },
                  })
                }
              />
            </Field>
            <Field label="MBS note">
              <Input
                value={form.bondFedWatch.mbs.note}
                onChange={(e) =>
                  patch({
                    bondFedWatch: {
                      ...form.bondFedWatch,
                      mbs: { ...form.bondFedWatch.mbs, note: e.target.value },
                    },
                  })
                }
              />
            </Field>
            <Field label="Fed narrative">
              <Textarea
                rows={2}
                value={form.bondFedWatch.fedNarrative}
                onChange={(e) =>
                  patch({
                    bondFedWatch: {
                      ...form.bondFedWatch,
                      fedNarrative: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Inflation / rate pressure note">
              <Textarea
                rows={2}
                value={form.bondFedWatch.inflationNote}
                onChange={(e) =>
                  patch({
                    bondFedWatch: {
                      ...form.bondFedWatch,
                      inflationNote: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Why agents should care">
              <Textarea
                rows={2}
                value={form.bondFedWatch.whyAgentsCare}
                onChange={(e) =>
                  patch({
                    bondFedWatch: {
                      ...form.bondFedWatch,
                      whyAgentsCare: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Detail note (collapsed)">
              <Textarea
                rows={2}
                value={form.bondFedWatch.detailNote ?? ""}
                onChange={(e) =>
                  patch({
                    bondFedWatch: {
                      ...form.bondFedWatch,
                      detailNote: e.target.value,
                    },
                  })
                }
              />
            </Field>
          </AdminSection>

          <AdminSection title="Real estate pulse">
            {form.realEstatePulse.cards.map((card, index) => (
              <div
                key={card.id}
                className="grid gap-3 rounded-lg border border-white/[0.06] p-3"
              >
                <p className="font-mono text-[9px] uppercase text-zinc-500">
                  {REAL_ESTATE_PULSE_IDS[index] ?? card.id}
                </p>
                <Field label="Label">
                  <Input
                    value={card.label}
                    onChange={(e) => {
                      const cards = [...form.realEstatePulse.cards];
                      cards[index] = { ...card, label: e.target.value };
                      patch({ realEstatePulse: { ...form.realEstatePulse, cards } });
                    }}
                  />
                </Field>
                <Field label="Value">
                  <Input
                    value={card.value}
                    onChange={(e) => {
                      const cards = [...form.realEstatePulse.cards];
                      cards[index] = { ...card, value: e.target.value };
                      patch({ realEstatePulse: { ...form.realEstatePulse, cards } });
                    }}
                  />
                </Field>
                <Field label="Direction">
                  <TrendSelect
                    value={card.direction}
                    onChange={(direction) => {
                      const cards = [...form.realEstatePulse.cards];
                      cards[index] = { ...card, direction };
                      patch({ realEstatePulse: { ...form.realEstatePulse, cards } });
                    }}
                  />
                </Field>
                <Field label="Plain English">
                  <Textarea
                    rows={2}
                    value={card.plainEnglish}
                    onChange={(e) => {
                      const cards = [...form.realEstatePulse.cards];
                      cards[index] = { ...card, plainEnglish: e.target.value };
                      patch({ realEstatePulse: { ...form.realEstatePulse, cards } });
                    }}
                  />
                </Field>
              </div>
            ))}
            <Field label="Seattle / local note">
              <Textarea
                rows={2}
                value={form.realEstatePulse.seattleNote}
                onChange={(e) =>
                  patch({
                    realEstatePulse: {
                      ...form.realEstatePulse,
                      seattleNote: e.target.value,
                    },
                  })
                }
              />
            </Field>
          </AdminSection>

          <AdminSection title="What agents should say">
            <Field label="Buyer script">
              <Textarea
                rows={2}
                value={form.agentScripts.buyerScript}
                onChange={(e) =>
                  patch({
                    agentScripts: {
                      ...form.agentScripts,
                      buyerScript: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Seller script">
              <Textarea
                rows={2}
                value={form.agentScripts.sellerScript}
                onChange={(e) =>
                  patch({
                    agentScripts: {
                      ...form.agentScripts,
                      sellerScript: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Social post idea">
              <Textarea
                rows={3}
                value={form.agentScripts.socialPostIdea}
                onChange={(e) =>
                  patch({
                    agentScripts: {
                      ...form.agentScripts,
                      socialPostIdea: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Listing appointment talking point">
              <Textarea
                rows={2}
                value={form.agentScripts.listingAppointmentPoint}
                onChange={(e) =>
                  patch({
                    agentScripts: {
                      ...form.agentScripts,
                      listingAppointmentPoint: e.target.value,
                    },
                  })
                }
              />
            </Field>
          </AdminSection>

          <AdminSection title="Today's play">
            <Field label="Action">
              <Textarea
                rows={2}
                value={form.todayPlay.action}
                onChange={(e) =>
                  patch({
                    todayPlay: { ...form.todayPlay, action: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Who to call">
              <Textarea
                rows={2}
                value={form.todayPlay.whoToCall}
                onChange={(e) =>
                  patch({
                    todayPlay: { ...form.todayPlay, whoToCall: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="What to say">
              <Textarea
                rows={2}
                value={form.todayPlay.whatToSay}
                onChange={(e) =>
                  patch({
                    todayPlay: { ...form.todayPlay, whatToSay: e.target.value },
                  })
                }
              />
            </Field>
            <Field label="Why now">
              <Textarea
                rows={2}
                value={form.todayPlay.whyNow}
                onChange={(e) =>
                  patch({
                    todayPlay: { ...form.todayPlay, whyNow: e.target.value },
                  })
                }
              />
            </Field>
          </AdminSection>

          <AdminSection title="Newsletter CTA">
            <Field label="Headline">
              <Input
                value={form.newsletterCta.headline}
                onChange={(e) =>
                  patch({
                    newsletterCta: {
                      ...form.newsletterCta,
                      headline: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Subhead">
              <Textarea
                rows={2}
                value={form.newsletterCta.subhead}
                onChange={(e) =>
                  patch({
                    newsletterCta: {
                      ...form.newsletterCta,
                      subhead: e.target.value,
                    },
                  })
                }
              />
            </Field>
            <Field label="Button label">
              <Input
                value={form.newsletterCta.buttonLabel}
                onChange={(e) =>
                  patch({
                    newsletterCta: {
                      ...form.newsletterCta,
                      buttonLabel: e.target.value,
                    },
                  })
                }
              />
            </Field>
          </AdminSection>
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
