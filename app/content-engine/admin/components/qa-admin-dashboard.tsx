"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/app/components/ui/card";
import type {
  FunnelTestReport,
  QaCheckResult,
  QaHealthReport,
  QaStatus,
} from "@/app/content-engine/lib/admin/qa-types";

const LAST_FUNNEL_RUN_KEY = "content-engine-qa-last-funnel-run";

function statusVariant(
  status: QaStatus,
): "success" | "gold" | "warning" | "default" {
  if (status === "pass") return "success";
  if (status === "warn") return "gold";
  if (status === "fail") return "warning";
  return "default";
}

function formatTime(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(iso));
}

function CheckList({ checks }: { checks: QaCheckResult[] }) {
  if (checks.length === 0) {
    return <p className="text-sm text-zinc-500">No checks in this section.</p>;
  }

  return (
    <ul className="space-y-3">
      {checks.map((item) => (
        <li
          key={item.id}
          className="rounded-lg border border-white/[0.06] bg-black/25 px-4 py-3"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="text-sm font-medium text-zinc-200">{item.label}</span>
            <div className="flex items-center gap-2">
              {item.durationMs !== undefined && (
                <span className="font-mono text-[10px] text-zinc-500">
                  {item.durationMs}ms
                </span>
              )}
              <Badge variant={statusVariant(item.status)}>{item.status}</Badge>
            </div>
          </div>
          {item.message && (
            <p className="mt-2 text-xs text-zinc-400">{item.message}</p>
          )}
          {item.fix && (
            <p className="mt-2 text-xs text-amber-200/90">
              <span className="font-mono text-[9px] tracking-wider text-amber-400/80 uppercase">
                Fix:{" "}
              </span>
              {item.fix}
            </p>
          )}
        </li>
      ))}
    </ul>
  );
}

