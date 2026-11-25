"use client";

import React, { useEffect, useRef } from "react";

interface UseParallaxOptions {
  speed?: number; // e.g. 0.2 (moves down slower), -0.2 (moves up faster)
  clamp?: number; // Max pixel shift in either direction
  mobileDampen?: number; // Multiply speed by this on mobile (0 to 1, default 0.4)
}

/**
 * High-performance, zero-rerender, GPU-accelerated hook for viewport parallax scrolling.
 * Updates DOM style.transform directly via requestAnimationFrame without triggering React state updates.
 */
export function useParallax({
  speed = 0.25,
  clamp = 160,
  mobileDampen = 0.4,
}: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    // Mobile check: disable or zero out parallax on smaller touch screens to maximize scroll fluidity
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    let ticking = false;
    let rafId: number | null = null;

    const updateTransform = () => {
      const el = ref.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Only calculate if within or approaching viewport
        if (rect.top < windowHeight && rect.bottom > 0) {
          const elementCenter = rect.top + rect.height / 2;
          const viewportCenter = windowHeight / 2;
          const distanceFromCenter = elementCenter - viewportCenter;
          const calculatedOffset = distanceFromCenter * speed;

          // Clamp to prevent visual clipping
          const clamped = Math.max(-clamp, Math.min(clamp, calculatedOffset));
          const rounded = Math.round(clamped * 10) / 10;
          el.style.transform = `translate3d(0, ${rounded}px, 0)`;
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(updateTransform);
        ticking = true;
      }
    };

    updateTransform();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [speed, clamp, mobileDampen]);

  return { ref, offsetY: 0 };
}

interface ParallaxLayerProps {
  children?: React.ReactNode;
  speed?: number; // Negative = float faster upwards, Positive = lag behind downwards
  clamp?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * ParallaxLayer shifts its children vertically with GPU hardware acceleration
 */
export function ParallaxLayer({
  children,
  speed = 0.2,
  clamp = 140,
  className = "",
  style = {},
}: ParallaxLayerProps) {
  const { ref } = useParallax({ speed, clamp });

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

interface ParallaxFloatingAccentsProps {
  variant?: "gold" | "turquoise" | "mixed";
  className?: string;
}

/**
 * Ambient decorative architectural watermark and coordinate geometry with subtle parallax
 */
export function ParallaxFloatingAccents({
  variant = "mixed",
  className = "",
}: ParallaxFloatingAccentsProps) {
  const { ref: refSlow } = useParallax({ speed: -0.15, clamp: 90 });
  const { ref: refFast } = useParallax({ speed: 0.25, clamp: 120 });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}>
      {/* Slow floating architectural coordinate ring */}
      <div
        ref={refSlow}
        className="absolute -top-16 -right-16 w-80 h-80 rounded-full border border-[#B78D42]/20 opacity-30 will-change-transform"
      >
        <div className="absolute inset-4 rounded-full border border-dashed border-[#F9DB5C]/20" />
      </div>

      {/* Counter-parallax subtle cyan grid line mark */}
      <div
        ref={refFast}
        className="absolute top-1/2 -left-20 w-64 h-64 rounded-full border border-[#22CDE1]/15 opacity-25 will-change-transform"
      >
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#22CDE1]/20" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#22CDE1]/20" />
      </div>
    </div>
  );
}

export default ParallaxLayer;
