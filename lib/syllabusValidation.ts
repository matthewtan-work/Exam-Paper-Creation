/**
 * Syllabus validation utilities for Chemistry 6092 and History 2174.
 * All public functions return a ValidationResult — never throw.
 */

import {
  OFFICIAL_CHEM_TOPICS,
  LEGACY_TOPIC_MAP,
  VALID_QUESTION_TYPES_PER_PAPER,
  CHEM_PAPERS,
  OfficialChemTopic,
  ChemistryPaper,
} from "@/data/syllabusChemistry";

import {
  PAPER_1_UNITS,
  PAPER_2_UNITS,
  SBQ_ELIGIBLE_PAPER_1,
  SBQ_ELIGIBLE_PAPER_2,
  ESSAY_STRUCTURE,
  SBQ_CONSTRAINTS,
  Paper1Unit,
  Paper2Unit,
  HistoryPaper,
  HistorySection,
  HistoryUnit,
} from "@/data/syllabusHistory";

import type { ChemistryQuestion } from "@/data/chemistryQuestions";
import type { HistoryQuestion } from "@/data/historyQuestions";

// ── Shared result type ────────────────────────────────────────────────────────

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

function ok(): ValidationResult { return { valid: true, errors: [], warnings: [] }; }
function fail(errors: string[], warnings: string[] = []): ValidationResult {
  return { valid: false, errors, warnings };
}

// ═══════════════════════════════════════════════════════════════════════════
// CHEMISTRY 6092
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Map a legacy/informal topic label to an official 6092 topic.
 * Returns null if the label cannot be mapped — item should go to manual review.
 */
export function mapChemistryTopic(rawLabel: string): OfficialChemTopic | null {
  // Direct match first
  if ((OFFICIAL_CHEM_TOPICS as readonly string[]).includes(rawLabel)) {
    return rawLabel as OfficialChemTopic;
  }
  // Lookup in legacy map
  return LEGACY_TOPIC_MAP[rawLabel] ?? null;
}

/**
 * Validate that a question's type is valid for its assigned paper.
 */
export function validateChemistryPaperFit(q: ChemistryQuestion): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!CHEM_PAPERS.includes(q.paper)) {
    errors.push(`Unknown paper "${q.paper}". Must be one of: ${CHEM_PAPERS.join(", ")}.`);
  }

  const validTypes = VALID_QUESTION_TYPES_PER_PAPER[q.paper as ChemistryPaper] as readonly string[];
  if (validTypes && !validTypes.includes(q.questionType)) {
    errors.push(
      `Question type "${q.questionType}" is not valid for ${q.paper}. ` +
      `Allowed: ${validTypes.join(", ")}.`
    );
  }

  if (q.paper === "Paper 2" && !q.section) {
    errors.push("Paper 2 questions must specify a section (Section A or Section B).");
  }

  if (q.paper !== "Paper 2" && q.section) {
    warnings.push(`section field is set but this is ${q.paper} — section only applies to Paper 2.`);
  }

  if (q.paper === "Paper 3" && !q.isPractical) {
    errors.push("Paper 3 questions must have isPractical = true.");
  }

  if (q.isDataBased && q.paper === "Paper 1") {
    errors.push("Data-Based questions cannot appear in Paper 1 (MCQ only).");
  }

  if (q.reviewStatus === "needs_remapping" || q.reviewStatus === "under_review") {
    warnings.push(`Review status is "${q.reviewStatus}" — this question should not appear in active paper building until resolved.`);
  }

  if (q.syllabusConfidence === "low") {
    warnings.push("Syllabus confidence is LOW — treat this question with caution.");
  }

  return errors.length ? fail(errors, warnings) : { valid: true, errors: [], warnings };
}

/**
 * Validate the complete set of questions in a draft Chemistry paper.
 * Enforces paper-structure rules across the whole paper, not just individual questions.
 */
