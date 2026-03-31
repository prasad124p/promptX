"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/app/modules/components/navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PromptCard } from "@/app/modules/components/prompt-card";
import {
  categories,
  freePrompts,
  hydratePromptLikes,
  rankPromptsByEngagement,
  type Prompt,
} from "@/lib/prompts";

export default function BrowserPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [rankedPrompts, setRankedPrompts] = useState<Prompt[]>(() =>
    rankPromptsByEngagement(freePrompts)
  );

  useEffect(() => {
    setRankedPrompts(rankPromptsByEngagement(hydratePromptLikes(freePrompts)));
  }, []);

  const filteredPrompts =
    selectedCategory === "All"
      ? rankedPrompts
      : rankedPrompts.filter((prompt) => prompt.category === selectedCategory);

  function handleLikeChange(slug: string, liked: boolean) {
    setRankedPrompts((current) =>
      rankPromptsByEngagement(
        current.map((prompt) =>
          prompt.slug === slug
            ? {
                ...prompt,
                likes: Math.max(0, prompt.likes + (liked ? 1 : -1)),
              }
            : prompt
        )
      )
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-3 pt-16 pb-8">
        {/* Header */}
        <div className="mb-5 animate-fade-in">
          <h1 className="mb-2 text-3xl font-bold gradient-text md:text-4xl">
            Browse Prompts
          </h1>
          <p className="max-w-3xl text-sm text-muted-foreground md:text-base">
            Explore free prompts first. The feed is ranked by live engagement so the hottest prompts rise to the top.
          </p>
        </div>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              size="sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Prompts Grid */}
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filteredPrompts.map((prompt, index) => (
            <div
              key={prompt.id}
              className="h-full"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <PromptCard
                prompt={prompt}
                accessLabel="Free"
                accessTone="free"
                className="card-glow h-full border-border/50 transition-all duration-300 hover:-translate-y-1"
                onLikeChange={handleLikeChange}
              />
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-start gap-4 rounded-2xl border border-border/50 bg-card/40 p-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-lg font-semibold">Want the paid collection?</p>
            <p className="text-sm text-muted-foreground">
              Paid prompts are separated from the default feed and reserved for the top 1% premium set.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/browse/premium">Browse Premium Prompts</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
