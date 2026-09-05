"use client";

import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { useTheme } from "@/context/ThemeContext";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  pulseDuration: number;
  pulseDelay: number;
}

interface GlassSphere {
  id: number;
  x: number;
  y: number;
  size: number;
  blur: number;
  gradient: string;
  floatY: number;
  floatX: number;
  duration: number;
}

export function HeroNebulaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion || !containerRef.current) return;

    // 1. Animate Swirling Deep Space Nebula Clouds
    anime({
      targets: ".nebula-cloud-1",
      translateX: [-40, 40],
      translateY: [-30, 30],
      scale: [1, 1.25, 0.95, 1],
      rotate: [-8, 8],
      duration: 16000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });

    anime({
      targets: ".nebula-cloud-2",
      translateX: [30, -35],
      translateY: [25, -25],
      scale: [0.95, 1.3, 1],
      rotate: [10, -10],
      duration: 18000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });

    anime({
      targets: ".nebula-cloud-3",
      translateX: [-25, 30],
      translateY: [35, -20],
      scale: [1.1, 0.9, 1.15],
      duration: 20000,
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
    });

    // 2. Animate Floating Glassmorphic Spheres & Prisms
    anime({
      targets: ".glass-sphere",
      translateY: (el: HTMLElement) => {
        const dist = parseFloat(el.getAttribute("data-float-y") || "30");
        return [-dist, dist];
      },
      translateX: (el: HTMLElement) => {
        const dist = parseFloat(el.getAttribute("data-float-x") || "20");
        return [dist, -dist];
      },
      rotate: [-15, 15],
      scale: [0.95, 1.08],
      duration: (el: HTMLElement) => {
        return parseFloat(el.getAttribute("data-duration") || "8000");
      },
      loop: true,
      direction: "alternate",
      easing: "easeInOutQuad",
      delay: anime.stagger(250),
    });

    // 3. Animate Twinkling Stellar Dust / Stars
    anime({
      targets: ".stellar-star",
      opacity: [
        { value: (el: HTMLElement) => parseFloat(el.getAttribute("data-opacity") || "0.4") * 0.2, duration: 800 },
        { value: (el: HTMLElement) => parseFloat(el.getAttribute("data-opacity") || "0.4") * 1.5, duration: 1200 },
        { value: (el: HTMLElement) => parseFloat(el.getAttribute("data-opacity") || "0.4"), duration: 1000 },
      ],
      scale: [
        { value: 0.8, duration: 1000 },
        { value: 1.4, duration: 1000 },
        { value: 1.0, duration: 1000 },
      ],
      loop: true,
      direction: "alternate",
      easing: "easeInOutSine",
      delay: anime.stagger(120, { start: 100 }),
    });

    // 4. Smooth Mouse Parallax Depth
    const handleMouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth - 0.5) * 35;
      const mouseY = (e.clientY / window.innerHeight - 0.5) * 35;

      anime({
        targets: ".nebula-parallax-layer",
        translateX: mouseX,
        translateY: mouseY,
        duration: 900,
        easing: "easeOutQuad",
      });

      anime({
        targets: ".glass-spheres-parallax",
        translateX: -mouseX * 1.4,
        translateY: -mouseY * 1.4,
        duration: 700,
        easing: "easeOutQuad",
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Generate deterministic stars
  const stars: Star[] = [
    { id: 1, x: 15, y: 12, size: 2, opacity: 0.8, pulseDuration: 3000, pulseDelay: 200 },
    { id: 2, x: 28, y: 22, size: 3, opacity: 0.9, pulseDuration: 4000, pulseDelay: 600 },
    { id: 3, x: 42, y: 14, size: 1.5, opacity: 0.6, pulseDuration: 3500, pulseDelay: 100 },
    { id: 4, x: 72, y: 18, size: 2.5, opacity: 0.85, pulseDuration: 4500, pulseDelay: 800 },
    { id: 5, x: 88, y: 25, size: 3, opacity: 0.75, pulseDuration: 3800, pulseDelay: 400 },
    { id: 6, x: 8, y: 45, size: 2, opacity: 0.7, pulseDuration: 3200, pulseDelay: 900 },
    { id: 7, x: 92, y: 52, size: 2, opacity: 0.65, pulseDuration: 4200, pulseDelay: 300 },
    { id: 8, x: 18, y: 68, size: 3, opacity: 0.9, pulseDuration: 3600, pulseDelay: 500 },
    { id: 9, x: 35, y: 82, size: 1.5, opacity: 0.6, pulseDuration: 4800, pulseDelay: 700 },
    { id: 10, x: 65, y: 75, size: 2.5, opacity: 0.8, pulseDuration: 3400, pulseDelay: 250 },
    { id: 11, x: 82, y: 85, size: 3, opacity: 0.85, pulseDuration: 4100, pulseDelay: 650 },
    { id: 12, x: 50, y: 38, size: 2, opacity: 0.5, pulseDuration: 3900, pulseDelay: 150 },
  ];

  // Glassmorphic Spheres
  const spheres: GlassSphere[] = [
    {
      id: 1,
      x: 10,
      y: 18,
      size: 140,
      blur: 20,
      gradient: "from-cyan-500/20 via-sky-500/10 to-transparent",
      floatY: 28,
      floatX: 18,
      duration: 7500,
    },
    {
      id: 2,
      x: 82,
      y: 22,
      size: 190,
      blur: 24,
      gradient: "from-indigo-500/25 via-purple-500/15 to-transparent",
      floatY: 34,
      floatX: -22,
      duration: 9000,
    },
    {
      id: 3,
      x: 6,
      y: 68,
      size: 160,
      blur: 22,
      gradient: "from-blue-600/20 via-cyan-500/10 to-transparent",
      floatY: 25,
      floatX: 20,
      duration: 8200,
    },
    {
      id: 4,
      x: 86,
      y: 72,
      size: 130,
      blur: 18,
      gradient: "from-violet-500/20 via-indigo-500/10 to-transparent",
      floatY: 30,
      floatX: -16,
      duration: 7000,
    },
    {
      id: 5,
      x: 48,
      y: 8,
      size: 110,
      blur: 16,
      gradient: "from-cyan-400/25 via-blue-500/10 to-transparent",
      floatY: 22,
      floatX: 12,
      duration: 6500,
    },
  ];

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden select-none -z-10"
    >
      {/* 1. Multi-Layered Deep Space Cosmic Nebula Clouds */}
      <div className="nebula-parallax-layer absolute inset-0">
        {/* Core Electric Cyan Nebula (Top Center / Left) */}
        <div
          className={`nebula-cloud-1 absolute -top-[15%] left-[10%] w-[680px] h-[680px] rounded-full blur-[140px] mix-blend-screen transition-opacity duration-1000 ${
            theme === "dark"
              ? "bg-gradient-to-br from-cyan-500/28 via-sky-600/18 to-transparent opacity-80"
              : "bg-gradient-to-br from-cyan-400/20 via-sky-300/15 to-transparent opacity-70"
          }`}
        />

        {/* Deep Cosmic Indigo / Violet Nebula (Center Right) */}
        <div
          className={`nebula-cloud-2 absolute top-[25%] -right-[10%] w-[750px] h-[750px] rounded-full blur-[160px] mix-blend-screen transition-opacity duration-1000 ${
            theme === "dark"
              ? "bg-gradient-to-bl from-indigo-600/25 via-purple-600/20 to-transparent opacity-75"
              : "bg-gradient-to-bl from-indigo-400/18 via-purple-300/15 to-transparent opacity-65"
          }`}
        />

        {/* Ethereal Cobalt & Teal Nebula (Bottom Center) */}
        <div
          className={`nebula-cloud-3 absolute -bottom-[20%] left-[25%] w-[700px] h-[700px] rounded-full blur-[150px] mix-blend-screen transition-opacity duration-1000 ${
            theme === "dark"
              ? "bg-gradient-to-tr from-teal-500/20 via-blue-600/15 to-transparent opacity-70"
              : "bg-gradient-to-tr from-teal-400/15 via-blue-300/12 to-transparent opacity-60"
          }`}
        />

        {/* Center Glow Core Horizon */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-gradient-radial from-cyan-500/10 via-indigo-500/5 to-transparent blur-[120px]" />
      </div>

      {/* 2. Floating Glassmorphic Tech Spheres & Prisms */}
      <div className="glass-spheres-parallax absolute inset-0">
        {spheres.map((sphere) => (
          <div
            key={sphere.id}
            className="glass-sphere absolute rounded-full flex items-center justify-center pointer-events-none"
            data-float-y={sphere.floatY}
            data-float-x={sphere.floatX}
            data-duration={sphere.duration}
            style={{
              top: `${sphere.y}%`,
              left: `${sphere.x}%`,
              width: `${sphere.size}px`,
              height: `${sphere.size}px`,
            }}
          >
            {/* Glass Orb Shell */}
            <div
              className={`w-full h-full rounded-full bg-gradient-to-br ${sphere.gradient} border border-white/20 dark:border-white/15 backdrop-blur-[12px] shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] relative overflow-hidden`}
            >
              {/* Specular Rim Light Reflection */}
              <div className="absolute top-2 left-4 w-1/3 h-1/4 rounded-full bg-white/30 blur-[2px] transform -rotate-45 pointer-events-none" />
              <div className="absolute bottom-2 right-4 w-1/4 h-1/5 rounded-full bg-cyan-400/20 blur-[3px] pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Twinkling Stellar Dust & Starlight Field */}
      <div className="absolute inset-0">
        {stars.map((star) => (
          <div
            key={star.id}
            className="stellar-star absolute rounded-full pointer-events-none"
            data-opacity={star.opacity}
            style={{
              top: `${star.y}%`,
              left: `${star.x}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              backgroundColor: theme === "dark" ? "#e0f2fe" : "#38bdf8",
              boxShadow: theme === "dark" 
                ? `0 0 ${star.size * 3}px ${star.size}px rgba(56, 189, 248, 0.6)`
                : `0 0 ${star.size * 2}px ${star.size}px rgba(14, 165, 233, 0.4)`,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>

      {/* Subtle fine cosmos grid lines overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 mix-blend-overlay" />
    </div>
  );
}
