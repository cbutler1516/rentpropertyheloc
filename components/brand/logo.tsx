import { cn } from "@/lib/cn";
import {
  BRAND,
  BRAND_ASSETS,
  LOGO_DARK_ASPECT,
  LOGO_FOOTER_FRAME,
  LOGO_LIGHT_ASPECT,
  LOGO_LIGHT_SECTION_FRAME,
  LOGO_NAVBAR_FRAME,
  type LogoVariant,
} from "@/lib/brand";
import Image from "next/image";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

type LogoTone = "dark" | "light";

type LogoFrame = {
  src: string;
  width: number;
  height: number;
  frameClassName: string;
};

function getLogoTone(variant: LogoVariant): LogoTone {
  if (variant === "navbar" || variant === "dark") return "dark";
  return "light";
}

function getLogoFrame(variant: LogoVariant): LogoFrame {
  const tone = getLogoTone(variant);
  const aspect = tone === "dark" ? LOGO_DARK_ASPECT : LOGO_LIGHT_ASPECT;
  const src = tone === "dark" ? BRAND_ASSETS.dark : BRAND_ASSETS.light;

  if (variant === "icon") {
    return {
      src: BRAND_ASSETS.icon,
      width: 96,
      height: 96,
      frameClassName: "relative h-10 w-10 sm:h-12 sm:w-12",
    };
  }

  if (variant === "monochrome") {
    return {
      src: BRAND_ASSETS.iconSvg,
      width: 96,
      height: 96,
      frameClassName: "relative h-10 w-10 sm:h-12 sm:w-12",
    };
  }

  if (variant === "navbar" || variant === "dark") {
    return {
      src,
      width: aspect.width,
      height: aspect.height,
      frameClassName: LOGO_NAVBAR_FRAME,
    };
  }

  if (variant === "footer") {
    return {
      src,
      width: aspect.width,
      height: aspect.height,
      frameClassName: LOGO_FOOTER_FRAME,
    };
  }

  return {
    src,
    width: aspect.width,
    height: aspect.height,
    frameClassName: LOGO_LIGHT_SECTION_FRAME,
  };
}

export function Logo({ variant = "navbar", className, priority = false }: LogoProps) {
  const { src, width, height, frameClassName } = getLogoFrame(variant);

  return (
    <span className={cn("inline-flex shrink-0 items-center", className)} aria-label={BRAND.name}>
      <span className={frameClassName}>
        <Image
          src={src}
          alt={BRAND.name}
          fill
          sizes="(max-width: 640px) 180px, 280px"
          priority={priority || variant === "navbar"}
          className="object-contain object-left"
        />
      </span>
    </span>
  );
}
