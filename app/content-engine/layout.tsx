import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Content Engine | The Loan Playbook",
  description:
    "Turn market updates, transcripts, and borrower scenarios into 12-channel mortgage content packages.",
  robots: { index: false, follow: false },
};

export default function ContentEngineLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
