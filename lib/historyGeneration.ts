import { HistoryQuestion, HistoryLevel, HistoryQuestionType, HistorySource } from "@/data/historyQuestions";

// ─── MOCK QUESTION GENERATOR ────────────────────────────────────────────────

interface QuestionTemplate {
  directive: string;
  topic: string;
  subtopic: string;
  period: string;
  level: HistoryLevel;
  questionType: HistoryQuestionType;
  marks: number;
  tags: string[];
  answerPoints: string[];
}

const seqTemplates: QuestionTemplate[] = [
  {
    directive: "Explain why the policy of appeasement failed to prevent World War II.",
    topic: "World War II",
    subtopic: "Appeasement",
    period: "1930s",
    level: "O Level",
    questionType: "Structured Essay",
    marks: 8,
    tags: ["appeasement", "causes", "Hitler"],
    answerPoints: [
      "Hitler's unlimited ambitions went beyond what appeasement could satisfy",
      "Appeasement emboldened Hitler by signalling Western weakness",
      "Munich Agreement (1938) sacrificed Czechoslovakia without gaining lasting peace",
      "Britain and France were militarily unprepared — appeasement bought time but not security",
      "German invasion of Poland (1939) proved appeasement had failed",
    ],
  },
  {
    directive: "How far was the Cold War the result of mistrust between the USA and the USSR after 1945?",
    topic: "Cold War",
    subtopic: "Origins of the Cold War",
    period: "1945–1991",
    level: "O Level",
    questionType: "Structured Essay",
    marks: 10,
    tags: ["Cold War", "USA", "USSR", "mistrust", "origins"],
    answerPoints: [
      "Ideological difference — capitalism vs communism created fundamental suspicion",
      "Disagreements at Yalta and Potsdam over post-war Europe",
      "Soviet expansion into Eastern Europe seen as threatening by the West",
      "Truman Doctrine (1947) and Marshall Plan signalled US containment strategy",
      "However, other factors: nuclear rivalry, proxy wars, German question also contributed",
    ],
  },
  {
    directive: "Explain why the Korean War (1950–1953) was an important Cold War conflict.",
    topic: "Cold War",
    subtopic: "Korean War",
    period: "1950s–1960s",
    level: "O Level",
    questionType: "Structured Essay",
    marks: 8,
    tags: ["Korean War", "containment", "Cold War", "proxy war"],
    answerPoints: [
      "First armed conflict between capitalist and communist powers since 1945",
      "Demonstrated US commitment to containment outside Europe",
      "China's intervention changed the military balance and alarmed the West",
      "Ended in stalemate — showed limits of military power in Cold War",
      "Accelerated US rearmament and NATO military build-up",
    ],
  },
  {
    directive: "How successfully did Singapore overcome the challenges of independence after 1965?",
    topic: "Singapore History",
    subtopic: "Nation-Building",
    period: "1965–present",
    level: "O Level",
    questionType: "Structured Essay",
    marks: 10,
    tags: ["Singapore", "independence", "nation-building", "Lee Kuan Yew"],
    answerPoints: [
      "Economic success: industrialisation, export-oriented manufacturing, MNC attraction",
      "HDB housing resolved severe shortage; created multiracial communities",
      "National Service built defence capability and national identity",
      "Racial harmony maintained through CMIO policy and strong laws",
      "Challenges: lack of natural resources, small size, regional instability initially",
    ],
  },
  {
    directive: "Explain why the Cuban Missile Crisis of 1962 was the most dangerous moment of the Cold War.",
    topic: "Cold War",
    subtopic: "Cuban Missile Crisis",
    period: "1950s–1960s",
    level: "O Level",
    questionType: "Structured Essay",
    marks: 8,
    tags: ["Cuba", "missile crisis", "Kennedy", "Khrushchev", "nuclear"],
    answerPoints: [
      "Soviet missiles 90 miles from US mainland posed direct nuclear threat",
      "13-day standoff brought superpowers closest to direct military confrontation",
      "Risk of accidental nuclear launch was real — Soviet submarine nearly fired torpedo",
      "Resolution required back-channel diplomacy and mutual concessions",
      "Led to hotline, partial test ban treaty — showed need for crisis management",
    ],
  },
];

