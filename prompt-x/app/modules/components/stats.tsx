import { FileText, Users, DollarSign, Star } from "lucide-react";

const stats = [
  {
    icon: FileText,
    value: "10K+",
    label: "Active Prompts",
  },
  {
    icon: Users,
    value: "5K+",
    label: "Creators",
  },
  {
    icon: DollarSign,
    value: "₹50K+",
    label: "Earned",
  },
  {
    icon: Star,
    value: "4.8★",
    label: "Rating",
  },
];

export const Stats = () => {
  return (
    <section className="py-20 relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-2xl bg-card/50 border border-border/50 backdrop-blur-sm hover:border-primary/50 transition-all duration-300 hover:scale-105"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-primary/20 to-tertiary/20 group-hover:from-primary/30 group-hover:to-tertiary/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold gradient-text">{stat.value}</div>
                    <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
