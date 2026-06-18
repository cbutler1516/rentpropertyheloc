import { BRAND, BRAND_ASSETS, OG_IMAGE_ASPECT } from "@/lib/brand";

export const DEFAULT_OG_IMAGE = {
  url: BRAND_ASSETS.og,
  width: OG_IMAGE_ASPECT.width,
  height: OG_IMAGE_ASPECT.height,
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
