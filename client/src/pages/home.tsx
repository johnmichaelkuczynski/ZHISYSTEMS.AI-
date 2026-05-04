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

  const courses = [
    { title: "Critical Thinking", url: "https://criticalthinking101.xyz/" },
    { title: "Philosophy 101", url: "https://philosophy101.xyz" }
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
      { title: "Super Cognitive Profiler", url: "https://supercognitiveprofiler.com" },
      { title: "Semantic Skeletonizer", url: "https://semskel.xyz" },
      { title: "Text Genius", url: "https://textgenius.xyz" },
      { title: "ModelWiz", url: "https://modelwiz.xyz" },
      { title: "Model Transformer", url: "https://modeltransformer.xyz/" }
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
      { title: "Forex Edge", url: "https://usdhkd.xyz" },
      { title: "GPTByPass", url: "https://gptbypass.xyz", videoUrl: "https://www.youtube.com/watch?v=PR0JX_Hrgqc" },
      { title: "HTML Converter", url: "https://htmlconverter.xyz" },
      { title: "PDF Shrinker", url: "https://shrinkpdf.xyz" },
      { title: "SOXL Options Edge", url: "https://soxledge.xyz" },
      { title: "SOXL Pro", url: "https://soxlpro.xyz" }
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

        {/* Living Courses Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 border-b border-gray-200 pb-2">
            Living Courses
          </h2>
          
          {/* What's a Living Course explanation */}
          <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-700 text-sm leading-relaxed">
              <strong>What's a Living Course?</strong> A fully AI-powered educational experience with a built-in tutor that is trained on the course material. 
              The AI can answer questions at any level of depth about the course content, provide personalized explanations, generate practice problems, 
              and adapt to your learning style and pace.
            </p>
          </div>
          
          <div className="grid gap-3">
            {courses.map((course) => (
              <BookItem key={course.title} title={course.title} url={course.url} />
            ))}
          </div>
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


