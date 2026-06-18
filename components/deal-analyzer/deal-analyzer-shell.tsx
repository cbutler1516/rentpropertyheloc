"use client";

import { Container } from "@/components/layout/container";
import Link from "next/link";
import { cn } from "@/lib/cn";

const STEPS = [
  { href: "/deal-analyzer/analyze", label: "Analyze" },
  { href: "/deal-analyzer/preview", label: "Preview" },
  { href: "/deal-analyzer/lead", label: "Your info" },
  { href: "#", label: "Report" },
] as const;

type DealAnalyzerShellProps = {
  step: 1 | 2 | 3 | 4;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export function DealAnalyzerShell({ step, title, subtitle, children }: DealAnalyzerShellProps) {
  return (
    <div className="section-light min-h-[70vh] py-8 sm:py-10 md:py-12">
      <Container>
        <nav className="mb-8 flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
          {STEPS.map((s, i) => {
            const index = i + 1;
            const active = index === step;
            const complete = index < step;
            return (
              <span key={s.label} className="flex items-center gap-2">
                {index <= 3 ? (
                  <Link
                    href={s.href}
                    className={cn(
                      "rounded-full px-3 py-1 transition",
                      active && "bg-teal-700 text-white",
                      complete && !active && "text-teal-700",
                      !active && !complete && "text-slate-400",
                    )}
                  >
                    {s.label}
                  </Link>
                ) : (
                  <span
                    className={cn(
                      "rounded-full px-3 py-1",
                      active ? "bg-teal-700 text-white" : "text-slate-400",
                    )}
                  >
                    {s.label}
                  </span>
                )}
                {i < STEPS.length - 1 ? <span className="text-slate-300">→</span> : null}
              </span>
            );
          })}
        </nav>

        <div className="mb-8 max-w-3xl">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700">Deal Analyzer</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">{title}</h1>
          {subtitle ? (
            <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">{subtitle}</p>
          ) : null}
        </div>

        {children}
      </Container>
    </div>
  );
}
