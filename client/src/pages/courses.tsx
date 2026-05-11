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
  "Statistics 101": {
    emoji: "📊",
    tagline:
      "Course Shell for Introductory Statistics with AI-Aware Academic Integrity",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Statistics 101 is a fully online, asynchronous college course delivered as a self-contained web app. Thirteen modules cover the standard 101 sequence -- levels of measurement, center and spread, visualization, probability, the normal distribution, sampling and the Central Limit Theorem, confidence intervals, hypothesis testing, correlation vs. causation, common misuses of statistics, and reading published research -- culminating in a five-claim term paper.\n\nUnlike a generic LMS shell, the app is built around a strict operating principle: students should learn to write, not learn to launder AI output. Every assignment runs through a two-box workflow that pairs a single-shot AI feedback drafting station with an integrity-monitored submission canvas. Real-time AI-detection scoring, sentence-level highlighting, paste blocking, and a full keystroke audit trail give instructors evidence -- not guesses -- about how a piece of writing was produced.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Community-college and first-year undergraduates** -- need a clean, calm, jargon-free first encounter with statistics\n\n**Returning adult learners** -- need an asynchronous, self-paced format with embedded tutoring\n\n**Instructors of record** -- need a course shell that enforces academic-integrity policy without manually policing every paragraph\n\n**Departments piloting AI policy** -- need real keystroke and AI-detection data on student submissions, not vibes\n\n**Anyone** -- who has ever wondered what \"p < 0.05\" actually means and wanted to find out properly",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**Verbatim Course Content** -- 13 modules totaling 800 points, ingested verbatim from the open-source course book. Each module ships with reading, assignment, and a model response unlocked after submission.\n\n**Two-Box Submission Workflow** -- Box 1 is a draft workshop with single-shot AI feedback in 5 sections; once feedback is fetched the draft is locked. Box 2 is the live submission canvas where the actual graded work is typed.\n\n**Real-Time AI Detection** -- Every burst of typing is scored by GPTZero with sentence-level highlighting, a green-yellow-red traffic-light bar, and a 30-second cumulative-red warning. Submissions ship with the final score and flag.\n\n**Full Keystroke Audit Trail** -- Insertions, deletions, paste attempts (allowed and blocked), and highlighting toggles are recorded with timestamps and replayed in the admin dashboard.\n\n**Paste-Blocked Editor** -- ContentEditable surface with overlay highlighting. External paste is intercepted; internal copy/cut is allowed. Drag-and-drop is rejected.\n\n**KaTeX Math Rendering** -- Inline $...$ and display $$...$$ formulas render natively in readings, assignments, and model responses. Plain Unicode notation falls through unchanged.\n\n**Statistics Symbol Palette** -- A 14-button toolbar (μ σ x̄ s Σ α β π ± ≤ ≥ ≠ √ ²) inserts at the caret in both standard and accommodated editors without breaking the keystroke pipeline.\n\n**Socratic AI Tutor** -- Anthropic Claude Sonnet, configured to teach in the instructor's voice. Asks questions before giving answers; refuses to write the assignment for the student.\n\n**Accommodated Mode** -- Admin-toggled per student. Replaces the monitored canvas with a plain textarea and skips AI scoring while still recording submissions normally.\n\n**Admin Dashboard** -- List, filter, replay, sparkline, and activity report for every submission. Per-student accommodation toggles. First authenticated user can claim admin; subsequent admin status is granted only by an existing admin.\n\n**One-Time Integrity Disclosure** -- A modal on first module load explains exactly what is monitored, what is recorded, and what flagging means for grades. Acknowledgment is recorded server-side.",
      },
      {
        emoji: "🎯",
        title: "What Makes It Different",
        body:
          "**It treats AI honestly** -- Students are told upfront what is detected and what is not. Nothing is hidden, nothing is theater.\n\n**It evaluates writing as a process, not a product** -- A red AI-detection score on a paragraph that was typed character by character over 40 minutes tells a different story than the same score on text that appeared in one keystroke. The replay shows the difference.\n\n**The model responses are real essays, not rubric bullets** -- Each module ships with a 600-to-2,500-word example response demonstrating what an A submission actually looks like, including the analytic moves that earn the grade.\n\n**The curriculum is verbatim** -- No paraphrasing, no AI summarization of the source text. Students read what the instructor wrote.\n\n**The math notation is correct** -- Unicode symbols and KaTeX-rendered formulas, not images or ASCII approximations.\n\n**The integrity tooling supports accommodation** -- Students with documented needs get a plain editor and full credit, with no second-class workflow.\n\n**Every design decision is documented** -- Architecture notes, data-flow contracts, and the model-response unlock rule live in replit.md, not in someone's head.",
      },
    ],
  },
  "Systems Science 101": {
    emoji: "🧠",
    tagline: "A Fully Online Course in Systems Thinking for Undergraduates",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Systems Science 101 is a fully online, asynchronous college-level course that teaches the foundational vocabulary of systems thinking -- stocks and flows, feedback loops, requisite variety, homeostasis, emergence, networks, self-organization, archetypes, leverage points, and complex adaptive systems -- and trains students to apply it as a precision instrument for analyzing real systems.\n\nUnlike survey courses that present systems thinking as a vague metaphor, this one is built around a strict operating principle: vocabulary is for diagnosis, not decoration. Every term has to do work. Students do not just label parts; they use the labels to explain why systems behave as they do, and to make at least one non-obvious prediction per analysis.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduates in any major** -- who need a single integrative course that connects biology, economics, ecology, sociology, and engineering through a shared analytical language\n\n**Pre-policy and pre-management students** -- who will spend their careers intervening in systems and need to know which interventions actually move the needle\n\n**STEM students** -- who want the conceptual scaffolding (cybernetics, dynamics, networks, complexity) that ties their technical training together\n\n**Working professionals** -- who keep encountering \"the system\" at work and want a vocabulary to name what they are seeing\n\n**Anyone** -- who has ever watched a well-intentioned policy produce the opposite of its intended effect and wanted to know why",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**13-Module Asynchronous Curriculum** -- Seven Socratic discussions, five argumentative essays, and a five-system term paper, each building on the previous module. Modules unlock sequentially as students submit work.\n\n**AI Tutor Per Module** -- An Anthropic Claude Sonnet 4.5 tutor speaks in the instructor's voice, asks Socratic questions, and gives formative feedback on each module's reading. The tutor will refuse to write the assignment for the student.\n\n**Integrity Canvas Authoring Environment** -- A two-box workflow for every assignment: a one-shot draft-feedback step that locks the draft, then a paste-blocked editor with real-time AI-detection scoring, sentence-level highlighting, and full keystroke logging.\n\n**Real-Time GPTZero Scoring** -- Every keystroke burst is scored against AI-detection models. A traffic-light bar gives students immediate feedback; a 30-second cumulative-red warning fires before submission.\n\n**Verbatim Course Text** -- Open educational reading material authored by the instructor, embedded directly in each module. No textbook to purchase, no external paywall.\n\n**Model Responses for Every Module** -- Each assignment ships with a fully-worked model response and a \"why this is a model\" rubric, so students see what the criteria look like in practice.\n\n**Quality Matters Course Shell** -- Built to the Quality Matters Higher Ed Rubric (7th ed.). Syllabus, modules, assessments, support, and accessibility pages are all wired in.\n\n**Admin Submission Dashboard** -- Per-student replay, sparkline of AI-score history, full activity report, and accommodation toggle for students who need a plain-textarea editor.\n\n**Sequential Progress Tracking** -- Students see their place in the 13-module sequence; instructors see who is stuck where.\n\n**Instructor-of-Record Workflow** -- Submissions are reviewed by the human instructor, with formative feedback delivered through the AI Tutor.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It teaches a method, not a survey** -- The course's job is to make students competent in a specific analytical practice, not to expose them to a wide field of facts.\n\n**Every assignment ends in a non-obvious prediction** -- Students are required to say something about each system that someone without systems training would not have seen. The vocabulary is graded on whether it produces insight.\n\n**The AI Tutor refuses to do the work** -- The tutor is system-prompted to pivot back to questions whenever asked to write the assignment. Discussion, clarification, counter-argument, and formative critique only.\n\n**Submissions are integrity-monitored end to end** -- Real-time AI-detection scoring, paste blocking, keystroke logging, and an automatic activity report on every submission. Accommodated students get a plain editor and skip monitoring.\n\n**Model responses are detailed and rubric-keyed** -- Students see not just what an A-grade answer looks like, but why each part of it is graded that way.\n\n**Term paper analyzes five real-world systems at once** -- A social-media platform, a forest ecosystem, a hospital ED, a national power grid, and a language community. The vocabulary has to bridge all five domains.\n\n**Self-paced with no late penalties** -- Students may resubmit any module; the most recent submission counts. The AI Tutor helps identify what to improve.\n\n**Built to the Quality Matters rubric out of the box** -- Course information, instructor information, learning outcomes, accessibility, support, and academic-integrity policy are all in place from day one.",
      },
    ],
  },
  "Psychology 101": {
    emoji: "🧠",
    tagline:
      "An AI-Augmented Online College Course in the Science of Mind and Behavior",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Psychology 101 is a fully online, asynchronous undergraduate course that teaches the foundations of psychological science -- how people think, learn, remember, and influence one another. Across 13 sequenced modules, students work through landmark studies (Pavlov, Skinner, Zimbardo, Milgram, Loftus) and the core tools of careful psychological reasoning, culminating in a short term paper analyzing a contemporary article in psychology.\n\nUnlike generic AI study tools that hand students finished answers, Psychology 101 is built around a strict pedagogical principle: the AI is a tutor, not a ghostwriter. It explains, tests, coaches, and gives formative feedback -- but it never writes the assignment for the student. Every module enforces a deliberate read -> think -> draft -> critique -> submit loop, with progress unlocking only when prior work is genuinely complete.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduate students** -- taking an introductory psychology course and wanting structured, on-demand instruction outside of lecture\n\n**Independent learners and career switchers** -- who want a rigorous, college-level grounding in psychology without enrolling in a degree program\n\n**Instructors and TAs** -- looking for a ready-to-deploy course shell with built-in AI scaffolding and academic-integrity guardrails\n\n**High school students preparing for AP Psychology** -- needing a deeper conceptual foundation than a study guide can provide\n\n**Anyone** -- who has ever opened an intro psych textbook, gotten lost in jargon, and wished they had a patient tutor on call",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**13-Module Sequenced Curriculum** -- Six discussions, five essays, and a culminating term paper covering branches of psychology, conditioning, memory, the mind-brain problem, mental illness, cognitive biases, the bystander effect, and contemporary readings from Kahneman, Dweck, and Pinker & Bloom.\n\n**AI Tutor (Claude-powered)** -- A conversational tutor scoped to the current module that answers conceptual questions, walks through landmark studies, and probes the student's reasoning -- without leaking the assignment answer.\n\n**Per-Module Study Guide** -- One-click generation of a focused study guide with key concepts, core arguments, common pitfalls, and self-check questions.\n\n**Step-by-Step Tutorial Walkthroughs** -- A guided, numbered breakdown of each reading with short examples and a \"what to do next\" nudge toward the assignment.\n\n**Audio Podcast Explainers** -- A 2-3 minute single-host script for each module, designed to be listened to on a commute or walk.\n\n**Plain-Language Reading Rewrites** -- A clarity-pass rewrite of every reading, preserving every claim and example while simplifying sentence structure and vocabulary.\n\n**Formative Draft Feedback** -- Students get one round of structured, instructor-style feedback on a draft before final submission. The AI describes what to revise and why -- it never rewrites or supplies phrasings.\n\n**Mediocre-Answer Critique Exercise** -- The system can generate a deliberately weak student answer that learners must critique, training the metacognitive skill of recognizing flawed reasoning.\n\n**Sequential Unlocking & Progress Tracking** -- Modules unlock in order; an Assessments page tracks completed work, points earned, and remaining requirements.\n\n**Syllabus, Accessibility, and Support Pages** -- A full course shell with grading policy, learning outcomes, accessibility statement, and student-support information.",
      },
      {
        emoji: "🎯",
        title: "What Makes It Different",
        body:
          "**The AI refuses to do the work for you** -- Every prompt is engineered around formative feedback and Socratic questioning. No drafting. No phrasings. No model-answer leaks.\n\n**Modules unlock sequentially** -- Students cannot skip ahead. The course enforces the actual learning sequence rather than letting users cherry-pick topics.\n\n**Built around landmark studies, not just definitions** -- Pavlov, Skinner, Zimbardo, Milgram, Loftus, Asch, Darley & Latane -- each module is anchored in a real study with named methodology, results, and limitations.\n\n**Drafts get one round of instructor-grade critique** -- Mirrors how a good TA actually works: read the draft, name what's working, name what's weak, ask Socratic questions, point at the next revision step.\n\n**Five distinct AI study modes per module** -- Tutor chat, study guide, tutorial, podcast script, and clarity rewrite -- each with its own prompt discipline, so students learn the same material from multiple angles.\n\n**Academic-integrity-first prompt design** -- Every system prompt explicitly forbids writing assignment text, supplying answers, or quoting the instructor's reference standard.\n\n**Designed for a real grading scheme** -- Discussions and essays carry actual point values; the term paper anchors the course; the assessment view sums it all up.",
      },
    ],
  },
  "Philosophy 101": {
    emoji: "📜",
    tagline:
      "Self-Paced, AI-Graded Introduction to Philosophy with Real Writing, Live Integrity Monitoring, and Instant Feedback",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "PHILOSOPHY 101 is a fully self-running Introduction to Philosophy course that grades student work with a frontier AI model in seconds. Students read the lesson, draft their thinking in a coached workshop, write a real response in a monitored submission canvas, submit, and receive a numeric score plus written feedback referenced against a hidden model answer and rubric.\n\nUnlike practice apps that only check multiple-choice answers or score essays on surface features, PHILOSOPHY 101 grades the reasoning. The AI grader reads the entire student response -- every claim, every justification, every counterexample -- and evaluates it against the assignment requirements the same way a human instructor would. Discussions, essays, the term paper outline, and the term paper itself are all graded the same way, end-to-end, with no human in the loop.\n\nWhat's different here is the front end of the writing process: every submission is composed inside an Integrity Canvas that prevents pasting, scores text in real time for AI authorship, logs the full keystroke history, and gives the instructor a replay of how the response was actually written.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**College students taking Intro to Philosophy** -- need to satisfy a humanities requirement with real graded feedback instead of \"good participation\" credit\n\n**Adult learners and lifelong readers** -- want a structured 13-assignment tour through epistemology, metaphysics, and ethics they can do on their own schedule\n\n**Homeschool families** -- need a complete philosophy curriculum that grades writing-intensive work automatically\n\n**Tutors and writing coaches** -- need a ready-made pool of discussion prompts, essay assignments, and worked model responses\n\n**Instructors who care about academic integrity** -- need a writing environment that makes AI-generated submissions visible instead of guessing after the fact\n\n**Anyone** -- who has ever wanted feedback on a philosophy paper without waiting two weeks and getting \"nice work\" in the margin",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**AI-Graded Free-Response Writing** -- Every submission is graded by a frontier AI model against the assignment's full rubric and a hidden model answer. Returns a numeric score (clamped to the assignment's point value) plus written, rubric-referenced feedback in seconds.\n\n**Two-Box Submission Workflow** -- Box 1 is a Draft Workshop where students get one round of structured AI feedback on a rough draft (then it locks). Box 2 is the Submission Canvas -- a paste-blocked editor where the actual graded response is composed.\n\n**Real-Time AI-Authorship Scoring** -- The submission canvas calls GPTZero as the student writes, highlights individual sentences that read as AI-generated, and shows a green/yellow/red traffic-light bar tracking the document's overall AI-likeness score live.\n\n**Paste Prevention with Internal Cut/Copy** -- Pasting text from outside the canvas is blocked outright (with a visible flash). Students can still cut and copy within their own document, so normal editing isn't disrupted.\n\n**Full Keystroke Replay for Instructors** -- Every insert, delete, paste attempt, and highlighting toggle is recorded. The admin dashboard plays the writing back like a video, with scrubber and speed controls, so instructors can see how the response was actually composed.\n\n**Activity Report on Every Submission** -- Each submission ships with a server-computed integrity report: cumulative time spent in red, peak typing speed in any 30-second window, long-pause-to-burst patterns, blocked paste attempts, and whether the student turned highlighting off while flagged.\n\n**Accommodations Toggle** -- Instructors can mark a student as accommodated from the admin dashboard. Accommodated students see a plain textarea with no monitoring, scoring, or paste blocking -- appropriate for documented assistive-tech needs.\n\n**One-Time Integrity Disclosure** -- Before their first submission, every student sees a plain-language modal explaining exactly what is monitored, what is stored, and how it's used. The disclosure is also permanently available on the Accessibility page.\n\n**Hidden Model Answers, Revealable On Demand** -- Each assignment ships with a worked model response and the rationale behind it. Students can stay locked in on their own attempt or click to reveal the model after submitting.\n\n**Best-Score Progress Tracking** -- Students can resubmit any assignment as many times as they want; the best score per item rolls up into the overall course total (800 points across 13 items).\n\n**Complete 13-Item Curriculum, Built In** -- Seven discussions, five essays, and a term paper. Every item includes a background reading, an assignment prompt, a model response, and grading rationale.\n\n**Single-Sign-On Course Shell** -- One sign-in unlocks the whole course. Progress, drafts, autosaved canvas sessions, submissions, and feedback persist across sessions on any device.\n\n**Admin Dashboard for Instructors** -- Per-student submission list, per-submission detail page with replay, score sparkline, activity report, and the accommodation toggle. The first authenticated user can claim instructor access; after that, only an existing instructor can grant it.\n\n**Instructor-Free Operation** -- The course runs without a human grader. No queue, no office hours, no waiting -- submit at 2 a.m. and get feedback by 2:01 a.m.\n\n**Verbatim Curriculum Source** -- All course content is parsed verbatim from the source curriculum document. No paraphrasing, no AI-generated lesson content -- just the real syllabus, rendered properly.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It actually grades the argument** -- Not just the surface. The AI reads every step of reasoning and evaluates it against the rubric the way a human grader would.\n\n**It watches the writing happen** -- The Integrity Canvas records the whole composition process and surfaces a replay to the instructor. AI-pasted submissions stop being a guessing game.\n\n**It scores AI authorship in real time** -- Students see a live traffic-light bar and sentence-level highlighting as they write, so the line between \"AI-assisted\" and \"AI-written\" is visible to them, not just to the grader.\n\n**It separates drafting from submitting** -- The Draft Workshop is where AI feedback is allowed and encouraged. The Submission Canvas is where the graded work happens. Students get the benefit of AI coaching without that coaching becoming the submission.\n\n**It returns rubric-referenced feedback** -- Feedback names the specific assignment requirements that were met, partially met, or missed -- the same way a human grader would write it.\n\n**It's instant** -- Submit, and the score and written feedback land in seconds. No grading backlog, ever.\n\n**It's resubmittable** -- Best score wins. Students are encouraged to revise and resubmit until they actually understand the material, not until the deadline passes.\n\n**It accommodates honestly** -- Students with documented needs can be flipped to a plain textarea with one click. The integrity layer is on by default but never in the way of access.\n\n**It's the full course, not a demo** -- All 13 graded items totalling 800 points are live and gradable from day one. Nothing is locked, coming-soon, or paywalled behind a tier.",
      },
    ],
  },
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
    { title: "Systems Science 101", url: "https://systemsscience.xyz" },
    { title: "Statistics 101", url: "https://statistics101.xyz" },
    { title: "English Composition", url: "https://englishcomposition.xyz" },
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
