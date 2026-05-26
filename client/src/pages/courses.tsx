import { useState } from "react";

interface Section {
  emoji: string;
  title: string;
  body: string;
}

interface CourseDescription {
  emoji: string;
  tagline: string;
  sections: Section[];
}

interface Course {
  title: string;
  url: string;
}

const courseDescriptions: Record<string, CourseDescription> = {
  "Quantitative Reasoning": {
    emoji: "🎓",
    tagline: "The Quantitative Reasoning Studio -- Executable College Coursework",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "QuantReason is a full-service self-paced learning platform that delivers a complete four-week college-freshman Quantitative Reasoning course -- taught, tutored, drilled, graded, and integrity-checked entirely by AI.\n\nIt performs end-to-end coursework: depth-adjustable lectures, section-scoped Socratic tutoring, adaptive problem generation, and rubric-faithful AI grading -- from a 90-second concept skim all the way to a full midterm and final with per-problem rationales.\n\nDesigned for students, instructors evaluating AI-taught coursework, and academic-integrity researchers, it merges a real 28-topic QR syllabus with two layers of AI-authorship detection -- producing a course that students can trust to be fair and that instructors can trust to be honest.",
      },
      {
        emoji: "🧠",
        title: "What It Does",
        body:
          "**Four-Week Structured Curriculum** -- A complete QR syllabus across 28 topics: proportional reasoning, descriptive statistics, probability, exponential and linear models, financial math, data interpretation, and inference. Each week ships with lectures, homework, and a test; week four adds a midterm and a final.\n\n**Three-Depth Lectures** -- Every lecture is available at Short / Medium / Long length, AI-rewritten while preserving the same worked examples and learning objectives. Skim the concept, expand it on demand, or read the textbook-style deep cut.\n\n**Section-Scoped AI Tutor** -- Ask a question about the paragraph you're reading and the answer streams back token-by-token, grounded in that exact lecture section. Suggested starter questions are pre-generated per lecture.\n\n**Adaptive Topic Practice** -- Generated problem sets that move difficulty up after a streak and down after a miss, with worked explanations on every answer. Per-session difficulty persists, so each drill picks up where the last one left off.\n\n**AI-Graded Assignments** -- Homework, tests, midterm, and final are scored by an LLM grader that returns per-problem correctness plus a written rationale, then rolls up to a percent score on the attempt.\n\n**Two-Layer AI-Authorship Detection** -- Each submitted answer is screened by both a static text classifier (GPTZero) and a diachronic keystroke-pattern detector. Each verdict ships with a human-readable rationale.\n\n**Live Analytics** -- Dashboard KPIs (attempts, accuracy, streak), per-topic mastery percentages, and a recent-activity feed -- so progress, weak spots, and momentum are all visible at a glance.\n\n**Operator Diagnostics** -- Two one-click self-tests verify the entire stack -- database, OpenAI, GPTZero, detection pipeline, and the practice/grade loop -- before you trust a session.",
      },
      {
        emoji: "⚙️",
        title: "Technical Features",
        body:
          "**Static Text Detection (GPTZero)** -- Every submitted answer is sent to GPTZero's predict/text endpoint; the per-document AI probability is blended 0.85 x GPTZero + 0.15 x structural-heuristic for the final score. If GPTZero is unavailable, the system silently falls back to an LLM scorer plus heuristic -- submissions never block.\n\n**Diachronic Keystroke Detection** -- The student textarea captures keystroke count, erase count, bulk-insert events, longest bulk insert, rewrite segments, and total duration. A scorer penalizes paste-then-reword behavior, low keystroke-to-output ratios, and impossibly sustained typing speeds -- catching AI use even when the final text is reworded enough to pass GPTZero.\n\n**System Diagnostic (/diagnostics/system)** -- Eight ordered checks: environment, database round-trip, course-seed integrity, OpenAI chat completion, OpenAI JSON mode, detection pipeline, AI-positive control sample, and GPTZero connectivity. Each step returns pass/fail, timing, and a raw error string.\n\n**Synthetic-Student Diagnostic (/diagnostics/synthetic-run)** -- Spins up a fake student, runs a practice session (wrong -> adjust down -> right -> adjust up), takes a full assignment attempt, submits it, and verifies grading + detection + analytics all reflect the run. End-to-end stack proof in one click.\n\n**Contract-First API** -- A single OpenAPI document is the source of truth; React Query hooks for the UI and Zod validators for the server are generated from it. Request and response shapes can't drift between client and server because both come from the same spec.\n\n**Streaming AI Tutor** -- Token-by-token Server-Sent-Event streaming for tutor answers, with a section-scoped system prompt so responses stay grounded in the lecture the student is reading.\n\n**Adaptive Practice Engine** -- Per-session difficulty (1-4 continuous) adjusts after each attempt; the next-problem generator takes the current difficulty and the topic as input, so the question pool is generated on demand instead of pre-baked.\n\n**Real-React Demo Video** -- The 62-second product walkthrough is a real React app, not a slideshow: persistent sidebar, animated SVG cursor, character-by-character typing, word-by-word streaming responses, and scene-synced background audio -- all exported as MP4 from a single browser tab.",
      },
      {
        emoji: "🎓",
        title: "Designed For",
        body:
          "**College Freshmen & Self-Learners** -- A complete one-month QR course delivered with on-demand tutoring and adaptive practice -- no instructor required.\n\n**Instructors & Curriculum Designers** -- A working reference for what AI-taught, AI-graded, AI-detection-screened coursework actually looks like end-to-end.\n\n**Academic-Integrity Researchers** -- A live testbed for layered AI-authorship detection that combines text-based classification with behavioral keystroke evidence.\n\n**Product & Engineering Teams** -- A reference implementation of contract-first full-stack architecture, streaming AI UX, and self-diagnostic operator tooling in a pnpm monorepo.",
      },
      {
        emoji: "💡",
        title: "Core Idea",
        body:
          "QuantReason redefines an AI-taught course as a closed accountability loop.\n\nIt doesn't just teach the material and grade the homework -- it teaches, tutors, drills, grades, detects misuse, and proves the whole pipeline still works with a single click. The result is a self-paced course students can actually trust to be fair, and that instructors can actually trust to be honest.\n\nQuantReason -- where the curriculum, the tutor, the grader, and the integrity check all live in one room.",
      },
    ],
  },
  "Business Ethics": {
    emoji: "🎓",
    tagline:
      "The Business Ethics Studio -- A Four-Week College Course That Teaches, Tutors, and Proofs Itself",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Business Ethics is a self-paced, single-user web course that delivers a full month of college-freshman business ethics -- taught, tutored, drilled, and graded entirely by AI, with built-in academic-integrity enforcement.\n\nIt compresses the experience of a semester-style class into one focused product: read the lecture at the depth you want, ask a tutor scoped to the exact section you're on, drill problems whose difficulty adapts to you in real time, and submit homework, tests, a midterm, and a final that are AI-graded with feedback and screened for AI-generated answers.\n\nDesigned for students, instructors evaluating AI-taught coursework, and researchers studying AI academic integrity, the course pairs a real curriculum with two layers of AI-authorship detection -- surfacing not just whether the writing looks AI-generated, but whether the act of producing it did.",
      },
      {
        emoji: "🧠",
        title: "What It Does",
        body:
          "**Four-Week Structured Curriculum** -- A complete business-ethics syllabus delivered across 28 topics. Each week ships with lectures, homework, and a test; week four adds a midterm and a final.\n\n**Three-Depth Lectures** -- Every lecture is available at Short / Medium / Long length, AI-rewritten while preserving the same examples and learning objectives. Skim the concept, expand it on demand, or read the textbook-style deep cut.\n\n**Section-Scoped AI Tutor** -- Ask a question about the paragraph you're reading and the answer streams back token-by-token, grounded in that exact lecture section.\n\n**Adaptive Topic Practice** -- Generated problem sets that move difficulty up after a streak and down after a miss, with worked explanations on every answer.\n\n**AI-Graded Assignments** -- Homework, tests, midterm, and final are scored by an LLM grader that returns per-problem feedback plus a rolled-up percent score.\n\n**Two-Layer AI-Authorship Detection** -- Each submitted answer is screened by a static text classifier and a diachronic keystroke-pattern detector. Each verdict ships with a human-readable rationale.\n\n**Live Analytics** -- Dashboard KPIs, per-topic mastery percentages, and a recent-activity feed make progress, weak spots, and momentum visible at a glance.\n\n**Operator Diagnostics** -- One-click self-tests verify the entire stack -- database, OpenAI, detection pipeline, and the practice/grade loop -- before you trust a session.",
      },
      {
        emoji: "💡",
        title: "Core Idea",
        body:
          "Business Ethics redefines an AI-taught course as a closed accountability loop.\n\nIt doesn't just teach the material and grade the homework -- it teaches, tutors, drills, grades, detects misuse, and proves the whole pipeline still works with a single click. The result is a self-paced course that students can actually trust to be fair, and that instructors can actually trust to be honest.\n\nBusiness Ethics -- where the curriculum, the tutor, the grader, and the integrity check all live in one room.",
      },
    ],
  },
};

