"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import VideoModal from "@/components/VideoModal";
import CostEstimator from "@/components/CostEstimator";
import SmartRequirementSurvey from "@/components/SmartRequirementSurvey";
import PlotVsApartmentMatrix from "@/components/PlotVsApartmentMatrix";
import ReviewsAndOffices from "@/components/ReviewsAndOffices";
import ScrollReveal from "@/components/ScrollReveal";
import HomePreloader from "@/components/HomePreloader";
import FlagshipProjectHero from "@/components/FlagshipProjectHero";
import { ParallaxLayer, ParallaxFloatingAccents, useParallax } from "@/components/Parallax";
import {
  Search,
  Building2,
  HardHat,
  ShieldCheck,
  Star,
  ArrowRight,
  Compass,
  Layers,
  BarChart3,
  FileSearch,
  Droplets,
  BookOpen,
  CheckCircle2,
  FileCheck,
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export default function HomePage() {
  const { language, t } = useLanguage();
  const router = useRouter();

  // Search Bar State
  const [activeTab, setActiveTab] = useState<"buy" | "build">("buy");
  const [selectedCity, setSelectedCity] = useState("Tiruchirappalli");
  const [selectedLocality, setSelectedLocality] = useState("All");
  const [selectedPropertyType, setSelectedPropertyType] = useState("All");
  const [selectedBudget, setSelectedBudget] = useState("All");

  // Build a Home Search State
  const [ownPlot, setOwnPlot] = useState<"yes" | "no">("yes");
  const [buildArea, setBuildArea] = useState<string>("1200");
  const [buildFloors, setBuildFloors] = useState<string>("G+1");

  // Properties State
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filterLocality, setFilterLocality] = useState<string>("All");

  // Video Modal State
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  // Hero Background Cycling Slides
  const heroBackgrounds = [
    { src: "/images/hero-villa.jpg", alt: "Architectural Villa Horizon", label: "Luxury Villas" },
    { src: "/images/dtcp-plots.jpg", alt: "DTCP & RERA Gated Plots", label: "Approved Plots" },
    { src: "/images/turnkey-home.jpg", alt: "Turnkey Civil Engineering Construction", label: "Turnkey Homes" },
    { src: "/images/luxury-interior.jpg", alt: "Luxury Contemporary Interiors", label: "Interior Architecture" },
    { src: "/images/drone-walkthrough.jpg", alt: "Aerial Drone Corridor Mapping", label: "Drone Mapping" },
  ];
  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % heroBackgrounds.length);
    }, 5500);
    return () => clearInterval(timer);
  }, [heroBackgrounds.length]);

  // Parallax scroll hooks for Homepage Hero
  const { ref: heroBgParallaxRef } = useParallax({ speed: 0.32, clamp: 140 });
  const { ref: heroContentParallaxRef } = useParallax({ speed: 0.12, clamp: 60 });

  useEffect(() => {
    async function loadProperties() {
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();
        if (data.properties) {
          setProperties(data.properties);
        }
      } catch (err) {
        console.error("Failed to fetch properties:", err);
      } finally {
        setLoading(false);
      }
    }
    loadProperties();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeTab === "build") {
      const estimatorEl = document.getElementById("cost-estimator");
      if (estimatorEl) {
        estimatorEl.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    const params = new URLSearchParams();
    if (selectedCity && selectedCity !== "All") params.set("city", selectedCity);
    if (selectedLocality && selectedLocality !== "All") params.set("locality", selectedLocality);
    if (selectedPropertyType && selectedPropertyType !== "All") params.set("type", selectedPropertyType);
    if (selectedBudget && selectedBudget !== "All") params.set("budget", selectedBudget);

    router.push(`/properties?${params.toString()}`);
  };

  const filteredProperties = properties.filter((p) => {
    if (filterLocality === "All") return true;
    return p.locality.toLowerCase().includes(filterLocality.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* 0. LUXURY BRAND PRELOADER ANIMATION WITH LOGO & VISION • VALUE • MISSION • SUCCESS */}
      <HomePreloader />

      {/* 0.5 PERMANENT FLAGSHIP PROJECT HERO: AUREON BREEZE */}
      <FlagshipProjectHero />

      {/* 1. LUXURY HYBRID GLASS HERO IN CHARCOAL BLACK & BRAND GOLD PALETTE WITH PARALLAX */}
      <section className="relative bg-[#202020] text-[#F2F2F2] pt-10 sm:pt-14 pb-20 sm:pb-28 overflow-hidden border-b border-[#B78D42]/35 parallax-container">
        {/* Full-width cycling architectural backdrop with Parallax scrolling */}
        <div
          ref={heroBgParallaxRef}
          className="absolute -top-16 -bottom-16 inset-x-0 z-0 pointer-events-none overflow-hidden will-change-transform"
        >
          {heroBackgrounds.map((bg, idx) => {
            const isActive = idx === bgIndex;
            return (
              <div
                key={bg.src}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  isActive ? "opacity-35 z-10" : "opacity-0 z-0"
                }`}
              >
                <div
                  className={`relative w-full h-full transform transition-transform duration-[7000ms] ease-out ${
                    isActive ? "scale-105" : "scale-100"
                  }`}
                >
                  <Image
                    src={bg.src}
                    alt={bg.alt}
                    fill
                    className="object-cover object-center"
                    priority={idx === 0}
                  />
                </div>
              </div>
            );
          })}
          {/* Layered Charcoal Black glass gradient overlay for ultra-crisp typography */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#202020]/95 via-[#202020]/80 to-[#202020] z-10" />
        </div>

        {/* Ambient radial gold & turquoise glow circles */}
        <div className="absolute top-10 right-1/4 w-[480px] h-[480px] bg-[#F9DB5C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[480px] h-[480px] bg-[#22CDE1]/10 rounded-full blur-3xl pointer-events-none" />

        <div
          ref={heroContentParallaxRef}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 will-change-transform"
        >
          <div className="text-center max-w-3xl mx-auto space-y-5 mb-8 sm:mb-12">
            {/* Approved Eyebrow Badge in Charcoal & Antique Gold */}
            <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#202020]/90 border border-[#B78D42]/60 text-[#F9DB5C] text-xs sm:text-sm font-black tracking-widest uppercase shadow-md backdrop-blur-md">
              <Compass className="w-4 h-4 text-[#22CDE1]" />
              <span>{t.hero.eyebrow}</span>
            </div>

            {/* Approved Brand Positioning Headline with Primary Gold Gradient */}
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.22] sm:leading-[1.25]">
              <span className="block text-[#F2F2F2] drop-shadow-sm">
                {t.hero.headline.split(".")[0]}.
              </span>
              <span className="bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] bg-clip-text text-transparent drop-shadow-sm">
                {t.hero.headline.split(".")[1] ? `${t.hero.headline.split(".")[1]}.` : ""}
              </span>
            </h2>

            {/* Approved Supporting Description with Spacious Leading */}
            <p className="text-sm sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed sm:leading-loose font-medium">
              {t.hero.supportingDesc}
            </p>

            {/* Primary & Secondary Dual CTAs */}
            <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("featured-properties");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-black text-sm sm:text-base tracking-wide shadow-gold border border-[#B78D42]/60 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4 text-[#202020]" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("cost-estimator");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#202020]/80 hover:bg-[#202020] text-[#F2F2F2] font-bold text-sm sm:text-base border-2 border-[#B78D42]/50 shadow-md backdrop-blur-md transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <HardHat className="w-4 h-4 text-[#F9DB5C]" />
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>

            {/* Visual Subject Carousel Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
              {heroBackgrounds.map((bg, idx) => {
                const isActive = idx === bgIndex;
                return (
                  <button
                    key={bg.src}
                    type="button"
                    onClick={() => setBgIndex(idx)}
                    className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-black uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? "bg-[#F9DB5C] text-[#202020] shadow-gold scale-105 border border-[#B78D42]"
                        : "bg-[#202020]/70 text-slate-300 hover:text-white border border-white/10 hover:border-[#B78D42]/40"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isActive ? "bg-[#202020]" : "bg-[#22CDE1]"
                      }`}
                    />
                    <span>{bg.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* FLOATING CHARCOAL GLASS SEARCH DOCK */}
          <div className="max-w-4xl mx-auto bg-[#252525]/95 backdrop-blur-xl rounded-3xl p-4 sm:p-6 shadow-2xl relative border-2 border-[#B78D42]/45">
            <div className="text-center sm:text-left px-2 pt-1 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#B78D42]/30">
              <span className="text-sm sm:text-base font-extrabold text-[#F2F2F2] tracking-wide flex items-center justify-center sm:justify-start gap-2">
                <Search className="w-4 h-4 text-[#F9DB5C]" />
                <span>{t.hero.searchHeading}</span>
              </span>

              {/* Two Tabs: Buy Property & Build a Home */}
              <div className="inline-flex p-1.5 rounded-2xl bg-[#202020] border border-[#B78D42]/30 self-center sm:self-auto gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("buy")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${activeTab === "buy"
                    ? "bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] shadow-md"
                    : "text-slate-300 hover:text-[#F9DB5C]"
                    }`}
                >
                  <Building2 className="w-4 h-4" />
                  <span>{t.hero.tabBuy}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("build")}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-black transition flex items-center gap-2 ${activeTab === "build"
                    ? "bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] shadow-md"
                    : "text-slate-300 hover:text-[#F9DB5C]"
                    }`}
                >
                  <HardHat className="w-4 h-4" />
                  <span>{t.hero.tabBuild}</span>
                </button>
              </div>
            </div>

            {/* TAB 1: BUY PROPERTY SEARCH FORM */}
            {activeTab === "buy" ? (
              <form onSubmit={handleSearchSubmit} className="pt-4 pb-2 px-1 sm:px-2 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {/* City */}
                  <div>
                    <label htmlFor="search-city" className="block text-[11px] font-bold text-slate-300 mb-1">
                      City / Location
                    </label>
                    <select
                      id="search-city"
                      name="city"
                      aria-label="Select City or Location"
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-[#202020] border border-[#B78D42]/40 rounded-xl px-3 py-2.5 text-xs text-[#F2F2F2] focus:outline-none focus:border-[#F9DB5C] font-semibold shadow-sm"
                    >
                      {COMPANY_INFO.serviceCities.map((city) => (
                        <option key={city.en} value={city.en} className="bg-[#202020] text-[#F2F2F2]">
                          {language === "ta" ? city.ta : city.en} {city.isPrimary ? "(Primary)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Locality */}
                  <div>
                    <label htmlFor="search-locality" className="block text-[11px] font-bold text-slate-300 mb-1">
                      Trichy Locality
                    </label>
                    <select
                      id="search-locality"
                      name="locality"
                      aria-label="Select Trichy Locality"
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                      className="w-full bg-[#202020] border border-[#B78D42]/40 rounded-xl px-3 py-2.5 text-xs text-[#F2F2F2] focus:outline-none focus:border-[#F9DB5C] font-semibold shadow-sm"
                    >
                      <option value="All" className="bg-[#202020] text-[#F2F2F2]">{t.hero.allLocalities}</option>
                      {COMPANY_INFO.trichyLocalities.map((loc) => (
                        <option key={loc.en} value={loc.en} className="bg-[#202020] text-[#F2F2F2]">
                          {language === "ta" ? loc.ta : loc.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label htmlFor="search-property-type" className="block text-[11px] font-bold text-slate-300 mb-1">
                      Property Type
                    </label>
                    <select
                      id="search-property-type"
                      name="propertyType"
                      aria-label="Select Property Type"
                      value={selectedPropertyType}
                      onChange={(e) => setSelectedPropertyType(e.target.value)}
                      className="w-full bg-[#202020] border border-[#B78D42]/40 rounded-xl px-3 py-2.5 text-xs text-[#F2F2F2] focus:outline-none focus:border-[#F9DB5C] font-semibold shadow-sm"
                    >
                      <option value="All" className="bg-[#202020] text-[#F2F2F2]">{t.hero.allPropertyTypes}</option>
                      {COMPANY_INFO.propertyTypes.map((pt) => (
                        <option key={pt.en} value={pt.en} className="bg-[#202020] text-[#F2F2F2]">
                          {language === "ta" ? pt.ta : pt.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label htmlFor="search-budget" className="block text-[11px] font-bold text-slate-300 mb-1">
                      Budget Range
                    </label>
                    <select
                      id="search-budget"
                      name="budget"
                      aria-label="Select Budget Range"
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full bg-[#202020] border border-[#B78D42]/40 rounded-xl px-3 py-2.5 text-xs text-[#F2F2F2] focus:outline-none focus:border-[#F9DB5C] font-semibold shadow-sm"
                    >
                      <option value="All" className="bg-[#202020] text-[#F2F2F2]">{t.hero.anyBudget}</option>
                      <option value="under-25" className="bg-[#202020] text-[#F2F2F2]">{t.hero.budgetUnder25}</option>
                      <option value="25-50" className="bg-[#202020] text-[#F2F2F2]">{t.hero.budget25to50}</option>
                      <option value="50-100" className="bg-[#202020] text-[#F2F2F2]">{t.hero.budget50to1cr}</option>
                      <option value="above-100" className="bg-[#202020] text-[#F2F2F2]">{t.hero.budgetAbove1cr}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] hover:brightness-105 text-[#202020] font-black text-xs uppercase tracking-wider shadow-gold transition flex items-center justify-center gap-2 border border-[#B78D42]/40"
                  >
                    <Search className="w-4 h-4 text-[#202020]" />
                    <span>{t.hero.searchBtn}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* TAB 2: BUILD A HOME INTERACTIVE ESTIMATION DOCK */
              <div className="pt-4 pb-2 px-1 sm:px-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* Own Plot? */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5">
                      {t.hero.ownPlotLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setOwnPlot("yes")}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${ownPlot === "yes"
                          ? "bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] border-[#B78D42] font-black shadow-sm"
                          : "bg-[#202020] text-slate-300 border-[#B78D42]/40 hover:bg-[#2A2A2A]"
                          }`}
                      >
                        {t.hero.ownPlotYes.split(",")[0]}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOwnPlot("no")}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${ownPlot === "no"
                          ? "bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] border-[#B78D42] font-black shadow-sm"
                          : "bg-[#202020] text-slate-300 border-[#B78D42]/40 hover:bg-[#2A2A2A]"
                          }`}
                      >
                        {t.hero.ownPlotNo.split(",")[0]}
                      </button>
                    </div>
                  </div>

                  {/* Built-up Area */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5">
                      {t.hero.areaLabel}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {["800", "1200", "1800"].map((sqft) => (
                        <button
                          key={sqft}
                          type="button"
                          onClick={() => setBuildArea(sqft)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${buildArea === sqft
                            ? "bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] border-[#B78D42] font-black shadow-sm"
                            : "bg-[#202020] text-slate-300 border-[#B78D42]/40 hover:bg-[#2A2A2A]"
                            }`}
                        >
                          {sqft} sqft
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Floors */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-300 mb-1.5">
                      {t.hero.floorsLabel}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {["G", "G+1", "G+2"].map((fl) => (
                        <button
                          key={fl}
                          type="button"
                          onClick={() => setBuildFloors(fl)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${buildFloors === fl
                            ? "bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] border-[#B78D42] font-black shadow-sm"
                            : "bg-[#202020] text-slate-300 border-[#B78D42]/40 hover:bg-[#2A2A2A]"
                            }`}
                        >
                          {fl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-[#B78D42]/30">
                  <div className="text-xs text-slate-300 text-center sm:text-left font-medium">
                    Building (₹2,349) • Interior or Exterior (₹2,599) • Interior &amp; Exterior (₹2,849/sq.ft) under Er. J. Vairavel
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("cost-estimator");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] hover:brightness-105 text-[#202020] font-black text-xs uppercase tracking-wider shadow-gold transition flex items-center justify-center gap-2 border border-[#B78D42]/40"
                  >
                    <span>{t.hero.estimateBtn}</span>
                    <ArrowRight className="w-4 h-4 text-[#202020]" />
                  </button>
                </div>
              </div>
            )}

            {/* Closing Microcopy Inside Dock Footer */}
            <div className="mt-3 pt-2 border-t border-[#B78D42]/30 text-center text-[11px] text-[#F9DB5C]/90 tracking-wide font-semibold">
              {t.hero.closingMicrocopy}
            </div>
          </div>

          {/* VERIFIED TRUST METRICS BAR IN CHARCOAL & BRAND GOLD */}
          <div className="mt-10 pt-6 border-t border-[#B78D42]/35 grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-[#252525]/90 backdrop-blur-md rounded-2xl py-4 shadow-sm border border-[#B78D42]/30">
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-[#F2F2F2]">125K+</div>
              <div className="text-[11px] sm:text-xs text-red-300 font-bold flex items-center justify-center gap-1.5 mt-0.5">
                <Youtube className="w-3.5 h-3.5 text-[#C20E10]" />
                <span>{t.hero.quickStatsYoutube}</span>
              </div>
            </div>

            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-[#F9DB5C]">1,900+</div>
              <div className="text-[11px] sm:text-xs text-[#F6E785] font-bold flex items-center justify-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#F9DB5C]" />
                <span>{t.hero.quickStatsWalkthroughs}</span>
              </div>
            </div>

            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-[#22CDE1]">DTCP & RERA</div>
              <div className="text-[11px] sm:text-xs text-[#22CDE1] font-bold flex items-center justify-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#22CDE1]" />
                <span>{t.hero.quickStatsApproval}</span>
              </div>
            </div>

            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-[#F9DB5C]">4.8★</div>
              <div className="text-[11px] sm:text-xs text-slate-300 font-bold flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-[#F9DB5C] text-[#F9DB5C]" />
                <span>{t.hero.quickStatsGoogle}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5 SIX BUSINESS DIVISIONS IN LUXURY HYBRID GLASS PALETTE WITH PARALLAX ACCENTS */}
      <section className="relative py-14 sm:py-20 bg-[#F2F2F2] border-b border-[#B78D42]/25 overflow-hidden blueprint-grid-bg">
        <ParallaxFloatingAccents variant="gold" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal direction="up">
            <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-[#B78D42]/40 text-[#202020] text-xs sm:text-sm font-black uppercase tracking-wider shadow-sm">
                <Layers className="w-4 h-4 text-[#B78D42]" />
                <span>{t.divisions.eyebrow}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#202020] tracking-tight leading-snug">
                {t.divisions.headline}
              </h2>
              <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-medium">
                {t.divisions.subheadline}
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Division 1: Property Marketplace */}
            <ScrollReveal direction="up" delayMs={0}>
              <div className="h-full group bg-white rounded-3xl overflow-hidden border border-[#B78D42]/30 hover:border-[#B78D42] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover-lift">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src="/images/hero-villa.jpg"
                      alt={t.divisions.d1Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3 bg-[#202020]/95 text-[#F9DB5C] text-xs font-bold px-3 py-1 rounded-xl border border-[#B78D42]/50 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <Building2 className="w-3.5 h-3.5 text-[#F9DB5C]" />
                      <span>Division 01</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black text-[#202020] group-hover:text-[#B78D42] transition">
                      {t.divisions.d1Title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {t.divisions.d1Desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href="/properties"
                    className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#F2F2F2] group-hover:bg-gradient-to-r group-hover:from-[#F6E785] group-hover:to-[#F9DB5C] text-[#202020] font-black text-xs transition border border-[#B78D42]/30 group-hover:border-[#B78D42]"
                  >
                    <span>{t.divisions.d1Cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#202020]" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Division 2: Property Services */}
            <ScrollReveal direction="up" delayMs={80}>
              <div className="h-full group bg-white rounded-3xl overflow-hidden border border-[#B78D42]/30 hover:border-[#B78D42] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover-lift">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src="/images/consulting.jpg"
                      alt={t.divisions.d2Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3 bg-[#202020]/95 text-[#F9DB5C] text-xs font-bold px-3 py-1 rounded-xl border border-[#B78D42]/50 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <FileCheck className="w-3.5 h-3.5 text-[#F9DB5C]" />
                      <span>Division 02</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black text-[#202020] group-hover:text-[#B78D42] transition">
                      {t.divisions.d2Title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {t.divisions.d2Desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href="/services"
                    className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#F2F2F2] group-hover:bg-gradient-to-r group-hover:from-[#F6E785] group-hover:to-[#F9DB5C] text-[#202020] font-black text-xs transition border border-[#B78D42]/30 group-hover:border-[#B78D42]"
                  >
                    <span>{t.divisions.d2Cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#202020]" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Division 3: Construction & Engineering */}
            <ScrollReveal direction="up" delayMs={160}>
              <div className="h-full group bg-white rounded-3xl overflow-hidden border border-[#B78D42]/30 hover:border-[#B78D42] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover-lift">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src="/images/turnkey-home.jpg"
                      alt={t.divisions.d3Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3 bg-[#202020]/95 text-[#F9DB5C] text-xs font-bold px-3 py-1 rounded-xl border border-[#B78D42]/50 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <HardHat className="w-3.5 h-3.5 text-[#F9DB5C]" />
                      <span>Division 03</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black text-[#202020] group-hover:text-[#B78D42] transition">
                      {t.divisions.d3Title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {t.divisions.d3Desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href="/construction"
                    className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#F2F2F2] group-hover:bg-gradient-to-r group-hover:from-[#F6E785] group-hover:to-[#F9DB5C] text-[#202020] font-black text-xs transition border border-[#B78D42]/30 group-hover:border-[#B78D42]"
                  >
                    <span>{t.divisions.d3Cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#202020]" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Division 4: Property Intelligence */}
            <ScrollReveal direction="up" delayMs={240}>
              <div className="h-full group bg-white rounded-3xl overflow-hidden border border-[#B78D42]/30 hover:border-[#B78D42] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover-lift">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src="/images/dtcp-plots.jpg"
                      alt={t.divisions.d4Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3 bg-[#202020]/95 text-[#F9DB5C] text-xs font-bold px-3 py-1 rounded-xl border border-[#B78D42]/50 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <BarChart3 className="w-3.5 h-3.5 text-[#F9DB5C]" />
                      <span>Division 04</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black text-[#202020] group-hover:text-[#B78D42] transition">
                      {t.divisions.d4Title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {t.divisions.d4Desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href="/intelligence"
                    className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#F2F2F2] group-hover:bg-gradient-to-r group-hover:from-[#F6E785] group-hover:to-[#F9DB5C] text-[#202020] font-black text-xs transition border border-[#B78D42]/30 group-hover:border-[#B78D42]"
                  >
                    <span>{t.divisions.d4Cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#202020]" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Division 5: Due Diligence Academy */}
            <ScrollReveal direction="up" delayMs={320}>
              <div className="h-full group bg-white rounded-3xl overflow-hidden border border-[#B78D42]/30 hover:border-[#B78D42] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover-lift">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src="/images/blueprint-audit.jpg"
                      alt={t.divisions.d5Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3 bg-[#202020]/95 text-[#F9DB5C] text-xs font-bold px-3 py-1 rounded-xl border border-[#B78D42]/50 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <BookOpen className="w-3.5 h-3.5 text-[#F9DB5C]" />
                      <span>Division 05</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black text-[#202020] group-hover:text-[#B78D42] transition">
                      {t.divisions.d5Title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {t.divisions.d5Desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href="/academy"
                    className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#F2F2F2] group-hover:bg-gradient-to-r group-hover:from-[#F6E785] group-hover:to-[#F9DB5C] text-[#202020] font-black text-xs transition border border-[#B78D42]/30 group-hover:border-[#B78D42]"
                  >
                    <span>{t.divisions.d5Cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#202020]" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Division 6: Business Solutions */}
            <ScrollReveal direction="up" delayMs={400}>
              <div className="h-full group bg-white rounded-3xl overflow-hidden border border-[#B78D42]/30 hover:border-[#B78D42] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between card-hover-lift">
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
                    <Image
                      src="/images/drone-walkthrough.jpg"
                      alt={t.divisions.d6Title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                    />
                    <div className="absolute top-3 left-3 bg-[#202020]/95 text-[#F9DB5C] text-xs font-bold px-3 py-1 rounded-xl border border-[#B78D42]/50 backdrop-blur-md flex items-center gap-1.5 shadow-md">
                      <Layers className="w-3.5 h-3.5 text-[#F9DB5C]" />
                      <span>Division 06</span>
                    </div>
                  </div>
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-black text-[#202020] group-hover:text-[#B78D42] transition">
                      {t.divisions.d6Title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {t.divisions.d6Desc}
                    </p>
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href="/business-solutions"
                    className="w-full inline-flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#F2F2F2] group-hover:bg-gradient-to-r group-hover:from-[#F6E785] group-hover:to-[#F9DB5C] text-[#202020] font-black text-xs transition border border-[#B78D42]/30 group-hover:border-[#B78D42]"
                  >
                    <span>{t.divisions.d6Cta}</span>
                    <ArrowRight className="w-4 h-4 text-[#202020]" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES GRID WITH PARALLAX ACCENTS */}
      <section id="featured-properties" className="relative py-14 sm:py-20 bg-[#F2F2F2] overflow-hidden">
        <ParallaxFloatingAccents variant="mixed" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header & Locality Filter Chips */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-[#7C5A20] font-black text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#22CDE1] inline-block" />
                <span>Verified Trichy Listings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-[#202020] tracking-tight">
                {t.properties.heading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 mt-1 max-w-xl">
                {t.properties.subheading}
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-black text-[#202020] hover:text-[#B78D42] transition"
            >
              <span>{t.properties.viewAll}</span>
              <ArrowRight className="w-4 h-4 text-[#B78D42]" />
            </Link>
          </div>

          {/* Locality Quick Filters Styled with Brand Palette */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 touch-scroll">
            {["All", "K.K. Nagar", "Olaiyur", "Panjappur", "Vayalur Road", "Karumandapam"].map((loc) => (
              <button
                key={loc}
                onClick={() => setFilterLocality(loc)}
                className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition border ${filterLocality === loc
                  ? "bg-[#202020] text-[#F9DB5C] border-[#B78D42] shadow-gold"
                  : "bg-white text-slate-700 border-slate-200 hover:border-[#22CDE1]"
                  }`}
              >
                {loc}
              </button>
            ))}
          </div>

          {/* Properties Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div key={n} className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
              ))}
            </div>
          ) : filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProperties.slice(0, 6).map((property, idx) => (
                <ScrollReveal key={property.id} direction="up" delayMs={idx * 60}>
                  <PropertyCard
                    property={property}
                    onWatchVideo={(id, title) => setActiveVideo({ id, title })}
                  />
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 px-6 bg-white rounded-3xl border border-[#B78D42]/30 space-y-3">
              <p className="text-slate-700 text-sm font-bold">
                {properties.length === 0
                  ? "No live properties published yet. Add verified listings from the Staff Control Center."
                  : "No properties found matching this locality. Try selecting \"All\"."}
              </p>
              {properties.length === 0 && (
                <div className="flex flex-wrap justify-center gap-3 pt-1">
                  <Link
                    href="/admin"
                    className="px-5 py-2.5 rounded-xl bg-[#202020] text-[#F9DB5C] font-black text-xs border border-[#B78D42]/40 hover:brightness-110 transition"
                  >
                    Staff Portal: Add Property
                  </Link>
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 rounded-xl bg-[#F2F2F2] text-[#202020] font-bold text-xs border border-slate-200 hover:bg-slate-200 transition"
                  >
                    Request Custom Property Match
                  </Link>
                </div>
              )}
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-2xl bg-[#202020] hover:bg-[#2A2A2A] text-[#F9DB5C] font-black text-xs uppercase tracking-wider shadow-gold border border-[#B78D42]/50 transition"
            >
              <span>
                {t.properties.viewAll}
                {properties.length > 0 ? ` (${properties.length} Live Listings)` : ""}
              </span>
              <ArrowRight className="w-4 h-4 text-[#22CDE1]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2.5 LAND INTELLIGENCE & ADVISORY DOSSIERS */}
      <section className="py-14 sm:py-18 bg-white text-[#202020] border-y border-[#B78D42]/25 relative overflow-hidden blueprint-grid-bg">
        <ParallaxFloatingAccents variant="turquoise" />
        <div className="absolute top-0 right-10 w-96 h-96 bg-[#F9DB5C]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2F2F2] border border-[#B78D42]/40 text-[#202020] text-xs font-bold uppercase tracking-wider shadow-sm">
                <BarChart3 className="w-3.5 h-3.5 text-[#22CDE1]" />
                <span>Civil Engineering Due Diligence & Market Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#202020]">
                Verify Before You Buy: <span className="text-[#B78D42]">Legal, Water & SRO Comps</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-medium">
                Led by <strong>Er. J. Vairavel</strong>. High Court advocate title investigation,
                physical groundwater/soil tests, and micro-market guideline value benchmarking across Trichy.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/intelligence"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] hover:brightness-105 text-[#202020] font-black text-xs transition shadow-gold border border-[#B78D42]/40"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Explore SRO Comps</span>
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-[#B78D42]/40 text-slate-800 font-bold text-xs hover:bg-slate-50 transition shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-[#22CDE1]" />
                <span>Due Diligence Guide</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-[#F2F2F2] p-6 rounded-3xl border border-[#B78D42]/30 hover:border-[#B78D42] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-white rounded-xl border border-[#B78D42]/30 text-[#B78D42]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black text-[#202020] bg-white px-2.5 py-0.5 rounded-lg border border-[#B78D42]/40">
                    Custom Quotation
                  </span>
                </div>
                <h3 className="font-bold text-[#202020] text-base group-hover:text-[#B78D42] transition">
                  30-Year Advocate Title Opinion
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scrutiny of original parent deeds, Patta/Chitta transfers, continuous EC from 1975, and civil court dispute checks by High Court advocates.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#B78D42]/20">
                <Link
                  href="/services/online-legal-opinion"
                  className="text-[#202020] hover:text-[#B78D42] text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>View Legal Scope</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B78D42]" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-[#F2F2F2] p-6 rounded-3xl border border-[#B78D42]/30 hover:border-[#B78D42] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-white rounded-xl border border-[#B78D42]/30 text-[#22CDE1]">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black text-[#202020] bg-white px-2.5 py-0.5 rounded-lg border border-[#B78D42]/40">
                    Custom Quotation
                  </span>
                </div>
                <h3 className="font-bold text-[#202020] text-base group-hover:text-[#B78D42] transition">
                  On-Site Technical & Water Audit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Physical inspection of survey stones, approach road width, groundwater aquifer depth, potable water TDS test, and foundation bearing test.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#B78D42]/20">
                <Link
                  href="/services/onsite-infrastructure-valuation"
                  className="text-[#202020] hover:text-[#B78D42] text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>Book Site Audit</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B78D42]" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#F2F2F2] p-6 rounded-3xl border border-[#B78D42]/30 hover:border-[#B78D42] hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-white rounded-xl border border-[#B78D42]/30 text-[#B78D42]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black text-[#202020] bg-white px-2.5 py-0.5 rounded-lg border border-[#B78D42]/40">
                    8 Trichy Corridors
                  </span>
                </div>
                <h3 className="font-bold text-[#202020] text-base group-hover:text-[#B78D42] transition">
                  SRO Guideline vs Market Comps
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Live data tables comparing government guideline rates vs actual transacted market values, 3-year appreciation rates, and Panjappur/Ring Road impact.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-[#B78D42]/20">
                <Link
                  href="/intelligence"
                  className="text-[#202020] hover:text-[#B78D42] text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>View Corridor Table</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#B78D42]" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE TURNKEY CONSTRUCTION COST ESTIMATOR */}
      <ScrollReveal direction="up">
        <CostEstimator />
      </ScrollReveal>

      {/* 4. SMART REQUIREMENT CAPTURE (SURVEYHEART REPLACEMENT) */}
      <ScrollReveal direction="up">
        <SmartRequirementSurvey />
      </ScrollReveal>

      {/* 4.5 PLOTTED LAND VS APARTMENT COMPARATIVE MATRIX */}
      <ScrollReveal direction="up">
        <PlotVsApartmentMatrix />
      </ScrollReveal>

      {/* 5. PROMOTE WITH US (B2B CREATOR & PROMOTER STUDIO) */}
      <ScrollReveal direction="up">
        <section className="py-14 sm:py-18 bg-[#F2F2F2] relative overflow-hidden border-y border-[#B78D42]/25">
          {/* Real Estate Media Production Studio Image Backdrop */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Image
              src="/images/youtube-production.jpg"
              alt="YouTube Media Production Studio"
              fill
              className="object-cover object-center opacity-15"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-[#F2F2F2]" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 border-2 border-[#B78D42]/30 shadow-xl">
              <div className="space-y-3 text-center lg:text-left max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#C20E10]/10 text-[#C20E10] text-xs font-black uppercase tracking-wider border border-[#C20E10]/30">
                  <Youtube className="w-4 h-4 fill-[#C20E10] text-[#C20E10]" />
                  <span>YouTube Creator Network • 125K+ Subscribers</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#202020] leading-snug tracking-tight">
                  {t.promote.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
                  {t.promote.subtitle}
                </p>
              </div>

            <div className="flex-shrink-0">
              <Link
                href="/promote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-black text-xs uppercase tracking-wider shadow-gold transition transform hover:scale-105 active:scale-95 border border-[#B78D42]/50"
              >
                <span>{t.promote.ctaButton}</span>
                <ArrowRight className="w-4 h-4 text-[#202020]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      </ScrollReveal>

      {/* 5.5 INTEGRATED ENQUIRY & CONSULTATION CALLOUT */}
      <ScrollReveal direction="up">
        <section className="py-12 bg-white border-b border-[#B78D42]/25">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#202020] via-[#2A2A2A] to-[#202020] text-white p-8 sm:p-12 rounded-3xl border-2 border-[#B78D42]/50 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#F9DB5C]/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-3 text-center lg:text-left max-w-2xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-[#F9DB5C] text-xs font-bold uppercase tracking-wider border border-[#B78D42]/40">
                  <Building2 className="w-3.5 h-3.5 text-[#22CDE1]" />
                  <span>Custom Quotation & Engineering Advisory</span>
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-snug">
                  {language === "ta"
                    ? "நிலம் வாங்க அல்லது வீடு கட்ட திட்டமிடுகிறீர்களா?"
                    : "Ready to Make Confident Property Decisions?"}
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  {language === "ta"
                    ? "சட்ட ஆய்வு, நேரடி மண்/நீர் சோதனை அல்லது டர்ன்கீ வீடு கட்டுதல் குறித்த விரிவான ஆலோசனைக்கு Er. J. வைரவேல் மற்றும் எங்கள் பொறியியல் குழுவை தொடர்பு கொள்ளுங்கள்."
                    : "From 30-year deed forensics to turnkey construction and business growth solutions, connect directly with Er. J. Vairavel's engineering team for custom scoped quotations."}
                </p>
              </div>

              <div className="flex-shrink-0 flex flex-wrap items-center justify-center gap-3 relative z-10">
                <Link
                  href="/contact"
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-extrabold text-xs uppercase tracking-wider shadow-gold transition transform hover:-translate-y-0.5 border border-[#B78D42]/50"
                >
                  {language === "ta" ? "நேரடி ஆலோசனை முன்பதிவு" : "Schedule Consultation"}
                </Link>
                <Link
                  href="/services"
                  className="px-6 py-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#F2F2F2] font-bold text-xs uppercase tracking-wider border border-white/20 transition"
                >
                  {language === "ta" ? "11 சேவைகளைக் காண்க" : "View 11 Services"}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </ScrollReveal>

      {/* 6. REVIEWS & DUAL-OFFICE LOCATION SECTION */}
      <ScrollReveal direction="up">
        <ReviewsAndOffices />
      </ScrollReveal>

      {/* Interactive YouTube Walkthrough Video Modal */}
      {activeVideo && (
        <VideoModal
          isOpen={Boolean(activeVideo)}
          onClose={() => setActiveVideo(null)}
          videoId={activeVideo.id}
          title={activeVideo.title}
        />
      )}
    </div>
  );
}
