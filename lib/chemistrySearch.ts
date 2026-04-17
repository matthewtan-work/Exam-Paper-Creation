import {
  ChemistryQuestion,
  chemistryQuestions,
  Difficulty,
  QuestionType,
} from "@/data/chemistryQuestions";
import {
  OFFICIAL_CHEM_TOPICS,
  OfficialChemTopic,
  CHEM_PAPERS,
} from "@/data/syllabusChemistry";

export interface SearchFilters {
  query: string;
  paper: string;         // "All" | "Paper 1" | "Paper 2" | "Paper 3"
  section: string;       // "All" | "Section A" | "Section B"
  officialTopic: string; // "All" | one of OFFICIAL_CHEM_TOPICS
  questionType: string;
  difficulty: string;
  marks: string; // "any" | "1-2" | "3-4" | "5+"
}

export const defaultFilters: SearchFilters = {
  query: "",
  paper: "All",
  section: "All",
  officialTopic: "All",
  questionType: "All",
  difficulty: "All",
  marks: "any",
};

export const allPapers: string[] = ["All", ...CHEM_PAPERS];

export const allOfficialTopics: string[] = ["All", ...OFFICIAL_CHEM_TOPICS];

export const allQuestionTypes: string[] = [
  "All",
  "MCQ",
  "Structured",
  "Free Response",
  "Data-Based",
  "Practical",
];

export const allDifficulties: string[] = [
  "All",
  "Easy",
  "Medium",
  "Hard",
];

export function searchQuestions(filters: SearchFilters): ChemistryQuestion[] {
  // Exclude any questions flagged for remapping
  let results = chemistryQuestions.filter(
    (q) => q.reviewStatus !== "needs_remapping"
  );

  if (filters.paper !== "All") {
    results = results.filter((q) => q.paper === filters.paper);
  }

  if (filters.section !== "All") {
    results = results.filter((q) => q.section === filters.section);
  }

  if (filters.officialTopic !== "All") {
    results = results.filter((q) => q.officialTopic === filters.officialTopic);
  }

  if (filters.query.trim()) {
    const kw = filters.query.toLowerCase();
    results = results.filter(
      (item) =>
        item.text.toLowerCase().includes(kw) ||
        item.officialTopic.toLowerCase().includes(kw) ||
        item.subtopic.toLowerCase().includes(kw) ||
        item.tags.some((t) => t.toLowerCase().includes(kw)) ||
        item.answerScheme.toLowerCase().includes(kw)
    );
  }

  if (filters.questionType !== "All") {
    results = results.filter((q) => q.questionType === filters.questionType);
  }

  if (filters.difficulty !== "All") {
    results = results.filter((q) => q.difficulty === filters.difficulty);
  }

  if (filters.marks !== "any") {
    results = results.filter((q) => {
      if (filters.marks === "1-2") return q.marks <= 2;
      if (filters.marks === "3-4") return q.marks >= 3 && q.marks <= 4;
      if (filters.marks === "5+") return q.marks >= 5;
      return true;
    });
  }

  return results;
}

/**
 * Maps natural-language prompt keywords to structured filters.
 * No LLM involved — pure string matching.
 */
export function parseNaturalQuery(prompt: string): SearchFilters {
  const lower = prompt.toLowerCase();

  const topicKeywords: Array<[string[], OfficialChemTopic]> = [
    [["covalent", "ionic bond", "metallic bond", "bonding", "dot and cross", "giant structure", "simple molecular"], "Chemical Bonding and Structure"],
    [["mole", "molar mass", "stoichiometry", "empirical formula", "concentration", "limiting reagent", "yield"], "Chemical Calculations"],
    [["acid", "base", "ph", "neutrali", "titration", "alkali", "buffer", "strong acid", "weak acid"], "Acid-Base Chemistry"],
    [["qualitative", "flame test", "precipitate", "identify ion", "test for gas", "anion", "cation"], "Qualitative Analysis"],
    [["redox", "oxidation", "reduction", "electrolysis", "electrode", "corrosion", "rust", "half equation"], "Redox Chemistry"],
    [["periodic", "group 1", "group 7", "halogen", "transition metal", "reactivity series", "metal extraction", "noble gas"], "Patterns in the Periodic Table"],
    [["energy", "enthalpy", "exothermic", "endothermic", "bond energy", "activation energy chart"], "Chemical Energetics"],
    [["rate", "catalyst", "concentration effect", "surface area", "activation energy"], "Rate of Reactions"],
    [["organic", "alkane", "alkene", "polymer", "ethanol", "hydrocarbon", "esterification", "addition reaction"], "Organic Chemistry"],
    [["air quality", "atmosphere", "greenhouse", "pollution", "carbon dioxide effect", "acid rain", "catalytic converter"], "Maintaining Air Quality"],
    [["particulate", "state of matter", "diffusion", "kinetic theory", "atoms and molecules"], "The Particulate Nature of Matter"],
    [["experiment", "practical", "planning", "safety", "apparatus", "hazard"], "Experimental Chemistry"],
  ];

  let detectedTopic: string = "All";
  for (const [keywords, topic] of topicKeywords) {
    if (keywords.some((kw) => lower.includes(kw))) {
      detectedTopic = topic;
      break;
    }
  }

  const typeKeywords: Record<string, QuestionType> = {
    "structured": "Structured",
    "mcq": "MCQ",
    "multiple choice": "MCQ",
    "free response": "Free Response",
    "open ended": "Free Response",
    "data-based": "Data-Based",
    "data based": "Data-Based",
    "practical": "Practical",
  };
  let detectedType = "All";
  for (const [kw, qt] of Object.entries(typeKeywords)) {
    if (lower.includes(kw)) {
      detectedType = qt;
      break;
    }
  }

  const difficultyKeywords: Record<string, Difficulty> = {
    "easy": "Easy",
    "simple": "Easy",
    "basic": "Easy",
    "low demand": "Easy",
    "hard": "Hard",
    "difficult": "Hard",
    "challenging": "Hard",
    "high demand": "Hard",
    "medium": "Medium",
    "moderate": "Medium",
    "medium demand": "Medium",
  };
  let detectedDifficulty = "All";
  for (const [kw, diff] of Object.entries(difficultyKeywords)) {
    if (lower.includes(kw)) {
      detectedDifficulty = diff;
      break;
    }
  }

  let detectedPaper = "All";
  if (lower.includes("paper 1") || lower.includes("mcq paper")) detectedPaper = "Paper 1";
  else if (lower.includes("paper 2") || lower.includes("structured paper")) detectedPaper = "Paper 2";
  else if (lower.includes("paper 3") || lower.includes("practical paper")) detectedPaper = "Paper 3";

  return {
    query: "",
    paper: detectedPaper,
    section: "All",
    officialTopic: detectedTopic,
    questionType: detectedType,
    difficulty: detectedDifficulty,
    marks: "any",
  };
}
