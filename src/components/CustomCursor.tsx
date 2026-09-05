"use client";

import React, { useEffect, useRef, useState } from "react";
import anime from "animejs";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const lensRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isSelecting, setIsSelecting] = useState(false);

  useEffect(() => {
    // Only enable on fine pointer devices (desktop mouse)
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || prefersReducedMotion) return;

    let mouseX = -200;
    let mouseY = -200;
    let lensX = -200;
    let lensY = -200;
    let targetX = -200;
    let targetY = -200;
    let isMagnetic = false;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Direct tracking for center dot and spotlight
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Check magnetic snap target
      const target = document.elementFromPoint(mouseX, mouseY) as HTMLElement | null;
      if (target) {
        const magneticEl = target.closest("button, a, .magnetic-target") as HTMLElement | null;
        if (magneticEl && magneticEl.offsetWidth < 200 && magneticEl.offsetHeight < 80) {
          const rect = magneticEl.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          
          // Pull lens slightly toward element center
          targetX = mouseX + (centerX - mouseX) * 0.35;
          targetY = mouseY + (centerY - mouseY) * 0.35;
          isMagnetic = true;
        } else {
          targetX = mouseX;
          targetY = mouseY;
          isMagnetic = false;
        }
      } else {
        targetX = mouseX;
        targetY = mouseY;
        isMagnetic = false;
      }
    };

    const handleMouseDown = () => setIsClicked(true);
    const handleMouseUp = () => setIsClicked(false);
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth inertia interpolation loop for the follower lens
    let animationFrameId: number;
    const render = () => {
      lensX += (targetX - lensX) * 0.22;
      lensY += (targetY - lensY) * 0.22;

      if (lensRef.current) {
        lensRef.current.style.transform = `translate3d(${lensX}px, ${lensY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Track hover over interactive targets
    const handleElementOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest(
        "a, button, input, textarea, [role='button'], .cursor-pointer, .anime-project-card, .anime-case-study, .anime-arch-node"
      );

      if (interactive) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    // Track selection
    const handleSelectionChange = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        setIsSelecting(true);
      } else {
        setIsSelecting(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseover", handleElementOver, { passive: true });
    document.addEventListener("selectionchange", handleSelectionChange);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseover", handleElementOver);
      document.removeEventListener("selectionchange", handleSelectionChange);
    };
  }, [isVisible]);

  // Anime.js reactive transforms for Magnetic Glass Invert & Spotlight states
  useEffect(() => {
    if (!lensRef.current || !dotRef.current) return;

    if (isClicked) {
      anime({
        targets: lensRef.current,
        scale: 0.85,
        duration: 120,
        easing: "easeOutQuad",
      });
      anime({
        targets: dotRef.current,
        scale: 1.4,
        duration: 120,
        easing: "easeOutQuad",
      });
    } else if (isSelecting) {
      anime({
        targets: lensRef.current,
        scaleX: 2.2,
        scaleY: 1.2,
        borderRadius: "8px",
        duration: 250,
        easing: "easeOutCubic",
      });
      anime({
        targets: dotRef.current,
        opacity: 0,
        duration: 150,
        easing: "easeOutQuad",
      });
    } else if (isHovered) {
      anime({
        targets: lensRef.current,
        scale: 2.2,
        scaleX: 2.2,
        scaleY: 2.2,
        borderRadius: "50%",
        duration: 250,
        easing: "easeOutCubic",
      });
      anime({
        targets: dotRef.current,
        opacity: 0,
        scale: 0.2,
        duration: 150,
        easing: "easeOutQuad",
      });
    } else {
      anime({
        targets: lensRef.current,
        scale: 1.0,
        scaleX: 1.0,
        scaleY: 1.0,
        borderRadius: "50%",
        duration: 280,
        easing: "easeOutQuad",
      });
      anime({
        targets: dotRef.current,
        opacity: 1,
        scale: 1.0,
        duration: 200,
        easing: "easeOutQuad",
      });
    }
  }, [isHovered, isClicked, isSelecting]);

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[9999] transition-opacity duration-300 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* 1. Subtle Torchlight / Ambient Spotlight Follower */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 -ml-[150px] -mt-[150px] w-[300px] h-[300px] rounded-full bg-gradient-to-r from-purple-500/15 via-fuchsia-500/10 to-transparent blur-2xl pointer-events-none will-change-transform opacity-60"
      />

      {/* 2. Magnetic Glass Invert Lens */}
      <div
        ref={lensRef}
        className="fixed top-0 left-0 -ml-4 -mt-4 w-8 h-8 rounded-full border border-white/80 dark:border-white/90 bg-white/20 dark:bg-white/30 backdrop-blur-[1.5px] mix-blend-difference shadow-[0_0_15px_rgba(255,255,255,0.4)] pointer-events-none will-change-transform transition-[border-color,background-color] duration-200"
      />

      {/* 3. Precision Center Micro Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-white mix-blend-difference pointer-events-none will-change-transform z-20"
      />
    </div>
  );
}
