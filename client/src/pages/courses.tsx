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
    { title: "Psychology 101", url: "https://psych1.xyz" },
    { title: "College Algebra", url: "https://collegealgebra.xyz" },
    { title: "Systems Science 101", url: "https://systemsscience.xyz" },
    { title: "Statistics 101", url: "https://statistics101.xyz" },
    { title: "English Composition", url: "https://englishcomposition.xyz" },
    { title: "Macroeconomics", url: "https://macroeconomics101.xyz" },
    { title: "Microeconomics", url: "https://microeconomics.xyz" },
    { title: "Probability Theory", url: "https://probabilitytheory.xyz" },
    { title: "AI 101", url: "https://introductorycourseinai.xyz" },
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
