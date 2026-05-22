"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import type {
  LaunchCheckResult,
  LaunchCheckStatus,
  LaunchReadinessReport,
} from "@/app/deal-analyzer/lib/admin/launch-types";
import { AdminShell } from "./admin-shell";

const STATUS_STYLES: Record<LaunchCheckStatus, string> = {
  pass: "text-emerald-400",
  warn: "text-amber-300",
  fail: "text-red-400",
  skip: "text-zinc-500",
  manual: "text-[#c4b5fd]",
};

const STATUS_LABELS: Record<LaunchCheckStatus, string> = {
  pass: "Pass",
  warn: "Warn",
  fail: "Fail",
  skip: "Skip",
  manual: "Manual",
};

const GO_LIVE_ITEMS = [
  "All required env vars set in production",
  "Migrations 001–007 applied in Supabase",
  "ADMIN_DEAL_ANALYZER_PASSWORD rotated from dev default",
  "NEXT_PUBLIC_SITE_URL matches live domain",
  "CRM webhooks tested with admin test push",
  "Full funnel tested on mobile + desktop",
  "Privacy policy and disclaimers reviewed",
  "robots.txt and sitemap verified in Search Console",
];

const KNOWN_LIMITATIONS = [
  "Reports without Supabase only persist in the same browser (localStorage fallback).",
  "OpenAI narratives fall back to static copy when OPENAI_API_KEY is unset.",
  "CRM push requires at least one webhook URL; failures are stored on the report row.",
  "Partner calculator landings require a valid agent slug in admin.",
  "PDF export uses the browser print dialog — layout varies by browser.",
  "Event analytics require migration 007 and Supabase service role for writes.",
  "Report share URLs are not indexed (noindex) — intentional for lead privacy.",
];

function StatusBadge({ status }: { status: LaunchCheckStatus }) {
  return (
    <span
      className={`font-mono text-[9px] tracking-[0.14em] uppercase ${STATUS_STYLES[status]}`}
    >
      {STATUS_LABELS[status]}
    </span>
  );
}

