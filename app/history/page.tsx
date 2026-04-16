"use client";

import { useState, useCallback } from "react";
import { HistoryQuestion, HistoryLevel, HistoryQuestionType } from "@/data/historyQuestions";
import {
  searchHistoryQuestions,
  retrieveByInquiry,
  defaultHistoryFilters,
  allHistoryTopics,
  allHistoryLevels,
  allHistoryPeriods,
  allHistoryQuestionTypes,
  HistorySearchFilters,
} from "@/lib/historySearch";
import { generateHistoryQuestion, generateAnswerGuide, AnswerGuide } from "@/lib/historyGeneration";
import HistoryQuestionCard from "@/components/HistoryQuestionCard";

type Tab = "bank" | "draft" | "answers";

export default function HistoryPage() {
  const [tab, setTab] = useState<Tab>("bank");
  const [inquiry, setInquiry] = useState("");
  const [inquiryResults, setInquiryResults] = useState<HistoryQuestion[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const [filters, setFilters] = useState<HistorySearchFilters>(defaultHistoryFilters);
  const [showAnswers, setShowAnswers] = useState(false);

  // Draft paper
  const [draftQuestions, setDraftQuestions] = useState<HistoryQuestion[]>([]);
  const [paperTitle, setPaperTitle] = useState("History Exam Paper");
  const [answerGuides, setAnswerGuides] = useState<AnswerGuide[]>([]);
  const [generatingAnswers, setGeneratingAnswers] = useState(false);

  // Generation panel
  const [genTopic, setGenTopic] = useState("World War II");
  const [genLevel, setGenLevel] = useState<HistoryLevel>("O Level");
  const [genType, setGenType] = useState<HistoryQuestionType>("Structured Essay");

  // ── Search / Inquiry ──────────────────────────────────────────────────────
  const handleInquirySearch = useCallback(async () => {
    if (!inquiry.trim()) return;
    setIsSearching(true);
    setInquiryResults(null);
    await new Promise((r) => setTimeout(r, 700));
    const results = retrieveByInquiry(inquiry);
    setInquiryResults(results);
    setIsSearching(false);
  }, [inquiry]);

  const filteredQuestions = searchHistoryQuestions(filters);
  const displayedQuestions = inquiryResults ?? filteredQuestions;

  // ── Draft paper management ─────────────────────────────────────────────────
  const addToDraft = useCallback((q: HistoryQuestion) => {
    setDraftQuestions((prev) =>
      prev.find((p) => p.id === q.id) ? prev : [...prev, q]
    );
  }, []);

  const removeFromDraft = useCallback((id: string) => {
    setDraftQuestions((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setDraftQuestions((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveDown = (idx: number) => {
    setDraftQuestions((prev) => {
      if (idx >= prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const totalMarks = draftQuestions.reduce((s, q) => s + q.marks, 0);

  // ── Generate question ──────────────────────────────────────────────────────
  const handleGenerate = () => {
    const q = generateHistoryQuestion(genTopic, genLevel, genType);
    addToDraft(q);
    setTab("draft");
  };

  // ── Answer guide ───────────────────────────────────────────────────────────
  const handleGenerateAnswers = async () => {
    if (draftQuestions.length === 0) return;
    setGeneratingAnswers(true);
    setTab("answers");
    await new Promise((r) => setTimeout(r, 900));
    setAnswerGuides(generateAnswerGuide(draftQuestions));
    setGeneratingAnswers(false);
  };

  // ── Print / export ─────────────────────────────────────────────────────────
  const handlePrint = () => window.print();

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* ── Page Header ─────────────────────────────────────────────── */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-violet-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.966 8.966 0 00-6 2.292m0-14.25v14.25" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 leading-tight">History Exam Paper Builder</h1>
            <p className="text-sm text-slate-500">Search past questions, generate new ones, build a draft paper and produce an answer guide.</p>
          </div>
        </div>

        {/* Inquiry bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">Topic / Inquiry Input</p>
          <div className="flex gap-2">
            <input
              value={inquiry}
              onChange={(e) => setInquiry(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleInquirySearch()}
              placeholder="e.g. 'Why did appeasement fail?' or 'Cold War source-based O Level'…"
              className="flex-1 px-4 py-2.5 text-sm border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-400 bg-slate-50"
            />
            <button
              onClick={handleInquirySearch}
              disabled={isSearching || !inquiry.trim()}
              className="px-5 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-xl hover:bg-violet-700 disabled:opacity-50 transition-colors flex items-center gap-2"
            >
              {isSearching ? (
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
                </svg>
              )}
              {isSearching ? "Searching…" : "Find Questions"}
            </button>
            {inquiryResults && (
              <button
                onClick={() => { setInquiryResults(null); setInquiry(""); }}
                className="px-3 py-2.5 text-sm text-slate-500 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
          {inquiryResults !== null && (
            <p className="text-xs text-slate-400 mt-2">
              {inquiryResults.length === 0
                ? "No matching questions found — try different keywords or browse below."
                : `${inquiryResults.length} question${inquiryResults.length !== 1 ? "s" : ""} matched your inquiry`}
            </p>
          )}
        </div>
      </div>

      {/* ── Tab bar ──────────────────────────────────────────────────── */}
      <div className="flex items-center gap-1 border-b border-slate-200 mb-6">
        {(
          [
            { id: "bank", label: "Question Bank", count: displayedQuestions.length },
            { id: "draft", label: "Draft Paper", count: draftQuestions.length },
            { id: "answers", label: "Answer Guide", count: answerGuides.length },
          ] as { id: Tab; label: string; count: number }[]
        ).map(({ id, label, count }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors -mb-px ${
              tab === id
                ? "border-violet-600 text-violet-700"
                : "border-transparent text-slate-500 hover:text-slate-800"
            }`}
          >
            {label}
            {count > 0 && (
              <span
                className={`ml-1.5 text-xs px-1.5 py-0.5 rounded-full ${
                  tab === id ? "bg-violet-100 text-violet-700" : "bg-slate-100 text-slate-500"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        ))}

        <div className="ml-auto flex gap-2 pb-1">
          {tab === "draft" && draftQuestions.length > 0 && (
            <>
              <button
                onClick={handleGenerateAnswers}
                disabled={generatingAnswers}
                className="px-4 py-2 text-sm font-semibold bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 disabled:opacity-50 transition-colors"
              >
                Generate Answer Guide
              </button>
              <button
                onClick={handlePrint}
                className="px-4 py-2 text-sm font-semibold border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Print / Export
              </button>
            </>
          )}
        </div>
      </div>

      {/* ── Question Bank tab ─────────────────────────────────────────── */}
      {tab === "bank" && (
        <div className="flex gap-6">
          {/* Filter sidebar */}
          <aside className="w-56 shrink-0 space-y-5">
            {/* Filters header */}
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Filters</p>
              <button
                onClick={() => setFilters(defaultHistoryFilters)}
                className="text-xs text-violet-600 hover:underline"
              >
                Reset
              </button>
            </div>

            {/* Topic */}
            <div>
              <p className="text-xs font-medium text-slate-700 mb-1.5">Topic</p>
              <div className="space-y-1">
                {allHistoryTopics.map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilters((f) => ({ ...f, topic: t }))}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                      filters.topic === t
                        ? "bg-violet-100 text-violet-800 font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Level */}
            <div>
              <p className="text-xs font-medium text-slate-700 mb-1.5">Level</p>
              <div className="space-y-1">
                {(["All", ...allHistoryLevels] as string[]).map((l) => (
                  <button
                    key={l}
                    onClick={() => setFilters((f) => ({ ...f, level: l }))}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                      filters.level === l
                        ? "bg-violet-100 text-violet-800 font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Question type */}
            <div>
              <p className="text-xs font-medium text-slate-700 mb-1.5">Question Type</p>
              <div className="space-y-1">
                {(["All", ...allHistoryQuestionTypes] as string[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setFilters((f) => ({ ...f, questionType: t }))}
                    className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                      filters.questionType === t
                        ? "bg-violet-100 text-violet-800 font-semibold"
                        : "text-slate-600 hover:bg-slate-100"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Keyword search */}
            <div>
              <p className="text-xs font-medium text-slate-700 mb-1.5">Keyword</p>
              <input
                value={filters.keyword}
                onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
                placeholder="e.g. Hitler, merger…"
                className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300"
              />
            </div>

            {/* Toggle answers */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowAnswers((v) => !v)}
                className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${
                  showAnswers ? "bg-violet-600" : "bg-slate-300"
                }`}
              >
                <span
                  className={`inline-block h-3.5 w-3.5 rounded-full bg-white shadow transition-transform ${
                    showAnswers ? "translate-x-4.5" : "translate-x-0.5"
                  }`}
                />
              </button>
              <span className="text-xs text-slate-600">Show answer outlines</span>
            </div>

            {/* Generate question */}
            <div className="pt-3 border-t border-slate-100">
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Generate Question</p>
              <div className="space-y-2">
                <select
                  value={genTopic}
                  onChange={(e) => setGenTopic(e.target.value)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300"
                >
                  {allHistoryTopics.filter((t) => t !== "All").map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <select
                  value={genLevel}
                  onChange={(e) => setGenLevel(e.target.value as HistoryLevel)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300"
                >
                  {allHistoryLevels.map((l) => (
                    <option key={l}>{l}</option>
                  ))}
                </select>
                <select
                  value={genType}
                  onChange={(e) => setGenType(e.target.value as HistoryQuestionType)}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-violet-300"
                >
                  {allHistoryQuestionTypes.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                <button
                  onClick={handleGenerate}
                  className="w-full py-2 text-xs font-semibold bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
                >
                  + Generate &amp; Add
                </button>
              </div>
            </div>
          </aside>

          {/* Question list */}
          <div className="flex-1">
            {inquiryResults !== null && (
              <div className="mb-4 bg-violet-50 border border-violet-100 rounded-xl px-4 py-2.5 text-sm text-violet-800">
                Showing results for: <strong>"{inquiry}"</strong>
              </div>
            )}
            {displayedQuestions.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <svg className="w-10 h-10 mx-auto mb-3 opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm font-medium">No questions match your filters</p>
                <button onClick={() => setFilters(defaultHistoryFilters)} className="mt-2 text-sm text-violet-600 hover:underline">
                  Reset filters
                </button>
              </div>
            ) : (
              <div className="grid gap-4">
                {displayedQuestions.map((q) => (
                  <HistoryQuestionCard
                    key={q.id}
                    question={q}
                    onAdd={addToDraft}
                    isSelected={draftQuestions.some((p) => p.id === q.id)}
                    showAnswer={showAnswers}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Draft Paper tab ───────────────────────────────────────────── */}
      {tab === "draft" && (
        <div className="max-w-3xl">
          {/* Paper title */}
          <div className="flex items-center gap-3 mb-6">
            <input
              value={paperTitle}
              onChange={(e) => setPaperTitle(e.target.value)}
              className="flex-1 text-xl font-bold text-slate-900 border-b-2 border-slate-200 focus:border-violet-400 focus:outline-none pb-1 bg-transparent"
            />
            {draftQuestions.length > 0 && (
              <span className="text-sm font-semibold text-slate-500 shrink-0">
                {totalMarks} marks total
              </span>
            )}
          </div>

          {draftQuestions.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
              <svg className="w-10 h-10 mx-auto mb-3 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-sm font-medium text-slate-500 mb-1">Your draft paper is empty</p>
              <p className="text-xs text-slate-400">Add questions from the Question Bank tab</p>
              <button
                onClick={() => setTab("bank")}
                className="mt-4 px-4 py-2 text-sm font-semibold bg-violet-600 text-white rounded-lg hover:bg-violet-700 transition-colors"
              >
                Browse Question Bank
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {draftQuestions.map((q, idx) => (
                <div key={q.id} className="flex gap-3 items-start">
                  {/* Ordering controls */}
                  <div className="flex flex-col gap-1 pt-5 shrink-0">
                    <button
                      onClick={() => moveUp(idx)}
                      disabled={idx === 0}
                      className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100 disabled:opacity-20 transition-colors"
                      title="Move up"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                      </svg>
                    </button>
                    <span className="text-xs font-bold text-slate-400 text-center w-6">Q{idx + 1}</span>
                    <button
                      onClick={() => moveDown(idx)}
                      disabled={idx === draftQuestions.length - 1}
                      className="w-6 h-6 flex items-center justify-center rounded text-slate-400 hover:bg-slate-100 disabled:opacity-20 transition-colors"
                      title="Move down"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </div>
                  <div className="flex-1">
                    <HistoryQuestionCard
                      question={q}
                      onRemove={removeFromDraft}
                      isSelected={false}
                    />
                  </div>
                </div>
              ))}

              <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                <p className="text-sm font-bold text-slate-700">
                  Total: {totalMarks} marks · {draftQuestions.length} question{draftQuestions.length !== 1 ? "s" : ""}
                </p>
                <button
                  onClick={handleGenerateAnswers}
                  disabled={generatingAnswers}
                  className="px-5 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-xl hover:bg-emerald-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {generatingAnswers ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                      </svg>
                      Generating…
                    </>
                  ) : (
                    "Generate Answer Guide →"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Answer Guide tab ──────────────────────────────────────────── */}
      {tab === "answers" && (
        <div className="max-w-3xl">
          {generatingAnswers ? (
            <div className="text-center py-20">
              <svg className="w-10 h-10 animate-spin mx-auto mb-4 text-emerald-500" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
              </svg>
              <p className="text-sm font-medium text-slate-600">Generating answer guide…</p>
            </div>
          ) : answerGuides.length === 0 ? (
            <div className="text-center py-20 bg-slate-50 border border-dashed border-slate-300 rounded-2xl">
              <p className="text-sm font-medium text-slate-500 mb-1">No answer guide yet</p>
              <p className="text-xs text-slate-400 mb-4">Add questions to your draft paper first, then generate the guide</p>
              <button
                onClick={() => setTab("bank")}
                className="px-4 py-2 text-sm font-semibold bg-violet-600 text-white rounded-lg hover:bg-violet-700"
              >
                Browse Questions
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">{paperTitle} — Answer Guide</h2>
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 text-sm font-semibold border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Print / Export
                </button>
              </div>

              {answerGuides.map((guide, qIdx) => (
                <div key={guide.questionId} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  {/* Question header */}
                  <div className="bg-slate-50 border-b border-slate-200 px-5 py-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-0.5">Question {qIdx + 1}</p>
                      <p className="text-sm text-slate-700 font-medium line-clamp-2">{guide.questionText.slice(0, 120)}{guide.questionText.length > 120 ? "…" : ""}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <span className="text-xs font-bold text-slate-700 bg-white border border-slate-200 px-2 py-0.5 rounded-full">
                        {guide.totalMarks}m
                      </span>
                      <span className="text-xs text-slate-500">{guide.level}</span>
                    </div>
                  </div>

                  <div className="p-5 space-y-4">
                    {/* Mark scheme entries */}
                    {guide.markScheme.map((entry, eIdx) => (
                      <div key={eIdx} className="space-y-2">
                        {guide.markScheme.length > 1 && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-violet-700 bg-violet-50 border border-violet-100 px-2 py-0.5 rounded">
                              {entry.part}
                            </span>
                            <span className="text-xs text-slate-500">[{entry.marks} mark{entry.marks !== 1 ? "s" : ""}]</span>
                          </div>
                        )}

                        <p className="text-sm text-slate-700 whitespace-pre-line leading-relaxed">{entry.guidance}</p>

                        {entry.levelDescriptors && (
                          <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
                            <table className="w-full text-xs">
                              <thead>
                                <tr className="bg-slate-50 border-b border-slate-200">
                                  <th className="text-left px-3 py-2 font-semibold text-slate-600 w-12">Level</th>
                                  <th className="text-left px-3 py-2 font-semibold text-slate-600 w-16">Marks</th>
                                  <th className="text-left px-3 py-2 font-semibold text-slate-600">Descriptor</th>
                                </tr>
                              </thead>
                              <tbody>
                                {entry.levelDescriptors.map((ld) => (
                                  <tr key={ld.level} className="border-b border-slate-100 last:border-0">
                                    <td className="px-3 py-2 font-bold text-violet-700">{ld.level}</td>
                                    <td className="px-3 py-2 text-slate-600">{ld.marks}</td>
                                    <td className="px-3 py-2 text-slate-600">{ld.description}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </div>
                        )}
                      </div>
                    ))}

                    {/* General advice */}
                    <div className="bg-amber-50 border border-amber-100 rounded-lg p-3">
                      <p className="text-xs font-semibold text-amber-800 mb-1">Marking Advice</p>
                      <p className="text-xs text-amber-700 leading-relaxed">{guide.generalAdvice}</p>
                    </div>
                  </div>
                </div>
              ))}

              <div className="text-center pt-4 pb-2">
                <p className="text-xs text-slate-400">End of Answer Guide · {answerGuides.length} question{answerGuides.length !== 1 ? "s" : ""} · {answerGuides.reduce((s, g) => s + g.totalMarks, 0)} marks total</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
