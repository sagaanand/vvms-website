"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  CheckCircle2,
  Send,
  Building,
  HardHat,
  Sparkles,
} from "lucide-react";

export default function SmartRequirementSurvey() {
  const { language, t } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [objective, setObjective] = useState<string>("Buy");
  const [budget, setBudget] = useState<string>("₹25L – ₹50 Lakhs");
  const [locality, setLocality] = useState<string>("K.K. Nagar");
  const [timeline, setTimeline] = useState<string>("Within 1 Month");
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const budgetOptions = [
    "Under ₹25 Lakhs",
    "₹25L – ₹50 Lakhs",
    "₹50L – ₹1 Crore",
    "Above ₹1 Crore",
  ];

  const timelineOptions = [
    "Immediate / Ready to Buy",
    "Within 1 Month",
    "1 - 3 Months",
    "Planning Stage",
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          leadType: "Survey Requirement",
          budget,
          preferredLocality: locality,
          timeline,
          message: `Requirement captured via Survey Form:\nObjective: ${objective === "Buy" ? "Buy Property" : "Turnkey Construction"}\nBudget: ${budget}\nPreferred Locality: ${locality}\nTimeline: ${timeline}`,
          source: "SMART_REQUIREMENT_SURVEY",
        }),
      });

      setIsSubmitted(true);

      const waMsg = `Hello Er. J. Vairavel, I submitted my property requirement on veeduveettumanaisanthai.in:\n\n• Objective: ${objective === "Buy" ? "Buy Property" : "Turnkey House Construction"}\n• Locality: ${locality}, Trichy\n• Budget: ${budget}\n• Timeline: ${timeline}\n• Name: ${name}\n• Phone: ${phone}\n\nPlease share matching verified options.`;
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
    <section className="py-14 sm:py-20 bg-slate-50 border-t border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-[#B78D42]/35 shadow-xl relative overflow-hidden">
          {/* Header Styled with Brand Theme */}
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#F2F2F2] border border-[#22CDE1]/40 text-[#0891B2] text-xs font-black uppercase tracking-wide mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#22CDE1]" />
              <span>Smart Requirement Matcher</span>
            </span>
            <h2 className="text-xl sm:text-3xl font-black text-[#202020] tracking-tight mb-2">
              {t.survey.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              {t.survey.subtitle}
            </p>
          </div>

          {/* Stepper Progress with Brand Gold & Turquoise */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? "w-10 bg-[#B78D42] shadow-gold"
                    : s < step
                    ? "w-6 bg-[#22CDE1]"
                    : "w-6 bg-slate-200"
                }`}
              />
            ))}
          </div>

          {isSubmitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {t.survey.successMessage}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                We have registered your requirement. Er. J. Vairavel’s team is preparing hand-picked verified listings for your budget in {locality}.
              </p>
            </div>
          ) : (
            <div>
              {/* Step 1: Objective */}
              {step === 1 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="text-sm sm:text-base font-black text-slate-800 text-center">
                    {t.survey.step1Title}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setObjective("Buy");
                        setStep(2);
                      }}
                      className={`p-5 rounded-2xl border-2 text-left transition flex items-center gap-4 ${
                        objective === "Buy"
                          ? "border-[#B78D42] bg-[#F9DB5C]/15 shadow-gold"
                          : "border-slate-200 hover:border-[#B78D42]/40"
                      }`}
                    >
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-[#B78D42] border border-[#B78D42]/30">
                        <Building className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base">
                          {t.survey.buyProperty}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Plots, Individual Houses, Duplex Villas, Commercial
                        </div>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setObjective("Construct");
                        setStep(2);
                      }}
                      className={`p-5 rounded-2xl border-2 text-left transition flex items-center gap-4 ${
                        objective === "Construct"
                          ? "border-[#22CDE1] bg-[#22CDE1]/10 shadow-cyan"
                          : "border-slate-200 hover:border-[#22CDE1]/40"
                      }`}
                    >
                      <div className="p-3 bg-white rounded-2xl shadow-sm text-[#22CDE1] border border-[#22CDE1]/30">
                        <HardHat className="w-6 h-6" />
                      </div>
                      <div>
                        <div className="font-black text-slate-900 text-sm sm:text-base">
                          {t.survey.turnkeyBuild}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          Turnkey construction from ₹1,950/sq.ft on your own plot
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Budget */}
              {step === 2 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="text-sm sm:text-base font-black text-slate-800 text-center">
                    {t.survey.step2Title}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {budgetOptions.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setBudget(b);
                          setStep(3);
                        }}
                        className={`p-4 rounded-2xl border-2 text-center font-bold text-xs sm:text-sm transition ${
                          budget === b
                            ? "bg-[#202020] text-[#F9DB5C] border-[#B78D42] shadow-gold"
                            : "bg-white text-slate-700 border-slate-200 hover:border-[#22CDE1]"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                  <div className="flex justify-between pt-2">
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ← Back
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Locality & Timeline */}
              {step === 3 && (
                <div className="space-y-6 animate-in fade-in duration-200">
                  <h3 className="text-sm sm:text-base font-black text-slate-800 text-center">
                    {t.survey.step3Title}
                  </h3>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Trichy Locality
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {COMPANY_INFO.trichyLocalities.slice(0, 8).map((loc) => (
                        <button
                          key={loc.en}
                          type="button"
                          onClick={() => setLocality(loc.en)}
                          className={`p-2.5 rounded-xl border-2 text-center text-xs font-bold transition ${
                            locality === loc.en
                              ? "bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] text-[#202020] border-[#B78D42] shadow-gold font-black"
                              : "bg-white text-slate-700 border-slate-200 hover:border-[#22CDE1]"
                          }`}
                        >
                          {language === "ta" ? loc.ta : loc.en}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Planned Timeline
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {timelineOptions.map((tOpt) => (
                        <button
                          key={tOpt}
                          type="button"
                          onClick={() => setTimeline(tOpt)}
                          className={`p-2 rounded-xl border-2 text-center text-[11px] font-bold transition ${
                            timeline === tOpt
                              ? "bg-[#202020] text-[#22CDE1] border-[#22CDE1]"
                              : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          {tOpt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      onClick={() => setStep(2)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={() => setStep(4)}
                      className="px-6 py-2.5 rounded-xl bg-[#202020] text-[#F9DB5C] font-black text-xs hover:bg-[#2B2B2B] border border-[#B78D42]/50 shadow transition"
                    >
                      Next: Contact Info →
                    </button>
                  </div>
                </div>
              )}

              {/* Step 4: Contact & Submit */}
              {step === 4 && (
                <form onSubmit={handleSubmit} className="space-y-4 animate-in fade-in duration-200">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-gold-300 text-xs space-y-1">
                    <div className="font-black text-brand-black">Your Selection Summary:</div>
                    <div className="text-slate-600 flex flex-wrap gap-2 text-[11px]">
                      <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold text-slate-800">
                        {objective === "Buy" ? "Buy Property" : "Turnkey Construction"}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold text-gold-700">
                        Budget: {budget}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold text-cyan-700">
                        Locality: {locality}
                      </span>
                      <span className="bg-white px-2 py-0.5 rounded-md border border-slate-200 font-bold text-slate-700">
                        Timeline: {timeline}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. S. Murugesan"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-gold-500"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. +91 98424 00000"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs focus:outline-none focus:border-gold-500"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-2">
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="text-xs text-slate-400 hover:text-slate-600 font-bold"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md transition flex items-center gap-2 disabled:opacity-50 border border-emerald-400/30"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? "Submitting..." : t.survey.submitRequirement}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
