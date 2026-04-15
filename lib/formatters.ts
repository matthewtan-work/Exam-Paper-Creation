import { FormatterTemplate } from "@/data/formatterTemplates";

// ─── LEARN-AND-FORMAT ENGINE ──────────────────────────────────────────────────
// Detects structural patterns from an ideal example, then applies them to raw text.
// No LLM required — swap learnAndFormat() internals for a real API call to upgrade.

interface DetectedPattern {
  subpartStyle: "letter-paren" | "letter-dot" | "number-dot" | "uppercase-dot" | "none";
  marksStyle: "square-number" | "square-marks" | "paren-number" | "none";
  marksPosition: "end-of-line" | "own-line";
  doubleSpaced: boolean;      // blank line between subparts
  hasIntroLine: boolean;      // first content line has no subpart prefix
  hasTotalLine: boolean;      // ends with [Total: X marks] or similar
  hasBulletHint: boolean;     // "Your answer should include: •…"
  bulletHintPrefix: string;   // the line before bullets, e.g. "In your answer, you should:"
  sectionHeader: string;      // ALL CAPS header like "SECTION A" if present
}

/** Parse an ideal-format example and extract its structural conventions. */
function detectPattern(ideal: string): DetectedPattern {
  const lines = ideal.split("\n").map((l) => l.trim());

  // Subpart label style
  let subpartStyle: DetectedPattern["subpartStyle"] = "none";
  if (lines.some((l) => /^\(a\)\s/.test(l) || /^\(a\)$/.test(l))) subpartStyle = "letter-paren";
  else if (lines.some((l) => /^a\)\s/.test(l))) subpartStyle = "letter-paren"; // a) variant
  else if (lines.some((l) => /^a\.\s/.test(l))) subpartStyle = "letter-dot";
  else if (lines.some((l) => /^\d+\.\s/.test(l))) subpartStyle = "number-dot";
  else if (lines.some((l) => /^[A-Z]\.\s/.test(l))) subpartStyle = "uppercase-dot";

  // Marks format
  let marksStyle: DetectedPattern["marksStyle"] = "none";
  if (/\[\d+\s+marks?\]/i.test(ideal)) marksStyle = "square-marks";
  else if (/\[\d+\]/.test(ideal)) marksStyle = "square-number";
  else if (/\(\d+\s+marks?\)/i.test(ideal)) marksStyle = "paren-number";
  else if (/\(\d+\)/.test(ideal)) marksStyle = "paren-number";

  // Marks position — check if marks appear on their own line
  const marksOwnLine = lines.some((l) => /^\[\d/.test(l) && l.length < 20);
  const marksPosition: DetectedPattern["marksPosition"] = marksOwnLine ? "own-line" : "end-of-line";

  // Double spacing between parts
  const doubleSpaced = /\n\n/.test(ideal);

  // Intro line: first non-empty, non-header line has no subpart prefix
  const firstContent = lines.find((l) => l.length > 0 && !/^[A-Z\s]{4,}$/.test(l));
  const hasIntroLine = !!firstContent && !/^\(?[a-zA-Z0-9][\.\)]/.test(firstContent);

  // Total marks line
  const hasTotalLine = /\[total[:\s]/i.test(ideal) || /total\s*:\s*\d+/i.test(ideal);

  // Bullet-point hint block ("Your answer should include:")
  const bulletHintMatch = ideal.match(/([^\n]+)\n(?:•|[-–—*])\s/);
  const hasBulletHint = !!bulletHintMatch;
  const bulletHintPrefix = bulletHintMatch ? bulletHintMatch[1].trim() : "In your answer, you should:";

  // Section header (ALL CAPS line ≥ 4 chars)
  const headerLine = lines.find((l) => l.length >= 4 && /^[A-Z\s\d]+$/.test(l));
  const sectionHeader = headerLine ?? "";

  return {
    subpartStyle,
    marksStyle,
    marksPosition,
    doubleSpaced,
    hasIntroLine,
    hasTotalLine,
    hasBulletHint,
    bulletHintPrefix,
    sectionHeader,
  };
}

/** Format a marks number according to the detected style. */
function renderMarks(n: number, style: DetectedPattern["marksStyle"]): string {
  switch (style) {
    case "square-marks": return `[${n} ${n === 1 ? "mark" : "marks"}]`;
    case "paren-number": return `(${n})`;
    case "none": return "";
    default: return `[${n}]`; // square-number
  }
}

/** Render a subpart label (index 0-based) according to detected style. */
function renderLabel(i: number, style: DetectedPattern["subpartStyle"]): string {
  const letter = String.fromCharCode(97 + i); // a, b, c…
  const upper = letter.toUpperCase();
  switch (style) {
    case "letter-paren": return `(${letter})`;
    case "letter-dot":   return `${letter}.`;
    case "number-dot":   return `${i + 1}.`;
    case "uppercase-dot": return `${upper}.`;
    default:             return `(${letter})`;
  }
}

const sep = (doubleSpaced: boolean) => doubleSpaced ? "\n\n" : "\n";

/**
 * Learn structural patterns from an ideal-format example and apply them to raw messy text.
 * Upgrade path: replace this function with a real LLM call (Claude API) for semantic understanding.
 */
export function learnAndFormat(ideal: string, raw: string): string {
  if (!raw.trim()) return "";

  const pattern = detectPattern(ideal);
  const lines = splitLines(raw);
  if (lines.length === 0) return "";

  const sp = sep(pattern.doubleSpaced);

  // Essay / bullet-hint style
  if (pattern.hasBulletHint) {
    const [intro, ...parts] = lines;
    let out = "";
    if (pattern.sectionHeader) out += `${pattern.sectionHeader}\n\n`;
    out += `${examPhrase(cleanLine(intro))}\n\n`;
    out += `${pattern.bulletHintPrefix}\n`;
    parts.forEach((p) => {
      out += `• ${examPhrase(cleanLine(p))}\n`;
    });
    const totalM = parts.reduce((s, p) => s + estimateMarks(p), 0) + 10;
    if (pattern.hasTotalLine && pattern.marksStyle !== "none") {
      out += `\n${renderMarks(totalM, pattern.marksStyle).replace(/[\[\(]/, "[Total: ").replace(/\]|\)/, " marks]")}`;
    } else if (pattern.marksStyle !== "none") {
      out += `\n[${totalM} marks]`;
    }
    return out.trim();
  }

  // Standard structured style
  const [intro, ...parts] = pattern.hasIntroLine ? lines : ["", ...lines];
  let out = "";

  if (pattern.sectionHeader) out += `${pattern.sectionHeader}\n\n`;
  if (intro) out += `${examPhrase(cleanLine(intro))}${sp}`;

  let totalM = 0;
  parts.forEach((part, i) => {
    const label = renderLabel(i, pattern.subpartStyle === "none" ? "letter-paren" : pattern.subpartStyle);
    const text = examPhrase(cleanLine(part));
    const m = estimateMarks(text);
    totalM += m;

    if (pattern.marksStyle === "none") {
      out += `${label}  ${text}${sp}`;
    } else if (pattern.marksPosition === "own-line") {
      out += `${label}  ${text}\n${renderMarks(m, pattern.marksStyle)}${sp}`;
    } else {
      out += `${label}  ${text} ${renderMarks(m, pattern.marksStyle)}${sp}`;
    }
  });

  if (pattern.hasTotalLine && pattern.marksStyle !== "none") {
    out = out.trimEnd() + `\n\n[Total: ${totalM} marks]`;
  }

  return out.trim();
}

// Sample ideal formats for quick-start demo
export const sampleIdealFormats = [
  {
    id: "sg-olevels",
    label: "Singapore O-Level",
    text: `Sodium chloride is an ionic compound.

(a) Explain why sodium chloride has a high melting point. [2]

(b) State and explain whether solid sodium chloride can conduct electricity. [2]

(c) Describe what is observed when sodium chloride is dissolved in water. [1]

[Total: 5 marks]`,
  },
  {
    id: "sg-alevels",
    label: "A-Level Structured",
    text: `Ethanoic acid is a weak acid.

(a) State what is meant by a weak acid. [1]

(b) Write an equation to show the partial dissociation of ethanoic acid in water. [1]

(c) Explain why a solution of ethanoic acid has a higher pH than a solution of hydrochloric acid of the same concentration. [2]

(d) Calculate the pH of 0.10 mol dm⁻³ ethanoic acid, given Ka = 1.8 × 10⁻⁵ mol dm⁻³. [3]

[Total: 7 marks]`,
  },
  {
    id: "essay",
    label: "Essay Question",
    text: `QUESTION 2

Discuss the causes and consequences of the Great Depression of the 1930s.

In your answer, you should:
• Analyse at least two economic causes of the Depression
• Explain the social consequences for ordinary people
• Evaluate the effectiveness of government responses

[20 marks]`,
  },
  {
    id: "source-based",
    label: "Source-Based Question",
    text: `Study Source A and answer the questions that follow.

(a) Using Source A, identify two ways in which living conditions had changed. [2]

(b) Explain why the government introduced the policies described in Source A. [4]

(c) How reliable is Source A as evidence of government policy? Explain your answer. [4]

(d) "The policies described in Source A were the main reason for economic growth." Do you agree? Use Sources A and B and your own knowledge. [8]`,
  },
];
// ─────────────────────────────────────────────────────────────────────────────

// Capitalise first letter of a string
function capitalise(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1).trim();
}