export function QaAdminDashboard() {
  const [health, setHealth] = useState<QaHealthReport | null>(null);
  const [healthLoading, setHealthLoading] = useState(true);
  const [healthError, setHealthError] = useState<string | null>(null);

  const [funnel, setFunnel] = useState<FunnelTestReport | null>(null);
  const [funnelLoading, setFunnelLoading] = useState(false);
  const [funnelError, setFunnelError] = useState<string | null>(null);
  const [cleanupMessage, setCleanupMessage] = useState<string | null>(null);
  const [lastFunnelRun, setLastFunnelRun] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(LAST_FUNNEL_RUN_KEY);
    if (stored) setLastFunnelRun(stored);
  }, []);

  const loadHealth = useCallback(async () => {
    setHealthLoading(true);
    setHealthError(null);
    try {
      const response = await fetch("/api/content-engine/admin/health");
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Failed to load health report.");
      }
      setHealth(data as QaHealthReport);
    } catch (err) {
      setHealthError(err instanceof Error ? err.message : "Health check failed.");
    } finally {
      setHealthLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadHealth();
  }, [loadHealth]);

  const runFunnelTest = useCallback(async () => {
    setFunnelLoading(true);
    setFunnelError(null);
    setCleanupMessage(null);
    try {
      const response = await fetch("/api/content-engine/admin/funnel-test", {
        method: "POST",
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Funnel test failed.");
      }
      const report = data as FunnelTestReport;
      setFunnel(report);
      setLastFunnelRun(report.runAt);
      localStorage.setItem(LAST_FUNNEL_RUN_KEY, report.runAt);
    } catch (err) {
      setFunnelError(err instanceof Error ? err.message : "Funnel test failed.");
    } finally {
      setFunnelLoading(false);
    }
  }, []);

  const cleanupFunnel = useCallback(async () => {
    setCleanupMessage(null);
    try {
      const response = await fetch("/api/content-engine/admin/funnel-test", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          packageId: funnel?.packageId,
          slug: funnel?.slug,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? data.message ?? "Cleanup failed.");
      }
      setCleanupMessage(data.message ?? "Cleanup complete.");
      setFunnel(null);
    } catch (err) {
      setCleanupMessage(err instanceof Error ? err.message : "Cleanup failed.");
    }
  }, [funnel?.packageId, funnel?.slug]);

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-red-300/90 uppercase">
            Internal · Admin only
          </p>
          <h1 className="mt-1 text-2xl font-medium tracking-tight">
            Production readiness & QA
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-400">
            Validates environment variables, Supabase schema, feature generators,
            and an end-to-end publish + lead funnel. Auth is not enforced yet —
            keep this URL private.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={healthLoading}
            onClick={() => void loadHealth()}
          >
            {healthLoading ? "Refreshing…" : "Refresh checks"}
          </Button>
          <Link
            href="/content-engine"
            className="inline-flex h-11 items-center rounded-full border border-zinc-700 px-6 font-mono text-[10px] tracking-[0.16em] text-zinc-300 uppercase transition-colors hover:border-[#7c3aed]/50 hover:text-white"
          >
            Content Engine
          </Link>
        </div>
      </div>

      {health && (
        <div className="flex flex-wrap gap-3">
          <Badge variant="success">{health.summary.pass} pass</Badge>
          <Badge variant="gold">{health.summary.warn} warn</Badge>
          <Badge variant="warning">{health.summary.fail} fail</Badge>
          <Badge variant="default">{health.summary.skip} skip</Badge>
          <span className="text-xs text-zinc-500">
            Report generated {formatTime(health.generatedAt)}
          </span>
        </div>
      )}

      {healthError && (
        <p className="text-sm text-red-400" role="alert">
          {healthError}
        </p>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Environment</CardTitle>
            <CardDescription>Runtime configuration for AI, Supabase, and URLs.</CardDescription>
          </CardHeader>
          <CardContent>
            {healthLoading && !health ? (
              <p className="text-sm text-zinc-500">Loading…</p>
            ) : (
              <CheckList checks={health?.environment ?? []} />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Database</CardTitle>
            <CardDescription>
              Migrations 002–013 and required tables/columns.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {healthLoading && !health ? (
              <p className="text-sm text-zinc-500">Loading…</p>
            ) : (
              <CheckList checks={health?.database ?? []} />
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Feature health</CardTitle>
          <CardDescription>
            Demo generators and integrations (no OpenAI spend required).
          </CardDescription>
        </CardHeader>
        <CardContent>
          {healthLoading && !health ? (
            <p className="text-sm text-zinc-500">Loading…</p>
          ) : (
            <CheckList checks={health?.features ?? []} />
          )}
        </CardContent>
      </Card>

      <Card className="border-red-500/20">
        <CardHeader>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <CardTitle>End-to-end funnel test</CardTitle>
              <CardDescription>
                Creates a QA package, publishes slug{" "}
                <code className="text-zinc-300">qa-funnel-test</code>, submits a
                lead, and runs compliance scan.
              </CardDescription>
            </div>
            <Button
              type="button"
              variant="gold"
              disabled={funnelLoading}
              onClick={() => void runFunnelTest()}
            >
              {funnelLoading ? "Running…" : "Run full funnel test"}
            </Button>
          </div>
          {lastFunnelRun && (
            <p className="mt-2 text-xs text-zinc-500">
              Last test run: {formatTime(lastFunnelRun)}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {funnelError && (
            <p className="text-sm text-red-400" role="alert">
              {funnelError}
            </p>
          )}
          {cleanupMessage && (
            <p className="text-sm text-emerald-400">{cleanupMessage}</p>
          )}

          {funnel && (
            <>
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant={statusVariant(funnel.overall)}>
                  Overall {funnel.overall}
                </Badge>
                <span className="text-xs text-zinc-500">
                  Package {funnel.packageId}
                </span>
              </div>
              {funnel.publishedUrl && (
                <p className="text-xs text-zinc-400">
                  Published:{" "}
                  <a
                    href={funnel.publishedUrl}
                    className="text-[#c4b5fd] underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {funnel.publishedUrl}
                  </a>
                </p>
              )}
              {funnel.previewUrl && (
                <p className="text-xs text-zinc-400">
                  Preview:{" "}
                  <a
                    href={funnel.previewUrl}
                    className="text-[#c4b5fd] underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {funnel.previewUrl}
                  </a>
                </p>
              )}
              <CheckList
                checks={funnel.steps.map((s) => ({
                  id: s.id,
                  label: s.label,
                  status: s.status,
                  message: s.message,
                  durationMs: s.durationMs,
                }))}
              />
              <Button
                type="button"
                variant="ghost"
                onClick={() => void cleanupFunnel()}
              >
                Clean up test records
              </Button>
            </>
          )}

          {!funnel && !funnelLoading && (
            <p className="text-sm text-zinc-500">
              Run the funnel test after database checks pass. Requires Supabase.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
