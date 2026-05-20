import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deal Analyzer Admin",
  robots: { index: false, follow: false },
};

export default function DealAnalyzerAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
