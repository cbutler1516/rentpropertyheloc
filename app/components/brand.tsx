type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  return (
    <span className={`brand-mark brand-mark-${size} ${className}`} aria-hidden>
      <svg viewBox="0 0 64 64" role="img" focusable="false">
        <rect
          className="brand-mark-frame"
          x="7"
          y="7"
          width="50"
          height="50"
          rx="15"
        />
        <path className="brand-mark-route" d="M 18 43 C 27 30 37 37 46 21" />
        <path
          className="brand-mark-route brand-mark-route-soft"
          d="M 19 22 C 27 28 36 28 45 20"
        />
        <circle className="brand-mark-node" cx="18" cy="43" r="2.5" />
        <circle className="brand-mark-node" cx="46" cy="21" r="2.5" />
        <path
          className="brand-mark-x"
          d="M 43 40 L 49 46 M 49 40 L 43 46"
        />
      </svg>
      <span className="brand-mark-letters">LP</span>
    </span>
  );
}

export function BrandIcon({ className = "" }: { className?: string }) {
  return <BrandMark size="sm" className={className} />;
}

export function WordmarkLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <BrandMark size="sm" />
      <span className="brand-wordmark">
        <span>The Loan</span>
        <span>Playbook</span>
      </span>
    </span>
  );
}

export function FooterBrand({ className = "" }: { className?: string }) {
  return (
    <div className={`footer-brand ${className}`}>
      <BrandMark size="md" />
      <div>
        <p>The Loan Playbook</p>
        <p>Strategy before submission</p>
      </div>
    </div>
  );
}
