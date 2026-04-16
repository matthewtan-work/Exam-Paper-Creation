// Chemistry raw-text formatter — used by RawFormatter component in the Paper Builder.

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

// Simple heuristic to estimate marks based on directive verb complexity.
// Uses startsWith checks instead of regex alternation to avoid ReDoS risk.
function estimateMarks(text: string): number {
  const lower = text.toLowerCase();
  const oneMarkVerbs = ["define", "state", "name", "identify", "give"];
  const twoMarkVerbs = ["describe", "explain", "outline", "calculate", "determine"];
  const threeMarkVerbs = ["discuss", "compare", "contrast", "evaluate", "assess", "justify"];
  if (oneMarkVerbs.some((v) => lower.startsWith(v))) return 1;
  if (threeMarkVerbs.some((v) => lower.startsWith(v))) return 3;
  if (twoMarkVerbs.some((v) => lower.startsWith(v))) return 2;
  if (text.length > 120) return 3;
  return 2;
}

/**
 * Format raw chemistry text as a structured exam question with subparts.
 * Used by the RawFormatter component in the Paper Builder.
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
