import { Categories } from "../components/categories";
import { Hero } from "../components/hero-section";
import { Navbar } from "../components/navbar";
import { Stats } from "../components/stats";

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <Categories />
    </div>
  );
};
