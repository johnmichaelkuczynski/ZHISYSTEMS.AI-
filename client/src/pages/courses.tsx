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
  "Algebra 1": {
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
  "Macroeconomics": {
    emoji: "📊",
    tagline:
      "Self-Paced Online Course in Introductory Macroeconomics with AI-Powered Tutoring, Drafting, and Academic-Integrity Forensics",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Macroeconomics 101 is a complete, single-semester introductory macroeconomics course delivered as a self-contained web application. It covers the standard ECON 101 curriculum -- GDP measurement, inflation and the quantity theory of money, unemployment, fiscal and monetary policy, the Phillips curve, trade deficits, recessions, long-run growth, public debt, the open-economy trilemma, and the Keynesian-Classical debate -- across 13 sequential modules totaling 800 points.\n\nUnlike a generic LMS shell wrapped around video lectures, Macroeconomics 101 is built around a strict pedagogical principle: students must demonstrate that they actually wrote what they submit. Every essay and term paper is graded by an AI tutor against a published model response, every draft is autosaved with keystroke and paste forensics, and every submission is scored for AI-generated content before it reaches the gradebook. No padding, no hedging, no participation credit for showing up.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduates taking their first macroeconomics course** -- need a structured 13-module path with explicit learning outcomes, model answers, and immediate feedback rather than a 700-page textbook and a midterm\n\n**Returning adult learners and career-changers** -- need a fully asynchronous course they can complete on their own schedule without sacrificing rigor or graded feedback\n\n**High-school AP Macro and dual-enrollment students** -- need college-level practice problems and essay prompts with the same grading standards used in a university classroom\n\n**Self-studiers preparing for the GRE, CFA Level I economics section, or graduate program prerequisites** -- need a verifiable, transcript-ready record of mastery across the standard macro syllabus\n\n**Instructors and TAs** -- need a turnkey course shell with curriculum data, sequential gating, draft locking, and a built-in academic-integrity pipeline they can adopt or fork",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**13-Module Sequential Curriculum** -- 7 discussion posts (50 pts each), 5 essays (50 pts each), and 1 two-part term paper (200 pts) totaling exactly 800 points. Each module includes learning objectives, required reading drawn verbatim from the course textbook, an assignment prompt, and a published model response students see only after submitting.\n\n**Sequential Gating** -- Students cannot skip ahead. The system enforces strict ordering (d1 -> e1 -> d2 -> e2 -> ... -> d7 -> tp) and blocks any submission whose prerequisite modules are not yet complete, with an explicit list of what is missing.\n\n**AI Tutor (Claude Sonnet 4.5)** -- Conversational instructor backed by the full curriculum context and a macroeconomics-specific system prompt. Answers conceptual questions, walks through derivations, and explicitly refuses to write the student's assignment for them.\n\n**AI Draft Feedback** -- One-click formative feedback on any in-progress draft. Identifies missing concepts, weak arguments, and structural problems against the module's model response without revealing the model answer itself.\n\n**AI Study Tools** -- Per-module study guides, mini-tutorials, podcast-style audio hooks, and rewrite assistance. Every tool is constrained to the module's actual reading and learning objectives -- no off-topic drift.\n\n**Draft Autosave + Lock** -- Every keystroke is autosaved server-side. On submission the draft is locked and timestamped, producing an immutable record of what was submitted and when.\n\n**Process Forensics** -- The drafting canvas captures keystroke cadence, paste events, and edit timing. A scoring engine flags submissions that look like transcription of pre-written or AI-generated text (>= 70 = likelyAI) versus organic composition (< 35 = human) with six distinct behavioral flags.\n\n**Term Paper Two-Part Pipeline** -- The capstone (Module 13, 200 pts) is split into a 100-point outline and a 100-point final paper, each with its own model version. Students cannot submit the final paper without first submitting an approved outline.\n\n**Admin Accommodation Toggle** -- Per-student override that relaxes timing-based forensics flags for students with documented accommodations, persisted in the database and audit-logged.\n\n**System Diagnostic** -- One-click self-check that verifies environment variables, database connectivity, all four core tables, the curriculum loader, the Anthropic integration, and the full functional pipeline (student creation -> integrity ack -> draft round-trip -> autosave -> submission -> gating -> cleanup). Color-coded pass/fail with a downloadable report.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It actually grades against a model answer** -- Every essay and discussion has a published model response written by the instructor. The AI grader compares the student's submission to that specific model, not to a generic \"good writing\" rubric. If the student missed the point, the feedback says exactly which point they missed.\n\n**It separates writing from transcription** -- Most online courses cannot tell the difference between a student who wrote a good essay and a student who pasted a good essay. The process-forensics layer scores composition behavior independently of the text itself, so a polished submission with a paste-heavy keystroke trace is flagged regardless of how well it reads.\n\n**It enforces sequential mastery** -- No student can submit Module 5 without finishing Modules 1-4 first. The gating logic is enforced server-side and returns the exact list of missing prerequisites, so the path through the course is unambiguous.\n\n**AI tutor that refuses to do the assignment** -- The system prompt is explicit: the tutor explains, derives, and quizzes, but it will not draft the student's discussion post or essay. Students who try to extract the assignment text get a redirect to the relevant reading.\n\n**One-shot integrity acknowledgment** -- Before any submission is accepted, the student must explicitly acknowledge the academic-integrity policy. The acknowledgment is timestamped and stored, creating a defensible audit trail.\n\n**Curriculum-as-code** -- All 13 modules -- titles, objectives, readings, prompts, model responses, point values -- live in a single TypeScript file and are loaded identically by both the frontend and the API server. Forking the course to a different subject is a single-file edit.\n\n**Built on a real Postgres database** -- Students, submissions, drafts, and canvas autosave sessions are persisted in Neon Postgres with cascade-delete integrity. Nothing lives in browser local storage; nothing is lost on refresh.\n\n**Production-grade diagnostic before every deploy** -- The 20-check self-test runs the entire pipeline against the live database and live AI provider. If anything is wrong -- missing migration, expired key, broken gating logic -- the report says exactly what failed and where.",
      },
    ],
  },
  "Microeconomics": {
    emoji: "📊",
    tagline:
      "AI-Powered Economics Course Platform with Writing Process Forensics and Academic Integrity Enforcement",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "**What it is** -- An interactive online course platform for introductory Microeconomics that pairs a structured curriculum with a conversational AI tutor and a high-integrity writing environment.\n\n**What it runs on** -- Claude Sonnet 4.5 powers the in-module tutor; GPTZero powers real-time AI-content scoring; a custom keystroke-forensics engine analyzes how every submission was actually produced.\n\n**Operating principle** -- Every submission is evaluated not just on what was written, but on how it was produced. If a student is asked to type their own response, that is exactly what the system enforces.\n\n**What it refuses to do** -- No silent pastes, no ghostwritten paragraphs, no tutor that drafts the assignment for the student, no plausible deniability at grading time.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Students** -- enrolled in introductory Microeconomics who need a structured curriculum, an always-available tutor, and clear feedback on their writing\n\n**Instructors and professors** -- need to assign writing-intensive work in the age of LLMs without losing the ability to verify authorship\n\n**Teaching assistants and graders** -- need a single dashboard to review submissions, AI probability scores, and process-forensics reports side by side\n\n**Department administrators** -- need defensible, auditable evidence of academic integrity enforcement across sections\n\n**Accessibility coordinators** -- need a first-class accommodated mode that disables monitoring without forcing students into a parallel workflow\n\n**Anyone** -- who believes that learning economics still requires the student to do the thinking",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**Structured Curriculum** -- A complete sequence of numbered modules covering opportunity cost, supply and demand, elasticity, market structures, and core micro topics. Content is ingested from canonical course materials and rendered as navigable, lesson-by-lesson units.\n\n**AI Tutor (Claude Sonnet 4.5)** -- A persistent side-panel tutor available inside every module. Programmed with hard guardrails so it explains, questions, and challenges -- but never writes the assignment for the student.\n\n**Draft Workshop (Box 1)** -- A low-stakes drafting space where students paste an early draft and receive a single round of conceptual feedback on what needs work. Once feedback is delivered, the draft locks. No infinite revision loops, no AI co-authoring.\n\n**Submission Canvas (Box 2)** -- A custom high-integrity editor where final responses must be typed. External pasting is blocked, every keystroke is recorded, and the student sees their own AI-probability score in real time as they write.\n\n**Real-Time GPTZero Integration** -- Live AI-detection scoring surfaced as a traffic-light indicator while the student types, so there are no surprises at submission time.\n\n**Writing Process Forensics** -- Diachronic analysis of keystroke timing, pauses, deletions, and burst patterns. Distinguishes natural human composition from pasted or transcribed AI output, even when the final text would pass a static detector.\n\n**Assessments and Progress Tracking** -- Per-module point tracking, submission status, and grading history surfaced in a single student-facing dashboard.\n\n**Admin Dashboard** -- Instructor view at /admin/submissions for reviewing every submission alongside its AI score, process-forensics report, and full keystroke replay.\n\n**Accommodated Mode** -- A first-class accessibility mode that disables paste prevention and process monitoring for students with documented accommodations, without segregating them into a separate workflow.\n\n**Syllabus and Start Here** -- Clear onboarding with course objectives, grading policy, integrity expectations, and a guided first-session walkthrough.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It enforces what it asks for** -- If the assignment says \"type your response,\" the platform makes that the only thing that works. No quiet pasting, no workaround tabs.\n\n**It evaluates process, not just product** -- Most AI-detection tools grade the final text. Microeconomics grades the history of how that text appeared on the screen. Pasted AI output looks nothing like genuine composition under keystroke analysis.\n\n**The tutor refuses to do the work** -- The Claude tutor is configured to teach, probe, and explain -- never to draft, outline, or revise an assignment on the student's behalf. Students get help understanding; they do not get help cheating.\n\n**Two-stage writing pipeline** -- Draft Workshop and Submission Canvas separate \"thinking out loud\" from \"final accountable work.\" Students get one round of substantive feedback, then own their final draft.\n\n**Real-time feedback, not post-hoc accusation** -- Students see their AI score as they write. Integrity issues become a conversation during composition, not a confrontation after submission.\n\n**Accommodations are built in, not bolted on** -- Accommodated mode is part of the core design, so students with documented needs use the same interface as everyone else without monitoring.\n\n**Auditable by design** -- Every submission carries a full forensic record: keystroke log, AI-score history, draft progression, and tutor transcript. Grading decisions are defensible end-to-end.",
      },
    ],
  },
  "Probability Theory": {
    emoji: "🎲",
    tagline:
      "An online college course in introductory probability, built around an AI tutor, formative draft feedback, and end-to-end academic-integrity instrumentation.",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Probability 101 is a complete 15-module undergraduate course shell for introductory probability theory. It pairs a verbatim instructor-authored course text with an always-available AI tutor, an automated formative-feedback layer for student drafts, and a built-in academic-integrity pipeline that scores every submission for AI generation and reconstructs the writing process from keystroke-level forensics.\n\nUnlike generic LMS tools that bolt AI onto the side, this app is built around a strict pedagogical principle: the AI never writes the assignment for the student. The tutor teaches by questioning, the draft feedback describes what to revise without rewriting, and every model response is held back from the learner until they have submitted. The course covers sample spaces and Kolmogorov's axioms through Bayesian inference and the Central Limit Theorem, with all probability notation rendered as proper LaTeX math.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduate students taking their first probability or statistics course** -- need a patient, always-available tutor that pushes back on shallow reasoning instead of handing out answers\n\n**Self-learners working through introductory probability** -- need a structured 15-module path with worked examples, formative feedback, and a term paper that ties the material together\n\n**Instructors piloting AI-augmented coursework** -- need a course shell that enforces academic integrity by default and produces a defensible audit trail for every submission\n\n**Course designers building Quality Matters-aligned online courses** -- need a working reference implementation of QM Higher Ed Rubric (7th ed.) standards\n\n**Researchers studying AI-assisted learning** -- need granular keystroke, paste, and idle-time data on how students actually compose assignments",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**15-Module Probability Curriculum** -- 8 discussions, 5 essays, a term-paper outline, and a final term paper totaling 850 points. Covers sample spaces, Kolmogorov's axioms, conditional probability, Bayes' theorem, expected value and variance, the binomial and normal distributions, the Law of Large Numbers, the Central Limit Theorem, and Bayesian inference. Every module ships with verbatim reading, an assignment prompt, instructor objectives, and a private model response.\n\n**AI Tutor (per-module, role-locked)** -- A Claude-Sonnet-powered instructor of record for each module. Teaches by Socratic questioning, never writes the assignment, pushes back on weak reasoning, and stays in role. Conversation history is persisted per student and per module. All probability notation is emitted as LaTeX so it renders properly in the chat.\n\n**One-Round Formative Draft Feedback** -- Students get exactly one round of structured feedback on a draft before final submission. The AI uses the instructor's reference standard to calibrate its judgment but is forbidden to quote it, paraphrase it, or rewrite the student's work. Output is locked to five fixed H2 sections so feedback is comparable across drafts.\n\n**Module Action Suite** -- One-click generation of a Study Guide (concepts, formulas, pitfalls, self-check questions), a Step-by-Step Tutorial with worked examples, a 2-3 minute Audio Podcast Script, a Plain-Language Rewrite of the reading, and a Read My Draft formative critique -- all streamed live to the student.\n\n**Critique Exercise Generator** -- Generates a deliberately mediocre B-/C+ student answer to any assignment, with at least three identifiable weaknesses (ill-defined sample space, confused independence, ignored base rate, gambler's fallacy, etc.) for students to critique as a learning exercise.\n\n**KaTeX Math Rendering** -- Full LaTeX rendering across readings, assignments, model responses, and AI-generated content. Inline math with $ ... $, display math with $$ ... $$. Probability notation renders correctly everywhere it appears.\n\n**GPTZero AI-Detection Scoring** -- Every final submission is scored by GPTZero for likelihood of AI generation. The score is stored alongside the submission and surfaced to instructors. AI-detection failures do not block submission; they create an audit record.\n\n**Process Forensics (Keystroke-Level Audit Trail)** -- The composition canvas records every insertion, deletion, paste, and idle gap as the student writes. A scoring engine then classifies the session on a 0-100 scale: composition vs. transcription, with explicit flags for large pastes, unbroken bursts, suspicious idle patterns, and other transcription signals. Synthetic transcription sessions reliably score likelyAI >= 70; genuine composition reliably scores human < 35.\n\n**Term Paper Workflow** -- Two-stage final assignment: a 100-point outline followed by a 100-point full paper. Both stages run through the same draft-feedback and integrity pipeline as every other module.\n\n**System Diagnostic** -- One-click self-check that verifies environment secrets, database connectivity, every API provider (Anthropic, GPTZero), the curriculum integrity (module count, point totals, sequential numbering), the process-forensics scoring engine, and the full functional flow (synthetic student -> integrity ack -> submission -> grading -> cleanup). Color-coded pass / fail / skip with millisecond timing per check.\n\n**Quality Matters-Aligned Course Shell** -- Includes a syllabus page, a \"Start Here\" onboarding flow with student introduction and integrity acknowledgment, an accessibility statement, a support page, and a learning-outcomes alignment to the QM Higher Ed Rubric (7th ed.).",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**The AI refuses to do the work for the student** -- The tutor's system prompt explicitly forbids writing the assignment. The draft-feedback pipeline forbids rewriting the student's prose. The model response is hidden from the student until after they submit. Most \"AI tutor\" products do the opposite by default; this one is built around the opposite principle.\n\n**Academic integrity is instrumented end-to-end, not bolted on** -- Every submission carries an AI-detection score and a full keystroke-level process recording. Instructors can replay how a student wrote a paper and see, with timestamps, when text was typed versus pasted. This is not an add-on; it is part of the submission contract.\n\n**Process forensics scores composition, not just output** -- A student who writes a great paper by typing it slowly looks completely different from one who pastes it in three large blocks, even if the final text is identical. The forensics engine captures that difference and surfaces it as a numeric score with explicit flags.\n\n**One round of feedback, not infinite hand-holding** -- The draft feedback is a finite resource: one round per assignment, then the student writes the final version. This mirrors real instructor office hours and prevents the AI from becoming a co-author.\n\n**Mathematical content is treated as mathematics** -- Probability notation renders as proper math (typeset binomial coefficients, summation, integrals, fractions), not as ASCII approximations. Every AI-generated artifact (study guide, tutorial, draft feedback) is instructed to emit LaTeX so the math survives the round trip.\n\n**A real curriculum, not placeholder Lorem ipsum** -- The 15 modules contain verbatim instructor-authored readings, assignment prompts with explicit point breakdowns, and full-length model responses. The course is teachable as-is on day one.\n\n**Transparent, testable, and self-diagnosing** -- The Diagnostic page exercises every external dependency, every database table, and every functional code path on demand, with a downloadable report. If anything is misconfigured, the failure is visible in 5-15 seconds.",
      },
    ],
  },
  "AI 101": {
    emoji: "🎓",
    tagline:
      "A fully online, asynchronous college course with a real-time AI-integrity engine, built for the LLM era",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "AI 101 is a 13-module college-level course that teaches the three foundational branches of artificial intelligence -- symbolic AI, machine learning, and neural and deep learning -- through discussions, essays, and a term paper. It is designed to be taken in a world where every student has a chatbot one tab over, and is built around a strict operating principle: the work the student turns in must be the student's own thinking.\n\nUnlike traditional LMS course shells that simply collect a final PDF and hope for the best, AI 101 ships with a live two-layer integrity engine that watches the writing as it happens, scores the final text against a frontier AI-detection service, replays every keystroke for the instructor, and adapts its judgment to each student's own writing baseline. The course is rigorous, the grading is transparent, and the system never refuses to render a verdict.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**College and university instructors** -- who need to assign substantial written work without surrendering the classroom to ChatGPT\n\n**Department chairs and deans** -- who need a defensible, auditable record of student writing process, not just product\n\n**Course designers building in the LLM era** -- who want a working reference implementation of an integrity-first online course\n\n**Students taking AI 101** -- who get a guided, Socratic AI tutor, model responses for every assignment, and a clear signal of when their writing is drifting toward AI-generated\n\n**Researchers in writing process and detection** -- who get a rich event stream (keystrokes, pauses, deletions, caret jumps) on every submission, plus per-feature forensics\n\n**Anyone teaching writing-intensive material online** -- who refuses to choose between \"give up and let AI do it\" and \"ban technology entirely\"",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**Full 13-module AI curriculum** -- 7 discussions, 5 essays, and a term paper (with required outline) covering branches of AI, the Turing Test, what a model actually is, tokens and embeddings, neural networks, training and gradient descent, transformers and attention, pretraining/fine-tuning/RLHF, inference and sampling, hallucination and grounding, supervised/unsupervised/reinforcement learning, scaling laws, and a culminating critical analysis paper. 800 points total.\n\n**Integrity Canvas** -- Per-assignment two-box workflow. Box 1 produces single-shot AI feedback in five sections and then locks the draft so it cannot be silently rewritten by a chatbot. Box 2 is a paste-blocked editor that captures every keystroke, autosaves every 5 seconds, runs real-time GPTZero scoring with sentence-level highlighting, surfaces a traffic-light bar, and warns after 30 cumulative seconds in the red.\n\n**Two-layer AI detection** -- Every submission is scored by two independent systems. GPTZero analyzes the final text. A diachronic process-forensics engine analyzes the writing process itself across 11 features (burst uniformity, pause before new sentence/paragraph, deletion ratio, structural edits, caret backtracks, abandoned starts, burst-length variability, front-to-back linearity, active time, characters per second) and produces a 0-100 suspicion score with human / mixed / likely-AI classes.\n\n**Per-student baseline with anti-drift lock** -- The forensics engine folds in each student's own writing rhythm via running mean for the first two submissions, then freezes the baseline. This blocks the slow-drift attack where a student gradually trains the system to accept AI-like writing as their personal norm.\n\n**Socratic AI Tutor (Claude Sonnet 4.5)** -- Speaks for the instructor, asks Socratic questions, and gives formative feedback. Will never write the student's assignment for them. Module-aware: pulls in the relevant prompt and concepts for whichever assignment the student is working on.\n\n**One-time integrity disclosure** -- On first module visit, every student sees a generic disclosure modal that names GPTZero (which is already public) but never names the process-forensics features. Acknowledgment is persisted. No tuning oracle is ever leaked to students.\n\n**Live throttled integrity signal** -- While writing, students see the live process-suspicion class only -- no feature names, no flag list, no thresholds. Rate-limited to one call per 60 seconds and gated on real writing volume. Accommodated students get a plain textarea and skip monitoring entirely.\n\n**Admin dashboard** -- /admin/submissions and per-submission detail pages with replay, sparkline, activity report, raw vs. baseline-adjusted forensics, GPTZero per-sentence highlights, and a per-student accommodation toggle. First authenticated user can claim admin via bootstrap; after that, admin is granted only by an existing admin.\n\n**Activity report on every submission** -- The server computes a human-readable activity report on insert (total time, pauses, edit patterns, suspicious bursts) so the instructor never has to read raw keystroke JSON.\n\n**Sequential gating** -- Students unlock module N+1 only after submitting module N. The server enforces it; the UI mirrors it.\n\n**System Diagnostic** -- One-click self-check verifies the database connection, all tables, curriculum integrity (13 modules, 800 points), the live GPTZero key, the Anthropic key, process-forensics scoring on two synthetic fixtures (transcription must score >= 70 likely-AI; composition must score < 35 human), and full functional round-trips on drafts, autosave, submissions, gating, and admin toggles. Pass/fail/skip with full evidence.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It treats writing as a process, not a product** -- Most plagiarism tools see only the final text. AI 101 sees the entire writing session: every keystroke, every pause, every deletion, every caret jump. The forensic signal is independent of what GPTZero thinks of the prose.\n\n**It is honest about what students can see** -- The disclosure modal names GPTZero because GPTZero is public knowledge. It never names the process-forensics features, because doing so would hand a sophisticated cheater a tuning oracle. This asymmetry is deliberate.\n\n**It cannot be trained out of catching you** -- The per-student baseline freezes after two submissions. A student who tries to slowly normalize AI-like rhythm into their baseline cannot succeed: the window closes early.\n\n**The tutor refuses to do the work** -- The Anthropic-backed tutor is configured to ask questions, point at concepts, and give formative feedback -- never to write the assignment. This is enforced in the prompt, not just suggested.\n\n**The diagnostic is the spec** -- The two synthetic fixtures (transcription must score likely-AI, composition must score human) gate any change to the forensics weights or thresholds. Tuning is not vibes-driven; it is test-driven.\n\n**Single source of truth for curriculum** -- The 13-module curriculum lives in one TypeScript file consumed by both the client and the server. Module IDs, points, prompts, and model responses cannot drift between what the student sees and what the server validates against.\n\n**Accommodations are first-class** -- An admin toggle per student switches that student to a plain textarea with no monitoring, no paste-block, no scoring. The system records the accommodation; no feature flags or special routes required.\n\n**No silent fallbacks** -- When GPTZero is unreachable, the submission is recorded with aiStatus: failed and surfaced as such. When the API key is missing, the diagnostic says so loudly. There are no fake green checks.\n\n**One self-check covers the whole stack** -- The diagnostic endpoint exercises env vars, database connectivity, schema reachability, curriculum integrity, both AI providers live, both forensics fixtures, and a complete functional round-trip (create student -> ack integrity -> save draft -> lock -> autosave canvas -> submit -> check gating -> list -> toggle accommodation -> cascade delete). One button, the whole truth.",
      },
    ],
  },
  "AI 102": {
    emoji: "🎓",
    tagline:
      "A fully online, asynchronous college course with a real-time AI-integrity engine, built for the LLM era",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "AI 102 is a 13-module college-level course that teaches the practical building blocks of modern AI applications -- prompting as engineering, context windows, system prompts, retrieval-augmented generation, tool use, model selection, fine-tuning, structured output, chains and agents, cost and latency, and how the pieces fit together into a real system -- through discussions, essays, and a culminating critical-analysis term paper on one foundational applied-AI paper.\n\nUnlike traditional LMS course shells that simply collect a final PDF and hope for the best, AI 102 ships with a live two-layer integrity engine that watches the writing as it happens, scores the final text against a frontier AI-detection service, replays every keystroke for the instructor, and adapts its judgment to each student's own writing baseline. The course is rigorous, the grading is transparent, and the system never refuses to render a verdict.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**College and university instructors** -- who need to assign substantial written work without surrendering the classroom to ChatGPT\n\n**Department chairs and deans** -- who need a defensible, auditable record of student writing process, not just product\n\n**Course designers building in the LLM era** -- who want a working reference implementation of an integrity-first online course\n\n**Students taking AI 102** -- who get a guided AI tutor, model responses for every assignment, and a clear signal of when their writing is drifting toward AI-generated\n\n**Researchers in writing process and detection** -- who get a rich event stream (keystrokes, pauses, deletions, caret jumps) on every submission, plus per-feature forensics\n\n**Anyone teaching writing-intensive material online** -- who refuses to choose between \"give up and let AI do it\" and \"ban technology entirely\"",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**Full 13-module applied-AI curriculum** -- 7 discussions, 5 essays, and a term paper (with required outline) covering prompting as engineering, context windows and system prompts, retrieval-augmented generation, tool use and function calling, model selection trade-offs, fine-tuning vs. prompting vs. RAG, structured output and validation, chains and agents, cost and latency engineering, evaluation and observability, and a culminating critical analysis of one foundational applied-AI paper. 800 points total.\n\n**Integrity Canvas** -- Per-assignment two-box workflow. Box 1 produces single-shot AI feedback in five sections and then locks the draft so it cannot be silently rewritten by a chatbot. Box 2 is a paste-blocked editor that captures every keystroke, autosaves every 5 seconds, runs real-time GPTZero scoring with sentence-level highlighting, surfaces a traffic-light bar, and warns after 30 cumulative seconds in the red.\n\n**Two-layer AI detection** -- Every submission is scored by two independent systems. GPTZero analyzes the final text. A diachronic process-forensics engine analyzes the writing process itself across 11 features (burst uniformity, pause before new sentence/paragraph, deletion ratio, structural edits, caret backtracks, abandoned starts, burst-length variability, front-to-back linearity, active time, characters per second) and produces a 0-100 suspicion score with human / mixed / likely-AI classes.\n\n**Per-student baseline with anti-drift lock** -- The forensics engine folds in each student's own writing rhythm via running mean for the first two submissions, then freezes the baseline. This blocks the slow-drift attack where a student gradually trains the system to accept AI-like writing as their personal norm.\n\n**AI Tutor (Claude Sonnet 4.5)** -- Speaks for the instructor, asks probing questions, and gives formative feedback. Will never write the student's assignment for them. Module-aware: pulls in the relevant prompt and concepts for whichever assignment the student is working on.\n\n**One-time integrity disclosure** -- On first module visit, every student sees a generic disclosure modal that names GPTZero (which is already public) but never names the process-forensics features. Acknowledgment is persisted. No tuning oracle is ever leaked to students.\n\n**Live throttled integrity signal** -- While writing, students see the live process-suspicion class only -- no feature names, no flag list, no thresholds. Rate-limited to one call per 60 seconds and gated on real writing volume. Accommodated students get a plain textarea and skip monitoring entirely.\n\n**Admin dashboard** -- /admin/submissions and per-submission detail pages with replay, sparkline, activity report, raw vs. baseline-adjusted forensics, GPTZero per-sentence highlights, and a per-student accommodation toggle. First authenticated user can claim admin via bootstrap; after that, admin is granted only by an existing admin.\n\n**Activity report on every submission** -- The server computes a human-readable activity report on insert (total time, pauses, edit patterns, suspicious bursts) so the instructor never has to read raw keystroke JSON.\n\n**Sequential gating** -- Students unlock module N+1 only after submitting module N. The server enforces it; the UI mirrors it.\n\n**System Diagnostic** -- One-click self-check verifies the database connection, all tables, curriculum integrity (13 modules, 800 points), the live GPTZero key, the Anthropic key, process-forensics scoring on two synthetic fixtures (transcription must score >= 70 likely-AI; composition must score < 35 human), and full functional round-trips on drafts, autosave, submissions, gating, and admin toggles. Pass/fail/skip with full evidence.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It treats writing as a process, not a product** -- Most plagiarism tools see only the final text. AI 102 sees the entire writing session: every keystroke, every pause, every deletion, every caret jump. The forensic signal is independent of what GPTZero thinks of the prose.\n\n**It is honest about what students can see** -- The disclosure modal names GPTZero because GPTZero is public knowledge. It never names the process-forensics features, because doing so would hand a sophisticated cheater a tuning oracle. This asymmetry is deliberate.\n\n**It cannot be trained out of catching you** -- The per-student baseline freezes after two submissions. A student who tries to slowly normalize AI-like rhythm into their baseline cannot succeed: the window closes early.\n\n**The tutor refuses to do the work** -- The Anthropic-backed tutor is configured to ask questions, point at concepts, and give formative feedback -- never to write the assignment. This is enforced in the prompt, not just suggested.\n\n**The diagnostic is the spec** -- The two synthetic fixtures (transcription must score likely-AI, composition must score human) gate any change to the forensics weights or thresholds. Tuning is not vibes-driven; it is test-driven.\n\n**Single source of truth for curriculum** -- The 13-module curriculum lives in one TypeScript file consumed by both the client and the server. Module IDs, points, prompts, and model responses cannot drift between what the student sees and what the server validates against.\n\n**Accommodations are first-class** -- An admin toggle per student switches that student to a plain textarea with no monitoring, no paste-block, no scoring. The system records the accommodation; no feature flags or special routes required.\n\n**No silent fallbacks** -- When GPTZero is unreachable, the submission is recorded with aiStatus: failed and surfaced as such. When the API key is missing, the diagnostic says so loudly. There are no fake green checks.\n\n**One self-check covers the whole stack** -- The diagnostic endpoint exercises env vars, database connectivity, schema reachability, curriculum integrity, both AI providers live, both forensics fixtures, and a complete functional round-trip (create student -> ack integrity -> save draft -> lock -> autosave canvas -> submit -> check gating -> list -> toggle accommodation -> cascade delete). One button, the whole truth.",
      },
    ],
  },
  "AI 103": {
    emoji: "🎓",
    tagline:
      "A Fully Online, Asynchronous College-Level Course Platform for the Practice of Evaluating AI Systems",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "AI 103 is a complete online course platform built around a single, focused curriculum: how to evaluate AI systems rigorously. Students work through 13 sequential modules covering correctness versus plausibility, hallucination, calibration, benchmark design, evaluation-set construction, human and model-as-judge evaluation, adversarial robustness, production monitoring, and human-in-the-loop verification -- culminating in a term paper engaging with a foundational article on AI evaluation methodology.\n\nUnlike generic LMS shells that wrap third-party content, this platform is the course. Every module, prompt, rubric, and tutor interaction is purpose-built for evaluation literacy. The AI Tutor (Anthropic Claude Sonnet 4.5) speaks for the instructor of record, pushes back on weak arguments, and gives formative feedback -- but it will never write a student's work for them. Grading protocols, term-paper scaffolding, and integrity checks are enforced by the system, not left to honor.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduate and graduate students** -- need a structured, credit-style course in modern AI evaluation methodology, with weekly discussions, essays, and a term paper Working ML engineers and applied scientists -- need to formalize the difference between \"the model sounds right\" and \"the model is right,\" and learn how production evaluation actually works Product managers and AI policy professionals -- need to read evaluation claims critically and know which numbers in a model card actually mean something Educators and curriculum designers -- need a reference implementation of an asynchronous, AI-tutor-assisted course that maintains academic rigor Self-directed learners -- want a complete, sequenced curriculum on AI evaluation rather than a scattered reading list Anyone -- who has ever asked \"is this model actually good, or does it just sound good?\" and wants a real answer",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**13-Module Sequenced Curriculum** -- A fixed-order learning path covering the full landscape of AI evaluation: correctness vs. plausibility, hallucination, calibration, benchmark design, evaluation-set construction, human and model-as-judge evaluation, adversarial robustness, production monitoring, human-in-the-loop verification, and synthesis. Modules unlock as students submit each one.\n\n**Mixed Assessment Types** -- Twelve graded modules (50 points each) alternate between discussion posts and short essays, capped by a two-stage term paper (Outline 100 pts + Final 100 pts = 200 pts). Total course weight: 800 points.\n\n**AI Tutor Per Module** -- Each module has a dedicated tutor conversation powered by Anthropic Claude Sonnet 4.5. The tutor is given the module's reading, objectives, and assignment as system context, and is explicitly instructed to challenge weak claims and refuse to write the student's submission.\n\n**Module-Aware Drafting Workspace** -- Students draft submissions in a canvas tied to the module, save versions, and receive AI feedback on demand. Draft history is preserved per module per student.\n\n**Submission + Grading Pipeline** -- Submissions are stored against the student's record with timestamps, version history, and per-module status. Instructor-side review surfaces the active submission, drafts, and tutor transcripts for context.\n\n**Term Paper Two-Stage Workflow** -- The term paper is split into a graded outline and a graded final, each with its own rubric. The outline must be submitted before the final unlocks.\n\n**Integrity & Originality Checks** -- A background integrity service runs on submissions (including a fire-and-forget GPTZero pass on the final submission) without blocking the student's workflow.\n\n**Instructor / Admin Console** -- A dedicated admin surface lists every student submission, supports drill-down to individual submissions, drafts, and tutor history, and exposes grading controls separate from the student-facing app.\n\n**Self-Diagnostic Suite** -- A one-click diagnostic page runs a full system + functional self-check: provisions a temporary Diagnostic Bot user, exercises the live API over loopback HTTP, hits the real Express middleware stack (cookies, sessions, validation, route handlers, DB writes, response serialization), then deletes the test user via FK cascade. Verifies that the formal mechanics of the app work -- not the quality of any answers, grades, or content.\n\n**Accessibility-First Frontend** -- A dedicated accessibility page documents the app's accommodations, and the UI is built on shadcn/ui primitives with keyboard navigation, semantic structure, and serif typography tuned for long-form reading.\n\n**External Postgres + Drizzle** -- All persistent state (students, progress, drafts, canvases, submissions, conversations, messages) lives in an external Postgres instance accessed through Drizzle ORM with schema-checked migrations.\n\n**Replit AI Integrations** -- Anthropic access is provisioned through the Replit AI Integrations proxy (no user-supplied API key required); the same DATABASE_URL is shared across dev and production so behavior is identical end-to-end.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It is a course, not a course shell** -- The curriculum, rubrics, tutor prompts, and term-paper scaffolding are first-class parts of the app. There is nothing to \"configure\" before a student can begin.\n\n**The AI Tutor pushes back** -- Most \"AI for education\" tools optimize for student satisfaction. This one is instructed to challenge weak arguments, ask for evidence, and refuse to draft the student's work. Formative feedback, not flattery.\n\n**Sequential unlocking enforces the arc** -- Modules unlock as the prior one is submitted. The curriculum's order is pedagogical, not a menu -- students can't skip the foundation and jump to adversarial robustness.\n\n**Drafting is separated from submission** -- Students can iterate in the canvas, talk to the tutor, and revise without \"burning\" attempts. Submission is a deliberate, recorded action.\n\n**Two-stage term paper, with the outline graded on its own merits** -- The outline (100 pts) is a real grade, not a checkbox. The final (100 pts) builds on it. This mirrors how serious writing actually develops.\n\n**Diagnostics that exercise the real stack** -- The self-check doesn't mock anything. It boots a temporary user, walks the full request pipeline against the live database, then cleans itself up -- so green means the production path actually works.\n\n**Integrity checks that don't block the student** -- Originality and integrity signals are computed in the background after submission, not gated in front of it. The student is never stuck waiting on a third-party API to finish.\n\n**Single source of truth for the API** -- The frontend talks to the backend through generated React Query hooks and Zod schemas (OpenAPI -> codegen). Contract drift between client and server is caught at build time.\n\n**One database, dev and prod** -- The same external Postgres is used in both environments. What you see while developing is what students will see -- no separate \"demo\" data to keep in sync.\n\n**Instructor of record stays a human** -- The AI Tutor speaks for the instructor; it does not replace them. Grading, course design, and authority over the curriculum remain with Dr. Margaret Hsu.",
      },
    ],
  },
  "AI 104": {
    emoji: "🧠",
    tagline:
      "Fully Online, Asynchronous College Course on How AI Is Reshaping Practice Across the Major Disciplines",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "AI 104 is a self-paced, college-level course platform that walks students through how artificial intelligence is changing the practice of the sciences, the humanities, law, medicine, finance, engineering and software development, education, journalism, and creative work. It is built as a complete Learning Management environment -- readings, structured discussions, short essays, a term paper, an embedded AI Tutor, instructor review tooling, and a Postgres-backed gradebook -- packaged as one web app a student or instructor can use end-to-end.\n\nUnlike generic \"AI in education\" demos that bolt a chatbot onto a static syllabus, AI 104 is built around a strict pedagogical principle: the AI Tutor is configured to teach, not to do the work for the student. Every module enforces engagement before submission, every submission is timestamped and stored for audit, and every credential the course issues is one whose meaning the instructor can defend. Modules unlock sequentially, tutor sessions are reviewable, and the entire 13-module arc -- 6 discussions, 5 essays, and a 100-point term paper -- is delivered with the same readings, assignments, and model responses the instructor would use in person.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduate students** -- need a rigorous, self-paced introduction to AI's effects on the disciplines they are training to enter, with assessments that actually measure their thinking rather than their access to AI Graduate students and early-career professionals -- need a structured framework for thinking about augmentation vs. substitution vs. transformation as they decide how to position their own careers Faculty and instructors -- need a turnkey, Quality-Matters-aligned course shell with built-in submission review, gradebook, and an AI Tutor that pushes back on weak student arguments instead of writing the papers for them Curriculum designers -- need a working reference implementation of how to deliver an AI-augmented course that preserves assessment validity rather than degrading it Department chairs and program directors -- need a deployable LMS-style module they can stand up quickly to offer an AI-and-the-professions course without building one from scratch Anyone evaluating AI in higher education -- who wants to see what a course looks like when AI is integrated as a feature of the environment rather than treated as a threat to be policed",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**13-Module Disciplinary Curriculum** -- A fixed sequence of 6 discussions, 5 essays, and a 100-point term paper covering AI's effects across the sciences, humanities, law, medicine, finance, engineering, education, journalism, creative work, and disciplinary resistance. Every module ships with verbatim readings, assignment prompts, learning objectives, and a model response for instructor calibration.\n\n**Embedded AI Tutor (Anthropic Claude Sonnet 4.5)** -- A per-module conversational tutor backed by the Anthropic AI integration, system-prompted in the instructor's voice. It discusses readings, generates counter-arguments, and gives formative feedback -- but is hard-blocked from writing student assignments. Every tutor session is persisted and reviewable by the instructor.\n\n**Sequential Module Unlocking** -- Students must submit each module before the next becomes available, with an admin override (?admin=true) for instructor previews. Progress is tracked per student and reflected on the Modules, Assessments, and Start Here pages.\n\n**Submissions and Gradebook** -- Every submission is timestamped, stored in Postgres, surfaced on a student-facing Assessments page, and listed in the instructor's Admin Submissions queue with full per-submission detail view and per-student tutor transcript.\n\n**Instructor Admin Console** -- Admin-flagged users see a dedicated submissions queue with per-submission review, student record, full tutor conversation history, and submission text -- everything needed to grade and provide feedback without leaving the app.\n\n**Printable Syllabus** -- A full Quality-Matters-style syllabus page (course info, instructor info, learning outcomes, grading table, schedule, integrity policy, accessibility, institutional policies) with a one-click Print / Save-as-PDF button.\n\n**Self-Service Onboarding** -- Students sign in by email and name (cookie-based session, no password), write a personal introduction the tutor uses to personalize its questions, and proceed straight into Module 1.\n\n**System Diagnostic Page** -- A one-click /diagnostic route verifies the database connection, the auth flow, the Anthropic integration, and end-to-end submission roundtrip -- useful for setup verification and post-deploy smoke testing.\n\n**Document-Style Print Layout** -- Print stylesheets across the syllabus, module-detail, and assessment pages produce clean PDF output suitable for accreditation files or student records.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It teaches, it doesn't ghostwrite** -- The AI Tutor is system-prompted to refuse to draft assignments. If a student asks it to write their essay, it pivots back to questions about the reading. The tutor's job is to make the student think, not to generate the deliverable.\n\n**It separates engagement from output** -- Every tutor message and every submission is timestamped and stored. The instructor can see not only what the student handed in but how much they engaged with the material before handing it in, and the academic-integrity policy is enforceable rather than aspirational.\n\n**It treats AI as a feature of the environment, not a threat** -- Assessments are designed for a world in which students have AI access. The course's pedagogy assumes AI exists and structures the work around activities that AI cannot substitute for, rather than pretending AI is not in the room.\n\n**One coherent course, not a kit** -- All 13 modules ship complete: readings, learning objectives, assignment prompts, model responses, and tutor configuration are mirrored verbatim between the API server and the frontend so the student experience and the gradebook always agree.\n\n**Production-grade architecture** -- Pnpm monorepo with TypeScript end-to-end. Express + Drizzle ORM + Postgres (Neon) on the backend, React + Vite + TanStack Query + shadcn/ui on the frontend, with an auto-generated typed API client shared between them.\n\n**Backed by a real database from day one** -- Students, submissions, tutor conversations, and progress all persist in Postgres via the DATABASE_URL connection. No mocks, no in-memory state, no demo-only fallbacks.\n\n**Quality Matters-aligned course shell** -- The syllabus, accessibility statement, support page, and engagement policies are built to the Quality Matters Higher Ed Rubric (7th ed.), making the app drop-in usable for institutional review.\n\n**One-click diagnostic** -- The /diagnostic page exercises every external dependency (database, auth, Anthropic) in a single pass and reports color-coded pass/warn/fail status, so setup and post-deploy verification take seconds rather than hours.\n\n**Self-paced without sacrificing rigor** -- No late penalties, unlimited resubmissions (most recent counts), and sequential unlocking. The course meets students where they are while still requiring them to do the work in order.",
      },
    ],
  },
  "AI 105": {
    emoji: "🤖",
    tagline:
      "A Fully Online Asynchronous College Course on the Technical Foundations of Modern AI",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "AI 105: Frontier AI Systems is a self-paced, college-level course that takes students through the technical landscape of contemporary AI: what current architectures actually do, where they fail, and how alignment, evaluation, distillation, and multi-agent systems shape what gets deployed in the world. Thirteen modules -- eleven discussions and essays, plus a two-stage term paper -- work through mechanistic interpretability, the Bitter Lesson, mixture-of-experts, the optimization landscape, long-context architectures, inference-time compute, tokenization, generalization, the alignment problem, distillation, multi-agent systems, and the evaluation crisis.\n\nUnlike most online course shells that hand the student a video and a quiz, AI 105 is built around an AI Tutor that teaches by questioning. The tutor pushes back on weak or vague answers, offers counterarguments, and grounds every reply in specific mechanisms rather than hand-wavy intuition. It will discuss the readings, critique drafts, and pull on threads -- but it will never write the student's assignment for them. Instructor of record: Dr. Alex Park.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduates new to AI** -- need a rigorous on-ramp to the technical literature without a graduate-level prerequisite stack Computer science and engineering students -- need to move beyond surface-level use of LLMs and understand what frontier systems actually are Philosophy, cognitive science, and policy students -- need the technical grounding to argue seriously about alignment, evaluation, and AI risk Working professionals retraining for AI roles -- need a self-paced course that issues no busywork and treats them as adults Educators and curriculum designers -- need a working reference for what a serious, AI-tutor-augmented online course can look like Anyone -- who wants to read primary AI research with confidence instead of relying on second-hand summaries",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**13-Module Curriculum** -- Six discussions (50 pts each), five essays (50 pts each), one capstone discussion (50 pts), and a two-stage term paper (200 pts) -- 750 points total. Each module ships with a full reading, an assignment prompt, and an instructor-grade model response used internally for calibration but never shown to the student.\n\n**AI Tutor (Claude Sonnet 4.5)** -- Per-module conversational tutor that knows the entire course overview, the current module's reading and assignment, and the student's own introduction. Speaks for the instructor of record, refuses to write submissions, and stays in role across long sessions.\n\n**General Tutor** -- Course-wide tutor for cross-module questions, study planning, and \"what does this concept connect to?\" exploration that doesn't fit inside a single module.\n\n**Module-Level AI Actions** -- One-click study guide, step-by-step tutorial walkthrough, 2--3 minute podcast script, and a plain-English rewrite of the reading. All generated on demand from the current module's content.\n\n**Formative Draft Feedback** -- Students get exactly one round of structured pre-submission feedback on a draft. The AI sees the model response privately to calibrate judgment but is forbidden from quoting it, comparing against it, or rewriting the student's work. Five fixed headings, under 450 words.\n\n**Mediocre-Answer Critique Exercise** -- The tutor can generate a deliberately mediocre answer on request, seeded with three or more identifiable weaknesses, so students can practice critique without being handed an exemplar to copy.\n\n**Sequential Module Unlocking** -- Modules unlock as the student submits each one. The Modules page tracks progress, surfaces the next module to start, and lets students return to any prior submission.\n\n**Two-Stage Term Paper Pipeline** -- Outline (100 pts) graded first against a five-section rubric; final paper (100 pts) then graded as a developed realization of the approved outline. Students choose from three foundational articles (Sutton's \"Bitter Lesson,\" Olah et al.'s \"Zoom In,\" or Gu & Dao's \"Mamba\").\n\n**Persistent Session & Progress** -- Single signed-cookie sign-in (no passwords), per-student introduction stored for tutor personalization, and full submission history backed by a Postgres database.\n\n**Self-Paced Pacing** -- No deadlines, no late penalties, unlimited resubmissions. Most-recent submission counts. Recommended pacing of one module per week is a suggestion, not a constraint.\n\n**Accessibility-First UI** -- WCAG 2.1 AA target, keyboard-navigable, semantic HTML, prose-grade typography, print-friendly syllabus, and a published accessibility statement.\n\n**System Diagnostic** -- One-click self-check that verifies the curriculum loader, the moduleById lookup, the database connection, and the AI provider. Color-coded pass/fail report surfaces broken wiring before students hit it.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**The tutor argues with you** -- The system's job is to teach by questioning, not to flatter. Vague answers get pushed back on. Shallow reasoning gets a counterargument. If you want a chatbot that agrees with everything you type, this is not it.\n\n**It refuses to write your assignments** -- The AI Tutor is system-prompted to decline assignment writing and to redirect the student into thinking through it themselves. Draft feedback uses the instructor's model response privately as a calibration anchor but is forbidden from quoting or paraphrasing it.\n\n**Mechanism over vibes** -- Every prompt insists on grounding claims in specific mechanisms: what the architecture actually does, what the training procedure actually optimizes, what evidence would distinguish two competing explanations. Anthropomorphism is treated as a failure mode.\n\n**Source-grade course content** -- All thirteen modules are authored readings, not scraped or generated boilerplate. Each module ships with a verbatim instructor-quality model response that defines the standard the student is being graded against.\n\n**One tutor, one course, no drift** -- The tutor is scoped to AI 105. It knows the full module list, the current reading, the assignment, and the student's stated background. It does not pretend to be a general assistant and does not pull the conversation off-course.\n\n**Built on the Quality Matters Higher Ed Rubric (7th ed.)** -- The course shell -- syllabus, learning outcomes, accessibility statement, engagement expectations, late policy, AI policy -- is structured to map cleanly onto the standard used by accredited online programs.\n\n**Two-stage term paper, not just a deadline** -- The outline is graded as a substantive deliverable (100 pts) before the paper is written. The final paper is then judged as a realization of the approved plan, not as a fresh document, which discourages last-minute rewrites and rewards real planning.\n\n**One signed cookie, no passwords** -- Authentication is a single signed session cookie. No password reset flows, no email verification gauntlet, no third-party identity provider. Students sign in once and get back to the work.\n\n**Open educational resources, no textbook** -- Every reading is embedded directly in the module. The three term-paper articles are all freely available online. Students pay $0 for materials.\n\n**Honest about what it can and cannot do** -- The AI policy, the academic integrity statement, and the tutor's own behavior all converge on the same message: the AI is a serious thinking partner, not a ghostwriter, and submissions that appear to be pasted AI output will receive no credit.",
      },
    ],
  },
  "Sociology 101": {
    emoji: "🎓",
    tagline:
      "A Fully Online, Asynchronous College-Level Introduction to Sociology with an AI Tutor of Record",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Sociology 101 is a complete, self-paced college course on the systematic study of human social life. It plugs an Anthropic Claude Sonnet 4.5 AI Tutor into the role of instructor of record (Dr. Helena Marsh), routes every conversation, draft, and submission through that tutor, and grades student work against an instructor-authored reference standard. Thirteen modules cover the sociological imagination, culture, socialization, structure and role, groups and bureaucracy, deviance, stratification, race and ethnicity, gender and sexuality, family, religion and education, social change, and a capstone term paper.\n\nUnlike chatbot tutoring tools that produce generic, hedged, watered-down answers, Sociology 101 is built around a strict pedagogical principle: the tutor teaches by questioning, pushes back on weak reasoning, and never writes the student's work for them. If a student asks the tutor to draft their assignment, it declines and walks them through the thinking instead. Every module unlocks sequentially, every submission gets formative feedback, and every grade is justified.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduate students** -- need a rigorous, gen-ed-friendly introduction to sociology that actually teaches the discipline's vocabulary and habits of analysis Self-directed learners -- need a college-quality sociology course without enrolling in a brick-and-mortar institution, on their own schedule Instructors and course designers -- need a reference implementation of an asynchronous course built to the Quality Matters Higher Ed Rubric (7th ed.) with built-in AI tutoring Returning learners and career changers -- need to learn how to see individual experience as the intersection of biography and history before tackling more advanced social-science work Anyone -- who wants to understand culture, inequality, institutions, and social change with the rigor of classical theory (Durkheim, Marx, Weber, Mead, Goffman, Bourdieu) rather than punditry",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**13-Module Curriculum** -- A sequenced course totaling 800 points covering the sociological imagination, culture, socialization, social structure and role, groups and bureaucracy, deviance and social control, stratification, race and ethnicity, gender and sexuality, family, religion and education, social change, and a capstone term paper. Each module unlocks once the previous submission is in.\n\n**AI Tutor as Instructor of Record** -- A persistent Claude Sonnet 4.5 tutor configured to speak in Dr. Helena Marsh's voice. Maintains conversation history per module, asks probing questions, offers counterarguments, and refuses to write the student's assignment.\n\n**Formative Draft Feedback** -- One round of structured feedback on every draft before final submission. Output uses a fixed five-section format (Does the draft answer the prompt? / Is the argument structure clear? / Where is the reasoning weak? / What is missing? / What would I revise first?) and never quotes or compares the student's work to the instructor's reference.\n\n**Automated Grading with Reference Standard** -- Every submission is scored against an instructor-authored model response. Grades come with a written rationale, not just a number.\n\n**On-Demand Study Aids** -- One-click generation of a study guide, step-by-step tutorial walkthrough, audio-explainer podcast script, or plain-language rewrite for any module reading. All sociology-calibrated and never substitutive for the student's own work.\n\n**Critique Exercises** -- The tutor can generate a deliberately mediocre B-/C+ student answer for the student to critique, training the skill of distinguishing strong from weak sociological argumentation.\n\n**Term Paper Capstone** -- A 200-point two-part capstone (Part A outline, Part B final paper) applying sociological frameworks to a phenomenon of the student's choosing, with tutor support at every stage.\n\n**System Diagnostic** -- One-click self-check that verifies environment variables, database connectivity, AI integration roundtrip, and that the full 13-module / 800-point curriculum is loaded. Color-coded pass/warn/fail per check.\n\n**Accessibility-First Design** -- Built to conform with WCAG 2.1 Level AA. Keyboard navigation, semantic markup, dedicated accessibility statement, and an open feedback channel.\n\n**Quality Matters Course Shell** -- Start Here onboarding, full syllabus with learning outcomes, module index, assessment overview, and instructor information -- all the artifacts of a real college course, not a toy demo.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It actually teaches, instead of doing the work** -- The tutor's job is to make the student think, not to hand them a polished essay. Ask it to write your paper and it will decline and ask you a better question instead.\n\n**It separates the tutor from the grader** -- Formative feedback never quotes or compares against the reference standard. Grading is a separate, justified verdict. Most AI-in-education tools collapse these into one mushy \"helpful response\"; this platform does not.\n\n**Instructor of record, not chatbot helper** -- The AI is configured with a real teaching philosophy, a real curriculum, and a real voice. It stays in character as Dr. Helena Marsh across every interaction, every module.\n\n**Classical theory, treated seriously** -- Durkheim, Marx, Weber, Mead, Goffman, Cooley, Bourdieu, Merton, and Becker are used analytically, not decoratively. The tutor flags students who name-drop a theorist without doing the conceptual work.\n\n**Sequenced and gated, like a real course** -- Modules unlock in order. Students can't skip ahead, and they can't skip the term-paper outline to jump to the final. This produces actual learning progression instead of a buffet of disconnected snippets.\n\n**Built to a real higher-ed rubric** -- The course shell follows the Quality Matters Higher Ed Rubric (7th ed.): Start Here, syllabus with outcomes, accessibility statement, instructor information, communication norms, and clearly stated AI policy.\n\n**Self-verifying** -- The System Diagnostic page proves at any moment that the database, AI integration, environment, and curriculum invariants (exactly 13 modules, exactly 800 points) are all in working order. If something breaks, you see it before a student does.\n\n**No padding, no editorializing** -- Readings are written for first-time undergraduates in plain language. The tutor's replies are tight (3--8 paragraphs). Study guides cap at 500 words. Podcasts cap at 450 words. Every piece of generated material is sized for actual student attention.",
      },
    ],
  },
  "Medical Terminology": {
    emoji: "🩺",
    tagline:
      "A fully online, asynchronous college-level course in the working vocabulary of medicine -- taught by an AI Tutor that speaks for the instructor of record.",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Medical Terminology 101 is an interactive course shell built around a single open-source course text by Dr. Margaret Hsu, MD. Students work through 13 modules covering word parts and decoding, body organization, the integumentary, musculoskeletal, cardiovascular and lymphatic, respiratory, digestive, urinary and reproductive, nervous, endocrine, and blood systems, plus pharmacology, imaging abbreviations, and reading a complete medical record. The course culminates in a term paper that follows a single patient through presentation, workup, treatment, and patient-education translation.\n\nUnlike generic AI chatbots that write essays for students, this platform is built around a strict pedagogical principle: the AI Tutor (Anthropic Claude Sonnet 4.5) speaks for the instructor, pushes back on weak or vague answers, and gives formative feedback -- but it will never write a student's work for them. Every assignment, every draft-feedback pass, and every tutor turn is rigorously constrained.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Pre-health and pre-nursing undergraduates** -- need a precise working vocabulary before clinical coursework, anatomy and physiology, or NCLEX-style exam prep Allied-health students -- medical assistants, scribes, coders, EMTs, radiologic techs, and pharmacy techs who must decode unfamiliar terms on the job Healthcare administrators and analysts -- need to read charts, claims, and clinical documentation without a clinical background Returning adult learners -- need an asynchronous, self-paced on-ramp into medicine that meets Quality Matters Higher Ed Rubric (7th ed.) standards Career-changers -- exploring a move into healthcare and want a rigorous, college-level foundation before committing to a degree program Anyone -- who wants to read their own lab results, discharge summaries, and patient portals without Googling every other word",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**13-Module Curriculum** -- A structured 800-point course covering word parts and decoding, body organization, all major organ systems, pharmacology, imaging, and reading a full medical record. Each module ships with objectives, a reading, a graded assignment, and an instructor reference standard.\n\n**AI Tutor (Suffix-First Decoding)** -- A Socratic tutor backed by Claude Sonnet 4.5, prompted as Dr. Hsu's voice. Refuses to write assignments, decomposes unfamiliar terms suffix -> prefix -> root, and distinguishes literal etymology from current clinical meaning.\n\n**One-Round Draft Feedback** -- Students submit a draft per assignment and receive a single round of formative feedback structured into five fixed sections: prompt-fit, argument structure, weak reasoning, what's missing, and what to revise first. Never rewrites the student's work.\n\n**Per-Module AI Actions** -- One-click generation of a Study Guide (key terms, core ideas, pitfalls, self-check questions), a Tutorial (numbered step-by-step walkthrough), a Podcast script (2--3 minute audio explainer), or a plain-English Rewrite of the reading -- all calibrated to a first-time undergraduate with no biology background.\n\n**Instructor Reference Standards** -- Every assignment is paired with a hidden model response that the AI uses to calibrate feedback without ever quoting, paraphrasing, or comparing against it.\n\n**Quality Matters--Aligned Course Shell** -- Pages for Start Here, Syllabus, Modules, General Tutor, Assessments, Support, Accessibility, and a System Diagnostic, all wired to the Quality Matters Higher Ed Rubric (7th ed.).\n\n**Persistent Progress & Drafts** -- All student work, drafts, feedback, and tutor conversations persist in PostgreSQL via Drizzle ORM, keyed to the signed-in student.\n\n**General Tutor Chat** -- A standalone conversational interface for questions outside a specific module -- anatomy review, decoding practice, or clarifying a clinical scenario -- with full persistent history.\n\n**System Diagnostic** -- One-click self-check that verifies the API server, the database, and the Anthropic AI integration are all operational. Color-coded pass/warn/fail.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It actually teaches, instead of doing the work** -- The AI Tutor is explicitly prompted to refuse to write assignments, draft theses, or supply final answers. It asks the next question instead of giving the next sentence.\n\n**Suffix-first decoding, not memorization** -- Students learn a repeatable procedure for unfamiliar terms (identify the suffix, then prefix, then root, then assemble), rather than flashcard drilling.\n\n**Literal vs. clinical meaning is taught explicitly** -- Terms like hypertension, myocardial infarction, or hypoxia are decoded from their roots AND distinguished from their current clinical usage -- a distinction most intro courses skip.\n\n**Instructor-calibrated AI feedback** -- Every draft-feedback pass is silently calibrated against a hidden instructor reference standard, so feedback quality doesn't drift with the model's mood.\n\n**One round of feedback, not infinite** -- Mirrors a real classroom: students get one pre-submission feedback pass and must integrate it themselves. No infinite-loop AI rewriting.\n\n**Built on a single coherent course text** -- Not a chatbot bolted onto a generic LMS. The curriculum, the tutor's voice, the reference standards, and the assessments are all derived from one open-source course text by Dr. Margaret Hsu, MD.\n\n**Asynchronous and accessible by default** -- Quality Matters--aligned, screen-reader-friendly, keyboard-navigable, and self-paced -- designed for working adults and non-traditional students.\n\n**Domain-locked AI** -- Every prompt in the system (tutor, draft feedback, study guide, tutorial, podcast, rewrite) is constrained to medical-terminology framing. The model will not drift into off-topic essay help.",
      },
    ],
  },
  "Information Technology 101": {
    emoji: "💻",
    tagline:
      "An AI-Tutored, College-Level Survey of the IT Stack, Networks, Cloud, Cybersecurity, and Modern Software Practice (CIS 1001)",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Introduction to Information Technology is a fully online, asynchronous college-level course platform built around 14 sequenced modules -- six discussion posts, five analytical essays, two term-paper milestones, and one careers retrospective. It pairs an open-source course text with a built-in AI Tutor (Anthropic Claude Sonnet 4.5) that speaks in the voice of the instructor of record, Dr. Lawrence Dodge, asks Socratic questions, and gives formative feedback on student work.\n\nUnlike a generic LMS that simply hosts PDFs and a quiz engine, this platform enforces sequential progress, autosaves drafts, screens every submission for AI authorship with GPTZero, and runs a one-click end-to-end self-diagnostic that verifies the database, the AI grader, and the full student flow are working before a single student logs in. Every module has a verbatim background reading, an explicit assignment prompt, and a model response -- no placeholder content, no hedging, no filler.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduate students** -- need a structured, self-paced introduction to information technology that covers the full IT stack rather than a single tool or vendor\n\n**Adult learners and career-changers** -- need a credit-bearing IT survey they can complete asynchronously around work, with feedback that actually engages with their writing\n\n**Community college and university instructors** -- need a turnkey CIS 1001 course shell built to the Quality Matters Higher Ed Rubric (7th ed.) that they can adopt or fork\n\n**Bootcamp and corporate training programs** -- need a rigorous foundations course to sit underneath role-specific technical training\n\n**Self-directed learners** -- need a Socratic tutor, not an answer key, and want to be pushed to defend their own architectural and operational reasoning\n\n**Anyone** -- who wants to understand how hardware, operating systems, networks, databases, the cloud, cybersecurity, and AI actually fit together in a real IT environment",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**14-Module Sequential Curriculum** -- Six discussions, five essays, a term-paper outline, and a full term paper, covering the IT stack, operating systems, TCP/IP, cloud (IaaS/PaaS/SaaS), databases (relational vs. NoSQL), cybersecurity, programming-language trade-offs, the SDLC, web architecture, AI in IT, ITSM, and the future of IT careers. Each module unlocks only after the previous one is submitted.\n\n**AI Tutor in the Instructor's Voice** -- Anthropic Claude Sonnet 4.5 is configured to teach in the voice and Socratic style of Dr. Lawrence Dodge. Per-module conversations are persisted, so the tutor remembers what the student has already worked through. The tutor asks questions and gives formative feedback -- it never writes the assignment.\n\n**General Tutor** -- A separate course-wide tutor conversation for cross-cutting questions that don't belong to any single module (\"how do operating systems and networks relate?\", \"what should I pick for my term paper?\").\n\n**Verbatim Background Readings** -- Every module ships with the full course-book reading, the exact assignment prompt, and a model response, all extracted verbatim from the source course book. No \"lorem ipsum,\" no AI-written filler.\n\n**Autosaved Drafts** -- Student work-in-progress is upserted to the server on every save, so a closed tab, dropped Wi-Fi, or browser crash never costs work.\n\n**Sequential Gating** -- The submissions API enforces module order at the server, not just the client. Out-of-order submission attempts are rejected with HTTP 403, so students cannot accidentally skip ahead.\n\n**GPTZero AI-Authorship Screening** -- Every submission is fire-and-forget scored by GPTZero in the background, surfacing an AI-likelihood score alongside the instructor's view. Honest engagement with AI use, not blanket prohibition.\n\n**Process-Forensics Baseline** -- The platform captures a lightweight per-student writing-process baseline so unusually anomalous submissions can be flagged for review.\n\n**Integrity Acknowledgement** -- Before submitting any work, students must explicitly acknowledge the course's AI and academic-integrity policy, with the acknowledgement timestamped to the user record.\n\n**Accommodations Flag** -- A per-student accommodation flag is recorded in the database and respected throughout the grading pipeline, with no awkward second login.\n\n**Assessments Dashboard** -- A single screen lists every submission across every module with status, score, AI-detector verdict, and timestamp -- no clicking through 14 separate pages to see where a student stands.\n\n**Printable Syllabus** -- The full syllabus (course description, learning outcomes, grading breakdown, support, accessibility, integrity policy) renders to a clean, printable page for institutional records.\n\n**Accessibility-First UI** -- Built to conform with WCAG 2.1 Level AA: keyboard navigation, semantic HTML, sufficient color contrast, and screen-reader-friendly landmarks throughout.\n\n**One-Click System Diagnostic** -- A dedicated /diagnostic page runs 13 system checks (Postgres reachability, curriculum integrity, Anthropic key + live ping, GPTZero key + live AI-detector call, submission round-trip, draft round-trip, progress recompute, tutor critique generation, full teardown) in roughly 5 seconds. Color-coded pass/fail with the raw detail of every failure.\n\n**End-to-End Functional Walk** -- A second diagnostic mode actually drives the live API as a synthetic student over loopback HTTP: sign in -> integrity ack -> open tutor -> autosave draft -> sequential-gating probe (must 403) -> submit module 1 -> module-detail round-trip -> assessments list -> cleanup. Exercises the real Express middleware stack -- cookies, sessions, validation, route handlers, DB writes, response serialization.\n\n**Self-Cleaning Diagnostics** -- Both diagnostic runs use a synthetic diagnostic@beta.local / bot+...@diagnostic.test student and delete everything they inserted via FK cascade at the end. No real student data is touched.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It is a course, not a course shell** -- Every module has real, verbatim reading content, a real assignment, and a real model response. The platform ships ready to teach on day one, not as an empty template waiting to be filled.\n\n**The AI Tutor refuses to do the work** -- The tutor is explicitly configured to ask Socratic questions and give formative feedback, not to write the discussion post or the essay for the student. Honest pedagogy, not assignment-laundering.\n\n**Sequential gating is enforced server-side** -- Most online courses gate progression in the UI, which is trivially bypassable. Here the submissions endpoint itself rejects out-of-order writes with HTTP 403, and the diagnostic verifies that on every run.\n\n**AI-authorship screening is built in, not bolted on** -- Every submission is automatically scored by GPTZero in the background, without slowing the student's submit flow. The result is stored alongside the grade.\n\n**The diagnostic is comprehensive and downloadable** -- One click verifies the database, both AI providers (Anthropic + GPTZero) with live calls, the curriculum, and the entire student workflow end-to-end. Results are color-coded pass/warn/fail and the raw JSON is exportable for support tickets.\n\n**Workload-driven IT reasoning** -- The course consistently asks students to reason from actual workload requirements (a real application, a real threat, a real project) rather than from vendor marketing or fashion. The learning outcomes are written the same way.\n\n**Built to a recognized standard** -- The course shell is designed to the Quality Matters Higher Ed Rubric (7th ed.) and the user interface conforms to WCAG 2.1 Level AA, so institutional adoption does not require a separate accessibility or pedagogy audit.\n\n**Open-source course text, transparent voice** -- The instructor of record (Dr. Lawrence Dodge) is named, the AI model powering the tutor (Anthropic Claude Sonnet 4.5) is named, and the course book is open-source. No anonymous \"experts,\" no black-box grading.\n\n**Three independent artifacts, one deployment** -- The repository is a pnpm monorepo: the IT course web app, a sibling Pre-Algebra 100 web app, and a shared Express API server with its own diagnostic. The same architecture supports adding additional courses without rewriting the backend.",
      },
    ],
  },
  "Career Management": {
    emoji: "💼",
    tagline:
      "A fully online, asynchronous college-level course on the full arc of career management -- from self-assessment and resumes through networking, interviews, negotiation, professionalism, performance management, transitions, and long-term planning.",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Career Management 101 is a 14-module written course built around a hard line: every word a student turns in must be their own. The course covers the practical mechanics of building and managing a career -- self-assessment, career exploration, the resume, cover letters, networking, the interview, job-search strategy, salary negotiation, workplace professionalism, performance management, career transitions, long-term planning, and a two-stage term paper -- and it pairs that content with a real integrity stack designed to make AI ghostwriting detectable rather than merely discouraged.\n\nUnlike a typical online course that grades final products and assumes the student wrote them, Career Management 101 is built on the assumption that AI is freely available and that integrity has to be verified, not trusted. Every submission is checked for AI-generated text in real time, and the student's own writing process is fingerprinted across submissions so that ghostwriting and last-minute paste-ins surface as anomalies. The system is explicit when something looks wrong, and auditable when an instructor needs to review.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduates entering the job market** -- need a structured walk through every stage of career management, from first self-assessment through long-term planning, with assignments that produce real artifacts they can actually use.\n\n**Career changers and re-entrants** -- need to rebuild their resume, cover letter, networking script, and interview answers around a specific target role, not generic templates.\n\n**Adult learners working full time** -- need a fully asynchronous course they can complete on their own schedule, with sequential gating that keeps the work in order.\n\n**Instructors and institutions concerned about AI cheating** -- need a course where AI use is detected at submission time, where the writing process is monitored, and where the integrity stack is auditable rather than aspirational.\n\n**Anyone who wants the actual craft, not platitudes** -- prompts demand a specific real job posting, a specific real person to network with, a specific real negotiation conversation, and grade the answer on whether it would actually work.",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**14-Module Written Curriculum** -- Six discussions, five essays, one long-term planning discussion, a term paper outline, and a full term paper. Total 800 points. Every assignment targets a concrete real-world artifact (a real bullet for a real posting, a real outreach message to a real person, a real negotiation script for a real offer).\n\n**Sequential Gating** -- Modules unlock in curriculum order on the server. The student cannot submit module N until every prior module has a submission on record. The check is enforced at the route handler, not the UI, so it cannot be bypassed by hand-crafted requests.\n\n**Draft Workshop (One-Shot AI Feedback)** -- Students can submit a single draft per module and receive structured formative feedback (does it answer the prompt, is the structure clear, where is reasoning weak, what is missing, what to revise first). The draft locks after one round to prevent the AI from being used as a ghostwriter.\n\n**Integrity Canvas** -- The final-submission editor logs keystrokes, blocks paste events, and runs the text through GPTZero in real time as the student writes. Sentence-level highlighting and a cumulative-red warning surface any AI-flagged material before the student hits submit.\n\n**Two-Layer AI Detection** -- Every submission gets a synchronic check (GPTZero AI-detection score and class) and a diachronic check (process-forensics analyzer that compares the writing process against the student's own baseline, which freezes after their second submission).\n\n**Process-Forensics Analyzer** -- Eleven features extracted from the keystroke stream (typing rate, burstiness, pause distribution, deletion ratio, paste density, etc.) produce a per-submission score and a class (human, likelyAI, mixed). Anomalies relative to the student's frozen baseline are flagged separately from synchronic AI-detection hits.\n\n**Sequential Submission Pipeline** -- Submissions are stored with a cm: prefix in a shared submissions table so that a student's Career Management work is fully isolated from any other course they take on the same platform. Progress queries filter by prefix.\n\n**Live System Diagnostic** -- One-click self-check that verifies the database, the curriculum, the Anthropic and GPTZero API keys, a live Anthropic round-trip, a live GPTZero scoring call, the written submission pipeline, the progress filter, and cleanup. Color-coded pass/fail with per-check timing and detail.\n\n**End-to-End Functional Check** -- A second one-click button drives the live API over loopback HTTP, creating a synthetic bot+...@diagnostic.test student, walking the real student flow (sign in, list modules, sequential-gating probe that must return 403, submit module 1, module GET round-trip, progress recompute, logout), then deleting the student so Postgres FK-cascades every row the walk created. Runs in roughly two seconds on a warm server.\n\n**Admin Panel** -- Instructor view of every submission with AI score, AI class, process-forensics score, process-forensics class, flags, and the original keystroke log. Designed for audit, not just grading.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**Integrity is verified, not trusted** -- Most online courses grade the final artifact and assume the student wrote it. This one assumes they had AI sitting next to them the whole time, and is built to detect when they used it.\n\n**Two independent detectors, not one** -- GPTZero catches text that reads as AI. Process forensics catches text that was pasted in, written too fast, or written too clean relative to that student's own baseline. A submission has to clear both layers.\n\n**Per-student baseline, not a global threshold** -- The process-forensics analyzer freezes a baseline from each student's first two submissions, then compares everything after to that baseline. A fast typist isn't penalized for being a fast typist; a student who suddenly types four times faster than they did in week one is flagged.\n\n**The draft workshop won't write the assignment** -- Draft feedback is explicitly structural (\"the second paragraph doesn't address the prompt\") and never includes rewrites or suggested phrasings. The system has a copy of the reference standard but is instructed not to quote, paraphrase, or compare against it directly.\n\n**Sequential gating that actually gates** -- The lock is in the POST handler, so out-of-order submission attempts return HTTP 403 from the server, not a disabled button on the client. This is verified on every diagnostic run.\n\n**Diagnostics that exercise the real stack** -- The end-to-end check uses Node's fetch() against 127.0.0.1:$PORT so every step goes through the real Express middleware chain -- cookies, sessions, validation, route handlers, DB writes, response serialization. No mocking. No in-process shortcuts. A regression in any layer breaks the corresponding step.\n\n**Real cleanup, real FK cascade** -- The synthetic diagnostic student is deleted at the end of every functional run, and Postgres cascades every row they created. The diagnostic reports the actual cascaded row count, not a fabricated one. A previous run that crashed before cleanup is swept on the next run.\n\n**Written-only by design** -- No audio modules, no multiple-choice bubbles, no shortcuts. Every grade in the course is a graded piece of writing, and every piece of writing goes through the full two-layer integrity stack.\n\n**Built to be cloned** -- The integrity stack, the diagnostics, and the gating logic are course-agnostic. Cloning this app for another course is a curriculum swap, not a rebuild -- and the cloned course inherits the entire integrity-and-diagnostics chassis on day one.",
      },
    ],
  },
  "Food & Beverage Cost Control": {
    emoji: "🍳",
    tagline:
      "A College-Level Online Course in the Daily Operational Discipline of Restaurant and Hospitality Cost Control",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Food & Beverage Cost Control is a fully online, asynchronous college-level course (CUL/HOSP) delivered as a 15-module web app. Students work through the operational discipline of food and beverage cost control -- the cost-control mindset, food cost percentage and menu pricing, standardized recipes and yield, purchasing/receiving/storage controls, inventory valuation and turnover, labor cost control and scheduling, beverage cost control and pour standards, theft and waste and theoretical-vs-actual variance, menu engineering, break-even and contribution margin, budgeting and forecasting, POS data and the modern control environment, and the ethics of cost control -- culminating in a two-stage term paper (proposal + final).\n\nUnlike generic LMS shells that hide content behind clicks and bury feedback in rubric grids, this course is built around a strict operating principle: every reading is on-page and complete, every assignment specifies exactly what is expected, and every submission gets immediate, formative AI feedback in the voice of the instructor of record. No padding, no preamble, no \"please see the syllabus.\"",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Culinary and hospitality students** -- need a rigorous, transferable grounding in the numbers side of running a kitchen or beverage program before they hit a real P&L.\n\n**Working line cooks, bartenders, and sous chefs** -- need to understand the math behind food cost, pour cost, labor cost, and variance so they can move into a chef or manager seat.\n\n**New restaurant managers and owner-operators** -- need a structured walk through purchasing, inventory, labor, menu engineering, and break-even without buying a $200 textbook.\n\n**Hospitality program instructors** -- need a fully built, Quality Matters-aligned course shell they can adopt or adapt, with model responses already written.\n\n**Career-changers entering food service operations** -- need to know what an actually competent F&B operator thinks about every day, not a flattering summary of the field.",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**15-Module Verbatim Curriculum** -- Eight discussions, six essays, and a term paper (proposal + final), every word of reading, assignment, and model response delivered on-page. Sequential unlock: students cannot skip ahead until the previous module is submitted.\n\n**AI Tutor in the Instructor's Voice** -- Per-module Socratic tutor (Anthropic Claude Sonnet 4.5) that asks questions, probes reasoning, and gives formative feedback without ever writing the assignment for the student. Refuses ghost-writing requests by design.\n\n**General Tutor** -- A course-wide conversational tutor for cross-cutting questions about cost control, the discipline, or how the modules fit together -- distinct from the per-module tutor that stays narrowly on the current assignment.\n\n**AI Grader with Rubric-Aligned Feedback** -- Submissions are auto-graded against the per-assignment rubric and return structured formative feedback (strengths, gaps, revision suggestions). Final grade is reserved for the instructor; AI output is feedback, not a verdict.\n\n**GPTZero AI-Writing Detection** -- Every submission is scored for AI-generated content before grading. Results are surfaced to the student and stored for the instructor's review, so academic integrity is handled in the same pipeline as the work itself.\n\n**Draft Autosave** -- Every keystroke in an assignment editor is autosaved server-side. Students can close the tab mid-essay and resume on another device without losing a word.\n\n**Progress Gating & Unlocks** -- Completed modules are tracked per student; the next module unlocks only on submission of the previous one. Admin override is available for instructor previews.\n\n**Term Paper Workflow** -- Two-stage capstone: a structured proposal module followed by the full term paper, each with its own rubric, tutor, and grader. Modeled on graduate-style writing supervision rather than a single end-of-course dump.\n\n**Assessments Dashboard** -- One screen showing every module, its rubric weight, submission status, AI score, and instructor status -- for both students tracking themselves and instructors auditing a cohort.\n\n**System Diagnostic** -- One-click self-check that exercises the database, curriculum loader, AI grader, draft autosave, submission pipeline, progress recompute, and tutor. Returns a pass/warn/fail report with downloadable detail.\n\n**Quality Matters-Aligned Course Shell** -- Built to the Quality Matters Higher Ed Rubric (7th ed.). Alignment between objectives, readings, assignments, and rubrics is explicit and surfaced on the syllabus page, not hidden in a course-design document.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**The reading is on the page** -- Every module's reading is delivered in full on-screen, not linked out to a PDF or a publisher portal. Students never have to leave the course to do the work.\n\n**Model responses are written, not promised** -- Every assignment ships with a full instructor-quality model response and an explanation of why it is a model response. Students see the target, not just a rubric.\n\n**The AI tutor will not write your paper** -- The Socratic tutor is explicitly constrained from generating submittable prose. It asks, probes, and reflects; it does not produce. Academic integrity is enforced at the prompt layer, not just by detection.\n\n**AI feedback is immediate, the grade is not** -- Submissions return formative AI feedback in seconds so the student can revise; the human instructor retains the grading authority. The platform refuses to pretend that AI grading is the same thing as instructor judgment.\n\n**One shared API server, multiple courses** -- The same hardened backend (auth, drafts, submissions, grader, tutor, GPTZero, diagnostic) serves every course on the platform. Adding a new course is a curriculum file and a frontend shell, not a new system.\n\n**Built to the Quality Matters standard** -- Objectives, readings, assignments, and rubrics are aligned 1:1 and the alignment is visible to the student. The course passes the Higher Ed rubric on the surface -- not on a hidden design map.\n\n**No fake content** -- No lorem ipsum, no \"Module 1 content coming soon,\" no placeholder rubrics. Every byte of curriculum is real, instructor-authored material.",
      },
    ],
  },
  "Business Ethics": {
    emoji: "🎓",
    tagline:
      "An Online, Socratic, AI-Tutored College Course in Applied Business Ethics",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Business Ethics 101 is a fully online, asynchronous college-level course that walks students through the central questions of contemporary business ethics -- from the three foundational frameworks (consequentialism, deontology, virtue ethics) through whistleblowing, advertising, workplace rights, corruption, environmental responsibility, insider trading, executive compensation, discrimination, and the ethics of AI and automation. The course is 14 modules totalling 800 points, culminating in a term paper outline and final term paper.\n\nUnlike a typical LMS module that hands students a PDF and a discussion board, Business Ethics 101 is built around an embedded AI Tutor that teaches in the instructor's Socratic voice. The tutor asks probing questions, pushes back on weak reasoning, and offers counterarguments -- but it is system-prompted to refuse to write the student's work. Every submission is composed in a monitored canvas with live AI-likelihood scoring, so academic integrity is built in rather than bolted on.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduate students** -- need a rigorous, fully online introduction to business ethics that does not assume prior coursework in ethics or business\n\n**Working professionals and MBA candidates** -- need a self-paced refresher in the ethical frameworks behind real-world business decisions\n\n**Instructors and course designers** -- need a Quality-Matters-aligned reference implementation of an AI-tutored, integrity-monitored online course\n\n**Compliance and HR teams** -- need structured, primary-source-driven ethics training that goes deeper than a click-through module\n\n**Anyone** -- who wants to think clearly about the ethical questions that arise in commerce, employment, and corporate life",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**Socratic AI Tutor** -- Anthropic Claude Sonnet 4.5 teaches in the instructor's voice. Asks probing questions, pushes back on shallow answers, supplies counterarguments. System-prompted to refuse to write the student's assignment, regardless of how the request is phrased.\n\n**Per-Module Context Injection** -- Every tutor conversation is loaded with the full module: objectives, verbatim reading, assignment prompt, and an instructor reference standard the tutor uses for calibration but never quotes to the student.\n\n**Draft Workshop with One-Round Formative Feedback** -- Students draft in an open workspace, request one round of structured Markdown feedback (five fixed H2 sections), and then move to the monitored submission canvas. Drafts lock after feedback to prevent endless polish cycles.\n\n**Monitored Submission Canvas** -- Final submissions are typed into a paste-disabled canvas. Cut/copy/rearrange of self-typed text is allowed. The complete keystroke history is logged for instructor replay.\n\n**Live GPTZero Scoring** -- A traffic-light bar shows the current AI-likelihood score as the student writes. Flagged submissions are not blocked, but the flag is sent to the instructor with the submission and stored alongside the keystroke log.\n\n**AI Action Suite (per module)** -- One-click generation of: a concise study guide, a step-by-step tutorial, a 2-3 minute audio podcast script, a clarity-rewrite of the reading, and a Socratic \"read my draft\" critique. Each action uses a purpose-built system prompt.\n\n**Critique-the-Mediocre-Answer Exercise** -- The tutor can generate a deliberately B-/C+ answer to any assignment for the student to critique, training the student to recognize unsupported claims, conflated frameworks, and missing counterarguments.\n\n**Sequential Module Unlock** -- Modules unlock as the previous one is submitted. Admin override (?admin=true) is available for instructor preview.\n\n**Progress and Assessments Tracking** -- Students see what they've submitted, what's locked, and their running point total against the 800-point scale.\n\n**Self-Paced, No Late Penalty** -- Open-enrollment / self-paced design with resubmission allowed. Most-recent submission counts.\n\n**Quality Matters-Aligned Course Shell** -- Built to the Quality Matters Higher Ed Rubric (7th ed.): explicit syllabus, learning outcomes, technical requirements, netiquette, accessibility, academic integrity, and support pages.\n\n**Accessibility-First UI** -- WCAG 2.1 AA target. Radix UI primitives, semantic HTML, full keyboard navigability, visible focus rings, screen-reader tested in NVDA / JAWS / VoiceOver. Reflows to 320 px.\n\n**One-Click System Diagnostic** -- A single unauthenticated endpoint runs 13 checks across database connectivity, curriculum integrity (14 modules / 800 pts), Anthropic and GPTZero live pings, and full draft / submission / tutor round-trips. Pass/fail with timing.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**The tutor will not write your paper** -- Most \"AI-tutored\" courses are thin wrappers around a chatbot that will happily do the assignment. This one is system-prompted to refuse, and pivots to Socratic questions if asked.\n\n**Integrity is structural, not policy-only** -- Paste-disabled canvas, live AI-likelihood scoring, and full keystroke replay are built into the submission flow. There is nothing for the student to read, agree to, and ignore.\n\n**Reading, assignment, and reference standard are all in the prompt** -- The tutor isn't guessing what the module is about. It has the verbatim reading, the verbatim assignment, and an instructor reference standard for calibration on every turn.\n\n**One round of formative feedback, then commit** -- Students get exactly one structured critique on a draft, then move to the monitored canvas. No endless feedback loops, no \"rewrite this for me\" exploits.\n\n**Course content is open and verbatim** -- All readings are open educational resources authored by the instructor and embedded directly in each module. No textbook to purchase, no paywall, no third-party reading platform.\n\n**Frameworks before slogans** -- Every module is anchored in consequentialism, deontology, or virtue ethics (or a deliberate combination), not in vague appeals to \"doing the right thing.\"\n\n**Self-paced without being shapeless** -- Modules unlock sequentially, the term paper is broken into an Outline assignment and a final Paper assignment, and the AI Tutor surfaces what's next at every turn.\n\n**One diagnostic tells you if it's healthy** -- A single endpoint exercises the database, the curriculum, the AI provider, the AI-detection provider, and the full submission and tutor pipelines end-to-end.",
      },
    ],
  },
  "U.S. History II": {
    emoji: "🇺🇸",
    tagline:
      "A fully online, asynchronous college-level survey of United States history from Reconstruction to the present",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "U.S. History II (HIST 152) is a 14-module, 800-point introductory history course delivered as a self-contained web app. Students read a unit of the course text, complete the assignment (a discussion post, a structured essay, or a research-paper deliverable), receive Socratic formative feedback from an AI tutor that speaks for the instructor, and submit graded work -- all in one place. The course text was authored by Dr. Lawrence Dodge and is used here as the canonical reading.\n\nUnlike a generic chatbot wrapper or a passive LMS, this app is built around a strict pedagogical principle: the AI tutor never writes the student's work, never bypasses the assignment, and never softens the rubric. It asks better questions, surfaces weak reasoning, and flags AI-generated prose before submission. Every module ships with the instructor's own model response so students can see what an A-grade answer actually looks like.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**First-year undergraduates** -- need a rigorous but humane introduction to modern American history without lectures or fixed class times\n\n**Returning and adult learners** -- need a fully asynchronous course they can complete around work and family obligations\n\n**Homeschool and dual-enrollment students** -- need a college-level survey with a published syllabus, model responses, and a real research-paper track\n\n**Self-directed readers** -- want to work through the Civil War's unresolved questions, Reconstruction and its defeat, the Gilded Age, the new immigration, Populism and Progressivism, empire, the world wars, the New Deal, the Cold War, the civil rights movement, and the crisis of authority from Vietnam through Watergate with structured prompts and feedback\n\n**Instructors and TAs** -- want a reference implementation of an AI tutor that critiques without ghostwriting, plus a built-in originality check\n\n**Anyone** -- who wants to understand how the modern United States actually came to be, instead of a flattering summary of it",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**14-Module Curriculum** -- 7 discussion units (50 pts each), 5 long-form essays (50 pts each), a Term Paper Outline (100 pts), and a final Term Paper (100 pts) -- 800 points total. Every module has objectives, a primary reading, an assignment prompt, and an instructor-authored model response.\n\n**Socratic AI Tutor** -- Conversational interface backed by Anthropic Claude Sonnet 4.5 that speaks for the instructor of record. Asks probing questions, names specific weaknesses in a draft, and points to the relevant section of the course text. Refuses to write the assignment for the student -- always.\n\n**Inline Draft Critique** -- One-click \"critique my draft\" action against the active module's rubric. Returns targeted feedback on thesis clarity, evidence, historical accuracy, and structure without rewriting the prose.\n\n**Autosaving Drafts** -- Every keystroke in the assignment editor is persisted to the database per student per module, so work survives tab closes, browser crashes, and device switches.\n\n**Submission + Gradebook** -- Submitted work is stored with timestamp, word count, and module reference. Progress is recomputed automatically and surfaced as a per-module completion state and a running point total out of 800.\n\n**Sequential Gating** -- The server enforces module order on every submission: a student cannot submit module N until every prior module has been submitted. The gate is enforced in the API, not just the UI, so it cannot be bypassed by anyone with a valid session.\n\n**GPTZero Originality Check** -- Every submission is screened by GPTZero's AI-detector API before it counts. Students and instructors see the AI-probability score and class label (human / mixed / ai) attached to each submission.\n\n**Instructor Model Responses** -- Each of the 14 modules ships with the instructor's own model response and a \"Why This Is a Model\" rubric breakdown, so students see the target before they write -- not after they're graded.\n\n**Persistent Tutor Conversations** -- Tutor threads are saved per student per module. Students can return to a prior conversation and continue where they left off; instructors can audit the full transcript.\n\n**Accessibility First** -- Semantic HTML, keyboard-navigable nav and forms, sufficient color contrast, screen-reader-friendly labels, and a dedicated Accessibility page that documents the commitments and the contact route for accommodations.\n\n**System Diagnostic** -- One-click self-check that verifies the database connection, the Anthropic AI integration, the GPTZero API key, curriculum integrity (14 modules / 800 pts), submission + draft round-trips, progress recompute, and a live tutor critique. Pass/fail per check with timings and detail strings -- ideal for instructor sanity-checks and post-deploy verification.\n\n**End-to-End Functional Check** -- A second one-click diagnostic that walks the real HTTP API exactly as a student would: sign in, acknowledge integrity, open the tutor, autosave a draft, probe the sequential gate (must return 403), submit module 1, and read the submission back. Creates a synthetic student row that is torn down at the end via FK cascade, so it leaves zero residue in the database.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It is a course, not a chatbot** -- The product is a 14-module, 800-point survey with a published syllabus, real rubrics, and a research-paper track. The AI is a tutor inside the course, not the course itself.\n\n**The tutor never ghostwrites** -- The system prompt and the UI both refuse to produce the student's submission. The tutor critiques, questions, and points to the reading -- it will not write the essay for you, ever.\n\n**Model responses are the instructor's own** -- Every module's model response was authored by Dr. Lawrence Dodge as part of the source text. Students see exactly what the instructor considers an A-grade answer.\n\n**Originality is enforced, not assumed** -- GPTZero runs on every submission as a first-class part of the grading pipeline, not a bolted-on plugin. Scores are visible to both the student and the instructor.\n\n**Module order is enforced on the server** -- Sequential gating lives in the API, not in the UI. A student cannot skip ahead by hitting the endpoint directly; the gate is part of the data contract.\n\n**Two diagnostics, not one** -- The system check verifies every external dependency and pure-function path; the end-to-end check walks the real HTTP stack as a student. Either one is one click; together they make a post-deploy smoke test trivial.\n\n**The chassis is course-agnostic** -- The integrity stack, the tutor, the autosave, the gating, the originality check, and the two diagnostics are all generic. Swapping in a different course is a content edit (one curriculum file on the client, one on the server) -- the platform doesn't change.",
      },
    ],
  },
  "U.S. History I": {
    emoji: "🇺🇸",
    tagline:
      "A fully online, asynchronous college-level survey of United States history from pre-Columbian America through the eve of the Civil War",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "U.S. History I (HIST 151) is a 14-module, 800-point introductory history course delivered as a self-contained web app. Students read a unit of the course text, complete the assignment (a discussion post, a structured essay, or a research-paper deliverable), receive Socratic formative feedback from an AI tutor that speaks for the instructor, and submit graded work -- all in one place. The course text was authored by Dr. Lawrence Dodge and is used here as the canonical reading.\n\nUnlike a generic chatbot wrapper or a passive LMS, this app is built around a strict pedagogical principle: the AI tutor never writes the student's work, never bypasses the assignment, and never softens the rubric. It asks better questions, surfaces weak reasoning, and flags AI-generated prose before submission. Every module ships with the instructor's own model response so students can see what an A-grade answer actually looks like.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**First-year undergraduates** -- need a rigorous but humane introduction to early American history without lectures or fixed class times\n\n**Returning and adult learners** -- need a fully asynchronous course they can complete around work and family obligations\n\n**Homeschool and dual-enrollment students** -- need a college-level survey with a published syllabus, model responses, and a real research-paper track\n\n**Self-directed readers** -- want to work through pre-Columbian America, European contact, the colonial period, the Revolution, the early republic, Jacksonian democracy, westward expansion, slavery, and the road to civil war with structured prompts and feedback\n\n**Instructors and TAs** -- want a reference implementation of an AI tutor that critiques without ghostwriting, plus a built-in originality check\n\n**Anyone** -- who wants to understand how the United States actually came to be, instead of a flattering summary of it",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**14-Module Curriculum** -- 7 discussion units (50 pts each), 5 long-form essays (50 pts each), a Research Paper Proposal (100 pts), and a final Research Paper Assignment (100 pts) -- 800 points total. Every module has objectives, a primary reading, an assignment prompt, and an instructor-authored model response.\n\n**Socratic AI Tutor** -- Conversational interface backed by Anthropic Claude Sonnet 4.5 that speaks for the instructor of record. Asks probing questions, names specific weaknesses in a draft, and points to the relevant section of the course text. Refuses to write the assignment for the student -- always.\n\n**Inline Draft Critique** -- One-click \"critique my draft\" action against the active module's rubric. Returns targeted feedback on thesis clarity, evidence, historical accuracy, and structure without rewriting the prose.\n\n**Autosaving Drafts** -- Every keystroke in the assignment editor is persisted to the database per student per module, so work survives tab closes, browser crashes, and device switches.\n\n**Submission + Gradebook** -- Submitted work is stored with timestamp, word count, and module reference. Progress is recomputed automatically and surfaced as a per-module completion state and a running point total out of 800.\n\n**Sequential Gating** -- The server enforces module order on every submission: a student cannot submit module N until every prior module has been submitted. The gate is enforced in the API, not just the UI, so it cannot be bypassed by anyone with a valid session.\n\n**GPTZero Originality Check** -- Every submission is screened by GPTZero's AI-detector API before it counts. Students and instructors see the AI-probability score and class label (human / mixed / ai) attached to each submission.\n\n**Instructor Model Responses** -- Each of the 14 modules ships with the instructor's own model response and a \"Why This Is a Model\" rubric breakdown, so students see the target before they write -- not after they're graded.\n\n**Persistent Tutor Conversations** -- Tutor threads are saved per student per module. Students can return to a prior conversation and continue where they left off; instructors can audit the full transcript.\n\n**Accessibility First** -- Semantic HTML, keyboard-navigable nav and forms, sufficient color contrast, screen-reader-friendly labels, and a dedicated Accessibility page that documents the commitments and the contact route for accommodations.\n\n**System Diagnostic** -- One-click self-check that verifies the database connection, the Anthropic AI integration, the GPTZero API key, curriculum integrity (14 modules / 800 pts), submission + draft round-trips, progress recompute, and a live tutor critique. Pass/fail per check with timings and detail strings -- ideal for instructor sanity-checks and post-deploy verification.\n\n**End-to-End Functional Check** -- A second one-click diagnostic that walks the real HTTP API exactly as a student would: sign in, acknowledge integrity, open the tutor, autosave a draft, probe the sequential gate (must return 403), submit module 1, and read the submission back. Creates a synthetic student row that is torn down at the end via FK cascade, so it leaves zero residue in the database.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It is a course, not a chatbot** -- The product is a 14-module, 800-point survey with a published syllabus, real rubrics, and a research-paper track. The AI is a tutor inside the course, not the course itself.\n\n**The tutor never ghostwrites** -- The system prompt and the UI both refuse to produce the student's submission. The tutor critiques, questions, and points to the reading -- it will not write the essay for you, ever.\n\n**Model responses are the instructor's own** -- Every module's model response was authored by Dr. Lawrence Dodge as part of the source text. Students see exactly what the instructor considers an A-grade answer.\n\n**Originality is enforced, not assumed** -- GPTZero runs on every submission as a first-class part of the grading pipeline, not a bolted-on plugin. Scores are visible to both the student and the instructor.\n\n**Module order is enforced on the server** -- Sequential gating lives in the API, not in the UI. A student cannot skip ahead by hitting the endpoint directly; the gate is part of the data contract.\n\n**Two diagnostics, not one** -- The system check verifies every external dependency and pure-function path; the end-to-end check walks the real HTTP stack as a student. Either one is one click; together they make a post-deploy smoke test trivial.\n\n**The chassis is course-agnostic** -- The integrity stack, the tutor, the autosave, the gating, the originality check, and the two diagnostics are all generic. Swapping in a different course is a content edit (one curriculum file on the client, one on the server) -- the platform doesn't change.",
      },
    ],
  },
  "Public Speaking": {
    emoji: "🎤",
    tagline:
      "A 14-Module Course Platform with Multi-Modal AI-Graded Submissions (Written, Multiple Choice, and Live Audio)",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Public Speaking 101 is a full course chassis that takes a student from foundational rhetoric through advanced delivery in 14 sequenced modules. Each module is bound to one of three submission modalities -- written response, 20-question multiple choice, or recorded audio -- and every submission is graded by a real backend pipeline, not a placeholder.\n\nUnlike generic LMS shells that just store text, Public Speaking 101 runs each submission through the appropriate verification stack: written responses are scored by GPTZero for AI-generated content, bubble quizzes are auto-scored server-side against an answer key, and audio submissions are uploaded to S3, transcribed by AssemblyAI, then graded against a delivery rubric by Claude Sonnet 4.5. Server-side sequential gating enforces module order; cross-tenant audio keys are rejected at the route level; and two independent diagnostics prove the entire stack works end-to-end on every click.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Students enrolled in a public speaking course** -- need a single place to submit written reflections, take comprehension quizzes, and record spoken exercises with structured feedback on each.\n\n**Instructors and curriculum designers** -- need a turn-key chassis where the 14-module sequence, bubble banks, and audio rubrics are already wired end-to-end without writing grading code.\n\n**Course operators running multiple cohorts** -- need per-student gating, isolated audio storage, and a one-click diagnostic that proves every external dependency is live.\n\n**Developers extending the chassis** -- need a clean three-modality reference implementation (HTTP submissions, S3 presigned uploads, background analysis jobs) that can be cloned to other subjects.\n\n**Anyone** -- who wants a working example of a multi-modal AI-graded learning app instead of a slide deck describing one.",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**14-Module Sequential Curriculum** -- The full course is encoded as typed module objects (d1, e1, d2, e2, d3, e3, d4, e4, d5, e5, d6, d8, tpp, tp) with a fixed 6 written / 4 bubble / 4 audio modality split. Module order is enforced server-side; premature submits return HTTP 403 with the list of missing prerequisites.\n\n**Written Modality (GPTZero-Backed)** -- Long-form text submissions are persisted immediately, then a background job sends the content to GPTZero. The submission row is updated in place with aiScore, aiClass, and aiStatus (pending -> completed | failed), so the student sees their submission instantly and the AI verdict streams in.\n\n**Multiple-Choice Modality (20-Question Bubble Quizzes)** -- Each of the 4 bubble modules has a 20-row answer bank in bubble_questions. Submissions arrive as an array of selected indices, are scored server-side against the correct indices, and the response returns bubbleScore / bubbleTotal plus per-question explanations. No client trust.\n\n**Audio Modality (Record -> Upload -> Transcribe -> Grade)** -- Browser records via MediaRecorder, calls /audio/upload-url to mint a per-student/per-module S3 presigned PUT, uploads the blob directly to S3, then posts {moduleId, key, durationSec} to create the submission. A background pipeline pulls the audio, transcribes it with AssemblyAI, scores it against a delivery rubric with Claude Sonnet 4.5, and writes the result to performance_analyses.\n\n**Sequential Gating** -- A single enforceGating() helper blocks any submission whose prior modules aren't all present in the student's submission history. Applied uniformly to written, bubble, and audio routes.\n\n**Cross-Tenant Key Authorization** -- Audio submissions verify that the supplied S3 key starts with the exact publicspeaking/{studentId}/{moduleId}/ prefix. Forged keys from another student's namespace return 403 before any DB write.\n\n**Per-Modality Submission UI** -- Module pages switch on module.modality and render the appropriate component: WrittenSubmission, BubbleSubmission, or AudioSubmission. Each renders its own results panel (AI verdict, score with explanations, transcript + rubric breakdown).\n\n**System Diagnostic (19-Check)** -- One-click self-check that verifies every external dependency is operational: database connectivity, Anthropic API, GPTZero, AssemblyAI, S3 HeadBucket, AWS credentials, curriculum integrity (14 modules, 6/4/4 split), and bubble bank completeness (80 rows). Color-coded pass/fail report with per-check timing.\n\n**End-to-End Walk Diagnostic (Loopback HTTP)** -- A second diagnostic spins up a synthetic student, walks the real user flow over loopback HTTP (sign in, list modules, attempt out-of-order submit -> 403, submit written, mint presigned audio URL, reject cross-tenant key -> 403, submit audio, submit bubble all-correct, verify progress, log out), then tears the student down via FK CASCADE. Proves the full HTTP stack works end-to-end on every click.\n\n**Session-Based Authentication** -- Cookie-backed sessions issued by /auth/login, validated on every protected route via requireStudent middleware, cleared by /auth/logout. The session round-trips through /auth/me for the frontend to hydrate.\n\n**Per-Student Progress Tracking** -- /publicspeaking/progress returns the list of completed module ids for the signed-in student, used by the curriculum sidebar to render locks, checkmarks, and the \"next module\" call-to-action.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**Three real modalities, not one with cosmetic variants** -- Most course platforms ship a single text-box submission and call multiple-choice \"interactive content.\" Public Speaking 101 has three genuinely distinct backend pipelines (GPTZero, server-side scoring, S3 + AssemblyAI + Claude) wired to three distinct frontend components.\n\n**Server enforces order, not the UI** -- Sequential gating lives in the route handlers, not the sidebar. A student can't bypass module locks by crafting a direct API request; the server checks prior submissions on every POST.\n\n**Audio keys are authorization-checked, not just trusted** -- The audio submission route refuses any S3 key that doesn't start with the student's own publicspeaking/{studentId}/{moduleId}/ prefix. A forged key returns 403 before the DB is touched.\n\n**Two diagnostics, not one** -- The system check verifies every external dependency is reachable in isolation. The end-to-end walk creates a real synthetic student and exercises the actual HTTP stack across all three modalities. Together they catch both \"the API key is wrong\" and \"the routes don't compose\" failure modes.\n\n**Synthetic test data is always torn down** -- The walk diagnostic's finally{} block deletes the synthetic student row; FK CASCADE removes their submissions and analyses. Zero persistent rows on a passing run, zero persistent rows on a failing run.\n\n**No mocked grading, no placeholder pipelines** -- Every grading path calls a real provider. If GPTZero is down, the written submission's aiStatus becomes failed and the user sees it. If AssemblyAI is down, the audio analysis row stays pending with an explicit error. The system never silently returns fake scores.\n\n**One-click clone target** -- The chassis was designed to be cloned to other subjects (philosophy, algebra, etc. -- all sibling artifacts in this monorepo). The curriculum file, bubble bank seeder, and diagnostic are parameterized to make this straightforward.\n\n**Live external integrations only** -- AssemblyAI for transcription, Claude Sonnet 4.5 for delivery rubrics, GPTZero for AI-content detection, AWS S3 for audio storage. No mocks, no in-memory shims, no if (process.env.NODE_ENV === \"test\") branches in the production code path.",
      },
    ],
  },
  "Western Civilization": {
    emoji: "🏛️",
    tagline:
      "A fully online, asynchronous college-level survey of the Western tradition -- from Greco-Roman antiquity and Judeo-Christian religion through the Renaissance, Enlightenment, revolutions, and the modern world",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Western Civilization 101 is a 15-module, 850-point introductory history course delivered as a self-contained web app. Students read a unit of the course text, complete the assignment (a discussion post, a structured essay, or a research-paper deliverable), receive Socratic formative feedback from an AI tutor that speaks for the instructor, and submit graded work -- all in one place. The course text was authored by Dr. Lawrence Dodge and is used here as the canonical reading.\n\nUnlike a generic chatbot wrapper or a passive LMS, this app is built around a strict pedagogical principle: the AI tutor never writes the student's work, never bypasses the assignment, and never softens the rubric. It asks better questions, surfaces weak reasoning, and flags AI-generated prose before submission. Every module ships with the instructor's own model response so students can see what an A-grade answer actually looks like.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**First-year undergraduates** -- need a rigorous but humane introduction to the Western canon without lectures or fixed class times\n\n**Returning and adult learners** -- need a fully asynchronous course they can complete around work and family obligations\n\n**Homeschool and dual-enrollment students** -- need a college-level survey with a published syllabus, model responses, and a real research-paper track\n\n**Self-directed readers** -- want to work through Greco-Roman antiquity, Christianity, the Renaissance, the Reformation, the Scientific Revolution, the Enlightenment, the revolutions, industrialization, and the twentieth century with structured prompts and feedback\n\n**Instructors and TAs** -- want a reference implementation of an AI tutor that critiques without ghostwriting, plus a built-in originality check\n\n**Anyone** -- who wants to understand how the modern West actually came to be, instead of a flattering summary of it",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**15-Module Curriculum** -- 8 discussion units (50 pts each), 5 long-form essays (50 pts each), a Research Paper Proposal (100 pts), and a final Research Paper Assignment (100 pts) -- 850 points total. Every module has objectives, a primary reading, an assignment prompt, and an instructor-authored model response.\n\n**Socratic AI Tutor** -- Conversational interface backed by Anthropic Claude Sonnet 4.5 that speaks for the instructor of record. Asks probing questions, names specific weaknesses in a draft, and points to the relevant section of the course text. Refuses to write the assignment for the student -- always.\n\n**Inline Draft Critique** -- One-click \"critique my draft\" action against the active module's rubric. Returns targeted feedback on thesis clarity, evidence, historical accuracy, and structure without rewriting the prose.\n\n**Autosaving Drafts** -- Every keystroke in the assignment editor is persisted to the database per student per module, so work survives tab closes, browser crashes, and device switches.\n\n**Submission + Gradebook** -- Submitted work is stored with timestamp, word count, and module reference. Progress is recomputed automatically and surfaced as a per-module completion state and a running point total out of 850.\n\n**GPTZero Originality Check** -- Every submission is screened by GPTZero's AI-detector API before it counts. Students and instructors see the AI-probability score and class label (human / mixed / ai) attached to each submission.\n\n**Instructor Model Responses** -- Each of the 15 modules ships with the instructor's own model response and a \"Why This Is a Model\" rubric breakdown, so students see the target before they write -- not after they're graded.\n\n**Persistent Tutor Conversations** -- Tutor threads are saved per student per module. Students can return to a prior conversation and continue where they left off; instructors can audit the full transcript.\n\n**Accessibility First** -- Semantic HTML, keyboard-navigable nav and forms, sufficient color contrast, screen-reader-friendly labels, and a dedicated Accessibility page that documents the commitments and the contact route for accommodations.\n\n**System Diagnostic** -- One-click self-check that verifies the database connection, the Anthropic AI integration, the GPTZero API key, curriculum integrity (15 modules / 850 pts), submission + draft round-trips, progress recompute, and a live tutor critique. Pass/fail per check with timings and detail strings -- ideal for instructor sanity-checks and post-deploy verification.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It is a course, not a chatbot** -- The product is a 15-module, 850-point survey with a published syllabus, real rubrics, and a research-paper track. The AI is a tutor inside the course, not the course itself.\n\n**The tutor never ghostwrites** -- The system prompt and the UI both refuse to produce the student's submission. The tutor critiques, questions, and points to the reading -- it will not write the essay for you, ever.\n\n**Model responses are the instructor's own** -- Every module's model response was authored by Dr. Lawrence Dodge as part of the source text. Students see exactly what the instructor considers an A-grade answer.\n\n**Originality is enforced, not assumed** -- GPTZero runs on every submission as a first-class part of the grading pipeline, not a bolted-on plugin. Scores are visible to both the student and the instructor.\n\n**Fully asynchronous, fully online** -- No live sessions, no fixed times, no proctoring software. Students work at their own pace; progress is reconstructed from submissions on every page load.\n\n**Single curriculum source of truth** -- The 15-module curriculum lives in one generated TypeScript file shared between the web app and the API server, parsed directly from the instructor's source document. There is no second copy to drift.\n\n**Honest infrastructure** -- External Neon Postgres for durable storage, Drizzle ORM with a real migration path, Anthropic via Replit AI Integrations, and a live diagnostic endpoint that pings every dependency. No mocks, no silent fallbacks -- if a dependency is down, the diagnostic says so.",
      },
    ],
  },
  "American Government": {
    emoji: "🏛️",
    tagline:
      "A Quality Matters-Aligned Online Course Shell for Introductory American Government",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "American Government 101 is a fully online, asynchronous undergraduate course shell built to the Quality Matters Higher Ed Rubric (7th ed.). It delivers a 14-module curriculum covering the constitutional foundations, institutions, behaviors, and policy outputs of the U.S. political system, with every assignment instrumented for AI-assisted instruction, originality verification, and rubric-based grading.\n\nUnlike a static LMS course pack, this shell is a live application: students read the module, converse with a module-scoped AI tutor grounded in the syllabus, draft and submit work through a single interface, and receive immediate rubric feedback plus an AI-text probability score on every submission. Instructors get a course that is identical in structure to the Philosophy 101, Business 101, and Algebra 101 sister shells, so workflows, grading conventions, and student expectations carry across the catalog.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduate students** -- need a structured, self-paced introduction to American government that unlocks module-by-module and provides on-demand tutoring\n\n**Adjuncts and full-time faculty** -- need a turn-key course shell that already meets QM standards, with no setup beyond enrollment and grade review\n\n**Instructional designers** -- need a reference implementation of QM-aligned module structure, learning outcomes mapping, and accessibility documentation\n\n**Department chairs** -- need a consistent 800-point, 14-module course that articulates cleanly with other 101-level offerings in the catalog\n\n**Accessibility coordinators** -- need a course that ships with a documented accessibility statement and support pathway out of the box\n\n**Anyone** -- who wants to study the U.S. political system in a course that treats writing, source use, and academic integrity as first-class concerns",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**14-Module Curriculum (800 pts)** -- Constitutional foundations, federalism, civil liberties and rights, Congress, the presidency, the bureaucracy, the judiciary, public opinion, media, parties, elections, interest groups, domestic policy, and foreign policy. Seven discussions, five essays, a term-paper outline, and a final term paper.\n\n**Module-Scoped AI Tutor** -- Every module ships with a dedicated tutor conversation grounded in that module's reading and prompt. Students can rehearse arguments, test interpretations, and clarify concepts before they write. Conversation history is persisted per student per module.\n\n**General Tutor** -- A course-wide tutor entry point for cross-cutting questions, study planning, and review across all 14 modules.\n\n**Originality Verification** -- Every submission is automatically scored by GPTZero for AI-generated text probability. Scores are stored alongside the submission and surfaced to graders.\n\n**Rubric-Based Auto-Feedback** -- Discussion posts and essays receive immediate rubric-aligned feedback against the assignment's learning outcomes, with per-criterion strengths and revision targets.\n\n**Sequential Module Unlock** -- Modules unlock on submission of the prior module, enforcing pacing without manual instructor intervention.\n\n**Quality Matters Alignment** -- Course mapping, measurable learning outcomes, assessment alignment, and accessibility documentation written to the QM Higher Ed Rubric, 7th edition.\n\n**Accessibility Statement & Support Pathway** -- Dedicated Accessibility and Support pages document accommodations, alternate formats, and the path to request institutional support.\n\n**Syllabus and Start-Here Onboarding** -- A guided Start Here page walks new students through registration, integrity acknowledgement, and the first module. The Syllabus page is the authoritative course contract.\n\n**Integrity Acknowledgement** -- Students record an explicit academic integrity acknowledgement before submitting work; the timestamp is persisted with their profile.\n\n**System Diagnostic** -- One-click self-check that exercises the database connection, the AI tutor pipeline, and the originality-verification pipeline end-to-end, with pass/fail reporting suitable for an instructor to verify the course is healthy before term start.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It is a course, not a course management system** -- The shell ships with finished, graded, QM-aligned content for American Government. Faculty adopt the course; they do not assemble it.\n\n**Every assignment has a tutor and an originality score** -- Tutoring and AI-text detection are not bolt-ons. They are part of the assignment lifecycle and are wired into the same submission record the grader sees.\n\n**Instructional consistency across the catalog** -- American Government 101 is structurally identical to Philosophy 101, Business 101, and Algebra 101. A student who has taken any one of them already knows how to take the others.\n\n**Pacing is enforced by the product, not the instructor** -- Sequential unlock means students cannot skip ahead, and instructors do not have to police it.\n\n**The diagnostic page is the source of truth for course health** -- Before a term begins, an instructor runs the diagnostic and gets an honest pass/fail on the database, the tutor, and originality checks. No guessing whether the course is wired correctly.\n\n**Accessibility and integrity are documented, not assumed** -- The course ships with explicit, student-facing Accessibility and Support pages and an integrity acknowledgement step. QM reviewers do not have to ask where these live.",
      },
    ],
  },
  "Prealgebra": {
    emoji: "🧮",
    tagline: "AI-Graded, Integrity-Hardened Online Course in Pre-Algebra",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Pre-Algebra 100 is a self-contained online course that takes a student from a diagnostic placement quiz through twelve graded discussion and essay assignments and a two-stage term paper -- 14 items, 800 points total -- with every submission graded by an AI tutor against a faculty-authored rubric and a hidden model response. The platform is built around a strict operating principle: every grade is explicit, every piece of feedback is specific, and the integrity stack is impossible to game from the client side.\n\nUnlike consumer tutoring chatbots that produce generic, hedged, watered-down feedback, Pre-Algebra 100 returns a precise score against a published rubric, a paragraph of targeted feedback tied to the actual arithmetic and reasoning in the student's response, and a permanent record of the writing process that produced the submission. If a student pastes AI output into the editor, the system catches it two different ways -- once on the finished text, and once on the keystroke stream that produced it.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Adult learners returning to math** -- need a structured, low-pressure on-ramp that rebuilds whole-number, fraction, decimal, percent, and early algebra skills before tackling Algebra 101\n\n**Community college and developmental-math students** -- need rigorous, transparent grading on every assignment rather than a single pass/fail at the end of the term\n\n**Homeschool families and middle/high school students** -- need a self-paced curriculum with faculty-quality feedback on showing work, not just final answers\n\n**Tutors and instructors** -- need a turnkey course shell with model responses, rubrics, and an audit trail of every student submission\n\n**Test-prep candidates (GED, HiSET, accuplacer, ASVAB math)** -- need targeted practice on place value, operations, fractions, decimals, percent, proportions, basic equations, and the coordinate plane\n\n**Anyone** -- who wants to learn pre-algebra by actually doing problems and getting real feedback, not by watching videos and clicking through quizzes",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**AI-Graded Assignments** -- Every submission is graded synchronously by Claude against the faculty-authored rubric and the hidden model response for that item. The grader returns a numeric score (clamped to the item's point value) plus a paragraph of targeted feedback tied to the specific arithmetic moves in the student's work.\n\n**14-Item, 800-Point Curriculum** -- Six discussions on whole-number operations, integers, decimals, percents, equations, and geometry; five essays on factoring, fractions, ratios, variables, and inequalities; one discussion on the coordinate plane; plus a two-stage term paper outline and term paper. Best score per item counts toward the course total.\n\n**Hidden Model Responses** -- Every item ships with a faculty-written model response and a \"Why This Is a Model Response\" rationale that the grader uses as its reference. Students never see the model, but the grader does -- so the bar is concrete, not vague.\n\n**Diagnostic Placement Quiz** -- A short pre-course diagnostic that checks readiness for Pre-Algebra 100 and surfaces specific gaps (place value, signed arithmetic, fractions, percent) before the student begins assignment work.\n\n**Hybrid Math Editor** -- A prose textarea for showing work and explaining reasoning, plus a MathLive equation field for symbolic input. Equations are stored as LaTeX and rendered with KaTeX so fractions, exponents, radicals, and signed expressions display correctly.\n\n**GPTZero Integrity Check** -- Every submission is screened through GPTZero on the finished text. AI-likelihood scores are recorded on every submission and visible to course administrators.\n\n**Writing-Process Forensics** -- A keystroke-level recorder captures inserts, deletes, caret jumps, focus changes, and pasted blocks while the student writes. A pure analyzer with 11 features produces a per-submission suspicion score (0-100), classified as human / mixed / likely-AI, with a frozen per-student baseline so the system adapts to each writer.\n\n**Per-Student Process Baseline** -- The first two submissions establish a baseline; later submissions are scored against that baseline rather than a one-size-fits-all profile. A student whose natural writing rhythm is slow and choppy is not penalized for being slow and choppy.\n\n**Admin Submissions Console** -- Faculty/admins can review every submission with full process-forensics features, baseline deviation, GPTZero score, grader output, and the raw text. Student-facing views strip all integrity fields.\n\n**Best-Score-Counts Gradebook** -- Students can resubmit any item; only the highest score per item counts toward the 800-point total. The gradebook shows running totals, per-item bests, and the rubric for every item.\n\n**Self-Paced, No Lockout** -- All 14 items are available from day one. Students can work in any order, take any item as many times as they want, and leave/return without losing state.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It actually grades the math, not the vibes** -- The grader reads the student's actual arithmetic, factoring, equation steps, and verifications against a faculty model response. A correct answer with no work shown does not get full credit; a wrong answer with sound reasoning and an honest verification does not get zero.\n\n**It separates the answer from the work** -- Pre-algebra is about showing your steps. The rubric rewards stating the place value, showing every borrow and carry, naming the technique, verifying with the inverse operation, and explaining the underlying idea -- not just \"the answer is 7.\"\n\n**Two-channel integrity, not one** -- Most platforms either check the finished text (easy to defeat by retyping) or watch keystrokes (easy to dismiss as noise). Pre-Algebra 100 does both, on every submission, and shows them side-by-side in the admin console.\n\n**Per-student baseline, not a generic profile** -- The process-forensics analyzer freezes a baseline from the student's first two submissions. A meticulous, slow writer and a fast, sloppy writer each get judged against their own normal -- not against a population average that flags every careful student as suspicious.\n\n**Hidden model responses, public rubrics** -- Students know exactly what they're being graded on (the rubric is in every assignment), but they cannot game the grader by copying a model answer (the model is server-side only, used by the grader as its reference).\n\n**Best-score grading without grade inflation** -- Students can retry any item, but every retry is graded against the same rubric and the same model response. There is no participation credit and no \"good effort\" bump. The only way to raise a score is to actually do better work.\n\n**Faculty-authored curriculum, verbatim from the source** -- All 14 items are parsed directly from a single source-of-truth course book. Background, assignment, model response, and grading rationale are stored together for every item; the parser is the only path content takes into the database.\n\n**Synchronous grading, no queue** -- Submissions are graded inside the POST handler. Students see their score and feedback in seconds, not the next morning.\n\n**One-click diagnostic of the integrity stack** -- A built-in diagnostic runs two synthetic-stream tests (one transcription, one composition) end-to-end and confirms the process-forensics analyzer is classifying correctly. If anyone tweaks the weights or thresholds, this catches it.\n\n**Quiet on the student side, loud on the admin side** -- Students see scores, feedback, and the rubric -- nothing about process forensics or GPTZero. Admins see every signal. The system is honest with the student about the grade and honest with the institution about the integrity story.",
      },
    ],
  },
  "Data Analytics": {
    emoji: "📊",
    tagline:
      "A Fully Online, Socratic College Course in Data Analytics -- Powered by an AI Tutor That Refuses to Write Your Work For You",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Data Analytics 101 is a fully online, asynchronous, college-level survey of how analysts turn observations of the world into knowledge that supports decisions. Across 15 graded items -- 8 discussions, 5 essays, and a two-stage capstone analysis -- students work through the building blocks of analytic practice: questions and decisions, data types and quality, descriptive statistics, probability and sampling, correlation and causation, hypothesis testing, regression, A/B testing, visualization, machine learning fundamentals, and the ethics and limits of data.\n\nUnlike consumer course platforms that let AI write essays on behalf of the student, this course is built around a strict pedagogical principle: the AI Tutor teaches in the Socratic voice of the instructor of record, asks questions instead of giving answers, and never produces submission-ready text. Every submission is screened for AI authorship before it touches the grade book. The student does the thinking; the platform makes the thinking better.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Undergraduates** -- a first college-level analytics course that builds the judgment behind the tools, not just the syntax\n\n**Career-switchers and self-learners** -- a structured 15-item curriculum with model responses and rubric-based feedback, available open-enrollment and self-paced\n\n**Working analysts** -- a refresher on the foundations (sampling, confounding, hypothesis testing, visualization ethics) that bootcamps and on-the-job training tend to skip\n\n**Instructors** -- a turnkey course shell built to the Quality Matters Higher Ed Rubric (7th ed.), with full readings, assignments, model responses, and an AI tutor pre-configured to a Socratic teaching voice\n\n**Anyone** -- who wants to learn what data analytics actually is, beyond dashboards and SQL syntax, before deciding whether to invest further",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**15-Item Verbatim Curriculum** -- 8 Discussions, 5 Essays, and a two-stage Capstone (Proposal + 10-15 page Analytic Paper). Every reading, assignment prompt, model response, and rubric is rendered directly from the canonical course text -- no paraphrasing, no drift.\n\n**Socratic AI Tutor** -- Anthropic Claude Sonnet 4.5, system-prompted to speak in the instructor's voice. Asks questions, surfaces counterexamples, and gives formative feedback. Explicitly refuses to write submissions for the student.\n\n**Per-Module Tutor Sessions** -- Each of the 15 modules has its own scoped tutor that knows the reading, the assignment, and the student's prior submissions. Conversations persist so students can return mid-essay.\n\n**Submission Pipeline** -- Free-text submissions are graded against the module's rubric, with strengths, gaps, and a Socratic prompt to push the next revision.\n\n**AI Authorship Screening (GPTZero)** -- Every submission is automatically scored by GPTZero before grading. Suspected AI-written work is flagged for instructor review rather than silently accepted.\n\n**Sequential Unlock** -- Modules unlock in order as the previous one is submitted, mirroring the pacing of an instructor-led course while preserving self-paced flexibility.\n\n**Capstone Two-Stage Workflow** -- The Capstone Analysis Proposal (100 pts) is graded and approved before the Capstone Analysis Assignment (100 pts) unlocks, modeling real research-supervision practice.\n\n**Course Shell to QM Rubric** -- Start Here, Syllabus, Modules, Assessments, Support, Accessibility, and Diagnostic pages all built to the Quality Matters Higher Ed Rubric (7th ed.) standard for online course design.\n\n**Persistent Student Records** -- Postgres-backed (Neon). Submissions, grades, tutor transcripts, and progress all retained across sessions and devices.\n\n**Diagnostic Self-Check** -- One-click endpoint that verifies the curriculum loads, both AI providers (Anthropic + GPTZero) are reachable, the database responds, and the full submission-and-grade pipeline works end-to-end. Color-coded pass/warn/fail report.\n\n**Accessibility** -- Designed to conform with WCAG 2.1 Level AA. Keyboard-navigable, screen-reader-labelled, and high-contrast throughout.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It teaches, it doesn't ghostwrite** -- The AI Tutor will discuss the reading, challenge a draft, and propose questions the student hasn't considered. It will not produce a paragraph the student can paste into a submission. This is enforced in the system prompt, not just suggested.\n\n**It catches AI submissions, not just hopes against them** -- Every submission runs through GPTZero before a grade is issued. Suspected AI work is surfaced explicitly, not buried.\n\n**Model responses are real, not generic** -- Every assignment ships with a model response that demonstrates the level of reasoning the rubric actually rewards, plus an explicit analysis of why the response works. Students see what a defensible answer looks like before they write their own.\n\n**Curriculum is verbatim, not paraphrased** -- The reading text, assignment prompts, and rubrics are auto-generated from the canonical source document. There is no editorial layer between the instructor's text and what the student reads.\n\n**One instructor voice across 15 modules** -- The tutor speaks in a single, consistent pedagogical voice rather than the generic helpful-assistant tone of a default chatbot. Students get the same instructor in every module.\n\n**Built to a real higher-ed rubric** -- Every page in the course shell exists because the Quality Matters Higher Ed Rubric (7th ed.) requires it, not because it looked nice on a landing page.\n\n**Honest about what data analytics is** -- The capstone is an analytic paper, not a dashboard or a Kaggle notebook. The course's claim is that an analyst's job is to produce work they can defend on the merits, and the assignments are designed to make the student do exactly that.\n\n**Fully online, no proctoring theater** -- The course is open-enrollment and self-paced. Integrity is enforced through AI-screening and Socratic engagement, not lockdown browsers or webcam surveillance.",
      },
    ],
  },
  "Business 101": {
    emoji: "💼",
    tagline:
      "AI-Graded Online Business Course with Two-Layer Integrity Forensics and Sequential Mastery Gating",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Intro to Business 101 is a single-instructor online course platform that delivers a 15-module curriculum (8 discussions, 5 essays, a business-plan outline, and a full business plan, totalling 850 points) covering what a business is, value creation, organizational forms, markets and pricing, financial statements, operations, marketing, management, strategy, ethics, entrepreneurship, risk, and business in the age of AI. Every student response is graded by Claude against an instructor-authored model answer and rationale, with feedback returned in seconds.\n\nUnlike generic LMS quiz engines that grade multiple-choice answers and call it a day, Intro to Business 101 is built around a strict operating principle: the platform should be able to tell, with evidence, whether a student actually did the work. Every submission runs through a two-layer integrity stack -- synchronic AI detection on the text itself plus diachronic process forensics on the writing stream -- and a sequential gate prevents anyone from skipping ahead. No padding, no shortcuts, no way to fake mastery.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Community-college and intro-business instructors** -- need to give individualized written feedback at scale without spending nights grading discussion boards and essays\n\n**Online-program directors** -- need a defensible audit trail that distinguishes student work from AI output, on every submission\n\n**Workforce-development and continuing-ed programs** -- need a structured 15-step path from \"what is a business\" to a complete written business plan, with consistent grading rigor across cohorts\n\n**Curriculum designers** -- need a chassis they can swap content into without rebuilding the integrity, grading, or progress-tracking layers\n\n**Returning and first-generation students** -- want immediate, constructive feedback on their business reasoning instead of waiting a week for a red-pen score\n\n**Anyone** -- who wants to know whether a learner actually understands the material, instead of whether they pasted a plausible answer",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**AI-Graded Submissions** -- Every response is graded by Claude Sonnet 4.5 against the instructor's model answer and rationale, returning a numeric score (0..pointValue) and 2-5 sentences of substantive feedback. The grader rewards specificity (named firms, real numbers, identifiable trade-offs) and penalizes generic MBA-speak.\n\n**15-Module Curriculum, 850 Points** -- 8 x 50-point discussions + 5 x 50-point essays + 100-point business-plan outline + 100-point business plan. Sequenced strictly: definitions -> value creation -> organizational forms -> markets -> financial statements -> operations -> marketing -> management -> strategy -> ethics -> entrepreneurship -> risk -> AI in business -> outline -> final plan.\n\n**Sequential Mastery Gating** -- Module N+1 stays locked until module N is submitted. The server enforces this on POST /submissions with a 403, so a student cannot bypass the gate by hand-crafting requests or sharing URLs.\n\n**Integrity Canvas (Box 2)** -- The submission editor logs keystrokes, blocks paste, samples GPTZero scores in real time during typing, highlights AI-suspicious sentences inline, and surfaces a traffic-light bar plus a cumulative-red warning. The full event stream is saved with the submission.\n\n**Draft Workshop (Box 1)** -- A single-shot AI-feedback round on a draft before the student commits. Once the draft is submitted for feedback it locks, preserving a clean before/after artifact that grading and integrity review can both reference.\n\n**Two-Layer AI Detection** -- Synchronic detection (GPTZero on the finished text) plus diachronic detection (process forensics on the keystroke stream: pause distribution, burst patterns, baseline drift, paste events, and revision shape). Each layer can flag independently; the combination is much harder to defeat than either alone.\n\n**Process Forensics Analyzer** -- 11-feature scoring model with an n=2 baseline freeze per student, producing a 0-100 process score and a class label (human, mixed, likelyAI). Wired into POST /submissions so every accepted submission carries a forensic verdict at write time, not as an afterthought.\n\n**Sequential Tutor Conversation** -- A per-module tutor backed by Claude with persistent conversation history. The tutor sees the module's reading and assignment context but never the model answer, so it can guide without leaking the rubric.\n\n**Assessments Dashboard** -- A student-facing list of every submission with its grade, feedback, AI verdict, and process verdict. Forensic columns (process_*) are stripped from student responses by the serialization layer -- they exist only in instructor views.\n\n**Integrity Disclosure & Acknowledgment** -- A one-time integrity ack gate that students must accept before the module page will open the editor, recording consent to the AI-detection and process-forensics policies with timestamp.\n\n**System & Functional Diagnostic** -- One-click in-process self-check (DB, curriculum, Anthropic + GPTZero keys, live AI grader round-trip, submission/canvas/tutor persistence, progress recompute) with cleanup. Color-coded pass/fail with per-check timing.\n\n**End-to-End Functional Check** -- One-click loopback walk through the real HTTP stack: signs in a synthetic student, acks integrity, opens a tutor conversation, autosaves the canvas, asserts the sequential gate refuses out-of-order submits with a 403, submits the first module, verifies it appears in both the module page and the assessments list, then tears down the synthetic student (FK CASCADE removes all its rows). No mocks, no real data touched.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It actually catches AI work** -- Two independent detectors run on every submission: GPTZero on the final text and a process-forensics analyzer on the keystroke stream. A student who pastes AI output trips synchronic detection; a student who retypes AI output into the canvas trips diachronic detection. Defeating both at once requires actually writing the thing.\n\n**It separates structure from substance** -- A grammatically clean answer that misses the point scores poorly on substance; a rough answer that nails the trade-off scores well. The grader is instructed to reward specificity (named firms, real numbers, identifiable mechanisms) and penalize generic MBA-speak, so the score reflects business reasoning, not polish.\n\n**It enforces the syllabus, not just suggests it** -- Sequential gating is a server-side 403, not a hidden link. Students cannot skip Discussion 1 to get to the Business Plan, even if they hand-craft requests. The gate is the same code path the diagnostic E2E walk exercises on every run.\n\n**It records evidence, not just verdicts** -- Every submission carries its keystroke log, paste-block events, sampled GPTZero score history, final GPTZero verdict, and process-forensics score with feature breakdown. If a grade is challenged, the instructor has the receipts; if the integrity stack is challenged, the data is replayable.\n\n**It uses one grader the same way every time** -- Claude Sonnet 4.5 against the instructor's model answer and rationale, with a fixed prompt structure. No A/B-tested grading, no per-student rubric drift, no humans on the night shift quietly being more generous than humans on the morning shift.\n\n**It is built to clone** -- The integrity stack, grading pipeline, diagnostics, sequential gate, draft workshop, integrity canvas, and tutor are all course-agnostic. Swapping the curriculum is a single-file edit; the rest of the chassis is untouched. Intro to Business 101 is one of a family of courses that share this platform.\n\n**It tells you when it is broken** -- The diagnostics page runs both an in-process self-check (DB, curriculum, AI keys, live API pings, submit/canvas/tutor round-trip) and an end-to-end loopback walk that exercises the real HTTP stack with a synthetic student that deletes itself at the end. The operator can verify the entire pipeline is healthy in under five seconds, without touching real student data.\n\n**One-click full report** -- The diagnostic report is copy-pastable JSON, time-stamped, and includes per-check duration. Operators get a single artifact they can paste into an incident ticket or send to the platform owner without screenshotting anything.",
      },
    ],
  },
  "Developmental Math": {
    emoji: "🧮",
    tagline:
      "AI-Graded Online Course Platform with Integrity Forensics and Sequential Mastery Gating",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Developmental Math is a single-instructor online course platform that delivers a 14-item curriculum (12 discussions and essays plus a term-paper outline and term paper, totalling 800 points) covering place value through one-step equations. Every student response is graded by Claude against an instructor-authored model answer and rationale, with feedback returned in seconds.\n\nUnlike generic LMS quiz engines that mark multiple-choice answers and call it a day, Developmental Math is built around a strict operating principle: the platform should be able to tell, with evidence, whether a student actually did the work. Every submission runs through a two-layer integrity stack -- synchronic AI detection on the text itself plus diachronic process forensics on the writing stream -- and a sequential gate prevents anyone from skipping ahead. No padding, no shortcuts, no way to fake mastery.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Community-college and developmental-math instructors** -- need to give individualized written feedback at scale without spending nights grading\n\n**Online-program directors** -- need a defensible audit trail that distinguishes student work from AI output, on every submission\n\n**Tutoring centers and bridge programs** -- need a structured 14-step path from place value to algebra with consistent grading rigor across students\n\n**Curriculum designers** -- need a chassis they can swap content into without rebuilding the integrity, grading, or progress-tracking layers\n\n**Students returning to school** -- want immediate, constructive feedback on their math reasoning instead of waiting a week for a red-pen score\n\n**Anyone** -- who wants to know whether a learner actually understands the material, instead of whether they pasted a plausible answer",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**AI-Graded Submissions** -- Every response is graded by Claude Sonnet 4.5 against the instructor's model answer and rationale, returning a numeric score (0..pointValue) and 2-5 sentences of LaTeX-aware feedback. Charitable about MathLive notation: \\frac, ^{}, _{} are treated identically to their plain-text equivalents.\n\n**14-Item Curriculum, 800 Points** -- 12 x 50-point discussions/essays + a 100-point term-paper outline + a 100-point term paper. Sequenced strictly: place value -> whole-number ops -> factors -> fractions -> decimals -> percents -> ratios -> signed numbers -> one-step equations -> outline -> paper.\n\n**MathLive-Powered Composition** -- Students compose in a real math field, not a textarea. Their LaTeX is what the grader sees, eliminating the \"I meant 1/2\" ambiguity that plagues plain-text math submissions.\n\n**Two-Layer Integrity Stack** -- Synchronic detection (AI-detector pass on the final text) plus diachronic detection (process forensics on the keystroke/composition stream). One catches AI text that was pasted in; the other catches AI text that was retyped to defeat detector tools.\n\n**Writing-Process Forensics** -- 11-feature analyzer on the composition stream returns an absolute score (0..100) and class (human | mixed | likelyAI). Per-student baseline is folded in for the first 2 submissions then frozen -- stops slow-drift attacks that gradually train the baseline toward a cheating profile.\n\n**Sequential Gating** -- Items must be completed in order. The gate runs server-side on every POST /algebra/submissions, so it cannot be bypassed by anyone with a valid session.\n\n**Transactional Submission Pipeline** -- Submission insert + baseline update happen inside a Postgres transaction with SELECT ... FOR UPDATE on the student row, so concurrent submissions cannot double-fold the baseline and silently lose a sample.\n\n**Process-Forensics Field Isolation** -- All process_* columns (score, class, features, flags, events) are stripped from student-facing responses. Only admin endpoints return them -- sophisticated cheaters cannot use the analyzer as a tuning oracle.\n\n**Live Process Score** -- Students see a throttled (60s) preview of their current writing-process score while composing, returning only {score, class} -- never features or flags.\n\n**Admin Submissions Console** -- Full per-submission view including process score, class, flags, and raw event stream. The only place forensic columns surface.\n\n**System Diagnostic** -- One-click self-check that verifies the database, curriculum integrity (14 items / 800 pts), Anthropic key, live Anthropic ping, list/get/submit/grade round-trip, and both synthetic process-forensics regression tests.\n\n**End-to-End Functional Walk** -- Separate one-click check that hits the real Express app over loopback as a synthetic student: sign in -> list -> submit -> grade -> progress -> tear down. Synthetic student row is always deleted via FK cascade, even when steps fail.\n\n**Accommodations Flag** -- Per-student boolean that disables process-forensics analysis entirely for students who legitimately type, paste, or compose differently (assistive tech, dictation, IEPs).",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It grades the reasoning, not just the answer** -- Claude reads the work against the instructor's rationale, so a student who shows correct reasoning gets credit even if a minor arithmetic slip costs the final value. The feedback names what was correct and what to improve next.\n\n**It separates \"AI text\" from \"AI behavior\"** -- A detector pass on the finished text can be defeated by retyping. Process forensics on the keystroke stream can be defeated by hand-transcribing AI output. Running both, with separate scores, means a cheater has to defeat two independent systems.\n\n**Forensic results are invisible to students by design** -- The analyzer cannot be probed. Students never see their process score, class, features, or flags -- only the grader's content feedback. Sophisticated tuning attacks have nowhere to anchor.\n\n**Baseline freezes** -- Per-student writing-process baseline is captured from the first 2 submissions and then frozen. Slow drift attacks that gradually shift the baseline over many submissions cannot succeed.\n\n**Sequential gating is server-side and load-bearing** -- The frontend hides locked items, but the server is the source of truth. Anyone with a valid cookie still cannot POST a submission for an item they have not unlocked.\n\n**One-click diagnostics that actually call live APIs** -- Both the system check and the end-to-end walk make real round-trips (Anthropic ping, real submit + grade, real loopback HTTP) instead of mocking. If the diagnostic is green, the platform really works for a student right now.\n\n**Cleanup contract on the E2E walk** -- The synthetic test student is always deleted at the end via FK cascade, even when intermediate steps fail. No synthetic rows ever leak into the real DB.\n\n**Same chassis as Philosophy 101** -- The grading, integrity, and diagnostics stack is shared. Cloning a new course is a curriculum swap -- not a rebuild.",
      },
    ],
  },
  "Algebra 2": {
    emoji: "📐",
    tagline:
      "AI-Graded, Integrity-Hardened Online Course in Intermediate Algebra",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "Algebra 2 is a self-contained online course that takes a student from the diagnostic placement quiz through twelve graded discussion/essay assignments and a two-stage term paper -- 14 items, 800 points total -- with every submission graded by an AI tutor against a faculty-authored rubric and a model response. The platform is built around a strict operating principle: every grade is explicit, every piece of feedback is specific, and the integrity stack is impossible to game from the client side.\n\nUnlike consumer tutoring chatbots that produce generic, hedged, watered-down feedback, Algebra 2 returns a precise score against a published rubric, a paragraph of targeted feedback tied to the actual algebraic moves in the student's response, and a permanent record of the writing process that produced the submission. If a student pastes AI output into the editor, the system catches it two different ways -- once on the finished text, and once on the keystroke stream that produced it.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Community college and four-year algebra students** -- need a self-paced intermediate algebra course that grades like a real instructor, not a quiz auto-checker\n\n**Returning adult learners** -- need a course that meets them where they are, with a diagnostic placement quiz and targeted feedback on every step they get wrong\n\n**Homeschool families and independent study programs** -- need a turnkey 800-point algebra course with rubric-graded essays and a term paper, not just multiple-choice drills\n\n**Instructors piloting AI-assisted grading** -- need a transparent, auditable grading pipeline with admin tooling, process-forensics, and an end-to-end self-check\n\n**Course coordinators** -- need a clonable chassis they can re-skin into the next course in the series without touching the integrity stack\n\n**Anyone** -- who wants to actually learn intermediate algebra by writing, not by clicking the correct radio button",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**AI-Graded Free-Response Assignments** -- Every one of the 12 discussion/essay items is graded by Claude Sonnet 4.5 against a faculty-authored rubric and a model response. Returns a numeric score, paragraph-length feedback tied to the student's actual reasoning, and is stored permanently against the student record.\n\n**Two-Stage Term Paper Workflow** -- A 100-point outline followed by a 250-point full paper, graded with extra rigor because they are the capstone of the course.\n\n**Diagnostic Placement Quiz** -- An ungraded warm-up that probes the prerequisite skills (factoring, fractions, basic functions) so the student knows on day one whether they are ready for the course.\n\n**Integrity Canvas Editor** -- Full keystroke-stream capture with paste-block detection. Real-time AI-likelihood scoring via GPTZero with a traffic-light bar; sentence-level highlighting of AI-flagged regions; cumulative-red warnings that escalate as the session goes on.\n\n**Process Forensics (Diachronic AI Detection)** -- Eleven writing-process features (typing rhythm, edit/insert ratio, burstiness, caret-jump patterns, paste markers) are extracted from every submission and compared against the student's frozen n=2 baseline. Catches AI use that escapes synchronic text-based detection by analyzing how the text was produced, not just what it says.\n\n**Two-Layer AI Detection** -- GPTZero scores the finished text (synchronic); Process Forensics scores the keystroke stream (diachronic). A student would have to fake both -- typing realistically and producing human-shaped prose -- to evade detection.\n\n**Sequential Gating** -- Students cannot submit module 5 before completing module 4. The gate is server-enforced on every POST and cannot be bypassed from the client.\n\n**Per-Student Process Baseline** -- Each student's first two submissions establish their personal writing-process fingerprint. The baseline is frozen after submission 2 to defeat slow-drift attacks that would gradually train the baseline toward a cheating profile.\n\n**Admin Console** -- Full visibility into every submission with process-forensics columns, AI scores, baseline deviation, and grading history. Student-facing endpoints strip these columns so the analyzer cannot be used as a tuning oracle.\n\n**System Diagnostic** -- One-click self-check that verifies database connectivity, curriculum integrity (14 items, 800 points), Anthropic API reachability, and a live submit-and-grade round-trip on a dedicated diagnostic account.\n\n**End-to-End Functional Check** -- Loopback HTTP walk that signs in as a synthetic student, lists items, submits a real graded assignment, verifies it appears in the student list and progress endpoint, logs out, and tears down every row it created.\n\n**Course-Identity Clone Chassis** -- All course-specific content lives in a single curriculum JSON and five identity strings. The integrity stack, grading pipeline, forensics analyzer, and diagnostics are course-agnostic and ship unchanged into the next course in the series.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It actually grades writing, not clicks** -- Free-response algebra. The student types out their reasoning and the AI grades the reasoning, not whether the final answer matches a key.\n\n**It catches AI cheating two ways** -- Pasted AI output fails GPTZero on the text and fails process forensics on the keystroke stream. Trying to evade one detector signals harder on the other.\n\n**The integrity stack is server-enforced** -- Sequential gating, baseline freezing, and process-forensics are all enforced on the server. The client cannot disable, fake, or bypass them.\n\n**Feedback is specific, not hedged** -- The grader is prompted to be \"kind but rigorous.\" It cites the student's actual algebraic moves and tells them precisely where the reasoning broke. No \"good effort, try again.\"\n\n**The diagnostic is honest** -- /diagnostic runs a live submit-and-grade round-trip end-to-end. If anything is wrong -- bad key, dead DB, broken grader -- it fails loudly with the actual error string, not a generic \"something went wrong.\"\n\n**Clonable without touching the integrity stack** -- Swap the curriculum JSON and five identity strings to spin up the next course. The forensics analyzer, gating logic, and diagnostics are course-agnostic and re-used as-is.\n\n**One-click full diagnostic report** -- Two diagnostic cards on the same page, both with copy-to-clipboard output suitable for pasting into a support ticket.\n\n**No persistent test pollution** -- The end-to-end check creates its own synthetic diagnostic student, runs the full walk, and deletes the student (cascading every row) in a finally block. Zero rows left behind on success or failure.",
      },
    ],
  },
  "English Composition 102": {
    emoji: "📚",
    tagline:
      "A Fully Online, AI-Tutored College Course in Research-Based Writing and Argument",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "English Composition 102 is a 14-module, asynchronous college course that takes students from raw curiosity to a defended, ten-to-fifteen page researched argument. Every module pairs verbatim instructor-authored reading with a graded assignment and a model response, and every module is backed by an embedded AI Tutor that speaks for the instructor of record.\n\nUnlike generic writing platforms that hand students finished prose on request, English Composition 102 is built around a strict pedagogical principle: the AI Tutor will discuss, probe, push back, and critique -- but it will never write a student's assignment for them. Every submission is timestamped, stored, and reviewable. The course is designed end-to-end to develop the one capacity a researched writer actually needs: the ability to formulate a question, follow the evidence, and defend a conclusion in your own words.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**First- and second-year undergraduates** -- who have completed Composition 101 (or its equivalent) and need a rigorous, research-focused follow-on course that satisfies a general-education writing requirement\n\n**Self-directed learners** -- who want a real, graded composition curriculum with feedback and a defensible final paper, on their own schedule\n\n**Returning students** -- who need to re-enter academic writing through a course that treats them as adults and gives them an AI tutor that teaches rather than ghostwrites",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**Embedded AI Tutor** -- Powered by Anthropic Claude Sonnet 4.5. The tutor is system-prompted to teach by asking, push back on weak claims, surface counterarguments, and refuse to draft student work. Conversation history is persisted per module per student.\n\n**Sequential Module Unlock** -- Modules unlock only after the previous one is submitted. The unlock state is tracked server-side against each student record, so progress is durable across sessions and devices.\n\n**Researched-Argument Pipeline** -- Curriculum walks students through the full research arc: question formulation, annotated bibliography, source typing, synthesis, literature review, quotation/paraphrase/summary, the researched argument, methods of reasoning, disciplinary genre, visual argument, peer review, public-audience writing, and the final research paper.\n\n**Two-Part Research Paper** -- The capstone (200 points) is split into a 100-point Research Paper Proposal (with four-source annotated bibliography) and a 100-point 10-15 page Research Paper developed from the approved proposal.\n\n**Draft Auto-Save** -- Student drafts are auto-saved to the database as they type. No work is lost on refresh, navigation, or session timeout.\n\n**Submission System** -- Every submission is timestamped, versioned, and stored. Resubmissions are allowed under the self-paced policy; the most recent submission is the one that counts.\n\n**AI Action Toolkit** -- One-click actions on any reading: generate a podcast-style audio explainer, request a plain-language rewrite, get a guided summary, or surface candidate counterarguments -- all framed to extend the student's thinking rather than replace it.\n\n**Progress Dashboard** -- Per-student progress page tracks which modules are complete, which are unlocked, total points earned, and a running grade against the 90/80/70/60 scale.\n\n**Instructor Introduction Capture** -- New students submit a short self-introduction the AI Tutor uses to personalize its questions to the student's background, major, and stated writing goals.\n\n**Printable Syllabus** -- One-click print-to-PDF of the full syllabus, including grading scale, module table, schedule, late/resubmission policy, engagement expectations, and academic integrity / AI policy.\n\n**Accessibility Page** -- WCAG 2.1 AA conformance statement, accommodation request workflow, and feedback channel.\n\n**System Diagnostic** -- Admin-side self-check that verifies the database connection, AI provider access, curriculum integrity, and the submission pipeline are all operational.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**The AI Tutor will not write your paper** -- The tutor is system-prompted to refuse, pivot back to questions, and surface the student's own reasoning. There is no prompt-engineering route around it; the refusal is the pedagogy.\n\n**Verbatim instructor-authored curriculum** -- Every reading, assignment, and model response in all 14 modules is written by a composition instructor, not generated. Students get the same prose every time, in the instructor's voice and at the instructor's standard.\n\n**Model responses are full responses** -- Each module includes a complete model assignment response of the length and quality a top student would actually submit, followed by a labeled analysis explaining why the response works. Students get a target, not a rubric.\n\n**Research methodology is taught explicitly** -- Modules cover the difference between primary, secondary, and tertiary sources; how to trace a claim through the chain; the difference between summary, paraphrase, and patchwriting; deductive, inductive, and abductive reasoning; and the rhetoric of charts and visual evidence. These are not assumed background.\n\n**The research paper is built in stages, not assigned at the end** -- The capstone is a proposal + paper, with the proposal accepted before the paper is written. Students cannot reach the final paper without first defending the question, the field map, the candidate thesis, the anticipated objection, and a four-source annotated bibliography.\n\n**Every submission is timestamped and auditable** -- All student work and all AI-Tutor conversations are stored. Instructors can review engagement; academic-integrity claims can be checked against the timeline.\n\n**Self-paced without late penalties** -- The course is asynchronous and open-enrollment. Resubmissions are allowed; the most recent counts. The pacing is the student's responsibility, and the AI Tutor is available at every step.\n\n**Real database, not in-memory state** -- Student records, sessions, submissions, drafts, tutor conversations, and progress are all persisted to a Postgres database. Sessions survive restarts; work survives across devices.\n\n**Built to Quality Matters Higher Ed Rubric (7th ed.)** -- The course shell -- syllabus, learning outcomes, accessibility, support, institutional policies, engagement expectations -- is structured to meet established higher-ed online-course quality standards out of the box.",
      },
    ],
  },
  "English Composition": {
    emoji: "📚",
    tagline:
      "Self-Contained AI-Powered Writing Course with Two-Layer AI-Detection and Per-Student Process Forensics",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body:
          "English Composition 101 is a self-contained, AI-powered writing course built for instructors who need to teach composition in an environment where students have unrestricted access to large language models. The course delivers a full 14-module curriculum (eight discussions, five essays, and a term paper, totaling 850 points), with an integrated AI tutor, a structured drafting workflow, and a live writing canvas.\n\nWhat sets this course apart from every other LMS module is its integrity layer. Most platforms detect AI-generated text after it is submitted and stop there. This course assumes that motivated students will paraphrase AI output sentence-by-sentence and transcribe it into the assignment to defeat text-only detection. To catch that, the course runs two independent AI-detection pipelines on every submission: one that scores the output (GPTZero), and one that scores the shape of the writing process itself.\n\nEvery monitoring decision is invisible to the student by design. The disclosure modal says \"your work is monitored\" and nothing more. The names of the signals being watched are never exposed in the UI, the API, or the toast messages.",
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body:
          "**Instructors and writing-program directors** -- need a turnkey composition course that holds up in the era of generative AI without banning it\n\n**Departments running large gateway courses** -- need scalable per-student integrity monitoring without manual essay-by-essay review\n\n**Academic-integrity offices** -- need replayable, evidence-grade submission records (full keystroke log, timeline, baseline-vs-submission comparison) for any case that escalates\n\n**Disability and accessibility coordinators** -- need a first-class accommodation path that disables live monitoring UI without disabling the underlying course\n\n**Students** -- need a structured drafting environment, an integrated AI tutor for support, and clear feedback on their own writing",
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body:
          "**14-Module Curriculum** -- Eight discussions, five essays, and a term paper, totaling 850 points. Sequentially numbered, programmatically validated, and surfaced through a Canvas-style module browser.\n\n**Integrity Canvas** -- A paste-blocked, contentEditable writing surface with a live traffic-light bar, sentence-level AI-score highlighting, autosave every 5 seconds, and a 30-second cumulative-red warning. Submitting on red opens a confirm dialog. Every submission ships with the full keystroke log, score history, final AI score, and a server-computed activity report.\n\n**Two-Layer AI-Detection** -- Layer 1 (synchronic): GPTZero scores the final text in a fire-and-forget background task, with the client polling every 2-2.5 seconds. Layer 2 (diachronic): a custom process-forensics analyzer scores the writing session itself across 11 features. A submission can pass Layer 1 and still be flagged by Layer 2 when the writing process looks like transcription.\n\n**Per-Student Baseline Memory** -- Each student's first two submissions establish a personal baseline (running mean over 11 process features, stored as jsonb on the student row). The baseline is frozen after submission #2 by design -- slow-drift attacks against the baseline are explicitly defended against. Every subsequent submission is scored both absolutely and against this student's own baseline, so a student whose normal burstUniformity is 12 ms is not flagged for being fast.\n\n**Live Process Score** -- A second traffic-light bar in the writing canvas, throttled to one call per 60 seconds, shows the student's current process-forensics class. The endpoint deliberately returns only score and class -- never the underlying features -- to prevent giving sophisticated cheaters a tuning oracle.\n\n**Sparse-Data Guardrail** -- Sessions with fewer than 20 events or under 80 characters are not analyzed. Empty telemetry is never misclassified as \"robotic.\"\n\n**Draft Workshop** -- A single-shot AI feedback box in five sections (thesis, structure, evidence, voice, mechanics). Once feedback is fetched, the draft is locked, preventing students from iteratively re-prompting until the AI writes the essay for them.\n\n**General Tutor** -- An always-available conversational tutor backed by Anthropic for course concepts, with persistent module-aware context.\n\n**Admin Dashboard** -- Full submission browser at /admin/submissions with replay, sparkline, server-side activity report, and the ProcessForensicsView panel: score badge, class badge, baseline-adjusted score badge with sample size, findings list, a four-column feature table (Feature / This Submission / Student Baseline / Notes), and a chars-per-burst timeline chart.\n\n**Accommodation Mode** -- Per-student admin toggle replaces the contentEditable canvas with a plain textarea, suppresses the live traffic-light UI, and skips the live process-score endpoint. Underlying event logging still runs in the background so post-hoc inspection remains possible if needed.\n\n**One-Time Integrity Disclosure** -- A consent gate on first module load, deliberately generic in content. Acknowledgment is timestamped on the student row.\n\n**Admin Bootstrap** -- The first authenticated user can claim admin via a one-shot endpoint. After that, admin status is granted only by an existing admin.\n\n**System Diagnostic** -- One-click self-check at /diagnostic that verifies environment variables, database connectivity, table reachability, curriculum integrity (14 modules / 850 pts / sequential numbering), the Anthropic AI roundtrip, and runs two synthetic process-forensics tests -- a transcription stream that must score >= 70 and a composition stream that must score < 35. Color-coded pass / warn / fail output.",
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body:
          "**It assumes the student has GPT open in another tab** -- The entire integrity design starts from the threat model that a motivated student will paraphrase and transcribe AI output. Text-only detection is treated as necessary but insufficient. Every other course on the market stops at GPTZero.\n\n**It judges each student against themselves, not a population** -- A fast typist isn't penalized for being fast. A heavy reviser isn't penalized for revising. The per-student baseline is the unit of measurement, and it freezes after two submissions so it cannot be slowly trained toward a cheating profile.\n\n**It separates output from process** -- A submission can pass GPTZero (final text reads human) and still be flagged by process forensics (the writing session looks like transcription). Conversely, a submission with high deletion ratio, varied bursts, structural edits, and abandoned-and-restarted starts is treated as human even when GPTZero is borderline.\n\n**It does not tell students what it is watching** -- The disclosure modal is intentionally generic. Feature names never appear in the student UI, the live endpoint, or any toast. Naming the signals creates a curriculum for evading them.\n\n**The live signal is information-starved on purpose** -- The live process-score endpoint returns only a score and a class, never the feature breakdown. A student watching their bar tick up cannot reverse-engineer which behavior is triggering it.\n\n**It has a real accommodation path** -- Accommodated students get a textarea, no live traffic-light bar, and no live process-score endpoint calls -- without losing access to the course. The accommodation toggle is a first-class admin control, not an opt-out hidden in settings.\n\n**The admin panel is evidence-grade** -- Every submission carries the full keystroke log for replay, a per-burst timeline chart, a side-by-side feature-vs-baseline table with the baseline sample size, and an explicit list of which signals fired. If a case escalates to academic integrity, the record is already there.\n\n**One-click self-test of the entire integrity pipeline** -- The diagnostic page runs synthetic transcription and synthetic composition cases through the live analyzer on every check. Tuning the weights without breaking the calibration is a 30-second loop, not a multi-hour validation effort.\n\n**Each student's baseline is a named, persisted asset** -- students.processBaseline is jsonb on the student row with a sample size and a feature-mean dictionary. It is loaded on every submission, snapshotted into that submission's record at the time of analysis, and visible in the admin panel as the second column of the feature table.\n\n**Legacy submissions still work** -- Pre-existing submissions without keystroke telemetry continue to load in the admin UI. The analyzer accepts both the new rich event shape and the legacy shape, so back-compat is preserved by construction.",
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
    { title: "Psychology 101", url: "https://aipsych1.xyz" },
    { title: "Sociology 101", url: "https://sociology101.xyz" },
    { title: "Medical Terminology", url: "https://medicalterminology.xyz" },
    { title: "Algebra 1", url: "https://collegealgebra.xyz" },
    { title: "Algebra 2", url: "https://algebra2.xyz" },
    { title: "Developmental Math", url: "https://developmentalmath.xyz" },
    { title: "Prealgebra", url: "https://prealgebra.xyz" },
    { title: "Business 101", url: "https://introtobusiness.xyz" },
    { title: "Data Analytics", url: "https://analysis101.xyz" },
    { title: "American Government", url: "https://government101.xyz" },
    { title: "Western Civilization", url: "https://westernciv.xyz" },
    { title: "Public Speaking", url: "https://publicspeaking101.xyz" },
    { title: "U.S. History I", url: "https://ushistory101.xyz" },
    { title: "U.S. History II", url: "https://ushistory102.xyz" },
    { title: "Business Ethics", url: "https://businessethics101.xyz" },
    { title: "Food & Beverage Cost Control", url: "https://foodcost101.xyz" },
    { title: "Career Management", url: "https://careermanagement.xyz" },
    { title: "Information Technology 101", url: "https://it101.xyz" },
    { title: "Systems Science 101", url: "https://systemsscience.xyz" },
    { title: "Statistics 101", url: "https://statistics101.xyz" },
    { title: "English Composition", url: "https://englishcomposition.xyz" },
    { title: "English Composition 102", url: "https://englishcomp102.xyz" },
    { title: "Macroeconomics", url: "https://macroeconomics101.xyz" },
    { title: "Microeconomics", url: "https://microeconomics.xyz" },
    { title: "Probability Theory", url: "https://probabilitytheory.xyz" },
    { title: "AI 101", url: "https://introductorycourseinai.xyz" },
    { title: "AI 102", url: "https://ai102.xyz" },
    { title: "AI 103", url: "https://ai103.xyz" },
    { title: "AI 104", url: "https://ai.xyz" },
    { title: "AI 105", url: "https://ai105.xyz" },
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
