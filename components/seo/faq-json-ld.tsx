import { buildFaqSchema } from "@/lib/seo/schema";
import { FAQ_ITEMS } from "@/lib/home-content";

export function FaqJsonLd() {
  const schema = buildFaqSchema([...FAQ_ITEMS]);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
