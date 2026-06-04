import { Logo } from "@/components/brand/logo";
import { LogoMark } from "@/components/brand/logo-mark";
import { Container } from "@/components/layout/container";
import { BRAND, BRAND_COLORS } from "@/lib/brand";

const mockups = [
  {
    title: "Primary lockup",
    description: "RPH Logo 2 horizontal — icon left, RENT PROPERTY HELOC wordmark right.",
    dark: true,
    content: <Logo variant="navbar" />,
  },
  {
    title: "Fintech dashboard",
    description: "Icon mark beside investor equity UI panels.",
    dark: true,
    content: (
      <div className="flex items-center gap-4">
        <LogoMark size={36} />
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
          Est. equity · Review in progress
        </div>
      </div>
    ),
  },
  {
    title: "Light footer",
    description: "Compact horizontal lockup for footer and documents.",
    dark: false,
    content: (
      <div className="text-brand-navy">
        <Logo variant="footer" />
      </div>
    ),
  },
  {
    title: "Alternate sizing",
    description: "Primary lockup at marketing and document sizes.",
    dark: true,
    content: (
      <div className="rounded-xl bg-white p-4">
        <Logo variant="stacked" />
      </div>
    ),
  },
  {
    title: "App icon",
    description: "House and chart mark for favicon and app surfaces.",
    dark: true,
    content: <Logo variant="icon" />,
  },
  {
    title: "Monochrome",
    description: "SVG icon for single-color applications.",
    dark: true,
    content: <LogoMark size={56} variant="monochrome" />,
  },
] as const;

export function BrandShowcase() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-secondary">
          Brand system
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {BRAND.name}
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
          Primary palette: {BRAND_COLORS.primary}, {BRAND_COLORS.secondary}, navy{" "}
          {BRAND_COLORS.navy}.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockups.map((mockup) => (
            <div
              key={mockup.title}
              className={
                mockup.dark
                  ? "rounded-2xl border border-white/10 bg-brand-dark p-6"
                  : "rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              }
            >
              <h2
                className={
                  mockup.dark ? "text-sm font-semibold text-white" : "text-sm font-semibold text-slate-900"
                }
              >
                {mockup.title}
              </h2>
              <p
                className={
                  mockup.dark ? "mt-1 text-xs text-white/60" : "mt-1 text-xs text-slate-500"
                }
              >
                {mockup.description}
              </p>
              <div className="mt-5 flex min-h-[5rem] items-center">{mockup.content}</div>
            </div>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Primary</p>
            <div className="mt-4">
              <Logo variant="horizontal" />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-brand-dark p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/60">Primary</p>
            <div className="mt-4 rounded-xl bg-white/95 p-3 inline-block">
              <Logo variant="horizontal" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
