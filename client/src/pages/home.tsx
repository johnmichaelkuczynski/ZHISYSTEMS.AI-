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
  "Living Book Creator": {
    emoji: "📚",
    tagline: "Multi-Model AI Platform for Academic Writing, Document Analysis, and Argument Reconstruction",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `Living Book Creator is a multi-model AI workbench for evaluating, transforming, and arguing with any written text. It plugs into five top-tier providers (Grok / xAI as the default, plus OpenAI, Anthropic, DeepSeek, and Perplexity) and lets users route any task to the model best suited for it -- chat, study guide generation, dialectical analysis, structured outlining, full document reconstruction, podcast scripting, two-document synthesis, and more.

Unlike consumer chatbots that produce generic, hedged, watered-down output, Living Book Creator is built around a strict operating principle: every analysis is rigorous, every output is explicit, and the user's instructions are sacred. If you ask for a 10-question test, you get 10. If you ask for a strict outline of a 12,000-word document, the outline covers the document -- not a vague summary of it. No padding, no preamble, no editorializing.`,
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body: `- **Academics, graduate students, and researchers** -- need to evaluate, summarize, and stress-test papers, dissertations, and arguments before submission or publication
- **Philosophers and theorists** -- need formal axiomatization, dialectical analysis, and structured argument diagrams of theoretical claims
- **Writers and authors** -- need full-length rewrites, podcast adaptations, and side-by-side comparisons of competing manuscripts
- **Students** -- need study guides, custom-difficulty tests, and one-click question sets generated from any source document
- **Lawyers, analysts, and consultants** -- need to extract positions, compare opposing documents, and generate dialectical analyses
- **Anyone** -- who wants to upload a document and have an actually intelligent reader engage with it instead of summarizing it back`,
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body: `- **Multi-Provider AI Routing** -- Five integrated providers (Grok / xAI, OpenAI GPT-4o, Anthropic Claude, DeepSeek, Perplexity). Route any task to any model on demand. Grok is the default; every other provider is one click away.
- **Document Workflow** -- PDF / DOCX / TXT upload, mathematical notation preservation (KaTeX + MathJax), HTML structure preservation via mammoth.js, iframe-based stable viewers, and a dedicated Document Formatter for cleanup and math editing.
- **Contextual AI Chat** -- Highlight any passage and chat about it. The AI sees only the selected text plus the document context, so answers are anchored to what you actually pointed at, not the whole file.
- **Study Guide Generator** -- Generates structured study guides scaled to the length and complexity of the selected text. Output is formatted, not collapsed into one paragraph.
- **Test Me** -- Customizable difficulty (1-10), proportional question counts (10-30 for single-doc, ~32 for two-doc), and five categories of questions per test (Factual, Conceptual, Analytical, Application, Critical Evaluation). Single-question and full-test modes both supported.
- **Strict Outline** -- Numbered section-by-section outline of any document, with title + description per section and key themes as badges. Outline reflects the actual structure of the source, not an AI's guess at what should be there.
- **Full Document Rewrite** -- Two-pass pipeline: generate strict outline first, then expand into a full reconstructed document in one continuous flow. Supports custom rewrite instructions.
- **Summary + Thesis** -- Extracts the core thesis and a structured summary, kept distinct so you can see what the text says vs. what it actually argues.
- **Thesis Deep-Dive** -- Long-form expansion of a single thesis: arguments, evidence, philosophical foundations, implications.
- **Position Statement Generator** -- Extracts the explicit position(s) a text takes on a topic, with optional verbatim quote support.
- **Dialectical Analysis** -- Reconstructs the argumentative back-and-forth implied by the text: claims, counter-claims, rebuttals, and concessions.
- **Structured Diagram** -- Color-coded visual breakdown of argumentative structure: main thesis, sub-theses, supporting arguments (with evidence and reasoning), auxiliary arguments, critiques and rebuttals, and concluding formulation.
- **Suggested Readings** -- Generates a curated reading list anchored to the selected text's themes, arguments, and discipline.
- **Podcast Generation** -- Single-narrator, dialogue (HOST/GUEST), and custom modes. Multi-section script generation scaled to text length (20-90 conversational exchanges). SSML output drives Azure TTS with distinct voices ("alloy" host, "nova" guest) for natural delivery. One-click MP3 download.
- **Content Rewriting** -- Custom-instruction rewrite of any selected passage, with provider-of-choice routing.
- **Two-Document Mode** -- Side-by-side viewer with a full second-tier toolset: Compare & Contrast, Mentalities (analyzing the worldview behind each), Synthesize, Test Me (cross-document), Question Set, Create Dialogue (between the two authors), Rewrite, Two-Doc Podcast, and Comparative Diagram.
- **Comparative Diagram** -- Multi-section argumentative comparison across two documents: theses, methodologies, evidence quality, assumptions, implications, strengths, weaknesses, philosophical foundations, practical applications, and synthesis.
- **System Diagnostic** -- One-click self-check that verifies all API providers, the database, and the full functional pipeline are operational. Color-coded pass / fail / warn / skip report with per-check timing. Confirms formal properties (submit works, endpoints respond, sessions persist) without grading the AI's answers.
- **Credit System & Auth** -- User accounts, persistent chat history, per-operation credit tracking, and Stripe-ready payment integration.`,
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body: `- **It actually follows instructions** -- The system's job is to do exactly what you said. If you ask for 30 test questions, you get 30, not 7. If you ask for a structured outline of a 12,000-word essay, you get a structured outline of a 12,000-word essay, not a 200-word summary.
- **It separates structure from content** -- Outlines reflect the document's real architecture. Tests are categorized by cognitive type. Argument diagrams distinguish supporting evidence from rebuttals. Most AI tools collapse all of this into one undifferentiated "summary"; this platform does not.
- **Five proprietary providers, one workflow** -- Grok (default), OpenAI, Anthropic, DeepSeek, Perplexity. Pick the model best suited for each task, or run them in parallel and compare. No lock-in to a single vendor's quirks.
- **Two-document analysis is first-class, not bolted on** -- Compare & Contrast, Mentalities, Synthesize, cross-document Test Me, Create Dialogue, Comparative Diagram, and a dedicated two-doc podcast pipeline are all built directly into the side-by-side workspace.
- **Length-proportional output** -- Test counts, podcast exchange counts, and outline section counts scale with the input text. A two-page note doesn't get the same treatment as a 90-page chapter, and neither gets short-changed.
- **Full document reconstruction in one pass** -- Outline + expansion happen together. The pipeline doesn't stop halfway and ask you to confirm; it just produces the finished document.
- **Math survives the round trip** -- KaTeX + MathJax + a dedicated math-notation processor preserve equations through upload, processing, rewriting, and export. Most AI tools mangle math; this one doesn't.
- **Verifiable plumbing** -- The built-in System Diagnostic runs 27 end-to-end checks (env vars, DB, every provider's live ping, every major endpoint's actual HTTP behavior) and reports formal pass/fail with timings. You don't have to guess whether something is broken.
- **Document fidelity** -- DOCX uploads preserve HTML structure via mammoth.js. PDF uploads keep their text content. Exports go back out as DOCX. The document is the unit of work, not a wall of plain text.`,
      },
    ],
  },
  "ModelWiz": {
    emoji: "🧠",
    tagline: "Cognitive Analysis Platform -- Multi-Model AI for Intelligence Analysis, Cognitive Profiling, and Argument Stress-Testing",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `The Cognitive Analysis Platform is a multi-model AI system for evaluating the intelligence and cognitive fingerprint of any written text. It plugs into five top-tier proprietary LLMs (ZHI 1-5) and lets users route any task to the model best suited for it -- intelligence scoring, formal axiomatization, mathematical proof checking, scientific accuracy auditing, or full-pipeline argument synthesis.

Unlike consumer chatbots that produce generic, hedged, watered-down output, the Cognitive Analysis Platform is built around a strict operating principle: every analysis is rigorous, every verdict is explicit, and the user's instructions are sacred. If you ask for 25 objections, you get 25 objections. If you ask for a refined rewrite that absorbs every counter-argument, that is exactly what is produced. No padding, no preamble, no editorializing.`,
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body: `- **Academics, graduate students, and researchers** -- need to evaluate the intellectual rigor of papers, dissertations, and arguments before submission or publication.
- **Philosophers and theorists** -- need formal axiomatization, proof-checking, and conceptual stress-testing of theoretical claims.
- **Mathematicians** -- need separate evaluation of structural coherence vs. mathematical truth, plus automatic correction of defective proofs.
- **Lawyers, analysts, and consultants** -- need to anticipate every objection a critic could raise and have a polished, objection-proof final document.
- **Authors and entrepreneurs** -- need to know whether their ideas survive scrutiny before committing them to print or pitch.
- **Anyone** -- who wants to know what an actually intelligent reader would think of their writing, instead of a flattering AI summary.`,
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body: `- **Multi-Model Intelligence Evaluation** -- A 4-phase scoring system evaluates any text across 17 cognitive dimensions (depth, originality, conceptual control, argumentative rigor, semantic density). Genre-aware; compare scores across multiple LLMs side-by-side.
- **Full Suite Pipeline** -- One-click execution of the complete analysis chain: 5 batch analyses (+ optional Axiomatic Model) -> BOTTOMLINE synthesis -> 25 Objections with counter-arguments -> Refined Rewrite that absorbs every objection. Download the entire report as one document.
- **MAXINTEL Intelligent Rewrite** -- Recursively optimizes text to maximize intelligence scores. Keeps rewriting until cognitive metrics hit your target.
- **Conservative Reconstruction** -- Generates the most charitable, coherent version of a text's unified argument, surfacing the strongest reading the author could have intended.
- **BOTTOMLINE Synthesis** -- Collapses multiple intermediate analyses into one polished final output tailored to a specific audience, objective, tone, length, and emphasis. Intelligent weighting prioritizes the most relevant intermediate results.
- **25 Objections + Counter-Arguments** -- Standalone or pipeline mode. Generates the 25 most likely objections from skeptical readers and crafts a compelling response to each, ordered by likelihood. Tailored to the stated audience.
- **Refined Rewrite** -- Takes the BOTTOMLINE and rewrites it in light of all 25 objections, strengthening weak claims and incorporating counter-arguments inline.
- **Axiomatic System Transformer** -- Transforms natural language theoretical text into a complete formal axiomatization: primitive terms, axioms, defined terms, an uninterpreted formal calculus, and a semantic model. Never refuses -- always produces output.
- **Mathematical Proof System** -- Four distinct modes: COHERENCE (structural quality only), COGENCY (truth + soundness with counterexamples), MAX COHERENCE (improves structure while preserving content), MAXIMIZE TRUTH (corrects defective proofs using extended thinking; if the theorem is false, finds and proves a similar true theorem).
- **Scientific-Explanatory Coherence** -- Dual assessment: logical consistency AND scientific accuracy, scored separately. The rewrite mode replaces pseudoscientific claims with accurate explanations.
- **Truth Select & Math Truth Select** -- Literal-truth verification modes that ignore rhetorical structure and grade the actual factual or mathematical claims.
- **GPT Bypass Humanizer** -- Transforms AI-generated text to evade AI detection tools, with built-in detection integration.
- **Coherence Meter** -- Validates logical and semantic coherence across documents up to 5,000 words. Includes specialized modes for mathematical proofs and scientific-explanatory writing.
- **AI Chat Assistant** -- Conversational interface backed by the Zhi knowledge database, with persistent history and document context awareness.
- **Document Workflow** -- PDF/text upload, OCR (Mathpix), speech-to-text (AssemblyAI), translation, web search, and one-click download of every output as a single document.
- **System Diagnostic** -- One-click self-check that verifies all API providers, the database, and the full analysis pipeline are operational. Color-coded pass/warn/fail with downloadable report.`,
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body: `- **It actually follows instructions** -- The system's job is to do exactly what you said. If you ask for 25 objections, you get 25, not 7.
- **It separates structure from truth** -- A well-organized argument for a false claim scores high on coherence and low on cogency. Most AI systems collapse these into one mushy "quality" score; this platform does not.
- **It corrects, not just critiques** -- When a proof is defective or a claim is pseudoscientific, the system fixes it. If a theorem is false, it finds and proves a similar true theorem instead.
- **Five proprietary LLMs, one workflow** -- ZHI 1 through ZHI 5. Pick the model best suited for each task, or run multiple in parallel and compare. Automatic fallback chain handles rate limits and outages.
- **Cognitive scoring built in** -- Every output can be scored across 17 cognitive dimensions, with genre-aware calibration.
- **Objection-proof output** -- The Full Suite pipeline doesn't stop at synthesis. It generates the 25 most likely objections, then rewrites the synthesis to absorb every one of them. The final document is something a critic cannot easily dismiss.
- **One-click full report** -- After running the Full Suite, every stage (5 batch analyses, optional Axiomatic Model, BOTTOMLINE, 25 Objections, Refined Rewrite) is downloadable as a single timestamped .txt file.
- **Self-diagnosing** -- Built-in diagnostic tab pings every AI provider, the database, and exercises the core pipeline end-to-end. You always know whether the system is healthy.
- **No fallback fluff** -- When something fails, it fails explicitly. No silent fake outputs, no "as an AI language model" hedging.`,
      },
    ],
  },
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
  "Frame Shot": {
    emoji: "🎞️",
    tagline: "Frame Flow -- Instant Frame Extraction for Fast, Frictionless Video Review",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `Frame Flow automatically extracts still images from a video at fixed intervals.

You upload a video. Frame Flow returns a clean sequence of evenly spaced snapshots -- allowing you to scan the entire recording instantly without scrubbing, pausing, or frame-by-frame searching.`,
      },
      {
        emoji: "⚙️",
        title: "How It Works",
        body: `- Upload a video.
- Frame Flow samples the video at predetermined intervals.
- Each sampled frame is saved as a still image.
- You browse the stills and select the frame you want.

That's it.`,
      },
      {
        emoji: "🎯",
        title: "Why It Exists",
        body: `Finding a good frame in a video is unnecessarily tedious.

If you record yourself and need:

- A flattering photo
- A profile image
- A thumbnail
- A still for marketing, documentation, or analysis

Frame Flow removes the friction entirely.`,
      },
      {
        emoji: "✨",
        title: "Features",
        body: `- Automatic frame extraction
- Evenly spaced snapshots across the full video
- Instant visual overview of the entire recording
- No manual playback or scrubbing`,
      },
      {
        emoji: "📌",
        title: "Use Cases",
        body: `- Selecting the best still from a selfie video
- Creating thumbnails from recordings
- Reviewing posture, expression, or movement
- Content creation and marketing
- Documentation and visual analysis`,
      },
      {
        emoji: "🎯",
        title: "Core Idea",
        body: `Video contains too much information for simple selection.

Frame Flow reduces motion to choice -- fast, clean, and decisive.`,
      },
    ],
  },
  "Originality Meter": {
    emoji: "🧠",
    tagline: "Evaluate, Compare, and Transform Text for Originality, Intelligence, Cogency, and Quality",
    sections: [
      {
        emoji: "✳️",
        title: "Overview",
        body: `Originality Meter is a system for evaluating, comparing, and transforming text with respect to originality, intelligence, cogency, and overall quality.

It does not reward fluency, polish, or jargon.
It does not confuse verbosity with depth.
It does not mistake recombination for thought.

Its singular virtue is that it distinguishes genuinely fresh thinking from merely recycled text.

Originality Meter analyzes prose to determine what kind of intellectual work is actually being done.

It separates:

- real inference from stylistic noise
- conceptual contribution from paraphrase
- intelligence from imitation

It can evaluate text, compare texts, rewrite text, and generate work -- while enforcing the same standards throughout.`,
      },
      {
        emoji: "📊",
        title: "Evaluate a Single Text",
        body: `- Measure originality
- Measure intelligence
- Measure cogency
- Measure overall quality
- Identify recycled structures, clichés, and pseudo-insight
- Detect genuine conceptual moves and inferential control`,
      },
      {
        emoji: "⚖️",
        title: "Compare Two Texts",
        body: `- Compare originality, intelligence, and cogency side-by-side
- Determine whether one text is derivative of the other
- Diagnose how the texts differ (depth, structure, contribution)
- Distinguish disagreement from mere rewording`,
      },
      {
        emoji: "✍️",
        title: "Rewrite and Improve Text",
        body: `- Rewrite prose to increase:
  - originality
  - intelligence
  - cogency
  - signal density
- Eliminate recycled phrasing and template logic
- Replace imitation with real conceptual work
- Preserve content while strengthening structure`,
      },
      {
        emoji: "🎓",
        title: "Do Homework",
        body: `- Completes assignments at any level
- Produces answers that reflect actual understanding, not boilerplate
- Avoids generic academic filler and obvious AI patterns`,
      },
      {
        emoji: "🤖",
        title: "Humanize AI-Written Text",
        body: `- Detects AI-like structure and surface fluency
- Rewrites text to restore human markers:
  - asymmetry
  - friction
  - implication
  - uneven emphasis
- Produces prose that reads as thought, not synthesis`,
      },
      {
        emoji: "🧪",
        title: "Core Distinction",
        body: `Not all novelty is originality.
Not all clarity is intelligence.
Not all coherence is thought.

Originality Meter is built to detect the difference between:

- new combinations vs new ideas
- fluent prose vs controlled reasoning
- academic form vs intellectual substance

This distinction governs every function of the system.`,
      },
      {
        emoji: "🎯",
        title: "What It Is For",
        body: `- Evaluating essays, papers, and articles
- Comparing drafts, sources, or competing arguments
- Detecting pseudo-intellectual writing
- Improving AI-generated text without stylistic fakery
- Producing genuinely high-level homework and analysis
- Enforcing real intellectual standards at scale`,
      },
      {
        emoji: "🧱",
        title: "Design Principles",
        body: `- Content-sensitive, not style-driven
- No reward for jargon or verbosity
- No penalty for clarity
- Explicit, explainable evaluations
- Rewrite logic governed by the same metrics used for scoring`,
      },
      {
        emoji: "🧠",
        title: "Summary",
        body: `Originality Meter is not an AI detector.
It is not a grammar checker.
It is not a style polisher.

It is a system for answering one question:

**Is this text actually doing intellectual work -- or only pretending to?**`,
      },
    ],
  },
  "EZ Homework": {
    emoji: "🎓",
    tagline: "EZHW -- AI-Powered Homework Assistant: Multi-Model, Multi-Format, No Padding, No Puffery",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `EZHW is a full-stack academic assistance platform built on a strict operating principle: every output is exactly what was asked for. If you ask for 25 numbered answers plus a 1,000-word synthesis, that is what you get -- not 18 answers and a vague closing paragraph. If you specify 6,000 words, the system iterates until the count is met. Instructions are not suggestions; they are enforced.

The platform routes tasks across five leading AI providers (OpenAI, Anthropic, Azure OpenAI, DeepSeek, Perplexity) and applies a coherent chunking architecture for long documents -- skeleton generation, chunk processing, global stitch pass -- so large outputs are not just long, but structurally sound. A hard constraint enforcement layer extracts non-negotiable rules from your prompt and vetoes any chunk that violates them before it reaches the final output.

Default writing style is direct, compressed, and free of hedging language. No preamble, no filler, no editorializing.`,
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body: `- **Students at any level** -- need complete, accurate answers to homework problems across every subject and format
- **Graduate students and researchers** -- need rigorous, citation-worthy responses that meet academic standards and specific word counts
- **Philosophers and humanities scholars** -- benefit from automatic enrichment via the Ask-a-Philosopher integration, which pulls authentic quotes and passages from a curated philosophical database
- **STEM students** -- get LaTeX-rendered mathematical notation, automatic graph generation, and structured multi-part problem solving
- **Anyone with a document to grade** -- the Grading Assistant evaluates student submissions against any rubric format with an explicit score and line-by-line justification
- **Anyone who needs a rewrite** -- the Perfector tool improves any text without inflating it, preserving structure while eliminating weak language`,
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body: `- **Multi-Model LLM Routing** -- select from OpenAI, Anthropic, Azure OpenAI, DeepSeek, or Perplexity for each task; the system applies the model best suited to the request type
- **Coherent Chunking System** -- for outputs over 1,000 words, a three-pass architecture guarantees global coherence: first a skeleton, then chunk generation, then a global stitch pass that unifies tone, argument, and structure across the full document
- **Hard Constraint Enforcement** -- extracts invariants (non-negotiable rules) from the user prompt and validates every generated chunk against them; any chunk that violates a constraint is vetoed and regenerated automatically
- **Automatic Word Count Enforcement** -- detects specified word or page requirements and iterates until the count is met; multi-question assignments check completion of every numbered item before finalizing output
- **Ask-a-Philosopher Integration** -- detects philosophical topics in any prompt and automatically fetches authentic quotes, passages, and context from analyticphilosophy.net; includes a kill switch that blocks fabricated content if the database cannot supply authentic material
- **Grading Assistant** -- evaluates student submissions against rubrics provided in any format (text, PDF, image, document); outputs an explicit score with line-by-line justification; Coherence Mode handles long assignments with real-time progress via SSE streaming
- **Perfector / Rewrite Tool** -- improves any text for clarity, precision, and academic rigor without padding or structural inflation; all rewrite iterations are saved and accessible from the assignment history
- **Graph Generation** -- automatically detects when a response calls for a visual and generates charts server-side using Chart.js; graphs are embedded directly into the solution output
- **Mathematical Notation** -- full LaTeX support via MathJax; intelligent content detection applies LaTeX formatting only where appropriate; optimized rendering for PDF export
- **File Input Pipeline** -- accepts text, images, PDFs, and documents via drag-and-drop or upload; OCR via Tesseract.js for images; pdf2json for structured text extraction from PDFs
- **Voice Input** -- real-time transcription via Browser Web Speech API with Azure Cognitive Services fallback
- **Persistent Assignment Storage** -- every prompt, generated solution, grade, and rewrite is saved to a PostgreSQL database; full history is accessible and expandable from the Saved Assignments panel
- **PDF Export** -- download any solution as a formatted PDF with proper mathematical notation rendering`,
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body: `- **It follows instructions** -- the system's job is to do exactly what you said. Word counts, numbered lists, specific structures -- all enforced, not approximated
- **It enforces its own constraints** -- hard constraint extraction means the system catches its own violations before they reach you; it does not rely on you to catch errors
- **It produces coherent long documents** -- the three-pass chunking architecture means a 6,000-word output is a unified document, not six 1,000-word fragments stapled together
- **It does not fabricate philosophy** -- the Ask-a-Philosopher integration includes a kill switch; if authentic content is unavailable, the system omits the section rather than inventing quotes
- **Default output is compressed, not padded** -- the Anti-Puffery system eliminates hedging, filler phrases, and unnecessary qualifications from all output by default; a Bad-Writing Mode is available if explicitly requested
- **Five LLMs, one interface** -- pick the model for the task, or let the system route intelligently; automatic fallback handles rate limits and outages without interrupting your workflow
- **Full grading pipeline** -- rubric parsing, submission evaluation, scoring, and justification in one step; Coherence Mode handles assignments too long for a single context window
- **Everything is saved** -- prompts, solutions, grades, and rewrites are all persisted with full history; nothing is lost between sessions`,
      },
    ],
  },
  "Model Transformer": {
    emoji: "🔁",
    tagline: "Structure-Preserving Transformation of Formal Models, Theories, and Axiom Systems",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `Model Transformer is a system for transforming formal models, theories, schemas, and axiom sets without altering their content.

It does not simplify, explain, or summarize. It re-expresses structure while preserving meaning.

The system treats theories as formal objects whose truth conditions, models, and constraints must survive transformation intact.`,
      },
      {
        emoji: "🔧",
        title: "What It Does",
        body: `Model Transformer takes a formal representation and generates alternative but equivalent formulations, including:

- Definitional extensions and eliminations
- Ontology inversions (primitive <-> defined symbols)
- Schema- and arity-preserving rewrites
- Language shifts with model preservation
- Explicit interpretation mappings across domains

Each transformation is either:

- Certified equivalent, or
- Explicitly flagged where equivalence cannot be guaranteed

There is no silent drift.`,
      },
      {
        emoji: "🧠",
        title: "Core Principle",
        body: `Sameness of content does not require sameness of form.

Model Transformer operates on structure, not surface syntax.`,
      },
      {
        emoji: "🎯",
        title: "What It Is For",
        body: `- Formal verification and specification refactoring
- Equivalence checking across axiom systems or schemas
- Translating between mathematical, computational, and conceptual models
- Rewriting brittle formal systems without semantic loss
- Making implicit structure explicit`,
      },
      {
        emoji: "🚫",
        title: "What It Is Not",
        body: `- Not a paraphraser
- Not an explainer
- Not a simplifier
- Not a teaching tool

If you want intuition, this is the wrong system. If you want semantic equivalence, this is the right one.`,
      },
      {
        emoji: "🔄",
        title: "Transformations Supported",
        body: `- Definitional equivalence
- Conservative extensions
- Ontology inversion
- Primitive / defined symbol swapping
- Interpretation discovery (mathematical, computational, physical, social, etc.)
- Explicit domain reconstruction

All transformations are constraint-checked and annotated.`,
      },
      {
        emoji: "📤",
        title: "Output Guarantees",
        body: `Every transformation reports:

- Whether equivalence holds
- What mappings were applied
- Which primitives were altered
- Where (if anywhere) information was added, weakened, or lost

No hidden reinterpretation. No cosmetic rewrites.`,
      },
      {
        emoji: "❓",
        title: "Why This Exists",
        body: `Most systems rewrite form and assume meaning survives.

Model Transformer rewrites form only after meaning is fixed.

This is the difference between translation and mutation.`,
      },
      {
        emoji: "👤",
        title: "Typical Users",
        body: `- Formal methods engineers
- Logicians and mathematicians
- Specification authors
- AI system designers
- Anyone working with brittle or high-stakes formal structures`,
      },
      {
        emoji: "📌",
        title: "Status",
        body: `Actively developed. Used in production reasoning systems. Designed to scale across domains, not examples.

If two systems are truly the same, this tool will show it. If they are not, it will show that too.`,
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
  "EZ Reader": {
    emoji: "📄",
    tagline: "AI-Powered Document Processing Platform for Intelligent Text Transformation, Style Transfer, and Academic Writing",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `EZ Reader is a multi-model AI platform built for serious writers, researchers, and academics who need to process, transform, and refine documents with precision. It routes any writing task to five proprietary AI models (ZHI 1-4) and applies a strict operating principle: your instructions are followed exactly. If you ask for a rewrite in a specific voice, that is what you get. If you paste a fragment, it becomes a complete, polished document. No padding, no hedging, no watered-down output.

Unlike generic AI writing tools, EZ Reader separates style transfer from content generation, allows deep integration of reference material, detects AI authorship in the output, and supports iterative refinement through a persistent instruction workflow. It handles everything from raw text to PDFs, Word documents, images, and audio recordings.`,
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body: `- **Academics and graduate students** -- need to rewrite, expand, or transform papers and dissertation chapters while preserving argument structure and scholarly tone
- **Philosophers and theorists** -- need a system that follows nuanced stylistic and argumentative instructions without smoothing over sharpness or complexity
- **Journalists and essayists** -- need to match a specific editorial voice or expand a fragment into a fully developed piece
- **Lawyers and analysts** -- need clean, authoritative rewrites of technical documents with precise language
- **Authors** -- need to transfer the stylistic fingerprint of one text onto another, or expand rough notes into complete drafts
- **Anyone** -- who wants an AI that does exactly what it is told, not what it thinks sounds better`,
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body: `- **Multi-Model Text Transformation** -- Five ZHI models (ZHI 1-4) handle rewrites, expansions, style transfers, and completions. Each model has distinct strengths; pick the one best suited to the task or compare outputs across models.
- **Default Rewrite Engine** -- A 7-provision rewrite system that matches style (not "makes it better"), expands inputs under two pages to 3x length, turns fragments into complete essays or stories, preserves edginess and sharpness, and adds clarity through logical and empirical support. Rewrites the entire input from the first word.
- **Style Transfer / Humanizer** -- Paste a style sample and the system rewrites your document to match that voice at a granular level -- rhythm, diction, sentence structure, and argumentative posture. Built-in AI detection loop checks and refines until the output reads as human-written.
- **Content Source Integration** -- Toggle on a reference document and the system thoroughly incorporates all its information, arguments, evidence, and insights into the output. Not a light reference -- a deep integration that adds length as needed.
- **AI Detection (GPTZero)** -- Built-in AI authorship scoring on every output. Shows confidence score and per-sentence breakdown. Used automatically in the humanizer loop to verify results before delivery.
- **Document Upload & Chunking** -- Upload PDF, DOCX, TXT, image, or audio files up to 50MB. Large documents are automatically split into chunks and processed sequentially, with results assembled into a single output.
- **Audio Transcription** -- Transcribe spoken recordings using OpenAI Whisper, Azure Speech, or Gladia. Output feeds directly into the processing pipeline.
- **Mathematical Content Handling** -- LaTeX formulas are protected during processing and restored intact in the output. Mathpix integration extracts math from images and PDFs. MathJax renders equations cleanly in the editor.
- **Online Search Integration** -- Pull live web content into any processing task. Fetched results are treated as reference material and integrated into the output.
- **Saved Instructions** -- Save and reuse custom instruction sets. Load a saved instruction with one click instead of retyping it every session.
- **Iterative Refinement** -- Process output becomes the new input. Run multiple passes with different instructions to progressively refine a document toward the target.
- **Freemium Credit System** -- Credits are deducted per unlock. Preview mode shows the first portion of every output; purchase credits to unlock the full result. Stripe-integrated checkout built into the app.`,
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body: `- **It follows instructions** -- The system's job is to do exactly what you said. If you ask for a rewrite in the style of Nietzsche, you get that style. If you ask for 3x expansion, the output is 3x longer. Not approximately. Not mostly.
- **Style transfer is real** -- Most AI tools simulate style superficially. EZ Reader analyzes rhythm, sentence architecture, diction register, and argumentative posture from a sample and applies all of it to the target text -- not just tone.
- **Fragments become complete documents** -- Paste a half-finished essay or a rough paragraph and the system produces a finished, full-length piece. It does not complete the sentence; it rewrites the whole thing properly from the beginning.
- **Sharpness is preserved, not softened** -- The default rewrite logic explicitly preserves edginess, bluntness, and argumentative aggression. The system does not sand down provocative claims into bland consensus language.
- **Content sources are integrated, not referenced** -- When you toggle on a content source, the AI is instructed to thoroughly incorporate every argument, piece of evidence, and insight from that source. It adds length if needed to do so properly.
- **AI detection is built into the loop** -- The humanizer does not just rewrite; it checks AI scores after each pass and keeps refining until the output meets the target. Detection is a workflow step, not an afterthought.
- **Five models, one interface** -- ZHI 1 through ZHI 4 are available in every session. Switch models mid-workflow, compare outputs, or chain them -- all without leaving the platform.`,
      },
      {
        emoji: "💳",
        title: "Pricing (Credits)",
        body: `- **ZHI 1** -- 3 credits per unlock
- **ZHI 2** -- 8 credits per unlock
- **ZHI 3** -- 2 credits per unlock
- **ZHI 4** -- 1 credit per unlock

Credits are purchased through the in-app Stripe checkout. Every output is fully generated before unlock -- you see a preview, then pay to reveal the complete result.`,
      },
      {
        emoji: "🛠️",
        title: "Technical Stack",
        body: `React 18 + TypeScript + Tailwind CSS + shadcn/ui + MathJax 3.0 · Node.js 20 + Express.js + TypeScript · PostgreSQL (Neon serverless) with Drizzle ORM · OpenAI GPT-4o, Anthropic Claude 3.7, Perplexity, DeepSeek, Azure OpenAI · GPTZero (AI detection), Mathpix (math OCR), OpenAI Whisper (transcription), Google Vision OCR, SendGrid (email), Stripe (payments)`,
      },
    ],
  },
  "Genius Dictation": {
    emoji: "🧠",
    tagline: "Multi-Modal AI Platform for Intelligent Content Transformation, GPT Bypass, and Real-Time Dictation",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `Genius Dictation is a multi-model AI system for transforming, humanizing, and evaluating any written or spoken content. It connects to five top-tier proprietary LLMs (ZHI 1-5) and lets users route each task to the model best suited for it -- style-based rewriting, AI detection bypass, intelligence scoring, voice dictation, or OCR document processing.

Unlike consumer writing tools that produce generic, padded, watered-down output, Genius Dictation is built around a strict operating principle: every transformation follows the user's instructions exactly, every rewrite matches a real style sample, and the user's text is never replaced with hallucinated content. If you put in raw dictation about hiring frauds, you get a rewrite about hiring frauds. No topic drift, no editorializing, no fabrication.`,
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body: `- **Authors and entrepreneurs** -- need to transform raw voice dictation into polished, intelligent prose without losing their voice or edge
- **Academics and researchers** -- need rewrites that match a rigorous philosophical or academic style, not generic AI filler
- **Students** -- need to submit human-sounding text that bypasses AI detection tools without changing what they actually said
- **Professionals and consultants** -- need rapid document processing, OCR extraction, and intelligent reformatting of uploaded files
- **Anyone** -- who wants their spoken or written ideas transformed into something that actually sounds like a smart human wrote it`,
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body: `- **Real-Time Voice Dictation** -- Speak directly into the platform; text streams live as you speak. Supports multiple speech engines (Gladia, Deepgram, AssemblyAI, browser-native).
- **Style-Based Intelligent Rewrite** -- Does NOT tell the AI to "make it better." Instead, provides a real style sample and instructs the model to rewrite in that exact style -- not a caricature of it, but that style. Default style is rigorous academic philosophical prose.
- **GPT Bypass Humanizer** -- Transforms AI-generated or AI-sounding text to evade AI detection tools. Uses pure style transfer: clones Box B's style with surgical precision while preserving Box A's content 100%. Built-in GPTZero detection shows before/after AI scores.
- **Real-Time Streaming Output** -- Both the Transform and GPT Bypass functions stream output word-by-word using Server-Sent Events and flushSync(), so you see the rewrite being generated live.
- **Automatic AI Detection** -- Every text box -- input, output, style sample -- automatically runs GPTZero detection after a 1.5-second debounce. AI scores displayed as live badges. No manual button needed.
- **Multi-Model Intelligence Analysis** -- Evaluates any text across multiple cognitive dimensions: grammar, lexical precision, stylistic quality, conceptual depth, logical structure, and originality. Produces a full written assessment with quoted examples and errata.
- **OCR Document Processing** -- Upload PDFs, images, or documents. AI-prioritized OCR (Mathpix) extracts clean text with superior accuracy over traditional Tesseract.
- **Mathematical Content** -- Parses and evaluates mathematical expressions, generates SVG-based graphs, renders LaTeX notation in-app and in downloadable PDFs.
- **Text-to-Speech Narration** -- Every output can be narrated aloud using Azure Speech or ElevenLabs voices. Download audio as a file.
- **PDF / Word / TXT Export** -- One-click download of every output as a formatted document. Print/Save PDF available directly from the browser.
- **Stripe Payment Integration** -- Credit-based system with Stripe checkout. Credits deducted per transformation. Non-authenticated users can access basic features; premium features require login.`,
      },
      {
        emoji: "📜",
        title: "Rewrite Logic (All 7 Provisions)",
        body: `- **Provision 1: User instructions always win** -- If the user gives explicit instructions, those are followed exactly, above all else.
- **Provision 2: Instructions + style sample = both honored** -- If the user provides custom instructions AND selects a style sample, the system follows the instructions while writing in that sample's style.
- **Provision 3: Never "make it better" -- always "make it like this"** -- The system never vaguely instructs the LLM to improve the text. It always provides a concrete style sample and says: rewrite in this exact style.
- **Provision 4: Short texts are expanded 3x by default** -- Any input under two pages (~500 words) is automatically tripled in length by adding examples, definitions, and clarifications -- unless the user explicitly instructs otherwise.
- **Provision 5: Non-fiction fragments become complete essays** -- If the input is a non-fiction fragment, the rewrite completes it into a full essay with introduction, development, and conclusion -- unless the user says otherwise.
- **Provision 6: Fiction fragments become complete stories** -- If the input is a fiction fragment, the rewrite completes it into a full story with beginning, development, and conclusion -- unless the user says otherwise.
- **Provision 7: These provisions apply everywhere** -- Rewrite mode, Re-Rewrite mode, GPT Bypass (Humanize) mode, and Re-Humanize mode all follow these same provisions.`,
      },
      {
        emoji: "🔍",
        title: "What Makes It Different",
        body: `- **It rewrites your actual text** -- Topic drift is forbidden. If you input text about hiring frauds, the output is about hiring frauds. The system uses explicit input markers and strict instructions to prevent AI hallucination.
- **It separates style from content** -- The GPT Bypass function clones style at a molecular level while leaving every idea, fact, and argument from the original text intact. Style transfer is surgical, not approximate.
- **It never editorializes** -- Edgy prose stays edgy. Sharp, concise prose stays sharp and concise. The rewrite preserves the original's register and tone unless the user explicitly asks for a change.
- **Five LLMs, one workflow** -- ZHI 1 (Claude Sonnet), ZHI 2 (GPT-4o), ZHI 3 (DeepSeek), ZHI 4 (Perplexity), ZHI 5. Pick the model best suited for each task.
- **Streaming built in** -- Output is not dumped at the end. You watch it being written, word by word, in real time.
- **Automatic AI scoring on everything** -- Every input and output box detects its own AI probability score automatically. You always know exactly where you stand before and after a rewrite.
- **Voice-first design** -- The entire platform is designed around voice dictation as the primary input method. Speak your ideas raw; the platform handles the rest.`,
      },
      {
        emoji: "🛠️",
        title: "Technical Stack",
        body: `React + TypeScript, Tailwind CSS, shadcn/ui · Express.js + Node.js · PostgreSQL with Drizzle ORM · OpenAI (GPT-4o), Anthropic (Claude Sonnet), Perplexity, DeepSeek · GPTZero for AI detection · Gladia / Deepgram / AssemblyAI / Web Speech API · Azure Cognitive Services + ElevenLabs · Mathpix (AI-prioritized) + Tesseract (fallback) · Stripe · Passport.js (session-based, optional)`,
      },
    ],
  },
  "Book Builder": {
    emoji: "🧠",
    tagline:
      "Advanced Writing & Analysis Engine -- Multi-Model AI Platform for Document Processing, Cognitive Profiling, and Intelligent Rewriting",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `Book Builder is a multi-model AI system built for serious writers, researchers, and thinkers who need more than a grammar checker or a generic chatbot. It connects to five top-tier proprietary LLMs (ZHI 1-5) and lets users route any task to the model best suited for it -- document rewriting, cognitive profiling, AI detection bypassing, mathematical proof rendering, or full-pipeline text transformation.

Unlike consumer writing tools that produce safe, watered-down suggestions, Book Builder is built around a strict operating principle: every output is rigorous, every instruction is followed exactly, and the user's intent is never diluted. If you ask for a humanized rewrite that evades AI detection, you get one. If you ask for a deep cognitive profile across 17 dimensions, you get all 17 -- scored, explained, and visualized.`,
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body: `- **Academics, graduate students, and researchers** -- need to process, rewrite, and analyze papers, dissertations, and source documents before submission or publication
- **Philosophers and theorists** -- need formal analysis, proof-checking, and conceptual stress-testing of theoretical claims
- **Mathematicians** -- need proper LaTeX rendering, mathematical proof evaluation, and text-to-math conversion
- **Lawyers, analysts, and consultants** -- need to rewrite and restructure documents while preserving precise meaning
- **Authors and entrepreneurs** -- need to know whether their writing communicates clearly, intelligently, and persuasively
- **Anyone** -- who wants to produce writing that reads like it was written by someone who actually knows what they are doing`,
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body: `- **Multi-Model Document Rewriting** -- Upload a PDF, DOCX, or paste text, then rewrite it in full using any of five LLMs. Control rewrite length, tone, and chunk-by-chunk granularity. Compare outputs across models side-by-side.
- **Chunked Rewriter** -- Splits long documents into manageable segments and rewrites each one independently. Supports per-chunk selection, custom instructions per segment, and re-rewriting individual chunks after the initial pass.
- **Cognitive Profiler (Mind Profiler)** -- Evaluates any text across 17 cognitive dimensions including depth, originality, argumentative rigor, conceptual control, and semantic density. Produces a scored profile with genre-aware calibration and visual breakdowns.
- **GPT Bypass Humanizer** -- Transforms AI-generated text to evade AI detection tools. Built-in GPTZero integration lets you verify the result before and after transformation in a single workflow.
- **AI Detection** -- Runs any document through GPTZero and returns a detailed detection report with sentence-level highlighting and probability scores.
- **Text-to-Speech** -- Converts any text to natural-sounding audio using ElevenLabs. Includes voice selection, playback controls, and downloadable output.
- **Graph Generator** -- Converts natural language descriptions into rendered SVG visualizations. Supports mathematical function plotting, academic charts, and data diagrams generated directly from text.
- **Text-to-Math Converter** -- Transforms written mathematical expressions and prose descriptions into properly formatted LaTeX notation, rendered inline with MathJax and KaTeX.
- **OCR Processing** -- Extracts text from scanned images and image-based PDFs using Tesseract. Feeds extracted content directly into the rewriting and analysis pipeline.
- **AI Chat Assistant** -- Persistent conversational interface backed by all five ZHI models. Supports document context injection, chat history, math rendering toggle, and auxiliary chat for secondary research threads.
- **Custom Rewrite** -- Select any portion of a rewritten document and apply targeted rewrite instructions to that passage alone, without disturbing the surrounding content.
- **Text Cleaner** -- Standalone utility that strips hidden characters, normalizes whitespace, and reconstructs proper paragraph structure from corrupted or exported text.
- **Analytics Dashboard** -- Tracks rewriting activity, model usage, and document processing history. Includes custom report generation and data export.`,
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body: `- **It actually follows instructions** -- The system's job is to do exactly what you said. If you set a rewrite length to 150%, you get 150%. If you select three specific chunks, only those three are rewritten.
- **Five proprietary LLMs, one workflow** -- ZHI 1 through ZHI 5. Pick the model best suited for each task, or switch mid-session without losing your document or context.
- **Real document handling** -- Upload PDF, DOCX, or plain text files. The system extracts, chunks, processes, and reconstructs the full document -- not just a pasted snippet.
- **Cognitive scoring built in** -- Every document can be profiled across 17 cognitive dimensions, with genre-aware calibration that accounts for the type of writing being evaluated.
- **Detection and humanization in one place** -- Run AI detection, apply humanization, and re-run detection to verify the result -- all without leaving the platform.
- **Math-first rendering** -- LaTeX expressions are detected, sanitized, and rendered correctly throughout the interface. The system distinguishes mathematical notation from currency symbols and never corrupts technical content.
- **Chunk-level precision** -- Long documents are never treated as a single blob. Every rewrite, analysis, and transformation operates at the chunk level, giving you surgical control over the output.
- **Persistent chat with document awareness** -- The chat assistant retains conversation history and can be loaded with document context, turning it into a research assistant that actually knows what you are working on.`,
      },
      {
        emoji: "🔗",
        title: "External Services",
        body: `- **ZHI 1** -- OpenAI GPT-4 (primary LLM, Whisper transcription)
- **ZHI 2** -- Anthropic Claude (balanced LLM for analysis and rewriting)
- **ZHI 3** -- DeepSeek (efficient LLM, default for most tasks)
- **ZHI 4** -- Perplexity (fast LLM with search-augmented responses)
- **ZHI 5** -- xAI Grok (advanced reasoning and long-context tasks)
- **GPTZero** -- AI content detection
- **ElevenLabs** -- Text-to-speech audio generation
- **Tesseract** -- OCR for image and scanned PDF extraction`,
      },
      {
        emoji: "🗄️",
        title: "Tech Stack",
        body: `React 18 + TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Wouter · Node.js + Express.js (TypeScript, ES Modules) · PostgreSQL with Drizzle ORM · Vite (frontend), esbuild (backend) · MathJax + KaTeX for math rendering`,
      },
    ],
  },
  "Classic EZ Reader": {
    emoji: "📖",
    tagline:
      "Multi-Provider AI Text Processing Platform for Rewriting, Humanizing, Assessment, and Document Workflow",
    sections: [
      {
        emoji: "🧩",
        title: "Overview",
        body: `CLASSIC EZ READER is a Flask-based multi-provider AI text processing application designed for serious writers, students, academics, and professionals who need precise, high-quality text transformation. It integrates four top-tier AI providers (Anthropic Claude, OpenAI GPT-4, Perplexity, DeepSeek) with automatic failover, intelligent chunking for large documents, and strict formatting guarantees.

Unlike generic AI writing tools that produce hedged, watered-down output, CLASSIC EZ READER is built around a strict operating principle: every output respects the user's instructions exactly, every paragraph is properly formatted (maximum 4 sentences per paragraph -- no exceptions), and every long document is automatically chunked and streamed without token limit errors. No giant walls of text, no preambles, no meta-commentary.`,
      },
      {
        emoji: "👥",
        title: "Who It's For",
        body: `- **Students and academics** -- need to complete homework assignments, essays, and research papers with thorough, properly formatted output across mathematics, philosophy, literature, history, and science
- **Writers and authors** -- need to rewrite, humanize, or transform fiction and non-fiction texts while preserving voice and meaning
- **Researchers and analysts** -- need to translate, summarize, and assess large documents across 9+ languages with automatic chunking
- **Content creators** -- need to convert between fiction and non-fiction formats, expand short pieces 3x, or refine drafts into polished essays
- **Anyone working with PDFs, Word documents, images, or audio** -- needs reliable extraction, transcription, and AI-driven processing in a single workflow`,
      },
      {
        emoji: "⚙️",
        title: "Core Capabilities",
        body: `- **Multi-Provider AI Processing** -- Routes text through Anthropic Claude (default), OpenAI GPT-4, Perplexity, or DeepSeek with automatic failover, rate limit detection, and API key rotation. Two-level chunking handles documents of any size.
- **Customized Rewrite** -- Rewrites text according to user-provided instructions with mandatory paragraph formatting (max 4 sentences per paragraph) and 500-word streaming chunks with 10-second pauses to avoid rate limits.
- **One-Click Rewrite** -- Lightweight, fast rewrite that expands short texts 3x and completes incomplete essays or stories with introduction, development, and conclusion.
- **Homework Mode** -- Handles full academic assignments across all subjects (math, philosophy, essays, literature, science) with LaTeX support for mathematical notation and streaming responses to avoid token limit errors on long assignments.
- **Humanizer / Style Rewriter** -- A 3-box style-cloning system with 33 atomic presets and real-time AI detection displaying as "X% HUMAN". Categorized writing samples (academic, creative, technical) allow precise voice matching.
- **Fiction Assessment & Maximization** -- 50-question diagnostic analysis of narrative structure, characterization, dialogue, and thematic depth. Maximize Quality mode recursively rewrites fiction for stronger prose and emotional impact.
- **Non-Fiction Assessment & Maximization** -- Rigorous evaluation of argumentation, evidence, and logical structure. Maximization mode strengthens claims with substantiation and analytical depth.
- **Convert to Fiction / Non-Fiction** -- Transforms expository text into narrative form, or rewrites narrative content as analytical prose, with 2000-word chunking for large documents.
- **Devil's Advocate** -- Generates the strongest possible counter-arguments to any text, helping users stress-test their reasoning before publication.
- **Translation System** -- Multi-provider translation with automatic chunking and language detection across 9+ languages.
- **AI Detection** -- Real-time scoring via GPTZero integration, displayed as a clear "X% HUMAN" indicator on every text box.
- **Math View (LaTeX)** -- KaTeX-powered math rendering toggle on both input and output boxes for proper display of mathematical notation, equations, and proofs.
- **Document Workflow** -- PDF/Word/text upload, image OCR, audio transcription (SpeechRecognition + pydub), voice synthesis (ElevenLabs), and email delivery (SendGrid).
- **AI Chat Assistant** -- Conversational interface with unlimited dialogue, conversation history, and the ability to send any text box's content directly into the chat.`,
      },
      {
        emoji: "🚀",
        title: "What Makes It Different",
        body: `- **Paragraph formatting is guaranteed** -- The system forcibly splits any paragraph longer than 4 sentences in post-processing. No giant blocks of unreadable text, regardless of what the AI model returns.
- **No token limit errors on long documents** -- Universal 2000-word chunking is applied uniformly across all functions (rewrite, assessment, translation, conversion, humanizer). Streaming with 10-second pauses every 500 words prevents rate limit cascades.
- **Multi-provider failover, not single-vendor lock-in** -- If one provider rate-limits or fails, the system automatically rotates to the next available key or provider. Multiple API keys per provider are managed with health tracking and load balancing.
- **Action buttons reduce ambiguity** -- Prominent ACTION buttons on input and output boxes trigger the currently selected mode directly, eliminating the need for users to double-click mode buttons.
- **Streaming responses, not blocking calls** -- All major processing functions stream output in real time so users see progress immediately, with explicit chunk headers when documents are split.
- **Dollar-sign elimination** -- Automatic stripping of $ characters from all inputs and outputs prevents formatting collisions with LaTeX math notation.
- **Send-to-anywhere workflow** -- Any output can be sent directly to the input box, the AI chat, the Humanizer, or the Intelligence Assessment with a single click -- no copy-paste required.
- **One-click clear all** -- Large red "CLEAR ALL" button in the top header resets every text box across the entire app with a confirmation dialog.`,
      },
      {
        emoji: "🛠️",
        title: "Tech Stack",
        body: `Flask + SQLAlchemy ORM + Gunicorn (gevent workers) + PostgreSQL · Jinja2 templates, Bootstrap 5, vanilla JavaScript with AJAX streaming, KaTeX for LaTeX rendering · Anthropic Claude, OpenAI GPT-4, Perplexity, DeepSeek, Azure OpenAI · GPTZero (AI detection), ElevenLabs (voice synthesis), SendGrid (email) · PyPDF2, python-docx, Pillow/pytesseract (OCR), SpeechRecognition, pydub, langdetect`,
      },
      {
        emoji: "📂",
        title: "File Format Support",
        body: `- **Documents** -- PDF, DOCX, TXT
- **Images** -- PNG, JPG, JPEG, WEBP (with OCR text extraction)
- **Audio** -- MP3, WAV, M4A, OGG (with transcription)`,
      },
      {
        emoji: "🔐",
        title: "Security",
        body: `- API key rotation with health tracking and rate limit detection
- File upload validation and size limits
- Secure session management via Flask-Login
- Per-provider rate limiting and load balancing`,
      },
    ],
  },
};

