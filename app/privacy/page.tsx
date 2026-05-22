import {
  PlaceholderPage,
  placeholderMetadata,
} from "@/components/layout/placeholder-page";

export const metadata = placeholderMetadata(
  "Privacy Policy",
  "How RentPropertyHELOC.com handles information submitted through this site.",
);

export default function PrivacyPage() {
  return (
    <PlaceholderPage
      title="Privacy Policy"
      description="Our privacy policy will explain what data we collect, how it is used, and your choices. Content is being prepared for publication."
    />
  );
}
