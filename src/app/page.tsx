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
import ReviewsAndOffices from "@/components/ReviewsAndOffices";
import {
  Search,
  Building2,
  HardHat,
  ShieldCheck,
  Star,
  ArrowRight,
  Sparkles,
  BarChart3,
  FileSearch,
  Droplets,
  BookOpen,
  CheckCircle2,
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
      {/* 1. LUXURY WHITE & GOLDEN HERO WITH IMMERSIVE ARCHITECTURAL BACKDROP */}
      <section className="relative bg-gradient-to-b from-[#FDFBF7] via-white to-[#FDFBF7] text-slate-900 pt-10 sm:pt-14 pb-20 sm:pb-28 overflow-hidden border-b border-amber-200/80">
        {/* Full-width architectural backdrop using locally generated 16:9 Villa Image */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/hero-villa.jpg"
            alt="Veedu Veettumanai Santhai Architectural Horizon"
            fill
            className="object-cover object-center opacity-25 scale-105"
            priority
          />
          {/* Layered White & Champagne glass gradient overlay for ultra-crisp typography */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/85 to-[#FDFBF7]" />
        </div>

        {/* Ambient radial gold glow circles */}
        <div className="absolute top-10 right-1/4 w-[480px] h-[480px] bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-[480px] h-[480px] bg-yellow-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto space-y-4 mb-8 sm:mb-12">
            {/* Approved Eyebrow Badge in White & Gold */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300 text-amber-900 text-xs font-black tracking-widest uppercase shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>{t.hero.eyebrow}</span>
            </div>

            {/* Approved Brand Positioning Headline in White & Gold */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12]">
              <span className="block text-slate-900 drop-shadow-sm">
                {t.hero.headline.split(".")[0]}.
              </span>
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-600 bg-clip-text text-transparent drop-shadow-sm">
                {t.hero.headline.split(".")[1] ? `${t.hero.headline.split(".")[1]}.` : ""}
              </span>
            </h1>

            {/* Approved Supporting Description */}
            <p className="text-xs sm:text-base text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
              {t.hero.supportingDesc}
            </p>

            {/* Primary & Secondary Dual CTAs */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("featured-properties");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm tracking-wide shadow-lg shadow-amber-600/30 border border-amber-400/40 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>{t.hero.primaryCta}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  const el = document.getElementById("cost-estimator");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/90 hover:bg-white text-slate-800 font-bold text-xs sm:text-sm border-2 border-amber-400/60 shadow-md backdrop-blur-md transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <HardHat className="w-4 h-4 text-amber-600" />
                <span>{t.hero.secondaryCta}</span>
              </button>
            </div>
          </div>

          {/* FLOATING WHITE & GOLD GLASS SEARCH DOCK */}
          <div className="max-w-4xl mx-auto glass-gold-light rounded-3xl p-3 sm:p-5 shadow-2xl relative border-2 border-amber-200/90">
            <div className="text-center sm:text-left px-2 pt-1 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-200/60">
              <span className="text-xs sm:text-sm font-extrabold text-slate-900 tracking-wide flex items-center justify-center sm:justify-start gap-2">
                <Search className="w-4 h-4 text-amber-600" />
                <span>{t.hero.searchHeading}</span>
              </span>

              {/* Two Tabs: Buy Property & Build a Home */}
              <div className="inline-flex p-1 rounded-2xl bg-amber-50 border border-amber-200 self-center sm:self-auto">
                <button
                  type="button"
                  onClick={() => setActiveTab("buy")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                    activeTab === "buy"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-600/30"
                      : "text-slate-600 hover:text-amber-800"
                  }`}
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>{t.hero.tabBuy}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab("build")}
                  className={`px-4 py-2 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                    activeTab === "build"
                      ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-600/30"
                      : "text-slate-600 hover:text-amber-800"
                  }`}
                >
                  <HardHat className="w-3.5 h-3.5" />
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
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      City / Location
                    </label>
                    <select
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold shadow-sm"
                    >
                      {COMPANY_INFO.serviceCities.map((city) => (
                        <option key={city.en} value={city.en}>
                          {language === "ta" ? city.ta : city.en} {city.isPrimary ? "(Primary)" : ""}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Locality */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Trichy Locality
                    </label>
                    <select
                      value={selectedLocality}
                      onChange={(e) => setSelectedLocality(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold shadow-sm"
                    >
                      <option value="All">{t.hero.allLocalities}</option>
                      {COMPANY_INFO.trichyLocalities.map((loc) => (
                        <option key={loc.en} value={loc.en}>
                          {language === "ta" ? loc.ta : loc.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Property Type
                    </label>
                    <select
                      value={selectedPropertyType}
                      onChange={(e) => setSelectedPropertyType(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold shadow-sm"
                    >
                      <option value="All">{t.hero.allPropertyTypes}</option>
                      {COMPANY_INFO.propertyTypes.map((pt) => (
                        <option key={pt.en} value={pt.en}>
                          {language === "ta" ? pt.ta : pt.en}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Budget Range
                    </label>
                    <select
                      value={selectedBudget}
                      onChange={(e) => setSelectedBudget(e.target.value)}
                      className="w-full bg-white border border-amber-200 rounded-xl px-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold shadow-sm"
                    >
                      <option value="All">{t.hero.anyBudget}</option>
                      <option value="under-25">{t.hero.budgetUnder25}</option>
                      <option value="25-50">{t.hero.budget25to50}</option>
                      <option value="50-100">{t.hero.budget50to1cr}</option>
                      <option value="above-100">{t.hero.budgetAbove1cr}</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wider shadow-gold transition flex items-center justify-center gap-2"
                  >
                    <Search className="w-4 h-4" />
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
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      {t.hero.ownPlotLabel}
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setOwnPlot("yes")}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${
                          ownPlot === "yes"
                            ? "bg-amber-500 text-white border-amber-500 font-black shadow-sm"
                            : "bg-white text-slate-700 border-amber-200 hover:bg-amber-50"
                        }`}
                      >
                        {t.hero.ownPlotYes.split(",")[0]}
                      </button>
                      <button
                        type="button"
                        onClick={() => setOwnPlot("no")}
                        className={`py-2 px-2 rounded-xl text-xs font-bold transition border ${
                          ownPlot === "no"
                            ? "bg-amber-500 text-white border-amber-500 font-black shadow-sm"
                            : "bg-white text-slate-700 border-amber-200 hover:bg-amber-50"
                        }`}
                      >
                        {t.hero.ownPlotNo.split(",")[0]}
                      </button>
                    </div>
                  </div>

                  {/* Built-up Area */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      {t.hero.areaLabel}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {["800", "1200", "1800"].map((sqft) => (
                        <button
                          key={sqft}
                          type="button"
                          onClick={() => setBuildArea(sqft)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                            buildArea === sqft
                              ? "bg-amber-500 text-white border-amber-500 font-black shadow-sm"
                              : "bg-white text-slate-700 border-amber-200 hover:bg-amber-50"
                          }`}
                        >
                          {sqft} sqft
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Floors */}
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1.5">
                      {t.hero.floorsLabel}
                    </label>
                    <div className="flex items-center gap-1.5">
                      {["G", "G+1", "G+2"].map((fl) => (
                        <button
                          key={fl}
                          type="button"
                          onClick={() => setBuildFloors(fl)}
                          className={`flex-1 py-2 rounded-xl text-xs font-bold transition border ${
                            buildFloors === fl
                              ? "bg-amber-500 text-white border-amber-500 font-black shadow-sm"
                              : "bg-white text-slate-700 border-amber-200 hover:bg-amber-50"
                          }`}
                        >
                          {fl}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-amber-200/60">
                  <div className="text-xs text-slate-600 text-center sm:text-left font-medium">
                    Basic (₹1,950) • Standard (₹2,250) • Premium (₹2,650/sq.ft) under Er. J. Vairavel
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("cost-estimator");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="w-full sm:w-auto py-2.5 px-6 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wider shadow-gold transition flex items-center justify-center gap-2"
                  >
                    <span>{t.hero.estimateBtn}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* Closing Microcopy Inside Dock Footer */}
            <div className="mt-3 pt-2 border-t border-amber-200/60 text-center text-[11px] text-amber-900/80 tracking-wide font-semibold">
              {t.hero.closingMicrocopy}
            </div>
          </div>

          {/* VERIFIED TRUST METRICS BAR IN WHITE & GOLD */}
          <div className="mt-10 pt-6 border-t border-amber-200/70 grid grid-cols-2 md:grid-cols-4 gap-4 text-center bg-white/75 backdrop-blur-md rounded-2xl py-4 shadow-sm border border-amber-100">
            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-slate-900">125K+</div>
              <div className="text-[11px] sm:text-xs text-red-700 font-bold flex items-center justify-center gap-1.5 mt-0.5">
                <Youtube className="w-3.5 h-3.5 text-red-600" />
                <span>{t.hero.quickStatsYoutube}</span>
              </div>
            </div>

            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-amber-600">1,900+</div>
              <div className="text-[11px] sm:text-xs text-amber-800 font-bold flex items-center justify-center gap-1 mt-0.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>{t.hero.quickStatsWalkthroughs}</span>
              </div>
            </div>

            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-emerald-800">DTCP & RERA</div>
              <div className="text-[11px] sm:text-xs text-emerald-700 font-bold flex items-center justify-center gap-1 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{t.hero.quickStatsApproval}</span>
              </div>
            </div>

            <div className="p-2">
              <div className="text-xl sm:text-2xl font-black text-amber-600">4.8★</div>
              <div className="text-[11px] sm:text-xs text-slate-800 font-bold flex items-center justify-center gap-1 mt-0.5">
                <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                <span>{t.hero.quickStatsGoogle}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROPERTIES GRID */}
      <section id="featured-properties" className="py-14 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header & Locality Filter Chips */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <div className="text-gold-600 font-black text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />
                <span>Verified Trichy Listings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-brand-black tracking-tight">
                {t.properties.heading}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-xl">
                {t.properties.subheading}
              </p>
            </div>

            <Link
              href="/properties"
              className="inline-flex items-center gap-1.5 text-xs font-black text-cyan-700 hover:text-gold-600 transition"
            >
              <span>{t.properties.viewAll}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Locality Quick Filters Styled with Logo Theme */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 touch-scroll">
            {["All", "K.K. Nagar", "Olaiyur", "Panjappur", "Vayalur Road", "Karumandapam"].map((loc) => (
              <button
                key={loc}
                onClick={() => setFilterLocality(loc)}
                className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition border ${filterLocality === loc
                  ? "bg-brand-black text-gold-400 border-gold-500 shadow-gold"
                  : "bg-white text-slate-700 border-slate-200 hover:border-cyan-400"
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
              {filteredProperties.slice(0, 6).map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  onWatchVideo={(id, title) => setActiveVideo({ id, title })}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-3xl border border-slate-200">
              <p className="text-slate-500 text-sm">
                No properties found matching this locality. Try selecting &quot;All&quot;.
              </p>
            </div>
          )}

          <div className="mt-10 text-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center gap-2 py-3.5 px-8 rounded-2xl bg-brand-black hover:bg-slate-900 text-gold-400 font-black text-xs uppercase tracking-wider shadow-gold border border-gold-500/40 transition"
            >
              <span>{t.properties.viewAll} (8 Trichy Listings)</span>
              <ArrowRight className="w-4 h-4 text-cyan-400" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2.5 LAND INTELLIGENCE & ADVISORY DOSSIERS IN WHITE & GOLD */}
      <section className="py-14 sm:py-18 bg-[#FDFBF7] text-slate-900 border-y border-amber-200/80 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-amber-300 text-amber-900 text-xs font-bold uppercase tracking-wider shadow-sm">
                <BarChart3 className="w-3.5 h-3.5 text-amber-600" />
                <span>Civil Engineering Due Diligence & Market Intelligence</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900">
                Verify Before You Buy: <span className="text-amber-600">Legal, Water & SRO Comps</span>
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm max-w-2xl font-medium">
                Led by <strong>Er. J. Vairavel</strong>. High Court advocate title investigation,
                physical groundwater/soil tests, and micro-market guideline value benchmarking across Trichy.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/intelligence"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs transition shadow-gold"
              >
                <BarChart3 className="w-4 h-4" />
                <span>Explore SRO Comps</span>
              </Link>
              <Link
                href="/academy"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-amber-300 text-slate-800 font-bold text-xs hover:bg-amber-50 transition shadow-sm"
              >
                <BookOpen className="w-4 h-4 text-amber-600" />
                <span>Due Diligence Guide</span>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white p-6 rounded-3xl border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-300">
                    ₹4,999 Only
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition">
                  30-Year Advocate Title Opinion
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Scrutiny of original parent deeds, Patta/Chitta transfers, continuous EC from 1975, and civil court dispute checks by High Court advocates.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-amber-100">
                <Link
                  href="/services/online-legal-opinion"
                  className="text-amber-700 hover:text-amber-800 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>View Legal Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white p-6 rounded-3xl border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-600">
                    <Droplets className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-300">
                    ₹3,999 Audit
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition">
                  On-Site Technical & Water Audit
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Physical inspection of survey stones, approach road width, groundwater aquifer depth, potable water TDS test, and foundation bearing test.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-amber-100">
                <Link
                  href="/services/onsite-infrastructure-valuation"
                  className="text-amber-700 hover:text-amber-800 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>Book Site Audit</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white p-6 rounded-3xl border border-amber-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group shadow-sm">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-600">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <span className="text-[11px] font-black text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-lg border border-amber-300">
                    8 Trichy Corridors
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-amber-700 transition">
                  SRO Guideline vs Market Comps
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Live data tables comparing government guideline rates vs actual transacted market values, 3-year appreciation rates, and Panjappur/Ring Road impact.
                </p>
              </div>
              <div className="pt-4 mt-4 border-t border-amber-100">
                <Link
                  href="/intelligence"
                  className="text-amber-700 hover:text-amber-800 text-xs font-bold flex items-center gap-1.5 transition"
                >
                  <span>View Corridor Table</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. INTERACTIVE TURNKEY CONSTRUCTION COST ESTIMATOR */}
      <CostEstimator />

      {/* 4. SMART REQUIREMENT CAPTURE (SURVEYHEART REPLACEMENT) */}
      <SmartRequirementSurvey />

      {/* 5. PROMOTE WITH US (B2B CREATOR & PROMOTER STUDIO) IN WHITE & GOLD */}
      <section className="py-14 sm:py-18 bg-gradient-to-b from-[#FDFBF7] to-white relative overflow-hidden border-y border-amber-200/80">
        {/* Real Estate Media Production Studio Image Backdrop */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <Image
            src="/images/youtube-production.jpg"
            alt="YouTube Media Production Studio"
            fill
            className="object-cover object-center opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/85 to-[#FDFBF7]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-white/95 backdrop-blur-xl p-8 sm:p-12 rounded-3xl flex flex-col lg:flex-row items-center justify-between gap-8 border-2 border-amber-200/90 shadow-xl">
            <div className="space-y-3 text-center lg:text-left max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-black uppercase tracking-wider border border-red-200">
                <Youtube className="w-4 h-4 fill-red-600 text-red-600" />
                <span>YouTube Creator Network • 125K+ Subscribers</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 leading-tight">
                {t.promote.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                {t.promote.subtitle}
              </p>
            </div>

            <div className="flex-shrink-0">
              <Link
                href="/promote"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wider shadow-gold transition transform hover:scale-105 active:scale-95 border border-amber-400"
              >
                <span>{t.promote.ctaButton}</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. REVIEWS & DUAL-OFFICE LOCATION SECTION */}
      <ReviewsAndOffices />

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