appDescriptions["Forex Edge"] = {
  emoji: "🧠",
  tagline:
    "Multi-Model Probability Forecaster and Statistical Backtesting Suite for the USD/HKD Exchange Rate",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `USD/HKD Edge is a statistically defensible probability-forecasting platform for the USD/HKD spot rate. It calibrates one of thirteen pricing models -- ranging from classical Black-Scholes through stochastic-volatility, jump-diffusion, and pure-jump Lévy processes -- to live USD/HKD history, then projects the full distribution of future prices across multiple horizons.

Unlike point-forecast trading tools that produce a single "expected" number, USD/HKD Edge is built around a strict operating principle: every forecast is a distribution, every model is held accountable, and every metric is reported. The Backtest module runs walk-forward, monthly-recalibrated evaluations against actual history, then ranks the models head-to-head using Diebold-Mariano hypothesis tests, CRPS, log scores, and full coverage diagnostics. No padding, no hedging, no rhetoric.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Quantitative researchers** -- need to benchmark stochastic-volatility, jump, and pure-jump models against each other on a single, well-defined FX series before committing to one in production

**FX desk strategists** -- need calibrated probability distributions, not point forecasts, to size USD/HKD options trades and assess tail risk inside the HKMA convertibility band

**Risk managers** -- need rigorous coverage diagnostics (50/70/95) and calibration tables to verify that a model's stated probabilities match realised frequencies

**Academics and graduate students** -- need a clean, reproducible reference implementation of thirteen pricing models with a shared calibration and simulation interface

**Anyone forecasting a pegged or band-constrained currency** -- who needs to understand how classical stochastic models behave when the underlying is structurally mean-reverting`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Thirteen Pricing Models** -- BS Realized-Vol, BS-GARCH(1,1), Merton Jump-Diffusion, Kou Jump-Diffusion, Heston, Bates, SVJJ, Double-Heston, Rough-Heston, Variance Gamma, CGMY, Normal Inverse Gaussian, and SABR. Each implements a single Pricer interface -- calibrate(log_returns, dt, drift) plus simulate_paths(...) -- so any model can be swapped in for live or backtest use without changing surrounding code.

**Live Probability Fan** -- One-click 50,000-path Monte Carlo simulation over six months, sliced for 1-week, 1-month, 3-month, and 6-month horizons. Renders quantile-banded fan charts, terminal-distribution histograms, custom user-defined price bucket probabilities, and per-horizon directional statistics.

**Rate-Differential Disequilibrium Overlay** -- An optional drift adjustment fits an OLS equilibrium model USDHKD = α + β·(US₃ₘ - HK₃ₘ), computes the current z-score, and tilts simulated paths toward fair value with strength λ per step. The same path-dependent overlay is applied identically in both live forecasts and backtests.

**Walk-Forward Backtest Engine** -- Monthly recalibration, configurable date range, paths, step size, and horizons. Produces per-date forecast distributions with CRPS, log score, coverage rates (50/70/95), MAE, calibration tables, and time-series of forecasts versus realised outcomes. Results are SHA1-cached on (returns, rates, model, settings) so re-runs return instantly.

**Single-Model Backtest Tab** -- A colour-coded calibration verdict banner (WELL-CALIBRATED, BIASED, OVERCONFIDENT, UNDERCONFIDENT, PARTIALLY), five headline metric cards, a per-horizon summary table, scatter and calibration plots, a forecast time-series with bands, and a one-click "Set as live default" button.

**Pairwise Comparison Tab** -- Direct head-to-head between any two models. Reports the CRPS winner and Diebold-Mariano p-value with horizon-aware HAC variance pooling, plus a side-by-side metrics table with a "Better" column, twin scatter plots, and a combined time-series chart.

**All-Model Ranking Tab** -- Runs every selected model in one pass, ranks them by CRPS, renders a full pairwise Diebold-Mariano p-value matrix, and plots rolling CRPS for each model so users can see when one regime favoured one model over another.

**Diebold-Mariano with Horizon-Aware HAC** -- The DM test uses per-horizon Newey-West HAC variance pooling with a rule-of-thumb bandwidth and a defensible fallback to the iid variance when the sample HAC sum is suspiciously small. Avoids the spurious near-infinite t-statistics that small-n DM tests routinely produce.

**Optional AI Narrative Summary** -- A short (<=200 word) Anthropic-generated narrative that interprets the active model, the current disequilibrium signal, and the resulting horizon probabilities in plain language. Strictly optional; the quantitative output is the source of truth.

**Data Pipeline** -- USD/HKD daily history from EODHD, US 3-month T-bill yield from FRED, and a synthetic HKD 3-month rate derived from the US rate under the HKMA Linked Exchange Rate System (HIBOR ≈ US + α + β·(US - mean(US))). All sources are parquet-cached locally for twelve hours.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It is honest about uncertainty** -- The output is never a single number. Every horizon produces a full distribution, quantile bands, bucket probabilities, and directional probabilities -- because that is what a pricing model actually produces, and anything less is editorial.

**It is honest about the peg** -- USD/HKD trades inside the HKMA convertibility band of 7.75-7.85. The app says so up front and treats results as relative-model comparisons rather than free-float forecasts. Stochastic-vol and jump models will produce structurally tight distributions, and the app does not pretend otherwise.

**Every model is held accountable** -- A model is only as good as its calibration on real history. The Backtest module runs a walk-forward evaluation against actual outcomes for every horizon, so the ranking shown in the All-Model tab reflects measured performance, not theoretical elegance.

**Statistically defensible hypothesis testing** -- The Diebold-Mariano implementation accounts for horizon overlap with HAC variance pooling and explicitly handles the small-sample edge cases that cause naive DM implementations to report meaningless p-values. When the test cannot be trusted at the sample size, the app says so instead of returning a confident lie.

**Live and backtest dynamics are identical** -- The disequilibrium overlay uses the same path-dependent drift function -λ·(s_t - fair(t))·dt + σ_resid·dW in both live simulation and backtest replay. There is no calibration-time advantage given to live forecasts that the backtest doesn't also receive.

**One interface, thirteen models** -- Every pricer declares its param_spec, calibrates from the same (log_returns, dt, drift) signature, and simulates paths with the same extra_drift_fn plug-in for the overlay. Adding a fourteenth model is a single new class and one line in the registry.

**Reproducible and cached** -- Backtest results are SHA1-keyed on the actual byte content of the input series plus all configuration. Identical inputs always return identical outputs, and a re-run with the same configuration is served instantly from cache.

**No silent fallbacks** -- When a data source fails, the app raises an explicit error rather than substituting placeholder values. When a synthetic HKD rate is used in place of an unavailable FRED series, the sidebar caption says so. The user always knows what they are looking at.`,
    },
  ],
};

appDescriptions["Psychology Pro"] = {
  emoji: "🧠",
  tagline:
    "Multi-Model AI Platform for Intelligence Analysis, Cognitive Profiling, and Argument Stress-Testing",
  sections: [
    {
      emoji: "🌟",
      title: "Overview",
      body: `Psychology Pro is a multi-model AI system for evaluating the intelligence and cognitive fingerprint of any written text. It plugs into five top-tier proprietary LLMs (ZHI 1-5) and lets users route any task to the model best suited for it -- intelligence scoring, formal axiomatization, mathematical proof checking, scientific accuracy auditing, or full-pipeline argument synthesis.

Unlike consumer chatbots that produce generic, hedged, watered-down output, the Cognitive Analysis Platform is built around a strict operating principle: every analysis is rigorous, every verdict is explicit, and the user's instructions are sacred. If you ask for 25 objections, you get 25 objections. If you ask for a refined rewrite that absorbs every counter-argument, that is exactly what is produced. No padding, no preamble, no editorializing.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Academics, graduate students, and researchers** -- need to evaluate the intellectual rigor of papers, dissertations, and arguments before submission or publication

**Philosophers and theorists** -- need formal axiomatization, proof-checking, and conceptual stress-testing of theoretical claims

**Mathematicians** -- need separate evaluation of structural coherence vs. mathematical truth, plus automatic correction of defective proofs

**Lawyers, analysts, and consultants** -- need to anticipate every objection a critic could raise and have a polished, objection-proof final document

**Authors and entrepreneurs** -- need to know whether their ideas survive scrutiny before committing them to print or pitch

**Anyone** -- who wants to know what an actually intelligent reader would think of their writing, instead of a flattering AI summary`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Multi-Model Intelligence Evaluation** -- A 4-phase scoring system evaluates any text across 17 cognitive dimensions (depth, originality, conceptual control, argumentative rigor, semantic density). Genre-aware; compare scores across multiple LLMs side-by-side.

**Full Suite Pipeline** -- One-click execution of the complete analysis chain: 5 batch analyses (+ optional Axiomatic Model) -> BOTTOMLINE synthesis -> 25 Objections with counter-arguments -> Refined Rewrite that absorbs every objection. Download the entire report as one document.

**MAXINTEL Intelligent Rewrite** -- Recursively optimizes text to maximize intelligence scores. Keeps rewriting until cognitive metrics hit your target.

**Conservative Reconstruction** -- Generates the most charitable, coherent version of a text's unified argument, surfacing the strongest reading the author could have intended.

**BOTTOMLINE Synthesis** -- Collapses multiple intermediate analyses into one polished final output tailored to a specific audience, objective, tone, length, and emphasis. Intelligent weighting prioritizes the most relevant intermediate results.

**25 Objections + Counter-Arguments** -- Standalone or pipeline mode. Generates the 25 most likely objections from skeptical readers and crafts a compelling response to each, ordered by likelihood. Tailored to the stated audience.

**Refined Rewrite** -- Takes the BOTTOMLINE and rewrites it in light of all 25 objections, strengthening weak claims and incorporating counter-arguments inline.

**Axiomatic System Transformer** -- Transforms natural language theoretical text into a complete formal axiomatization: primitive terms, axioms, defined terms, an uninterpreted formal calculus, and a semantic model. Never refuses -- always produces output.

**Mathematical Proof System** -- Four distinct modes: COHERENCE (structural quality only), COGENCY (truth + soundness with counterexamples), MAX COHERENCE improves structure while preserving content, MAXIMIZE TRUTH (corrects defective proofs using extended thinking; if the theorem is false, finds and proves a similar true theorem).

**Scientific-Explanatory Coherence** -- Dual assessment: logical consistency AND scientific accuracy, scored separately. The rewrite mode replaces pseudoscientific claims with accurate explanations.

**Truth Select & Math Truth Select** -- Literal-truth verification modes that ignore rhetorical structure and grade the actual factual or mathematical claims.

**GPT Bypass Humanizer** -- Transforms AI-generated text to evade AI detection tools, with built-in detection integration.

**Coherence Meter** -- Validates logical and semantic coherence across documents up to 5,000 words. Includes specialized modes for mathematical proofs and scientific-explanatory writing.

**AI Chat Assistant** -- Conversational interface backed by the Zhi knowledge database, with persistent history and document context awareness.

**Document Workflow** -- PDF/text upload, OCR (Mathpix), speech-to-text (AssemblyAI), translation, web search, and one-click download of every output as a single document.

**System Diagnostic** -- One-click self-check that verifies all API providers, the database, and the full analysis pipeline are operational. Color-coded pass/warn/fail with downloadable report.`,
    },
    {
      emoji: "🔍",
      title: "What Makes It Different",
      body: `**It actually follows instructions** -- The system's job is to do exactly what you said. If you ask for 25 objections, you get 25, not 7.

**It separates structure from truth** -- A well-organized argument for a false claim scores high on coherence and low on cogency. Most AI systems collapse these into one mushy "quality" score; this platform does not.

**It corrects, not just critiques** -- When a proof is defective or a claim is pseudoscientific, the system fixes it. If a theorem is false, it finds and proves a similar true theorem instead.

**Five proprietary LLMs, one workflow** -- ZHI 1 through ZHI 5. Pick the model best suited for each task, or run multiple in parallel and compare. Automatic fallback chain handles rate limits and outages.

**Cognitive scoring built in** -- Every output can be scored across 17 cognitive dimensions, with genre-aware calibration.

**Objection-proof output** -- The Full Suite pipeline doesn't stop at synthesis. It generates the 25 most likely objections, then rewrites the synthesis to absorb every one of them. The final document is something a critic cannot easily dismiss.

**One-click full report** -- After running the Full Suite, every stage (5 batch analyses, optional Axiomatic Model, BOTTOMLINE, 25 Objections, Refined Rewrite) is downloadable as a single timestamped .txt file.`,
    },
    {
      emoji: "🧩",
      title: "How It Works",
      body: `Upload or paste text. Select the analysis mode. Choose the LLM provider (ZHI 1-5). Run the analysis. Review the streamed output and download the report.`,
    },
    {
      emoji: "🛠️",
      title: "System Notes",
      body: `**Frontend:** React + TypeScript + Vite + shadcn/ui + Tailwind CSS

**Backend:** Express.js + TypeScript

**Streaming:** Server-Sent Events (SSE)

**Database:** PostgreSQL with Drizzle ORM

**File Support:** TXT and DOCX

**Payments:** Stripe configured for credit purchases`,
    },
  ],
};

