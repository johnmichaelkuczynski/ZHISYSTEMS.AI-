import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { OfficeDocument } from "@shared/schema";

export default function OfficeUse() {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const { data: docs, isLoading } = useQuery<OfficeDocument[]>({
    queryKey: ["/api/office"],
  });

  const resetForm = () => {
    setTitle("");
    setBody("");
    setEditingId(null);
    setShowForm(false);
  };

  const createMutation = useMutation({
    mutationFn: async (payload: { title: string; body: string }) =>
      apiRequest("POST", "/api/office", payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/office"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: { id: string; title: string; body: string }) =>
      apiRequest("PUT", `/api/office/${payload.id}`, {
        title: payload.title,
        body: payload.body,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/office"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => apiRequest("DELETE", `/api/office/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/office"] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !body.trim()) return;
    if (editingId) {
      updateMutation.mutate({ id: editingId, title: title.trim(), body: body.trim() });
    } else {
      createMutation.mutate({ title: title.trim(), body: body.trim() });
    }
  };

  const startEdit = (doc: OfficeDocument) => {
    setEditingId(doc.id);
    setTitle(doc.title);
    setBody(doc.body);
    setShowForm(true);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <Link href="/" className="text-blue-600 hover:text-blue-800 mb-4 inline-block">
            ← Back to Zhi Systems
          </Link>
          <h1 className="text-4xl font-bold mb-2">Office Use</h1>
          <p className="text-lg text-gray-700">
            Short documents articulating ideas and business concepts.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6 flex justify-end">
          {!showForm && (
            <Button onClick={() => setShowForm(true)} data-testid="button-new-doc">
              + New Document
            </Button>
          )}
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="mb-8 p-6 border border-gray-200 rounded-lg bg-gray-50 space-y-4"
          >
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Document" : "New Document"}
            </h2>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              data-testid="input-title"
            />
            <Textarea
              placeholder="Body (paragraphs separated by blank lines)"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              rows={14}
              required
              data-testid="input-body"
            />
            <div className="flex gap-2">
              <Button
                type="submit"
                disabled={createMutation.isPending || updateMutation.isPending}
                data-testid="button-save"
              >
                {createMutation.isPending || updateMutation.isPending
                  ? "Saving..."
                  : editingId
                    ? "Update"
                    : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>
                Cancel
              </Button>
            </div>
          </form>
        )}

        {isLoading ? (
          <div className="text-center text-gray-600">Loading...</div>
        ) : !docs || docs.length === 0 ? (
          <div className="text-center text-gray-600 py-12">
            No documents yet. Click "New Document" to add one.
          </div>
        ) : (
          <div className="space-y-4">
            {docs.map((doc) => {
              const isOpen = expandedId === doc.id;
              return (
                <article
                  key={doc.id}
                  className="border border-gray-200 rounded-lg p-6 bg-white"
                  data-testid={`doc-${doc.id}`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {doc.title}
                    </h2>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => setExpandedId(isOpen ? null : doc.id)}
                      >
                        {isOpen ? "Collapse" : "Read"}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => startEdit(doc)}>
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-red-600 hover:text-red-700"
                        onClick={() => {
                          if (confirm("Delete this document?")) {
                            deleteMutation.mutate(doc.id);
                          }
                        }}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500 mb-3">
                    {new Date(doc.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  {isOpen && (
                    <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
                      {doc.body}
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
