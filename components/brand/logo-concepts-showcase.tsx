import { LogoSystem } from "@/components/brand/logo-system";
import { ConceptLogoMark } from "@/components/brand/logo-marks";
import { Container } from "@/components/layout/container";
import { BRAND } from "@/lib/brand";
import {
  LOGO_CONCEPTS,
  LOGO_CONCEPT_IDS,
  PRIMARY_LOGO_CONCEPT,
  type LogoConceptId,
  type LogoSystemVariant,
} from "@/lib/brand/logo-system";
import Link from "next/link";

const VARIANTS: { id: LogoSystemVariant; label: string }[] = [
  { id: "primary", label: "Primary" },
  { id: "compact", label: "Compact" },
  { id: "icon", label: "Favicon / Icon" },
  { id: "header", label: "Header" },
  { id: "footer", label: "Footer" },
];

function ConceptPanel({
  concept,
  recommended,
}: {
  concept: LogoConceptId;
  recommended?: boolean;
}) {
  const meta = LOGO_CONCEPTS.find((item) => item.id === concept)!;

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 px-5 py-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">{meta.name}</h2>
            <p className="mt-1 text-sm text-slate-500">{meta.tagline}</p>
          </div>
          {recommended ? (
            <span className="shrink-0 rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-teal-800 ring-1 ring-teal-100">
              Primary
            </span>
          ) : null}
        </div>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="space-y-4 border-b border-slate-100 bg-navy-950 p-5 lg:border-b-0 lg:border-r">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">
            Dark background
          </p>
          {VARIANTS.map((variant) => (
            <div
              key={`${concept}-dark-${variant.id}`}
              className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3"
            >
              <p className="mb-2.5 text-[10px] font-medium uppercase tracking-wide text-white/40">
                {variant.label}
              </p>
              <div className="flex min-h-[52px] items-center">
                {variant.id === "footer" ? (
                  <div className="rounded-lg bg-white px-3 py-2">
                    <LogoSystem concept={concept} variant="footer" />
                  </div>
                ) : (
                  <LogoSystem concept={concept} variant={variant.id} />
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4 bg-slate-50 p-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Light background
          </p>
          {VARIANTS.map((variant) => (
            <div
              key={`${concept}-light-${variant.id}`}
              className="rounded-xl border border-slate-200 bg-white px-4 py-3"
            >
              <p className="mb-2.5 text-[10px] font-medium uppercase tracking-wide text-slate-400">
                {variant.label}
              </p>
              <div className="flex min-h-[52px] items-center">
                {variant.id === "icon" ? (
                  <ConceptLogoMark concept={concept} size={48} theme="light" />
                ) : variant.id === "footer" ? (
                  <LogoSystem concept={concept} variant="footer" />
                ) : variant.id === "header" ? (
                  <div className="rounded-lg bg-navy-950 px-3 py-2">
                    <LogoSystem concept={concept} variant="header" />
                  </div>
                ) : variant.id === "primary" ? (
                  <div className="rounded-lg bg-navy-950 px-3 py-2">
                    <LogoSystem concept={concept} variant="primary" />
                  </div>
                ) : (
                  <LogoSystem concept={concept} variant={variant.id} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export function LogoConceptsShowcase() {
  return (
    <div className="py-12 sm:py-16">
      <Container className="max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal-700">
              Logo exploration
            </p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Rent Property HELOC identity concepts
            </h1>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              Five investor-finance directions side by side. Typography follows the existing
              wordmark system. Primary production lockup:{" "}
              <strong className="font-semibold text-slate-800">RP + Upward Equity Arrow</strong>.
            </p>
          </div>
          <Link
            href="/brand"
            className="text-sm font-medium text-teal-700 underline-offset-2 hover:underline"
          >
            ← Brand system
          </Link>
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-1">
          {LOGO_CONCEPT_IDS.map((concept) => (
            <ConceptPanel
              key={concept}
              concept={concept}
              recommended={concept === PRIMARY_LOGO_CONCEPT}
            />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">Quick comparison</h2>
          <p className="mt-2 text-sm text-slate-600">
            Header lockups at a glance on {BRAND.name}&apos;s navy field.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {LOGO_CONCEPT_IDS.map((concept) => {
              const meta = LOGO_CONCEPTS.find((item) => item.id === concept)!;
              return (
                <div
                  key={`compare-${concept}`}
                  className="flex flex-col items-center rounded-xl border border-white/10 bg-navy-950 px-4 py-6 text-center"
                >
                  <LogoSystem concept={concept} variant="header" />
                  <p className="mt-4 text-xs font-medium text-white/70">{meta.name}</p>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
