"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

interface UseAnimeObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
  onIntersect?: (target: HTMLElement) => void;
}

export function useAnimeObserver<T extends HTMLElement = HTMLDivElement>(
  options: UseAnimeObserverOptions = {}
) {
  const elementRef = useRef<T | null>(null);
  const hasTriggeredRef = useRef(false);

  const {
    threshold = 0.15,
    rootMargin = "0px 0px -50px 0px",
    triggerOnce = true,
    onIntersect,
  } = options;

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    // Check prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (triggerOnce && hasTriggeredRef.current) return;
            hasTriggeredRef.current = true;

            if (onIntersect) {
              onIntersect(entry.target as HTMLElement);
            } else {
              // Default stagger reveal for child elements with .anime-fade-in
              const childTargets = (entry.target as HTMLElement).querySelectorAll(
                ".anime-reveal, .anime-fade-up, .anime-card, .anime-badge"
              );

              if (childTargets.length > 0) {
                if (prefersReducedMotion) {
                  anime.set(childTargets, { opacity: 1, translateY: 0 });
                } else {
                  anime({
                    targets: childTargets,
                    opacity: [0, 1],
                    translateY: [28, 0],
                    delay: anime.stagger(60, { start: 100 }),
                    duration: 650,
                    easing: "easeOutQuad",
                  });
                }
              }
            }

            if (triggerOnce) {
              observer.unobserve(entry.target);
            }
          }
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, onIntersect]);

  return elementRef;
}

/**
 * Utility to animate elements entering view using anime.js
 */
export function animateFadeUp(elements: Element | Element[] | NodeListOf<Element> | string, staggerMs = 60, delayMs = 0) {
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    anime.set(elements, { opacity: 1, translateY: 0 });
    return;
  }

  return anime({
    targets: elements,
    opacity: [0, 1],
    translateY: [24, 0],
    delay: anime.stagger(staggerMs, { start: delayMs }),
    duration: 600,
    easing: "easeOutQuad",
  });
}

/**
 * Utility for card tilt/hover lift
 */
export function animateCardHover(target: HTMLElement, isEntering: boolean) {
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) return;

  anime.remove(target);
  if (isEntering) {
    anime({
      targets: target,
      translateY: -5,
      scale: 1.012,
      boxShadow: "0 20px 30px -10px rgba(0, 0, 0, 0.35), 0 0 20px 0 rgba(6, 182, 212, 0.15)",
      duration: 250,
      easing: "easeOutQuad",
    });
  } else {
    anime({
      targets: target,
      translateY: 0,
      scale: 1.0,
      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      duration: 300,
      easing: "easeOutQuad",
    });
  }
}
