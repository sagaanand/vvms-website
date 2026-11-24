"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { formatIndianNumber, formatPrice, getWhatsAppUrl } from "@/lib/utils";
import { COMPANY_INFO } from "@/lib/constants";
import {
  HardHat,
  CheckCircle2,
  ShieldCheck,
  Send,
  X,
  FileSpreadsheet,
} from "lucide-react";

interface CostEstimatorProps {
  initialArea?: number;
}

export default function CostEstimator({ initialArea = 1200 }: CostEstimatorProps) {
  const { language, t } = useLanguage();
  const [area, setArea] = useState<number>(initialArea);
  const [floors, setFloors] = useState<string>("G");
  const [selectedPackage, setSelectedPackage] = useState<"basic" | "standard" | "premium">("standard");
  const [modalOpen, setModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [leadForm, setLeadForm] = useState({
    name: "",
    phone: "",
    plotLocation: "",
    timeline: "Ready to start within 1-2 months",
  });

  const packages: Record<
    "basic" | "standard" | "premium",
    {
      name: string;
      nameTa: string;
      rate: number;
      description: string;
      tag: string;
      isPopular?: boolean;
    }
  > = {
    basic: {
      name: "Basic Package",
      nameTa: "அடிப்படை திட்டம்",
      rate: 1950,
      description: "Dalmia/Ramco Cement • Fe 550D Steel • Vitrified Tiles • Standard Sanitaryware",
      tag: "Budget Friendly",
      isPopular: false,
    },
    standard: {
      name: "Standard Package",
      nameTa: "நிலையான திட்டம்",
      rate: 2250,
      description: "Ultratech/TATA Tiscon • 4x2 GVT Tiles & Granite • Jaquar CP • 1st Quality Teak Door",
      tag: "Most Popular in Trichy",
      isPopular: true,
    },
    premium: {
      name: "Premium Package",
      nameTa: "பிரீமியம் திட்டம்",
      rate: 2650,
      description: "Solid Burma Teak • Italian Marble / 6x4 PGVT • Kohler/Grohe • Smart Home Automation",
      tag: "Luxury Villa",
      isPopular: false,
    },
  };

  const activePkg = packages[selectedPackage];
  const calculatedTotalArea = Math.round(area * (floors === "G" ? 1 : floors === "G+1" ? 1.85 : 2.7));
  const estimatedCost = calculatedTotalArea * activePkg.rate;

  // Stages
  const stages = [
    { name: t.estimator.foundation, percent: 15, cost: Math.round(estimatedCost * 0.15) },
    { name: t.estimator.structure, percent: 25, cost: Math.round(estimatedCost * 0.25) },
    { name: t.estimator.roofSlab, percent: 20, cost: Math.round(estimatedCost * 0.20) },
    { name: t.estimator.brickwork, percent: 20, cost: Math.round(estimatedCost * 0.20) },
    { name: t.estimator.finishing, percent: 15, cost: Math.round(estimatedCost * 0.15) },
    { name: t.estimator.handover, percent: 5, cost: Math.round(estimatedCost * 0.05) },
  ];

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadForm.name || !leadForm.phone) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: leadForm.name,
          phone: leadForm.phone,
          leadType: "Construction Inquiry",
          plotLocation: leadForm.plotLocation || "Trichy",
          builtUpArea: calculatedTotalArea,
          selectedPackage: `${activePkg.name} (₹${activePkg.rate}/sq.ft)`,
          budget: formatPrice(estimatedCost),
          timeline: leadForm.timeline,
          message: `Turnkey estimate requested for ${calculatedTotalArea} sq.ft (${floors} floor) using ${activePkg.name}. Total: ${formatPrice(estimatedCost)}.`,
          source: "COST_ESTIMATOR_WIDGET",
        }),
      });

      setSubmitted(true);

      const waMsg = `Hello Er. J. Vairavel, I generated a Turnkey Construction Estimate on veeduveettumanaisanthai.in:\n\n• Package: ${activePkg.name} (₹${activePkg.rate}/sq.ft)\n• Area: ${calculatedTotalArea} sq.ft (${floors})\n• Est. Total: ${formatPrice(estimatedCost)}\n• My Name: ${leadForm.name}\n• Plot Location: ${leadForm.plotLocation || "Trichy"}\n\nPlease share detailed BOQ and arrange a free site inspection.`;
      const waUrl = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, waMsg);

      setTimeout(() => {
        window.open(waUrl, "_blank");
      }, 700);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="cost-estimator" className="py-14 sm:py-20 bg-gradient-to-b from-[#F2F2F2] via-white to-[#F2F2F2] text-[#202020] relative overflow-hidden border-t-2 border-[#B78D42]/30">
      {/* Decorative backdrop glow matching VVMS Palette */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#F9DB5C]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#22CDE1]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Styled with VVMS Brand Theme */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#B78D42]/40 text-[#202020] text-xs font-black uppercase tracking-wider mb-3 shadow-sm">
            <HardHat className="w-4 h-4 text-[#B78D42]" />
            <span>{t.estimator.badge}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-[#202020] tracking-tight mb-3">
            {t.estimator.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            {t.estimator.subtitle}
          </p>
        </div>

        {/* Main Grid: Controls + Live Cost Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#B78D42]/30 shadow-xl space-y-6">
            {/* 1. Built-Up Area Slider */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs sm:text-sm font-black text-slate-800">
                  {t.estimator.areaSlider}
                </label>
                <div className="flex items-center gap-1.5 bg-[#F2F2F2] px-3.5 py-1.5 rounded-xl border border-[#B78D42]/40 shadow-sm">
                  <span className="text-base sm:text-lg font-black text-[#202020]">
                    {formatIndianNumber(area)}
                  </span>
                  <span className="text-xs text-[#B78D42] font-bold">sq.ft</span>
                </div>
              </div>

              <input
                type="range"
                min="600"
                max="5000"
                step="50"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                aria-label="Built-Up Area Slider"
                className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#B78D42] focus:outline-none border border-slate-300"
              />

              <div className="flex justify-between text-[11px] text-slate-500 mt-1 font-medium">
                <span>600 sq.ft (Starter Home)</span>
                <span className="text-[#B78D42] font-bold">2,500 sq.ft</span>
                <span>5,000 sq.ft (Grand Villa)</span>
              </div>
            </div>

            {/* 2. Number of Floors */}
            <div>
              <label className="block text-xs sm:text-sm font-black text-slate-800 mb-2">
                {t.estimator.floors}
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: "G", label: t.estimator.groundFloor },
                  { id: "G+1", label: t.estimator.gPlus1 },
                  { id: "G+2", label: t.estimator.gPlus2 },
                ].map((f) => (
                  <button
                    key={f.id}
                    type="button"
                    onClick={() => setFloors(f.id)}
                    className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-black transition flex flex-col items-center justify-center border-2 ${
                      floors === f.id
                        ? "bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] border-[#B78D42] shadow-sm"
                        : "bg-[#F2F2F2] text-slate-700 border-slate-200 hover:border-[#B78D42]/40 hover:bg-slate-100"
                    }`}
                  >
                    <span>{f.id}</span>
                    <span className="text-[10px] opacity-90">{f.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Package Selection */}
            <div>
              <label className="block text-xs sm:text-sm font-black text-slate-800 mb-2.5">
                {t.estimator.selectPackage}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(["basic", "standard", "premium"] as const).map((pkgKey) => {
                  const pkg = packages[pkgKey];
                  const isSelected = selectedPackage === pkgKey;
                  return (
                    <div
                      key={pkgKey}
                      onClick={() => setSelectedPackage(pkgKey)}
                      className={`relative cursor-pointer rounded-2xl p-4 border-2 transition-all ${
                        isSelected
                          ? "bg-[#F9DB5C]/15 border-[#B78D42] ring-2 ring-[#B78D42]/30 shadow-sm"
                          : "bg-white border-slate-200 hover:border-[#B78D42]/40"
                      }`}
                    >
                      {pkg.isPopular && (
                        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow-md border border-[#B78D42]/40">
                          Popular
                        </span>
                      )}
                      <div className="font-extrabold text-[#202020] text-sm mb-1">
                        {language === "ta" ? pkg.nameTa : pkg.name}
                      </div>
                      <div className="text-lg font-black text-[#202020] mb-1">
                        ₹{pkg.rate}
                        <span className="text-xs text-[#B78D42] font-bold"> /sq.ft</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-tight font-medium">
                        {pkg.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Output & Breakdown Column (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#F2F2F2] via-white to-[#F2F2F2] rounded-3xl p-6 sm:p-8 border-2 border-[#B78D42]/40 shadow-xl space-y-6">
            <div>
              <span className="text-xs text-slate-500 font-black uppercase tracking-wider block mb-1">
                {t.estimator.estTotalCost}
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#202020] tracking-tight">
                {formatPrice(estimatedCost)}
              </div>
              <div className="text-xs text-slate-600 mt-1 flex items-center gap-1.5 font-semibold">
                <span>Built-Up: ~{formatIndianNumber(calculatedTotalArea)} sq.ft</span>
                <span className="text-[#B78D42]">•</span>
                <span className="text-[#202020] font-bold">₹{activePkg.rate}/sq.ft</span>
              </div>
            </div>

            {/* Stage-wise payment breakdown */}
            <div className="space-y-3 pt-2 border-t border-[#B78D42]/20">
              <h3 className="text-xs font-black uppercase tracking-wider text-[#202020] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22CDE1]" />
                <span>{t.estimator.stageBreakdown}</span>
              </h3>

              <div className="space-y-2.5 text-xs">
                {stages.map((stage, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center text-slate-700">
                      <span className="text-[11px] font-medium">{stage.name}</span>
                      <span className="font-bold text-[#202020]">{formatPrice(stage.cost)}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#F6E785] to-[#B78D42] rounded-full"
                        style={{ width: `${stage.percent * 3}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setModalOpen(true)}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#F6E785] via-[#F9DB5C] to-[#B78D42] hover:brightness-105 text-[#202020] font-black text-xs uppercase tracking-wider shadow-gold transition transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2 border border-[#B78D42]/50"
            >
              <FileSpreadsheet className="w-4 h-4 text-[#202020]" />
              <span>{t.estimator.ctaButton}</span>
            </button>

            <div className="flex items-center justify-center gap-2 text-slate-500 text-xs font-medium">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Direct Supervision by Er. J. Vairavel (Civil Engineer)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for BOQ & Site Inspection Request */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="absolute inset-0" onClick={() => setModalOpen(false)} />

          <div className="relative w-full max-w-lg bg-[#202020] border-2 border-[#B78D42]/50 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-white">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-emerald-600/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/40">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white">
                  Estimate Registered Successfully!
                </h3>
                <p className="text-xs text-slate-300">
                  Er. J. Vairavel and our engineering team will review your specifications. Opening WhatsApp to connect directly with your estimate parameters...
                </p>
                <button
                  onClick={() => setModalOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] font-black text-xs"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div className="space-y-1">
                  <div className="text-[#F9DB5C] font-black text-xs uppercase tracking-wider">
                    Turnkey Construction Quotation
                  </div>
                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {t.estimator.modalTitle}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {t.estimator.modalSubtitle}
                  </p>
                </div>

                {/* Estimate Snapshot with Brand Cyan & Gold */}
                <div className="bg-[#2B2B2B] p-3.5 rounded-2xl border border-[#B78D42]/40 text-xs space-y-1.5">
                  <div className="flex justify-between text-slate-300">
                    <span>Package:</span>
                    <strong className="text-[#F9DB5C]">{activePkg.name} (₹{activePkg.rate}/sq.ft)</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Estimated Area:</span>
                    <strong className="text-[#22CDE1]">{calculatedTotalArea} sq.ft ({floors})</strong>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Est. Cost:</span>
                    <strong className="text-emerald-400 font-black">{formatPrice(estimatedCost)}</strong>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. R. Saravanan"
                      value={leadForm.name}
                      onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-black border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Phone / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98424 00000"
                      value={leadForm.phone}
                      onChange={(e) => setLeadForm({ ...leadForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-black border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      Plot Location (Locality in Trichy)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Olaiyur Phase 2 / K.K. Nagar Ring Road"
                      value={leadForm.plotLocation}
                      onChange={(e) => setLeadForm({ ...leadForm, plotLocation: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-black border border-slate-700 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-gold-400"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 disabled:opacity-50 border border-emerald-400/30"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? "Submitting..." : "Submit & Connect via WhatsApp"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
