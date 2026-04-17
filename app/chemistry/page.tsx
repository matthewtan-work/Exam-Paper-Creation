"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ChemistryQuestion } from "@/data/chemistryQuestions";
import type { OfficialChemTopic } from "@/data/syllabusChemistry";
import { VALID_QUESTION_TYPES_PER_PAPER } from "@/data/syllabusChemistry";
import {
  SearchFilters,
  defaultFilters,
  searchQuestions,
  parseNaturalQuery,
  allPapers,
  allOfficialTopics,
  allQuestionTypes,
  allDifficulties,
} from "@/lib/chemistrySearch";
import {
  questionToPaperQuestion,
  loadBuilderState,
  saveBuilderState,
  BuilderState,
} from "@/lib/builderStore";
import { generateMockQuestion } from "@/lib/mockGeneration";
import type { Difficulty, QuestionType } from "@/data/chemistryQuestions";
import QuestionCard from "@/components/QuestionCard";
import QuestionDrawer from "@/components/QuestionDrawer";
import SearchBar from "@/components/SearchBar";

// Paper tab labels
const paperTabLabels: Record<string, string> = {
  "All": "All Papers",
  "Paper 1": "Paper 1 — MCQ",
  "Paper 2": "Paper 2 — Structured",
  "Paper 3": "Paper 3 — Practical",
};

// ----- Smart search bar -----
function SmartSearchBar({
  onSearch,
}: {
  onSearch: (filters: SearchFilters) => void;
}) {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!prompt.trim()) return;
    setLoading(true);
    setTimeout(() => {
      onSearch(parseNaturalQuery(prompt));
      setLoading(false);
    }, 500);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="relative flex-1">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
          </svg>
        </span>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='e.g. "hard structured question on redox" or "easy mole concept MCQ"'
          className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder:text-slate-400"
        />
      </div>
      <button
        type="submit"
        disabled={!prompt.trim() || loading}
        className="px-5 py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
      >
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}

