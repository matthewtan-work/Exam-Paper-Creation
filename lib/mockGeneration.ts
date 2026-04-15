import { ChemistryQuestion, Difficulty, QuestionType } from "@/data/chemistryQuestions";

// Template bank for mock question generation
// Replace the generateQuestion() call with a real LLM API call to upgrade.

const templates: Record<
  string,
  Record<string, Record<string, { text: string; answerOutline: string; tags: string[] }[]>>
> = {
  "Covalent Bonding": {
    Structured: {
      Easy: [
        {
          text: "Define a covalent bond and state the condition required for two atoms to form one.",
          answerOutline: "A covalent bond is a shared pair of electrons [1] formed between two non-metal atoms [1].",
          tags: ["definition", "covalent", "bonding"],
        },
      ],
      Medium: [
        {
          text: "Draw a dot-and-cross diagram for a molecule of water (H₂O) and explain the shape of the molecule.",
          answerOutline: "Correct diagram with 2 bonding pairs and 2 lone pairs on O [2]; V-shaped/bent due to lone pair repulsion [2].",
          tags: ["dot-and-cross", "water", "shape", "VSEPR"],
        },
      ],
      Hard: [
        {
          text: "Explain why the bond angle in NH₃ (107°) is smaller than the bond angle in CH₄ (109.5°). Refer to electron pair repulsion theory.",
          answerOutline: "Lone pairs repel more strongly than bonding pairs [2]; in NH₃ the lone pair compresses the H–N–H angle [2]; in CH₄ there are 4 equivalent bonding pairs [1].",
          tags: ["bond angle", "VSEPR", "ammonia", "methane"],
        },
      ],
    },
    "Free Response": {
      Medium: [
        {
          text: "Compare the properties of a simple molecular covalent compound and a giant covalent compound. Give one example of each.",
          answerOutline: "Simple molecular: low mp/bp, non-conductor, e.g. CO₂ [2]. Giant covalent: very high mp/bp, usually non-conductor (except graphite), e.g. SiO₂ [2].",
          tags: ["giant covalent", "simple molecular", "comparison"],
        },
      ],
    },
  },
  "Mole Concept": {
    Structured: {
      Easy: [
        {
          text: "Calculate the number of moles in 11 g of CO₂. [Mr: CO₂ = 44]",
          answerOutline: "Moles = 11/44 = 0.25 mol [2].",
          tags: ["moles", "calculation", "CO2"],
        },
      ],
      Medium: [
        {
          text: "0.5 mol of H₂SO₄ is dissolved in water to make 250 cm³ of solution. Calculate the concentration of the solution in mol/dm³.",
          answerOutline: "Concentration = moles/volume(dm³) = 0.5/(250/1000) = 2 mol/dm³ [3].",
          tags: ["concentration", "solution", "calculation"],
        },
      ],
      Hard: [
        {
          text: "In a reaction, 5.4 g of aluminium reacts completely with excess hydrochloric acid. Calculate the volume of hydrogen gas produced at room temperature and pressure (RTP). [Ar: Al = 27; molar volume at RTP = 24 dm³/mol]\n\n2Al + 6HCl → 2AlCl₃ + 3H₂",
          answerOutline: "Moles Al = 5.4/27 = 0.2 mol [1]; moles H₂ = 0.2 × 3/2 = 0.3 mol [1]; volume = 0.3 × 24 = 7.2 dm³ [2].",
          tags: ["gas volume", "stoichiometry", "aluminium", "HCl"],
        },
      ],
    },
  },
  "Redox": {
    Structured: {
      Medium: [
        {
          text: "Using oxidation numbers, identify the element oxidised and the element reduced in the following reaction:\n\nZn + CuSO₄ → ZnSO₄ + Cu",
          answerOutline: "Zn: 0 → +2, oxidised [1]; Cu: +2 → 0, reduced [1]; Zn is reducing agent, CuSO₄ is oxidising agent [2].",
          tags: ["oxidation number", "redox", "zinc", "copper"],
        },
      ],
      Hard: [
        {
          text: "Balance the following half-equations and combine them to give the overall redox equation in acidic conditions:\n\nCr₂O₇²⁻ → Cr³⁺ (acidic solution)\nSn²⁺ → Sn⁴⁺",
          answerOutline: "Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O [2]; 3×(Sn²⁺ → Sn⁴⁺ + 2e⁻) [1]; overall: Cr₂O₇²⁻ + 14H⁺ + 3Sn²⁺ → 2Cr³⁺ + 3Sn⁴⁺ + 7H₂O [2].",
          tags: ["half equation", "dichromate", "tin", "acidic"],
        },
      ],
    },
  },
  "Acids and Bases": {
    Structured: {
      Easy: [
        {
          text: "A solution has a pH of 9. (a) State whether the solution is acidic, alkaline, or neutral. (b) Name a suitable indicator to test this solution.",
          answerOutline: "(a) Alkaline [1]. (b) Universal indicator / litmus [1].",
          tags: ["pH", "alkaline", "indicator"],
        },
      ],
      Medium: [
        {
          text: "25 cm³ of 0.2 mol/dm³ HCl is titrated against NaOH solution. The endpoint is reached after 20 cm³ of NaOH is added. Calculate the concentration of the NaOH solution.",
          answerOutline: "Moles HCl = 0.2 × 0.025 = 0.005 mol [1]; moles NaOH = 0.005 [1]; concentration = 0.005/0.020 = 0.25 mol/dm³ [2].",
          tags: ["titration", "neutralisation", "calculation"],
        },
      ],
    },
  },
};

