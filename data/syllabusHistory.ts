/**
 * SEAB GCE O-Level History 2174 (2026)
 * Authoritative syllabus constants — do not edit without checking the official SEAB document.
 */

export const HIST_SYLLABUS_CODE = "2174" as const;

// ── Papers ────────────────────────────────────────────────────────────────────
export const HISTORY_PAPERS = ["Paper 1", "Paper 2"] as const;
export type HistoryPaper = (typeof HISTORY_PAPERS)[number];

export const HISTORY_PAPER_DESCRIPTIONS: Record<HistoryPaper, string> = {
  "Paper 1": "Extension of European control in Southeast Asia and challenges to European dominance, 1870s–1942 · 1 h 50 min",
  "Paper 2": "Developments in the post-WWII world: Cold War and decolonisation in Southeast Asia, 1940s–1991 · 1 h 50 min",
};

// ── Sections ──────────────────────────────────────────────────────────────────
export const HISTORY_SECTIONS = ["Section A", "Section B"] as const;
export type HistorySection = (typeof HISTORY_SECTIONS)[number];

export const HISTORY_SECTION_DESCRIPTIONS: Record<HistorySection, string> = {
  "Section A": "Source-Based Case Study (SBQ) — compulsory · up to 6 sources · Q(a) to (e) · AO1 + AO3",
  "Section B": "Essay Questions — answer 2 of 3 · 10 marks each · 20 marks total · AO1 + AO2",
};

// ── Paper 1 official units ────────────────────────────────────────────────────
// * = SBQ-eligible (starred in syllabus)
export const PAPER_1_UNITS = [
  "British Malaya, 1870s-1920s",    // * Compulsory + SBQ-eligible
  "Dutch Indonesia, 1870s-1920s",
  "French Vietnam, 1870s-1920s",
  "Paris Peace Conference",
  "Nazi Germany",                    // * SBQ-eligible
  "Militarist Japan",
  "WWII in Europe",                  // * SBQ-eligible
  "WWII in Asia-Pacific",
] as const;

// ── Paper 2 official units ────────────────────────────────────────────────────
export const PAPER_2_UNITS = [
  "End of World War II",
  "Cold War in Europe",              // * SBQ-eligible
  "Korean War",                      // * SBQ-eligible
  "Vietnam War",
  "British Malaya, 1945-1957",       // * Compulsory + SBQ-eligible
  "Dutch Indonesia, 1945-1949",
  "French Vietnam, 1945-1954",
  "Decline of USSR and End of Cold War",
] as const;

export type Paper1Unit = (typeof PAPER_1_UNITS)[number];
export type Paper2Unit = (typeof PAPER_2_UNITS)[number];
export type HistoryUnit = Paper1Unit | Paper2Unit;

// ── SBQ-eligible (starred *) units ───────────────────────────────────────────
export const SBQ_ELIGIBLE_PAPER_1: ReadonlyArray<Paper1Unit> = [
  "British Malaya, 1870s-1920s",
  "Nazi Germany",
  "WWII in Europe",
];

export const SBQ_ELIGIBLE_PAPER_2: ReadonlyArray<Paper2Unit> = [
  "Cold War in Europe",
  "Korean War",
  "British Malaya, 1945-1957",
];

// ── Assessment objectives ─────────────────────────────────────────────────────
export const HIST_ASSESSMENT_OBJECTIVES = {
  AO1: {
    label: "Deploy Knowledge",
    description: "Recall, select, and use historical knowledge accurately and relevantly to support historical explanation",
    usedIn: ["Section A", "Section B"],
  },
  AO2: {
    label: "Construct Explanation",
    description: "Construct explanations and communicate historical knowledge",
    usedIn: ["Section B"],
  },
  AO3: {
    label: "Interpret and Evaluate Sources",
    description: "Interpret, evaluate, and use source materials to draw conclusions",
    usedIn: ["Section A"],
  },
} as const;

export type HistoryAO = "AO1" | "AO2" | "AO3" | "AO1+AO2" | "AO1+AO3";

// ── Essay constraints ─────────────────────────────────────────────────────────
export const ESSAY_STRUCTURE = {
  marksPerQuestion: 10,
  questionsToAnswer: 2,
  questionsOffered: 3,
  totalSectionBMarks: 20,
  note: "Essay questions CANNOT be set on the same issue as the Section A SBQ case study in the same paper/year.",
} as const;

// ── SBQ constraints ───────────────────────────────────────────────────────────
export const SBQ_CONSTRAINTS = {
  maxSources: 6,
  maxWordsPerSourceSurfaced: 150,
  subquestions: ["(a)", "(b)", "(c)", "(d)", "(e)"] as const,
  note: "SBQ case studies can ONLY be set on starred (*) topics. The examined issue for SBQ cannot be reused for a Section B essay in the same paper.",
} as const;

// ── SBQ sub-question types ────────────────────────────────────────────────────
export const SBQ_SUB_TYPES = [
  "inference",
  "comparison",
  "purpose",
  "reliability",
  "utility",
  "hybrid_judgement",
] as const;

export type SBQSubType = (typeof SBQ_SUB_TYPES)[number];

// ── Historical concepts (for essay tagging) ───────────────────────────────────
export const HISTORICAL_CONCEPTS = [
  "causation",
  "consequence",
  "change_and_continuity",
  "significance",
] as const;

export type HistoricalConcept = (typeof HISTORICAL_CONCEPTS)[number];
