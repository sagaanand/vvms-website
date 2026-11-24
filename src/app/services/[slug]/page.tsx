"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { ALL_SERVICES, ServiceDetail } from "@/lib/namnilam-data";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import {
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Users,
  FileCheck,
  ChevronRight,
  Send,
  MessageCircle,
  Phone,
} from "lucide-react";

export default function SingleServicePage({
  params,
}: {
  params: { slug: string };
}) {
  const { language } = useLanguage();
  const service = ALL_SERVICES.find(
    (s) => s.slug === params.slug || s.aliases?.includes(params.slug)
  );

  if (!service) {
    notFound();
  }

  const [form, setForm] = useState({
    name: "",
    phone: "",
    propertyLocality: "",
    surveyNumber: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          leadType: `Service: ${service.title}`,
          preferredLocality: form.propertyLocality || "Trichy",
          message: `Booking request for ${service.title} (${service.priceTag}). Survey No: ${form.surveyNumber || "N/A"}. Note: ${form.message || "None"}`,
          source: "SERVICE_DETAIL_PAGE",
        }),
      });

      setSubmitted(true);

      const waMsg = `Hello VVMS Services Desk, I want to book your "${service.title}" service (${service.priceTag}) on veeduveettumanaisanthai.in:\n\n• Name: ${form.name}\n• Phone: ${form.phone}\n• Property Locality: ${form.propertyLocality || "Trichy"}\n• Survey No: ${form.surveyNumber || "N/A"}\n• Note: ${form.message || "Consultation"}\n\nPlease share the docket submission instructions.`;
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
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b border-slate-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-gold-600 transition">Home</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/services" className="hover:text-cyan-600 transition">Services & Advisory</Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-brand-black font-black truncate">{service.title}</span>
        </div>
      </div>

      {/* Hero Banner Styled in Logo Dark Onyx */}
      <section className="bg-brand-black text-white py-12 sm:py-16 relative overflow-hidden border-b-2 border-gold-500/40">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-card border border-gold-500/50 text-gold-300 text-xs font-black uppercase tracking-wider shadow-gold">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>{service.badge}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
              {language === "ta" ? service.titleTa : service.title}
            </h1>

            <p className="text-sm sm:text-lg text-gold-300 font-bold">
              {service.headline}
            </p>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-medium">
              {service.desc}
            </p>

            <div className="pt-2 flex items-center gap-4">
              <div className="text-xl sm:text-2xl font-black text-gold-400">
                {service.priceTag}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column (8 cols): Problems, Target Audience, Scope, Deliverables */}
          <div className="lg:col-span-8 space-y-10">
            {/* Common Problems Solved */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-red-200/80 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-red-600 font-black text-base">
                <AlertTriangle className="w-5 h-5" />
                <h2>Common Risks & Costly Pitfalls We Prevent</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {service.commonProblems.map((prob, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-2xl bg-red-50/60 border border-red-200 text-slate-800 font-semibold flex items-start gap-2"
                  >
                    <span className="text-red-600 font-black text-sm leading-none">•</span>
                    <span>{prob}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-cyan-200 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-cyan-800 font-black text-base">
                <Users className="w-5 h-5 text-cyan-600" />
                <h2>Who This Advisory Service Is Designed For</h2>
              </div>
              <div className="space-y-2 text-xs">
                {service.targetAudience.map((aud, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <span>{aud}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* What Our Civil & Legal Experts Help With */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-gold-300 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-gold-900 font-black text-base">
                <ShieldCheck className="w-5 h-5 text-gold-600" />
                <h2>Our Verification Scope & Technical Methodology</h2>
              </div>
              <div className="space-y-3 text-xs">
                {service.whatWeHelpWith.map((item, i) => (
                  <div key={i} className="p-3 rounded-2xl bg-gold-50/50 border border-gold-200 flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-gold-500 text-brand-black font-black text-xs flex items-center justify-center flex-shrink-0 shadow-sm">
                      {i + 1}
                    </span>
                    <span className="text-slate-800 font-bold mt-0.5">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverables Dossier */}
            <div className="bg-brand-black text-white rounded-3xl p-6 sm:p-8 border-2 border-gold-400 shadow-gold space-y-4">
              <div className="flex items-center gap-2 text-gold-400 font-black text-base">
                <FileCheck className="w-5 h-5 text-cyan-400" />
                <h2>Official Deliverables You Will Receive</h2>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                {service.deliverables}
              </p>
              {service.deliverablesList && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                  {service.deliverablesList.map((del, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-brand-dark border border-slate-700 text-slate-200 flex items-start gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column (4 cols): Sticky Booking & Inquiry Form */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-gold-400 shadow-xl space-y-4">
              <div>
                <span className="text-gold-600 font-black text-xs uppercase tracking-wider">
                  Book Advisory Engagement
                </span>
                <h3 className="text-lg font-black text-brand-black mt-0.5">
                  Request {service.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  Submit your details below. Our legal and technical advisory board will review your case within 24 hours.
                </p>
              </div>

              {submitted ? (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-slate-900 text-sm">Engagement Registered!</div>
                  <div className="text-xs text-slate-600">
                    Connecting to WhatsApp for instant confirmation with our Trichy office team.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. R. Saravanan"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-gold-500"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Property Locality in Trichy
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Olaiyur Ring Road / Panjappur"
                      value={form.propertyLocality}
                      onChange={(e) => setForm({ ...form, propertyLocality: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Survey / Subdivision Number (If known)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. S.F. No. 142/2B"
                      value={form.surveyNumber}
                      onChange={(e) => setForm({ ...form, surveyNumber: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">
                      Specific Questions or Concerns
                    </label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Want to verify 30-year EC or groundwater depth before paying advance..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-medium focus:outline-none focus:border-gold-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2 border border-emerald-400/30"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? "Submitting..." : "Submit & Connect via WhatsApp"}</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phoneRaw}`}
                    className="w-full py-2.5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition flex items-center justify-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5 text-gold-600" />
                    <span>Call Direct: {COMPANY_INFO.phone}</span>
                  </a>
                </form>
              )}
            </div>

            {/* Credibility Card */}
            <div className="bg-brand-black text-white rounded-3xl p-5 border-2 border-gold-400/50 shadow-gold space-y-3">
              <div className="flex items-center gap-3">
                <div className="relative w-12 h-12 rounded-2xl overflow-hidden border-2 border-gold-400 bg-brand-black flex-shrink-0 flex items-center justify-center p-1 shadow-md">
                  <Image
                    src="/images/logo.png"
                    alt="VVMS Engineering & Legal Board"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-black text-sm text-white">VVMS Technical Advisory Directorate</h4>
                  <p className="text-[11px] text-gold-400 font-bold">Senior Civil Engineers & High Court Advocates</p>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium">
                &ldquo;Our advisory reports are 100% independent. We do not take secret kickbacks from sellers, so our valuation and due diligence reports protect only you.&rdquo;
              </p>
              <div className="pt-1 text-[11px] text-cyan-400 flex items-center gap-2 font-semibold">
                <span>Head Office at Olaiyur Ring Road, Trichy</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
