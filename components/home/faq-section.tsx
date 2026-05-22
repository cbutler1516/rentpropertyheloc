import { Section, SectionHeader } from "@/components/layout/section";
import { FAQ_ITEMS } from "@/lib/home-content";

export function FaqSection() {
  return (
    <Section id="faq" divider>
      <SectionHeader
        eyebrow="FAQ"
        title="Questions investors ask first"
        description="Direct answers on rental eligibility, structure, and timing—without the sales script."
      />
      <div className="mx-auto max-w-3xl divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
        {FAQ_ITEMS.map((item) => (
          <details key={item.question} className="group px-5 py-5 sm:px-7">
            <summary className="cursor-pointer list-none text-base font-semibold text-white marker:content-none [&::-webkit-details-marker]:hidden">
              <span className="flex items-start justify-between gap-4">
                <span className="pr-2">{item.question}</span>
                <span
                  aria-hidden
                  className="mt-0.5 shrink-0 text-accent-bright transition group-open:rotate-45"
                >
                  +
                </span>
              </span>
            </summary>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{item.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
