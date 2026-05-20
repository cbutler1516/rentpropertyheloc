import Link from "next/link";
import { Card, CardContent } from "@/app/components/ui/card";
import type { PartnerAgent } from "../lib/agent-types";
import {
  agentBrandStyle,
  resolveBrokerage,
  resolveCtaEmail,
  resolveCtaPhone,
} from "../lib/agent-branding";

type AgentContactCardProps = {
  agent: Pick<
    PartnerAgent,
    | "name"
    | "headshotUrl"
    | "logoUrl"
    | "bio"
    | "brokerage"
    | "company"
    | "ctaPhone"
    | "ctaEmail"
    | "phone"
    | "email"
    | "brandColor"
  >;
  className?: string;
  variant?: "screen" | "print";
};

export function AgentContactCard({
  agent,
  className = "",
  variant = "screen",
}: AgentContactCardProps) {
  const brokerage = resolveBrokerage(agent);
  const phone = resolveCtaPhone(agent);
  const email = resolveCtaEmail(agent);
  const brandStyle = agentBrandStyle(agent.brandColor);

  if (variant === "print") {
    return (
      <div
        className={`playbook-print-only playbook-print-avoid-break rounded-lg border border-[#d4d4d8] bg-white p-4 ${className}`}
        style={brandStyle}
      >
        <p className="text-[9pt] font-semibold uppercase tracking-wider text-[#5b21b6]">
          Your agent
        </p>
        <div className="mt-2 flex gap-3">
          {agent.headshotUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={agent.headshotUrl}
              alt=""
              className="h-14 w-14 rounded-full object-cover"
            />
          ) : null}
          <div className="text-[10pt] text-[#333]">
            <p className="font-semibold text-[#111]">{agent.name}</p>
            {brokerage ? <p>{brokerage}</p> : null}
            {agent.bio ? <p className="mt-1 leading-relaxed">{agent.bio}</p> : null}
            {phone ? <p className="mt-1">{phone}</p> : null}
            {email ? <p>{email}</p> : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Card
      className={`border-white/[0.08] bg-zinc-950/60 ${className}`}
      style={brandStyle}
    >
      <CardContent className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center">
        {agent.headshotUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={agent.headshotUrl}
            alt=""
            className="h-20 w-20 shrink-0 rounded-2xl border border-white/[0.08] object-cover"
          />
        ) : null}
        <div className="min-w-0 flex-1 space-y-2">
          <p className="font-mono text-[9px] tracking-[0.2em] text-[#c9a227] uppercase">
            Questions? Reach your agent
          </p>
          <p className="text-lg font-medium text-white">{agent.name}</p>
          {brokerage ? <p className="text-sm text-zinc-400">{brokerage}</p> : null}
          {agent.bio ? (
            <p className="text-sm leading-relaxed text-zinc-400">{agent.bio}</p>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-1">
            {phone ? (
              <Link
                href={`tel:${phone.replace(/\D/g, "")}`}
                className="font-mono text-[10px] tracking-[0.14em] text-[var(--agent-brand,#c9a227)] uppercase hover:brightness-110"
              >
                {phone}
              </Link>
            ) : null}
            {email ? (
              <Link
                href={`mailto:${email}`}
                className="font-mono text-[10px] tracking-[0.14em] text-zinc-400 uppercase hover:text-zinc-200"
              >
                {email}
              </Link>
            ) : null}
          </div>
        </div>
        {agent.logoUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={agent.logoUrl}
            alt=""
            className="h-12 max-w-[140px] shrink-0 object-contain opacity-90"
          />
        ) : null}
      </CardContent>
    </Card>
  );
}
