"use client";

import { PaperSection, totalMarks } from "@/lib/builderStore";

interface Props {
  title: string;
  sections: PaperSection[];
  onUpdateTitle: (title: string) => void;
}

export default function PaperPreview({ title, sections, onUpdateTitle }: Props) {
  const total = totalMarks(sections);
  const isEmpty = sections.every((s) => s.questions.length === 0);

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Preview header bar */}
      <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
          Live Preview
        </span>
        {!isEmpty && (
          <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
            {total} marks total
          </span>
        )}
      </div>

      {/* Paper content */}
      <div className="p-6 font-serif text-sm leading-relaxed min-h-[400px]">
        {/* Paper title */}
        <div className="text-center mb-6 pb-4 border-b-2 border-slate-800">
          <input
            type="text"
            value={title}
            onChange={(e) => onUpdateTitle(e.target.value)}
            className="text-lg font-bold text-slate-900 text-center bg-transparent border-none focus:outline-none focus:underline w-full"
          />
          <p className="text-xs text-slate-400 mt-1 font-sans">
            Time: ___ minutes &nbsp;|&nbsp; Total marks: {total} &nbsp;|&nbsp; Candidates should answer ALL questions.
          </p>
        </div>

        {isEmpty ? (
          <div className="text-center text-slate-400 py-12 font-sans text-sm">
            Add questions to see your paper preview here
          </div>
        ) : (
          <>
            {sections.map((section) => {
              if (section.questions.length === 0) return null;
              const sectionMarks = section.questions.reduce((s, q) => s + q.marks, 0);
              let questionNumber = 1;

              return (
                <div key={section.id} className="mb-8">
                  {/* Section heading */}
                  <div className="font-bold text-slate-900 text-sm uppercase tracking-widest mb-4 pb-1 border-b border-slate-300">
                    {section.title}
                    <span className="text-xs font-normal normal-case tracking-normal text-slate-400 ml-2">
                      ({sectionMarks} marks)
                    </span>
                  </div>

                  {section.questions.map((q, i) => {
                    const num = questionNumber++;
                    return (
                      <div key={q.id} className="mb-5">
                        <div className="flex gap-3">
                          <span className="font-bold text-slate-900 shrink-0 w-6">{num}.</span>
                          <div className="flex-1">
                            <p className="text-slate-800 whitespace-pre-wrap leading-relaxed">
                              {q.text}
                            </p>
                            <div className="flex justify-end mt-1.5">
                              <span className="text-xs text-slate-400 font-sans">
                                [{q.marks} {q.marks === 1 ? "mark" : "marks"}]
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}

            {/* End of paper */}
            <div className="text-center text-slate-400 text-xs font-sans border-t border-slate-200 pt-4 mt-6">
              — End of Paper — &nbsp; Total: {total} marks
            </div>
          </>
        )}
      </div>
    </div>
  );
}
