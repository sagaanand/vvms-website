"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { TRICHY_CORRIDORS, MicroMarketComps } from "@/lib/namnilam-data";
import { formatLakhsCrores } from "@/lib/utils";
import {
  BarChart3,
  TrendingUp,
  FileText,
  ShieldCheck,
  Droplets,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  MessageCircle,
  Phone,
  Search,
  Calculator,
  Compass,
  FileSearch,
  Building,
  Layers,
} from "lucide-react";

export default function IntelligencePage() {
  const { language } = useLanguage();
  const [selectedCorridorFilter, setSelectedCorridorFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCalculatorLocality, setActiveCalculatorLocality] = useState(TRICHY_CORRIDORS[0].locality);
  const [calculatorSqft, setCalculatorSqft] = useState<number>(1200);

  // Filter corridors
  const filteredCorridors = useMemo(() => {
    return TRICHY_CORRIDORS.filter((item) => {
      const matchesCategory =
        selectedCorridorFilter === "All" || item.corridorType === selectedCorridorFilter;
      const matchesSearch =
        item.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.localityTa.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCorridorFilter, searchQuery]);

  // Selected corridor for calculator
  const calcCorridor = useMemo(() => {
    return (
      TRICHY_CORRIDORS.find((c) => c.locality === activeCalculatorLocality) ||
      TRICHY_CORRIDORS[0]
    );
  }, [activeCalculatorLocality]);

  // Calculator computations
  const totalGuidelineValue = calculatorSqft * calcCorridor.guidelineValuePerSqFt;
  const totalMarketValue = calculatorSqft * calcCorridor.actualMarketRatePerSqFt;
  const estimatedStampRegistration = Math.round(totalMarketValue * 0.09); // 9% stamp duty + reg
  const estimatedBankLoan = Math.round(totalMarketValue * 0.8); // 80% LTV
  const estimatedDownpayment = totalMarketValue - estimatedBankLoan;

  const handleWhatsAppInquiry = (topic: string, details?: string) => {
    const text = encodeURIComponent(
      `Hello Er. J. Vairavel & VVMS Intelligence Team, I am interested in: *${topic}*.\n${
        details ? `Details: ${details}\n` : ""
      }Please guide me with the verified data report.`
    );
    window.open(`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${text}`, "_blank");
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
                ? "நில வழிகாட்டி நுண்ணறிவு முன்னோட்டம் • பதிவுத்துறை வழிகாட்டி மதிப்பு மற்றும் சந்தை மதிப்பீட்டு ஆய்வு."
                : "Property Intelligence Visual Preview • Sub-Registrar guideline values, corridor appreciation, and infrastructure analytics."}
            </span>
          </div>
          <span className="hidden md:inline text-amber-300 text-[11px] font-bold">
            Methodology & SRO Deeds
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto space-y-12 px-4 sm:px-6 lg:px-8 pt-8">
        {/* Hero Section */}
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-black via-brand-dark to-slate-900 border border-gold-500/30 p-8 sm:p-12 overflow-hidden shadow-2xl">
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-card border border-gold-500/40 text-gold-400 text-xs font-bold uppercase tracking-wider">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Institutional Land Intelligence & Micro-Market Comps</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              Trichy Land Intelligence & <br />
              <span className="text-gold-400">Sub-Registrar Guideline Value</span> Hub
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Curated under the civil engineering leadership of{" "}
              <strong className="text-white">Er. J. Vairavel</strong>. Unbiased, registered
              transaction comps, guideline values, groundwater aquifer depths, and mega infrastructure
              impact matrices across Tiruchirappalli so you never overpay.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs sm:text-sm">
              <div className="flex items-center gap-2 bg-brand-card/80 px-3.5 py-2 rounded-xl border border-gold-500/30 text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>8 Major Trichy Corridors Audited</span>
              </div>
              <div className="flex items-center gap-2 bg-brand-card/80 px-3.5 py-2 rounded-xl border border-cyan-500/30 text-slate-200">
                <ShieldCheck className="w-4 h-4 text-cyan-400" />
                <span>100% Registered SRO Transaction Data</span>
              </div>
              <div className="flex items-center gap-2 bg-brand-card/80 px-3.5 py-2 rounded-xl border border-red-500/30 text-slate-200">
                <Droplets className="w-4 h-4 text-cyan-300" />
                <span>Groundwater & Soil Tested</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Intelligence Report Packages (Nam Nilam Inspired) */}
        <div>
          <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
            <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Verified Dossiers & Audits
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Data-Backed Intelligence Reports Before You Invest
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              Whether you are buying a 1,200 sq.ft plot or a 2-acre layout, make decisions backed by
              civil engineering ground reality and legal scrutiny.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Report 1 */}
            <div className="bg-brand-card rounded-2xl border border-gold-500/30 p-6 flex flex-col justify-between hover:border-gold-400 transition shadow-lg group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-brand-black rounded-xl border border-gold-500/40 text-gold-400">
                    <FileSearch className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-gold-500/20 text-gold-400 border border-gold-500/40">
                    ₹199 Only
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition">
                    Micro-Market Intelligence Report
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Instant verified comparative dossier for any specific Trichy survey number or
                    locality.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>Exact SRO Guideline Value vs Market Comps</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>3-Year Historical Price Appreciation Rate</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>Realistic Negotiation Range to Save Lakhs</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>Upcoming Infrastructure Timeline (Semi-Ring Road / Bus Stand)</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() =>
                    handleWhatsAppInquiry(
                      "₹199 Micro-Market Data Intelligence Report",
                      "Locality/Survey Number: Trichy"
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs transition shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Order Report (₹199)</span>
                </button>
              </div>
            </div>

            {/* Report 2 - Featured */}
            <div className="bg-brand-card rounded-2xl border-2 border-cyan-400/80 p-6 flex flex-col justify-between shadow-cyan relative group">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-cyan-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
                Most Recommended By Er. J. Vairavel
              </div>
              <div className="space-y-4 pt-1">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-brand-black rounded-xl border border-cyan-500/40 text-cyan-400">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                    ₹3,999 Audit
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition">
                    On-Site Technical & Water Audit
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Physical on-ground civil engineering inspection before you pay token advance.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Physical survey stone check & road width measurement</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Groundwater aquifer depth & potable water TDS test</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Soil bearing capacity & foundation recommendation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>Monsoon flood contour & TNEB power grid feasibility</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() =>
                    handleWhatsAppInquiry(
                      "₹3,999 On-Site Technical & Water Audit",
                      "Plot Site Location: Trichy"
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black text-xs transition shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Book Site Audit (₹3,999)</span>
                </button>
              </div>
            </div>

            {/* Report 3 */}
            <div className="bg-brand-card rounded-2xl border border-gold-500/30 p-6 flex flex-col justify-between hover:border-gold-400 transition shadow-lg group">
              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div className="p-3 bg-brand-black rounded-xl border border-gold-500/40 text-gold-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-gold-500/20 text-gold-400 border border-gold-500/40">
                    ₹4,999 Legal
                  </span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-gold-400 transition">
                    30-Year Advocate Title Scrutiny
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Complete civil legal docket verified by High Court & District Court advocates.
                  </p>
                </div>

                <ul className="space-y-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>30-Year Encumbrance Certificate (EC) scrutiny from 1975</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>Patta, Chitta, Adangal, and 'A' Register online audit</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>FMB survey sketch boundary match and subdivision check</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-gold-400 flex-shrink-0" />
                    <span>Section 47A undervaluation & revenue court litigation check</span>
                  </li>
                </ul>
              </div>

              <div className="pt-6">
                <button
                  onClick={() =>
                    handleWhatsAppInquiry(
                      "₹4,999 30-Year Advocate Legal Title Opinion",
                      "Property Document Verification"
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs transition shadow-md"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Request Legal Opinion (₹4,999)</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive SRO Guideline vs Market Price Matrix */}
        <div className="bg-brand-card rounded-3xl border border-brand-dark p-6 sm:p-8 space-y-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Micro-Market Corridor Valuation Table</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
                SRO Guideline Value vs. Actual Market Rate in Trichy
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Compare official registration guideline values against actual on-road transactions.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search Trichy locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-brand-black border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-800">
            {["All", "Prime Residential", "Fast Growth Corridor", "Industrial / Commercial"].map(
              (category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCorridorFilter(category)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedCorridorFilter === category
                      ? "bg-gold-500 text-slate-950 shadow-gold"
                      : "bg-brand-black text-slate-400 hover:text-white border border-slate-800"
                  }`}
                >
                  {category}
                </button>
              )
            )}
          </div>

          {/* Table for Desktop */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800 text-[11px] font-black uppercase tracking-wider text-slate-400 bg-brand-black/50">
                  <th className="py-3 px-4">Locality / Corridor</th>
                  <th className="py-3 px-4">Corridor Type</th>
                  <th className="py-3 px-4 text-right">SRO Guideline</th>
                  <th className="py-3 px-4 text-right">Actual Market Rate</th>
                  <th className="py-3 px-4 text-center">Price Spread</th>
                  <th className="py-3 px-4 text-center">3-Yr Trend</th>
                  <th className="py-3 px-4">Water Depth & Quality</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs">
                {filteredCorridors.map((c) => {
                  const spreadPercent = Math.round(
                    ((c.actualMarketRatePerSqFt - c.guidelineValuePerSqFt) /
                      c.guidelineValuePerSqFt) *
                      100
                  );

                  return (
                    <tr
                      key={c.locality}
                      className="hover:bg-brand-black/40 transition group cursor-pointer"
                      onClick={() => setActiveCalculatorLocality(c.locality)}
                    >
                      <td className="py-3.5 px-4 font-bold text-white group-hover:text-gold-400 transition">
                        <div>{c.locality}</div>
                        <div className="text-[11px] text-slate-400 font-normal">{c.localityTa}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            c.corridorType === "Prime Residential"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                              : c.corridorType === "Fast Growth Corridor"
                              ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/30"
                          }`}
                        >
                          {c.corridorType}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right font-semibold text-slate-300">
                        ₹{c.guidelineValuePerSqFt.toLocaleString()}/sq.ft
                      </td>
                      <td className="py-3.5 px-4 text-right font-black text-gold-400 text-sm">
                        ₹{c.actualMarketRatePerSqFt.toLocaleString()}/sq.ft
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <span className="font-extrabold text-cyan-400 bg-cyan-950/40 px-2 py-1 rounded border border-cyan-800/40 text-[11px]">
                          +{spreadPercent}%
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center font-bold text-emerald-400">
                        <div className="flex items-center justify-center gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          <span>{c.threeYearAppreciation}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="flex items-center gap-1 text-slate-200">
                          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{c.groundwaterDepth}</span>
                        </div>
                        <div className="text-[10px] text-slate-400">{c.potableWaterRating}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleWhatsAppInquiry(
                              `Comps Report for ${c.locality}`,
                              `Guideline: ₹${c.guidelineValuePerSqFt}/sqft, Market: ₹${c.actualMarketRatePerSqFt}/sqft`
                            );
                          }}
                          className="px-2.5 py-1 rounded-lg bg-brand-black border border-gold-500/40 text-gold-400 hover:bg-gold-500 hover:text-slate-950 font-bold text-[11px] transition"
                        >
                          Inquire
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Cards for Mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
            {filteredCorridors.map((c) => {
              const spreadPercent = Math.round(
                ((c.actualMarketRatePerSqFt - c.guidelineValuePerSqFt) /
                  c.guidelineValuePerSqFt) *
                  100
              );

              return (
                <div
                  key={c.locality}
                  className="bg-brand-black p-4 rounded-xl border border-slate-800 space-y-3"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold text-white text-sm">{c.locality}</div>
                      <div className="text-xs text-slate-400">{c.localityTa}</div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-800/40">
                      {c.threeYearAppreciation} 3-Yr
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-800">
                    <div>
                      <div className="text-[10px] text-slate-500">SRO Guideline:</div>
                      <div className="font-semibold text-slate-300">
                        ₹{c.guidelineValuePerSqFt}/sq.ft
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Actual Market:</div>
                      <div className="font-black text-gold-400">
                        ₹{c.actualMarketRatePerSqFt}/sq.ft
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Price Spread:</div>
                      <div className="font-bold text-cyan-400">+{spreadPercent}% over SRO</div>
                    </div>
                    <div>
                      <div className="text-[10px] text-slate-500">Groundwater:</div>
                      <div className="text-slate-300">{c.groundwaterDepth}</div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      handleWhatsAppInquiry(
                        `Comps Report for ${c.locality}`,
                        `Guideline: ₹${c.guidelineValuePerSqFt}/sqft, Market: ₹${c.actualMarketRatePerSqFt}/sqft`
                      )
                    }
                    className="w-full py-2 bg-brand-card border border-gold-500/40 hover:bg-gold-500 hover:text-slate-950 text-gold-400 rounded-lg text-xs font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Get Detailed Corridor Dossier</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Guideline vs Market Acquisition Calculator */}
        <div className="bg-gradient-to-r from-brand-black via-brand-dark to-brand-black rounded-3xl border border-gold-500/30 p-6 sm:p-10 shadow-xl space-y-8">
          <div className="max-w-3xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 uppercase tracking-widest">
              <Calculator className="w-4 h-4" />
              <span>Interactive Land Budget Estimator</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Calculate True On-Road Land Acquisition Cost
            </h2>
            <p className="text-xs sm:text-sm text-slate-300">
              Select any micro-market corridor and plot size to calculate official guideline value,
              actual market budget, 9% government registration & stamp duty, and maximum bank loan
              sanction.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Input Controls (5 Cols) */}
            <div className="lg:col-span-5 bg-brand-card p-6 rounded-2xl border border-slate-800 space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-2">
                  Select Trichy Micro-Market:
                </label>
                <select
                  value={activeCalculatorLocality}
                  onChange={(e) => setActiveCalculatorLocality(e.target.value)}
                  className="w-full bg-brand-black border border-slate-700 text-white rounded-xl px-3.5 py-2.5 text-xs font-bold focus:outline-none focus:border-cyan-400"
                >
                  {TRICHY_CORRIDORS.map((c) => (
                    <option key={c.locality} value={c.locality}>
                      {c.locality} ({c.corridorType})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold text-slate-300">
                    Plot Size: <span className="text-gold-400 font-extrabold">{calculatorSqft} sq.ft</span>
                  </label>
                  <span className="text-[11px] text-slate-400">
                    ({(calculatorSqft / 435.6).toFixed(2)} Cents)
                  </span>
                </div>
                <input
                  type="range"
                  min={600}
                  max={4800}
                  step={100}
                  value={calculatorSqft}
                  onChange={(e) => setCalculatorSqft(Number(e.target.value))}
                  className="w-full accent-gold-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                  <span>600 sq.ft (1.38 Cts)</span>
                  <span>1,200 sq.ft (2.75 Cts)</span>
                  <span>2,400 sq.ft (1 Ground)</span>
                  <span>4,800 sq.ft</span>
                </div>
              </div>

              <div className="bg-brand-black p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>SRO Guideline Rate:</span>
                  <span className="text-slate-200 font-semibold">₹{calcCorridor.guidelineValuePerSqFt}/sq.ft</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Estimated Market Rate:</span>
                  <span className="text-gold-400 font-bold">₹{calcCorridor.actualMarketRatePerSqFt}/sq.ft</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Groundwater Table:</span>
                  <span className="text-cyan-400 font-medium">{calcCorridor.groundwaterDepth}</span>
                </div>
              </div>
            </div>

            {/* Computation Output (7 Cols) */}
            <div className="lg:col-span-7 bg-brand-card p-6 sm:p-8 rounded-2xl border border-gold-500/40 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 bg-brand-black rounded-xl border border-slate-800">
                  <div className="text-[11px] text-slate-400 font-medium">SRO Guideline Total</div>
                  <div className="text-xl font-bold text-slate-200 mt-1">
                    {formatLakhsCrores(totalGuidelineValue)}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Official revenue assessment baseline
                  </div>
                </div>

                <div className="p-4 bg-brand-black rounded-xl border border-gold-500/50 shadow-gold">
                  <div className="text-[11px] text-gold-400 font-bold">Estimated Market Value</div>
                  <div className="text-2xl font-black text-gold-400 mt-1">
                    {formatLakhsCrores(totalMarketValue)}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Realistic transaction cost on ground
                  </div>
                </div>
              </div>

              {/* Financial Breakdown */}
              <div className="space-y-3 pt-2 border-t border-slate-800 text-xs">
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-300">Govt Stamp Duty & Registration (approx 9%):</span>
                  <span className="font-bold text-white">₹{estimatedStampRegistration.toLocaleString()}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800/60">
                  <span className="text-slate-300">Bank Loan Eligibility (SBI / HDFC up to 80%):</span>
                  <span className="font-bold text-emerald-400">
                    {formatLakhsCrores(estimatedBankLoan)}
                  </span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-slate-300">Required Buyer Downpayment (approx 20%):</span>
                  <span className="font-bold text-cyan-300">
                    {formatLakhsCrores(estimatedDownpayment)}
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2">
                <button
                  onClick={() =>
                    handleWhatsAppInquiry(
                      `Land Valuation Scrutiny: ${calculatorSqft} sq.ft in ${calcCorridor.locality}`,
                      `Estimated Market Price: ${formatLakhsCrores(
                        totalMarketValue
                      )}, Guideline: ${formatLakhsCrores(totalGuidelineValue)}`
                    )
                  }
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gold-500 hover:bg-gold-400 text-slate-950 font-black text-xs sm:text-sm shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Discuss This Plot Valuation With Er. J. Vairavel</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trichy Mega Infrastructure Catalysts */}
        <div className="space-y-6">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="text-xs font-bold text-gold-400 uppercase tracking-widest">
              Growth Drivers & Catalysts
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Trichy Mega Infrastructure Impact Analysis
            </h2>
            <p className="text-slate-400 text-xs sm:text-sm">
              How state expressways, semi-ring roads, and terminal hubs will impact property prices
              over the next 3 to 5 years.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-brand-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase">
                <Building className="w-4 h-4" />
                <span>₹850+ Crore Mega Project</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Panjappur Integrated Bus Terminus & TIDEL Park Trichy
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Relocating Trichy's central bus operations from Central/Chathiram to Panjappur creates a
                massive multi-modal transport and commercial nerve center. Accompanied by the upcoming
                Trichy TIDEL Park, land parcels along Panjappur and Dindigul Highway have recorded a
                65% 3-year value surge.
              </p>
              <div className="text-[11px] text-gold-400 font-semibold pt-1">
                Beneficiary Corridors: Panjappur, K.K. Nagar Southern Link, Manikandam, Edamalaipatti Pudur.
              </div>
            </div>

            <div className="bg-brand-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-gold-400 text-xs font-bold uppercase">
                <Compass className="w-4 h-4" />
                <span>Arterial Ring Connectivity</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Trichy Semi-Ring Road (Stages 1 & 2)
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Connecting Jeeyapuram (Karur Road), NH-45, Panjappur, Mathur (Pudukkottai Road), and
                Thuvakudi (Tanjore Highway). Heavy container and passenger traffic bypasses congested
                city corridors, unlocking virgin agricultural-to-DTCP layouts along the Olaiyur and
                Valli Tower ring junctions.
              </p>
              <div className="text-[11px] text-cyan-400 font-semibold pt-1">
                Beneficiary Corridors: Olaiyur Ring Road, Mathur, Somarasampettai, Thuvakudi Bypass.
              </div>
            </div>

            <div className="bg-brand-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase">
                <TrendingUp className="w-4 h-4" />
                <span>Aviation Expansion</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Trichy International Airport New Integrated Terminal
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                The state-of-the-art ₹1,200-crore terminal handles over 4.5 million international and
                domestic passengers annually, driving massive demand for hospitality, warehousing, and
                luxury residential villas along NH-336 (Trichy-Pudukkottai Highway) and Gundur.
              </p>
              <div className="text-[11px] text-gold-400 font-semibold pt-1">
                Beneficiary Corridors: Gundur, Airport Link Road, Mathur Industrial Zone.
              </div>
            </div>

            <div className="bg-brand-card p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase">
                <Droplets className="w-4 h-4" />
                <span>Civic Infrastructure</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Cauvery Drinking Water Scheme & City UGD Expansion
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Phase-3 Underground Drainage (UGD) expansion and dedicated Cauvery drinking water supply
                pipelines extended to expanded corporation zones ensure long-term potable water security
                and eliminate groundwater salinity concerns.
              </p>
              <div className="text-[11px] text-cyan-400 font-semibold pt-1">
                Beneficiary Corridors: Vayalur Road, Crawford, Karumandapam RMS Colony, Pirattiyur.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="bg-brand-black rounded-3xl border border-gold-500/40 p-8 sm:p-12 text-center space-y-6 shadow-gold">
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Evaluating a Specific Plot or Survey Number in Trichy?
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm">
              Don’t rely on hearsay or seller claims. Send your survey number, layout name, or FMB sketch
              to Er. J. Vairavel for authentic SRO comps and ground engineering reality check.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                "Hello Er. J. Vairavel, I would like to get a Land Intelligence & Guideline valuation review for my plot in Trichy."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-sm shadow-lg transition"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Send Survey Details on WhatsApp</span>
            </a>

            <Link
              href="/academy"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-card hover:bg-slate-800 text-slate-200 font-bold text-sm border border-slate-700 transition"
            >
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Read 30-Year Due Diligence Academy</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
