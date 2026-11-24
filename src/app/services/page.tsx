"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { ALL_SERVICES, ServiceDetail } from "@/lib/namnilam-data";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import HeroSlider, { HeroSlide } from "@/components/HeroSlider";
import ScrollReveal from "@/components/ScrollReveal";
import {
  ShieldCheck,
  Award,
  ArrowRight,
  MessageCircle,
  FileCheck,
  Scale,
  Calculator,
  Compass,
  HardHat,
  Banknote,
  CheckCircle2,
} from "lucide-react";

export default function ServicesPage() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    "All",
    "Legal",
    "Valuation",
    "Advisory",
    "Engineering",
    "Finance",
    "Business",
  ];

  const filteredServices = ALL_SERVICES.filter((svc) => {
    if (selectedCategory === "All") return true;
    return svc.category === selectedCategory;
  });

  const serviceSlides: HeroSlide[] = [
    {
      image: "/images/blueprint-audit.jpg",
      tag: "30-YEAR TITLE DEED FORENSICS",
      tagColor: "gold",
      title: "Civil Law Due Diligence • Zero Legal Defects",
      subtitle:
        language === "ta"
          ? "30 வருட வில்லங்கச் சான்று, பட்டா/சிட்டா உண்மைத்தன்மை மற்றும் உயர்நீதிமன்ற வழக்கறிஞர்களின் விரிவான சட்ட ஆய்வு."
          : "30-year Encumbrance Certificate audit, parent title scrutiny, and High Court advocate verification before you invest.",
      primaryCta: {
        label: language === "ta" ? "சேவைகளை காண்க" : "Explore Services",
        href: "#services-grid",
      },
      secondaryCta: {
        label: language === "ta" ? "வாட்ஸ்அப் ஆலோசனை" : "WhatsApp Advisory",
        href: `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
          "Hello VVMS Advisory Team, I need legal due diligence advisory for a property."
        )}`,
      },
      metrics: [
        { value: "30 Years", label: "EC Title Scrutiny" },
        { value: "12 Points", label: "Document Checklist" },
        { value: "100%", label: "Court Records Check" },
        { value: "Zero", label: "Hidden Encumbrance" },
      ],
    },
    {
      image: "/images/dtcp-plots.jpg",
      tag: "REGISTERED SRO VALUATIONS",
      tagColor: "cyan",
      title: "Sub-Registrar Guideline • Unbiased Valuation",
      subtitle:
        language === "ta"
          ? "பதிவுத்துறை வழிகாட்டி மதிப்பு மற்றும் உண்மையான சந்தை நிலவரத்தின் அடிப்படையில் நியாயமான சொத்து மதிப்பீடு."
          : "Data-driven property valuation based on actual registered transactions, guideline benchmarks, and locality absorption rates.",
      primaryCta: {
        label: language === "ta" ? "மதிப்பீட்டு சேவைகள்" : "Valuation Desk",
        href: "#services-grid",
      },
      secondaryCta: {
        label: language === "ta" ? "தொடர்பு கொள்ள" : "Contact Desk",
        href: "/contact",
      },
      metrics: [
        { value: "SRO Data", label: "Registration Comps" },
        { value: "Zero Bias", label: "Independent Valuation" },
        { value: "7 Corridors", label: "Trichy Micro-Markets" },
        { value: "24-48 Hrs", label: "Dossier Turnaround" },
      ],
    },
    {
      image: "/images/consulting.jpg",
      tag: "ENGINEERING FIELD AUDITS",
      tagColor: "red",
      title: "Geotechnical Soil • Groundwater Audits",
      subtitle:
        language === "ta"
          ? "மண் தாங்கும் திறன் (SBC) சோதனை, நிலத்தடி நீர் தரம் (TDS) மற்றும் முதுநிலை சிவில் பொறியாளர்களின் நேரடி கள ஆய்வு."
          : "Soil bearing capacity testing, borehole water potability analysis, and structural safety audits led by Senior Chartered Civil Engineers.",
      primaryCta: {
        label: language === "ta" ? "இன்ஜினியரிங் ஆய்வுகள்" : "Engineering Audits",
        href: "#services-grid",
      },
      secondaryCta: {
        label: language === "ta" ? "நேரடி ஆலோசனை" : "Direct Consultation",
        href: `https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
          "Hello VVMS Engineering Desk, I need geotechnical soil and water testing."
        )}`,
      },
      metrics: [
        { value: "Chartered Eng.", label: "Technical Oversight" },
        { value: "SBC Test", label: "Soil Bearing Capacity" },
        { value: "<300 TDS", label: "Potability Benchmark" },
        { value: "Site Visit", label: "On-Ground Verification" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* 1. Hero Carousel */}
      <HeroSlider slides={serviceSlides} />

      <div id="services-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
        {/* Category Header */}
        <ScrollReveal direction="down">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#202020] border-2 border-[#B78D42] text-[#F9DB5C] text-xs font-black uppercase tracking-wider shadow-gold">
              <ShieldCheck className="w-4 h-4 text-[#22CDE1]" />
              <span>Independent Real Estate Advisory & Engineering Intelligence</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#202020] tracking-tight leading-snug">
              Comprehensive Services Portfolio
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Backed by senior civil engineering authority and experienced Tamil Nadu High Court civil advocates. We protect buyers and investors from overpricing, forged deeds, fake pattas, and structural failures.
            </p>

            <div className="pt-1 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              <span className="text-xs font-bold text-slate-500">Service Verticals:</span>
              <span className="text-xs font-bold text-[#202020] bg-white px-3 py-1 rounded-full border border-[#B78D42]/40 shadow-sm">
                30-Yr Legal Due Diligence
              </span>
              <span className="text-xs font-bold text-[#0891B2] bg-[#22CDE1]/10 px-3 py-1 rounded-full border border-[#22CDE1]/30">
                SRO Guideline Valuation
              </span>
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
                Soil & Water Technical Audits
              </span>
            </div>
          </div>
        </ScrollReveal>

        {/* Category Filter Chips */}
        <ScrollReveal direction="up" delayMs={50}>
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 touch-scroll">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold transition whitespace-nowrap border ${
                  selectedCategory === cat
                    ? "bg-[#202020] text-[#F9DB5C] border-[#B78D42] shadow-gold"
                    : "bg-white text-slate-700 border-slate-200 hover:border-[#22CDE1]"
                }`}
              >
                {cat === "All" ? `All Services (${ALL_SERVICES.length})` : cat}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Services Grid with Staggered Scroll Animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((svc, index) => {
            const waMsg = `Hello VVMS Services Desk, I am interested in your "${svc.title}" service on veeduveettumanaisanthai.in. Please share details and procedure.`;
            const waUrl = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, waMsg);

            return (
              <ScrollReveal key={svc.slug} direction="up" delayMs={(index % 6) * 60}>
                <div
                  className="h-full group bg-white rounded-3xl overflow-hidden border border-[#B78D42]/30 hover:border-[#B78D42] shadow-sm hover:shadow-xl card-hover-lift flex flex-col justify-between"
                >
                  <div>
                    {/* Service Cover Image with Category Badge */}
                    <div className="relative aspect-[16/10] bg-[#202020] overflow-hidden">
                      <Image
                        src={svc.coverImage}
                        alt={svc.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                      />
                      <div className="absolute top-3 left-3 bg-[#202020]/95 text-[#F9DB5C] text-xs font-bold px-3 py-1 rounded-xl border border-[#B78D42]/50 shadow">
                        {svc.badge}
                      </div>
                      <div className="absolute top-3 right-3 bg-white/95 text-[#202020] text-xs font-black px-3 py-1 rounded-xl shadow border border-slate-100">
                        {svc.priceTag}
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-5 sm:p-6 space-y-3">
                      <div className="text-[11px] font-bold text-cyan-700 uppercase tracking-wider">
                        {svc.category} • Technical Advisory
                      </div>

                      <Link href={`/services/${svc.slug}`}>
                        <h3 className="font-black text-base sm:text-lg text-brand-black hover:text-[#B78D42] transition leading-snug">
                          {language === "ta" ? svc.titleTa : svc.title}
                        </h3>
                      </Link>

                      <p className="text-xs sm:text-[13px] text-slate-600 line-clamp-3 leading-relaxed font-normal">
                        {svc.desc}
                      </p>

                      {/* What We Help With Highlights */}
                      <div className="pt-2 border-t border-slate-100 space-y-1.5">
                        <div className="text-[11px] uppercase font-bold text-slate-400">
                          Scope Highlights:
                        </div>
                        {svc.whatWeHelpWith.slice(0, 2).map((item, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700 font-medium leading-snug">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div className="p-5 sm:p-6 pt-0 grid grid-cols-2 gap-2 mt-2">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-[#F9DB5C]/20 text-slate-800 font-bold text-xs transition border border-transparent hover:border-[#B78D42]/40"
                    >
                      <span>Full Details</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <a
                      href={waUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-sm border border-emerald-400/30 transition"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                      <span>Inquire</span>
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </div>
  );
}
