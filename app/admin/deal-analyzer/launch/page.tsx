import {
  isAdminAuthenticated,
  isAdminPasswordConfigured,
} from "@/app/deal-analyzer/lib/admin/auth";
import { getSiteUrl } from "@/app/deal-analyzer/lib/supabase/env";
import { AdminLaunchReadiness } from "../components/admin-launch-readiness";
import { AdminLogin } from "../components/admin-login";

export const dynamic = "force-dynamic";

export default async function DealAnalyzerLaunchPage() {
  if (!isAdminPasswordConfigured()) {
    return <AdminLogin misconfigured />;
  }

  if (!(await isAdminAuthenticated())) {
    return <AdminLogin />;
  }

  const siteUrl =
    getSiteUrl() ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://theloanplaybook.com";

  return <AdminLaunchReadiness siteUrl={siteUrl} />;
}