// Fallback template when no specific one is found
const fallbackTemplates: Record<Difficulty, { text: string; answerOutline: string }> = {
  Easy: {
    text: "State the definition of [TOPIC] and give one example.",
    answerOutline: "Correct definition [2]; valid example [1].",
  },
  Medium: {
    text: "Explain the role of [TOPIC] in a chemical reaction. Include relevant observations and equations where appropriate.",
    answerOutline: "Clear explanation [2]; relevant equation [1]; observation [1].",
  },
  Hard: {
    text: "Evaluate the factors affecting [TOPIC]. In your answer, refer to experimental evidence and underlying theory.",
    answerOutline: "Identifies key factors [2]; links to theory [2]; uses evidence [1].",
  },
};

let idCounter = 1000;

/**
 * Generates a mock question for a given topic, type, and difficulty.
 * Replace this function body with a real LLM API call (e.g. Claude API) to produce genuine questions.
 */
export function generateMockQuestion(
  topic: string,
  questionType: QuestionType,
  difficulty: Difficulty
): ChemistryQuestion {
  const topicTemplates = templates[topic];
  const typeTemplates = topicTemplates?.[questionType];
  const difficultyPool = typeTemplates?.[difficulty];

  let text: string;
  let answerOutline: string;
  let tags: string[];

  if (difficultyPool && difficultyPool.length > 0) {
    const pick = difficultyPool[Math.floor(Math.random() * difficultyPool.length)];
    text = pick.text;
    answerOutline = pick.answerOutline;
    tags = pick.tags;
  } else {
    const fb = fallbackTemplates[difficulty];
    text = fb.text.replace("[TOPIC]", topic);
    answerOutline = fb.answerOutline;
    tags = [topic.toLowerCase(), difficulty.toLowerCase(), "generated"];
  }

  const marksMap: Record<Difficulty, number> = { Easy: 2, Medium: 4, Hard: 5 };

  idCounter += 1;
  return {
    id: `gen-${idCounter}`,
    topic,
    subtopic: "Generated",
    level: difficulty === "Hard" ? "A Level (H2 Chemistry)" : "O Level (Pure Chemistry)",
    difficulty,
    questionType,
    marks: marksMap[difficulty],
    sourceYear: new Date().getFullYear(),
    sourcePaper: "AI-Generated Draft",
    text,
    answerOutline,
    tags: [...tags, "generated"],
  };
}
