"use client";

import { useMemo, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { generateAgentInviteKit } from "@/app/deal-analyzer/lib/agent-invite-kit";
import type { PartnerAgent } from "@/app/deal-analyzer/lib/agent-types";

type AdminAgentInviteKitProps = {
  agent: Pick<
    PartnerAgent,
    | "name"
    | "slug"
    | "email"
    | "phone"
    | "company"
    | "brokerage"
    | "ctaPhone"
    | "ctaEmail"
  >;
  siteUrl: string;
};

const KIT_ITEMS: Array<{ key: keyof ReturnType<typeof generateAgentInviteKit>; label: string }> = [
  { key: "textMessage", label: "1. Text message" },
  { key: "emailSubject", label: "2. Email subject" },
  { key: "emailBody", label: "2. Email body" },
  { key: "socialPost", label: "3. Social post" },
  { key: "videoScript", label: "4. Video script" },
  { key: "qrPlaceholder", label: "5. QR placeholder" },
];

export function AdminAgentInviteKit({ agent, siteUrl }: AdminAgentInviteKitProps) {
  const kit = useMemo(() => generateAgentInviteKit(agent, siteUrl), [agent, siteUrl]);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  async function copyText(key: string, text: string) {
    await navigator.clipboard.writeText(text);
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 2000);
  }

  return (
    <div className="space-y-4 rounded-2xl border border-white/[0.06] bg-zinc-950/50 p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase">
            Agent invite kit
          </p>
          <p className="text-sm text-zinc-400">
            Static templates — copy and send to clients or post on social.
          </p>
        </div>
        <Button
          type="button"
          variant="gold"
          size="sm"
          onClick={() => void copyText("fullKit", kit.fullKit)}
        >
          {copiedKey === "fullKit" ? "Copied" : "Copy full kit"}
        </Button>
      </div>

      <div className="space-y-4">
        {KIT_ITEMS.map((item) => {
          const text = kit[item.key];
          return (
            <div
              key={item.key}
              className="rounded-xl border border-white/[0.06] bg-black/20 p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-2">
                <p className="font-mono text-[9px] tracking-[0.16em] text-[#c9a227] uppercase">
                  {item.label}
                </p>
                <button
                  type="button"
                  className="font-mono text-[9px] tracking-[0.14em] text-zinc-500 uppercase hover:text-zinc-300"
                  onClick={() => void copyText(item.key, text)}
                >
                  {copiedKey === item.key ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-xs leading-relaxed text-zinc-400">
                {text}
              </pre>
            </div>
          );
        })}
      </div>
    </div>
  );
}
