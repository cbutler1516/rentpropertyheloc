import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";
import { Container } from "./container";

type SectionProps = HTMLAttributes<HTMLElement> & {
  id?: string;
  muted?: boolean;
};

export function Section({ id, muted, className, children, ...props }: SectionProps) {
  return (
    <section
      id={id}
      className={cn("py-16 sm:py-20", muted && "bg-navy-900/60", className)}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow ? (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-bright">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-white/70 sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
