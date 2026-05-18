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
          x="7"
          y="7"
          width="58"
          height="58"
          rx="16"
        />
        <rect
          className="brand-mark-inner"
          x="12"
          y="12"
          width="48"
          height="48"
          rx="12"
        />
        <path
          className="brand-mark-route"
          d="M 17 51 C 28 57 45 54 55 44"
        />
        <path
          className="brand-mark-arrow"
          d="M 55 44 L 49 44 M 55 44 L 53 38"
        />
        <path
          className="brand-mark-x"
          d="M 20 21 L 26 27 M 26 21 L 20 27"
        />
        <circle className="brand-mark-o" cx="51" cy="23" r="4" />
        <text className="brand-mark-lp" x="36" y="45" textAnchor="middle">
          LP
        </text>
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
        <span>THE LOAN</span>
        <strong>PLAYBOOK</strong>
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
