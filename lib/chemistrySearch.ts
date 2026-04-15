import {
  ChemistryQuestion,
  chemistryQuestions,
  Difficulty,
  QuestionType,
  Level,
} from "@/data/chemistryQuestions";

export interface SearchFilters {
  query: string;
  level: string;
  topic: string;
  questionType: string;
  difficulty: string;
  marks: string; // "any" | "1-2" | "3-4" | "5+"
}

export const defaultFilters: SearchFilters = {
  query: "",
  level: "All",
  topic: "All",
  questionType: "All",
  difficulty: "All",
  marks: "any",
};

export const allLevels: string[] = [
  "All",
  "O Level (Pure Chemistry)",
  "O Level (Combined Chemistry)",
  "A Level (H2 Chemistry)",
  "A Level (H1 Chemistry)",
];

export const allTopics = [
  "All",
  ...Array.from(new Set(chemistryQuestions.map((q) => q.topic))).sort(),
];

export const allQuestionTypes: string[] = [
  "All",
  "Structured",
  "MCQ",
  "Free Response",
  "Data-Based",
];

export const allDifficulties: string[] = ["All", "Easy", "Medium", "Hard"];

export function searchQuestions(filters: SearchFilters): ChemistryQuestion[] {
  let results = [...chemistryQuestions];

  if (filters.level !== "All") {
    results = results.filter((q) => q.level === filters.level);
  }

  // Keyword search — checks question text, topic, subtopic, tags
  if (filters.query.trim()) {
    const q = filters.query.toLowerCase();
    results = results.filter(
      (item) =>
        item.text.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.subtopic.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q)) ||
        item.answerOutline.toLowerCase().includes(q)
    );
  }

  if (filters.topic !== "All") {
    results = results.filter((q) => q.topic === filters.topic);
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
 * Interprets a natural-language prompt and maps it to filters.
 * This is a mock of AI-assisted search — no real LLM involved.
 */
export function parseNaturalQuery(prompt: string): SearchFilters {
  const lower = prompt.toLowerCase();

  const topicKeywords: Record<string, string> = {
    "covalent bond": "Covalent Bonding",
    covalent: "Covalent Bonding",
    ionic: "Ionic Bonding",
    mole: "Mole Concept",
    molar: "Mole Concept",
    stoichiometry: "Mole Concept",
    "acid": "Acids and Bases",
    "base": "Acids and Bases",
    "ph": "Acids and Bases",
    neutrali: "Acids and Bases",
    redox: "Redox",
    oxidation: "Redox",
    reduction: "Redox",
    electrolysis: "Electrolysis",
    electrode: "Electrolysis",
    organic: "Organic Chemistry",
    alkane: "Organic Chemistry",
    alkene: "Organic Chemistry",
    polymer: "Organic Chemistry",
    ethanol: "Organic Chemistry",
    periodic: "Periodic Table",
    "group 1": "Periodic Table",
    "group 7": "Periodic Table",
    halogen: "Periodic Table",
    "transition metal": "Periodic Table",
    metal: "Metals",
    reactivity: "Metals",
    rust: "Metals",
    corrosion: "Metals",
    energy: "Energy Changes",
    enthalpy: "Energy Changes",
    "bond energy": "Energy Changes",
    exothermic: "Energy Changes",
    endothermic: "Energy Changes",
  };

  let detectedTopic = "All";
  for (const [keyword, topic] of Object.entries(topicKeywords)) {
    if (lower.includes(keyword)) {
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
  };
  let detectedType = "All";
  for (const [kw, qt] of Object.entries(typeKeywords)) {
    if (lower.includes(kw)) {
      detectedType = qt;
      break;
    }
  }

  const difficultyKeywords: Record<string, Difficulty> = {
    easy: "Easy",
    simple: "Easy",
    basic: "Easy",
    hard: "Hard",
    difficult: "Hard",
    challenging: "Hard",
    medium: "Medium",
    moderate: "Medium",
  };
  let detectedDifficulty = "All";
  for (const [kw, diff] of Object.entries(difficultyKeywords)) {
    if (lower.includes(kw)) {
      detectedDifficulty = diff;
      break;
    }
  }

  return {
    query: "",
    level: "All",
    topic: detectedTopic,
    questionType: detectedType,
    difficulty: detectedDifficulty,
    marks: "any",
  };
}
