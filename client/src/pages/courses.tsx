import { Link } from "wouter";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface CourseSection {
  emoji: string;
  title: string;
  body: string;
}

interface CourseDescription {
  emoji: string;
  tagline: string;
  sections: CourseSection[];
}

interface Course {
  title: string;
  url: string;
}

const courseDescriptions: Record<string, CourseDescription> = {
  "College Algebra": {
    emoji: "🧮",
    tagline:
      "Self-Paced, AI-Graded College Algebra Course with Real Math Input and Instant Feedback",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "COLLEGE ALGEBRA 101 is a fully self-running College Algebra course that grades student work with a frontier AI model in seconds. Students read the lesson, write a real response (prose and equations), submit, and receive a numeric score plus written feedback referenced against a hidden model answer and rubric.\n\nUnlike practice apps that only check multiple-choice answers or pattern-match on a final number, COLLEGE ALGEBRA 101 grades the reasoning. The AI grader reads the entire student response -- every step, every justification, every formatted equation -- and evaluates it against the assignment requirements the same way a human instructor would. Discussions, essays, term-paper outlines, and the term paper itself are all graded the same way, end-to-end, with no human in the loop.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**High school and college students** -- need to learn or relearn College Algebra at their own pace, with real graded feedback instead of \"good job\" stickers\n\n**Adult learners returning to math** -- need a structured 14-assignment course they can do on their own schedule without enrolling anywhere\n\n**Homeschool families** -- need a complete algebra curriculum that grades writing-intensive math work automatically\n\n**Tutors and supplemental instructors** -- need a ready-made pool of discussion prompts, essay assignments, and worked model solutions\n\n**Anyone** -- who has ever submitted math homework and waited two weeks to find out they got it wrong",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**AI-Graded Free-Response Math** -- Every submission is graded by a frontier AI model against the assignment's full rubric and a hidden model answer. Returns a numeric score (clamped to the assignment's point value) plus written, rubric-referenced feedback in seconds.\n\n**Real Math Input with MathLive** -- A built-in equation editor lets students type real algebra (fractions, exponents, radicals, parentheses, the works) the way they'd write it on paper. Equations are stored as LaTeX and submitted alongside the prose explanation.\n\n**KaTeX-Rendered Lessons and Feedback** -- Background readings, assignment prompts, model answers, and AI feedback all render proper mathematical typesetting. Students see the same notation their textbook uses, not ASCII approximations.\n\n**Hidden Model Answers, Revealable On Demand** -- Each assignment ships with a worked model solution and the rationale behind it. Students can stay locked in on their own attempt or click to reveal the model after submitting.\n\n**Best-Score Progress Tracking** -- Students can resubmit any assignment as many times as they want; the best score per item rolls up into the overall course total (800 points across 14 items).\n\n**Complete 14-Item Curriculum, Built In** -- Seven discussions, five essays, a term paper outline, and a term paper. Every item includes a background reading, an assignment prompt, a model response, and grading rationale.\n\n**Single-Sign-On Course Shell** -- One sign-in unlocks the whole course. Progress, submissions, and feedback persist across sessions on any device.\n\n**Instructor-Free Operation** -- The course runs without a human grader. No queue, no office hours, no waiting -- submit at 2 a.m. and get feedback by 2:01 a.m.\n\n**Verbatim Curriculum Source** -- All course content is parsed verbatim from the source curriculum document. No paraphrasing, no AI-generated lesson content -- just the real syllabus, rendered properly.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It actually grades the math** -- Not just the final answer. The AI reads every step of work and evaluates the reasoning against the rubric.\n\n**It accepts real equations** -- Students type math like math, not like code. No x^2 or sqrt(x) workarounds.\n\n**It returns rubric-referenced feedback** -- Feedback names the specific assignment requirements that were met, partially met, or missed -- the same way a human grader would write it.\n\n**It's instant** -- Submit, and the score and written feedback land in seconds. No grading backlog, ever.\n\n**It's resubmittable** -- Best score wins. Students are encouraged to revise and resubmit until they actually understand the material, not until the deadline passes.\n\n**It's the full course, not a demo** -- All 14 graded items totalling 800 points are live and gradable from day one. Nothing is locked, coming-soon, or paywalled behind a tier.",
      },
    ],
  },
};

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-semibold text-gray-900">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

