"use client";

import { ChemistryQuestion } from "@/data/chemistryQuestions";

export interface PaperSection {
  id: string;
  title: string;
  questions: PaperQuestion[];
}

export interface PaperQuestion {
  id: string; // unique instance id in the paper
  sourceId: string;
  text: string;
  marks: number;
  topic: string;
  sourceInfo: string;
}

const STORAGE_KEY = "examcraft_builder_v1";

export interface BuilderState {
  paperTitle: string;
  sections: PaperSection[];
}

const defaultState: BuilderState = {
  paperTitle: "Chemistry Exam Paper",
  sections: [
    { id: "sec-a", title: "Section A", questions: [] },
    { id: "sec-b", title: "Section B", questions: [] },
  ],
};

function isValidPaperQuestion(q: unknown): q is PaperQuestion {
  if (!q || typeof q !== "object") return false;
  const { id, sourceId, text, marks, topic, sourceInfo } = q as Record<string, unknown>;
  return (
    typeof id === "string" &&
    typeof sourceId === "string" &&
    typeof text === "string" &&
    typeof marks === "number" && isFinite(marks) && marks >= 0 && marks <= 100 &&
    typeof topic === "string" &&
    typeof sourceInfo === "string"
  );
}

function isValidBuilderState(data: unknown): data is BuilderState {
  if (!data || typeof data !== "object") return false;
  const { paperTitle, sections } = data as Record<string, unknown>;
  if (typeof paperTitle !== "string") return false;
  if (!Array.isArray(sections)) return false;
  return sections.every((s: unknown) => {
    if (!s || typeof s !== "object") return false;
    const { id, title, questions } = s as Record<string, unknown>;
    return (
      typeof id === "string" &&
      typeof title === "string" &&
      Array.isArray(questions) &&
      questions.every(isValidPaperQuestion)
    );
  });
}

export function loadBuilderState(): BuilderState {
  if (typeof window === "undefined") return defaultState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed: unknown = JSON.parse(stored);
      if (isValidBuilderState(parsed)) return parsed;
      // Invalid shape — clear corrupted/tampered entry
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // corrupted JSON, fall through
  }
  return defaultState;
}

export function saveBuilderState(state: BuilderState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // storage full or unavailable
  }
}

export function clearBuilderState(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

/** Convert a ChemistryQuestion into a PaperQuestion for the builder */
export function questionToPaperQuestion(q: ChemistryQuestion): PaperQuestion {
  return {
    id: `pq-${q.id}-${Date.now()}`,
    sourceId: q.id,
    text: q.text,
    marks: q.marks,
    topic: q.officialTopic,
    sourceInfo: `${q.sourceLabel} (${q.sourceYear})`,
  };
}

export function totalMarks(sections: PaperSection[]): number {
  return sections.reduce(
    (sum, section) =>
      sum + section.questions.reduce((s, q) => s + q.marks, 0),
    0
  );
}
