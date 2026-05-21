"use client";

import { useId } from "react";
import { strategyPriorityOptions } from "../lib/strategy-priorities";

export type PrioritiesStepValues = {
  strategyPriorities: string[];
  goalsNotes: string;
};

type IntakePrioritiesStepProps = {
  values: PrioritiesStepValues;
  onChange: (values: PrioritiesStepValues) => void;
};

export function IntakePrioritiesStep({
  values,
  onChange,
}: IntakePrioritiesStepProps) {
  const notesId = useId();

  function togglePriority(priority: string) {
    const selected = new Set(values.strategyPriorities);
    if (selected.has(priority)) {
      selected.delete(priority);
    } else {
      selected.add(priority);
    }
    onChange({
      ...values,
      strategyPriorities: [...selected],
    });
  }

  return (
    <div className="space-y-8">
      <ul
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Strategy priorities"
      >
        {strategyPriorityOptions.map((priority) => {
          const selected = values.strategyPriorities.includes(priority);
          return (
            <li key={priority}>
              <button
                type="button"
                aria-pressed={selected}
                onClick={() => togglePriority(priority)}
                className={`rounded-full border px-4 py-2.5 text-left text-sm transition-all duration-200 ${
                  selected
                    ? "intake-option-selected"
                    : "border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                }`}
              >
                {priority}
              </button>
            </li>
          );
        })}
      </ul>

      <div>
        <label
          htmlFor={notesId}
          className="mb-2 block font-mono text-[9px] tracking-[0.2em] text-zinc-500 uppercase"
        >
          Anything else we should know? (optional)
        </label>
        <textarea
          id={notesId}
          value={values.goalsNotes}
          rows={2}
          placeholder="Optional notes—timeline, property, or anything we should know."
          onChange={(event) =>
            onChange({ ...values, goalsNotes: event.target.value })
          }
          className="input-glow min-h-[4.5rem] w-full resize-y border border-zinc-800 bg-[#050505] px-4 py-3 text-sm leading-relaxed text-white placeholder:text-zinc-600 outline-none focus:border-[#7c3aed]/60"
        />
      </div>
    </div>
  );
}
