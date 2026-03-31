import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary to-tertiary">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">PromptX</span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              href="/browse"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Browse
            </Link>
            <Link
              href="/categories"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/creators"
              className="text-sm text-foreground hover:text-primary transition-colors"
            >
              Creators
            </Link>
          </div>

          {/* Search Bar */}
          <div className="hidden lg:flex flex-1 max-w-md relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search prompts..."
              className="pl-10 bg-card border-border/50 focus:border-primary transition-colors"
            />
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Button asChild variant="ghost" className="hidden sm:flex">
              <Link href="/auth">Login</Link>
            </Button>
            <Button asChild className="bg-gradient-to-r from-primary to-tertiary hover:opacity-90 transition-opacity">
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
