import { LogoConceptsShowcase } from "@/components/brand/logo-concepts-showcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo Concepts",
  description: "Rent Property HELOC logo concept exploration — investor-finance identity directions.",
  robots: { index: false, follow: false },
};

export default function LogoConceptsPage() {
  return <LogoConceptsShowcase />;
}
