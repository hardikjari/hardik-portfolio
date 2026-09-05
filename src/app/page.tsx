import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Projects } from "@/components/Projects";
import { CaseStudies } from "@/components/CaseStudies";
import { Architecture } from "@/components/Architecture";
import { EducationGoals } from "@/components/EducationGoals";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { AnimatedBackground } from "@/components/AnimatedBackground";
import { CustomCursor } from "@/components/CustomCursor";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-[var(--bg-base)] text-[var(--text-main)] selection:bg-cyan-500/30 selection:text-cyan-200">
      <CustomCursor />
      <AnimatedBackground />
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <CaseStudies />
        <Architecture />
        <EducationGoals />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
