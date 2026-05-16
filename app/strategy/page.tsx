import type { Metadata } from "next";
import { InternalPage } from "../components/internal-page";

export const metadata: Metadata = {
  title: "Strategy | The Loan Playbook",
  description:
    "The strategic framework behind The Loan Playbook: scout, plan, and execute.",
};

export default function StrategyPage() {
  return (
    <InternalPage
      eyebrow="The Framework"
      title="Scout the field. Build the sequence. Run the play."
      lead="The Loan Playbook organizes lending into a strategy system: fewer assumptions, stronger files, and better timing."
      focus="The framework is intentionally simple. Every loan move can be understood through three disciplines: read the conditions, design the file, and execute with control."
      strategyVisual="multi-strategy"
      sections={[
        {
          label: "Scout",
          title: "Read the field",
          body: "Before choosing a loan path, understand market conditions, borrower constraints, lender preferences, and timing pressure.",
        },
        {
          label: "Plan",
          title: "Design the sequence",
          body: "The strongest lending process has order. Documents, cash, credit, property, and underwriting risk should be sequenced before submission.",
        },
        {
          label: "Execute",
          title: "Control the move",
          body: "Execution is calm when the strategy is already built. The file moves with intention instead of reacting to every request.",
        },
      ]}
      closing={{
        title: "Strategy is the operating system.",
        body: "Whether the borrower is buying, refinancing, investing, or scaling, the same discipline applies: know the field before entering it.",
      }}
    />
  );
}
