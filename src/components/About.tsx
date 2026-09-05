"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { SectionHeading } from "./ui/SectionHeading";
import { ABOUT_ME } from "@/data/portfolioData";
import {
  Briefcase,
  GraduationCap,
  Layers,
  Database,
  Code2,
  Server,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Cpu
} from "lucide-react";

export function About() {
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
              anime.set(el.querySelectorAll(".anime-about-item"), { opacity: 1, translateY: 0 });
            } else {
              anime({
                targets: el.querySelectorAll(".anime-about-item"),
                opacity: [0, 1],
                translateY: [24, 0],
                delay: anime.stagger(80, { start: 100 }),
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
      id="about"
      ref={sectionRef}
      className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border-subtle)] relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          badge="Professional Background"
          title="About Hardik Jariwala"
          subtitle="Full-stack engineer specialized in high-integrity enterprise systems, end-to-end feature delivery, and robust database architectures."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Narrative (Left 7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="anime-about-item p-6 sm:p-8 rounded-2xl glass-card border border-[var(--border-subtle)] space-y-5">
              <p className="text-base sm:text-lg text-[var(--text-main)] leading-relaxed font-normal">
                {ABOUT_ME.summary}
              </p>

              <div className="p-4 rounded-xl bg-[var(--bg-surface-subtle)] border border-[var(--border-subtle)]">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-[var(--badge-strong-bg)] text-[var(--accent-cyan)] shrink-0 mt-0.5">
                    <Server className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--text-main)] mb-1">
                      Core Specialization
                    </h4>
                    <p className="text-sm text-[var(--text-muted)] leading-relaxed">
                      {ABOUT_ME.coreStrengths}
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                {ABOUT_ME.flagshipWork}
              </p>

              {/* <div className="pt-2 border-t border-[var(--border-subtle)] flex items-center gap-3 text-xs sm:text-sm text-[var(--text-muted)]">
                <div className="p-1.5 rounded-md bg-[var(--badge-hands-bg)] text-[var(--accent-indigo)]">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <span>{ABOUT_ME.educationAndGrowth}</span>
              </div> */}
            </div>

            {/* End-to-End Ownership Flow Card */}
            <div className="anime-about-item p-6 rounded-2xl glass-card border border-[var(--border-subtle)]">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-subtle)] mb-4">
                End-to-End Feature Ownership Paradigm
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center">
                  <div className="text-[10px] font-mono text-[var(--accent-indigo)] mb-1">01. UI Layer</div>
                  <div className="text-xs font-semibold text-[var(--text-main)]">Angular 17 & AG Grid</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center">
                  <div className="text-[10px] font-mono text-[var(--accent-cyan)] mb-1">02. API Gateway</div>
                  <div className="text-xs font-semibold text-[var(--text-main)]">ASP.NET Core Web API</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center">
                  <div className="text-[10px] font-mono text-[var(--accent-cyan)] mb-1">03. Business Logic</div>
                  <div className="text-xs font-semibold text-[var(--text-main)]">C# Services & DI</div>
                </div>
                <div className="p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-center">
                  <div className="text-[10px] font-mono text-emerald-400 mb-1">04. Data Layer</div>
                  <div className="text-xs font-semibold text-[var(--text-main)]">SQL Server & SPs</div>
                </div>
              </div>
            </div>
          </div>

          {/* Highlights & Enterprise Domains (Right 5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {ABOUT_ME.highlights.map((item, idx) => (
                <div
                  key={idx}
                  className="anime-about-item p-4 rounded-xl glass-card border border-[var(--border-subtle)]"
                >
                  <div className="text-xs font-mono text-[var(--text-subtle)] mb-1">
                    {item.label}
                  </div>
                  <div className="text-sm font-semibold text-[var(--text-main)]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Enterprise Domain Modules in LinkERP */}
            <div className="anime-about-item p-6 rounded-2xl glass-card border border-[var(--border-subtle)] space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-[var(--accent-cyan)]">
                <Layers className="w-4 h-4" />
                <span>Enterprise ERP & Application Domains</span>
              </div>

              <ul className="space-y-2.5 text-xs sm:text-sm text-[var(--text-muted)]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span><strong>Financial Transaction Allocation:</strong> Debit/Credit matching, partial splits & remaining balances via OPENJSON.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span><strong>Customer Product Returns:</strong> SP inventory restock into warehouse bins & debtor ledger credit adjustments.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span><strong>Document Management (DMS):</strong> Custom recursive tree view (*ngTemplateOutlet) & role-wise RBAC permissions.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span><strong>Purchasing (PR / PO):</strong> Multi-tier approval workflows & sequence logic.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span><strong>Sales Order Processing (SOP):</strong> Credit limit validation & split terms.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span><strong>Inventory & Stock Tracking:</strong> Multi-bin transfers & serial product checks.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span><strong>Pharmacy & Prescriptions:</strong> Specialized regulated enterprise workflows.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-cyan)] shrink-0 mt-0.5" />
                  <span><strong>Vendor Management:</strong> Supplier registers, terms, and purchase audits.</span>
                </li>
              </ul>
            </div>

            {/* Quality Mindset Callout */}
            {/* <div className="anime-about-item p-5 rounded-2xl bg-gradient-to-br from-[var(--bg-surface-elevated)] to-[var(--bg-surface)] border border-[var(--border-subtle)]">
              <div className="flex items-center gap-2.5 text-sm font-semibold text-[var(--text-main)] mb-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Production Reliability Focus</span>
              </div>
              <p className="text-xs text-[var(--text-muted)] leading-relaxed">
                Beyond writing new features, Hardik routinely diagnoses and resolves production anomalies — from stored procedure deadlocks and NULL-conversion issues to IIS reverse-proxy CORS bindings and Angular runtime exceptions.
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
}