// ----- Generate question panel -----
function GeneratePanel({
  onGenerate,
}: {
  onGenerate: (q: ChemistryQuestion) => void;
}) {
  const [open, setOpen] = useState(false);
  const topics = allOfficialTopics.filter((t) => t !== "All") as OfficialChemTopic[];
  const [topic, setTopic] = useState<OfficialChemTopic>(topics[0]);
  const [type, setType] = useState<QuestionType>("Structured");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");

  function handleGenerate() {
    onGenerate(generateMockQuestion(topic, type, difficulty));
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition-colors"
      >
        <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
        </svg>
        Generate question
      </button>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-900">Generate Draft Question</h2>
            <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1.5">Topic</label>
              <select
                value={topic}
                onChange={(e) => setTopic(e.target.value as OfficialChemTopic)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {topics.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1.5">Question Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as QuestionType)}
                className="w-full text-sm bg-white border border-slate-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {(["Structured", "MCQ", "Free Response", "Data-Based", "Practical"] as QuestionType[]).map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500 uppercase tracking-wide block mb-1.5">Difficulty</label>
              <div className="flex gap-2">
                {(["Easy", "Medium", "Hard"] as Difficulty[]).map((d) => (
                  <button
                    key={d}
                    onClick={() => setDifficulty(d)}
                    className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-colors ${
                      difficulty === d
                        ? "bg-indigo-600 text-white border-indigo-600"
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <button
              onClick={() => setOpen(false)}
              className="flex-1 py-2.5 text-sm font-medium text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleGenerate}
              className="flex-1 py-2.5 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
            >
              Generate
            </button>
          </div>
          <p className="text-xs text-slate-400 text-center mt-3">
            Generates a plausible draft question — connect a real LLM API for production
          </p>
        </div>
      </div>
    </>
  );
}

// ----- Main page -----
export default function ChemistryPage() {
  const [filters, setFilters] = useState<SearchFilters>(defaultFilters);
  const [inspecting, setInspecting] = useState<ChemistryQuestion | null>(null);
  const [builderState, setBuilderState] = useState<BuilderState | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<ChemistryQuestion[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setBuilderState(loadBuilderState());
  }, []);

  const allResults = useMemo(() => {
    const searched = searchQuestions(filters);
    const matchingGenerated = generatedQuestions.filter((q) => {
      if (filters.paper !== "All" && q.paper !== filters.paper) return false;
      if (filters.officialTopic !== "All" && q.officialTopic !== filters.officialTopic) return false;
      if (filters.questionType !== "All" && q.questionType !== filters.questionType) return false;
      if (filters.difficulty !== "All" && q.difficulty !== filters.difficulty) return false;
      return true;
    });
    return [...matchingGenerated, ...searched];
  }, [filters, generatedQuestions]);

  const addedIds = useMemo(() => {
    if (!builderState) return new Set<string>();
    const ids = new Set<string>();
    builderState.sections.forEach((s) => s.questions.forEach((q) => ids.add(q.sourceId)));
    return ids;
  }, [builderState]);

  function handleAddToPaper(q: ChemistryQuestion) {
    const state = builderState ?? loadBuilderState();
    const newState: BuilderState = {
      ...state,
      sections: state.sections.map((s, i) =>
        i === 0 ? { ...s, questions: [...s.questions, questionToPaperQuestion(q)] } : s
      ),
    };
    setBuilderState(newState);
    saveBuilderState(newState);
    setAddedToast(q.id);
    setTimeout(() => setAddedToast(null), 2000);
  }

  function handleGenerated(q: ChemistryQuestion) {
    setGeneratedQuestions((prev) => [q, ...prev]);
    setFilters((prev) => ({ ...prev, paper: q.paper, officialTopic: q.officialTopic }));
  }

  const paperCount = builderState
    ? builderState.sections.reduce((s, sec) => s + sec.questions.length, 0)
    : 0;

  const hasActiveFilters =
    filters.section !== "All" ||
    filters.officialTopic !== "All" ||
    filters.questionType !== "All" ||
    filters.difficulty !== "All" ||
    filters.marks !== "any" ||
    !!filters.query.trim();

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Chemistry Question Search</h1>
          <p className="text-sm text-slate-500">
            SEAB 6092 · {allResults.length} question{allResults.length !== 1 ? "s" : ""} across Paper 1, 2 &amp; 3
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <GeneratePanel onGenerate={handleGenerated} />
          <Link
            href="/chemistry/builder"
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 shadow-sm transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Paper Builder
            {paperCount > 0 && (
              <span className="bg-white text-indigo-700 text-xs font-bold px-1.5 py-0.5 rounded-full">
                {paperCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Paper tabs */}
      <div className="mb-6 border-b border-slate-200">
        <div className="flex gap-0 overflow-x-auto">
          {allPapers.map((paper) => {
            const isActive = filters.paper === paper;
            return (
              <button
                key={paper}
                onClick={() => setFilters({ ...defaultFilters, paper, query: filters.query })}
                className={`px-5 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? "border-indigo-600 text-indigo-700"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                {paperTabLabels[paper] ?? paper}
              </button>
            );
          })}
        </div>
      </div>

      {/* Section sub-tabs (Paper 2 only) */}
      {filters.paper === "Paper 2" && (
        <div className="flex gap-2 mb-5">
          {["All", "Section A", "Section B"].map((sec) => (
            <button
              key={sec}
              onClick={() => setFilters((f) => ({ ...f, section: sec }))}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-colors ${
                filters.section === sec
                  ? "bg-indigo-600 text-white border-indigo-600"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {sec === "All" ? "All Sections" : sec === "Section A" ? "Section A — Compulsory" : "Section B — Choice"}
            </button>
          ))}
        </div>
      )}

      {/* Search + filter row */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex gap-2">
          <div className="flex-1">
            <SmartSearchBar
              onSearch={(newFilters) => setFilters({ ...newFilters, paper: filters.paper })}
            />
          </div>
          <button
            onClick={() => setShowFilters((v) => !v)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-xl border transition-colors ${
              hasActiveFilters
                ? "bg-indigo-50 border-indigo-200 text-indigo-700"
                : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4h18M7 8h10M11 12h2" />
            </svg>
            Filters
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-indigo-500 shrink-0" />
            )}
          </button>
        </div>

        {showFilters && (
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
            <div className="flex flex-wrap gap-4 items-end">
              {/* Topic */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Topic</label>
                <select
                  value={filters.officialTopic}
                  onChange={(e) => setFilters((f) => ({ ...f, officialTopic: e.target.value }))}
                  className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 min-w-[200px]"
                >
                  {allOfficialTopics.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Question type */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Type</label>
                <select
                  value={filters.questionType}
                  onChange={(e) => setFilters((f) => ({ ...f, questionType: e.target.value }))}
                  className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 min-w-[140px]"
                >
                  {allQuestionTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>

              {/* Difficulty */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Difficulty</label>
                <select
                  value={filters.difficulty}
                  onChange={(e) => setFilters((f) => ({ ...f, difficulty: e.target.value }))}
                  className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 min-w-[140px]"
                >
                  {allDifficulties.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>

              {/* Marks */}
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">Marks</label>
                <select
                  value={filters.marks}
                  onChange={(e) => setFilters((f) => ({ ...f, marks: e.target.value }))}
                  className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 min-w-[120px]"
                >
                  {["any", "1-2", "3-4", "5+"].map((m) => (
                    <option key={m} value={m}>{m === "any" ? "Any marks" : `${m} marks`}</option>
                  ))}
                </select>
              </div>

              {hasActiveFilters && (
                <button
                  onClick={() => setFilters({ ...defaultFilters, paper: filters.paper })}
                  className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-0.5"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Results header */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-slate-500">
          {allResults.length === 0
            ? "No questions found"
            : `${allResults.length} question${allResults.length !== 1 ? "s" : ""}`}
        </span>
        {hasActiveFilters && (
          <button
            onClick={() => setFilters({ ...defaultFilters, paper: filters.paper })}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Results grid */}
      {allResults.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
            <svg className="w-7 h-7 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 0 5 11a6 6 0 0 0 12 0z" />
            </svg>
          </div>
          <p className="text-sm font-medium text-slate-600 mb-1">No questions match your filters</p>
          <p className="text-sm text-slate-400 mb-4">Try adjusting the topic, demand level, or clearing your search.</p>
          <button
            onClick={() => setFilters({ ...defaultFilters, paper: filters.paper })}
            className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {allResults.map((q) => (
            <QuestionCard
              key={q.id}
              question={q}
              onAddToPaper={handleAddToPaper}
              onInspect={setInspecting}
              isAdded={addedIds.has(q.id)}
            />
          ))}
        </div>
      )}

      {/* Drawer */}
      <QuestionDrawer
        question={inspecting}
        onClose={() => setInspecting(null)}
        onAddToPaper={handleAddToPaper}
        isAdded={inspecting ? addedIds.has(inspecting.id) : false}
      />

      {/* Toast */}
      {addedToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-sm font-medium px-4 py-2.5 rounded-xl shadow-xl z-50 flex items-center gap-2">
          <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Question added to paper
        </div>
      )}
    </div>
  );
}
