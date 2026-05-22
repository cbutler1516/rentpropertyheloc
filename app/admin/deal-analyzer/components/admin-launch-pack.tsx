"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Textarea } from "@/app/components/ui/textarea";
import type { AgentDashboardStats } from "@/app/deal-analyzer/lib/agent-types";
import {
  OUTREACH_STATUS_LABELS,
  buildLaunchPackContent,
} from "@/app/deal-analyzer/lib/launch-pack-content";
import {
  downloadTextFile,
  loadLaunchPackState,
  saveLaunchPackState,
} from "@/app/deal-analyzer/lib/launch-pack-storage";
import type {
  LaunchPackPersistedState,
  OutreachRow,
  OutreachStatus,
} from "@/app/deal-analyzer/lib/launch-pack-types";
import { partnerLinkForSlug } from "@/app/deal-analyzer/lib/launch-pack-content";
import { AdminShell } from "./admin-shell";

type AdminLaunchPackProps = {
  siteUrl: string;
  initialAgents: AgentDashboardStats[];
};

function CopyBlock({
  id,
  title,
  description,
  body,
  copiedKey,
  onCopy,
}: {
  id: string;
  title: string;
  description?: string;
  body: string;
  copiedKey: string | null;
  onCopy: (key: string, text: string) => void;
}) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-black/20 p-4">
      <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="font-mono text-[9px] tracking-[0.16em] text-[#c9a227] uppercase">
            {title}
          </p>
          {description ? (
            <p className="mt-1 text-xs text-zinc-500">{description}</p>
          ) : null}
        </div>
        <button
          type="button"
          className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase hover:text-zinc-300"
          onClick={() => onCopy(id, body)}
        >
          {copiedKey === id ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap text-xs leading-relaxed text-zinc-400">
        {body}
      </pre>
    </div>
  );
}

