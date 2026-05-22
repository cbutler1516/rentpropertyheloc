import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/placeholder-page";

export const metadata = placeholderMetadata(
  "Terms of Use",
  "Terms governing use of RentPropertyHELOC.com.",
);

export default function TermsPage() {
  return (
    <PlaceholderPage
      title="Terms of Use"
      description="Terms of use for this website will be published here, including limitations of liability and acceptable use."
    />
  );
}
