"use client";

import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { SKILLS } from "@/data/portfolioData";
import { SkillItem } from "@/types";
import { 
  Server, 
  Code2, 
  Database, 
  Terminal, 
  Boxes, 
  Check, 
  Filter, 
  Sparkles,
  Info
} from "lucide-react";

type CategoryFilter = "all" | "backend" | "frontend" | "database" | "devops" | "other";

export function Skills() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const sectionRef = useRef<HTMLElement>(null);
  const barsAnimatedRef = useRef(false);

  const categories = [
    { id: "all", label: "All Skills", icon: Boxes },
    { id: "backend", label: "Backend (.NET)", icon: Server },
    { id: "frontend", label: "Frontend (Angular)", icon: Code2 },
    { id: "database", label: "Database (SQL Server)", icon: Database },
    { id: "devops", label: "DevOps & IIS", icon: Terminal },
    { id: "other", label: "Integrations & Tools", icon: Boxes },
  ];

  const filteredSkills = SKILLS.filter((skill) => {
    const matchesCategory = activeCategory === "all" || skill.category === activeCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const animateSkillElements = () => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      anime.set(el.querySelectorAll(".anime-skill-card"), { opacity: 1, translateY: 0 });
      anime.set(el.querySelectorAll(".skill-progress-fill"), { 
        width: (target: HTMLElement) => target.getAttribute("data-width") + "%" 
      });
      return;
    }

    anime({
      targets: el.querySelectorAll(".anime-skill-card"),
      opacity: [0, 1],
      translateY: [20, 0],
      delay: anime.stagger(35),
      duration: 500,
      easing: "easeOutQuad",
    });

    anime({
      targets: el.querySelectorAll(".skill-progress-fill"),
      width: (target: HTMLElement) => [0, (target.getAttribute("data-width") || "80") + "%"],
      delay: anime.stagger(40, { start: 150 }),
      duration: 850,
      easing: "easeOutCubic",
    });
  };

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !barsAnimatedRef.current) {
            barsAnimatedRef.current = true;
            animateSkillElements();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Re-run card animation when tab filter changes
  useEffect(() => {
    if (barsAnimatedRef.current) {
      animateSkillElements();
    }
  }, [activeCategory, searchQuery]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]/40 relative"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Technical Competencies"
          title="Skills & Technical Expertise"
          subtitle="Categorized with honest proficiency tiers reflecting actual hands-on enterprise experience across .NET, Angular, SQL Server, and IIS deployment."
        />

        {/* Honesty Legend */}
        <div className="mb-8 p-4 rounded-xl glass-card border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[var(--text-main)] font-medium">
            <Info className="w-4 h-4 text-[var(--accent-cyan)]" />
            <span>Honesty & Experience Tiers:</span>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] text-[var(--badge-strong-text)] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)]" />
              Strong / Hands-on
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--badge-work-bg)] border border-[var(--badge-work-border)] text-[var(--badge-work-text)] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              Working Knowledge
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[var(--badge-fam-bg)] border border-[var(--badge-fam-border)] text-[var(--badge-fam-text)] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
              Familiar With
            </span>
          </div>
        </div>

        {/* Category Tabs & Search Filter */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryFilter)}
                  className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                    isActive
                      ? "bg-[var(--accent-cyan)] text-slate-950 font-semibold shadow-sm"
                      : "bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] border border-[var(--border-subtle)]"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Search */}
          <div className="relative min-w-[200px] md:w-64">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. C#, AG Grid)..."
              className="w-full px-3.5 py-2 rounded-lg text-xs bg-[var(--bg-surface)] border border-[var(--border-subtle)] focus:border-[var(--accent-cyan)] text-[var(--text-main)] placeholder-[var(--text-subtle)] focus:outline-none transition-colors"
            />
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSkills.map((skill) => {
            return (
              <div
                key={skill.name}
                className="anime-skill-card p-4 rounded-xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-sm font-semibold text-[var(--text-main)] group-hover:text-[var(--accent-cyan)] transition-colors">
                      {skill.name}
                    </span>
                    <Badge level={skill.level} size="sm">
                      {skill.levelLabel}
                    </Badge>
                  </div>
                  <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-3">
                    Category: {skill.category}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-[var(--bg-surface-elevated)] rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`skill-progress-fill h-full rounded-full transition-all duration-300 ${
                      skill.level === "strong-experience"
                        ? "bg-gradient-to-r from-[var(--accent-cyan)] to-sky-400"
                        : skill.level === "working-knowledge"
                        ? "bg-gradient-to-r from-amber-500 to-amber-300"
                        : "bg-slate-400"
                    }`}
                    data-width={skill.proficiencyScore}
                    style={{ width: "0%" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {filteredSkills.length === 0 && (
          <div className="text-center py-12 text-[var(--text-muted)] text-sm">
            No skills found matching &quot;{searchQuery}&quot;. Try a different term or clear the filter.
          </div>
        )}
      </div>
    </section>
  );
}
