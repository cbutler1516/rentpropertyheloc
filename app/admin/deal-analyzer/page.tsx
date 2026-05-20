import {
  isAdminAuthenticated,
  isAdminPasswordConfigured,
} from "@/app/deal-analyzer/lib/admin/auth";

export const dynamic = "force-dynamic";
import {
  fetchDealAnalyzerDashboard,
  getAgentSourcedLeads,
  getMissingContactReports,
  getTopOpportunities,
} from "@/app/deal-analyzer/lib/supabase/dashboard";
import { getSiteUrl } from "@/app/deal-analyzer/lib/supabase/env";
import { AdminDashboard } from "./components/admin-dashboard";
import { AdminLogin } from "./components/admin-login";

export default async function DealAnalyzerAdminPage() {
  if (!isAdminPasswordConfigured()) {
    return <AdminLogin misconfigured />;
  }

  if (!(await isAdminAuthenticated())) {
    return <AdminLogin />;
  }

  const result = await fetchDealAnalyzerDashboard();

  if ("error" in result) {
    const siteUrl =
      getSiteUrl() ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://theloanplaybook.com";
    return (
      <AdminDashboard
        siteUrl={siteUrl}
        initialData={{
          stats: {
            totalReports: 0,
            newLeadsThisWeek: 0,
            leadTypeBreakdown: [],
            dealTypeBreakdown: [],
            agentSourcedCount: 0,
            missingContactCount: 0,
          },
          reports: [],
          configured: true,
          highlights: {
            topOpportunities: [],
            agentSourced: [],
            missingContact: [],
          },
          error: result.error,
        }}
      />
    );
  }

  const initialData = {
    stats: result.stats,
    reports: result.reports,
    configured: result.configured,
    highlights: {
      topOpportunities: getTopOpportunities(result.reports, 5),
      agentSourced: getAgentSourcedLeads(result.reports).slice(0, 8),
      missingContact: getMissingContactReports(result.reports).slice(0, 8),
    },
  };

  const siteUrl =
    getSiteUrl() ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://theloanplaybook.com";

  return <AdminDashboard siteUrl={siteUrl} initialData={initialData} />;
}
