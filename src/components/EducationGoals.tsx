"use client";

import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { SectionHeading } from "./ui/SectionHeading";
import { Badge } from "./ui/Badge";
import { EDUCATION_ITEMS, CERTIFICATION_ITEMS, CERTIFICATIONS, CAREER_GOALS } from "@/data/portfolioData";
import { CertificationItem } from "@/types";
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
  Layers,
  ShieldCheck,
  FileText,
  ExternalLink,
  Download,
  X
} from "lucide-react";
import { GithubIcon } from "./ui/Icons";

export function EducationGoals() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedCertPdf, setSelectedCertPdf] = useState<CertificationItem | null>(null);

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
                    Certifications & Hackathons
                  </h3>
                </div>
              </div>

              {CERTIFICATION_ITEMS.map((cert) => (
                <div
                  key={cert.id}
                  className="p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors space-y-3"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 flex-wrap mb-1.5">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-indigo-500/15 text-[var(--accent-indigo)] border border-indigo-500/25 font-semibold">
                        {cert.badgeText}
                      </span>
                      <span className="text-[11px] font-mono text-[var(--text-subtle)]">
                        {cert.date}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-[var(--text-main)] leading-snug">
                      {cert.title}
                    </h4>
                    <p className="text-xs font-mono text-[var(--accent-cyan)] mt-0.5">
                      {cert.issuer} • {cert.event}
                    </p>
                  </div>

                  <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                    {cert.description}
                  </p>

                  {cert.technologies && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cert.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] border border-[var(--border-subtle)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions: View Certificate (PDF), Direct PDF Link, & View Hackathon Project */}
                  <div className="pt-2.5 border-t border-[var(--border-subtle)] flex flex-wrap items-center gap-2">
                    {cert.pdfUrl && (
                      <button
                        type="button"
                        onClick={() => setSelectedCertPdf(cert)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold bg-[var(--badge-strong-bg)] text-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)] hover:text-slate-950 border border-[var(--badge-strong-border)] transition-colors group cursor-pointer"
                        title="Open Certificate in interactive PDF viewer"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        <span>View Certificate (PDF)</span>
                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </button>
                    )}
                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-mono bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:bg-[var(--bg-surface)] border border-[var(--border-subtle)] transition-colors"
                        title="Open PDF directly in a new tab"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Open PDF</span>
                      </a>
                    )}
                    {cert.projectUrl && (
                      <a
                        href={cert.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium bg-[var(--bg-surface-elevated)] text-[var(--text-main)] hover:bg-[var(--accent-cyan)] hover:text-slate-950 border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)] transition-colors group"
                        title="View Hackathon Project on GitHub"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                        <span>Hackathon Project</span>
                        <ArrowUpRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}

              <div className="p-3 rounded-xl bg-[var(--bg-surface)]/60 border border-[var(--border-subtle)] text-center space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[var(--text-muted)]">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{CERTIFICATIONS.status}</span>
                </div>
                <p className="text-[11px] font-mono text-[var(--text-subtle)]">
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

      {/* Certificate PDF Viewer Modal */}
      {selectedCertPdf && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setSelectedCertPdf(null)}
        >
          <div 
            className="w-full max-w-4xl max-h-[92vh] flex flex-col rounded-2xl glass-card border border-[var(--border-strong)] p-4 sm:p-6 shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)] gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-[var(--badge-strong-bg)] text-[var(--accent-cyan)] shrink-0">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text-main)] truncate">
                    {selectedCertPdf.title}
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-muted)]">
                    {selectedCertPdf.issuer} • {selectedCertPdf.event} ({selectedCertPdf.date})
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={selectedCertPdf.pdfUrl || selectedCertPdf.certificateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-cyan)] text-[var(--text-main)] hover:text-slate-950 border border-[var(--border-subtle)] transition-colors"
                  title="Open PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">New Tab</span>
                </a>
                <a
                  href={selectedCertPdf.pdfUrl || selectedCertPdf.certificateUrl}
                  download="Hardik-Jariwala-HackAura-Certificate.pdf"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/90 text-slate-950 font-semibold transition-colors"
                  title="Download Certificate PDF"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Download</span>
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedCertPdf(null)}
                  className="p-1.5 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Embedded PDF Viewer */}
            <div className="mt-4 flex-1 min-h-[55vh] sm:min-h-[65vh] w-full bg-slate-950/60 rounded-xl overflow-hidden border border-[var(--border-subtle)] relative flex items-center justify-center">
              <iframe
                src={`${selectedCertPdf.pdfUrl || selectedCertPdf.certificateUrl}#toolbar=1&navpanes=0`}
                className="w-full h-full min-h-[55vh] sm:min-h-[65vh] rounded-xl border-0"
                title="Certificate PDF Viewer"
              />
            </div>

            {/* Modal Footer */}
            <div className="mt-3 pt-3 border-t border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-[var(--text-muted)]">
              <span>Verified Hackathon Completion • Girls Leading Tech</span>
              {selectedCertPdf.projectUrl && (
                <a
                  href={selectedCertPdf.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[var(--accent-cyan)] hover:underline"
                >
                  <GithubIcon className="w-3.5 h-3.5" />
                  <span>View CriminalDetector.py on GitHub</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
