"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { PORTFOLIO_INFO, CONTACT_INFO } from "@/data/portfolioData";
import {
  ArrowRight,
  Download,
  FileText,
  Mail,
  Database,
  Layers,
  Server,
  Code2,
  Sparkles,
  ChevronDown
} from "lucide-react";
import { LinkedinIcon } from "./ui/Icons";

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const badgesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    const tl = anime.timeline({
      easing: "easeOutExpo",
    });

    tl.add({
      targets: ".hero-status-badge",
      opacity: [0, 1],
      translateY: [-15, 0],
      duration: 600,
    })
      .add({
        targets: ".hero-title-line",
        opacity: [0, 1],
        translateY: [30, 0],
        delay: anime.stagger(120),
        duration: 800,
      }, "-=300")
      .add({
        targets: subtextRef.current,
        opacity: [0, 1],
        translateY: [20, 0],
        duration: 700,
      }, "-=400")
      .add({
        targets: ".hero-cta-btn",
        opacity: [0, 1],
        translateY: [15, 0],
        delay: anime.stagger(80),
        duration: 600,
      }, "-=300")
      .add({
        targets: ".hero-feature-card",
        opacity: [0, 1],
        scale: [0.95, 1],
        delay: anime.stagger(90),
        duration: 600,
      }, "-=300");

    // Floating subtle glow animation
    anime({
      targets: ".hero-glow-blob",
      translateY: [-10, 10],
      translateX: [-10, 10],
      direction: "alternate",
      loop: true,
      duration: 5000,
      easing: "easeInOutSine",
    });
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden bg-grid-pattern"
    >
      {/* Ambient Gradient Glow Blobs in Purple & Violet */}
      <div
        aria-hidden="true"
        className="hero-glow-blob absolute -top-40 left-1/2 -translate-x-1/2 w-[650px] h-[500px] bg-gradient-to-tr from-purple-500/20 via-fuchsia-500/12 to-indigo-500/0 rounded-full blur-3xl pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 -left-32 w-72 h-72 bg-purple-500/12 rounded-full blur-2xl pointer-events-none -z-10"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 -right-32 w-80 h-80 bg-fuchsia-500/12 rounded-full blur-2xl pointer-events-none -z-10"
      />

      <div className="max-w-5xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Status Pill */}
        <div className="hero-status-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] text-[var(--accent-cyan)] mb-6 shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent-cyan)] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent-cyan)]"></span>
          </span>
          <span>{PORTFOLIO_INFO.status}</span>
        </div>

        {/* Name & Headline */}
        <div className="space-y-3 mb-6">
          <p className="hero-title-line text-sm sm:text-base font-mono uppercase tracking-widest text-[var(--text-muted)]">
            Hi, my name is
          </p>
          <h1
            ref={headlineRef}
            className="hero-title-line text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[var(--text-main)]"
          >
            {PORTFOLIO_INFO.name}
          </h1>
          <h2 className="hero-title-line text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-purple-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
            {PORTFOLIO_INFO.headline}
          </h2>
        </div>

        {/* Subtext */}
        <p
          ref={subtextRef}
          className="max-w-3xl text-base sm:text-lg md:text-xl text-[var(--text-muted)] leading-relaxed mb-10 font-normal"
        >
          {PORTFOLIO_INFO.subtext}
        </p>

        {/* Primary CTAs */}
        <div
          ref={ctaRef}
          className="flex flex-wrap items-center justify-center gap-3.5 sm:gap-4 mb-12 w-full sm:w-auto"
        >
          <a
            href="#projects"
            className="hero-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-purple-500 hover:bg-purple-400 text-slate-950 transition-all duration-200 shadow-md shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>View Projects</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href={CONTACT_INFO.resumeUrl}
            download="Hardik-Jariwala-CV.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-[var(--bg-surface-elevated)] hover:bg-[var(--bg-surface)] text-[var(--text-main)] border border-[var(--border-subtle)] hover:border-[var(--border-strong)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
            title="Download Hardik Jariwala's Resume (PDF)"
          >
            <Download className="w-4 h-4 text-[var(--accent-cyan)]" />
            <span>Download Resume</span>
          </a>

          <a
            href="#contact"
            className="hero-cta-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-medium text-sm bg-transparent hover:bg-[var(--bg-surface-elevated)] text-[var(--text-main)] border border-[var(--border-subtle)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Mail className="w-4 h-4" />
            <span>Contact Me</span>
          </a>
        </div>

        {/* Quick Social & Contact Bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-[var(--text-muted)] mb-14">
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            className="inline-flex items-center gap-1.5 hover:text-[var(--accent-cyan)] transition-colors"
            title="Email Hardik"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{CONTACT_INFO.email}</span>
          </a>
          <span className="text-[var(--border-strong)]">•</span>
          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[var(--accent-cyan)] transition-colors"
            title="LinkedIn Profile"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn Profile</span>
          </a>
          {/* GitHub Redirection and logo commented out as requested */}
          {/* <span className="text-[var(--border-strong)]">•</span>
          <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 hover:text-[var(--accent-cyan)] transition-colors"
            title="GitHub Profile"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub Profile</span>
          </a> */}
        </div>

        {/* Core Competencies Quick Cards */}
        <div
          ref={badgesRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl text-left"
        >
          <div className="hero-feature-card p-4 rounded-xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] text-[var(--accent-cyan)] flex items-center justify-center mb-3">
              <Server className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)] mb-1">Backend Core</div>
            <div className="text-sm font-semibold text-[var(--text-main)]">ASP.NET Core & C#</div>
          </div>

          <div className="hero-feature-card p-4 rounded-xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[var(--badge-hands-bg)] border border-[var(--badge-hands-border)] text-[var(--accent-indigo)] flex items-center justify-center mb-3">
              <Code2 className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)] mb-1">Frontend UI</div>
            <div className="text-sm font-semibold text-[var(--text-main)]">Angular & AG Grid</div>
          </div>

          <div className="hero-feature-card p-4 rounded-xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] text-[var(--accent-cyan)] flex items-center justify-center mb-3">
              <Database className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)] mb-1">Database Engine</div>
            <div className="text-sm font-semibold text-[var(--text-main)]">SQL Server & T-SQL</div>
          </div>

          <div className="hero-feature-card p-4 rounded-xl glass-card border border-[var(--border-subtle)] hover:border-[var(--accent-cyan)]/40 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
              <Layers className="w-4 h-4" />
            </div>
            <div className="text-xs font-mono text-[var(--text-muted)] mb-1">Domain Focus</div>
            <div className="text-sm font-semibold text-[var(--text-main)]">Enterprise ERP Logic</div>
          </div>
        </div>

        {/* Scroll down indicator */}
        <div className="mt-12 text-[var(--text-subtle)] flex flex-col items-center gap-1.5 animate-bounce">
          <span className="text-[10px] font-mono tracking-widest uppercase">Scroll Down</span>
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>
    </section>
  );
}
