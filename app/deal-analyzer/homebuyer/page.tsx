import {
  createSeoLandingGenerateMetadata,
  createSeoLandingPage,
} from "../lib/seo-landing-route";

export const generateMetadata = createSeoLandingGenerateMetadata("homebuyer");
export default createSeoLandingPage("homebuyer");
