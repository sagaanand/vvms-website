"use client";

import React from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Phone,
  MessageCircle,
} from "lucide-react";

export default function SafePurchaseStandard() {
  const { language } = useLanguage();

  const standards = [
    {
      feature: language === "ta" ? "அரசு அங்கீகாரம் (Approval)" : "Legal Layout Approval",
      vvmsStandard:
        language === "ta"
          ? "100% DTCP & RERA அப்ரூவல். 30/33 அடி தார் சாலைகள் அரசுக்கு தானசெட்டில்மெண்ட் (Gift Deed) செய்யப்பட்டது."
          : "100% DTCP & RERA Approved with 30ft/33ft blacktop tar roads and OSR parks legally gift-deeded to the local body.",
      brokerRisk:
        language === "ta"
          ? "அங்கீகாரமற்ற பஞ்சாயத்து லே-அவுட்கள். அரசு இடிக்க உத்தரவிடலாம் அல்லது பதிவு செய்ய தடை விதிக்கலாம்."
          : "Unapproved panchayat subdivisions facing demolition risk, court registration bans, and lack of EB connections.",
    },
    {
      feature: language === "ta" ? "விலை வெளிப்படைத்தன்மை & புரோக்கரேஜ்" : "Pricing & Brokerage",
      vvmsStandard:
        language === "ta"
          ? "நேரடி விலை. வாங்குபவரிடம் 0% புரோக்கரேஜ் (கமிஷன் இல்லை). எந்தவொரு ரகசிய கட்டணமும் இல்லை."
          : "Direct promoter price with 0% Buyer Commission. Complete breakdown of on-road cost including 9% stamp duty.",
      brokerRisk:
        language === "ta"
          ? "20% முதல் 40% வரை கூட்டிச் சொல்லப்படும் விலைகள். வாங்குபவர், விற்பவர் இருவரிடமும் கமிஷன் வசூல்."
          : "Inflated quotes with 20% to 40% artificial markups and hidden side-commissions taken from both parties.",
    },
    {
      feature: language === "ta" ? "சட்ட ஆவண ஆய்வு (Legal Scrutiny)" : "30-Year Parent Deed Scrutiny",
      vvmsStandard:
        language === "ta"
          ? "1975 முதல் 30 வருட தொடர்ச்சியான வில்லங்கச் சான்றிதழ் (EC), தனிப்பட்டா மற்றும் வழக்கறிஞர் சட்ட சான்று."
          : "Continuous 30-year Encumbrance Certificate (EC) from 1975, individual revenue Patta check, and written advocate scrutiny.",
      brokerRisk:
        language === "ta"
          ? "ஜெராக்ஸ் காப்பிகள் மட்டுமே காட்டப்படும். வாரிசுரிமை தகராறுகள், அடமானம், 47A பாக்கிகள் மறைக்கப்படும்."
          : "Photocopies only. Undisclosed family partition suits, hidden bank mortgages, and Section 47A revenue liens.",
    },
    {
      feature: language === "ta" ? "கள உண்மை & பொறியியல் ஆய்வு" : "Ground Reality & Engineering Check",
      vvmsStandard:
        language === "ta"
          ? "Er. J. வைரவேல் (Civil Engineer) அவர்களின் 4K நேரடி வீடியோ, சாலை அகல அளவீடு, மண் மற்றும் நிலத்தடி நீர் சோதனை."
          : "4K on-camera walkthrough by Er. J. Vairavel, physical road width tape measurement, and soil/groundwater potable audit.",
      brokerRisk:
        language === "ta"
          ? "ஃபோட்டோஷாப் படங்கள், தண்ணீர் இல்லாத அல்லது மழைக்காலத்தில் மூழ்கும் பள்ளமான நிலங்களை விற்றுவிடுவார்கள்."
          : "Misleading photos, zero elevation check, selling low-lying floodwater retention land without technical advice.",
    },
    {
      feature: language === "ta" ? "வங்கி கடன் உதவி (Bank Loan)" : "Nationalized Bank Financing",
      vvmsStandard:
        language === "ta"
          ? "SBI, HDFC, ICICI போன்ற தேசியமயமாக்கப்பட்ட வங்கிகளில் 80% வரை கடன் பெற முழு ஆவண உதவி."
          : "Pre-approved for up to 80% home loans from SBI, HDFC, ICICI, and Canara Bank with complete document support.",
      brokerRisk:
        language === "ta"
          ? "வங்கிகள் கடனை நிராகரித்து விடும். அதிக வட்டிக்கு கந்துவட்டி/தனியார் நிதி நிறுவனங்களை நாடுவர்."
          : "Nationalized bank loan rejections, forcing buyers into high-interest private non-banking lenders.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F2F2F2] border border-[#B78D42]/40 text-[#202020] text-xs font-black uppercase tracking-wider shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>
              {language === "ta"
                ? "பாதுகாப்பான நில முதலீட்டு தரம்"
                : "Safe Land Acquisition Standard"}
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#202020] tracking-tight">
            {language === "ta"
              ? "வீடு வீட்டுமனை சந்தையின் பொறியியல் தரம் vs புரோக்கர் ஆபத்துகள்"
              : "The VVMS Engineering Standard vs. Unverified Broker Risks"}
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            {language === "ta"
              ? "திருச்சியில் மனை வாங்கும் முன் உங்கள் பணத்தையும் எதிர்காலத்தையும் பாதுகாக்க இந்த 5 கட்டாய பாதுகாப்பு நெறிமுறைகளை சரிபாருங்கள்."
              : "Protect your hard-earned life savings. See how Er. J. Vairavel's civil engineering standards protect you from dangerous real estate pitfalls."}
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left Column: VVMS Verified Standard */}
          <div className="bg-[#202020] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#B78D42] shadow-2xl flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#F9DB5C]/10 rounded-full blur-3xl pointer-events-none" />

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#2E2E2E] mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                    <ShieldCheck className="w-6 h-6 text-emerald-400" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-[#F9DB5C] block">
                      Guaranteed Safety
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-white">
                      The VVMS Engineering Standard
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black">
                  100% Protected
                </span>
              </div>

              <div className="space-y-6">
                {standards.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="text-xs font-black text-[#F9DB5C] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{item.feature}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium pl-5">
                      {item.vvmsStandard}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-[#2E2E2E] flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="flex-1 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] hover:brightness-105 text-[#202020] font-black text-xs shadow-gold transition text-center border border-[#B78D42]/50"
              >
                {language === "ta" ? "நேரடி ஆலோசனை முன்பதிவு" : "Schedule Safe Land Consultation"}
              </Link>
            </div>
          </div>

          {/* Right Column: Unverified Broker / Market Risks */}
          <div className="bg-[#F2F2F2] rounded-3xl p-6 sm:p-8 border-2 border-rose-300/60 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-rose-200 mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-2xl bg-rose-100 text-rose-600 border border-rose-300">
                    <AlertTriangle className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-wider text-rose-600 block">
                      Common Pitfalls
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#202020]">
                      Unverified Local Broker Risks
                    </h3>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-rose-100 text-rose-700 border border-rose-300 text-xs font-black">
                  High Risk
                </span>
              </div>

              <div className="space-y-6">
                {standards.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="text-xs font-black text-rose-700 uppercase tracking-wider flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-600" />
                      <span>{item.feature}</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium pl-5">
                      {item.brokerRisk}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 mt-8 border-t border-rose-200">
              <div className="p-4 rounded-2xl bg-white border border-rose-200 text-center space-y-1">
                <div className="text-xs font-black text-[#202020]">
                  {language === "ta" ? "ஏதேனும் சந்தேகமா?" : "Holding Doubtful Documents?"}
                </div>
                <p className="text-[11px] text-slate-500 font-medium">
                  {language === "ta"
                    ? "அட்வான்ஸ் தொகை கொடுப்பதற்கு முன் Er. J. வைரவேலிடம் ஆவணங்களை இலவசமாக சரிபார்க்கவும்."
                    : "Have your parent deeds, layout map, or Patta scrutinized by Er. J. Vairavel before paying any advance."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
