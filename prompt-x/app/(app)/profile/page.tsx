"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bookmark,
  CheckCircle2,
  ChevronRight,
  Compass,
  Heart,
  Mail,
  ShieldCheck,
  Sparkles,
  Star,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { Navbar } from "@/app/modules/components/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getStoredPromptLikes,
  getStoredSavedPrompts,
  prompts,
  type Prompt,
} from "@/lib/prompts";

type StoredUser = {
  id: string;
  name: string;
  email: string;
  role: string;
};

type ActivityItem = {
  icon: typeof Bookmark;
  label: string;
  value: string;
  tone: string;
};

function getStoredUser() {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const raw = window.localStorage.getItem("promptx.user");
    return raw ? (JSON.parse(raw) as StoredUser) : null;
  } catch {
    return null;
  }
}

function formatCategoryMix(items: Prompt[]) {
  const counts = items.reduce<Record<string, number>>((acc, prompt) => {
    acc[prompt.category] = (acc[prompt.category] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(counts)
    .sort((left, right) => right[1] - left[1])
    .slice(0, 3)
    .map(([category, count]) => `${category} ${count}`)
    .join(" • ");
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<StoredUser | null>(null);
  const [savedPrompts, setSavedPrompts] = useState<Prompt[]>([]);
  const [likedPrompts, setLikedPrompts] = useState<Prompt[]>([]);

  useEffect(() => {
    const storedUser = getStoredUser();

    if (!storedUser) {
      router.push("/auth");
      return;
    }

    const savedMap = getStoredSavedPrompts();
    const likedMap = getStoredPromptLikes();

    setUser(storedUser);
    setSavedPrompts(
      prompts.filter((prompt) => savedMap[prompt.slug]).slice(0, 6)
    );
    setLikedPrompts(
      prompts.filter((prompt) => likedMap[prompt.slug]).slice(0, 6)
    );
  }, [router]);

  const initials = useMemo(() => {
    if (!user?.name) {
      return "PX";
    }

    return user.name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user]);

  const profileMetrics = useMemo(() => {
    const totalSaved = savedPrompts.length;
    const totalLiked = likedPrompts.length;
    const premiumSaved = savedPrompts.filter(
      (prompt) => prompt.access === "premium"
    ).length;
    const averageSavedRating = totalSaved
      ? (
          savedPrompts.reduce((sum, prompt) => sum + prompt.rating, 0) / totalSaved
        ).toFixed(1)
      : "0.0";

    return [
      {
        label: "Saved Prompts",
        value: totalSaved.toString().padStart(2, "0"),
        hint: totalSaved
          ? formatCategoryMix(savedPrompts)
          : "Build a shortlist for later",
        icon: Bookmark,
      },
      {
        label: "Liked Prompts",
        value: totalLiked.toString().padStart(2, "0"),
        hint: totalLiked
          ? formatCategoryMix(likedPrompts)
          : "Like prompts you want to track",
        icon: Heart,
      },
      {
        label: "Premium Picks",
        value: premiumSaved.toString().padStart(2, "0"),
        hint: premiumSaved
          ? "Strong premium prompts in your shortlist"
          : "No premium saves yet",
        icon: Sparkles,
      },
      {
        label: "Average Rating",
        value: averageSavedRating,
        hint: "Across your currently saved prompts",
        icon: Star,
      },
    ];
  }, [likedPrompts, savedPrompts]);

  const activityFeed = useMemo<ActivityItem[]>(() => {
    const items: ActivityItem[] = [];

    if (savedPrompts[0]) {
      items.push({
        icon: Bookmark,
        label: "Latest save",
        value: savedPrompts[0].title,
        tone: "text-emerald-300",
      });
    }

    if (likedPrompts[0]) {
      items.push({
        icon: Heart,
        label: "Latest like",
        value: likedPrompts[0].title,
        tone: "text-rose-300",
      });
    }

    items.push({
      icon: ShieldCheck,
      label: "Account status",
      value: "Secure and active",
      tone: "text-sky-300",
    });

    return items;
  }, [likedPrompts, savedPrompts]);

  if (!user) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 pt-24 pb-16">
        <section className="relative mb-8 overflow-hidden rounded-[2rem] border border-border/50 bg-card/50 p-6 shadow-[0_0_50px_rgba(99,102,241,0.12)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(244,114,182,0.18),transparent_28%),radial-gradient(circle_at_left,rgba(99,102,241,0.22),transparent_35%)]" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <Avatar className="h-20 w-20 border border-white/10 shadow-[0_10px_30px_rgba(99,102,241,0.25)]">
                  <AvatarFallback className="bg-primary/20 text-2xl font-semibold text-primary">
                    {initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <Badge className="border-primary/30 bg-primary/15 text-primary">
                      Workspace Profile
                    </Badge>
                    <Badge variant="outline" className="gap-2">
                      <ShieldCheck className="h-3.5 w-3.5" />
                      {user.role}
                    </Badge>
                  </div>
                  <h1 className="text-3xl font-semibold tracking-tight lg:text-4xl">
                    {user.name}
                  </h1>
                  <p className="mt-1 max-w-2xl text-sm text-muted-foreground lg:text-base">
                    Your PromptX workspace for saved prompts, engagement activity,
                    and account settings.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 py-2">
                  <Mail className="h-4 w-4" />
                  {user.email}
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 py-2">
                  <Compass className="h-4 w-4" />
                  Marketplace member
                </span>
                <span className="flex items-center gap-2 rounded-full border border-border/50 bg-background/40 px-3 py-2">
                  <CheckCircle2 className="h-4 w-4 text-emerald-300" />
                  Personal workspace active
                </span>
              </div>
            </div>

            <div className="grid w-full gap-3 sm:grid-cols-2 lg:w-[28rem]">
              <Button asChild className="h-11 justify-between bg-gradient-to-r from-primary to-tertiary px-4">
                <Link href="/browse">
                  Browse Marketplace
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-11 justify-between px-4">
                <Link href="mailto:support@promptx.local">
                  Contact Support
                  <Mail className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section className="mb-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {profileMetrics.map((metric) => {
            const Icon = metric.icon;

            return (
              <Card key={metric.label} className="border-border/50 bg-card/40">
                <CardContent className="p-5">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {metric.label}
                    </span>
                    <div className="rounded-xl border border-border/50 bg-background/60 p-2">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-3xl font-semibold tracking-tight">
                    {metric.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {metric.hint}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </section>

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            <Card className="border-border/50 bg-card/40">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle>Saved Prompts</CardTitle>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Your short list for prompts worth revisiting.
                  </p>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href="/browse">Explore More</Link>
                </Button>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {savedPrompts.length ? (
                  savedPrompts.map((prompt) => (
                    <Link
                      key={prompt.slug}
                      href={`/browse/${prompt.slug}`}
                      className="group rounded-2xl border border-border/50 bg-background/50 p-4 transition-colors hover:border-primary/40 hover:bg-background/70"
                    >
                      <div className="mb-3 flex items-center justify-between gap-3">
                        <Badge variant="outline">{prompt.category}</Badge>
                        <span className="text-xs text-muted-foreground">
                          {prompt.access === "premium" ? "Premium" : "Free"}
                        </span>
                      </div>
                      <h3 className="line-clamp-2 font-medium transition-colors group-hover:text-primary">
                        {prompt.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {prompt.description}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
                          {prompt.rating}
                        </span>
                        <span className="flex items-center gap-1">
                          <TrendingUp className="h-3.5 w-3.5" />
                          {prompt.sales}
                        </span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-border/60 bg-background/30 p-6 md:col-span-2">
                    <p className="text-sm font-medium">No saved prompts yet</p>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Save prompts from the browse feed to build your working shortlist.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/40">
              <CardHeader>
                <CardTitle>Engagement Snapshot</CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  A quick view of what you are actively engaging with.
                </p>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Top liked category</p>
                  <p className="mt-2 text-lg font-semibold">
                    {likedPrompts.length ? likedPrompts[0].category : "No likes yet"}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Highest rated save</p>
                  <p className="mt-2 text-lg font-semibold">
                    {savedPrompts.length
                      ? `${Math.max(...savedPrompts.map((prompt) => prompt.rating)).toFixed(1)}`
                      : "0.0"}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Workspace focus</p>
                  <p className="mt-2 text-lg font-semibold">
                    {savedPrompts.length
                      ? savedPrompts[0].category
                      : "Start browsing"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50 bg-card/40">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Full name</p>
                  <p className="mt-1 font-medium">{user.name}</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Email address</p>
                  <p className="mt-1 font-medium">{user.email}</p>
                </div>
                <div className="rounded-2xl border border-border/50 bg-background/50 p-4">
                  <p className="text-sm text-muted-foreground">Workspace role</p>
                  <p className="mt-1 font-medium capitalize">{user.role}</p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/40">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {activityFeed.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="flex items-start gap-3 rounded-2xl border border-border/50 bg-background/50 p-4"
                    >
                      <div className="rounded-xl border border-border/50 bg-background/70 p-2">
                        <Icon className={`h-4 w-4 ${item.tone}`} />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="mt-1 font-medium">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/40">
              <CardHeader>
                <CardTitle>Workspace Health</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="h-4 w-4 text-emerald-300" />
                    <span className="text-sm">Authentication session</span>
                  </div>
                  <Badge className="bg-emerald-500/15 text-emerald-300">
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between rounded-2xl border border-border/50 bg-background/50 p-4">
                  <div className="flex items-center gap-3">
                    <UserRound className="h-4 w-4 text-sky-300" />
                    <span className="text-sm">Profile visibility</span>
                  </div>
                  <Badge variant="outline">Private</Badge>
                </div>
                <div className="rounded-2xl border border-dashed border-border/60 bg-background/30 p-4">
                  <p className="text-sm font-medium">Profile completeness</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Core account details are set up. Next, keep saving and liking prompts
                    to personalize your workspace.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
