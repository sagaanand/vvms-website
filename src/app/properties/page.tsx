"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import PropertyCard, { PropertyData } from "@/components/PropertyCard";
import VideoModal from "@/components/VideoModal";
import SafePurchaseStandard from "@/components/SafePurchaseStandard";
import PlotVsApartmentMatrix from "@/components/PlotVsApartmentMatrix";
import HeroSlider, { HeroSlide } from "@/components/HeroSlider";
import ScrollReveal from "@/components/ScrollReveal";
import { ParallaxFloatingAccents } from "@/components/Parallax";
import Link from "next/link";
import {
  Search,
  RotateCcw,
  Building2,
  ArrowUpDown,
  ShieldCheck,
  Sparkles,
  PlusCircle,
} from "lucide-react";

function PropertiesDirectoryContent() {
  const { language, t } = useLanguage();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLocality, setSelectedLocality] = useState(searchParams.get("locality") || "All");
  const [selectedType, setSelectedType] = useState(searchParams.get("type") || "All");
  const [selectedBudget, setSelectedBudget] = useState(searchParams.get("budget") || "All");
  const [sortBy, setSortBy] = useState("newest");

  // Video Modal State
  const [activeVideo, setActiveVideo] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    async function fetchProperties() {
      setLoading(true);
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();
        if (data.properties) {
          setProperties(data.properties);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchProperties();
  }, []);

  // Filter & Sort Logic
  const filteredProperties = properties
    .filter((p) => {
      // Search term
      if (searchTerm) {
        const query = searchTerm.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(query);
        const matchLoc = p.locality.toLowerCase().includes(query);
        const matchId = p.propertyId.toLowerCase().includes(query);
        if (!matchTitle && !matchLoc && !matchId) return false;
      }
      // Locality
      if (selectedLocality !== "All" && p.locality !== selectedLocality) return false;
      // Property Type
      if (selectedType !== "All" && p.propertyType !== selectedType) return false;
      // Budget
      if (selectedBudget === "under-25" && p.price > 2500000) return false;
      if (selectedBudget === "25-50" && (p.price < 2500000 || p.price > 5000000)) return false;
      if (selectedBudget === "50-100" && (p.price < 5000000 || p.price > 10000000)) return false;
      if (selectedBudget === "above-100" && p.price < 10000000) return false;

      return true;
    })
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "downpayment") {
        return (a.downPayment || 99999999) - (b.downPayment || 99999999);
      }
      return new Date(b.id).getTime() - new Date(a.id).getTime();
    });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocality("All");
    setSelectedType("All");
    setSelectedBudget("All");
    setSortBy("newest");
    router.push("/properties");
  };

  const propertyHeroSlides: HeroSlide[] = [
    {
      image: "/images/dtcp-plots.jpg",
      tag: "100% DTCP & RERA APPROVED PLOTS",
      tagColor: "gold",
      title: "Verified Plots in Tiruchirappalli • Legal Safety Guaranteed",
      subtitle:
        "Every plot features individual Thani Patta, 33ft blacktop tar roads, OSR park gift deeds, and pre-approved 80% SBI bank loans.",
      metrics: [
        { value: "100%", label: "Legally Vetted" },
        { value: "0%", label: "Buyer Brokerage" },
        { value: "80%", label: "SBI Loan Support" },
        { value: "33 Ft", label: "Tar Roads" },
      ],
    },
    {
      image: "/images/hero-villa.jpg",
      tag: "INDEPENDENT LUXURY VILLAS",
      tagColor: "cyan",
      title: "Custom Homes & Gated Communities • Prime Trichy Corridors",
      subtitle:
        "Vasthu-aligned G+1 & G+2 villas in K.K. Nagar, Olaiyur Ring Road, and Panjappur with sweet potable groundwater.",
      metrics: [
        { value: "G+1 / G+2", label: "Custom Architecture" },
        { value: "10 Yrs", label: "Structural Warranty" },
        { value: "100%", label: "Vasthu Compliant" },
        { value: "TDS <300", label: "Sweet Water" },
      ],
    },
    {
      image: "/images/blueprint-audit.jpg",
      tag: "0% BUYER COMMISSION",
      tagColor: "emerald",
      title: "Direct Transparent Pricing • No Hidden Broker Cuts",
      subtitle:
        "All parent deeds, revenue sketches, and survey subdivisions scrutinized on-camera and in person by Er. J. Vairavel.",
      metrics: [
        { value: "30 Yrs", label: "EC Scrutiny" },
        { value: "₹0", label: "Hidden Fees" },
        { value: "4K", label: "Video Proof" },
        { value: "7 Days", label: "Office Support" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden blueprint-grid-bg">
      <ParallaxFloatingAccents variant="mixed" />

      {/* Hero Visual Slider with Built-in Parallax */}
      <HeroSlider
        slides={propertyHeroSlides}
        heightClass="min-h-[480px] sm:min-h-[520px] lg:min-h-[560px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Verified Property Marketplace Header & Trust Strip */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white rounded-3xl p-5 sm:p-6 border border-[#B78D42]/30 shadow-sm">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-black uppercase tracking-wider text-cyan-800 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-cyan-600" />
              <span>VVMS Verified Property Marketplace</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#202020] tracking-tight">
              {language === "ta"
                ? "திருச்சி சரிபார்க்கப்பட்ட சொத்து சந்தை"
                : "Tiruchirappalli Verified Property Marketplace"}
            </h1>
            <p className="text-xs text-slate-600 mt-1">
              {language === "ta"
                ? "Er. J. வைரவேல் அவர்களால் சட்டப்பூர்வமாக சரிபார்க்கப்பட்ட DTCP & RERA சொத்துகள்."
                : "100% legally scrutinized DTCP/RERA plots, individual homes & villas with 0% buyer brokerage."}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-[11px] font-bold">
            <span className="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              30-Yr Legal Audit
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200">
              80% Bank Loan Ready
            </span>
            <span className="px-3 py-1.5 rounded-xl bg-cyan-50 text-cyan-900 border border-cyan-200">
              0% Buyer Commission
            </span>
          </div>
        </div>

        {/* Quick Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 touch-scroll">
          {["All", "DTCP Plots", "Individual Houses", "Duplex Villas", "Commercial"].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-full text-xs font-black whitespace-nowrap transition border ${
                selectedType === type
                  ? "bg-[#202020] text-[#F9DB5C] border-[#B78D42] shadow-gold"
                  : "bg-white text-slate-700 border-slate-200 hover:border-[#22CDE1]"
              }`}
            >
              {type === "All" ? "All Properties" : type}
            </button>
          ))}
        </div>

        {/* Search & Filter Toolbar with Gold Trim */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 border-2 border-gold-400/40 shadow-sm mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Search Input */}
            <div className="lg:col-span-2 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by ID (VVS-TRY-101), K.K. Nagar, Villa..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
              />
            </div>

            {/* Locality Dropdown */}
            <div>
              <select
                value={selectedLocality}
                onChange={(e) => setSelectedLocality(e.target.value)}
                className="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-gold-500 font-medium"
              >
                <option value="All">All Localities</option>
                {COMPANY_INFO.trichyLocalities.map((loc) => (
                  <option key={loc.en} value={loc.en}>
                    {language === "ta" ? loc.ta : loc.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Property Type Dropdown */}
            <div>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-gold-500 font-medium"
              >
                <option value="All">All Types</option>
                {COMPANY_INFO.propertyTypes.map((pt) => (
                  <option key={pt.en} value={pt.en}>
                    {language === "ta" ? pt.ta : pt.en}
                  </option>
                ))}
              </select>
            </div>

            {/* Budget Dropdown */}
            <div>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                className="w-full py-2.5 px-3 rounded-2xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-gold-500 font-medium"
              >
                <option value="All">All Budgets</option>
                <option value="under-25">Under ₹25 Lakhs</option>
                <option value="25-50">₹25L – ₹50 Lakhs</option>
                <option value="50-100">₹50L – ₹1 Crore</option>
                <option value="above-100">Above ₹1 Crore</option>
              </select>
            </div>
          </div>

          {/* Sub Toolbar: Results Count, Sort By & Reset */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100 text-xs text-slate-500">
            <div className="font-bold text-slate-700">
              Showing <span className="text-brand-black font-black">{filteredProperties.length}</span> properties
            </div>

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-cyan-600" />
                <span className="text-slate-500 font-bold">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-black text-brand-black focus:outline-none cursor-pointer"
                >
                  <option value="newest">{t.properties.sortNewest}</option>
                  <option value="price-asc">{t.properties.sortPriceAsc}</option>
                  <option value="price-desc">{t.properties.sortPriceDesc}</option>
                  <option value="downpayment">Low Downpayment First</option>
                </select>
              </div>

              <button
                onClick={resetFilters}
                className="flex items-center gap-1 text-slate-500 hover:text-red-600 transition font-bold"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{t.properties.resetFilters}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Properties Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-96 rounded-3xl bg-slate-200 animate-pulse" />
            ))}
          </div>
        ) : filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredProperties.map((property, idx) => (
              <ScrollReveal key={property.id} direction="up" delayMs={(idx % 6) * 60}>
                <PropertyCard
                  property={property}
                  onWatchVideo={(id, title) => setActiveVideo({ id, title })}
                />
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 space-y-4">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto" />
            <h3 className="text-base font-black text-slate-800">
              {properties.length === 0
                ? "No properties published in the marketplace yet"
                : "No matching properties found"}
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
              {properties.length === 0
                ? "New verified Trichy properties can be added anytime from the Staff Control Center, or you can request a custom property match from Er. J. Vairavel."
                : "Try adjusting your filters or search terms. You can also submit your custom requirement to our team."}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
              {properties.length > 0 && (
                <button
                  onClick={resetFilters}
                  className="px-4 py-2.5 rounded-2xl bg-gold-500 text-brand-black font-black text-xs shadow-gold"
                >
                  Reset All Filters
                </button>
              )}
              <Link
                href="/contact"
                className="px-5 py-2.5 rounded-2xl bg-[#202020] text-[#F9DB5C] font-black text-xs border border-[#B78D42]/40 hover:brightness-110 transition"
              >
                Request Custom Property Match
              </Link>
              <Link
                href="/admin"
                className="px-4 py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs inline-flex items-center gap-1.5 transition"
              >
                <PlusCircle className="w-3.5 h-3.5 text-cyan-700" />
                <span>Staff Portal: Add Property</span>
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Safe Land Acquisition Standard (VVMS vs Unverified Brokers) */}
      <ScrollReveal direction="up">
        <div className="mt-16">
          <SafePurchaseStandard />
        </div>
      </ScrollReveal>

      {/* Plotted Land vs Apartment Flat Matrix */}
      <ScrollReveal direction="up">
        <div className="mt-12">
          <PlotVsApartmentMatrix />
        </div>
      </ScrollReveal>

      {/* Video Modal */}
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

export default function PropertiesDirectoryPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50 py-12 text-center">Loading properties...</div>}>
      <PropertiesDirectoryContent />
    </Suspense>
  );
}
