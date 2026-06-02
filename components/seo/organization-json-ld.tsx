import { buildOrganizationSchema } from "@/lib/seo/organization-schema";

export function OrganizationJsonLd() {
  const schema = buildOrganizationSchema();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