export function validateChemistryDraftPaper(questions: ChemistryQuestion[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  const p1Qs = questions.filter((q) => q.paper === "Paper 1");
  const p2Qs = questions.filter((q) => q.paper === "Paper 2");
  const p3Qs = questions.filter((q) => q.paper === "Paper 3");

  // Paper 1: MCQ only
  const nonMCQinP1 = p1Qs.filter((q) => q.questionType !== "MCQ");
  if (nonMCQinP1.length > 0) {
    errors.push(`Paper 1 contains ${nonMCQinP1.length} non-MCQ question(s). Paper 1 must contain only MCQ items.`);
  }
  if (p1Qs.length > 40) {
    errors.push(`Paper 1 has ${p1Qs.length} items. Maximum is 40 MCQ items.`);
  }

  // Paper 2: no MCQ
  const mcqInP2 = p2Qs.filter((q) => q.questionType === "MCQ");
  if (mcqInP2.length > 0) {
    errors.push(`Paper 2 contains ${mcqInP2.length} MCQ question(s). Paper 2 must use Structured, Free Response, or Data-Based only.`);
  }

  // Paper 2 must have at least one data-based question in Section A
  const sectionADataBased = p2Qs.filter((q) => q.section === "Section A" && q.isDataBased);
  if (p2Qs.length > 0 && sectionADataBased.length === 0) {
    warnings.push("Paper 2 Section A should include at least one data-based question per syllabus requirements.");
  }

  // No A-Level content (guard against accidental re-introduction)
  const aLevelItems = questions.filter((q) => {
    const text = q.text.toLowerCase() + q.tags.join(" ").toLowerCase();
    return text.includes("a-level") || text.includes("h1 chemistry") || text.includes("h2 chemistry");
  });
  if (aLevelItems.length > 0) {
    errors.push(`${aLevelItems.length} question(s) appear to contain A-Level content. Remove before finalising.`);
  }

  // Under-review items
  const reviewItems = questions.filter((q) => q.reviewStatus !== "approved");
  if (reviewItems.length > 0) {
    warnings.push(`${reviewItems.length} question(s) have review status other than "approved". Resolve before publishing.`);
  }

  return errors.length ? fail(errors, warnings) : { valid: true, errors: [], warnings };
}

// ═══════════════════════════════════════════════════════════════════════════
// HISTORY 2174
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Return the correct unit for a given paper, or null if unit does not belong.
 */
export function mapHistoryUnit(
  rawLabel: string,
  paper: HistoryPaper
): HistoryUnit | null {
  const units = paper === "Paper 1"
    ? (PAPER_1_UNITS as readonly string[])
    : (PAPER_2_UNITS as readonly string[]);

  // Exact match
  if (units.includes(rawLabel)) return rawLabel as HistoryUnit;

  // Loose keyword match for legacy labels
  const lower = rawLabel.toLowerCase();
  for (const unit of units) {
    if (unit.toLowerCase().includes(lower) || lower.includes(unit.toLowerCase())) {
      return unit as HistoryUnit;
    }
  }

  return null;
}

/**
 * Check whether a unit is eligible for SBQ (starred *) in a given paper.
 */
export function validateSBQTopicEligibility(
  unit: HistoryUnit,
  paper: HistoryPaper
): ValidationResult {
  const eligibleUnits =
    paper === "Paper 1"
      ? (SBQ_ELIGIBLE_PAPER_1 as readonly string[])
      : (SBQ_ELIGIBLE_PAPER_2 as readonly string[]);

  if (!eligibleUnits.includes(unit)) {
    return fail([
      `Unit "${unit}" is not SBQ-eligible (not starred *) in ${paper}. ` +
      `SBQ-eligible units for ${paper}: ${eligibleUnits.join("; ")}.`
    ]);
  }
  return ok();
}

/**
 * Validate an individual History question against syllabus rules.
 */
export function validateHistorySectionFit(q: HistoryQuestion): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Paper/unit alignment
  const unitList = q.paper === "Paper 1"
    ? (PAPER_1_UNITS as readonly string[])
    : (PAPER_2_UNITS as readonly string[]);

  if (!unitList.includes(q.unit)) {
    errors.push(
      `Unit "${q.unit}" does not belong to ${q.paper}. ` +
      `Valid units: ${unitList.join("; ")}.`
    );
  }

  // Section A must be SBQ
  if (q.section === "Section A" && q.questionType !== "SBQ") {
    errors.push("Section A questions must be Source-Based Case Studies (SBQ).");
  }

  // Section B must be Essay
  if (q.section === "Section B" && q.questionType !== "Essay") {
    errors.push("Section B questions must be Essays.");
  }

  // SBQ must be on starred topic
  if (q.questionType === "SBQ" && !q.isSBQEligible) {
    errors.push(
      `SBQ questions can only be set on starred (*) units. ` +
      `Unit "${q.unit}" is not marked as SBQ-eligible.`
    );
  }

  // Essay marks
  if (q.questionType === "Essay" && q.marks !== ESSAY_STRUCTURE.marksPerQuestion) {
    errors.push(
      `Essay mark value is ${q.marks}. All 2174 essays must be ${ESSAY_STRUCTURE.marksPerQuestion} marks.`
    );
  }

  // SBQ source count
  if (q.questionType === "SBQ" && q.sources) {
    if (q.sources.length > SBQ_CONSTRAINTS.maxSources) {
      errors.push(`SBQ has ${q.sources.length} sources. Maximum is ${SBQ_CONSTRAINTS.maxSources}.`);
    }
    // Word count check
    const overLength = q.sources.filter((s) => s.wordCount > SBQ_CONSTRAINTS.maxWordsPerSourceSurfaced);
    if (overLength.length > 0) {
      warnings.push(
        `${overLength.length} source(s) exceed ${SBQ_CONSTRAINTS.maxWordsPerSourceSurfaced} words. ` +
        `Trim before surfacing to students.`
      );
    }
  }

  // Excluded items
  if (q.reviewStatus === "excluded") {
    errors.push("This question is excluded from the 2174 syllabus scope. Remove from active repository.");
  }

  if (q.reviewStatus === "needs_remapping" || q.reviewStatus === "under_review") {
    warnings.push(`Review status is "${q.reviewStatus}". Do not include in paper until resolved.`);
  }

  return errors.length ? fail(errors, warnings) : { valid: true, errors: [], warnings };
}