export function AdminLaunchPack({ siteUrl, initialAgents }: AdminLaunchPackProps) {
  const router = useRouter();
  const content = useMemo(() => buildLaunchPackContent(siteUrl), [siteUrl]);
  const [state, setState] = useState<LaunchPackPersistedState | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [savedHint, setSavedHint] = useState<string | null>(null);

  useEffect(() => {
    setState(loadLaunchPackState());
  }, []);

  const persist = useCallback((next: LaunchPackPersistedState) => {
    setState(next);
    saveLaunchPackState(next);
    setSavedHint("Saved locally");
    window.setTimeout(() => setSavedHint(null), 2000);
  }, []);

  async function copyText(key: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2000);
  }

  function updateOutreach(index: number, patch: Partial<OutreachRow>) {
    if (!state) return;
    const outreach = state.outreach.map((row, i) =>
      i === index ? { ...row, ...patch } : row,
    );
    persist({ ...state, outreach });
  }

  function assignAgentToRow(index: number, agent: AgentDashboardStats) {
    updateOutreach(index, {
      agentName: agent.name,
      agentSlug: agent.slug,
    });
  }

  async function copyAgentLink(index: number) {
    const row = state?.outreach[index];
    if (!row?.agentSlug) return;
    const link = partnerLinkForSlug(siteUrl, row.agentSlug);
    await copyText(`link-${index}`, link);
    updateOutreach(index, { linkCopied: true, status: "link_copied" });
  }

  const outreachSummary = useMemo(() => {
    if (!state) return { invited: 0, live: 0, total: 10 };
    const rows = state.outreach.filter((r) => r.agentName.trim());
    return {
      invited: state.outreach.filter((r) =>
        ["invited", "live", "needs_followup", "link_copied"].includes(r.status),
      ).length,
      live: state.outreach.filter((r) => r.status === "live").length,
      named: rows.length,
    };
  }, [state]);

  const fullPackText = useMemo(() => {
    const header = `THE LOAN PLAYBOOK — DEAL ANALYZER LAUNCH PACK\n${content.siteUrl}\n\n`;
    const sections = content.sections.map((s) => `--- ${s.title} ---\n${s.body}`).join("\n\n");
    const tracker = state?.outreach
      .filter((r) => r.agentName.trim())
      .map(
        (r, i) =>
          `${i + 1}. ${r.agentName} | ${r.status} | invited ${r.invitedDate || "—"} | link copied: ${r.linkCopied ? "yes" : "no"}\n   ${r.notes || ""}`,
      )
      .join("\n");
    return `${header}${sections}\n\n--- LAUNCH NOTES ---\n${state?.launchNotes ?? ""}\n\n--- OUTREACH TRACKER ---\n${tracker || "(empty)"}`;
  }, [content, state]);

  const sidebar = (
    <ul className="space-y-1 text-sm text-zinc-400">
      <li>
        <Link
          href="/admin/deal-analyzer"
          className="block rounded-lg px-3 py-2 hover:bg-white/[0.04] hover:text-zinc-200"
        >
          Overview
        </Link>
      </li>
      <li>
        <Link
          href="/admin/deal-analyzer/launch"
          className="block rounded-lg px-3 py-2 hover:bg-white/[0.04] hover:text-zinc-200"
        >
          Launch readiness
        </Link>
      </li>
      <li className="rounded-lg bg-[#7c3aed]/10 px-3 py-2 text-[#c4b5fd]">
        Launch pack
      </li>
      <li>
        <Link
          href="/admin/deal-analyzer/agents"
          className="block rounded-lg px-3 py-2 hover:bg-white/[0.04] hover:text-zinc-200"
        >
          Partner agents
        </Link>
      </li>
    </ul>
  );

  async function handleLogout() {
    await fetch("/api/deal-analyzer/admin/auth", { method: "DELETE" });
    router.refresh();
  }

  if (!state) {
    return (
      <AdminShell sidebar={sidebar}>
        <p className="text-sm text-zinc-500">Loading launch pack…</p>
      </AdminShell>
    );
  }

  return (
    <AdminShell
      sidebar={sidebar}
      headerActions={
        <div className="flex flex-wrap items-center gap-2">
          {savedHint ? (
            <span className="font-mono text-[9px] tracking-[0.14em] text-emerald-400 uppercase">
              {savedHint}
            </span>
          ) : null}
          <Button
            type="button"
            variant="gold"
            size="sm"
            onClick={() => void copyText("full-pack", fullPackText)}
          >
            {copiedKey === "full-pack" ? "Copied" : "Copy entire pack"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      }
    >
      <div className="space-y-10">
        <div>
          <h2 className="text-lg font-medium text-white">Deal Analyzer launch pack</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Copy, outreach tracking, and test links for your first 10 agent partners.
            Tracker and notes save in this browser.
          </p>
        </div>

        <section className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
            <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase">
              Agents named
            </p>
            <p className="mt-2 text-2xl font-medium text-white">
              {outreachSummary.named}/10
            </p>
          </div>
          <div className="rounded-xl border border-white/[0.06] bg-zinc-950/50 p-4">
            <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase">
              Invited / in progress
            </p>
            <p className="mt-2 text-2xl font-medium text-white">
              {outreachSummary.invited}
            </p>
          </div>
          <div className="rounded-xl border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-4">
            <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-500 uppercase">
              Live
            </p>
            <p className="mt-2 text-2xl font-medium text-[#c4b5fd]">
              {outreachSummary.live}
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <h3 className="text-sm font-medium text-white">Launch notes</h3>
          <Textarea
            rows={5}
            value={state.launchNotes}
            placeholder="Week-of-launch notes: who you called, blockers, follow-ups…"
            onChange={(e) => persist({ ...state, launchNotes: e.target.value })}
            className="border-white/[0.08] bg-zinc-950"
          />
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-medium text-white">
              7. First 10 agents — outreach tracker
            </h3>
            <Link
              href="/admin/deal-analyzer/agents"
              className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase hover:text-zinc-300"
            >
              Add agents in admin →
            </Link>
          </div>
          <div className="overflow-x-auto rounded-xl border border-white/[0.06]">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.06] font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase">
                  <th className="px-3 py-2">#</th>
                  <th className="px-3 py-2">Agent name</th>
                  <th className="px-3 py-2">Assign from roster</th>
                  <th className="px-3 py-2">Status</th>
                  <th className="px-3 py-2">Link copied</th>
                  <th className="px-3 py-2">Invited date</th>
                  <th className="px-3 py-2">Notes</th>
                  <th className="px-3 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.outreach.map((row, index) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/[0.04] align-top"
                  >
                    <td className="px-3 py-3 text-zinc-500">{index + 1}</td>
                    <td className="px-3 py-3">
                      <Input
                        value={row.agentName}
                        placeholder="Agent name"
                        onChange={(e) =>
                          updateOutreach(index, { agentName: e.target.value })
                        }
                        className="min-w-[140px] border-white/[0.08] bg-zinc-950"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={row.agentSlug}
                        onChange={(e) => {
                          const slug = e.target.value;
                          const agent = initialAgents.find((a) => a.slug === slug);
                          if (agent) assignAgentToRow(index, agent);
                          else updateOutreach(index, { agentSlug: slug });
                        }}
                        className="w-full min-w-[160px] rounded-lg border border-white/[0.08] bg-zinc-950 px-2 py-2 text-sm text-white"
                      >
                        <option value="">Select agent…</option>
                        {initialAgents.map((a) => (
                          <option key={a.id} value={a.slug}>
                            {a.name}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <select
                        value={row.status}
                        onChange={(e) =>
                          updateOutreach(index, {
                            status: e.target.value as OutreachStatus,
                          })
                        }
                        className="w-full min-w-[130px] rounded-lg border border-white/[0.08] bg-zinc-950 px-2 py-2 text-sm text-white"
                      >
                        {(Object.keys(OUTREACH_STATUS_LABELS) as OutreachStatus[]).map(
                          (s) => (
                            <option key={s} value={s}>
                              {OUTREACH_STATUS_LABELS[s]}
                            </option>
                          ),
                        )}
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={row.linkCopied}
                        onChange={(e) =>
                          updateOutreach(index, { linkCopied: e.target.checked })
                        }
                        className="h-4 w-4 rounded border-zinc-600"
                        aria-label="Link copied"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <Input
                        type="date"
                        value={row.invitedDate}
                        onChange={(e) =>
                          updateOutreach(index, { invitedDate: e.target.value })
                        }
                        className="border-white/[0.08] bg-zinc-950"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <Input
                        value={row.notes}
                        placeholder="Notes"
                        onChange={(e) =>
                          updateOutreach(index, { notes: e.target.value })
                        }
                        className="min-w-[160px] border-white/[0.08] bg-zinc-950"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <button
                        type="button"
                        disabled={!row.agentSlug}
                        className="font-mono text-[9px] tracking-[0.12em] text-[#c9a227] uppercase disabled:text-zinc-600"
                        onClick={() => void copyAgentLink(index)}
                      >
                        Copy link
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-medium text-white">8. Test links checklist</h3>
          <ul className="space-y-2 rounded-xl border border-white/[0.06] p-4">
            {content.testLinks.map((link) => (
              <li key={link.id}>
                <label className="flex cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={Boolean(state.testLinksChecked[link.id])}
                    onChange={(e) =>
                      persist({
                        ...state,
                        testLinksChecked: {
                          ...state.testLinksChecked,
                          [link.id]: e.target.checked,
                        },
                      })
                    }
                    className="h-4 w-4 rounded border-zinc-600"
                  />
                  <Link
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-300 hover:text-white"
                  >
                    {link.label} ↗
                  </Link>
                </label>
              </li>
            ))}
          </ul>
        </section>

        <section className="space-y-4 rounded-2xl border border-[#c9a227]/20 bg-[#c9a227]/5 p-5">
          <h3 className="text-sm font-medium text-white">6. QR code download</h3>
          <p className="text-xs text-zinc-500">
            Public Deal Analyzer QR (for flyers). Per-agent QR: copy partner link, then
            generate in Canva or any QR tool.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={content.qrImageUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="deal-analyzer-qr.png"
            >
              <Button type="button" variant="gold" size="sm">
                Download public QR (PNG)
              </Button>
            </a>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() =>
                downloadTextFile("deal-analyzer-qr-placeholder.txt", content.qrSheetText)
              }
            >
              Download QR sheet (.txt)
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => void copyText("qr-text", content.qrSheetText)}
            >
              {copiedKey === "qr-text" ? "Copied" : "Copy QR sheet text"}
            </Button>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.qrImageUrl}
            alt="QR code for Deal Analyzer public URL"
            className="mt-4 h-40 w-40 rounded-lg border border-white/[0.08] bg-white p-2"
          />
        </section>

        <section className="space-y-4">
          <h3 className="text-sm font-medium text-white">Launch copy library</h3>
          <div className="grid gap-4 lg:grid-cols-2">
            {content.sections.map((section) => (
              <CopyBlock
                key={section.id}
                id={section.id}
                title={section.title}
                description={section.description}
                body={section.body}
                copiedKey={copiedKey}
                onCopy={copyText}
              />
            ))}
          </div>
        </section>
      </div>
    </AdminShell>
  );
}
