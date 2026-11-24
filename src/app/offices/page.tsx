"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import { getWhatsAppUrl } from "@/lib/utils";
import ReviewsAndOffices from "@/components/ReviewsAndOffices";
import { ParallaxFloatingAccents } from "@/components/Parallax";
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  MessageCircle,
  ExternalLink,
  ShieldCheck,
  Send,
  Building2,
} from "lucide-react";

export default function OfficesContactPage() {
  const { language, t } = useLanguage();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    office: "HQ (Olaiyur Ring Road)",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) return;

    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          leadType: "General Contact",
          preferredLocality: form.office,
          message: form.message,
          source: "CONTACT_OFFICES_PAGE",
        }),
      });

      setSubmitted(true);

      const msg = `Hello Er. J. Vairavel & Team, I want to schedule a visit to your ${form.office}:\n\n• Name: ${form.name}\n• Phone: ${form.phone}\n• Note: ${form.message || "Consultation"}`;
      const url = getWhatsAppUrl(COMPANY_INFO.whatsappRaw, msg);

      setTimeout(() => {
        window.open(url, "_blank");
      }, 700);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 sm:py-16 relative overflow-hidden blueprint-grid-bg">
      <ParallaxFloatingAccents variant="gold" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-gold-600 font-bold text-xs uppercase tracking-wider block">
            Visit Our Tiruchirappalli Locations
          </span>
          <h1 className="text-2xl sm:text-4xl font-black text-navy-900 tracking-tight">
            Our Offices & Contact Details
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Open Monday through Sunday from 10:00 AM to 7:30 PM. Walk-ins and appointment visits welcome.
          </p>
        </div>

        {/* Dual-Office Showcase Component */}
        <ReviewsAndOffices />

        {/* Direct Appointment / Message Form */}
        <div className="max-w-2xl mx-auto bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-xl">
          <div className="mb-6">
            <h2 className="text-lg sm:text-xl font-bold text-navy-900">
              Schedule an In-Person Consultation
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Let us know when you would like to meet Er. J. Vairavel to review property deeds or discuss house plans.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-8 space-y-3">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-bold text-slate-900 text-lg">Appointment Submitted!</h3>
              <p className="text-xs text-slate-500">Connecting to WhatsApp for instant confirmation...</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. K. Vasanth"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98424 00000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Office Location</label>
                <div className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Corporate Headquarters (Olaiyur Ring Road, Trichy)</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Message / Consultation Topic</label>
                <textarea
                  rows={3}
                  placeholder="e.g. Want to verify DTCP layout documents or discuss G+1 turnkey construction cost..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-gold-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-gold-400 font-bold uppercase tracking-wider shadow-md transition flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? "Sending..." : "Book Office Appointment"}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
