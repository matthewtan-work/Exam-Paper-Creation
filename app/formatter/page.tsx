"use client";

import { useState, useRef } from "react";
import { learnAndFormat, sampleIdealFormats } from "@/lib/formatters";
import FormatterPreview from "@/components/FormatterPreview";

// ─── File extraction helpers ─────────────────────────────────────────────────

async function extractDocx(file: File): Promise<string> {
  // mammoth works with ArrayBuffer in the browser
  const mammoth = (await import("mammoth")).default;
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value.trim();
}

async function extractPdf(file: File): Promise<string> {
  // Basic client-side PDF text extraction:
  // Read as binary, pull printable ASCII strings from PDF content streams.
  // Works for text-based PDFs (e.g. exported from Word/Pages).
  // For scanned/image PDFs, returns a fallback message.
  const buffer = await file.arrayBuffer();
  const bytes = new Uint8Array(buffer);

  // Convert to Latin-1 string to preserve byte values
  let raw = "";
  for (let i = 0; i < bytes.length; i++) {
    raw += String.fromCharCode(bytes[i]);
  }

  // Extract text from PDF string objects (parenthesised literals)
  // and BT...ET text blocks
  const extracted: string[] = [];

  // Method 1: text in BT/ET blocks via Tj / TJ operators
  const btBlocks = raw.match(/BT[\s\S]*?ET/g) ?? [];
  for (const block of btBlocks) {
    const strMatches = block.match(/\(([^)]{1,200})\)\s*Tj/g) ?? [];
    for (const m of strMatches) {
      const text = m.replace(/^\(/, "").replace(/\)\s*Tj$/, "").trim();
      if (text.length > 1 && /[a-zA-Z]/.test(text)) extracted.push(text);
    }
  }

  const result = extracted.join(" ").replace(/\s+/g, " ").trim();

  if (result.length < 20) {
    return (
      "[Could not extract text from this PDF — it may be image-based or encrypted.\n" +
      "Please paste the question text manually in the box above.]"
    );
  }
  return result;
}

async function readUploadedFile(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith(".docx")) return extractDocx(file);
  if (name.endsWith(".pdf")) return extractPdf(file);
  // Fallback for any text-based file
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target?.result as string ?? "");
    reader.onerror = reject;
    reader.readAsText(file);
  });
}

