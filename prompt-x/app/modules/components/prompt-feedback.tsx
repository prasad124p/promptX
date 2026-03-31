"use client";

import { useEffect, useState } from "react";
import { Heart, MessageSquare } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  isPromptLiked,
  toggleStoredPromptLike,
  type PromptComment,
} from "@/lib/prompts";

type PromptFeedbackProps = {
  promptSlug: string;
  initialLikes: number;
  initialComments: PromptComment[];
};

export function PromptFeedback({
  promptSlug,
  initialLikes,
  initialComments,
}: PromptFeedbackProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);
  const [draftComment, setDraftComment] = useState("");
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const storedLiked = isPromptLiked(promptSlug);
    setLiked(storedLiked);
    setLikes(initialLikes + (storedLiked ? 1 : 0));
  }, [initialLikes, promptSlug]);

  function handleToggleLike() {
    const nextLiked = toggleStoredPromptLike(promptSlug);
    setLiked(nextLiked);
    setLikes((count) => count + (nextLiked ? 1 : -1));
  }

  function handleAddComment() {
    const message = draftComment.trim();

    if (!message) {
      return;
    }

    setComments((current) => [
      {
        id: Date.now(),
        author: "You",
        message,
        createdLabel: "Just now",
      },
      ...current,
    ]);
    setDraftComment("");
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
                {comments.length} comments
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
          <label className="block text-sm font-medium">Leave a comment</label>
          <textarea
            value={draftComment}
            onChange={(event) => setDraftComment(event.target.value)}
            placeholder="What worked well? What would you improve?"
            className="min-h-28 w-full rounded-xl border border-border/50 bg-background/70 px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
          />
          <div className="flex justify-end">
            <Button type="button" onClick={handleAddComment}>
              Add Comment
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-border/50 bg-card/40">
        <CardHeader>
          <CardTitle>Community Comments</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {comments.map((comment) => (
            <div
              key={comment.id}
              className="rounded-2xl border border-border/50 bg-background/60 p-4"
            >
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="font-medium">{comment.author}</p>
                <span className="text-xs text-muted-foreground">
                  {comment.createdLabel}
                </span>
              </div>
              <p className="text-sm leading-6 text-muted-foreground">
                {comment.message}
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
