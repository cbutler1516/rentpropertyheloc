import { Section, SectionHeader } from "@/components/layout/section";
import { Card } from "@/components/ui/card";
import { INVESTOR_USE_CASES } from "@/lib/home-content";

export function InvestorUseCasesSection() {
  return (
    <Section id="use-cases" muted divider>
      <SectionHeader
        eyebrow="Use cases"
        title="Where investors deploy line capacity"
        description="Common capital paths we see when revolving HELOCs are secured by rental collateral."
      />
      <div className="grid gap-5 sm:grid-cols-2 sm:gap-6">
        {INVESTOR_USE_CASES.map((item) => (
          <Card key={item.title} className="h-full">
            <h3 className="text-lg font-semibold text-navy-950">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.description}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