// ─── Ideal Format panel ───────────────────────────────────────────────────────
function IdealFormatPanel({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);

  async function handleFile(file: File) {
    setFileName(file.name);
    const text = await readUploadedFile(file);
    onChange(text);
  }

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Step header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
            1
          </span>
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Your ideal format
          </span>
        </div>
        {value && (
          <button
            onClick={() => { onChange(""); setFileName(null); }}
            className="text-xs text-slate-400 hover:text-slate-600"
          >
            Clear
          </button>
        )}
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Upload or paste an example of a <strong>well-formatted question</strong> from your school.
        The system learns your exact formatting conventions.
      </p>

      {/* Sample quick-loads */}
      <div>
        <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
          Quick-start with a sample
        </p>
        <div className="flex flex-wrap gap-1.5">
          {sampleIdealFormats.map((s) => (
            <button
              key={s.id}
              onClick={() => { onChange(s.text); setFileName(null); }}
              className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                value === s.text
                  ? "bg-violet-100 text-violet-700 border-violet-300"
                  : "bg-white text-slate-600 border-slate-200 hover:border-violet-300 hover:text-violet-600"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Drop zone / textarea */}
      <div
        className={`relative flex-1 min-h-[200px] rounded-xl border-2 transition-colors ${
          dragging
            ? "border-violet-400 bg-violet-50"
            : value
            ? "border-violet-200 bg-white"
            : "border-dashed border-slate-200 bg-slate-50"
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={async (e) => {
          e.preventDefault();
          setDragging(false);
          const file = e.dataTransfer.files[0];
          if (file) await handleFile(file);
        }}
      >
        {!value ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center pointer-events-none">
            <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xs text-slate-400">Drop a <strong>.pdf</strong> or <strong>.docx</strong> file here, or paste below</p>
          </div>
        ) : null}
        <textarea
          value={value}
          onChange={(e) => { onChange(e.target.value); setFileName(null); }}
          placeholder="Paste an example of your school's exam question format here…"
          className="w-full h-full min-h-[200px] p-4 text-xs font-mono text-slate-700 bg-transparent resize-none focus:outline-none leading-relaxed placeholder:text-slate-300 placeholder:font-sans placeholder:text-sm"
        />
      </div>

      {/* Upload button */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => fileRef.current?.click()}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-600 border border-slate-200 bg-white rounded-lg px-3 py-2 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload PDF or DOCX
        </button>
        {fileName && (
          <span className="text-xs text-violet-600 font-medium truncate">{fileName}</span>
        )}
        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          onChange={async (e) => {
            const file = e.target.files?.[0];
            if (file) await handleFile(file);
            e.target.value = "";
          }}
        />
      </div>

      {/* Pattern detection preview */}
      {value.trim().length > 40 && (
        <PatternBadges ideal={value} />
      )}
    </div>
  );
}

// Show detected patterns as small badges — makes the "learning" feel visible
function PatternBadges({ ideal }: { ideal: string }) {
  const hasParen = /^\(a\)/m.test(ideal);
  const hasDot = /^a\./m.test(ideal) || /^\d+\./m.test(ideal);
  const hasSquareMark = /\[\d+/.test(ideal);
  const hasParenMark = /\(\d+/.test(ideal);
  const hasTotal = /total/i.test(ideal);
  const hasBullet = /^[•\-–*]\s/m.test(ideal);

  const badges = [
    hasParen && { label: "Letter (a) subparts", color: "bg-violet-50 text-violet-600 border-violet-200" },
    hasDot && { label: "Number subparts", color: "bg-violet-50 text-violet-600 border-violet-200" },
    hasSquareMark && { label: "[marks] style", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    hasParenMark && !hasSquareMark && { label: "(marks) style", color: "bg-indigo-50 text-indigo-600 border-indigo-200" },
    hasTotal && { label: "Total marks line", color: "bg-emerald-50 text-emerald-600 border-emerald-200" },
    hasBullet && { label: "Bullet hints", color: "bg-amber-50 text-amber-600 border-amber-200" },
  ].filter(Boolean) as { label: string; color: string }[];

  if (badges.length === 0) return null;

  return (
    <div>
      <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-1.5">
        Detected patterns
      </p>
      <div className="flex flex-wrap gap-1.5">
        {badges.map((b) => (
          <span key={b.label} className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${b.color}`}>
            ✓ {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Messy Input panel ────────────────────────────────────────────────────────
const SAMPLE_MESSY = `photosynthesis is the process by which plants make food
explain what photosynthesis is and where it occurs
write the word equation for photosynthesis
state two factors that affect the rate of photosynthesis
describe an experiment to investigate one of these factors
suggest why photosynthesis is important for all living organisms`;

function MessyInputPanel({
  value,
  onChange,
  onFormat,
  canFormat,
}: {
  value: string;
  onChange: (v: string) => void;
  onFormat: () => void;
  canFormat: boolean;
}) {
  return (
    <div className="flex flex-col gap-3 h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
            2
          </span>
          <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
            Messy raw text
          </span>
        </div>
        <button
          onClick={() => { onChange(SAMPLE_MESSY); }}
          className="text-xs text-violet-600 hover:text-violet-800 font-medium"
        >
          Load sample
        </button>
      </div>

      <p className="text-xs text-slate-500 leading-relaxed">
        Paste your AI-generated or unstructured question content. One idea per line works best.
      </p>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={12}
        placeholder={`Paste messy or unstructured text here…\n\nFor example:\n  explain why ionic compounds conduct electricity\n  state what happens when nacl dissolves in water\n  calculate moles in 58.5g NaCl`}
        className="flex-1 min-h-[220px] text-sm bg-white border border-slate-200 rounded-xl p-4 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 font-mono leading-relaxed placeholder:text-slate-300 placeholder:font-sans placeholder:text-xs"
      />

      <button
        onClick={onFormat}
        disabled={!canFormat}
        className={`w-full py-3 text-sm font-semibold rounded-xl transition-all ${
          canFormat
            ? "bg-violet-600 text-white hover:bg-violet-700 shadow-sm shadow-violet-200"
            : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        {canFormat ? "Format using ideal →" : "Add ideal format + text to format"}
      </button>

      {!canFormat && (
        <p className="text-xs text-slate-400 text-center -mt-1">
          Complete steps 1 and 2 first
        </p>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function FormatterPage() {
  const [idealText, setIdealText] = useState("");
  const [rawInput, setRawInput] = useState("");
  const [formatted, setFormatted] = useState("");

  const canFormat = idealText.trim().length > 0 && rawInput.trim().length > 0;

  function handleFormat() {
    if (!canFormat) return;
    setFormatted(learnAndFormat(idealText, rawInput));
  }

  function handleReset() {
    setFormatted("");
    setRawInput("");
  }

  function handleFullReset() {
    setIdealText("");
    setRawInput("");
    setFormatted("");
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs font-semibold text-violet-600 bg-violet-50 px-2.5 py-1 rounded-full border border-violet-100">
            Product B
          </span>
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Universal Exam Formatter</h1>
        <p className="text-sm text-slate-500 max-w-2xl">
          Upload or paste <strong>your school's ideal question format</strong> as a reference.
          Then paste messy text and get output that mirrors your exact formatting conventions —
          subpart style, marks placement, spacing, and all.
        </p>
      </div>

      {/* 3-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr_1.3fr] gap-6 items-start">
        {/* Col 1: Ideal format */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <IdealFormatPanel value={idealText} onChange={setIdealText} />
        </div>

        {/* Col 2: Messy input */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
          <MessyInputPanel
            value={rawInput}
            onChange={setRawInput}
            onFormat={handleFormat}
            canFormat={canFormat}
          />
        </div>

        {/* Col 3: Output */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-5 h-5 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
              3
            </span>
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wide">
              Formatted output
            </span>
          </div>
          <FormatterPreview
            formatted={formatted}
            templateName="Custom Format"
            onReset={handleReset}
          />
        </div>
      </div>

      {/* How it works explainer — shown when no output yet */}
      {!formatted && (
        <div className="mt-12 pt-8 border-t border-slate-200">
          <h3 className="text-sm font-semibold text-slate-700 mb-1 text-center">How it works</h3>
          <p className="text-xs text-slate-400 text-center mb-6">
            The system reads your ideal format and learns its conventions — then applies them to your messy text.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                title: "Upload your ideal",
                body: "Paste a well-formatted exam question from your school or board. Any format works — O-Level, A-Level, essay, source-based.",
                accent: "violet",
              },
              {
                step: "2",
                title: "Paste messy text",
                body: "Drop in AI-generated output, rough notes, or any unstructured question content. One idea per line works best.",
                accent: "violet",
              },
              {
                step: "3",
                title: "Get clean output",
                body: "The formatter mirrors your exact conventions: subpart labels, mark brackets, spacing, totals, and phrasing.",
                accent: "violet",
              },
            ].map((item) => (
              <div key={item.step} className="bg-white rounded-xl border border-slate-200 p-4">
                <span className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 text-xs font-bold flex items-center justify-center mb-3">
                  {item.step}
                </span>
                <h4 className="text-sm font-semibold text-slate-800 mb-1">{item.title}</h4>
                <p className="text-xs text-slate-500 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>

          {/* Before/after example */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mt-6">
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Ideal format (uploaded)
              </div>
              <pre className="text-xs text-slate-600 whitespace-pre-wrap font-mono leading-relaxed">{`Iron reacts with copper sulphate solution.

(a) State the observation. [1]

(b) Explain in terms of the reactivity series. [2]

[Total: 3 marks]`}</pre>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
              <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide mb-2">
                Messy input (pasted)
              </div>
              <pre className="text-xs text-slate-500 whitespace-pre-wrap font-mono leading-relaxed">{`sodium reacts with water
what do you observe
write a balanced equation
explain why sodium reacts but gold does not`}</pre>
            </div>
            <div className="bg-white rounded-xl p-4 border border-violet-200 shadow-sm">
              <div className="text-[10px] font-semibold text-violet-500 uppercase tracking-wide mb-2">
                Formatted output (matched)
              </div>
              <pre className="text-xs text-slate-700 whitespace-pre-wrap font-mono leading-relaxed">{`Sodium reacts with water.

(a) State what you observe. [1]

(b) Write a balanced equation. [2]

(c) Explain why sodium reacts but gold does not. [2]

[Total: 5 marks]`}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
