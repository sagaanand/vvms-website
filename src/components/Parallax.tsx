"use client";

import React, { useEffect, useRef, useState } from "react";

interface UseParallaxOptions {
  speed?: number; // e.g. 0.2 (moves down slower), -0.2 (moves up faster)
  clamp?: number; // Max pixel shift in either direction
  mobileDampen?: number; // Multiply speed by this on mobile (0 to 1, default 0.4)
}

/**
 * High-performance, GPU-accelerated hook for viewport parallax scrolling
 * Uses requestAnimationFrame, passive listeners, and bounding checks
 */
export function useParallax({
  speed = 0.25,
  clamp = 160,
  mobileDampen = 0.4,
}: UseParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let ticking = false;
    const isMobile = window.innerWidth < 768;
    const effectiveSpeed = isMobile ? speed * mobileDampen : speed;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Only calculate if within or approaching viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
              const elementCenter = rect.top + rect.height / 2;
              const viewportCenter = windowHeight / 2;
              const distanceFromCenter = elementCenter - viewportCenter;
              const calculatedOffset = distanceFromCenter * effectiveSpeed;

              // Clamp to prevent visual clipping
              const clamped = Math.max(
                -clamp,
                Math.min(clamp, calculatedOffset)
              );
              setOffsetY(Math.round(clamped * 10) / 10);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial calculation
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [speed, clamp, mobileDampen]);

  return { ref, offsetY };
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
  const { ref, offsetY } = useParallax({ speed, clamp });

  return (
    <div
      ref={ref}
      className={`will-change-transform ${className}`}
      style={{
        transform: `translate3d(0, ${offsetY}px, 0)`,
        ...style,
      }}
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
  const { ref: refSlow, offsetY: offsetSlow } = useParallax({ speed: -0.15, clamp: 90 });
  const { ref: refFast, offsetY: offsetFast } = useParallax({ speed: 0.25, clamp: 120 });

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-0 ${className}`}>
      {/* Slow floating architectural coordinate ring */}
      <div
        ref={refSlow}
        className="absolute -top-16 -right-16 w-80 h-80 rounded-full border border-[#B78D42]/20 opacity-30 will-change-transform"
        style={{ transform: `translate3d(0, ${offsetSlow}px, 0)` }}
      >
        <div className="absolute inset-4 rounded-full border border-dashed border-[#F9DB5C]/20" />
      </div>

      {/* Counter-parallax subtle cyan grid line mark */}
      <div
        ref={refFast}
        className="absolute top-1/2 -left-20 w-64 h-64 rounded-full border border-[#22CDE1]/15 opacity-25 will-change-transform"
        style={{ transform: `translate3d(0, ${offsetFast}px, 0)` }}
      >
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#22CDE1]/20" />
        <div className="absolute top-0 left-1/2 w-[1px] h-full bg-[#22CDE1]/20" />
      </div>
    </div>
  );
}

export default ParallaxLayer;
