import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/app/deal-analyzer/lib/admin/auth";
import {
  defaultAdminFilters,
  type DealAnalyzerAdminFilters,
} from "@/app/deal-analyzer/lib/admin/types";
import {
  fetchDealAnalyzerDashboard,
  getAgentSourcedLeads,
  getMissingContactReports,
  getTopOpportunities,
} from "@/app/deal-analyzer/lib/supabase/dashboard";
import type { ClientRole, DealPath } from "@/app/deal-analyzer/lib/types";

function parseFilters(searchParams: URLSearchParams): DealAnalyzerAdminFilters {
  return {
    search: searchParams.get("search") ?? defaultAdminFilters.search,
    role: (searchParams.get("role") as ClientRole | "all" | null) ?? "all",
    dealType: (searchParams.get("dealType") as DealPath | "all" | null) ?? "all",
    datePreset:
      (searchParams.get("datePreset") as DealAnalyzerAdminFilters["datePreset"] | null) ??
      "all",
    dateFrom: searchParams.get("dateFrom") ?? "",
    dateTo: searchParams.get("dateTo") ?? "",
    needsFollowUp: searchParams.get("needsFollowUp") === "true",
    crmPush:
      (searchParams.get("crmPush") as DealAnalyzerAdminFilters["crmPush"] | null) ??
      "all",
  };
}

export async function GET(request: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const filters = parseFilters(new URL(request.url).searchParams);
  const allResult = await fetchDealAnalyzerDashboard();
  if ("error" in allResult) {
    return NextResponse.json({ error: allResult.error }, { status: 500 });
  }

  const { filterDealAnalyzerReports } = await import(
    "@/app/deal-analyzer/lib/supabase/dashboard"
  );
  const filtered = filterDealAnalyzerReports(allResult.reports, filters);

  return NextResponse.json({
    stats: allResult.stats,
    reports: filtered,
    configured: allResult.configured,
    highlights: {
      topOpportunities: getTopOpportunities(allResult.reports, 5),
      agentSourced: getAgentSourcedLeads(allResult.reports).slice(0, 8),
      missingContact: getMissingContactReports(allResult.reports).slice(0, 8),
    },
  });
}
