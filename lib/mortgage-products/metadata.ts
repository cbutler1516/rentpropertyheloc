import { buildSeoMetadata } from "@/lib/seo/metadata";
import type { MortgageProductConfig } from "@/lib/mortgage-products/types";
import type { SeoPageConfig } from "@/lib/seo/types";

/** Adapt mortgage product config for shared SEO metadata builder */
export function toSeoMetadataConfig(config: MortgageProductConfig): SeoPageConfig {
  return {
    path: config.path,
    metadata: config.metadata,
    hero: {
      eyebrow: config.hero.eyebrow,
      h1: config.hero.h1,
      intro: config.hero.intro,
    },
    whatItIs: { title: "", paragraphs: [] },
    whoItFits: { title: "", items: [] },
    useCases: { title: "", items: [] },
    process: { title: "", steps: [] },
    faqs: config.faqs,
    relatedPaths: config.relatedPaths,
    service: config.service,
  };
}

export function buildMortgageProductMetadata(config: MortgageProductConfig) {
  return buildSeoMetadata(toSeoMetadataConfig(config));
}
