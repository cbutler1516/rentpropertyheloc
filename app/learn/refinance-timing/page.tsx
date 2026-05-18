import {
  MoneyFunnelPage,
  createMoneyFunnelMetadata,
} from "../../components/money-funnel-page";
import { moneyFunnels } from "../../lib/money-funnels";

const funnel = moneyFunnels.refinanceTiming;

export const metadata = createMoneyFunnelMetadata(funnel);

export default function RefinanceTimingFunnelPage() {
  return <MoneyFunnelPage funnel={funnel} />;
}
