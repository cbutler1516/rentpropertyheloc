import { Section, SectionHeader } from "@/components/layout/section";
import { FAQ_ITEMS } from "@/lib/home-content";

export function FaqSection() {
  return (
    <Section id="faq">
      <SectionHeader
        eyebrow="FAQ"
        title="Questions investors ask first"
        description="Straight answers on rental eligibility, structure, and timing."
      />
      <div className="mx-auto max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10 bg-white/5">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="group px-5 py-4 sm:px-6">
            <summary className="cursor-pointer list-none text-base font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-center justify-between gap-4">
                {item.question}
                <span className="text-accent-bright transition group-open:rotate-45">+</span>
              </span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-white/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
