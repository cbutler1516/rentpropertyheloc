import { Section, SectionHeader } from "@/components/layout/section";
import { CtaLink } from "@/components/ui/cta-link";
import { Card } from "@/components/ui/card";
import { PRIMARY_CTA_HREF, PRIMARY_CTA_LABEL } from "@/lib/cta";
import { HOW_IT_WORKS } from "@/lib/home-content";

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" muted divider>
      <SectionHeader
        eyebrow="Process"
        title="How it works"
        description="Three steps from portfolio snapshot to deployed capital—built for investors who need clarity before they commit."
      />
      <ol className="grid gap-5 md:grid-cols-3 md:gap-6">
        {HOW_IT_WORKS.map((item) => (
          <li key={item.step}>
            <Card className="flex h-full flex-col">
              <p className="text-sm font-bold tracking-wide text-accent">{item.step}</p>
              <h3 className="mt-3 text-xl font-semibold text-navy-950">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                {item.description}
              </p>
            </Card>
          </li>
        ))}
      </ol>
      <div className="mt-12 flex justify-center">
        <CtaLink href={PRIMARY_CTA_HREF} size="lg">
          {PRIMARY_CTA_LABEL}
        </CtaLink>
      </div>
    </Section>
  );
}
