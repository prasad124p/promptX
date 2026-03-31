import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/app/modules/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, TrendingUp } from "lucide-react";
import { PromptCard } from "@/app/modules/components/prompt-card";
import { PromptFeedback } from "@/app/modules/components/prompt-feedback";
import { getPromptBySlug, getRelatedPrompts } from "@/lib/prompts";

type PromptPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function PromptPage({ params }: PromptPageProps) {
  const { slug } = await params;
  const prompt = getPromptBySlug(slug);

  if (!prompt) {
    notFound();
  }

  const relatedPrompts = getRelatedPrompts(prompt);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pb-16 pt-24">
        <section className="mb-10 rounded-3xl border border-border/50 bg-card/40 p-8">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <Badge className="bg-primary/20 text-primary border-primary/30">
              {prompt.category}
            </Badge>
            <Badge
              variant="outline"
              className={
                prompt.access === "premium"
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              }
            >
              {prompt.access === "premium" ? "Top 1% Premium" : "Free Prompt"}
            </Badge>
          </div>

          <h1 className="mb-3 text-4xl font-bold gradient-text">{prompt.title}</h1>
          <p className="max-w-3xl text-lg text-muted-foreground">{prompt.description}</p>

          <div className="mt-6 flex flex-wrap gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{prompt.rating} rating</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              <span>{prompt.sales} opens</span>
            </div>
            <span>By {prompt.creator}</span>
          </div>

          <div className="mt-8 rounded-2xl border border-border/50 bg-background/70 p-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Prompt Preview
            </p>
            <p className="text-base leading-7 text-foreground">{prompt.excerpt}</p>
          </div>
        </section>

        <PromptFeedback
          promptSlug={prompt.slug}
          initialLikes={prompt.likes}
          initialComments={prompt.comments}
        />

        <section className="mb-10">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold">More Free Prompts</h2>
              <p className="text-sm text-muted-foreground">
                Free prompts always appear first below the prompt you opened.
              </p>
            </div>
            <Button asChild variant="outline">
              <Link href="/browse/premium">Go To Paid Prompts</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {relatedPrompts.map((relatedPrompt) => (
              <PromptCard
                key={relatedPrompt.id}
                prompt={relatedPrompt}
                accessLabel="Free"
                accessTone="free"
                className="border-border/50 bg-card/40"
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
