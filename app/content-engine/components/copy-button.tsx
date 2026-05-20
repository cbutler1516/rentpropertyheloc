"use client";

import { useCallback, useState } from "react";
import { Button } from "@/app/components/ui/button";
import { cn } from "@/lib/utils";

type CopyButtonProps = {
  text: string;
  className?: string;
  label?: string;
};

export function CopyButton({ text, className, label = "Copy" }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    if (!text.trim()) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }, [text]);

  return (
    <Button
      type="button"
      variant={copied ? "outline" : "secondary"}
      size="sm"
      className={cn(className)}
      onClick={handleCopy}
      disabled={!text.trim()}
    >
      {copied ? "Copied" : label}
    </Button>
  );
}
