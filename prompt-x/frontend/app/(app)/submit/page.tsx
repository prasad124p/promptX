"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { Navbar } from "@/app/modules/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiFetch, ApiError } from "@/lib/api";
import { getStoredUser } from "@/lib/session";
import type { PromptResponse } from "@/lib/types";

const categoryOptions = [
  "Writing",
  "Coding",
  "Marketing",
  "Design",
  "Productivity",
  "Education",
  "Video Editing",
  "Music",
];

export default function SubmitPromptPage() {
  const router = useRouter();
  const user = useMemo(() => getStoredUser(), []);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [form, setForm] = useState({
    title: "",
    category: "Writing",
    description: "",
    content: "",
    tags: "",
  });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!user) {
      router.push("/auth");
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMessage("");
      setSuccessMessage("");

      const response = await apiFetch<PromptResponse>("/prompts", {
        method: "POST",
        body: JSON.stringify({
          title: form.title,
          category: form.category,
          description: form.description,
          content: form.content,
          tags: form.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter(Boolean),
        }),
      });

      setSuccessMessage(
        "Prompt submitted. Evaluation and ranking have started in the background."
      );
      router.push(`/browse/${response.prompt.slug}`);
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof ApiError
          ? error.message
          : "Unable to submit your prompt right now."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto max-w-4xl px-4 pb-16 pt-24">
        <div className="mb-8">
          <Badge className="mb-4 border-primary/30 bg-primary/15 text-primary">
            Prompt Submission
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight">Submit a prompt to the live marketplace.</h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            New prompts are stored immediately, queued for evaluation, then fed into the ranking system.
          </p>
        </div>

        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle>Create Prompt</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium">Title</label>
                <input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, title: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-border/50 bg-background/60 px-4 py-3 outline-none transition-colors focus:border-primary"
                  placeholder="e.g. Senior engineer code review prompt"
                  minLength={5}
                  maxLength={160}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Category</label>
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, category: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-border/50 bg-background/60 px-4 py-3 outline-none transition-colors focus:border-primary"
                >
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Description</label>
                <textarea
                  value={form.description}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      description: event.target.value,
                    }))
                  }
                  className="min-h-28 w-full rounded-2xl border border-border/50 bg-background/60 px-4 py-3 outline-none transition-colors focus:border-primary"
                  placeholder="Describe what the prompt helps the user do."
                  minLength={20}
                  maxLength={1000}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Prompt Content</label>
                <textarea
                  value={form.content}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, content: event.target.value }))
                  }
                  className="min-h-56 w-full rounded-2xl border border-border/50 bg-background/60 px-4 py-3 outline-none transition-colors focus:border-primary"
                  placeholder="Write the prompt exactly as you want it evaluated and ranked."
                  minLength={20}
                  maxLength={10000}
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Tags</label>
                <input
                  value={form.tags}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, tags: event.target.value }))
                  }
                  className="w-full rounded-2xl border border-border/50 bg-background/60 px-4 py-3 outline-none transition-colors focus:border-primary"
                  placeholder="seo, content, strategy"
                />
                <p className="mt-2 text-sm text-muted-foreground">
                  Comma-separated tags help recommendation and category matching.
                </p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-background/40 p-4 text-sm text-muted-foreground">
                <div className="mb-2 flex items-center gap-2 font-medium text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  What happens after submit
                </div>
                Your prompt is saved first, then queued for AI evaluation. Its engagement and evaluation data feed the ranking engine automatically.
              </div>

              {errorMessage ? (
                <div className="rounded-2xl border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                  {errorMessage}
                </div>
              ) : null}

              {successMessage ? (
                <div className="rounded-2xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-sm text-emerald-300">
                  {successMessage}
                </div>
              ) : null}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-primary to-tertiary hover:opacity-90"
              >
                {isSubmitting ? "Submitting..." : "Submit Prompt"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
