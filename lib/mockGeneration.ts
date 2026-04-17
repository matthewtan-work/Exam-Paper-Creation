import { ChemistryQuestion, Difficulty, QuestionType } from "@/data/chemistryQuestions";
import type { OfficialChemTopic } from "@/data/syllabusChemistry";

// Template bank for mock question generation
// Replace generateMockQuestion() with a real LLM API call to upgrade.

interface Template {
  text: string;
  answerScheme: string;
  tags: string[];
  commandWord: string;
  assessmentObjective: "AO1" | "AO2";
}

const templates: Partial<Record<OfficialChemTopic, Partial<Record<QuestionType, Partial<Record<Difficulty, Template[]>>>>>> = {
  "Chemical Bonding and Structure": {
    Structured: {
      "Easy": [
        {
          text: "Define a covalent bond and state the condition required for two atoms to form one.",
          answerScheme: "A covalent bond is a shared pair of electrons [1] formed between two non-metal atoms [1].",
          tags: ["definition", "covalent", "bonding"],
          commandWord: "define",
          assessmentObjective: "AO1",
        },
      ],
      "Medium": [
        {
          text: "Draw a dot-and-cross diagram for a molecule of water (H₂O) and explain the shape of the molecule.",
          answerScheme: "Correct diagram with 2 bonding pairs and 2 lone pairs on O [2]; V-shaped/bent due to lone pair repulsion [2].",
          tags: ["dot-and-cross", "water", "shape"],
          commandWord: "draw",
          assessmentObjective: "AO1",
        },
      ],
      "Hard": [
        {
          text: "Explain why the bond angle in NH₃ (107°) is smaller than in CH₄ (109.5°).",
          answerScheme: "Lone pairs repel more strongly than bonding pairs [2]; in NH₃ the lone pair compresses the H–N–H angle [2]; in CH₄ all 4 bonding pairs are equivalent [1].",
          tags: ["bond angle", "VSEPR", "ammonia"],
          commandWord: "explain",
          assessmentObjective: "AO2",
        },
      ],
    },
  },
  "Chemical Calculations": {
    Structured: {
      "Easy": [
        {
          text: "Calculate the number of moles in 11 g of CO₂. [Mr: CO₂ = 44]",
          answerScheme: "Moles = 11 ÷ 44 = 0.25 mol [2].",
          tags: ["moles", "calculation", "CO2"],
          commandWord: "calculate",
          assessmentObjective: "AO2",
        },
      ],
      "Medium": [
        {
          text: "0.5 mol of H₂SO₄ is dissolved in water to make 250 cm³ of solution. Calculate the concentration in mol/dm³.",
          answerScheme: "Concentration = moles ÷ volume(dm³) = 0.5 ÷ 0.25 = 2 mol/dm³ [3].",
          tags: ["concentration", "solution", "calculation"],
          commandWord: "calculate",
          assessmentObjective: "AO2",
        },
      ],
    },
  },
  "Acid-Base Chemistry": {
    Structured: {
      "Easy": [
        {
          text: "A solution has a pH of 9. (a) State whether the solution is acidic, alkaline, or neutral. (b) Name a suitable indicator.",
          answerScheme: "(a) Alkaline [1]. (b) Universal indicator / litmus [1].",
          tags: ["pH", "alkaline", "indicator"],
          commandWord: "state",
          assessmentObjective: "AO1",
        },
      ],
      "Medium": [
        {
          text: "25 cm³ of 0.2 mol/dm³ HCl is titrated against NaOH. The endpoint is reached after 20 cm³ of NaOH is added. Calculate the concentration of the NaOH solution.",
          answerScheme: "Moles HCl = 0.2 × 0.025 = 0.005 mol [1]; moles NaOH = 0.005 [1]; [NaOH] = 0.005 ÷ 0.020 = 0.25 mol/dm³ [2].",
          tags: ["titration", "neutralisation", "calculation"],
          commandWord: "calculate",
          assessmentObjective: "AO2",
        },
      ],
    },
  },
  "Redox Chemistry": {
    Structured: {
      "Medium": [
        {
          text: "Using oxidation numbers, identify the element oxidised and the element reduced in: Zn + CuSO₄ → ZnSO₄ + Cu",
          answerScheme: "Zn: 0 → +2, oxidised [1]; Cu: +2 → 0, reduced [1]; Zn is the reducing agent [1].",
          tags: ["oxidation number", "redox", "zinc", "copper"],
          commandWord: "identify",
          assessmentObjective: "AO2",
        },
      ],
    },
  },
};

