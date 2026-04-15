"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ChemistryQuestion } from "@/data/chemistryQuestions";
import {
  SearchFilters,
  defaultFilters,
  searchQuestions,
  parseNaturalQuery,
} from "@/lib/chemistrySearch";
import {
  questionToPaperQuestion,
  loadBuilderState,
  saveBuilderState,
  BuilderState,
} from "@/lib/builderStore";
import {
  allTopics,
  allQuestionTypes,
  allDifficulties,
  allLevels,
} from "@/lib/chemistrySearch";
import { generateMockQuestion } from "@/lib/mockGeneration";
import { Difficulty, QuestionType } from "@/data/chemistryQuestions";
import QuestionCard from "@/components/QuestionCard";
import QuestionDrawer from "@/components/QuestionDrawer";
import SearchBar from "@/components/SearchBar";
import FilterBar from "@/components/FilterBar";

// ----- AI-style prompt bar -----
function NaturalSearchBar({
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
    // Simulate brief "thinking" delay for demo feel
    setTimeout(() => {
      const filters = parseNaturalQuery(prompt);
      onSearch(filters);
      setLoading(false);
    }, 600);
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="relative flex-1">
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg">✨</span>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Try: "Give me a hard structured question on redox reactions" or "Easy mole concept MCQ"'
          className="w-full pl-10 pr-4 py-3 text-sm bg-white border border-indigo-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder:text-slate-400"
        />
      </div>
      <button
        type="submit"
        disabled={!prompt.trim() || loading}
        className="px-5 py-3 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors whitespace-nowrap"
      >
        {loading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}

// ----- Generate question modal -----
function GenerateModal({
  onClose,
  onGenerate,
}: {
  onClose: () => void;
  onGenerate: (q: ChemistryQuestion) => void;
}) {
  const topics = allTopics.filter((t) => t !== "All");
  const [topic, setTopic] = useState(topics[0]);
  const [type, setType] = useState<QuestionType>("Structured");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");

  function handleGenerate() {
    const q = generateMockQuestion(topic, type, difficulty);
    onGenerate(q);
    onClose();
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-900">Generate Question</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100">
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
                onChange={(e) => setTopic(e.target.value)}
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
                {(["Structured", "MCQ", "Free Response", "Data-Based"] as QuestionType[]).map((t) => (
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
                    className={`flex-1 py-2 text-sm font-medium rounded-lg border transition-colors ${
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
              onClick={onClose}
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
            Generates a plausible draft question — replace body with real LLM API for production
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
  const [showGenerate, setShowGenerate] = useState(false);
  const [builderState, setBuilderState] = useState<BuilderState | null>(null);
  const [addedToast, setAddedToast] = useState<string | null>(null);
  const [generatedQuestions, setGeneratedQuestions] = useState<ChemistryQuestion[]>([]);

  // Load builder state from localStorage
  useEffect(() => {
    setBuilderState(loadBuilderState());
  }, []);

  const results = useMemo(() => searchQuestions(filters), [filters]);

  // All questions including generated ones
  const allResults = useMemo(() => {
    const filtered = searchQuestions(filters);
    // Include generated questions that match filters
    const matchingGenerated = generatedQuestions.filter((q) => {
      if (filters.topic !== "All" && q.topic !== filters.topic) return false;
      if (filters.questionType !== "All" && q.questionType !== filters.questionType) return false;
      if (filters.difficulty !== "All" && q.difficulty !== filters.difficulty) return false;
      return true;
    });
    return [...matchingGenerated, ...filtered];
  }, [filters, generatedQuestions]);

  const addedIds = useMemo(() => {
    if (!builderState) return new Set<string>();
    const ids = new Set<string>();
    builderState.sections.forEach((s) =>
      s.questions.forEach((q) => ids.add(q.sourceId))
    );
    return ids;
  }, [builderState]);

  function handleAddToPaper(q: ChemistryQuestion) {
    const state = builderState ?? loadBuilderState();
    const newState: BuilderState = {
      ...state,
      sections: state.sections.map((s, i) => {
        if (i === 0) {
          return { ...s, questions: [...s.questions, questionToPaperQuestion(q)] };
        }
        return s;
      }),
    };
    setBuilderState(newState);
    saveBuilderState(newState);
    setAddedToast(q.id);
    setTimeout(() => setAddedToast(null), 2000);
  }

  function handleNaturalSearch(newFilters: SearchFilters) {
    // Preserve the active level tab when applying a natural-language search
    setFilters({ ...newFilters, level: filters.level });
  }

  function handleGenerated(q: ChemistryQuestion) {
    setGeneratedQuestions((prev) => [q, ...prev]);
    // Auto-apply filter to matching topic
    setFilters((prev) => ({ ...prev, topic: q.topic }));
  }

  const paperCount = builderState
    ? builderState.sections.reduce((s, sec) => s + sec.questions.length, 0)
    : 0;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">
              Product A
            </span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">Chemistry Question Search</h1>
          <p className="text-sm text-slate-500">
            Browse and filter {33 + generatedQuestions.length} questions from past O-Level and A-Level papers.
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowGenerate(true)}
            className="flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-700 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 shadow-sm transition-colors"
          >
            <svg className="w-4 h-4 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Generate question
          </button>
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

      {/* Level tabs — primary segmentation */}
      <div className="mb-7 border-b border-slate-200">
        <div className="flex gap-0 overflow-x-auto">
          {allLevels.map((lvl) => {
            const isActive = filters.level === lvl;
            const shortLabel: Record<string, string> = {
              "All": "All Levels",
              "O Level (Pure Chemistry)": "O Level — Pure",
              "O Level (Combined Chemistry)": "O Level — Combined",
              "A Level (H2 Chemistry)": "A Level — H2",
              "A Level (H1 Chemistry)": "A Level — H1",
            };
            return (
              <button
                key={lvl}
                onClick={() => setFilters({ ...filters, level: lvl })}
                className={`px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                  isActive
                    ? "border-indigo-600 text-indigo-700"
                    : "border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300"
                }`}
              >
                {shortLabel[lvl] ?? lvl}
              </button>
            );
          })}
        </div>
      </div>

      {/* AI search bar */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
            Smart search
          </span>
          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">AI-assisted</span>
        </div>
        <NaturalSearchBar onSearch={handleNaturalSearch} />
      </div>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-5">
        <div className="flex-1 h-px bg-slate-200" />
        <span className="text-xs text-slate-400 font-medium">or filter manually</span>
        <div className="flex-1 h-px bg-slate-200" />
      </div>

      {/* Keyword search + filters */}
      <div className="space-y-4 mb-8">
        <SearchBar
          value={filters.query}
          onChange={(v) => setFilters({ ...filters, query: v })}
          placeholder="Search by keyword, topic, or tag…"
        />
        <FilterBar
          filters={filters}
          onChange={setFilters}
          onReset={() => setFilters(defaultFilters)}
        />
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-sm text-slate-500">
          {allResults.length === 0
            ? "No questions found"
            : `${allResults.length} question${allResults.length === 1 ? "" : "s"} found`}
        </span>
        {(filters.query || filters.topic !== "All" || filters.questionType !== "All" || filters.difficulty !== "All" || filters.marks !== "any") && (
          <button
            onClick={() => setFilters(defaultFilters)}
            className="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
          >
            Clear all
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
          <p className="text-sm text-slate-400 mb-4">Try adjusting the topic, difficulty, or clearing your search.</p>
          <button
            onClick={() => setFilters(defaultFilters)}
            className="px-4 py-2 text-sm font-medium text-indigo-600 border border-indigo-200 rounded-xl hover:bg-indigo-50"
          >
            Reset all filters
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

      {/* Generate modal */}
      {showGenerate && (
        <GenerateModal
          onClose={() => setShowGenerate(false)}
          onGenerate={handleGenerated}
        />
      )}

      {/* Toast notification */}
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