appDescriptions["Graphic Novel Creator"] = {
  emoji: "📖",
  tagline:
    "Multi-Model AI Platform for Turning Essays, Stories, and Images into Fully Illustrated Graphic Novels",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `The Graphic Novel Creator is a multi-model AI system for transforming any written work -- essays, philosophy papers, short stories, screenplays in waiting -- into a fully illustrated graphic novel. It plugs into four top-tier proprietary LLMs (Zhi 1-4) and lets users route any task to the model best suited for it -- narrative planning, screenplay formatting, expository captioning, or uncensored adult fiction.

Unlike consumer art generators that produce generic, hedged, sanitized output, the Graphic Novel Creator is built around a strict operating principle: every panel is faithful to the source text, every caption sits above the image (never inside it), and the author's specifications are sacred. If you ask for 50 panels in a noir style with three named characters, that is exactly what is produced. No padding, no preamble, no editorializing.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Essayists and long-form writers** -- need to see their arguments rendered as visual sequences, panel by panel, to test how well the prose translates to image

**Novelists and short-story authors** -- need to prototype a graphic adaptation of an existing manuscript without commissioning an artist

**Screenwriters and comics writers** -- need a one-click essay-to-screenplay converter that outputs industry-standard panel format

**Philosophers and theorists** -- need conceptual material rendered as illustrated allegory for teaching, lecture decks, or publication

**Adult fiction authors** -- need uncensored text and image generation for explicit material that mainstream models refuse

**Anyone** -- who wants to see what their writing actually looks like when an intelligent reader visualizes every scene`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Multi-Mode Generation** -- Three first-class creative modes: Essay -> Graphic Novel (text in, illustrated panels out), Essay -> Screenplay (text in, industry-format comic script out), and Image -> Graphic Novel (a seed image plus a prompt becomes the basis for the full work).

**Four-Model Routing** -- ZHI 1 through ZHI 4. Pick the model best suited for each task: ZHI 1 for fast structural planning, ZHI 2 for nuanced narrative voice, ZHI 3 for crisp expository captioning, ZHI 4 for fully uncensored adult fiction and explicit imagery. The explicit toggle automatically routes any text request through ZHI 4 regardless of the selected model.

**Panel-by-Panel Storyboarding** -- The selected text model first plans the entire novel as a structured JSON storyboard: every panel gets a narration caption and a self-contained visual prompt. Recurring characters are tracked across panels for visual continuity.

**Captions Above, Always** -- All character voice and narration appears as caption boxes positioned above the panel image. Speech bubbles, thought balloons, and in-image text are explicitly prohibited at the prompt level. The result reads as illustrated literature, not a webcomic.

**Reference Character Uploads** -- Upload one or more reference images and label them ("the man", "Sarah", "the wolf"). Labels are injected into every relevant image prompt so recurring characters stay visually consistent panel to panel.

**Free-Form Specifications** -- A dedicated specifications field accepts open-ended direction: tone, art style, character roster, treatment notes, framing devices. The author's instructions are passed verbatim into the storyboard system prompt.

**Document Workflow** -- Drag-and-drop upload for .txt, .pdf, and .docx source material. Files are validated by magic-byte signature, not just extension. Extracted text is dropped straight into the source field.

**Live Panel Streaming** -- The novel detail page polls every two seconds while generation is in flight. Panels appear in order as each image finishes rendering, with a progress bar reflecting the completion ratio.

**Adult Content Pipeline** -- A single toggle routes text generation through the uncensored ZHI 4 path; image generation runs on a model configured to render explicit material without refusal.

**Screenplay Mode** -- Converts source text into a complete panel-by-panel comic screenplay in standard industry format (PANEL N -> IMAGE: -> CAPTION:), with no speech-bubble dialogue, ready for an artist to draw from.

**One-Click Export** -- Every novel can be downloaded as a print-ready PDF (browser print pipeline with a custom print stylesheet) and every screenplay as a .txt manuscript. Full ownership of every artifact you generate.

**Per-Panel Resilience** -- If an individual image fails to render, that panel is flagged with its error and the rest of the novel continues. Final novel status reports done only when every panel succeeds; otherwise the novel is marked failed with a descriptive error so the author knows to regenerate.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It actually follows instructions** -- The system's job is to do exactly what you said. If you ask for 50 panels in a noir style with three named characters, you get 50 panels, noir, three characters -- not 12 panels in a generic style.

**Captions, never bubbles** -- A hard architectural commitment: narration sits above the panel, the image stays pure. The output reads as illustrated literature, not as a webcomic with text crammed inside the frame.

**Four proprietary LLMs, one workflow** -- ZHI 1 through ZHI 4. Pick the model best suited for each task, or flip the explicit toggle and override the routing automatically. No model swapping, no separate accounts, no separate API keys to manage in the UI.

**Uncensored when you need it** -- The explicit toggle is a first-class feature, not an apology. Adult fiction authors get the same panel-by-panel storyboarding, the same caption discipline, the same export pipeline as everyone else.

**Reference-image character continuity** -- Upload a face, label it, and the system carries that character through every panel prompt that includes them. No hand-tuning per panel.

**Three creative modes, one studio** -- Essay -> Graphic Novel, Essay -> Screenplay, and Image -> Graphic Novel share the same backbone, the same model selector, the same export tools. Pick the artifact you want; the studio handles the rest.

**One-click full export** -- After generation, every novel is downloadable as a single print-ready PDF and every screenplay as a single .txt file. Nothing is locked behind a paywall, a watermark, or a "view in our viewer" page.

**Partial-failure transparency** -- A novel where one panel fails is reported as failed with the reason, not silently passed off as done. You always know whether the artifact you are downloading is the artifact you asked for.`,
    },
  ],
};

appDescriptions["Goal Tracker"] = {
  emoji: "🗓️",
  tagline: "A Calendar-Based To-Do Tracker with Honest Follow-Through Analytics",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `Tally is a personal calendar app built around a single uncomfortable question: of the things you said you were going to do, how many did you actually do?

It works like Google Calendar -- write down what you intend to do on a given day, set tasks to repeat daily, weekly, or monthly, and navigate by date through a month-grid calendar. But unlike Google Calendar, every day has two columns side by side: a To Do column for what you intended, and a Completed column for what actually happened. Items move from left to right as the day unfolds.

Tally also extends past the daily horizon -- it tracks medium-term goals (e.g. publish a peer-reviewed article) and long-term goals (e.g. get a PhD), with the user deciding what chronologically counts as each. And it adds something Google Calendar refuses to: a running, honest completion percentage at the top of every page, plus deeper analytics that break down follow-through by time frame and importance level. No padding, no spin, no flattering summaries.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Graduate students and researchers** -- need to track daily writing alongside multi-year dissertation goals and see whether the daily work is actually feeding the long-term work

**Self-improvers and habit builders** -- need an unforgiving mirror that shows whether daily intentions are being honored over weeks and months, not just remembered

**Project-driven professionals** -- need to hold both day-level execution and quarter/year-level milestones in one place, with deadlines that don't get lost

**People who set goals and then forget them** -- need a system where long-term goals stay visible while daily tasks get done, instead of one displacing the other

**Anyone tired of productivity apps that pretend** -- who wants raw completion percentages instead of streak badges, motivational quotes, and gamified nonsense`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Two-Column Day View** -- Every day shows a To Do column and a Completed column side by side. Items start on the left and move to the right when checked off, with smooth animation. Reopen any item to move it back. A mini month-calendar on the left indicates which days have tasks and which were fully completed.

**On a Day vs By a Day Scheduling** -- Every task is scheduled either on a specific day (it appears that day only) or by a specific day (it has a deadline). "By" tasks get a dedicated Due By board that sorts every pending deadline from overdue -> today -> upcoming, so nothing slips just because it wasn't on today's list.

**Recurring Tasks** -- Tasks can repeat daily, weekly, or monthly, with an optional end date. Each occurrence is completed independently, so a recurring habit can be done some days and missed others -- and the analytics see all of it.

**Medium-Term and Long-Term Goals** -- Goals are first-class tasks with their own page, separated into medium-term and long-term sections. The user picks the target date -- Tally does not assume what counts as either. Each goal shows a progress bar based on time elapsed toward the target, days remaining, and a status of In progress, Achieved, or Missed.

**Optional Importance Levels (1-10)** -- Any task -- daily, medium-term, or long-term -- can carry an importance rating from 1 to 10. It's optional by design. Set it when it matters; leave it off when it doesn't.

**Running Completion Rate** -- A live overall completion percentage sits at the top of every page, alongside per-time-frame rates for daily, medium, and long. Recalculated on every change. No averaging tricks, no exclusions beyond what's analytically sound.

**Three-Dimensional Analytics** -- A dedicated analytics page breaks down completion three ways: overall, by time frame (daily / medium / long), and by importance level (1 through 10). Importance-level analytics tell you whether the things you said mattered most actually got done -- or whether you've been quietly burying your priorities.

**Fair Analytics Math** -- Future-dated "on" tasks don't drag down the percentage (they can't be failed yet). "By" tasks count as missed only after their deadline passes without completion. Recurring tasks are counted per-occurrence, not per-template, so missing one Tuesday doesn't ruin the whole habit.

**Local-First Persistence** -- Everything is saved to browser local storage. No accounts, no sign-up, no server-side anything. Open the page, start using it, your data stays with you.

**Quick Add From Anywhere** -- A persistent Add button in the header opens a form for title, time frame, schedule type, date, optional recurrence, optional importance slider, and notes. Always one click away.`,
    },
    {
      emoji: "🎯",
      title: "What Makes It Different",
      body: `**Two columns, not one** -- The single biggest departure from Google Calendar. The to-do column is intention; the completed column is reality. Holding both side by side, day after day, is what makes the completion rate at the top mean something.

**It tells you the truth in percentages** -- Most calendar and habit apps reward you with streaks, stars, and emojis. Tally gives you a number. If your overall completion rate is 38%, that's what it says.

**Long-term goals live in the same app** -- Calendar apps handle today. Goal apps handle "someday." Tally refuses to separate them, because the whole point is to see whether daily behavior is feeding multi-year ambition.

**The user defines the time horizons** -- Tally has medium-term and long-term goals, but it does not declare what either means. Three months might be medium-term for one person and long-term for another. The user sets the date. The app holds it.

**Optional importance, weaponized in analytics** -- Importance is voluntary, but the moment you start using it, the analytics surface a brutal question: are you completing your 10s, or your 3s? Most people discover they're great at the easy ones and quietly avoiding the hard ones.

**"By a day" is a first-class scheduling mode** -- Google Calendar only lets you say what you're doing on a day. Tally lets you say what's due by a day, and surfaces every such item in one ranked list at the top of the Due By page, sorted by urgency.

**Deadlines do not get forgotten** -- A "by" task remains visible on every applicable day until it's done or the deadline passes. It doesn't disappear because you scrolled past it.

**No accounts, no cloud, no nonsense** -- All state lives in your browser. The app loads instantly, persists locally, and never asks for an email address.

**Calm typography, considered color** -- The interface is built to feel like a private journal you actually want to open every morning, not an enterprise productivity dashboard. Warm ink-on-paper palette, serif headings, deliberate restraint.`,
    },
    {
      emoji: "🛠️",
      title: "Stack",
      body: `React + Vite, TypeScript, Tailwind CSS + shadcn/ui, date-fns (date arithmetic and recurrence math), Recharts (completion-rate bar charts), Framer Motion (layout animations), Wouter (client-side routing), LocalStorage (single-key persistence under tally:v1).`,
    },
  ],
};

