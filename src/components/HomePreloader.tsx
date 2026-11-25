"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface HomePreloaderProps {
  /** Optional callback fired when the animation completes */
  onComplete?: () => void;
  /** Duration in milliseconds before fading out (default: 2000ms) */
  minDurationMs?: number;
}

export default function HomePreloader({
  onComplete,
  minDurationMs = 2100,
}: HomePreloaderProps) {
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Lock page scroll during preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const startTime = Date.now();
    const intervalTime = 30; // updates every 30ms

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(100, Math.floor((elapsed / minDurationMs) * 100));

      // Ease progress slightly for luxury feel
      setProgress(rawProgress);

      if (elapsed >= minDurationMs) {
        clearInterval(timer);
        setProgress(100);

        // Trigger exit fade-out animation
        setTimeout(() => {
          setIsExiting(true);
        }, 150);

        // Completely unmount after exit animation
        setTimeout(() => {
          setIsFinished(true);
          document.body.style.overflow = originalOverflow;
          if (onComplete) onComplete();
        }, 650);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [minDurationMs, onComplete]);

  // Don't render anything once completed or prior to hydration
  if (!mounted || isFinished) return null;

  const handleSkip = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsFinished(true);
      document.body.style.overflow = "";
      if (onComplete) onComplete();
    }, 400);
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Loading Veedu Veettumanai Santhai"
      onClick={handleSkip}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#202020] text-[#F2F2F2] select-none cursor-pointer overflow-hidden transition-all duration-500 ease-out ${
        isExiting
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100 pointer-events-auto"
      }`}
    >
      {/* Background Architectural Blueprint Grid */}
      <div className="absolute inset-0 blueprint-grid-dark opacity-40 pointer-events-none" />

      {/* Layered Luxury Radial Gold & Turquoise Glow Circles */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-[#F9DB5C]/15 via-[#B78D42]/10 to-transparent blur-3xl pointer-events-none animate-pulse-subtle" />
      <div className="absolute w-[350px] h-[350px] rounded-full bg-[#22CDE1]/10 blur-2xl pointer-events-none" />

      {/* Main Preloader Content Card */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-lg text-center">
        {/* Animated Brand Logo Container */}
        <div className="relative mb-6 flex items-center justify-center">
          {/* Outer Rotating Accent Ring with Gold & Turquoise Dash */}
          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-[#F9DB5C]/40 animate-spin-slow pointer-events-none" />
          <div className="absolute -inset-1.5 rounded-full border border-[#22CDE1]/50 animate-pulse pointer-events-none" />

          {/* Central Logo Disk */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-[#B78D42] bg-[#202020] shadow-[0_0_35px_rgba(249,219,92,0.35)] flex items-center justify-center">
            <Image
              src="/images/logo.png"
              alt="Veedu Veettumanai Santhai Logo"
              width={112}
              height={112}
              priority
              className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>

        {/* Company Title */}
        <div className="mb-2">
          <div className="font-black text-xl sm:text-2xl tracking-tight flex items-center justify-center gap-2">
            <span className="text-[#F9DB5C] drop-shadow-sm">வீடு</span>
            <span className="text-[#22CDE1] drop-shadow-sm">வீட்டுமனை சந்தை</span>
          </div>
          <p className="text-[11px] sm:text-xs text-[#B78D42] font-extrabold uppercase tracking-widest mt-0.5">
            Veedu Veettumanai Santhai Pvt Ltd
          </p>
        </div>

        {/* Highlighted Core Acronym Slogan: Vision • Value • Mission • Success */}
        <div className="my-4 py-2 px-4 sm:px-5 rounded-2xl bg-[#2B2B2B]/90 border border-[#B78D42]/40 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.6)] backdrop-blur-md">
          <div className="flex items-center justify-center flex-wrap gap-x-2 sm:gap-x-3 gap-y-1 text-xs sm:text-sm md:text-[15px] font-black tracking-wider uppercase">
            <span className="inline-flex items-center">
              <span className="text-[#F9DB5C] text-sm sm:text-base mr-0.5">V</span>
              <span className="text-[#F2F2F2]">ision</span>
            </span>

            <span className="text-[#22CDE1] font-bold">•</span>

            <span className="inline-flex items-center">
              <span className="text-[#F9DB5C] text-sm sm:text-base mr-0.5">V</span>
              <span className="text-[#F2F2F2]">alue</span>
            </span>

            <span className="text-[#22CDE1] font-bold">•</span>

            <span className="inline-flex items-center">
              <span className="text-[#F9DB5C] text-sm sm:text-base mr-0.5">M</span>
              <span className="text-[#F2F2F2]">ission</span>
            </span>

            <span className="text-[#22CDE1] font-bold">•</span>

            <span className="inline-flex items-center">
              <span className="text-[#F9DB5C] text-sm sm:text-base mr-0.5">S</span>
              <span className="text-[#F2F2F2]">uccess</span>
            </span>
          </div>
        </div>

        {/* Founder & Civil Credential Tag */}
        <p className="text-[11px] sm:text-xs text-slate-300 font-medium max-w-xs sm:max-w-sm mb-5">
          Er. J. Vairavel | Civil Engineering & Real Estate Due Diligence
        </p>

        {/* Sleek Golden Linear Progress Bar */}
        <div className="w-56 sm:w-72 space-y-1.5">
          <div className="h-1.5 w-full bg-[#2B2B2B] rounded-full overflow-hidden border border-[#B78D42]/30 p-[1px]">
            <div
              className="h-full bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#22CDE1] rounded-full transition-all duration-75 ease-out shadow-[0_0_12px_rgba(249,219,92,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-400 font-semibold px-0.5">
            <span className="text-[#22CDE1]">
              {progress < 40
                ? "Loading portal..."
                : progress < 85
                ? "Verifying inventory..."
                : "Welcome to VVMS"}
            </span>
            <span className="text-[#F9DB5C] font-mono font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Instruction to Tap to Skip */}
      <div className="absolute bottom-6 z-10 text-[10px] text-slate-500 font-medium tracking-wider uppercase animate-pulse">
        Click or tap anywhere to enter
      </div>
    </div>
  );
}
