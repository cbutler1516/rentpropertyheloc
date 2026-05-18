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
      lead="A clearer front end for mortgage decisions."
      focus="Borrowers get tasks. The Loan Playbook gives context."
      strategyVisual="tennis-about"
      heroVideoSrc="/videos/loan-playbook-tennis-about.mp4"
      sections={[
        {
          label: "01 / Belief",
          title: "Clarity changes behavior",
          body: "Better context creates calmer decisions.",
        },
        {
          label: "02 / Method",
          title: "Strategy before submission",
          body: "Positioning and sequence matter before underwriting starts.",
        },
        {
          label: "03 / Standard",
          title: "Premium, practical, direct",
          body: "Modern enough to feel premium. Simple enough to use.",
        },
      ]}
      closing={{
        title: "A better front end for the loan process.",
        body: "Simple enough to use. Deep enough to matter.",
      }}
    />
  );
}
