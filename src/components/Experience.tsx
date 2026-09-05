"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { EXPERIENCE_LIST } from "@/data/portfolioData";
import { 
  Briefcase, 
  Calendar, 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Building2,
  GitBranch,
  ShieldAlert,
  Server
} from "lucide-react";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (prefersReducedMotion) {
              anime.set(el.querySelectorAll(".anime-exp-card"), { opacity: 1, translateY: 0 });
              if (pathRef.current) {
                pathRef.current.style.strokeDashoffset = "0";
              }
            } else {
              // Draw SVG timeline line
              if (pathRef.current) {
                const pathLength = anime.setDashoffset(pathRef.current);
                anime({
                  targets: pathRef.current,
                  strokeDashoffset: [pathLength, 0],
                  duration: 1200,
                  easing: "easeInOutSine",
                });
              }

              // Stagger cards and nodes
              anime({
                targets: el.querySelectorAll(".anime-exp-node"),
                scale: [0, 1],
                opacity: [0, 1],
                duration: 600,
                easing: "easeOutBack",
                delay: anime.stagger(150, { start: 200 }),
              });

              anime({
                targets: el.querySelectorAll(".anime-exp-card"),
                opacity: [0, 1],
                translateX: [-20, 0],
                duration: 700,
                easing: "easeOutQuad",
                delay: anime.stagger(150, { start: 300 }),
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

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="Work History"
          title="Professional Experience"
          subtitle="Real-world enterprise development track record delivering full-stack solutions and resolving complex production challenges."
        />

        <div className="relative pl-6 sm:pl-10">
          {/* Vertical SVG timeline line */}
          <div className="absolute left-[11px] sm:left-[19px] top-6 bottom-6 w-[2px]">
            <svg className="w-full h-full" preserveAspectRatio="none">
              <line
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                className="stroke-[var(--border-subtle)]"
                strokeWidth="2"
              />
              <path
                ref={pathRef}
                d="M 1 0 L 1 1200"
                className="stroke-[var(--accent-cyan)]"
                strokeWidth="2"
                strokeDasharray="1000"
                strokeDashoffset="1000"
              />
            </svg>
          </div>

          {EXPERIENCE_LIST.map((exp, idx) => (
            <div key={idx} className="relative mb-12 last:mb-0">
              {/* Pulsing Node */}
              <div className="anime-exp-node absolute -left-[29px] sm:-left-[37px] top-2.5 w-6 h-6 rounded-full bg-[var(--bg-surface)] border-2 border-[var(--accent-cyan)] flex items-center justify-center shadow-md shadow-cyan-500/20 z-10">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
              </div>

              {/* Main Experience Card */}
              <div className="anime-exp-card p-6 sm:p-8 rounded-2xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-all duration-300 space-y-6">
                {/* Header info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[var(--border-subtle)]">
                  <div>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Building2 className="w-4 h-4 text-[var(--accent-cyan)]" />
                      <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-main)]">
                        {exp.company}
                      </h3>
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                        {exp.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm font-semibold text-[var(--accent-cyan)]">
                      <TrendingUp className="w-4 h-4" />
                      <span>{exp.role}</span>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-start sm:items-end gap-1.5 text-xs font-mono text-[var(--text-muted)]">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)]">
                      <Calendar className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />
                      <span>{exp.period}</span>
                    </div>
                  </div>
                </div>

                {/* Role Progression Spotlight */}
                <div className="p-4 rounded-xl bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-[var(--accent-cyan)] text-slate-950 shrink-0 mt-0.5">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--accent-cyan)] font-semibold mb-1">
                      Role Evolution: .NET Intern → Full SDE-1
                    </h4>
                    <p className="text-xs sm:text-sm text-[var(--text-main)] leading-relaxed">
                      Started as a .NET Intern in January 2024 at CodexLancers and quickly progressed into a full SDE-1 role, driving full-stack features from UI through API and business logic down to SQL Server stored procedures.
                    </p>
                  </div>
                </div>

                {/* Responsibilities & Achievements */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-3.5">
                    Key Responsibilities & Deliverables
                  </h4>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {exp.achievements.map((achievement, aIdx) => (
                      <li
                        key={aIdx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[var(--text-muted)] p-2.5 rounded-lg bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-colors"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack Tags */}
                <div className="pt-4 border-t border-[var(--border-subtle)]">
                  <div className="text-[11px] font-mono text-[var(--text-subtle)] uppercase tracking-wider mb-2.5">
                    Technologies Applied in Role:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} size="sm" variant="subtle">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