appDescriptions["Audio Transcriber"] = {
  emoji: "🎙️",
  tagline:
    "AI-Powered Audio Transcription for Recordings, Interviews, and Voice Notes",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `The MP3 Transcriber is a focused, single-purpose audio transcription tool that converts spoken audio into accurate, readable text. Drop in an MP3, WAV, M4A, or OGG file and the platform pipes it through OpenAI's gpt-4o-mini-transcribe model to produce a clean transcript in seconds.

Unlike bloated transcription suites that bury the core feature behind paywalls, project management, and seat licensing, the MP3 Transcriber is built around one operating principle: upload audio, get text. Every transcription is persisted, every status is explicit, and every output is copy-ready. No padding, no editorializing, no friction.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Journalists and reporters** -- need fast, accurate transcripts of recorded interviews to pull quotes and verify statements before filing

**Podcasters and content creators** -- need transcripts of episodes for show notes, captions, blog repurposing, and SEO

**Researchers and ethnographers** -- need verbatim transcripts of field recordings, focus groups, and qualitative interviews for analysis and coding

**Students and academics** -- need to convert lecture recordings and seminar audio into searchable notes for study and citation

**Lawyers and legal professionals** -- need preliminary transcripts of depositions, voice memos, and recorded calls for case prep

**Anyone** -- who has a pile of voice memos and wants them as text without paying for an enterprise transcription service`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Multi-Format Audio Upload** -- Accepts MP3, WAV, M4A, and OGG files up to 50MB. Drag-and-drop or click-to-browse, with automatic format detection and conversion to ensure compatibility with the transcription model.

**AI-Powered Speech-to-Text** -- Transcripts are generated by OpenAI's gpt-4o-mini-transcribe model via Replit AI Integrations. No API keys to manage, no separate billing setup -- usage is metered against your Replit credits.

**Background Processing Pipeline** -- Uploads return immediately with a processing record while transcription runs server-side. The UI auto-refreshes every 3 seconds so completed transcripts appear without a manual refresh.

**Persistent Transcription History** -- Every upload is saved to PostgreSQL with filename, file size, full text, status, and timestamp. Past transcriptions remain available across sessions and are never silently dropped.

**Explicit Status Tracking** -- Each transcription carries an unambiguous status (processing, completed, or failed) with a captured error message on failure. No spinners that hang forever, no silent failures.

**Copy-Ready Output** -- Completed transcripts render in a monospaced, readable format with a one-click copy-to-clipboard button. Text is preserved verbatim from the model -- no auto-formatting, no summarization, no edits.

**Live Statistics Dashboard** -- A persistent summary surfaces total files processed, completed transcription count, and cumulative data size, updating in real time as new uploads land.

**One-Click Deletion** -- Any transcription can be permanently removed from history with confirmation, keeping the workspace focused on what matters now.

**Format-Agnostic Pipeline** -- Audio is automatically detected and converted via ffmpeg when the source format isn't natively supported, so the user never has to think about codecs, sample rates, or container formats.

**System Diagnostic** -- A /api/healthz endpoint reports server liveness for uptime monitoring, deployment health checks, and quick troubleshooting.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It does one thing exceptionally well** -- This is a transcription tool, not a workflow platform, not a meeting assistant, not a CRM. The entire surface area is built around uploading audio and reading text back. No feature creep, no upsell.

**It actually finishes the job** -- Every transcription ends in a definite state (completed or failed) with the full text or a captured error. No half-finished uploads stuck in limbo, no opaque queues.

**It separates the upload from the result** -- The API responds the moment the file is accepted, and the transcript appears in history when it's ready. The user is never blocked on a long-running request.

**It uses real persistence, not browser storage** -- Transcriptions live in PostgreSQL, not localStorage or session memory. Close the tab, open it on a different device, and your history is still there.

**No API key wrangling** -- Replit AI Integrations handles OpenAI credentials transparently. There's no .env file to populate, no key rotation to manage, no separate vendor account to set up.

**Contract-first architecture** -- The frontend and backend are wired together through a single OpenAPI specification. Validation schemas, React Query hooks, and route types are all generated from one source of truth, eliminating drift between client and server.

**Honest empty states** -- When there's nothing to show, the UI says so plainly. No fake demo transcripts, no synthetic placeholders pretending to be real data.

**Designed to be used daily** -- Warm typography, deliberate color, and considered micro-interactions make the tool feel like something you actually want to open -- not an enterprise admin panel with rounded corners.`,
    },
    {
      emoji: "🛠️",
      title: "Tech Stack",
      body: `**Frontend** -- React 19, Vite, Tailwind CSS, TanStack Query, wouter

**Backend** -- Express 5, Multer (file uploads), pino (structured logging)

**Database** -- PostgreSQL with Drizzle ORM and drizzle-zod validation

**AI** -- OpenAI gpt-4o-mini-transcribe via Replit AI Integrations

**Codegen** -- Orval generates React Query hooks and Zod schemas from the OpenAPI 3.1 spec

**Build** -- esbuild (server bundle), Vite (client bundle)

**Runtime** -- Node.js 24, pnpm workspaces monorepo`,
    },
    {
      emoji: "📡",
      title: "API Endpoints",
      body: `**POST /api/transcriptions** -- Upload an audio file (multipart/form-data). Returns the created transcription record immediately with status: processing.

**GET /api/transcriptions** -- List all transcriptions ordered by most recent.

**GET /api/transcriptions/:id** -- Retrieve a single transcription by ID.

**DELETE /api/transcriptions/:id** -- Permanently delete a transcription.

**GET /api/transcriptions/stats** -- Aggregate counts and total file size processed.

**GET /api/healthz** -- Liveness check for monitoring and deployment health.`,
    },
  ],
};

appDescriptions["PDF Shrinker"] = {
  emoji: "📄",
  tagline:
    "A fast, free, no-account-required PDF compression tool with target-size support and per-page intelligence.",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `Shrink Your PDF is a browser-based PDF compression tool built on top of Ghostscript. It plugs into a small Express API that processes uploads in memory and streams progress back to the browser in real time. Users can either pick a quality preset (from Print Quality down to Extreme) or set an exact target file size in megabytes and let the app pick the right strategy automatically.

Unlike most online PDF compressors that quietly fail on stubborn pages, return one-size-fits-all output, or hide the file behind a paywall, Shrink Your PDF is built around three principles: every page is processed independently, every compression attempt is visible to the user, and no file ever leaves the temporary in-memory buffer. If you ask for 1 MB, the system tries strategies from gentlest to most aggressive and stops the moment it hits your target. If a page resists compression, you can flag it and recompress without re-uploading.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Anyone emailing large PDFs** -- needs to fit a scanned contract, invoice, or report under a mailbox attachment limit (usually 10 MB or 25 MB)

**Students and researchers** -- need to shrink scanned textbooks, papers, and lecture notes for upload portals with strict size caps

**Lawyers, accountants, and consultants** -- need to compress signed agreements and image-heavy reports without losing legibility

**Designers and print shops** -- need a quick way to triage oversized client files before review or proofing

**Anyone tired of uploading sensitive documents to sketchy "free" PDF sites** -- needs an option that doesn't require an account, an email, or a wait queue`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Quality Preset Mode** -- Five named compression levels: Extreme (50 dpi), Maximum (72 dpi), Recommended (120 dpi), Print Quality (200 dpi), and Press Quality (300 dpi). Each preset maps to a tuned set of Ghostscript downsampling, JPEG quality, and color preservation parameters.

**Target Size Mode** -- Set an exact file size in MB via slider, presets (500 KB, 1 MB, 2 MB, 5 MB, 10 MB, 25 MB), or numeric input. The backend tries up to nine compression strategies in order (printer -> ebook -> screen -> extreme -> rasterize at 100/72/50/36/24 dpi) and stops as soon as the target is met.

**Per-Page Processing** -- Every page is split out and compressed independently, so a single stubborn page can never hang the whole job. Each page has its own 45-second timeout; failures are reported and the job continues.

**Stubborn Page Detection** -- Any page that compresses to more than 80% of its original size (or fails outright) is automatically flagged in an amber panel with a checkbox. Tick the pages you want to keep as-is and click recompress -- no re-upload required.

**Rasterize Fallback** -- For pre-compressed, signed, or otherwise resistant PDFs that ignore standard pdfwrite passes, the app falls back to the pdfimage24/pdfimage8 device with JPEG compression. This is what makes aggressive compression actually aggressive on real-world files.

**Real-Time Progress via SSE** -- Both modes stream live progress over Server-Sent Events. Quality mode shows "Compressing page X of Y" with a true progress bar; target mode shows each strategy as it's tried, with the resulting file size and a check when the target is hit.

**Grayscale Conversion** -- Optional toggle that strips color from the output for extra savings on scans, photos, and color-heavy documents. Available in both modes.

**Per-Page Report** -- After every job, an expandable table shows every page's original size, compressed size, percentage saved, and status (ok / stubborn / kept original / failed). No black box.

**In-Memory Processing** -- Files are held in a Map with a 30-minute TTL and deleted automatically. Nothing is written to disk beyond a short-lived temp directory used during the Ghostscript pass itself.

**XHR Upload Progress** -- Real upload progress bar via XMLHttpRequest.upload.onprogress, so large files don't appear to stall at "uploading..." for thirty seconds.

**Hard 100 MB Upload Cap** -- Enforced client-side and server-side to keep the in-memory model safe.

**Resumable Recompression** -- Once a file is uploaded, the buffer is reused for every subsequent compression attempt. Try different quality levels, toggle grayscale, or exclude stubborn pages without re-uploading a single byte.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It actually compresses stubborn PDFs** -- Most online tools quietly return the original file (or a 2% smaller copy) when they hit a pre-compressed, scanned, or signed PDF. Shrink Your PDF detects this and falls back to a rasterize-and-rebuild pass that typically achieves 70-95% size reduction on image-heavy documents.

**It separates user intent from compression strategy** -- You either pick a quality level (and accept whatever size results) or pick a target size (and accept whatever quality results). Most tools conflate the two with a useless "low / medium / high" slider that doesn't tell you what you'll get.

**It tells you exactly what happened** -- Every page's before/after size, every strategy that was tried, every page that resisted compression. No hidden processing, no vague "done!" message.

**It lets you intervene without starting over** -- Stubborn pages get flagged, and you can keep them as originals and recompress the rest with one click. No re-upload, no losing your settings.

**It hits exact target sizes** -- Set "1 MB" and the system will try increasingly aggressive strategies until it gets there, stopping at the first one that works so you keep the highest possible quality. If it can't hit your target, it returns the smallest version it managed and tells you why.

**It never leaves your browser session** -- Files are processed in memory, kept for 30 minutes, and deleted. No account, no email, no upload queue, no "your file is in position 47."

**It's free and unbranded** -- No watermark, no daily limit, no "upgrade to compress more than 3 files per day."

**It's built on the right tool for the job** -- Ghostscript is the reference implementation for PDF compression. The app is a thin, opinionated, browser-friendly wrapper around it -- not a half-baked WebAssembly imitation.`,
    },
    {
      emoji: "🛠️",
      title: "Stack",
      body: `**Frontend** -- React 18 + Vite + TypeScript, Tailwind CSS, shadcn/ui components, wouter for routing, EventSource for SSE

**Backend** -- Express 5 (Node.js 24) + TypeScript, Ghostscript via child_process, in-memory job store with 30-minute TTL

**Monorepo** -- pnpm workspaces with shared API spec (OpenAPI + Orval codegen), Drizzle ORM scaffolding, and per-artifact builds

**Compression engine** -- Ghostscript 10.05.1 with pdfwrite (standard passes) and pdfimage24 / pdfimage8 (rasterize fallback)`,
    },
  ],
};

