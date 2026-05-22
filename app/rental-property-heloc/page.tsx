import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/placeholder-page";

export const metadata = placeholderMetadata(
  "Rental Property HELOC",
  "Revolving equity lines secured by rental properties may be available for qualifying investors.",
);

export default function RentalPropertyHelocPage() {
  return (
    <PlaceholderPage
      title="Rental property HELOC"
      description="Access revolving capacity on rental collateral for acquisitions, renovations, reserves, or balance-sheet flexibility—programs may be available, subject to approval."
    />
  );
}
