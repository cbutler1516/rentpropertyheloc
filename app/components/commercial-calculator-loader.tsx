"use client";

import dynamic from "next/dynamic";

const CommercialCalculator = dynamic(
  () => import("@/app/components/commercial-calculator"),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[28rem] items-center justify-center bg-[#f8fafc] px-6 text-center">
        <p className="font-mono text-xs tracking-[0.24em] text-slate-500 uppercase">
          Loading commercial calculator...
        </p>
      </div>
    ),
  },
);

export function CommercialCalculatorLoader() {
  return <CommercialCalculator />;
}
