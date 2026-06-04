import { cn } from "@/lib/cn";
import { BRAND, BRAND_ASSETS, type LogoVariant } from "@/lib/brand";
import Image from "next/image";

type LogoProps = {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
};

type LogoConfig = {
  src: string;
  width: number;
  height: number;
  className: string;
  onDark?: boolean;
};

function getLogoConfig(variant: LogoVariant): LogoConfig {
  switch (variant) {
    case "navbar":
      return {
        src: BRAND_ASSETS.horizontal,
        width: 320,
        height: 96,
        className: "h-10 w-auto sm:h-11",
        onDark: true,
      };
    case "footer":
    case "light":
      return {
        src: BRAND_ASSETS.horizontal,
        width: 280,
        height: 84,
        className: "h-8 w-auto sm:h-9",
      };
    case "horizontal":
      return {
        src: BRAND_ASSETS.horizontal,
        width: 360,
        height: 108,
        className: "h-11 w-auto sm:h-12",
      };
    case "stacked":
      return {
        src: BRAND_ASSETS.stacked,
        width: 240,
        height: 320,
        className: "h-28 w-auto sm:h-32",
      };
    case "icon":
      return {
        src: BRAND_ASSETS.icon,
        width: 96,
        height: 96,
        className: "h-10 w-10 sm:h-12 sm:w-12",
      };
    case "monochrome":
      return {
        src: BRAND_ASSETS.iconSvg,
        width: 96,
        height: 96,
        className: "h-10 w-10 sm:h-12 sm:w-12",
      };
    default:
      return {
        src: BRAND_ASSETS.horizontal,
        width: 320,
        height: 96,
        className: "h-10 w-auto sm:h-11",
      };
  }
}

export function Logo({ variant = "navbar", className, priority = false }: LogoProps) {
  const config = getLogoConfig(variant);

  const image = (
    <Image
      src={config.src}
      alt={BRAND.name}
      width={config.width}
      height={config.height}
      priority={priority || variant === "navbar"}
      className={cn(config.className, "object-contain object-left")}
    />
  );

  if (config.onDark) {
    return (
      <span
        className={cn(
          "inline-flex items-center rounded-lg bg-white px-2 py-1 shadow-sm ring-1 ring-white/10",
          className,
        )}
        aria-label={BRAND.name}
      >
        {image}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center", className)} aria-label={BRAND.name}>
      {image}
    </span>
  );
}