function CheckList({ checks }: { checks: LaunchCheckResult[] }) {
  return (
    <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06]">
      {checks.map((c) => (
        <li key={c.id} className="px-4 py-3">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <p className="text-sm font-medium text-zinc-200">{c.label}</p>
            <StatusBadge status={c.status} />
          </div>
          {c.message ? (
            <p className="mt-1 text-xs leading-relaxed text-zinc-500">{c.message}</p>
          ) : null}
          {c.fix ? (
            <p className="mt-1 text-xs text-amber-200/80">Fix: {c.fix}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

type AdminLaunchReadinessProps = {
  siteUrl: string;
};

export function AdminLaunchReadiness({ siteUrl }: AdminLaunchReadinessProps) {
  const router = useRouter();
  const [report, setReport] = useState<LaunchReadinessReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [crmTesting, setCrmTesting] = useState(false);
  const [crmMessage, setCrmMessage] = useState<string | null>(null);
  const [checkedGoLive, setCheckedGoLive] = useState<Record<number, boolean>>({});

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/deal-analyzer/admin/launch", {
        credentials: "include",
      });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const data = (await res.json()) as LaunchReadinessReport & { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Could not run readiness checks.");
        return;
      }
      setReport(data);
    } catch {
      setError("Network error while loading readiness report.");
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void load();
  }, [load]);

  async function runCrmTest() {
    setCrmTesting(true);
    setCrmMessage(null);
    try {
      const res = await fetch("/api/deal-analyzer/admin/crm/test", {
        method: "POST",
        credentials: "include",
      });
      const data = (await res.json()) as { message?: string; error?: string };
      setCrmMessage(
        res.ok
          ? (data.message ?? "Test push succeeded.")
          : (data.error ?? data.message ?? "Test push failed."),
      );
    } catch {
      setCrmMessage("Could not reach CRM test endpoint.");
    } finally {
      setCrmTesting(false);
    }
  }

  const partnerSlug = report?.samplePartnerSlug;
  const base = siteUrl.replace(/\/$/, "");

  const funnelLinks = [
    { label: "Standard analyzer", href: `${base}/deal-analyzer/analyze` },
    { label: "SEO landing (homebuyer)", href: `${base}/deal-analyzer/homebuyer` },
    { label: "Admin dashboard", href: `${base}/admin/deal-analyzer` },
    ...(partnerSlug
      ? [
          {
            label: "Partner analyzer",
            href: `${base}/partners/${partnerSlug}/deal-analyzer/analyze`,
          },
          {
            label: "Partner SEO (homebuyer)",
            href: `${base}/partners/${partnerSlug}/deal-analyzer/homebuyer`,
          },
        ]
      : []),
  ];

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
      <li className="rounded-lg bg-[#7c3aed]/10 px-3 py-2 text-[#c4b5fd]">
        Launch readiness
      </li>
      <li>
        <Link
          href="/admin/deal-analyzer/launch-pack"
          className="block rounded-lg px-3 py-2 hover:bg-white/[0.04] hover:text-zinc-200"
        >
          Launch pack
        </Link>
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

  return (
    <AdminShell
      sidebar={sidebar}
      headerActions={
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="ghost" size="sm" onClick={() => void load()}>
            {loading ? "Checking…" : "Re-run checks"}
          </Button>
          <Button type="button" variant="ghost" size="sm" onClick={handleLogout}>
            Sign out
          </Button>
        </div>
      }
    >
      <div className="space-y-10">
        <div>
          <h2 className="text-lg font-medium text-white">Production launch readiness</h2>
          <p className="mt-1 text-sm text-zinc-500">
            Env health, migrations, SEO, CRM, and manual test checklists before go-live.
            {report?.generatedAt
              ? ` Last run ${new Date(report.generatedAt).toLocaleString()}.`
              : null}
          </p>
        </div>

        {error ? (
          <p className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        ) : null}

        {loading && !report ? (
          <p className="text-sm text-zinc-500">Running readiness checks…</p>
        ) : null}

        {report ? (
          <>
            <div className="flex flex-wrap gap-4 font-mono text-[10px] tracking-[0.16em] uppercase">
              <span className="text-emerald-400">{report.summary.pass} pass</span>
              <span className="text-amber-300">{report.summary.warn} warn</span>
              <span className="text-red-400">{report.summary.fail} fail</span>
              <span className="text-zinc-500">{report.summary.skip} skip</span>
              <span className="text-[#c4b5fd]">{report.summary.manual} manual</span>
            </div>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white">Required env vars</h3>
                <ul className="space-y-2 rounded-xl border border-white/[0.06] p-4 text-sm">
                  {report.env.required.map((v) => (
                    <li key={v.name} className="flex justify-between gap-2">
                      <code className="text-zinc-400">{v.name}</code>
                      <StatusBadge status={v.configured ? "pass" : "fail"} />
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white">Optional env vars</h3>
                <ul className="space-y-2 rounded-xl border border-white/[0.06] p-4 text-sm">
                  {report.env.optional.map((v) => (
                    <li key={v.name} className="flex justify-between gap-2">
                      <code className="text-zinc-400">{v.name}</code>
                      <StatusBadge status={v.configured ? "pass" : "warn"} />
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-medium text-white">
                Supabase migrations (001–007)
              </h3>
              <ul className="divide-y divide-white/[0.06] rounded-xl border border-white/[0.06]">
                {report.migrations.map((m) => (
                  <li key={m.version} className="flex flex-wrap items-center justify-between gap-2 px-4 py-3">
                    <div>
                      <p className="text-sm text-zinc-200">
                        {m.version} — {m.label}
                      </p>
                      <p className="font-mono text-[10px] text-zinc-600">{m.file}</p>
                    </div>
                    <StatusBadge status={m.status} />
                  </li>
                ))}
              </ul>
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-medium text-white">Automated checks</h3>
              <CheckList checks={report.checks} />
            </section>

            <section className="space-y-4">
              <h3 className="text-sm font-medium text-white">Test funnel links</h3>
              {!partnerSlug ? (
                <p className="text-xs text-amber-200/90">
                  Add a partner agent in admin to enable partner test links.
                </p>
              ) : null}
              <div className="flex flex-wrap gap-2">
                {funnelLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-zinc-700 px-4 py-2 font-mono text-[9px] tracking-[0.14em] text-zinc-300 uppercase hover:border-[#7c3aed]/50"
                  >
                    {link.label} ↗
                  </Link>
                ))}
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button
                  type="button"
                  variant="gold"
                  size="sm"
                  disabled={crmTesting}
                  onClick={() => void runCrmTest()}
                >
                  {crmTesting ? "Sending…" : "CRM test push"}
                </Button>
                <Link
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase hover:text-zinc-300"
                >
                  Open sitemap.xml ↗
                </Link>
                <Link
                  href="/robots.txt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase hover:text-zinc-300"
                >
                  Open robots.txt ↗
                </Link>
              </div>
              {crmMessage ? (
                <p className="text-xs text-zinc-400">{crmMessage}</p>
              ) : null}
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white">Go-live checklist</h3>
                <ul className="space-y-2 rounded-xl border border-[#7c3aed]/20 bg-[#7c3aed]/5 p-4">
                  {GO_LIVE_ITEMS.map((item, i) => (
                    <li key={item}>
                      <label className="flex cursor-pointer gap-3 text-sm text-zinc-300">
                        <input
                          type="checkbox"
                          checked={Boolean(checkedGoLive[i])}
                          onChange={(e) =>
                            setCheckedGoLive((prev) => ({
                              ...prev,
                              [i]: e.target.checked,
                            }))
                          }
                          className="mt-0.5 h-4 w-4 rounded border-zinc-600"
                        />
                        {item}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="text-sm font-medium text-white">Known limitations</h3>
                <ul className="list-inside list-disc space-y-2 rounded-xl border border-white/[0.06] p-4 text-sm text-zinc-500">
                  {KNOWN_LIMITATIONS.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        ) : null}
      </div>
    </AdminShell>
  );
}
