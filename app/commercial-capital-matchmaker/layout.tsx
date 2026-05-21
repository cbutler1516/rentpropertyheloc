import type { Metadata } from "next";
import { CcmProvider } from "./components/ccm-provider";
import { CcmShell } from "./components/ccm-shell";
import { buildPageMetadata } from "../lib/site-seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Commercial Capital Strategy | Broadview Matchmaker",
  description:
    "Commercial capital strategy built around your deal. Broadview helps sponsors map banks, agency, CMBS, bridge, SBA, private credit, and specialty lending—with a preliminary strategy review.",
  path: "/commercial-capital-matchmaker",
});

export default function CommercialCapitalMatchmakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CcmProvider>
      <CcmShell>{children}</CcmShell>
    </CcmProvider>
  );
}
