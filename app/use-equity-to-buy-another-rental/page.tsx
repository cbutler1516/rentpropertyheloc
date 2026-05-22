import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/placeholder-page";

export const metadata = placeholderMetadata(
  "Use Equity to Buy Another Rental",
  "Deploy rental equity through a HELOC to fund your next acquisition—subject to approval.",
);

export default function UseEquityToBuyAnotherRentalPage() {
  return (
    <PlaceholderPage
      title="Use equity to buy another rental"
      description="Revolving line capacity on existing rentals may help bridge down payment or closing needs for the next acquisition. All programs subject to approval."
    />
  );
}
