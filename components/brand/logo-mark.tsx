import { cn } from "@/lib/cn";
import { BRAND_ASSETS } from "@/lib/brand";
import Image from "next/image";

type LogoMarkProps = {
  className?: string;
  size?: number;
  variant?: "color" | "monochrome" | "light";
};

export function LogoMark({ className, size = 40, variant = "color" }: LogoMarkProps) {
  const src = variant === "monochrome" ? BRAND_ASSETS.iconSvg : BRAND_ASSETS.icon;

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      aria-hidden
      className={cn(
        "shrink-0 object-contain",
        variant === "monochrome" && "opacity-90",
        className,
      )}
      style={{ width: size, height: size }}
    />
  );
}
