"use client";

import React, { useState, useEffect } from "react";

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const handleScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          const totalScroll =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (totalScroll > 0) {
            const currentProgress = (window.scrollY / totalScroll) * 100;
            setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-[3.5px] z-[100] pointer-events-none bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] via-[#22CDE1] to-[#F9DB5C] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(249,219,92,0.85)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
