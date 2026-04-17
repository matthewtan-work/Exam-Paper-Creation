/**
 * SEAB GCE O-Level Chemistry 6092 (2026)
 * Authoritative syllabus constants — do not edit without checking the official SEAB document.
 */

export const CHEM_SYLLABUS_CODE = "6092" as const;

// ── Official topic list (12 topics) ──────────────────────────────────────────
export const OFFICIAL_CHEM_TOPICS = [
  "Experimental Chemistry",
  "The Particulate Nature of Matter",
  "Chemical Bonding and Structure",
  "Chemical Calculations",
  "Acid-Base Chemistry",
  "Qualitative Analysis",
  "Redox Chemistry",
  "Patterns in the Periodic Table",
  "Chemical Energetics",
  "Rate of Reactions",
  "Organic Chemistry",
  "Maintaining Air Quality",
] as const;

export type OfficialChemTopic = (typeof OFFICIAL_CHEM_TOPICS)[number];

// ── Paper structure ───────────────────────────────────────────────────────────
export const CHEM_PAPERS = ["Paper 1", "Paper 2", "Paper 3"] as const;
export type ChemistryPaper = (typeof CHEM_PAPERS)[number];

export const PAPER_DESCRIPTIONS: Record<ChemistryPaper, string> = {
  "Paper 1": "Multiple Choice · 40 compulsory MCQ items · 1 hour",
  "Paper 2": "Structured & Free Response · Section A compulsory · Section B choice (2 of 3) · 1 h 45 min",
  "Paper 3": "Practical · Planning, Manipulation & Measurement, Data Presentation, Analysis · 1 h 50 min",
};

export const VALID_QUESTION_TYPES_PER_PAPER = {
  "Paper 1": ["MCQ"],
  "Paper 2": ["Structured", "Free Response", "Data-Based"],
  "Paper 3": ["Practical"],
} as const;

export const PAPER_2_SECTIONS = ["Section A", "Section B"] as const;
export type Paper2Section = (typeof PAPER_2_SECTIONS)[number];

export const PAPER_2_SECTION_DESCRIPTIONS = {
  "Section A": "Compulsory structured questions, including one data-based question",
  "Section B": "Answer one of two longer questions",
} as const;

// ── Assessment objectives ─────────────────────────────────────────────────────
export const CHEM_ASSESSMENT_OBJECTIVES = {
  AO1: {
    label: "Knowledge with Understanding",
    weighting: "~45%",
    commandWords: ["define", "state", "name", "identify", "describe", "explain", "outline", "draw", "sketch", "write", "give", "list"],
  },
  AO2: {
    label: "Handling Information and Solving Problems",
    weighting: "~55%",
    commandWords: ["predict", "deduce", "suggest", "calculate", "determine", "show", "compare", "evaluate", "estimate"],
  },
} as const;

export type ChemistryAO = "AO1" | "AO2";

// ── Practical skill areas (Paper 3) ──────────────────────────────────────────
export const PRACTICAL_SKILL_AREAS = {
  P: "Planning",
  MMO: "Manipulation, Measurement and Observation",
  PDO: "Presentation of Data and Observations",
  ACE: "Analysis, Conclusions and Evaluation",
} as const;

export type PracticalSkillArea = keyof typeof PRACTICAL_SKILL_AREAS;

// ── Legacy topic → official topic mapping ─────────────────────────────────────
// Used by mapChemistryTopic() in syllabusValidation.ts
export const LEGACY_TOPIC_MAP: Record<string, OfficialChemTopic> = {
  "Covalent Bonding":          "Chemical Bonding and Structure",
  "Ionic Bonding":             "Chemical Bonding and Structure",
  "Metallic Bonding":          "Chemical Bonding and Structure",
  "Mole Concept":              "Chemical Calculations",
  "Stoichiometry":             "Chemical Calculations",
  "Acids and Bases":           "Acid-Base Chemistry",
  "Acid Base":                 "Acid-Base Chemistry",
  "Redox":                     "Redox Chemistry",
  "Electrolysis":              "Redox Chemistry",
  "Corrosion":                 "Redox Chemistry",
  "Rusting":                   "Redox Chemistry",
  "Periodic Table":            "Patterns in the Periodic Table",
  "Metals":                    "Patterns in the Periodic Table",
  "Energy Changes":            "Chemical Energetics",
  "Enthalpy":                  "Chemical Energetics",
  "Rates of Reaction":         "Rate of Reactions",
  "Air Quality":               "Maintaining Air Quality",
  "Atmosphere":                "Maintaining Air Quality",
};
