import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/placeholder-page";

export const metadata = placeholderMetadata(
  "Disclosures",
  "Important disclosures for RentPropertyHELOC.com visitors.",
);

export default function DisclosuresPage() {
  return (
    <PlaceholderPage
      title="Disclosures"
      description="Licensing, advertising, and program disclosures will be listed here. All offers are subject to approval and lender guidelines."
    />
  );
}
