"use client";

import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { PROJECTS } from "@/data/portfolioData";
import { ProjectItem } from "@/types";
import { 
  FolderLock, 
  Layers, 
  Clock, 
  Car, 
  Monitor, 
  ArrowUpRight, 
  CheckCircle2, 
  Database, 
  Sparkles, 
  Server, 
  Code2, 
  FileText,
  X,
  ShieldCheck,
  Zap
} from "lucide-react";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              anime.set(el.querySelectorAll(".anime-project-card"), { opacity: 1, translateY: 0 });
            } else {
              anime({
                targets: el.querySelectorAll(".anime-project-card"),
                opacity: [0, 1],
                translateY: [24, 0],
                delay: anime.stagger(100, { start: 100 }),
                duration: 650,
                easing: "easeOutQuad",
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const target = e.currentTarget;
    anime.remove(target);
    anime({
      targets: target,
      translateY: -6,
      scale: 1.01,
      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.4), 0 0 25px 0 rgba(6, 182, 212, 0.12)",
      duration: 250,
      easing: "easeOutQuad",
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const target = e.currentTarget;
    anime.remove(target);
    anime({
      targets: target,
      translateY: 0,
      scale: 1.0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      duration: 300,
      easing: "easeOutQuad",
    });
  };

  const getProjectIcon = (category: ProjectItem["category"]) => {
    switch (category) {
      case "Mobile/Web App":
        return <Car className="w-5 h-5 text-amber-400" />;
      case "Web Application":
        return <Clock className="w-5 h-5 text-[var(--accent-indigo)]" />;
      case "Web Portal & Microservices":
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case "Enterprise ERP":
        return <Layers className="w-5 h-5 text-[var(--accent-cyan)]" />;
      case "ERP Module":
        return <FolderLock className="w-5 h-5 text-purple-400" />;
      case "Desktop Application":
        return <Monitor className="w-5 h-5 text-blue-400" />;
      default:
        return <Layers className="w-5 h-5 text-[var(--accent-cyan)]" />;
    }
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] relative"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Featured Portfolio"
          title="Engineered Systems & Projects"
          subtitle="Real-world platforms, EV station portals, workforce shift management, and enterprise ERP systems built across ASP.NET Core microservices, Angular, and SQL Server."
        />

        {/* Project Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {PROJECTS.map((project, idx) => {
            const isTopTier = idx < 3;
            const colSpan = "lg:col-span-6";

            return (
              <div
                key={project.id}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={() => setSelectedProject(project)}
                className={`anime-project-card ${colSpan} p-6 sm:p-7 rounded-2xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors duration-200 flex flex-col justify-between cursor-pointer group relative`}
              >
                {/* Flagship ribbon */}
                {project.isFlagship && (
                  <div className="absolute -top-3 right-6 px-3 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/25 uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Primary Project
                  </div>
                )}

                <div>
                  {/* Category & Icon */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] group-hover:border-[var(--accent-cyan)] transition-colors">
                      {getProjectIcon(project.category)}
                    </div>
                    <span className="text-xs font-mono text-[var(--text-subtle)]">
                      {project.category}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent-cyan)] transition-colors mb-1">
                    {project.title}
                  </h3>
                  <div className="text-xs font-mono text-[var(--accent-cyan)] mb-3">
                    {project.subtitle}
                  </div>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed mb-5">
                    {project.summary}
                  </p>

                  {/* Flagship details preview */}
                  {project.keyTables && (
                    <div className="mb-4 p-3 rounded-lg bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] text-[11px] font-mono text-[var(--text-muted)] space-y-1">
                      <div className="text-[var(--accent-cyan)] font-semibold flex items-center gap-1">
                        <Database className="w-3 h-3" />
                        Key RBAC Tables:
                      </div>
                      <div className="text-[var(--text-main)]">
                        {project.keyTables.join(" • ")}
                      </div>
                    </div>
                  )}

                  {/* Key Highlights list */}
                  <ul className="space-y-2 mb-6">
                    {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                      <li key={hIdx} className="flex items-start gap-2 text-xs text-[var(--text-muted)]">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer: Tech Stack & Details CTA */}
                <div className="pt-4 border-t border-[var(--border-subtle)] space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, isTopTier ? 6 : 4).map((tech) => (
                      <Badge key={tech} size="sm" variant="subtle">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > (isTopTier ? 6 : 4) && (
                      <span className="text-[10px] font-mono text-[var(--text-subtle)] self-center">
                        +{project.technologies.length - (isTopTier ? 6 : 4)} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs font-mono font-medium text-[var(--accent-cyan)] pt-1">
                    <span>View Architecture Details</span>
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
            <div 
              className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl glass-card border border-[var(--border-strong)] p-6 sm:p-8 space-y-6 shadow-2xl animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-[var(--accent-cyan)]">
                      {selectedProject.category}
                    </span>
                    {selectedProject.isFlagship && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500 text-slate-950 font-bold">
                        Primary Project
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-main)]">
                    {selectedProject.title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-muted)] mt-0.5">
                    {selectedProject.subtitle}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
                  Project Overview
                </h4>
                <p className="text-sm text-[var(--text-main)] leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Modules if available */}
              {selectedProject.keyModules && (
                <div className="space-y-2.5">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
                    Core Functional Modules
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedProject.keyModules.map((mod, mIdx) => (
                      <div key={mIdx} className="p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-xs text-[var(--text-muted)] flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent-cyan)] shrink-0" />
                        <span>{mod}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Architecture flow if DMS */}
              {selectedProject.architecture && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
                    Security & Authorization Pipeline
                  </h4>
                  <div className="p-3.5 rounded-xl bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] text-xs font-mono text-[var(--text-main)] leading-relaxed">
                    {selectedProject.architecture}
                  </div>
                </div>
              )}

              {/* Highlights */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
                  Engineering Highlights
                </h4>
                <ul className="space-y-2">
                  {selectedProject.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Full Tech Stack */}
              <div className="pt-4 border-t border-[var(--border-subtle)] space-y-2">
                <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
                  Complete Technology Stack
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {selectedProject.technologies.map((tech) => (
                    <Badge key={tech} size="sm" variant="cyan">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
