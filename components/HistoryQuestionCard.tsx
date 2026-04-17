"use client";

import { HistoryQuestion } from "@/data/historyQuestions";

interface Props {
  question: HistoryQuestion;
  onAdd?: (q: HistoryQuestion) => void;
  onRemove?: (id: string) => void;
  isSelected?: boolean;
  showAnswer?: boolean;
}

const sectionColour: Record<string, string> = {
  "Section A": "bg-orange-50 text-orange-700 border-orange-200",
  "Section B": "bg-violet-50 text-violet-700 border-violet-200",
};

const typeColour: Record<string, string> = {
  SBQ: "bg-orange-50 text-orange-700 border-orange-200",
  Essay: "bg-violet-50 text-violet-700 border-violet-200",
};

const paperColour: Record<string, string> = {
  "Paper 1": "bg-blue-50 text-blue-700 border-blue-200",
  "Paper 2": "bg-emerald-50 text-emerald-700 border-emerald-200",
};

export default function HistoryQuestionCard({
  question: q,
  onAdd,
  onRemove,
  isSelected = false,
  showAnswer = false,
}: Props) {
  return (
    <div
      className={`bg-white rounded-xl border transition-shadow ${
        isSelected
          ? "border-indigo-400 shadow-md ring-1 ring-indigo-200"
          : "border-slate-200 shadow-sm hover:shadow-md"
      } p-5`}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex flex-wrap gap-1.5">
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${
              paperColour[q.paper] ?? "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            {q.paper}
          </span>
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${
              sectionColour[q.section] ?? "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            {q.section}
          </span>
          <span
            className={`inline-flex items-center text-xs font-semibold px-2 py-0.5 rounded-full border ${
              typeColour[q.questionType] ?? "bg-slate-50 text-slate-600 border-slate-200"
            }`}
          >
            {q.questionType}
          </span>
          <span className="inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {q.unit}
          </span>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="text-xs font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-full">
            {q.marks}m
          </span>
          {q.sourceLabel !== "Draft (Generated)" && (
            <span className="text-xs text-slate-400">{q.sourceYear}</span>
          )}
          {q.sourceLabel === "Draft (Generated)" && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100">
              Draft
            </span>
          )}
        </div>
      </div>

      {/* Exam issue */}
      <p className="text-xs text-slate-400 font-medium mb-2 uppercase tracking-wide">{q.examIssue}</p>

      {/* Sources (SBQ) */}
      {q.sources && q.sources.length > 0 && (
        <div className="mb-3 space-y-2">
          {q.sources.map((src) => (
            <div key={src.label} className="bg-amber-50 border border-amber-100 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-800 mb-0.5">
                {src.label} — <span className="font-normal italic">{src.provenance}</span>
              </p>
              <p className="text-xs text-amber-900 leading-relaxed line-clamp-3">"{src.excerpt}"</p>
            </div>
          ))}
        </div>
      )}

      {/* Subquestions (SBQ) */}
      {q.subquestions && q.subquestions.length > 0 ? (
        <div className="space-y-1.5 mb-3">
          {q.subquestions.map((sq) => (
            <p key={sq.label} className="text-sm text-slate-700 leading-relaxed">
              <span className="font-semibold">{sq.label}</span> {sq.text}
            </p>
          ))}
        </div>
      ) : (
        <p className="text-sm text-slate-700 leading-relaxed whitespace-pre-line mb-3">{q.text}</p>
      )}

      {/* Answer scheme (toggle) */}
      {showAnswer && q.answerScheme && (
        <div className="mt-2 bg-slate-50 border border-slate-200 rounded-lg p-3">
          <p className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">Answer Scheme</p>
          <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">{q.answerScheme}</p>
        </div>
      )}

      {/* Actions */}
      {(onAdd || onRemove) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex justify-end gap-2">
          {onRemove && (
            <button
              onClick={() => onRemove(q.id)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
            >
              Remove
            </button>
          )}
          {onAdd && (
            <button
              onClick={() => onAdd(q)}
              disabled={isSelected}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                isSelected
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-indigo-600 text-white hover:bg-indigo-700"
              }`}
            >
              {isSelected ? "Added" : "Add to Paper"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
