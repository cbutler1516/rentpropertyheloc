import {
  MoneyFunnelPage,
  createMoneyFunnelMetadata,
} from "../../components/money-funnel-page";
import { moneyFunnels } from "../../lib/money-funnels";

const funnel = moneyFunnels.sellerConcessions;

export const metadata = createMoneyFunnelMetadata(funnel);

export default function SellerConcessionsFunnelPage() {
  return <MoneyFunnelPage funnel={funnel} />;
}
