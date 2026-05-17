type BrandMarkProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function BrandMark({ size = "md", className = "" }: BrandMarkProps) {
  return (
    <span className={`brand-mark brand-mark-${size} ${className}`} aria-hidden>
      <svg viewBox="0 0 72 72" role="img" focusable="false">
        <rect
          className="brand-mark-frame"
          x="8.5"
          y="8.5"
          width="55"
          height="55"
          rx="15.5"
        />
        <path
          className="brand-mark-route"
          d="M 16 51 C 25 58 44 58 55 46"
        />
        <path className="brand-mark-arrow" d="M 54 46 L 49 45 M 54 46 L 53 41" />
        <text className="brand-mark-lp" x="36" y="43" textAnchor="middle">
          LP
        </text>
        <circle className="brand-mark-node" cx="52" cy="18.5" r="3" />
        <circle className="brand-mark-node" cx="18" cy="43" r="2.5" />
        <path
          className="brand-mark-x"
          d="M 18 20 L 24 26 M 24 20 L 18 26"
        />
      </svg>
    </span>
  );
}

export function BrandIcon({ className = "" }: { className?: string }) {
  return <BrandMark size="sm" className={className} />;
}

export function WordmarkLockup({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-lockup ${className}`}>
      <BrandMark size="md" />
      <span className="brand-wordmark">
        <span>The Loan</span>
        <strong>Playbook</strong>
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