/**
 * Validate a complete History draft paper.
 * Enforces:
 * - Section A SBQ issue ≠ Section B essay issue
 * - Paper-level structural rules
 * - No excluded items
 */
export function validateHistoryDraftPaper(questions: HistoryQuestion[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Group by paper
  const byPaper: Record<string, HistoryQuestion[]> = {};
  for (const q of questions) {
    if (!byPaper[q.paper]) byPaper[q.paper] = [];
    byPaper[q.paper].push(q);
  }

  for (const [paper, qs] of Object.entries(byPaper)) {
    const sectionA = qs.filter((q) => q.section === "Section A");
    const sectionB = qs.filter((q) => q.section === "Section B");

    // Section A: must have exactly one SBQ
    const sbqs = sectionA.filter((q) => q.questionType === "SBQ");
    if (qs.length > 0 && sbqs.length === 0) {
      warnings.push(`${paper}: No SBQ question in Section A. A complete paper needs one SBQ case study.`);
    }
    if (sbqs.length > 1) {
      errors.push(`${paper}: ${sbqs.length} SBQ questions in Section A. Only one SBQ case study per paper.`);
    }

    // Section B: essay count
    const essays = sectionB.filter((q) => q.questionType === "Essay");
    if (essays.length > 0 && essays.length < 2) {
      warnings.push(`${paper} Section B: ${essays.length} essay(s) in draft. A complete paper needs 3 essays offered (students answer 2).`);
    }
    if (essays.length > 3) {
      errors.push(`${paper} Section B: ${essays.length} essays exceeds maximum of 3 offered questions.`);
    }

    // SBQ issue ≠ essay issue in same paper
    if (sbqs.length === 1 && essays.length > 0) {
      const sbqIssue = sbqs[0].examIssue.toLowerCase();
      const conflictingEssays = essays.filter((e) =>
        e.examIssue.toLowerCase() === sbqIssue ||
        e.unit === sbqs[0].unit && e.examIssue.toLowerCase() === sbqIssue
      );
      if (conflictingEssays.length > 0) {
        errors.push(
          `${paper}: The SBQ examines issue "${sbqs[0].examIssue}". ` +
          `Essay Q${conflictingEssays.map((e) => ` "${e.examIssue}"`)} covers the same issue — not permitted per 2174 rules.`
        );
      }
    }
  }

  // Excluded items
  const excluded = questions.filter((q) => q.reviewStatus === "excluded");
  if (excluded.length > 0) {
    errors.push(`${excluded.length} excluded question(s) in draft. Remove before use.`);
  }

  return errors.length ? fail(errors, warnings) : { valid: true, errors: [], warnings };
}

// ═══════════════════════════════════════════════════════════════════════════
// SEED DATA AUDIT — run once to classify legacy questions
// ═══════════════════════════════════════════════════════════════════════════

export type AuditDecision = "keep_as_is" | "remap" | "remove" | "manual_review";

export interface AuditEntry {
  id: string;
  currentLabel: string;
  correctedMapping: string;
  correctedPaper: string;
  correctedSection: string;
  decision: AuditDecision;
  reason: string;
}

/**
 * Audit result for the original 33 chemistry questions from the legacy seed.
 * Produced by applying mapChemistryTopic() and validateChemistryPaperFit()
 * to each original question. Kept here as a permanent record.
 */
export const CHEMISTRY_SEED_AUDIT: AuditEntry[] = [
  { id: "q001", currentLabel: "Covalent Bonding", correctedMapping: "Chemical Bonding and Structure", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic label renamed to official 6092 topic. Content valid." },
  { id: "q002", currentLabel: "Covalent Bonding", correctedMapping: "Chemical Bonding and Structure", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Content valid." },
  { id: "q003", currentLabel: "Covalent Bonding", correctedMapping: "Chemical Bonding and Structure", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Content valid for 6092." },
  { id: "q004", currentLabel: "Covalent Bonding / Giant Covalent", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H2 Chemistry). Not in 6092 scope. Remove entirely." },
  { id: "q005", currentLabel: "Ionic Bonding", correctedMapping: "Chemical Bonding and Structure", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Note: original paper field was 'Paper 1' — question is structured so must move to Paper 2." },
  { id: "q006", currentLabel: "Ionic Bonding", correctedMapping: "Chemical Bonding and Structure", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Content valid." },
  { id: "q007", currentLabel: "Ionic Bonding", correctedMapping: "Chemical Bonding and Structure", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Good data-based question. Topic renamed, paper corrected." },
  { id: "q008", currentLabel: "Mole Concept", correctedMapping: "Chemical Calculations", correctedPaper: "Paper 1", correctedSection: "N/A", decision: "remap", reason: "Topic renamed. Calculation MCQ valid for Paper 1." },
  { id: "q009", currentLabel: "Mole Concept", correctedMapping: "Chemical Calculations", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Structured calculation valid for Paper 2." },
  { id: "q010", currentLabel: "Mole Concept", correctedMapping: "Chemical Calculations", correctedPaper: "Paper 2", correctedSection: "Section B", decision: "remap", reason: "Topic renamed. Multi-step titration appropriate for Section B." },
  { id: "q011", currentLabel: "Acids and Bases", correctedMapping: "Acid-Base Chemistry", correctedPaper: "Paper 1", correctedSection: "N/A", decision: "remap", reason: "Topic renamed. MCQ valid for Paper 1." },
  { id: "q012", currentLabel: "Acids and Bases", correctedMapping: "Acid-Base Chemistry", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Content valid." },
  { id: "q013", currentLabel: "Acids and Bases", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H1 Chemistry). Strong/weak acid equilibrium concept not in 6092. Remove entirely." },
  { id: "q014", currentLabel: "Redox", correctedMapping: "Redox Chemistry", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Content valid for 6092." },
  { id: "q015", currentLabel: "Redox / Half Equations", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H2 Chemistry). MnO₄⁻ half-equation in acidic solution is A-Level. Remove entirely." },
  { id: "q016", currentLabel: "Electrolysis", correctedMapping: "Redox Chemistry", correctedPaper: "Paper 1", correctedSection: "N/A", decision: "remap", reason: "Electrolysis sits under Redox Chemistry in 6092. MCQ valid for Paper 1." },
  { id: "q017", currentLabel: "Electrolysis", correctedMapping: "Redox Chemistry", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Content valid." },
  { id: "q018", currentLabel: "Electrolysis", correctedMapping: "Redox Chemistry", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Content valid." },
  { id: "q019", currentLabel: "Organic Chemistry", correctedMapping: "Organic Chemistry", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "keep_as_is", reason: "Topic already correct. Content valid." },
  { id: "q020", currentLabel: "Organic Chemistry", correctedMapping: "Organic Chemistry", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "keep_as_is", reason: "Topic already correct. Content valid." },
  { id: "q021", currentLabel: "Organic Chemistry / Alcohols", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H1 Chemistry). Fermentation vs hydration comparison is A-Level scope. Remove entirely." },
  { id: "q022", currentLabel: "Periodic Table", correctedMapping: "Patterns in the Periodic Table", correctedPaper: "Paper 1", correctedSection: "N/A", decision: "remap", reason: "Topic renamed. Group I trend valid for Paper 1 MCQ." },
  { id: "q023", currentLabel: "Periodic Table", correctedMapping: "Patterns in the Periodic Table", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Content valid." },
  { id: "q024", currentLabel: "Periodic Table / Transition Metals", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H2 Chemistry). Transition metal properties/complex ions are A-Level. Remove entirely." },
  { id: "q025", currentLabel: "Metals", correctedMapping: "Patterns in the Periodic Table", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Reactivity series and metal extraction sit under Patterns in the Periodic Table in 6092. Remapped." },
  { id: "q026", currentLabel: "Metals", correctedMapping: "Patterns in the Periodic Table", correctedPaper: "Paper 2", correctedSection: "Section B", decision: "remap", reason: "Topic renamed. Aluminium extraction question appropriate for Section B." },
  { id: "q027", currentLabel: "Metals / Corrosion", correctedMapping: "Patterns in the Periodic Table", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Rusting/corrosion is in Patterns in the Periodic Table (metals topic). Valid data-based question." },
  { id: "q028", currentLabel: "Energy Changes", correctedMapping: "Chemical Energetics", correctedPaper: "Paper 1", correctedSection: "N/A", decision: "remap", reason: "Topic renamed to official label. Content valid for Paper 1 MCQ." },
  { id: "q029", currentLabel: "Energy Changes / Bond Energies", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H2 Chemistry). Bond energy enthalpy calculations with H₂ + Cl₂ are A-Level scope. Remove entirely." },
  { id: "q030", currentLabel: "Energy Changes / Hess's Law", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H2 Chemistry). Hess's Law and enthalpy of formation calculations are A-Level. Remove entirely." },
  { id: "q031", currentLabel: "Mole Concept", correctedMapping: "Chemical Calculations", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Empirical/molecular formula valid for 6092." },
  { id: "q032", currentLabel: "Acids and Bases", correctedMapping: "Acid-Base Chemistry", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "remap", reason: "Topic renamed. Content valid." },
  { id: "q033", currentLabel: "Organic Chemistry", correctedMapping: "Organic Chemistry", correctedPaper: "Paper 2", correctedSection: "Section B", decision: "keep_as_is", reason: "Topic already correct. Polymer question valid for Paper 2 Section B." },
];

/**
 * Audit result for the original 26 history questions from the legacy seed.
 */
export const HISTORY_SEED_AUDIT: AuditEntry[] = [
  { id: "h001", currentLabel: "World War II / Causes in Europe", correctedMapping: "Paper 1 — WWII in Europe", correctedPaper: "Paper 1", correctedSection: "Section B", decision: "remap", reason: "Topic 'World War II' too broad. Maps to 'WWII in Europe' unit. Essay valid but marks must be 10, not 8." },
  { id: "h002", currentLabel: "World War II / Appeasement SBQ", correctedMapping: "Paper 1 — WWII in Europe", correctedPaper: "Paper 1", correctedSection: "Section A", decision: "remap", reason: "WWII in Europe is SBQ-eligible (*). SBQ valid but needs full structured format per 2174." },
  { id: "h003", currentLabel: "World War II / Asia-Pacific", correctedMapping: "Paper 1 — WWII in Asia-Pacific", correctedPaper: "Paper 1", correctedSection: "Section B", decision: "remap", reason: "Maps to WWII in Asia-Pacific unit. Marks corrected to 10." },
  { id: "h004", currentLabel: "World War II / Fall of Singapore", correctedMapping: "Paper 1 — WWII in Asia-Pacific", correctedPaper: "Paper 1", correctedSection: "Section B", decision: "remap", reason: "Fall of Singapore sits under WWII in Asia-Pacific. Marks corrected to 10." },
  { id: "h005", currentLabel: "World War II / Japanese Occupation", correctedMapping: "Paper 1 — WWII in Asia-Pacific", correctedPaper: "Paper 1", correctedSection: "Section B", decision: "remap", reason: "Japanese Occupation of Malaya/Singapore sits under WWII in Asia-Pacific. Marks to 10." },
  { id: "h006", currentLabel: "Cold War / Origins", correctedMapping: "Paper 2 — Cold War in Europe", correctedPaper: "Paper 2", correctedSection: "Section B", decision: "remap", reason: "Origins of Cold War maps to 'Cold War in Europe' unit in Paper 2. Marks to 10." },
  { id: "h007", currentLabel: "Cold War / Korean War", correctedMapping: "Paper 2 — Korean War", correctedPaper: "Paper 2", correctedSection: "Section B", decision: "remap", reason: "Korean War is a distinct unit in Paper 2. Marks to 10." },
  { id: "h008", currentLabel: "Cold War / Cuban Missile Crisis SBQ", correctedMapping: "Manual review required", correctedPaper: "Paper 2", correctedSection: "Section A", decision: "manual_review", reason: "Cuban Missile Crisis is NOT a starred (*) unit in 2174 — not SBQ-eligible. Cannot be set as Section A SBQ. Can be used as Section B essay context only. Review and reclassify." },
  { id: "h009", currentLabel: "Cold War / End of Cold War — A Level H2", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H2). 25-mark essay format is A-Level. Remove from 2174 repository." },
  { id: "h010", currentLabel: "Cold War / Arms Race — A Level H1", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H1). 20-mark essay is A-Level format. Remove entirely." },
  { id: "h011", currentLabel: "Decolonisation / British Empire", correctedMapping: "Manual review required", correctedPaper: "Paper 2", correctedSection: "Section B", decision: "manual_review", reason: "British decolonisation broadly maps to Paper 2 units but the specific framing ('why did Britain grant independence to colonies') doesn't align cleanly to any single 2174 unit. Needs editorial revision to target British Malaya 1945–1957 specifically." },
  { id: "h012", currentLabel: "Decolonisation / Vietnamese Independence — A Level H2", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H2). 25-mark essay. Remove entirely." },
  { id: "h013", currentLabel: "Singapore / Merger with Malaysia", correctedMapping: "N/A — Not in 2174", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Singapore merger/separation content belongs to SS (Social Studies) or History Elective (Singapore) syllabuses, NOT 2174. Remove entirely." },
  { id: "h014", currentLabel: "Singapore / Separation from Malaysia", correctedMapping: "N/A — Not in 2174", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Same as above. Singapore post-1945 political history is not in 2174. Remove entirely." },
  { id: "h015", currentLabel: "Singapore / Nation-building", correctedMapping: "N/A — Not in 2174", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Not in 2174. Remove entirely." },
  { id: "h016", currentLabel: "Singapore / Separation SBQ", correctedMapping: "N/A — Not in 2174", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Not in 2174 and would be invalid SBQ (non-starred topic). Remove entirely." },
  { id: "h017", currentLabel: "Singapore / Racial Harmony", correctedMapping: "N/A — Not in 2174", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Not in 2174. Remove entirely." },
  { id: "h018", currentLabel: "International Relations / United Nations", correctedMapping: "Manual review required", correctedPaper: "Paper 2", correctedSection: "Section B", decision: "manual_review", reason: "United Nations is not a standalone 2174 unit. Content may overlap with Cold War in Europe or Korean War, but standalone UN effectiveness question doesn't fit cleanly. Needs revision to target a specific 2174 unit." },
  { id: "h019", currentLabel: "International Relations / ASEAN", correctedMapping: "N/A — Not in 2174", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "ASEAN is not an examinable topic in 2174 (2026 syllabus). Remove entirely." },
  { id: "h020", currentLabel: "International Relations / League of Nations", correctedMapping: "Manual review required", correctedPaper: "Paper 1", correctedSection: "Section B", decision: "manual_review", reason: "League of Nations is relevant context for WWII in Europe and Nazi Germany units but is not a standalone 2174 unit. Question can be adapted to serve a WWII in Europe essay (causes of WWII) but needs editorial revision." },
  { id: "h021", currentLabel: "Cold War / Berlin Crisis — A Level H2", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H2). 25-mark format. Remove entirely." },
  { id: "h022", currentLabel: "World War II Impact — A Level H1", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H1). 20-mark format. Remove entirely." },
  { id: "h023", currentLabel: "Cold War / Containment — A Level H1", correctedMapping: "N/A", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Tagged A Level (H1). Remove entirely." },
  { id: "h024", currentLabel: "Singapore / Communist Threat", correctedMapping: "N/A — Not in 2174", correctedPaper: "N/A", correctedSection: "N/A", decision: "remove", reason: "Singapore communist threat (Barisan Sosialis, MCP in 1950s-60s Singapore) is SS/History elective content, not 2174. However, MCP in Malaya 1945–1957 IS in 2174 — question should be completely rewritten if salvageable." },
  { id: "h025", currentLabel: "World War II / Japanese Occupation SBQ", correctedMapping: "Paper 1 — WWII in Asia-Pacific", correctedPaper: "Paper 1", correctedSection: "Section A", decision: "manual_review", reason: "WWII Asia-Pacific is NOT starred in 2174 — not SBQ-eligible. This SBQ cannot appear in Section A. Reclassify as contextual material or rewrite as Section B essay." },
  { id: "h026", currentLabel: "Cold War / Marshall Plan", correctedMapping: "Paper 2 — Cold War in Europe", correctedPaper: "Paper 2", correctedSection: "Section B", decision: "remap", reason: "Marshall Plan is relevant to Cold War in Europe unit. Marks to 10. Essay framing valid." },
];
