"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { useTheme } from "@/context/ThemeContext";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  type: "dot" | "cross" | "ring";
  color: string;
}

export function AnimatedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    // 1. Animate large ambient glowing light orbs
    anime({
      targets: ".bg-ambient-orb-1",
      translateX: [
        { value: "-15%", duration: 10000 },
        { value: "15%", duration: 12000 },
        { value: "0%", duration: 9000 },
      ],
      translateY: [
        { value: "-20%", duration: 9000 },
        { value: "20%", duration: 11000 },
        { value: "0%", duration: 8000 },
      ],
      scale: [
        { value: 1.15, duration: 8000 },
        { value: 0.9, duration: 10000 },
        { value: 1.0, duration: 7000 },
      ],
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });

    anime({
      targets: ".bg-ambient-orb-2",
      translateX: [
        { value: "20%", duration: 11000 },
        { value: "-20%", duration: 13000 },
        { value: "0%", duration: 9000 },
      ],
      translateY: [
        { value: "25%", duration: 10000 },
        { value: "-15%", duration: 12000 },
        { value: "0%", duration: 9000 },
      ],
      scale: [
        { value: 0.85, duration: 9000 },
        { value: 1.2, duration: 11000 },
        { value: 1.0, duration: 8000 },
      ],
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });

    anime({
      targets: ".bg-ambient-orb-3",
      translateX: [
        { value: "-10%", duration: 12000 },
        { value: "10%", duration: 14000 },
        { value: "0%", duration: 10000 },
      ],
      translateY: [
        { value: "15%", duration: 11000 },
        { value: "-25%", duration: 13000 },
        { value: "0%", duration: 9000 },
      ],
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });

    // 2. Animate floating developer tech nodes & particles
    anime({
      targets: ".bg-tech-particle",
      translateY: (el: HTMLElement) => {
        const dist = parseFloat(el.getAttribute("data-distance") || "40");
        return [-dist, dist];
      },
      translateX: (el: HTMLElement) => {
        const dist = parseFloat(el.getAttribute("data-distance") || "30") * 0.7;
        return [dist, -dist];
      },
      rotate: (el: HTMLElement) => {
        return el.classList.contains("type-cross") ? [0, 180] : [0, 0];
      },
      opacity: (el: HTMLElement) => {
        const base = parseFloat(el.getAttribute("data-opacity") || "0.4");
        return [base * 0.4, base * 1.3];
      },
      delay: anime.stagger(150, { start: 200 }),
      duration: (el: HTMLElement) => {
        return parseFloat(el.getAttribute("data-duration") || "6000");
      },
      direction: "alternate",
      loop: true,
      easing: "easeInOutQuad",
    });

    // 3. Subtle mouse parallax on ambient layer
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 40;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 40;

      anime({
        targets: ".bg-parallax-layer",
        translateX: mouseX,
        translateY: mouseY,
        duration: 800,
        easing: "easeOutQuad",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate deterministic developer tech particles
  const particles: Particle[] = [
    { id: 1, x: 12, y: 15, size: 4, opacity: 0.5, type: "dot", color: "cyan" },
    { id: 2, x: 85, y: 18, size: 10, opacity: 0.4, type: "cross", color: "indigo" },
    { id: 3, x: 24, y: 38, size: 8, opacity: 0.35, type: "ring", color: "cyan" },
    { id: 4, x: 90, y: 45, size: 5, opacity: 0.45, type: "dot", color: "cyan" },
    { id: 5, x: 8, y: 65, size: 12, opacity: 0.3, type: "cross", color: "indigo" },
    { id: 6, x: 78, y: 72, size: 9, opacity: 0.4, type: "ring", color: "cyan" },
    { id: 7, x: 45, y: 22, size: 4, opacity: 0.35, type: "dot", color: "indigo" },
    { id: 8, x: 62, y: 55, size: 11, opacity: 0.25, type: "cross", color: "cyan" },
    { id: 9, x: 30, y: 85, size: 5, opacity: 0.5, type: "dot", color: "cyan" },
    { id: 10, x: 88, y: 88, size: 8, opacity: 0.35, type: "ring", color: "indigo" },
    { id: 11, x: 18, y: 92, size: 10, opacity: 0.3, type: "cross", color: "cyan" },
    { id: 12, x: 52, y: 78, size: 4, opacity: 0.4, type: "dot", color: "indigo" },
  ];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none"
    >
      {/* 1. Large Ambient Radiant Color Beams in Light Purple & Violet */}
      <div className="bg-parallax-layer absolute inset-0">
        {/* Lavender / Purple Orb top-left / center */}
        <div
          className={`bg-ambient-orb-1 absolute top-[5%] left-[15%] w-[550px] h-[550px] rounded-full blur-[140px] transition-opacity duration-700 ${
            theme === "dark"
              ? "bg-purple-500/14"
              : "bg-purple-400/15"
          }`}
        />

        {/* Deep Violet / Fuchsia Orb center-right */}
        <div
          className={`bg-ambient-orb-2 absolute top-[40%] right-[10%] w-[650px] h-[650px] rounded-full blur-[160px] transition-opacity duration-700 ${
            theme === "dark"
              ? "bg-fuchsia-600/12"
              : "bg-fuchsia-400/14"
          }`}
        />

        {/* Indigo / Lavender Orb bottom-left */}
        <div
          className={`bg-ambient-orb-3 absolute bottom-[10%] left-[25%] w-[600px] h-[600px] rounded-full blur-[150px] transition-opacity duration-700 ${
            theme === "dark"
              ? "bg-indigo-500/12"
              : "bg-indigo-400/14"
          }`}
        />
      </div>

      {/* 2. Floating Developer Particles, Crosses and Nodes */}
      <div className="absolute inset-0">
        {particles.map((p, idx) => {
          const isPurple = p.color === "cyan" || p.color === "purple";
          const colorClass = isPurple
            ? theme === "dark" ? "text-purple-400 border-purple-400/40 bg-purple-400" : "text-purple-600 border-purple-600/40 bg-purple-600"
            : theme === "dark" ? "text-fuchsia-400 border-fuchsia-400/40 bg-fuchsia-400" : "text-fuchsia-600 border-fuchsia-600/40 bg-fuchsia-600";

          const duration = 5000 + (idx % 4) * 1500;
          const distance = 25 + (idx % 3) * 15;

          return (
            <div
              key={p.id}
              className={`bg-tech-particle absolute type-${p.type}`}
              data-opacity={p.opacity}
              data-duration={duration}
              data-distance={distance}
              style={{
                top: `${p.y}%`,
                left: `${p.x}%`,
                opacity: p.opacity,
              }}
            >
              {p.type === "dot" && (
                <div
                  className={`rounded-full ${colorClass}`}
                  style={{ width: `${p.size}px`, height: `${p.size}px` }}
                />
              )}

              {p.type === "cross" && (
                <svg
                  width={p.size}
                  height={p.size}
                  viewBox="0 0 16 16"
                  fill="none"
                  className={colorClass}
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                >
                  <line x1="8" y1="2" x2="8" y2="14" />
                  <line x1="2" y1="8" x2="14" y2="8" />
                </svg>
              )}

              {p.type === "ring" && (
                <div
                  className={`rounded-full border border-dashed ${colorClass}`}
                  style={{ width: `${p.size}px`, height: `${p.size}px` }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
