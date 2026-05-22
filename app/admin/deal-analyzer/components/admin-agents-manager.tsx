"use client";

import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { Textarea } from "@/app/components/ui/textarea";
import type { AgentDashboardStats } from "@/app/deal-analyzer/lib/agent-types";
import {
  partnerLandingPath,
  partnerLink,
  partnerSampleReportPath,
  referralCodeFromName,
  slugifyAgent,
} from "@/app/deal-analyzer/lib/agent-types";
import { AdminAgentInviteKit } from "./admin-agent-invite-kit";
import { AdminAgentLandingKit } from "./admin-agent-landing-kit";
import { AdminShell } from "./admin-shell";

type AgentFormState = {
  id: string | null;
  name: string;
  email: string;
  phone: string;
  company: string;
  slug: string;
  referralCode: string;
  headshotUrl: string;
  logoUrl: string;
  bio: string;
  brokerage: string;
  ctaPhone: string;
  ctaEmail: string;
  brandColor: string;
};

const emptyForm: AgentFormState = {
  id: null,
  name: "",
  email: "",
  phone: "",
  company: "",
  slug: "",
  referralCode: "",
  headshotUrl: "",
  logoUrl: "",
  bio: "",
  brokerage: "",
  ctaPhone: "",
  ctaEmail: "",
  brandColor: "",
};

function statsToForm(row: AgentDashboardStats): AgentFormState {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    phone: row.phone ?? "",
    company: row.company ?? "",
    slug: row.slug,
    referralCode: row.referralCode,
    headshotUrl: row.headshotUrl ?? "",
    logoUrl: row.logoUrl ?? "",
    bio: row.bio ?? "",
    brokerage: row.brokerage ?? "",
    ctaPhone: row.ctaPhone ?? "",
    ctaEmail: row.ctaEmail ?? "",
    brandColor: row.brandColor ?? "",
  };
}

type AdminAgentsManagerProps = {
  siteUrl: string;
  initialStats: AgentDashboardStats[];
};

