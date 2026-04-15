"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  BuilderState,
  PaperSection,
  loadBuilderState,
  saveBuilderState,
  clearBuilderState,
  totalMarks,
} from "@/lib/builderStore";
import BuilderPanel from "@/components/BuilderPanel";
import PaperPreview from "@/components/PaperPreview";
import RawFormatter from "@/components/RawFormatter";

export default function BuilderPage() {
  const [state, setState] = useState<BuilderState | null>(null);
  const [activeTab, setActiveTab] = useState<"editor" | "raw">("editor");
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setState(loadBuilderState());
  }, []);

  function update(newState: BuilderState) {
    setState(newState);
    saveBuilderState(newState);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }

  function handleUpdateQuestion(sectionId: string, qId: string, text: string) {
    if (!state) return;
    update({
      ...state,
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? {
              ...s,
              questions: s.questions.map((q) =>
                q.id === qId ? { ...q, text } : q
              ),
            }
          : s
      ),
    });
  }

  function handleRemoveQuestion(sectionId: string, qId: string) {
    if (!state) return;
    update({
      ...state,
      sections: state.sections.map((s) =>
        s.id === sectionId
          ? { ...s, questions: s.questions.filter((q) => q.id !== qId) }
          : s
      ),
    });
  }

  function handleMoveUp(sectionId: string, qId: string) {
    if (!state) return;
    update({
      ...state,
      sections: state.sections.map((s) => {
        if (s.id !== sectionId) return s;
        const idx = s.questions.findIndex((q) => q.id === qId);
        if (idx <= 0) return s;
        const questions = [...s.questions];
        [questions[idx - 1], questions[idx]] = [questions[idx], questions[idx - 1]];
        return { ...s, questions };
      }),
    });
  }

  function handleMoveDown(sectionId: string, qId: string) {
    if (!state) return;
    update({
      ...state,
      sections: state.sections.map((s) => {
        if (s.id !== sectionId) return s;
        const idx = s.questions.findIndex((q) => q.id === qId);
        if (idx < 0 || idx >= s.questions.length - 1) return s;
        const questions = [...s.questions];
        [questions[idx], questions[idx + 1]] = [questions[idx + 1], questions[idx]];
        return { ...s, questions };
      }),
    });
  }

  function handleMoveToSection(fromSectionId: string, qId: string, toSectionId: string) {
    if (!state) return;
    let question = null as null | (typeof state.sections)[0]["questions"][0];
    const sections = state.sections.map((s) => {
      if (s.id === fromSectionId) {
        const q = s.questions.find((q) => q.id === qId);
        if (q) question = q;
        return { ...s, questions: s.questions.filter((q) => q.id !== qId) };
      }
      return s;
    });
    if (!question) return;
    const q = question;
    update({
      ...state,
      sections: sections.map((s) =>
        s.id === toSectionId ? { ...s, questions: [...s.questions, q] } : s
      ),
    });
  }

  function handleUpdateSectionTitle(sectionId: string, title: string) {
    if (!state) return;
    update({
      ...state,
      sections: state.sections.map((s) =>
        s.id === sectionId ? { ...s, title } : s
      ),
    });
  }

  function handleUpdateTitle(title: string) {
    if (!state) return;
    update({ ...state, paperTitle: title });
  }

  function handleAddSection() {
    if (!state) return;
    const newSection: PaperSection = {
      id: `sec-${Date.now()}`,
      title: `Section ${String.fromCharCode(65 + state.sections.length)}`,
      questions: [],
    };
    update({ ...state, sections: [...state.sections, newSection] });
  }

  function handleClearAll() {
    if (!confirm("Clear all questions from the paper? This cannot be undone.")) return;
    clearBuilderState();
    setState(loadBuilderState());
  }

  function handleAddFormatted(text: string, marks: number) {
    if (!state) return;
    const newQ = {
      id: `pq-raw-${Date.now()}`,
      sourceId: `raw-${Date.now()}`,
      text,
      marks,
      topic: "Formatted",
      sourceInfo: "Raw Text → Formatted",
    };
    const newState: BuilderState = {
      ...state,
      sections: state.sections.map((s, i) => {
        if (i === 0) return { ...s, questions: [...s.questions, newQ] };
        return s;
      }),
    };
    update(newState);
    setActiveTab("editor");
  }

  if (!state) {
    // Loading skeleton
    return (
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-slate-200 rounded-lg" />
          <div className="h-4 w-48 bg-slate-100 rounded" />
          <div className="grid grid-cols-2 gap-6 mt-8">
            <div className="h-96 bg-slate-100 rounded-xl" />
            <div className="h-96 bg-slate-100 rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  const total = totalMarks(state.sections);
  const questionCount = state.sections.reduce((s, sec) => s + sec.questions.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-7">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Link
              href="/chemistry"
              className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1"
            >
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Chemistry Search
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Paper Builder</h1>
          <p className="text-sm text-slate-500">
            {questionCount === 0
              ? "No questions yet — search and add questions to get started."
              : `${questionCount} question${questionCount === 1 ? "" : "s"} · ${total} marks total`}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {saved && (
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              Saved
            </span>
          )}
          <button
            onClick={handleAddSection}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-sm"
          >
            + Add section
          </button>
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50"
          >
            Clear all
          </button>
          <Link
            href="/chemistry"
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 shadow-sm"
          >
            + Add questions
          </Link>
        </div>
      </div>

      {/* Tabs for left panel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left panel */}
        <div className="space-y-4">
          {/* Tab bar */}
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
            {(["editor", "raw"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? "bg-white text-slate-900 shadow-sm"
                    : "text-slate-500 hover:text-slate-700"
                }`}
              >
                {tab === "editor" ? "Question Editor" : "Raw Text Formatter"}
              </button>
            ))}
          </div>

          {activeTab === "editor" ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
              <BuilderPanel
                sections={state.sections}
                onUpdateQuestion={handleUpdateQuestion}
                onRemoveQuestion={handleRemoveQuestion}
                onMoveUp={handleMoveUp}
                onMoveDown={handleMoveDown}
                onMoveToSection={handleMoveToSection}
                onUpdateSectionTitle={handleUpdateSectionTitle}
              />
            </div>
          ) : (
            <RawFormatter onAddFormatted={handleAddFormatted} />
          )}
        </div>

        {/* Right panel: paper preview */}
        <div>
          <PaperPreview
            title={state.paperTitle}
            sections={state.sections}
            onUpdateTitle={handleUpdateTitle}
          />
        </div>
      </div>
    </div>
  );
}
