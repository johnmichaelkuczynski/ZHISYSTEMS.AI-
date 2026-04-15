import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { formatJournalHeader, parseMarkdown } from "@/lib/journal-utils";
import type { JournalIssue } from "@shared/schema";
import InteractiveJournal from "@/components/InteractiveJournal";

export default function JournalIssuePage() {
  const params = useParams();
  // Extract Roman numeral from vol-i format and convert to number
  const volumeParam = params.volume?.replace('vol-', '');
  const issueParam = params.issue?.replace('no-', '');
  
  // Convert Roman to number using proper algorithm (supports any Roman numeral)
  const romanToNumber = (roman: string): number => {
    const romanValues: { [key: string]: number } = {
      'i': 1, 'v': 5, 'x': 10, 'l': 50, 'c': 100, 'd': 500, 'm': 1000
    };
    const str = roman.toLowerCase();
    let result = 0;
    for (let i = 0; i < str.length; i++) {
      const current = romanValues[str[i]] || 0;
      const next = romanValues[str[i + 1]] || 0;
      if (current < next) {
        result -= current;
      } else {
        result += current;
      }
    }
    return result || parseInt(roman) || 0;
  };
  
  const volume = volumeParam ? romanToNumber(volumeParam) : null;
  const issue = issueParam ? parseInt(issueParam) : null;

  const { data: journalIssue, isLoading, error } = useQuery<JournalIssue>({
    queryKey: ["/api/journal", volume, issue],
    queryFn: async () => {
      const response = await fetch(`/api/journal/${volume}/${issue}`);
      if (!response.ok) {
        throw new Error("Failed to fetch journal issue");
      }
      return response.json();
    },
    enabled: volume !== null && issue !== null,
  });

  if (volume === null || issue === null) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">Invalid journal issue URL</div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Loading journal issue...</div>
        </div>
      </div>
    );
  }

  if (error || !journalIssue) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link href="/journal" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Journal
          </Link>
          <div className="text-center text-red-600">Journal issue not found</div>
        </div>
      </div>
    );
  }

  // Format the publication date
  const publishedDate = new Date(journalIssue.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const formattedHeader = formatJournalHeader(
    journalIssue.volume,
    journalIssue.issue,
    journalIssue.year,
    publishedDate
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-blue-600 hover:text-blue-800">
              Zhi Systems
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/journal" className="text-blue-600 hover:text-blue-800">
              Journal
            </Link>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8 pb-6 border-b border-gray-200">
          <pre className="font-serif text-lg leading-relaxed text-gray-900 whitespace-pre-line">
            {formattedHeader}
          </pre>
          <h1 className="text-3xl font-serif font-bold text-gray-900 mt-6">
            {journalIssue.title}
          </h1>
        </header>

        {/* Interactive Article Body */}
        <div className="prose prose-lg max-w-none">
          <InteractiveJournal 
            content={journalIssue.body}
            issueId={journalIssue.id}
            title={journalIssue.title}
          />
        </div>

        {/* Tags */}
        {journalIssue.tags && journalIssue.tags.length > 0 && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex flex-wrap gap-2">
              {journalIssue.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back Navigation */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <Link 
            href="/journal"
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Journal
          </Link>
        </div>
      </article>
    </div>
  );
}