"use client";

import { useCallback, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/components/ui/card";

type AgentShareBoxProps = {
  message: string;
  clientName?: string;
};

export function AgentShareBox({ message, clientName }: AgentShareBoxProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  }, [message]);

  return (
    <Card className="border-[#c9a227]/30 bg-gradient-to-br from-[#c9a227]/8 via-transparent to-[#7c3aed]/8">
      <CardHeader>
        <p className="font-mono text-[10px] tracking-[0.28em] text-[#c9a227] uppercase">
          For agents
        </p>
        <CardTitle className="text-lg">Send this to your client</CardTitle>
        <p className="text-sm text-zinc-500">
          {clientName
            ? `Copy and personalize before sending to ${clientName}.`
            : "Copy and personalize before texting or emailing your client."}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <blockquote className="rounded-xl border border-white/[0.06] bg-black/30 px-5 py-4 text-sm leading-relaxed text-zinc-300">
          {message}
        </blockquote>
        <Button type="button" variant="gold" size="sm" onClick={copy}>
          {copied ? "Copied to clipboard" : "Copy client message"}
        </Button>
      </CardContent>
    </Card>
  );
}
