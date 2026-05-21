import Image from "next/image";

export const BRAND_ICON_SRC = "/brand/loan-playbook-icon.svg";
export const BRAND_WORDMARK_SRC = "/brand/loan-playbook-wordmark.svg";
export const BRAND_HORIZONTAL_SRC = "/brand/loan-playbook-horizontal.svg";

type BrandSize = "sm" | "md" | "lg";

const iconPixelSize: Record<BrandSize, number> = {
  sm: 40,
  md: 52,
  lg: 68,
};

type BrandIconProps = {
  size?: BrandSize;
  className?: string;
  priority?: boolean;
};

export function BrandIcon({
  size = "md",
  className = "",
  priority = false,
}: BrandIconProps) {
  const px = iconPixelSize[size];

  return (
    <span
      className={`brand-icon brand-icon-${size} ${className}`.trim()}
      aria-hidden
    >
      <Image
        src={BRAND_ICON_SRC}
        alt=""
        width={px}
        height={px}
        className="brand-icon-image"
        priority={priority}
      />
    </span>
  );
}

/** @deprecated Use BrandIcon — kept for existing imports */
export function BrandMark(props: BrandIconProps) {
  return <BrandIcon {...props} />;
}

type WordmarkLockupProps = {
  className?: string;
  /** Hide stacked wordmark (nav mobile / tight layouts) */
  iconOnly?: boolean;
  priority?: boolean;
};

export function WordmarkLockup({
  className = "",
  iconOnly = false,
  priority = false,
}: WordmarkLockupProps) {
  return (
    <span className={`brand-lockup ${className}`.trim()}>
      <BrandIcon size="md" priority={priority} />
      <Image
        src={BRAND_WORDMARK_SRC}
        alt="The Loan Playbook"
        width={168}
        height={68}
        className={
          iconOnly
            ? "brand-wordmark-image sr-only"
            : "brand-wordmark-image hidden min-[860px]:block"
        }
        priority={priority}
      />
    </span>
  );
}

type FooterBrandProps = {
  className?: string;
};

export function FooterBrand({ className = "" }: FooterBrandProps) {
  return (
    <div className={`footer-brand ${className}`.trim()}>
      <BrandIcon size="md" />
      <Image
        src={BRAND_WORDMARK_SRC}
        alt="The Loan Playbook — Smarter financing. Stronger futures."
        width={196}
        height={80}
        className="brand-wordmark-image brand-wordmark-footer"
      />
    </div>
  );
}
