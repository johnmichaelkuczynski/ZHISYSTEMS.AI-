import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toRomanNumeral, formatJournalUrl } from "@/lib/journal-utils";
import type { JournalIssue } from "@shared/schema";

export default function JournalPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  const { data: issues, isLoading, error } = useQuery<JournalIssue[]>({
    queryKey: activeSearch 
      ? [`/api/journal/search?keyword=${encodeURIComponent(activeSearch)}`] 
      : ["/api/journal"],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center">Loading journal issues...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="text-center text-red-600">Error loading journal issues</div>
        </div>
      </div>
    );
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveSearch(searchQuery.trim());
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setActiveSearch("");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block" data-testid="link-back-home">
            ← Back to Zhi Systems
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Investor Notes
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            Insights and analysis from the Zhi Systems team
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by keyword (e.g., philosophy, Hegel, psychology)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-10"
                data-testid="input-search"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  data-testid="button-clear-input"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            <Button type="submit" disabled={!searchQuery.trim()} data-testid="button-search">
              Search
            </Button>
          </form>

          {/* Active Search Indicator */}
          {activeSearch && (
            <div className="mt-4 flex items-center gap-2 text-sm">
              <span className="text-gray-600">
                Showing results for: <strong className="text-gray-900">{activeSearch}</strong>
              </span>
              <button
                onClick={clearSearch}
                className="text-blue-600 hover:text-blue-800 underline"
                data-testid="button-clear-search"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {!issues || issues.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg" data-testid="text-no-results">
              {activeSearch 
                ? `No journal issues found matching "${activeSearch}".` 
                : "No journal issues published yet."}
            </p>
            {activeSearch && (
              <Button onClick={clearSearch} className="mt-4" data-testid="button-try-another-search">
                Try another search
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h2 className="text-2xl font-semibold text-gray-900">
                {activeSearch ? `Search Results (${issues.length})` : "All Issues"}
              </h2>
              {activeSearch && (
                <span className="text-sm text-gray-500">
                  {issues.length} {issues.length === 1 ? 'result' : 'results'} found
                </span>
              )}
            </div>
            
            <div className="space-y-6">
              {issues.map((issue) => (
                <article 
                  key={issue.id} 
                  className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  data-testid={`article-issue-${issue.volume}-${issue.issue}`}
                >
                  <div className="mb-3">
                    <span className="text-sm font-medium text-gray-500" data-testid={`text-volume-${issue.volume}-${issue.issue}`}>
                      Vol. {toRomanNumeral(issue.volume)}, No. {issue.issue} ({issue.year})
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-semibold text-gray-900 mb-3" data-testid={`text-title-${issue.volume}-${issue.issue}`}>
                    {issue.title}
                  </h3>
                  
                  <div className="text-gray-600 mb-4 line-clamp-3">
                    {issue.body
                      .replace(/^# .*$/gm, '')
                      .replace(/\*\*(.*?)\*\*/g, '$1')
                      .replace(/\*(.*?)\*/g, '$1')
                      .substring(0, 200)}...
                  </div>
                  
                  <Link 
                    href={formatJournalUrl(issue.volume, issue.issue)}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                    data-testid={`link-read-issue-${issue.volume}-${issue.issue}`}
                  >
                    Read full issue →
                  </Link>
                </article>
              ))}
            </div>
          </div>
        )}
        
        {/* Admin Link */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link 
            href="/journal/admin"
            className="text-sm text-gray-500 hover:text-gray-700"
          >
            Admin Panel
          </Link>
        </div>
      </div>
    </div>
  );
}