const sbqSourcePairs: Array<{
  topic: string;
  subtopic: string;
  period: string;
  level: HistoryLevel;
  marks: number;
  tags: string[];
  sources: HistorySource[];
  questions: string;
  answerOutline: string;
}> = [
  {
    topic: "Cold War",
    subtopic: "Berlin Crisis",
    period: "1945–1991",
    level: "O Level",
    marks: 12,
    tags: ["Berlin", "Wall", "source-based", "Cold War"],
    sources: [
      {
        label: "Source A",
        origin: "President Kennedy, speech at the Berlin Wall, June 1963",
        excerpt:
          "There are many people in the world who really don't understand, or say they don't, what is the great issue between the free world and the Communist world. Let them come to Berlin. Freedom is indivisible, and when one man is enslaved, all are not free.",
      },
      {
        label: "Source B",
        origin: "East German government statement on the construction of the Berlin Wall, August 1961",
        excerpt:
          "The government of the German Democratic Republic is forced to introduce measures to safeguard the security of the GDR. The open border has been exploited by revanchist and militarist forces in West Germany to undermine the foundations of our socialist state.",
      },
    ],
    questions:
      "Study the sources below and answer the questions that follow.\n\n(a) What can you infer from Source A about Kennedy's view of the Berlin Wall? [3]\n(b) How far does Source B support the view in Source A about the purpose of the Berlin Wall? [4]\n(c) 'The Berlin Wall was built primarily to protect East Germany's interests.' Using the sources and your own knowledge, how far do you agree? [5]",
    answerOutline:
      "(a) Kennedy saw the Wall as a symbol of communist oppression; it divided a free people [2]; he used Berlin to rally free world solidarity [1]. (b) Sources conflict — Source A calls the Wall a symbol of enslavement; Source B frames it as a defensive necessity against Western aggression [2]; limited support — both acknowledge division but justify it differently [2]. (c) Agree: massive emigration was crippling East Germany's economy and workforce [2]; GDR genuinely feared collapse [1]. Disagree: Wall trapped citizens against their will; Kennedy's view — imprisonment of a population [2].",
  },
  {
    topic: "Singapore History",
    subtopic: "Singapore's Merger with Malaysia",
    period: "1945–1965",
    level: "O Level",
    marks: 12,
    tags: ["merger", "Malaysia", "source-based", "Singapore", "Tunku"],
    sources: [
      {
        label: "Source A",
        origin: "Lee Kuan Yew, speech to the Legislative Assembly, Singapore, 1961",
        excerpt:
          "Merger is the only way forward for Singapore. We are a small island with no natural resources. Without the common market and the broader economic base of Malaysia, our industrial programme cannot succeed. Separation means stagnation.",
      },
      {
        label: "Source B",
        origin: "Tunku Abdul Rahman, statement to the press, Kuala Lumpur, 1961",
        excerpt:
          "I welcome Singapore into Malaysia as part of a larger family. But we must be clear — the union must be based on common loyalty and shared values, not on political calculation alone. The communal balance of the federation must be maintained.",
      },
    ],
    questions:
      "Study the sources below and answer the questions that follow.\n\n(a) What does Source A suggest about Lee Kuan Yew's reasons for supporting merger? [3]\n(b) How far does Source B agree with the reasons given in Source A for supporting merger? [4]\n(c) 'Economic reasons were the main motivation for Singapore's merger with Malaysia in 1963.' Using the sources and your own knowledge, how far do you agree? [5]",
    answerOutline:
      "(a) LKY saw merger as economic necessity — small island needed Malaysian market [2]; also implicit: political security against communism [1]. (b) Tunku mentions Malaysia's family but emphasises communal balance — political/demographic concern, not purely economic [2]; partial agreement — both support merger but for different reasons [2]. (c) Agree: Singapore's industrial plans depended on Malaysian market [2]; Lee Kuan Yew prioritised economic development [1]. Disagree: security from communism was equally important to PAP; Tunku's motivation was geopolitical — keeping Singapore within federation rather than turning communist [2].",
  },
];