export function AdminAgentsManager({
  siteUrl,
  initialStats,
}: AdminAgentsManagerProps) {
  const router = useRouter();
  const [stats, setStats] = useState(initialStats);
  const [form, setForm] = useState<AgentFormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copiedSlug, setCopiedSlug] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const res = await fetch("/api/deal-analyzer/admin/agents", {
      credentials: "include",
    });
    if (res.status === 401) {
      router.refresh();
      return;
    }
    const data = (await res.json()) as {
      stats?: AgentDashboardStats[];
      error?: string;
    };
    if (res.ok && data.stats) {
      setStats(data.stats);
    }
  }, [router]);

  const inviteAgent = useMemo(() => {
    if (!form.slug.trim()) return null;
    return {
      name: form.name || "Agent",
      slug: form.slug,
      email: form.email,
      phone: form.phone || null,
      company: form.company || null,
      brokerage: form.brokerage || null,
      ctaPhone: form.ctaPhone || null,
      ctaEmail: form.ctaEmail || null,
    };
  }, [form]);

  const selectedLandingStats = useMemo(() => {
    if (!form.id) return [];
    return stats.find((s) => s.id === form.id)?.landingPageStats ?? [];
  }, [form.id, stats]);

  const sidebar = useMemo(
    () => (
      <ul className="space-y-1 text-sm text-zinc-400">
        <li>
          <Link
            href="/admin/deal-analyzer"
            className="block rounded-lg px-3 py-2 hover:bg-white/[0.04] hover:text-zinc-200"
          >
            Overview
          </Link>
        </li>
        <li className="rounded-lg bg-[#7c3aed]/10 px-3 py-2 text-[#c4b5fd]">
          Partner agents
        </li>
      </ul>
    ),
    [],
  );

  function startCreate() {
    setForm(emptyForm);
    setError(null);
  }

  function startEdit(row: AgentDashboardStats) {
    setForm(statsToForm(row));
    setError(null);
  }

  function handleNameChange(name: string) {
    setForm((prev) => {
      const next = { ...prev, name };
      if (!prev.id) {
        return {
          ...next,
          slug: prev.slug || slugifyAgent(name),
          referralCode: prev.referralCode || referralCodeFromName(name),
        };
      }
      return next;
    });
  }

  function buildPayload() {
    return {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      company: form.company.trim(),
      slug: form.slug.trim(),
      referralCode: form.referralCode.trim(),
      headshotUrl: form.headshotUrl.trim(),
      logoUrl: form.logoUrl.trim(),
      bio: form.bio.trim(),
      brokerage: form.brokerage.trim(),
      ctaPhone: form.ctaPhone.trim(),
      ctaEmail: form.ctaEmail.trim(),
      brandColor: form.brandColor.trim(),
    };
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const url = form.id
      ? `/api/deal-analyzer/admin/agents/${form.id}`
      : "/api/deal-analyzer/admin/agents";
    const method = form.id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(buildPayload()),
    });

    const data = (await res.json()) as { error?: string };
    setSaving(false);

    if (!res.ok) {
      setError(data.error ?? "Could not save agent.");
      return;
    }

    const savedId = form.id;
    const listRes = await fetch("/api/deal-analyzer/admin/agents", {
      credentials: "include",
    });
    if (listRes.ok) {
      const listData = (await listRes.json()) as { stats?: AgentDashboardStats[] };
      if (listData.stats) {
        setStats(listData.stats);
        if (savedId) {
          const row = listData.stats.find((s) => s.id === savedId);
          if (row) setForm(statsToForm(row));
        } else {
          setForm(emptyForm);
        }
      }
    } else if (!savedId) {
      setForm(emptyForm);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this partner agent? Reports keep their data.")) {
      return;
    }
    const res = await fetch(`/api/deal-analyzer/admin/agents/${id}`, {
      method: "DELETE",
      credentials: "include",
    });
    if (!res.ok) {
      const data = (await res.json()) as { error?: string };
      setError(data.error ?? "Could not delete agent.");
      return;
    }
    if (form.id === id) setForm(emptyForm);
    await refresh();
  }

  async function copyPartnerLink(slug: string) {
    const link = partnerLink(siteUrl, slug);
    await navigator.clipboard.writeText(link);
    setCopiedSlug(slug);
    window.setTimeout(() => setCopiedSlug(null), 2000);
  }

  async function handleLogout() {
    await fetch("/api/deal-analyzer/admin/auth", { method: "DELETE" });
    router.refresh();
  }

  return (
    <AdminShell
      sidebar={sidebar}
      headerActions={
        <Button type="button" variant="ghost" size="sm" onClick={handleLogout}>
          Sign out
        </Button>
      }
    >
      <div className="space-y-8">
        <div>
          <h2 className="text-lg font-medium text-white">Partner agents</h2>
          <p className="text-sm text-zinc-500">
            Co-branded financing tools, invite kits, and performance tracking per agent.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-5 md:grid-cols-2"
        >
          <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase md:col-span-2">
            {form.id ? "Edit agent" : "Add agent"}
          </p>
          {error ? (
            <p
              className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 md:col-span-2"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <div className="space-y-2 md:col-span-2">
            <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
              Core
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-name">Name</Label>
            <Input
              id="agent-name"
              required
              value={form.name}
              onChange={(e) => handleNameChange(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-email">Email</Label>
            <Input
              id="agent-email"
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-phone">Phone</Label>
            <Input
              id="agent-phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-company">Company</Label>
            <Input
              id="agent-company"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-slug">URL slug</Label>
            <Input
              id="agent-slug"
              required
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: slugifyAgent(e.target.value) })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-referral">Referral code</Label>
            <Input
              id="agent-referral"
              required
              value={form.referralCode}
              onChange={(e) =>
                setForm({ ...form, referralCode: e.target.value.toUpperCase() })
              }
            />
          </div>

          <div className="space-y-2 md:col-span-2">
            <p className="font-mono text-[9px] tracking-[0.18em] text-zinc-600 uppercase">
              Co-branding
            </p>
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="agent-headshot">Headshot URL</Label>
            <Input
              id="agent-headshot"
              type="url"
              placeholder="https://..."
              value={form.headshotUrl}
              onChange={(e) => setForm({ ...form, headshotUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="agent-logo">Logo URL</Label>
            <Input
              id="agent-logo"
              type="url"
              placeholder="https://..."
              value={form.logoUrl}
              onChange={(e) => setForm({ ...form, logoUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="agent-bio">Bio</Label>
            <Textarea
              id="agent-bio"
              rows={3}
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-brokerage">Brokerage</Label>
            <Input
              id="agent-brokerage"
              value={form.brokerage}
              onChange={(e) => setForm({ ...form, brokerage: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-brand-color">Brand color (hex)</Label>
            <Input
              id="agent-brand-color"
              placeholder="#c9a227"
              value={form.brandColor}
              onChange={(e) => setForm({ ...form, brandColor: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-cta-phone">CTA phone</Label>
            <Input
              id="agent-cta-phone"
              value={form.ctaPhone}
              onChange={(e) => setForm({ ...form, ctaPhone: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="agent-cta-email">CTA email</Label>
            <Input
              id="agent-cta-email"
              type="email"
              value={form.ctaEmail}
              onChange={(e) => setForm({ ...form, ctaEmail: e.target.value })}
            />
          </div>

          {form.slug ? (
            <div className="flex flex-wrap gap-2 md:col-span-2">
              <Link
                href={partnerLandingPath(form.slug)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="button" variant="ghost" size="sm">
                  Preview partner page
                </Button>
              </Link>
              <Link
                href={partnerSampleReportPath(form.slug)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button type="button" variant="ghost" size="sm">
                  Preview sample report
                </Button>
              </Link>
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2 md:col-span-2">
            <Button type="submit" variant="gold" disabled={saving}>
              {saving ? "Saving…" : form.id ? "Update agent" : "Add agent"}
            </Button>
            {form.id ? (
              <Button type="button" variant="ghost" onClick={startCreate}>
                Cancel edit
              </Button>
            ) : null}
          </div>
        </form>

        {inviteAgent ? (
          <>
            <AdminAgentLandingKit
              agent={{ name: inviteAgent.name, slug: inviteAgent.slug }}
              siteUrl={siteUrl}
              landingPageStats={selectedLandingStats}
            />
            <AdminAgentInviteKit agent={inviteAgent} siteUrl={siteUrl} />
          </>
        ) : null}

        <div className="overflow-x-auto rounded-2xl border border-white/[0.06]">
          <table className="w-full min-w-[1100px] text-left text-sm">
            <thead>
              <tr className="border-b border-white/[0.06] font-mono text-[9px] tracking-[0.16em] text-zinc-500 uppercase">
                <th className="px-4 py-3">Agent</th>
                <th className="px-4 py-3">Reports</th>
                <th className="px-4 py-3">Leads</th>
                <th className="px-4 py-3">Landing views</th>
                <th className="px-4 py-3">Landing leads</th>
                <th className="px-4 py-3">Appts</th>
                <th className="px-4 py-3">Conv.</th>
                <th className="px-4 py-3">Partner link</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-10 text-center text-zinc-500">
                    No partner agents yet.
                  </td>
                </tr>
              ) : (
                stats.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-white/[0.04] align-top hover:bg-white/[0.02]"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {row.headshotUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={row.headshotUrl}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover"
                          />
                        ) : null}
                        <div>
                          <p className="font-medium text-white">{row.name}</p>
                          <p className="text-xs text-zinc-500">{row.email}</p>
                          {row.brokerage || row.company ? (
                            <p className="text-xs text-zinc-600">
                              {row.brokerage ?? row.company}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-zinc-300">{row.totalReports}</td>
                    <td className="px-4 py-3 text-zinc-300">{row.totalLeads}</td>
                    <td className="px-4 py-3 text-zinc-300">
                      {row.landingPageStats.reduce((n, s) => n + s.views, 0)}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">
                      {row.landingPageStats.reduce((n, s) => n + s.leads, 0)}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">
                      {row.appointmentSetCount}
                    </td>
                    <td className="px-4 py-3 text-zinc-300">{row.conversionRate}%</td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        className="font-mono text-[9px] tracking-[0.14em] text-[#c9a227] uppercase hover:text-[#e8c547]"
                        onClick={() => void copyPartnerLink(row.slug)}
                      >
                        {copiedSlug === row.slug ? "Copied" : "Copy link"}
                      </button>
                      <p className="mt-1 max-w-[200px] truncate text-[10px] text-zinc-600">
                        {partnerLink(siteUrl, row.slug)}
                      </p>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1">
                        <button
                          type="button"
                          className="text-left text-xs text-zinc-400 hover:text-white"
                          onClick={() => startEdit(row)}
                        >
                          Edit
                        </button>
                        <Link
                          href={partnerLandingPath(row.slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-500 hover:text-zinc-300"
                        >
                          Preview page
                        </Link>
                        <Link
                          href={partnerSampleReportPath(row.slug)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-zinc-500 hover:text-zinc-300"
                        >
                          Sample report
                        </Link>
                        <button
                          type="button"
                          className="text-left text-xs text-red-400/80 hover:text-red-300"
                          onClick={() => void handleDelete(row.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
