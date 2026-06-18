import type { SeoFaqItem } from "@/lib/seo/types";

export type MortgageProductScenario = {
  title: string;
  description: string;
};

export type MortgageProductConfig = {
  path: string;
  metadata: {
    title: string;
    description: string;
    ogTitle?: string;
    ogDescription?: string;
  };
  hero: {
    eyebrow: string;
    h1: string;
    intro: string;
  };
  whoItsFor: {
    title: string;
    intro?: string;
    items: string[];
  };
  benefits: {
    title: string;
    items: string[];
  };
  considerations: {
    title: string;
    items: string[];
  };
  scenarios: {
    title: string;
    items: MortgageProductScenario[];
  };
  faqs: SeoFaqItem[];
  relatedPaths: string[];
  service: {
    name: string;
    description: string;
  };
};
