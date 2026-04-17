import { HistoryQuestion, HistorySource, SBQSubquestion } from "@/data/historyQuestions";
import type { HistoryPaper, HistoryUnit } from "@/data/syllabusHistory";

// ─── MOCK QUESTION GENERATOR ────────────────────────────────────────────────

interface EssayTemplate {
  paper: HistoryPaper;
  unit: HistoryUnit;
  examIssue: string;
  text: string;
  marks: number;
  tags: string[];
  answerPoints: string[];
}

interface SBQTemplate {
  paper: HistoryPaper;
  unit: HistoryUnit;
  examIssue: string;
  marks: number;
  tags: string[];
  sources: HistorySource[];
  subquestions: SBQSubquestion[];
  answerScheme: string;
}

const essayTemplates: EssayTemplate[] = [
  {
    paper: "Paper 1",
    unit: "Nazi Germany",
    examIssue: "Rise of Hitler",
    text: "Explain why Hitler was able to become Chancellor of Germany by January 1933. [10]",
    marks: 10,
    tags: ["Hitler", "Weimar Republic", "Nazi Party", "Great Depression"],
    answerPoints: [
      "Weakness of the Weimar Republic — proportional representation caused political deadlock",
      "Impact of the Great Depression (1929) — mass unemployment discredited democratic parties",
      "Nazi propaganda and Hitler's oratory appealed to Germans seeking strong leadership",
      "SA violence and intimidation suppressed political opposition",
      "Backroom deals — von Papen convinced Hindenburg that Hitler could be controlled",
    ],
  },
  {
    paper: "Paper 2",
    unit: "Cold War in Europe",
    examIssue: "Origins of the Cold War",
    text: "How far was mistrust between the USA and USSR the main cause of the Cold War? [10]",
    marks: 10,
    tags: ["Cold War", "USA", "USSR", "mistrust", "ideology"],
    answerPoints: [
      "Ideological difference — capitalism vs communism created fundamental suspicion",
      "Disagreements at Yalta and Potsdam over post-war Europe",
      "Soviet expansion into Eastern Europe threatened the West",
      "Truman Doctrine (1947) and Marshall Plan signalled US containment strategy",
      "However, also nuclear rivalry, German question, and proxy wars contributed",
    ],
  },
  {
    paper: "Paper 2",
    unit: "Korean War",
    examIssue: "Significance of the Korean War",
    text: "Explain why the Korean War (1950–1953) was an important Cold War conflict. [10]",
    marks: 10,
    tags: ["Korean War", "containment", "Cold War", "proxy war", "China"],
    answerPoints: [
      "First armed conflict testing US containment policy outside Europe",
      "China's intervention changed the military balance and alarmed the West",
      "Ended in stalemate — showed limits of military power in Cold War",
      "Accelerated US rearmament and strengthened NATO commitments",
      "Demonstrated UN's role (and limitations) as a peacekeeping body",
    ],
  },
  {
    paper: "Paper 1",
    unit: "British Malaya, 1870s-1920s",
    examIssue: "British colonial administration",
    text: "Explain how the British extended their control over Malaya between the 1870s and 1920s. [10]",
    marks: 10,
    tags: ["British Malaya", "Pangkor Treaty", "Resident System", "FMS"],
    answerPoints: [
      "Pangkor Treaty (1874) introduced the Resident System in Perak",
      "British residents advised sultans on all matters except religion and custom",
      "Federated Malay States (1896) unified Perak, Selangor, Negeri Sembilan, Pahang",
      "Unfederated Malay States brought under British influence by early 20th century",
      "Economic motives — tin and rubber made Malaya strategically vital",
    ],
  },
  {
    paper: "Paper 2",
    unit: "British Malaya, 1945-1957",
    examIssue: "Path to independence",
    text: "Explain why Malaya achieved independence in 1957. [10]",
    marks: 10,
    tags: ["Malayan independence", "UMNO", "Alliance Party", "Emergency"],
    answerPoints: [
      "Growth of Malayan nationalism — UMNO and MCA formed Alliance Party",
      "Alliance victory in 1955 elections demonstrated readiness for self-rule",
      "British policy shift post-WWII — decolonisation across empire",
      "Communist Emergency (1948–1960) was being contained — security improving",
      "Negotiated independence: Tunku Abdul Rahman led constitutional talks in London",
    ],
  },
];

