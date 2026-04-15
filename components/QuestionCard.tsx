"use client";

import { ChemistryQuestion } from "@/data/chemistryQuestions";

interface Props {
  question: ChemistryQuestion;
  onAddToPaper: (q: ChemistryQuestion) => void;
  onInspect: (q: ChemistryQuestion) => void;
  isAdded: boolean;
}

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Hard: "bg-red-50 text-red-700 border-red-200",
};

const typeColor: Record<string, string> = {
  Structured: "bg-indigo-50 text-indigo-700",
  MCQ: "bg-purple-50 text-purple-700",
  "Free Response": "bg-sky-50 text-sky-700",
  "Data-Based": "bg-teal-50 text-teal-700",
};

export default function QuestionCard({ question, onAddToPaper, onInspect, isAdded }: Props) {
  const preview =
    question.text.length > 160 ? question.text.slice(0, 160) + "…" : question.text;

  return (
    <div
      className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-5 flex flex-col gap-3 cursor-pointer group"
      onClick={() => onInspect(question)}
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-wrap gap-1.5">
          <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
            {question.topic}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full border ${
              difficultyColor[question.difficulty]
            }`}
          >
            {question.difficulty}
          </span>
          <span
            className={`text-xs font-medium px-2 py-0.5 rounded-full ${
              typeColor[question.questionType] ?? "bg-slate-100 text-slate-600"
            }`}
          >
            {question.questionType}
          </span>
        </div>
        <span className="text-xs text-slate-500 whitespace-nowrap font-medium shrink-0">
          {question.marks} {question.marks === 1 ? "mark" : "marks"}
        </span>
      </div>

      {/* Question preview */}
      <p className="text-sm text-slate-700 leading-relaxed">{preview}</p>

      {/* Tags */}
      {question.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {question.tags.slice(0, 4).map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-1.5 py-0.5 rounded bg-slate-50 text-slate-500 border border-slate-150"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1 mt-auto border-t border-slate-100">
        <span className="text-xs text-slate-400">
          {question.sourcePaper} · {question.sourceYear}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToPaper(question);
          }}
          disabled={isAdded}
          className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
            isAdded
              ? "bg-emerald-50 text-emerald-600 cursor-default"
              : "bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95"
          }`}
        >
          {isAdded ? "✓ Added" : "Add to paper"}
        </button>
      </div>
    </div>
  );
}
