import {
  MoneyFunnelPage,
  createMoneyFunnelMetadata,
} from "../../components/money-funnel-page";
import { moneyFunnels } from "../../lib/money-funnels";

const funnel = moneyFunnels.helocStrategy;

export const metadata = createMoneyFunnelMetadata(funnel);

export default function HelocStrategyFunnelPage() {
  return <MoneyFunnelPage funnel={funnel} />;
}