const sbqTemplates: SBQTemplate[] = [
  {
    paper: "Paper 1",
    unit: "Nazi Germany",
    examIssue: "Nazi propaganda",
    marks: 30,
    tags: ["Nazi propaganda", "Goebbels", "source-based"],
    sources: [
      {
        label: "Source A",
        provenance: "Nazi election poster, 1932. Caption reads: 'Hitler — Our Last Hope'.",
        excerpt: "A crowd of desperate-looking workers, farmers, and soldiers march behind an image of Adolf Hitler. The text below reads: 'Hitler — Our Last Hope.'",
        sourceType: "photograph",
        viewpoint: "Nazi Party propaganda",
        issueTested: "Nazi propaganda appealing to economic desperation",
        wordCount: 42,
      },
      {
        label: "Source B",
        provenance: "Joseph Goebbels, diary entry, 1932.",
        excerpt: "We must speak to the people in language they understand. The masses do not think — they feel. Only emotion, not reason, will win them over to our cause.",
        sourceType: "memoir",
        viewpoint: "Nazi propaganda minister",
        issueTested: "Deliberate emotional manipulation in Nazi messaging",
        wordCount: 38,
      },
    ],
    subquestions: [
      {
        label: "(a)",
        marks: 5,
        subType: "inference",
        ao: "AO1+AO3",
        text: "Study Source A. What can you infer about why the Nazi Party gained support in 1932? [5]",
        guidanceNotes: "Award marks for inferences supported by specific detail from Source A. E.g. — appeals to economic desperation; promises strong leadership.",
      },
      {
        label: "(b)",
        marks: 8,
        subType: "purpose",
        ao: "AO1+AO3",
        text: "Study Source B. Why did Goebbels write this diary entry? Explain your answer using Source B and your own knowledge. [8]",
        guidanceNotes: "Purpose: to record his propaganda strategy. Cross-reference own knowledge of Goebbels's role and Nazi use of emotion-based messaging.",
      },
    ],
    answerScheme: "(a) Inferences may include: Nazis targeted people in economic hardship [2]; Hitler presented as saviour/last hope [2]; appeals to multiple social groups (workers, farmers, soldiers) [1]. (b) Purpose: to justify use of emotional propaganda [2]; Goebbels believed rational argument ineffective with masses [2]; supports Nazi practice of mass rallies, radio, film [2]; own knowledge — Goebbels created Ministry of Propaganda 1933 [2].",
  },
  {
    paper: "Paper 2",
    unit: "Cold War in Europe",
    examIssue: "Berlin Crisis",
    marks: 30,
    tags: ["Berlin Wall", "Kennedy", "Cold War", "source-based"],
    sources: [
      {
        label: "Source A",
        provenance: "President Kennedy, speech at the Berlin Wall, June 1963.",
        excerpt: "There are many people in the world who really don't understand what is the great issue between the free world and the Communist world. Let them come to Berlin.",
        sourceType: "speech",
        viewpoint: "US President defending West Berlin",
        issueTested: "Western view of Berlin Wall as symbol of oppression",
        wordCount: 44,
      },
      {
        label: "Source B",
        provenance: "East German government statement, August 1961.",
        excerpt: "The government of the GDR is forced to introduce measures to safeguard the security of the GDR. The open border has been exploited by revanchist forces to undermine our socialist state.",
        sourceType: "government_document",
        viewpoint: "East German justification for the Wall",
        issueTested: "Communist justification of the Berlin Wall as defensive",
        wordCount: 43,
      },
    ],
    subquestions: [
      {
        label: "(a)",
        marks: 5,
        subType: "inference",
        ao: "AO1+AO3",
        text: "Study Source A. What can you infer about Kennedy's view of the Berlin Wall? [5]",
        guidanceNotes: "Inferences: Wall symbolises communist oppression [2]; Berlin as test of Western resolve [2]; Kennedy rallying free world solidarity [1].",
      },
      {
        label: "(b)",
        marks: 8,
        subType: "comparison",
        ao: "AO1+AO3",
        text: "How far do Sources A and B agree about the purpose of the Berlin Wall? [8]",
        guidanceNotes: "Agreement: both acknowledge the Wall as dividing Berlin [2]. Disagreement: Source A = symbol of oppression; Source B = defensive necessity [4]; own knowledge — mass emigration was destabilising GDR economy [2].",
      },
    ],
    answerScheme: "(a) Kennedy saw the Wall as evidence of communist repression [2]; used Berlin to rally the free world [2]; implied communist weakness — had to wall citizens in [1]. (b) Limited agreement — both acknowledge division [1]. Source A: Wall imprisons free people [2]; Source B: Wall protects GDR from Western subversion [2]; fundamental disagreement on freedom vs security [2]; own knowledge: 2.5 million East Germans fled before 1961 [1].",
  },
];

