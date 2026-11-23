"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { ACADEMY_GUIDES, AcademyGuide } from "@/lib/namnilam-data";
import {
  BookOpen,
  ShieldCheck,
  FileCheck,
  AlertOctagon,
  CheckCircle2,
  HelpCircle,
  Download,
  MessageCircle,
  Phone,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  FileText,
  Compass,
  ExternalLink,
} from "lucide-react";

export default function AcademyPage() {
  const { language } = useLanguage();
  const [expandedGuide, setExpandedGuide] = useState<string | null>(ACADEMY_GUIDES[0].slug);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [checklistName, setChecklistName] = useState("");
  const [checklistPhone, setChecklistPhone] = useState("");
  const [checklistSubmitted, setChecklistSubmitted] = useState(false);

  const DEADLY_TRAPS = [
    {
      title: "Unregistered Power of Attorney (PoA)",
      desc: "Sales conducted under unregistered or revoked power of attorney deeds carry extreme civil litigation risk. Tamil Nadu registration rules require registered GPA with live principal verification.",
      severity: "Fatal",
    },
    {
      title: "Kootu Patta (Joint Revenue Patta) Trap",
      desc: "Purchasing from one family member when the revenue Patta is jointly held (Kootu Patta) without registered partition deed or all legal heirs signing the conveyance deed.",
      severity: "High Risk",
    },
    {
      title: "ERI Poramboke & Water Body Encroachment",
      desc: "Plots plotted over drainage channels, lake bunds, or water catchment poramboke land. Eviction and demolition orders can be issued without compensation by the High Court.",
      severity: "Fatal",
    },
    {
      title: "Unapproved Panchayat Layouts (Post-2016)",
      desc: "Subdivisions created without DTCP or CMDA sanction after the landmark 2016 Madras High Court ruling cannot be registered, constructed upon, or financed by nationalized banks.",
      severity: "Fatal",
    },
    {
      title: "FMB Survey Boundary Mismatch",
      desc: "Survey stones placed on-site don't match the Field Measurement Book (FMB) survey sketch at the Taluk Office, resulting in criminal boundary disputes with neighbors.",
      severity: "High Risk",
    },
    {
      title: "Section 47A Revenue Undervaluation Liens",
      desc: "Previous transaction registered below guideline value with unpaid stamp duty penalty resulting in revenue recovery attachment by the Sub-Registrar.",
      severity: "Financial Loss",
    },
    {
      title: "Undischarged Bank Mortgage Charges",
      desc: "Vendor mortgaged original parent deeds with a bank or private financier without an official registered discharge deed or bank NOC.",
      severity: "Fatal",
    },
    {
      title: "Highway / Semi-Ring Road Acquisition Buffer",
      desc: "Plot falls within the NHAI, State Highway, or Trichy Semi-Ring Road alignment corridor where construction is permanently prohibited.",
      severity: "Fatal",
    },
  ];

  const handleChecklistSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!checklistPhone.trim()) return;
    setChecklistSubmitted(true);

    const text = encodeURIComponent(
      `Hello Er. J. Vairavel, I requested the *15-Point Tamil Nadu Land Buying Due Diligence Checklist* on veeduveettumanaisanthai.in.\nName: ${checklistName}\nPhone: ${checklistPhone}`
    );
    setTimeout(() => {
      window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, "_blank");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 pb-20">
      {/* Notice Banner */}
      <div className="bg-amber-500/20 border-b border-amber-400/40 text-amber-200 py-2.5 px-4 text-xs font-semibold backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="bg-amber-500 text-slate-950 text-[10px] uppercase font-black px-2 py-0.5 rounded">
              UI/UX Preview
            </span>
            <span>
              {language === "ta"
                ? "அகாடமி முன்னோட்டம் • Er. J. வைரவேலின் ரியல் எஸ்டேட் விழிப்புணர்வு மற்றும் சட்ட ஆய்வு வழிகாட்டிகள்."
                : "Academy Visual Preview • Due diligence education and buyer training modules by Er. J. Vairavel."}
            </span>
          </div>
          <span className="hidden md:inline text-amber-300 text-[11px] font-bold">
            Public Education Initiative
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8 pt-8">
        {/* Academy Hero */}
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-black via-brand-dark to-slate-900 border border-gold-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-card border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Real Estate Academy & Buyer Education Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              The Tamil Nadu Land & Property <br />
              <span className="text-gold-400">Due Diligence Masterclass</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Before paying a single rupee in token advance, master the legal and technical safeguards
              developed by <strong className="text-white">Er. J. Vairavel (Civil Engineer)</strong>.
              Learn to decipher Patta, Chitta, TSLR, FMB sketches, and 30-year encumbrance certificates
              like a pro.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm">
              <button
                onClick={() => setDownloadModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black shadow-md transition"
              >
                <Download className="w-4 h-4" />
                <span>Download Free 15-Point Due Diligence Checklist</span>
              </button>

              <Link
                href="/services/online-legal-opinion"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-card hover:bg-slate-800 text-cyan-400 font-bold border border-cyan-500/30 transition"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Get 30-Year Advocate Legal Opinion (₹4,999)</span>
              </Link>
            </div>
          </div>
        </div>

        {/* 6-Stage Due Diligence Master Framework */}
        <div className="bg-brand-card rounded-3xl border border-brand-dark p-6 sm:p-10 space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Standard Operating Procedure
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              The 6-Stage Tamil Nadu Land Verification Framework
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              The exact forensic methodology Er. J. Vairavel and our panel advocates use to verify
              properties before listing or building.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-brand-black p-5 rounded-2xl border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-gold-500/20 border border-gold-500/40 text-gold-400 font-black flex items-center justify-center text-sm">
                1
              </div>
              <h3 className="font-bold text-white text-base">30-Year Encumbrance Certificate (EC)</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Obtain a continuous EC from 1975 to current date from the Sub-Registrar. Ensure zero
                breaks in the chain of ownership and check for unreleased bank mortgages or court
                attachments.
              </p>
            </div>

            <div className="bg-brand-black p-5 rounded-2xl border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 font-black flex items-center justify-center text-sm">
                2
              </div>
              <h3 className="font-bold text-white text-base">Original Parent Document Flow</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Scrutinize original sale deeds, settlement deeds, partition deeds, and gift deeds.
                Verify legal heirship certificates and death certificates when ancestral title is
                involved.
              </p>
            </div>

            <div className="bg-brand-black p-5 rounded-2xl border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 font-black flex items-center justify-center text-sm">
                3
              </div>
              <h3 className="font-bold text-white text-base">Revenue Records & Thani Patta</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check <strong>eservices.tn.gov.in</strong> for online Patta and Chitta. Verify if the
                property is an individual Patta (Thani Patta) or joint patta (Kootu Patta), and check 'A'
                Register land classification.
              </p>
            </div>

            <div className="bg-brand-black p-5 rounded-2xl border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 text-amber-400 font-black flex items-center justify-center text-sm">
                4
              </div>
              <h3 className="font-bold text-white text-base">FMB Sketch & Physical Boundaries</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Compare Field Measurement Book (FMB) survey sketch ladder measurements with ground
                stones. Verify layout road widths (minimum 30ft/33ft) and check for unauthorized
                subdivisions.
              </p>
            </div>

            <div className="bg-brand-black p-5 rounded-2xl border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 font-black flex items-center justify-center text-sm">
                5
              </div>
              <h3 className="font-bold text-white text-base">DTCP / CMDA & TN RERA Sanction</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Verify Director of Town and Country Planning (DTCP) layout approval number and OSR gift
                deed to the local body. Confirm Tamil Nadu RERA registration number for multi-plot
                developments.
              </p>
            </div>

            <div className="bg-brand-black p-5 rounded-2xl border border-slate-800 space-y-3 relative">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 border border-purple-500/40 text-purple-400 font-black flex items-center justify-center text-sm">
                6
              </div>
              <h3 className="font-bold text-white text-base">Section 47A & Litigation Clearance</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Check whether any past sale suffered from stamp duty undervaluation inquiry under
                Section 47A. Search district civil court registry for pending partition or injunction
                suits.
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Due Diligence Guides Accordion / Card Section */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Deep-Dive Guides
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Essential Due Diligence Reading
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Comprehensive guides to master property documentation in Tamil Nadu.
            </p>
          </div>

          <div className="space-y-4">
            {ACADEMY_GUIDES.map((guide) => {
              const isExpanded = expandedGuide === guide.slug;
              return (
                <div
                  key={guide.slug}
                  className="bg-brand-card rounded-2xl border border-slate-800 overflow-hidden transition"
                >
                  <button
                    onClick={() => setExpandedGuide(isExpanded ? null : guide.slug)}
                    className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-brand-black/30 transition"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gold-500/20 text-gold-400 border border-gold-500/40">
                          {guide.category}
                        </span>
                        <span className="text-xs text-slate-500">{guide.readTime}</span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-white">{guide.title}</h3>
                      <div className="text-xs text-gold-400/90 font-medium">{guide.titleTa}</div>
                    </div>

                    <div className="p-2 rounded-xl bg-brand-black text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-slate-800/80 space-y-4 text-xs sm:text-sm text-slate-300">
                      <p className="leading-relaxed bg-brand-black/60 p-4 rounded-xl border border-slate-800 text-slate-300">
                        {guide.summary}
                      </p>

                      <div className="space-y-2">
                        <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">
                          Key Forensic Takeaways:
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {guide.keyTakeaways.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-2.5 bg-brand-black/40 p-3 rounded-xl border border-slate-800/80"
                            >
                              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span className="text-xs text-slate-200">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-2 flex flex-wrap gap-3">
                        <Link
                          href="/services/online-legal-opinion"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gold-500 text-slate-950 font-bold text-xs hover:bg-gold-400 transition"
                        >
                          <span>Get Advocate Verification</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                        <button
                          onClick={() => setDownloadModalOpen(true)}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-black border border-slate-700 text-slate-300 font-medium text-xs hover:text-white transition"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Get Checklist</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 8 Deadly Traps & Red Flags in Tamil Nadu */}
        <div className="bg-brand-card rounded-3xl border border-red-500/30 p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 uppercase tracking-widest">
              <AlertOctagon className="w-4 h-4" />
              <span>Buyer Beware • Red Flags</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              8 Deadly Property Traps to Avoid in Tamil Nadu
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Over 60% of land disputes in civil courts arise from one of these eight oversights.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            {DEADLY_TRAPS.map((trap, idx) => (
              <div
                key={idx}
                className="bg-brand-black p-4 rounded-xl border border-slate-800 space-y-2.5 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500">#{idx + 1}</span>
                    <span
                      className={`text-[10px] font-black px-2 py-0.5 rounded ${
                        trap.severity === "Fatal"
                          ? "bg-red-500/20 text-red-400 border border-red-500/40"
                          : trap.severity === "High Risk"
                          ? "bg-amber-500/20 text-amber-400 border border-amber-500/40"
                          : "bg-blue-500/20 text-blue-400 border border-blue-500/40"
                      }`}
                    >
                      {trap.severity}
                    </span>
                  </div>
                  <h4 className="font-bold text-white text-sm leading-snug">{trap.title}</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{trap.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Checklist Download Lead Capture Modal / Card */}
        {downloadModalOpen && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-brand-card border border-gold-500/40 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative animate-in fade-in zoom-in-95">
              <button
                onClick={() => setDownloadModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white"
              >
                ✕
              </button>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-gold-500/20 border border-gold-500/40 text-gold-400 flex items-center justify-center">
                  <Download className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Get Free 15-Point Due Diligence Checklist
                </h3>
                <p className="text-xs text-slate-400">
                  We'll send the printable PDF checklist directly to your WhatsApp with step-by-step
                  instructions.
                </p>
              </div>

              {checklistSubmitted ? (
                <div className="bg-emerald-950/40 border border-emerald-500/40 p-4 rounded-xl text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                  <div className="text-sm font-bold text-emerald-300">
                    Checklist Dispatched to WhatsApp!
                  </div>
                  <p className="text-xs text-slate-300">
                    Opening WhatsApp to connect with Er. J. Vairavel's team...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleChecklistSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Kumar"
                      value={checklistName}
                      onChange={(e) => setChecklistName(e.target.value)}
                      className="w-full bg-brand-black border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      WhatsApp Phone Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 9876543210"
                      value={checklistPhone}
                      onChange={(e) => setChecklistPhone(e.target.value)}
                      className="w-full bg-brand-black border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-gold-400"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition"
                  >
                    Send Checklist to My WhatsApp
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Bottom Consultation Banner */}
        <div className="bg-brand-black rounded-3xl border border-cyan-500/40 p-8 sm:p-12 text-center space-y-6 shadow-cyan">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Have Property Documents You Want Er. J. Vairavel to Inspect?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Book a personal appointment at our <strong>Olaiyur Ring Road Headquarters</strong>. Bring your parent deeds, EC, and layout map for a
              rigorous 30-minute legal and structural verification.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                "Hello Er. J. Vairavel, I would like to schedule an in-person deed review appointment at your Trichy office."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Book Office Consultation</span>
            </a>

            <a
              href={`tel:${COMPANY_INFO.phoneRaw}`}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-card hover:bg-slate-800 text-gold-400 font-bold text-sm border border-gold-500/40 transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call +91 73052 00754</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