function DescriptionBlock({ desc }: { desc: CourseDescription }) {
  return (
    <div className="mt-3 ml-2 sm:ml-4 p-4 bg-gray-50 border border-gray-200 rounded-lg space-y-5">
      <p className="text-sm text-gray-700 italic">
        {desc.emoji} {desc.tagline}
      </p>
      {desc.sections.map((section, idx) => (
        <div key={idx}>
          <h4 className="text-base font-semibold text-gray-900 mb-2 border-b border-gray-200 pb-1">
            {section.emoji} {section.title}
          </h4>
          <div className="text-sm text-gray-700 leading-relaxed space-y-2">
            {section.body.split("\n\n").map((para, pidx) => (
              <p key={pidx}>{renderInline(para)}</p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function CourseItem({ course }: { course: Course }) {
  const [open, setOpen] = useState(false);
  const desc = courseDescriptions[course.title];

  return (
    <div
      className="border-b border-gray-100 pb-3"
      data-testid={`course-${course.title.toLowerCase().replace(/\s+/g, "-")}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-2">
        <div className="w-full sm:w-80 flex items-center gap-2">
          {desc && (
            <button
              onClick={() => setOpen((v) => !v)}
              className="text-gray-500 hover:text-gray-800"
              aria-label={open ? "Collapse description" : "Expand description"}
              data-testid={`toggle-${course.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              {open ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronRight className="w-4 h-4" />
              )}
            </button>
          )}
          <span className="font-medium text-gray-900">{course.title}</span>
        </div>
        <span className="text-gray-500 hidden sm:inline">—</span>
        <a
          href={course.url}
          className="text-blue-600 hover:text-blue-800 hover:underline break-all"
          target="_blank"
          rel="noopener noreferrer"
        >
          {course.url}
        </a>
      </div>
      {desc && open && <DescriptionBlock desc={desc} />}
    </div>
  );
}

export default function Courses() {
  const courses: Course[] = [
    { title: "Philosophy 101", url: "https://aiphil1.xyz" },
    { title: "Psychology 101", url: "https://psych1.xyz" },
    { title: "College Algebra", url: "https://aialbebra1.xyz" },
  ];

  return (
    <div className="font-sans bg-white text-gray-900 leading-relaxed min-h-screen">
      {/* Top Navigation */}
      <div className="bg-blue-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
              data-testid="link-home"
            >
              ← Zhi Systems
            </Link>
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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-12">
          <img
            src="/zhi-systems-logo.png"
            alt="Zhi Systems - High-Performance AI Tools for Writers, Thinkers, and Analysts"
            className="h-20"
            data-testid="img-logo"
          />
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
            Living Courses
          </h2>

          {/* What's a Living Course explanation */}
          <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>What's a Living Course?</strong> A fully AI-powered
              educational experience with a built-in tutor that is trained on
              the course material. The AI can answer questions at any level of
              depth about the course content, provide personalized explanations,
              generate practice problems, and adapt to your learning style and
              pace.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>Embedded Real-Time AI Tutors.</strong> Every course ships
              with a live, course-aware AI tutor built directly into the
              learning environment -- ready to explain, quiz, and guide the
              student moment-by-moment as they work through the material.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>100% Cheatproof.</strong> These courses are engineered so
              that AI cannot be used to cheat on them. Every assessment,
              exercise, and graded interaction is structured to make external AI
              assistance useless -- the only way to pass is to actually learn
              the material.
            </p>
          </div>

          <div className="grid gap-3">
            {courses.map((course) => (
              <CourseItem key={course.title} course={course} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
