"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { EDUCATION_ITEMS, CERTIFICATIONS, CAREER_GOALS } from "@/data/portfolioData";
import {
  GraduationCap,
  Award,
  Compass,
  Cloud,
  Cpu,
  Network,
  CheckCircle2,
  ArrowUpRight,
  Sparkles,
  Layers
} from "lucide-react";

export function EducationGoals() {
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
              anime.set(el.querySelectorAll(".anime-edu-card"), { opacity: 1, translateY: 0 });
            } else {
              anime({
                targets: el.querySelectorAll(".anime-edu-card"),
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
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="education"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)]/40 relative"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Growth & Foundation"
          title="Education & Career Trajectory"
        // subtitle="Academic credentials and focused engineering expansion into cloud systems, distributed design, and enterprise AI."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Education & Certifications (Left 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Education Card */}
            <div className="anime-edu-card p-6 sm:p-7 rounded-2xl glass-card border border-[var(--border-subtle)] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] text-[var(--accent-cyan)]">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Academic Degree</div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">
                    Education
                  </h3>
                </div>
              </div>

              {EDUCATION_ITEMS.map((edu, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-[var(--text-main)]">
                      {edu.degree}
                    </h4>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-[var(--accent-cyan)] border border-cyan-500/20 font-semibold">
                      {edu.year}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-[var(--text-muted)]">
                    {edu.details}
                  </p>
                </div>
              ))}
            </div>

            {/* Certifications Card */}
            <div className="anime-edu-card p-6 sm:p-7 rounded-2xl glass-card border border-[var(--border-subtle)] space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[var(--badge-hands-bg)] border border-[var(--badge-hands-border)] text-[var(--accent-indigo)]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Professional Credentials</div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">
                    Certifications
                  </h3>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{CERTIFICATIONS.status}</span>
                </div>
                <p className="text-xs font-mono text-[var(--text-subtle)]">
                  {CERTIFICATIONS.note}
                </p>
              </div>
            </div>
          </div>

          {/* Career Goals Card (Right 7 Cols) */}
          <div className="lg:col-span-7">
            <div className="anime-edu-card h-full p-6 sm:p-8 rounded-2xl glass-card border border-[var(--border-subtle)] space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] text-[var(--accent-cyan)]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-mono text-[var(--text-subtle)] uppercase">Vision & Expansion</div>
                    <h3 className="text-xl font-bold text-[var(--text-main)]">
                      {CAREER_GOALS.title}
                    </h3>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] space-y-1">
                  <div className="text-xs font-mono font-semibold text-[var(--accent-cyan)] uppercase tracking-wider">
                    Firm Engineering Anchor
                  </div>
                  <div className="text-sm font-bold text-[var(--text-main)]">
                    {CAREER_GOALS.primaryIdentity}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  {CAREER_GOALS.statement}
                </p>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)]">
                    Target Growth Dimensions
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {CAREER_GOALS.focusAreas.map((area, fIdx) => (
                      <div
                        key={fIdx}
                        className="p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] space-y-2 hover:border-[var(--accent-cyan)]/40 transition-colors"
                      >
                        <div className="text-xs font-bold text-[var(--text-main)] flex items-center gap-1.5">
                          {fIdx === 0 && <Cloud className="w-3.5 h-3.5 text-[var(--accent-cyan)]" />}
                          {fIdx === 1 && <Network className="w-3.5 h-3.5 text-[var(--accent-indigo)]" />}
                          {fIdx === 2 && <Cpu className="w-3.5 h-3.5 text-emerald-400" />}
                          <span>{area.title}</span>
                        </div>
                        <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                          {area.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--border-subtle)] text-xs text-[var(--text-subtle)] font-mono">
                Continuous learning through production practice, system architecture studies, and modern cloud patterns.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
