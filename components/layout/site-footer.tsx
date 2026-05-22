import { Container } from "@/components/layout/container";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-navy-950 py-10">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-semibold text-white">{SITE_NAME}</p>
          <p className="mt-1 max-w-md text-sm text-white/60">
            Educational marketing for rental-property HELOC programs. Not a commitment to lend.
          </p>
        </div>
        <p className="text-xs text-white/50">
          © {new Date().getFullYear()} {SITE_NAME}. {SITE_URL.replace("https://", "")}
        </p>
      </Container>
    </footer>
  );
}
