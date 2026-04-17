"use client";

import { useEffect } from "react";
import { ChemistryQuestion } from "@/data/chemistryQuestions";

interface Props {
  question: ChemistryQuestion | null;
  onClose: () => void;
  onAddToPaper: (q: ChemistryQuestion) => void;
  isAdded: boolean;
}

const difficultyColor: Record<string, string> = {
  "Easy": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Medium": "bg-amber-50 text-amber-700 border-amber-200",
  "Hard": "bg-red-50 text-red-700 border-red-200",
};

export default function QuestionDrawer({ question, onClose, onAddToPaper, isAdded }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!question) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Drawer */}
      <aside className="fixed right-0 top-0 h-full w-full max-w-lg bg-white z-50 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 bg-slate-50">
          <h2 className="font-semibold text-slate-900 text-sm">Question Detail</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 transition-colors p-1 rounded-lg hover:bg-slate-200"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5">
          {/* Metadata chips */}
          <div className="flex flex-wrap gap-2">
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {question.officialTopic}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {question.subtopic}
            </span>
            <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${difficultyColor[question.difficulty] ?? "bg-slate-100 text-slate-700 border-slate-200"}`}>
              {question.difficulty}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700">
              {question.questionType}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {question.paper}{question.section ? ` · ${question.section}` : ""}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
              {question.marks} {question.marks === 1 ? "mark" : "marks"}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-blue-700">
              {question.assessmentObjective}
            </span>
          </div>

          {/* Source */}
          <div className="text-xs text-slate-400 font-medium">
            {question.sourceLabel} · {question.sourceYear}
          </div>

          {/* Full question */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Question
            </h3>
            <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap border border-slate-100">
              {question.text}
            </div>
          </div>

          {/* Answer scheme */}
          <div>
            <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Answer Scheme / Mark Scheme
            </h3>
            <div className="bg-amber-50 rounded-lg p-4 text-sm text-amber-900 leading-relaxed whitespace-pre-wrap border border-amber-100">
              {question.answerScheme}
            </div>
          </div>

          {/* Tags */}
          {question.tags.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Tags
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {question.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer action */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50">
          <button
            onClick={() => {
              onAddToPaper(question);
              onClose();
            }}
            disabled={isAdded}
            className={`w-full py-2.5 rounded-lg text-sm font-medium transition-colors ${
              isAdded
                ? "bg-emerald-50 text-emerald-600 cursor-default border border-emerald-200"
                : "bg-indigo-600 text-white hover:bg-indigo-700"
            }`}
          >
            {isAdded ? "✓ Already added to paper" : "Add to paper"}
          </button>
        </div>
      </aside>
    </>
  );
}
