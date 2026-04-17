/**
 * History question repository — SEAB GCE O-Level History 2174 (2026)
 * All questions mapped to official Paper 1 / Paper 2 units.
 * A-Level and non-2174 content is EXCLUDED.
 * Singapore Social Studies (elective) content is EXCLUDED.
 * SBQ questions are only set on starred (*) units.
 */

import type {
  HistoryPaper,
  HistorySection,
  HistoryUnit,
  HistoryAO,
  SBQSubType,
  HistoricalConcept,
} from "./syllabusHistory";

export type ReviewStatus = "approved" | "needs_remapping" | "under_review" | "excluded";

export interface HistorySource {
  label: string;        // "Source A"
  provenance: string;   // Full attribution: who, what, when
  excerpt: string;      // Max 150 words when surfaced
  sourceType: "speech" | "letter" | "report" | "photograph" | "cartoon" | "statistics" | "memoir" | "government_document" | "newspaper";
  viewpoint: string;    // Whose perspective, e.g. "British colonial government"
  issueTested: string;  // The specific historical issue this source speaks to
  wordCount: number;
}

export interface HistoryQuestion {
  id: string;
  syllabusCode: "2174";
  paper: HistoryPaper;
  section: HistorySection;
  unit: HistoryUnit;
  examIssue: string;           // Specific issue within the unit
  questionType: "SBQ" | "Essay";
  assessmentObjectives: HistoryAO;
  marks: number;               // SBQ: variable by subpart; Essay: always 10
  difficulty: "Easy" | "Medium" | "Hard";
  sourceYear: number;
  sourceLabel: string;

  // SBQ-specific
  sources?: HistorySource[];
  subquestions?: SBQSubquestion[];
  isSBQEligible?: boolean;     // only true if unit is starred

  // Essay-specific
  historicalConcepts?: HistoricalConcept[];

  text: string;
  answerScheme: string;
  reviewStatus: ReviewStatus;
  syllabusConfidence: "high" | "medium" | "low";
  tags: string[];
}

export interface SBQSubquestion {
  label: string;     // "(a)", "(b)" etc.
  marks: number;
  subType: SBQSubType;
  ao: HistoryAO;
  text: string;
  guidanceNotes: string;
}

export const historyQuestions: HistoryQuestion[] = [
  // Add questions here
];
