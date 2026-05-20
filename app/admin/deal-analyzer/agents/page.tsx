import {
  isAdminAuthenticated,
  isAdminPasswordConfigured,
} from "@/app/deal-analyzer/lib/admin/auth";
import { getSiteUrl } from "@/app/deal-analyzer/lib/supabase/env";
import { fetchAgentDashboardStats } from "@/app/deal-analyzer/lib/supabase/agents";
import { AdminLogin } from "../components/admin-login";
import { AdminAgentsManager } from "../components/admin-agents-manager";

export const dynamic = "force-dynamic";

export default async function DealAnalyzerAgentsAdminPage() {
  if (!isAdminPasswordConfigured()) {
    return <AdminLogin misconfigured />;
  }

  if (!(await isAdminAuthenticated())) {
    return <AdminLogin />;
  }

  const statsResult = await fetchAgentDashboardStats();
  const stats = "error" in statsResult ? [] : statsResult;
  const siteUrl =
    getSiteUrl() ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://theloanplaybook.com";

  return <AdminAgentsManager siteUrl={siteUrl} initialStats={stats} />;
}
