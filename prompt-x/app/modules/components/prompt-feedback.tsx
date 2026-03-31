"use client";

import { useEffect, useState } from "react";
import { Heart, MessageSquare, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { apiFetch, ApiError } from "@/lib/api";
import {
  isPromptLiked,
  toggleStoredPromptLike,
} from "@/lib/prompts";
import type { MarketplacePrompt, MarketplaceReview } from "@/lib/types";

type PromptFeedbackProps = {
  promptId?: string;
  promptSlug: string;
  initialLikes: number;
  initialLiked?: boolean;
  initialComments: MarketplaceReview[];
};

export function PromptFeedback({
  promptId,
  promptSlug,
  initialLikes,
  initialLiked = false,
  initialComments,
}: PromptFeedbackProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [liked, setLiked] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  useEffect(() => {
    if (promptId) {
      const storedLiked = isPromptLiked(promptSlug);
      setLiked(initialLiked || storedLiked);
      setLikes(initialLikes + (storedLiked ? 1 : 0));
      setComments(initialComments);
      return;
    }

    const storedLiked = isPromptLiked(promptSlug);
    setLiked(storedLiked);
    setLikes(initialLikes + (storedLiked ? 1 : 0));
    setComments(initialComments);
  }, [initialComments, initialLiked, initialLikes, promptId, promptSlug]);

  async function handleToggleLike() {
    if (promptId) {
      try {
        const nextLiked = !liked;
        await apiFetch<{ prompt: MarketplacePrompt }>(
          `/prompts/${promptId}/like`,
          { method: nextLiked ? "POST" : "DELETE" }
        );
        if (isPromptLiked(promptSlug) !== nextLiked) {
          toggleStoredPromptLike(promptSlug);
        }
        setLiked(nextLiked);
        setLikes((count) => count + (nextLiked ? 1 : -1));
        setActionMessage("");
      } catch (error) {
        const nextLiked = toggleStoredPromptLike(promptSlug);
        setLiked(nextLiked);
        setLikes((count) => count + (nextLiked ? 1 : -1));
        setActionMessage(
          error instanceof ApiError && error.statusCode === 401
            ? "Saved locally. Sign in to sync likes."
            : "Saved locally while the server is unavailable."
        );
      }
      return;
    }

    const nextLiked = toggleStoredPromptLike(promptSlug);
    setLiked(nextLiked);
    setLikes((count) => count + (nextLiked ? 1 : -1));
  }

  return (
    <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
      <Card className="border-border/50 bg-card/40">
        <CardHeader className="gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <CardTitle>Prompt Feedback</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="gap-2">
                <Heart className="h-3.5 w-3.5" />
                {likes} likes
              </Badge>
              <Badge variant="outline" className="gap-2">
                <MessageSquare className="h-3.5 w-3.5" />
                {comments.length} reviews
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              type="button"
              variant={liked ? "default" : "outline"}
              onClick={handleToggleLike}
            >
              <Heart className={liked ? "fill-current" : ""} />
              {liked ? "Liked" : "Like Prompt"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground">
            Reviews are now loaded from the backend. Review submission UI can be
            added on top of this data flow next.
          </p>
          {actionMessage ? (
            <p className="text-sm text-amber-300">{actionMessage}</p>
          ) : null}
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/40">
        <CardHeader>
          <CardTitle>Community Reviews</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.length ? comments.map((comment) => (
            <div
              key={comment._id}
              className="rounded-2xl border border-border/50 bg-background/60 p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{comment.user?.name || "Anonymous"}</p>
                  <div className="mt-1 flex items-center gap-1 text-xs text-yellow-300">
                    <Star className="h-3 w-3 fill-current" />
                    {comment.rating}
                  </div>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {comment.comment || "No written review provided."}
              </p>
            </div>
          )) : (
            <p className="text-sm text-muted-foreground">
              No reviews yet. This prompt is still building social proof.
            </p>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
