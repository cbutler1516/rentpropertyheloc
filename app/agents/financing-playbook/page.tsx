import {
  MoneyFunnelPage,
  createMoneyFunnelMetadata,
} from "../../components/money-funnel-page";
import { moneyFunnels } from "../../lib/money-funnels";

const funnel = moneyFunnels.agentFinancingPlaybook;

export const metadata = createMoneyFunnelMetadata(funnel);

export default function AgentFinancingPlaybookFunnelPage() {
  return <MoneyFunnelPage funnel={funnel} />;
}