appDescriptions["Cognitive Profiler"] = {
  emoji: "🧠",
  tagline:
    "Multi-Model AI Platform for Intelligence Analysis, Cognitive Profiling, and Psychological Assessment",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `The Cognitive Profiler is a multi-model AI system for evaluating the intelligence and cognitive fingerprint of any written text. It plugs into four top-tier proprietary LLMs (ZHI 1-4) and lets users route any task to the model best suited for it -- cognitive scoring, psychological profiling, psychopathological assessment, or full-document sequential analysis.

Unlike consumer chatbots that produce generic, hedged, watered-down output, the Cognitive Profiler is built around a strict operating principle: every analysis is rigorous, every verdict is explicit, and the user's instructions are sacred. If you submit a writing sample, you get a real assessment. If you submit a long document, it is processed chunk by chunk with a full sequential pipeline. No padding, no preamble, no editorializing.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Academics, graduate students, and researchers** -- need to evaluate the intellectual rigor of papers, dissertations, and arguments before submission or publication

**Philosophers and theorists** -- need formal cognitive stress-testing and conceptual clarity assessment of theoretical claims

**Psychologists and clinicians** -- need a structured psychological and psychopathological profile of written communication

**Lawyers, analysts, and consultants** -- need to understand the reasoning style and cognitive strengths of a document's author

**Authors and entrepreneurs** -- need to know whether their ideas demonstrate genuine intelligence before committing them to print or pitch

**Anyone** -- who wants to know what an actually intelligent reader would think of their writing, instead of a flattering AI summary`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Multi-Model Intelligence Evaluation** -- Four proprietary LLMs (ZHI 1 through ZHI 4) score any text across 18 intelligence dimensions (insightfulness, point development, logical structure, originality, depth, precision, and more). Pick the model best suited for each task or compare results across providers.

**18-Question Intelligence Assessment Protocol** -- Every cognitive analysis answers all 18 mandatory assessment questions with detailed reasoning and a numeric score (0-100). Questions probe insight, development, logical structure, originality, complexity, coherence, precision, and genuine understanding.

**Sequential Chunk Processing** -- Documents over 1,000 words are automatically split into sequential chunks and processed one at a time with controlled 10-second delays. Real-time streaming updates show each chunk as it completes.

**Psychological Analysis** -- Deep psychological profiling of writing samples, assessing personality traits, emotional patterns, attachment style, and behavioral tendencies revealed through written language.

**Psychopathological Assessment** -- Structured evaluation of psychopathological indicators present in text, with clinical-level analysis of thought patterns and communication style.

**Comprehensive Cognitive Analysis** -- Full 20-parameter cognitive assessment with individual parameter scoring, authentic quotations extracted directly from the submitted text, and percentile-ranked scores showing where the author stands relative to the general population.

**Comprehensive Psychological Analysis** -- Complete psychological profile across 20 parameters, with detailed reasoning, direct quotations, and population-relative percentile scoring.

**File Upload Support** -- PDF, Word (.docx), and plain text (.txt) files accepted. Robust text extraction pipeline handles documents of any length with automatic chunking for large files.

**Real-Time Streaming** -- All analyses stream results live to the screen as they are generated, with visible progress indicators showing which chunk or parameter is currently being processed.

**Downloadable Reports** -- Every analysis can be downloaded as a formatted report for archiving, sharing, or further study.

**Four ZHI Providers** -- ZHI 1 (OpenAI), ZHI 2 (Anthropic), ZHI 3 (DeepSeek), ZHI 4 (Perplexity). Each brings different strengths; all are available on demand.

**Credit System** -- Usage is tracked via a credit system. Users purchase credits to run analyses. Special accounts available for development and testing with unlimited access.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It actually follows instructions** -- The system's job is to do exactly what you said. If you ask for an 18-question assessment, you get all 18 questions answered, not a summary.

**It separates cognitive from psychological** -- A well-structured argument by an emotionally dysregulated author scores high on cognitive coherence and low on psychological stability. Most AI systems collapse these into one mushy "quality" score; this platform does not.

**It corrects, not just critiques** -- The system is built to identify weaknesses and score them accurately, not to provide encouragement or hedge verdicts.

**Four proprietary LLMs, one workflow** -- ZHI 1 through ZHI 4. Pick the model best suited for each task, or run multiple and compare. Automatic fallback handling manages rate limits and outages.

**Population-relative scoring** -- Scores are expressed as percentiles. A score of 85 means the text exceeds 85% of the general population on that dimension. No ambiguous letter grades or vague qualitative labels.

**Sequential processing built in** -- Long documents do not time out or fail. They are split, queued, and processed sequentially with real-time updates at every step.

**Authentic quotations** -- Comprehensive analyses extract real quotations directly from the submitted text, not paraphrases or invented examples. Every citation is verifiable against the original.

**Instructional video included** -- A full tutorial video is available directly in the app, accessible from every page via the header navigation.`,
    },
    {
      emoji: "📋",
      title: "Analysis Modes",
      body: `**Cognitive (Standard)** -- Fast 18-question intelligence assessment with ZHI provider of your choice

**Psychological (Standard)** -- Structured psychological profile of the writing sample

**Comprehensive Cognitive** -- Full 20-parameter cognitive analysis with quotations and percentile scoring

**Comprehensive Psychological** -- Full 20-parameter psychological analysis with quotations and percentile scoring`,
    },
    {
      emoji: "🔑",
      title: "Technical Notes",
      body: `Minimum submission length: 100 characters. Sequential chunking activates automatically above 1,000 words. Each chunk is processed with a 10-second delay to ensure quality and avoid rate limits. All four ZHI providers tested and verified operational. Real-time Server-Sent Events (SSE) for live streaming of results. PostgreSQL database for user accounts and credit tracking. Supported file types: PDF, Word (.docx), and plain text (.txt).`,
    },
  ],
};

appDescriptions["OCR Pro"] = {
  emoji: "📄",
  tagline:
    "Fast, Accurate OCR and Text Extraction for PDFs, Images, and Word Documents",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `Document Scanner is a web-based text extraction platform that pulls clean, copy-ready text out of scanned PDFs, photographs, screenshots, plain text files, and Microsoft Word documents. It is built around a hybrid extraction engine: a fast local text parser handles digital PDFs and Word files instantly, while Azure Cognitive Services Computer Vision Read API handles scanned pages and image-based documents that require true OCR.

Unlike generic OCR tools that try to do everything and fail on large or image-heavy files, Document Scanner picks the right extraction path automatically. Lecture slides with embedded text return in seconds. Scanned receipts get the full OCR treatment. Large PDFs up to 300MB are accepted, and Word documents are converted with full text fidelity using mammoth. The extracted text is yours to copy, download, or combine with other files.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Students and academics** -- need to convert lecture slides, scanned articles, and PDF textbooks into searchable, copy-pasteable text for notes and citations

**Researchers and analysts** -- need to extract text from scanned reports, archival documents, and image-based PDFs that other tools choke on

**Lawyers and legal professionals** -- need to digitize scanned contracts, depositions, and case files for review and search

**Writers and editors** -- need to merge multiple Word and text drafts into a single working document

**Office workers and administrators** -- need to extract text from scanned forms, receipts, invoices, and faxes

**Anyone** -- who needs to get text out of a document and into a usable format without manual retyping`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Hybrid PDF Extraction** -- Automatically detects whether a PDF has embedded text or is image-based. Digital PDFs are parsed instantly using pdf-parse with zero image overhead -- perfect for lecture decks and slides where you only want the words. Scanned PDFs fall back to Azure Read OCR.

**Image OCR** -- Extracts printed and handwritten text from PNG and JPG files using Azure Cognitive Services Computer Vision Read API v3.2, with multi-language support and high accuracy on real-world scans.

**Word Document Conversion** -- Converts .docx files to plain text using mammoth, preserving paragraph structure and ignoring formatting noise. Works in both the main upload area and the file combiner.

**Plain Text Passthrough** -- Accepts .txt files directly without unnecessary processing, returning the raw content immediately.

**Combine Text Files** -- Merge multiple .txt and .docx files into a single output document. Includes drag-and-drop reordering, up/down arrow controls, and individual file removal so you control the exact final order.

**Large File Support** -- Accepts files up to 300MB. Image-heavy slide decks that exceed Azure's 50MB OCR limit are still processed via the text-only path so they never get rejected for size.

**Drag-and-Drop Upload** -- Drop files anywhere in the upload zone or use the file picker. Visual feedback indicates accepted formats and current upload state.

**Copy and Download** -- Copy extracted text to clipboard with one click or download as a .txt file. Character count is displayed for every result.

**Reset and Reuse** -- One-click reset clears the current document and result so you can immediately scan the next file without reloading the page.

**Google OAuth Login** -- Sign in with your Google account using passport-google-oauth20. No passwords to manage, no separate account to create.

**Stripe Payment Integration** -- $1 for 24-hour access to the OCR feature, handled through Stripe Checkout with webhook-verified payment confirmation. Access status is tracked per user in PostgreSQL.

**Dark and Light Mode** -- Full theme toggle with system preference detection and localStorage persistence.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It picks the right tool for the job** -- Most OCR apps run every file through the same expensive OCR pipeline, which is slow and chokes on large image-heavy PDFs. Document Scanner uses fast local text extraction first and only invokes Azure OCR when the document is actually a scan. Lecture slides return in under a second.

**It handles files other tools reject** -- A 100MB lecture deck full of embedded images normally fails on cloud OCR services because of size limits. Document Scanner extracts the text directly from the PDF stream and ignores the images entirely, so size is not a barrier.

**It tells you what actually went wrong** -- When something fails, you get a clear, human-readable error message -- not a cryptic JSON parse error or a generic "something went wrong" toast. Server timeouts, oversized files, and OCR failures each surface with specific guidance.

**It supports the full document lifecycle** -- Upload, extract, copy, download, and combine -- all in one interface. The combine tool accepts both .txt and .docx files in the same workflow, so you can merge mixed-format drafts without converting them separately first.

**It respects your time** -- No watermarks, no signup walls before you can see the tool, no upsell modals. Pay $1 once and you get 24 hours of unlimited scanning.

**It runs on your infrastructure** -- Built to use your own Neon PostgreSQL database, your own Google OAuth credentials, and your own Stripe account. You own the data, you control the billing, and you set the payment terms.`,
    },
  ],
};

