export type SeoFaqItem = {
  question: string;
  answer: string;
};

export type SeoContentBlock = {
  title: string;
  paragraphs: string[];
};

export type SeoListItem = {
  title: string;
  description: string;
};

export type SeoProcessStep = {
  title: string;
  description: string;
};

export type SeoPageConfig = {
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
    highlights?: string[];
  };
  whatItIs: SeoContentBlock;
  whoItFits: {
    title: string;
    intro?: string;
    items: string[];
  };
  useCases: {
    title: string;
    items: SeoListItem[];
  };
  process: {
    title: string;
    intro?: string;
    steps: SeoProcessStep[];
  };
  secondPosition?: SeoContentBlock;
  faqs: SeoFaqItem[];
  relatedPaths: string[];
  service: {
    name: string;
    description: string;
  };
};
