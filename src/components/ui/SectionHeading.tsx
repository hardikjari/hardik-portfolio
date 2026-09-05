"use client";

import React from "react";

interface SectionHeadingProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionHeading({
  badge,
  title,
  subtitle,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-12 md:mb-16 ${centered ? "text-center mx-auto max-w-3xl" : "max-w-3xl"}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full text-xs font-mono font-medium tracking-wide uppercase bg-[var(--badge-strong-bg)] border border-[var(--badge-strong-border)] text-[var(--accent-cyan)] anime-reveal">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-cyan)] animate-pulse" />
          {badge}
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[var(--text-main)] mb-4 anime-reveal">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-[var(--text-muted)] leading-relaxed anime-reveal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
