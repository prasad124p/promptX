"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Flame, Heart, Star, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  calculatePromptEngagement,
  isPromptLiked,
  isPromptSaved,
  toggleStoredPromptLike,
  toggleStoredPromptSave,
  type Prompt,
} from "@/lib/prompts";

type PromptCardProps = {
  prompt: Prompt;
  accessLabel?: string;
  accessTone?: "free" | "premium";
  ctaLabel?: string;
  className?: string;
  showExcerpt?: boolean;
  onLikeChange?: (slug: string, liked: boolean) => void;
  onSaveChange?: (slug: string, saved: boolean) => void;
};

export function PromptCard({
  prompt,
  accessLabel,
  accessTone = "free",
  ctaLabel = "Open Prompt",
  className,
  showExcerpt = false,
  onLikeChange,
  onSaveChange,
}: PromptCardProps) {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likes, setLikes] = useState(prompt.likes);

  useEffect(() => {
    const storedLiked = isPromptLiked(prompt.slug);
    setLiked(storedLiked);
    setSaved(isPromptSaved(prompt.slug));
    setLikes(prompt.likes + (storedLiked ? 1 : 0));
  }, [prompt.likes, prompt.slug]);

  function handleToggleLike() {
    const nextLiked = toggleStoredPromptLike(prompt.slug);
    setLiked(nextLiked);
    setLikes((current) => current + (nextLiked ? 1 : -1));
    onLikeChange?.(prompt.slug, nextLiked);
  }

  function handleToggleSave() {
    const nextSaved = toggleStoredPromptSave(prompt.slug);
    setSaved(nextSaved);
    onSaveChange?.(prompt.slug, nextSaved);
  }

  return (
    <Card className={`flex h-full flex-col ${className ?? ""}`}>
      <CardHeader className="space-y-2 p-3 pb-1.5 lg:p-3 lg:pb-1.5">
        <div className="flex items-start justify-between gap-3">
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {prompt.category}
          </Badge>
          {accessLabel ? (
            <Badge
              variant="outline"
              className={
                accessTone === "premium"
                  ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
                  : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
              }
            >
              {accessLabel}
            </Badge>
          ) : null}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">{prompt.rating}</span>
          </div>
        </div>
        <CardTitle
          className="min-h-[2.6rem] text-lg leading-5 lg:min-h-[2.6rem] lg:text-[1.05rem]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {prompt.title}
        </CardTitle>
        <CardDescription
          className="min-h-[2.35rem] text-xs leading-4.5"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {prompt.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-2 p-3 pt-0 lg:p-3 lg:pt-0">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <TrendingUp className="h-3.5 w-3.5" />
          <span>{prompt.sales} sales</span>
        </div>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Heart className={`h-3.5 w-3.5 ${liked ? "fill-current text-primary" : ""}`} />
            {likes} likes
          </span>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3.5 w-3.5" />
            {Math.round(
              calculatePromptEngagement({
                ...prompt,
                likes,
              })
            )}{" "}
            engagement
          </span>
        </div>

        {showExcerpt ? (
          <p
            className="min-h-[2.2rem] text-xs leading-4.5 text-muted-foreground"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {prompt.excerpt}
          </p>
        ) : (
          <p
            className="min-h-5 text-xs text-muted-foreground"
            style={{
              display: "-webkit-box",
              WebkitLineClamp: 1,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            by {prompt.creator}
          </p>
        )}

        <div className="mt-auto flex flex-wrap gap-1.5 pt-0.5">
          <Button
            variant={liked ? "default" : "outline"}
            size="icon-sm"
            onClick={handleToggleLike}
            className="h-8 w-8 px-0"
            aria-label={liked ? "Unlike prompt" : "Like prompt"}
          >
            <Heart className={liked ? "fill-current" : ""} />
          </Button>
          <Button
            variant={saved ? "secondary" : "outline"}
            size="sm"
            onClick={handleToggleSave}
            className="h-8 px-2.5 text-xs"
          >
            <Bookmark className={saved ? "fill-current" : ""} />
            {saved ? "Saved" : "Save"}
          </Button>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-3 pt-0 lg:p-3 lg:pt-0">
        <span className="text-[11px] text-muted-foreground sm:text-xs">
          {saved ? "Saved for later" : prompt.access === "premium" ? "Premium access" : "Free access"}
        </span>
        <Button
          asChild
          className="h-8 bg-gradient-to-r from-primary to-tertiary px-2.5 text-xs hover:opacity-90"
        >
          <Link href={`/browse/${prompt.slug}`}>{ctaLabel}</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
