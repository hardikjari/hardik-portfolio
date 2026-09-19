"use client";

import React, { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const spotlightRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    // Only enable on desktop mouse pointers
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    let mouseX = -500;
    let mouseY = -500;
    let currentX = -500;
    let currentY = -500;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Track hover over interactive elements to subtly expand the spotlight
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const isInteractive = Boolean(
        target.closest(
          "a, button, input, textarea, [role='button'], .cursor-pointer, .anime-project-card, .anime-case-study, .anime-arch-node"
        )
      );

      setIsHovered(isInteractive);
    };

    // Smooth inertia interpolation loop for the spotlight
    let animationFrameId: number;
    const render = () => {
      currentX += (mouseX - currentX) * 0.18;
      currentY += (mouseY - currentY) * 0.18;

      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isVisible]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-30 transition-opacity duration-500 overflow-hidden ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Ambient Soft Torchlight / Background Spotlight Follower */}
      <div
        ref={spotlightRef}
        className={`fixed top-0 left-0 -ml-[250px] -mt-[250px] w-[500px] h-[500px] rounded-full pointer-events-none will-change-transform transition-all duration-300 ${
          isHovered
            ? "scale-125 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.14),rgba(99,102,241,0.07),transparent_70%)] blur-2xl"
            : "scale-100 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.08),rgba(99,102,241,0.04),transparent_70%)] blur-3xl"
        }`}
      />
    </div>
  );
}

