import {
  isAdminAuthenticated,
  isAdminPasswordConfigured,
} from "@/app/deal-analyzer/lib/admin/auth";
import { AdminLogin } from "@/app/admin/deal-analyzer/components/admin-login";
import { getMarketCenterStoreSnapshot } from "@/app/lib/market-center";
import { MarketCenterAdmin } from "./components/market-center-admin";

export const dynamic = "force-dynamic";

export default async function MarketCenterAdminPage() {
  if (!isAdminPasswordConfigured()) {
    return <AdminLogin misconfigured />;
  }

  if (!(await isAdminAuthenticated())) {
    return <AdminLogin />;
  }

  const initialSnapshot = getMarketCenterStoreSnapshot();

  return <MarketCenterAdmin initialSnapshot={initialSnapshot} />;
}
