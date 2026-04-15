"use client";

import { FormatterTemplate } from "@/data/formatterTemplates";

interface Props {
  templates: FormatterTemplate[];
  selected: string;
  onSelect: (id: string) => void;
}

const templateIcons: Record<string, React.ReactNode> = {
  structured: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
  ),
  essay: (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
    </svg>
  ),
  "source-based": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  "science-open": (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
    </svg>
  ),
};

export default function TemplateSelector({ templates, selected, onSelect }: Props) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {templates.map((t) => {
        const isSelected = t.id === selected;
        return (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`text-left p-4 rounded-xl border-2 transition-all ${
              isSelected
                ? "border-indigo-500 bg-indigo-50 shadow-sm"
                : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
            }`}
          >
            <div className={`mb-2 ${isSelected ? "text-indigo-600" : "text-slate-400"}`}>
              {templateIcons[t.id]}
            </div>
            <div className={`text-sm font-semibold mb-1 ${isSelected ? "text-indigo-800" : "text-slate-800"}`}>
              {t.name}
            </div>
            <div className={`text-xs leading-relaxed ${isSelected ? "text-indigo-600" : "text-slate-500"}`}>
              {t.description}
            </div>
          </button>
        );
      })}
    </div>
  );
}