export function generateHistoryQuestion(
  unit: HistoryUnit,
  paper: HistoryPaper,
  questionType: "Essay" | "SBQ"
): HistoryQuestion {
  const id = `gen-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

  if (questionType === "SBQ") {
    const match =
      sbqTemplates.find((t) => t.unit === unit && t.paper === paper) ??
      sbqTemplates.find((t) => t.paper === paper) ??
      sbqTemplates[0];

    return {
      id,
      syllabusCode: "2174",
      paper: match.paper,
      section: "Section A",
      unit: match.unit,
      examIssue: match.examIssue,
      questionType: "SBQ",
      assessmentObjectives: "AO1+AO3",
      marks: match.marks,
      difficulty: "Medium",
      sourceYear: new Date().getFullYear(),
      sourceLabel: "Draft (Generated)",
      sources: match.sources,
      subquestions: match.subquestions,
      text: match.subquestions.map((sq) => sq.text).join("\n\n"),
      answerScheme: match.answerScheme,
      isSBQEligible: true,
      reviewStatus: "under_review",
      syllabusConfidence: "low",
      tags: [...match.tags, "generated"],
    };
  }

  const match =
    essayTemplates.find((t) => t.unit === unit && t.paper === paper) ??
    essayTemplates.find((t) => t.paper === paper) ??
    essayTemplates[0];

  return {
    id,
    syllabusCode: "2174",
    paper: match.paper,
    section: "Section B",
    unit: match.unit,
    examIssue: match.examIssue,
    questionType: "Essay",
    assessmentObjectives: "AO1+AO2",
    marks: 10,
    difficulty: "Medium",
    sourceYear: new Date().getFullYear(),
    sourceLabel: "Draft (Generated)",
    text: match.text,
    answerScheme: match.answerPoints.map((p, i) => `${i + 1}. ${p}`).join("\n"),
    historicalConcepts: ["causation"],
    reviewStatus: "under_review",
    syllabusConfidence: "low",
    tags: [...match.tags, "generated"],
  };
}

// ─── ANSWER GUIDE GENERATOR ─────────────────────────────────────────────────

export interface AnswerGuide {
  questionId: string;
  questionText: string;
  markScheme: MarkSchemeEntry[];
  totalMarks: number;
  paper: HistoryPaper;
  questionType: "Essay" | "SBQ";
  generalAdvice: string;
}

export interface MarkSchemeEntry {
  part: string;
  marks: number;
  guidance: string;
  levelDescriptors?: LevelDescriptor[];
}

export interface LevelDescriptor {
  level: string;
  marks: string;
  description: string;
}

function buildSBQMarkScheme(q: HistoryQuestion): MarkSchemeEntry[] {
  if (q.subquestions && q.subquestions.length > 0) {
    return q.subquestions.map((sq) => {
      const descriptors: LevelDescriptor[] | undefined =
        sq.marks >= 4
          ? [
              { level: "L1", marks: "1", description: "Describes the source without inference or analysis." },
              { level: "L2", marks: `2–${Math.ceil(sq.marks / 2)}`, description: "Makes a supported inference or limited comparison." },
              { level: "L3", marks: `${Math.ceil(sq.marks / 2) + 1}–${sq.marks}`, description: "Sustained analysis with evidence from source and own knowledge." },
            ]
          : undefined;
      return {
        part: sq.label,
        marks: sq.marks,
        guidance: sq.guidanceNotes,
        levelDescriptors: descriptors,
      };
    });
  }

  // Fallback: parse [n] marks from text
  const partMatches = [...q.text.matchAll(/\(([a-e])\)[^\[]*\[(\d+)\]/g)];
  if (partMatches.length === 0) {
    return [{ part: "Full Question", marks: q.marks, guidance: q.answerScheme }];
  }

  const outlineParts = q.answerScheme.split(/(?=\([a-e]\)\s)/);
  return partMatches.map((m, i) => {
    const marks = parseInt(m[2], 10);
    return {
      part: `(${m[1]})`,
      marks,
      guidance: outlineParts[i]?.trim() ?? "",
      levelDescriptors:
        marks >= 4
          ? [
              { level: "L1", marks: "1", description: "Describes source without inference." },
              { level: "L2", marks: `2–${Math.ceil(marks / 2)}`, description: "Supported inference or limited comparison." },
              { level: "L3", marks: `${Math.ceil(marks / 2) + 1}–${marks}`, description: "Sustained analysis with source evidence and own knowledge." },
            ]
          : undefined,
    };
  });
}

function buildEssayMarkScheme(q: HistoryQuestion): MarkSchemeEntry[] {
  const points = q.answerScheme.split("\n").filter(Boolean);
  const descriptors: LevelDescriptor[] = [
    { level: "L1", marks: "1–3", description: "Simple or descriptive answer with little explanation." },
    { level: "L2", marks: "4–6", description: "Explains one or two reasons with some supporting evidence." },
    { level: "L3", marks: `7–${q.marks}`, description: "Well-developed explanation with multiple points and clear links to the question." },
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
      q.questionType === "SBQ"
        ? buildSBQMarkScheme(q)
        : buildEssayMarkScheme(q);

    const generalAdvice =
      q.questionType === "SBQ"
        ? "Remind students to refer back to the source for every inference. Cross-referencing between sources earns higher marks. Own knowledge should supplement — not replace — the sources."
        : "Essays must explain, not describe. Use PEEL (Point, Evidence, Explain, Link) for each paragraph. Reward any well-reasoned argument supported by specific historical evidence. Students must address the question's focus word (e.g. 'how far', 'explain why').";

    return {
      questionId: q.id,
      questionText: q.text,
      markScheme,
      totalMarks: q.marks,
      paper: q.paper,
      questionType: q.questionType,
      generalAdvice,
    };
  });
}