// Strip trailing punctuation that isn't sentence-ending
function cleanLine(line: string): string {
  return line.replace(/[,;:]+$/, "").trim();
}

// Convert a raw line into exam-ready phrasing
function examPhrase(line: string): string {
  const lower = line.toLowerCase();

  // Common phrasing upgrades
  const replacements: [RegExp, string][] = [
    [/^(explain|describe|discuss)\s+/i, "Explain "],
    [/^(state|name|identify)\s+/i, "State "],
    [/^(draw|sketch|diagram)\s+/i, "Draw "],
    [/^(calculate|work out|find|determine)\s+/i, "Calculate "],
    [/^(compare|contrast)\s+/i, "Compare "],
    [/^(suggest|propose)\s+/i, "Suggest "],
  ];

  for (const [pattern, replacement] of replacements) {
    if (pattern.test(line)) {
      return capitalise(line.replace(pattern, replacement));
    }
  }

  return capitalise(line);
}

// Split raw text into non-empty lines
function splitLines(raw: string): string[] {
  return raw
    .split(/\n+/)
    .map((l) => l.trim())
    .filter(Boolean);
}

// Format raw text as a structured question with subparts
export function formatStructured(raw: string): string {
  const lines = splitLines(raw);
  if (lines.length === 0) return "";

  const [intro, ...parts] = lines;
  const subpartLabels = ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)"];

  let out = examPhrase(cleanLine(intro)) + "\n\n";

  parts.forEach((part, i) => {
    const label = subpartLabels[i] ?? `(${i + 1})`;
    const text = examPhrase(cleanLine(part));
    const marks = estimateMarks(text);
    out += `${label}  ${text} [${marks}]\n\n`;
  });

  const totalMarks = parts.reduce((sum, p) => sum + estimateMarks(p), 0);
  out += `[Total: ${totalMarks} marks]`;

  return out.trim();
}

