"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import {
  CheckCircle2,
  XCircle,
  Building2,
  Home,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Layers,
} from "lucide-react";

export default function PlotVsApartmentMatrix() {
  const { language } = useLanguage();

  const comparisonFactors = [
    {
      factor: language === "ta" ? "நில உரிமை & பட்டா" : "Land Ownership & Patta",
      plotValue:
        language === "ta"
          ? "100% முழுமையான நில உரிமை. உங்கள் குடும்பப் பெயரில் தனிப்பட்டா (Individual Patta)."
          : "100% Absolute Land Ownership. Individual Patta in your family's name with clear revenue subdivision.",
      flatValue:
        language === "ta"
          ? "பிரிக்கப்படாத நிலப் பங்கு (Undivided Share - UDS) மட்டுமே. பொதுவான கூட்டுப்பட்டா."
          : "Undivided Share of Land (UDS) only. Shared common ownership with 50+ other flat owners.",
      plotAdvantage: true,
    },
    {
      factor: language === "ta" ? "சொத்து மதிப்பு உயர்வு (Appreciation)" : "Capital Appreciation (Trichy)",
      plotValue:
        language === "ta"
          ? "ஆண்டுதோறும் 12% முதல் 15% வரை நில மதிப்பு உயர்வு. பஞ்சப்பூர்/ரிங் ரோட்டில் இன்னும் கூடுதல்."
          : "12% to 15% Annual Land Value Surge in high-growth corridors (Panjappur, Semi-Ring Road).",
      flatValue:
        language === "ta"
          ? "ஆண்டுக்கு 5% முதல் 7% மட்டுமே. கட்டடம் பழையதாக ஆக அதன் மதிப்பு குறைகிறது (Depreciation)."
          : "5% to 7% only. Building structure depreciates over time, offsetting land gains.",
      plotAdvantage: true,
    },
    {
      factor: language === "ta" ? "கட்டுமான சுதந்திரம் (Freedom to Build)" : "Construction Autonomy",
      plotValue:
        language === "ta"
          ? "உங்களுக்கு விருப்பமான நேரத்தில், தேவையான பட்ஜெட்டில் Er. J. வைரவேலின் மேற்பார்வையில் G+1 / G+2 கட்டலாம்."
          : "Complete freedom to construct customized G+1 or G+2 independent home with Er. J. Vairavel when ready.",
      flatValue:
        language === "ta"
          ? "பில்டர் கொடுத்த நிலையான பிளான் மட்டுமே. மாற்றம் செய்ய முடியாது, சங்கம் (Association) கட்டுப்பாடுகள் அதிகம்."
          : "Fixed builder floor plan. Zero structural modification freedom, restricted by flat association bylaws.",
      plotAdvantage: true,
    },
    {
      factor: language === "ta" ? "மாதாந்திர பராமரிப்பு கட்டணம்" : "Recurring Monthly Maintenance",
      plotValue:
        language === "ta"
          ? "மாதாந்திர பராமரிப்பு செலவு ₹0 (பூஜ்ஜியம்). உங்கள் மனையை நீங்கள் மட்டுமே நிர்வகிக்கலாம்."
          : "Zero Recurring Maintenance Dues (₹0/month). Zero dependency on association politics.",
      flatValue:
        language === "ta"
          ? "மாதம்தோறும் ₹2,500 முதல் ₹5,000 வரை வாழ்நாள் முழுவதும் லிஃப்ட், செக்யூரிட்டி கட்டணம் செலுத்த வேண்டும்."
          : "Mandatory ₹2,500 – ₹5,000/month recurring lifetime maintenance for lift, diesel generator, and security.",
      plotAdvantage: true,
    },
    {
      factor: language === "ta" ? "தலைமுறை சொத்து பாதுகாப்பு" : "Generational Wealth Lifespan",
      plotValue:
        language === "ta"
          ? "நிலத்திற்கு காலாவதி தேதி இல்லை. பல தலைமுறைகளுக்கு பாதுகாப்பான அசைக்க முடியாத குடும்ப சொத்து."
          : "Land lasts forever with no structural expiry date. Generational wealth asset with 100% inheritance safety.",
      flatValue:
        language === "ta"
          ? "40 முதல் 50 வருடங்களில் RCC கான்கிரீட் பலவீனமடைந்து மறுசீரமைப்பு (Demolition/Redevelopment) தேவைப்படும்."
          : "40 to 50-year structural RCC lifespan. Concrete degrades, requiring complex redevelopment consensus.",
      plotAdvantage: true,
    },
    {
      factor: language === "ta" ? "மறுவிற்பனை & பணப்புழக்கம் (Liquidity)" : "Resale Liquidity in Trichy",
      plotValue:
        language === "ta"
          ? "திருச்சியில் தனி வீட்டுமனைகளுக்கு எப்போதும் அதிக கிராக்கி உண்டு. எந்த நேரத்திலும் எளிதாக விற்கலாம்."
          : "Consistently high demand for individual residential plots in Trichy. Fastest resale liquidity.",
      flatValue:
        language === "ta"
          ? "15 வருடங்கள் பழமையான பழைய அடுக்குமாடி வீடுகளை விற்பது மிகக் கடினம், குறைந்த விலைக்கு கேட்கப்படும்."
          : "10-15+ year old resale apartments suffer heavy price resistance compared to fresh developments.",
      plotAdvantage: true,
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-[#F2F2F2] border-t border-b border-[#B78D42]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#B78D42]/40 text-[#202020] text-xs font-black uppercase tracking-wider shadow-sm">
            <Layers className="w-3.5 h-3.5 text-[#B78D42]" />
            <span>
              {language === "ta"
                ? "வாங்குபவர் விழிப்புணர்வு வழிகாட்டி"
                : "Homebuyer Strategic Decision Framework"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#202020] tracking-tight">
            {language === "ta"
              ? "வீட்டுமனை (Plot) vs அடுக்குமாடி குடியிருப்பு (Flat) — எது சிறந்தது?"
              : "Plotted Land vs. Apartment Flat: Which is the Smarter Choice in Trichy?"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {language === "ta"
              ? "திருச்சியில் உங்கள் கடின உழைப்பின் சேமிப்பை முதலீடு செய்யும் போது நிலத்தின் மதிப்பையும், காலாவதி இல்லாத முழு உரிமையையும் ஒப்பிட்டுப் பாருங்கள்."
              : "Compare 100% land title, long-term capital appreciation, and generational wealth security before committing your hard-earned capital."}
          </p>
        </div>

        {/* Matrix Comparison Table Styled with Brand Palette */}
        <div className="bg-white rounded-3xl border-2 border-[#B78D42]/40 shadow-xl overflow-hidden">
          <div className="grid grid-cols-12 bg-[#202020] text-white p-4 sm:p-5 border-b-2 border-[#B78D42] text-xs sm:text-sm font-black">
            <div className="col-span-4 sm:col-span-3 text-[#F9DB5C] uppercase tracking-wider">
              {language === "ta" ? "முக்கிய காரணிகள்" : "Critical Factors"}
            </div>
            <div className="col-span-4 sm:col-span-5 flex items-center gap-1.5 text-[#F9DB5C]">
              <Home className="w-4 h-4 text-[#F9DB5C]" />
              <span>{language === "ta" ? "DTCP வீட்டுமனை (Plot) + தனி வீடு" : "DTCP Plotted Land (VVMS Standard)"}</span>
            </div>
            <div className="col-span-4 sm:col-span-4 flex items-center gap-1.5 text-slate-300">
              <Building2 className="w-4 h-4 text-slate-400" />
              <span>{language === "ta" ? "அடுக்குமாடி குடியிருப்பு (Flat)" : "Apartment Flat (UDS Only)"}</span>
            </div>
          </div>

          <div className="divide-y divide-slate-100">
            {comparisonFactors.map((row, index) => (
              <div
                key={index}
                className={`grid grid-cols-12 p-4 sm:p-6 text-xs sm:text-sm items-center gap-3 transition-colors ${
                  index % 2 === 0 ? "bg-white" : "bg-slate-50/70"
                }`}
              >
                {/* Factor Name */}
                <div className="col-span-12 sm:col-span-3 font-black text-[#202020] flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#B78D42] flex-shrink-0" />
                  <span>{row.factor}</span>
                </div>

                {/* Plot Advantage Column (Highlighted in Brand Gold tint) */}
                <div className="col-span-12 sm:col-span-5 p-3 sm:p-4 rounded-2xl bg-[#F9DB5C]/10 border border-[#B78D42]/30 space-y-1">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-[#202020] font-bold leading-relaxed">{row.plotValue}</span>
                  </div>
                </div>

                {/* Flat Drawbacks Column */}
                <div className="col-span-12 sm:col-span-4 p-3 sm:p-4 rounded-2xl bg-slate-100/80 border border-slate-200 text-slate-600 space-y-1">
                  <div className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-rose-500 flex-shrink-0 mt-0.5" />
                    <span className="font-medium leading-relaxed">{row.flatValue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Summary Callout */}
          <div className="p-6 sm:p-8 bg-gradient-to-r from-[#202020] to-[#2B2B2B] text-white flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#B78D42]/30">
            <div className="space-y-1 text-center md:text-left">
              <div className="text-xs font-black text-[#F9DB5C] uppercase tracking-wider">
                {language === "ta" ? "பொறியியல் பரிந்துரை" : "Civil Engineering Conclusion"}
              </div>
              <p className="text-xs sm:text-sm text-slate-300 font-medium max-w-2xl leading-relaxed">
                {language === "ta"
                  ? "நிலத்தில் முதலீடு செய்து Er. J. வைரவேலின் நேரடி மேற்பார்வையில் டர்ன்கீ முறையில் தனி வீடு கட்டுவதே நீண்ட கால முதலீட்டிற்கும், குடும்பத்தின் சுதந்திரத்திற்கும் 100% உகந்தது."
                  : "Securing 100% DTCP plotted land and constructing your independent custom home with Er. J. Vairavel delivers far higher equity, privacy, and lifetime family security than an undivided flat."}
              </p>
            </div>

            <div className="flex-shrink-0 flex items-center gap-3">
              <Link
                href="/properties"
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] hover:brightness-105 text-[#202020] font-black text-xs shadow-gold transition border border-[#B78D42]/50 inline-flex items-center gap-2"
              >
                <span>{language === "ta" ? "அப்ரூவ்டு மனைகளைக் காண்க" : "Explore DTCP Plots"}</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#202020]" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
