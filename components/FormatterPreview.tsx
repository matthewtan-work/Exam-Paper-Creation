"use client";

import { useState } from "react";

interface Props {
  formatted: string;
  templateName: string;
  onReset: () => void;
}

export default function FormatterPreview({ formatted, templateName, onReset }: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (!formatted) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center bg-slate-50 rounded-xl border border-slate-200 min-h-[300px]">
        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
          <svg className="w-6 h-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-500 mb-1">No output yet</p>
        <p className="text-xs text-slate-400">Paste your text and click "Format" to see the result here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Preview header */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Formatted Output
          </span>
          <span className="text-xs bg-indigo-100 text-indigo-700 font-medium px-2 py-0.5 rounded-full">
            {templateName}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`text-xs font-medium px-3 py-1.5 rounded-lg border transition-colors ${
              copied
                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {copied ? "✓ Copied" : "Copy"}
          </button>
          <button
            onClick={onReset}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={() => window.print()}
            className="text-xs font-medium px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 transition-colors"
          >
            Export ↗
          </button>
        </div>
      </div>

      {/* Exam-style paper preview */}
      <div className="p-7 font-serif text-sm leading-relaxed">
        <div className="max-w-2xl mx-auto">
          {/* Mock exam header */}
          <div className="text-center mb-6 pb-4 border-b-2 border-slate-800">
            <div className="text-base font-bold text-slate-900 mb-0.5">
              {templateName.toUpperCase()}
            </div>
            <div className="text-xs text-slate-400 font-sans">
              Read all questions carefully before answering.
            </div>
          </div>

          {/* Formatted content */}
          <pre className="whitespace-pre-wrap text-slate-800 leading-7 font-serif text-sm">
            {formatted}
          </pre>
        </div>
      </div>
    </div>
  );
}
