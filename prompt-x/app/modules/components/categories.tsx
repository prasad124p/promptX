import { Pen, Palette, Code, TrendingUp, Mic, Image, Mail, Video } from "lucide-react";

const categories = [
  {
    icon: Pen,
    name: "Writing",
    count: "2.5K prompts",
    gradient: "from-primary to-tertiary",
  },
  {
    icon: Palette,
    name: "Design",
    count: "1.8K prompts",
    gradient: "from-accent to-tertiary",
  },
  {
    icon: Code,
    name: "Coding",
    count: "3.2K prompts",
    gradient: "from-primary to-accent",
  },
  {
    icon: TrendingUp,
    name: "Marketing",
    count: "1.5K prompts",
    gradient: "from-tertiary to-primary",
  },
  {
    icon: Image,
    name: "Image Gen",
    count: "2.1K prompts",
    gradient: "from-accent to-primary",
  },
  {
    icon: Mic,
    name: "Audio",
    count: "800 prompts",
    gradient: "from-primary to-tertiary",
  },
  {
    icon: Mail,
    name: "Email",
    count: "1.2K prompts",
    gradient: "from-tertiary to-accent",
  },
  {
    icon: Video,
    name: "Video",
    count: "950 prompts",
    gradient: "from-primary to-accent",
  },
];

export const Categories = () => {
  return (
    <section id="categories" className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Browse by <span className="gradient-text">Category</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore thousands of prompts across different categories and find the perfect one for your needs
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <button
                key={index}
                className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/20 text-left"
              >
                <div className="space-y-4">
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${category.gradient} bg-opacity-10`}>
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">{category.count}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};