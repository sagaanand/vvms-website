"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n";
import { COMPANY_INFO } from "@/lib/constants";
import {
  Star,
  MapPin,
  Clock,
  Phone,
  ExternalLink,
  ShieldCheck,
  Building2,
  Sparkles,
} from "lucide-react";

export default function ReviewsAndOffices() {
  const { t } = useLanguage();

  const testimonials = [
    {
      name: "Dr. K. Senthil Nathan",
      role: "NRI Home Owner (Singapore)",
      property: "3BHK Villa, K.K. Nagar Ring Road",
      stars: 5,
      review:
        "Er. J. Vairavel gave us 100% peace of mind. Being in Singapore, we watched the walkthrough video on his YouTube channel, verified parent documents through his legal team, and completed the registration seamlessly. Truly ethical engineering.",
    },
    {
      name: "R. Meenakshi & Family",
      role: "Turnkey Construction Client",
      property: "G+1 Home, Olaiyur",
      stars: 5,
      review:
        "We entrusted our 1200 sq.ft plot construction to Er. J. Vairavel under the Standard Package. Every material delivered was exactly as promised (TATA Tiscon & Ultratech). Stage-wise video updates kept us informed. Handed over on time!",
    },
    {
      name: "G. Anandhakrishnan",
      role: "Plot Buyer",
      property: "DTCP Layout, Panjappur New Bus Stand",
      stars: 5,
      review:
        "No hidden charges, no broker commissions. Clear title verification and immediate DTCP approval copy given before taking advance. SBI bank loan was sanctioned within 10 days.",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Social Proof Header Styled with Brand Palette */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#F2F2F2] border border-[#B78D42]/40 text-[#202020] text-xs font-black uppercase tracking-wide mb-2 shadow-sm">
            <Star className="w-3.5 h-3.5 fill-[#F9DB5C] text-[#B78D42]" />
            <span>4.8★ Google Rating • 5.0★ Justdial Highest Trust</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#202020] tracking-tight mb-2">
            Trusted by Hundreds of Trichy Families
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-medium">
            Read verified reviews from buyers and homeowners who experienced transparent property dealings with Er. J. Vairavel.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#F2F2F2] rounded-3xl p-6 border border-[#B78D42]/30 hover:border-[#B78D42] shadow-sm hover:shadow-gold transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-[#F9DB5C] mb-3">
                  {[...Array(item.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#F9DB5C] text-[#B78D42]" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic mb-4">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>

              <div className="pt-3 border-t border-[#B78D42]/20">
                <div className="font-extrabold text-[#202020] text-sm">{item.name}</div>
                <div className="text-[11px] text-slate-500 font-medium">{item.role}</div>
                <div className="text-[10px] text-[#0891B2] font-bold mt-0.5">
                  {item.property}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dual-Office Location Showcase Styled with Brand Gold (HQ) & Turquoise Blue (Branch) */}
        <div className="pt-6 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-black text-[#B78D42] uppercase tracking-wider block mb-1">
              Personal Consultation
            </span>
            <h3 className="text-xl sm:text-3xl font-black text-[#202020]">
              {t.offices.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {t.offices.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Primary HQ Card Styled in Charcoal Black + Antique Gold Border */}
            <div className="bg-[#202020] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#B78D42] shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F9DB5C]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B2B2B] text-[#F9DB5C] text-[11px] font-black uppercase tracking-wider mb-4 border border-[#B78D42]/50 shadow-gold">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F9DB5C]" />
                  <span>Corporate Headquarters (HQ)</span>
                </div>

                <h4 className="text-lg sm:text-xl font-black text-white mb-2">
                  Olaiyur Ring Road Office
                </h4>

                <div className="space-y-3 text-xs text-slate-300 mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#F9DB5C] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      2nd Floor, Valli Tower, Upstairs to SBI Bank 2, Ring Road, K.K. Nagar, Olaiyur, Tiruchirappalli, Tamil Nadu 620021
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#F9DB5C] flex-shrink-0" />
                    <span>{COMPANY_INFO.workingHours} (Open Daily)</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#F9DB5C] flex-shrink-0" />
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-white hover:text-[#F9DB5C] font-black">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2E2E2E] flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=Valli+Tower+Olaiyur+Ring+Road+Trichy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#F6E785] to-[#F9DB5C] hover:brightness-105 text-[#202020] font-black text-xs shadow-gold transition border border-[#B78D42]/50"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Secondary Branch Card Styled in Charcoal + Turquoise Border */}
            <div className="bg-[#252525] text-white rounded-3xl p-6 sm:p-8 border-2 border-[#22CDE1]/80 shadow-2xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#22CDE1]/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B2B2B] text-[#22CDE1] text-[11px] font-black uppercase tracking-wider mb-4 border border-[#22CDE1]/50 shadow-cyan">
                  <Building2 className="w-3.5 h-3.5 text-[#22CDE1]" />
                  <span>Branch Office</span>
                </div>

                <h4 className="text-lg sm:text-xl font-black text-white mb-2">
                  Karumandapam Branch
                </h4>

                <div className="space-y-3 text-xs text-slate-300 mb-6">
                  <div className="flex items-start gap-2.5">
                    <MapPin className="w-4 h-4 text-[#22CDE1] flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">
                      Vision Properties Building, Ashok Nagar 2nd Street, RMS Colony, Karumandapam, Trichy – 620001
                    </span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Clock className="w-4 h-4 text-[#22CDE1] flex-shrink-0" />
                    <span>{COMPANY_INFO.workingHours} (Open Daily)</span>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Phone className="w-4 h-4 text-[#22CDE1] flex-shrink-0" />
                    <a href={`tel:${COMPANY_INFO.phoneRaw}`} className="text-white hover:text-[#22CDE1] font-black">
                      {COMPANY_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#2E2E2E] flex flex-wrap gap-3">
                <a
                  href="https://maps.google.com/?q=Karumandapam+Trichy+Vision+Properties"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-gradient-to-r from-[#22CDE1] to-[#0891B2] hover:brightness-105 text-white font-black text-xs shadow-cyan transition border border-[#22CDE1]/50"
                >
                  <span>Google Maps Directions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
