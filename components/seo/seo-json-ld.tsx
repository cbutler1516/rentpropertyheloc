import { buildSeoPageJsonLd } from "@/lib/seo/schema";
import type { SeoPageConfig } from "@/lib/seo/types";

export function SeoJsonLd({ config }: { config: SeoPageConfig }) {
  const graphs = buildSeoPageJsonLd(config);

  return (
    <>
      {graphs.map((graph) => (
        <script
          key={String(graph["@type"])}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
      ))}
    </>
  );
}
