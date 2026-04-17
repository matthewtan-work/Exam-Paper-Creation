import { HistoryQuestion, historyQuestions } from "@/data/historyQuestions";
import {
  HISTORY_PAPERS,
  HistoryPaper,
  HISTORY_SECTIONS,
  HistorySection,
  PAPER_1_UNITS,
  PAPER_2_UNITS,
} from "@/data/syllabusHistory";

export interface HistorySearchFilters {
  paper: string;        // "All" | "Paper 1" | "Paper 2"
  section: string;      // "All" | "Section A" | "Section B"
  unit: string;         // "All" | unit name
  questionType: string; // "All" | "SBQ" | "Essay"
  keyword: string;
}

export const defaultHistoryFilters: HistorySearchFilters = {
  paper: "All",
  section: "All",
  unit: "All",
  questionType: "All",
  keyword: "",
};

export const allHistoryPapers: string[] = ["All", ...HISTORY_PAPERS];
export const allHistorySections: string[] = ["All", ...HISTORY_SECTIONS];
export const allHistoryUnits: string[] = [
  "All",
  ...PAPER_1_UNITS,
  ...PAPER_2_UNITS,
];
export const allHistoryQuestionTypes: string[] = ["All", "SBQ", "Essay"];

export function searchHistoryQuestions(
  filters: HistorySearchFilters
): HistoryQuestion[] {
  // Exclude questions flagged as excluded
  let results = historyQuestions.filter((q) => q.reviewStatus !== "excluded");

  if (filters.paper !== "All") {
    results = results.filter((q) => q.paper === filters.paper);
  }

  if (filters.section !== "All") {
    results = results.filter((q) => q.section === filters.section);
  }

  if (filters.unit !== "All") {
    results = results.filter((q) => q.unit === filters.unit);
  }

  if (filters.questionType !== "All") {
    results = results.filter((q) => q.questionType === filters.questionType);
  }

  if (filters.keyword.trim()) {
    const kw = filters.keyword.toLowerCase();
    results = results.filter(
      (q) =>
        q.text.toLowerCase().includes(kw) ||
        q.unit.toLowerCase().includes(kw) ||
        q.examIssue.toLowerCase().includes(kw) ||
        q.tags.some((t) => t.toLowerCase().includes(kw))
    );
  }

  return results;
}

/** Retrieve questions by paper and section (for draft paper construction) */
export function retrieveByPaperAndSection(
  paper: HistoryPaper | "All",
  section: HistorySection | "All"
): HistoryQuestion[] {
  return searchHistoryQuestions({
    ...defaultHistoryFilters,
    paper,
    section,
  });
}
