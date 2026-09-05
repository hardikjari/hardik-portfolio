"use client";

import React from "react";
import { HonestyLevel } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  level?: HonestyLevel;
  variant?: "default" | "cyan" | "indigo" | "amber" | "emerald" | "subtle";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  level,
  variant = "default",
  size = "sm",
  className = "",
}: BadgeProps) {
  let styleClasses = "bg-[var(--bg-surface-elevated)] border-[var(--border-subtle)] text-[var(--text-muted)]";

  if (level) {
    switch (level) {
      case "strong-experience":
        styleClasses = "bg-[var(--badge-strong-bg)] border-[var(--badge-strong-border)] text-[var(--badge-strong-text)]";
        break;
      case "hands-on":
        styleClasses = "bg-[var(--badge-hands-bg)] border-[var(--badge-hands-border)] text-[var(--badge-hands-text)]";
        break;
      case "working-knowledge":
        styleClasses = "bg-[var(--badge-work-bg)] border-[var(--badge-work-border)] text-[var(--badge-work-text)]";
        break;
      case "familiar-with":
        styleClasses = "bg-[var(--badge-fam-bg)] border-[var(--badge-fam-border)] text-[var(--badge-fam-text)]";
        break;
    }
  } else {
    switch (variant) {
      case "cyan":
        styleClasses = "bg-[var(--badge-strong-bg)] border-[var(--badge-strong-border)] text-[var(--accent-cyan)]";
        break;
      case "indigo":
        styleClasses = "bg-[var(--badge-hands-bg)] border-[var(--badge-hands-border)] text-[var(--accent-indigo)]";
        break;
      case "amber":
        styleClasses = "bg-[var(--badge-work-bg)] border-[var(--badge-work-border)] text-[var(--accent-amber)]";
        break;
      case "emerald":
        styleClasses = "bg-emerald-500/10 border-emerald-500/30 text-emerald-400";
        break;
      case "subtle":
        styleClasses = "bg-[var(--bg-surface-subtle)] border-[var(--border-subtle)] text-[var(--text-subtle)]";
        break;
    }
  }

  const sizeClasses = size === "sm" ? "text-xs px-2.5 py-1" : "text-sm px-3 py-1.5";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md font-mono font-medium border transition-colors duration-200 ${sizeClasses} ${styleClasses} ${className}`}
    >
      {children}
    </span>
  );
}
