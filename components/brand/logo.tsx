import { cn } from "@/lib/cn";
import {
  BRAND,
  BRAND_ASSETS,
  LOGO_FOOTER_FRAME,
  LOGO_HEADER_ASPECT,
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

type LogoFrame = {
  src: string;
  width: number;
  height: number;
  frameClassName: string;
};

function getLogoFrame(variant: LogoVariant): LogoFrame {
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

  if (variant === "navbar") {
    return {
      src: BRAND_ASSETS.header,
      width: LOGO_HEADER_ASPECT.width,
      height: LOGO_HEADER_ASPECT.height,
      frameClassName: LOGO_NAVBAR_FRAME,
    };
  }

  if (variant === "dark") {
    return {
      src: BRAND_ASSETS.dark,
      width: LOGO_HEADER_ASPECT.width,
      height: LOGO_HEADER_ASPECT.height,
      frameClassName: LOGO_NAVBAR_FRAME,
    };
  }

  const lightFrame = {
    src: BRAND_ASSETS.light,
    width: LOGO_LIGHT_ASPECT.width,
    height: LOGO_LIGHT_ASPECT.height,
  };

  if (variant === "footer") {
    return {
      ...lightFrame,
      frameClassName: LOGO_FOOTER_FRAME,
    };
  }

  return {
    ...lightFrame,
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
          sizes="(max-width: 640px) 180px, 260px"
          priority={priority || variant === "navbar"}
          className="object-contain object-left"
        />
      </span>
    </span>
  );
}