function renderSectionBody(body: string) {
  return body.split("\n\n").map((para, i) => {
    const parts = para.split(/(\*\*[^*]+\*\*)/g);
    return (
      <p key={i} className="text-gray-700">
        {parts.map((part, j) =>
          part.startsWith("**") && part.endsWith("**") ? (
            <strong key={j} className="text-gray-900">
              {part.slice(2, -2)}
            </strong>
          ) : (
            <span key={j}>{part}</span>
          ),
        )}
      </p>
    );
  });
}

export default function Courses() {
  const courses: Course[] = [
    { title: "Quantitative Reasoning", url: "https://quantitativereasoning101.xyz" },
    { title: "Business Ethics", url: "https://businessethics101.xyz" },
  ];

  const sortedCourses = [...courses].sort((a, b) =>
    a.title.localeCompare(b.title),
  );

  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div className="font-sans bg-white text-gray-900 leading-relaxed min-h-screen">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Home
            </a>
            <div className="flex items-center gap-6">
              <a
                href="/journal"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Investor Notes
              </a>
              <a
                href="/podcasts"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Investor Briefings
              </a>
              <a
                href="/office-use"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Office Use
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Living Courses
          </h1>
          <p className="text-gray-700 text-lg">
            Self-paced, AI-taught, AI-graded college coursework with built-in
            academic-integrity enforcement.
          </p>
        </header>

        <div className="space-y-4">
          {sortedCourses.map((course) => {
            const desc = courseDescriptions[course.title];
            const isOpen = expanded === course.title;
            return (
              <div
                key={course.title}
                className="border border-gray-200 rounded-lg bg-white"
              >
                <div className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    {desc && <span className="text-2xl">{desc.emoji}</span>}
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">
                        {course.title}
                      </h2>
                      {desc && (
                        <p className="text-sm text-gray-600">{desc.tagline}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {desc && (
                      <button
                        onClick={() =>
                          setExpanded(isOpen ? null : course.title)
                        }
                        className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {isOpen ? "Hide" : "Details"}
                      </button>
                    )}
                    <a
                      href={course.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                    >
                      Visit
                    </a>
                  </div>
                </div>
                {isOpen && desc && (
                  <div className="border-t border-gray-200 p-6 space-y-6">
                    {desc.sections.map((section) => (
                      <section key={section.title}>
                        <h3 className="text-base font-semibold text-gray-900 mb-2 flex items-center gap-2">
                          <span>{section.emoji}</span>
                          <span>{section.title}</span>
                        </h3>
                        <div className="space-y-3 text-sm">
                          {renderSectionBody(section.body)}
                        </div>
                      </section>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
