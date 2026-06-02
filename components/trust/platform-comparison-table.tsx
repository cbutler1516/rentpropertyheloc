"use client";

import { Section, SectionHeader } from "@/components/layout/section";
import { Reveal } from "@/components/motion/reveal";
import { PLATFORM_COMPARISON } from "@/lib/trust-content";
import { cn } from "@/lib/cn";

export function PlatformComparisonTable() {
  return (
    <Section id="comparison" divider className="section-mist py-10 sm:py-14">
      <Reveal>
        <SectionHeader
          tone="light"
          title={PLATFORM_COMPARISON.headline}
          description={PLATFORM_COMPARISON.description}
        />
      </Reveal>

      <Reveal delay={0.06} className="mt-8 overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-sm lg:mt-10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80">
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  Compare
                </th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:px-6">
                  {PLATFORM_COMPARISON.columns.online}
                </th>
                <th scope="col" className="px-4 py-3 text-xs font-semibold uppercase tracking-wide text-teal-800 sm:px-6">
                  {PLATFORM_COMPARISON.columns.us}
                </th>
              </tr>
            </thead>
            <tbody>
              {PLATFORM_COMPARISON.rows.map((row, index) => (
                <tr
                  key={row.label}
                  className={cn(
                    "border-b border-slate-100 last:border-b-0",
                    index % 2 === 0 ? "bg-white" : "bg-slate-50/40",
                  )}
                >
                  <th scope="row" className="px-4 py-4 font-semibold text-slate-900 sm:px-6">
                    {row.label}
                  </th>
                  <td className="px-4 py-4 text-slate-600 sm:px-6">{row.online}</td>
                  <td className="px-4 py-4 font-medium text-teal-900 sm:px-6">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </Section>
  );
}