// Fallback when no specific template matches
const fallbackTemplates: Record<Difficulty, Omit<Template, "tags">> = {
  "Easy": {
    text: "State the definition of [TOPIC] and give one example.",
    answerScheme: "Correct definition [2]; valid example [1].",
    commandWord: "state",
    assessmentObjective: "AO1",
  },
  "Medium": {
    text: "Explain the role of [TOPIC] in a chemical reaction. Include relevant observations and equations where appropriate.",
    answerScheme: "Clear explanation [2]; relevant equation [1]; observation [1].",
    commandWord: "explain",
    assessmentObjective: "AO1",
  },
  "Hard": {
    text: "Evaluate the factors affecting [TOPIC]. In your answer, refer to experimental evidence and underlying theory.",
    answerScheme: "Identifies key factors [2]; links to theory [2]; uses evidence [1].",
    commandWord: "evaluate",
    assessmentObjective: "AO2",
  },
};

const marksMap: Record<Difficulty, number> = {
  "Easy": 2,
  "Medium": 4,
  "Hard": 5,
};

let idCounter = 1000;

/**
 * Generates a mock chemistry question for a given topic, type, and difficulty.
 * Replace this function body with a real LLM API call (e.g. Claude API) for production use.
 */
export function generateMockQuestion(
  topic: OfficialChemTopic,
  questionType: QuestionType,
  difficulty: Difficulty
): ChemistryQuestion {
  const topicTemplates = templates[topic];
  const typeTemplates = topicTemplates?.[questionType];
  const pool = typeTemplates?.[difficulty];

  let text: string;
  let answerScheme: string;
  let tags: string[];
  let commandWord: string;
  let assessmentObjective: "AO1" | "AO2";

  if (pool && pool.length > 0) {
    const pick = pool[Math.floor(Math.random() * pool.length)];
    text = pick.text;
    answerScheme = pick.answerScheme;
    tags = pick.tags;
    commandWord = pick.commandWord;
    assessmentObjective = pick.assessmentObjective;
  } else {
    const fb = fallbackTemplates[difficulty];
    text = fb.text.replace("[TOPIC]", topic);
    answerScheme = fb.answerScheme;
    tags = [topic.toLowerCase().replace(/\s+/g, "-"), difficulty.toLowerCase().replace(/\s+/g, "-"), "generated"];
    commandWord = fb.commandWord;
    assessmentObjective = fb.assessmentObjective;
  }

  idCounter += 1;

  return {
    id: `gen-${idCounter}`,
    syllabusCode: "6092",
    paper: questionType === "MCQ" ? "Paper 1" : questionType === "Practical" ? "Paper 3" : "Paper 2",
    section: questionType !== "MCQ" && questionType !== "Practical" ? "Section A" : undefined,
    questionType,
    officialTopic: topic,
    subtopic: "Generated",
    commandWord,
    assessmentObjective,
    marks: marksMap[difficulty],
    difficulty,
    sourceYear: new Date().getFullYear(),
    sourceLabel: "Draft (Generated)",
    text,
    answerScheme,
    isDataBased: false,
    isPractical: questionType === "Practical",
    reviewStatus: "under_review",
    syllabusConfidence: "low",
    tags: [...tags, "generated"],
  };
}
