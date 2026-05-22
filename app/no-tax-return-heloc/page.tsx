import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/placeholder-page";

export const metadata = placeholderMetadata(
  "No Tax Return HELOC",
  "Alternative documentation paths for investor HELOCs may be available on select programs.",
);

export default function NoTaxReturnHelocPage() {
  return (
    <PlaceholderPage
      title="No tax return HELOC"
      description="Some programs may allow alternative income documentation for self-employed investors and LLC owners. Availability is subject to approval and lender guidelines."
    />
  );
}
