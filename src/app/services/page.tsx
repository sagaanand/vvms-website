"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { ALL_SERVICES, ServiceDetail } from "@/lib/namnilam-data";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
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

  return (
    <div className="min-h-screen bg-[#F2F2F2] py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Section Styled with Brand Theme */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#202020] border-2 border-[#B78D42] text-[#F9DB5C] text-xs font-black uppercase tracking-wider shadow-gold">
            <ShieldCheck className="w-4 h-4 text-[#22CDE1]" />
            <span>Independent Real Estate Advisory & Engineering Intelligence</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#202020] tracking-tight leading-tight">
            Real Estate Advisory, Legal Due Diligence & Technical Audits
          </h1>

          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-medium">
            Backed by Er. J. Vairavel&apos;s civil engineering authority and experienced Tamil Nadu civil advocates. We protect buyers and investors from overpricing, forged deeds, fake pattas, and structural failures.
          </p>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-bold text-slate-500">Service Verticals:</span>
            <span className="text-xs font-black text-[#202020] bg-white px-3 py-1 rounded-full border border-[#B78D42]/40 shadow-sm">
              30-Yr Legal Due Diligence
            </span>
            <span className="text-xs font-black text-[#0891B2] bg-[#22CDE1]/10 px-3 py-1 rounded-full border border-[#22CDE1]/30">
              SRO Guideline Valuation
            </span>
            <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-300">
              Soil & Water Technical Audits
            </span>
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 touch-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-black transition whitespace-nowrap border-2 ${
                selectedCategory === cat
                  ? "bg-[#202020] text-[#F9DB5C] border-[#B78D42] shadow-gold"
                  : "bg-white text-slate-700 border-slate-200 hover:border-[#22CDE1]"
              }`}
            >
              {cat === "All" ? `All Services (${ALL_SERVICES.length})` : cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((svc) => {
            const waMsg = `Hello Er. J. Vairavel, I am interested in your "${svc.title}" service on veeduveettumanaisanthai.in. Please share details and procedure.`;
            const waUrl = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, waMsg);

            return (
              <div
                key={svc.slug}
                className="group bg-white rounded-3xl overflow-hidden border-2 border-[#B78D42]/30 hover:border-[#B78D42] shadow-card hover:shadow-gold transition-all duration-300 flex flex-col justify-between"
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
                    <div className="absolute top-3 left-3 bg-[#202020]/95 text-[#F9DB5C] text-[11px] font-black px-3 py-1 rounded-xl border border-[#B78D42]/50 shadow">
                      {svc.badge}
                    </div>
                    <div className="absolute top-3 right-3 bg-white/95 text-[#202020] text-[11px] font-black px-2.5 py-1 rounded-xl shadow border border-slate-100">
                      {svc.priceTag}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="text-[11px] font-bold text-cyan-600 uppercase tracking-wider">
                      {svc.category} • Er. J. Vairavel
                    </div>

                    <Link href={`/services/${svc.slug}`}>
                      <h3 className="font-black text-lg text-brand-black hover:text-cyan-700 transition leading-snug">
                        {language === "ta" ? svc.titleTa : svc.title}
                      </h3>
                    </Link>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed font-medium">
                      {svc.desc}
                    </p>

                    {/* What We Help With Highlights */}
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[10px] uppercase font-bold text-slate-400">
                        Scope Highlights:
                      </div>
                      {svc.whatWeHelpWith.slice(0, 2).map((item, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-xs text-slate-700 font-semibold">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2 mt-2">
                  <Link
                    href={`/services/${svc.slug}`}
                    className="flex items-center justify-center gap-1 py-2.5 px-3 rounded-2xl bg-slate-100 hover:bg-gold-50 hover:text-gold-700 text-slate-800 font-bold text-xs transition border border-transparent hover:border-gold-300"
                  >
                    <span>Full Details</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-md border border-emerald-400/30 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white text-emerald-600" />
                    <span>Inquire</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
