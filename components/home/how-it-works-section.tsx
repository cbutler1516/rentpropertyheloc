import { Section, SectionHeader } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { HOW_IT_WORKS } from "@/lib/home-content";

export function HowItWorksSection() {
  return (
    <Section id="how-it-works" muted>
      <SectionHeader
        eyebrow="Process"
        title="How it works"
        description="A straightforward path from portfolio review to funded draws—built around investor timelines."
      />
      <ol className="grid gap-6 md:grid-cols-3">
        {HOW_IT_WORKS.map((item) => (
          <li key={item.step}>
            <Card className="h-full">
              <p className="text-sm font-bold text-accent">{item.step}</p>
              <h3 className="mt-3 text-xl font-semibold text-navy-950">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
            </Card>
          </li>
        ))}
      </ol>
    </Section>
  );
}
