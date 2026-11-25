"use client";

import React, { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    let rafId: number | null = null;

    const onScroll = () => {
      if (!ticking) {
        rafId = window.requestAnimationFrame(() => {
          const scrollTop = window.scrollY;
          const docHeight = document.documentElement.scrollHeight - window.innerHeight;
          const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
          setProgress(scrollPercent);
          setVisible(scrollTop > 280);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      className={`fixed bottom-36 md:bottom-24 right-5 md:right-8 z-40 transition-all duration-300 transform ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="relative w-12 h-12 rounded-full bg-[#202020]/90 backdrop-blur-md border border-[#B78D42]/60 text-[#F9DB5C] flex items-center justify-center shadow-gold hover:shadow-cyan hover:scale-110 active:scale-95 transition-all duration-200 group"
      >
        {/* SVG Progress Ring */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="rgba(183, 141, 66, 0.25)"
            strokeWidth="2.5"
          />
          <circle
            cx="22"
            cy="22"
            r={radius}
            fill="none"
            stroke="url(#scrollGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset,
              transition: "stroke-dashoffset 150ms ease-out",
            }}
          />
          <defs>
            <linearGradient id="scrollGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F6E785" />
              <stop offset="50%" stopColor="#F9DB5C" />
              <stop offset="100%" stopColor="#22CDE1" />
            </linearGradient>
          </defs>
        </svg>

        <ChevronUp className="w-5 h-5 text-[#F9DB5C] group-hover:text-[#22CDE1] group-hover:-translate-y-0.5 transition-transform duration-200" />
      </button>
    </div>
  );
}
