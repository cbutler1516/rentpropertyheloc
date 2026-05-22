import Link from "next/link";
import type { ReactNode } from "react";

export function LoadSampleButton({
  className,
  children,
}: {
  className: string;
  children: ReactNode;
}) {
  return (
    <Link href="/commercial-capital-matchmaker/sample" className={className}>
      {children}
    </Link>
  );
}
