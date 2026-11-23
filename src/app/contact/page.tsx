"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Send,
  Building2,
  CheckCircle2,
  Calendar,
} from "lucide-react";
import { Youtube } from "@/components/icons/YoutubeIcon";

export default function ContactPage() {
  const { language } = useLanguage();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    serviceInterested: "Property Purchase Advisory",
    officeLocation: "Corporate Headquarters (Olaiyur Ring Road)",
    preferredDate: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;
    setSubmitted(true);

    const waMsg = encodeURIComponent(
      `Hello Er. J. Vairavel & Team, I would like to schedule an in-person office consultation at ${form.officeLocation}:\n\n• Name: ${form.name}\n• Phone: ${form.phone}\n• Service: ${form.serviceInterested}\n• Preferred Date: ${form.preferredDate || "Earliest available"}\n• Note: ${form.message || "Consultation"}`
    );
    const waUrl = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, waMsg);

    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 600);
  };

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
                ? "தொடர்பு பக்கம் முன்னோட்டம் • திருச்சி அலுவலக முகவரிகள் மற்றும் நேரடி ஆலோசனை முன்பதிவு."
                : "Contact Page Visual Preview • Trichy dual-office locations & appointment scheduling."}
            </span>
          </div>
          <span className="hidden md:inline text-amber-800 text-[11px] font-bold">
            Open All 7 Days
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
              <Building2 className="w-4 h-4 text-amber-400" />
              <span>Two Physical Offices Across Tiruchirappalli</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
              {language === "ta"
                ? "எங்கள் திருச்சி அலுவலகங்களுக்கு நேரில் வருகை தாருங்கள்"
                : "Visit Our Trichy Offices or Connect Directly"}
            </h1>

            <p className="text-xs sm:text-base text-slate-300 leading-relaxed font-medium">
              {language === "ta"
                ? "Er. J. வைரவேல் மற்றும் எங்கள் சிவில் இன்ஜினியரிங் குழுவினரை நேரில் சந்தித்து ஆவணங்களைச் சரிபார்க்கவும், மனை வரைபடங்கள் மற்றும் கட்டுமான ஒப்பந்தங்களை ஆலோசிக்கவும் அழைக்கிறோம்."
                : "Meet Er. J. Vairavel and our engineering team in person for transparent deed reviews, layout maps, structural designs, and turnkey home construction consultations."}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <a
                href={`tel:${COMPANY_INFO.phoneRaw}`}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 text-white font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-amber-600/30 transition hover:-translate-y-0.5"
              >
                Call: {COMPANY_INFO.phone}
              </a>
              <a
                href={`https://wa.me/${COMPANY_INFO.whatsappRaw}?text=${encodeURIComponent(
                  "Hello Er. J. Vairavel, I would like to schedule an office consultation in Trichy."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Appointment</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Dual Offices & Interactive Appointment Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Dual Office Locations & Hours (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-amber-600" />
              <span>{language === "ta" ? "தலைமை அலுவலக முகவரி" : "Our Head Office Location"}</span>
            </h2>

            {/* Corporate Headquarters Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-amber-300 shadow-md space-y-4 relative overflow-hidden">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-amber-500 text-white px-2.5 py-0.5 rounded-full shadow-sm">
                    Corporate Headquarters (HQ)
                  </span>
                  <h3 className="text-xl font-black text-slate-900 mt-2">
                    {language === "ta" ? "ஒலையூர் ரிங் ரோடு தலைமை அலுவலகம்" : "Olaiyur Ring Road Office"}
                  </h3>
                </div>
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700">
                  <Building2 className="w-6 h-6 text-amber-600" />
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {language === "ta"
                  ? "2வது தளம், வள்ளி டவர், எஸ்பிஐ வங்கி 2 மாடியில், ரிங் ரோடு, கே.கே. நகர், ஒலையூர், திருச்சிராப்பள்ளி – 620021"
                  : "2nd Floor, Valli Tower, Upstairs to SBI Bank 2, Ring Road, K.K. Nagar, Olaiyur, Tiruchirappalli, Tamil Nadu 620021"}
              </p>

              <div className="pt-3 border-t border-amber-100 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-slate-500 font-semibold">Landmark: Upstairs to SBI Bank 2</span>
                <a
                  href="https://maps.google.com/?q=Valli+Tower+Olaiyur+Ring+Road+Trichy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-amber-700 hover:text-amber-800 font-bold"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Working Hours & Direct Channels */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                  <Clock className="w-4 h-4 text-amber-600" />
                  <span>Working Hours</span>
                </div>
                <div className="text-xs text-slate-800 font-semibold">Monday – Sunday</div>
                <div className="text-xs text-slate-600">10:00 AM – 7:30 PM (All 7 Days)</div>
              </div>

              <div className="bg-amber-50/60 p-5 rounded-2xl border border-amber-200 space-y-2">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>Direct Inquiries</span>
                </div>
                <div className="text-xs text-slate-800 font-semibold">{COMPANY_INFO.email}</div>
                <div className="text-xs text-slate-600">Phone: {COMPANY_INFO.phone}</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Appointment Booking Form Preview (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-xl space-y-6">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  <Calendar className="w-3 h-3 text-amber-600" />
                  <span>Direct Meeting Scheduling</span>
                </div>
                <h3 className="text-xl font-black text-slate-900">
                  {language === "ta" ? "நேரடி ஆலோசனை முன்பதிவு" : "Schedule Office Consultation"}
                </h3>
                <p className="text-xs text-slate-500">
                  {language === "ta"
                    ? "கீழே உள்ள படிவத்தைப் பூர்த்தி செய்து உங்கள் வருகையை உறுதி செய்யுங்கள்."
                    : "Fill in your details below to schedule an in-person deed review or construction discussion."}
                </p>
              </div>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-emerald-950 text-base">
                    {language === "ta" ? "முன்பதிவு கோரிக்கை பெறப்பட்டது!" : "Appointment Request Initiated!"}
                  </h4>
                  <p className="text-xs text-emerald-800">
                    Connecting you to Er. J. Vairavel via WhatsApp with your preferred schedule...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="e.g. Ramesh Kumar"
                      className="w-full bg-slate-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="e.g. 98765 43210"
                      className="w-full bg-slate-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Office Location
                    </label>
                    <div className="w-full bg-slate-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 font-semibold flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>Corporate Headquarters (Olaiyur Ring Road, Trichy)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Consultation Topic
                    </label>
                    <select
                      value={form.serviceInterested}
                      onChange={(e) => setForm({ ...form, serviceInterested: e.target.value })}
                      className="w-full bg-slate-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                    >
                      <option value="Property Purchase Advisory">Property Purchase Advisory</option>
                      <option value="30-Year Legal Due Diligence">30-Year Legal Due Diligence</option>
                      <option value="Turnkey Home Construction">Turnkey Home Construction</option>
                      <option value="Soil & Water Technical Audit">Soil & Water Technical Audit</option>
                      <option value="SRO Guideline & Valuation">SRO Guideline & Valuation</option>
                      <option value="B2B Digital Marketing / Promote">B2B Digital Marketing / Promote</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Additional Notes / Survey Number
                    </label>
                    <textarea
                      rows={2}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Optional notes regarding your plot or consultation requirement"
                      className="w-full bg-slate-50 border border-amber-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-semibold"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs uppercase tracking-wider shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2"
                  >
                    <span>Schedule Appointment</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
