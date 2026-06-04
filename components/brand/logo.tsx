import { cn } from "@/lib/cn";
import {
  BRAND,
  BRAND_ASSETS,
  LOGO_PRIMARY_ASPECT,
  type LogoVariant,
} from "@/lib/brand";
import Image from "next/image";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

const PRIMARY_SRC = BRAND_ASSETS.primary;

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
      src: PRIMARY_SRC,
      width: LOGO_PRIMARY_ASPECT.width,
      height: LOGO_PRIMARY_ASPECT.height,
      frameClassName: "relative h-10 w-[160px] max-w-[180px] sm:h-12 sm:w-[260px] sm:max-w-[280px]",
    };
  }

  if (variant === "footer" || variant === "light") {
    return {
      src: PRIMARY_SRC,
      width: LOGO_PRIMARY_ASPECT.width,
      height: LOGO_PRIMARY_ASPECT.height,
      frameClassName: "relative h-9 w-[140px] max-w-[180px] sm:h-10 sm:w-[220px] sm:max-w-[240px]",
    };
  }

  return {
    src: PRIMARY_SRC,
    width: LOGO_PRIMARY_ASPECT.width,
    height: LOGO_PRIMARY_ASPECT.height,
    frameClassName: "relative h-11 w-[200px] max-w-[240px] sm:h-12 sm:w-[260px] sm:max-w-[280px]",
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
