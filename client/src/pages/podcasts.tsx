import { Link } from "wouter";
import { ArrowLeft, Play, Calendar, Clock } from "lucide-react";

interface Podcast {
  id: string;
  title: string;
  description: string;
  audioUrl?: string;
  duration?: string;
  publishedDate: string;
  topics: string[];
}

const podcasts: Podcast[] = [
  {
    id: "there-is-no-ai-bubble",
    title: "There Is No AI Bubble",
    description: "An AI-generated economic and technology analysis examining the so-called AI bubble, arguing that current AI valuations reflect temporal inflation rather than technological fraud. The real risk isn't overhype but underestimating institutional resistance to AI adoption.",
    audioUrl: "/audio/there-is-no-ai-bubble.mp3",
    publishedDate: "2025-10-15",
    topics: ["AI", "Economics", "Technology", "Market Analysis", "Innovation", "Institutional Change"]
  },
  {
    id: "skepticism-broken-engineering",
    title: "Philosophical Skepticism as Broken Epistemic Engineering",
    description: "An AI-generated philosophical analysis examining how philosophy's methodological commitment to skepticism represents not intellectual rigor but a crippled form of engineering practiced in the absence of real epistemic engines, and how AI enables the shift from refutation to genuine construction.",
    audioUrl: "/audio/skepticism-broken-engineering.mp3",
    publishedDate: "2025-10-01",
    topics: ["Philosophy", "Epistemology", "AI", "Engineering", "Skepticism", "Methodology"]
  },
  {
    id: "manospherism-male-feminization",
    title: "Manospherism as Male-Feminization",
    description: "An AI-generated political analysis examining how online manosphere discourse embodies the very feminine traits it claims to reject, revealing that grievance-based rhetoric represents dependency rather than masculine action.",
    audioUrl: "/audio/manospherism-male-feminization.mp3",
    publishedDate: "2025-09-29",
    topics: ["Political Analysis", "Masculinity", "Gender Studies", "Online Culture", "Manosphere", "Social Psychology"]
  },
  {
    id: "trauma-liberal-credential",
    title: "Trauma as Liberal Credential",
    description: "An AI-generated political analysis examining how traumatic experiences reinforce rather than weaken liberal ideological commitments, arguing that suffering functions as social capital and professional credential within progressive institutional networks.",
    audioUrl: "/audio/trauma-liberal-credential.mp3",
    publishedDate: "2025-09-29",
    topics: ["Political Analysis", "Feminism", "Liberalism", "Trauma", "Ideology", "Social Capital"]
  },
  {
    id: "feminist-liberalism-cunning",
    title: "Feminist Liberalism as Long-Term Cunning",
    description: "An AI-generated political analysis exploring how youthful liberal ideology in women functions as strategic career infrastructure rather than frivolous idealism, examining the calculated investment in ideological capital that outlasts beauty.",
    audioUrl: "/audio/feminist-liberalism-cunning.mp3",
    publishedDate: "2025-09-29",
    topics: ["Political Analysis", "Feminism", "Liberalism", "Strategy", "Career", "Social Psychology"]
  },
  {
    id: "ocd-philosophy",
    title: "OCD & Philosophy",
    description: "An AI-generated philosophical exploration examining the intersection of obsessive-compulsive disorder and philosophical inquiry, exploring the nature of certainty, doubt, and compulsive thinking patterns.",
    audioUrl: "/audio/ocd-philosophy.mp3",
    publishedDate: "2025-09-22",
    topics: ["Philosophy", "Psychology", "Mental Health", "OCD", "Epistemology", "Philosophy of Mind"]
  },
  {
    id: "mellor-on-causation",
    title: "Mellor on Causation",
    description: "An AI-generated philosophical analysis examining D.H. Mellor's influential theories on causation, temporal order, and the block universe view of spacetime.",
    audioUrl: "/audio/mellor-on-causation.mp3",
    publishedDate: "2025-09-08",
    topics: ["Philosophy", "Metaphysics", "Causation", "Time", "D. H. Mellor", "Philosophy of Science"]
  },
  {
    id: "refuting-libertarian-economic-sophism",
    title: "Refuting a Libertarian Economic Sophism",
    description: "An AI-generated economic and political analysis examining and refuting common libertarian economic fallacies, particularly those related to wage policy and market fundamentalism.",
    audioUrl: "/audio/refuting-libertarian-economic-sophism.mp3",
    publishedDate: "2025-09-08",
    topics: ["Economics", "Political Philosophy", "Libertarianism", "Economic Policy", "Labor Economics"]
  },
  {
    id: "mctaggart-refuted",
    title: "McTaggart Refuted",
    description: "An AI-generated philosophical analysis examining and refuting J.M.E. McTaggart's arguments against the reality of time, exploring the flaws in his idealist metaphysics and defending temporal realism.",
    audioUrl: "/audio/mctaggart-refuted.mp3",
    publishedDate: "2025-09-08",
    topics: ["Philosophy", "Metaphysics", "Time", "Idealism", "McTaggart"]
  },
  {
    id: "optimal-number-truth-values",
    title: "On the Optimal Number of Truth Values",
    description: "An AI-generated philosophical exploration examining the foundational question of how many truth values logical systems should employ, analyzing classical bivalent logic against multi-valued alternatives.",
    audioUrl: "/audio/truth-values.mp3",
    publishedDate: "2025-09-01",
    duration: "38:20",
    topics: ["Philosophy", "Logic", "Truth Values", "Mathematical Logic", "Epistemology"]
  },
  {
    id: "incompleteness-of-logic",
    title: "The Incompleteness of Logic",
    description: "An AI-generated exploration of Gödel's incompleteness theorems and their profound implications for mathematics, logic, and the foundations of knowledge.",
    audioUrl: "/audio/incompleteness-of-logic.mp3",
    publishedDate: "2025-08-21",
    duration: "42:15",
    topics: ["Mathematics", "Logic", "Philosophy", "Gödel", "Foundational Theory"]
  },
  {
    id: "veblen-utility-functions",
    title: "Veblen Utility Functions",
    description: "An AI-generated exploration of Thorstein Veblen's economic theories and their application to modern utility functions in economic analysis.",
    audioUrl: "/audio/veblen-utility-functions.mp3",
    publishedDate: "2025-08-15",
    duration: "35:45",
    topics: ["Economics", "Philosophy", "Social Theory", "Veblen"]
  },
  {
    id: "borderline-personality-disorder",
    title: "Borderline Personality Disorder",
    description: "An AI-generated deep dive into understanding Borderline Personality Disorder, its symptoms, causes, and treatment approaches.",
    audioUrl: "/audio/bpd-podcast.mp3",
    publishedDate: "2025-08-10",
    duration: "25:30",
    topics: ["Psychology", "Mental Health", "Personality Disorders"]
  },
  {
    id: "tarski-world-problem",
    title: "The Tarski's World Problem",
    description: "An AI-generated exploration of Tarski's World as a paradigmatic failure in educational technology, examining how it illuminates broader problems with symbolic logic and contemporary philosophical pedagogy.",
    audioUrl: "/audio/TARSKI_1754677257767.mp3",
    publishedDate: "2025-08-08",
    duration: "28:45",
    topics: ["Educational Technology", "Logic", "Philosophy of Education", "Pedagogy", "Symbolic Logic"]
  }
];

