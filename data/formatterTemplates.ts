export interface FormatterTemplate {
  id: string;
  name: string;
  description: string;
  hint: string;
  sampleInput: string;
  rules: {
    addNumbering: boolean;
    addSubparts: boolean;
    addMarksBracket: boolean;
    addSectionLabel: boolean;
    trimWhitespace: boolean;
    normaliseLineBreaks: boolean;
    addExamPhrasing: boolean;
  };
}

export const formatterTemplates: FormatterTemplate[] = [
  {
    id: "structured",
    name: "Structured Question",
    description: "Multi-part questions with lettered subparts (a), (b), (c) and marks per part.",
    hint: "Best for science, maths, and humanities questions with several distinct parts.",
    sampleInput: `Sodium and chlorine react to form sodium chloride
explain the type of bonding formed
draw the electron diagram for NaCl
state two properties of the product and explain them using its structure`,
    rules: {
      addNumbering: true,
      addSubparts: true,
      addMarksBracket: true,
      addSectionLabel: false,
      trimWhitespace: true,
      normaliseLineBreaks: true,
      addExamPhrasing: true,
    },
  },
  {
    id: "essay",
    name: "Essay Question",
    description: "Open-ended essay prompt with a clear directive and word/time guidance.",
    hint: "Best for humanities, social studies, and extended-response subjects.",
    sampleInput: `discuss the causes of world war 1
consider the role of nationalism, imperialism and militarism
refer to at least two countries in your answer
support your argument with relevant examples`,
    rules: {
      addNumbering: false,
      addSubparts: false,
      addMarksBracket: true,
      addSectionLabel: true,
      trimWhitespace: true,
      normaliseLineBreaks: true,
      addExamPhrasing: true,
    },
  },
  {
    id: "source-based",
    name: "Source-Based Question",
    description: "Questions anchored to a provided source, with inference and evaluation parts.",
    hint: "Best for humanities, geography, and social studies source-based tasks.",
    sampleInput: `Study Source A carefully
What does Source A tell us about the living conditions in the 1960s
How reliable is Source A as evidence of government policy
Compare Source A with Source B and explain which source is more useful`,
    rules: {
      addNumbering: true,
      addSubparts: true,
      addMarksBracket: true,
      addSectionLabel: true,
      trimWhitespace: true,
      normaliseLineBreaks: true,
      addExamPhrasing: true,
    },
  },
  {
    id: "science-open",
    name: "Science Open-Ended Response",
    description: "Hypothesis, method, analysis, and conclusion structure for science investigations.",
    hint: "Best for biology, chemistry, and physics practical or investigation questions.",
    sampleInput: `a student wants to find out how temperature affects the rate of enzyme activity
suggest a hypothesis for the investigation
describe a method to test this hypothesis
explain the expected results and how to analyse the data`,
    rules: {
      addNumbering: true,
      addSubparts: true,
      addMarksBracket: true,
      addSectionLabel: false,
      trimWhitespace: true,
      normaliseLineBreaks: true,
      addExamPhrasing: true,
    },
  },
];
