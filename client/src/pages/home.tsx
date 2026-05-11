import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface App {
  title: string;
  url: string;
  videoUrl?: string;
}

interface AppDescription {
  emoji: string;
  tagline: string;
  sections: { emoji: string; title: string; body: string }[];
}

const appDescriptions: Record<string, AppDescription> = {
  "LLM Plus": {
    emoji: "🧠",
    tagline: "Multi-Model Scholarly Chat with Persistent Per-Project Memory and Recursive Compression",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `LLM Plus is a multi-model AI chat platform built for serious, long-running intellectual work -- legal cases, dissertations, research programs, philosophical investigations, multi-month projects where the conversation outlives any single context window. It plugs into four top-tier LLMs (Claude, ChatGPT, DeepSeek, Grok) and lets the user route any turn to the model best suited for it.

Unlike consumer chatbots that forget everything between sessions and flatter the user with hedged, watered-down output, LLM Plus is built around two strict operating principles: memory must persist and truth must survive compression. Every project maintains its own Tractatus tree -- a numbered, tagged, machine-managed record of what has been asserted, rejected, assumed, resolved, and left open -- that is injected into every system prompt and recursively compressed when it grows too large.`,
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body: `- **Lawyers and litigators** -- need to maintain perfect recall across years of case material, motions, rulings, and discovery without the model softening adverse outcomes.
- **Academics, graduate students, and researchers** -- need to write dissertations and journal articles where claims must remain consistent across hundreds of pages.
- **Philosophers and theorists** -- need a system that tracks distinctions, open questions, and dialectical commitments across months of investigation.
- **Analysts and consultants** -- need persistent project memory across dozens of documents and hundreds of conversations.
- **Anyone** -- who has ever had a long conversation with an AI, asked it three weeks later what was decided, and gotten a confident hallucination.`,
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body: `- **Tractatus Tree Memory** -- Every project maintains a persistent JSONB tree of numbered, tagged claims (ASSERTS, REJECTS, ASSUMES, OPEN, RESOLVED, DOCUMENT, QUESTION). The tree is injected into every system prompt, giving the model effective recall across the entire history of a project -- not just the visible conversation window.
- **Recursive Memory Compression** -- When a project's tree reaches 200 nodes, it is automatically compressed into a higher-tier summary (Tier 2), preserving the most recent 30 nodes at full resolution in Tier 1. Tier 2 itself can be compressed into Tier 3, recursively. All tiers are loaded into the system prompt with per-tier character budgets (8K / 4K / 2K). Pre-compression snapshots are archived for audit.
- **Anti-Sycophancy Across the Memory Pipeline** -- The same anti-flattery rules appear in three places: the chat system prompt, the tractatus update prompt, and the compression prompt. Defeats cannot be reframed as "strategic opportunities" during memory writes or compressions. Numbers, dates, names, and case numbers are preserved verbatim.
- **Stance Toggle** -- Four-position content directive: Agreeable steel-mans the user's position, Strongly Critical steel-mans the contrary, Mildly Critical probes for weaknesses, Neutral weighs both sides. All four stances are equally bound by the truthfulness rules -- Agreeable mode still corrects factual errors plainly.
- **Three-Pass Coherence Engine** -- Long-form generation engine producing documents up to 150,000 words. Outline -> section-by-section streaming with auto-continuation -> global stitch-and-repair. Source material is keyword-matched per section; section sizes scale with target length; mandatory pauses between chunks for rate-limit safety.
- **Scholarly Research Integration** -- Optional checkbox in the paper writer hits Semantic Scholar, OpenAlex, CrossRef, and PubMed in parallel for each section, dedupes by title, formats with author/year/abstract/DOI, and injects the results into the section prompt with citation requirements.
- **Audit (Fact-Check)** -- Every assistant message has an Audit button. Streams a claim-by-claim analysis cross-referenced against the project's full tiered memory, source documents, and recent chat history. Each claim marked VERIFIED, UNVERIFIABLE, or CONTRADICTED with evidence citations. Dates, numbers, and names checked with extra strictness.
- **Staleness Detection** -- Projects track last_tree_update and compression_count. When a tree hasn't been updated in 3+ days or has been compressed 2+ times, a warning banner appears and anti-hallucination rules are injected into the system prompt forcing the model to qualify uncertain claims.
- **Document Library** -- Two tiers: per-project library scoped to each project, and a cross-project general library. PDF, DOCX, DOC, TXT, and image upload (PNG/JPG/GIF/BMP/TIFF/WebP via Google Cloud Vision OCR). Drag-and-drop. Multi-document selector in the paper writer.
- **Reports & Summaries** -- Generate prose reports scoped to the entire project, a single chat, or "since N trees ago" using archive snapshots as temporal checkpoints. Auto-scaled length based on source size.
- **User Analytics / Profile Me** -- Cross-project user profiling. A second tractatus-style tree built incrementally every fifth exchange tracks topics, conversational style, writing patterns, cognitive patterns, emotional patterns, and evolution. Generates a longitudinal clinical profile with a "Changes Since Last Profile" diff.
- **Reminders, Stance, Length, Format Controls** -- Sidebar reminders with active-count indicator. Four-mode response length (Concise / Normal / Detailed / Exhaustive). Two-mode response format (Prose / Bullets). Smart auto-continuation when the user requests a specific word count ("write 10000 words" -> up to 40 chained calls).
- **System Diagnostic** -- Five-phase self-check: environment variables, database tables, LLM API reachability (1-token ping to all four), functional CRUD round-trip with cleanup. Streams pass/fail per step. Distinguishes upstream rate-limits from real failures.
- **Multi-User Authentication** -- Username/password with bcryptjs, 30-day session cookies via connect-pg-simple, complete data isolation between users via user_id filters and ownership-verifier helpers in every route.`,
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body: `- **It actually remembers.** The tractatus tree gives the model effective recall across thousands of exchanges, far beyond any native context window. Ask about a detail from three months ago and the answer comes from project memory, not a hallucination.
- **Bad news stays bad news.** Most AI memory systems quietly soften adverse facts during summarization. LLM Plus enforces anti-sycophancy rules at the system-prompt layer, the tree-update layer, AND the compression layer. A motion denied is recorded as "Motion denied" -- not "Denial creates strategic opportunity."
- **Compression is recursive and lossless of structure.** When Tier 1 fills up, it compresses to Tier 2 -- not into a paragraph, but into a smaller numbered tree with the same tag vocabulary. When Tier 2 fills up, it compresses to Tier 3. The structure survives every compression cycle, so the model can reason against memory the same way at any depth.
- **Four LLMs, one project.** Switch between Claude, ChatGPT, DeepSeek, and Grok mid-conversation. The memory is model-agnostic -- every model sees the same tractatus tree and the same conversation history. Use Claude for analysis, DeepSeek for cheap bulk work, Grok for a contrarian second opinion, all in the same project.
- **Stance is a content directive, not a vibe.** Most "be more critical" toggles just change tone. The stance toggle here changes which case the model builds -- Agreeable steel-mans you, Strongly Critical steel-mans your opponent. Tone stays professional in all four; what changes is the argument under construction.
- **The audit trail is real.** Every pre-compression snapshot is archived. Every claim can be re-checked against the full tiered memory and source documents. Staleness is tracked and surfaced. The diagnostic verifies the whole stack end-to-end.
- **No frameworks, no surprises.** Plain HTML/CSS/JS frontend. Express + raw pg backend. No React, no Vite, no Tailwind, no TypeScript, no ORM. The whole backend is one file you can read top to bottom.`,
      },
      {
        emoji: "💡",
        title: "Stack",
        body: `Plain HTML/CSS/JS · Node.js + Express (ESM) · raw pg · Neon Postgres · Anthropic / OpenAI / DeepSeek / xAI APIs · Google Cloud Vision OCR`,
      },
    ],
  },
  "EZ Story": {
    emoji: "🎭",
    tagline: "Dual-Mode Story Converter -- Transform Fiction <-> Non-Fiction with Precision and Style",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `EZSTORY.AI is a bidirectional narrative transformation engine that converts fiction into non-fiction and non-fiction into fiction with full stylistic and structural control. It bridges the gap between storytelling and analysis -- letting users turn essays into immersive stories, or stories into polished academic arguments.

Designed for writers, educators, and content developers, it merges literary creativity with analytical rigor, producing outputs that are both stylistically consistent and conceptually sound.`,
      },
      {
        emoji: "🧠",
        title: "What It Does",
        body: `- **Fiction -> Non-Fiction Converter** -- Transforms short stories, novels, or scenes into essays, commentaries, or research-style analyses that preserve the original ideas while expressing them in academic or expository form.
- **Non-Fiction -> Fiction Converter** -- Converts essays, lectures, or reports into narrative prose -- short stories, dramatic scenes, or dialogues -- preserving factual content within an imaginative frame.
- **Custom Instruction Mode** -- Users can write their own transformation directives ("rewrite this essay as a Kafkaesque allegory" or "convert this story into a moral psychology paper") or use refined built-in defaults.
- **Style Sample Importer** -- Upload a writing sample to clone tone, diction, and rhythm; or select from predefined presets (e.g., philosophical, journalistic, literary).
- **Bidirectional Rewrite Engine** -- Allows recursive cycling: a story can be turned into an essay, refined, and then re-fictionalized -- preserving cumulative meaning while shifting registers.
- **Adaptive Context Awareness** -- Maintains narrative logic, temporal structure, and factual coherence through multi-layer semantic mapping.`,
      },
      {
        emoji: "⚙️",
        title: "Technical Features",
        body: `- **Dual-Pipeline Architecture:** Separate inference logic for narrative generation and analytic reformulation.
- **Semantic Style Alignment:** Matches tone and rhetorical structure between input and target genre.
- **Cognitive Mode Selector:** Fictionalization <-> De-fictionalization modes with precision scaling.
- **Preservation Matrix:** Tracks plot-concept correspondences to maintain continuity across transformations.
- **Multi-Model Integration:** Combines ZHI, SHEN, and proprietary narrative logic engines for balanced creativity and factual control.`,
      },
      {
        emoji: "🎯",
        title: "Designed For",
        body: `- **Authors & Storytellers:** Instantly transform research or essays into publishable narrative fiction.
- **Academics & Essayists:** Convert stories or creative writing into analytic prose suitable for publication or coursework.
- **Educators:** Demonstrate the structural relationship between argument and narrative form.
- **Developers & Publishers:** Generate dual-format content for multi-genre digital projects.`,
      },
      {
        emoji: "💡",
        title: "Core Idea",
        body: `EZSTORY.AI makes genre itself a tool of cognition. It shows that every story hides an argument -- and every argument hides a story.`,
      },
    ],
  },
  "Model Transformer": {
    emoji: "🎓",
    tagline: "Advanced AI Platform for Formal Analysis -- Transform, Compare, and Analyze Axiomatic Systems",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `Theory Transformer is a full-service AI reasoning suite for formal logic and axiomatic theories. It performs end-to-end analysis, transformation, and comparison of first-order logic systems -- from model-to-model translation and conservative-extension analysis to canonical rewriting and interpretation discovery.

Provides 10 specialized functions for working with first-order logic theories.

Designed for logicians, philosophers, mathematicians, and theoretical researchers, it merges rigorous proof-theoretic logic with intuitive, conversational explanations.`,
      },
      {
        emoji: "🧠",
        title: "What It Does",
        body: `- **Axiom-Set / Theory Transformation** -- Detects the underlying axiom pattern (strict order, equivalence, group, etc.) in a model description and produces a different but isomorphic model in a new domain, with explicit object mapping.
- **Schema & Definitional Equivalence** -- Two-argument checks that determine whether two theories share the same models or are mutually inter-definable, with concise 4-part output (RESULT, WHY, INTUITIVE EXPLANATION, TRANSLATED AXIOMS).
- **Model-Preserving Rewrite** -- Normalizes any axiom-set to canonical form (LANGUAGE: {predicates} + numbered AXIOMS), eliminating unnecessary primitives and producing pipeline-ready output.
- **Conservative Extension Analysis** -- Two-argument check (Base Theory T₁ vs. Extended Theory T₂) using the correct definition: T₂ is conservative iff it proves no new theorems in L₁.
- **Compare Conceptual Schemes** -- Side-by-side comparison of how two theories classify primitive vs. derived notions.
- **Ontological Dependence** -- Maps which primitives genuinely depend on which others.
- **Alternative Conceptualizations** -- Generates equivalent axiom-sets built on different primitive vocabularies.
- **Canonical Meaning Interpretation** -- Identifies the intended interpretations of primitive symbols.
- **Find an Interpretation** -- Locates true models across 23 domains organized into 5 groups (A-E), including mathematical, computational, philosophical, physical, linguistic, chemical, biological, economic, social, organizational, network, and market-microstructure interpretations.`,
      },
      {
        emoji: "⚙️",
        title: "Technical Features",
        body: `- **Multi-Provider Model Selection** -- Integrates Zhi 1, Zhi 2, Zhi 3, and Zhi 4 reasoning engines -- provider names fully abstracted behind unified branding.
- **Cross-Chunk Coherence (CC) System** -- Three-pass architecture (skeleton extraction → chunk processing → stitch verification) for large multi-domain batch jobs.
- **Isolated DB Instruction Sets** -- Every function and subfunction loads its own instructions from PostgreSQL -- fail-fast enforcement prevents cross-contamination between domains.
- **F10 Batch Mode** -- Each of 23 interpretation domains runs independently using its own f10-* preset.
- **5-Layer Fallback Chain** -- User instructions → subfunction DB lookup → main-function DB lookup → hardcoded defaults → generic fallback. No function ever runs with empty instructions.
- **Dual-Input UI** -- Functions 2, 3, 5, and 6 expose two side-by-side input boxes for comparison work, with <<<SEPARATOR>>> parsing on the backend.
- **Axiom Builder** -- Build single axiom-sets or paired System A / System B outputs with independent copy buttons.
- **Paste Normalization** -- Cleans malformed clipboard content from PDFs and word processors automatically.`,
      },
      {
        emoji: "🏗️",
        title: "Architecture",
        body: `- **Frontend** -- React + TypeScript, Vite, Wouter routing, TanStack Query, Shadcn/ui + Radix, Tailwind CSS v4 (Swiss/Rationalist theme).
- **Backend** -- Node.js + Express, TypeScript via tsx, RESTful /api/ endpoints (/api/process, /api/chat, /api/cc/batch, /api/cc/process, /api/cc/job/:jobId).
- **AI Layer** -- Unified provider abstraction over OpenAI, Anthropic, xAI (Grok), and DeepSeek SDKs.
- **Database** -- PostgreSQL via Drizzle ORM. Tables: instruction_sets (75 hyphen-keyed presets), mt_jobs, mt_chunks, mt_interpretations, users.
- **Build** -- Vite for client, esbuild for server bundling, output to dist/.`,
      },
    ],
  },
  "ModelWiz": {
    emoji: "🎓",
    tagline: "Advanced Multi-Model AI System -- Measure, Improve, and Humanize the Intelligence of Written Thought",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `The Cognitive Analysis Platform is a full-service intelligence evaluation and text optimization suite. It performs end-to-end analysis, scoring, and enhancement of written work -- from instant cognitive fingerprinting and intelligence grading to humanization, formal axiomatization, and rigorous mathematical proof checking.

Designed for researchers, writers, educators, and analytical philosophers, it merges precision evaluation logic with humanlike textual nuance -- turning raw text into a transparent map of the author's mind.`,
      },
      {
        emoji: "🧠",
        title: "What It Does",
        body: `- **Multi-Model Intelligence Evaluation** -- A 4-phase system that scores text across 17 cognitive dimensions, producing a complete intelligence and cognitive-fingerprint profile of the author.
- **MAXINTEL Rewriter** -- Recursively rewrites any text to maximize its measured intelligence score, with optional custom instructions and external knowledge integration.
- **GPT Bypass Humanizer** -- Transforms AI-generated prose into undetectable, human-style writing that bypasses AI detection filters without sacrificing meaning.
- **Coherence Meter** -- Evaluates structural and logical coherence of any text, with specialized modes for general writing, scientific argument, and mathematical proof.
- **Mathematical Proof System (Four Modes)** -- COHERENCE (structural soundness only), COGENCY (theorem truth + proof validity, surfaces counterexamples), MAX COHERENCE (rewrites for clarity while preserving claims), MAXIMIZE TRUTH (corrects defective proofs; if theorem is false, finds and proves a related true theorem).
- **Text Model Validator** -- Includes Reconstruction, Isomorphism, Mathematical Model, Truth Select, and Math Truth Select for literal truth verification across multiple reasoning engines.
- **Axiomatic System Transformer** -- Converts natural-language theory into a complete formal axiomatization: primitive terms, axioms, defined terms, an uninterpreted symbolic calculus, and a satisfying semantic model.
- **BOTTOMLINE Synthesizer** -- Distills batch analysis results into a polished final output tailored to a chosen audience, objective, tone, length, and emphasis.
- **Full Suite Pipeline** -- One-click execution of the entire pipeline (Batch → BOTTOMLINE → Objections) with real-time progress and a single "Copy All Results" export.
- **Objections Function** -- Generates 25 likely objections with compelling counter-arguments, usable standalone or as a follow-up to BOTTOMLINE.`,
      },
      {
        emoji: "⚙️",
        title: "Technical Features",
        body: `- **Multi-Provider Model Selection** -- Integrates ZHI 1 through ZHI 5 reasoning engines with automatic fallback for resilience under rate limits or outages.
- **Genre-Aware Analysis** -- Calibrates evaluation criteria to the genre and intent of the submitted text.
- **Aggressive Batch Mode** -- Runs multiple analytical functions simultaneously with enforced maximal-formalization and maximal-truth defaults.
- **Persistent Context Chat** -- AI assistant with conversation history and access to the Zhi knowledge database.
- **Document Intake** -- OCR-backed document ingestion (Mathpix), audio-to-text input (AssemblyAI), and direct file upload.
- **Export & Delivery** -- PDF and text downloads, formatted multi-section copy-to-clipboard, and email delivery (SendGrid).
- **Resilient Architecture** -- Optional Stripe billing, friendly error recovery, and silent multi-provider failover -- users never see raw error messages.`,
      },
      {
        emoji: "🎓",
        title: "Designed For",
        body: `- **Researchers & Analytical Philosophers** -- Measure the cognitive depth of arguments and stress-test theoretical claims.
- **Writers & Editors** -- Rewrite drafts to maximize clarity, intelligence, and stylistic precision.
- **Educators & Students** -- Evaluate essays, proofs, and arguments with rigorous, transparent scoring.
- **Mathematicians & Logicians** -- Audit proofs for both structural coherence and underlying truth, and formalize informal theory.`,
      },
      {
        emoji: "💡",
        title: "Core Idea",
        body: `The Cognitive Analysis Platform redefines text evaluation as an interactive analytical process. It doesn't just score -- it diagnoses, justifies, improves, and rewrites. The result: analysis that is faster, fairer, and intellectually honest.

**Cognitive Analysis Platform -- where evaluation meets evolution.**`,
      },
    ],
  },
  "Freud GPT": {
    emoji: "🎓",
    tagline: "The Thinker's Workshop -- Executable Philosophical Reasoning",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `FreudGPT is a full-service conversational AI platform that lets you consult the great thinkers of psychoanalysis, philosophy, and critical theory in their own voices, grounded in their actual writings.

It performs end-to-end philosophical dialogue, source-anchored reasoning, and long-form composition -- from rapid Q&A and rubric-faithful argumentation to coherent book-length essays, dialogues, and lectures.

Designed for scholars, researchers, students, and serious readers, it merges semantic retrieval over a curated corpus of ~24,500 philosophical positions with rigorous prompt engineering, producing answers that cite, paraphrase, and extend the thinker's actual work -- never glib summaries.`,
      },
      {
        emoji: "🧠",
        title: "What It Does",
        body: `- **Multi-Thinker Consultation** -- Converse with Freud, Kuczynski (ZHI), Jung, Hume, Nietzsche, and Bergler. Each thinker draws on their own dedicated database of positions, examples, and rhetorical patterns.
- **Source-Anchored Answers** -- Every major claim is traceable to a specific position from the thinker's corpus. Retrieved passages stream into "The Archive" panel in real time, so you can verify the textual grounding of every response.
- **Argument Synthesis (not Quote-Stitching)** -- The AI understands the retrieved positions and weaves them into coherent thesis-supporting-conclusion structures, preserving the thinker's exact examples, rhetorical questions, and step-by-step argumentative moves.
- **Memory Mode (Tractatus Trees)** -- Persistent project memory built as Wittgenstein-style numbered knowledge graphs (ASSERTS / REJECTS / ASSUMES / OPEN / RESOLVED). Trees compress, archive, and synthesize into meta-trees over time, giving the AI long-horizon recall across thousands of exchanges.
- **Long-Form Coherent Generation** -- Produces essays, dialogues, and lectures up to ~50,000 words with a single sustained argumentative arc. A two-tier skeleton + persistent state engine prevents the "pile of mini-essays" failure mode by tracking every claim, example, and open thread across sections.
- **Dialogue Mode** -- Switches the thinker into conversational mode: short answers when warranted, clarifying questions, and intellectual pushback against your premises.
- **Live Document Ingestion** -- Drop .txt, .json, .pdf, or .docx files into the ingest/ folder and the watcher automatically extracts, chunks, embeds, and adds them to the searchable corpus.`,
      },
      {
        emoji: "⚙️",
        title: "Technical Features",
        body: `- **Semantic Retrieval Engine** -- OpenAI text-embedding-3-small with cached pre-computed embeddings over a PostgreSQL position database, plus full-text RAG over 4,489 source-text chunks from the original works.
- **Multi-Provider AI Backbone** -- Pluggable across Anthropic Claude, OpenAI, DeepSeek, Perplexity, and Grok (xAI) -- switch providers per query.
- **Coherence Skeleton Engine** -- Adapted from NeuroText. Builds a macro plan (thesis + arc + sectional roles) and per-section micro plans (claims, positions, examples, bridges, anti-repetition lists), then drives a READ → GENERATE → EXTRACT → MERGE → WRITE loop with atomic transactional state commits.
- **Job Leasing & Resume** -- Long-form jobs persist in PostgreSQL with worker leases and heartbeats; interrupted jobs can be resumed without state drift, and concurrent runners are refused at the database level.
- **Streaming Architecture** -- Token-by-token SSE streaming for chat responses; per-section SSE for long-form jobs with live skeleton, word count, and state events.
- **Inference Engines** -- Forward-chaining rule engines for select thinkers deduce theoretical principles before LLM prose generation, so answers reflect the thinker's reasoning machinery rather than surface mimicry.
- **Self-Contradiction Detection** -- Conversation memory flags when the AI's current answer conflicts with prior statements in the same session.`,
      },
      {
        emoji: "🎓",
        title: "Designed For",
        body: `- **Researchers & Scholars** -- Source-anchored consultation with traceable citations to specific positions in each thinker's corpus.
- **Graduate Students** -- Long-form essay and dialogue generation that maintains a single coherent argument across tens of thousands of words.
- **Educators & Lecturers** -- Lecture-mode generation produces sequenced teaching units with explicit anti-repetition and bridging between segments.
- **Serious Readers** -- In-app reader for full philosophical works, synchronized source highlighting, and Memory Mode for sustained project-based study.`,
      },
      {
        emoji: "💡",
        title: "Core Idea",
        body: `FreudGPT redefines AI consultation as a grounded interpretive process.

It doesn't just impersonate -- it retrieves, reasons, and writes from the thinker's actual textual evidence. The result: philosophical dialogue that is faithful, traceable, and capable of sustained argument at any length.

**FreudGPT -- where the great thinkers speak again, in their own words.**`,
      },
    ],
  },
  "Ask A Philosopher": {
    emoji: "🎓",
    tagline: "Converse, Question, and Generate Long-Form Work in the Voice of History's Greatest Minds",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `Ask A Thinker is a full-service philosophical and intellectual conversation platform. It allows users to engage 55+ historical thinkers -- from Aristotle, Plato, and Nietzsche to Freud, Jung, Russell, and Kuczynski -- in their authentic voice, across multiple modes of inquiry: dialogue, debate, interview, essay, and full scholarly paper generation.

Designed for scholars, students, writers, and the intellectually curious, it merges precision retrieval over each thinker's actual corpus with a long-form generation engine capable of producing coherent, non-repetitive work up to ~50,000 words.`,
      },
      {
        emoji: "🧠",
        title: "What It Does",
        body: `- **Authentic Voice Chat** -- Hold a real conversation with any of the 55+ thinkers in their own diction, vocabulary, and argumentative style, grounded in their actual texts and positions.
- **Five Conversation Modes** -- Switch between Dialogue (natural conversation), Essay (~2,000 words), Paper (full scholarly treatment up to 5,000 words), Interview (rigorous hostile questioning), and Philosophical Guidance (moral reflection with Bible cross-references).
- **Long-Form Generator (NEW)** -- A two-tier "skeleton" engine plans a master outline plus per-section sub-skeletons, then streams chapter-by-chapter output up to ~50,000 words while suppressing repetition and tracking conflicts.
- **Document Intake** -- Upload .txt, .docx, or .pdf files for the thinker to analyze, critique, rewrite, or respond to.
- **Download & Export** -- Save any chat thread or generated paper as a downloadable file for archival, citation, or further editing.
- **Voice Synthesis** -- Hear any thinker speak their reply aloud using Azure Cognitive Speech, with gender-matched neural voices.
- **Persistent Chat History** -- Every conversation is stored, searchable, and resumable; nothing is lost between sessions.`,
      },
      {
        emoji: "⚙️",
        title: "Technical Features",
        body: `- **Multi-Provider Model Selection** -- Choose between Anthropic Claude, OpenAI GPT, DeepSeek, Grok, Perplexity, and ZHI as the underlying reasoning engine for any conversation.
- **Two-Tier Skeleton Engine** -- Master outline + per-section ≥8K sub-skeletons drive coherent long-form output far beyond standard context windows.
- **Anti-Repetition Tracker** -- A rolling claims/phrases ledger and recent-tail buffer prevent the model from circling back on points it has already made.
- **Final Coherence Audit** -- A "stitch" pass reviews the assembled work and reports any contradictions or unresolved tensions.
- **Live Streaming (SSE)** -- All long-form work streams chunk-by-chunk in real time, with full client-disconnect handling that immediately stops token spend.
- **RAG Grounding** -- Each thinker's actual writings are vector-indexed (pgvector), so replies cite real positions, real quotes, and real argument statements.
- **Adjustable Persona Settings** -- Per-user controls for response length, quote frequency, dialogue vs. formal tone, and active model provider.
- **Authentication** -- Sign in with Google OAuth or Replit Auth.`,
      },
      {
        emoji: "🎓",
        title: "Designed For",
        body: `- **Scholars & Researchers** -- Generate full-length papers, draft literature reviews, and stress-test arguments against historical positions.
- **Students & Learners** -- Hold tutorial-style dialogues, interview thinkers on assigned readings, and produce essay drafts in any thinker's voice.
- **Writers & Essayists** -- Use the long-form engine to draft book chapters, dialogues, and debates that hold their thread across tens of thousands of words.
- **Educators** -- Build classroom material, sample papers, and Socratic dialogues on demand.`,
      },
      {
        emoji: "💡",
        title: "Core Idea",
        body: `Ask A Thinker redefines the conversation with the past as a living intellectual exchange. It doesn't just quote thinkers -- it thinks alongside them, in their voice, on the topics you choose, at any length you require. The result: serious philosophical work that's faster to draft, deeper to read, and authentically grounded in the thinker's own corpus.

**Ask A Thinker -- where great minds answer back.**`,
      },
    ],
  },
  "EZGrader": {
    emoji: "🧠",
    tagline: "AI Grading Engine -- Evaluate, Annotate, and Return Coursework at Scale",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `GRADING PRO is a full-scale AI grading and feedback platform built for evaluating real student work on demand.

It transforms raw submissions -- essays, problem sets, screenplays, lab reports, code -- into finished, justified grades with line-level feedback, then refines those evaluations to match each instructor's exact standards.

Designed for educators who need precision, scale, and control, GRADING PRO eliminates the typical failures of AI grading: shallow rubrics, hallucinated quotes, inconsistent scoring, and loss of academic context.`,
      },
      {
        emoji: "❄️",
        title: "What It Does",
        body: `- **One-Click Assignment Grading** -- Turn a prompt and a stack of submissions into fully graded work
- **Long-Form Document Engine** -- Grade complete documents up to ~400K words in a single run
- **Multi-Format Intake** -- Accepts PDF, DOCX, plain text, and image-based submissions
- **Math & Science OCR** -- Reads handwritten and typeset equations through Mathpix
- **AI Detection Layer** -- Flags AI-generated content with GPTZero before grading
- **Precision Rubric Engine** -- Re-grades submissions until feedback matches the instructor's calibration`,
      },
      {
        emoji: "🌿",
        title: "Core Systems",
        body: `- **Multi-Model Routing** -- Routes grading tasks across six proprietary LLMs (SHEN 1-6)
- **Three-Pass Coherence Engine** -- Maintains rubric consistency across very large submissions
- **Recursive Refinement Loop** -- Iteratively improves feedback toward target rigor and tone
- **Instruction Fidelity System** -- Executes exactly the rubric and grading criteria the instructor specifies
- **Academic Calibration Layer** -- Adjusts tone and expectations across K-12, undergraduate, graduate, and PhD levels`,
      },
      {
        emoji: "🚀",
        title: "Key Advantages",
        body: `- Produces finished grades and feedback, not drafts
- Handles large-scale documents (up to ~400K words)
- Maintains rubric coherence across long submissions
- Eliminates AI padding, vague praise, and generic feedback
- Built for serious academic evaluation, not casual chat
- Optional grading instructions -- falls back to standard academic criteria when none are provided`,
      },
      {
        emoji: "🎯",
        title: "Use Cases",
        body: `- **University Courses** -- Grade essays, problem sets, and exams at scale
- **Writing Programs** -- Evaluate long-form work with consistent rubric application
- **STEM Coursework** -- Grade math, physics, and engineering submissions with equation OCR
- **Screenwriting & Film** -- Evaluate properly formatted scripts and treatments
- **Test Prep & Tutoring** -- Generate detailed feedback on practice work
- **Department-Wide Standardization** -- Calibrate grading across multiple instructors and sections`,
      },
      {
        emoji: "🧬",
        title: "Academic Levels Supported",
        body: `K-12 · Community College · College Freshman · Sophomore · Junior · Senior · Undergraduate · Graduate · PhD`,
      },
      {
        emoji: "⚙️",
        title: "Tech Stack",
        body: `- **Frontend** -- React 18, TypeScript, Vite, Tailwind, shadcn/ui, KaTeX
- **Backend** -- Node.js, Express, TypeScript (ESM)
- **Database** -- PostgreSQL via Drizzle ORM
- **AI Providers** -- OpenAI, Anthropic, DeepSeek, Perplexity
- **Specialized Services** -- GPTZero (AI detection), Mathpix (math OCR)`,
      },
    ],
  },
  "NeuroText": {
    emoji: "🧠",
    tagline: "Multi-Model AI Platform for Serious Writing, Analysis, and Document Transformation",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `NEUROTEXT is a multi-model AI platform for serious writing, analysis, and document transformation. It plugs into five top-tier proprietary LLMs and lets users route any task to the model best suited for it -- academic writing, deep reasoning, factual research, mathematical proofs, or casual content.

Unlike consumer chatbots that produce generic, hedged, watered-down output, NEUROTEXT is built around a strict operating principle: the user's instructions are sacred. If you say "do not omit a single fact," nothing is omitted. If you say "divide by date," it divides by date. If you say "rewrite all 30,000 words," it rewrites all 30,000 words. No padding, no preamble, no editorializing.`,
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body: `- **Academics, graduate students, and researchers** -- need to write dissertations, journal articles, and literature reviews where coherence matters across hundreds of pages
- **Lawyers and legal professionals** -- need to organize, restructure, and brief case material without losing a single fact
- **Authors, screenwriters, and content creators** -- need long-form generation with structural integrity
- **Analysts and consultants** -- need to compress, expand, or reformat large documents while preserving every detail
- **Anyone** -- who has ever asked an AI for a 5,000-word document and gotten 800 words back`,
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body: `- **Multi-Model Intelligence Evaluation** -- A 4-phase scoring system evaluates any text across 17 cognitive dimensions (depth, originality, conceptual control, argumentative rigor, semantic density). Genre-aware; compare scores across multiple LLMs side-by-side.
- **Universal Expansion with Three-Pass Cross-Chunk Coherence** -- Document expansion engine handling inputs up to 100,000 words. Extracts a skeleton, processes constrained chunks, then runs a stitch pass for full-document coherence. Hits target word counts precisely.
- **Conservative Reconstruction** -- Generates coherent, charitable essays articulating a text's unified argument. Outline-first for medium documents, cross-chunk for very long ones. Real-time progress polling.
- **Full Suite Pipeline** -- One-click three-stage processing: Reconstruction → 25 Likely Objections → Objection-Proof Final Version.
- **MAXINTEL Intelligent Rewrite** -- Recursively optimizes text to maximize intelligence scores. Keeps rewriting until cognitive metrics hit your target.
- **GPT Bypass Humanizer** -- Transforms AI-generated text to evade AI detection tools, with built-in detection integration.
- **Coherence Meter** -- Validates logical and semantic coherence across documents up to 5,000 words. Includes specialized modes for mathematical proofs and scientific-explanatory writing.
- **Screenplay Generator** -- Converts source material (novels, articles, true stories, ideas) into properly formatted screenplays.
- **Signal Refiner** -- Post-processing engine that maximizes signal-to-noise ratio in long generated text. Designed for documents over 10,000 words.
- **Dissertation Wizard** -- Step-by-step guided dissertation generation with chapter planning, automatic TOC, and chapter-by-chapter coherence enforcement.
- **AI Chat Assistant** -- Conversational interface backed by a proprietary knowledge database, with persistent history and document context awareness.
- **Multi-Document Library** -- Load up to 5 source documents simultaneously and have the AI work across all of them.
- **Translation, Web Search, Speech-to-Text, Document Comparison** -- Full document workflow tools built in.`,
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body: `- **It actually follows instructions** -- The system's job is to do exactly what you said, no more, no less.
- **It hits word count targets** -- Ask for 50,000 words, get 50,000 words.
- **It handles long documents intelligently** -- Three-pass cross-chunk architecture preserves coherence even at 100,000 words.
- **Five proprietary LLMs, one workflow** -- Pick the model best suited for each task from a single interface.
- **Cognitive scoring built in** -- Every output can be scored across 17 cognitive dimensions.
- **Comprehensive rewrite detection** -- When you say "rewrite all of it," the system sizes the output to match the input automatically.`,
      },
      {
        emoji: "💳",
        title: "Pricing",
        body: `Token-based credits -- **$100 buys 1,000 credits**. Provider-specific multipliers reflect the actual cost of each proprietary LLM. Stripe-integrated checkout, real-time balance updates. Freemium tier for casual users, full power unlocked at any credit purchase.`,
      },
    ],
  },
};

