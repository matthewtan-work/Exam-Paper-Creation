"use client";

import { PaperSection, PaperQuestion } from "@/lib/builderStore";

interface Props {
  sections: PaperSection[];
  onUpdateQuestion: (sectionId: string, qId: string, text: string) => void;
  onRemoveQuestion: (sectionId: string, qId: string) => void;
  onMoveUp: (sectionId: string, qId: string) => void;
  onMoveDown: (sectionId: string, qId: string) => void;
  onMoveToSection: (fromSectionId: string, qId: string, toSectionId: string) => void;
  onUpdateSectionTitle: (sectionId: string, title: string) => void;
}

function QuestionRow({
  question,
  index,
  sectionId,
  isFirst,
  isLast,
  sections,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  onMoveToSection,
}: {
  question: PaperQuestion;
  index: number;
  sectionId: string;
  isFirst: boolean;
  isLast: boolean;
  sections: PaperSection[];
  onUpdate: (text: string) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onMoveToSection: (toSectionId: string) => void;
}) {
  const otherSections = sections.filter((s) => s.id !== sectionId);

  return (
    <div className="flex gap-3 items-start p-3 rounded-lg border border-slate-100 hover:border-slate-200 bg-white transition-colors group">
      {/* Number */}
      <span className="text-sm font-semibold text-slate-400 mt-2.5 w-5 shrink-0 text-right">
        {index + 1}.
      </span>

      {/* Editable text */}
      <div className="flex-1 min-w-0">
        <textarea
          value={question.text}
          onChange={(e) => onUpdate(e.target.value)}
          rows={3}
          className="w-full text-sm text-slate-800 bg-transparent resize-none focus:outline-none focus:ring-1 focus:ring-indigo-300 rounded p-1 -m-1 leading-relaxed"
        />
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[11px] text-slate-400">{question.topic}</span>
          <span className="text-[11px] text-slate-300">·</span>
          <span className="text-[11px] text-slate-400">{question.sourceInfo}</span>
          <span className="text-[11px] font-medium text-slate-500 ml-auto">
            [{question.marks} {question.marks === 1 ? "mark" : "marks"}]
          </span>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
        <button
          onClick={onMoveUp}
          disabled={isFirst}
          title="Move up"
          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
        <button
          onClick={onMoveDown}
          disabled={isLast}
          title="Move down"
          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-20 disabled:cursor-not-allowed"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {otherSections.length > 0 && (
          <select
            title="Move to section"
            className="text-[11px] text-slate-500 bg-transparent cursor-pointer border-none focus:outline-none"
            onChange={(e) => {
              if (e.target.value) onMoveToSection(e.target.value);
              e.target.value = "";
            }}
            defaultValue=""
          >
            <option value="" disabled>→</option>
            {otherSections.map((s) => (
              <option key={s.id} value={s.id}>
                {s.title}
              </option>
            ))}
          </select>
        )}
        <button
          onClick={onRemove}
          title="Remove"
          className="p-1 rounded text-red-300 hover:text-red-600 hover:bg-red-50"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default function BuilderPanel({
  sections,
  onUpdateQuestion,
  onRemoveQuestion,
  onMoveUp,
  onMoveDown,
  onMoveToSection,
  onUpdateSectionTitle,
}: Props) {
  const isEmpty = sections.every((s) => s.questions.length === 0);

  if (isEmpty) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
          <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <p className="text-sm font-medium text-slate-600 mb-1">No questions added yet</p>
        <p className="text-sm text-slate-400 max-w-xs">
          Search for questions and click "Add to paper" to build your exam.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.id}>
          {/* Section header */}
          <div className="flex items-center gap-2 mb-3">
            <input
              type="text"
              value={section.title}
              onChange={(e) => onUpdateSectionTitle(section.id, e.target.value)}
              className="text-sm font-semibold text-slate-700 bg-transparent border-b border-transparent hover:border-slate-300 focus:border-indigo-400 focus:outline-none px-0.5 py-0.5"
            />
            <span className="text-xs text-slate-400">
              ({section.questions.length} {section.questions.length === 1 ? "question" : "questions"}
              {" · "}
              {section.questions.reduce((s, q) => s + q.marks, 0)} marks)
            </span>
          </div>

          {section.questions.length === 0 ? (
            <div className="text-sm text-slate-400 italic py-3 px-4 rounded-lg border border-dashed border-slate-200">
              No questions in this section yet
            </div>
          ) : (
            <div className="space-y-2">
              {section.questions.map((q, i) => (
                <QuestionRow
                  key={q.id}
                  question={q}
                  index={i}
                  sectionId={section.id}
                  isFirst={i === 0}
                  isLast={i === section.questions.length - 1}
                  sections={sections}
                  onUpdate={(text) => onUpdateQuestion(section.id, q.id, text)}
                  onRemove={() => onRemoveQuestion(section.id, q.id)}
                  onMoveUp={() => onMoveUp(section.id, q.id)}
                  onMoveDown={() => onMoveDown(section.id, q.id)}
                  onMoveToSection={(toSectionId) => onMoveToSection(section.id, q.id, toSectionId)}
                />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