appDescriptions["Podcast Creator"] = {
  emoji: "📖",
  tagline:
    "AI-Powered Document Analysis Platform for Interactive Study, Content Generation, and Scholarly Research",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `Living Book Creator is a web application that transforms any document into a dynamic, interactive study companion. Upload a PDF, DOCX, or TXT file -- or paste text directly -- and the platform unlocks a full suite of AI-powered tools for analyzing, discussing, testing, rewriting, and reimagining your content. It plugs into five top-tier proprietary LLMs (ZHI 1-4) and lets users route any task to the model best suited for it.

Unlike generic chatbots that produce hedged, watered-down output, Living Book Creator is built around interactive engagement: every function works on your entire document, every interaction is contextual, and every output is downloadable. Whether you're studying a philosophy text, drafting a research paper, or exploring a novel, the platform turns passive reading into active analysis.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Students and learners** -- need to grasp dense material, prepare for exams, and quiz themselves on what they've read

**Researchers and academics** -- need to extract theses, map argument structures, and find related scholarly works

**Writers and authors** -- need to rewrite, restructure, and rethink their drafts in fresh ways

**Podcasters and content creators** -- need to convert written content into engaging audio dialogues or solo narrations

**Teachers and instructors** -- need to generate test questions, study guides, and discussion prompts from source texts

**Anyone curious** -- who wants to have a real conversation with a document instead of just skimming it`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Multi-Model AI Integration** -- Route any analysis task through OpenAI GPT-4o (ZHI 1), Anthropic Claude (ZHI 2), DeepSeek (ZHI 3), or Perplexity (ZHI 4). Pick the model best suited to the task or compare outputs across providers.

**Document Upload Pipeline** -- One-click upload for PDF, DOCX, and TXT files. Automatic text extraction, math notation formatting (KaTeX), and preservation of original HTML structure via Mammoth.js. Direct text input also supported.

**Interactive Test Me** -- Generates a 5-question test (3 multiple choice + 2 short answer) from your entire document, with real test-taking interface, automatic grading, score feedback, and one-click regeneration for unlimited practice.

**Cognitive Map** -- Produces a true visual diagram using Mermaid.js showing the hierarchical structure of any document: thesis -> claims -> sub-claims -> evidence. Two-column layout pairs structured text analysis with the visual flowchart.

**Summary/Thesis Extraction** -- Distills any document into clean THESIS and EXPLANATION sections. Scrollable display with copy, TXT download, and Word export.

**Thesis Deep Dive** -- Comprehensive scholarly analysis broken into four structured sections: EXTRACTED THESIS, ORIGINAL WORDING, MODERN APPLICATIONS, and CROSS-COMPARISON. Two-column layout pairs the source passage with the deep-dive output.

**Suggested Readings** -- Generates 8-12 academic book recommendations tailored to the themes, concepts, and subject matter of your document. Each recommendation includes author, title, and a specific explanation of relevance.

**Rewrite Function** -- Rewrites your entire document or selected text according to your instructions. Ships with a smart default ("rewrite in as lucid a way as possible, expand or summarize as needed, use vivid examples, write so an eighth grader can understand it") that you can customize or replace entirely.

**Discuss Function** -- Full chat interface for having a real conversation about any document. Auto-starts with an overview, maintains conversation history, supports follow-up questions, and exports any AI response as TXT or Word.

**Podcast Generation** -- Converts documents into spoken audio podcasts. Four modes: Single Host (Normal), Dialogue (Normal), Single Host (Custom), Dialogue (Custom). Uses distinct voices for HOST and GUEST (alloy and nova) via Microsoft Azure TTS for natural speech.

**Two-Document Comparison** -- Side-by-side analysis of two documents at once. Includes dual-document Test Me, Podcast generation (with synthesis workflow), Rewrite, and mind map generation. Auto-complete intelligence handles short documents automatically.

**Text Selection Tools** -- Highlight any passage to trigger a popup toolbar for targeted AI analysis. Discuss specific paragraphs without leaving the document view.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**Every function works on the entire document** -- Standing buttons run on the whole document by default, not just chunks. No need to manually feed text to the AI piece by piece.

**Auto-complete intelligence** -- Short documents (<=1000 words) automatically use entire content. Larger documents support manual chunk selection for targeted analysis. The system adapts to document size.

**True visual diagrams, not just text** -- The Cognitive Map function generates real Mermaid flowcharts with arrows and connected nodes, showing argument structure as a diagram rather than describing it in prose.

**Interactive testing, not just question display** -- Test Me presents a real test-taking interface with input fields, answer submission, automatic grading, and score feedback -- not a static list of questions.

**Dual-model comparison built in** -- Switch AI providers per function. Run the same document through ZHI 1 and ZHI 2 to compare scholarly depth, tone, and accuracy across models.

**Every output is exportable** -- Copy to clipboard, download as TXT, save as Word (.docx), or generate PDF. Nothing is locked inside the app.

**Natural-voice podcast generation** -- SSML scripts produce distinct, natural-sounding voices for multi-speaker dialogues, not robotic monotone narration.

**Contextual chat, not generic chat** -- AI responses focus on the selected text or specific document being viewed, with full awareness of source material and conversation history.

**No watered-down output** -- The platform follows your instructions literally. If you ask for a rewrite at eighth-grade level with vivid examples, that's exactly what you get.`,
    },
  ],
};

appDescriptions["Photo Psychoanalysis"] = {
  emoji: "🧠",
  tagline:
    "Multi-Model AI Platform for Personality, Clinical, and Behavioral Profiling Across Text, Image, Video, and Documents",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `The AI Personality Analysis Platform is a multi-model AI system for evaluating the personality, emotional state, and behavioral fingerprint of any subject -- whether that subject appears as a written passage, a photograph, a video clip, or an uploaded document. It plugs into five top-tier proprietary LLMs (知 1-5) and lets users route any task to the model best suited for it -- facial-expression reading, MBTI typing, clinical screening, evolutionary-niche analysis, stylometric profiling, or full-pipeline deep-dive synthesis.

Unlike consumer chatbots that produce hedged, watered-down personality blurbs, the AI Personality Analysis Platform is built around a strict operating principle: every analysis is evidence-grounded, every verdict is explicit, and the user's framework choice is sacred. If you ask for a 50-question MBTI breakdown, you get 50 questions answered. If you ask for a Dark Tetrad assessment with cluster-by-cluster scoring, that is exactly what is produced. No padding, no preamble, no editorializing.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Psychologists, therapists, and clinical researchers** -- need rigorous multi-framework screening (MMPI, MCMI, DSM-5 SCID, PID-5) for hypothetical case-study work and teaching examples

**Personality theorists and typologists** -- need parallel scoring across MBTI, Big Five, Enneagram, HEXACO, Socionics, Hogan, and DISC on the same subject

**HR, recruiters, and organizational consultants** -- need vocational fit, dark-trait screening, and behavioral-niche analysis (EVO Psych) on candidate writing or video interviews

**Writers, biographers, and journalists** -- need to profile real or fictional subjects with evidence-anchored, citation-style support for every trait inference

**Stylometric and rhetorical analysts** -- need writing-style fingerprints, author matching, and side-by-side comparisons of vertical vs. horizontal worldview

**Anyone** -- who wants a serious, framework-grounded personality read instead of a vague "you seem creative and empathetic" AI summary`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Multi-Modal Analysis** -- Run any framework across text (up to 500,000 characters), images (with face detection + AWS Rekognition + Face++), video (visual + audio + transcript via Whisper), and documents (PDF + DOCX). Uploaded media stays loaded so you can run multiple frameworks on the same subject without re-uploading.

**MBTI Typing** -- Full 16-type analysis across text, image, video, and documents. Returns dominant type, cognitive-function stack, and evidence references for each dichotomy (E/I, S/N, T/F, J/P).

**Big Five (OCEAN)** -- Five-factor scoring with facet-level breakdowns across text, image, and video. Evidence-anchored ratings on Openness, Conscientiousness, Extraversion, Agreeableness, and Neuroticism.

**Enneagram (9-Type)** -- Core type plus wing, instinctual stack, integration/disintegration vectors, and growth path. Available for text, image, and video.

**Dark Traits / Personality Pathology** -- Dark Tetrad (narcissism, Machiavellianism, psychopathy, sadism), Cluster B patterns, and other maladaptive traits inferred from facial expressions, body language, grooming, interpersonal markers, and written tells.

**Personality Structure (8-Framework Synthesis)** -- Comprehensive consolidated analysis synthesizing Big Five/OCEAN, HEXACO, 16PF, MBTI, Keirsey, Socionics, Hogan, and DISC into one unified profile. Text, image, and video.

**Clinical Screening (4-Framework Battery)** -- Hypothetical-case-study analysis combining MMPI-2/MMPI-3, MCMI, DSM-5 SCID, and PID-5. Returns elevated scales, candidate diagnoses, and appropriate clinical disclaimers. Text, image, and video.

**Anxiety / Affective Assessment** -- Full screening across BDI, Hamilton Depression Rating Scale, Beck Anxiety Inventory, GAD-7, and PHQ-9. Text, image, and video.

**EVO Psych (Evolutionary Niche Analysis)** -- Custom 10-pole evolutionary typology scoring 20 benchmarks across Enforcer, Explorer/Scout, Healer/Empath, Strategist/Schemer, Signaler/Performer, Caretaker/Nurturer, Aggressor/Protector, Broker/Diplomat, Seer/Pattern-Interpreter, and Mimic/Adaptor. Includes specialized visual benchmarks for images and temporal-dynamics scoring for video.

**Vertical vs. Horizontal Orientation** -- Bipolar worldview meta-dimension. Vertical captures transcendence, sacred hierarchy, ascent, discipline (Nietzsche, Evola, mystics). Horizontal captures immanence, coalition, solidarity, harm/safety framing (DEI, social justice, therapy-speak). Returns worldview signature, key phrases, and dominant-mode classification.

**Verticality Radar (Stylometric Profiling)** -- Writing-style analysis distinct from worldview. Scores ego-pronoun rate, metaphor density, sentence complexity, hypotaxis vs. parataxis, formality markers, and rhetorical strategies. Returns a verticality quotient (0 = horizontal narrative, 1 = vertical logical). Single-text mode plus two-text comparison mode with side-by-side results and author matching (e.g., "Writes like Voltaire"). Requires minimum 100 words per text.

**Vocational Analysis** -- Career-fit and work-style profiling across text, image, and video.

**Stanford-Binet Intelligence Profile** -- Cognitive-domain analysis across text, image, and video.

**Deep Dive Synthesis** -- 100-question comprehensive text analysis producing an evidence-anchored, citation-style master profile.

**Psychoanalysis** -- Deep psychoanalytic interpretation (text only) with auto-truncation to 2,000 words and full multi-model fallback.

**Facial Detection** -- AWS Rekognition + Face++ integration for ground-truth feature extraction (age, emotion, gender, accessories, head pose) feeding into vision analyses to prevent fabrication.

**Audio Transcription** -- OpenAI Whisper transcribes spoken content in uploaded videos so verbal and non-verbal cues are analyzed together.

**Session Persistence** -- Analyses persist via localStorage and survive page reloads. Messages append rather than clear, enabling continuous analysis series on the same subject across multiple frameworks.

**Email Sharing** -- One-click share of any completed analysis via SendGrid with a stable share link.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It actually grounds every claim** -- Vision analyses receive structured face-detection data and scene context before the LLM is allowed to speak. No fabricated eye color, no hallucinated facial expressions, no invented body language.

**It runs the framework you asked for** -- If you click MBTI, you get a full MBTI assessment, not a generic personality blurb that mentions MBTI in passing. Every framework prompt is comprehensive (50 questions for image/video, 100 for Deep Dive text).

**Five proprietary LLMs, one workflow** -- 知 1 (Anthropic Claude), 知 2 (OpenAI GPT-4o), 知 3 (Venice / Llama 3.3), 知 4 (Perplexity Sonar), 知 5 (Grok-3). Pick the model best suited for each task, or let the automatic fallback chain pick a working model when your first choice is rate-limited, out of credits, or doesn't support the modality.

**Multimodal in the real sense** -- The same subject can be profiled from a photograph, a video, a writing sample, and a PDF -- and the platform keeps your uploaded media loaded so you can run framework after framework without re-uploading.

**Stylometry as a first-class citizen** -- The Verticality Radar treats writing style as a measurable signal separate from content, with author matching, side-by-side comparison mode, and a quantitative verticality quotient.

**Clinical-grade frameworks, responsibly framed** -- The 4-framework Clinical battery (MMPI / MCMI / SCID / PID-5) produces serious assessments for hypothetical case-study and educational use, with appropriate disclaimers built into every output.

**Evolutionary lens out of the box** -- EVO Psych is a custom 10-pole typology not available in any other consumer platform, with both visual benchmarks (for images) and temporal-dynamics scoring (for video).

**Smart defaults, never blocked** -- 知 1 (Claude) is the default model because it's strongest for image work. Long texts are auto-truncated to 2,000 words instead of being rejected. Rate-limited models automatically fall back to the next available model in the chain.

**Session memory that doesn't get in your way** -- Your work survives reloads, accumulates across frameworks, and you can clear and start fresh with one click.`,
    },
  ],
};