export default function Home() {
  const livingBooksByKuczynski = [
    { title: "AI AND PHILOSOPHY", url: "https://aiandphilosophy.com" },
    { title: "AI LOGIC", url: "https://ailogic101.xyz" },
    { title: "ANALYTIC PHILOSOPHY (COMPLETE)", url: "https://analyticphilosophy.xyz" },
    { title: "CAUSATION", url: "https://causality101.xyz" },
    { title: "CRITICAL REASONING", url: "https://criticalreasoning.xyz" },
    { title: "DICTIONARY OF ANALYTIC PHILOSOPHY", url: "https://philosophydictionary.xyz" },
    { title: "EMPIRICISM AND ITS LIMITS", url: "https://empiricism101.xyz" },
    { title: "EPISTEMOLOGY", url: "https://epistemology101.xyz" },
    { title: "ETHICS", url: "https://ethics101.xyz" },
    { title: "FREEDOM", url: "https://freedom101.xyz" },
    { title: "MATHEMATICAL LOGIC", url: "https://mathematicallogic.app" },
    { title: "ON THE CARDINALITY OF PROOF SPACES", url: "https://godel101.xyz" },
    { title: "SEMANTICS", url: "https://semantics101.xyz" },
    { title: "SYMBOLIC LOGIC", url: "https://symboliclogic.xyz" },
    { title: "WHY WAS SOCRATES EXECUTED?", url: "https://socrates101.xyz" }
  ];

  const classicsBooks = [
    { title: "ANARCHISM AND OTHER ESSAYS", url: "https://anarchismandotheressays.xyz" },
    { title: "ART OF WAR", url: "https://theartofwarbysuntzu.xyz" },
    { title: "CIVILIZATION AND ITS DISCONTENTS", url: "https://civilizationanditsdiscontents.xyz" },
    { title: "DEATH OF IVAN ILYCH", url: "https://ivanilych.xyz" },
    { title: "DRACULA", url: "https://dracula101.xyz" },
    { title: "DREAM PSYCHOLOGY", url: "https://dreampsychology.xyz" },
    { title: "FRANKENSTEIN", url: "https://frankenstein101.xyz" },
    { title: "KING JAMES BIBLE", url: "https://kingjamesbible.xyz" },
    { title: "PRINCIPLES OF PSYCHOLOGY", url: "https://herbertspencer.xyz" },
    { title: "SHAKESPEARE COMPLETE WORKS", url: "https://shakespeare101.xyz" },
    { title: "THE COMMUNIST MANIFESTO", url: "https://communistmanifesto.xyz" },
    { title: "THE LAWS", url: "https://thelawsbyplato.xyz" },
    { title: "TOTEM AND TABOO", url: "https://totemandtaboo.xyz" },
    { title: "TRACTATUS LOGICO-PHILOSOPHICUS", url: "https://tractatuslogicophilosophicus.xyz" }
  ];

  const appCategories: Record<string, App[]> = {
    "📝 Writing & Books": [
      { title: "Living Book Creator", url: "https://livingbook.xyz/" },
      { title: "Book Builder", url: "https://bookbuilder.xyz" },
      { title: "Genius Dictation", url: "https://geniusdictation.com", videoUrl: "/videos/genius-dictation-tutorial.mkv" },
      { title: "EZ Reader", url: "https://ezreader.ai" },
      { title: "EZ Story", url: "https://ezstory.xyz", videoUrl: "https://www.youtube.com/watch?v=sRaZtSnkybM" },
      { title: "Reading Pro", url: "https://readingpro.xyz" },
      { title: "TextMD", url: "https://textmd.xyz" },
      { title: "NeuroText", url: "https://neurotext.uk" },
      { title: "OCR Pro", url: "https://ocrpro.xyz" }
    ],
    "🎓 Education & Learning": [
      { title: "Chess Tutor", url: "https://chesstutor.xyz" },
      { title: "EZ Homework", url: "https://ezhw.xyz" },
      { title: "EZGrader", url: "https://ezgrader.ai", videoUrl: "/videos/ezgrader-tutorial.mp4" }
    ],
    "🧠 Intelligence & Psychology": [
      { title: "Ask A Philosopher", url: "https://analyticphilosophy.net" },
      { title: "Freud GPT", url: "https://freudgpt.me" },
      { title: "Model Builder", url: "https://modelwiz.xyz" },
      { title: "Originality Meter", url: "https://originalitymeter.com", videoUrl: "https://www.youtube.com/watch?v=lRdczUD_0PE" },
      { title: "Intelligence Meter", url: "https://intelligencemeter.xyz" },
      { title: "Major Brain", url: "https://majorbrain.xyz" },
      { title: "Maximize Intelligence", url: "https://maximizeintelligence.xyz", videoUrl: "/videos/maximize-intelligence-tutorial.mp4" },
      { title: "Mind Profiler", url: "https://mindprofiler.xyz/", videoUrl: "/videos/mind-profiler-tutorial.mp4" },
      { title: "Text Evaluator", url: "https://textevaluator.xyz" },
      { title: "Text IQ", url: "https://textiq.xyz/", videoUrl: "/videos/text-iq-tutorial.mp4" },
      { title: "Improve Your Writing", url: "https://improveyourwriting.xyz" },
      { title: "Cognitive Enhancer", url: "https://cognitiveenhancer.xyz" },
      { title: "Psychology Pro", url: "https://psychologypro.xyz", videoUrl: "https://www.youtube.com/watch?v=0hIA4NsETZw" },
      { title: "Cognitive Profiler", url: "https://supercognitiveprofiler.com" },
      { title: "Semantic Skeletonizer", url: "https://semskel.xyz" },
      { title: "Text Genius", url: "https://textgenius.xyz" },
      { title: "ModelWiz", url: "https://modelwiz.xyz" },
      { title: "Model Transformer", url: "https://modeltransformer.xyz/" },
      { title: "LLM Plus", url: "https://llmplus.xyz/" }
    ],
    "📸 Visual & Multimedia": [
      { title: "Frame Shot", url: "https://frameshot.xyz" },
      { title: "Photo Psychoanalysis", url: "https://photopsychoanalysis.xyz" },
      { title: "Smart Photo/Video Viewer", url: "https://smartphotoviewer.xyz" }
    ],
    "🎧 Audio & Interactive Media": [
      { title: "Audio Transcriber", url: "https://audiotranscriber.xyz" },
      { title: "Audio Visualizer", url: "https://audiovisualizer.xyz" },
      { title: "Podcast Creator", url: "https://ezpodcast.xyz" }
    ],
    "⚙️ Utility & Conversion": [
      { title: "GPTByPass", url: "https://gptbypass.xyz", videoUrl: "https://www.youtube.com/watch?v=PR0JX_Hrgqc" },
      { title: "HTML Converter", url: "https://htmlconverter.xyz" },
      { title: "PDF Shrinker", url: "https://shrinkpdf.xyz" }
    ],
    "💹 Finance": [
      { title: "Forex Edge", url: "https://usdhkd.xyz" },
      { title: "SOXL Options Pro", url: "https://soxlpro.xyz" },
      { title: "SOXL Options Edge", url: "https://soxledge.xyz" }
    ]
  };

  const BookItem = ({ title, url, note, author, videoUrl }: { title: string; url: string | null; note?: string; author?: string; videoUrl?: string }) => (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
      <div className="w-full sm:w-80">
        <span className="font-medium text-gray-900">{title}</span>
        {author && (
          <div className="text-xs text-gray-600 mt-1">{author}</div>
        )}
      </div>
      <span className="text-gray-500 hidden sm:inline">—</span>
      {url ? (
        <div className="flex items-center gap-3">
          <a 
            href={url} 
            className="text-blue-600 hover:text-blue-800 hover:underline break-all"
            target="_blank"
            rel="noopener noreferrer"
          >
            {url}
          </a>
          {videoUrl && (
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors whitespace-nowrap"
              data-testid={`video-tutorial-${title.toLowerCase().replace(/\s+/g, '-')}`}
            >
              📹 Tutorial
            </a>
          )}
        </div>
      ) : (
        <span className="text-gray-600 italic">{note}</span>
      )}
    </div>
  );

  const renderInline = (text: string) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={i} className="font-semibold text-gray-900">{part.slice(2, -2)}</strong>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  const renderSectionBody = (body: string) => {
    const blocks = body.split(/\n\n+/);
    return blocks.map((block, i) => {
      const lines = block.split("\n");
      if (lines.every((line) => line.trim().startsWith("- "))) {
        return (
          <ul key={i} className="list-disc pl-6 space-y-2 text-gray-700">
            {lines.map((line, j) => (
              <li key={j} className="leading-relaxed">{renderInline(line.trim().slice(2))}</li>
            ))}
          </ul>
        );
      }
      return (
        <p key={i} className="text-gray-700 leading-relaxed">{renderInline(block)}</p>
      );
    });
  };

  const AppItem = ({ title, url, videoUrl }: App) => {
    const [expanded, setExpanded] = useState(false);
    const description = appDescriptions[title];
    const testId = title.toLowerCase().replace(/\s+/g, '-');
    return (
      <div className="border-b border-gray-100 pb-3 last:border-b-0">
        <div className="flex flex-col sm:flex-row sm:items-start gap-2">
          <div className="w-full sm:w-80">
            {description ? (
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 font-medium text-gray-900 hover:text-blue-700 text-left"
                aria-expanded={expanded}
                data-testid={`expand-${testId}`}
              >
                {expanded ? (
                  <ChevronDown className="w-4 h-4 flex-shrink-0" />
                ) : (
                  <ChevronRight className="w-4 h-4 flex-shrink-0" />
                )}
                <span>{title}</span>
              </button>
            ) : (
              <span className="font-medium text-gray-900 inline-flex items-center gap-1">
                <span className="w-4 h-4 inline-block" />
                {title}
              </span>
            )}
          </div>
          <span className="text-gray-500 hidden sm:inline">—</span>
          <div className="flex items-center gap-3">
            <a
              href={url}
              className="text-blue-600 hover:text-blue-800 hover:underline break-all"
              target="_blank"
              rel="noopener noreferrer"
            >
              {url}
            </a>
            {videoUrl && (
              <a
                href={videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded transition-colors whitespace-nowrap"
                data-testid={`video-tutorial-${testId}`}
              >
                📹 Tutorial
              </a>
            )}
          </div>
        </div>
        {expanded && description && (
          <div
            className="mt-4 bg-white border border-gray-200 rounded-lg shadow-sm max-w-4xl overflow-hidden"
            data-testid={`description-${testId}`}
          >
            <div className="px-6 pt-6 pb-4 border-b border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>{description.emoji}</span>
                <span>{title.toUpperCase()}</span>
              </h3>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 hover:underline text-sm mt-2 inline-block"
              >
                {url}
              </a>
              <p className="text-gray-800 font-semibold mt-2">{description.tagline}</p>
            </div>
            <div className="px-6 py-4 space-y-6">
              {description.sections.map((section, i) => (
                <section key={i}>
                  <h4 className="text-lg font-semibold text-gray-900 flex items-center gap-2 pb-2 mb-3 border-b border-gray-200">
                    <span>{section.emoji}</span>
                    <span>{section.title}</span>
                  </h4>
                  <div className="space-y-3 text-sm">
                    {renderSectionBody(section.body)}
                  </div>
                </section>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="font-sans bg-white text-gray-900 leading-relaxed min-h-screen">
      {/* Contact Us - Top Left */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <a 
              href="mailto:contact@zhisystems.ai" 
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contact Us
            </a>
            <div className="flex items-center gap-6">
              <a
                href="/courses"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Living Courses
              </a>
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

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Main Header */}
        <header className="mb-12">
          <img 
            src="/zhi-systems-logo.png" 
            alt="Zhi Systems - High-Performance AI Tools for Writers, Thinkers, and Analysts" 
            className="h-20"
            data-testid="img-logo"
          />
        </header>

        {/* About Zhi Systems */}
        <section className="mb-12">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 space-y-3">
            <p className="text-gray-900 text-base font-semibold">
              About Zhi Systems
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              Zhi Systems builds high-performance, fully customized AI
              applications for writing, psychological research, financial
              forecasting, and specialized utilities (such as GPTByPass and
              Audio Transcriber).
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              We are also the leading creator of autonomous AI-powered Living
              Courses -- complete with embedded real-time tutors and designed
              to meet the strictest accreditation and integrity standards.
            </p>
            <p className="text-gray-700 text-sm leading-relaxed">
              We work with clients of all sizes and are extremely flexible. Our
              traditional clients include hedge funds, law firms, and think
              tanks.
            </p>
          </div>
        </section>

        {/* Core Applications Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
            Core Applications
          </h2>
          
          {Object.entries(appCategories).map(([category, apps]) => (
            <div key={category} className="mb-8">
              <h3 className="text-lg font-medium text-gray-800 mb-4">
                {category}
              </h3>
              <div className="grid gap-3">
                {apps.map((app) => (
                  <AppItem
                    key={app.title}
                    title={app.title}
                    url={app.url}
                    videoUrl={app.videoUrl}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Living Books Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
            Living Books
          </h2>
          
          {/* What's a Living Book explanation */}
          <div className="mb-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">What's a Living Book?</h3>
            <p className="text-gray-700 mb-3">
              A Living Book is an interactive version of any text, powered by AI. Features include:
            </p>
            <ul className="text-gray-700 space-y-1 list-disc list-inside">
              <li>Ask AI anything about the text (math notation supported)</li>
              <li>Get AI to write about the text (with full math export support)</li>
              <li>Rewrite the text using custom instructions</li>
              <li>Generate tests based on the text</li>
              <li>Take AI-generated tests</li>
              <li>Create study guides</li>
              <li>Generate podcasts from selected passages</li>
              <li>Listen to AI narration</li>
            </ul>
          </div>
          
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              BY ZHI SYSTEMS
            </h3>
            
            <div className="grid gap-3">
              {livingBooksByKuczynski.map((book) => (
                <BookItem key={book.title} title={book.title} url={book.url} />
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Classics / Public Domain
            </h3>
            
            <div className="grid gap-3">
              {classicsBooks.map((book) => (
                <BookItem key={book.title} title={book.title} url={book.url} />
              ))}
            </div>
          </div>
        </section>
      </div>
      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 mt-16">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <p className="text-gray-600 text-center">
            © Zhi Systems 2025
          </p>
        </div>
      </footer>
    </div>
  );
}


