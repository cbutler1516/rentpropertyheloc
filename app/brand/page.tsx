import { BrandShowcase } from "@/components/brand/brand-showcase";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Brand System",
  description: "RentPropertyHELOC identity system — logos, marks, and application mockups.",
  robots: { index: false, follow: false },
};

export default function BrandPage() {
  return <BrandShowcase />;
}
