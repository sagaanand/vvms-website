"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  FileText,
  Download,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  BookOpen,
  Calculator,
  Droplets,
  Building2,
  FileSearch,
  MessageCircle,
} from "lucide-react";

export default function ResourcesPage() {
  const { language } = useLanguage();
  const [downloadModal, setDownloadModal] = useState<string | null>(null);

  const resourceGuides = [
    {
      id: "30-year-due-diligence-checklist",
      title: language === "ta" ? "30 வருட நில சட்ட ஆய்வு சரிபார்ப்பு பட்டியல்" : "The 30-Year Land Due Diligence Checklist",
      badge: "Essential for Land Buyers",
      category: "Legal & Due Diligence",
      desc: language === "ta"
        ? "தமிழ்நாட்டில் வீட்டுமனை வாங்குவதற்கு முன் சரிபார்க்க வேண்டிய 12 கட்டாய ஆவணங்கள்: பட்டா, சிட்டா, 30 வருட வில்லங்கச் சான்று, FMB வரைபடம் மற்றும் வழிகாட்டி மதிப்பு."
        : "Master 12-point forensic checklist covering 30-year Encumbrance Certificates (EC), Patta/Chitta online validation, FMB sketch matching, and Section 47A revenue safeguards.",
      pages: "6-Page Practical Handbook",
      icon: FileSearch,
    },
    {
      id: "dtcp-rera-approval-guide",
      title: language === "ta" ? "DTCP மற்றும் RERA அப்ரூவல் வழிகாட்டி" : "DTCP & RERA Layout Compliance Guide",
      badge: "Regulatory Clarity",
      category: "Approvals & Regulations",
      desc: language === "ta"
        ? "பஞ்சாயத்து அப்ரூவல் ஏன் சட்டப்படி செல்லாது? DTCP மற்றும் RERA அப்ரூவலில் உள்ள 33 அடி தார் ரோடு, OSR பார்க் நில தானப்பத்திரம் பற்றிய முழுமையான வழிகாட்டி."
        : "Why unapproved Panchayat layouts are illegal for residential subdivision. Detailed breakdown of DTCP road width norms, OSR park gift deeds, and RERA compliance.",
      pages: "8-Page Legal Dossier",
      icon: ShieldCheck,
    },
    {
      id: "turnkey-boq-handbook",
      title: language === "ta" ? "தரமான வீடுகட்டுமான BOQ மதிப்பீட்டு கையேடு" : "Turnkey Construction BOQ & Milestone Schedule",
      badge: "Civil Engineering Standards",
      category: "Construction & Engineering",
      desc: language === "ta"
        ? "கான்ட்ராக்டர்கள் செலவை அதிகரிப்பதைத் தடுப்பது எப்படி? அடித்தளம் முதல் சாவி ஒப்படைப்பு வரை 6-கட்ட தவணை முறை மற்றும் பொருள் தரப் பட்டியல்."
        : "Standardized Bill of Quantities (BOQ) with material specs (53-grade cement, Fe-550 TMT steel) and 6-stage milestone payment schedule by Er. J. Vairavel.",
      pages: "10-Page Engineering Guide",
      icon: Building2,
    },
    {
      id: "guideline-value-calculation-handbook",
      title: language === "ta" ? "வழிகாட்டி மதிப்பு & பதிவுச் செலவு கையேடு" : "Tamil Nadu Guideline Value & Registration Guide",
      badge: "Financial Planning",
      category: "Valuation & Finance",
      desc: language === "ta"
        ? "பதிவுத்துறை வழிகாட்டி மதிப்பு மற்றும் சந்தை மதிப்புக்கு இடையிலான வித்தியாசம், 9% முத்திரைத்தாள் கட்டணம் மற்றும் பத்திரப் பதிவு நடைமுறைகள்."
        : "Understanding SRO guideline values vs market transactions, 7% stamp duty + 2% registration fees breakdown, and realistic negotiation boundaries.",
      pages: "5-Page Financial Brief",
      icon: Calculator,
    },
    {
      id: "soil-water-technical-audit-sheet",
      title: language === "ta" ? "மண் & நிலத்தடி நீர் தொழில்நுட்ப சோதனை தாள்" : "Groundwater & Soil Assessment Protocol",
      badge: "Ground Truth Inspection",
      category: "Engineering & Technical",
      desc: language === "ta"
        ? "போர்வெல் அமைப்பதற்கு முன் நிலத்தடி நீர் ஆழம், குடிநீர் TDS அளவு மற்றும் மண் தாங்கும் திறன் (SBC) சோதனை நெறிமுறைகள்."
        : "Field testing guidelines for aquifer depth, potable water TDS testing (<300 sweet water standards), and foundation bearing capacity benchmarks.",
      pages: "4-Page Technical Sheet",
      icon: Droplets,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Notice Banner */}
      <div className="bg-amber-100 border-b border-amber-300 text-amber-950 py-2.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-600 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded">
              UI/UX Preview
            </span>
            <span>
              {language === "ta"
                ? "வளங்கள் காட்சி முன்னோட்டம் • Er. J. வைரவேலின் சிவில் இன்ஜினியரிங் கல்வி வழிகாட்டிகள்."
                : "Resources & Buyer Handbooks Visual Preview • Practical due diligence literature authored by Er. J. Vairavel."}
            </span>
          </div>
          <span className="hidden md:inline text-amber-800 text-[11px] font-bold">
            Free Educational Access
          </span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-brand-black text-white py-14 sm:py-20 relative overflow-hidden border-b-2 border-amber-400/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-amber-400/50 text-amber-300 text-xs font-black uppercase tracking-wider backdrop-blur-md">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <span>Real Estate Knowledge & Forensic Handbooks</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {language === "ta"
                ? "சொத்து வாங்குபவர்களுக்கான வழிகாட்டிகள் & சரிபார்ப்பு பட்டியல்கள்"
                : "Due Diligence Handbooks & Property Verification Checklists"}
            </h1>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-medium">
              {language === "ta"
                ? "சட்ட சிக்கல்கள், போலி பட்டாக்கள் மற்றும் கட்டுமான ஏமாற்றங்களைத் தவிர்க்க Er. J. வைரவேல் மற்றும் சட்ட ஆலோசகர்களால் உருவாக்கப்பட்ட இலவச கையேடுகள்."
                : "Authoritative guides designed to protect land buyers and homebuilders from forged title deeds, encumbrance traps, unapproved layouts, and construction escalations."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href="#guides-list"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-600/30 transition hover:-translate-y-0.5"
              >
                {language === "ta" ? "கையேடுகளைக் காண்க" : "Browse All Handbooks"}
              </a>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs backdrop-blur-md transition"
              >
                <span>{language === "ta" ? "சட்ட சேவைகள்" : "Need Written Advocate Scrutiny?"}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Resource Cards Grid */}
      <section id="guides-list" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {resourceGuides.map((guide) => {
            const Icon = guide.icon;
            const waMsg = encodeURIComponent(
              `Hello Er. J. Vairavel, please send me a digital copy of "${guide.title}" from veeduveettumanaisanthai.in.`
            );
            const waUrl = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, waMsg);

            return (
              <div
                key={guide.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-amber-200/90 hover:border-amber-400 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 group-hover:scale-105 transition">
                      <Icon className="w-5 h-5 text-amber-600" />
                    </div>
                    <span className="text-[11px] font-black text-amber-900 bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-300">
                      {guide.pages}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-cyan-700">
                      {guide.category}
                    </span>
                    <h3 className="text-lg font-black text-slate-900 mt-1 leading-snug group-hover:text-amber-700 transition">
                      {guide.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {guide.desc}
                  </p>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] font-bold text-slate-700">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{guide.badge}</span>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-amber-100 flex items-center justify-between gap-3">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-sm transition"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{language === "ta" ? "கையேடு பெற" : "Request PDF Copy"}</span>
                  </a>

                  <Link
                    href="/academy"
                    className="p-2.5 rounded-xl border border-amber-200 text-slate-700 hover:text-amber-700 hover:bg-amber-50 transition"
                    title="Read Academy Summary"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* Free Consultation Callout Card */}
        <div className="mt-12 bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white p-8 sm:p-10 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border-2 border-amber-300">
          <div className="space-y-2 text-center md:text-left max-w-2xl">
            <h3 className="text-2xl font-black">
              {language === "ta"
                ? "உங்கள் ஆவணங்களை நேரடியாகச் சரிபார்க்க வேண்டுமா?"
                : "Need Personal Document Forensics by Er. J. Vairavel?"}
            </h3>
            <p className="text-xs sm:text-sm text-amber-50 font-medium">
              {language === "ta"
                ? "எங்கள் திருச்சி அலுவலகத்திற்கு நேரில் வருகை தந்து அசல் ஆவணங்களை வழக்கறிஞர்களுடன் சரிபார்த்துக் கொள்ளுங்கள்."
                : "Visit our Trichy headquarters at Olaiyur Ring Road or Karumandapam branch for complete title chain review before paying any advance."}
            </p>
          </div>

          <div className="flex-shrink-0 flex flex-wrap items-center gap-3">
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-white text-slate-900 hover:bg-amber-50 font-black text-xs uppercase tracking-wider shadow-md transition"
            >
              {language === "ta" ? "அலுவலக முகவரி" : "Visit Our Offices"}
            </Link>
            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider shadow-md transition"
            >
              Call {COMPANY_INFO.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
