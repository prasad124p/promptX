import { Star, Users, Package, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Navbar } from "@/app/modules/components/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { prompts } from "@/lib/prompts";

export default function BrowserPage() {
     const creatorStats = [
    { label: "Total Sales", value: "₹45,250", icon: TrendingUp },
    { label: "Active Prompts", value: "24", icon: Package },
    { label: "Followers", value: "1,234", icon: Users },
    { label: "Avg Rating", value: "4.8", icon: Star }
  ];

  const creatorPrompts = prompts.slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Creator Profile Header */}
        <div className="mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
            <Avatar className="w-24 h-24 border-4 border-primary/20">
              <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-primary to-tertiary text-white">
                SJ
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2 gradient-text">Sarah Johnson</h1>
              <p className="text-lg text-muted-foreground mb-4">
                Professional AI Prompt Engineer | Specializing in Marketing & Content Creation
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/20 text-primary border-primary/30">Top Creator</Badge>
                <Badge className="bg-accent/20 text-accent border-accent/30">Verified</Badge>
              </div>
            </div>
            <Button asChild className="bg-gradient-to-r from-primary to-tertiary hover:opacity-90">
              <Link href="/auth">Follow</Link>
            </Button>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {creatorStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index} 
                  className="card-glow text-center"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <Icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                    <p className="text-3xl font-bold mb-1 gradient-text">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Creator's Prompts */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Published Prompts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {creatorPrompts.map((prompt, index) => (
              <Card 
                key={prompt.id}
                className="card-glow hover:scale-105 transition-all duration-300 border-border/50"
                style={{ animationDelay: `${(index + 4) * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
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
                      {prompt.access === "premium" ? "Premium" : "Free"}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">{prompt.rating}</span>
                  </div>
                  <CardTitle className="text-xl">{prompt.title}</CardTitle>
                  <CardDescription>{prompt.sales} sales</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    {prompt.access === "premium" ? "Premium collection" : "Free to open"}
                  </span>
                  <Button asChild variant="outline">
                    <Link href={`/browse/${prompt.slug}`}>View</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
