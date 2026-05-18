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
      lead="A simple operating system for lending decisions."
      focus="Read the conditions. Design the file. Execute with control."
      strategyVisual="multi-strategy"
      heroVideoSrc="/videos/loan-playbook-tennis-about.mp4"
      sections={[
        {
          label: "Scout",
          title: "Read the field",
          body: "Understand conditions, constraints, preferences, and timing.",
        },
        {
          label: "Plan",
          title: "Design the sequence",
          body: "Sequence documents, cash, credit, property, and risk before submission.",
        },
        {
          label: "Execute",
          title: "Control the move",
          body: "Move with intention instead of reacting to every request.",
        },
      ]}
      closing={{
        title: "Strategy is the operating system.",
        body: "Buying, refinancing, investing, or scaling: know the field first.",
      }}
    />
  );
}
