import Link from "next/link";

const products = [
  {
    href: "/chemistry",
    label: "Chemistry Search + Paper Builder",
    tagline: "Product A",
    description:
      "Search 30+ past-year chemistry questions by topic, type, and difficulty. Add questions to a draft paper, edit inline, reorder, and preview the formatted exam — all in one workspace.",
    cta: "Open Chemistry Tools",
    accent: "indigo",
    features: [
      "Keyword & filter search",
      "AI-assisted query bar",
      "Inline paper editor",
      "Raw text formatter",
      "Mock question generator",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
  },
  {
    href: "/formatter",
    label: "Universal Exam Formatter",
    tagline: "Product B",
    description:
      "Paste unstructured or AI-generated text, pick a question format template, and instantly get a clean, exam-ready output. Works across all subjects.",
    cta: "Open Formatter",
    accent: "violet",
    features: [
      "4 format templates",
      "Rules-based formatter",
      "Structured Question",
      "Essay & Source-Based",
      "Science Open-Ended",
    ],
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16">
      {/* Hero */}
      <div className="mb-14 max-w-2xl">
        <div className="inline-flex items-center gap-2 bg-indigo-50 text-indigo-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5 border border-indigo-100">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
          Internal Demo · Prototype v0.1
        </div>
        <h1 className="text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4">
          Build better exams,{" "}
          <span className="text-indigo-600">faster.</span>
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed">
          Singapore teachers spend hours searching for relevant questions, adapting formats, and
          cleaning up AI-generated text into proper exam structure. ExamCraft gives you two
          purpose-built tools to cut that time in half.
        </p>
      </div>

      {/* Product cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
        {products.map((product) => (
          <div
            key={product.href}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow p-7 flex flex-col"
          >
            {/* Icon + tag */}
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                  product.accent === "indigo"
                    ? "bg-indigo-100 text-indigo-600"
                    : "bg-violet-100 text-violet-600"
                }`}
              >
                {product.icon}
              </div>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  product.accent === "indigo"
                    ? "bg-indigo-50 text-indigo-600"
                    : "bg-violet-50 text-violet-600"
                }`}
              >
                {product.tagline}
              </span>
            </div>

            <h2 className="text-lg font-bold text-slate-900 mb-2">{product.label}</h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-5">{product.description}</p>

            {/* Feature list */}
            <ul className="space-y-1.5 mb-7 flex-1">
              {product.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
                  <svg
                    className={`w-4 h-4 shrink-0 ${
                      product.accent === "indigo" ? "text-indigo-400" : "text-violet-400"
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>

            <Link
              href={product.href}
              className={`inline-flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                product.accent === "indigo"
                  ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                  : "bg-violet-600 hover:bg-violet-700 text-white"
              }`}
            >
              {product.cta}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="text-xs text-slate-400 text-center border-t border-slate-100 pt-6">
        Demo prototype · All question data is seeded locally · No authentication or database required
      </div>
    </div>
  );
}
