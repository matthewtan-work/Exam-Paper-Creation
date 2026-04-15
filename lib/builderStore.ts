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

export function loadBuilderState(): BuilderState {
  if (typeof window === "undefined") return defaultState;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored) as BuilderState;
  } catch {
    // corrupted storage, fall through
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
    topic: q.topic,
    sourceInfo: `${q.sourcePaper} (${q.sourceYear})`,
  };
}

export function totalMarks(sections: PaperSection[]): number {
  return sections.reduce(
    (sum, section) =>
      sum + section.questions.reduce((s, q) => s + q.marks, 0),
    0
  );
}
