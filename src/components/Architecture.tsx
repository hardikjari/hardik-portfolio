"use client";

import React, { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { ARCHITECTURE_LAYERS } from "@/data/portfolioData";
import { ArchitectureLayer } from "@/types";
import {
  ArrowDown,
  CheckCircle2,
  Code2,
  Database,
  Layers,
  Lock,
  Server,
  ShieldCheck,
  Sparkles,
  Workflow,
  Info
} from "lucide-react";

export function Architecture() {
  const [activeLayer, setActiveLayer] = useState<ArchitectureLayer>(ARCHITECTURE_LAYERS[0]);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              anime.set(el.querySelectorAll(".anime-arch-node"), { opacity: 1, translateY: 0 });
            } else {
              anime({
                targets: el.querySelectorAll(".anime-arch-node"),
                opacity: [0, 1],
                translateY: [20, 0],
                delay: anime.stagger(80, { start: 100 }),
                duration: 600,
                easing: "easeOutQuad",
              });
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const getLayerIcon = (category: ArchitectureLayer["category"]) => {
    switch (category) {
      case "Frontend":
        return <Code2 className="w-4 h-4 text-[var(--accent-indigo)]" />;
      case "API Layer":
        return <Server className="w-4 h-4 text-[var(--accent-cyan)]" />;
      case "Core Logic":
        return <Workflow className="w-4 h-4 text-emerald-400" />;
      case "Data Access":
        return <Layers className="w-4 h-4 text-amber-400" />;
      case "ORM / Mapping":
        return <Database className="w-4 h-4 text-sky-400" />;
      case "Database Engine":
        return <Database className="w-4 h-4 text-[var(--accent-cyan)]" />;
    }
  };

  return (
    <section
      id="architecture"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Enterprise Stack Architecture"
          title="Full-Stack Application Flow"
          subtitle="A clean vertical architectural pipeline illustrating how requests flow from the Angular client UI through ASP.NET Core API, business service logic, and Dapper/EF down to SQL Server stored procedures."
        />

        {/* Interactive Architecture Flow Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Vertical Diagram Nodes (Left 6 Cols) */}
          <div className="lg:col-span-6 space-y-3 relative">
            {ARCHITECTURE_LAYERS.map((layer, idx) => {
              const isSelected = activeLayer.id === layer.id;

              return (
                <div key={layer.id} className="relative">
                  <div
                    onClick={() => setActiveLayer(layer)}
                    className={`anime-arch-node p-4 sm:p-4.5 rounded-xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${isSelected
                        ? "bg-[var(--bg-surface-elevated)] border-[var(--accent-cyan)] shadow-lg shadow-cyan-500/10 scale-[1.01]"
                        : "glass-card border-[var(--border-subtle)] hover:border-[var(--border-strong)] hover:bg-[var(--bg-surface-elevated)]/60"
                      }`}
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-8 h-8 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-subtle)] flex items-center justify-center shrink-0">
                        {getLayerIcon(layer.category)}
                      </div>
                      <div>
                        <div className="text-[10px] font-mono text-[var(--accent-cyan)] uppercase tracking-wider">
                          Tier 0{layer.stepNumber} • {layer.category}
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-[var(--text-main)]">
                          {layer.name}
                        </h3>
                      </div>
                    </div>

                    <div className="text-xs font-mono text-[var(--text-subtle)] shrink-0">
                      {isSelected ? (
                        <span className="text-[var(--accent-cyan)] font-semibold flex items-center gap-1">
                          Active Inspect
                        </span>
                      ) : (
                        <span>Click to view</span>
                      )}
                    </div>
                  </div>

                  {/* Flow Connector Arrow */}
                  {idx < ARCHITECTURE_LAYERS.length - 1 && (
                    <div className="flex justify-center my-1">
                      <div className="flex items-center gap-1 text-[var(--text-subtle)]">
                        <ArrowDown className="w-3.5 h-3.5 text-[var(--accent-cyan)]/70 animate-pulse" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Layer Deep-Dive Inspector (Right 6 Cols) */}
          <div className="lg:col-span-6 sticky top-24">
            <div className="p-6 sm:p-8 rounded-2xl glass-card border border-[var(--border-accent)] space-y-6 shadow-xl">
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-cyan)] mb-1">
                    <span>Tier 0{activeLayer.stepNumber}</span>
                    <span>•</span>
                    <span>{activeLayer.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-[var(--text-main)]">
                    {activeLayer.name}
                  </h3>
                </div>
                <div className="p-3 rounded-xl bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] text-[var(--accent-cyan)] shrink-0">
                  {getLayerIcon(activeLayer.category)}
                </div>
              </div>

              {/* Description */}
              <div className="space-y-1.5">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
                  Tier Purpose & Scope
                </div>
                <p className="text-sm text-[var(--text-main)] leading-relaxed">
                  {activeLayer.description}
                </p>
              </div>

              {/* Responsibilities */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
                  Key Technical Responsibilities
                </div>
                <ul className="space-y-2">
                  {activeLayer.keyResponsibilities.map((resp, rIdx) => (
                    <li key={rIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                      <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                      <span>{resp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hardik's Hands-on Role */}
              <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)] space-y-1">
                <div className="text-xs font-mono font-semibold text-[var(--accent-cyan)] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" />
                  Hardik&apos;s Hands-on Contributions in this Tier:
                </div>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                  {activeLayer.hardikRoleNote}
                </p>
              </div>

              {/* Technologies in this tier */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-2">
                  Technologies / Patterns Used:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeLayer.technologies.map((tech) => (
                    <Badge key={tech} size="sm" variant="cyan">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
