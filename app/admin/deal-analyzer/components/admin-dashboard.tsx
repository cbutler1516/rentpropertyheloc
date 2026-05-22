"use client";

import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/app/components/ui/button";
import {
  defaultAdminFilters,
  type DealAnalyzerAdminFilters,
  type DealAnalyzerDashboardStats,
  type DealAnalyzerReportRow,
} from "@/app/deal-analyzer/lib/admin/types";
import { AdminBreakdown } from "./admin-breakdown";
import { AdminFilters } from "./admin-filters";
import { AdminHighlights } from "./admin-highlights";
import { AdminFollowUpDrawer } from "./admin-follow-up-drawer";
import { AdminReportsTable } from "./admin-reports-table";
import { AdminShell } from "./admin-shell";
import { AdminAnalyticsPanel } from "./admin-analytics-panel";
import { AdminCrmPanel } from "./admin-crm-panel";
import { AdminStatCards } from "./admin-stat-cards";

type DashboardHighlights = {
  topOpportunities: DealAnalyzerReportRow[];
  agentSourced: DealAnalyzerReportRow[];
  missingContact: DealAnalyzerReportRow[];
};

type DashboardResponse = {
  stats: DealAnalyzerDashboardStats;
  reports: DealAnalyzerReportRow[];
  configured: boolean;
  highlights: DashboardHighlights;
  error?: string;
};

type AdminDashboardProps = {
  siteUrl: string;
  initialData: DashboardResponse;
};

function buildQuery(filters: DealAnalyzerAdminFilters): string {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.role !== "all") params.set("role", filters.role);
  if (filters.dealType !== "all") params.set("dealType", filters.dealType);
  if (filters.datePreset !== "all") params.set("datePreset", filters.datePreset);
  if (filters.dateFrom) params.set("dateFrom", filters.dateFrom);
  if (filters.dateTo) params.set("dateTo", filters.dateTo);
  if (filters.needsFollowUp) params.set("needsFollowUp", "true");
  if (filters.crmPush !== "all") params.set("crmPush", filters.crmPush);
  return params.toString();
}

export function AdminDashboard({ siteUrl, initialData }: AdminDashboardProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<DealAnalyzerAdminFilters>(defaultAdminFilters);
  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [followUpRow, setFollowUpRow] = useState<DealAnalyzerReportRow | null>(
    null,
  );

  const fetchDashboard = useCallback(async (nextFilters: DealAnalyzerAdminFilters) => {
    setLoading(true);
    try {
      const qs = buildQuery(nextFilters);
      const res = await fetch(
        `/api/deal-analyzer/admin/dashboard${qs ? `?${qs}` : ""}`,
        { credentials: "include" },
      );
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const json = (await res.json()) as DashboardResponse;
      if (!res.ok) {
        setData((prev) => ({ ...prev, error: json.error ?? "Failed to load dashboard." }));
        return;
      }
      setData(json);
    } catch {
      setData((prev) => ({ ...prev, error: "Could not load dashboard data." }));
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchDashboard(filters);
    }, 300);
    return () => window.clearTimeout(timer);
  }, [filters, fetchDashboard]);

  const sidebar = useMemo(
    () => (
      <ul className="space-y-1 text-sm text-zinc-400">
        <li className="rounded-lg bg-[#7c3aed]/10 px-3 py-2 text-[#c4b5fd]">
          Overview & analytics
        </li>
        <li>
          <Link
            href="/admin/market-center"
            className="block rounded-lg px-3 py-2 hover:bg-white/[0.04] hover:text-zinc-200"
          >
            Market Brief
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
        <li className="px-3 py-2">Recent reports</li>
        <li className="px-3 py-2">Lead scoring</li>
      </ul>
    ),
    [],
  );

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
        {!data.configured ? (
          <p className="rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
            Supabase is not configured — connect env vars to load live leads.
          </p>
        ) : null}

        {data.error ? (
          <p className="text-sm text-red-400" role="alert">
            {data.error}
          </p>
        ) : null}

        <AdminStatCards stats={data.stats} />
        <AdminAnalyticsPanel />
        <AdminBreakdown stats={data.stats} />
        <AdminHighlights
          topOpportunities={data.highlights.topOpportunities}
          agentSourced={data.highlights.agentSourced}
          missingContact={data.highlights.missingContact}
        />

        <AdminCrmPanel onPushComplete={() => void fetchDashboard(filters)} />

        <section className="space-y-4">
          <div>
            <h2 className="text-lg font-medium text-white">Recent reports</h2>
            <p className="text-sm text-zinc-500">
              Lead score and suggested follow-up are generated from each scenario.
              {loading ? " Updating…" : null}
            </p>
          </div>
          <AdminFilters
            filters={filters}
            onChange={setFilters}
            resultCount={data.reports.length}
          />
          <AdminReportsTable
            reports={data.reports}
            siteUrl={siteUrl}
            onOpenFollowUp={(row) => {
              setFollowUpRow(row);
              setDrawerOpen(true);
            }}
            onCrmPushComplete={() => void fetchDashboard(filters)}
          />
        </section>
      </div>

      <AdminFollowUpDrawer
        row={followUpRow}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onSaved={() => void fetchDashboard(filters)}
      />
    </AdminShell>
  );
}
