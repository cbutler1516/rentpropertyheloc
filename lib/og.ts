import { BRAND, BRAND_ASSETS, LOGO_LIGHT_ASPECT } from "@/lib/brand";

export const DEFAULT_OG_IMAGE = {
  url: BRAND_ASSETS.light,
  width: LOGO_LIGHT_ASPECT.width,
  height: LOGO_LIGHT_ASPECT.height,
  alt: BRAND.name,
} as const;

export function getDefaultOpenGraphImages() {
  return [
    {
      url: DEFAULT_OG_IMAGE.url,
      width: DEFAULT_OG_IMAGE.width,
      height: DEFAULT_OG_IMAGE.height,
      alt: DEFAULT_OG_IMAGE.alt,
    },
  ];
}

export function getDefaultTwitterImages() {
  return [DEFAULT_OG_IMAGE.url];
}
