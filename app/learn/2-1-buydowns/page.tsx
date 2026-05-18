import {
  MoneyFunnelPage,
  createMoneyFunnelMetadata,
} from "../../components/money-funnel-page";
import { moneyFunnels } from "../../lib/money-funnels";

const funnel = moneyFunnels.twoOneBuydowns;

export const metadata = createMoneyFunnelMetadata(funnel);

export default function TwoOneBuydownsFunnelPage() {
  return <MoneyFunnelPage funnel={funnel} />;
}
