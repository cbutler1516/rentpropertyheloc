import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/placeholder-page";

export const metadata = placeholderMetadata(
  "HELOC on Investment Property",
  "Learn how HELOC programs may be available on investment-property collateral, subject to approval.",
);

export default function HelocOnInvestmentPropertyPage() {
  return (
    <PlaceholderPage
      title="HELOC on investment property"
      description="Investor-oriented revolving lines may be available when collateral is non-owner-occupied. Eligibility, line size, and documentation are subject to approval."
    />
  );
}