export function generateHistoryQuestion(
  topic: string,
  level: HistoryLevel,
  questionType: HistoryQuestionType
): HistoryQuestion {
  const id = `gen-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  if (questionType === "Source-Based") {
    const match =
      sbqSourcePairs.find((s) => s.topic === topic && s.level === level) ??
      sbqSourcePairs[Math.floor(Math.random() * sbqSourcePairs.length)];

    return {
      id,
      topic: match.topic,
      subtopic: match.subtopic,
      level: match.level,
      period: match.period,
      questionType: "Source-Based",
      marks: match.marks,
      sourceYear: new Date().getFullYear(),
      sourcePaper: "AI-Generated",
      text: match.questions,
      answerOutline: match.answerOutline,
      sources: match.sources,
      tags: match.tags,
    };
  }

  const match =
    seqTemplates.find((t) => t.topic === topic && t.level === level) ??
    seqTemplates.find((t) => t.topic === topic) ??
    seqTemplates[Math.floor(Math.random() * seqTemplates.length)];

  const actualMarks = level === "A Level (H2)" ? 25 : level === "A Level (H1)" ? 15 : match.marks;
  const actualType: HistoryQuestionType = level.startsWith("A Level") ? "Essay" : "Structured Essay";

  return {
    id,
    topic: match.topic,
    subtopic: match.subtopic,
    level,
    period: match.period,
    questionType: actualType,
    marks: actualMarks,
    sourceYear: new Date().getFullYear(),
    sourcePaper: "AI-Generated",
    text: `${match.directive} [${actualMarks}]`,
    answerOutline: match.answerPoints.map((p, i) => `${i + 1}. ${p}`).join("\n"),
    tags: match.tags,
  };
}

// ─── ANSWER GUIDE GENERATOR ─────────────────────────────────────────────────

export interface AnswerGuide {
  questionId: string;
  questionText: string;
  markScheme: MarkSchemeEntry[];
  totalMarks: number;
  level: HistoryLevel;
  questionType: HistoryQuestionType;
  generalAdvice: string;
}

export interface MarkSchemeEntry {
  part: string;         // "(a)", "(b)", or "Full Question"
  marks: number;
  guidance: string;
  levelDescriptors?: LevelDescriptor[];
}

export interface LevelDescriptor {
  level: string;   // "L1", "L2", "L3"
  marks: string;   // "1–2", "3–4"
  description: string;
}

function buildSBQMarkScheme(q: HistoryQuestion): MarkSchemeEntry[] {
  // Parse subpart marks from question text [3], [4], [5]…
  const partMatches = [...q.text.matchAll(/\(([a-e])\)[^\[]*\[(\d+)\]/g)];
  if (partMatches.length === 0) {
    return [{
      part: "Full Question",
      marks: q.marks,
      guidance: q.answerOutline,
    }];
  }

  // Split answerOutline by (a), (b), (c) markers
  const outlineParts = q.answerOutline.split(/(?=\([a-e]\)\s)/);

  return partMatches.map((m, i) => {
    const part = `(${m[1]})`;
    const marks = parseInt(m[2], 10);
    const guidance = outlineParts[i]?.trim() ?? "";

    const descriptors: LevelDescriptor[] | undefined =
      marks >= 4
        ? [
            { level: "L1", marks: "1", description: "Describes the source without inference or analysis." },
            { level: "L2", marks: `2–${Math.ceil(marks / 2)}`, description: "Makes a supported inference or identifies limited comparison." },
            { level: "L3", marks: `${Math.ceil(marks / 2) + 1}–${marks}`, description: "Sustained analysis with evidence from source and own knowledge." },
          ]
        : undefined;

    return { part, marks, guidance, levelDescriptors: descriptors };
  });
}

function buildSEQMarkScheme(q: HistoryQuestion): MarkSchemeEntry[] {
  const points = q.answerOutline.split("\n").filter(Boolean);
  const isLevel = q.level.startsWith("A Level");
  const descriptors: LevelDescriptor[] = isLevel
    ? [
        { level: "L1", marks: "1–5", description: "Descriptive answer with limited analysis; few or no links to question." },
        { level: "L2", marks: "6–10", description: "Some analysis; argues a position but inconsistently supported." },
        { level: "L3", marks: "11–15", description: "Clear argument; sustained analysis; good use of evidence; balanced assessment." },
        ...(q.marks > 15
          ? [{ level: "L4", marks: "16–25", description: "Sophisticated, nuanced argument; confident use of historiography or multiple perspectives." }]
          : []),
      ]
    : [
        { level: "L1", marks: "1–3", description: "Simple or descriptive answer with little explanation." },
        { level: "L2", marks: "4–6", description: "Explains one or two reasons with some supporting evidence." },
        { level: "L3", marks: `7–${q.marks}`, description: "Well-developed explanation with multiple points and clear linking back to question." },
      ];

  return [
    {
      part: "Full Question",
      marks: q.marks,
      guidance:
        "Award marks for the following content points (any order):\n" +
        points.map((p) => `• ${p}`).join("\n"),
      levelDescriptors: descriptors,
    },
  ];
}

export function generateAnswerGuide(questions: HistoryQuestion[]): AnswerGuide[] {
  return questions.map((q) => {
    const markScheme =
      q.questionType === "Source-Based"
        ? buildSBQMarkScheme(q)
        : buildSEQMarkScheme(q);

    const generalAdvice =
      q.questionType === "Source-Based"
        ? "Remind students to refer back to the source for every inference. Cross-referencing between sources earns higher marks. Own knowledge should supplement — not replace — the sources."
        : q.level.startsWith("A Level")
        ? "A Level essays require a clear thesis, sustained argument, and historiographical awareness. Students must not merely describe events — every paragraph must link back to the question."
        : "Structured essays must explain, not describe. Use PEEL (Point, Evidence, Explain, Link) for each paragraph. Reward any well-reasoned argument supported by specific historical evidence.";

    return {
      questionId: q.id,
      questionText: q.text,
      markScheme,
      totalMarks: q.marks,
      level: q.level,
      questionType: q.questionType,
      generalAdvice,
    };
  });
}
