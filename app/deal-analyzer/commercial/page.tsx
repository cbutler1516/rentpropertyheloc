import {
  createSeoLandingGenerateMetadata,
  createSeoLandingPage,
} from "../lib/seo-landing-route";

export const generateMetadata = createSeoLandingGenerateMetadata("commercial");
export default createSeoLandingPage("commercial");