export default function Podcasts() {
  return (
    <div className="font-sans bg-white text-gray-900 leading-relaxed min-h-screen">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center gap-4 mb-4">
            <Link href="/">
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </button>
            </Link>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Investor Briefings
          </h1>
          <p className="text-lg text-gray-700">
            AI-Generated Audio Content
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 p-6 bg-green-50 rounded-lg border border-green-200">
          <h2 className="text-xl font-semibold text-green-800 mb-3">About Our AI-Generated Podcasts</h2>
          <p className="text-green-700 leading-relaxed">
            These podcasts are entirely generated by Zhi Systems AI applications. From script writing to voice synthesis, 
            our AI creates engaging, informative audio content on various topics. Each podcast demonstrates the power of 
            fully automated content creation, showcasing advanced AI capabilities in research, writing, and audio production.
          </p>
        </div>

        {/* Podcasts List */}
        <div className="space-y-6">
          {podcasts.map((podcast) => (
            <div key={podcast.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {podcast.title}
                  </h3>
                  <p className="text-gray-600 mb-3">
                    {podcast.description}
                  </p>
                  
                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {podcast.topics.map((topic) => (
                      <span key={topic} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                        {topic}
                      </span>
                    ))}
                  </div>
                  
                  {/* Metadata */}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(podcast.publishedDate).toLocaleDateString()}
                    </div>
                    {podcast.duration && (
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {podcast.duration}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Play Button */}
                <div className="flex flex-col items-center gap-2 ml-4">
                  {podcast.audioUrl ? (
                    <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                      <Play className="w-4 h-4" />
                      Play
                    </button>
                  ) : (
                    <span className="text-sm text-gray-500 italic">Audio Coming Soon</span>
                  )}
                </div>
              </div>
              
              {/* Audio Player */}
              {podcast.audioUrl && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <audio controls className="w-full">
                    <source src={podcast.audioUrl} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 text-center p-8 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">More Podcasts Coming Soon</h3>
          <p className="text-gray-600">
            We're continuously generating new AI-powered podcast content. Check back regularly for fresh episodes 
            covering philosophy, psychology, technology, and more.
          </p>
        </div>
      </div>
    </div>
  );
}