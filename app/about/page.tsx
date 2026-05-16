import type { Metadata } from "next";
import { InternalPage } from "../components/internal-page";

export const metadata: Metadata = {
  title: "About | The Loan Playbook",
  description:
    "The Loan Playbook helps borrowers approach lending with strategy, clarity, and control.",
};

export default function AboutPage() {
  return (
    <InternalPage
      eyebrow="About The Playbook"
      title="Lending should feel strategic, not mysterious."
      lead="The Loan Playbook exists to make borrowing more legible, more intentional, and less reactive."
      focus="Most borrowers are handed tasks. Few are handed context. The Loan Playbook is built around the belief that better context creates better decisions."
      strategyVisual="tennis-about"
      sections={[
        {
          label: "01 / Belief",
          title: "Clarity changes behavior",
          body: "When borrowers understand the logic behind the loan process, they make calmer, sharper decisions.",
        },
        {
          label: "02 / Method",
          title: "Strategy before submission",
          body: "The work begins before the file is sent. Positioning, sequence, and risk awareness matter before underwriting starts.",
        },
        {
          label: "03 / Standard",
          title: "Premium, practical, direct",
          body: "The experience should feel modern and intelligent without making lending feel more complicated than it needs to be.",
        },
      ]}
      closing={{
        title: "A better front end for the loan process.",
        body: "The Loan Playbook is the strategic layer borrowers should have before they enter the system: simple enough to use, deep enough to matter.",
      }}
    />
  );
}
