import {
  isAdminAuthenticated,
  isAdminPasswordConfigured,
} from "@/app/deal-analyzer/lib/admin/auth";
import { getSiteUrl } from "@/app/deal-analyzer/lib/supabase/env";
import { fetchAgentDashboardStats } from "@/app/deal-analyzer/lib/supabase/agents";
import { AdminLaunchPack } from "../components/admin-launch-pack";
import { AdminLogin } from "../components/admin-login";

export const dynamic = "force-dynamic";

export default async function DealAnalyzerLaunchPackPage() {
  if (!isAdminPasswordConfigured()) {
    return <AdminLogin misconfigured />;
  }

  if (!(await isAdminAuthenticated())) {
    return <AdminLogin />;
  }

  const statsResult = await fetchAgentDashboardStats();
  const agents = "error" in statsResult ? [] : statsResult;

  const siteUrl =
    getSiteUrl() ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://theloanplaybook.com";

  return <AdminLaunchPack siteUrl={siteUrl} initialAgents={agents} />;
}
