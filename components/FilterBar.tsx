"use client";

import {
  SearchFilters,
  allOfficialTopics,
  allQuestionTypes,
  allDifficulties,
  allPapers,
} from "@/lib/chemistrySearch";

interface Props {
  filters: SearchFilters;
  onChange: (f: SearchFilters) => void;
  onReset: () => void;
}

const marksOptions = [
  { value: "any", label: "Any marks" },
  { value: "1-2", label: "1–2 marks" },
  { value: "3-4", label: "3–4 marks" },
  { value: "5+", label: "5+ marks" },
];

const paper2Sections = ["All", "Section A", "Section B"];

function Select({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="text-sm bg-white border border-slate-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700 min-w-[140px]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

export default function FilterBar({ filters, onChange, onReset }: Props) {
  const hasActiveFilters =
    filters.paper !== "All" ||
    filters.section !== "All" ||
    filters.officialTopic !== "All" ||
    filters.questionType !== "All" ||
    filters.difficulty !== "All" ||
    filters.marks !== "any";

  return (
    <div className="flex flex-wrap items-end gap-4">
      <Select
        label="Paper"
        value={filters.paper}
        options={allPapers}
        onChange={(v) => onChange({ ...filters, paper: v, section: "All" })}
      />
      {filters.paper === "Paper 2" && (
        <Select
          label="Section"
          value={filters.section}
          options={paper2Sections}
          onChange={(v) => onChange({ ...filters, section: v })}
        />
      )}
      <Select
        label="Topic"
        value={filters.officialTopic}
        options={allOfficialTopics}
        onChange={(v) => onChange({ ...filters, officialTopic: v })}
      />
      <Select
        label="Type"
        value={filters.questionType}
        options={allQuestionTypes}
        onChange={(v) => onChange({ ...filters, questionType: v })}
      />
      <Select
        label="Difficulty"
        value={filters.difficulty}
        options={allDifficulties}
        onChange={(v) => onChange({ ...filters, difficulty: v })}
      />
      <Select
        label="Marks"
        value={filters.marks}
        options={marksOptions.map((o) => o.value)}
        onChange={(v) => onChange({ ...filters, marks: v })}
      />
      {hasActiveFilters && (
        <button
          onClick={onReset}
          className="text-sm text-indigo-600 hover:text-indigo-800 font-medium mb-0.5"
        >
          Reset filters
        </button>
      )}
    </div>
  );
}
