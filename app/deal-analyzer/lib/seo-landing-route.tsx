import { DealAnalyzerSeoLanding } from "../components/deal-analyzer-seo-landing";
import {
  buildSeoLandingMetadata,
  getSeoLandingContent,
  type SeoLandingSlug,
} from "./seo-landing-content";

export function createSeoLandingPage(slug: SeoLandingSlug) {
  return function SeoLandingPage() {
    return <DealAnalyzerSeoLanding content={getSeoLandingContent(slug)} />;
  };
}

export function createSeoLandingGenerateMetadata(slug: SeoLandingSlug) {
  return function generateMetadata() {
    return buildSeoLandingMetadata(slug);
  };
}
