export type { HeroVideo, SocialPost, SocialPostAudience } from "./hero-videos";
export {
  getHeroVideoBySlug as getSocialPostBySlug,
  getPublishedHeroVideos,
  heroVideos as socialPosts,
  isPublishedHeroSlug,
  legacyVideoSlugAliases,
  resolveVideoSlug,
} from "./hero-videos";
