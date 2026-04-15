"use client";

import { useState } from "react";
import { formatRawChemistry } from "@/lib/formatters";

interface Props {
  onAddFormatted?: (text: string, marks: number) => void;
}

const SAMPLE_INPUT = `Copper is extracted from copper ore by smelting and then purified by electrolysis
explain why copper needs to be purified after smelting
describe the setup for the electrolytic purification of copper including the electrolyte used
state what happens at the anode and cathode during the process
calculate the mass of copper deposited at the cathode if a current of 2 A is passed for 3 hours`;

export default function RawFormatter({ onAddFormatted }: Props) {
  const [raw, setRaw] = useState("");
  const [formatted, setFormatted] = useState("");

  function handleFormat() {
    if (!raw.trim()) return;
    setFormatted(formatRawChemistry(raw));
  }

  function handleUseSample() {
    setRaw(SAMPLE_INPUT);
    setFormatted("");
  }

  function handleReset() {
    setRaw("");
    setFormatted("");
  }

  // Estimate marks from formatted output
  function estimateMarks(text: string): number {
    const matches = text.match(/\[(\d+)\]/g);
    if (!matches) return 4;
    return matches.reduce((sum, m) => {
      const n = parseInt(m.replace(/\D/g, ""), 10);
      return sum + (isNaN(n) ? 0 : n);
    }, 0);
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm">Raw Text Formatter</h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Paste unstructured text and convert it to exam-ready question format
          </p>
        </div>
        <button
          onClick={handleUseSample}
          className="text-xs text-indigo-600 hover:text-indigo-800 font-medium border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          Use sample
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Input */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Raw Input
          </label>
          <textarea
            value={raw}
            onChange={(e) => setRaw(e.target.value)}
            rows={8}
            placeholder="Paste raw question text here — one idea per line works best…"
            className="w-full text-sm bg-slate-50 border border-slate-200 rounded-lg p-3.5 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono leading-relaxed placeholder:text-slate-400"
          />
        </div>

        {/* Output */}
        <div className="space-y-2">
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">
            Formatted Output
          </label>
          {formatted ? (
            <div className="text-sm bg-amber-50 border border-amber-100 rounded-lg p-3.5 whitespace-pre-wrap leading-relaxed min-h-[180px] font-mono text-slate-800">
              {formatted}
            </div>
          ) : (
            <div className="flex items-center justify-center min-h-[180px] bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-400">
              Formatted question will appear here
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          onClick={handleFormat}
          disabled={!raw.trim()}
          className="px-4 py-2 text-sm font-medium bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Format as exam question
        </button>

        {formatted && onAddFormatted && (
          <button
            onClick={() => onAddFormatted(formatted, estimateMarks(formatted))}
            className="px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
          >
            Add to paper
          </button>
        )}

        {(raw || formatted) && (
          <button
            onClick={handleReset}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