// Format as an essay question
export function formatEssay(raw: string): string {
  const lines = splitLines(raw);
  if (lines.length === 0) return "";

  const [intro, ...parts] = lines;
  let out = `**${examPhrase(cleanLine(intro))}**\n\n`;

  if (parts.length > 0) {
    out += "In your answer, you should:\n";
    parts.forEach((part) => {
      out += `• ${examPhrase(cleanLine(part))}\n`;
    });
  }

  out += "\n[20 marks]";
  return out.trim();
}

// Format as a source-based question
export function formatSourceBased(raw: string): string {
  const lines = splitLines(raw);
  if (lines.length === 0) return "";

  const subpartLabels = ["(a)", "(b)", "(c)", "(d)", "(e)"];
  const markValues = [2, 3, 4, 6, 8];

  let out = "";

  lines.forEach((line, i) => {
    const label = subpartLabels[i] ?? `(${i + 1})`;
    const text = examPhrase(cleanLine(line));
    const marks = markValues[i] ?? estimateMarks(text);

    if (i === 0) {
      out += `${text}\n\n`;
    } else {
      out += `${label}  ${text} [${marks}]\n\n`;
    }
  });

  return out.trim();
}

// Format as a science open-ended investigation
export function formatScienceOpen(raw: string): string {
  const lines = splitLines(raw);
  if (lines.length === 0) return "";

  const headers = ["Context", "(a)  Hypothesis", "(b)  Method", "(c)  Analysis & Conclusion"];

  let out = "";

  lines.forEach((line, i) => {
    const text = examPhrase(cleanLine(line));
    if (i === 0) {
      out += `${text}\n\n`;
    } else {
      const header = headers[i] ?? `(${String.fromCharCode(96 + i)})`;
      const marks = estimateMarks(text);
      out += `${header}\n${text} [${marks}]\n\n`;
    }
  });

  return out.trim();
}

// Simple heuristic to estimate marks based on directive verb complexity
function estimateMarks(text: string): number {
  const lower = text.toLowerCase();
  if (/^(define|state|name|identify|give)/.test(lower)) return 1;
  if (/^(describe|explain|outline)/.test(lower)) return 2;
  if (/^(discuss|compare|contrast|evaluate|assess|justify)/.test(lower)) return 3;
  if (/^(calculate|determine)/.test(lower)) return 2;
  if (text.length > 120) return 3;
  return 2;
}

// Main dispatch function — picks formatter based on template
export function formatText(raw: string, template: FormatterTemplate): string {
  switch (template.id) {
    case "structured":
      return formatStructured(raw);
    case "essay":
      return formatEssay(raw);
    case "source-based":
      return formatSourceBased(raw);
    case "science-open":
      return formatScienceOpen(raw);
    default:
      return formatStructured(raw);
  }
}

/**
 * Basic formatter for the chemistry paper raw-text module.
 * Splits input into numbered exam question lines with simple structure.
 */
export function formatRawChemistry(raw: string): string {
  const lines = splitLines(raw);
  if (lines.length === 0) return "";

  const [first, ...rest] = lines;
  const subpartLabels = ["(a)", "(b)", "(c)", "(d)", "(e)", "(f)"];

  let out = `${examPhrase(cleanLine(first))}\n\n`;

  rest.forEach((line, i) => {
    const label = subpartLabels[i] ?? `(${i + 1})`;
    const text = examPhrase(cleanLine(line));
    const marks = estimateMarks(text);
    out += `${label}  ${text} [${marks}]\n\n`;
  });

  return out.trim();
}