appDescriptions["GPTByPass"] = {
  emoji: "🧠",
  tagline:
    "Multi-Provider AI Text Rewriting Platform for Style Mimicking, Detection Evasion, and Surgical Content Control",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `GPT Bypass is a multi-provider AI text rewriting system designed to transform AI-generated content into writing that reads as authentically human. It plugs into four top-tier proprietary LLMs (OpenAI GPT-4o, Anthropic Claude Sonnet 4, DeepSeek, and Perplexity) and lets users route any rewrite task to the model best suited for it -- surgical style mimicking, instruction-driven transformation, intelligent chunking for long documents, or full-pipeline humanization with detection scoring.

Unlike generic paraphrasers that produce watered-down, recognizably synthetic output, GPT Bypass is built around a strict operating principle: every rewrite is faithful to the user's reference style, every instruction is honored literally, and every output is verified against an AI-detection scorer. If you supply a style sample, the output mirrors that sample. If you ask for 40 stacked rewrite instructions, all 40 are applied. No padding, no preamble, no editorializing.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Students and researchers** -- need to humanize AI-assisted drafts so they pass institutional detection tools without losing argumentative substance

**Writers and journalists** -- need to mimic a specific author's voice, tone, or cadence with surgical precision across long-form content

**Content professionals and marketers** -- need to transform machine-generated drafts into copy that reads as authentically human and survives detection screening

**Academics and theorists** -- need formal, analytic prose that preserves logical structure while shedding the telltale rhythms of LLM output

**Editors and ghostwriters** -- need to match a client's existing voice across new material drawn from AI drafts or research notes

**Anyone** -- who wants AI-assisted writing that reads like a real human wrote it, not like a chatbot trying to sound like one`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Multi-Provider Rewriting Engine** -- A unified prompt system routes rewrites across four LLMs (OpenAI GPT-4o, Anthropic Claude Sonnet 4, DeepSeek, Perplexity). Pick the model best suited for the task or switch providers mid-session without losing context.

**Surgical Style Mimicking** -- Upload or paste a reference text and the system extracts its cadence, vocabulary, sentence-length distribution, and rhetorical posture, then rewrites your input to match. Includes a curated library of paradox, epistemology, and content-neutral style samples.

**40+ Instruction Preset Library** -- Categorized rewrite controls covering Advanced Techniques (mixed cadence + clause sprawl, asymmetric emphasis, hedge twice, local disfluency, analogy injection, topic snap, friction detail), Structure & Cadence, Framing & Inference, Voice & Style, and Content Control. Stack as many as you need.

**Combo Presets** -- One-click bundles like "Lean & Sharp" and "Analytic" automatically expand into the right combination of atomic instructions, with no manual tuning required.

**Content Mixing Mode** -- Blend a second source text into the rewrite to fuse two voices, inject reference material, or combine an outline with a style exemplar in a single pass.

**GPTZero Detection Scoring** -- Every input and output is scored by GPTZero for AI-detection probability. See the before/after delta on every rewrite and iterate until the score lands where you want it.

**Intelligent Document Chunking** -- Long documents (>500 words) are automatically segmented with configurable overlap, rewritten chunk by chunk while preserving voice continuity, then reassembled into one cohesive output.

**Multi-Format Document Upload** -- TXT, PDF, and DOC/DOCX files up to 50MB. Binary-safe PDF extraction using pdf-parse with a dedicated memory-storage endpoint -- no corruption, no garbage characters, just clean text.

**Re-Rewrite Loop** -- Take any output, layer additional presets or custom instructions onto it, and rewrite again. Iterate freely until the result matches your target.

**AI Chat Assistant** -- Conversational interface backed by the same multi-provider engine, useful for refining instructions, discussing style choices, or generating new reference samples on the fly.

**Credit-Based Pricing with State Persistence** -- Five Stripe-powered credit tiers ($5 / $10 / $25 / $50 / $100). When credits run out, a paywall reveals a generous preview (35% -- 80% of the output depending on length) and a one-click "Buy Credits" path. Your full rewrite session is preserved through the Stripe checkout flow and restored automatically on return.

**Optional Authentication & Dashboard** -- The site is fully usable as a guest. Logging in unlocks persistent storage of uploaded documents and rewrite jobs, a credit balance, and a dashboard view of every saved material.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It actually follows instructions** -- Stack 40 presets and all 40 are applied. Ask for a specific cadence change and that change happens, not a vague approximation of it.

**It mimics style, not just topic** -- Most paraphrasers preserve meaning and strip voice. GPT Bypass preserves meaning and transfers the cadence, vocabulary, and rhetorical posture of your reference sample onto it.

**It verifies its own output** -- Every rewrite ships with a GPTZero AI-detection score. You see the actual probability the result reads as AI, not a marketing claim about "human-like" output.

**Four proprietary LLMs, one workflow** -- OpenAI, Anthropic, DeepSeek, and Perplexity behind a single unified prompt system. Pick the model best suited for each task, or A/B compare the same rewrite across providers.

**Atomic instruction control** -- 40+ named rewrite presets organized by category (Advanced Techniques, Structure & Cadence, Framing & Inference, Voice & Style, Content Control) give you granular control over exactly which transformations get applied.

**Long-document aware** -- Intelligent chunking with overlap handles full essays, chapters, and reports without losing voice continuity across boundaries. No 500-word ceiling.

**No silent fallbacks** -- If a provider fails, you get a clear error. If credits run out, you get a clearly-marked paywall preview. If a PDF can't parse, you're told. The system is explicit when it fails instead of pretending it succeeded.

**Generous paywall, not a wall** -- Free users get a real preview of every rewrite (up to 80% for short outputs), not a teaser sentence. You see what you're paying for before you pay.

**State survives checkout** -- Click "Buy Credits" mid-session and your input, output, style sample, preset stack, AI scores, and job ID all persist through the Stripe redirect and restore automatically when you return.

**Optional account, no lock-in** -- The full rewrite pipeline works without an account. Logging in is an upgrade (persistent materials, dashboard, credit balance), not a gate.`,
    },
  ],
};

appDescriptions["Intelligence Meter"] = {
  emoji: "🧠",
  tagline:
    "Multi-Model AI Platform for Intelligence Analysis, Cognitive Profiling, and Argument Stress-Testing",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `The Cognitive Analysis Platform is a multi-model AI system for evaluating the intelligence and cognitive fingerprint of any written text. It plugs into six top-tier proprietary LLMs (ZHI 1-6) and lets users route any task to the model best suited for it -- intelligence scoring, formal axiomatization, mathematical proof checking, scientific accuracy auditing, or full-pipeline argument synthesis.

Unlike consumer chatbots that produce generic, hedged, watered-down output, the Cognitive Analysis Platform is built around a strict operating principle: every analysis is rigorous, every verdict is explicit, and the user's instructions are sacred. If you ask for 25 objections, you get 25 objections. If you ask for a refined rewrite that absorbs every counter-argument, that is exactly what is produced. No padding, no preamble, no editorializing.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Academics, graduate students, and researchers** -- need to evaluate the intellectual rigor of papers, dissertations, and arguments before submission or publication

**Philosophers and theorists** -- need formal axiomatization, proof-checking, and conceptual stress-testing of theoretical claims

**Mathematicians** -- need separate evaluation of structural coherence vs. mathematical truth, plus automatic correction of defective proofs

**Lawyers, analysts, and consultants** -- need to anticipate every objection a critic could raise and have a polished, objection-proof final document

**Authors and entrepreneurs** -- need to know whether their ideas survive scrutiny before committing them to print or pitch

**Anyone** -- who wants to know what an actually intelligent reader would think of their writing, instead of a flattering AI summary`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Multi-Model Intelligence Evaluation** -- A 4-phase scoring system evaluates any text across 17 cognitive dimensions (depth, originality, conceptual control, argumentative rigor, semantic density). Genre-aware; compare scores across multiple LLMs side-by-side.

**Full Suite Pipeline** -- One-click execution of the complete analysis chain: 5 batch analyses (+ optional Axiomatic Model) -> BOTTOMLINE synthesis -> 25 Objections with counter-arguments -> Refined Rewrite that absorbs every objection. Download the entire report as one document.

**MAXINTEL Intelligent Rewrite** -- Recursively optimizes text to maximize intelligence scores. Keeps rewriting until cognitive metrics hit your target.

**Conservative Reconstruction** -- Generates the most charitable, coherent version of a text's unified argument, surfacing the strongest reading the author could have intended.

**BOTTOMLINE Synthesis** -- Collapses multiple intermediate analyses into one polished final output tailored to a specific audience, objective, tone, length, and emphasis. Intelligent weighting prioritizes the most relevant intermediate results.

**25 Objections + Counter-Arguments** -- Standalone or pipeline mode. Generates the 25 most likely objections from skeptical readers and crafts a compelling response to each, ordered by likelihood. Tailored to the stated audience.

**Refined Rewrite** -- Takes the BOTTOMLINE and rewrites it in light of all 25 objections, strengthening weak claims and incorporating counter-arguments inline.

**Axiomatic System Transformer** -- Transforms natural language theoretical text into a complete formal axiomatization: primitive terms, axioms, defined terms, an uninterpreted formal calculus, and a semantic model. Never refuses -- always produces output.

**Mathematical Proof System** -- Four distinct modes: COHERENCE (structural quality only), COGENCY (truth + soundness with counterexamples), MAX COHERENCE (improves structure while preserving content), MAXIMIZE TRUTH (corrects defective proofs using extended thinking; if the theorem is false, finds and proves a similar true theorem).

**Scientific-Explanatory Coherence** -- Dual assessment: logical consistency AND scientific accuracy, scored separately. The rewrite mode replaces pseudoscientific claims with accurate explanations.

**Truth Select & Math Truth Select** -- Literal-truth verification modes that ignore rhetorical structure and grade the actual factual or mathematical claims.

**GPT Bypass Humanizer** -- Transforms AI-generated text to evade AI detection tools, with built-in detection integration.

**Coherence Meter** -- Validates logical and semantic coherence across documents up to 5,000 words. Includes specialized modes for mathematical proofs and scientific-explanatory writing.

**AI Chat Assistant** -- Conversational interface backed by the Zhi knowledge database, with persistent history and document context awareness.

**Document Workflow** -- PDF/text upload, OCR (Mathpix), speech-to-text (AssemblyAI), translation, web search, and one-click download of every output as a single document.

**System Diagnostic** -- One-click self-check that verifies all API providers, the database, and the full analysis pipeline are operational. Color-coded pass/warn/fail with downloadable report.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It actually follows instructions** -- The system's job is to do exactly what you said. If you ask for 25 objections, you get 25, not 7.

**It separates structure from truth** -- A well-organized argument for a false claim scores high on coherence and low on cogency. Most AI systems collapse these into one mushy "quality" score; this platform does not.

**It corrects, not just critiques** -- When a proof is defective or a claim is pseudoscientific, the system fixes it. If a theorem is false, it finds and proves a similar true theorem instead.

**Six proprietary LLMs, one workflow** -- ZHI 1 through ZHI 6. Pick the model best suited for each task, or run multiple in parallel and compare. Automatic fallback chain handles rate limits and outages.

**Cognitive scoring built in** -- Every output can be scored across 17 cognitive dimensions, with genre-aware calibration.

**Objection-proof output** -- The Full Suite pipeline doesn't stop at synthesis. It generates the 25 most likely objections, then rewrites the synthesis to absorb every one of them. The final document is something a critic cannot easily dismiss.

**One-click full report** -- After running the Full Suite, every stage (5 batch analyses, optional Axiomatic Model, BOTTOMLINE, 25 Objections, Refined Rewrite) is downloadable as a single timestamped .txt file.`,
    },
  ],
};

appDescriptions["Smart Photo/Video Viewer"] = {
  emoji: "🖼️",
  tagline:
    "High-Performance Photo & Video Viewer with Local AI-Powered Organization",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `Smart Photo Viewer is a privacy-first media viewer for browsing, organizing, and analyzing large photo and video collections directly in your browser. It combines a fast, flexible viewing experience with completely local AI features -- every model runs inside the browser, and no images or data ever leave your device.

Unlike cloud photo apps that upload your library, compress your originals, and lock features behind subscriptions, Smart Photo Viewer is built around a strict operating principle: your media stays yours, photos are never cropped, and every control is visible in the UI rather than hidden behind keyboard shortcuts. Open a folder, scroll through thousands of files smoothly, and use local AI to group by theme or find visually similar images -- all offline, all private.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Photographers and content creators** -- need to triage large shoots quickly without uploading originals to a cloud service

**Videographers and editors** -- need frame-accurate screenshot capture, batch screenshot extraction, and multi-video side-by-side comparison

**Archivists and collectors** -- need to browse massive local libraries without size limits, format conversions, or compression

**Researchers and analysts** -- need to find visually similar items and auto-cluster images by theme across thousands of files

**Privacy-conscious users** -- need a media viewer that never sends a single byte to a server, suitable for any content

**Anyone** -- who is tired of cloud photo apps cropping their pictures, losing originals, or charging monthly fees`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Dynamic Masonry Grid** -- Mouse wheel changes column count on the fly (1 to 20 columns). Photos display at full natural aspect ratio with zero cropping and zero gaps between cells. Lazy batch loading keeps it snappy with thousands of files.

**Multi-Photo Viewing** -- Display up to 8 photos simultaneously in a configurable grid (1, 2, 4, 6, or 8 slots). Pick any image from the library for any slot via thumbnail picker. Mirrors the multi-video workflow.

**Multi-Video Playback** -- Play up to 8 videos at once in a synchronized grid. Independent speed control per slot, full containment with no cropping, perfect for comparison work.

**Filmstrip View** -- Horizontal thumbnail strip with large preview pane, eight thumbnail sizes (80px to 500px), auto-scrolling to keep the current image centered, bright yellow active indicator, and zoom-with-drag-to-pan support.

**Full-Screen Viewer** -- Click left or right third of the image to navigate. Mouse wheel to zoom. Zoom level persists across navigation. Reset button appears when zoomed. Position indicator shows "X / Y" at all times.

**Slideshow Mode** -- Smooth crossfade transitions, four transition types (fade, slide, zoom, none), five transition speeds, configurable interval. Previous/Next/Pause controls always visible. Starts from whatever photo you are currently viewing -- never jumps back to the first one.

**Video Screenshot Capture** -- One-click screenshot of the current video frame, downloaded immediately to your Downloads folder with timestamp in the filename. No dialogs, no folder pickers, no clipboard tricks.

**Batch Screenshot Tool** -- Generate any number of evenly-spaced screenshots across a video (5 to 2000, range scales with video length). Live progress, preview filmstrip, downloads all frames as a single ZIP.

**Group by Theme (Local AI)** -- Auto-clusters your entire library by visual similarity using a CLIP model that runs 100% in the browser. After the first model download, works completely offline.

**Find Similar (Local AI)** -- Right-click any image to instantly surface visually similar items from across your library. Powered by local CLIP embeddings cached in IndexedDB.

**Drag-and-Drop Folder Loading** -- Drop a folder onto the window, or use the file picker (Ctrl+A to select all). Folder picker also supported. Handles thousands of files without crashing.

**Format Support** -- Images: JPG, JPEG, JFIF, PNG, GIF, WebP, BMP, SVG, HEIC, HEIF, AVIF, TIF, TIFF. Videos: MP4, WebM, OGG, MOV, AVI, MKV, M4V, FLV, WMV, 3GP, MPG, MPEG.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**Photos are never cropped** -- Every view uses object-contain with letterboxing. What you shot is what you see, at the exact aspect ratio you shot it. No square crops, no center crops, no thumbnails that lie about composition.

**Every control is visible** -- No hidden keyboard shortcuts you have to memorize. Every feature -- slideshow, multi-photo, screenshots, navigation -- has a clearly labeled button in the UI.

**Slideshow starts where you are** -- Open any photo, hit Slideshow, and it begins right there. The standard "always restart from photo 1" behavior of other viewers is gone.

**100% local AI** -- CLIP runs in WebGL inside your browser via transformers.js. Embeddings are cached in IndexedDB. After the first model download, theme grouping and similarity search work fully offline with zero server calls.

**Privacy by design** -- No accounts, no telemetry, no uploads, no analytics. Safe for any content. The entire app is static files served from your browser.

**No cloud, no compression, no size limit** -- Open a folder with 10,000 photos and they all load. Your originals are read directly from disk via the browser's File API -- never copied, never uploaded, never re-encoded.

**Built for big libraries** -- Lazy batch thumbnail loading, IndexedDB embedding cache, virtualized rendering patterns. Handles thousands of files without freezing the tab.

**One-click ZIP export for batch screenshots** -- Extract 100 evenly-spaced frames from a video and get a single ZIP download. No per-file "Save As" dialogs.

**Multi-everything** -- Up to 8 photos or 8 videos on screen at once, each in its own slot, each independently controllable. Compare shots, sync playback, A/B variants.`,
    },
  ],
};

appDescriptions["Chess Tutor"] = {
  emoji: "♟️",
  tagline:
    "An AI-powered chess training system that plays, evaluates, and teaches in real time",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `CHESS TUTOR is an AI-powered chess training system that plays, evaluates, and teaches in real time. It adapts to each user's skill level, analyzing every move to generate personalized lessons, drills, and strategy insights.

Live now at https://chesstutor.xyz`,
    },
    {
      emoji: "⚙️",
      title: "What CHESS TUTOR Does",
      body: `**Interactive Play Mode** -- Users play directly against the AI, which adjusts difficulty dynamically based on performance.

**Move Evaluation** -- Each move is analyzed for accuracy, positional strength, and tactical awareness, with instant feedback.

**Personalized Lessons** -- Automatically creates targeted lessons and practice drills from the user's gameplay history.

**Strategy Breakdown** -- Explains tactical errors, opening principles, and midgame or endgame strategy in natural language.

**Performance Analytics** -- Tracks rating progression, move quality, and recurring weaknesses to optimize training focus.`,
    },
    {
      emoji: "👥",
      title: "Designed For",
      body: `**Beginners** -- Learn chess fundamentals through guided feedback and hands-on play.

**Intermediate Players** -- Identify strategic blind spots and refine competitive play.

**Advanced Players & Coaches** -- Use AI diagnostics to sharpen technique and create tailored training plans.`,
    },
    {
      emoji: "🚀",
      title: "Core Idea",
      body: `CHESS TUTOR fuses gameplay, instruction, and analysis into one adaptive learning environment. It doesn't just show better moves -- it teaches how to think like a master, one position at a time.`,
    },
  ],
};

