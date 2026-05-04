import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface App {
  title: string;
  url: string;
  videoUrl?: string;
  description?: string;
}

const appDescriptions: Record<string, string> = {
  "NeuroText": `## What NEUROTEXT Is
NEUROTEXT is a multi-model AI platform for serious writing, analysis, and document transformation. It plugs into five top-tier proprietary LLMs and lets users route any task to the model best suited for it -- academic writing, deep reasoning, factual research, mathematical proofs, or casual content.

Unlike consumer chatbots that produce generic, hedged, watered-down output, NEUROTEXT is built around a strict operating principle: the user's instructions are sacred. If you say "do not omit a single fact," nothing is omitted. If you say "divide by date," it divides by date. If you say "rewrite all 30,000 words," it rewrites all 30,000 words. No padding, no preamble, no editorializing.

## Who It's For
- Academics, graduate students, and researchers who need to write dissertations, journal articles, and literature reviews where coherence matters across hundreds of pages
- Lawyers and legal professionals who need to organize, restructure, and brief case material without losing a single fact
- Authors, screenwriters, and content creators who need long-form generation with structural integrity
- Analysts and consultants who need to compress, expand, or reformat large documents while preserving every detail
- Anyone who has ever asked an AI for a 5,000-word document and gotten 800 words back

## Core Capabilities
**Multi-Model Intelligence Evaluation.** A 4-phase scoring system evaluates any text across 17 cognitive dimensions -- depth, originality, conceptual control, argumentative rigor, semantic density, and more. Scores are genre-aware. You can compare how the same text scores across multiple proprietary LLMs side-by-side.

**Universal Expansion with Three-Pass Cross-Chunk Coherence.** A document expansion engine that handles inputs up to 100,000 words. It extracts a skeleton, processes constrained chunks, then runs a stitch pass to ensure coherence across the entire document. Hits target word counts precisely.

**Conservative Reconstruction.** Generates coherent, charitable essays that articulate a text's unified argument. Uses outline-first strategy for medium documents and cross-chunk strategy for very long ones. Real-time progress polling.

**Full Suite Pipeline.** One-click execution of three-stage processing: Reconstruction -> 25 Likely Objections -> Objection-Proof Final Version.

**MAXINTEL Intelligent Rewrite.** Recursively optimizes text to maximize intelligence scores. Keeps rewriting until cognitive metrics hit your target.

**GPT Bypass Humanizer.** Transforms AI-generated text to evade AI detection tools, with built-in detection integration.

**Coherence Meter.** Validates logical and semantic coherence across documents up to 5,000 words. Includes specialized modes for mathematical proofs and scientific-explanatory writing.

**Screenplay Generator.** Converts source material -- novels, articles, true stories, ideas -- into properly formatted screenplays.

**Signal Refiner.** Post-processing engine that maximizes signal-to-noise ratio in long generated text. Designed for documents over 10,000 words.

**Dissertation Wizard.** Step-by-step guided dissertation generation with chapter planning, automatic table of contents, and chapter-by-chapter coherence enforcement.

**AI Chat Assistant.** Conversational interface backed by a proprietary knowledge database, with persistent conversation history and document context awareness.

**Multi-Document Library.** Load up to 5 source documents simultaneously and have the AI work across all of them.

**Translation, Web Search, Speech-to-Text, Document Comparison.** Full document workflow tools built in.

## What Makes It Different
1. **It actually follows instructions.** The system's job is to do exactly what you said, no more, no less.
2. **It hits word count targets.** Ask for 50,000 words, get 50,000 words.
3. **It handles long documents intelligently.** Three-pass cross-chunk architecture preserves coherence even at 100,000 words.
4. **Five proprietary LLMs, one workflow.** Pick the model best suited for each task from a single interface.
5. **Cognitive scoring built in.** Every output can be scored across 17 cognitive dimensions.
6. **Comprehensive rewrite detection.** When you say "rewrite all of it," the system sizes the output to match the input automatically.

## Pricing
Token-based credits -- $100 buys 1,000 credits. Provider-specific multipliers reflect the actual cost of each proprietary LLM. Stripe-integrated checkout, real-time balance updates. Freemium tier for casual users, full power unlocked at any credit purchase.`,
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

  const renderDescription = (description: string) => {
    const blocks = description.split(/\n\n+/);
    return (
      <div className="space-y-3 text-gray-700 text-sm leading-relaxed">
        {blocks.map((block, i) => {
          if (block.startsWith("## ")) {
            return (
              <h4 key={i} className="text-base font-semibold text-gray-900 mt-2">
                {block.slice(3)}
              </h4>
            );
          }
          if (block.split("\n").every((line) => line.trim().startsWith("- "))) {
            return (
              <ul key={i} className="list-disc list-inside space-y-1">
                {block.split("\n").map((line, j) => (
                  <li key={j}>{renderInline(line.trim().slice(2))}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i}>{renderInline(block)}</p>
          );
        })}
      </div>
    );
  };

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

  const AppItem = ({ title, url, videoUrl, description }: App) => {
    const [expanded, setExpanded] = useState(false);
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
            className="mt-3 ml-5 p-4 bg-gray-50 border border-gray-200 rounded-md max-w-3xl"
            data-testid={`description-${testId}`}
          >
            {renderDescription(description)}
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
                    description={appDescriptions[app.title]}
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


