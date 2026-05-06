import { Link } from "wouter";

interface Course {
  title: string;
  url: string;
}

export default function Courses() {
  const courses: Course[] = [
    { title: "Philosophy 101", url: "https://aiphil1.xyz" },
    { title: "Psychology 101", url: "https://psych1.xyz" },
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
              <div
                key={course.title}
                className="flex flex-col sm:flex-row sm:items-start gap-2"
                data-testid={`course-${course.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-full sm:w-80">
                  <span className="font-medium text-gray-900">
                    {course.title}
                  </span>
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
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
