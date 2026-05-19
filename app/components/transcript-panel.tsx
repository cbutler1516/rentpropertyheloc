import { formatTranscriptParagraphs } from "../lib/content-engine";

type TranscriptPanelProps = {
  transcript?: string;
  paragraphs?: string[];
  title?: string;
};

export function TranscriptPanel({
  transcript,
  paragraphs,
  title = "Transcript",
}: TranscriptPanelProps) {
  const blocks = formatTranscriptParagraphs(transcript, paragraphs);

  return (
    <article className="transcript-panel border border-zinc-900/80 bg-[#050505] p-7 md:p-8">
      <h2 className="font-mono text-[10px] tracking-[0.28em] text-[#7c3aed] uppercase">
        {title}
      </h2>
      {blocks.length > 0 ? (
        <div className="mt-6 space-y-5">
          {blocks.map((paragraph, index) => (
            <p
              key={`${index}-${paragraph.slice(0, 24)}`}
              className={`leading-[1.75] text-zinc-300 ${index === 0 ? "text-lg text-zinc-200" : "text-base"}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-sm leading-relaxed text-zinc-500">
          Transcript import pending. Add paragraphs in{" "}
          <code className="text-zinc-400">social-posts.ts</code> when ready.
        </p>
      )}
    </article>
  );
}
