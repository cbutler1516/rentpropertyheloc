import { Logo } from "@/components/brand/logo";
import { LogoMark } from "@/components/brand/logo-mark";
import { Container } from "@/components/layout/container";
import { BRAND } from "@/lib/brand";

const mockups = [
  {
    title: "Dark hero",
    description: "Navbar lockup on cinematic navy with teal glow accents.",
    dark: true,
    content: <Logo variant="horizontal" />,
  },
  {
    title: "Fintech dashboard",
    description: "Icon mark beside investor equity UI panels.",
    dark: true,
    content: (
      <div className="flex items-center gap-4">
        <LogoMark size={36} />
        <div className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70">
          Est. equity · $124,600
        </div>
      </div>
    ),
  },
  {
    title: "Light investor portal",
    description: "Light wordmark for documents and investor-facing PDFs.",
    dark: false,
    content: (
      <div className="text-navy-950">
        <Logo variant="stacked" />
      </div>
    ),
  },
  {
    title: "Stacked social",
    description: "Profile-ready stacked identity for LinkedIn and video thumbnails.",
    dark: true,
    content: <Logo variant="stacked" />,
  },
  {
    title: "App icon",
    description: "Minimal RH mark with integrated equity bars.",
    dark: true,
    content: <Logo variant="icon" />,
  },
  {
    title: "Monochrome",
    description: "Single-color applications for compliance and print.",
    dark: true,
    content: <LogoMark size={56} variant="monochrome" />,
  },
] as const;

export function BrandShowcase() {
  return (
    <div className="py-20 sm:py-28">
      <Container>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-bright">
          Identity system
        </p>
        <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">{BRAND.name} brand kit</h1>
        <p className="mt-4 max-w-2xl text-white/70">{BRAND.descriptor}</p>
        <p className="mt-3">
          <a
            href="/brand/logos"
            className="text-sm font-medium text-accent-bright underline-offset-2 hover:underline"
          >
            View logo concept exploration →
          </a>
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockups.map((item) => (
            <div
              key={item.title}
              className={
                item.dark
                  ? "glass-panel glow-accent rounded-2xl p-6"
                  : "rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
              }
            >
              <div
                className={
                  item.dark
                    ? "flex min-h-[120px] items-center justify-center rounded-xl border border-white/10 bg-navy-950/60 p-6"
                    : "flex min-h-[120px] items-center justify-center rounded-xl bg-slate-50 p-6"
                }
              >
                {item.content}
              </div>
              <h2 className={`mt-5 text-lg font-semibold ${item.dark ? "text-white" : "text-navy-950"}`}>
                {item.title}
              </h2>
              <p className={`mt-2 text-sm ${item.dark ? "text-white/60" : "text-slate-600"}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          <div className="glass-panel rounded-2xl p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent-bright">
              Horizontal logo
            </h3>
            <div className="mt-6 flex justify-center py-8">
              <Logo variant="horizontal" />
            </div>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-8">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">
              Light background
            </h3>
            <div className="mt-6 flex justify-center py-8">
              <Logo variant="stacked" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
