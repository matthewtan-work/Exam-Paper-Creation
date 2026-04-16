import { HistoryQuestion, HistoryLevel, HistoryQuestionType, historyQuestions } from "@/data/historyQuestions";

export interface HistorySearchFilters {
  topic: string;
  level: string;
  questionType: string;
  period: string;
  keyword: string;
}

export const defaultHistoryFilters: HistorySearchFilters = {
  topic: "All",
  level: "All",
  questionType: "All",
  period: "All",
  keyword: "",
};

export const allHistoryTopics = [
  "All",
  "World War II",
  "Cold War",
  "Decolonisation",
  "Singapore History",
  "International Relations",
];

export const allHistoryLevels: HistoryLevel[] = [
  "O Level",
  "A Level (H1)",
  "A Level (H2)",
];

export const allHistoryPeriods = [
  "All",
  "1919–1939",
  "1930s",
  "1937–1945",
  "1945–1991",
  "1950s–1960s",
  "1960s–1970s",
  "1945–1965",
  "1965–present",
  "1960s–1990s",
  "20th century",
];

export const allHistoryQuestionTypes: HistoryQuestionType[] = [
  "Structured Essay",
  "Essay",
  "Source-Based",
];

export function searchHistoryQuestions(
  filters: HistorySearchFilters
): HistoryQuestion[] {
  let results = [...historyQuestions];

  if (filters.topic !== "All") {
    results = results.filter((q) => q.topic === filters.topic);
  }

  if (filters.level !== "All") {
    results = results.filter((q) => q.level === filters.level);
  }

  if (filters.questionType !== "All") {
    results = results.filter((q) => q.questionType === filters.questionType);
  }

  if (filters.period !== "All") {
    results = results.filter((q) => q.period === filters.period);
  }

  if (filters.keyword.trim()) {
    const kw = filters.keyword.toLowerCase();
    results = results.filter(
      (q) =>
        q.text.toLowerCase().includes(kw) ||
        q.topic.toLowerCase().includes(kw) ||
        q.subtopic.toLowerCase().includes(kw) ||
        q.tags.some((t) => t.toLowerCase().includes(kw))
    );
  }

  return results;
}

/** Map inquiry/topic text to relevant history questions for draft paper generation */
export function retrieveByInquiry(inquiry: string): HistoryQuestion[] {
  if (!inquiry.trim()) return [];

  const lower = inquiry.toLowerCase();

  // Topic keyword → topic name
  const topicMap: [string[], string][] = [
    [["world war", "wwii", "ww2", "nazi", "hitler", "appeasement", "blitz", "pacific war", "fall of singapore", "japanese occupation"], "World War II"],
    [["cold war", "communism", "communist", "soviet", "ussr", "nato", "containment", "korean", "cuba", "berlin", "nuclear", "missile", "truman", "stalin"], "Cold War"],
    [["decolonisation", "decolonization", "independence", "colonial", "empire", "nationalism"], "Decolonisation"],
    [["singapore", "lee kuan yew", "merger", "separation", "malaysia", "pap", "nation building", "racial harmony", "hdb", "cpf"], "Singapore History"],
    [["united nations", "un", "asean", "league of nations", "international", "peacekeeping"], "International Relations"],
  ];

  let matchedTopic: string | null = null;
  for (const [keywords, topic] of topicMap) {
    if (keywords.some((kw) => lower.includes(kw))) {
      matchedTopic = topic;
      break;
    }
  }

  // Level keyword detection
  let matchedLevel: HistoryLevel | null = null;
  if (lower.includes("a level") || lower.includes("alevel") || lower.includes("h2") || lower.includes("h1")) {
    matchedLevel = lower.includes("h1") ? "A Level (H1)" : "A Level (H2)";
  } else if (lower.includes("o level") || lower.includes("olevel")) {
    matchedLevel = "O Level";
  }

  // Type keyword detection
  let matchedType: HistoryQuestionType | null = null;
  if (lower.includes("source") || lower.includes("sbq")) {
    matchedType = "Source-Based";
  } else if (lower.includes("essay")) {
    matchedType = lower.includes("structured") ? "Structured Essay" : "Essay";
  }

  let results = [...historyQuestions];

  if (matchedTopic) results = results.filter((q) => q.topic === matchedTopic);
  if (matchedLevel) results = results.filter((q) => q.level === matchedLevel);
  if (matchedType) results = results.filter((q) => q.questionType === matchedType);

  // Fallback: keyword search on text/tags
  if (results.length === 0) {
    const words = lower.split(/\s+/).filter((w) => w.length > 3);
    results = historyQuestions.filter((q) =>
      words.some(
        (w) =>
          q.text.toLowerCase().includes(w) ||
          q.tags.some((t) => t.toLowerCase().includes(w))
      )
    );
  }

  return results.slice(0, 8);
}
