"use client";

import { Button } from "@/app/components/ui/button";
import {
  downloadTextFile,
  packageToMarkdown,
  packageToPdfReadyText,
} from "../lib/export";
import type { ContentPackage } from "../lib/types";
import { CopyButton } from "./copy-button";

type ExportActionsProps = {
  pkg: ContentPackage;
};

export function ExportActions({ pkg }: ExportActionsProps) {
  const markdown = packageToMarkdown(pkg);
  const pdfReady = packageToPdfReadyText(pkg);
  const slug = pkg.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 48);

  return (
    <div className="flex flex-wrap gap-3">
      <CopyButton text={markdown} label="Copy Markdown" />
      <CopyButton text={pdfReady} label="Copy PDF text" />
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() =>
          downloadTextFile(`${slug || "package"}.md`, markdown, "text/markdown")
        }
      >
        Download .md
      </Button>
      <Button
        type="button"
        variant="secondary"
        size="sm"
        onClick={() =>
          downloadTextFile(`${slug || "package"}-print.txt`, pdfReady)
        }
      >
        Download PDF-ready
      </Button>
    </div>
  );
}
