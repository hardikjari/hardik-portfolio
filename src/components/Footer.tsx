"use client";

import React from "react";
import { PORTFOLIO_INFO, CONTACT_INFO } from "@/data/portfolioData";
import { ArrowUp, Terminal, Mail } from "lucide-react";
import { LinkedinIcon } from "./ui/Icons";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-surface-subtle)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand & Stack Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-1.5">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[var(--bg-surface-elevated)] border border-[var(--border-subtle)] flex items-center justify-center text-[var(--accent-cyan)]">
              <Terminal className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-sm text-[var(--text-main)]">
              {PORTFOLIO_INFO.name}
            </span>
          </div>
          <p className="text-xs text-[var(--text-muted)] max-w-sm">
            {PORTFOLIO_INFO.role} • Enterprise ASP.NET Core & Angular Systems
          </p>
        </div>

        {/* Quick Nav Anchors */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-[var(--text-muted)]">
          <a href="#about" className="hover:text-[var(--accent-cyan)] transition-colors">About</a>
          <a href="#skills" className="hover:text-[var(--accent-cyan)] transition-colors">Skills</a>
          <a href="#experience" className="hover:text-[var(--accent-cyan)] transition-colors">Experience</a>
          <a href="#projects" className="hover:text-[var(--accent-cyan)] transition-colors">Projects</a>
          <a href="#case-studies" className="hover:text-[var(--accent-cyan)] transition-colors">Case Studies</a>
          <a href="#architecture" className="hover:text-[var(--accent-cyan)] transition-colors">Architecture</a>
          <a href="#contact" className="hover:text-[var(--accent-cyan)] transition-colors">Contact</a>
        </div>

        {/* Socials & Back to Top */}
        <div className="flex items-center gap-3">
          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="p-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--accent-cyan)] border border-[var(--border-subtle)] transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          {/* GitHub link commented out as requested */}
          {/* <a
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="p-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--accent-cyan)] border border-[var(--border-subtle)] transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a> */}
          <a
            href={`mailto:${CONTACT_INFO.email}`}
            aria-label="Email"
            className="p-2 rounded-lg bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-muted)] hover:text-[var(--accent-cyan)] border border-[var(--border-subtle)] transition-colors"
          >
            <Mail className="w-4 h-4" />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="p-2 rounded-lg bg-[var(--bg-surface-elevated)] hover:bg-[var(--accent-cyan)] text-[var(--text-muted)] hover:text-slate-950 border border-[var(--border-subtle)] transition-colors"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] font-mono text-[var(--text-subtle)]">
        <div suppressHydrationWarning>
          © {new Date().getFullYear()} {PORTFOLIO_INFO.name}. All rights reserved.
        </div>
        <div>
          Engineered with Next.js, TypeScript, Tailwind CSS & anime.js
        </div>
      </div>
    </footer>
  );
}