appDescriptions["SOXL Options Pro"] = {
  emoji: "📈",
  tagline:
    "Quantitative Analysis, Probability Engine, and AI Strategy Builder for SOXL (3x Semiconductor ETF)",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `The SOXL Analysis Platform is a single-page quantitative research tool for SOXL (Direxion Daily Semiconductor Bull 3X Shares). It combines interactive log-scale charting, historical probability modeling, benchmark-anchored deviation analysis, vol-surface diagnostics, a full call-sleeve backtest engine, and an AI-powered strategy builder driven by Anthropic Claude.

Unlike generic charting dashboards that stop at price plots, this platform is built around an operating principle: every analysis is honest, every metric is auditable, and the engine never refuses to return a result -- even on a two-data-point window. If you ask for a backtest, you get a backtest. If you ask for a probability, you get the actual historical frequency with its sample size attached. No padding, no hand-waving, no synthetic placeholders.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Active traders and SOXL holders** -- need to size positions, time entries, and understand the asymmetric risk profile of a leveraged ETF

**Options traders** -- need realistic premium-based strategy backtests with honest Black-Scholes mark-to-market and roll mechanics

**Quantitative researchers** -- need to test historical mean-reversion, dislocation, and vol-regime hypotheses against real adjusted price data

**Portfolio managers** -- need risk-adjusted metrics (Sharpe, Sortino, Calmar, capital-at-risk) to compare strategies on a level playing field

**Anyone running a semiconductor thesis** -- who wants to know the actual historical probability of a move, not a vibes-based estimate`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Interactive Log-Scale Price Chart** -- Full SOXL price history from 2010 to present, rendered in log scale with x-axis extending 5 years into the future. Click-and-drag trend-line drawing via a custom Streamlit component; lines auto-extend forward (dashed projection) and backward (dashed historical).

**Probability Engine** -- Historical probability of any price move (magnitude x time horizon) computed from a configurable rolling window of actual SOXL returns. "Benchmark History" mode predicts SOXL behavior from the recent 30-day move of a benchmark (QQQ, TLT, XLU, VIX) and its historical analogues. Sample size is always shown -- no probability without its denominator.

**Period Analysis / Backtest** -- Select any window on the chart. "SOXL Patterns" mode uses SOXL's own rolling returns. "Benchmark-Based" mode builds the conditional relationship between a benchmark's 30-day move and SOXL's subsequent return during the selected period, then compares predictions to actual post-period outcomes with the per-horizon analogue count.

**Benchmark Overlays** -- QQQ (orange), TQQQ (purple), TLT (teal), XLU (red), VIX (gold dotted) -- all rendered on the same log-scale y-axis for direct relative-strength reading.

**Short Interest** -- FINRA daily short-volume chart for the last 12 months, fetched in parallel HTTP for fast load.

**Vol Surface (limited)** -- BUY/SELL discrepancy view on the available SOXL options chain, highlighting where market-maker skew suggests directional positioning.

**SOXL-QQQ Dislocation** -- Continuous deviation panel: SOXL_norm - QQQ_norm with rolling baseline, used as the core sizing signal for the allocation engine.

**Strategy Builder (AI)** -- Conversational interface powered by Anthropic Claude via Replit AI Integrations. User describes their portfolio, available cash, and risk tolerance; Claude generates a personalized SOXL entry strategy with a tranched buy ladder, operating rules, and the statistical basis -- rendered as a styled HTML strategy document.

**Backtest -- Allocation Engine (DEFAULT)** -- 20% call-sleeve / 80% cash strategy. Long SOXL calls (default 45-DTE ATM, rolled at 10 DTE) sized continuously by deviation = SOXL_norm - QQQ_norm via a tanh sizing function. Hard floor 2% / hard ceiling 98% inside the sleeve. QQQ bear-regime filter scales sleeve fill (floor still wins). Asymmetric resize: sells down freely (locks in profits / reduces exposure), refills only at roll events -- honors both "continuous rebalancing" and capped premium burn.

**Risk-Adjusted Metrics Panel** -- Every backtest run reports Total Return, CAGR, annualized Volatility, Max Drawdown, Sharpe, Sortino, Calmar, Capital at Risk, and Return per Unit of At-Risk Capital -- for the strategy AND for SOXL B&H and QQQ B&H baselines on the same axis. Capital-efficiency callout compares return-per-at-risk-dollar across all three.

**Custom Strategy Builder** -- Compose your own indicator/operator combinations against the price history, with the same risk-metric output panel as the default engine.

**Always-On Data Layer** -- Equity history up to ~20 years via EODHD, options snapshots and history via Polygon, all responses cached 24h. No external rate-limit surprises during a research session.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It never refuses to compute** -- The allocation engine returns a valid recommendation for any window, including degenerate 1- or 2-bar inputs. The risk-metrics table always renders, with zero-values when the sample is too small to be meaningful, never a "please pick a longer window" dialog.

**Honest options modeling, no fake leverage** -- Calls are priced with plain Black-Scholes using trailing realized vol of SOXL. No vol-surface fitting, no Heston, no IV-smile fairy dust -- and critically, no infinite refill of decaying premium. The asymmetric resize rule (sell down freely, refill only at rolls) cleanly caps loss at the premium paid per cycle, which is the actual behavior of a real long-call sleeve.

**Capital efficiency is a first-class metric** -- Every backtest shows Return per At-Risk Capital, not just total return. The strategy uses 20% of notional at risk vs SOXL B&H's 100%, and the platform reports both raw return AND return-per-risked-dollar so you can see which strategy is actually working harder.

**Drawdown protection is verifiable** -- In a SOXL -70% stress scenario, the default engine demonstrates capital protection in numbers, not in marketing copy. You can re-run the backtest yourself on any window and see the Max DD / Sortino / Calmar gap vs buy-and-hold.

**Probability with sample size** -- Every probability output ships with the count of historical analogues that backs it. A "65% chance of a 10% drop in 30 days" with n=4 is shown as exactly that, so the user can judge the statistical weight before acting.

**No look-ahead leakage** -- The allocation signal is explicitly lagged one bar before being applied to returns. Realized-vol pricing uses only data up to today for today's mark-to-market. The engine is auditable in backtest_engine.py if you want to verify.

**One-click report export** -- After any backtest, download a complete TXT / CSV / Word / PDF report with parameters, methodology, metrics, and date range. Methodology text describes the actual implementation, not a glossy version of it.

**AI strategy builder grounded in real data** -- Claude doesn't generate strategy in a vacuum. The conversation includes the full computed probability tables and recent deviation context, so the generated entry ladder is anchored to actual historical frequencies, not LLM intuition.

**No external billing surprises** -- Anthropic Claude runs via Replit AI Integrations (no API key, uses Replit credits). EODHD + Polygon for data, both cached locally.`,
    },
  ],
};

appDescriptions["SOXL Options Edge"] = {
  emoji: "📈",
  tagline:
    "Multi-Model Quantitative Platform for Options Mispricing Detection, Stochastic Volatility Calibration, and Walk-Forward Backtesting",
  sections: [
    {
      emoji: "🧩",
      title: "Overview",
      body: `SOXL Options Edge is a multi-model quantitative trading platform that identifies mispriced options on the SOXL 3x leveraged semiconductor ETF by comparing live market prices against fair values computed from 13 different stochastic and Lévy pricing models. It plugs into institutional-grade calibration techniques (Carr-Madan FFT, Levenberg-Marquardt least-squares, CIR-MLE, GARCH(1,1), Cholesky-fBM Monte Carlo) and lets users route any analysis to the model best suited for the current regime.

Unlike retail screeners that surface "unusual options activity" without explaining why, SOXL Options Edge is built around a strict operating principle: every signal is grounded in a calibrated model, every fair-value gap is quantified in dollars and percent, and every recommendation is paired with a Monte-Carlo confidence band. If the model says a put is 40% overpriced, the platform shows you the 50,000-path terminal distribution that proves the strikes in question carry no realistic mass -- or flags the result as a model breakdown when they do.`,
    },
    {
      emoji: "👥",
      title: "Who It's For",
      body: `**Quantitative traders and prop-shop researchers** -- need to validate that a model's edge survives walk-forward backtesting before allocating capital, and want rolling-Sharpe regime detection across multiple competing pricers

**Options market makers and vol arbitrageurs** -- need real-time mispricing surfaces with per-strike confidence bands to identify which contracts are genuinely off-fair vs. simply stale data

**Academic researchers in financial mathematics** -- need a working laboratory for comparing Heston, Bates, SVJJ, CGMY, NIG, SABR, Rough Heston, and other stochastic/Lévy models on the same data with identical calibration protocols

**Risk managers running 3x leveraged ETF books** -- need tail-floor-enforced fair values that don't understate crash-insurance premium on far-OTM puts

**Retail traders graduating from naive directional bets** -- want to know whether the put they're about to sell is statistically rich or whether they're picking up nickels in front of a steamroller

**Anyone** -- who wants to know what an actually calibrated, model-aware fair value looks like, instead of a Black-Scholes mid with the implied vol the broker quoted back to them`,
    },
    {
      emoji: "⚙️",
      title: "Core Capabilities",
      body: `**Multi-Model Pricing Engine** -- 13 stochastic and Lévy models share a single Pricer interface (Heston, Bates, SVJJ, Merton, Kou, Variance Gamma, CGMY, NIG, SABR, Double Heston, Rough Heston, BS-Realized-Vol, BS-GARCH 30d Forecast). Switch models live from the sidebar; each has its own cache so previously-fit models load instantly.

**Dual Calibration Pipeline** -- Every pricer calibrates twice: once to 2 years of historical SOXL returns (cached weekly per ISO-week + model) for a "what the world has been doing" baseline, and once to the live options chain via Levenberg-Marquardt least-squares on observed mid prices (cached every 10 minutes). The gap between historical and market-implied parameters surfaces as the Parameter Gap dashboard.

**Three Interactive 3-D Surfaces** -- Market implied volatility, model fair-value implied volatility, and per-option mispricing all rendered as full strike x expiration Plotly surfaces. Color-clipped at +/-200% so the colorbar stays readable while raw Z-values are preserved for far-OTM crash-insurance regions.

**Mean-Reversion Disequilibrium Overlay** -- A 200-day moving-average z-score with OLS-fit reversion speed (λ) is layered on top of every model's drift, so fair values automatically tilt toward mean reversion when SOXL is stretched. The same overlay flows into the Monte-Carlo confidence bands.

**Monte-Carlo Confidence-Band Signals** -- Every top-mispriced option gets a 5,000-path simulation of its terminal payoff distribution. Signals are labeled BUY / SELL / WATCH based on where the live market price sits within the model's 90% confidence band. Antithetic variates halve variance at no computational cost.

**Robinhood-Style Featured Picks** -- The page leads with "FEATURED CALL TO BUY" and "FEATURED PUT TO SELL" cards whose strikes are overlaid as dashed lines on a SOXL price chart with timeframe buttons (1D / 1W / 1M / 3M / YTD / 1Y / 5Y / MAX) and a log/linear toggle. The featured picks are guaranteed to match the top row of the underlying signal tables.

**Pricing Diagnostics Panel** -- A built-in self-test that runs three sanity checks: put-call parity per expiration, Black-Scholes comparison at realized vol and ATM market IV, and a 50k-path terminal-distribution histogram with top-overpriced-put strikes marked. Catches engine bugs and model breakdowns before they show up as bad trades.

**Walk-Forward Backtest Module** -- Four-tab backtesting suite that replays any strategy point-in-time using Polygon historical option chains. Each backtest day re-calibrates models from the available history (no look-ahead bias), pulls that day's chain via Polygon as_of, scores edges, and trades through a full Portfolio / Order / Position harness with configurable slippage, equal-weight sizing, and mark-to-market via VWAP or model fallback.

**Model Comparison Tab** -- Multiselect over all 13 pricers; runs the App-mispricing strategy with each chosen model on the same window and renders equity overlays, a Sharpe-sorted summary table, rolling 90 / 180 / 365-day Sharpe charts for regime-shift detection, a "Best Model by Window" month-end leaderboard with cumulative win-counts, and a 🎯 Current Recommendation panel pinned at the top showing the trailing-90-day Sharpe winner with runner-up and verdict label.

**Verdict Banner** -- Every backtest result is interpreted with a Sharpe-based verdict: EXCEPTIONAL (>2.0), STRONG (>=1.5), DECENT (>=1.0), MARGINAL (>=0.5), NO MEANINGFUL EDGE (>=0.0), or LOSING STRATEGY (<0). Comparator lines for Buy-and-Hold SOXL and Black-Scholes-Edge are appended automatically with a paired t-test of daily returns.

**Natural-Language Strategy Builder** -- Describe a strategy in plain English ("Every Monday, sell a 30-delta SOXL put expiring Friday, hold to expiration, 1% of capital") and the platform uses Anthropic Claude Sonnet 4.5 to convert it into a structured JSON spec. Ambiguous fields surface as clarification questions before save. Strategies persist to disk with full CRUD (run / duplicate / delete).

**Tail-Floor Calibration** -- After fitting historical Heston-family params, an iterative bumper simulates 180-day terminal prices and adjusts xi (x1.25) and rho (-0.10) up to 8 times until the 5th-percentile drawdown is at least 35% -- appropriate for a 3x leveraged ETF. Prevents understating put fair values during low-vol regimes.`,
    },
    {
      emoji: "🚀",
      title: "What Makes It Different",
      body: `**It actually calibrates** -- Every pricer's parameters are fit from data twice per session -- once from history, once from the live chain. The platform doesn't ask you to type in a volatility number and trust it. Most retail tools collapse this into a single "IV" field; this one shows you both, side by side, and flags the gap.

**It separates structure from truth** -- A signal can be statistically large without being meaningful. The platform reports raw edge percentages uncapped (some far-OTM puts genuinely look 500% overpriced because the model can't generate the crash scenarios needed to justify them) and then asks the diagnostics panel to prove the model is or isn't missing tail mass at those strikes. Two separate questions, two separate answers.

**It corrects, not just critiques** -- When the put-call parity test detects a model bug, the platform raises a warning banner. When the terminal-distribution histogram shows no mass at the strikes of the top over-puts, the platform surfaces it as a model-breakdown diagnostic. When historical and market parameters diverge sharply, the Parameter Gap dashboard explains what the market is pricing in that history isn't.

**Thirteen models, one interface** -- Pick the model best suited for the current question: Heston for vanilla SV, Bates/SVJJ for jump risk, Kou or Merton for crash-insurance pricing, VG/CGMY/NIG when you suspect non-Gaussian tails, SABR for smile-dynamics-driven strategies, Double Heston for two-factor variance, Rough Heston when realized vol is path-dependent, or the BS-Realized/BS-GARCH baselines when you want a flat-vol reference. Automatic cache reuse and parallel calibration keep switching cheap.

**Walk-forward, not curve-fit** -- The backtest harness re-calibrates models from data available as of each backtest day. There is no look-ahead bias by construction. The Model Comparison tab makes it trivial to verify that whichever model "wins" your in-sample Sharpe race also wins your out-of-sample one.

**Statistical scoring built in** -- Every signal carries a Monte-Carlo confidence band (5,000 paths, antithetic variates). Every backtest carries a Sharpe verdict, a paired t-test vs. Buy-and-Hold, and rolling-Sharpe charts that show whether the edge is persistent or a single-window fluke.

**Regime-aware recommendations** -- The 🎯 Current Recommendation panel doesn't just tell you which model had the best full-window Sharpe; it tells you which one is winning right now, in the trailing 90 trading days, and how many of the last N months it has been the leader. Switch the model in the sidebar accordingly.

**Honest about data limits** -- The platform tells you exactly what Polygon's basic plan can and can't deliver (delayed last_trade prints, no NBBO quotes), filters out stale prints via no-arbitrage intrinsic checks, and labels residual noisy edges on illiquid strikes as a data limitation rather than a model bug. No silent fallbacks.

**One-click full diagnostic** -- The Pricing Diagnostics expander runs three independent sanity checks on the active model in a single click. Color-coded pass/warn/fail surfaces engine bugs and model breakdowns before they cost real money.`,
    },
  ],
};

appDescriptions["Model Builder"] = appDescriptions["ModelWiz"];

export default function Home() {
  const livingBooksByKuczynski = [
    { title: "AI AND PHILOSOPHY", url: "https://aiandphilosophy.com" },
    { title: "AI LOGIC", url: "https://ailogic101.xyz" },
    { title: "ANALYTIC PHILOSOPHY (COMPLETE)", url: "https://analyticphilosophy.xyz" },
    { title: "CAUSATION", url: "https://causality101.xyz" },
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
      { title: "Classic EZ Reader", url: "https://classicezreader.com" },
      { title: "EZ Story", url: "https://ezstory.xyz", videoUrl: "https://www.youtube.com/watch?v=sRaZtSnkybM" },
      { title: "NeuroText", url: "https://neurotext.uk" }
    ],
    "🎓 Education & Learning": [
      { title: "Chess Tutor", url: "https://chesstutor.xyz" },
      { title: "EZ Homework", url: "https://ezhw.xyz" },
      { title: "EZGrader", url: "https://ezgrader.ai", videoUrl: "/videos/ezgrader-tutorial.mp4" }
    ],
    "🧠 Intelligence & Psychology": [
      { title: "Ask A Philosopher", url: "https://analyticphilosophy.net" },
      { title: "Freud GPT", url: "https://freudgpt.me" },
      { title: "Major Brain", url: "https://majorbrain.xyz" },
      { title: "Model Builder", url: "https://modelwiz.xyz" },
      { title: "Originality Meter", url: "https://originalitymeter.com", videoUrl: "https://www.youtube.com/watch?v=lRdczUD_0PE" },
      { title: "Intelligence Meter", url: "https://intelligencemeter.biz" },
      { title: "Mind Profiler", url: "https://mindprofiler.xyz/", videoUrl: "/videos/mind-profiler-tutorial.mp4" },
      { title: "Text Evaluator", url: "https://textevaluator.xyz" },
      { title: "Text IQ", url: "https://textiq.xyz/", videoUrl: "/videos/text-iq-tutorial.mp4" },
      { title: "Improve Your Writing", url: "https://improveyourwriting.xyz" },
      { title: "Cognitive Enhancer", url: "https://cognitiveenhancer.xyz" },
      { title: "Psychology Pro", url: "https://psychologypro.xyz", videoUrl: "https://www.youtube.com/watch?v=0hIA4NsETZw" },
      { title: "Text Genius", url: "https://textgenius.xyz", videoUrl: "https://www.youtube.com/watch?v=w2bgAo4nf64" },
      { title: "ModelWiz", url: "https://modelwiz.xyz" },
      { title: "Model Transformer", url: "https://modeltransformer.xyz/", videoUrl: "https://www.youtube.com/watch?v=EubJaYvDbpg" },
      { title: "LLM Plus", url: "https://llmplus.xyz/", videoUrl: "https://youtu.be/MreIR_4VH-M" }
    ],
    "📸 Visual & Multimedia": [
      { title: "Frame Shot", url: "https://frameshot.xyz" },
      { title: "Graphic Novel Creator", url: "https://graphicnovelcreator.xyz" },
      { title: "OCR Pro", url: "https://ocrpro.xyz" },
      { title: "Photo Psychoanalysis", url: "https://photopsychoanalysis.xyz" },
      { title: "Smart Photo/Video Viewer", url: "https://smartphotoviewer.xyz" }
    ],
    "🎧 Audio & Interactive Media": [
      { title: "Audio Transcriber", url: "https://audiotranscriber.xyz" },
      { title: "Podcast Creator", url: "https://ezpodcast.xyz" }
    ],
    "⚙️ Utility & Conversion": [
      { title: "Goal Tracker", url: "https://smartgoaltracker.xyz" },
      { title: "GPTByPass", url: "https://gptbypass.xyz", videoUrl: "https://www.youtube.com/watch?v=PR0JX_Hrgqc" },
      { title: "HTML Converter", url: "https://htmlconverter.xyz" },
      { title: "PDF Shrinker", url: "https://shrinkpdf.xyz" }
    ],
    "💹 Finance": [
      { title: "Forex Edge", url: "https://usdhkd.xyz" },
      { title: "SOXL Options Pro", url: "https://soxlpro.xyz", videoUrl: "https://youtube.com/watch?v=TXgcuKomlrs" },
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


