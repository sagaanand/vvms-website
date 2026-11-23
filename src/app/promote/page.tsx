"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  Camera,
  CheckCircle2,
  Users,
  TrendingUp,
  ShieldCheck,
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export default function PromotePropertyPage() {
  const { t, language } = useLanguage();
  const [activePersona, setActivePersona] = useState<"promoter" | "owner" | "partner">("promoter");

  const [form, setForm] = useState({
    ownerName: "",
    phone: "",
    email: "",
    propertyType: "Layout / Plots",
    locality: "K.K. Nagar",
    askingPrice: "",
    plotAreaSqFt: "",
    notes: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.ownerName || !form.phone || !form.locality) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/promote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      setSubmitted(true);

      const waMsg = `Hello Er. J. Vairavel, I want to promote my property on your YouTube channel (@Veeduveettumanaisandhai):\n\n• Owner: ${form.ownerName}\n• Phone: ${form.phone}\n• Property Type: ${form.propertyType}\n• Locality: ${form.locality}, Trichy\n• Asking Price: ${form.askingPrice || "Negotiable"}\n• Area: ${form.plotAreaSqFt || "N/A"} sq.ft\n• Details: ${form.notes || "None"}\n\nPlease let me know when your media team can schedule the video shoot.`;
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
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 text-red-700 text-xs font-black uppercase tracking-wider border border-red-300">
            <Youtube className="w-4 h-4 text-red-600" />
            <span>YouTube Promotion Network • 125K+ Subscribers</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-brand-black tracking-tight leading-tight">
            Promote Your Layout or Home on Tamil Nadu&apos;s Leading Property Channel
          </h1>

          <p className="text-xs sm:text-base text-slate-600 max-w-2xl mx-auto font-medium">
            Sell faster with zero broker interference. Er. J. Vairavel presents your property on-camera with 4K drone cinematography, reaching genuine NRI and Tamil buyers worldwide.
          </p>
        </div>

        {/* Benefits Grid Styled with Logo Palette */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-3xl border-2 border-red-200 shadow-sm text-center space-y-2 hover:shadow-md transition">
            <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto border border-red-200">
              <Users className="w-6 h-6" />
            </div>
            <div className="font-black text-brand-black text-sm">125K+ Active Audience</div>
            <div className="text-xs text-slate-500 font-medium">
              High-intent property seekers across Trichy, Chennai, Singapore & the Gulf.
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-gold-200 shadow-sm text-center space-y-2 hover:shadow-gold transition">
            <div className="w-12 h-12 bg-gold-50 text-gold-600 rounded-2xl flex items-center justify-center mx-auto border border-gold-200">
              <Camera className="w-6 h-6" />
            </div>
            <div className="font-black text-brand-black text-sm">4K Aerial Drone Shoot</div>
            <div className="text-xs text-slate-500 font-medium">
              Full layout boundary view, approach road width, and landmark connectivity.
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-cyan-200 shadow-sm text-center space-y-2 hover:shadow-cyan transition flex flex-col items-center">
            <div className="relative w-14 h-14 rounded-2xl overflow-hidden border-2 border-cyan-400 shadow-sm flex-shrink-0 bg-slate-100">
              <Image
                src="/images/vairavel-avatar.jpg"
                alt="Er. J. Vairavel"
                fill
                className="object-cover"
              />
            </div>
            <div className="font-black text-brand-black text-sm">Presented by Er. J. Vairavel</div>
            <div className="text-xs text-slate-500 font-medium">
              Technical credibility that builds buyer trust and eliminates lowball offers.
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm text-center space-y-2 hover:shadow-md transition">
            <div className="w-12 h-12 bg-brand-black text-gold-400 rounded-2xl flex items-center justify-center mx-auto">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="font-black text-brand-black text-sm">Direct Buyer Inquiries</div>
            <div className="text-xs text-slate-500 font-medium">
              Inquiries routed straight to you. No hidden commissions or middleman friction.
            </div>
          </div>
        </div>

        {/* Persona Selector Tabs adapted from Nam Nilam */}
        <div className="max-w-2xl mx-auto mb-8 bg-white p-2 rounded-2xl border-2 border-[#B78D42]/30 shadow-md flex items-center justify-between gap-1 sm:gap-2">
          <button
            type="button"
            onClick={() => {
              setActivePersona("promoter");
              setForm({ ...form, propertyType: "Layout / Plots" });
            }}
            className={`flex-1 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition text-center ${
              activePersona === "promoter"
                ? "bg-[#202020] text-[#F9DB5C] shadow-md border border-[#B78D42]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {language === "ta" ? "லேஅவுட் புரமோட்டர் (Promoter)" : "Layout Promoter"}
          </button>
          <button
            type="button"
            onClick={() => {
              setActivePersona("owner");
              setForm({ ...form, propertyType: "Individual House" });
            }}
            className={`flex-1 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition text-center ${
              activePersona === "owner"
                ? "bg-[#202020] text-[#F9DB5C] shadow-md border border-[#B78D42]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {language === "ta" ? "தனி உரிமையாளர் (Owner)" : "Individual Owner"}
          </button>
          <button
            type="button"
            onClick={() => {
              setActivePersona("partner");
              setForm({ ...form, propertyType: "Commercial Land" });
            }}
            className={`flex-1 py-3 px-2 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition text-center ${
              activePersona === "partner"
                ? "bg-[#202020] text-[#F9DB5C] shadow-md border border-[#B78D42]"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {language === "ta" ? "சேனல் பார்ட்னர் (Agent)" : "Channel Partner"}
          </button>
        </div>

        {/* Promotion Request Submission Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border-2 border-gold-400/50 shadow-xl">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-black text-brand-black">
              Request a Video Shoot & Portal Listing
            </h2>
            <p className="text-xs text-slate-500 mt-1 font-medium">
              Fill in your property details. Our media production team will call you within 24 hours to schedule the shoot.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                Shoot Request Registered!
              </h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Thank you, {form.ownerName}. Connecting you directly with Er. J. Vairavel’s channel manager on WhatsApp...
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Owner / Promoter Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. K. Sundaramoorthy"
                    value={form.ownerName}
                    onChange={(e) => setForm({ ...form, ownerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98424 00000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Property Type
                  </label>
                  <select
                    value={form.propertyType}
                    onChange={(e) => setForm({ ...form, propertyType: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                  >
                    <option value="Layout / Plots">Layout / Gated Plots</option>
                    <option value="Individual House">Individual House / Villa</option>
                    <option value="Resale Home">Resale Home</option>
                    <option value="Commercial Land">Commercial Land / Building</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Trichy Locality *
                  </label>
                  <select
                    value={form.locality}
                    onChange={(e) => setForm({ ...form, locality: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                  >
                    {COMPANY_INFO.trichyLocalities.map((loc) => (
                      <option key={loc.en} value={loc.en}>
                        {loc.en} ({loc.ta})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Asking Price / Offer
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. ₹45 Lakhs or ₹2,200/sq.ft"
                    value={form.askingPrice}
                    onChange={(e) => setForm({ ...form, askingPrice: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Plot / Land Area (sq.ft)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 1500"
                    value={form.plotAreaSqFt}
                    onChange={(e) => setForm({ ...form, plotAreaSqFt: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Property Highlights & Special Features
                </label>
                <textarea
                  rows={3}
                  placeholder="e.g. 33 ft tar road, DTCP approved, opposite to school, Kaveri water connection ready..."
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500 font-medium"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white font-black uppercase tracking-wider shadow-xl transition flex items-center justify-center gap-2 disabled:opacity-50 border border-red-400/40"
              >
                <Youtube className="w-4 h-4 fill-white" />
                <span>{isSubmitting ? "Submitting..." : "Schedule YouTube Video Shoot"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
