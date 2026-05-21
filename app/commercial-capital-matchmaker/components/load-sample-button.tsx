"use client";

import { useRouter } from "next/navigation";
import { useCcm } from "./ccm-provider";

export function LoadSampleButton({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { loadSampleStrategy } = useCcm();

  return (
    <button
      type="button"
      className={className}
      onClick={() => {
        loadSampleStrategy();
        router.push("/commercial-capital-matchmaker/results");
      }}
    >
      {children}
    </button>
  );
}
