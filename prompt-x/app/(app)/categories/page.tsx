import { Navbar } from "@/app/modules/components/navbar";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sparkles,
  Paintbrush,
  Code2,
  Megaphone,
  Video,
  Music,
  BookOpen,
  Zap,
} from "lucide-react";

export default function BrowserPage() {
  const categories = [
    {
      id: 1,
      name: "Writing",
      icon: Sparkles,
      description:
        "Content creation, copywriting, and creative writing prompts",
      promptCount: 2456,
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      name: "Design",
      icon: Paintbrush,
      description: "Logo design, UI/UX, and creative design assistance",
      promptCount: 1834,
      color: "from-pink-500 to-rose-500",
    },
    {
      id: 3,
      name: "Coding",
      icon: Code2,
      description: "Programming, debugging, and code optimization",
      promptCount: 1567,
      color: "from-green-500 to-emerald-500",
    },
    {
      id: 4,
      name: "Marketing",
      icon: Megaphone,
      description: "Social media, email campaigns, and marketing strategies",
      promptCount: 2103,
      color: "from-purple-500 to-violet-500",
    },
    {
      id: 5,
      name: "Video Editing",
      icon: Video,
      description: "Video scripts, editing guides, and production tips",
      promptCount: 892,
      color: "from-orange-500 to-amber-500",
    },
    {
      id: 6,
      name: "Music",
      icon: Music,
      description: "Lyrics, composition ideas, and music production",
      promptCount: 645,
      color: "from-indigo-500 to-blue-500",
    },
    {
      id: 7,
      name: "Education",
      icon: BookOpen,
      description: "Teaching materials, lesson plans, and study guides",
      promptCount: 1234,
      color: "from-teal-500 to-cyan-500",
    },
    {
      id: 8,
      name: "Productivity",
      icon: Zap,
      description: "Task automation, workflow optimization, and efficiency",
      promptCount: 987,
      color: "from-yellow-500 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="mb-12 animate-fade-in text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Explore Categories
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Browse through our diverse collection of AI prompt categories and
            find the perfect prompts for your needs
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.id}
                className="card-glow-accent hover:scale-105 transition-all duration-300 border-border/50 cursor-pointer group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${category.color} p-4 mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-full h-full text-white" />
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    {category.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {category.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    {category.promptCount.toLocaleString()} prompts
                  </Badge>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center card-glow p-12 rounded-2xl">
          <h2 className="text-3xl font-bold mb-4 gradient-text">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Submit a request for a new category or create your own prompts to
            share with the community
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button asChild className="px-6 py-3 bg-gradient-to-r from-primary to-tertiary hover:opacity-90 transition-opacity">
              <Link href="/auth">Request Category</Link>
            </Button>
            <Button asChild variant="secondary" className="px-6 py-3">
              <Link href="/signup">Become a Creator</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
