"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck } from "lucide-react";

export interface HeroSlide {
  image: string;
  tag: string;
  tagIcon?: React.ReactNode;
  tagColor?: "gold" | "cyan" | "red" | "emerald";
  title: string;
  subtitle: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  metrics?: Array<{
    value: string;
    label: string;
  }>;
}

interface HeroSliderProps {
  slides: HeroSlide[];
  autoPlayInterval?: number;
  heightClass?: string;
  overlayOpacity?: string;
}

export default function HeroSlider({
  slides,
  autoPlayInterval = 5500,
  heightClass = "min-h-[520px] sm:min-h-[580px] lg:min-h-[640px]",
  overlayOpacity = "from-[#0A0E17]/95 via-[#0A0E17]/75 to-[#0A0E17]/40",
}: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;

    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, autoPlayInterval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [current, isPaused, slides.length, autoPlayInterval]);

  const handlePrev = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNext = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[current];

  return (
    <div
      className={`relative w-full overflow-hidden bg-[#0A0E17] text-white flex items-center ${heightClass}`}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Image Carousel"
    >
      {/* Background Slides with Ken Burns / Fade Transition */}
      {slides.map((slide, index) => {
        const isActive = index === current;
        return (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
            }`}
          >
            <div
              className={`relative w-full h-full transform transition-transform duration-[7000ms] ease-out ${
                isActive ? "scale-105" : "scale-100"
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={index === 0}
                className="object-cover object-center"
                sizes="100vw"
              />
            </div>

            {/* Gradient Overlays for Hybrid Glass Contrast */}
            <div className={`absolute inset-0 bg-gradient-to-r ${overlayOpacity}`} />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E17] via-transparent to-transparent opacity-80" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#F9DB5C]/10 via-transparent to-transparent" />
          </div>
        );
      })}

      {/* Slide Content Layer */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 w-full">
        <div className="max-w-3xl space-y-6">
          {/* Tag Pill with Controlled Glassmorphism */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#202020]/90 backdrop-blur-md border border-[#B78D42]/60 text-xs sm:text-sm font-black uppercase tracking-widest shadow-gold animate-fade-in">
            {currentSlide.tagIcon || <ShieldCheck className="w-4 h-4 text-[#22CDE1]" />}
            <span
              className={
                currentSlide.tagColor === "cyan"
                  ? "text-[#22CDE1]"
                  : currentSlide.tagColor === "red"
                  ? "text-red-400"
                  : currentSlide.tagColor === "emerald"
                  ? "text-emerald-400"
                  : "text-[#F9DB5C]"
              }
            >
              {currentSlide.tag}
            </span>
          </div>

          {/* Animated Headline with Responsive Scaling */}
          <h1
            key={`title-${current}`}
            className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.2] transition-all duration-700 transform translate-y-0 opacity-100 drop-shadow-md"
          >
            <span className="block text-[#F2F2F2]">
              {currentSlide.title.includes("•")
                ? currentSlide.title.split("•")[0]
                : currentSlide.title}
            </span>
            {currentSlide.title.includes("•") && (
              <span className="bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] bg-clip-text text-transparent">
                {currentSlide.title.split("•")[1]}
              </span>
            )}
          </h1>

          {/* Subtitle with Clean Responsive Line Spacing */}
          <p
            key={`sub-${current}`}
            className="text-xs sm:text-sm lg:text-base text-slate-200 leading-relaxed font-normal max-w-2xl drop-shadow-sm transition-all duration-700"
          >
            {currentSlide.subtitle}
          </p>

          {/* Call to Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            {currentSlide.primaryCta && (
              <Link
                href={currentSlide.primaryCta.href}
                className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-black text-xs sm:text-sm uppercase tracking-wider shadow-gold transition transform hover:-translate-y-0.5 active:scale-95 border border-[#B78D42]/50 inline-flex items-center gap-2"
              >
                <span>{currentSlide.primaryCta.label}</span>
                <ArrowRight className="w-4 h-4 text-[#202020]" />
              </Link>
            )}

            {currentSlide.secondaryCta && (
              <Link
                href={currentSlide.secondaryCta.href}
                className="px-5 py-3 sm:px-6 sm:py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F2F2F2] font-black text-xs sm:text-sm uppercase tracking-wider backdrop-blur-md border border-white/20 transition hover:-translate-y-0.5 inline-flex items-center gap-2"
              >
                <span>{currentSlide.secondaryCta.label}</span>
              </Link>
            )}
          </div>

          {/* Metrics Row (if present) with Boosted Sizes */}
          {currentSlide.metrics && currentSlide.metrics.length > 0 && (
            <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3.5 max-w-2xl border-t border-white/10 mt-6">
              {currentSlide.metrics.map((metric, i) => (
                <div
                  key={i}
                  className="bg-[#202020]/75 backdrop-blur-md p-3.5 rounded-2xl border border-white/10 shadow-sm"
                >
                  <div className="text-lg sm:text-2xl font-black text-[#F9DB5C]">
                    {metric.value}
                  </div>
                  <div className="text-xs text-slate-300 font-semibold mt-1">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation Arrows (Only if multiple slides) */}
      {slides.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="hidden sm:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-[#202020]/70 hover:bg-[#202020] text-white hover:text-[#F9DB5C] items-center justify-center border border-white/20 hover:border-[#B78D42] backdrop-blur-md shadow-lg transition transform hover:scale-105"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-2xl bg-[#202020]/70 hover:bg-[#202020] text-white hover:text-[#F9DB5C] items-center justify-center border border-white/20 hover:border-[#B78D42] backdrop-blur-md shadow-lg transition transform hover:scale-105"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Bottom Progress Indicators / Dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {slides.map((_, idx) => {
              const isActive = idx === current;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    isActive
                      ? "w-8 sm:w-10 bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] shadow-gold"
                      : "w-2.5 bg-white/40 hover:bg-white/70"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
