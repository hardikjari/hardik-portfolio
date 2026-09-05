"use client";

import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { CASE_STUDIES } from "@/data/portfolioData";
import { 
  ShieldAlert, 
  CheckCircle2, 
  ChevronDown, 
  Code2, 
  Cpu, 
  Database, 
  Flame, 
  GitMerge, 
  Layers, 
  Wrench, 
  ArrowRight, 
  Workflow,
  ArrowLeftRight
} from "lucide-react";

export function CaseStudies() {
  const [expandedId, setExpandedId] = useState<string>("case-study-transaction-allocation-returns");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              anime.set(el.querySelectorAll(".anime-case-study"), { opacity: 1, translateY: 0 });
            } else {
              anime({
                targets: el.querySelectorAll(".anime-case-study"),
                opacity: [0, 1],
                translateY: [24, 0],
                delay: anime.stagger(90, { start: 100 }),
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

  const toggleAccordion = (id: string) => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    if (expandedId === id) {
      // Collapsing
      const contentEl = contentRefs.current[id];
      if (contentEl && !prefersReducedMotion) {
        anime({
          targets: contentEl,
          height: 0,
          opacity: 0,
          duration: 300,
          easing: "easeOutQuad",
          complete: () => setExpandedId(""),
        });
      } else {
        setExpandedId("");
      }
    } else {
      // Expanding new
      const prevId = expandedId;
      setExpandedId(id);

      setTimeout(() => {
        const contentEl = contentRefs.current[id];
        if (contentEl && !prefersReducedMotion) {
          contentEl.style.height = "auto";
          const fullHeight = contentEl.scrollHeight;
          contentEl.style.height = "0px";
          anime({
            targets: contentEl,
            height: fullHeight,
            opacity: [0, 1],
            duration: 350,
            easing: "easeOutCubic",
            complete: () => {
              contentEl.style.height = "auto";
            }
          });
        }
      }, 10);
    }
  };

  const getCaseIcon = (id: string) => {
    switch (id) {
      case "case-study-transaction-allocation-returns":
        return <ArrowLeftRight className="w-5 h-5 text-emerald-400" />;
      case "case-study-dms-security":
        return <ShieldAlert className="w-5 h-5 text-[var(--accent-cyan)]" />;
      case "case-study-workflow-approval":
        return <Workflow className="w-5 h-5 text-[var(--accent-indigo)]" />;
      case "case-study-inventory-transfer":
        return <Layers className="w-5 h-5 text-amber-400" />;
      case "case-study-credit-sales":
        return <CheckCircle2 className="w-5 h-5 text-emerald-400" />;
      case "case-study-db-optimization":
        return <Database className="w-5 h-5 text-[var(--accent-cyan)]" />;
      case "case-study-migration":
        return <GitMerge className="w-5 h-5 text-sky-400" />;
      case "case-study-debugging":
        return <Wrench className="w-5 h-5 text-rose-400" />;
      default:
        return <Cpu className="w-5 h-5 text-[var(--accent-cyan)]" />;
    }
  };

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]/30 relative"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Technical Problem Solving"
          title="Engineering Case Studies"
          subtitle="Deep-dive breakdown of concrete architectural challenges solved in enterprise production environments — Problem → Approach → Implementation → Result."
        />

        <div className="space-y-4">
          {CASE_STUDIES.map((study, idx) => {
            const isExpanded = expandedId === study.id;

            return (
              <div
                key={study.id}
                className="anime-case-study rounded-2xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/30 transition-all duration-200 overflow-hidden"
              >
                {/* Accordion Header */}
                <button
                  type="button"
                  onClick={() => toggleAccordion(study.id)}
                  aria-expanded={isExpanded}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[var(--bg-surface-elevated)]/50 transition-colors"
                >
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    <div className="p-2.5 rounded-xl bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] shrink-0">
                      {getCaseIcon(study.id)}
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-0.5">
                        Case Study 0{idx + 1}
                      </div>
                      <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)]">
                        {study.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <div className="hidden sm:flex flex-wrap gap-1.5 justify-end">
                      {study.technologies.slice(0, 2).map((tech) => (
                        <Badge key={tech} size="sm" variant="subtle">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div
                      className={`p-2 rounded-lg bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] transition-transform duration-300 ${
                        isExpanded ? "rotate-180 text-[var(--accent-cyan)]" : ""
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </button>

                {/* Accordion Body */}
                <div
                  ref={(el) => {
                    contentRefs.current[study.id] = el;
                  }}
                  className={`overflow-hidden transition-all duration-300 ${
                    isExpanded ? "block" : "hidden"
                  }`}
                  style={{ opacity: isExpanded ? 1 : 0 }}
                >
                  <div className="p-5 sm:p-6 pt-0 border-t border-[var(--border-subtle)] mt-2 space-y-5">
                    {/* Problem & Approach Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Problem */}
                      <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/15 space-y-1.5">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-rose-400" />
                          The Problem
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                          {study.problem}
                        </p>
                      </div>

                      {/* Approach */}
                      <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/15 space-y-1.5">
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-cyan)] flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)]" />
                          The Engineering Approach
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                          {study.approach}
                        </p>
                      </div>
                    </div>

                    {/* Implementation Detail */}
                    <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-1.5">
                      <div className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--text-subtle)]">
                        Implementation Specifics
                      </div>
                      <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                        {study.implementation}
                      </p>
                    </div>

                    {/* Verified Result */}
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-1">
                          Verified Outcome
                        </div>
                        <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed font-medium">
                          {study.result}
                        </p>
                      </div>
                    </div>

                    {/* Technologies used in case study */}
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-xs font-mono text-[var(--text-subtle)]">
                        Technologies:
                      </span>
                      {study.technologies.map((t) => (
                        <Badge key={t} size="sm" variant="cyan">
                          {t}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
