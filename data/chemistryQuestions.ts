/**
 * Chemistry question repository — SEAB 6092 O-Level Pure Chemistry (2026)
 * All questions must map to one of the 12 official syllabus topics.
 * A-Level and non-6092 content is EXCLUDED from this file.
 */

import type {
  OfficialChemTopic,
  ChemistryPaper,
  Paper2Section,
  ChemistryAO,
  PracticalSkillArea,
} from "./syllabusChemistry";

export type Difficulty = "Easy" | "Medium" | "Hard";
export type QuestionType = "MCQ" | "Structured" | "Free Response" | "Data-Based" | "Practical";
export type ReviewStatus = "approved" | "needs_remapping" | "under_review";

export interface ChemistryQuestion {
  id: string;
  syllabusCode: "6092";
  paper: ChemistryPaper;
  section?: Paper2Section;          // Paper 2 only
  questionType: QuestionType;
  officialTopic: OfficialChemTopic;
  subtopic: string;
  commandWord: string;
  assessmentObjective: ChemistryAO;
  practicalSkillArea?: PracticalSkillArea; // Paper 3 only
  marks: number;
  difficulty: Difficulty;
  sourceYear: number;
  sourceLabel: string;
  text: string;
  answerScheme: string;
  isDataBased: boolean;
  isPractical: boolean;
  reviewStatus: ReviewStatus;
  syllabusConfidence: "high" | "medium" | "low";
  tags: string[];
}

export const chemistryQuestions: ChemistryQuestion[] = [
  // Add questions here
];
